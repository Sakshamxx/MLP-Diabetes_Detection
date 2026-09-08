interface MeteorsProps {
  number?: number
  className?: string
}

const colors = [
  "#f97316",
  "#94a3b8",
  "#64748b",
  "#cbd5e1",
]

const meteorData = Array.from({ length: 1520 }, (_, index) => {
  const seed = index * 9301 + 49297

  const random = (offset: number) => {
    const value = Math.sin(seed + offset) * 10000
    return value - Math.floor(value)
  }

  return {
    left: `${(random(1) * 104 - 2).toFixed(2)}%`,
    top: `${(random(2) * 104 - 2).toFixed(2)}%`,
    delay: `${(random(3) * 15).toFixed(2)}s`,
    duration: `${(5 + random(4) * 8).toFixed(2)}s`,
    color: colors[index % colors.length],
  }
})

export function Meteors({
  number = meteorData.length,
  className = "",
}: MeteorsProps) {
  const meteors = meteorData.slice(
    0,
    Math.min(number, meteorData.length)
  )

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {meteors.map((meteor, index) => (
        <span
          key={index}
          className="meteor"
          style={{
            left: meteor.left,
            top: meteor.top,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
            backgroundColor: meteor.color,
            boxShadow: `0 0 4px ${meteor.color}`,
          }}
        >
          <span
            className="meteor-tail"
            style={{
              background: `linear-gradient(
                90deg,
                ${meteor.color},
                transparent
              )`,
            }}
          />
        </span>
      ))}
    </div>
  )
}