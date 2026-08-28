import type { Metadata } from 'next'
import { SiteHeader } from '@/components/landing/site-header'
import { SetupForm } from '@/components/setup/setup-form'

export const metadata: Metadata = {
  title: 'Panel Setup — Panelist',
  description:
    'Add a job description and up to two candidates. Four AI personas review each candidate independently, then debate to a recommendation.',
}

export default function SetupPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <SetupForm />
    </div>
  )
}
