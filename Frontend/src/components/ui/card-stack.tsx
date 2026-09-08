/* eslint-disable react-refresh/only-export-components */
"use client"

import React, { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  FileSpreadsheet,
  Sliders,
  BrainCircuit,
  Binary,
  Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface PipelineCardItem {
  id: string
  step: string
  title: string
  subtitle: string
  badge: string
  description: string
  specs: { label: string; value: string }[]
  icon: React.ComponentType<{ className?: string }>
}

export const ML_PIPELINE_CARDS: PipelineCardItem[] = [
  {
    id: "step-1",
    step: "STEP 01",
    title: "Input Vector",
    subtitle: "8 Health Biomarkers",
    badge: "8 Dimensions",
    description:
      "Captures demographic, physiological, and metabolic indicators: Pregnancies, Glucose, BP, Skin Thickness, Insulin, BMI, DPF, and Age.",
    specs: [
      { label: "Features", value: "8" },
      { label: "Type", value: "Float/Int" },
      { label: "Source", value: "Pima Set" },
      { label: "Vector", value: "1 × 8" },
    ],
    icon: FileSpreadsheet,
  },
  {
    id: "step-2",
    step: "STEP 02",
    title: "StandardScaler",
    subtitle: "Z-Score Normalization",
    badge: "μ = 0, σ = 1",
    description:
      "Standardizes each feature by removing the mean and scaling to unit variance to prevent high-magnitude features from dominating weights.",
    specs: [
      { label: "Formula", value: "z=(x-μ)/σ" },
      { label: "Mean (μ)", value: "0.00" },
      { label: "Std (σ)", value: "1.00" },
      { label: "Transform", value: "Sklearn" },
    ],
    icon: Sliders,
  },
  {
    id: "step-3",
    step: "STEP 03",
    title: "MLP Neural Net",
    subtitle: "Feedforward Classifier",
    badge: "16 Neurons · ReLU",
    description:
      "A Multilayer Perceptron neural network with a 16-neuron hidden layer, ReLU non-linear activation, and Adam stochastic gradient optimizer.",
    specs: [
      { label: "Hidden Layer", value: "(16,)" },
      { label: "Activation", value: "ReLU" },
      { label: "Solver", value: "Adam" },
      { label: "Max Iter", value: "500" },
    ],
    icon: BrainCircuit,
  },
  {
    id: "step-4",
    step: "STEP 04",
    title: "Inference Output",
    subtitle: "Binary Risk Outcome",
    badge: "Discrete Class",
    description:
      "Computes probability distribution and generates the final discrete classification (0 for low risk, 1 for high risk).",
    specs: [
      { label: "Classes", value: "0 vs 1" },
      { label: "Accuracy", value: "86.36%" },
      { label: "Macro F1", value: "0.85" },
      { label: "Latency", value: "< 25ms" },
    ],
    icon: Binary,
  },
]

/*
 * Layout configuration
 *
 * Collapsed:
 * Cards overlap to create the stacked-card appearance.
 *
 * Expanded:
 * Cards are completely separated and displayed side-by-side.
 */

const CARD_WIDTH = 300
const CARD_GAP = 24

interface CardProps {
  card: PipelineCardItem
  index: number
  totalCards: number
  isExpanded: boolean
  reducedMotion: boolean
}

const Card = ({
  card,
  index,
  totalCards,
  isExpanded,
  reducedMotion,
}: CardProps) => {
  const Icon = card.icon

  /*
   * -----------------------------
   * COLLAPSED POSITION
   * -----------------------------
   *
   * Creates the slightly fanned
   * premium card-stack appearance.
   */

  const collapsedCenterOffset = (totalCards - 1) * 7

  const collapsedX = index * 14 - collapsedCenterOffset
  const collapsedY = index * 4
  const collapsedRotate = index * 2.2 - 3

  /*
   * -----------------------------
   * EXPANDED POSITION
   * -----------------------------
   *
   * Cards are now completely separated.
   *
   * Example for 4 cards:
   *
   * [ CARD 1 ]  [ CARD 2 ]  [ CARD 3 ]  [ CARD 4 ]
   */

  const expandedTotalWidth =
    totalCards * CARD_WIDTH + (totalCards - 1) * CARD_GAP

  const expandedStart =
    -expandedTotalWidth / 2 + CARD_WIDTH / 2

  const expandedX =
    expandedStart + index * (CARD_WIDTH + CARD_GAP)

  /*
   * Very subtle rotation when expanded.
   * This keeps the editorial look without
   * making the UI feel messy.
   */

  const expandedRotate =
    reducedMotion
      ? 0
      : [-1.2, 0.6, -0.6, 1.2][index] ?? 0

  const collapsedPose = {
    x: collapsedX,
    y: collapsedY,
    rotate: reducedMotion ? 0 : collapsedRotate,
    scale: 1,
  }

  const expandedPose = {
    x: expandedX,
    y: 0,
    rotate: expandedRotate,
    scale: 1,
  }

  return (
    <motion.div
      animate={{
        ...(isExpanded ? expandedPose : collapsedPose),
        zIndex: isExpanded ? index + 1 : totalCards - index,
      }}
      className={cn(
        "absolute rounded-2xl p-5 sm:p-6 text-left",

        /*
         * Dark mode
         */
        "bg-[#0e0e0e]/95",

        /*
         * Light mode
         */
        "dark:bg-[#0e0e0e]/95",

        /*
         * Border
         */
        "border border-white/[0.10]",
        "dark:border-white/[0.10]",

        /*
         * Premium depth
         */
        "backdrop-blur-xl",
        "shadow-[0_20px_70px_rgba(0,0,0,0.35)]",

        /*
         * Subtle interaction
         */
        "hover:border-orange-500/40",
        "transition-colors duration-300",

        /*
         * Prevent text selection while interacting
         */
        "select-none",

        /*
         * Important:
         * NEVER clip the card contents.
         */
        "overflow-hidden"
      )}
      initial={collapsedPose}
      style={{
        width: `${CARD_WIDTH}px`,
        height: "460px",
        left: "50%",
        top: "50%",
        marginLeft: `-${CARD_WIDTH / 2}px`,
        marginTop: "-230px",
      }}
      transition={
        reducedMotion
          ? {
              duration: 0.2,
              ease: "easeOut",
            }
          : {
              type: "spring",
              stiffness: 220,
              damping: 27,
              mass: 0.9,
              delay: isExpanded ? index * 0.06 : 0,
            }
      }
    >
      <div className="relative z-10 flex h-full flex-col">

        {/* --------------------------------
            HEADER
        -------------------------------- */}

        <div className="flex items-center justify-between">
          <span
            className={cn(
              "font-mono text-[11px] font-semibold",
              "text-orange-400",
              "px-2.5 py-1 rounded-md",
              "bg-orange-500/10",
              "border border-orange-500/20"
            )}
          >
            {card.step}
          </span>

          <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">
            {card.badge}
          </span>
        </div>

        {/* --------------------------------
            VISUAL AREA
        -------------------------------- */}

        <div
          className={cn(
            "relative mt-6",
            "aspect-[16/8]",
            "w-full",
            "rounded-xl",

            "bg-black/40",
            "dark:bg-black/40",

            "border border-white/[0.06]",
            "dark:border-white/[0.06]",

            "flex items-center justify-center",
            "p-4"
          )}
        >
          <div
            className={cn(
              "p-3.5 rounded-2xl",

              "bg-orange-500/10",
              "text-orange-400",

              "border border-orange-500/20",

              "shadow-[0_0_20px_rgba(249,115,22,0.12)]"
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {/* --------------------------------
            TITLE
        -------------------------------- */}

        <div className="mt-6">
          <h4
            className={cn(
              "text-base",
              "font-semibold",
              "text-white",
              "dark:text-white",
              "tracking-tight"
            )}
          >
            {card.title}
          </h4>

          <span
            className={cn(
              "text-xs",
              "font-mono",
              "text-orange-400/90",
              "block",
              "mt-1"
            )}
          >
            {card.subtitle}
          </span>

          <p
            className={cn(
              "text-[11px]",
              "text-neutral-400",
              "dark:text-neutral-400",
              "leading-relaxed",
              "mt-3"
            )}
          >
            {card.description}
          </p>
        </div>

        {/* --------------------------------
            SPECIFICATIONS
        -------------------------------- */}

        <div
          className={cn(
            "grid grid-cols-4 gap-1.5",
            "pt-4",
            "mt-auto",
            "border-t border-white/[0.06]",
            "dark:border-white/[0.06]"
          )}
        >
          {card.specs.map((spec) => (
            <div
              key={spec.label}
              className="text-center min-w-0"
            >
              <div
                className={cn(
                  "text-[9px]",
                  "text-neutral-500",
                  "font-mono",
                  "uppercase",
                  "tracking-wide"
                )}
              >
                {spec.label}
              </div>

              <div
                className={cn(
                  "text-[10px]",
                  "font-semibold",
                  "text-neutral-200",
                  "dark:text-neutral-200",
                  "font-mono",
                  "mt-1",
                  "truncate"
                )}
              >
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

interface CardStackProps {
  className?: string
}

export function CardStack({ className }: CardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const reducedMotion = useReducedMotion() ?? false

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)
  }

  /*
   * Width required when all four cards
   * are fully expanded.
   */
  const expandedWidth =
    ML_PIPELINE_CARDS.length * CARD_WIDTH +
    (ML_PIPELINE_CARDS.length - 1) * CARD_GAP

  return (
    <div
      className={cn(
        "flex flex-col items-center w-full",
        className
      )}
    >
      {/*
       * Horizontal scrolling is only a fallback
       * for smaller screens.
       *
       * On desktop the entire pipeline is visible.
       */}
      <div
        className={cn(
          "w-full",
          "overflow-x-auto",
          "overflow-y-visible",
          "scrollbar-thin",
          "scrollbar-thumb-white/10",
          "scrollbar-track-transparent",
          "pb-4"
        )}
      >
        <div
          className={cn(
            "relative",
            "mx-auto",
            "flex items-center justify-center"
          )}
          style={{
            width: isExpanded
              ? `max(${expandedWidth}px, 100%)`
              : "100%",
            minWidth: isExpanded
              ? `${expandedWidth}px`
              : "720px",
            height: "500px",
          }}
        >
          {/*
           * The actual interactive stack.
           *
           * The button covers the complete area
           * of the cards.
           */}
          <button
            aria-expanded={isExpanded}
            aria-label={
              isExpanded
                ? "Collapse pipeline cards"
                : "Expand pipeline cards"
            }
            className={cn(
              "relative",
              "h-full",
              "w-full",
              "appearance-none",
              "border-0",
              "bg-transparent",
              "p-0",
              "cursor-pointer",
              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-orange-500/50",
              "rounded-3xl"
            )}
            onClick={handleToggle}
            type="button"
          >
            {ML_PIPELINE_CARDS.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                totalCards={ML_PIPELINE_CARDS.length}
                isExpanded={isExpanded}
                reducedMotion={reducedMotion}
              />
            ))}
          </button>
        </div>
      </div>

      {/* --------------------------------
          INTERACTION HINT
      -------------------------------- */}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={
          isExpanded
            ? "Collapse pipeline cards"
            : "Expand pipeline cards"
        }
        className={cn(
          "mt-1",
          "inline-flex",
          "items-center",
          "gap-2",

          "px-3.5",
          "py-1.5",

          "rounded-full",

          "bg-white/[0.04]",
          "dark:bg-white/[0.04]",

          "border border-white/[0.08]",
          "dark:border-white/[0.08]",

          "text-[11px]",
          "font-mono",
          "text-neutral-400",

          "hover:text-white",
          "hover:border-orange-500/20",

          "transition-all",
          "duration-300",

          "cursor-pointer"
        )}
      >
        <Layers
          className={cn(
            "w-3.5",
            "h-3.5",
            "text-orange-400",
            "transition-transform",
            "duration-300",
            isExpanded && "rotate-180"
          )}
        />

        <span>
          {isExpanded
            ? "Click to collapse stack"
            : "Click to expand pipeline cards"}
        </span>
      </button>
    </div>
  )
}

export default CardStack