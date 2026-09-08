import { useState } from "react"
import { motion } from "motion/react"
import {
  TrendingDown,
  Grid2X2,
  Table,
  PieChart,
  Info,
} from "lucide-react"
import { SectionHeading } from "../ui/SectionHeading"

// Sampled real loss curve points from model.loss_curve_ (500 epochs)
const LOSS_CURVE_POINTS = [
  { epoch: 1, loss: 0.8773 },
  { epoch: 26, loss: 0.5508 },
  { epoch: 52, loss: 0.4476 },
  { epoch: 78, loss: 0.4079 },
  { epoch: 104, loss: 0.3851 },
  { epoch: 130, loss: 0.3716 },
  { epoch: 156, loss: 0.3602 },
  { epoch: 182, loss: 0.3508 },
  { epoch: 208, loss: 0.3427 },
  { epoch: 234, loss: 0.3356 },
  { epoch: 260, loss: 0.3296 },
  { epoch: 286, loss: 0.3247 },
  { epoch: 312, loss: 0.3198 },
  { epoch: 338, loss: 0.3159 },
  { epoch: 364, loss: 0.3114 },
  { epoch: 390, loss: 0.3074 },
  { epoch: 416, loss: 0.3042 },
  { epoch: 442, loss: 0.3019 },
  { epoch: 468, loss: 0.2992 },
  { epoch: 500, loss: 0.2965 },
]

