# H & S Exterior Solutions Website

A Next.js website for H & S Exterior Solutions, an owner-operated exterior
cleaning and lighting business serving Land O Lakes and the Tampa Bay area.
The site covers window and solar panel cleaning, pressure washing, Govee
permanent LED installation, and Christmas light installation and removal.

## How it's structured

- `config/site.config.ts` — every piece of business-specific content: name,
  phone, services, FAQ, gallery, form options. **This is the only file you
  should need to edit when H & S business information changes.**
- `components/` — the reusable sections (Hero, About, ServicesGrid,
  VideoGallery, WorkGallery, FAQAccordion, QuoteForm, Header, Footer). They
  read from `site.config.ts`, never hardcode copy.
- `app/` — thin pages (`/`, `/about`, `/services`, `/work`, `/contact`) that
  assemble the components. Add real routing/anchors as the site grows.
- `app/api/quote/route.ts` — quote form handler, syncs every submission to
  GoHighLevel (contact + note + opportunity). Rate-limited and
  honeypot-protected. See "GHL setup" below.
- `lib/ghl.ts` — server-only GHL v2 API client (contact upsert, opportunity
  upsert, notes). Never imported into client components — `server-only`
  enforces that at build time.
- `lib/attribution.ts` + `components/AttributionCapture.tsx` — captures
  UTM params and Google/Meta click IDs on landing, persists them through
  the visit, and attaches them to the lead so GHL shows real ad
  attribution instead of every lead saying "direct."
- `app/api/ghl-webhook/route.ts` — receives events GHL sends back (e.g. a
  workflow posting "appointment booked"), so the integration is two-way.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in GHL credentials, see below
npm run dev
```

H & S assets live in `public/images` and `public/videos`; business content is
maintained in `config/site.config.ts`.

## GHL setup

This template pushes every quote-form submission into GoHighLevel as a
contact + note + opportunity, with UTM attribution attached. To wire it up
for a client's sub-account:

1. **Create a Private Integration API key.** In the client's GHL
   sub-account: Settings > Private Integrations > Create. Scopes needed:
   `contacts.write`, `contacts.readonly`, `opportunities.write`,
   `locations/customFields.readonly`. Put the key in `.env.local` as
   `GHL_API_KEY`.
2. **Get the location ID.** Settings > Business Profile (or the URL when
   you're in the sub-account — it's the ID after `/location/`). Set
   `GHL_LOCATION_ID`.
3. **Create a pipeline for website leads** (or reuse an existing one) under
   Opportunities > Pipelines. Set `GHL_PIPELINE_ID` and
   `GHL_PIPELINE_STAGE_ID` to the stage new leads should land in — e.g.
   "New Lead" or "Needs Quote."
4. **Custom fields (recommended, not just optional anymore).** This is
   what lets a GHL workflow reference specific lead data — service
   requested, project details, address, source, attribution — as merge
   tags in a notification email/SMS, instead of the info only living
   inside a free-text note a workflow can't parse. In the client's GHL
   sub-account: Settings > Custom Fields > Contact, create a field for
   each piece of data you want addressable (Service Requested, Project
   Details, Street Address, City, State, Zip, Lead Source, Page
   Submitted From, UTM Source, UTM Campaign — or whichever subset
   matters for this client). Copy each field's ID into the matching
   `GHL_CF_*_ID` variable in `.env.local` (see `.env.example` for the
   full list). Any left blank are just skipped — nothing breaks if you
   only map a few.
5. **(Optional) Chat widget.** Sites > Chat Widget in GHL gives you a
   widget ID — drop it into `config/site.config.ts` under `ghl.chatWidgetId`
   and it loads sitewide automatically.
6. **(Optional) Booking calendar.** Create a calendar under Calendars, copy
   its ID into `config/site.config.ts` under `ghl.calendarId` — it renders
   as an embedded booking widget under the quote form on `/contact`.
7. **(Optional) Two-way sync.** In a GHL workflow, add a Webhook action
   pointed at `https://yourdomain.com/api/ghl-webhook`, with a header
   `x-webhook-secret` matching `GHL_WEBHOOK_SECRET` in `.env.local`. Useful
   for e.g. notifying the site when an appointment is booked or an
   opportunity is marked Won.

**What does NOT get pushed to GHL automatically:** the "project photos"
upload in the quote form. GHL's media upload endpoint takes multipart form
data, which is a slightly bigger lift than the JSON endpoints above — for
now those files aren't wired up. The straightforward path is uploading
them to your own storage (S3, Cloudflare R2, Vercel Blob) and including
the resulting URLs in the GHL note (`lib/ghl.ts` -> `addGhlNote`).

## Maintaining the H & S site

1. **Update business content** in `config/site.config.ts` when H & S adds a
   service, location, review, social profile, or contact detail.
2. **Add field footage** to `public/videos` and `fieldVideos` only when real
   H & S jobsite videos are available.
3. **Wire up GHL** using the setup section above once the H & S sub-account
   credentials are available.
4. **Deploy** with `vercel deploy` or connect the repo to Cloudflare Pages.
   Set the same env vars from `.env.local` in your hosting provider's
   dashboard — they won't come along automatically.

## What's deliberately NOT included

- A CMS. For a handful of client sites, editing `site.config.ts` directly
  is faster than standing up a headless CMS. Add one only once you're
  managing dozens of these and need non-developers editing content.
- GHL media upload for the quote form's photo attachments — see the note
  in "GHL setup."
