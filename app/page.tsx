"use client";

import { useEffect, useMemo, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Code2 as Github, Briefcase as Linkedin, Mail, Terminal, Activity, GitBranch, Layout, Download, Sparkles, CheckCircle2, AlertTriangle, Clock, Phone, MapPin, FileText, Bug, Shield, CreditCard, Fingerprint, Lock, Cloud, MessageSquare, Cpu, ShieldCheck, RefreshCcw, Smartphone } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { socialLinks } from "@/lib/data";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ExpertiseArea {
  title: string;
  description: string;
}

const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    title: "Functional testing",
    description:
      "I verify each feature does what the requirements say, checking inputs, outputs, and edge conditions before it reaches a user.",
  },
  {
    title: "Regression testing",
    description:
      "Before a release, I re-check the areas most likely to break from recent changes, mixing automated coverage with targeted manual passes.",
  },
  {
    title: "Exploratory testing",
    description:
      "I investigate how real users may behave beyond the documented happy path, including incomplete actions, unexpected navigation, invalid data, and interrupted workflows.",
  },
  {
    title: "UI and usability testing",
    description:
      "I look at layout, feedback states, and flow from a user's point of view, flagging anything confusing or inconsistent across screens.",
  },
  {
    title: "API testing",
    description:
      "I validate request and response contracts, status codes, auth headers, and error handling directly against the backend using Postman.",
  },
  {
    title: "Browser automation",
    description:
      "I write Playwright scripts for the flows that matter most, keeping selectors stable and assertions meaningful rather than brittle.",
  },
  {
    title: "Performance and load testing",
    description:
      "I use JMeter in approved QA environments to see how a system behaves under concurrent load before it becomes a production surprise.",
  },
  {
    title: "Cross-browser and compatibility testing",
    description:
      "I check core flows across browsers, devices, and screen sizes so a fix in one environment doesn't quietly break another.",
  },
  {
    title: "Defect reporting and verification",
    description:
      "I write reports with clear reproduction steps, evidence, expected versus actual behavior, then re-verify once a fix ships.",
  },
  {
    title: "Requirements and user-flow analysis",
    description:
      "I read requirements looking for gaps and ambiguity first, because most bugs I prevent never get written into the product at all.",
  },
];

