import React from "react";
import { updateProperty } from "@/app/actions/properties";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = await createClient();
  
  const { data: property } = await supabase
    .from("properties")
    .select("*, property_images(url, is_cover)")
    .eq("id", id)
    .single();

  if (!property) {
    notFound();
  }

  const coverImage = property.property_images?.find((img: any) => img.is_cover)?.url || "";

  // Helper to bind the ID to the Server Action
  const updateWithId = updateProperty.bind(null, id);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/properties" className="inline-flex items-center text-sm text-zinc-500 hover:text-black mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Editar Imóvel</h1>
        <p className="text-zinc-500">Atualize as informações desta propriedade.</p>
      </div>

      <form action={updateWithId} className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="title">Título do Anúncio</label>
            <input id="title" name="title" type="text" defaultValue={property.title} required className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="description">Descrição</label>
            <textarea id="description" name="description" rows={4} defaultValue={property.description || ""} className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="price">Preço (R$)</label>
            <input id="price" name="price" type="number" step="0.01" defaultValue={property.price} required className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="status">Visibilidade</label>
            <select id="status" name="status" defaultValue={property.status} className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5">
              <option value="publico">Público (Vitrine)</option>
              <option value="off_market">Off-Market (Apenas VIP)</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="city">Cidade</label>
            <input id="city" name="city" type="text" defaultValue={property.city} required className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="neighborhood">Bairro</label>
            <input id="neighborhood" name="neighborhood" type="text" defaultValue={property.neighborhood || ""} className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="bedrooms">Quartos</label>
              <input id="bedrooms" name="bedrooms" type="number" defaultValue={property.bedrooms || 0} className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="bathrooms">Banheiros</label>
              <input id="bathrooms" name="bathrooms" type="number" defaultValue={property.bathrooms || 0} className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="parking_spots">Vagas</label>
              <input id="parking_spots" name="parking_spots" type="number" defaultValue={property.parking_spots || 0} className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="area_sqm">Área (m²)</label>
              <input id="area_sqm" name="area_sqm" type="number" step="0.1" defaultValue={property.area_sqm || 0} className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="cover_image">URL da Imagem de Capa</label>
            <input id="cover_image" name="cover_image" type="url" defaultValue={coverImage} className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-black/5 mt-2">
          <button type="submit" className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-colors">
            Atualizar Imóvel
          </button>
        </div>
      </form>
    </div>
  );
}
