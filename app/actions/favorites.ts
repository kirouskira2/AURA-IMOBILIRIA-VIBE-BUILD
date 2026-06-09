"use server";

import { createClient } from "@/utils/supabase/server";

export async function toggleFavorite(propertyId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Não autenticado" };

  // Check if it's already favorited
  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("property_id", propertyId)
    .single();

  if (existing) {
    // Remove favorite
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", existing.id);
      
    if (error) return { error: "Erro ao remover favorito" };
    return { isFavorited: false };
  } else {
    // Add favorite
    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: user.id, property_id: propertyId });
      
    if (error) return { error: "Erro ao adicionar favorito" };
    return { isFavorited: true };
  }
}
