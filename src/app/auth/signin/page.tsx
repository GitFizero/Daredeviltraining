"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setLoading(true);
    await signIn("credentials", {
      username: "Gaëtan",
      callbackUrl: "/training",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center w-full max-w-sm"
      >
        <div className="text-5xl mb-4">😈</div>
        <h1 className="font-heading text-3xl text-devil-red mb-2">DAREDEVIL</h1>
        <p className="text-devil-muted text-sm mb-10">Connecte-toi pour accéder à ton programme</p>

        {/* Demo login — always available */}
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-devil-red text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-devil-red/90 transition-colors active:scale-95 disabled:opacity-50 mb-4"
        >
          {loading ? "Connexion..." : "Entrer comme Gaëtan"}
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-devil-dim" />
          <span className="text-devil-muted text-xs">ou</span>
          <div className="flex-1 h-px bg-devil-dim" />
        </div>

        {/* Google login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/training" })}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 px-6 py-4 rounded-xl font-medium text-base hover:bg-gray-100 transition-colors active:scale-95"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Connexion avec Google
        </button>

        <p className="text-devil-dim text-xs mt-6">
          Le mode démo fonctionne sans configuration Google
        </p>
      </motion.div>
    </div>
  );
}
