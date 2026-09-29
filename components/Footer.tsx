"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, socialLinks, APP_NAME } from "@/lib/data";

const ICONS = { Github, Linkedin, Twitter, Mail } as const;

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const [year, setYear] = useState(2024);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const navT = (t.raw("nav") ?? {}) as Record<string, string>;

  const resolveHref = (href: string) => {
    if (href.startsWith("/")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]"
        >
          <div>
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-md"
            >
              {APP_NAME}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted-foreground)]">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
              {t("footer.quickLinksHeading")}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={resolveHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-md"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
              {t("footer.connectHeading")}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {socialLinks.map((social) => {
                const Icon = ICONS[social.icon];
                const isExternal = social.href.startsWith("http");
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-md"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted-foreground)] sm:flex-row">
          <p suppressHydrationWarning>
            {t("footer.rightsReserved", { year, name: APP_NAME })}
          </p>
          <p>{t("footer.builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}