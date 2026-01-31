// // // // // // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // // // // // import PrismMenu from "@/components/layout/PrismMenu";
// // // // // // // import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; // NEW COMPONENT
// // // // // // // import { EnsembleMember } from "@/types/schema";
// // // // // // // import type { Metadata } from "next";

// // // // // // // export const metadata: Metadata = {
// // // // // // //   title: "The Ensemble | Aayam",
// // // // // // //   description: "The thread that binds the vision.",
// // // // // // // };

// // // // // // // // --- MOCK DATA FOR "THE NARRATIVE THREAD" ---
// // // // // // // const CAST_LIST: EnsembleMember[] = [
// // // // // // //   {
// // // // // // //     id: '1',
// // // // // // //     name: 'Siddharth',
// // // // // // //     role: 'Secretary',
// // // // // // //     rank: 'CROWN',
// // // // // // //     department: 'direction',
// // // // // // //     image_url: '/sid.jpg', // Replace with null to test fallback
// // // // // // //     bio: 'The mind behind the Fourth Wall.',
// // // // // // //     slug: 'sid',
// // // // // // //     year: '2025-26',
// // // // // // //     social_links: null,
// // // // // // //     audio_url: '/audio/sid_intro.mp3' // Example audio path
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: '2',
// // // // // // //     name: 'Aditi',
// // // // // // //     role: 'Creative Head',
// // // // // // //     rank: 'ORBIT',
// // // // // // //     department: 'design',
// // // // // // //     image_url: null,
// // // // // // //     bio: 'Painting silence with noise.',
// // // // // // //     slug: 'aditi',
// // // // // // //     year: '2025-26',
// // // // // // //     social_links: null
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: '3',
// // // // // // //     name: 'Vikram',
// // // // // // //     role: 'Tech Lead',
// // // // // // //     rank: 'ORBIT',
// // // // // // //     department: 'tech',
// // // // // // //     image_url: null,
// // // // // // //     bio: 'Building castles in the cloud.',
// // // // // // //     slug: 'vikram',
// // // // // // //     year: '2025-26',
// // // // // // //     social_links: null
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: '4',
// // // // // // //     name: 'Rohan',
// // // // // // //     role: 'Core Member',
// // // // // // //     rank: 'CLOUD',
// // // // // // //     department: 'acting',
// // // // // // //     image_url: null,
// // // // // // //     bio: 'Energy is the only currency.',
// // // // // // //     slug: 'rohan',
// // // // // // //     year: '2025-26',
// // // // // // //     social_links: null
// // // // // // //   },
// // // // // // // ];

// // // // // // // export default function EnsemblePage() {
// // // // // // //   return (
// // // // // // //     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// // // // // // //       <ClientWrapper>
        
// // // // // // //         {/* ACT 5: THE NARRATIVE THREAD */}
// // // // // // //         <TheNarrativeThread members={CAST_LIST} currentYear="2026" />

// // // // // // //         {/* NAVIGATION */}
// // // // // // //         <PrismMenu />
        
// // // // // // //       </ClientWrapper>
// // // // // // //     </main>
// // // // // // //   );
// // // // // // // }

// // // // // // // // // // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // // // // // // // // // import PrismMenu from "@/components/layout/PrismMenu";
// // // // // // // // // // // import TheSynapse from "@/components/ensemble/TheSynapse"; // Updated Component
// // // // // // // // // // // import { EnsembleMember } from "@/types/schema";
// // // // // // // // // // // import type { Metadata } from "next";

// // // // // // // // // // // export const metadata: Metadata = {
// // // // // // // // // // //   title: "The Synapse | Aayam",
// // // // // // // // // // //   description: "The neural network of art.",
// // // // // // // // // // // };

