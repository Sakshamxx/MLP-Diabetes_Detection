"use client"

import React from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

interface SwitchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "minimal"
  size?: "sm" | "default" | "lg" | "icon"
  showLabel?: boolean
}

export default function SwitchButton({
  className,
  size = "default",
  showLabel = true,
  ...props
}: SwitchButtonProps) {
  const { setTheme, theme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isDark = theme === "dark"

  const sizes = {
    icon: "h-9 w-9 p-0 justify-center",
    sm: "h-8 px-2.5 text-xs",
    default: "h-9 px-3 text-xs",
    lg: "h-11 px-5 text-sm",
  }

  return (
    <button
      type="button"
      className={cn(
        "group relative inline-flex items-center gap-1.5 rounded-xl transition-all duration-200 focus:outline-none",
        "border cursor-pointer select-none",
        isDark
          ? "bg-white/[0.04] border-white/[0.08] text-neutral-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15]"
          : "bg-black/[0.04] border-black/[0.08] text-neutral-700 hover:text-black hover:bg-black/[0.08] hover:border-black/[0.15]",
        sizes[size],
        className
      )}
      onClick={handleThemeToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      {...props}
    >
      <div className="flex items-center justify-center">
        {isDark ? (
          <Sun className="h-3.5 w-3.5 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-neutral-800 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>

      {showLabel && size !== "icon" && (
        <span className="font-mono text-[11px] font-medium tracking-tight">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  )
}
