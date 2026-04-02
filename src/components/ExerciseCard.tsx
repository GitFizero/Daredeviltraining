"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiCheck, FiRefreshCw } from "react-icons/fi";
import { GiWeightLiftingUp } from "react-icons/gi";

export interface ExerciseData {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  weightKg: number;
  notes?: string;
  gifUrl?: string;
  setsCompleted: number;
}

interface ExerciseCardProps {
  exercise: ExerciseData;
  index: number;
  onSetComplete: (setIndex: number) => void;
  onSetUndo: (setIndex: number) => void;
  onShowAlternatives: () => void;
  onWeightChange: (newWeight: number) => void;
}

export default function ExerciseCard({
  exercise,
  index: _index,
  onSetComplete,
  onSetUndo,
  onShowAlternatives,
  onWeightChange,
}: ExerciseCardProps) {
  const allCompleted = exercise.setsCompleted >= exercise.sets;
  const [imgError, setImgError] = useState(false);

  const handleWeightDecrement = () => {
    const newWeight = Math.max(0, exercise.weightKg - 2.5);
    onWeightChange(newWeight);
  };

  const handleWeightIncrement = () => {
    onWeightChange(exercise.weightKg + 2.5);
  };

  const handleSetClick = (index: number) => {
    const isCompleted = index < exercise.setsCompleted;
    if (isCompleted) {
      // Undo: set setsCompleted to this index (unchecks this and all after)
      onSetUndo(index);
    } else if (index === exercise.setsCompleted) {
      // Complete next set
      onSetComplete(index);
    }
  };

  const hasValidGif = exercise.gifUrl && !exercise.gifUrl.startsWith("/exercises/") && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`rounded-2xl bg-devil-card border p-4 transition-shadow duration-500 ${
        allCompleted
          ? "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          : "border-devil-dim"
      }`}
    >
      {/* Top section: GIF + Info */}
      <div className="flex gap-4 mb-4">
        <div className="w-20 h-20 rounded-xl bg-devil-dark border border-devil-dim flex items-center justify-center flex-shrink-0 overflow-hidden">
          {hasValidGif ? (
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="w-full h-full object-cover rounded-xl"
              onError={() => setImgError(true)}
            />
          ) : (
            <GiWeightLiftingUp className="text-devil-muted text-3xl" />
          )}
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <h3 className="font-heading text-foreground text-lg font-bold leading-tight truncate">
            {exercise.name}
          </h3>
          <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-devil-red/15 text-devil-red w-fit">
            {exercise.muscleGroup}
          </span>
        </div>
      </div>

      {/* Weight stepper */}
      <div className="flex items-center justify-between bg-devil-dark rounded-xl px-4 py-3 mb-4">
        <span className="text-xs text-devil-muted uppercase tracking-wider">
          Poids
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleWeightDecrement}
            className="w-8 h-8 rounded-full bg-devil-dim flex items-center justify-center text-foreground hover:bg-devil-muted/30 transition-colors active:scale-95"
            aria-label="Diminuer le poids"
          >
            <FiMinus size={14} />
          </button>
          <span className="text-foreground font-heading text-xl font-bold min-w-[60px] text-center">
            {exercise.weightKg}
            <span className="text-sm text-devil-muted ml-0.5">kg</span>
          </span>
          <button
            onClick={handleWeightIncrement}
            className="w-8 h-8 rounded-full bg-devil-dim flex items-center justify-center text-foreground hover:bg-devil-muted/30 transition-colors active:scale-95"
            aria-label="Augmenter le poids"
          >
            <FiPlus size={14} />
          </button>
        </div>
      </div>

      {/* Sets x Reps */}
      <div className="text-center mb-3">
        <span className="text-devil-muted text-sm">
          {exercise.sets} &times; {exercise.reps} reps
        </span>
      </div>

      {/* Per-set checkboxes — tap to complete, tap again to undo */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: exercise.sets }).map((_, index) => {
          const isCompleted = index < exercise.setsCompleted;
          const isNext = index === exercise.setsCompleted;

          return (
            <button
              key={index}
              onClick={() => handleSetClick(index)}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isCompleted
                  ? "bg-devil-red border-devil-red text-white hover:bg-devil-red/70 hover:border-devil-red/70 active:scale-90"
                  : isNext
                  ? "border-devil-red/50 text-devil-muted hover:border-devil-red active:scale-90"
                  : "border-devil-dim text-devil-dim"
              }`}
              aria-label={`Série ${index + 1}${isCompleted ? " — cliquer pour annuler" : ""}`}
            >
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <FiCheck size={18} strokeWidth={3} />
                  </motion.div>
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Coaching tip */}
      {exercise.notes && (
        <p className="text-devil-muted text-xs italic text-center mb-4 px-2">
          💡 {exercise.notes}
        </p>
      )}

      {/* Alternatives button */}
      <button
        onClick={onShowAlternatives}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-devil-muted/30 text-devil-muted text-sm hover:border-devil-muted/60 hover:text-foreground transition-colors"
      >
        <FiRefreshCw size={14} />
        Alternatives
      </button>
    </motion.div>
  );
}