// // // // // // // // // // // const CAST_LIST: EnsembleMember[] = [
// // // // // // // // // // //   {
// // // // // // // // // // //     id: '1',
// // // // // // // // // // //     name: 'Siddharth',
// // // // // // // // // // //     role: 'Secretary',
// // // // // // // // // // //     rank: 'CROWN',
// // // // // // // // // // //     department: 'direction',
// // // // // // // // // // //     image_url: null,
// // // // // // // // // // //     bio: 'The mind behind the Fourth Wall.',
// // // // // // // // // // //     slug: 'sid',
// // // // // // // // // // //     year: '2025-26',
// // // // // // // // // // //     social_links: null,
// // // // // // // // // // //     audio_url: null
// // // // // // // // // // //   },
// // // // // // // // // // //   {
// // // // // // // // // // //     id: '2',
// // // // // // // // // // //     name: 'Aditi',
// // // // // // // // // // //     role: 'Creative Head',
// // // // // // // // // // //     rank: 'ORBIT',
// // // // // // // // // // //     department: 'design',
// // // // // // // // // // //     image_url: null,
// // // // // // // // // // //     bio: 'Painting silence with noise.',
// // // // // // // // // // //     slug: 'aditi',
// // // // // // // // // // //     year: '2025-26',
// // // // // // // // // // //     social_links: null,
// // // // // // // // // // //     audio_url: null
// // // // // // // // // // //   },
// // // // // // // // // // //   {
// // // // // // // // // // //     id: '3',
// // // // // // // // // // //     name: 'Vikram',
// // // // // // // // // // //     role: 'Tech Lead',
// // // // // // // // // // //     rank: 'ORBIT',
// // // // // // // // // // //     department: 'tech',
// // // // // // // // // // //     image_url: null,
// // // // // // // // // // //     bio: 'Building castles in the cloud.',
// // // // // // // // // // //     slug: 'vikram',
// // // // // // // // // // //     year: '2025-26',
// // // // // // // // // // //     social_links: null,
// // // // // // // // // // //     audio_url: null
// // // // // // // // // // //   },
// // // // // // // // // // //   {
// // // // // // // // // // //     id: '4',
// // // // // // // // // // //     name: 'Rohan',
// // // // // // // // // // //     role: 'Core Member',
// // // // // // // // // // //     rank: 'CLOUD',
// // // // // // // // // // //     department: 'acting',
// // // // // // // // // // //     image_url: null,
// // // // // // // // // // //     bio: 'Energy is the only currency.',
// // // // // // // // // // //     slug: 'rohan',
// // // // // // // // // // //     year: '2025-26',
// // // // // // // // // // //     social_links: null,
// // // // // // // // // // //     audio_url: null
// // // // // // // // // // //   },
// // // // // // // // // // // ];

// // // // // // // // // // // export default function EnsemblePage() {
// // // // // // // // // // //   return (
// // // // // // // // // // //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// // // // // // // // // // //       <ClientWrapper>
// // // // // // // // // // //         <TheSynapse members={CAST_LIST} currentYear="2026" />
// // // // // // // // // // //         <PrismMenu />
// // // // // // // // // // //       </ClientWrapper>
// // // // // // // // // // //     </main>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // // // // // // // // import PrismMenu from "@/components/layout/PrismMenu";
// // // // // // // // // // import TheSerpentine from "@/components/ensemble/TheSerpentine"; // Updated
// // // // // // // // // // import { EnsembleMember } from "@/types/schema";
// // // // // // // // // // import type { Metadata } from "next";

// // // // // // // // // // export const metadata: Metadata = {
// // // // // // // // // //   title: "The Nerve | Aayam",
// // // // // // // // // //   description: "The connection is the lifeblood.",
// // // // // // // // // // };

