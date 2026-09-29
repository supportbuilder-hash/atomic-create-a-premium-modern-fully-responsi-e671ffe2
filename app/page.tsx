"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Code2 as Github, Briefcase as Linkedin, Mail, Terminal, FileCode, GitBranch, Activity, Star, Sparkles, Layout, Download } from 'lucide-react';
type BRAND = any;
const BRAND: any = [];
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  image: string;
  size: "large" | "small";
}

const PROJECTS: Project[] = [
  {
    title: "TaskFlow",
    category: "Project Management SaaS",
    year: "2024",
    description:
      "A collaborative workspace for engineering teams to plan sprints, track issues, and ship on schedule, with real-time boards and automated status rollups.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "tRPC"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/375e1446280749be9bd8a7d75d0093b2.jpg",
    size: "large",
  },
  {
    title: "MediSync",
    category: "Healthcare Scheduling",
    year: "2023",
    description:
      "Appointment scheduling platform for multi-clinic healthcare providers with conflict-free calendar sync.",
    stack: ["React", "Node.js", "Redis"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c78333f46f154deb8b9b24ed05ea8947.jpg",
    size: "small",
  },
  {
    title: "DevMetrics",
    category: "Engineering Analytics",
    year: "2023",
    description:
      "A dashboard that turns raw CI/CD and pull request data into readable engineering velocity insights.",
    stack: ["Next.js", "GraphQL", "Docker"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/bc23ef79a08d45f2a96f22b116c37b62.png",
    size: "small",
  },
  {
    title: "ShopWave",
    category: "Headless Commerce",
    year: "2022",
    description:
      "Composable storefront built on a headless commerce stack, tuned for sub-second page loads at scale.",
    stack: ["Next.js", "AWS", "Tailwind CSS"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/17cbc916c88445518da10c23ebecbb3a.jpg",
    size: "small",
  },
];

const SKILL_GROUPS: { group: string; items: string[]; icon: typeof Terminal }[] = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    icon: Layout,
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "GraphQL", "tRPC", "REST APIs"],
    icon: Terminal,
  },
  {
    group: "Data & Infra",
    items: ["PostgreSQL", "Redis", "Docker", "AWS", "CI/CD"],
    icon: Activity,
  },
  {
    group: "Practices",
    items: ["Testing", "Code Review", "Agile Delivery", "System Design"],
    icon: GitBranch,
  },
];

