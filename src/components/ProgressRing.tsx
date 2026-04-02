"use client";

import { motion } from "framer-motion";

interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  color?: string;
  label?: string;
  unit?: string;
}

export default function ProgressRing({
  value,
  max,
  size = 100,
  color = "#e63946",
  label,
  unit,
}: ProgressRingProps) {
  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = max > 0 ? Math.min(1, value / max) : 0;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1e1e1e"
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-heading font-bold text-foreground leading-none"
            style={{ fontSize: size * 0.22 }}
          >
            {value}
          </span>
          <span
            className="text-devil-muted leading-none mt-0.5"
            style={{ fontSize: size * 0.11 }}
          >
            / {max}
            {unit && <span className="ml-0.5">{unit}</span>}
          </span>
        </div>
      </div>

      {label && (
        <span className="text-devil-muted text-xs text-center">{label}</span>
      )}
    </div>
  );
}
