"use client";

import Script from "next/script";
import { siteConfig } from "@/config/site.config";

/**
 * Loads GHL's LeadConnector chat widget. Renders nothing if no widget ID
 * is configured (config/site.config.ts -> ghl.chatWidgetId), so this is
 * safe to always mount in the layout — it's a no-op until you set it up.
 */
export default function GhlChatWidget() {
  const { chatWidgetId } = siteConfig.ghl;
  if (!chatWidgetId) return null;

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={chatWidgetId}
      strategy="lazyOnload"
    />
  );
}