interface CaseStudy {
  id: string;
  fileId: string;
  name: string;
  url: string;
  context: string;
  challenge: string;
  responsibility: string;
  approach: string;
  scenarios: string[];
  tools: string[];
  learned: string;
  roadmap?: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "atomic-builder",
    fileId: "QA-001",
    name: "Atomic Builder",
    url: "https://builder.hotcode.ai/",
    context:
      "An AI-powered product that generates and manages websites from user prompts, spanning authentication, project creation, and generation states.",
    challenge:
      "Generation-based products introduce unpredictable timing, partial states, and edge cases that are hard to script for in advance.",
    responsibility:
      "I test the multi-step user journey end to end, from sign-in through project creation to the generated output.",
    approach:
      "I combine exploratory sessions around generation states with structured checks on validation, error handling, loading behavior, and responsiveness across breakpoints.",
    scenarios: [
      "Interrupted or slow generation runs and how the UI recovers",
      "Invalid or edge-case prompts and their error messaging",
      "Session and auth edge cases across multi-step flows",
      "Regression risk when new generation features ship",
    ],
    tools: ["Manual exploratory testing", "Playwright", "Browser dev tools"],
    learned:
      "Working on this product sharpened how I think about testing asynchronous, state-heavy interfaces where the same action can resolve differently each time.",
  },
  {
    id: "veridatai",
    fileId: "QA-002",
    name: "VeridatAI",
    url: "https://veridat-demo.daticsai.com/",
    context:
      "A platform handling identity and KYC-related workflows, including document upload, verification steps, and role-based access.",
    challenge:
      "Sensitive workflows demand careful negative testing since the cost of an overlooked edge case is higher than in typical features.",
    responsibility:
      "I test document handling, validation behavior, and access control across different roles and permission levels.",
    approach:
      "I focus heavily on negative scenarios: malformed documents, unauthorized access attempts, boundary conditions on validation rules, and encryption-related behavior where applicable.",
    scenarios: [
      "Role-based access boundaries between user tiers",
      "Document upload validation and rejection handling",
      "Usability of verification steps for non-technical users",
      "Negative paths around identity data handling",
    ],
    tools: ["Manual testing", "Postman", "Browser dev tools"],
    learned:
      "This work reinforced why I treat negative and boundary testing as first-class, not an afterthought, especially with identity-sensitive data.",
  },
  {
    id: "qa-assistant",
    fileId: "QA-003",
    name: "QA Assistant",
    url: "",
    context:
      "My own evolving AI-assisted QA prototype, built to explore how language models can support day-to-day testing work.",
    challenge:
      "Turning a general-purpose LLM into something that reliably produces structured, useful QA guidance rather than generic text.",
    responsibility:
      "I designed and continue to iterate on this project as a personal experiment, not a production tool.",
    approach:
      "The working core accepts QA-related requests, such as 'write test cases for this login form,' and returns structured QA guidance through prompt design and response formatting.",
    scenarios: [
      "Generating structured test case drafts from plain-language requests",
      "Formatting responses consistently for QA use",
      "Handling ambiguous or incomplete requests gracefully",
    ],
    tools: ["LLM prompting", "Front-end development"],
    learned:
      "Building this taught me where AI genuinely speeds up QA work and where it still needs a human reviewing the output closely.",
    roadmap: [
      "Full retrieval-augmented generation (RAG) over real project documentation",
      "Database persistence for QA history and reusable test data",
      "Browser execution triggered directly from generated scenarios",
      "Multi-agent collaboration between planning and execution roles",
      "Production deployment beyond the current prototype",
    ],
  },
  {
    id: "library-management",
    fileId: "DEV-004",
    name: "Library Management System",
    url: "",
    context:
      "An academic full-stack project: a library system with authentication, admin access, and book issue/return workflows.",
    challenge:
      "As a development project rather than a professional QA engagement, the challenge was building correct behavior first, then verifying it.",
    responsibility:
      "I built and tested the application myself, covering both the admin and member-facing sides.",
    approach:
      "I manually tested authentication, book management, issue/return logic, fine calculation, due dates, and database synchronization as features were completed.",
    scenarios: [
      "Admin permissions versus member permissions",
      "Overdue fine calculation accuracy",
      "Book availability state after issue and return",
      "Data consistency between UI actions and the database",
    ],
    tools: ["Manual testing", "SQL checks"],
    learned:
      "Building and testing the same system myself gave me a clearer sense of how development decisions create testing blind spots later.",
  },
];

