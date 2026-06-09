import React from "react";
import Image from "next/image";
import { MapPin, Bed, Bath, Maximize, Lock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { FavoriteButton } from "@/components/ui/FavoriteButton";

export default async function VIPPortfolioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: properties, error } = await supabase
    .from("properties")
    .select("*, property_images(url, is_cover)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching VIP properties:", error);
  }

  let favoriteIds: string[] = [];
  if (user) {
    const { data: favorites } = await supabase
      .from("favorites")
      .select("property_id")
      .eq("user_id", user.id);
    favoriteIds = favorites?.map(f => f.property_id) || [];
  }

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const propsList = properties || [];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Portfólio Exclusivo</h1>
        <p className="text-zinc-600 text-lg">Acesso irrestrito a todas as propriedades off-market e públicas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {propsList.map((item) => {
          const coverImage = item.property_images?.find((img: any) => img.is_cover)?.url || '/placeholder.jpg';
          return (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 transition-all duration-300 group/card shadow-sm flex flex-col relative">
              <FavoriteButton propertyId={item.id} initialIsFavorited={favoriteIds.includes(item.id)} />
              
              <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                <Image alt={item.title} loading="lazy" className="object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out" src={coverImage} fill referrerPolicy="no-referrer" />
                
                {item.status === 'off_market' && (
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest border border-white/10 flex items-center gap-1.5 shadow-xl">
                    <Lock className="w-3 h-3" /> Off-Market
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80"></div>
                <div className="absolute bottom-5 left-5 right-5 flex flex-col">
                  <span className="text-white font-semibold text-2xl tracking-tight drop-shadow-md mb-1">{formatPrice(item.price)}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {item.neighborhood}, {item.city}
                  </p>
                  <h3 className="font-semibold text-lg text-black tracking-tight leading-snug">{item.title}</h3>
                </div>
                <div className="flex gap-5 text-zinc-700 text-sm mt-auto pt-4 border-t border-black/5 font-medium">
                  <span className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-zinc-500"/> {item.bedrooms}</span>
                  <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-zinc-500"/> {item.bathrooms}</span>
                  <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-zinc-500"/> {item.area_sqm}m²</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
