import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export async function PropertiesShowcase() {
  const supabase = await createClient();
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*, property_images(url, is_cover)")
    .eq("status", "publico")
    .eq("is_featured", true);

  if (error) {
    console.error("Error fetching properties:", error);
  }

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const propsList = properties || [];

  return (
    <section id="imoveis" className="py-32 bg-white text-black overflow-hidden border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">Imóveis em Destaque</h2>
          <p className="text-lg text-zinc-600 max-w-xl leading-relaxed">
            Conheça nossa seleção de residências de prestígio, apartamentos de luxo e as maiores oportunidades de investimento do mercado brasileiro.
          </p>
        </div>
        <Link href="#contato" className="inline-flex items-center text-sm font-semibold hover:text-zinc-700 transition-colors gap-1 border-b border-black pb-1">
          Ver todos os imóveis <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="relative flex overflow-x-hidden group pb-10">
        <div className="flex gap-6 md:gap-8 px-4 whitespace-nowrap w-max animate-marquee [--duration:500s] hover:[animation-play-state:paused]">
          {[...propsList, ...propsList].map((item, index) => {
            const coverImage = item.property_images?.find((img: any) => img.is_cover)?.url || '/placeholder.jpg';
            return (
              <div key={`${item.id}-${index}`} className="w-[320px] md:w-[440px] bg-zinc-50 rounded-[24px] overflow-hidden flex-shrink-0 border border-black/5 hover:border-black/20 transition-all duration-300 group/card cursor-pointer flex flex-col shadow-2xl">
                <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                  <Image alt={item.title} loading="lazy" className="object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out" src={coverImage} fill referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border border-white/10">
                    Exclusivo
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <span className="text-white font-semibold text-2xl tracking-tight drop-shadow-md">{formatPrice(item.price)}</span>
                    <span className="bg-white text-black px-4 py-2 rounded-full font-semibold text-xs opacity-0 group-hover/card:opacity-100 transition-all translate-y-2 group-hover/card:translate-y-0 duration-300 shadow-xl">
                      Ver Detalhes
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                  <div>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {item.neighborhood}, {item.city}
                    </p>
                    <h3 className="font-semibold text-xl text-black tracking-tight">{item.title}</h3>
                  </div>
                  <div className="flex gap-5 text-zinc-700 text-sm mt-auto pt-6 border-t border-black/5 font-medium">
                    <span className="flex items-center gap-2"><Bed className="w-4 h-4 text-zinc-500"/> {item.bedrooms}</span>
                    <span className="flex items-center gap-2"><Bath className="w-4 h-4 text-zinc-500"/> {item.bathrooms}</span>
                    <span className="flex items-center gap-2"><Maximize className="w-4 h-4 text-zinc-500"/> {item.area_sqm}m²</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
