"use client";

import React, { useState } from "react";
import Link from "next/link";
import { resetPasswordForEmail } from "@/app/actions/auth";

export default function ForgotPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (formData: FormData) => {
    setLoading(true);
    setError("");
    
    const result = await resetPasswordForEmail(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="text-4xl font-bold tracking-tighter text-white inline-block mb-4">AURA.</Link>
          <h1 className="text-2xl font-medium tracking-tight">Recuperar Senha</h1>
          <p className="text-zinc-500 mt-2 text-sm">Enviaremos um link para o seu e-mail.</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          {success ? (
            <div className="text-center relative z-10 py-4">
              <h3 className="text-xl font-semibold mb-2">E-mail Enviado</h3>
              <p className="text-zinc-400 text-sm mb-6">Verifique sua caixa de entrada e clique no link para redefinir sua senha.</p>
              <Link href="/login" className="inline-block bg-white text-black font-semibold rounded-xl px-6 py-3 hover:bg-zinc-200 transition-colors">Voltar ao Login</Link>
            </div>
          ) : (
            <form action={handleReset} className="flex flex-col gap-5 relative z-10">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2 block" htmlFor="email">E-mail</label>
                <input 
                  id="email"
                  name="email" 
                  type="email" 
                  required 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                  placeholder="vip@exemplo.com"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="mt-2 w-full bg-white text-black font-semibold rounded-xl py-3.5 hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar Link de Recuperação"}
              </button>

              <div className="text-center mt-2">
                <Link href="/login" className="text-xs text-zinc-500 hover:text-white transition-colors">Voltar ao Login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
