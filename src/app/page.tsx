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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wallpapercave.com/wp/wp6776560.jpg"
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-sm"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <h1 className="font-heading text-5xl text-devil-red tracking-tight">
              DAREDEVIL
            </h1>
            <p className="text-devil-muted text-xs mt-2 uppercase tracking-[0.3em]">
              Personal Fitness Coaching
            </p>
          </motion.div>

          {/* Daredevil image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden border-2 border-devil-red/30 shadow-[0_0_40px_rgba(230,57,70,0.2)]"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwjtOtaQ5DWYBdYjpfu2cN4Gc1QHO3ftb3A&s"
              alt="Daredevil"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-devil-muted text-base max-w-xs mx-auto mb-8 font-heading italic"
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
              className="inline-block w-full bg-devil-red text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-devil-red/90 transition-all active:scale-95"
            >
              Commencer le programme
            </Link>
          </motion.div>

          {/* Features preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 grid grid-cols-2 gap-3 text-left"
          >
            {[
              { icon: "💪", title: "Training", desc: "Programme Push/Pull/Legs" },
              { icon: "🥩", title: "Nutrition", desc: "2000 kcal / 154g prot." },
              { icon: "📅", title: "Planning", desc: "6 jours par semaine" },
              { icon: "🎯", title: "Objectif", desc: "Lean Charlie Cox" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="bg-devil-dark/80 backdrop-blur-sm rounded-lg p-3 border border-devil-dim"
              >
                <div className="text-xl mb-1">{feature.icon}</div>
                <h3 className="text-xs font-bold">{feature.title}</h3>
                <p className="text-[10px] text-devil-muted mt-0.5">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