// // // // // // // // // // const CAST_LIST: EnsembleMember[] = [
// // // // // // // // // //   {
// // // // // // // // // //     id: '1',
// // // // // // // // // //     name: 'Siddharth',
// // // // // // // // // //     role: 'Secretary',
// // // // // // // // // //     rank: 'CROWN',
// // // // // // // // // //     department: 'direction',
// // // // // // // // // //     image_url: null,
// // // // // // // // // //     bio: 'The mind behind the Fourth Wall.',
// // // // // // // // // //     slug: 'sid',
// // // // // // // // // //     year: '2025-26',
// // // // // // // // // //     social_links: null,
// // // // // // // // // //     audio_url: null
// // // // // // // // // //   },
// // // // // // // // // //   {
// // // // // // // // // //     id: '2',
// // // // // // // // // //     name: 'Aditi',
// // // // // // // // // //     role: 'Creative Head',
// // // // // // // // // //     rank: 'ORBIT',
// // // // // // // // // //     department: 'design',
// // // // // // // // // //     image_url: null,
// // // // // // // // // //     bio: 'Painting silence with noise.',
// // // // // // // // // //     slug: 'aditi',
// // // // // // // // // //     year: '2025-26',
// // // // // // // // // //     social_links: null,
// // // // // // // // // //     audio_url: null
// // // // // // // // // //   },
// // // // // // // // // //   {
// // // // // // // // // //     id: '3',
// // // // // // // // // //     name: 'Vikram',
// // // // // // // // // //     role: 'Tech Lead',
// // // // // // // // // //     rank: 'ORBIT',
// // // // // // // // // //     department: 'tech',
// // // // // // // // // //     image_url: null,
// // // // // // // // // //     bio: 'Building castles in the cloud.',
// // // // // // // // // //     slug: 'vikram',
// // // // // // // // // //     year: '2025-26',
// // // // // // // // // //     social_links: null,
// // // // // // // // // //     audio_url: null
// // // // // // // // // //   },
// // // // // // // // // //   {
// // // // // // // // // //     id: '4',
// // // // // // // // // //     name: 'Rohan',
// // // // // // // // // //     role: 'Core Member',
// // // // // // // // // //     rank: 'CLOUD',
// // // // // // // // // //     department: 'acting',
// // // // // // // // // //     image_url: null,
// // // // // // // // // //     bio: 'Energy is the only currency.',
// // // // // // // // // //     slug: 'rohan',
// // // // // // // // // //     year: '2025-26',
// // // // // // // // // //     social_links: null,
// // // // // // // // // //     audio_url: null
// // // // // // // // // //   },
// // // // // // // // // // ];

// // // // // // // // // // export default function EnsemblePage() {
// // // // // // // // // //   return (
// // // // // // // // // //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// // // // // // // // // //       <ClientWrapper>
// // // // // // // // // //         <TheSerpentine members={CAST_LIST} currentYear="2026" />
// // // // // // // // // //         <PrismMenu />
// // // // // // // // // //       </ClientWrapper>
// // // // // // // // // //     </main>
// // // // // // // // // //   );
// // // // // // // // // // }


// // // // // // // // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // // // // // // // import PrismMenu from "@/components/layout/PrismMenu";
// // // // // // // // // import TheNeuralPath from "@/components/ensemble/TheNeuralPath"; // Updated
// // // // // // // // // import { EnsembleMember } from "@/types/schema";
// // // // // // // // // import type { Metadata } from "next";

// // // // // // // // // export const metadata: Metadata = {
// // // // // // // // //   title: "The Connection | Aayam",
// // // // // // // // //   description: "The thread that binds us.",
// // // // // // // // // };

// // // // // // // // // const CAST_LIST: EnsembleMember[] = [
// // // // // // // // //   {
// // // // // // // // //     id: '1',
// // // // // // // // //     name: 'Siddharth',
// // // // // // // // //     role: 'Secretary',
// // // // // // // // //     rank: 'CROWN',
// // // // // // // // //     department: 'direction',
// // // // // // // // //     image_url: null,
// // // // // // // // //     bio: 'The mind behind the Fourth Wall.',
// // // // // // // // //     slug: 'sid',
// // // // // // // // //     year: '2025-26',
// // // // // // // // //     social_links: null,
// // // // // // // // //     audio_url: null
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: '2',
// // // // // // // // //     name: 'Aditi',
// // // // // // // // //     role: 'Creative Head',
// // // // // // // // //     rank: 'ORBIT',
// // // // // // // // //     department: 'design',
// // // // // // // // //     image_url: null,
// // // // // // // // //     bio: 'Painting silence with noise.',
// // // // // // // // //     slug: 'aditi',
// // // // // // // // //     year: '2025-26',
// // // // // // // // //     social_links: null,
// // // // // // // // //     audio_url: null
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: '3',
// // // // // // // // //     name: 'Vikram',
// // // // // // // // //     role: 'Tech Lead',
// // // // // // // // //     rank: 'ORBIT',
// // // // // // // // //     department: 'tech',
// // // // // // // // //     image_url: null,
// // // // // // // // //     bio: 'Building castles in the cloud.',
// // // // // // // // //     slug: 'vikram',
// // // // // // // // //     year: '2025-26',
// // // // // // // // //     social_links: null,
// // // // // // // // //     audio_url: null
// // // // // // // // //   },
// // // // // // // // //   {
// // // // // // // // //     id: '4',
// // // // // // // // //     name: 'Rohan',
// // // // // // // // //     role: 'Core Member',
// // // // // // // // //     rank: 'CLOUD',
// // // // // // // // //     department: 'acting',
// // // // // // // // //     image_url: null,
// // // // // // // // //     bio: 'Energy is the only currency.',
// // // // // // // // //     slug: 'rohan',
// // // // // // // // //     year: '2025-26',
// // // // // // // // //     social_links: null,
// // // // // // // // //     audio_url: null
// // // // // // // // //   },
// // // // // // // // // ];

