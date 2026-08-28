import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { personas } from './personas'

export function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Futuristic grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10">

        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Four minds. One decision.
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Stop screening resumes with a single{' '}
            <span className="text-primary">opinion</span>.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Panelist replaces the lone AI screener with a panel of four
            independent personas. Each evaluates the resume and interview
            transcript alone, then they debate before delivering a single,
            evidence-backed hiring recommendation.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">

            <Button
              asChild
              size="lg"
              className="group rounded-full px-6 text-base shadow-lg shadow-primary/10"
            >
              <Link href="/setup">
                Run a panel
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="rounded-full px-5 text-base text-muted-foreground hover:text-foreground"
            >
              <Link href="/review">
                <Play className="mr-2 h-4 w-4" />
                See a sample debate
              </Link>
            </Button>

          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Every verdict is traced back to a line in the transcript — no black
            boxes.
          </p>

        </div>

        <PanelVisual />

      </div>
    </section>
  )
}

function PanelVisual() {
  return (
    <div className="relative">

      {/* subtle glow */}
      <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-primary/5 blur-3xl" />

      <div className="relative rounded-3xl border border-border bg-card/80 p-5 shadow-xl shadow-primary/5 backdrop-blur">

        <div className="mb-4 flex items-center justify-between px-1">
          <span className="font-display text-sm font-semibold text-foreground">
            Panel review · Candidate #4821
          </span>

          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Deliberating
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">

          {personas.map((p) => {
            const Icon = p.icon

            return (
              <div
                key={p.key}
                className="rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-2.5">

                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${p.colorVar} 14%, transparent)`,
                      color: p.colorVar,
                    }}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {p.name}
                    </p>

                    <p className="truncate text-[11px] text-muted-foreground">
                      {p.role}
                    </p>
                  </div>

                </div>

                <p
                  className="mt-3 inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${p.colorVar} 12%, transparent)`,
                    color: p.colorVar,
                  }}
                >
                  {p.verdict}
                </p>
              </div>
            )
          })}

        </div>

        {/* Consensus */}
        <div className="mt-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Consensus recommendation
            </p>

            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
              3 / 4
            </span>
          </div>

          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            <span className="font-semibold">
              Advance to final round.
            </span>{' '}
            3 of 4 personas recommend hiring; the Skeptic&apos;s concern about
            unverified metrics is flagged as a targeted follow-up question.
          </p>

        </div>

      </div>
    </div>
  )
}
