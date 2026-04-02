"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <img
            src={session.user.image}
            alt=""
            className="w-8 h-8 rounded-full border border-devil-dim"
          />
        )}
        <button
          onClick={() => signOut()}
          className="text-xs text-devil-muted hover:text-devil-red transition-colors"
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="bg-devil-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-devil-red/90 transition-colors"
    >
      Connexion
    </button>
  );
}