// // // // // // // // // export default function EnsemblePage() {
// // // // // // // // //   return (
// // // // // // // // //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// // // // // // // // //       <ClientWrapper>
// // // // // // // // //         {/* ACT 5: THE NEURAL PATH */}
// // // // // // // // //         <TheNeuralPath members={CAST_LIST} currentYear="2026" />
// // // // // // // // //         <PrismMenu />
// // // // // // // // //       </ClientWrapper>
// // // // // // // // //     </main>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // // // // // // import PrismMenu from "@/components/layout/PrismMenu";
// // // // // // // // // CORRECT IMPORT: No curly braces!
// // // // // // // // import TheSynapticStream from "@/components/ensemble/TheSynapticStream"; 
// // // // // // // // import { EnsembleMember } from "@/types/schema";
// // // // // // // // import type { Metadata } from "next";

// // // // // // // // export const metadata: Metadata = {
// // // // // // // //   title: "The Lineage | Aayam",
// // // // // // // //   description: "The neural network of art.",
// // // // // // // // };

// // // // // // // // // --- MOCK DATA FOR PREVIEW ---
// // // // // // // // const CAST_LIST: EnsembleMember[] = [
// // // // // // // //   {
// // // // // // // //     id: '1',
// // // // // // // //     name: 'Siddharth',
// // // // // // // //     role: 'Secretary',
// // // // // // // //     rank: 'CROWN',
// // // // // // // //     department: 'direction',
// // // // // // // //     image_url: null, 
// // // // // // // //     bio: 'The mind behind the Fourth Wall.',
// // // // // // // //     slug: 'sid',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: '2',
// // // // // // // //     name: 'Aditi',
// // // // // // // //     role: 'Creative Head',
// // // // // // // //     rank: 'ORBIT',
// // // // // // // //     department: 'design',
// // // // // // // //     image_url: null,
// // // // // // // //     bio: 'Painting silence with noise.',
// // // // // // // //     slug: 'aditi',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: '3',
// // // // // // // //     name: 'Vikram',
// // // // // // // //     role: 'Tech Lead',
// // // // // // // //     rank: 'ORBIT',
// // // // // // // //     department: 'tech',
// // // // // // // //     image_url: null,
// // // // // // // //     bio: 'Building castles in the cloud.',
// // // // // // // //     slug: 'vikram',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: '4',
// // // // // // // //     name: 'Rohan',
// // // // // // // //     role: 'Core Member',
// // // // // // // //     rank: 'CLOUD',
// // // // // // // //     department: 'acting',
// // // // // // // //     image_url: null,
// // // // // // // //     bio: 'Energy is the only currency.',
// // // // // // // //     slug: 'rohan',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   },
// // // // // // // // ];

// // // // // // // // export default function EnsemblePage() {
// // // // // // // //   return (
// // // // // // // //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// // // // // // // //       <ClientWrapper>
// // // // // // // //         {/* ACT 5: THE SYNAPTIC STREAM */}
// // // // // // // //         <TheSynapticStream members={CAST_LIST} currentYear="2026" />
        
// // // // // // // //         <PrismMenu />
// // // // // // // //       </ClientWrapper>
// // // // // // // //     </main>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // // // // // // import PrismMenu from "@/components/layout/PrismMenu";
// // // // // // // // import TheEchoChamber from "@/components/ensemble/TheEchoChamber"; 
// // // // // // // // import { EnsembleMember } from "@/types/schema";
// // // // // // // // import type { Metadata } from "next";

