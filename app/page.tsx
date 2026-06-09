import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { PropertiesShowcase } from "@/components/sections/PropertiesShowcase";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <div className="min-h-screen font-sans antialiased text-black bg-black selection:bg-black/20">
      <div id="root">
        <Navbar />

        <main className="mx-auto flex-1 overflow-hidden bg-white rounded-b-[40px] md:rounded-b-[80px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative z-20">
          <HeroSection />
          <StatsSection />
          <PropertiesShowcase />
          <ServicesSection />
          <TestimonialsSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
