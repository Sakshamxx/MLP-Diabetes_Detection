import {
  Code2,
  Server,
  BrainCircuit,
  Database,
  ArrowUp,
  HeartHandshake,
} from "lucide-react"

const TECH_STACK = [
  {
    category: "Client & UI Architecture",
    icon: Code2,
    items: ["React 19", "TypeScript", "Tailwind CSS", "Motion", "Lenis Scroll", "Cobe Globe"],
  },
  {
    category: "Inference Server",
    icon: Server,
    items: ["FastAPI", "Python 3", "Pydantic Schemas", "Uvicorn Engine", "CORS Middleware"],
  },
  {
    category: "Machine Learning Pipeline",
    icon: BrainCircuit,
    items: ["Scikit-learn", "MLPClassifier", "StandardScaler", "Pima Indians Dataset"],
  },
  {
    category: "Persistence & Telemetry",
    icon: Database,
    items: ["SQLite3 Database", "Audit Logging", "Event Driven Sync"],
  },
]

export function ProjectInfo() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#070707] dark:bg-[#070707] light:bg-neutral-50 pt-16 pb-24 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* About & Technology Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]">
          {/* Project Summary */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
              <span>ABOUT THE SYSTEM</span>
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] tracking-tight">
              Diabetes_ML Research Project
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              An end-to-end full-stack machine learning application demonstrating neural network risk classification, input vector standardization, and real-time telemetry streaming.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <HeartHandshake className="w-4 h-4 text-orange-400" />
              <span>Designed for Academic & Portfolio Demonstration</span>
            </div>
          </div>

          {/* Tech Stack Modules */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECH_STACK.map((group) => {
              const Icon = group.icon
              return (
                <div
                  key={group.category}
                  className="p-4 rounded-2xl bg-white/[0.015] dark:bg-white/[0.015] light:bg-black/[0.02] border border-white/[0.05] dark:border-white/[0.05] light:border-black/[0.05] space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)]">
                    <Icon className="w-3.5 h-3.5 text-orange-400" />
                    <span>{group.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] dark:bg-white/[0.04] light:bg-black/[0.04] border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] text-[11px] font-mono text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Medical & Legal Disclaimer */}
        <div className="rounded-2xl border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] bg-black/40 dark:bg-black/40 light:bg-white p-5 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] font-mono uppercase tracking-wider">
              Educational & Diagnostic Notice
            </h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              This application is an artificial intelligence research experiment. It is not approved by medical regulatory authorities and must not be used as a substitute for clinical diagnostics, medical consultation, or treatment.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-black/[0.04] hover:bg-white/[0.08] dark:hover:bg-white/[0.08] light:hover:bg-black/[0.08] text-xs font-medium text-[var(--text-primary)] border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] transition-colors shrink-0 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono pt-4">
          <div>
            Diabetes_ML • Full-Stack Neural Network Demonstration
          </div>
          <div>
            Test Evaluation: 86.36% Holdout Accuracy
          </div>
        </div>
      </div>
    </footer>
  )
}
