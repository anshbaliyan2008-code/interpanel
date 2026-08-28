import { Code2, Users, Briefcase, Search, type LucideIcon } from 'lucide-react'

export type AgentKey = 'tech' | 'hr' | 'manager' | 'skeptic'

export type AgentMeta = {
  key: AgentKey
  name: string
  short: string
  role: string
  colorVar: string
  icon: LucideIcon
}

export const agents: Record<AgentKey, AgentMeta> = {
  tech: {
    key: 'tech',
    name: 'The Technical',
    short: 'Technical',
    role: 'Systems & code depth',
    colorVar: 'var(--persona-tech)',
    icon: Code2,
  },
  hr: {
    key: 'hr',
    name: 'The HR / Culture',
    short: 'HR / Culture',
    role: 'Values & collaboration',
    colorVar: 'var(--persona-hr)',
    icon: Users,
  },
  manager: {
    key: 'manager',
    name: 'The Hiring Manager',
    short: 'Hiring Manager',
    role: 'Impact & ownership',
    colorVar: 'var(--persona-manager)',
    icon: Briefcase,
  },
  skeptic: {
    key: 'skeptic',
    name: 'The Skeptic',
    short: 'Skeptic',
    role: 'Red flags & rigor',
    colorVar: 'var(--persona-skeptic)',
    icon: Search,
  },
}

export const agentOrder: AgentKey[] = ['tech', 'hr', 'manager', 'skeptic']

// Step 1 — Candidate Profile Builder
export const candidate = {
  name: 'Jordan Rivera',
  role: 'Senior Backend Engineer',
  facts: [
    { label: 'Experience', value: '6 years — 2 companies (fintech, logistics)' },
    { label: 'Core stack', value: 'Go, PostgreSQL, Kafka, gRPC' },
    { label: 'Scale owned', value: 'Payments service at ~12k req/s peak' },
    { label: 'Notable', value: 'Led a monolith → services migration end-to-end' },
    { label: 'Headline claim', value: '"Cut checkout latency 40%"' },
    { label: 'Education', value: 'B.S. Computer Science' },
  ],
}

export type Opinion = {
  agent: AgentKey
  verdict: string
  tone: 'positive' | 'neutral' | 'caution'
  summary: string
  citations: { source: 'Resume' | 'Transcript'; quote: string }[]
}

// Step 2 — Independent opinions
export const opinions: Opinion[] = [
  {
    agent: 'tech',
    verdict: 'Strong hire',
    tone: 'positive',
    summary:
      'Deep, specific systems reasoning. Explained back-pressure and idempotency without prompting — this is production experience, not interview prep.',
    citations: [
      {
        source: 'Transcript',
        quote:
          '"We made the payment writes idempotent with a dedupe key so Kafka retries could not double-charge."',
      },
      { source: 'Resume', quote: '"Owned gRPC service mesh handling 12k req/s at peak."' },
    ],
  },
  {
    agent: 'hr',
    verdict: 'Hire',
    tone: 'positive',
    summary:
      'Credits the team consistently, describes healthy conflict resolution. Communication is clear and structured.',
    citations: [
      {
        source: 'Transcript',
        quote:
          '"I paired with our SRE for two weeks — the win was really the whole on-call group tightening the runbook."',
      },
    ],
  },
  {
    agent: 'manager',
    verdict: 'Lean hire',
    tone: 'neutral',
    summary:
      'Clear ownership of the migration, but the last role scoped one service. Level fit for senior is close but not obvious.',
    citations: [
      { source: 'Resume', quote: '"Led migration of checkout monolith to 4 services over 8 months."' },
      {
        source: 'Transcript',
        quote: '"The roadmap was mostly set by my staff eng; I owned execution on the checkout slice."',
      },
    ],
  },
  {
    agent: 'skeptic',
    verdict: 'Needs proof',
    tone: 'caution',
    summary:
      'The headline 40% number has no baseline, no measurement window, and no attribution. Treating it as unverified until probed.',
    citations: [
      { source: 'Resume', quote: '"Cut checkout latency 40%."' },
      {
        source: 'Transcript',
        quote: '"Honestly I\'d have to check the exact before number — it was a noticeable drop."',
      },
    ],
  },
]

export type DebateTurn = {
  from: AgentKey
  to?: AgentKey
  text: string
}

// Step 3 — Debate transcript
export const debate: DebateTurn[] = [
  {
    from: 'skeptic',
    to: 'tech',
    text: 'You called it a strong hire, but the 40% latency claim is unbacked. Under interview they could not name the baseline. Does that not worry you?',
  },
  {
    from: 'tech',
    to: 'skeptic',
    text: 'The number is soft, agreed. But my confidence is not from the metric — it is from the idempotency and back-pressure reasoning, which is hard to fake.',
  },
  {
    from: 'manager',
    to: 'tech',
    text: 'Fair, though the transcript says the roadmap was set by a staff engineer. That reads closer to strong-mid than senior-lead to me.',
  },
  {
    from: 'hr',
    text: 'Worth noting they proactively credited the SRE team rather than claiming solo. That pattern usually predicts good senior collaboration.',
  },
  {
    from: 'skeptic',
    to: 'manager',
    text: 'I will move off "needs proof" — the mechanism detail is concrete enough. I am landing at lean hire, conditional on verifying the latency claim in a reference check.',
  },
  {
    from: 'manager',
    text: 'And with the collaboration signal HR flagged, I am comfortable moving from lean hire to hire.',
  },
]

// Opinion changes surfaced during the debate (before -> after)
export type OpinionChange = {
  agent: AgentKey
  from: string
  to: string
  reason: string
  // index in `debate` after which the change is revealed
  afterTurn: number
}