export function ModelPerformance() {
  const [hoveredEpoch, setHoveredEpoch] = useState<(typeof LOSS_CURVE_POINTS)[0] | null>(
    LOSS_CURVE_POINTS[LOSS_CURVE_POINTS.length - 1]
  )

  // SVG Chart path calculation
  const width = 460
  const height = 180
  const padding = 25
  const minLoss = 0.25
  const maxLoss = 0.95

  const pointsString = LOSS_CURVE_POINTS.map((pt, i) => {
    const x = padding + (i / (LOSS_CURVE_POINTS.length - 1)) * (width - 2 * padding)
    const y =
      height -
      padding -
      ((pt.loss - minLoss) / (maxLoss - minLoss)) * (height - 2 * padding)
    return `${x},${y}`
  }).join(" ")

  return (
    <section id="performance" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-section-glow">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="EMPIRICAL BENCHMARKS"
          title="Model Performance & Validation"
          subtitle="Evaluation metrics recorded on the holdout test set (20% split, 154 samples). All statistics reflect actual trained model performance."
        />

        {/* 3 Key Overall Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#0c0c0c]/80 dark:bg-[#0c0c0c]/80 light:bg-white/80 backdrop-blur-md"
          >
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Holdout Accuracy
            </div>
            <div className="text-4xl font-semibold text-[var(--text-primary)] font-mono-num">
              86.36%
            </div>
            <div className="text-xs text-neutral-500 mt-2">
              133 of 154 test samples correctly classified
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#0c0c0c]/80 dark:bg-[#0c0c0c]/80 light:bg-white/80 backdrop-blur-md"
          >
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Macro F1-Score
            </div>
            <div className="text-4xl font-semibold text-orange-400 font-mono-num">
              0.85
            </div>
            <div className="text-xs text-neutral-500 mt-2">
              Unweighted average between class 0 and 1
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#0c0c0c]/80 dark:bg-[#0c0c0c]/80 light:bg-white/80 backdrop-blur-md"
          >
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Weighted F1-Score
            </div>
            <div className="text-4xl font-semibold text-[var(--text-primary)] font-mono-num">
              0.86
            </div>
            <div className="text-xs text-neutral-500 mt-2">
              Weighted by class support in test distribution
            </div>
          </motion.div>
        </div>

        {/* 2-Column Analytics Layout: Confusion Matrix & Classification Report */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Classification Report Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-6 sm:p-7"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                <Table className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight uppercase font-mono">
                Class-Level Metrics Breakdown
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] text-neutral-400 font-mono">
                    <th className="pb-3 font-medium">Class Label</th>
                    <th className="pb-3 font-medium">Precision</th>
                    <th className="pb-3 font-medium">Recall</th>
                    <th className="pb-3 font-medium">F1-Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] dark:divide-white/[0.04] light:divide-black/[0.04] font-mono-num">
                  <tr className="hover:bg-white/[0.02] dark:hover:bg-white/[0.02] light:hover:bg-black/[0.02]">
                    <td className="py-3 font-medium text-[var(--text-primary)]">
                      Class 0 (Negative)
                    </td>
                    <td className="py-3 text-[var(--text-secondary)]">0.88</td>
                    <td className="py-3 text-emerald-500">0.92</td>
                    <td className="py-3 text-[var(--text-primary)] font-semibold">0.90</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] dark:hover:bg-white/[0.02] light:hover:bg-black/[0.02]">
                    <td className="py-3 font-medium text-[var(--text-primary)]">
                      Class 1 (Positive)
                    </td>
                    <td className="py-3 text-[var(--text-secondary)]">0.84</td>
                    <td className="py-3 text-amber-500">0.76</td>
                    <td className="py-3 text-[var(--text-primary)] font-semibold">0.80</td>
                  </tr>
                  <tr className="text-neutral-400 font-medium">
                    <td className="py-3">Weighted Avg</td>
                    <td className="py-3">0.86</td>
                    <td className="py-3">0.86</td>
                    <td className="py-3 text-[var(--text-primary)] font-semibold">0.86</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.04] flex items-center justify-between text-[11px] text-neutral-500">
              <span>Test Support: 100 (Class 0) / 54 (Class 1)</span>
              <span className="font-mono">Total n=154</span>
            </div>
          </motion.div>

          {/* Confusion Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-3xl p-6 sm:p-7"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                  <Grid2X2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight uppercase font-mono">
                  Test Confusion Matrix
                </h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                154 Predictions
              </span>
            </div>

            {/* 2x2 Grid Visualization */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* True Negative */}
              <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 text-center">
                <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider mb-1">
                  True Negative (TN)
                </div>
                <div className="text-3xl font-semibold text-[var(--text-primary)] font-mono-num">
                  92
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Actual 0 → Predicted 0
                </div>
              </div>

              {/* False Positive */}
              <div className="p-4 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] text-center">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  False Positive (FP)
                </div>
                <div className="text-3xl font-semibold text-[var(--text-secondary)] font-mono-num">
                  8
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Actual 0 → Predicted 1
                </div>
              </div>

              {/* False Negative */}
              <div className="p-4 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] text-center">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  False Negative (FN)
                </div>
                <div className="text-3xl font-semibold text-[var(--text-secondary)] font-mono-num">
                  13
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Actual 1 → Predicted 0
                </div>
              </div>

              {/* True Positive */}
              <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-center">
                <div className="text-[10px] font-mono text-amber-500 uppercase tracking-wider mb-1">
                  True Positive (TP)
                </div>
                <div className="text-3xl font-semibold text-[var(--text-primary)] font-mono-num">
                  41
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Actual 1 → Predicted 1
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.04]">
              <span>Specificity: <strong className="text-[var(--text-primary)] font-mono">92.0%</strong></span>
              <span>Sensitivity (Recall): <strong className="text-[var(--text-primary)] font-mono">75.9%</strong></span>
            </div>
          </motion.div>
        </div>

        {/* 2-Column: Training Loss Sparkline Chart & Dataset Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Training Loss Sparkline Chart (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-7"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight uppercase font-mono">
                    Neural Training Loss Convergence
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Adam Optimization across 500 epochs
                  </p>
                </div>
              </div>

              {hoveredEpoch && (
                <div className="inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <span>Epoch {hoveredEpoch.epoch}</span>
                  <span>•</span>
                  <span>Loss: {hoveredEpoch.loss.toFixed(4)}</span>
                </div>
              )}
            </div>

            {/* SVG Loss Curve */}
            <div className="relative w-full h-[180px] bg-black/40 dark:bg-black/40 light:bg-neutral-100 rounded-2xl border border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.06] p-2 flex items-center justify-center overflow-hidden">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-full overflow-visible"
              >
                {/* Horizontal reference grid */}
                <line
                  x1={padding}
                  y1={padding}
                  x2={width - padding}
                  y2={padding}
                  stroke="rgba(150,150,150,0.12)"
                  strokeDasharray="3,3"
                />
                <line
                  x1={padding}
                  y1={height / 2}
                  x2={width - padding}
                  y2={height / 2}
                  stroke="rgba(150,150,150,0.12)"
                  strokeDasharray="3,3"
                />
                <line
                  x1={padding}
                  y1={height - padding}
                  x2={width - padding}
                  y2={height - padding}
                  stroke="rgba(150,150,150,0.12)"
                  strokeDasharray="3,3"
                />

                {/* Shaded Area under Curve */}
                <polygon
                  points={`${padding},${height - padding} ${pointsString} ${width - padding},${height - padding}`}
                  fill="rgba(249, 115, 22, 0.08)"
                />

                {/* Loss Curve Line */}
                <polyline
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pointsString}
                />

                {/* Data Points */}
                {LOSS_CURVE_POINTS.map((pt, i) => {
                  const x =
                    padding +
                    (i / (LOSS_CURVE_POINTS.length - 1)) * (width - 2 * padding)
                  const y =
                    height -
                    padding -
                    ((pt.loss - minLoss) / (maxLoss - minLoss)) *
                      (height - 2 * padding)

                  const isHovered = hoveredEpoch?.epoch === pt.epoch

                  return (
                    <circle
                      key={pt.epoch}
                      cx={x}
                      cy={y}
                      r={isHovered ? 5 : 2.5}
                      fill={isHovered ? "#fff" : "#f97316"}
                      stroke="#000"
                      strokeWidth="1"
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredEpoch(pt)}
                    />
                  )
                })}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-2 px-1">
              <span>Epoch 1 (Loss: 0.8773)</span>
              <span>Monotonic Loss Decay</span>
              <span>Epoch 500 (Loss: 0.2965)</span>
            </div>
          </motion.div>

          {/* Dataset Distribution (1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                  <PieChart className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight uppercase font-mono">
                  Dataset Composition
                </h3>
              </div>

              <div className="space-y-3 my-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-[var(--text-secondary)]">
                    <span>Outcome 0 (Negative)</span>
                    <span className="font-semibold text-emerald-500">
                      500 (65.1%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/[0.05] overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[65.1%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-[var(--text-secondary)]">
                    <span>Outcome 1 (Positive)</span>
                    <span className="font-semibold text-amber-500">
                      268 (34.9%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/[0.05] overflow-hidden">
                    <div className="h-full bg-amber-500 w-[34.9%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] text-[11px] text-neutral-500 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 font-medium">
                <Info className="w-3.5 h-3.5" />
                <span>Split Architecture</span>
              </div>
              <p>
                80% Training (614 rows) • 20% Test (154 rows) • 8 input dimensions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
