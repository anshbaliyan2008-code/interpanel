'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  FileSearch,
  Quote,
  MessagesSquare,
  Scale,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Loader2,
  ArrowRightLeft,
  CircleCheck,
  MinusCircle,
  CircleAlert,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  agents,
  agentOrder,
  candidate,
  opinions,
  debate,
  opinionChanges,
  finalReasoning,
  type AgentKey,
  type Opinion,
  type DebateTurn,
} from './demo-data'

/**
 * Staged reveal timeline. Each phase advances a global "step" counter that
 * gates which pieces of the transcript are visible. This is the demo — no
 * loading bar, the reasoning itself is the content.
 */

type Phase = 'profile' | 'opinions' | 'debate' | 'decision' | 'done'

const toneStyles: Record<Opinion['tone'], { chip: string; ring: string }> = {
  positive: { chip: 'bg-persona-hr/15 text-persona-hr', ring: 'ring-persona-hr/30' },
  neutral: { chip: 'bg-persona-manager/15 text-persona-manager', ring: 'ring-persona-manager/30' },
  caution: { chip: 'bg-persona-skeptic/15 text-persona-skeptic', ring: 'ring-persona-skeptic/30' },
}

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

function StepHeader({
  icon: Icon,
  index,
  title,
  desc,
  active,
  done,
}: {
  icon: React.ComponentType<{ className?: string }>
  index: number
  title: string
  desc: string
  active: boolean
  done: boolean
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-colors ${
          done
            ? 'border-primary/30 bg-primary text-primary-foreground'
            : active
              ? 'border-primary/40 bg-accent text-primary'
              : 'border-border bg-secondary text-muted-foreground'
        }`}
      >
        {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
      </span>
      <div className="pt-0.5">
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Step {index}
          </span>
          {active && !done && (
            <span className="flex items-center gap-1.5 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-primary">
              <Loader2 className="h-3 w-3 animate-spin" />
              working
            </span>
          )}
        </div>
        <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

function Reveal({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`transition-all duration-500 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      {children}
    </div>
  )
}

