import { useEffect, useState } from "react"
import { motion } from "motion/react"
import {
  Clock,
  Activity,
  CheckCircle,
  RefreshCw,
  Calendar,
} from "lucide-react"
import { api } from "../../lib/api"
import type { ActivityItem } from "../../lib/types"
import { SectionHeading } from "../ui/SectionHeading"

export function ActivitySection() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  const reloadActivity = async () => {
    try {
      setLoading(true)
      const data = await api.getActivity()
      setActivities(data)
    } catch (err) {
      console.error("Failed to load activity:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    api.getActivity()
      .then((data) => {
        if (isMounted) {
          setActivities(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error("Failed to load activity:", err)
        if (isMounted) setLoading(false)
      })

    const handleUpdate = () => {
      api.getActivity()
        .then((data) => {
          if (isMounted) setActivities(data)
        })
        .catch(console.error)
    }

    window.addEventListener("activity-updated", handleUpdate)
    return () => {
      isMounted = false
      window.removeEventListener("activity-updated", handleUpdate)
    }
  }, [])

  return (
    <section id="activity" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-section-glow">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="SYSTEM TELEMETRY"
          title="Telemetry & Activity Stream"
          subtitle="Chronological audit stream recording assessment invocations and model transactions."
        />

        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
              <Activity className="w-4 h-4 text-orange-400" />
              <span>TRANSACTION LEDGER</span>
            </div>

            <button
              type="button"
              onClick={reloadActivity}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 dark:bg-black/40 light:bg-black/[0.04] border border-white/10 dark:border-white/10 light:border-black/10 text-xs text-neutral-400 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Timeline List */}
          {loading && activities.length === 0 ? (
            <div className="py-12 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.04] dark:border-white/[0.04] light:border-black/[0.04] animate-pulse"
                />
              ))}
            </div>
          ) : activities.length === 0 ? (
            <div className="py-16 text-center max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-black/[0.04] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] flex items-center justify-center text-neutral-400 mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                No Activity Recorded
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Telemetry events will appear here once inference requests are submitted to the API.
              </p>
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/[0.08] dark:before:bg-white/[0.08] light:before:bg-black/[0.08]">
              {activities.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[27px] top-3.5 w-3 h-3 rounded-full bg-[var(--bg-base)] border-2 border-orange-500 group-hover:scale-125 transition-transform" />

                  {/* Card Content */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] group-hover:border-orange-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 font-mono">
                          <CheckCircle className="w-3 h-3" />
                          {item.action}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          ID #{item.id}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-primary)] font-mono-num leading-relaxed">
                        {item.details}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(item.timestamp).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        {new Date(item.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
