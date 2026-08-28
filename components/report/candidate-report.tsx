import Link from 'next/link'
import {
  Quote,
  CheckCircle2,
  ArrowRight,
  ArrowRightLeft,
  ThumbsUp,
  TriangleAlert,
  ChevronDown,
  ScanSearch,
  Scale,
  CircleAlert,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  agents,
  agentOrder,
  candidate,
  opinions,
  opinionChanges,
  finalReasoning,
  report,
  type AgentKey,
  type Evidence,
  type ReportPoint,
} from '@/components/review/demo-data'

function AgentAvatar({ agent, size = 'md' }: { agent: AgentKey; size?: 'sm' | 'md' }) {
  const meta = agents[agent]
  const Icon = meta.icon
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  return (
    <span
      className={`flex ${dim} shrink-0 items-center justify-center rounded-xl text-primary-foreground`}
      style={{ backgroundColor: meta.colorVar }}
    >
      <Icon className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
    </span>
  )
}

function EvidenceQuote({ evidence, agent }: { evidence: Evidence; agent: AgentKey }) {
  const meta = agents[agent]
  return (
    <div className="mt-3 flex gap-3 rounded-xl border border-border bg-secondary/50 p-3">
      <Quote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div>
        <span
          className="mb-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={{ backgroundColor: meta.colorVar, color: 'var(--primary-foreground)' }}
        >
          {evidence.source}
        </span>
        <p className="text-sm italic leading-relaxed text-muted-foreground">{evidence.quote}</p>
      </div>
    </div>
  )
}

