import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Activity,
  User,
  Heart,
  FlaskConical,
  Dna,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Check,
  RotateCcw,
} from "lucide-react"
import { api } from "../../lib/api"
import type { PredictionInput, PredictionResponse } from "../../lib/types"
import { SectionHeading } from "../ui/SectionHeading"
import { PredictionResult } from "../results/PredictionResult"
import Loader from "../ui/loader"

interface InputFieldConfig {
  key: keyof PredictionInput
  label: string
  unit: string
  min: number
  max: number
  step: number
  helper: string
  placeholder: string
}

const CATEGORIES: {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  fields: InputFieldConfig[]
}[] = [
  {
    id: "personal",
    name: "Personal Profile",
    description: "Demographic and reproductive metrics",
    icon: User,
    fields: [
      {
        key: "Pregnancies",
        label: "Pregnancies",
        unit: "count",
        min: 0,
        max: 20,
        step: 1,
        helper: "Total number of completed pregnancies",
        placeholder: "e.g. 1",
      },
      {
        key: "Age",
        label: "Age",
        unit: "years",
        min: 18,
        max: 100,
        step: 1,
        helper: "Current age in completed years",
        placeholder: "e.g. 33",
      },
    ],
  },
  {
    id: "body",
    name: "Body Measurements",
    description: "Anthropometric and vascular indicators",
    icon: Heart,
    fields: [
      {
        key: "BMI",
        label: "Body Mass Index (BMI)",
        unit: "kg/m²",
        min: 10,
        max: 70,
        step: 0.1,
        helper: "Weight in kilograms divided by height in meters squared",
        placeholder: "e.g. 26.5",
      },
      {
        key: "BloodPressure",
        label: "Diastolic Blood Pressure",
        unit: "mmHg",
        min: 30,
        max: 150,
        step: 1,
        helper: "Resting diastolic arterial pressure",
        placeholder: "e.g. 72",
      },
      {
        key: "SkinThickness",
        label: "Triceps Skin Fold",
        unit: "mm",
        min: 0,
        max: 99,
        step: 1,
        helper: "Subcutaneous fat layer thickness at triceps",
        placeholder: "e.g. 23",
      },
    ],
  },
  {
    id: "lab",
    name: "Laboratory Values",
    description: "Plasma biochemistry & endocrine markers",
    icon: FlaskConical,
    fields: [
      {
        key: "Glucose",
        label: "Plasma Glucose Concentration",
        unit: "mg/dL",
        min: 40,
        max: 300,
        step: 1,
        helper: "2-hour plasma glucose in oral glucose tolerance test",
        placeholder: "e.g. 118",
      },
      {
        key: "Insulin",
        label: "2-Hour Serum Insulin",
        unit: "µU/mL",
        min: 0,
        max: 900,
        step: 1,
        helper: "Normal or reactive serum insulin level",
        placeholder: "e.g. 84",
      },
    ],
  },
  {
    id: "genetic",
    name: "Family Genetics",
    description: "Hereditary risk function",
    icon: Dna,
    fields: [
      {
        key: "DiabetesPedigreeFunction",
        label: "Diabetes Pedigree Function",
        unit: "score (0.078 – 2.42)",
        min: 0.05,
        max: 2.5,
        step: 0.001,
        helper: "Genetic score synthesizing family history of diabetes",
        placeholder: "e.g. 0.375",
      },
    ],
  },
]

const PRESETS: {
  label: string
  desc: string
  data: PredictionInput
}[] = [
  {
    label: "Standard Baseline",
    desc: "Average clinical reference metrics",
    data: {
      Pregnancies: 1,
      Glucose: 105,
      BloodPressure: 72,
      SkinThickness: 23,
      Insulin: 85,
      BMI: 25.4,
      DiabetesPedigreeFunction: 0.35,
      Age: 31,
    },
  },
  {
    label: "Elevated Risk Profile",
    desc: "Higher glucose, BMI & heredity score",
    data: {
      Pregnancies: 4,
      Glucose: 168,
      BloodPressure: 84,
      SkinThickness: 35,
      Insulin: 185,
      BMI: 34.2,
      DiabetesPedigreeFunction: 0.82,
      Age: 48,
    },
  },
  {
    label: "Low Risk Profile",
    desc: "Optimal metabolic & demographic values",
    data: {
      Pregnancies: 0,
      Glucose: 88,
      BloodPressure: 68,
      SkinThickness: 18,
      Insulin: 60,
      BMI: 21.5,
      DiabetesPedigreeFunction: 0.22,
      Age: 24,
    },
  },
]

