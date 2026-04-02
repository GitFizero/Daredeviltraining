"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExerciseCard from "@/components/ExerciseCard";
import AlternativesSheet from "@/components/AlternativesSheet";
import WeeklyStrip from "@/components/WeeklyStrip";
import SessionSummary from "@/components/SessionSummary";
import { ExerciseCardSkeleton } from "@/components/LoadingSkeleton";

interface Exercise {
  id: string;
  exerciseName: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  weightKg: number;
  setsCompleted: number;
  notes: string | null;
  orderIndex: number;
}

interface DayPlan {
  dayType: string;
  label: string;
  tag: string;
  tagColor: string;
  exercises: {
    name: string;
    muscleGroup: string;
    sets: number;
    reps: string;
    weightKg: number;
    notes: string;
    gifUrl: string;
    alternatives: {
      name: string;
      muscleGroup: string;
      reason: string;
      gifUrl: string;
    }[];
  }[];
}

interface SessionData {
  id: string;
  date: string;
  dayType: string;
  status: string;
  exercises: Exercise[];
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  day: string;
  isToday: boolean;
}

export default function TrainingPage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [dayPlan, setDayPlan] = useState<DayPlan | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionStartTime] = useState<number>(Date.now());
  const [completing, setCompleting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [workoutRes, calendarRes] = await Promise.all([
        fetch("/api/workout/today"),
        fetch("/api/calendar/week"),
      ]);
      const workoutData = await workoutRes.json();
      const calendarData = await calendarRes.json();
      setSession(workoutData.session);
      setDayPlan(workoutData.dayPlan);
      setCalendarEvents(calendarData.events || []);
    } catch (err) {
      console.error("Erreur chargement:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSetComplete = async (exerciseId: string, newSetsCompleted: number) => {
    try {
      const res = await fetch("/api/workout/exercise", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseId, setsCompleted: newSetsCompleted }),
      });
      const data = await res.json();
      setSession((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          exercises: prev.exercises.map((ex) =>
            ex.id === exerciseId ? { ...ex, setsCompleted: data.exercise.setsCompleted } : ex
          ),
        };
      });

      // Check if all exercises are complete
      if (session) {
        const updatedExercises = session.exercises.map((ex) =>
          ex.id === exerciseId ? { ...ex, setsCompleted: newSetsCompleted } : ex
        );
        const allDone = updatedExercises.every((ex) => ex.setsCompleted >= ex.sets);
        if (allDone && !showSummary) {
          handleSessionComplete();
        }
      }
    } catch (err) {
      console.error("Erreur mise à jour:", err);
    }
  };

  const handleWeightChange = async (exerciseId: string, newWeight: number) => {
    try {
      await fetch("/api/workout/exercise", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseId, weightKg: newWeight }),
      });
      setSession((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          exercises: prev.exercises.map((ex) =>
            ex.id === exerciseId ? { ...ex, weightKg: newWeight } : ex
          ),
        };
      });
    } catch (err) {
      console.error("Erreur poids:", err);
    }
  };

  const handleReplaceExercise = async (exerciseIndex: number, alt: { name: string; muscleGroup: string }) => {
    if (!session) return;
    const exercise = session.exercises[exerciseIndex];
    try {
      await fetch("/api/workout/exercise", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: exercise.id,
          exerciseName: alt.name,
          muscleGroup: alt.muscleGroup,
        }),
      });
      setSession((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          exercises: prev.exercises.map((ex, i) =>
            i === exerciseIndex ? { ...ex, exerciseName: alt.name, muscleGroup: alt.muscleGroup } : ex
          ),
        };
      });
    } catch (err) {
      console.error("Erreur remplacement:", err);
    }
    setSelectedExerciseIndex(null);
  };

  const handleSessionComplete = async () => {
    if (!session || completing) return;
    setCompleting(true);
    const durationMinutes = Math.round((Date.now() - sessionStartTime) / 60000);
    try {
      await fetch("/api/workout/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.id, durationMinutes }),
      });
      setShowSummary(true);
    } catch (err) {
      console.error("Erreur complétion:", err);
    } finally {
      setCompleting(false);
    }
  };

  const completedExercises = session?.exercises.filter((ex) => ex.setsCompleted >= ex.sets).length || 0;
  const totalExercises = session?.exercises.length || 0;
  const totalSets = session?.exercises.reduce((acc, ex) => acc + ex.setsCompleted, 0) || 0;
  const totalVolume = session?.exercises.reduce((acc, ex) => {
    const avgReps = parseFloat(ex.reps.split("-").pop() || "10");
    return acc + ex.weightKg * ex.setsCompleted * avgReps;
  }, 0) || 0;

  const tagColorMap: Record<string, string> = {
    "devil-red": "bg-devil-red",
    "devil-orange": "bg-devil-orange",
    "devil-teal": "bg-devil-teal",
    "devil-blue": "bg-devil-blue",
  };

  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const today = new Date().getDay();
  const weekStripEvents = weekDays.map((day, i) => {
    const event = calendarEvents.find((e) => e.day === day || new Date(e.start).getDay() === i);
    return {
      day,
      label: event?.title || "",
      time: event ? new Date(event.start).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "",
      isToday: i === today,
      isCompleted: false,
    };
  });

  if (loading) {
    return (
      <div className="px-4 pt-4 pb-24 space-y-4">
        <div className="skeleton h-12 w-48 mb-2" />
        <div className="skeleton h-16 w-full rounded-xl" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <ExerciseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // REST day
  if (!session || dayPlan?.dayType === "REST") {
    return (
      <div className="px-4 pt-4 pb-24">
        <WeeklyStrip events={weekStripEvents} onDayClick={() => {}} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <div className="text-6xl mb-6">😴</div>
          <h1 className="font-heading text-3xl mb-3">Repos complet</h1>
          <p className="text-devil-muted text-lg max-w-sm mx-auto">
            Même le Diable de Hell&apos;s Kitchen a besoin de repos. Récupère, hydrate-toi, et prépare-toi pour demain.
          </p>
          <div className="mt-8 p-4 bg-devil-dark rounded-xl border border-devil-dim">
            <p className="text-devil-blue text-sm">
              💡 Conseil : Vise 7-8h de sommeil et 2.5L d&apos;eau aujourd&apos;hui
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-24">
      {/* Weekly strip */}
      <WeeklyStrip events={weekStripEvents} onDayClick={() => {}} />

      {/* Session header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-heading text-2xl">{dayPlan?.label}</h1>
          {dayPlan && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                tagColorMap[dayPlan.tagColor] || "bg-devil-red"
              } text-white`}
            >
              {dayPlan.tag}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-devil-dim rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-devil-red rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm text-devil-muted font-mono">
            {completedExercises}/{totalExercises}
          </span>
        </div>
      </motion.div>

      {/* Exercise cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {session.exercises
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((exercise, index) => {
              const planExercise = dayPlan?.exercises[index];
              return (
                <ExerciseCard
                  key={exercise.id}
                  exercise={{
                    id: exercise.id,
                    name: exercise.exerciseName,
                    muscleGroup: exercise.muscleGroup,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    weightKg: exercise.weightKg,
                    setsCompleted: exercise.setsCompleted,
                    notes: exercise.notes || planExercise?.notes || "",
                    gifUrl: planExercise?.gifUrl || "",
                  }}
                  index={index}
                  onSetComplete={(setIndex) => handleSetComplete(exercise.id, setIndex + 1)}
                  onWeightChange={(newWeight) => handleWeightChange(exercise.id, newWeight)}
                  onShowAlternatives={() => setSelectedExerciseIndex(index)}
                />
              );
            })}
        </AnimatePresence>
      </div>

      {/* Alternatives sheet */}
      {selectedExerciseIndex !== null && dayPlan?.exercises[selectedExerciseIndex] && (
        <AlternativesSheet
          isOpen={true}
          onClose={() => setSelectedExerciseIndex(null)}
          alternatives={dayPlan.exercises[selectedExerciseIndex].alternatives}
          onSelect={(alt) => handleReplaceExercise(selectedExerciseIndex, alt)}
        />
      )}

      {/* Session summary */}
      {showSummary && (
        <SessionSummary
          totalSets={totalSets}
          totalVolume={Math.round(totalVolume)}
          duration={Math.round((Date.now() - sessionStartTime) / 60000)}
          onClose={() => setShowSummary(false)}
        />
      )}
    </div>
  );
}