interface SystemNode {
  id: string;
  label: string;
  icon: typeof Shield;
  risks: string[];
  perspective: string;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: "auth",
    label: "Authentication",
    icon: Lock,
    risks: ["Session expiry edge cases", "Weak lockout handling", "Token reuse after logout"],
    perspective:
      "I check session lifecycle closely: what happens on expiry, concurrent logins, and password reset flows under bad input.",
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    risks: ["Duplicate charges on retry", "Currency rounding errors", "Failed payment states left unclear"],
    perspective:
      "I test failure paths as hard as success paths here. A payment that fails silently is worse than one that fails loudly.",
  },
  {
    id: "kyc",
    label: "KYC verification",
    icon: Fingerprint,
    risks: ["Malformed document uploads", "Inconsistent status after rejection", "Unclear resubmission flow"],
    perspective:
      "I focus on negative scenarios: bad documents, interrupted uploads, and whether rejected states are communicated clearly.",
  },
  {
    id: "rbac",
    label: "Role-based access",
    icon: ShieldCheck,
    risks: ["Privilege boundary leaks", "Stale permissions after role change", "UI showing actions the role can't perform"],
    perspective:
      "I map every role's boundaries explicitly, then try to cross them, not just confirm the intended path works.",
  },
  {
    id: "cloud-files",
    label: "Cloud file imports",
    icon: Cloud,
    risks: ["Large file timeouts", "Partial or corrupted imports", "Permission mismatches on source accounts"],
    perspective:
      "I test with awkward files: oversized, wrong format, and interrupted mid-transfer, not just the clean happy-path file.",
  },
  {
    id: "chat",
    label: "Real-time chat",
    icon: MessageSquare,
    risks: ["Message ordering under latency", "Reconnect losing state", "Delivery status inaccuracies"],
    perspective:
      "I test with deliberately poor network conditions to see how ordering and delivery status hold up under stress.",
  },
  {
    id: "ai-content",
    label: "AI-generated content",
    icon: Cpu,
    risks: ["Inconsistent output on identical prompts", "Unclear loading and failure states", "Content that silently fails validation"],
    perspective:
      "Since output isn't deterministic, I test the surrounding experience: loading states, retries, and how failures are surfaced.",
  },
  {
    id: "validation",
    label: "Data validation",
    icon: CheckCircle2,
    risks: ["Client-only validation bypassed via API", "Inconsistent error messaging", "Boundary values accepted incorrectly"],
    perspective:
      "I always test validation at the API layer directly, not just through the form, since client checks can be bypassed.",
  },
  {
    id: "error-recovery",
    label: "Error recovery",
    icon: RefreshCcw,
    risks: ["Retries duplicating actions", "Lost user input after a crash", "Unclear next steps after failure"],
    perspective:
      "I check whether a user can recover gracefully after something breaks, not just whether the error is logged.",
  },
  {
    id: "cross-platform",
    label: "Cross-platform behavior",
    icon: Smartphone,
    risks: ["Layout breaks on smaller viewports", "Touch versus pointer input differences", "Feature gaps between platforms"],
    perspective:
      "I walk core flows on web, mobile, and desktop separately, since parity issues usually hide in the details, not the main path.",
  },
];

const AUTOMATION_STEPS: { label: string; icon: typeof Terminal }[] = [
  { label: "Requirement", icon: FileText },
  { label: "Test scenario", icon: Layout },
  { label: "Playwright script", icon: Terminal },
  { label: "Browser execution", icon: Activity },
  { label: "Assertion", icon: CheckCircle2 },
  { label: "Report", icon: Bug },
  { label: "Regression coverage", icon: GitBranch },
];

const AUTOMATION_CARDS = [
  {
    title: "Playwright automation",
    description: "Browser scripts for the flows that carry the most release risk if they silently break.",
    icon: Terminal,
  },
  {
    title: "API validation with Postman",
    description: "Contract checks on requests, responses, status codes, and auth headers against the backend directly.",
    icon: Activity,
  },
  {
    title: "JMeter performance testing",
    description: "Load exercises in approved QA environments to see how a system behaves under concurrent use.",
    icon: Cpu,
  },
  {
    title: "Regression suite design",
    description: "Deciding what's worth automating and what still needs a human pass before each release.",
    icon: GitBranch,
  },
  {
    title: "Reusable test data and structure",
    description: "Keeping fixtures and scripts organized so a script written today still makes sense in six months.",
    icon: Layout,
  },
  {
    title: "Failure evidence and reporting",
    description: "Screenshots, logs, and clear repro steps attached to every reported defect.",
    icon: Bug,
  },
];

interface DemoCheck {
  id: string;
  name: string;
  status: "Queued" | "Running" | "Passed" | "Needs Review";
}

const DEMO_CHECKS: DemoCheck[] = [
  { id: "chk-01", name: "Login with valid credentials", status: "Passed" },
  { id: "chk-02", name: "Login with expired session token", status: "Needs Review" },
  { id: "chk-03", name: "API returns 400 on malformed payload", status: "Running" },
  { id: "chk-04", name: "File import over 200MB", status: "Queued" },
  { id: "chk-05", name: "Role downgrade mid-session", status: "Queued" },
];

const STATUS_STYLES: Record<DemoCheck["status"], string> = {
  Queued: "text-[var(--muted-foreground)] border-[var(--muted-foreground)]/30 bg-[var(--muted-foreground)]/5",
  Running: "text-[var(--primary)] border-[var(--primary)]/40 bg-[var(--primary)]/10",
  Passed: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  "Needs Review": "text-amber-400 border-amber-400/40 bg-amber-400/10",
};