export function AssessmentSection() {
  const [formData, setFormData] = useState<PredictionInput>(PRESETS[0].data)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (key: keyof PredictionInput, value: string) => {
    const num = parseFloat(value)
    setFormData((prev) => ({
      ...prev,
      [key]: isNaN(num) ? 0 : num,
    }))
  }

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setFormData(preset.data)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setError(null)

    try {
      const res = await api.predict(formData)
      // Smooth visual transition
      await new Promise((r) => setTimeout(r, 650))
      setResult(res)
      window.dispatchEvent(new Event("activity-updated"))
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't complete the assessment. Please ensure the backend is active."
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <section id="assessment" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-section-glow">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="RISK ASSESSMENT ENGINE"
          title="Interactive Clinical Assessment"
          subtitle="Enter health biomarkers to evaluate model inference. Inputs are standardized and evaluated against the trained Multilayer Perceptron."
        />

        {/* Dynamic Display: Form vs Loader vs Result */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl p-12 sm:p-16 flex flex-col items-center justify-center min-h-[420px]"
            >
              <Loader
                title="Evaluating Clinical Assessment"
                subtitle="Processing standardized biomarker vector through the neural network..."
                size="md"
              />
            </motion.div>
          ) : result ? (
            <PredictionResult
              key="result"
              result={result}
              inputs={formData}
              onReset={handleReset}
              onModify={() => setResult(null)}
            />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-3xl p-6 sm:p-10"
            >
              {/* Preset Selectors */}
              <div className="mb-8 pb-6 border-b border-white/[0.08] dark:border-white/[0.08] border-black/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-mono text-neutral-300 dark:text-neutral-300 text-neutral-700 uppercase tracking-wider">
                      Quick Benchmark Profiles
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    8/8 Parameters Configured
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRESETS.map((p) => {
                    const isSelected =
                      formData.Glucose === p.data.Glucose &&
                      formData.BMI === p.data.BMI &&
                      formData.Age === p.data.Age

                    return (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => applyPreset(p)}
                        className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-orange-500/10 border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                            : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-100 hover:bg-white/[0.05] hover:border-white/[0.12]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{p.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1">{p.desc}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Assessment Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {CATEGORIES.map((cat) => {
                    const CatIcon = cat.icon
                    return (
                      <div
                        key={cat.id}
                        className="p-5 sm:p-6 rounded-2xl bg-white/[0.015] dark:bg-white/[0.015] bg-black/[0.015] border border-white/[0.06] dark:border-white/[0.06] border-black/[0.06] space-y-4"
                      >
                        <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06] dark:border-white/[0.06] border-black/[0.06]">
                          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                            <CatIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold tracking-tight">
                              {cat.name}
                            </h3>
                            <p className="text-xs text-neutral-400">{cat.description}</p>
                          </div>
                        </div>

                        <div className="space-y-4 pt-1">
                          {cat.fields.map((field) => (
                            <div key={field.key} className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <label
                                  htmlFor={field.key}
                                  className="text-xs font-medium text-neutral-300 dark:text-neutral-300 text-neutral-700"
                                >
                                  {field.label}
                                </label>
                                <span className="text-[11px] font-mono text-neutral-500">
                                  {field.unit}
                                </span>
                              </div>

                              <div className="relative">
                                <input
                                  id={field.key}
                                  type="number"
                                  name={field.key}
                                  min={field.min}
                                  max={field.max}
                                  step={field.step}
                                  required
                                  value={formData[field.key]}
                                  onChange={(e) => handleChange(field.key, e.target.value)}
                                  placeholder={field.placeholder}
                                  className="w-full rounded-xl bg-black/50 dark:bg-black/50 bg-white/80 border border-white/10 dark:border-white/10 border-black/10 px-3.5 py-2.5 text-sm font-mono-num placeholder:text-neutral-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all"
                                />
                              </div>

                              <p className="text-[11px] text-neutral-500 leading-tight">
                                {field.helper}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Error Banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold">Prediction Unavailable</div>
                        <div className="text-xs text-red-400/90 mt-0.5">{error}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold text-red-300 transition-colors shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                      Try Again
                    </button>
                  </motion.div>
                )}

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08] dark:border-white/[0.08] border-black/[0.08]">
                  <div className="text-xs text-neutral-500 font-mono text-center sm:text-left">
                    Target Output: Binary Classification [0, 1] + Softmax Likelihood
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto min-w-[220px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold text-sm transition-all duration-200 shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.45)] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Assess Risk</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
