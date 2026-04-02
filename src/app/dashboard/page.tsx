"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ProgressRing from "@/components/ProgressRing";
import StepsChart from "@/components/StepsChart";
import { DashboardSkeleton } from "@/components/LoadingSkeleton";

interface FitData {
  today: {
    steps: number;
    caloriesBurned: number;
    heartRate: number | null;
  };
  weeklySteps: { day: string; steps: number }[];
}

interface WeekStats {
  totalSessions: number;
  completedSessions: number;
  totalVolume: number;
  totalSets: number;
  avgDuration: number;
}

export default function DashboardPage() {
  const [fitData, setFitData] = useState<FitData | null>(null);
  const [weekStats, setWeekStats] = useState<WeekStats | null>(null);
  const [nutritionWeek, setNutritionWeek] = useState<{
    avgKcal: number;
    avgProtein: number;
    daysLogged: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [fitRes, workoutRes, nutritionRes] = await Promise.all([
        fetch("/api/fit/today"),
        fetch("/api/workout/today"),
        fetch("/api/nutrition/today"),
      ]);
      const fit = await fitRes.json();
      const workout = await workoutRes.json();
      const nutrition = await nutritionRes.json();

      setFitData(fit);

      // Derive week stats from current session as placeholder
      if (workout.session) {
        const exercises = workout.session.exercises || [];
        const vol = exercises.reduce((acc: number, ex: { weightKg: number; setsCompleted: number; reps: string }) => {
          const avgReps = parseFloat(ex.reps?.split("-").pop() || "10");
          return acc + ex.weightKg * ex.setsCompleted * avgReps;
        }, 0);
        setWeekStats({
          totalSessions: 5,
          completedSessions: exercises.some((ex: { setsCompleted: number }) => ex.setsCompleted > 0) ? 1 : 0,
          totalVolume: Math.round(vol),
          totalSets: exercises.reduce((acc: number, ex: { setsCompleted: number }) => acc + ex.setsCompleted, 0),
          avgDuration: workout.session.durationMinutes || 0,
        });
      } else {
        setWeekStats({ totalSessions: 5, completedSessions: 0, totalVolume: 0, totalSets: 0, avgDuration: 0 });
      }

      setNutritionWeek({
        avgKcal: nutrition.consumed?.kcal || 0,
        avgProtein: Math.round(nutrition.consumed?.proteinG || 0),
        daysLogged: nutrition.meals?.filter((m: { logged?: boolean }) => m.logged).length || 0,
      });
    } catch (err) {
      console.error("Erreur dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <DashboardSkeleton />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="px-4 pt-4 pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="font-heading text-2xl mb-6">Tableau de bord</h1>

      {/* Today's activity */}
      <motion.div variants={itemVariants} className="bg-devil-dark rounded-xl p-5 border border-devil-dim mb-6">
        <h2 className="text-sm uppercase tracking-wider text-devil-muted mb-4">Activité aujourd&apos;hui</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-devil-teal">
              {fitData?.today.steps?.toLocaleString("fr-FR") || "0"}
            </div>
            <p className="text-xs text-devil-muted mt-1">pas</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-devil-orange">
              {fitData?.today.caloriesBurned || 0}
            </div>
            <p className="text-xs text-devil-muted mt-1">kcal brûlées</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-devil-red">
              {fitData?.today.heartRate || "—"}
            </div>
            <p className="text-xs text-devil-muted mt-1">bpm repos</p>
          </div>
        </div>
      </motion.div>

      {/* Weekly steps chart */}
      <motion.div variants={itemVariants} className="bg-devil-dark rounded-xl p-5 border border-devil-dim mb-6">
        <h2 className="text-sm uppercase tracking-wider text-devil-muted mb-4">Pas cette semaine</h2>
        <StepsChart data={fitData?.weeklySteps || []} />
      </motion.div>

      {/* Training summary */}
      <motion.div variants={itemVariants} className="bg-devil-dark rounded-xl p-5 border border-devil-dim mb-6">
        <h2 className="text-sm uppercase tracking-wider text-devil-muted mb-4">Training cette semaine</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4 text-center">
            <ProgressRing
              value={weekStats?.completedSessions || 0}
              max={weekStats?.totalSessions || 5}
              size={70}
              color="#e63946"
              label="Séances"
            />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-devil-muted">Volume total</p>
              <p className="text-lg font-bold">{weekStats?.totalVolume?.toLocaleString("fr-FR") || 0} kg</p>
            </div>
            <div>
              <p className="text-xs text-devil-muted">Séries totales</p>
              <p className="text-lg font-bold">{weekStats?.totalSets || 0}</p>
            </div>
            <div>
              <p className="text-xs text-devil-muted">Durée moyenne</p>
              <p className="text-lg font-bold">{weekStats?.avgDuration || 0} min</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Nutrition summary */}
      <motion.div variants={itemVariants} className="bg-devil-dark rounded-xl p-5 border border-devil-dim mb-6">
        <h2 className="text-sm uppercase tracking-wider text-devil-muted mb-4">Nutrition aujourd&apos;hui</h2>
        <div className="flex items-center justify-around">
          <ProgressRing
            value={nutritionWeek?.avgKcal || 0}
            max={2000}
            size={80}
            color="#e63946"
            label="Calories"
            unit="kcal"
          />
          <ProgressRing
            value={nutritionWeek?.avgProtein || 0}
            max={154}
            size={80}
            color="#2a9d8f"
            label="Protéines"
            unit="g"
          />
          <div className="text-center">
            <div className="text-3xl font-bold text-devil-orange">
              {nutritionWeek?.daysLogged || 0}/5
            </div>
            <p className="text-xs text-devil-muted mt-1">repas logués</p>
          </div>
        </div>
      </motion.div>

      {/* Calorie adjustment based on activity */}
      {fitData && fitData.today.caloriesBurned > 200 && (
        <motion.div
          variants={itemVariants}
          className="bg-devil-dark rounded-xl p-5 border border-devil-orange/30 mb-6"
        >
          <h2 className="text-sm uppercase tracking-wider text-devil-orange mb-2">
            ⚡ Ajustement calorique
          </h2>
          <p className="text-sm text-devil-muted">
            Tu as brûlé <span className="text-devil-orange font-bold">{fitData.today.caloriesBurned} kcal</span> aujourd&apos;hui.
            Budget restant ajusté :{" "}
            <span className="text-foreground font-bold">
              {2000 - (nutritionWeek?.avgKcal || 0) + Math.round(fitData.today.caloriesBurned * 0.3)} kcal
            </span>
            <span className="text-devil-muted text-xs block mt-1">
              (30% des calories brûlées réintégrées pour maintenir le déficit)
            </span>
          </p>
        </motion.div>
      )}

      {/* Motivational quote */}
      <motion.div variants={itemVariants} className="text-center py-8">
        <p className="text-devil-muted italic text-sm font-heading">
          &quot;Ce n&apos;est pas la façon dont on tombe qui définit qui on est.
          C&apos;est la façon dont on se relève.&quot;
        </p>
        <p className="text-devil-red text-xs mt-2">— Matt Murdock</p>
      </motion.div>
    </motion.div>
  );
}
