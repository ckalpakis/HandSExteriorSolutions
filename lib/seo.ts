import { siteConfig, ServiceEntry } from "@/config/site.config";

const { business } = siteConfig;

/** "Window Cleaning in Land O Lakes, FL" instead of just "Window Cleaning" —
 * generic alt text wastes the one place per image where you can pair the
 * service with the location for image search. */
export function serviceAlt(service: ServiceEntry) {
  return `${service.title} in ${business.city}, ${business.state}`;
}

/** Gallery captions are already service-specific (for example, permanent lighting)
 * but still benefit from the location + business name for image search
 * and don't repeat it if the caption already mentions the city. */
export function galleryAlt(item: { category: string; caption: string }) {
  const hasLocation = item.caption.toLowerCase().includes(business.city.toLowerCase());
  return hasLocation
    ? `${item.category} — ${item.caption}`
    : `${item.category} — ${item.caption} — ${business.name}, ${business.city}, ${business.state}`;
}
