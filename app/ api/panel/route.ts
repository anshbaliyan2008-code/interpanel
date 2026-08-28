import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

const MODEL = "claude-sonnet-5"

async function askClaude(system: string, user: string, maxTokens = 1500): Promise<any> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY as string,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: user }],
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Claude API error (${res.status}): ${errText}`)
  }

  const data = await res.json()
  const raw = data.content?.map((b: any) => b.text || "").join("\n") ?? ""
  const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    // Model sometimes wraps with a stray sentence — try to salvage the JSON block
    const match = cleaned.match(/\{[\s\S]*\}/)
    if (match) {
      try {
        return JSON.parse(match[0])
      } catch {
        /* fall through */
      }
    }
    throw new Error(`Could not parse JSON from model output: ${cleaned.slice(0, 300)}`)
  }
}

const JSON_ONLY = "Respond with ONLY valid JSON. No markdown code fences, no preamble, no explanation outside the JSON object."

// ---------- Step 1: Candidate Profile Builder ----------
async function buildProfile(jobDescription: string, resume: string, transcript: string) {
  const system = `You extract structured facts from a resume and interview transcript for a hiring panel. You do not judge or score anything — only extract what is stated. ${JSON_ONLY}`
  const user = `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME:\n${resume}\n\nINTERVIEW TRANSCRIPT:\n${transcript}\n\nReturn JSON with this exact shape:
{
  "skills": string[],
  "experienceSummary": string,
  "claimsMade": string[],
  "education": string,
  "notableQuotes": string[]
}
If something isn't stated anywhere, say so explicitly inside the relevant field rather than inventing it.`
  return askClaude(system, user, 1200)
}

// ---------- Step 2: Four independent agents (separate calls, no cross-visibility) ----------
type PersonaKey = "technical" | "hr" | "manager" | "skeptic"

const PERSONAS: Record<PersonaKey, { name: string; brief: string }> = {
  technical: {
    name: "Technical Agent",
    brief:
      "You evaluate technical skill and depth ONLY. Judge whether the candidate's stated technical experience holds up under the transcript's technical questions. You are skeptical of buzzwords without depth.",
  },
  hr: {
    name: "HR / Culture Agent",
    brief:
      "You evaluate communication, teamwork, and honesty ONLY. You care about how the candidate talks about conflict, collaboration, and past teams — not technical correctness.",
  },
  manager: {
    name: "Hiring Manager Agent",
    brief:
      "You evaluate overall fit and whether this person is worth hiring for THIS specific role, weighing impact and ownership. You take a holistic, business-outcome view.",
  },
  skeptic: {
    name: "Skeptic Agent",
    brief:
      "You actively look for contradictions, exaggeration, vague non-answers, and red flags between the resume and the transcript. Your job is to find what the other reviewers might miss, not to be balanced.",
  },
}

async function runAgent(
  persona: PersonaKey,
  jobDescription: string,
  resume: string,
  transcript: string,
  profile: any
) {
  const p = PERSONAS[persona]
  const system = `You are the ${p.name} on a hiring panel. ${p.brief} You have NOT seen any other panelist's opinion — form your own independent judgment. Every claim you make must be backed by a specific quote or fact from the resume or transcript. If there isn't enough information to judge something, say so explicitly instead of guessing. ${JSON_ONLY}`
  const user = `JOB DESCRIPTION:\n${jobDescription}\n\nCANDIDATE PROFILE (extracted facts):\n${JSON.stringify(profile)}\n\nRESUME:\n${resume}\n\nINTERVIEW TRANSCRIPT:\n${transcript}\n\nReturn JSON with this exact shape:
{
  "persona": "${p.name}",
  "verdict": "Strong hire" | "Hire" | "Lean hire" | "No hire" | "Insufficient information",
  "confidence": number (0-100),
  "evidence": [ { "quote": string, "source": "resume" | "transcript", "why_it_matters": string } ],
  "concerns": string[],
  "insufficient_info_notes": string | null
}`
  const result = await askClaude(system, user, 1400)
  return { personaKey: persona, ...result }
}

