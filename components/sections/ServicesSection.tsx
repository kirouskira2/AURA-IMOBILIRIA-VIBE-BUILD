import React from "react";
import { Star, Lock, ShieldCheck, TrendingUp } from "lucide-react";
import { services } from "@/lib/data";

const icons = [
  <Star key={0} className="w-5 h-5 text-zinc-300" />,
  <Lock key={1} className="w-5 h-5 text-zinc-300" />,
  <ShieldCheck key={2} className="w-5 h-5 text-zinc-300" />,
  <TrendingUp key={3} className="w-5 h-5 text-zinc-300" />
];

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-zinc-50 text-black w-full py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6">
        <div className="max-w-3xl">
          <h4 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-4">A Experiência Aura</h4>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">Uma assessoria imobiliária que entende o seu momento e o seu tempo.</h2>
          <p className="mt-6 text-lg text-zinc-600">Oferecemos soluções sob medida de <strong className="text-black">gestão de portfólio</strong> e assessoria completa em aquisição e venda. Nossa missão é facilitar grandes decisões mantendo alto padrão de discrição.</p>
        </div>
        
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="relative flex flex-col gap-6 rounded-[24px] p-8 text-black overflow-hidden bg-black/[0.02] border border-black/5 hover:bg-black/[0.04] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center border border-black/10 group-hover:scale-110 transition-transform duration-300">
                {icons[idx]}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">{service.name}</h2>
                <p className="text-sm leading-relaxed text-zinc-600">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
