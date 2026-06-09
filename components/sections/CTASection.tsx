import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <div className="bg-white relative z-20">
      <section id="contato" className="relative py-32 md:py-48 bg-white text-black flex flex-col items-center justify-center min-h-[700px] border-t border-black/5">
        <div className="absolute inset-0 pointer-events-none">
          {/* Elegant grid lines */}
          <div className="absolute left-0 right-0 top-1/4 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
          <div className="absolute left-0 right-0 bottom-1/4 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-1/4 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          <div className="mb-10 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-black/10 bg-black/5 backdrop-blur-md text-xs font-semibold tracking-widest uppercase text-zinc-600">
            Atendimento Exclusivo
          </div>
          
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 text-black text-balance leading-[1.1]">
            Dê o próximo passo<br/>para o seu novo lar.
          </h2>
          
          <p className="text-xl md:text-2xl text-zinc-600 mb-14 max-w-2xl text-balance font-light">
            Converse agora com nossos especialistas e obtenha acesso instantâneo ao nosso portfólio exclusivo de alto padrão.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
            <Link href="#contato" className="inline-flex items-center justify-center px-10 py-5 text-base font-medium text-white bg-black rounded-full hover:bg-zinc-800 transition-all duration-300 gap-3 hover:-translate-y-1 w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" /> Fale no WhatsApp
            </Link>
            <Link href="#contato" className="inline-flex items-center justify-center px-10 py-5 text-base font-medium text-black bg-transparent border border-black/20 rounded-full hover:bg-black/5 transition-all duration-300 w-full sm:w-auto">
              Agendar Reunião
            </Link>
          </div>
        </div>
      </section>
      <div className="h-16 md:h-[160px] flex-shrink-0 w-full shrink-0 bg-transparent">
      </div>
    </div>
  );
}
