'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  FileText,
  Upload,
  FileUp,
  X,
  User,
  ClipboardList,
  MessageSquareText,
  Play,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type UploadedFile = {
  name: string
  size: number
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

type FileFieldProps = {
  id: string
  label: string
  hint: string
  icon: React.ComponentType<{ className?: string }>
  accept: string
  file: UploadedFile | null
  onChange: (file: UploadedFile | null) => void
}

function FileField({ id, label, hint, icon: Icon, accept, file, onChange }: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
      </label>

      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <FileText className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label={`Remove ${label}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-6 text-center transition-colors hover:border-primary/40 hover:bg-accent/40"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <FileUp className="h-4 w-4" />
          </span>
          <span className="text-sm font-medium text-foreground">Click to upload</span>
          <span className="text-xs text-muted-foreground">{hint}</span>
        </button>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onChange({ name: f.name, size: f.size })
        }}
      />
    </div>
  )
}

type CandidateState = {
  name: string
  resume: UploadedFile | null
  transcript: UploadedFile | null
}

const emptyCandidate: CandidateState = { name: '', resume: null, transcript: null }

const candidateAccent = ['var(--persona-tech)', 'var(--persona-manager)']

function CandidateCard({
  index,
  state,
  onChange,
}: {
  index: number
  state: CandidateState
  onChange: (next: CandidateState) => void
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground"
          style={{ backgroundColor: candidateAccent[index] }}
        >
          {index + 1}
        </span>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-display text-sm font-semibold text-foreground">
            Candidate {String.fromCharCode(65 + index)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor={`cand-${index}-name`}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Candidate name
          </label>
          <input
            id={`cand-${index}-name`}
            type="text"
            value={state.name}
            onChange={(e) => onChange({ ...state, name: e.target.value })}
            placeholder="e.g. Jordan Rivera"
            className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <FileField
          id={`cand-${index}-resume`}
          label="Resume"
          hint="PDF, DOCX up to 10MB"
          icon={ClipboardList}
          accept=".pdf,.doc,.docx"
          file={state.resume}
          onChange={(resume) => onChange({ ...state, resume })}
        />

        <FileField
          id={`cand-${index}-transcript`}
          label="Interview transcript"
          hint="PDF, TXT, DOCX up to 10MB"
          icon={MessageSquareText}
          accept=".pdf,.txt,.doc,.docx"
          file={state.transcript}
          onChange={(transcript) => onChange({ ...state, transcript })}
        />
      </div>
    </div>
  )
}

export function SetupForm() {
  const [jobDescription, setJobDescription] = useState('')
  const [jobFile, setJobFile] = useState<UploadedFile | null>(null)
  const [candidates, setCandidates] = useState<CandidateState[]>([
    { ...emptyCandidate },
    { ...emptyCandidate },
  ])

  const jobReady = jobDescription.trim().length > 0 || jobFile !== null
  const candidatesReady = candidates.some((c) => c.resume !== null)
  const canRun = jobReady && candidatesReady

  function updateCandidate(index: number, next: CandidateState) {
    setCandidates((prev) => prev.map((c, i) => (i === index ? next : c)))
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      {/* Heading */}
      <div className="max-w-2xl">
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
          Panel setup
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Set up your panel review
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Add the role and up to two candidates. All four AI personas review each
          candidate independently, then debate before returning a recommendation.
        </p>
      </div>

      {/* Job description */}
      <section className="mt-10 rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">Job description</h2>
        </div>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={6}
          placeholder="Paste the job description here — responsibilities, required skills, seniority, and anything the panel should weigh."
          className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            or
          </span>
          <div className="flex-1">
            <FileField
              id="jd-file"
              label="Upload as PDF"
              hint="PDF, DOCX up to 10MB"
              icon={FileUp}
              accept=".pdf,.doc,.docx"
              file={jobFile}
              onChange={setJobFile}
            />
          </div>
        </div>
      </section>

      {/* Candidates */}
      <section className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            Candidates <span className="text-muted-foreground">(compare up to 2)</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {candidates.map((c, i) => (
            <CandidateCard key={i} index={i} state={c} onChange={(next) => updateCandidate(i, next)} />
          ))}
        </div>
      </section>

      {/* Run */}
      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-border bg-accent/40 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-foreground">Ready when you are</p>
            <p className="text-sm text-muted-foreground">
              {canRun
                ? 'All set — the panel will review each candidate independently, then debate.'
                : 'Add a job description and at least one resume to begin.'}
            </p>
          </div>
        </div>
        <Button
          asChild={canRun}
          size="lg"
          disabled={!canRun}
          className="w-full gap-2 rounded-xl font-display font-semibold sm:w-auto"
        >
          {canRun ? (
            <Link href="/review">
              <Play className="h-4 w-4" />
              Run Panel Review
            </Link>
          ) : (
            <span>
              <Play className="h-4 w-4" />
              Run Panel Review
            </span>
          )}
        </Button>
      </div>
    </main>
  )
}