interface TimelineItem {
  text: string;
}

const EXPERIENCE_ITEMS: TimelineItem[] = [
  { text: "Test web, mobile, and desktop applications throughout the development lifecycle." },
  { text: "Design and execute manual and automated test scenarios." },
  { text: "Build and maintain Playwright browser automation." },
  { text: "Validate APIs and backend behavior using Postman." },
  { text: "Perform performance and load-testing exercises with JMeter in approved QA environments." },
  { text: "Investigate defects and document reproducible steps, evidence, expected behavior, and actual behavior." },
  { text: "Verify fixes and execute regression testing before releases." },
  { text: "Collaborate with developers and product stakeholders to clarify requirements and reduce release risk." },
  { text: "Test complex workflows involving authentication, role-based access, payments, KYC verification, cloud file imports, encryption-related behavior, real-time chat, and AI-generated content." },
];

const PRINCIPLES = [
  {
    title: "Understand the user journey before writing test cases.",
    text: "I map how someone actually moves through a feature before I decide what to test, otherwise I'm just testing my assumptions.",
  },
  {
    title: "Test beyond the happy path.",
    text: "The happy path usually works. I spend more time on what happens when a step is skipped, retried, or done out of order.",
  },
  {
    title: "Make every defect easy to reproduce.",
    text: "A bug report nobody can reproduce doesn't get fixed. I write steps, evidence, and expected versus actual behavior every time.",
  },
  {
    title: "Automate stable, valuable regression paths, not everything blindly.",
    text: "I automate what's stable and worth repeating. Chasing 100% automation on unstable flows wastes more time than it saves.",
  },
];

const SKILL_GROUPS = [
  { heading: "Automation", items: ["Playwright"] },
  { heading: "API and performance", items: ["Postman", "JMeter"] },
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

const CONTACT_REASONS = [
  "QA / SDET opportunity",
  "Freelance or contract testing",
  "Collaboration on a project",
  "General question",
];

const PLAYWRIGHT_SNIPPET = `import { test, expect } from '@playwright/test';

test('user can reset password with a valid link', async ({ page }) => {
  await page.goto('/reset-password?token=valid-demo-token');

  await page.getByLabel('New password').fill('N3wPassw0rd!');
  await page.getByLabel('Confirm password').fill('N3wPassw0rd!');
  await page.getByRole('button', { name: 'Update password' }).click();

  await expect(page.getByText('Password updated')).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
});`;

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
      {children}
    </p>
  );
}

