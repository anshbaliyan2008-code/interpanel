import { describe, it, expect } from "vitest"
import { parseClaudeJson } from "../lib/parse-claude-json"

describe("parseClaudeJson", () => {
  it("parses plain JSON", () => {
    const result = parseClaudeJson('{"verdict": "Hire", "confidence": 80}')
    expect(result.verdict).toBe("Hire")
    expect(result.confidence).toBe(80)
  })

  it("strips markdown code fences before parsing", () => {
    const raw = '```json\n{"verdict": "No hire"}\n```'
    const result = parseClaudeJson(raw)
    expect(result.verdict).toBe("No hire")
  })

  it("salvages JSON even with stray text around it", () => {
    const raw = 'Here is the result:\n{"verdict": "Lean hire", "confidence": 55}\nHope that helps!'
    const result = parseClaudeJson(raw)
    expect(result.verdict).toBe("Lean hire")
    expect(result.confidence).toBe(55)
  })

  it("throws a clear error when there is no valid JSON at all", () => {
    expect(() => parseClaudeJson("no json here")).toThrow(/Could not parse JSON/)
  })

  it("handles nested objects and arrays correctly", () => {
    const raw = JSON.stringify({
      persona: "Skeptic Agent",
      evidence: [{ quote: "sole architect", source: "resume" }],
      concerns: ["inconsistent with transcript"],
    })
    const result = parseClaudeJson(raw)
    expect(result.evidence[0].quote).toBe("sole architect")
    expect(result.concerns).toHaveLength(1)
  })
})
