import type { Config } from "tailwindcss";

// H & S Exterior Solutions brand palette: deep black surfaces, clean white
// type, and an electric blue accent drawn from the company logo.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        // A step lighter than ink — used to alternate consecutive dark
        // sections (ServicesGrid / VideoGallery / WorkGallery) so they
        // read as distinct blocks instead of one undifferentiated slab
        // of black. Not meant to be dramatic — just enough separation
        // that a section boundary is visible without a hard white gap.
        surface: "#161616",
        paper: "#f0f0f0",
        // Electric blue matches the H & S logo and stays legible against
        // both the ink and surface backgrounds.
        accent: "#0088f7",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
