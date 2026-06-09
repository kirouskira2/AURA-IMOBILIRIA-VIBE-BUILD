import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Building, Users, Eye, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: propsCount } = await supabase.from("properties").select("*", { count: 'exact', head: true });
  const { count: leadsCount } = await supabase.from("leads").select("*", { count: 'exact', head: true });

  const stats = [
    { name: "Total de Imóveis", value: propsCount || 0, icon: <Building className="w-5 h-5 text-indigo-500" /> },
    { name: "Leads Capturados", value: leadsCount || 0, icon: <Users className="w-5 h-5 text-emerald-500" /> },
    { name: "Visualizações", value: "2.4K", icon: <Eye className="w-5 h-5 text-blue-500" /> },
    { name: "Conversão", value: "3.2%", icon: <TrendingUp className="w-5 h-5 text-amber-500" /> },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Visão Geral</h1>
        <p className="text-zinc-500">Acompanhe as métricas e o desempenho da plataforma.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-zinc-500">{stat.name}</h3>
              <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
