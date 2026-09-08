import { motion } from "motion/react"
import { ArrowDown, Sparkles, ChevronRight, ShieldCheck, Cpu } from "lucide-react"
import { Globe } from "../ui/globe"
import { TypingAnimation } from "../ui/typing-animation"
import { HeroMetrics } from "./HeroMetrics"

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 overflow-hidden bg-hero-glow"
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-ambient-grid pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/[0.08] border border-orange-500/20 text-orange-400 text-xs font-mono font-medium tracking-wider mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>MACHINE LEARNING × HEALTH RESEARCH</span>
        </motion.div>

        {/* Large Editorial Headline with Typing Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-[1.08] max-w-4xl"
        >
          <span>Diabetes </span>
          <span className="block sm:inline">
            <TypingAnimation
              words={[
                "Predictor",
                "Analyzer",
                "Assessor",
                "Diagnoser"
              ]}
              loop
              typeSpeed={70}
              deleteSpeed={40}
              pauseDelay={1000}
              cursorStyle="line"
              className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent inline-block"
            />
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 font-normal leading-relaxed max-w-2xl"
        >
          An ML-powered assessment interface built around an eight-feature diabetes prediction model with 86.36% empirical test accuracy.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <button
            type="button"
            onClick={() => scrollTo("assessment")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold text-sm transition-all duration-200 shadow-[0_0_24px_rgba(249,115,22,0.3)] hover:shadow-[0_0_32px_rgba(249,115,22,0.45)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Start Assessment</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo("model")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-neutral-200 border border-white/[0.1] font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <Cpu className="w-4 h-4 text-neutral-400" />
            <span>Explore the Model</span>
          </button>
        </motion.div>

        {/* Trust & Methodology Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-mono"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
            Zero Data Retention
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-700 hidden sm:inline-block" />
          <span>StandardScaler Normalized</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700 hidden sm:inline-block" />
          <span>FastAPI Inference Engine</span>
        </motion.div>

        {/* Atmospheric Centerpiece Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] my-6 sm:my-8"
        >
          <div className="absolute inset-0 rounded-full bg-orange-500/[0.04] blur-3xl pointer-events-none" />
          <Globe />
        </motion.div>
      </div>

      {/* Hero Information Strip */}
      <div className="relative z-10 mt-2 sm:mt-4">
        <HeroMetrics />
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={() => scrollTo("assessment")}
          className="text-neutral-500 hover:text-neutral-300 transition-colors p-2 rounded-full hover:bg-white/[0.05]"
          aria-label="Scroll down to assessment"
        >
          <ArrowDown className="w-4 h-4 animate-bounce opacity-70" />
        </button>
      </div>
    </section>
  )
}
