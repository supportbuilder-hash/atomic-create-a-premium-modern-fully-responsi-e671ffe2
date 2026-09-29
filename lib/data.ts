export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "Github" | "Linkedin" | "Twitter" | "Mail";
}

export const APP_NAME = "Rao Muhammad Ali";
export const APP_ROLE = "Software Development Engineer in Test";
export const APP_TAGLINE =
  "I test products from the user's perspective and the system's edge cases.";

// Single source of truth for site navigation. Only the homepage exists right
// now, so every entry besides "Home" points at an on-page section anchor.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "About", href: "#about", key: "about" },
  { label: "Expertise", href: "#expertise", key: "expertise" },
  { label: "Automation", href: "#automation", key: "automation" },
  { label: "Experience", href: "#experience", key: "experience" },
  { label: "Contact", href: "#contact", key: "contact" },
];

export const primaryCta: NavLink = {
  label: "Get in touch",
  href: "#contact",
  key: "contact",
};

// GitHub and LinkedIn URLs are placeholders until Rao supplies verified links.
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/REPLACE_WITH_VERIFIED_GITHUB",
    icon: "Github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/REPLACE_WITH_VERIFIED_LINKEDIN",
    icon: "Linkedin",
  },
  { label: "Email", href: "mailto:raomali005@gmail.com", icon: "Mail" },
];
