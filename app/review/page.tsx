import type { Metadata } from 'next'
import { SiteHeader } from '@/components/landing/site-header'
import { ReviewStream } from '@/components/review/review-stream'

export const metadata: Metadata = {
  title: 'Live Panel Review — Panelist',
  description:
    'Watch four AI personas build a candidate profile, form independent opinions, debate, and reach an evidence-backed hiring recommendation.',
}

export default function ReviewPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <ReviewStream />
    </div>
  )
}
