"use client";

import { motion } from "framer-motion";
import { weeklyPlan } from "@/lib/workout-data";
import { useState } from "react";

const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const dayShort = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];

const tagColorMap: Record<string, string> = {
  "devil-red": "bg-devil-red",
  "devil-orange": "bg-devil-orange",
  "devil-teal": "bg-devil-teal",
  "devil-blue": "bg-devil-blue",
};

const tagBorderMap: Record<string, string> = {
  "devil-red": "border-devil-red/30",
  "devil-orange": "border-devil-orange/30",
  "devil-teal": "border-devil-teal/30",
  "devil-blue": "border-devil-blue/30",
};

export default function PlanningPage() {
  const today = new Date().getDay();
  const [expandedDay, setExpandedDay] = useState<number | null>(today);

  // Reorder: Monday first
  const orderedDays = [1, 2, 3, 4, 5, 6, 0];

  return (
    <div className="px-4 pt-4 pb-24">
      {/* Header with Daredevil illustration */}
      <div className="relative mb-6 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <img
          src="https://images8.alphacoders.com/695/thumb-1920-695217.jpg"
          alt=""
          className="w-full h-32 object-cover object-top opacity-40"
        />
        <div className="absolute inset-0 z-20 flex items-center px-5">
          <div>
            <h1 className="font-heading text-2xl text-foreground">Programme</h1>
            <p className="text-devil-muted text-sm">Semaine d&apos;entraînement</p>
          </div>
        </div>
      </div>

      {/* Week overview strip */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {orderedDays.map((dayNum) => {
          const plan = weeklyPlan[dayNum];
          const isToday = dayNum === today;
          return (
            <button
              key={dayNum}
              onClick={() => setExpandedDay(expandedDay === dayNum ? null : dayNum)}
              className={`rounded-lg py-2 text-center transition-all ${
                isToday
                  ? "bg-devil-red/20 border border-devil-red"
                  : expandedDay === dayNum
                  ? "bg-devil-dark border border-devil-muted/30"
                  : "bg-devil-dark border border-devil-dim"
              }`}
            >
              <div className={`text-[10px] font-bold ${isToday ? "text-devil-red" : "text-devil-muted"}`}>
                {dayShort[dayNum]}
              </div>
              <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                tagColorMap[plan?.tagColor || "devil-blue"]
              }`} />
            </button>
          );
        })}
      </div>

      {/* Day cards */}
      <div className="space-y-3">
        {orderedDays.map((dayNum, i) => {
          const plan = weeklyPlan[dayNum];
          if (!plan) return null;
          const isToday = dayNum === today;
          const isExpanded = expandedDay === dayNum;
          const isPast = (() => {
            const todayIndex = orderedDays.indexOf(today);
            const dayIndex = orderedDays.indexOf(dayNum);
            return dayIndex < todayIndex;
          })();
          const exerciseCount = plan.exercises.length;

          return (
            <motion.div
              key={dayNum}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setExpandedDay(isExpanded ? null : dayNum)}
                className={`w-full text-left rounded-xl p-4 border transition-all ${
                  isToday
                    ? `bg-devil-dark ${tagBorderMap[plan.tagColor]} border`
                    : "bg-devil-card border-devil-dim"
                } ${isPast ? "opacity-60" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tagColorMap[plan.tagColor]
                    } text-white text-xs font-bold`}>
                      {dayShort[dayNum].slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-medium text-sm">
                          {dayNames[dayNum]}
                        </span>
                        {isToday && (
                          <span className="text-[10px] bg-devil-red text-white px-2 py-0.5 rounded-full font-bold">
                            AUJOURD&apos;HUI
                          </span>
                        )}
                      </div>
                      <span className="text-devil-muted text-xs">{plan.label}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      tagColorMap[plan.tagColor]
                    } text-white`}>
                      {plan.tag}
                    </span>
                    <span className="text-devil-muted text-lg">
                      {isExpanded ? "▾" : "▸"}
                    </span>
                  </div>
                </div>

                {/* Completion bar */}
                {exerciseCount > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-devil-dim rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${tagColorMap[plan.tagColor]}`}
                        style={{ width: isPast ? "100%" : isToday ? "0%" : "0%" }}
                      />
                    </div>
                    <span className="text-[10px] text-devil-muted">
                      {exerciseCount} exos
                    </span>
                  </div>
                )}
              </button>

              {/* Expanded exercise list */}
              {isExpanded && exerciseCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 ml-4 border-l-2 border-devil-dim pl-4 space-y-2 py-2"
                >
                  {plan.exercises.map((ex, j) => (
                    <div key={j} className="flex items-center gap-3 py-1.5">
                      <div className="w-6 h-6 rounded-full bg-devil-dim flex items-center justify-center text-[10px] text-devil-muted font-bold flex-shrink-0">
                        {j + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm truncate">{ex.name}</p>
                        <p className="text-devil-muted text-[10px]">
                          {ex.sets}×{ex.reps} — {ex.weightKg > 0 ? `${ex.weightKg}kg` : "PDC"}
                        </p>
                      </div>
                      <span className="text-[10px] text-devil-muted bg-devil-dim px-2 py-0.5 rounded-full flex-shrink-0">
                        {ex.muscleGroup}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Rest day message */}
              {isExpanded && exerciseCount === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 ml-4 pl-4 py-3 text-devil-muted text-sm italic"
                >
                  😴 Repos complet — récupération et hydratation
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Weekly summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-devil-dark rounded-xl p-5 border border-devil-dim"
      >
        <h3 className="text-sm uppercase tracking-wider text-devil-muted mb-3">Résumé semaine</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-devil-red">5</div>
            <div className="text-[10px] text-devil-muted">Séances</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-devil-orange">
              {Object.values(weeklyPlan).reduce((acc, p) => acc + p.exercises.length, 0)}
            </div>
            <div className="text-[10px] text-devil-muted">Exercices</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-devil-teal">
              {Object.values(weeklyPlan).reduce((acc, p) =>
                acc + p.exercises.reduce((s, e) => s + e.sets, 0), 0
              )}
            </div>
            <div className="text-[10px] text-devil-muted">Séries total</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
