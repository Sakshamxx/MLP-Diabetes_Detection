/* eslint-disable react-refresh/only-export-components */
"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  User,
  Upload,
  Trash2,
  Check,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface AvatarOption {
  id: number
  alt: string
  svg: React.ReactNode
}

export const PRESET_AVATARS: AvatarOption[] = [
  {
    id: 1,
    alt: "Amber Minimalist",
    svg: (
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="18" fill="#f97316" />
        <circle cx="18" cy="14" r="6" fill="#ffffff" />
        <path d="M7 32C7 25.9249 11.9249 21 18 21C24.0751 21 29 25.9249 29 32" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: 2,
    alt: "Teal Research",
    svg: (
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="18" fill="#0d9488" />
        <circle cx="18" cy="14" r="6" fill="#ffffff" />
        <path d="M7 32C7 25.9249 11.9249 21 18 21C24.0751 21 29 25.9249 29 32" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: 3,
    alt: "Indigo Clinical",
    svg: (
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="18" fill="#4f46e5" />
        <circle cx="18" cy="14" r="6" fill="#ffffff" />
        <path d="M7 32C7 25.9249 11.9249 21 18 21C24.0751 21 29 25.9249 29 32" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: 4,
    alt: "Slate Neutral",
    svg: (
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="18" fill="#334155" />
        <circle cx="18" cy="14" r="6" fill="#ffffff" />
        <path d="M7 32C7 25.9249 11.9249 21 18 21C24.0751 21 29 25.9249 29 32" fill="#ffffff" />
      </svg>
    ),
  },
]

const STORAGE_KEY = "diabetes_ml_user_avatar"

interface ProfileData {
  type: "preset" | "custom"
  presetId: number
  customDataUrl: string | null
  name: string
}

const DEFAULT_PROFILE: ProfileData = {
  type: "preset",
  presetId: 1,
  customDataUrl: null,
  name: "Researcher",
}

export function UserAvatarPopover({
  className,
}: {
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [profile, setProfile] = useState<ProfileData>(() => {
    if (typeof window === "undefined") return DEFAULT_PROFILE
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE
  })

  const popoverRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // fallback
    }
  }, [profile])

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handlePresetSelect = (id: number) => {
    setProfile({
      type: "preset",
      presetId: id,
      customDataUrl: null,
      name: profile.name,
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limit to reasonable size for localStorage (e.g. 1.5MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be under 2MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setProfile({
          type: "custom",
          presetId: 1,
          customDataUrl: event.target.result,
          name: profile.name,
        })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    setProfile(DEFAULT_PROFILE)
  }

  const currentPreset =
    PRESET_AVATARS.find((a) => a.id === profile.presetId) ?? PRESET_AVATARS[0]

  return (
    <div className={cn("relative inline-flex items-center", className)} ref={popoverRef}>
      {/* Trigger Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] dark:border-white/[0.12] light:border-black/[0.12] bg-white/[0.04] p-0.5 transition-all duration-200 hover:border-orange-500/50 hover:scale-105 focus:outline-none"
        aria-label="User Profile Menu"
        aria-expanded={isOpen}
      >
        <div className="h-full w-full overflow-hidden rounded-[10px]">
          {profile.type === "custom" && profile.customDataUrl ? (
            <img
              src={profile.customDataUrl}
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            currentPreset.svg
          )}
        </div>
      </button>

      {/* Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-white/[0.1] dark:border-white/[0.1] bg-[#0c0c0c]/95 dark:bg-[#0c0c0c]/95 text-white dark:text-white p-4 shadow-2xl backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                  Researcher Profile
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Avatar Stage Preview */}
            <div className="flex flex-col items-center py-4 text-center">
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-orange-500/40 p-0.5 shadow-[0_0_20px_rgba(249,115,22,0.2)] mb-2">
                {profile.type === "custom" && profile.customDataUrl ? (
                  <img
                    src={profile.customDataUrl}
                    alt="Custom profile preview"
                    className="h-full w-full object-cover rounded-[14px]"
                  />
                ) : (
                  currentPreset.svg
                )}
              </div>
              <span className="text-xs font-medium text-neutral-200">
                {profile.type === "custom" ? "Custom Photo" : currentPreset.alt}
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                Local Device Preference
              </span>
            </div>

            {/* Presets Grid */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-neutral-400">
                  Preset Avatars
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_AVATARS.map((avatar) => {
                  const isSelected =
                    profile.type === "preset" && profile.presetId === avatar.id

                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => handlePresetSelect(avatar.id)}
                      className={cn(
                        "relative h-10 w-10 rounded-xl overflow-hidden p-0.5 border transition-all",
                        isSelected
                          ? "border-orange-500 ring-2 ring-orange-500/30 scale-105"
                          : "border-white/[0.08] hover:border-white/[0.2] opacity-70 hover:opacity-100"
                      )}
                    >
                      {avatar.svg}
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white drop-shadow" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Upload & Reset Actions */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-neutral-200 border border-white/[0.08] transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-orange-400" />
                <span>Upload Custom Photo</span>
              </button>

              {profile.type === "custom" && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-400 border border-red-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Custom Photo</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserAvatarPopover
