import { SiteHeader } from '@/components/landing/site-header'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { GetStarted } from '@/components/landing/get-started'
import { Footer } from '@/components/landing/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <GetStarted />
      </main>
      <Footer />
    </div>
  )
}
