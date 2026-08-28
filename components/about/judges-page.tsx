import Link from 'next/link'
import {
  Target,
  ArrowRight,
  ArrowDown,
  FileText,
  Users,
  MessagesSquare,
  Scale,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Eye,
  Sparkles,
  GitBranch,
  Code2,
  Briefcase,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { personas } from '@/components/landing/personas'

type Criterion = {
  criterion: string
  weight: string
  how: string
  proof: { label: string; href: string }
}

const criteria: Criterion[] = [
  {
    criterion: 'Innovation & originality',
    weight: 'Novelty',
    how: 'Replaces the single "AI resume screener" with a panel of four independent personas that each reason separately, then debate — surfacing disagreement instead of averaging it away.',
    proof: { label: 'See the live panel debate', href: '/review' },
  },
  {
    criterion: 'Technical execution',
    weight: 'Depth',
    how: 'A staged multi-agent pipeline: profile extraction, independent evaluation, a structured debate protocol, and a weighed final decision — each stage observable, not hidden behind a spinner.',
    proof: { label: 'View the architecture', href: '#architecture' },
  },
  {
    criterion: 'Evidence & trustworthiness',
    weight: 'Rigor',
    how: 'Every strength and concern links to a direct quote from the resume or transcript. Unverifiable claims are flagged as "insufficient evidence" rather than assumed.',
    proof: { label: 'Read a candidate report', href: '/report' },
  },
  {
    criterion: 'Transparency of reasoning',
    weight: 'Explainability',
    how: 'The debate transcript shows agent-to-agent exchanges and explicitly marks the moment an agent changes its mind (before → after) and why.',
    proof: { label: 'See opinion shifts', href: '/report' },
  },
  {
    criterion: 'Usability & demo readiness',
    weight: 'Polish',
    how: 'Pre-loaded sample candidates let judges run a full review in one click — no upload required — with an optional path to upload your own materials.',
    proof: { label: 'Try with sample data', href: '/review' },
  },
  {
    criterion: 'Handling ambiguity',
    weight: 'Honesty',
    how: 'Unresolved disagreements get their own section instead of being buried, and confidence is reported as a level with a stated reason — the system admits what it does not know.',
    proof: { label: 'See unresolved items', href: '/report' },
  },
]

const pipeline = [
  {
    icon: FileText,
    title: 'Candidate Profile Builder',
    desc: 'Extracts structured facts from the resume and transcript — roles, claims, and quotable evidence.',
    tag: 'Ingest',
  },
  {
    icon: Users,
    title: 'Independent Review',
    desc: 'Four personas evaluate the profile in isolation. No agent sees another\u2019s opinion at this stage.',
    tag: 'Parallel',
  },
  {
    icon: MessagesSquare,
    title: 'Debate Protocol',
    desc: 'Agents exchange challenges in rounds. Positions can shift; each shift is recorded with its trigger.',
    tag: 'Sequential',
  },
  {
    icon: Scale,
    title: 'Final Decision',
    desc: 'Signals are weighed against evidence strength to produce a recommendation with a confidence level.',
    tag: 'Synthesis',
  },
]

const principles = [
  {
    icon: Eye,
    title: 'Observable, not opaque',
    desc: 'Every intermediate step renders on screen. The reveal is the product.',
  },
  {
    icon: ShieldCheck,
    title: 'Evidence-gated',
    desc: 'Claims without a citation are downgraded and flagged, never silently trusted.',
  },
  {
    icon: GitBranch,
    title: 'Disagreement is a feature',
    desc: 'Divergent verdicts are preserved and shown, not collapsed into a single score.',
  },
]

const personaIconMap = { tech: Code2, hr: Users, manager: Briefcase, skeptic: Search }

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  eyebrow: string
  title: string
  desc: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-primary">
        <Icon className="h-4 w-4" />
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  )
}

