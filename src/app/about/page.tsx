
import type { Metadata } from "next";
import ClientWrapper from "@/components/layout/ClientWrapper";
import PrismMenu from "@/components/layout/PrismMenu";
import TheManifesto from "@/components/about/TheManifesto";

export const metadata: Metadata = {
  title: "The Manifesto | About Aayam",
  description: "We do not just act. We inhabit. Read our philosophy and open a channel.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-gold-500/30 text-white">
      <ClientWrapper>
        {/* The Open Letter & Switchboard */}
        <TheManifesto />
        
        {/* The Navigation Prism */}
        <PrismMenu />
      </ClientWrapper>
    </main>
  );
}