/**
 * Parses a Claude API text response into JSON, tolerating markdown fences
 * or stray text around the JSON object. Pure function — no network calls —
 * so it's easy to unit test.
 */
export function parseClaudeJson(raw: string): any {
  const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim()

  try {
    return JSON.parse(cleaned)
  } catch {
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
