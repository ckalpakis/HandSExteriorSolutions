"use client";

import { useState, FormEvent } from "react";
import { siteConfig } from "@/config/site.config";
import { getStoredAttribution } from "@/lib/attribution";
import GhlBookingWidget from "@/components/GhlBookingWidget";

type Status = "idle" | "sending" | "success" | "error";

function formValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function buildQuoteMailto(formData: FormData) {
  const address = [
    formValue(formData, "street"),
    formValue(formData, "city"),
    formValue(formData, "state"),
    formValue(formData, "zip"),
  ].filter(Boolean).join(", ");
  const photos = formData
    .getAll("photos")
    .filter((value): value is File => value instanceof File && Boolean(value.name))
    .map((file) => file.name);

  const lines = [
    "Hello H & S Exterior Solutions,",
    "",
    "I would like a free quote.",
    "",
    `Name: ${formValue(formData, "name")}`,
    `Phone: ${formValue(formData, "phone")}`,
    `Email: ${formValue(formData, "email")}`,
    `Service: ${formValue(formData, "service")}`,
    address ? `Project address: ${address}` : null,
    formValue(formData, "details")
      ? `Project details: ${formValue(formData, "details")}`
      : null,
    formValue(formData, "source")
      ? `How I heard about you: ${formValue(formData, "source")}`
      : null,
    photos.length
      ? `Photos selected (please attach manually): ${photos.join(", ")}`
      : null,
    formValue(formData, "pageUrl")
      ? `Submitted from: ${formValue(formData, "pageUrl")}`
      : null,
  ].filter((line): line is string => line !== null);

  const subject = `Quote request — ${formValue(formData, "service")}`;
  return `mailto:${siteConfig.business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

// Shared classes so every input/select/textarea stays visually identical
// without repeating the same string a dozen times.
const fieldClass =
  "w-full border border-ink/20 rounded-sm px-4 py-3 bg-paper placeholder:text-ink/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors";
const selectClass = `${fieldClass} appearance-none pr-10`;

function ChevronIcon() {
  return (
    <svg
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function QuoteForm({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const { quoteForm } = siteConfig;
  const Heading = headingLevel;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot: a field named "website" that's hidden from real visitors
    // via CSS but visible to most bots that blindly fill every input.
    // If it's non-empty, silently drop the submission instead of sending
    // spam leads into the CRM.
    const form = e.currentTarget;
    if ((form.elements.namedItem("website") as HTMLInputElement)?.value) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    const formData = new FormData(form);

    // Attach attribution captured on landing (see lib/attribution.ts) and
    // the page the form was actually submitted from, so GHL can see which
    // ad/campaign/page drove the lead even if they browsed for a while
    // before converting.
    formData.set("attribution", JSON.stringify(getStoredAttribution()));
    formData.set("pageUrl", window.location.href);

    try {
      const res = await fetch("/api/quote", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Request failed");
      const result = await res.json();

      if (result.delivery === "mailto") {
        window.location.href = buildQuoteMailto(formData);
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="px-6 py-24 max-w-xl mx-auto text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-paper mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="font-display uppercase text-2xl md:text-3xl">Request sent.</h2>
        <p className="mt-2 text-ink/70">
          We received your request and will be in touch shortly.
        </p>
      </section>
    );
  }

  return (
    <section id="contact" className="px-6 py-20 max-w-xl mx-auto">
      <p className="flex items-center gap-2 text-sm uppercase tracking-wide text-accent">
        <span className="inline-block h-px w-6 bg-accent" aria-hidden />
        Free quote
      </p>
      <Heading className="font-display uppercase text-4xl md:text-5xl leading-tight mt-3">
        {quoteForm.heading}
      </Heading>
      <p className="mt-3 text-ink/60 text-sm">{quoteForm.subhead}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {/* Honeypot — real users never see or fill this. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <input name="name" required placeholder="Name *" className={fieldClass} />
        <input name="phone" required placeholder="Phone *" className={fieldClass} />
        <input name="email" type="email" required placeholder="Email *" className={fieldClass} />

        <div className="relative">
          <select name="service" required defaultValue="" className={selectClass}>
            <option value="" disabled>Pick a service</option>
            {quoteForm.serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronIcon />
        </div>

        <textarea name="details" placeholder="Project details" className={fieldClass} rows={4} />

        <fieldset className="border border-ink/20 rounded-sm px-4 py-4">
          <legend className="text-xs uppercase tracking-wide text-ink/60 px-1">
            Project address
          </legend>
          <div className="space-y-3">
            <input name="street" placeholder="Street address" className={fieldClass} />
            <div className="grid grid-cols-3 gap-3">
              <input name="city" placeholder="City" className={`col-span-1 ${fieldClass}`} />
              <input name="state" placeholder="State" className={`col-span-1 ${fieldClass}`} />
              <input name="zip" placeholder="ZIP" className={`col-span-1 ${fieldClass}`} />
            </div>
          </div>
        </fieldset>

        <div className="relative">
          <select name="source" defaultValue="" className={selectClass}>
            <option value="" disabled>How did you hear about us?</option>
            {quoteForm.sourceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronIcon />
        </div>

        {/* Native file inputs can't be restyled directly across browsers —
            the input stays present but visually hidden, and a styled
            label triggers it instead, matching the outlined-button
            language used elsewhere on the site. */}
        <div>
          <label
            htmlFor="photos"
            className="inline-flex items-center gap-2 border border-ink/20 rounded-sm px-5 py-3 text-xs font-semibold uppercase tracking-widest cursor-pointer hover:border-accent hover:text-accent transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            Add project photos
          </label>
          <input
            type="file"
            id="photos"
            name="photos"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => setFileNames(Array.from(e.target.files ?? []).map((f) => f.name))}
          />
          {fileNames.length > 0 && (
            <p className="mt-2 text-xs text-ink/60">
              {fileNames.length} file{fileNames.length > 1 ? "s" : ""} selected: {fileNames.join(", ")}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-accent text-paper rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest disabled:opacity-60 hover:opacity-90 transition-opacity"
        >
          {status === "sending" ? "Sending..." : "Send Request"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-600">
            Something went wrong. Please try again or call us directly at {siteConfig.business.phone}.
          </p>
        )}
      </form>

      <GhlBookingWidget />
    </section>
  );
}
