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
export const APP_ROLE = "Software Developer";
export const APP_TAGLINE =
  "Full-stack software developer building fast, reliable products.";

// Single source of truth for site navigation. Only the homepage exists right
// now, so every entry besides "Home" points at an on-page section anchor.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Work", href: "#featured-work", key: "work" },
  { label: "Skills", href: "#skills-snapshot", key: "skills" },
  { label: "Testimonials", href: "#testimonials", key: "testimonials" },
  { label: "Contact", href: "#cta", key: "contact" },
];

export const primaryCta: NavLink = {
  label: "Get in touch",
  href: "#cta",
  key: "contact",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/raomuhammadali", icon: "Github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/raomuhammadali", icon: "Linkedin" },
  { label: "Twitter", href: "https://twitter.com/raomuhammadali", icon: "Twitter" },
  { label: "Email", href: "mailto:hello@raomuhammadali.dev", icon: "Mail" },
];