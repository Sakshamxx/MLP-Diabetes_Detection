"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"
import { useTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1600

const DARK_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 1,
  diffuse: 1.4,
  mapSamples: 18000,
  mapBrightness: 4.5,
  baseColor: [0.12, 0.12, 0.15],
  markerColor: [249 / 255, 115 / 255, 22 / 255],
  glowColor: [0.18, 0.12, 0.08],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.08 },
    { location: [28.6139, 77.209], size: 0.07 },
    { location: [30.0444, 31.2357], size: 0.05 },
    { location: [39.9042, 116.4074], size: 0.06 },
    { location: [-23.5505, -46.6333], size: 0.07 },
    { location: [19.4326, -99.1332], size: 0.07 },
    { location: [40.7128, -74.006], size: 0.08 },
    { location: [51.5074, -0.1278], size: 0.06 },
    { location: [35.6762, 139.6503], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.05 },
  ],
}

const LIGHT_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 18000,
  mapBrightness: 1.5,
  baseColor: [0.92, 0.94, 0.98],
  markerColor: [234 / 255, 88 / 255, 12 / 255],
  glowColor: [0.95, 0.95, 0.98],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.08 },
    { location: [28.6139, 77.209], size: 0.07 },
    { location: [30.0444, 31.2357], size: 0.05 },
    { location: [39.9042, 116.4074], size: 0.06 },
    { location: [-23.5505, -46.6333], size: 0.07 },
    { location: [19.4326, -99.1332], size: 0.07 },
    { location: [40.7128, -74.006], size: 0.08 },
    { location: [51.5074, -0.1278], size: 0.06 },
    { location: [35.6762, 139.6503], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.05 },
  ],
}

export function Globe({
  className,
}: {
  className?: string
}) {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 35,
    stiffness: 90,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    if (!canvasRef.current) return

    const activeConfig = theme === "light" ? LIGHT_GLOBE_CONFIG : DARK_GLOBE_CONFIG

    const globe = createGlobe(canvasRef.current, {
      ...activeConfig,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.003
        state.phi = phiRef.current + rs.get()
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 0)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, theme])

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[500px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-700 contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
