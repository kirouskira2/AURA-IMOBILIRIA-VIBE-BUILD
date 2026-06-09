import React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export async function TestimonialsSection() {
  const supabase = await createClient();
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials:", error);
  }

  const list = testimonials || [];

  return (
    <div id="depoimentos" className="px-4 bg-white py-20 md:py-40 relative group overflow-hidden">
      <div className="absolute h-96 -top-64 inset-x-0 w-1/2 mx-auto bg-gradient-to-t from-[#9890e3] to-[#b1f4cf] blur-3xl rounded-full opacity-50"></div>
      <div className="max-w-xl md:mx-auto md:text-center xl:max-w-none relative z-10">
        <h2 className="font-sans text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">O que dizem nossos clientes</h2>
        <p className="mt-6 text-lg tracking-tight text-zinc-600 max-w-2xl mx-auto">Nossa muralha do amor. Histórias de sucesso de quem encontrou o imóvel ou a oportunidade ideal através da nossa curadoria.</p>
      </div>
      
      <div className="max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 mt-20">
        {list.map((testi, i) => (
          <div key={i} className="shadow-lg px-8 py-12 rounded-xl border border-black mb-8 break-inside-avoid bg-white inline-block w-full">
            <p className="text-xl md:text-2xl font-normal text-zinc-700 leading-relaxed">&quot;{testi.content}&quot;</p>
            
            <div className="flex flex-row space-x-2 mt-8">
              {testi.avatar_url && (
                <Image 
                  alt={`Avatar de ${testi.client_name}`} 
                  width={40} 
                  height={40} 
                  className="transition duration-500 rounded-full border border-gray-100 object-cover" 
                  src={testi.avatar_url} 
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="flex flex-col">
                <p className="text-sm text-gray-800 font-medium">{testi.client_name}</p>
                <p className="text-xs text-gray-500">{testi.client_title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