export function JudgesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      {/* Intro */}
      <div className="max-w-3xl">
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
          For judges
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          How Panelist satisfies each judging criterion
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Panelist is a multi-agent hiring assistant: four independent AI personas review a
          candidate, debate their conclusions, and reach an evidence-backed recommendation. This
          page maps the build directly to what you are scoring — and links to where to see each
          claim in action.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="gap-2 rounded-xl font-display font-semibold">
            <Link href="/review">
              <Sparkles className="h-4 w-4" />
              Run the live demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="gap-2 rounded-xl font-display font-semibold"
          >
            <Link href="/report">Read a sample report</Link>
          </Button>
        </div>
      </div>

      {/* Rubric-mapped criteria */}
      <section className="mt-16">
        <SectionHeading
          icon={Target}
          eyebrow="Rubric mapping"
          title="Criterion by criterion"
          desc="Each row states what you are likely evaluating, how Panelist addresses it, and exactly where to verify it."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          {/* Table header (desktop) */}
          <div className="hidden bg-secondary/60 px-5 py-3 md:grid md:grid-cols-[1fr_1.6fr_auto] md:gap-6">
            <span className="font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Criterion
            </span>
            <span className="font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              How we satisfy it
            </span>
            <span className="font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Proof
            </span>
          </div>
          <div className="divide-y divide-border">
            {criteria.map((c) => (
              <div
                key={c.criterion}
                className="grid gap-3 bg-card px-5 py-5 md:grid-cols-[1fr_1.6fr_auto] md:items-center md:gap-6"
              >
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {c.criterion}
                  </h3>
                  <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-primary">
                    {c.weight}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.how}</p>
                <Link
                  href={c.proof.href}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {c.proof.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section id="architecture" className="mt-20 scroll-mt-24">
        <SectionHeading
          icon={Layers}
          eyebrow="Architecture"
          title="Agent flow & debate protocol"
          desc="A staged pipeline where each phase is observable. Independent review runs in parallel; the debate runs in structured rounds."
        />

        {/* Pipeline flow */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-[repeat(4,1fr)_0] md:items-stretch">
            {pipeline.map((stage, i) => {
              const Icon = stage.icon
              return (
                <div key={stage.title} className="relative flex">
                  <div className="flex flex-1 flex-col rounded-2xl border border-border bg-background p-5">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {stage.tag}
                      </span>
                    </div>
                    <p className="mt-3 font-display text-sm font-bold text-foreground">
                      {String(i + 1).padStart(2, '0')} · {stage.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {stage.desc}
                    </p>
                  </div>
                  {/* Connector */}
                  {i < pipeline.length - 1 && (
                    <>
                      <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </span>
                      <span className="mx-auto my-1 block md:hidden">
                        <ArrowDown className="h-5 w-5 text-primary" />
                      </span>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* Independent review fan-out */}
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-secondary/30 p-5">
            <p className="font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Stage 02 · Independent personas (parallel, isolated)
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {personas.map((p) => {
                const Icon = personaIconMap[p.key as keyof typeof personaIconMap]
                return (
                  <div
                    key={p.key}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary-foreground"
                      style={{ backgroundColor: p.colorVar }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-semibold text-foreground">
                        {p.name.replace('The ', '')}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{p.role}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Debate protocol */}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
                <MessagesSquare className="h-4 w-4 text-primary" />
                Debate protocol
              </p>
              <ol className="mt-3 space-y-3">
                {[
                  'Each persona posts an opening verdict with citations.',
                  'The Skeptic challenges any claim lacking direct evidence.',
                  'Challenged agents respond — holding or revising their stance.',
                  'Shifts are logged as before → after with the triggering argument.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent font-display text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
                <Scale className="h-4 w-4 text-primary" />
                Decision weighing
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The final stage does not average verdicts. It weighs each signal by evidence
                strength — a cited, corroborated strength outranks an unverified claim — then reports
                a recommendation with an explicit confidence level and any unresolved disagreements.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Cited evidence ↑', 'Corroboration ↑', 'Unverified claim ↓', 'Conflicting signal → flag'].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {chip}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design principles */}
      <section className="mt-20">
        <SectionHeading
          icon={CheckCircle2}
          eyebrow="Principles"
          title="What we optimized for"
          desc="Three commitments that shaped every screen in the build."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon
            return (
              <article key={p.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mt-16 rounded-2xl border border-primary/30 bg-accent/50 p-8 text-center">
        <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-foreground">
          Everything above is one click away
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Run the panel on pre-loaded sample candidates and watch the full reasoning unfold — no
          setup required.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild className="gap-2 rounded-xl font-display font-semibold">
            <Link href="/review">
              <Sparkles className="h-4 w-4" />
              Run the live demo
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl font-display font-semibold">
            <Link href="/setup">Upload your own</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
