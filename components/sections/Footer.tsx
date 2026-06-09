"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/leads";

export function Footer() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleAction = async (formData: FormData) => {
    setStatus("loading");
    const result = await subscribeNewsletter(formData);
    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("Inscrição realizada com sucesso!");
    }
  };
  return (
    <div 
      className="relative h-[92vh] lg:h-[82vh]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[92vh] lg:h-[82vh] w-full flex flex-col justify-end">
        <footer className="relative bg-black flex flex-col justify-between pb-0 pt-8 z-10 w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8 mb-4 md:mb-8 mt-4 md:mt-8">
            <div className="bg-black px-4 py-6 md:p-8 overflow-hidden relative border-none">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[2/1] w-full max-w-[500px] rounded-2xl overflow-hidden relative">
                     <Image src="https://picsum.photos/seed/newsletter/800/400" fill className="object-cover" alt="Newsletter da Aura" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 max-w-md">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Receba oportunidades off-market exclusivas</h2>
                  <p className="text-zinc-400 mb-8 text-lg leading-relaxed">Nossa newsletter mensal apresenta análises de mercado, dicas de arquitetura e imóveis que não são anunciados abertamente.</p>
                  <form action={handleAction} className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input name="email" placeholder="Seu melhor e-mail" required className="flex-1 bg-zinc-900 border border-white/10 rounded-full px-6 py-3.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all" type="email" disabled={status === "loading" || status === "success"} />
                      <button type="submit" disabled={status === "loading" || status === "success"} className="bg-white hover:bg-zinc-200 text-black font-semibold rounded-full px-8 py-3.5 transition-colors whitespace-nowrap disabled:opacity-50">
                        {status === "loading" ? "Enviando..." : status === "success" ? "Inscrito" : "Inscrever-se"}
                      </button>
                    </div>
                    {message && (
                      <p className={`text-sm px-2 ${status === "error" ? "text-red-400" : "text-emerald-400"}`}>{message}</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mx-auto w-full max-w-screen-xl px-8 flex-1 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 overflow-y-auto mt-4">
            <div className="col-span-1 md:col-span-1">
               <Link className="text-3xl font-bold tracking-tighter text-white mb-6 inline-block" href="/">AURA.</Link>
               <p className="text-zinc-400 text-sm leading-relaxed mb-6">A agência imobiliária boutique focada em experiências de alto padrão, exclusividade e discrição em São Paulo.</p>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><Instagram className="w-4 h-4"/></a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><Linkedin className="w-4 h-4"/></a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all"><Facebook className="w-4 h-4"/></a>
               </div>
            </div>
            <div className="flex flex-col gap-4">
               <h4 className="font-semibold text-white mb-2">Imóveis</h4>
               <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Mansões & Casas</Link>
               <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Coberturas</Link>
               <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Apartamentos de Luxo</Link>
               <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Off-Market</Link>
            </div>
            <div className="flex flex-col gap-4">
               <h4 className="font-semibold text-white mb-2">Empresa</h4>
               <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Nossa História</Link>
               <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Equipe de Corretores</Link>
               <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Imprensa</Link>
               <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Trabalhe Conosco</Link>
            </div>
            <div className="flex flex-col gap-4">
               <h4 className="font-semibold text-white mb-2">Contato</h4>
               <p className="text-sm text-zinc-500">Av. Brigadeiro Faria Lima, 3000<br/>Itaim Bibi, São Paulo - SP</p>
               <p className="text-sm text-zinc-500 mt-2 hover:text-white cursor-pointer">+55 (11) 99999-0000</p>
               <p className="text-sm text-zinc-500 hover:text-white cursor-pointer">contato@auraproperties.com</p>
            </div>
          </div>
          
          <div className="mx-auto w-full max-w-screen-xl px-8 w-full mt-auto mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10 pt-8 pb-4">
              <span className="text-sm text-zinc-600 sm:text-center">© 2026 Aura Properties. Todos os direitos reservados. Creci J-123456</span>
              <div className="flex space-x-6 sm:justify-center">
                <Link href="#" className="text-xs text-zinc-600 hover:text-white transition-colors">Privacidade</Link>
                <Link href="#" className="text-xs text-zinc-600 hover:text-white transition-colors">Termos de Uso</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