// // // // // // // // export const metadata: Metadata = {
// // // // // // // //   title: "The Constellation | Aayam",
// // // // // // // //   description: "The faces behind the art.",
// // // // // // // // };

// // // // // // // // const CAST_LIST: EnsembleMember[] = [
// // // // // // // //   {
// // // // // // // //     id: '1',
// // // // // // // //     name: 'Siddharth',
// // // // // // // //     role: 'Secretary',
// // // // // // // //     rank: 'CROWN',
// // // // // // // //     department: 'direction',
// // // // // // // //     image_url: null,
// // // // // // // //     bio: 'The mind behind the Fourth Wall.',
// // // // // // // //     slug: 'sid',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: '2',
// // // // // // // //     name: 'Aditi',
// // // // // // // //     role: 'Creative Head',
// // // // // // // //     rank: 'ORBIT',
// // // // // // // //     department: 'design',
// // // // // // // //     image_url: null,
// // // // // // // //     bio: 'Painting silence with noise.',
// // // // // // // //     slug: 'aditi',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: '3',
// // // // // // // //     name: 'Vikram',
// // // // // // // //     role: 'Tech Lead',
// // // // // // // //     rank: 'ORBIT',
// // // // // // // //     department: 'tech',
// // // // // // // //     image_url: null,
// // // // // // // //     bio: 'Building castles in the cloud.',
// // // // // // // //     slug: 'vikram',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: '4',
// // // // // // // //     name: 'Rohan',
// // // // // // // //     role: 'Core Member',
// // // // // // // //     rank: 'CLOUD',
// // // // // // // //     department: 'acting',
// // // // // // // //     image_url: null,
// // // // // // // //     bio: 'Energy is the only currency.',
// // // // // // // //     slug: 'rohan',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: '5',
// // // // // // // //     name: 'Ananya',
// // // // // // // //     role: 'Prod Head',
// // // // // // // //     rank: 'ORBIT',
// // // // // // // //     department: 'production',
// // // // // // // //     image_url: null,
// // // // // // // //     bio: 'Chaos needs a container.',
// // // // // // // //     slug: 'ananya',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: '6',
// // // // // // // //     name: 'Kabir',
// // // // // // // //     role: 'Writer',
// // // // // // // //     rank: 'CLOUD',
// // // // // // // //     department: 'scripting',
// // // // // // // //     image_url: null,
// // // // // // // //     bio: 'The ink never dries.',
// // // // // // // //     slug: 'kabir',
// // // // // // // //     year: '2025-26',
// // // // // // // //     social_links: null,
// // // // // // // //     audio_url: null
// // // // // // // //   }
// // // // // // // // ];

// // // // // // // // export default function EnsemblePage() {
// // // // // // // //   return (
// // // // // // // //     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0]">
// // // // // // // //       <ClientWrapper>
        
// // // // // // // //         {/* THE STAGE */}
// // // // // // // //         <TheEchoChamber members={CAST_LIST} />
        
// // // // // // // //         {/* NAVIGATION */}
// // // // // // // //         <PrismMenu />
        
// // // // // // // //       </ClientWrapper>
// // // // // // // //     </main>
// // // // // // // //   );
// // // // // // // // }

// // // // // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // // // // import PrismMenu from "@/components/layout/PrismMenu";
// // // // // // // The new component
// // // // // // import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; 
// // // // // // import { EnsembleMember } from "@/types/schema";
// // // // // // import type { Metadata } from "next";

// // // // // // export const metadata: Metadata = {
// // // // // //   title: "The Thread | Aayam",
// // // // // //   description: "The neural network of art.",
// // // // // // };

