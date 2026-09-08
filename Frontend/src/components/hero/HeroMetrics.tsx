import { motion } from "motion/react"
import { Activity, Binary, BrainCircuit, Database } from "lucide-react"

const metrics = [
  {
    icon: Activity,
    value: "8",
    label: "Input Features",
    detail: "Clinical & diagnostic biomarkers",
  },
  {
    icon: Binary,
    value: "86.36%",
    label: "Test Accuracy",
    detail: "Evaluated on 20% holdout split",
  },
  {
    icon: BrainCircuit,
    value: "16",
    label: "MLP Neurons",
    detail: "Feedforward neural architecture",
  },
  {
    icon: Database,
    value: "768",
    label: "Dataset Samples",
    detail: "Standardized clinical records",
  },
]

export function HeroMetrics() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              className="group relative rounded-2xl border border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] bg-[#0c0c0c]/80 dark:bg-[#0c0c0c]/80 bg-white/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-orange-500/30 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] text-neutral-500 dark:text-neutral-400 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Verified
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] font-mono-num mb-1">
                {item.value}
              </div>

              <div className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
                {item.label}
              </div>

              <div className="text-[11px] text-neutral-500 mt-1 leading-snug hidden sm:block">
                {item.detail}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
