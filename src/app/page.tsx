"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/training");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-devil-red text-4xl font-heading"
        >
          DAREDEVIL
        </motion.div>
      </div>
    );
  }

  if (session) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className="text-7xl mb-4">😈</div>
          <h1 className="font-heading text-5xl text-devil-red tracking-tight">
            DAREDEVIL
          </h1>
          <p className="text-devil-muted text-sm mt-2 uppercase tracking-[0.3em]">
            Coaching Fitness
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-devil-muted text-lg max-w-xs mx-auto mb-12 font-heading italic"
        >
          &quot;Le diable de Hell&apos;s Kitchen ne recule jamais.&quot;
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            href="/auth/signin"
            className="inline-block bg-devil-red text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-devil-red/90 transition-all active:scale-95"
          >
            Commencer le programme
          </Link>
        </motion.div>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-2 gap-4 text-left"
        >
          {[
            { icon: "💪", title: "Training", desc: "Programme Push/Pull/Legs adapté" },
            { icon: "🥩", title: "Nutrition", desc: "2000 kcal, 154g protéines/jour" },
            { icon: "📊", title: "Suivi", desc: "Google Fit + Calendar intégrés" },
            { icon: "🎯", title: "Objectif", desc: "Physique lean style Charlie Cox" },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="bg-devil-dark rounded-lg p-4 border border-devil-dim"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h3 className="text-sm font-bold">{feature.title}</h3>
              <p className="text-xs text-devil-muted mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