// // // // // // const CAST_LIST: EnsembleMember[] = [
// // // // // //   {
// // // // // //     id: '1',
// // // // // //     name: 'Siddharth Sahu',
// // // // // //     role: 'Secretary',
// // // // // //     rank: 'CROWN',
// // // // // //     department: 'direction',
// // // // // //     image_url: null,
// // // // // //     bio: 'The mind behind the Fourth Wall.',
// // // // // //     slug: 'sid',
// // // // // //     year: '2025-26',
// // // // // //     social_links: null,
// // // // // //     audio_url: null
// // // // // //   },
// // // // // //   {
// // // // // //     id: '2',
// // // // // //     name: 'Vaishanvi Srivastav',
// // // // // //     role: 'Deputie Secretary',
// // // // // //     rank: 'ORBIT',
// // // // // //     department: 'design',
// // // // // //     image_url: null,
// // // // // //     bio: 'Painting silence with noise.',
// // // // // //     slug: 'aditi',
// // // // // //     year: '2025-26',
// // // // // //     social_links: null,
// // // // // //     audio_url: null
// // // // // //   },
// // // // // //   {
// // // // // //     id: '3',
// // // // // //     name: 'Harsh Aryan',
// // // // // //     role: 'PR',
// // // // // //     rank: 'ORBIT',
// // // // // //     department: 'tech',
// // // // // //     image_url: null,
// // // // // //     bio: 'Building castles in the cloud.',
// // // // // //     slug: 'vikram',
// // // // // //     year: '2025-26',
// // // // // //     social_links: null,
// // // // // //     audio_url: null
// // // // // //   },
// // // // // //   {
// // // // // //     id: '4',
// // // // // //     name: 'Chirag',
// // // // // //     role: 'Core Member',
// // // // // //     rank: 'CLOUD',
// // // // // //     department: 'acting',
// // // // // //     image_url: null,
// // // // // //     bio: 'Energy is the only currency.',
// // // // // //     slug: 'rohan',
// // // // // //     year: '2025-26',
// // // // // //     social_links: null,
// // // // // //     audio_url: null
// // // // // //   },
// // // // // // ];

// // // // // // export default function EnsemblePage() {
// // // // // //   return (
// // // // // //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// // // // // //       <ClientWrapper>
// // // // // //         <TheNarrativeThread members={CAST_LIST} currentYear="2026" />
// // // // // //         <PrismMenu />
// // // // // //       </ClientWrapper>
// // // // // //     </main>
// // // // // //   );
// // // // // // }

// // // // // import { createClient } from "@/lib/supabase/server";
// // // // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // // // import PrismMenu from "@/components/layout/PrismMenu";
// // // // // import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; 
// // // // // import { EnsembleMember } from "@/types/schema";
// // // // // import type { Metadata } from "next";
// // // // // import { getEnsemble } from "@/lib/api";

// // // // // export const metadata: Metadata = {
// // // // //   title: "The Lineage | Aayam",
// // // // //   description: "The neural network of art.",
// // // // // };

// // // // // export const revalidate = 60; 

// // // // // export default async function EnsemblePage() {
// // // // //   const castList = await getEnsemble('2025-26');

// // // // //   // 1. FETCH
// // // // //   const { data: tenures, error } = await supabase
// // // // //     .from('tenures')
// // // // //     .select(`
// // // // //       *,
// // // // //       member:team_members (
// // // // //         id, name, slug, bio, image_url, voice_note_url, color
// // // // //       )
// // // // //     `)
// // // // //     .eq('year', '2025-26')
// // // // //     .order('sort_order', { ascending: true });

// // // // //   if (error) console.error("Ensemble Error:", error);

// // // // //   // 2. MAP (The Adapter)
// // // // //   // We bridge the gap between your Phase 0 DB names and Phase 5 Frontend names here.
// // // // //   const castList: EnsembleMember[] = (tenures || []).map((t: any) => ({
// // // // //     id: t.member.id,
// // // // //     name: t.member.name,
// // // // //     slug: t.member.slug,
// // // // //     role: t.role_student, // DB: role_student -> UI: role
// // // // //     bio: t.member.bio,
// // // // //     year: t.year,
// // // // //     rank: t.rank,         // NEW: From migration
// // // // //     sort_order: t.sort_order, // NEW: From migration
// // // // //     image_url: t.member.image_url,
// // // // //     audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
// // // // //     color: t.member.color || '#eab308'  // NEW: From migration (defaults to Gold)
// // // // //   }));

// // // // //   return (
// // // // //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// // // // //       <ClientWrapper>
// // // // //         <TheNarrativeThread members={castList} currentYear="2026" />
// // // // //         <PrismMenu />
// // // // //       </ClientWrapper>
// // // // //     </main>
// // // // //   );
// // // // // }

