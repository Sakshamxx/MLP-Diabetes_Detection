"use client"

import React, { useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"

const DEFAULT_SIZE = 44
const DEFAULT_MAGNIFICATION = 72
const DEFAULT_DISTANCE = 140

type DockIconProps = {
  children: React.ReactNode
  mouseX: MotionValue<number>
  label: string
  onClick: () => void
}

function DockIcon({
  children,
  mouseX,
  label,
  onClick,
}: DockIconProps) {
  const ref = useRef<HTMLButtonElement>(null)

  /*
   * Calculate the cursor's distance from the CENTER
   * of this particular icon.
   */
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect()

    if (!bounds) {
      return Infinity
    }

    return value - (bounds.left + bounds.width / 2)
  })

  /*
   * Icon size changes according to cursor distance.
   *
   * Far away  -> 44px
   * Close     -> 72px
   * Far again -> 44px
   */
  const width = useTransform(
    distance,
    [-DEFAULT_DISTANCE, 0, DEFAULT_DISTANCE],
    [DEFAULT_SIZE, DEFAULT_MAGNIFICATION, DEFAULT_SIZE]
  )

  const height = width

  /*
   * Spring physics = the buttery Magic UI feeling.
   */
  const springWidth = useSpring(width, {
    mass: 0.12,
    stiffness: 180,
    damping: 14,
  })

  const springHeight = useSpring(height, {
    mass: 0.12,
    stiffness: 180,
    damping: 14,
  })

  /*
   * Slight lift as the icon gets larger.
   */
  const y = useTransform(
    distance,
    [-DEFAULT_DISTANCE, 0, DEFAULT_DISTANCE],
    [0, -5, 0]
  )

  const springY = useSpring(y, {
    mass: 0.12,
    stiffness: 180,
    damping: 14,
  })

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      style={{
        width: springWidth,
        height: springHeight,
        y: springY,
      }}
      className="
        group
        relative
        flex
        shrink-0
        items-center
        justify-center
        rounded-full
        text-white
        transition-colors
        duration-200
        hover:bg-white/[0.08]
        hover:text-orange-500
        focus:outline-none
      "
      aria-label={label}
    >
      {children}

      {/* Tooltip */}
      <span
        className="
          pointer-events-none
          absolute
          -top-12
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          rounded-lg
          border
          border-white/10
          bg-black/95
          px-3
          py-1.5
          text-xs
          font-medium
          text-white
          opacity-0
          shadow-xl
          transition-all
          duration-200
          group-hover:-translate-y-1
          group-hover:opacity-100
        "
      >
        {label}

        {/* little arrow */}
        <span
          className="
            absolute
            left-1/2
            top-full
            -translate-x-1/2
            border-x-[6px]
            border-t-[6px]
            border-x-transparent
            border-t-black
          "
        />
      </span>
    </motion.button>
  )
}

const Icons = {
  home: (props: React.SVGAttributes<SVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9 21V14H15V21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  prediction: (props: React.SVGAttributes<SVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M9 9H15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M9 12H15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M9 15H12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <circle
        cx="17"
        cy="17"
        r="3"
        fill="currentColor"
      />

      <path
        d="M17 15.5V18.5M15.5 17H18.5"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  ),

  activity: (props: React.SVGAttributes<SVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 12H6L8.5 5L12 19L15 9L17.5 14H21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="8.5"
        cy="5"
        r="1.2"
        fill="currentColor"
      />

      <circle
        cx="12"
        cy="19"
        r="1.2"
        fill="currentColor"
      />
    </svg>
  ),

  history: (props: React.SVGAttributes<SVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C9.23858 21 6.78332 19.7564 5.19215 17.8125"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M3 7V12H8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M12 7V12L15.5 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

const items = [
  {
    id: "home",
    label: "Home",
    icon: Icons.home,
  },
  {
    id: "prediction",
    label: "Prediction Engine",
    icon: Icons.prediction,
  },
  {
    id: "activity",
    label: "User Activity",
    icon: Icons.activity,
  },
  {
    id: "history",
    label: "Prediction History",
    icon: Icons.history,
  },
]

export function AppDock() {
  /*
   * This is the magic part.
   *
   * It tracks the cursor's X position across the
   * entire dock. Every icon calculates its own
   * distance from this value.
   */
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(event) => {
        mouseX.set(event.clientX)
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity)
      }}
      className="
        flex
        h-[72px]
        items-center
        gap-2
        rounded-2xl
        border
        border-white/[0.12]
        bg-black/80
        px-3
        shadow-[0_8px_40px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
      "
    >
      {items.map((item) => {
        const Icon = item.icon

        return (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            label={item.label}
            onClick={() => {
              document
                .getElementById(item.id)
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }}
          >
            <Icon className="h-6 w-6" />
          </DockIcon>
        )
      })}
    </motion.div>
  )
}