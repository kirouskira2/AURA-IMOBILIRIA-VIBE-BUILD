"use client";

import React, { useState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: FormData) => {
    setLoading(true);
    setError("");
    const result = await login(formData);
    if (result?.error) {
      setError("Credenciais inválidas.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="text-4xl font-bold tracking-tighter text-white inline-block mb-4">AURA.</Link>
          <h1 className="text-2xl font-medium tracking-tight">Portal Exclusivo</h1>
          <p className="text-zinc-500 mt-2 text-sm">Acesse o portfólio restrito e oportunidades off-market.</p>
        </div>

        <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl overflow-hidden">
          <BorderBeam size={250} duration={12} delay={9} />
          <form action={handleLogin} className="flex flex-col gap-5 relative z-10">
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
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 block" htmlFor="password">Senha</label>
                <Link href="/forgot-password" className="text-xs text-zinc-500 hover:text-white transition-colors">Esqueceu?</Link>
              </div>
              <input 
                id="password"
                name="password" 
                type="password" 
                required 
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <ShimmerButton 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full h-12 rounded-xl disabled:opacity-50"
              background="#ffffff"
              shimmerColor="#000000"
            >
              <span className="text-black font-semibold text-sm whitespace-pre-wrap">{loading ? "Autenticando..." : "Entrar no Portal"}</span>
            </ShimmerButton>
            
            <p className="text-center text-xs text-zinc-500 mt-2">
              Ainda não é um cliente VIP? <Link href="/signup" className="text-white hover:underline">Solicite seu acesso</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