function SectionHeading({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

function PointCard({ point, kind }: { point: ReportPoint; kind: 'strength' | 'concern' }) {
  const meta = agents[point.raisedBy]
  const accent = kind === 'strength' ? 'text-persona-hr' : 'text-persona-skeptic'
  const Icon = kind === 'strength' ? ThumbsUp : TriangleAlert
  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${accent}`} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-base font-semibold text-foreground">{point.title}</h3>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: meta.colorVar }}
              />
              {meta.short}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{point.detail}</p>
          <EvidenceQuote evidence={point.evidence} agent={point.raisedBy} />
        </div>
      </div>
    </article>
  )
}

export function CandidateReport() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      {/* Header + final recommendation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
            Candidate report
          </p>
          <h1 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {candidate.name}
          </h1>
          <p className="mt-1 text-muted-foreground">{candidate.role}</p>
        </div>
        <Button
          asChild
          variant="outline"
          className="gap-2 rounded-xl font-display font-semibold"
        >
          <Link href="/review">
            <ScanSearch className="h-4 w-4" />
            Watch the live review
          </Link>
        </Button>
      </div>

      {/* Recommendation banner */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-primary/30 bg-card">
        <div className="flex items-center gap-3 border-b border-border bg-accent/60 px-5 py-4">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
            Final recommendation
          </p>
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div>
            <span className="font-display text-4xl font-bold tracking-tight text-foreground">
              {finalReasoning.recommendation}
            </span>
          </div>
          <div className="sm:border-l sm:border-border sm:pl-6">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold text-foreground">
                Confidence: {report.confidenceLevel}
              </span>
              <span className="text-xs text-muted-foreground">({finalReasoning.confidence})</span>
            </div>
            {/* Confidence meter */}
            <div className="mt-2 flex h-2 w-full max-w-xs overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-3/4 rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {report.confidenceNote}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 space-y-14">
        {/* Strengths */}
        <section>
          <SectionHeading
            icon={ThumbsUp}
            title="Strengths"
            desc="Each strength is tied to a specific quote from the resume or interview — no unsupported praise."
          />
          <div className="mt-6 space-y-4">
            {report.strengths.map((p) => (
              <PointCard key={p.title} point={p} kind="strength" />
            ))}
          </div>
        </section>

        {/* Concerns */}
        <section>
          <SectionHeading
            icon={TriangleAlert}
            title="Concerns"
            desc="Reservations raised by the panel, each linked to the evidence that prompted it."
          />
          <div className="mt-6 space-y-4">
            {report.concerns.map((p) => (
              <PointCard key={p.title} point={p} kind="concern" />
            ))}
          </div>
        </section>

        {/* Agent-by-agent summary (collapsible) */}
        <section>
          <SectionHeading
            icon={Quote}
            title="Agent-by-agent opinions"
            desc="Expand any persona to see their independent take, final verdict, and citations."
          />
          <div className="mt-6 space-y-3">
            {agentOrder.map((k) => {
              const meta = agents[k]
              const op = opinions.find((o) => o.agent === k)!
              const finalVerdict = finalReasoning.finalVerdicts[k]
              const changed = op.verdict !== finalVerdict
              return (
                <details key={k} className="group rounded-2xl border border-border bg-card">
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
                    <AgentAvatar agent={k} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold text-foreground">{meta.name}</p>
                      <p className="text-xs text-muted-foreground">{meta.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {changed && (
                        <span className="hidden items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground line-through sm:flex">
                          {op.verdict}
                        </span>
                      )}
                      {changed && <ArrowRight className="hidden h-3 w-3 text-primary sm:block" />}
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground"
                        style={{ backgroundColor: meta.colorVar }}
                      >
                        {finalVerdict}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-border p-4">
                    <p className="text-sm leading-relaxed text-foreground">{op.summary}</p>
                    <div className="mt-3 space-y-2">
                      {op.citations.map((c, ci) => (
                        <EvidenceQuote key={ci} evidence={c} agent={k} />
                      ))}
                    </div>
                  </div>
                </details>
              )
            })}
          </div>
        </section>

        {/* Debate highlights — opinion shifts */}
        <section>
          <SectionHeading
            icon={ArrowRightLeft}
            title="Debate highlights"
            desc="The specific moments the debate changed someone's mind — the part that matters most."
          />
          <div className="mt-6 space-y-4">
            {opinionChanges.map((change) => (
              <div
                key={change.agent}
                className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-accent/60 p-4"
              >
                <ArrowRightLeft className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-foreground">
                    {agents[change.agent].short} changed their position
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full bg-secondary px-3 py-1 font-medium text-muted-foreground line-through">
                      {change.from}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span
                      className="rounded-full px-3 py-1 font-semibold text-primary-foreground"
                      style={{ backgroundColor: agents[change.agent].colorVar }}
                    >
                      {change.to}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{change.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unresolved disagreements */}
        <section>
          <SectionHeading
            icon={Scale}
            title="Unresolved disagreements"
            desc="Surfaced deliberately, not buried — where the panel did not fully align."
          />
          <div className="mt-6 space-y-4">
            {report.disagreements.map((d) => (
              <article key={d.topic} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display text-base font-semibold text-foreground">{d.topic}</h3>
                <div className="mt-4 space-y-2.5">
                  {d.positions.map((pos) => (
                    <div key={pos.agent} className="flex items-start gap-3">
                      <span className="flex items-center gap-2 shrink-0">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: agents[pos.agent].colorVar }}
                        />
                        <span className="w-24 text-sm font-medium text-foreground">
                          {agents[pos.agent].short}
                        </span>
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">{pos.stance}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 border-t border-border pt-3 text-sm font-medium text-foreground">
                  {d.status}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Insufficient evidence flags */}
        <section>
          <SectionHeading
            icon={CircleAlert}
            title="Insufficient evidence"
            desc="Claims the panel could not verify from the materials provided — flagged rather than assumed."
          />
          <div className="mt-6 space-y-4">
            {report.evidenceGaps.map((g) => (
              <article
                key={g.claim}
                className="rounded-2xl border border-persona-skeptic/30 bg-persona-skeptic/5 p-5"
              >
                <div className="flex items-start gap-3">
                  <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-persona-skeptic" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-foreground">{g.claim}</h3>
                      <span className="rounded bg-persona-skeptic/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-persona-skeptic">
                        {g.source}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{g.issue}</p>
                    <p className="mt-3 flex items-start gap-2 rounded-xl bg-card p-3 text-sm text-foreground">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-persona-skeptic" />
                      <span>
                        <span className="font-semibold">Next step:</span> {g.action}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
