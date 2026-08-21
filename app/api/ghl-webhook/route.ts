import { NextRequest, NextResponse } from "next/server";

// Receives outbound webhooks from a GHL workflow — e.g. "notify site when
// an appointment is booked" or "notify site when opportunity moves to Won".
// Set this URL (https://yourdomain.com/api/ghl-webhook) as the target in
// the workflow's "Webhook" action, with a custom header carrying
// GHL_WEBHOOK_SECRET so this endpoint can confirm the request is really
// from GHL and not an open POST target anyone could hit.
//
// This is a stub: it verifies the secret and logs the payload. Extend the
// switch below with whatever you actually want to happen — revalidate a
// page, send an internal Slack/SMS alert, update a dashboard, etc.

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (process.env.GHL_WEBHOOK_SECRET && secret !== process.env.GHL_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("GHL webhook received:", payload.type ?? "unknown", payload);

  switch (payload.type) {
    // case "AppointmentCreate":
    //   // e.g. trigger a confirmation, log to analytics, etc.
    //   break;
    // case "OpportunityStageUpdate":
    //   break;
    default:
      break;
  }

  return NextResponse.json({ ok: true });
}
