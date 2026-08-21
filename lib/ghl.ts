import "server-only";

// Thin wrapper around the GoHighLevel v2 API (services.leadconnectorhq.com).
// Server-only: imports here throw if accidentally pulled into a client
// bundle, since GHL_API_KEY must never reach the browser.
//
// All GHL v2 endpoints require the Version header pinned to a specific
// API revision — using today's date or omitting it entirely will get you
// inconsistent/deprecated response shapes.

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

function ghlHeaders() {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GHL_API_KEY is not set. Add it to .env.local — see .env.example."
    );
  }
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: GHL_API_VERSION,
    "Content-Type": "application/json",
  };
}

async function ghlFetch(path: string, init: RequestInit) {
  const res = await fetch(`${GHL_BASE_URL}${path}`, {
    ...init,
    headers: { ...ghlHeaders(), ...(init.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GHL API ${res.status} on ${path}: ${body}`);
  }
  return res.json();
}

export type LeadInput = {
  firstName?: string;
  lastName?: string;
  fullName: string;
  email: string;
  phone: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  service: string;
  source: string;
  details?: string;
  // Attribution captured client-side — see lib/attribution.ts
  utm?: Record<string, string>;
  pageUrl?: string;
};

// Maps a lead field to a real custom field ID, but only if that field's ID
// is actually set in .env.local — this is what makes the integration work
// out of the box before every field is mapped: unmapped fields are simply
// skipped instead of sending an invalid/empty id to the API. Every client
// has their own GHL sub-account with their own field IDs (these don't
// carry over between accounts), so this stays entirely env-var driven
// rather than hardcoded to any one client.
function customField(envVarId: string | undefined, value: string | undefined) {
  if (!envVarId || !value) return null;
  return { id: envVarId, value };
}

function buildCustomFields(lead: LeadInput) {
  return [
    customField(process.env.GHL_CF_SERVICE_ID, lead.service),
    customField(process.env.GHL_CF_PROJECT_DETAILS_ID, lead.details),
    customField(process.env.GHL_CF_STREET_ID, lead.address1),
    customField(process.env.GHL_CF_CITY_ID, lead.city),
    customField(process.env.GHL_CF_STATE_ID, lead.state),
    customField(process.env.GHL_CF_ZIP_ID, lead.postalCode),
    customField(process.env.GHL_CF_SOURCE_ID, lead.source),
    customField(process.env.GHL_CF_PAGE_URL_ID, lead.pageUrl),
    customField(process.env.GHL_CF_UTM_SOURCE_ID, lead.utm?.utm_source),
    customField(process.env.GHL_CF_UTM_CAMPAIGN_ID, lead.utm?.utm_campaign),
  ].filter((f): f is { id: string; value: string } => f !== null);
}

/**
 * Upsert a contact by email/phone (GHL dedupes automatically — safe to
 * call every time the form is submitted, won't create duplicates for a
 * repeat visitor).
 */
export async function upsertGhlContact(lead: LeadInput) {
  const [firstName, ...rest] = lead.fullName.trim().split(/\s+/);
  const lastName = rest.join(" ");

  return ghlFetch("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify({
      locationId: process.env.GHL_LOCATION_ID,
      firstName: lead.firstName ?? firstName,
      lastName: lead.lastName ?? lastName,
      email: lead.email,
      phone: lead.phone,
      address1: lead.address1,
      city: lead.city,
      state: lead.state,
      postalCode: lead.postalCode,
      source: `Website — ${lead.source}`,
      tags: ["website-lead", lead.service.toLowerCase().replace(/\s+/g, "-")],
      // Real structured data, not just free text in a note — this is
      // what lets a GHL workflow reference {{contact.custom_field}}
      // merge tags directly in a lead-notification email/SMS, since a
      // notification template can't parse values out of a note field.
      customFields: buildCustomFields(lead),
    }),
  });
}

/**
 * Create (or move) an opportunity for this contact in the configured
 * pipeline/stage. Skipped automatically if GHL_PIPELINE_ID isn't set, so
 * the form still works with contact-only sync while you're setting up.
 */
export async function upsertGhlOpportunity(contactId: string, lead: LeadInput) {
  const pipelineId = process.env.GHL_PIPELINE_ID;
  if (!pipelineId) return null;

  return ghlFetch("/opportunities/upsert", {
    method: "POST",
    body: JSON.stringify({
      pipelineId,
      pipelineStageId: process.env.GHL_PIPELINE_STAGE_ID,
      locationId: process.env.GHL_LOCATION_ID,
      name: `${lead.fullName} — ${lead.service}`,
      status: "open",
      contactId,
      assignedTo: process.env.GHL_ASSIGNED_USER_ID || undefined,
    }),
  });
}

/** Logs the full submission as a human-readable note too — not what the
 * notification workflow should rely on (that's the custom fields above),
 * but a useful backup/audit trail in the GHL UI, and it still captures
 * anything that doesn't have a dedicated field mapped yet. Remove this
 * call in syncLeadToGhl below if you want custom-fields-only. */
export async function addGhlNote(contactId: string, lead: LeadInput) {
  const lines = [
    `New quote request from the website.`,
    `Service: ${lead.service}`,
    lead.details ? `Details: ${lead.details}` : null,
    lead.address1 ? `Address: ${lead.address1}, ${lead.city}, ${lead.state} ${lead.postalCode}` : null,
    `Heard about us via: ${lead.source}`,
    lead.pageUrl ? `Submitted from: ${lead.pageUrl}` : null,
    lead.utm && Object.keys(lead.utm).length
      ? `Attribution: ${JSON.stringify(lead.utm)}`
      : null,
  ].filter(Boolean);

  return ghlFetch(`/contacts/${contactId}/notes`, {
    method: "POST",
    body: JSON.stringify({ body: lines.join("\n") }),
  });
}

/** Full pipeline: upsert contact, log a note, create/move an opportunity.
 * This is what app/api/quote/route.ts calls. */
export async function syncLeadToGhl(lead: LeadInput) {
  const contactRes = await upsertGhlContact(lead);
  const contactId: string | undefined = contactRes?.contact?.id ?? contactRes?.id;

  if (!contactId) {
    throw new Error("GHL contact upsert did not return a contact id.");
  }

  await addGhlNote(contactId, lead);
  await upsertGhlOpportunity(contactId, lead);

  return { contactId };
}
