type RecentProject = {
  title: string;
  detail: string;
};

type Testimonial = {
  quote: string;
  author: string;
};

type Review = {
  quote: string;
  author: string;
  rating: number; // 1-5
  source?: string; // e.g. "Google", "Facebook" — omit if unknown
  location?: string; // e.g. "Land O Lakes, FL" — omit if not location-specific
};

// Single source of truth for one client site.
// To spin up a new client: copy this file's values, don't touch components.
//
// H & S EXTERIOR SOLUTIONS — LAND O LAKES, FL
// Built from a real intake form submission (Michael Friedmann, Aug 20
// 2026). This submission only had about half the full 60-field form
// filled in — no Service 1 Name, no short descriptions for Services 2-4,
// no per-service process/cost/signs/FAQ, no location blurb/conditions,
// no sitewide FAQ, no reviews. Supporting copy below is conservative,
// service-specific content inferred from the confirmed offerings. Claims
// that require owner verification (reviews, licensing, timelines, supplied
// materials, or completed projects) are intentionally omitted.
//
// ONE STRUCTURAL FIX I MADE: the "Location 1 Neighborhoods" field was
// filled in with "Land o Lakes, Tampa, Lutz, Odessa, Trinity, Wesley
// Chapel" — but those aren't neighborhoods of Land O Lakes, they're
// separate real towns in the same Tampa Bay area. Treating Tampa as a
// "neighborhood of Land O Lakes" would be geographically wrong on a live
// site. I split them into 6 separate location entries instead — this is
// a legitimate restructuring of real data the client gave, not
// fabrication, since all 6 towns were explicitly named as served.

