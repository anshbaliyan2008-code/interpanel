import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/90" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/90" />
            </span>
          </span>

          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Panelist
          </span>
        </Link>

        {/* Navigation */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>

          <Link
            href="/review"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Live Demo
          </Link>
        </nav>

        {/* Main CTA */}
        <Button asChild size="sm" className="group rounded-full font-medium">
          <Link href="/setup">
            Launch panel
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>

      </div>
    </header>
  )
}
