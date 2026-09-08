"use client"

import { ReactLenis } from "lenis/react"
import { ThemeProvider } from "./lib/theme"
import { Meteors } from "./components/ui/meteors"
import { AppDock } from "./components/navigation/AppDock"
import { HeroSection } from "./components/hero/HeroSection"
import { AssessmentSection } from "./components/assessment/AssessmentSection"
import { ModelPipeline } from "./components/model/ModelPipeline"
import { ModelPerformance } from "./components/performance/ModelPerformance"
import { HistorySection } from "./components/history/HistorySection"
import { ActivitySection } from "./components/activity/ActivitySection"
import { ProjectInfo } from "./components/about/ProjectInfo"
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <ReactLenis
        root
        options={{
          lerp: 0.08,
          smoothWheel: true,
        }}
      >
        <main className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] antialiased overflow-x-hidden selection:bg-orange-500/25 selection:text-orange-300 transition-colors duration-300">
          {/* Subtle Ambient Starlight Field */}
          <Meteors />

          {/* Global Navigation with Theme Switch and User Avatar */}
          <AppDock />

          {/* Product Narrative Sections */}
          <div className="relative z-10">
            {/* 1. Hero with Globe and Metrics */}
            <HeroSection />

            {/* 2. Assessment Form and Probabilistic Result */}
            <AssessmentSection />

            {/* 3. Neural Architecture Pipeline with CardStack */}
            <ModelPipeline />

            {/* 4. Model Performance & Empirical Analytics */}
            <ModelPerformance />

            {/* 5. Inferences History Log */}
            <HistorySection />

            {/* 6. Telemetry & Activity Stream */}
            <ActivitySection />

            {/* 7. About Project & Tech Stack */}
            <ProjectInfo />
          </div>
        </main>
      </ReactLenis>
    </ThemeProvider>
  )
}

export default App