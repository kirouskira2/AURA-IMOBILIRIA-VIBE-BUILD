import React from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/actions/auth";
import { Home, Building, Users, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 text-white flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href="/" className="text-2xl font-bold tracking-tighter">AURA <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded-full uppercase tracking-widest ml-1 relative -top-1">Admin</span></Link>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium text-zinc-300 hover:text-white">
            <Home className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium text-zinc-300 hover:text-white">
            <Building className="w-4 h-4" /> Imóveis
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium text-zinc-300 hover:text-white">
            <Users className="w-4 h-4" /> Leads
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="mb-4 px-2">
            <p className="text-xs text-zinc-500 font-medium truncate">{user?.email}</p>
          </div>
          <form action={logout}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium text-red-400 w-full text-left">
              <LogOut className="w-4 h-4" /> Sair do Painel
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-black/5 flex items-center px-8 shrink-0">
          <h2 className="font-semibold text-lg">Painel Administrativo</h2>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
