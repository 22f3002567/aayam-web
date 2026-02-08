
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";

// // --- TYPES ---
// interface CastMember {
//   role_artist: string;
//   team_members: {
//     name: string;
//     slug: string;
//     image_url: string | null;
//     color: string | null;
//   };
// }

// export default function CastRoll({ credits }: { credits: any[] }) {
//   if (!credits || credits.length === 0) return null;

//   // LOGIC: Sort credits to put 'Director' and 'Writer' first
//   const sortedCredits = [...credits].sort((a, b) => {
//     const roleA = a.role_artist.toLowerCase();
//     const roleB = b.role_artist.toLowerCase();
    
//     // Priority Map
//     const getPriority = (r: string) => {
//         if (r.includes('director')) return 1;
//         if (r.includes('writer')) return 2;
//         if (r.includes('lead')) return 3;
//         return 99;
//     };

//     return getPriority(roleA) - getPriority(roleB);
//   });

//   return (
//     // FIX 1: Removed 'px-6 md:px-12' and 'max-w-[1400px]'
//     // It now fills the parent container 100%, ensuring perfect alignment with the Footer.
//     <section className="w-full mb-32 border-t border-white/5 pt-12">
      
//       {/* HEADER: Refined size to match 'Production' section */}
//       <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
//         <div>
//             <span className="text-gold-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 block">
//                 The Ensemble
//             </span>
//             {/* FIX 2: Reduced text size from 7xl to 4xl for hierarchy balance */}
//             <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight leading-none">
//                 Dramatis Personae
//             </h2>
//         </div>
//         <div className="text-right">
//             {/* FIX 3: Pluralization Check */}
//             <span className="text-white/30 font-serif italic text-sm md:text-base">
//                 {credits.length} {credits.length === 1 ? 'Artist' : 'Artists'} involved
//             </span>
//         </div>
//       </div>

//       {/* THE GRID: Cinematic Vertical Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12">
//         {sortedCredits.map((credit: CastMember, i: number) => {
//           const person = credit.team_members;
//           if (!person) return null;

//           // Default Soul Color if missing
//           const RASA = person.color || "#eab308";

//           return (
//             <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: i * 0.05 }}
//             >
//                 <Link href={`/artist/${person.slug}`} className="group block relative">
                    
//                     {/* 1. THE PORTRAIT (2:3 Aspect Ratio) */}
//                     <div className="relative aspect-[2/3] overflow-hidden bg-[#0a0a0a] mb-4 border border-white/5 group-hover:border-gold-500/30 transition-colors duration-500">
//                         {person.image_url ? (
//                             <Image 
//                                 src={person.image_url} 
//                                 alt={person.name} 
//                                 fill 
//                                 className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
//                                 sizes="(max-width: 768px) 50vw, 20vw"
//                             />
//                         ) : (
//                             // Fallback: Typography Avatar
//                             <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
//                                 <span className="text-6xl font-serif text-white/5 select-none">{person.name.charAt(0)}</span>
//                                 <div className="absolute inset-0 opacity-10" style={{ backgroundColor: RASA }} />
//                             </div>
//                         )}
                        
//                         {/* The Soul Glow (Hover) */}
//                         <div 
//                             className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-color"
//                             style={{ backgroundColor: RASA }}
//                         />

//                         {/* The "View Profile" Overlay */}
//                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                              <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full">
//                                 <span className="text-[8px] uppercase tracking-widest text-white">View Profile</span>
//                              </div>
//                         </div>
//                     </div>

//                     {/* 2. THE CREDITS BLOCK */}
//                     <div className="flex flex-col gap-1 pl-2 border-l border-transparent group-hover:border-gold-500 transition-all duration-300">
//                         {/* Role First (The Job) */}
//                         <span className="text-[9px] uppercase tracking-[0.2em] text-gold-500 font-medium">
//                             {credit.role_artist}
//                         </span>
                        
//                         {/* Name Second (The Actor) */}
//                         <span className="text-base md:text-lg font-serif text-white/80 group-hover:text-white transition-colors leading-none">
//                             {person.name}
//                         </span>
//                     </div>

//                 </Link>
//             </motion.div>
//           );
//         })}
//       </div>

//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- TYPES ---
interface CastMember {
  role_artist: string;
  team_members: {
    name: string;
    slug: string;
    image_url: string | null;
    color: string | null;
  };
}

// Icon for the interaction
const ArrowUpRight = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

export default function CastRoll({ credits }: { credits: any[] }) {
  if (!credits || credits.length === 0) return null;

  // LOGIC: Sort credits
  const sortedCredits = [...credits].sort((a, b) => {
    const roleA = a.role_artist.toLowerCase();
    const roleB = b.role_artist.toLowerCase();
    const getPriority = (r: string) => {
        if (r.includes('director')) return 1;
        if (r.includes('writer')) return 2;
        if (r.includes('lead')) return 3;
        return 99;
    };
    return getPriority(roleA) - getPriority(roleB);
  });

  return (
    <section className="w-full mb-32 border-t border-white/5 pt-12">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
            <span className="text-gold-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 block">
                The Ensemble
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight leading-none">
                Dramatis Personae
            </h2>
        </div>
        <div className="text-right">
            <span className="text-white/30 font-serif italic text-sm md:text-base">
                {credits.length} {credits.length === 1 ? 'Artist' : 'Artists'} involved
            </span>
        </div>
      </div>

      {/* THE GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12">
        {sortedCredits.map((credit: CastMember, i: number) => {
          const person = credit.team_members;
          if (!person) return null;

          const RASA = person.color || "#eab308";

          return (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
            >
                <Link href={`/artist/${person.slug}`} className="group block relative cursor-pointer">
                    
                    {/* 1. THE PORTRAIT CARD */}
                    <div className="relative aspect-[2/3] overflow-hidden bg-[#0a0a0a] mb-4 border border-white/5 group-hover:border-gold-500/50 transition-colors duration-500">
                        
                        {/* IMAGE */}
                        {person.image_url ? (
                            <Image 
                                src={person.image_url} 
                                alt={person.name} 
                                fill 
                                className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                        ) : (
                            // TYPOGRAPHY FALLBACK (Clean)
                            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                                <span className="text-6xl font-serif text-white/10 select-none group-hover:text-white/20 transition-colors">{person.name.charAt(0)}</span>
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: RASA }} />
                            </div>
                        )}
                        
                        {/* HOVER EFFECT 1: The Soul Glint (Gradient from bottom) */}
                        <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                            style={{ background: `linear-gradient(to top, ${RASA} 0%, transparent 50%)`, mixBlendMode: 'overlay' }}
                        />

                        {/* HOVER EFFECT 2: The North Star Arrow (Top Right) */}
                        <div className="absolute top-3 right-3 text-white opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                            <div className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                                <ArrowUpRight />
                            </div>
                        </div>

                    </div>

                    {/* 2. THE TEXT BLOCK */}
                    <div className="flex flex-col gap-1 pl-2 border-l border-transparent group-hover:border-gold-500 transition-all duration-300">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-gold-500 font-medium">
                            {credit.role_artist}
                        </span>
                        <span className="text-base md:text-lg font-serif text-white/80 group-hover:text-white transition-colors leading-none">
                            {person.name}
                        </span>
                    </div>

                </Link>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}