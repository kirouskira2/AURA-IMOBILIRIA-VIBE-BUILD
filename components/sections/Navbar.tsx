"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MessageCircle, ChevronRight, ArrowRight, Lock } from "lucide-react";
import { useScrollNav } from "@/hooks/useScrollNav";

export function Navbar() {
  const { scrolled, isNavVisible } = useScrollNav();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const isDarkNav = scrolled;

  return (
    <>
      <header className="fixed left-0 right-0 mx-auto z-50 w-full px-4 md:px-0 top-0 md:top-4 animate-fade-in [--animation-delay:600ms] pointer-events-none flex flex-col items-center">
        <motion.div 
          animate={{
            width: scrolled ? "85%" : "100%",
            maxWidth: scrolled ? "850px" : "1000px",
            height: isCollectionsHovered ? 420 : 80,
            borderRadius: isCollectionsHovered ? 32 : (scrolled ? 40 : 24),
            y: isNavVisible || isCollectionsHovered ? (scrolled ? 10 : 0) : -150,
            opacity: isNavVisible || isCollectionsHovered ? 1 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            height: {
              duration: isCollectionsHovered ? 0.4 : 0.15,
              type: isCollectionsHovered ? "spring" : "tween",
              ease: "easeInOut"
            }
          }}
          className={`pointer-events-auto relative overflow-hidden flex flex-col justify-start transition-colors duration-300 ease-in-out border backdrop-blur-xl ${isCollectionsHovered ? (isDarkNav ? 'bg-black border-white/10 shadow-2xl' : 'bg-white border-black/10 shadow-2xl') : (scrolled ? 'bg-black/95 border-white/10 shadow-[0_16px_68px_rgba(255,255,255,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]' : 'bg-white/40 border-transparent')}`}
          onMouseLeave={() => setIsCollectionsHovered(false)}
        >
          {/* Header top bar */}
          <div className={`flex w-full items-center justify-between h-[80px] px-6 shrink-0 z-20 relative mx-auto`}>
            <div className="flex items-center gap-10 h-full">
              <Link className={`text-2xl font-semibold tracking-tighter flex items-center justify-center ${isDarkNav ? 'text-white' : 'text-black'}`} href="/">
                AURA.
              </Link>
              <nav className="hidden md:flex h-full">
                <ul className="flex items-center gap-2 h-full">
                  <li 
                    className="h-full flex items-center"
                    onMouseEnter={() => setIsCollectionsHovered(true)}
                  >
                    <button className={`rounded-full flex items-center text-sm font-medium transition-colors duration-300 px-4 py-2 h-auto cursor-pointer relative z-[60] ${isDarkNav ? 'hover:bg-white/10 text-zinc-300 hover:text-white' : 'hover:bg-black/5 text-zinc-600 hover:text-black'}`}>
                      Coleções
                    </button>
                  </li>
                  <li className="h-full flex items-center" onMouseEnter={() => setIsCollectionsHovered(false)}>
                    <Link className={`rounded-full flex items-center text-sm font-medium transition-colors duration-300 px-4 py-2 h-auto ${isDarkNav ? 'hover:bg-white/10 text-zinc-300 hover:text-white' : 'hover:bg-black/5 text-zinc-600 hover:text-black'}`} href="#servicos">Diferenciais</Link>
                  </li>
                  <li className="h-full flex items-center" onMouseEnter={() => setIsCollectionsHovered(false)}>
                    <Link className={`rounded-full flex items-center text-sm font-medium transition-colors duration-300 px-4 py-2 h-auto ${isDarkNav ? 'hover:bg-white/10 text-zinc-300 hover:text-white' : 'hover:bg-black/5 text-zinc-600 hover:text-black'}`} href="#depoimentos">Quem Somos</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="ml-auto flex h-full items-center gap-4">
              <Link href="/login" className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors h-10 px-3 text-sm hidden md:flex gap-1.5 ${isDarkNav ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-black'}`}>
                <Lock className="w-3.5 h-3.5" />
                <span>Área Restrita</span>
              </Link>
              <Link className={`inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:scale-105 h-10 px-5 py-2 text-sm hidden md:flex gap-2 ${isDarkNav ? 'bg-white text-black' : 'bg-black text-white'}`} href="https://wa.me/5581973380824" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </Link>
              <button className={`md:hidden ${isDarkNav ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-black'}`} onClick={() => setIsMobileMenuOpen(true)}>
                <span className="sr-only">Toggle menu</span>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isCollectionsHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(4px)", transition: { duration: 0.15 } }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute top-[80px] left-0 w-full h-[340px] pointer-events-auto z-10 px-6 pb-6 pt-0 flex"
              >
                <div className="w-full h-full mx-auto flex gap-4">
                  <div className="flex flex-1 gap-4 h-full">
                    <Link href="#imoveis" className={`flex-1 border rounded-3xl overflow-hidden relative group/card h-full ${isDarkNav ? 'border-white/5 bg-black/40' : 'border-black/5 bg-white/40'}`}>
                      <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" fill className="object-cover group-hover/card:scale-105 transition-transform duration-700" alt="Casas em Condomínio"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 z-10 pr-6">
                        <h3 className="text-white font-bold text-2xl leading-tight mb-2">Casas em<br/>Condomínio</h3>
                        <span className="text-white/80 text-sm font-medium flex items-center gap-1 group-hover/card:gap-2 transition-all">Explorar Coleção <ChevronRight className="w-4 h-4"/></span>
                      </div>
                    </Link>

                    <Link href="#imoveis" className={`flex-1 border rounded-3xl overflow-hidden relative group/card h-full ${isDarkNav ? 'border-white/5 bg-black/40' : 'border-black/5 bg-white/40'}`}>
                      <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop" fill className="object-cover group-hover/card:scale-105 transition-transform duration-700" alt="Lançamentos Exclusivos"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 z-10 pr-6">
                        <h3 className="text-white font-bold text-2xl leading-tight mb-2">Lançamentos<br/>Exclusivos</h3>
                        <span className="text-white/80 text-sm font-medium flex items-center gap-1 group-hover/card:gap-2 transition-all">Explorar Coleção <ChevronRight className="w-4 h-4"/></span>
                      </div>
                    </Link>
                  </div>
                  
                  <div className={`w-[280px] shrink-0 flex flex-col py-6 px-6 rounded-3xl border ${isDarkNav ? 'bg-[#151515] border-white/5' : 'bg-zinc-50 border-black/5'}`}>
                    <h3 className={`font-semibold flex items-center gap-2 text-xl mb-6 ${isDarkNav ? 'text-white' : 'text-black'}`}>Destaques <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full tracking-widest ${isDarkNav ? 'bg-white text-black' : 'bg-black text-white'}`}>Top</span></h3>
                    <ul className="flex flex-col gap-4 mb-auto">
                      <li><Link href="#imoveis" className={`text-sm transition-colors flex items-center gap-3 ${isDarkNav ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}><span className={`w-1.5 h-1.5 rounded-full ${isDarkNav ? 'bg-white/30' : 'bg-black/30'}`}></span> Reserva Cidade Jardim</Link></li>
                      <li><Link href="#imoveis" className={`text-sm transition-colors flex items-center gap-3 ${isDarkNav ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}><span className={`w-1.5 h-1.5 rounded-full ${isDarkNav ? 'bg-white/30' : 'bg-black/30'}`}></span> Fasano Residences SP</Link></li>
                      <li><Link href="#imoveis" className={`text-sm transition-colors flex items-center gap-3 ${isDarkNav ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}><span className={`w-1.5 h-1.5 rounded-full ${isDarkNav ? 'bg-white/30' : 'bg-black/30'}`}></span> Fazenda Boa Vista</Link></li>
                      <li><Link href="#imoveis" className={`text-sm transition-colors flex items-center gap-3 ${isDarkNav ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}><span className={`w-1.5 h-1.5 rounded-full ${isDarkNav ? 'bg-white/30' : 'bg-black/30'}`}></span> CJ Shops</Link></li>
                    </ul>
                    <Link href="#imoveis" className={`mt-6 font-semibold py-3 px-6 rounded-2xl inline-flex items-center justify-center gap-2 transition-colors text-sm border ${isDarkNav ? 'bg-zinc-800 hover:bg-zinc-700 text-white border-white/10' : 'bg-zinc-200 hover:bg-zinc-300 text-black border-black/5'}`}>
                      Portfólio restrito <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] h-screen w-full overflow-auto bg-white/95 backdrop-blur-xl transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:hidden`}>
        <div className="flex h-[90px] items-center justify-between px-6">
          <Link className="text-2xl font-bold tracking-tighter text-black" href="/" onClick={()=>setIsMobileMenuOpen(false)}>AURA.</Link>
          <button className="text-zinc-600 hover:text-black" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="sr-only">Close menu</span>
            <X className="w-8 h-8" />
          </button>
        </div>
        <ul className="flex flex-col px-6 pt-8 gap-4">
          <li className="border-b border-black/5 py-4"><Link onClick={()=>setIsMobileMenuOpen(false)} className="hover:text-black flex w-full items-center text-2xl font-medium text-zinc-600 transition-colors duration-300" href="#imoveis">Coleções</Link></li>
          <li className="border-b border-black/5 py-4"><Link onClick={()=>setIsMobileMenuOpen(false)} className="hover:text-black flex w-full items-center text-2xl font-medium text-zinc-600 transition-colors duration-300" href="#servicos">Diferenciais</Link></li>
          <li className="border-b border-black/5 py-4"><Link onClick={()=>setIsMobileMenuOpen(false)} className="hover:text-black flex w-full items-center text-2xl font-medium text-zinc-600 transition-colors duration-300" href="#depoimentos">Quem Somos</Link></li>
          <li className="py-8">
            <Link onClick={()=>setIsMobileMenuOpen(false)} className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-black text-white h-14 text-lg gap-2" href="https://wa.me/5581973380824" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" /> Falar com Especialista
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
