import type { Metadata } from 'next'
import { SiteHeader } from '@/components/landing/site-header'
import { CandidateReport } from '@/components/report/candidate-report'

export const metadata: Metadata = {
  title: 'Candidate Report — Panelist',
  description:
    'An evidence-linked hiring report: final recommendation with confidence, strengths and concerns tied to quotes, agent-by-agent opinions, debate highlights, unresolved disagreements, and insufficient-evidence flags.',
}

export default function ReportPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <CandidateReport />
    </div>
  )
}
