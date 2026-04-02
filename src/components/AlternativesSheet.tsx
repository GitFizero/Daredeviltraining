"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { GiWeightLiftingUp } from "react-icons/gi";

export interface Alternative {
  name: string;
  muscleGroup: string;
  reason: string;
  gifUrl?: string;
}

interface AlternativesSheetProps {
  isOpen: boolean;
  onClose: () => void;
  alternatives: Alternative[];
  onSelect: (alternative: Alternative) => void;
}

export default function AlternativesSheet({
  isOpen,
  onClose,
  alternatives,
  onSelect,
}: AlternativesSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl bg-devil-dark border-t border-devil-dim"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-devil-muted/50" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-devil-dim">
              <h2 className="font-heading text-foreground text-lg font-bold">
                Exercices alternatifs
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-devil-dim flex items-center justify-center text-devil-muted hover:text-foreground transition-colors"
                aria-label="Fermer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[65vh] px-5 py-4 space-y-3">
              {alternatives.length === 0 && (
                <p className="text-devil-muted text-center text-sm py-8">
                  Aucune alternative disponible.
                </p>
              )}

              {alternatives.map((alt, index) => (
                <motion.div
                  key={alt.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 rounded-xl bg-devil-card border border-devil-dim p-3"
                >
                  {/* GIF placeholder */}
                  <div className="w-14 h-14 rounded-lg bg-devil-dark border border-devil-dim flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {alt.gifUrl ? (
                      <img
                        src={alt.gifUrl}
                        alt={alt.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <GiWeightLiftingUp className="text-devil-muted text-xl" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground font-medium text-sm truncate">
                      {alt.name}
                    </h3>
                    <span className="inline-flex items-center mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-devil-teal/15 text-devil-teal">
                      {alt.muscleGroup}
                    </span>
                    <p className="text-devil-muted text-xs italic mt-1 leading-relaxed">
                      {alt.reason}
                    </p>
                  </div>

                  {/* Replace button */}
                  <button
                    onClick={() => onSelect(alt)}
                    className="flex-shrink-0 self-center px-3 py-1.5 rounded-lg bg-devil-red text-white text-xs font-semibold hover:bg-devil-red/90 transition-colors active:scale-95"
                  >
                    Remplacer
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
