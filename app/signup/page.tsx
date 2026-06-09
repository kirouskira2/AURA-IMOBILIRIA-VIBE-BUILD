"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signup } from "@/app/actions/auth";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (formData: FormData) => {
    setLoading(true);
    setError("");
    
    const result = await signup(formData);
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
          <h1 className="text-2xl font-medium tracking-tight">Solicitar Acesso</h1>
          <p className="text-zinc-500 mt-2 text-sm">Preencha os dados para criar sua conta VIP.</p>
        </div>

        <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl overflow-hidden">
          <BorderBeam size={250} duration={12} delay={9} />
          
          {success ? (
            <div className="text-center relative z-10 py-6">
              <h3 className="text-xl font-semibold mb-2">Solicitação Recebida</h3>
              <p className="text-zinc-400 text-sm mb-6">Verifique seu e-mail para confirmar a criação da conta. Após a confirmação, seu acesso será analisado.</p>
              <Link href="/login" className="inline-block bg-white text-black font-semibold rounded-xl px-6 py-3 hover:bg-zinc-200 transition-colors">Voltar ao Login</Link>
            </div>
          ) : (
            <form action={handleSignup} className="flex flex-col gap-5 relative z-10">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2 block" htmlFor="fullName">Nome Completo</label>
                <input 
                  id="fullName"
                  name="fullName" 
                  type="text" 
                  required 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                  placeholder="Seu nome"
                />
              </div>

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
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 block mb-2" htmlFor="password">Senha</label>
                <input 
                  id="password"
                  name="password" 
                  type="password" 
                  required 
                  minLength={6}
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
                <span className="text-black font-semibold text-sm whitespace-pre-wrap">{loading ? "Processando..." : "Criar Conta"}</span>
              </ShimmerButton>

              <p className="text-center text-xs text-zinc-500 mt-2">
                Já possui acesso? <Link href="/login" className="text-white hover:underline">Fazer Login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
