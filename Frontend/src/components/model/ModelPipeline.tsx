import { motion } from "motion/react"
import { Sparkles } from "lucide-react"
import { SectionHeading } from "../ui/SectionHeading"
import { CardStack } from "../ui/card-stack"

export function ModelPipeline() {
  return (
    <section id="model" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="NEURAL ARCHITECTURE"
          title="How the Assessment Pipeline Works"
          subtitle="From eight health measurements to a standardized vector and feedforward machine-learning prediction."
        />

        {/* Card Stack Interactive Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="my-6"
        >
          <CardStack />
        </motion.div>

        {/* Hyperparameter Technical Callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] p-5 sm:p-6 backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
              <div>
                <span className="text-xs font-mono text-neutral-300 dark:text-neutral-300 light:text-neutral-700 uppercase tracking-wider block sm:inline">
                  Trained Architecture Hyperparameters:
                </span>
                <span className="text-xs text-neutral-400 sm:ml-2">
                  hidden_layer_sizes=(16,), activation='relu', solver='adam', max_iter=500, random_state=42
                </span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-neutral-500">
              Scikit-learn v1.x Compatible
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
