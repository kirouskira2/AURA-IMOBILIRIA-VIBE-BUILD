import React from "react";
import { createProperty } from "@/app/actions/properties";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPropertyPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/properties" className="inline-flex items-center text-sm text-zinc-500 hover:text-black mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Novo Imóvel</h1>
        <p className="text-zinc-500">Cadastre as informações de uma nova propriedade no sistema.</p>
      </div>

      <form action={createProperty} className="bg-white rounded-2xl border border-black/5 shadow-sm p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="title">Título do Anúncio</label>
            <input id="title" name="title" type="text" required className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="Ex: Casa em Condomínio de Luxo" />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="description">Descrição</label>
            <textarea id="description" name="description" rows={4} className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="Descreva os detalhes do imóvel..." />
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="price">Preço (R$)</label>
            <input id="price" name="price" type="number" step="0.01" required className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="Ex: 5000000" />
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="status">Visibilidade</label>
            <select id="status" name="status" className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5">
              <option value="publico">Público (Vitrine)</option>
              <option value="off_market">Off-Market (Apenas VIP)</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="city">Cidade</label>
            <input id="city" name="city" type="text" required className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="Ex: São Paulo" />
          </div>

          <div>
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="neighborhood">Bairro</label>
            <input id="neighborhood" name="neighborhood" type="text" className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="Ex: Jardins" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="bedrooms">Quartos</label>
              <input id="bedrooms" name="bedrooms" type="number" className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="0" />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="bathrooms">Banheiros</label>
              <input id="bathrooms" name="bathrooms" type="number" className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="parking_spots">Vagas</label>
              <input id="parking_spots" name="parking_spots" type="number" className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="0" />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="area_sqm">Área (m²)</label>
              <input id="area_sqm" name="area_sqm" type="number" step="0.1" className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="0" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 mb-2 block" htmlFor="cover_image">URL da Imagem de Capa</label>
            <input id="cover_image" name="cover_image" type="url" className="w-full bg-zinc-50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5" placeholder="https://..." />
            <p className="text-xs text-zinc-500 mt-2">Para este MVP, insira um link direto de imagem hospedada externamente.</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-black/5 mt-2">
          <button type="submit" className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-colors">
            Salvar Imóvel
          </button>
        </div>
      </form>
    </div>
  );
}
