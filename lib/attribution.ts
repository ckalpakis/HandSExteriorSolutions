"use client";

const STORAGE_KEY = "attribution";
const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid", // Google Ads
  "fbclid", // Meta Ads
];

/**
 * Call once on first page load (see AttributionCapture component below).
 * Reads tracked query params from the current URL and persists them in
 * sessionStorage so they're still available if the visitor lands on a
 * service page from a Google Ad, browses around, and submits the quote
 * form from a completely different page — otherwise attribution is lost
 * the moment they navigate away from the landing URL.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of TRACKED_PARAMS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }

  if (Object.keys(found).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  }
}

export function getStoredAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}
