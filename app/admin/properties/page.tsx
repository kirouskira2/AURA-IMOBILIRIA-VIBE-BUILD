import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteProperty } from "@/app/actions/properties";

export default async function AdminPropertiesPage() {
  const supabase = await createClient();
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  const propsList = properties || [];

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Gestão de Imóveis</h1>
          <p className="text-zinc-500">Adicione, edite ou remova listagens do portfólio.</p>
        </div>
        <Link href="/admin/properties/new" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-zinc-800 transition-colors">
          <Plus className="w-4 h-4" /> Novo Imóvel
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-black/5 text-zinc-500">
            <tr>
              <th className="px-6 py-4 font-medium">Título</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Preço</th>
              <th className="px-6 py-4 font-medium">Cidade</th>
              <th className="px-6 py-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {propsList.map((prop) => (
              <tr key={prop.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 font-medium text-black">{prop.title}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${prop.status === 'publico' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {prop.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(prop.price)}
                </td>
                <td className="px-6 py-4 text-zinc-600">{prop.city}</td>
                <td className="px-6 py-4 flex justify-end gap-3">
                  <Link href={`/admin/properties/${prop.id}/edit`} className="text-zinc-400 hover:text-black transition-colors"><Edit className="w-4 h-4" /></Link>
                  <form action={deleteProperty.bind(null, prop.id)}>
                    <button type="submit" className="text-zinc-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
