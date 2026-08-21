"use client";

import { usePathname } from "next/navigation";

export default function PageMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Header is `fixed`, so it no longer reserves space in normal flow —
  // that's what lets it overlay the hero transparently on the homepage.
  // Every other page needs top padding to clear it instead, or their
  // content starts underneath the header and gets covered.
  return (
    <main id="main" className={isHome ? "" : "pt-20 md:pt-24"}>
      {children}
    </main>
  );
}
