const steps = [
  {
    step: 'Step 1',
    title: 'Submit the candidate',
    description:
      'Drop in the resume and interview transcript. No formatting or manual tagging required.',
  },
  {
    step: 'Step 2',
    title: 'Personas evaluate alone',
    description:
      'Each of the four personas reviews the material independently and forms its own verdict — no cross-contamination.',
  },
  {
    step: 'Step 3',
    title: 'The panel debates',
    description:
      'Personas surface disagreements, pressure-test claims, and reconcile their views into a shared position.',
  },
  {
    step: 'Step 4',
    title: 'Get the recommendation',
    description:
      'You receive a final hire / no-hire call with cited evidence and the open questions worth following up on.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border bg-secondary/50"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From transcript to decision in four moves.
          </h2>
        </div>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.step} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-background font-display text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