// // // // import { createClient } from "@/utils/supabase/server";
// // // // import { getEnsemble } from "@/lib/api";
// // // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // // import PrismMenu from "@/components/layout/PrismMenu";
// // // // import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; 
// // // // import { EnsembleMember } from "@/types/schema";
// // // // import type { Metadata } from "next";


// // // // export const metadata: Metadata = {
// // // //   title: "The Lineage | Aayam",
// // // //   description: "The neural network of art.",
// // // // };

// // // // export const revalidate = 60; 

// // // // export default async function EnsemblePage() {
// // // //   const supabase = createClient();

// // // //   // 1. FETCH
// // // //   const { data: tenures, error } = await supabase
// // // //     .from('tenures')
// // // //     .select(`
// // // //       *,
// // // //       member:team_members (
// // // //         id, name, slug, bio, image_url, voice_note_url, color
// // // //       )
// // // //     `)
// // // //     .eq('year', '2025-26')
// // // //     .order('sort_order', { ascending: true });

// // // //   if (error) console.error("Ensemble Error:", error);

// // // //   // 2. MAP (The Adapter)
// // // //   // We bridge the gap between your Phase 0 DB names and Phase 5 Frontend names here.
// // // //   // const castList: EnsembleMember[] = (tenures || []).map((t: any) => ({
// // // //   //   id: t.member.id,
// // // //   //   name: t.member.name,
// // // //   //   slug: t.member.slug,
// // // //   //   role: t.role_student, // DB: role_student -> UI: role
// // // //   //   bio: t.member.bio,
// // // //   //   year: t.year,
// // // //   //   rank: t.rank,         // NEW: From migration
// // // //   //   sort_order: t.sort_order, // NEW: From migration
// // // //   //   image_url: t.member.image_url,
// // // //   //   audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
// // // //   //   color: t.member.color || '#eab308'  // NEW: From migration (defaults to Gold)
// // // //   // }));

// // // //   export castList = await getEnsemble('2025-26');

// // // //   return (
// // // //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// // // //       <ClientWrapper>
// // // //         <TheNarrativeThread members={castList} currentYear="2026" />
// // // //         <PrismMenu />
// // // //       </ClientWrapper>
// // // //     </main>
// // // //   );
// // // // }


// // // import ClientWrapper from "@/components/layout/ClientWrapper";
// // // import PrismMenu from "@/components/layout/PrismMenu";
// // // import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; 
// // // import { getEnsemble } from "@/lib/api"; // Import the brain function
// // // import type { Metadata } from "next";

// // // export const metadata: Metadata = {
// // //   title: "The Lineage | Aayam",
// // //   description: "The neural network of art.",
// // // };

// // // // Revalidate data every 60 seconds (ISR)
// // // export const revalidate = 60; 

// // // export default async function EnsemblePage() {
  
// // //   // 1. FETCH THE DATA (Server Side)
// // //   // We use 'const' here because this variable lives only inside this render.
// // //   const castList = await getEnsemble('2025-26');

// // //   return (
// // //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// // //       <ClientWrapper>
        
// // //         {/* Pass the Real Data (with Colors & Audio) to the Masterpiece */}
// // //         <TheNarrativeThread members={castList} currentYear="2026" />

// // //         <PrismMenu />
        
// // //       </ClientWrapper>
// // //     </main>
// // //   );
// // // }

// // import { createClient } from "@/lib/supabase/server";
// // import ClientWrapper from "@/components/layout/ClientWrapper";
// // import PrismMenu from "@/components/layout/PrismMenu";
// // import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; 
// // import { EnsembleMember } from "@/types/schema";
// // import type { Metadata } from "next";

// // export const metadata: Metadata = {
// //   title: "The Lineage | Aayam",
// //   description: "The neural network of art.",
// // };

// // export const revalidate = 60; // Refresh every minute

// // export default async function EnsemblePage() {
// //   const supabase = createClient();

// //   // 1. FETCH REAL DATA
// //   const { data: tenures, error } = await supabase
// //     .from('tenures')
// //     .select(`
// //       *,
// //       member:team_members (
// //         id, name, slug, bio, image_url, voice_note_url, color, social_links
// //       )
// //     `)
// //     .eq('year', '2025-2026') // Filter by Current Year
// //     .order('sort_order', { ascending: true }); // Respect your Custom Ranking

