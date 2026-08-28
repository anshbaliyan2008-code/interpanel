import { Layers, MessagesSquare, FileCheck2, type LucideIcon } from 'lucide-react'

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Layers,
    title: 'Four independent evaluators',
    description:
      'Technical, HR/Culture, Hiring Manager, and Skeptic each score the candidate in isolation — so no single bias sets the tone for the whole decision.',
  },
  {
    icon: MessagesSquare,
    title: 'A real debate, not an average',
    description:
      'The personas challenge each other on disagreements, surface blind spots, and converge on a position the way a strong human panel actually would.',
  },
  {
    icon: FileCheck2,
    title: 'Evidence-backed verdicts',
    description:
      'Every conclusion cites the exact resume line or transcript moment behind it, giving you an auditable trail instead of an opaque score.',
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
          Why a panel
        </p>
        <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          One screener guesses. A panel deliberates.
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Hiring decisions are too important for a single perspective. Panelist
          rebuilds the interview panel as independent AI personas that argue
          their way to a defensible answer.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon
          return (
            <article
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2.5 text-pretty leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
