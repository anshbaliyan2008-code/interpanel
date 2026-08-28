import { Code2, Users, Briefcase, Search, type LucideIcon } from 'lucide-react'

export type Persona = {
  key: string
  name: string
  role: string
  colorVar: string
  icon: LucideIcon
  verdict: string
  note: string
}

export const personas: Persona[] = [
  {
    key: 'tech',
    name: 'The Technical',
    role: 'Systems & code depth',
    colorVar: 'var(--persona-tech)',
    icon: Code2,
    verdict: 'Strong hire',
    note: 'Ships production-grade concurrency work. Ask about their caching trade-offs.',
  },
  {
    key: 'hr',
    name: 'The HR / Culture',
    role: 'Values & collaboration',
    colorVar: 'var(--persona-hr)',
    icon: Users,
    verdict: 'Hire',
    note: 'Clear communicator, credits their team. Watch for remote-async fit.',
  },
  {
    key: 'manager',
    name: 'The Hiring Manager',
    role: 'Impact & ownership',
    colorVar: 'var(--persona-manager)',
    icon: Briefcase,
    verdict: 'Lean hire',
    note: 'Owned a migration end-to-end. Scope of last role slightly below level.',
  },
  {
    key: 'skeptic',
    name: 'The Skeptic',
    role: 'Red flags & rigor',
    colorVar: 'var(--persona-skeptic)',
    icon: Search,
    verdict: 'Needs proof',
    note: 'Impact numbers are unverified. Probe the "40% faster" claim directly.',
  },
]
