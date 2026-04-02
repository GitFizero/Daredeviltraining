"use client";

import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export interface WeekDayEvent {
  day: string;
  label: string;
  time: string;
  isToday: boolean;
  isCompleted: boolean;
}

const FRENCH_DAYS: Record<string, string> = {
  monday: "Lun",
  tuesday: "Mar",
  wednesday: "Mer",
  thursday: "Jeu",
  friday: "Ven",
  saturday: "Sam",
  sunday: "Dim",
  mon: "Lun",
  tue: "Mar",
  wed: "Mer",
  thu: "Jeu",
  fri: "Ven",
  sat: "Sam",
  sun: "Dim",
};

interface WeeklyStripProps {
  events: WeekDayEvent[];
  onDayClick: (day: string) => void;
}

export default function WeeklyStrip({ events, onDayClick }: WeeklyStripProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-1 py-2 min-w-max">
        {events.map((event, index) => {
          const dayLabel =
            FRENCH_DAYS[event.day.toLowerCase()] || event.day.slice(0, 3);

          return (
            <motion.button
              key={event.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => onDayClick(event.day)}
              className={`relative flex flex-col items-center justify-center w-16 h-20 rounded-xl transition-all duration-200 flex-shrink-0 ${
                event.isToday
                  ? "bg-devil-card border-2 border-devil-red shadow-[0_0_12px_rgba(230,57,70,0.2)]"
                  : "bg-devil-card border border-devil-dim hover:border-devil-muted/40"
              }`}
            >
              {/* Completed overlay */}
              {event.isCompleted && (
                <div className="absolute top-1 right-1">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <FiCheck size={10} className="text-white" strokeWidth={3} />
                  </div>
                </div>
              )}

              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  event.isToday ? "text-devil-red" : "text-devil-muted"
                }`}
              >
                {dayLabel}
              </span>

              {event.label && (
                <span className="text-foreground text-[10px] mt-1 leading-tight text-center px-1 truncate max-w-full">
                  {event.label}
                </span>
              )}

              {event.time && (
                <span className="text-devil-muted text-[9px] mt-0.5">
                  {event.time}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
