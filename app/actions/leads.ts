"use server";

import { createClient } from "@/utils/supabase/server";

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email é obrigatório" };

  const supabase = await createClient();
  
  const { error } = await supabase.from("leads").insert({
    name: "Inscrito Newsletter",
    email: email,
    is_newsletter: true,
    source: "newsletter",
    status: "novo",
  });

  if (error) {
    console.error("Erro ao inserir lead:", error);
    if (error.code === "23505") { 
      return { error: "E-mail já está inscrito." };
    }
    return { error: "Erro ao se inscrever. Tente novamente." };
  }

  return { success: true };
}
