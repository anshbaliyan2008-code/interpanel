"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A small AI-panelist robot that lives near the right edge of the screen
 * and smoothly tracks the cursor (eyes + slight body drift), with an
 * idle float animation when the mouse is still. No external deps.
 *
 * Drop this in and render <CursorRobot /> once, near the end of your
 * root layout's <body> (it's `fixed`, so placement in the tree doesn't matter).
 */
export default function CursorRobot() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pupilLRef = useRef<SVGCircleElement>(null)
  const pupilRRef = useRef<SVGCircleElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0, angle: 0 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener("mousemove", onMove)

    // dock position: right edge of viewport, vertically tracks mouse Y
    const dockX = () => window.innerWidth - 72

    let raf: number
    const tick = () => {
      const targetX = dockX()
      const targetY = Math.min(Math.max(mouse.current.y - 40, 40), window.innerHeight - 120)

      // lerp toward target for smooth, slightly lazy follow
      pos.current.x += (targetX - pos.current.x) * 0.12
      pos.current.y += (targetY - pos.current.y) * 0.12

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }

      // eyes look toward actual cursor position
      const dx = mouse.current.x - (pos.current.x + 36)
      const dy = mouse.current.y - (pos.current.y + 40)
      const dist = Math.min(Math.hypot(dx, dy) / 40, 1)
      const angle = Math.atan2(dy, dx)
      const ex = Math.cos(angle) * dist * 2.2
      const ey = Math.sin(angle) * dist * 2.2

      if (pupilLRef.current) pupilLRef.current.setAttribute("cx", String(27 + ex))
      if (pupilLRef.current) pupilLRef.current.setAttribute("cy", String(38 + ey))
      if (pupilRRef.current) pupilRRef.current.setAttribute("cx", String(45 + ex))
      if (pupilRRef.current) pupilRRef.current.setAttribute("cy", String(38 + ey))

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!ready) return null

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
      style={{ willChange: "transform" }}
    >
      <div className="animate-[robot-float_3.2s_ease-in-out_infinite]">
        <svg width="72" height="88" viewBox="0 0 72 88" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* antenna */}
          <line x1="36" y1="6" x2="36" y2="16" stroke="#6366F1" strokeWidth="2" />
          <circle cx="36" cy="5" r="3.5" fill="#22D3EE">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
          </circle>

          {/* head */}
          <rect x="10" y="16" width="52" height="44" rx="16" fill="url(#robotHeadGrad)" stroke="#818CF8" strokeWidth="1.5" />

          {/* visor */}
          <rect x="18" y="28" width="36" height="24" rx="12" fill="#0B1120" />
          <circle ref={pupilLRef} cx="27" cy="38" r="4" fill="#22D3EE" />
          <circle ref={pupilRRef} cx="45" cy="38" r="4" fill="#22D3EE" />

          {/* ears */}
          <rect x="2" y="30" width="8" height="14" rx="4" fill="#818CF8" />
          <rect x="62" y="30" width="8" height="14" rx="4" fill="#818CF8" />

          {/* body hint */}
          <path d="M20 60 Q36 70 52 60 L48 80 Q36 86 24 80 Z" fill="url(#robotBodyGrad)" stroke="#818CF8" strokeWidth="1.2" />

          <defs>
            <linearGradient id="robotHeadGrad" x1="10" y1="16" x2="62" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EEF2FF" />
              <stop offset="1" stopColor="#E0E7FF" />
            </linearGradient>
            <linearGradient id="robotBodyGrad" x1="20" y1="60" x2="52" y2="86" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C7D2FE" />
              <stop offset="1" stopColor="#A5B4FC" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style jsx global>{`
        @keyframes robot-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
        }
      `}</style>
    </div>
  )
}
