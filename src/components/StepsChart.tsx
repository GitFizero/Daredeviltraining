"use client";

import { motion } from "framer-motion";

interface StepsChartProps {
  data: { day: string; steps: number }[];
}

export default function StepsChart({ data }: StepsChartProps) {
  const maxSteps = Math.max(...data.map((d) => d.steps), 1);

  return (
    <div className="flex items-end justify-around gap-2 h-40">
      {data.map((item, i) => {
        const heightPercent = (item.steps / maxSteps) * 100;
        return (
          <div key={item.day} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[10px] text-devil-muted">
              {item.steps > 0 ? (item.steps / 1000).toFixed(1) + "k" : "0"}
            </span>
            <motion.div
              className="w-full rounded-t-md bg-devil-teal/80 min-h-[4px]"
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(heightPercent, 3)}%` }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
            />
            <span className="text-[10px] text-devil-muted font-medium">{item.day}</span>
          </div>
        );
      })}
    </div>
  );
}