const TESTIMONIALS: { name: string; role: string; quote: string }[] = [
  {
    name: "Ayesha Khan",
    role: "Product Manager, prior collaborator",
    quote:
      "Ali translates fuzzy requirements into clean, working software faster than anyone I've worked with. He asks the right questions before writing a single line of code.",
  },
  {
    name: "Daniyal Ahmed",
    role: "Engineering Lead, prior collaborator",
    quote:
      "What stood out was the attention to detail in code reviews and how readable his pull requests were. Onboarding a new engineer onto his codebase was painless.",
  },
  {
    name: "Sara Malik",
    role: "Founder, early-stage startup client",
    quote:
      "We needed someone who could own the stack end to end. Ali shipped our MVP, kept it stable under real traffic, and documented everything along the way.",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLarge = project.size === "large";
  return (
    <Reveal delay={index * 0.08} className={isLarge ? "md:col-span-2 md:row-span-2" : ""}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-[var(--card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.2)]"
      >
        <div className={`relative w-full overflow-hidden ${isLarge ? "aspect-[16/10]" : "aspect-[16/11]"}`}>
          <img
            src={project.image}
            alt={`${project.title} product screenshot`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {project.year}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                {project.category}
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                {project.title}
              </h3>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="mt-1 h-5 w-5 shrink-0 text-[var(--muted-foreground)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-500"
            />
          </div>
          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-black/5 bg-black/[0.03] px-2.5 py-1 text-xs font-medium text-[var(--foreground)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function HomePage() {
  return (
    <main className="bg-[var(--background)]">
      {/* HERO */}
      <Reveal>
        <section className="relative overflow-hidden border-b border-black/5 px-6 pb-20 pt-28 sm:px-10 md:pt-36 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-indigo-500/10 blur-3xl"
          />
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-sm font-medium text-[var(--foreground)]"
              >
                <Sparkles aria-hidden="true" className="h-4 w-4 text-indigo-500" />
                Available for new projects
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="mt-6 text-balance text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl"
              >
                {BRAND.name}, a software developer who ships products, not prototypes
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]"
              >
                I design and build web applications end to end, from data models
                to pixel-level polish, focused on speed, reliability, and code
                that the next engineer can actually read.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_-8px_rgba(79,70,229,0.5)] transition-all duration-300 hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  View my work
                  <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[var(--card)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <Download aria-hidden="true" className="h-4 w-4" />
                  Download resume
                </a>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex items-center gap-5 text-[var(--muted-foreground)]"
              >
                <a href="https://github.com" aria-label="GitHub profile" className="transition-colors duration-300 hover:text-indigo-500">
                  <Github aria-hidden="true" className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn profile" className="transition-colors duration-300 hover:text-indigo-500">
                  <Linkedin aria-hidden="true" className="h-5 w-5" />
                </a>
                <a href="mailto:hello@raoali.dev" aria-label="Send an email" className="transition-colors duration-300 hover:text-indigo-500">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#0d1117] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_24px_48px_-16px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <span className="h-3 w-3 rounded-full bg-green-400/70" />
                  <span className="ml-3 flex items-center gap-1.5 text-xs font-medium text-white/50">
                    <FileCode aria-hidden="true" className="h-3.5 w-3.5" />
                    developer.ts
                  </span>
                </div>
                <pre className="overflow-x-auto p-6 text-sm leading-relaxed text-white/90">
                  <code>
                    <span className="text-indigo-300">const</span> developer = {"{"}
                    {"\n"}  name: <span className="text-emerald-300">&quot;Rao Muhammad Ali&quot;</span>,
                    {"\n"}  role: <span className="text-emerald-300">&quot;Software Developer&quot;</span>,
                    {"\n"}  stack: [<span className="text-emerald-300">&quot;TypeScript&quot;</span>, <span className="text-emerald-300">&quot;Next.js&quot;</span>, <span className="text-emerald-300">&quot;Node.js&quot;</span>],
                    {"\n"}  focus: <span className="text-emerald-300">&quot;scalable, maintainable products&quot;</span>,
                    {"\n"}  available: <span className="text-indigo-300">true</span>,
                    {"\n"}{"}"};
                  </code>
                </pre>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--card)] px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
                <div className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                  <Terminal aria-hidden="true" className="h-4 w-4 text-indigo-500" />
                  Clean commits, readable diffs
                </div>
                <span className="text-xs font-medium text-[var(--muted-foreground)]">main ✓</span>
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ABOUT / VALUE PROPS */}
      <section id="about" className="border-b border-black/5 bg-black/[0.02] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
              How I work
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Software that holds up after launch day
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]">
              I care as much about what happens six months after ship as I do
              about the demo. That means thoughtful architecture, tests where
              they matter, and documentation the next person can actually use.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Layout,
                title: "Product-minded engineering",
                body: "I work closely with design and product to turn requirements into interfaces people enjoy using, not just interfaces that technically work.",
              },
              {
                icon: GitBranch,
                title: "Maintainable by design",
                body: "Typed, tested, and structured so a teammate can open the repo cold and understand the system within an hour.",
              },
              {
                icon: Activity,
                title: "Built for real traffic",
                body: "From database indexing to caching strategy, I plan for the load the product will actually see, not just the demo path.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-black/5 bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_16px_32px_-8px_rgba(0,0,0,0.16)]">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                    <item.icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                Selected work
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Products I&apos;ve designed and built
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--muted-foreground)]">
              A mix of SaaS platforms, internal tools, and consumer-facing
              storefronts, spanning early prototypes to production systems.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-y border-black/5 bg-black/[0.02] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
              Toolkit
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              The stack I reach for
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]">
              A pragmatic set of tools chosen for reliability and developer
              velocity, not novelty.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_GROUPS.map((group, i) => (
              <Reveal key={group.group} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-black/5 bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                    <group.icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
                    {group.group}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {group.items.map((skill) => (
                      <li key={skill} className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
              What people say
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Feedback from collaborators
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-2xl border border-black/5 bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)]">
                  <div className="flex gap-1 text-indigo-500" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[var(--foreground)]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-black/5 pt-4">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{testimonial.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{testimonial.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-black/5 bg-[#0d1117] px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">
            Let&apos;s build something
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Have a project in mind? Let&apos;s talk about it.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/70">
            Whether it&apos;s a new product, a stalled codebase, or a team that
            needs an extra pair of hands, I&apos;m happy to hear the details.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@raoali.dev"
              className="group inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_-8px_rgba(79,70,229,0.5)] transition-all duration-300 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              hello@raoali.dev
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center gap-5 text-white/60">
              <a href="https://github.com" aria-label="GitHub profile" className="transition-colors duration-300 hover:text-white">
                <Github aria-hidden="true" className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn profile" className="transition-colors duration-300 hover:text-white">
                <Linkedin aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}