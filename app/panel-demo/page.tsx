"use client"

import { useState } from "react"

export default function PanelDemoPage() {
  const [candidateName, setCandidateName] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [resume, setResume] = useState("")
  const [transcript, setTranscript] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  async function runPanel() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("/api/panel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateName, jobDescription, resume, transcript }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Request failed")
      setResult(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Run the Panel</h1>
        <p className="text-muted-foreground">
          Paste in a job description, resume, and interview transcript. Four independent AI
          agents will evaluate the candidate, debate, and reach a final decision.
        </p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <input
          className="w-full rounded-lg border p-3 bg-white/50"
          placeholder="Candidate name (optional)"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <textarea
          className="w-full rounded-lg border p-3 bg-white/50 min-h-[100px]"
          placeholder="Job description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <textarea
          className="w-full rounded-lg border p-3 bg-white/50 min-h-[140px]"
          placeholder="Resume text"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
        <textarea
          className="w-full rounded-lg border p-3 bg-white/50 min-h-[180px]"
          placeholder="Interview transcript"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <button
          onClick={runPanel}
          disabled={loading || !jobDescription || !resume || !transcript}
          className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium disabled:opacity-50"
        >
          {loading ? "Panel is deliberating..." : "Run Panel"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      {result && (
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">Candidate Profile</h2>
            <div className="glass-card p-5 text-sm space-y-2">
              <p><strong>Skills:</strong> {result.profile.skills?.join(", ")}</p>
              <p><strong>Experience:</strong> {result.profile.experienceSummary}</p>
              <p><strong>Education:</strong> {result.profile.education}</p>
              <p><strong>Claims made:</strong> {result.profile.claimsMade?.join("; ")}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Independent Opinions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {result.opinions.map((op: any, i: number) => (
                <div key={i} className="glass-card p-5 text-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <strong>{op.persona}</strong>
                    <span>{op.verdict} · {op.confidence}%</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {op.evidence?.map((e: any, j: number) => (
                      <li key={j}>
                        "{e.quote}" <span className="text-muted-foreground">({e.source}) — {e.why_it_matters}</span>
                      </li>
                    ))}
                  </ul>
                  {op.concerns?.length > 0 && (
                    <p className="text-amber-700"><strong>Concerns:</strong> {op.concerns.join("; ")}</p>
                  )}
                  {op.insufficient_info_notes && (
                    <p className="text-muted-foreground italic">{op.insufficient_info_notes}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Debate</h2>
            <div className="glass-card p-5 space-y-3 text-sm">
              {result.debate.turns?.map((t: any, i: number) => (
                <div key={i} className={t.opinionChanged ? "border-l-4 border-primary pl-3" : "pl-3"}>
                  <strong>{t.speaker}</strong>
                  {t.respondingTo && <span className="text-muted-foreground"> → responding to {t.respondingTo}</span>}
                  <p>{t.message}</p>
                  {t.opinionChanged && (
                    <p className="text-primary font-medium">Opinion changed → {t.newVerdict}</p>
                  )}
                </div>
              ))}
              {result.debate.unresolvedDisagreements?.length > 0 && (
                <p className="pt-2 border-t"><strong>Unresolved:</strong> {result.debate.unresolvedDisagreements.join("; ")}</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Final Decision</h2>
            <div className="glass-card p-5 text-sm space-y-2">
              <p className="text-lg font-bold gradient-text">
                {result.finalDecision.finalRecommendation} — {result.finalDecision.confidenceLevel} confidence
              </p>
              <p>{result.finalDecision.reasoning}</p>
              <p><strong>Strengths:</strong> {result.finalDecision.strengths?.join("; ")}</p>
              <p><strong>Concerns:</strong> {result.finalDecision.concerns?.join("; ")}</p>
              {result.finalDecision.unresolvedDisagreements?.length > 0 && (
                <p><strong>Unresolved disagreements:</strong> {result.finalDecision.unresolvedDisagreements.join("; ")}</p>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
