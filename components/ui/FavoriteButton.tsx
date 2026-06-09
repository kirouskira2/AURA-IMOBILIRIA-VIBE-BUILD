"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/app/actions/favorites";

export function FavoriteButton({ propertyId, initialIsFavorited }: { propertyId: string, initialIsFavorited: boolean }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Optimistic UI update
    const previousState = isFavorited;
    setIsFavorited(!previousState);
    setLoading(true);
    
    const result = await toggleFavorite(propertyId);
    
    if (result.error) {
      // Revert if error
      setIsFavorited(previousState);
      console.error(result.error);
    } else {
      setIsFavorited(result.isFavorited ?? false);
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={loading}
      className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl ${
        isFavorited 
          ? "bg-red-500 text-white border-transparent" 
          : "bg-white/70 hover:bg-white text-zinc-600 border border-black/10"
      }`}
    >
      <Heart className={`w-5 h-5 ${isFavorited ? "fill-white" : ""}`} />
    </button>
  );
}
