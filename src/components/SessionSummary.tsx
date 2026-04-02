"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface SessionSummaryProps {
  totalSets: number;
  totalVolume: number;
  duration: number;
  onClose: () => void;
}

const quotes = [
  "Le diable ne dort jamais.",
  "Chaque rep te rapproche de Hell's Kitchen.",
  "La douleur est temporaire, la fierté est éternelle.",
  "Matt Murdock serait fier de toi.",
  "Tu es plus fort que tu ne le crois.",
];

export default function SessionSummary({ totalSets, totalVolume, duration, onClose }: SessionSummaryProps) {
  useEffect(() => {
    const end = Date.now() + 2000;
    const colors = ["#e63946", "#f4a261", "#2a9d8f"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bottom-sheet-overlay px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-devil-dark rounded-2xl p-8 max-w-sm w-full border border-devil-red/30 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">🔥</div>
        <h2 className="font-heading text-2xl text-devil-red mb-2">Bravo Gaëtan !</h2>
        <p className="text-devil-muted italic text-sm mb-6 font-heading">&quot;{quote}&quot;</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-background rounded-lg p-3">
            <div className="text-2xl font-bold text-devil-red">{totalSets}</div>
            <div className="text-xs text-devil-muted">séries</div>
          </div>
          <div className="bg-background rounded-lg p-3">
            <div className="text-2xl font-bold text-devil-orange">{totalVolume.toLocaleString("fr-FR")}</div>
            <div className="text-xs text-devil-muted">kg volume</div>
          </div>
          <div className="bg-background rounded-lg p-3">
            <div className="text-2xl font-bold text-devil-teal">{duration}</div>
            <div className="text-xs text-devil-muted">minutes</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-devil-red text-white rounded-xl font-bold hover:bg-devil-red/90 transition-colors active:scale-95"
        >
          Continuer
        </button>
      </motion.div>
    </motion.div>
  );
}
