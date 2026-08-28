import { Upload, UserCheck, MessagesSquare, Gavel, ArrowRight, type LucideIcon } from 'lucide-react'

type Stage = {
  icon: LucideIcon
  label: string
  caption: string
}

const stages: Stage[] = [
  {
    icon: Upload,
    label: 'Upload',
    caption: 'Resume + transcript in.',
  },
  {
    icon: UserCheck,
    label: 'Independent review',
    caption: 'Four personas score alone.',
  },
  {
    icon: MessagesSquare,
    label: 'Debate',
    caption: 'They challenge each other.',
  },
  {
    icon: Gavel,
    label: 'Final decision',
    caption: 'Evidence-backed verdict.',
  },
]

export function GetStarted() {
  return (
    <section id="get-started" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
              Panelist
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A panel of four AI interviewers that debate their way to a hire.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Watch the whole pipeline run end to end. No setup, no upload —
              start from real sample candidates.
            </p>
          </div>

          {/* Pipeline visual */}
          <ol className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0">
            {stages.map((stage, i) => {
              const Icon = stage.icon
              return (
                <li
                  key={stage.label}
                  className="flex flex-1 items-center gap-4 md:flex-col md:gap-0 md:text-center"
                >
                  <div className="flex flex-1 flex-col items-start gap-3 md:items-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2 md:justify-center">
                        <span className="font-display text-xs font-bold text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-display text-base font-semibold text-foreground">
                          {stage.label}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {stage.caption}
                      </p>
                    </div>
                  </div>

                  {i < stages.length - 1 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 rotate-90 text-border md:mt-6 md:rotate-0"
                    />
                  )}
                </li>
              )
            })}
          </ol>

          {/* CTAs */}
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/setup?demo=1"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-display text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Try it with sample candidates
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/setup"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 font-display text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:w-auto"
            >
              <Upload className="h-4 w-4" />
              Upload your own
            </a>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Sample candidates are pre-loaded — no account or file needed to see a
            full panel decision.
          </p>
        </div>
      </div>
    </section>
  )
}