export const siteConfig = {
  siteUrl: "https://hoseandsqueegee.com", // Inferred from the business name; verify before launch

  business: {
    name: "H & S Exterior Solutions", // confirmed (trailing space trimmed)
    legalName: "H & S Exterior Solutions LLC", // confirmed
    tagline:
      "Window cleaning, pressure washing, solar panel cleaning, and permanent and seasonal lighting installation in Land O Lakes and the Tampa Bay area.",
    phone: "(813) 727-1148", // confirmed
    phoneHref: "tel:+18137271148", // confirmed
    email: "hoseandsqueegee@gmail.com", // confirmed
    streetAddress: "", // not given
    city: "Land O Lakes",
    region: "Land O Lakes & the Tampa Bay area", // derived from the real towns they listed as served
    state: "FL",
    postalCode: "34637", // VERIFY — not given
    latitude: 28.2214, // Land O Lakes, FL public coordinates (city-level, not company-specific) — VERIFY
    longitude: -82.4581,
    priceRange: "$$",
    foundedYear: "2023", // confirmed
    logoSrc: "/images/logo.png",
    // No schema.org type maps cleanly to this exact service mix (window
    // cleaning + pressure washing + holiday/permanent lighting).
    // HomeAndConstructionBusiness is the closest general fit; plain
    // LocalBusiness is the other reasonable fallback.
    schemaType: "HomeAndConstructionBusiness",
    socialLinks: {
      facebook: "https://www.facebook.com/hoseandsqueegee",
      instagram: undefined as string | undefined,
      youtube: undefined as string | undefined,
      tiktok: undefined as string | undefined,
      twitter: undefined as string | undefined,
      linkedin: undefined as string | undefined,
      pinterest: undefined as string | undefined,
    },
  },

  hero: {
    videoSrc: "/videos/hero.mp4",
    posterSrc: "/images/hero-poster.png",
    headline: "Window Cleaning & Exterior Solutions in Land O Lakes, FL.",
    subhead:
      "Window cleaning, pressure washing, and Govee LED and Christmas light installation — owner-operated, founded 2023.",
    ctaPrimary: { label: "Get a Free Quote", href: "/contact" },
    badges: ["Owner-Operated", "Founded 2023", "Free Quotes"],
    marqueeItems: [
      "Window Cleaning",
      "Pressure Washing",
      "Permanent LED Lighting",
      "Christmas Light Installation",
    ],
  },

  about: {
    eyebrow: "About",
    heading: "Windows, exteriors, and lighting — done right.",
    body: [
      "H & S Exterior Solutions is firefighter owned and operated.",
      "H & S Exterior Solutions provides window cleaning, pressure washing, and both permanent and seasonal lighting installation across Land O Lakes and the greater Tampa Bay area, founded in 2023.", // confirmed facts, combined
      "As an owner-operated local business, H & S offers one point of contact for exterior cleaning and lighting projects. Request a free quote for service at your Land O Lakes or Tampa Bay property.",
    ],
    stats: [
      { value: "2023", label: "Founded" }, // confirmed
      { value: "Tampa Bay", label: "Service Area" },
    ],
    owner: {
      name: "Michael Friedmann",
      role: "Owner & Local Firefighter",
      // Add Michael's photo to public/images, then set this to its path,
      // for example: "/images/michael-friedmann.jpg"
      imageSrc: "/images/michael-friedmann.jpg",
      heading: "Serving the community, on and off the job.",
      body: "Owner Michael Friedmann is a firefighter serving the local area. He brings that same commitment to service, care, and responsibility to every H & S Exterior Solutions project.",
    },
  },

  services: [
    {
      id: "window-cleaning",
      slug: "window-cleaning",
      number: "01",
      title: "Window Cleaning", // name inferred from the real short/long description — no explicit "Service 1 Name" was submitted
      h1: "Window Cleaning in Land O Lakes, FL",
      shortDescription: "Window cleaning, screen and frames.", // confirmed
      metaDescription:
        "Window cleaning in Land O Lakes, FL for glass, screens, frames, and solar panels. Call H & S Exterior Solutions for a free local Tampa Bay quote today.",
      description: [
        "Window cleaning, screens and frames, and solar panel cleaning.", // confirmed, their real long description verbatim
        "Service can be tailored to the glass and exterior features that need attention, including window glass, screens, frames, and solar panels. Request a quote based on the number, condition, and accessibility of the surfaces at your property.",
      ],
      process: [
        {
          step: "Request a quote",
          detail:
            "Share the property location and the windows, screens, frames, or solar panels you would like cleaned.",
        },
        {
          step: "Confirm the service scope",
          detail:
            "Review which surfaces need cleaning and any access considerations before work begins.",
        },
        {
          step: "Clean the selected surfaces",
          detail:
            "The agreed windows and exterior features are cleaned, followed by a visual check of the work area.",
        },
      ],
      costFactors: [
        "Number and size of windows or solar panels",
        "Ground-level versus elevated access",
        "Whether screens and frames are included",
        "Amount of dirt, residue, and buildup",
      ],
      signsYouNeedThis: [
        "Glass looks cloudy, streaked, or coated with outdoor residue",
        "Screens and frames have collected dust, pollen, or debris",
        "Solar panels have a visible layer of dirt or organic buildup",
      ],
      recentProject: null as RecentProject | null,
      faq: [] as { q: string; a: string }[],
      imageSrc: "/images/service-window-cleaning.jpg",
      imagePosition: "center 20%",
    },
    {
      id: "pressure-washing",
      slug: "pressure-washing",
      number: "02",
      title: "Pressure Washing", // confirmed
      h1: "Pressure Washing in Land O Lakes, FL",
      shortDescription:
        "Pressure washing for exterior surfaces at homes and properties across the Tampa Bay area.",
      metaDescription:
        "Pressure washing in Land O Lakes, FL from owner-operated H & S Exterior Solutions. Restore dirty outdoor surfaces—request your free local quote today.",
      description: [
        "H & S Exterior Solutions provides pressure washing in Land O Lakes and surrounding Tampa Bay communities.",
        "Because exterior materials and buildup vary, the surface should be reviewed before cleaning. Request a free quote to confirm whether pressure washing is appropriate for the area you want cleaned.",
      ],
      process: [
        {
          step: "Identify the cleaning area",
          detail:
            "Share photos or details about the exterior surface and the type of buildup you want removed.",
        },
        {
          step: "Review the surface",
          detail:
            "The material, access, and condition are considered before the service scope is confirmed.",
        },
        {
          step: "Complete the cleaning",
          detail:
            "The agreed exterior areas are pressure washed and the work area is visually checked afterward.",
        },
      ],
      costFactors: [
        "Total square footage",
        "Surface material and condition",
        "Level and type of dirt or organic buildup",
        "Access to the cleaning area and water source",
      ],
      signsYouNeedThis: [
        "Exterior surfaces have visible dirt, algae, or organic buildup",
        "Outdoor areas look dull or discolored compared with protected sections",
        "Routine rinsing no longer removes the accumulated grime",
      ],
      recentProject: null as RecentProject | null,
      faq: [] as { q: string; a: string }[],
      imageSrc: "/images/service-pressure-washing.jpg",
      imagePosition: "center",
    },
    {
      id: "govee-led-lighting",
      slug: "govee-led-lighting",
      number: "03",
      title: "Govee LED Permanent Light Installation", // confirmed
      h1: "Govee LED Permanent Light Installation in Land O Lakes, FL",
      shortDescription:
        "Professional installation of Govee permanent exterior LED lighting.",
      metaDescription:
        "Govee permanent LED light installation in Land O Lakes, FL by H & S Exterior Solutions. Plan year-round exterior lighting—request a free quote today.",
      description: [
        "H & S Exterior Solutions provides professional Govee permanent LED light installation in Land O Lakes and the Tampa Bay area.",
        "Permanent exterior lighting can remain in place beyond one season, reducing the need to repeatedly hang and remove temporary lights. Request a quote based on the roofline, desired coverage, and access at your property.",
      ],
      process: [
        {
          step: "Discuss the lighting plan",
          detail:
            "Identify the areas you want illuminated and the Govee lighting system planned for the property.",
        },
        {
          step: "Review layout and access",
          detail:
            "Confirm the intended coverage, mounting path, available power, and any roofline access considerations.",
        },
        {
          step: "Install the lighting",
          detail:
            "The permanent LED system is mounted along the agreed exterior areas and checked after installation.",
        },
      ],
      costFactors: [
        "Linear footage of the planned lighting run",
        "Roofline height, shape, and access",
        "Number of separate sections and power locations",
        "Condition of the intended mounting surfaces",
      ],
      signsYouNeedThis: [
        "You want exterior accent lighting that can stay installed year-round",
        "You want to avoid hanging and removing temporary lights every season",
        "Your roofline or trim makes a do-it-yourself installation difficult",
      ],
      recentProject: null as RecentProject | null,
      faq: [] as { q: string; a: string }[],
      imageSrc: "/images/service-govee-led.png",
      imagePosition: "center",
    },
    {
      id: "christmas-light-installation",
      slug: "christmas-light-installation",
      number: "04",
      title: "Christmas Light Installation", // confirmed
      h1: "Christmas Light Installation in Land O Lakes, FL",
      shortDescription:
        "Professional Christmas light installation and removal.", // confirmed, matches their long description
      metaDescription:
        "Christmas light installation and removal in Land O Lakes, FL by H & S Exterior Solutions. Skip the ladders and request your free seasonal lighting quote.",
      description: [
        "H & S Exterior Solutions provides professional Christmas light installation and removal in Land O Lakes and surrounding Tampa Bay communities.",
        "Professional installation helps property owners avoid ladders and time-consuming seasonal setup. Request a free quote to discuss the display area, roofline access, and installation and removal needs.",
      ],
      process: [
        {
          step: "Plan the display",
          detail:
            "Share the property details and the rooflines or exterior areas you want included in the Christmas light display.",
        },
        {
          step: "Confirm scope and access",
          detail:
            "Review the display coverage, installation access, power availability, and removal needs before scheduling.",
        },
        {
          step: "Install and remove",
          detail:
            "The agreed display is installed for the season and removed according to the confirmed service plan.",
        },
      ],
      costFactors: [
        "Linear footage and number of display areas",
        "Roof height, roofline shape, and installation access",
        "Display complexity and available power locations",
        "Installation and post-season removal requirements",
      ],
      signsYouNeedThis: [
        "You want a seasonal display without climbing ladders",
        "Your roofline is high, steep, or difficult to access",
        "You want installation and removal handled as one service",
      ],
      recentProject: null as RecentProject | null,
      faq: [] as { q: string; a: string }[],
      imageSrc: "/images/service-christmas-lights.jpg",
      imagePosition: "center",
    },
  ],

  // Land O Lakes is the confirmed home base. The other 5 entries come
  // from what was submitted in the "Neighborhoods" field — see the note
  // at the top of this file on why those became separate location pages
  // instead of nested neighborhoods. All 6 are real towns explicitly
  // named as served; none are guessed.
  locations: [
    {
      slug: "land-o-lakes",
      name: "Land O Lakes",
      state: "FL",
      h1: "Window Cleaning & Exterior Services in Land O Lakes, FL",
      metaDescription:
        "Exterior cleaning and lighting installation in Land O Lakes, FL. H & S Exterior Solutions offers window cleaning, pressure washing, and free quotes.",
      blurb:
        "H & S Exterior Solutions is based in Land O Lakes, offering window cleaning, pressure washing, and both permanent and seasonal lighting installation.",
      imageSrc: undefined as string | undefined,
      neighborhoods: [] as string[], // VERIFY — leave empty rather than invent actual neighborhood names within Land O Lakes
      localConditions: [
        "Florida humidity, pollen, rain, and airborne debris can leave recurring residue on windows and exterior surfaces.",
        "Year-round outdoor exposure can create visible organic buildup, making periodic exterior cleaning useful for maintaining curb appeal.",
      ],
      recentProject: null as RecentProject | null,
      testimonial: null as Testimonial | null,
    },
    {
      slug: "tampa",
      name: "Tampa",
      state: "FL",
      h1: "Window Cleaning & Exterior Services in Tampa, FL",
      metaDescription:
        "Exterior cleaning and lighting installation in Tampa, FL. Call H & S Exterior Solutions for window cleaning, pressure washing, lighting, and a free quote.",
      blurb:
        "H & S Exterior Solutions serves Tampa with window, screen, frame, and solar panel cleaning, pressure washing, Govee permanent LED installation, and Christmas light installation and removal.",
      imageSrc: undefined as string | undefined,
      neighborhoods: [] as string[],
      localConditions: [
        "Tampa's humid, rainy climate can contribute to recurring residue and organic buildup on outdoor surfaces.",
        "Pollen, dust, and storm debris can collect on glass, frames, screens, solar panels, and other exposed exterior areas.",
      ],
      recentProject: null as RecentProject | null,
      testimonial: null as Testimonial | null,
    },
    {
      slug: "lutz",
      name: "Lutz",
      state: "FL",
      h1: "Window Cleaning & Exterior Services in Lutz, FL",
      metaDescription:
        "Exterior cleaning and lighting installation in Lutz, FL. H & S Exterior Solutions offers window cleaning, pressure washing, lighting, and free quotes.",
      blurb:
        "H & S Exterior Solutions serves Lutz with window, screen, frame, and solar panel cleaning, pressure washing, Govee permanent LED installation, and seasonal Christmas light service.",
      imageSrc: undefined as string | undefined,
      neighborhoods: [] as string[],
      localConditions: [
        "Warm temperatures, humidity, pollen, and frequent rain can leave recurring buildup on Lutz windows and exterior surfaces.",
        "Periodic exterior cleaning can help remove visible grime from outdoor areas exposed throughout the year.",
      ],
      recentProject: null as RecentProject | null,
      testimonial: null as Testimonial | null,
    },
    {
      slug: "odessa",
      name: "Odessa",
      state: "FL",
      h1: "Window Cleaning & Exterior Services in Odessa, FL",
      metaDescription:
        "Exterior cleaning and lighting installation in Odessa, FL. H & S Exterior Solutions offers window cleaning, pressure washing, lighting, and free quotes.",
      blurb:
        "H & S Exterior Solutions serves Odessa with window, screen, frame, and solar panel cleaning, pressure washing, permanent Govee LED installation, and Christmas light installation and removal.",
      imageSrc: undefined as string | undefined,
      neighborhoods: [] as string[],
      localConditions: [
        "Odessa properties face year-round exposure to humidity, rain, pollen, dust, and windblown debris.",
        "Those conditions can leave visible residue on windows, solar panels, and other exterior surfaces over time.",
      ],
      recentProject: null as RecentProject | null,
      testimonial: null as Testimonial | null,
    },
    {
      slug: "trinity",
      name: "Trinity",
      state: "FL",
      h1: "Window Cleaning & Exterior Services in Trinity, FL",
      metaDescription:
        "Exterior cleaning and lighting installation in Trinity, FL. H & S Exterior Solutions offers window cleaning, pressure washing, lighting, and free quotes.",
      blurb:
        "H & S Exterior Solutions serves Trinity with window, screen, frame, and solar panel cleaning, pressure washing, permanent Govee LED installation, and seasonal Christmas light service.",
      imageSrc: undefined as string | undefined,
      neighborhoods: [] as string[],
      localConditions: [
        "Trinity's warm, humid weather can encourage recurring outdoor grime and organic buildup.",
        "Rain, pollen, and airborne debris can leave glass, screens, frames, solar panels, and exterior surfaces looking weathered.",
      ],
      recentProject: null as RecentProject | null,
      testimonial: null as Testimonial | null,
    },
    {
      slug: "wesley-chapel",
      name: "Wesley Chapel",
      state: "FL",
      h1: "Window Cleaning & Exterior Services in Wesley Chapel, FL",
      metaDescription:
        "Exterior cleaning and lighting installation in Wesley Chapel, FL. Call H & S Exterior Solutions for window cleaning, pressure washing, and a free quote.",
      blurb:
        "H & S Exterior Solutions serves Wesley Chapel with window, screen, frame, and solar panel cleaning, pressure washing, Govee permanent LED installation, and Christmas light installation and removal.",
      imageSrc: undefined as string | undefined,
      neighborhoods: [] as string[],
      localConditions: [
        "Wesley Chapel's heat, humidity, seasonal rain, and pollen can create recurring residue on exterior surfaces.",
        "Routine exterior cleaning can help address visible buildup on windows, solar panels, and outdoor areas exposed to the weather.",
      ],
      recentProject: null as RecentProject | null,
      testimonial: null as Testimonial | null,
    },
  ],

  fieldVideos: [] as { videoSrc: string; label: string }[],

  gallery: [
    {
      imageSrc: "/images/work-one.jpg",
      category: "LED Lighting",
      caption: "Permanent Govee LED exterior lighting installation",
    },
    {
      imageSrc: "/images/service-pressure-washing.jpg",
      category: "Pressure Washing",
      caption: "Exterior pressure washing in the Tampa Bay area",
    },
    {
      imageSrc: "/images/work-three.jpg",
      category: "Window Cleaning",
      caption: "Professional window cleaning in the Land O Lakes area",
    },
    {
      imageSrc: "/images/work-four.jpg",
      category: "Christmas Lights",
      caption: "Seasonal Christmas light installation and removal",
    },
  ],

  reviews: [
    {
      quote:
        "Outstanding outdoor lighting installation! Clean, professional work and beautiful results. Our home looks amazing at night, and Michael clearly knew what he was doing. Highly recommend.",
      author: "K P",
      rating: 5,
      source: "Google",
    },
    {
      quote:
        "Michael always does excellent work. He recently installed my new Govee lights and did a fantastic job, he’s detail-oriented, efficient, and gets the job done right. He’s also true to his word and always shows up when he says he will. Highly recommend!",
      author: "Josie Alvarez",
      rating: 5,
      source: "Google",
    },
    {
      quote:
        "Michael did a great job! He cleaned up my gutters & soffit before installing these lights. I’ve been debating getting these lights but I’m so glad I did!",
      author: "Beth Bluemke",
      rating: 5,
      source: "Google",
    },
    {
      quote:
        "Michael was very responsive, professional and dependable. He came right on time, got the job done and it looks great! I would highly recommend using him if you are looking to have your holiday lights hung the right way, right away!",
      author: "Timothy OToole",
      rating: 5,
      source: "Google",
    },
    {
      quote:
        "Highly recommend 10/10!!! Michael was punctual, extremely hard working, and very professional. He did all of our windows in our house and power washed our driveway and walkways. He did an amazing job. Haven’t seen them so clean since we moved in. Look no further, he’s your guy. I will be using his services from now on. Thank you!",
      author: "Quint Mojzak",
      rating: 5,
      source: "Google",
    },
    {
      quote:
        "Great price. Fantastic work!!! I cannot thank Michael enough—being a widow it’s hard to keep up the house alone… he’s so dependable and nice—he even fixed my outdoor electrical!!! Thank you again!",
      author: "Lisa Rudewicz",
      rating: 5,
      source: "Google",
    },
  ] as Review[],

  faq: [
    {
      q: "What areas do you serve?",
      a: "H & S Exterior Solutions serves Land O Lakes and the greater Tampa Bay area, including Tampa, Lutz, Odessa, Trinity, and Wesley Chapel.", // confirmed towns
    },
    {
      q: "How do I get a free quote?",
      a: "Contact via phone or email — (813) 727-1148, hoseandsqueegee@gmail.com.", // confirmed contact info
    },
    {
      q: "What exterior services does H & S Exterior Solutions offer?",
      a: "Services include window, screen, frame, and solar panel cleaning; pressure washing; professional Govee permanent LED light installation; and Christmas light installation and removal.",
    },
    {
      q: "Do you offer both permanent and seasonal exterior lighting?",
      a: "Yes. H & S Exterior Solutions installs Govee permanent LED lighting and also provides seasonal Christmas light installation and removal.",
    },
    {
      q: "Do you clean more than window glass?",
      a: "Yes. Window cleaning services can include glass, screens, and frames, and solar panel cleaning is also available. Confirm the exact surfaces you need when requesting a quote.",
    },
    {
      q: "Can I request pressure washing for my property?",
      a: "Yes. Describe the exterior area, surface material, access, and type of buildup when requesting a quote so H & S can confirm whether pressure washing is appropriate for the job.",
    },
    {
      q: "What affects the cost of exterior cleaning?",
      a: "Pricing depends on the service area, number and size of surfaces, material and condition, amount of buildup, and access. Contact H & S Exterior Solutions for a property-specific free quote.",
    },
    {
      q: "What affects the cost of exterior lighting installation?",
      a: "Lighting quotes can vary based on linear footage, roofline height and complexity, number of display sections, mounting access, power locations, and whether seasonal removal is included.",
    },
  ],

  quoteForm: {
    heading: "Tell us about your project.",
    subhead: "Send the details and we'll follow up. Free quotes.",
    serviceOptions: [
      "Window Cleaning",
      "Pressure Washing",
      "Govee LED Permanent Lighting",
      "Christmas Light Installation",
      "Other",
    ],
    sourceOptions: [
      "Google search",
      "Facebook",
      "Instagram",
      "Referral from a friend",
      "Saw a truck or sign",
      "Repeat customer",
      "Other",
    ],
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Locations", href: "/locations" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],

  ghl: {
    chatWidgetId: "",
    calendarId: "",
  },
};

export type SiteConfig = typeof siteConfig;
export type ServiceEntry = (typeof siteConfig.services)[number];
export type LocationEntry = (typeof siteConfig.locations)[number];
