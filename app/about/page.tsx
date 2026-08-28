import type { Metadata } from 'next'
import { SiteHeader } from '@/components/landing/site-header'
import { JudgesPage } from '@/components/about/judges-page'

export const metadata: Metadata = {
  title: 'For Judges · Panelist',
  description:
    'How Panelist satisfies each judging criterion, plus the multi-agent architecture and debate protocol behind the panel review.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <JudgesPage />
    </div>
  )
}
