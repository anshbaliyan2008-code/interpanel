```tsx
'use client'

import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  Eye,
  GitCompareArrows,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'

type Phase = 'profile' | 'opinions' | 'debate' | 'decision' | 'done'

type Props = {
  phase: Phase
}

const stages = [
  { key: 'profile' as const, label: 'Profile', icon: Eye },
  { key: 'opinions' as const, label: 'Opinions', icon: BrainCircuit },
  { key: 'debate' as const, label: 'Debate', icon: MessageSquareText },
  { key: 'decision' as const, label: 'Decision', icon: GitCompareArrows },
]

const phaseIndex: Record<Phase, number> = {
  profile: 0,
  opinions: 1,
  debate: 2,
  decision: 3,
  done: 4,
}

export function PanelCommandCenter({ phase }: Props) {
  const activeIndex = phaseIndex[phase]
  const isLive = phase !== 'done'

  return (
    <section className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,hsl(var(--primary)/.09),transparent_34%)]" />

      <div className="relative p-5 md:p-6">

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-3">

            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">

              <Sparkles className="h-5 w-5" />

              {isLive && (
                <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-primary/50" />
              )}

            </span>

            <div>

              <div className="flex items-center gap-2">

                <p className="font-display text-sm font-bold tracking-tight text-foreground">
                  Panel Command Center
                </p>

                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                  {isLive ? 'Live' : 'Complete'}
                </span>

              </div>

              <p className="text-xs text-muted-foreground">
                Four independent reviewers · evidence-linked deliberation
              </p>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2">

            <Metric
              icon={ShieldCheck}
              label="Evidence"
              value="92%"
            />

            <Metric
              icon={Zap}
              label="Personas"
              value="4 / 4"
            />

            <Metric
              icon={Activity}
              label="Signals"
              value="18"
            />

          </div>

        </div>

        {/* Pipeline */}
        <div className="mt-7 grid gap-2 sm:grid-cols-4">

          {stages.map((stage, index) => {

            const Icon = stage.icon

            const complete =
              index < activeIndex || phase === 'done'

            const active =
              index === activeIndex && phase !== 'done'

            return (

              <div key={stage.key} className="relative">

                <div
                  className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition-all duration-500 ${
                    active
                      ? 'border-primary/30 bg-primary/5 shadow-sm'
                      : complete
                        ? 'border-primary/15 bg-primary/[0.035]'
                        : 'border-border bg-background'
                  }`}
                >

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      complete
                        ? 'bg-primary text-primary-foreground'
                        : active
                          ? 'bg-primary/10 text-primary'
                          : 'bg-secondary text-muted-foreground'
                    }`}
                  >

                    {complete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}

                  </span>

                  <div className="min-w-0">

                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      0{index + 1}
                    </p>

                    <p className="text-sm font-semibold text-foreground">
                      {stage.label}
                    </p>

                  </div>

                  {active && (
                    <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-primary" />
                  )}

                </div>

              </div>

            )
          })}

        </div>

        {/* Evidence message */}
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-border bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-3">

            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

            <div>

              <p className="text-sm font-semibold text-foreground">
                Trace every conclusion
              </p>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Claims are separated from evidence, disagreements stay visible,
                and opinion changes are recorded instead of hidden.
              </p>

            </div>

          </div>

          <span className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
            No black-box verdicts
          </span>

        </div>

      </div>

    </section>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border bg-background px-3 py-2">

      <div className="flex items-center gap-1.5 text-muted-foreground">

        <Icon className="h-3 w-3" />

        <span className="text-[9px] font-semibold uppercase tracking-wide">
          {label}
        </span>

      </div>

      <p className="mt-0.5 font-display text-sm font-bold text-foreground">
        {value}
      </p>

    </div>
  )
}
```
