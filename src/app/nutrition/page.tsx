"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ProgressRing from "@/components/ProgressRing";
import MealCard from "@/components/MealCard";
import { MealCardSkeleton } from "@/components/LoadingSkeleton";

interface MealSuggestion {
  name: string;
  emoji: string;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  prepTime: string;
  ingredients: string[];
}

interface MealSlot {
  type: string;
  label: string;
  time: string;
  suggestions: MealSuggestion[];
  logged?: boolean;
  loggedMeal?: string;
}

interface DailyTotals {
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

interface Targets {
  dailyKcalTarget: number;
  dailyProteinG: number;
  dailyCarbsG: number;
  dailyFatG: number;
}

export default function NutritionPage() {
  const [mealSlots, setMealSlots] = useState<MealSlot[]>([]);
  const [consumed, setConsumed] = useState<DailyTotals>({ kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 });
  const [targets, setTargets] = useState<Targets>({
    dailyKcalTarget: 2000,
    dailyProteinG: 154,
    dailyCarbsG: 200,
    dailyFatG: 55,
  });
  const [loading, setLoading] = useState(true);
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);
  const [isTrainingDay, setIsTrainingDay] = useState(true);

  const fetchNutrition = useCallback(async () => {
    try {
      const res = await fetch("/api/nutrition/today");
      const data = await res.json();
      setMealSlots(data.meals || []);
      setConsumed(data.consumed || { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 });
      if (data.targets) setTargets(data.targets);
      setIsTrainingDay(data.isTrainingDay ?? true);
    } catch (err) {
      console.error("Erreur nutrition:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNutrition();
  }, [fetchNutrition]);

  const handleLogMeal = async (mealType: string, meal: MealSuggestion) => {
    try {
      await fetch("/api/nutrition/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealType,
          mealName: meal.name,
          kcal: meal.kcal,
          proteinG: meal.proteinG,
          carbsG: meal.carbsG,
          fatG: meal.fatG,
        }),
      });
      setMealSlots((prev) =>
        prev.map((slot) =>
          slot.type === mealType ? { ...slot, logged: true, loggedMeal: meal.name } : slot
        )
      );
      setConsumed((prev) => ({
        kcal: prev.kcal + meal.kcal,
        proteinG: prev.proteinG + meal.proteinG,
        carbsG: prev.carbsG + meal.carbsG,
        fatG: prev.fatG + meal.fatG,
      }));
    } catch (err) {
      console.error("Erreur log repas:", err);
    }
  };

  if (loading) {
    return (
      <div className="px-4 pt-4 pb-24 space-y-6">
        <div className="skeleton h-8 w-40" />
        <div className="flex justify-around">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-24 w-24 rounded-full" />
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <MealCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const remaining = {
    kcal: Math.max(0, targets.dailyKcalTarget - consumed.kcal),
    proteinG: Math.max(0, targets.dailyProteinG - consumed.proteinG),
    carbsG: Math.max(0, targets.dailyCarbsG - consumed.carbsG),
    fatG: Math.max(0, targets.dailyFatG - consumed.fatG),
  };

  return (
    <div className="px-4 pt-4 pb-24">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl">Nutrition</h1>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isTrainingDay ? "bg-devil-red" : "bg-devil-blue"
            } text-white`}
          >
            {isTrainingDay ? "Jour training" : "Jour repos"}
          </span>
        </div>
      </motion.div>

      {/* Progress rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-2 mb-8"
      >
        <ProgressRing
          value={consumed.kcal}
          max={targets.dailyKcalTarget}
          size={80}
          color="#e63946"
          label="Calories"
          unit="kcal"
        />
        <ProgressRing
          value={Math.round(consumed.proteinG)}
          max={targets.dailyProteinG}
          size={80}
          color="#2a9d8f"
          label="Protéines"
          unit="g"
        />
        <ProgressRing
          value={Math.round(consumed.carbsG)}
          max={targets.dailyCarbsG}
          size={80}
          color="#f4a261"
          label="Glucides"
          unit="g"
        />
        <ProgressRing
          value={Math.round(consumed.fatG)}
          max={targets.dailyFatG}
          size={80}
          color="#457b9d"
          label="Lipides"
          unit="g"
        />
      </motion.div>

      {/* Remaining budget */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-devil-dark rounded-xl p-4 mb-8 border border-devil-dim"
      >
        <h3 className="text-sm text-devil-muted mb-2 uppercase tracking-wider">Budget restant</h3>
        <div className="flex justify-around text-center">
          <div>
            <span className="text-xl font-bold text-devil-red">{remaining.kcal}</span>
            <p className="text-xs text-devil-muted">kcal</p>
          </div>
          <div>
            <span className="text-xl font-bold text-devil-teal">{Math.round(remaining.proteinG)}g</span>
            <p className="text-xs text-devil-muted">protéines</p>
          </div>
          <div>
            <span className="text-xl font-bold text-devil-orange">{Math.round(remaining.carbsG)}g</span>
            <p className="text-xs text-devil-muted">glucides</p>
          </div>
          <div>
            <span className="text-xl font-bold text-devil-blue">{Math.round(remaining.fatG)}g</span>
            <p className="text-xs text-devil-muted">lipides</p>
          </div>
        </div>
      </motion.div>

      {/* Meal slots */}
      <div className="space-y-6">
        {mealSlots.map((slot, slotIndex) => (
          <motion.div
            key={slot.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * slotIndex }}
          >
            {/* Slot header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-heading text-lg">{slot.label}</h2>
                <p className="text-xs text-devil-muted">{slot.time}</p>
              </div>
              {slot.logged && (
                <span className="text-devil-teal text-sm flex items-center gap-1">
                  ✓ {slot.loggedMeal}
                </span>
              )}
            </div>

            {/* Primary meal */}
            {slot.suggestions.length > 0 && (
              <MealCard
                meal={slot.suggestions[0]}
                isPrimary={true}
                isLogged={slot.logged && slot.loggedMeal === slot.suggestions[0].name ? true : false}
                onLog={() => handleLogMeal(slot.type, slot.suggestions[0])}
                onSelect={() => {}}
              />
            )}

            {/* Alternatives toggle */}
            {slot.suggestions.length > 1 && (
              <div className="mt-2">
                <button
                  onClick={() => setExpandedSlot(expandedSlot === slot.type ? null : slot.type)}
                  className="text-sm text-devil-muted hover:text-devil-red transition-colors flex items-center gap-1"
                >
                  <span>{expandedSlot === slot.type ? "▾" : "▸"}</span>
                  {slot.suggestions.length - 1} alternatives
                </button>

                {expandedSlot === slot.type && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-2"
                  >
                    {slot.suggestions.slice(1).map((alt, altIndex) => (
                      <MealCard
                        key={altIndex}
                        meal={alt}
                        isPrimary={false}
                        isLogged={slot.logged && slot.loggedMeal === alt.name ? true : false}
                        onLog={() => handleLogMeal(slot.type, alt)}
                        onSelect={() => handleLogMeal(slot.type, alt)}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
