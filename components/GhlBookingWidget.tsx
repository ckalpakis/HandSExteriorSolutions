import { siteConfig } from "@/config/site.config";

/**
 * Embeds a GHL calendar for direct self-scheduling, as an alternative or
 * companion to the quote form. Renders nothing if no calendar is
 * configured (config/site.config.ts -> ghl.calendarId).
 */
export default function GhlBookingWidget() {
  const { calendarId } = siteConfig.ghl;
  if (!calendarId) return null;

  return (
    <div className="mt-16 border-t border-accent/20 pt-10">
      <h2 className="font-display text-2xl font-semibold mb-4">
        Or book a time directly.
      </h2>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${calendarId}`}
        style={{ width: "100%", border: "none", minHeight: 780 }}
        scrolling="no"
        title="Book an appointment"
      />
      <script src="https://link.msgsndr.com/js/form_embed.js" async />
    </div>
  );
}
