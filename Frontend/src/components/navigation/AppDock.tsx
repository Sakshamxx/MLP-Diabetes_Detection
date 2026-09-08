"use client"

import React, { useRef, useState, useEffect } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import {
  LayoutDashboard,
  Activity,
  Cpu,
  BarChart3,
  History,
  Clock,
} from "lucide-react"
import SwitchButton from "@/components/ui/switch-button"
import UserAvatarPopover from "@/components/ui/your-avatar"

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 58
const DEFAULT_DISTANCE = 110

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { id: "home", label: "Overview", icon: LayoutDashboard },
  { id: "assessment", label: "Assessment", icon: Activity },
  { id: "model", label: "Architecture", icon: Cpu },
  { id: "performance", label: "Performance", icon: BarChart3 },
  { id: "history", label: "History", icon: History },
  { id: "activity", label: "Activity Log", icon: Clock },
]

interface DockIconProps {
  children: React.ReactNode
  mouseX: MotionValue<number>
  label: string
  isActive: boolean
  onClick: () => void
}

function DockIcon({
  children,
  mouseX,
  label,
  isActive,
  onClick,
}: DockIconProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return Infinity
    return value - (bounds.left + bounds.width / 2)
  })

  const width = useTransform(
    distance,
    [-DEFAULT_DISTANCE, 0, DEFAULT_DISTANCE],
    [DEFAULT_SIZE, DEFAULT_MAGNIFICATION, DEFAULT_SIZE]
  )

  const springWidth = useSpring(width, {
    mass: 0.1,
    stiffness: 220,
    damping: 18,
  })

  const springY = useSpring(
    useTransform(distance, [-DEFAULT_DISTANCE, 0, DEFAULT_DISTANCE], [0, -3, 0]),
    { mass: 0.1, stiffness: 220, damping: 18 }
  )

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      style={{
        width: springWidth,
        height: springWidth,
        y: springY,
      }}
      className={`
        group relative flex shrink-0 items-center justify-center rounded-xl transition-colors duration-200 focus:outline-none cursor-pointer
        ${
          isActive
            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
            : "text-neutral-400 hover:text-neutral-100 hover:bg-white/[0.08]"
        }
      `}
      aria-label={label}
    >
      {children}

      {/* Active Dot */}
      {isActive && (
        <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-orange-400" />
      )}

      {/* Tooltip */}
      <span
        className="
          pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap
          rounded-md border border-white/10 bg-[#0c0c0c] px-2.5 py-1 text-[11px] font-medium text-neutral-200
          opacity-0 shadow-lg transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100
        "
      >
        {label}
      </span>
    </motion.button>
  )
}

export function AppDock() {
  const mouseX = useMotionValue(Infinity)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      {/* Desktop Floating Navigation */}
      <div className="hidden md:block fixed left-1/2 top-5 z-50 -translate-x-1/2">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="
            flex h-[56px] items-center gap-2 rounded-2xl border border-white/[0.08]
            bg-[#090909]/90 px-3 shadow-2xl backdrop-blur-xl
          "
        >
          {/* Main Navigation Links */}
          <div className="flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <DockIcon
                  key={item.id}
                  mouseX={mouseX}
                  label={item.label}
                  isActive={isActive}
                  onClick={() => scrollTo(item.id)}
                >
                  <Icon className="h-4 w-4" />
                </DockIcon>
              )
            })}
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-white/[0.1] mx-1" />

          {/* Theme Switch & User Profile */}
          <div className="flex items-center gap-2">
            <SwitchButton size="sm" showLabel={false} />
            <UserAvatarPopover />
          </div>
        </motion.div>
      </div>

      {/* Mobile Top Header with Theme Switch & Avatar */}
      <div className="md:hidden fixed top-3 right-4 z-50 flex items-center gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#090909]/85 border border-white/10 backdrop-blur-xl shadow-lg">
          <SwitchButton size="sm" showLabel={false} />
          <UserAvatarPopover />
        </div>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <div className="md:hidden fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md">
        <div className="flex h-14 items-center justify-around rounded-2xl border border-white/[0.1] bg-[#0c0c0c]/90 px-3 shadow-2xl backdrop-blur-xl">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-xl transition-colors
                  ${
                    isActive
                      ? "text-orange-400 bg-orange-500/10 font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }
                `}
                aria-label={item.label}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[9px] mt-0.5 tracking-tight font-medium">
                  {item.label.split(" ")[0]}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
