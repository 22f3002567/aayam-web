import ClientWrapper from "@/components/layout/ClientWrapper";
import PrismMenu from "@/components/layout/PrismMenu";
import RasaAtmosphere from "@/components/originals/RasaAtmosphere"; 
import ArchiveFeed from "@/components/originals/ArchiveFeed";
import { ArchiveProvider } from "@/components/originals/ArchiveContext";
import { getPlays } from "@/lib/api";
import { PlayCategory } from "@/types/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Originals | Aayam Archive",
  description: "The complete collection of productions by Aayam Drama Society.",
};

// Next.js 15: props.searchParams is a Promise
export default async function OriginalsArchive({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
  // 1. EXTRACT CATEGORY FROM URL (Default to 'all')
  const categoryRaw = params.category;
  const category: PlayCategory | 'all' = 
    (typeof categoryRaw === 'string' && ['stage','street','film','short','workshop'].includes(categoryRaw))
    ? (categoryRaw as PlayCategory) 
    : 'all';

  // 2. SERVER FETCH (Pre-load the correct data for SEO) (Fetch with 'all' or specific category)
  const initialPlays = await getPlays(1, 12, category);

  return (
    <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
      <ArchiveProvider>
        <ClientWrapper>
            
            <RasaAtmosphere />

            {/* <div className="relative z-10 pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto"> */}
            <div className="relative z-10 pt-32 pb-32 px-4 md:px-8 max-w-[1600px] mx-auto">
                {/* We pass the initial data AND the initial category.
                   The Feed component handles the Header and Tabs internally 
                   to ensure they sync with the state.
                */}
                <ArchiveFeed 
                    initialPlays={initialPlays} 
                    initialCategory={category} 
                />
            </div>

            <PrismMenu />
            
        </ClientWrapper>
      </ArchiveProvider>
    </main>
  );
}

// import ClientWrapper from "@/components/layout/ClientWrapper";
// import PrismMenu from "@/components/layout/PrismMenu";
// import PlayCard from "@/components/originals/PlayCard";
// import RasaAtmosphere from "@/components/originals/RasaAtmosphere"; 
// import { ArchiveProvider } from "@/components/originals/ArchiveContext";
// import { getAllPlays } from "@/lib/api";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Originals | Aayam Archive",
//   description: "The complete collection of productions by Aayam Drama Society.",
// };

// export default async function OriginalsArchive() {
//   const plays = await getAllPlays();

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
      
//       <ArchiveProvider>
//         <ClientWrapper>
            
//             <RasaAtmosphere />

//             <div className="relative z-10 pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
                
//                 {/* HEADER */}
//                 <div className="flex flex-col gap-8 mb-20 border-b border-white/5 pb-16">
//                     <span className="text-gold-500 font-mono text-[10px] uppercase tracking-[0.4em]">
//                     The Fourth Wall
//                     </span>
//                     <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter">
//                     Original Works
//                     </h1>
//                     <p className="text-neutral-500 max-w-xl text-sm md:text-base leading-relaxed">
//                         The Archive of emotions. Hover over a memory to reveal its <span className="text-white/60 italic">Soul</span>.
//                     </p>
//                 </div>

//                 {/* THE STAGGERED GALLERY */}
//                 {plays.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
//                         {plays.map((play, index) => {
//                             // LOGIC: Shift the middle column down to create a "Waterfall" look
//                             // In a 3-col grid, the index % 3 === 1 is the middle column
//                             // On mobile (1 col), we ignore this.
//                             const isMiddleColumn = index % 3 === 1;
                            
//                             return (
//                                 <div 
//                                     key={play.id} 
//                                     className={`${isMiddleColumn ? 'lg:translate-y-24' : ''} transition-transform duration-700`}
//                                 >
//                                     <PlayCard play={play} index={index} />
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 ) : (
//                     <div className="w-full py-40 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-sm">
//                         <span className="text-neutral-700 font-mono text-xs uppercase tracking-widest">
//                             The Void is Empty
//                         </span>
//                     </div>
//                 )}

//             </div>

//             <PrismMenu />
            
//         </ClientWrapper>
//       </ArchiveProvider>

//     </main>
//   );
// }

// import ClientWrapper from "@/components/layout/ClientWrapper";
// import PrismMenu from "@/components/layout/PrismMenu";
// import PlayCard from "@/components/originals/PlayCard";
// import RasaAtmosphere from "@/components/originals/RasaAtmosphere"; 
// import { ArchiveProvider } from "@/components/originals/ArchiveContext";
// import { getAllPlays } from "@/lib/api";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Originals | Aayam Archive",
//   description: "The complete collection of productions by Aayam Drama Society.",
// };

// export default async function OriginalsArchive() {
//   const plays = await getAllPlays();

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
      
//       <ArchiveProvider>
//         <ClientWrapper>
            
//             {/* 1. THE REACTIVE ATMOSPHERE */}
//             <RasaAtmosphere />

//             <div className="relative z-10 pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
                
//                 {/* 2. THE INTRODUCTION */}
//                 <div className="flex flex-col gap-8 mb-32 border-b border-white/5 pb-16">
//                     <span className="text-gold-500 font-mono text-[10px] uppercase tracking-[0.4em]">
//                     The Fourth Wall
//                     </span>
//                     <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter">
//                     Original Works
//                     </h1>
//                     <p className="text-neutral-500 max-w-xl text-sm md:text-base leading-relaxed">
//                         The Archive of emotions. Hover over a memory to reveal its <span className="text-white/60 italic">Soul</span>.
//                     </p>
//                 </div>

//                 {/* 3. THE GALLERY */}
//                 {plays.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
//                         {plays.map((play, index) => (
//                             <PlayCard key={play.id} play={play} index={index} />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="w-full py-40 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-sm">
//                         <span className="text-neutral-700 font-mono text-xs uppercase tracking-widest">
//                             The Void is Empty
//                         </span>
//                     </div>
//                 )}

//             </div>

//             <PrismMenu />
            
//         </ClientWrapper>
//       </ArchiveProvider>

//     </main>
//   );
// }