// ---------- Step 3: Debate ----------
async function runDebate(opinions: any[], profile: any) {
  const system = `You are simulating a live debate between four hiring-panel personas who have each just shared their independent opinion for the first time. At least one agent MUST directly respond to another agent's specific point — agreeing, disagreeing, or explicitly changing their own verdict because of it. Do not just restate opinions side by side; there must be real back-and-forth. ${JSON_ONLY}`
  const user = `CANDIDATE PROFILE:\n${JSON.stringify(profile)}\n\nTHE FOUR INDEPENDENT OPINIONS (each formed without seeing the others):\n${JSON.stringify(opinions)}\n\nSimulate the debate. Return JSON with this exact shape:
{
  "turns": [
    {
      "speaker": string,
      "respondingTo": string | null,
      "message": string,
      "opinionChanged": boolean,
      "newVerdict": string | null
    }
  ],
  "unresolvedDisagreements": string[]
}
Include at least 5 turns. At least one turn must have "opinionChanged": true with a clear reason in "message" for why that agent updated its view.`
  return askClaude(system, user, 1800)
}

// ---------- Step 4: Final decision (evidence-weighted, not averaged) ----------
async function runFinalDecision(opinions: any[], debate: any, profile: any) {
  const system = `You are the panel chair making the final hiring call. You do NOT average the four scores. Instead, weigh each piece of evidence by how directly it relates to the role's actual requirements, how strong the supporting quote is, and how the debate changed or reinforced each agent's confidence. Explicitly explain your weighing logic. If evidence is genuinely insufficient on some dimension, say so rather than forcing a confident answer. ${JSON_ONLY}`
  const user = `CANDIDATE PROFILE:\n${JSON.stringify(profile)}\n\nORIGINAL INDEPENDENT OPINIONS:\n${JSON.stringify(opinions)}\n\nDEBATE TRANSCRIPT:\n${JSON.stringify(debate)}\n\nReturn JSON with this exact shape:
{
  "finalRecommendation": "Strong hire" | "Hire" | "Lean hire" | "No hire" | "Insufficient information",
  "confidenceLevel": "Low" | "Medium" | "High",
  "reasoning": string,
  "strengths": string[],
  "concerns": string[],
  "unresolvedDisagreements": string[]
}
"reasoning" must explain WHICH evidence you weighted most heavily and why — this is the most important field.`
  return askClaude(system, user, 1600)
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not set on the server." },
        { status: 500 }
      )
    }

    const { candidateName, jobDescription, resume, transcript } = await req.json()

    if (!jobDescription || !resume || !transcript) {
      return NextResponse.json(
        { error: "jobDescription, resume, and transcript are all required." },
        { status: 400 }
      )
    }

    // Step 1: shared profile
    const profile = await buildProfile(jobDescription, resume, transcript)

    // Step 2: four independent agents, run in parallel, none sees the others
    const [technical, hr, manager, skeptic] = await Promise.all([
      runAgent("technical", jobDescription, resume, transcript, profile),
      runAgent("hr", jobDescription, resume, transcript, profile),
      runAgent("manager", jobDescription, resume, transcript, profile),
      runAgent("skeptic", jobDescription, resume, transcript, profile),
    ])
    const opinions = [technical, hr, manager, skeptic]

    // Step 3: debate (only now do the opinions become visible to each other)
    const debate = await runDebate(opinions, profile)

    // Step 4: final, evidence-weighted decision
    const finalDecision = await runFinalDecision(opinions, debate, profile)

    return NextResponse.json({
      candidateName: candidateName || "Candidate",
      profile,
      opinions,
      debate,
      finalDecision,
    })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || "Something went wrong." }, { status: 500 })
  }
}