// //   if (error) {
// //       console.error("Ensemble Error:", error);
// //   }

// //   // 2. MAP TO UI TYPE
// //   // This adapter converts Database Schema -> UI Schema
// //   const castList: EnsembleMember[] = (tenures || []).map((t: any) => ({
// //     id: t.member.id,
// //     name: t.member.name,
// //     slug: t.member.slug,
// //     role: t.role_student,      // UI 'role' = DB 'role_student'
// //     rank: t.rank,              // UI 'rank' = DB 'rank' (CROWN/ORBIT...)
// //     department: t.department,
// //     image_url: t.member.image_url,
// //     bio: t.member.bio,
// //     year: t.year,
// //     social_links: t.member.social_links,
// //     audio_url: t.member.voice_note_url // UI 'audio_url' = DB 'voice_note_url'
// //   }));

// //   return (
// //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
// //       <ClientWrapper>
// //         {/* Pass Real Data to the Component */}
// //         <TheNarrativeThread members={castList} currentYear="2026" />
// //         <PrismMenu />
// //       </ClientWrapper>
// //     </main>
// //   );
// // }

// import { createClient } from "@/lib/supabase/server"; // Import the server client creator
// import ClientWrapper from "@/components/layout/ClientWrapper";
// import PrismMenu from "@/components/layout/PrismMenu";
// import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; 
// import { EnsembleMember } from "@/types/schema";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "The Lineage | Aayam",
//   description: "The neural network of art.",
// };

// export const revalidate = 0; // Disable cache for debugging (Set to 60 later)

// export default async function EnsemblePage() {
//   // CRITICAL FIX: 'createClient' is async in Next.js 15. We MUST await it.
//   const supabase = await createClient(); 

//   // 1. FETCH REAL DATA
//   // We fetch ALL tenures sorted by Rank Priority (1 = Crown, 100 = Cloud)
//   const { data: tenures, error } = await supabase
//     .from('tenures')
//     .select(`
//       *,
//       member:team_members (
//         id, name, slug, bio, image_url, voice_note_url, color, social_links
//       )
//     `)
//     //.eq('year', '2025-2026') // <--- ENABLE THIS LATER to filter by year
//     .order('sort_order', { ascending: true });

//   if (error) {
//       console.error("Ensemble Fetch Error:", error);
//   }

//   // 2. MAP TO UI TYPE
//   // The 'member' object might be null if referential integrity was broken, so we filter those out.
//   const castList: EnsembleMember[] = (tenures || [])
//     .filter((t: any) => t.member !== null) 
//     .map((t: any) => ({
//       id: t.member.id,
//       name: t.member.name,
//       slug: t.member.slug,
//       role: t.role_student,      
//       rank: t.rank,              
//       department: t.department,
//       image_url: t.member.image_url,
//       bio: t.member.bio,
//       year: t.year,
//       social_links: t.member.social_links,
//       audio_url: t.member.voice_note_url
//     }));

//   return (
//     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
//       <ClientWrapper>
//         {/* Pass Real Data to the Component */}
//         <TheNarrativeThread members={castList} currentYear="2026" />
//         <PrismMenu />
//       </ClientWrapper>
//     </main>
//   );
// }

import { createClient } from "@/lib/supabase/server";
import { getEnsemble } from "@/lib/api";
import ClientWrapper from "@/components/layout/ClientWrapper";
import PrismMenu from "@/components/layout/PrismMenu";
import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Lineage | Aayam",
  description: "The neural network of art.",
};

export const revalidate = 0; // Dynamic for search params

// 1. ACCEPT SEARCH PARAMS (The Trigger)
export default async function EnsemblePage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const params = await searchParams;
  const currentYear = params.year || '2025-2026'; // Default to current

  // 2. FETCH DATA BASED ON URL
  const castList = await getEnsemble(currentYear);

  return (
    <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
      <ClientWrapper>
        {/* Pass data AND the active year to the component */}
        <TheNarrativeThread members={castList} currentYear={currentYear} />
        <PrismMenu />
      </ClientWrapper>
    </main>
  );
}