function GlassCube() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: relY * -14, y: relX * 18 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const layers: { label: string; verified: boolean }[] = [
    { label: "UI", verified: true },
    { label: "API", verified: true },
    { label: "Database", verified: false },
    { label: "Performance", verified: true },
    { label: "Security", verified: false },
    { label: "Automation", verified: true },
  ];

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <div
        className="relative h-64 w-64 shrink-0 [perspective:900px] sm:h-72 sm:w-72"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label="A layered glass cube representing software quality layers: UI, API, database, performance, security, and automation."
      >
        <motion.div
          className="relative h-full w-full rounded-2xl border border-[var(--primary)]/25 bg-gradient-to-br from-white/[0.04] to-transparent"
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {layers.map((layer, index) => (
            <div
              key={layer.label}
              className={`absolute inset-x-4 flex items-center justify-between rounded-lg border px-3 py-2 text-[11px] font-medium uppercase tracking-wide backdrop-blur-sm transition-colors duration-500 ${
                layer.verified
                  ? "border-[var(--primary)]/40 bg-[var(--primary)]/10 text-[var(--primary)]"
                  : "border-amber-400/40 bg-amber-400/10 text-amber-300"
              }`}
              style={{
                top: `${10 + index * 15}%`,
                transform: `translateZ(${index * 6}px) skewX(-2deg)`,
              }}
            >
              <span>{layer.label}</span>
              {layer.verified ? (
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </div>
          ))}
          <div className="absolute inset-0 rounded-2xl border border-white/5" />
        </motion.div>
      </div>
      <div className="max-w-[14rem] text-center sm:text-left">
        <p className="font-[family-name:var(--font-display)] text-sm font-medium leading-snug text-[var(--foreground)]">
          "Testing beyond the happy path."
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
          Move your cursor over the cube. Verified layers stay teal, layers still under review glow amber.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  const [activeExpertise, setActiveExpertise] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [demoStatuses, setDemoStatuses] = useState<DemoCheck[]>(DEMO_CHECKS);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDemoStatuses((prev) =>
        prev.map((check) => {
          if (check.status === "Queued" && Math.random() > 0.6) {
            return { ...check, status: "Running" };
          }
          if (check.status === "Running" && Math.random() > 0.5) {
            return { ...check, status: Math.random() > 0.75 ? "Needs Review" : "Passed" };
          }
          return check;
        })
      );
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    reason: CONTACT_REASONS[0],
    message: "",
    honeypot: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const activeSystemNode = useMemo(
    () => SYSTEM_NODES.find((node) => node.id === activeNode) ?? null,
    [activeNode]
  );

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) errors.name = "Please enter your name.";
    if (!formState.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "That email address doesn't look right.";
    }
    if (!formState.message.trim()) errors.message = "Let me know a bit about what you need.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.honeypot) return; // silent spam trap
    if (!validateForm()) return;
    setFormStatus("submitting");
    window.setTimeout(() => {
      setFormStatus("success");
    }, 900);
  };

  const activeExpertiseArea = EXPERTISE_AREAS[activeExpertise] ?? EXPERTISE_AREAS[0];

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="home" className="relative overflow-hidden border-b border-[var(--border)]/10 px-6 py-24 md:px-8 md:py-32">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_20%,rgba(94,234,212,0.08),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)]/15 bg-white/[0.03] px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)]/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
              </span>
              <span className="text-xs font-medium text-[var(--muted-foreground)]">Currently testing at DaticsAI</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl"
            >
              Rao Muhammad Ali
            </motion.h1>
            <motion.p variants={fadeInUp} className="mt-2 text-lg font-medium text-[var(--primary)] sm:text-xl">
              Software Development Engineer in Test
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-xl text-balance text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg"
            >
              I test products from the user's perspective and the system's edge cases, turning unclear behavior into
              reproducible bugs, reliable automated checks, and better releases.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(94,234,212,0.4)] transition-all duration-300 ease-out hover:brightness-110 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                View My Work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)]/20 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--primary)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                Download Résumé
                <Download className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-5">
              {socialLinks.map((social) => {
                const Icon = social.icon === "Github" ? Github : social.icon === "Linkedin" ? Linkedin : Mail;
                const isExternal = social.href.startsWith("http");
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-md"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {social.label}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="flex justify-center md:justify-end"
          >
            <GlassCube />
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* About                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section id="about" className="border-b border-[var(--border)]/10 bg-white/[0.015] px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionEyebrow>About</SectionEyebrow>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-[0.85fr_1fr]">
            <Reveal>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance text-[var(--foreground)] sm:text-4xl">
                A practical quality engineer, not just a bug counter.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-[var(--muted-foreground)]">
                <p>
                  I currently work at <span className="text-[var(--foreground)]">DaticsAI</span>, testing web, mobile, and
                  desktop applications. Most days involve a mix of manual testing, Playwright automation, API checks
                  against real backends, and occasional performance runs when a feature needs to prove it can handle
                  load.
                </p>
                <p>
                  I spend a lot of time on regression coverage and defect investigation, which usually means
                  reproducing an issue three or four different ways before writing it up, so the developer doesn't
                  have to guess. Collaboration with developers and product stakeholders is a constant part of the
                  job, mostly clarifying requirements before they turn into ambiguous test cases.
                </p>
                <p>
                  My earlier front-end development background still helps. When I report a UI defect, I can point to
                  roughly where in the component it likely breaks, which speeds up the conversation with the dev
                  team considerably.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Expertise                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section id="expertise" className="border-b border-[var(--border)]/10 px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionEyebrow>Expertise</SectionEyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance text-[var(--foreground)] sm:text-4xl">
              Testing matrix
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
              Select an area to see how I actually approach it, not a textbook definition of it.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[0.85fr_1fr]">
              <div
                role="tablist"
                aria-label="Testing expertise areas"
                className="grid grid-cols-2 gap-2 sm:grid-cols-2"
              >
                {EXPERTISE_AREAS.map((area, index) => (
                  <button
                    key={area.title}
                    role="tab"
                    type="button"
                    aria-selected={activeExpertise === index}
                    onClick={() => setActiveExpertise(index)}
                    className={`rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                      activeExpertise === index
                        ? "border-[var(--primary)]/50 bg-[var(--primary)]/10 text-[var(--primary)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(94,234,212,0.25)]"
                        : "border-[var(--border)]/10 bg-white/[0.02] text-[var(--muted-foreground)] hover:border-[var(--border)]/25 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {area.title}
                  </button>
                ))}
              </div>

              <div
                role="tabpanel"
                className="rounded-2xl border border-[var(--border)]/10 bg-white/[0.02] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--foreground)]">
                  {activeExpertiseArea?.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
                  {activeExpertiseArea?.description}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Automation laboratory                                               */}
      {/* ------------------------------------------------------------------ */}
      <section id="automation" className="border-b border-[var(--border)]/10 bg-white/[0.015] px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionEyebrow>Automation</SectionEyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance text-[var(--foreground)] sm:text-4xl">
              The automation laboratory
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
              How a requirement becomes a stable, repeatable check in the regression suite.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 overflow-x-auto pb-2">
              <div className="flex min-w-[720px] items-center justify-between gap-1">
                {AUTOMATION_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex flex-1 items-center">
                      <div className="flex flex-1 flex-col items-center gap-2 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-medium text-[var(--muted-foreground)]">{step.label}</span>
                      </div>
                      {index < AUTOMATION_STEPS.length - 1 && (
                        <div className="mb-6 h-px flex-1 bg-gradient-to-r from-[var(--primary)]/40 to-[var(--primary)]/10" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-[var(--border)]/10 bg-[#0d1117] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 font-mono text-xs text-[var(--muted-foreground)]">reset-password.spec.ts</span>
                </div>
                <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
                  <code className="font-mono text-[var(--foreground)]/90">{PLAYWRIGHT_SNIPPET}</code>
                </pre>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--border)]/10 bg-white/[0.02] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
                    Test-run panel
                  </h3>
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                    Interactive demonstration — not live data
                  </span>
                </div>
                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {demoStatuses.map((check) => (
                    <li
                      key={check.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)]/10 bg-white/[0.015] px-3.5 py-2.5"
                    >
                      <span className="text-sm text-[var(--foreground)]/90">{check.name}</span>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[check.status]}`}
                      >
                        {check.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUTOMATION_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={(index % 3) * 0.06}>
                  <div className="group h-full rounded-2xl border border-[var(--border)]/10 bg-white/[0.02] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--primary)]/25 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-10px_rgba(94,234,212,0.2)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)]/15 bg-[var(--primary)]/10 text-[var(--primary)] transition-colors duration-300 group-hover:border-[var(--primary)]/40">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{card.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Experience                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section id="experience" className="border-b border-[var(--border)]/10 px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionEyebrow>Experience</SectionEyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance text-[var(--foreground)] sm:text-4xl">
              Software Development Engineer in Test — DaticsAI
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            {EXPERIENCE_ITEMS.map((item, index) => (
              <Reveal key={item.text} delay={(index % 2) * 0.08}>
                <div className="flex gap-4 rounded-xl border border-[var(--border)]/10 bg-white/[0.015] p-5 transition-colors duration-300 hover:border-[var(--primary)]/25">
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Case studies                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section id="projects" className="border-b border-[var(--border)]/10 bg-white/[0.015] px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionEyebrow>Case studies</SectionEyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance text-[var(--foreground)] sm:text-4xl">
              Investigation files
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
              Real products I have tested, and one prototype I am still building.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8">
            {CASE_STUDIES.map((study, index) => (
              <Reveal key={study.id} delay={(index % 2) * 0.08}>
                <article className="overflow-hidden rounded-2xl border border-[var(--border)]/10 bg-white/[0.02] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-10px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--primary)]/20">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)]/10 bg-white/[0.02] px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="rounded-md border border-[var(--border)]/15 bg-white/[0.03] px-2 py-1 font-mono text-[11px] font-semibold tracking-wide text-[var(--primary)]">
                        {study.fileId}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                        {study.name}
                      </h3>
                    </div>
                    {study.url ? (
                      <a
                        href={study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--primary)]"
                      >
                        {study.url.replace(/^https?:\/\//, "")}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="rounded-full border border-[var(--border)]/15 bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-[var(--muted-foreground)]">
                        In progress
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_1fr] md:p-8">
                    <div className="space-y-5">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]">Product context</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--foreground)]/90">{study.context}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]">Quality challenge</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted-foreground)]">{study.challenge}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]">Rao's responsibility</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted-foreground)]">{study.responsibility}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]">Testing approach</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted-foreground)]">{study.approach}</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]">Important scenarios</p>
                        <ul className="mt-2 space-y-1.5">
                          {study.scenarios.map((scenario) => (
                            <li key={scenario} className="flex gap-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                              <Bug className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                              {scenario}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]">Tools used</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {study.tools.map((tool) => (
                            <span
                              key={tool}
                              className="rounded-full border border-[var(--border)]/15 bg-white/[0.03] px-2.5 py-1 text-xs text-[var(--foreground)]/80"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]">What was learned</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted-foreground)]">{study.learned}</p>
                      </div>
                      {study.roadmap && (
                        <div className="rounded-xl border border-dashed border-amber-400/30 bg-amber-400/[0.04] p-4">
                          <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-amber-300">
                            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                            Roadmap, not yet built
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {study.roadmap.map((item) => (
                              <li key={item} className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Systems tested (node graph)                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-[var(--border)]/10 px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionEyebrow>Systems</SectionEyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance text-[var(--foreground)] sm:text-4xl">
              Systems I have tested
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
              Select a node to see the risks I watch for and how I approach testing it.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_1fr]">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {SYSTEM_NODES.map((node) => {
                  const Icon = node.icon;
                  const isActive = activeNode === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNode(isActive ? null : node.id)}
                      aria-pressed={isActive}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                        isActive
                          ? "border-[var(--primary)]/50 bg-[var(--primary)]/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_24px_-8px_rgba(94,234,212,0.25)]"
                          : "border-[var(--border)]/10 bg-white/[0.02] hover:border-[var(--border)]/25"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${isActive ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-xs font-medium leading-snug ${
                          isActive ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                        }`}
                      >
                        {node.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-[var(--border)]/10 bg-white/[0.02] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)]">
                {activeSystemNode ? (
                  <>
                    <div className="flex items-center gap-2.5">
                      <activeSystemNode.icon className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                        {activeSystemNode.label}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)]">{activeSystemNode.perspective}</p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-[var(--muted-foreground)]">
                      Common risks
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {activeSystemNode.risks.map((risk) => (
                        <li key={risk} className="flex gap-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden="true" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 py-6 text-center">
                    <Shield className="h-6 w-6 text-[var(--muted-foreground)]" aria-hidden="true" />
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Select a system on the left to see its risks and how I test it.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Tools and skills                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-[var(--border)]/10 bg-white/[0.015] px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionEyebrow>Tools</SectionEyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance text-[var(--foreground)] sm:text-4xl">
              Tools and skills
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_GROUPS.map((group, index) => (
              <Reveal key={group.heading} delay={(index % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-[var(--border)]/10 bg-white/[0.02] p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
                    {group.heading}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* How I think about quality                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-[var(--border)]/10 px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionEyebrow>Philosophy</SectionEyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance text-[var(--foreground)] sm:text-4xl">
              How I think about quality
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={(index % 2) * 0.08}>
                <div className="flex gap-5 rounded-2xl border border-[var(--border)]/10 bg-white/[0.02] p-7">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--primary)]/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--foreground)]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{principle.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Contact                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section id="contact" className="px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[0.8fr_1fr]">
            <Reveal>
              <SectionEyebrow>Contact</SectionEyebrow>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance text-[var(--foreground)] sm:text-4xl">
                Building something that needs careful testing?
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted-foreground)]">
                Let's talk about how I can help make it more reliable.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                  <Mail className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                  <a href="mailto:raomali005@gmail.com" className="hover:text-[var(--foreground)]">
                    raomali005@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                  <Phone className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                  <a href="tel:+923007228384" className="hover:text-[var(--foreground)]">
                    (+92) 300-7228384
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                  <MapPin className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                  Lahore, Pakistan
                </li>
                {socialLinks
                  .filter((s) => s.icon !== "Mail")
                  .map((social) => {
                    const Icon = social.icon === "Github" ? Github : Linkedin;
                    return (
                      <li key={social.label} className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                        <Icon className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--foreground)]"
                        >
                          {social.label}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              {formStatus === "success" ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--primary)]/25 bg-[var(--primary)]/[0.05] p-10 text-center">
                  <CheckCircle2 className="h-8 w-8 text-[var(--primary)]" aria-hidden="true" />
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--foreground)]">
                    Message sent
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-[var(--muted-foreground)]">
                    Thanks for reaching out. I'll get back to you at the email you provided.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 rounded-2xl border border-[var(--border)]/10 bg-white/[0.02] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)] sm:p-8"
                >
                  {/* Honeypot field, hidden from real users */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.honeypot}
                    onChange={(e) => setFormState((prev) => ({ ...prev, honeypot: e.target.value }))}
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-[var(--foreground)]">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                        aria-invalid={Boolean(formErrors.name)}
                        aria-describedby={formErrors.name ? "name-error" : undefined}
                        className="mt-1.5 w-full rounded-lg border border-[var(--border)]/15 bg-white/[0.02] px-3.5 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors duration-200 focus:border-[var(--primary)]/50 focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                      />
                      {formErrors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-amber-400">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                        aria-invalid={Boolean(formErrors.email)}
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                        className="mt-1.5 w-full rounded-lg border border-[var(--border)]/15 bg-white/[0.02] px-3.5 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors duration-200 focus:border-[var(--primary)]/50 focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                      />
                      {formErrors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-amber-400">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="text-sm font-medium text-[var(--foreground)]">
                        Company <span className="text-[var(--muted-foreground)]">(optional)</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState((prev) => ({ ...prev, company: e.target.value }))}
                        className="mt-1.5 w-full rounded-lg border border-[var(--border)]/15 bg-white/[0.02] px-3.5 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors duration-200 focus:border-[var(--primary)]/50 focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="reason" className="text-sm font-medium text-[var(--foreground)]">
                        Reason for contact
                      </label>
                      <select
                        id="reason"
                        value={formState.reason}
                        onChange={(e) => setFormState((prev) => ({ ...prev, reason: e.target.value }))}
                        className="mt-1.5 w-full rounded-lg border border-[var(--border)]/15 bg-white/[0.02] px-3.5 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors duration-200 focus:border-[var(--primary)]/50 focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                      >
                        {CONTACT_REASONS.map((reason) => (
                          <option key={reason} value={reason} className="bg-[var(--background)]">
                            {reason}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-[var(--foreground)]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                      aria-invalid={Boolean(formErrors.message)}
                      aria-describedby={formErrors.message ? "message-error" : undefined}
                      className="mt-1.5 w-full resize-none rounded-lg border border-[var(--border)]/15 bg-white/[0.02] px-3.5 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors duration-200 focus:border-[var(--primary)]/50 focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    />
                    {formErrors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-amber-400">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition-all duration-300 ease-out hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send message"}
                    {formStatus !== "submitting" && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
