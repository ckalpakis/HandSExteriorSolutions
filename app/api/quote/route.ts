import { NextRequest, NextResponse } from "next/server";
import { isGhlConfigured, syncLeadToGhl, LeadInput } from "@/lib/ghl";

// Basic in-memory rate limit: blocks obvious burst spam without needing
// Redis for a single-location marketing site. Resets on redeploy — fine
// for this scale. If you outgrow it, swap for Upstash or similar.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const formData = await req.formData();

  // Honeypot already checked client-side, but never trust the client —
  // check again here in case someone bypasses the JS and POSTs directly.
  if (formData.get("website")) {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();

  if (!name || !email || !phone || !service) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Let the browser open a prefilled email when this deployment has not
  // been connected to GHL yet. A mailto must be opened client-side, so the
  // API reports the delivery method instead of pretending the CRM received it.
  if (!isGhlConfigured()) {
    return NextResponse.json({ ok: true, delivery: "mailto" });
  }

  let attribution: Record<string, string> = {};
  try {
    attribution = JSON.parse(String(formData.get("attribution") ?? "{}"));
  } catch {
    // malformed attribution payload — proceed without it rather than fail the lead
  }

  const lead: LeadInput = {
    fullName: name,
    email,
    phone,
    service,
    source: String(formData.get("source") ?? "Not specified"),
    details: String(formData.get("details") ?? ""),
    address1: String(formData.get("street") ?? ""),
    city: String(formData.get("city") ?? ""),
    state: String(formData.get("state") ?? ""),
    postalCode: String(formData.get("zip") ?? ""),
    utm: attribution,
    pageUrl: String(formData.get("pageUrl") ?? ""),
  };

  // Project photos (formData.getAll("photos")) aren't uploaded to GHL's
  // media library here — that's a multipart upload to a separate GHL
  // endpoint and worth wiring up once you have real volume. For now,
  // consider piping them to your own storage (S3/R2/Vercel Blob) and
  // including the resulting URLs in the note below.

  try {
    await syncLeadToGhl(lead);
  } catch (err) {
    console.error("GHL sync failed:", err);
    // Don't fail the user's request just because the CRM push failed —
    // they still get their "request received" confirmation, and this
    // logs server-side so you can catch sync issues in your hosting
    // provider's logs. Consider also emailing yourself as a fallback.
    return NextResponse.json({ ok: true, ghlSynced: false });
  }

  return NextResponse.json({ ok: true, delivery: "ghl", ghlSynced: true });
}
