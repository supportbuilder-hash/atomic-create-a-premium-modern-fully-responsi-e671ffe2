import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Rao Muhammad Ali",
  description:
    "Rao Muhammad Ali is a Software Development Engineer in Test at DaticsAI, testing web, mobile, and desktop applications through manual and automated approaches.",
};

interface Principle {
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    title: "Understand the user journey before writing test cases.",
    description:
      "I map out what someone is actually trying to accomplish before I touch a test plan. Test cases written without that context tend to check boxes instead of catching real problems.",
  },
  {
    title: "Test beyond the happy path.",
    description:
      "Most defects live in the paths nobody documented: interrupted flows, invalid input, back-button navigation, and edge cases that only show up when a real person gets impatient or distracted.",
  },
  {
    title: "Make every defect easy to reproduce.",
    description:
      "A bug report is only useful if someone else can act on it. I write clear steps, expected versus actual behavior, and evidence so developers spend their time fixing, not investigating.",
  },
  {
    title: "Automate stable, valuable regression paths — not everything blindly.",
    description:
      "Automation is worth the upkeep when a flow is stable and matters to the business. I'd rather have a smaller suite I trust than a large one everyone learns to ignore.",
  },
];

interface SkillGroup {
  heading: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    heading: "Automation",
    items: ["Playwright"],
  },
  {
    heading: "API and performance",
    items: ["Postman", "JMeter"],
  },
  {
    heading: "Testing",
    items: [
      "Manual testing",
      "Functional testing",
      "Regression testing",
      "Exploratory testing",
      "Usability testing",
      "Compatibility testing",
    ],
  },
  {
    heading: "Technical foundation",
    items: [
      "Front-end development knowledge",
      "Web application architecture",
      "Browser developer tools",
      "AI and agentic workflow fundamentals",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-20 md:px-8">
      <Reveal className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
          About
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl">
          About Rao Muhammad Ali
        </h1>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
          <p>
            I&apos;m a Software Development Engineer in Test, currently working at
            DaticsAI, where I test web, mobile, and desktop applications
            throughout the development lifecycle. My work sits at the
            intersection of manual investigation and automated coverage. I
            spend time understanding how a feature is supposed to behave, then
            I try to break it in ways the happy path never anticipated.
          </p>
          <p>
            Day to day, that means writing and executing manual and automated
            test scenarios, building and maintaining browser automation with
            Playwright, validating APIs and backend behavior with Postman, and
            running performance and load-testing exercises with JMeter in
            approved QA environments. I also spend a fair amount of time on
            regression coverage and defect investigation, making sure a fix in
            one place hasn&apos;t quietly broken something else.
          </p>
          <p>
            Before moving into QA, I worked with front-end development, and
            that background still shows up in how I test today. It helps me
            dig into UI problems with more precision, read through markup and
            console output when something looks off, and talk to developers in
            terms they don&apos;t need to translate. Most of what I do depends on
            close collaboration with developers and product stakeholders to
            clarify requirements early, before ambiguity turns into rework.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto mt-20 max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          How I Think About Quality
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
          These are the ideas I keep coming back to, regardless of what I&apos;m
          testing.
        </p>
        <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:border-[var(--primary)]/40"
            >
              <span className="text-2xl font-semibold text-[var(--primary)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-medium text-[var(--foreground)]">
                {principle.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {principle.description}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.12} className="mx-auto mt-20 max-w-5xl">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          Tools &amp; Skills
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
          Organized by how I actually use them, not as a wall of logos.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.heading}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
                {group.heading}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--muted-foreground)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.16} className="mx-auto mt-20 max-w-4xl border-t border-[var(--border)] pt-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
          Building something that needs careful testing?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--muted-foreground)]">
          Let&apos;s talk about how I can help make it more reliable.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-[var(--background)] shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Get in touch
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-md"
          >
            Back to home
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
