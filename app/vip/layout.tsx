import React from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function VIPLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-zinc-50 text-black flex flex-col">
      <header className="bg-white border-b border-black/5 px-6 h-20 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-black">AURA <span className="text-xs font-semibold bg-black text-white px-2 py-0.5 rounded-full uppercase tracking-widest ml-1 relative -top-1">VIP</span></Link>
        
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-zinc-600 hidden md:inline-block">{user?.email}</span>
          <form action={logout}>
            <button type="submit" className="text-sm font-medium hover:text-black text-zinc-500 transition-colors">Sair</button>
          </form>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
