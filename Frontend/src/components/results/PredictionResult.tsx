import { motion } from "motion/react"
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
} from "lucide-react"
import type { PredictionInput, PredictionResponse } from "../../lib/types"

interface PredictionResultProps {
  result: PredictionResponse
  inputs: PredictionInput
  onReset: () => void
  onModify: () => void
}

export function PredictionResult({
  result,
  inputs,
  onReset,
  onModify,
}: PredictionResultProps) {
  const isPositive = result.prediction === 1
  const probabilityPercent = Math.round(result.prediction_probability * 1000) / 10
  const class0Prob = Math.round((result.class_probabilities?.["0"] ?? (1 - result.prediction_probability)) * 1000) / 10
  const class1Prob = Math.round((result.class_probabilities?.["1"] ?? result.prediction_probability) * 1000) / 10

  // Format inputs into readable summary
  const inputEntries = [
    { label: "Glucose", value: `${inputs.Glucose} mg/dL` },
    { label: "BMI", value: `${inputs.BMI} kg/m²` },
    { label: "Blood Pressure", value: `${inputs.BloodPressure} mmHg` },
    { label: "Age", value: `${inputs.Age} yrs` },
    { label: "Insulin", value: `${inputs.Insulin} µU/mL` },
    { label: "Pregnancies", value: `${inputs.Pregnancies}` },
    { label: "Skin Thickness", value: `${inputs.SkinThickness} mm` },
    { label: "Pedigree Func", value: `${inputs.DiabetesPedigreeFunction.toFixed(3)}` },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto rounded-3xl border border-white/[0.1] dark:border-white/[0.1] light:border-black/[0.1] bg-[#0b0b0b]/90 dark:bg-[#0b0b0b]/90 light:bg-white/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isPositive ? "bg-amber-500/10" : "bg-emerald-500/10"
        }`}
      />

      {/* Header Eyebrow & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            Machine Learning Inference Output
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
            Assessment Outcome
          </h3>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${
            isPositive
              ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
          }`}
        >
          {isPositive ? (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Higher Predicted Likelihood</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Lower Predicted Likelihood</span>
            </>
          )}
        </div>
      </div>

      {/* Result Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 items-center">
        {/* Radial Probability Gauge */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] text-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(150, 150, 150, 0.15)"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={isPositive ? "#f59e0b" : "#10b981"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="264"
                initial={{ strokeDashoffset: 264 }}
                animate={{
                  strokeDashoffset: 264 - (264 * probabilityPercent) / 100,
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-semibold font-mono-num text-[var(--text-primary)]">
                {probabilityPercent}%
              </span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Probability
              </span>
            </div>
          </div>
          <span className="text-xs text-neutral-400 mt-3">
            Positive Class Risk Score
          </span>
        </div>

        {/* Breakdown of Class Probabilities */}
        <div className="md:col-span-2 space-y-4 p-6 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]">
          <h4 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider font-mono">
            Model Probability Distribution
          </h4>

          {/* Negative outcome bar */}
          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-400 mb-1.5">
              <span>Class 0 (Negative / Lower Risk)</span>
              <span className="font-semibold text-[var(--text-primary)]">{class0Prob}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-black/10 dark:bg-white/[0.05] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${class0Prob}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
          </div>

          {/* Positive outcome bar */}
          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-400 mb-1.5">
              <span>Class 1 (Positive / Higher Risk)</span>
              <span className="font-semibold text-[var(--text-primary)]">{class1Prob}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-black/10 dark:bg-white/[0.05] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${class1Prob}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-amber-500 rounded-full"
              />
            </div>
          </div>

          <div className="text-xs text-neutral-400 pt-2 leading-relaxed border-t border-white/[0.05] dark:border-white/[0.05] light:border-black/[0.05]">
            Calculated via softmax activation on the trained 16-unit MLPClassifier after StandardScaler normalization.
          </div>
        </div>
      </div>

      {/* Submitted Parameters Summary */}
      <div className="p-5 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] mb-8">
        <div className="flex items-center gap-2 mb-3 text-xs font-mono text-neutral-400 uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5 text-neutral-400" />
          <span>Evaluated Feature Vector</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {inputEntries.map((item) => (
            <div
              key={item.label}
              className="p-2.5 rounded-xl bg-black/40 dark:bg-black/40 light:bg-black/[0.04] border border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.04]"
            >
              <div className="text-[11px] text-neutral-400">{item.label}</div>
              <div className="text-xs font-medium text-[var(--text-primary)] font-mono-num mt-0.5">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
        <button
          type="button"
          onClick={onModify}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-black/[0.05] dark:bg-white/[0.06] hover:bg-black/[0.1] dark:hover:bg-white/[0.1] text-[var(--text-primary)] text-sm font-medium transition-colors cursor-pointer"
        >
          <Activity className="w-4 h-4 text-neutral-400" />
          <span>Adjust Input Values</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold text-sm transition-all shadow-[0_0_20px_rgba(249,115,22,0.25)] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Run Another Assessment</span>
        </button>
      </div>

      {/* Mandatory Medical / Educational Disclaimer */}
      <div className="mt-6 pt-4 border-t border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.04] text-center">
        <p className="text-[11px] text-neutral-500 leading-normal max-w-2xl mx-auto">
          <span className="font-semibold text-neutral-400">Research & Educational Notice:</span>{" "}
          This tool is intended solely for educational and machine learning demonstration purposes. It does not provide medical diagnosis, clinical advice, or treatment plans.
        </p>
      </div>
    </motion.div>
  )
}
