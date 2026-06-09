"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useScrollNav } from "@/hooks/useScrollNav";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";

export function HeroSection() {
  const { scrolled } = useScrollNav();
  const { iframeRef, setIframeLoaded, isMuted, toggleMute } = useVideoPlayer(scrolled);
  
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 400], [45, 0]);
  const scale = useTransform(scrollY, [0, 400], [0.8, 1]);
  const opacity = useTransform(scrollY, [0, 400], [0.4, 1]);

  return (
    <div className="relative min-h-[95vh] flex flex-col justify-center w-full pb-16">
      <section id="hero" className="relative mx-auto max-w-[90rem] px-6 text-center md:px-8 pb-12 pt-28 md:pt-36 z-10 w-full overflow-visible">
        <h1 className="font-light text-4xl sm:text-7xl text-center max-w-5xl mx-auto text-black leading-tight tracking-tight translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          A verdadeira essência do <span className="text-indigo-600">morar bem.</span>
        </h1>
        <p className="mb-10 text-lg md:text-xl tracking-tight text-zinc-600 text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] max-w-2xl mx-auto">
          Curadoria especializada de imóveis de alto padrão nas melhores localizações. Experiência exclusiva, discrição e resultados em cada negócio.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <Link href="#imoveis" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none bg-black text-white shadow-[0_0_40px_rgba(0,0,0,0.1)] hover:shadow-[0_0_60px_rgba(0,0,0,0.2)] hover:bg-zinc-800 h-12 px-8 rounded-full">
            Ver Coleções
          </Link>
          <Link href="https://wa.me/5581973380824" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none border border-black/10 text-black hover:bg-black/5 h-12 px-8 rounded-full gap-2">
            Agendar Consultoria
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div style={{ perspective: '1000px' }} className="mt-16 sm:mt-24 w-full max-w-6xl mx-auto aspect-[16/9] animate-fade-in opacity-0 translate-y-[-1rem] [--animation-delay:800ms]">
          <motion.div 
            style={{
              rotateX: rotateX,
              scale: scale,
              opacity: opacity,
              transformOrigin: "top center"
            }}
            className="relative w-full h-full overflow-hidden bg-zinc-900 group rounded-[32px] border border-white/10 shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none"></div>
            <iframe 
              ref={iframeRef}
              src="https://www.youtube.com/embed/bwccQTI_gfA?enablejsapi=1&autoplay=0&mute=1&loop=1&playlist=bwccQTI_gfA&controls=0&showinfo=0&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=pt&hl=pt" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-full scale-[1.15] group-hover:scale-[1.05] transition-transform duration-1000 pointer-events-none origin-[center_70%]"
              style={{ border: 0 }}
              onLoad={() => setIframeLoaded(true)}
            ></iframe>
            
            {/* Decorative Elements */}
            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center border border-black/10 shadow-2xl">
                 <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]"></div>
              </div>
              <div className="text-left hidden md:block backdrop-blur-md bg-white/60 px-5 py-3 rounded-2xl border border-black/10">
                <p className="text-black font-semibold text-sm">Tour Virtual Exclusivo</p>
                <p className="text-zinc-700 text-xs text-balance mt-0.5">Casa Modernista, SP</p>
              </div>
            </div>

            {/* Sound Control */}
            <button 
              onClick={toggleMute}
              className="absolute bottom-6 md:bottom-10 right-6 md:right-10 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl transition-all hover:scale-105 group/btn"
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