export function ReviewStream() {
  const [phase, setPhase] = useState<Phase>('profile')
  const [factCount, setFactCount] = useState(0)
  const [opinionCount, setOpinionCount] = useState(0)
  const [debateCount, setDebateCount] = useState(0)
  const [weighCount, setWeighCount] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [runId, setRunId] = useState(0)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    // reset
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('profile')
    setFactCount(0)
    setOpinionCount(0)
    setDebateCount(0)
    setWeighCount(0)
    setShowFinal(false)

    const schedule = (fn: () => void, delay: number) => {
      timers.current.push(setTimeout(fn, delay))
    }

    let t = 500

    // Step 1: profile facts
    candidate.facts.forEach((_, i) => {
      schedule(() => setFactCount(i + 1), t)
      t += 320
    })

    t += 500
    schedule(() => setPhase('opinions'), t)
    t += 500

    // Step 2: opinions one by one
    opinions.forEach((_, i) => {
      schedule(() => setOpinionCount(i + 1), t)
      t += 1100
    })

    t += 400
    schedule(() => setPhase('debate'), t)
    t += 500

    // Step 3: debate turns
    debate.forEach((_, i) => {
      schedule(() => setDebateCount(i + 1), t)
      t += 1400
    })

    t += 400
    schedule(() => setPhase('decision'), t)
    t += 500

    // Step 4: weighing points
    finalReasoning.weighing.forEach((_, i) => {
      schedule(() => setWeighCount(i + 1), t)
      t += 900
    })

    t += 500
    schedule(() => setShowFinal(true), t)
    t += 400
    schedule(() => setPhase('done'), t)

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [runId])

  const reached = useMemo(() => {
    const order: Phase[] = ['profile', 'opinions', 'debate', 'decision', 'done']
    const idx = order.indexOf(phase)
    return (p: Phase) => order.indexOf(p) <= idx
  }, [phase])

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
            Live panel review
          </p>
          <h1 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {candidate.name}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {candidate.role} &middot; reviewed by 4 independent AI personas
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setRunId((n) => n + 1)}
          className="gap-2 rounded-xl font-display font-semibold"
        >
          <RefreshCw className="h-4 w-4" />
          Replay
        </Button>
      </div>

      {/* Timeline */}
      <div className="mt-12 space-y-14">
        {/* STEP 1 — Profile */}
        <section>
          <StepHeader
            icon={FileSearch}
            index={1}
            title="Candidate Profile Builder"
            desc="Extracting verifiable facts from the resume and transcript before any persona forms an opinion."
            active={phase === 'profile'}
            done={reached('opinions')}
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:pl-15">
            {candidate.facts.map((f, i) => (
              <Reveal key={f.label} show={i < factCount}>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{f.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* STEP 2 — Independent opinions */}
        {reached('opinions') && (
          <section>
            <StepHeader
              icon={Quote}
              index={2}
              title="Independent opinions"
              desc="Each persona evaluates alone — no shared context yet — and must cite the resume or transcript for every claim."
              active={phase === 'opinions'}
              done={reached('debate')}
            />
            <div className="mt-6 space-y-4 md:pl-15">
              {opinions.map((op, i) => {
                const meta = agents[op.agent]
                const tone = toneStyles[op.tone]
                return (
                  <Reveal key={op.agent} show={i < opinionCount}>
                    <article className={`rounded-2xl border border-border bg-card p-5 ring-1 ${tone.ring}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <AgentAvatar agent={op.agent} />
                          <div>
                            <p className="font-display text-sm font-semibold text-foreground">
                              {meta.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{meta.role}</p>
                          </div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone.chip}`}>
                          {op.verdict}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-foreground">{op.summary}</p>
                      <div className="mt-4 space-y-2">
                        {op.citations.map((c, ci) => (
                          <div
                            key={ci}
                            className="flex gap-3 rounded-xl border border-border bg-secondary/50 p-3"
                          >
                            <Quote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            <div>
                              <span
                                className="mb-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                                style={{ backgroundColor: meta.colorVar, color: 'var(--primary-foreground)' }}
                              >
                                {c.source}
                              </span>
                              <p className="text-sm italic leading-relaxed text-muted-foreground">
                                {c.quote}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </section>
        )}

        {/* STEP 3 — Debate */}
        {reached('debate') && (
          <section>
            <StepHeader
              icon={MessagesSquare}
              index={3}
              title="Panel debate"
              desc="Personas challenge each other directly. When the exchange changes a mind, the shift is flagged in the open."
              active={phase === 'debate'}
              done={reached('decision')}
            />
            <div className="mt-6 space-y-4 md:pl-15">
              {debate.map((turn, i) => {
                const change = opinionChanges.find((c) => c.afterTurn === i + 1)
                return (
                  <div key={i} className="space-y-4">
                    <Reveal show={i < debateCount}>
                      <DebateBubble turn={turn} />
                    </Reveal>
                    {change && (
                      <Reveal show={i < debateCount}>
                        <div className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-accent/60 p-4">
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
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {change.reason}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* STEP 4 — Final decision */}
        {reached('decision') && (
          <section>
            <StepHeader
              icon={Scale}
              index={4}
              title="Final decision reasoning"
              desc="The panel weighs each signal by strength and evidence — you can see exactly why the recommendation lands where it does."
              active={phase === 'decision'}
              done={phase === 'done'}
            />
            <div className="mt-6 space-y-3 md:pl-15">
              {finalReasoning.weighing.map((w, i) => (
                <Reveal key={w.point} show={i < weighCount}>
                  <WeighRow {...w} />
                </Reveal>
              ))}

              <Reveal show={showFinal}>
                <div className="mt-6 overflow-hidden rounded-2xl border border-primary/30 bg-card">
                  <div className="flex items-center gap-3 border-b border-border bg-accent/60 px-5 py-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
                      Evidence-backed recommendation
                    </p>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                        {finalReasoning.recommendation}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {finalReasoning.confidence}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      {agentOrder.map((k) => (
                        <div
                          key={k}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-2.5"
                        >
                          <div className="flex items-center gap-2.5">
                            <AgentAvatar agent={k} size="sm" />
                            <span className="text-sm font-medium text-foreground">
                              {agents[k].short}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-foreground">
                            {finalReasoning.finalVerdicts[k]}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-start gap-3 rounded-xl bg-persona-skeptic/10 p-4">
                      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-persona-skeptic" />
                      <p className="text-sm leading-relaxed text-foreground">
                        <span className="font-semibold">Condition:</span> {finalReasoning.condition}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-muted-foreground">
                        Want the durable, evidence-linked version?
                      </p>
                      <Button asChild className="gap-2 rounded-xl font-display font-semibold">
                        <Link href="/report">
                          View full candidate report
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function DebateBubble({ turn }: { turn: DebateTurn }) {
  const meta = agents[turn.from]
  return (
    <div className="flex gap-3">
      <AgentAvatar agent={turn.from} size="sm" />
      <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-border bg-card p-4">
        <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-display text-sm font-semibold text-foreground">{meta.short}</span>
          {turn.to && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3" />
              to {agents[turn.to].short}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-foreground">{turn.text}</p>
      </div>
    </div>
  )
}

function WeighRow({
  point,
  weight,
  text,
  lean,
}: {
  point: string
  weight: string
  text: string
  lean: 'for' | 'against' | 'neutral'
}) {
  const leanConfig = {
    for: { Icon: CircleCheck, color: 'text-persona-hr', label: 'Supports' },
    against: { Icon: CircleAlert, color: 'text-persona-skeptic', label: 'Counts against' },
    neutral: { Icon: MinusCircle, color: 'text-persona-manager', label: 'Neutral' },
  }[lean]
  const { Icon } = leanConfig
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4">
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${leanConfig.color}`} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-display text-sm font-semibold text-foreground">{point}</p>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {weight} weight
          </span>
          <span className={`text-[11px] font-semibold uppercase tracking-wide ${leanConfig.color}`}>
            {leanConfig.label}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}
