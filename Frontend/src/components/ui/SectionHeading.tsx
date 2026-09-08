import { motion } from "motion/react"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center"

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isCenter ? "items-center text-center mx-auto" : "items-start text-left"} max-w-3xl mb-12 md:mb-16 ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-xs font-mono font-medium uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          {eyebrow}
        </div>
      )}
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] leading-[1.15]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
