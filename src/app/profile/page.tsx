"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AuthButton from "@/components/AuthButton";

interface Profile {
  weightKg: number;
  heightCm: number;
  bodyFatPercent: number | null;
  goalType: string;
  dailyKcalTarget: number;
  dailyProteinG: number;
  dailyCarbsG: number;
  dailyFatG: number;
  trainingWindow: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edited, setEdited] = useState<Partial<Profile>>({});

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfile(data.profile);
    } catch (err) {
      console.error("Erreur profil:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async () => {
    if (Object.keys(edited).length === 0) return;
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edited),
      });
      const data = await res.json();
      setProfile(data.profile);
      setEdited({});
    } catch (err) {
      console.error("Erreur sauvegarde:", err);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof Profile, value: number | string) => {
    setEdited((prev) => ({ ...prev, [field]: value }));
  };

  const current = { ...profile, ...edited } as Profile;

  const goalLabels: Record<string, string> = {
    lean_cut: "Sèche lente",
    maintenance: "Maintien",
    bulk: "Prise de masse",
  };

  if (loading) {
    return (
      <div className="px-4 pt-4 pb-24 space-y-4">
        <div className="skeleton h-8 w-32" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="px-4 pt-4 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl">Profil</h1>
        <AuthButton />
      </div>

      {/* Identity banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-devil-dark rounded-xl p-6 border border-devil-dim mb-6 text-center"
      >
        <div className="text-4xl mb-2">😈</div>
        <h2 className="font-heading text-xl text-devil-red">DAREDEVIL</h2>
        <p className="text-devil-muted text-sm mt-1">Programme Gaëtan — Objectif Charlie Cox</p>
      </motion.div>

      {/* Body stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-devil-dark rounded-xl p-5 border border-devil-dim mb-4"
      >
        <h3 className="text-sm uppercase tracking-wider text-devil-muted mb-4">Mensurations</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm">Poids</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateField("weightKg", (current.weightKg || 77) - 0.5)}
                className="w-8 h-8 rounded-full bg-devil-dim text-devil-muted hover:text-foreground transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="text-lg font-bold w-16 text-center">{current.weightKg} kg</span>
              <button
                onClick={() => updateField("weightKg", (current.weightKg || 77) + 0.5)}
                className="w-8 h-8 rounded-full bg-devil-dim text-devil-muted hover:text-foreground transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm">Taille</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateField("heightCm", (current.heightCm || 178) - 1)}
                className="w-8 h-8 rounded-full bg-devil-dim text-devil-muted hover:text-foreground transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="text-lg font-bold w-16 text-center">{current.heightCm} cm</span>
              <button
                onClick={() => updateField("heightCm", (current.heightCm || 178) + 1)}
                className="w-8 h-8 rounded-full bg-devil-dim text-devil-muted hover:text-foreground transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm">Masse grasse</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateField("bodyFatPercent", (current.bodyFatPercent || 18) - 1)}
                className="w-8 h-8 rounded-full bg-devil-dim text-devil-muted hover:text-foreground transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="text-lg font-bold w-16 text-center">{current.bodyFatPercent || "—"}%</span>
              <button
                onClick={() => updateField("bodyFatPercent", (current.bodyFatPercent || 18) + 1)}
                className="w-8 h-8 rounded-full bg-devil-dim text-devil-muted hover:text-foreground transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-devil-dark rounded-xl p-5 border border-devil-dim mb-4"
      >
        <h3 className="text-sm uppercase tracking-wider text-devil-muted mb-4">Objectif</h3>
        <div className="flex gap-2">
          {Object.entries(goalLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateField("goalType", key)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                current.goalType === key
                  ? "bg-devil-red text-white"
                  : "bg-devil-dim text-devil-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Nutrition targets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-devil-dark rounded-xl p-5 border border-devil-dim mb-4"
      >
        <h3 className="text-sm uppercase tracking-wider text-devil-muted mb-4">Objectifs nutritionnels</h3>
        <div className="space-y-4">
          {[
            { field: "dailyKcalTarget" as const, label: "Calories", unit: "kcal", step: 50, color: "text-devil-red" },
            { field: "dailyProteinG" as const, label: "Protéines", unit: "g", step: 5, color: "text-devil-teal" },
            { field: "dailyCarbsG" as const, label: "Glucides", unit: "g", step: 10, color: "text-devil-orange" },
            { field: "dailyFatG" as const, label: "Lipides", unit: "g", step: 5, color: "text-devil-blue" },
          ].map(({ field, label, unit, step, color }) => (
            <div key={field} className="flex items-center justify-between">
              <label className="text-sm">{label}</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateField(field, (current[field] as number) - step)}
                  className="w-8 h-8 rounded-full bg-devil-dim text-devil-muted hover:text-foreground transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <span className={`text-lg font-bold w-20 text-center ${color}`}>
                  {current[field]} {unit}
                </span>
                <button
                  onClick={() => updateField(field, (current[field] as number) + step)}
                  className="w-8 h-8 rounded-full bg-devil-dim text-devil-muted hover:text-foreground transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Training window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-devil-dark rounded-xl p-5 border border-devil-dim mb-6"
      >
        <h3 className="text-sm uppercase tracking-wider text-devil-muted mb-4">Créneau training</h3>
        <div className="flex gap-2">
          {["12h-14h", "17h-19h"].map((window) => (
            <button
              key={window}
              onClick={() => updateField("trainingWindow", window)}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                current.trainingWindow === window
                  ? "bg-devil-red text-white"
                  : "bg-devil-dim text-devil-muted hover:text-foreground"
              }`}
            >
              {window}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Save button */}
      {Object.keys(edited).length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 bg-devil-red text-white rounded-xl font-bold text-lg hover:bg-devil-red/90 transition-colors disabled:opacity-50"
        >
          {saving ? "Sauvegarde..." : "Sauvegarder les modifications"}
        </motion.button>
      )}

      {/* Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-devil-dark rounded-xl p-5 border border-devil-dim"
      >
        <h3 className="text-sm uppercase tracking-wider text-devil-muted mb-4">Programme semaine</h3>
        <div className="space-y-2">
          {[
            { day: "Lundi", type: "Push", color: "text-devil-red" },
            { day: "Mardi", type: "Pull", color: "text-devil-red" },
            { day: "Mercredi", type: "Cardio HIIT", color: "text-devil-orange" },
            { day: "Jeudi", type: "Jambes", color: "text-devil-red" },
            { day: "Vendredi", type: "Full Body", color: "text-devil-red" },
            { day: "Samedi", type: "Récup active", color: "text-devil-teal" },
            { day: "Dimanche", type: "Repos", color: "text-devil-blue" },
          ].map(({ day, type, color }) => (
            <div key={day} className="flex items-center justify-between py-2 border-b border-devil-dim last:border-0">
              <span className="text-sm text-devil-muted">{day}</span>
              <span className={`text-sm font-medium ${color}`}>{type}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 text-center">
        <p className="text-devil-dim text-xs">DAREDEVIL v1.0 — Hell&apos;s Kitchen Fitness</p>
      </div>
    </motion.div>
  );
}
