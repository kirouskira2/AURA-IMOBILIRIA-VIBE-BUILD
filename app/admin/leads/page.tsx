import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Mail, CheckCircle, Clock } from "lucide-react";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leadsList = leads || [];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Leads e Contatos</h1>
        <p className="text-zinc-500">Acompanhe as inscrições na newsletter e novos interessados.</p>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-black/5 text-zinc-500">
            <tr>
              <th className="px-6 py-4 font-medium">Nome</th>
              <th className="px-6 py-4 font-medium">E-mail</th>
              <th className="px-6 py-4 font-medium">Origem</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {leadsList.map((lead) => (
              <tr key={lead.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 font-medium text-black">{lead.name}</td>
                <td className="px-6 py-4 text-zinc-600 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> {lead.email}
                </td>
                <td className="px-6 py-4">
                  <span className="capitalize text-zinc-600">{lead.source}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.status === 'novo' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {lead.status === 'novo' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    <span className="capitalize">{lead.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">
                  {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
