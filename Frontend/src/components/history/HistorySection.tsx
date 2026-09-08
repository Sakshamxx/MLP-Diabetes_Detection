import { useEffect, useState, useMemo } from "react"
import {
  History,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { api } from "../../lib/api"
import type { HistoryItem } from "../../lib/types"
import { SectionHeading } from "../ui/SectionHeading"

export function HistorySection() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRisk, setFilterRisk] = useState<"all" | "high" | "low">("all")
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const reloadHistory = async () => {
    try {
      setLoading(true)
      const data = await api.getHistory()
      setHistory(data)
    } catch (err) {
      console.error("Failed to load history:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    api.getHistory()
      .then((data) => {
        if (isMounted) {
          setHistory(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error("Failed to load history:", err)
        if (isMounted) setLoading(false)
      })

    const handleUpdate = () => {
      api.getHistory()
        .then((data) => {
          if (isMounted) setHistory(data)
        })
        .catch(console.error)
    }

    window.addEventListener("activity-updated", handleUpdate)
    return () => {
      isMounted = false
      window.removeEventListener("activity-updated", handleUpdate)
    }
  }, [])

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      // Risk filter
      if (filterRisk === "high" && item.prediction !== 1) return false
      if (filterRisk === "low" && item.prediction !== 0) return false

      // Search query
      if (!searchTerm) return true
      const q = searchTerm.toLowerCase()
      return (
        item.glucose.toString().includes(q) ||
        item.bmi.toString().includes(q) ||
        item.age.toString().includes(q) ||
        new Date(item.timestamp).toLocaleDateString().includes(q)
      )
    })
  }, [history, filterRisk, searchTerm])

  const scrollToAssessment = () => {
    const el = document.getElementById("assessment")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="history" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="AUDIT TRAIL & LOGS"
          title="Historical Assessment Log"
          subtitle="Review previous inference outputs, standardized parameters, and model probabilities stored securely in the local database."
        />

        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by glucose, BMI, age..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 dark:bg-black/40 light:bg-black/[0.04] border border-white/10 dark:border-white/10 light:border-black/10 text-xs text-[var(--text-primary)] placeholder:text-neutral-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>

            {/* Filter & Refresh */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="flex items-center rounded-xl bg-black/40 dark:bg-black/40 light:bg-black/[0.04] border border-white/10 dark:border-white/10 light:border-black/10 p-1">
                <button
                  type="button"
                  onClick={() => setFilterRisk("all")}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    filterRisk === "all"
                      ? "bg-white/[0.1] dark:bg-white/[0.1] light:bg-black/[0.08] text-[var(--text-primary)] font-medium"
                      : "text-neutral-400 hover:text-[var(--text-primary)]"
                  }`}
                >
                  All ({history.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterRisk("low")}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    filterRisk === "low"
                      ? "bg-emerald-500/20 text-emerald-500 font-medium"
                      : "text-neutral-400 hover:text-[var(--text-primary)]"
                  }`}
                >
                  Low Risk
                </button>
                <button
                  type="button"
                  onClick={() => setFilterRisk("high")}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    filterRisk === "high"
                      ? "bg-amber-500/20 text-amber-500 font-medium"
                      : "text-neutral-400 hover:text-[var(--text-primary)]"
                  }`}
                >
                  High Risk
                </button>
              </div>

              <button
                type="button"
                onClick={reloadHistory}
                disabled={loading}
                className="p-2 rounded-xl bg-black/40 dark:bg-black/40 light:bg-black/[0.04] border border-white/10 dark:border-white/10 light:border-black/10 text-neutral-400 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Refresh history"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Table / List Content */}
          {loading && history.length === 0 ? (
            <div className="py-16 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.04] animate-pulse"
                />
              ))}
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="py-16 text-center max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-black/[0.04] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] flex items-center justify-center text-neutral-400 mx-auto mb-4">
                <History className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                No Assessment Records Found
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                {searchTerm || filterRisk !== "all"
                  ? "No historical records match your active search and filter criteria."
                  : "No assessments have been recorded yet. Submit your first assessment to begin tracking."}
              </p>
              <button
                type="button"
                onClick={scrollToAssessment}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-semibold transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)] cursor-pointer"
              >
                <span>Run New Assessment</span>
              </button>
            </div>
          ) : (
            <div className="mt-4">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] text-neutral-400 font-mono">
                      <th className="py-3 px-3 font-medium">Timestamp</th>
                      <th className="py-3 px-3 font-medium">Age / BMI</th>
                      <th className="py-3 px-3 font-medium">Glucose / BP</th>
                      <th className="py-3 px-3 font-medium">Insulin / Pedigree</th>
                      <th className="py-3 px-3 font-medium text-right">Predicted Risk</th>
                      <th className="py-3 px-3 font-medium text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] dark:divide-white/[0.04] light:divide-black/[0.04]">
                    {filteredHistory.map((item) => {
                      const isHigh = item.prediction === 1
                      const prob = Math.round(item.prediction_probability * 1000) / 10
                      const isExpanded = expandedRow === item.id

                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-white/[0.02] dark:hover:bg-white/[0.02] light:hover:bg-black/[0.02] transition-colors group cursor-pointer"
                          onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                        >
                          <td className="py-3.5 px-3 text-neutral-400 font-mono">
                            <div className="text-[var(--text-primary)]">
                              {new Date(item.timestamp).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {new Date(item.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>

                          <td className="py-3.5 px-3 font-mono-num">
                            <span className="text-[var(--text-primary)]">{item.age} yrs</span>
                            <span className="text-neutral-500 mx-1.5">•</span>
                            <span className="text-[var(--text-secondary)]">{item.bmi} kg/m²</span>
                          </td>

                          <td className="py-3.5 px-3 font-mono-num">
                            <span className="text-[var(--text-primary)]">{item.glucose} mg/dL</span>
                            <span className="text-neutral-500 mx-1.5">•</span>
                            <span className="text-[var(--text-secondary)]">{item.blood_pressure} mmHg</span>
                          </td>

                          <td className="py-3.5 px-3 font-mono-num">
                            <span className="text-[var(--text-primary)]">{item.insulin} µU/mL</span>
                            <span className="text-neutral-500 mx-1.5">•</span>
                            <span className="text-[var(--text-secondary)]">DPF {item.diabetes_pedigree_function.toFixed(2)}</span>
                          </td>

                          <td className="py-3.5 px-3 text-right">
                            <div className="inline-flex flex-col items-end">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                                  isHigh
                                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                }`}
                              >
                                {isHigh ? (
                                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                                ) : (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                )}
                                {isHigh ? "Higher Risk" : "Lower Risk"}
                              </span>
                              <span className="text-[10px] font-mono text-neutral-500 mt-0.5">
                                {prob}% Likelihood
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 text-right text-neutral-500">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 inline-block" />
                            ) : (
                              <ChevronDown className="w-4 h-4 inline-block" />
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {filteredHistory.map((item) => {
                  const isHigh = item.prediction === 1
                  const prob = Math.round(item.prediction_probability * 1000) / 10

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-black/40 dark:bg-black/40 light:bg-black/[0.03] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(item.timestamp).toLocaleDateString()}{" "}
                            {new Date(item.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                            isHigh
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                          }`}
                        >
                          {isHigh ? "Higher Risk" : "Lower Risk"} ({prob}%)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono-num pt-2 border-t border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.04]">
                        <div>
                          <span className="text-neutral-500 text-[10px] block">Glucose / BP</span>
                          <span className="text-[var(--text-primary)]">
                            {item.glucose} mg/dL • {item.blood_pressure} mmHg
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-500 text-[10px] block">BMI / Age</span>
                          <span className="text-[var(--text-primary)]">
                            {item.bmi} kg/m² • {item.age} yrs
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
