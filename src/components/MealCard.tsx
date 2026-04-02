"use client";

import { motion } from "framer-motion";
import { FiCheck, FiClock } from "react-icons/fi";

export interface MealData {
  name: string;
  emoji: string;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  prepTime: string;
  ingredients: string[];
}

interface MealCardProps {
  meal: MealData;
  isPrimary: boolean;
  isLogged: boolean;
  onLog: () => void;
  onSelect: () => void;
}

export default function MealCard({
  meal,
  isPrimary,
  isLogged,
  onLog,
  onSelect,
}: MealCardProps) {
  if (!isPrimary) {
    return (
      <motion.button
        onClick={onSelect}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 w-full rounded-xl bg-devil-card border border-devil-dim p-3 text-left transition-colors hover:border-devil-muted/40"
      >
        <span className="text-2xl flex-shrink-0">{meal.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-foreground text-sm font-medium truncate">
            {meal.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-devil-muted text-[10px]">{meal.kcal} kcal</span>
            <MacroChip label="P" value={meal.proteinG} color="text-devil-red" />
            <MacroChip label="C" value={meal.carbsG} color="text-devil-orange" />
            <MacroChip label="F" value={meal.fatG} color="text-devil-teal" />
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
      className="rounded-2xl bg-devil-card border border-devil-dim p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{meal.emoji}</span>
          <div>
            <h3 className="font-heading text-foreground text-lg font-bold leading-tight">
              {meal.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-devil-muted text-xs">
              <FiClock size={12} />
              <span>{meal.prepTime}</span>
            </div>
          </div>
        </div>
        <span className="text-foreground font-heading text-xl font-bold">
          {meal.kcal}
          <span className="text-sm text-devil-muted ml-0.5">kcal</span>
        </span>
      </div>

      {/* Macro chips */}
      <div className="flex items-center gap-3 mb-4">
        <MacroChipLarge label="Protéines" value={meal.proteinG} unit="g" color="bg-devil-red/15 text-devil-red" />
        <MacroChipLarge label="Glucides" value={meal.carbsG} unit="g" color="bg-devil-orange/15 text-devil-orange" />
        <MacroChipLarge label="Lipides" value={meal.fatG} unit="g" color="bg-devil-teal/15 text-devil-teal" />
      </div>

      {/* Ingredients */}
      {meal.ingredients.length > 0 && (
        <div className="mb-4">
          <p className="text-devil-muted text-xs uppercase tracking-wider mb-1.5">
            Ingrédients
          </p>
          <p className="text-foreground/80 text-sm leading-relaxed">
            {meal.ingredients.join(", ")}
          </p>
        </div>
      )}

      {/* Log button */}
      <motion.button
        onClick={onLog}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
          isLogged
            ? "bg-emerald-600 text-white"
            : "bg-devil-red text-white hover:bg-devil-red/90"
        }`}
      >
        {isLogged ? (
          <>
            <FiCheck size={16} strokeWidth={3} />
            Validé
          </>
        ) : (
          "Valider"
        )}
      </motion.button>
    </motion.div>
  );
}

function MacroChip({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <span className={`text-[10px] font-medium ${color}`}>
      {label}{value}g
    </span>
  );
}

function MacroChipLarge({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div className={`flex-1 rounded-lg px-2 py-2 text-center ${color}`}>
      <p className="text-lg font-bold leading-none">
        {value}
        <span className="text-xs ml-0.5">{unit}</span>
      </p>
      <p className="text-[10px] mt-0.5 opacity-70">{label}</p>
    </div>
  );
}
