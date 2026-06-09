import React from "react";

export function StatsSection() {
  return (
    <div className="relative z-20 -mt-16 md:-mt-32 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-16 animate-fade-in opacity-0 translate-y-[-1rem] [--animation-delay:800ms] border-y border-black/5 bg-gradient-to-b from-transparent to-black/[0.02]">
      <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tighter">+R$ 2B</div>
          <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Em vendas realizadas</div>
      </div>
      <div className="w-px h-12 bg-black/10 hidden md:block"></div>
      <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tighter">15 Anos</div>
          <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Expertise no mercado</div>
      </div>
      <div className="w-px h-12 bg-black/10 hidden md:block"></div>
      <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tighter">100%</div>
          <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Discrição & Confianca</div>
      </div>
    </div>
  );
}
