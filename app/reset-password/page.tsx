"use client";

import React, { useState } from "react";
import Link from "next/link";
import { updatePassword } from "@/app/actions/auth";

export default function ResetPasswordPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    setLoading(true);
    setError("");
    
    const result = await updatePassword(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="text-4xl font-bold tracking-tighter text-white inline-block mb-4">AURA.</Link>
          <h1 className="text-2xl font-medium tracking-tight">Nova Senha</h1>
          <p className="text-zinc-500 mt-2 text-sm">Crie uma nova senha para sua conta.</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <form action={handleUpdate} className="flex flex-col gap-5 relative z-10">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2 block" htmlFor="password">Nova Senha</label>
              <input 
                id="password"
                name="password" 
                type="password" 
                required 
                minLength={6}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full bg-white text-black font-semibold rounded-xl py-3.5 hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Redefinir Senha"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
