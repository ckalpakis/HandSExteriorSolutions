import { siteConfig } from "@/config/site.config";

// One entry per supported platform. Adding a new platform later is just
// adding an SVG icon + a matching key in this array — the config's
// socialLinks object and the conditional rendering below don't need to
// change shape, just get a new optional field.
const PLATFORMS = [
  {
    key: "facebook",
    label: "Facebook",
    icon: (
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.6 1.5-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: (
      <path d="M12 2c2.7 0 3.1 0 4.1.1 1 .1 1.7.2 2.3.5.6.2 1.1.6 1.6 1.1.5.5.8.9 1.1 1.6.2.6.4 1.3.5 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c-.1 1-.2 1.7-.5 2.3-.2.6-.6 1.1-1.1 1.6-.5.5-.9.8-1.6 1.1-.6.2-1.3.4-2.3.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1-.1-1.7-.2-2.3-.5-.6-.2-1.1-.6-1.6-1.1-.5-.5-.8-.9-1.1-1.6-.2-.6-.4-1.3-.5-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c.1-1 .2-1.7.5-2.3.2-.6.6-1.1 1.1-1.6.5-.5.9-.8 1.6-1.1.6-.2 1.3-.4 2.3-.5C8.9 2 9.3 2 12 2zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: (
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.5v-7l6.3 3.5-6.3 3.5z" />
    ),
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: (
      <path d="M16.6 2h-3.3v13.9a2.9 2.9 0 1 1-2.9-3c.2 0 .5 0 .7.1v-3.3a6.2 6.2 0 1 0 5.5 6.2V8.6a8.3 8.3 0 0 0 4.9 1.6V6.9a5 5 0 0 1-4.9-4.9z" />
    ),
  },
  {
    key: "twitter",
    label: "X (Twitter)",
    icon: (
      <path d="M18.9 2H22l-7.2 8.2L23.3 22h-6.6l-5.2-6.8L5.5 22H2.4l7.7-8.8L1 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.7L7.3 3.9H5.5L17.7 20z" />
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: (
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8.3 18.5H5.6V9.7h2.7v8.8zM7 8.6a1.6 1.6 0 1 1 0-3.1 1.6 1.6 0 0 1 0 3.1zm11.5 9.9h-2.7v-4.3c0-1 0-2.3-1.4-2.3s-1.7 1.1-1.7 2.3v4.3H10V9.7h2.6v1.2a2.9 2.9 0 0 1 2.6-1.4c2.7 0 3.3 1.8 3.3 4.1v5z" />
    ),
  },
  {
    key: "pinterest",
    label: "Pinterest",
    icon: (
      <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.7.2-2.5l1.4-6s-.4-.7-.4-1.8c0-1.7 1-2.9 2.2-2.9 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.7-2.3 3.7-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.5 2.6-5.5 5.2 0 1 .4 2.1 .9 2.7a.4.4 0 0 1 .1.4l-.3 1.3c-.1.2-.2.3-.5.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.5-7.9 4.5 0 7.9 3.2 7.9 7.4 0 4.4-2.8 8-6.6 8-1.3 0-2.5-.7-2.9-1.5l-.8 3c-.3 1-1 2.4-1.6 3.2A10 10 0 1 0 12 2z" />
    ),
  },
] as const;

export default function SocialLinks({ className = "" }: { className?: string }) {
  const links = siteConfig.business.socialLinks;
  const active = PLATFORMS.filter((p) => links[p.key as keyof typeof links]);

  if (active.length === 0) return null;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {active.map((p) => (
        <a
          key={p.key}
          href={links[p.key as keyof typeof links]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.label}
          className="text-paper/70 hover:text-accent transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {p.icon}
          </svg>
        </a>
      ))}
    </div>
  );
}