export const opinionChanges: OpinionChange[] = [
  {
    agent: 'skeptic',
    from: 'Needs proof',
    to: 'Lean hire',
    reason: 'Concrete idempotency reasoning outweighed the soft metric; kept a reference-check condition.',
    afterTurn: 4,
  },
  {
    agent: 'manager',
    from: 'Lean hire',
    to: 'Hire',
    reason: 'Collaboration signal from HR resolved the level-fit doubt.',
    afterTurn: 5,
  },
]

export type FinalVerdict = Record<AgentKey, string>

// Step 4 — Final decision reasoning
export const finalReasoning = {
  weighing: [
    {
      point: 'Technical depth',
      weight: 'High',
      text: 'Idempotency + back-pressure reasoning is verified through the transcript, not just claimed. Load-bearing signal.',
      lean: 'for' as const,
    },
    {
      point: 'Collaboration & communication',
      weight: 'Medium',
      text: 'Consistent team attribution and clear structure. Predicts good senior-level partnership.',
      lean: 'for' as const,
    },
    {
      point: 'Level / scope fit',
      weight: 'Medium',
      text: 'Roadmap was partly set above them, but end-to-end execution ownership is at level. Net neutral-to-positive.',
      lean: 'neutral' as const,
    },
    {
      point: 'Unverified impact claim',
      weight: 'Low',
      text: '40% latency figure remains unbacked — downgraded to a reference-check item, not a blocker.',
      lean: 'against' as const,
    },
  ],
  finalVerdicts: {
    tech: 'Strong hire',
    hr: 'Hire',
    manager: 'Hire',
    skeptic: 'Lean hire',
  } as FinalVerdict,
  recommendation: 'Hire',
  confidence: '3 of 4 personas at Hire or stronger',
  condition: 'Verify the "40% latency" claim during reference checks.',
}

// ── Candidate Report ────────────────────────────────────────────────
// A durable, evidence-linked digest of the live review above.

export type Evidence = { source: 'Resume' | 'Transcript'; quote: string }

export type ReportPoint = {
  title: string
  detail: string
  evidence: Evidence
  raisedBy: AgentKey
}

export type Disagreement = {
  topic: string
  positions: { agent: AgentKey; stance: string }[]
  status: string
}

export type EvidenceGap = {
  claim: string
  issue: string
  source: 'Resume' | 'Transcript'
  action: string
}

export const report = {
  confidenceLevel: 'Medium-High',
  confidenceNote:
    'Strong convergence on technical signal; residual uncertainty on one unverified impact metric.',
  strengths: [
    {
      title: 'Production-grade systems reasoning',
      detail:
        'Explained idempotency and back-pressure unprompted — mechanism-level detail that is hard to fabricate.',
      evidence: {
        source: 'Transcript',
        quote:
          '"We made the payment writes idempotent with a dedupe key so Kafka retries could not double-charge."',
      },
      raisedBy: 'tech',
    },
    {
      title: 'Healthy collaboration pattern',
      detail: 'Credits teammates by default rather than claiming solo wins — predicts good senior partnership.',
      evidence: {
        source: 'Transcript',
        quote:
          '"I paired with our SRE for two weeks — the win was really the whole on-call group tightening the runbook."',
      },
      raisedBy: 'hr',
    },
    {
      title: 'End-to-end ownership of a real migration',
      detail: 'Drove a monolith-to-services split to completion, not just a proposal.',
      evidence: {
        source: 'Resume',
        quote: '"Led migration of checkout monolith to 4 services over 8 months."',
      },
      raisedBy: 'manager',
    },
  ] as ReportPoint[],
  concerns: [
    {
      title: 'Unverified 40% latency claim',
      detail: 'Headline metric had no baseline or measurement window when probed. Not a blocker, but unconfirmed.',
      evidence: { source: 'Resume', quote: '"Cut checkout latency 40%."' },
      raisedBy: 'skeptic',
    },
    {
      title: 'Roadmap set above them',
      detail: 'Direction was owned by a staff engineer; candidate owned execution on one slice. Slight level-fit question.',
      evidence: {
        source: 'Transcript',
        quote: '"The roadmap was mostly set by my staff eng; I owned execution on the checkout slice."',
      },
      raisedBy: 'manager',
    },
  ] as ReportPoint[],
  disagreements: [
    {
      topic: 'Is this a clear senior-level hire, or strong-mid?',
      positions: [
        { agent: 'tech', stance: 'Senior — depth of reasoning settles it' },
        { agent: 'manager', stance: 'Resolved to Hire after collaboration signal, but level was genuinely close' },
      ],
      status: 'Resolved by majority, not consensus — Skeptic still frames it as conditional.',
    },
    {
      topic: 'How much weight should the unverified metric carry?',
      positions: [
        { agent: 'skeptic', stance: 'Keep it as an explicit reference-check condition' },
        { agent: 'tech', stance: 'Immaterial to the decision given the mechanism detail' },
      ],
      status: 'Unresolved — panel proceeded but did not agree on the metric’s weight.',
    },
  ] as Disagreement[],
  evidenceGaps: [
    {
      claim: '40% checkout latency reduction',
      issue: 'No baseline number, time window, or attribution provided under questioning.',
      source: 'Resume',
      action: 'Confirm with a reference or ask for the dashboard in a follow-up.',
    },
    {
      claim: 'Scope of leadership on the migration',
      issue: 'Execution ownership is clear; strategic ownership is not evidenced either way.',
      source: 'Transcript',
      action: 'Probe scope of decision-making in reference checks.',
    },
  ] as EvidenceGap[],
}
