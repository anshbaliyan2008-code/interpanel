import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer>
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="overflow-hidden rounded-3xl border border-border bg-primary px-8 py-14 text-center md:px-16 md:py-20">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Give every candidate a fair panel.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
            Join the teams replacing one-shot AI screening with structured,
            debate-driven hiring decisions.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="group rounded-full px-6 text-base"
            >
              Request access
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
                <span className="h-1 w-1 rounded-full bg-primary-foreground/90" />
                <span className="h-1 w-1 rounded-full bg-primary-foreground/60" />
                <span className="h-1 w-1 rounded-full bg-primary-foreground/60" />
                <span className="h-1 w-1 rounded-full bg-primary-foreground/90" />
              </span>
            </span>
            <span className="font-display text-sm font-bold text-foreground">
              Panelist
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Panelist. Fairer decisions, on the
            record.
          </p>

          <nav className="flex items-center gap-6" aria-label="Footer">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
