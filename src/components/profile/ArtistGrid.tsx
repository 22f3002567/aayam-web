

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// // FIX: Correct Import Source
// import { ArtistSummary } from "@/types/schema"; 

// const SearchIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
// const DownArrow = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>);

// const BATCH_SIZE = 24;
// const FILTERS = ["All", "Core", "Actor", "Director", "Writer", "Tech", "Alumni"];

// export default function ArtistGrid({ artists }: { artists: ArtistSummary[] }) {
//   const [query, setQuery] = useState("");
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
//   const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => { setIsClient(true) }, []);

//   // 1. FILTER LOGIC
//   const filtered = useMemo(() => {
//     return artists.filter((a: ArtistSummary) => {
//         // Search Match
//         const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase()) || 
//                              a.roles.some((r) => r.toLowerCase().includes(query.toLowerCase()));
        
//         // Filter Match
//         let matchesFilter = false;
        
//         if (activeFilter === "All") {
//             matchesFilter = true;
//         } 
//         else if (activeFilter === "Core") {
//             // Rank-Based Logic
//             matchesFilter = a.rank === 'CROWN' || a.rank === 'ORBIT';
//         } 
//         else if (activeFilter === "Alumni") {
//             matchesFilter = a.rank === 'ALUMNI';
//         } 
//         else {
//             // Role-Based Logic
//             matchesFilter = a.roles.some((r) => r.includes(activeFilter)); 
//         }

//         return matchesQuery && matchesFilter;
//     });
//   }, [artists, query, activeFilter]);

//   const isSearching = query.length > 0 || activeFilter !== "All";
//   const displayedArtists = isSearching ? filtered : filtered.slice(0, visibleCount);
//   const hasMore = !isSearching && visibleCount < filtered.length;

//   return (
//     <div className="relative min-h-screen w-full px-6 py-32 md:py-48 max-w-[1800px] mx-auto">
      
//       {/* ATMOSPHERE */}
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] bg-[url('/noise.png')] mix-blend-overlay" />
      
//       {/* HEADER */}
//       <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-24 gap-12 border-b border-white/10 pb-12">
//         <div className="relative z-10">
//             <h1 className="text-7xl md:text-[9rem] font-serif text-white tracking-tighter leading-[0.8] mb-6 mix-blend-screen">
//                 Dramatis<br/><span className="text-white/30 italic">Personae.</span>
//             </h1>
//             <p className="text-white/50 font-mono text-xs uppercase tracking-[0.3em] max-w-lg leading-relaxed mt-8">
//                 The Architects, The Voices, and The Shadows.
//                 <span className="block mt-2 text-gold-500">
//                     {filtered.length} SOULS IN THE LIGHT
//                 </span>
//             </p>
//         </div>

//         {/* CONTROL DECK */}
//         <div className="w-full xl:w-auto flex flex-col items-start xl:items-end gap-8">
//             {/* SEARCH */}
//             <div className="relative group w-full md:w-[320px]">
//                 <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
//                     <SearchIcon />
//                 </div>
//                 <input 
//                     type="text" 
//                     placeholder="FIND TALENT..." 
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     className="w-full bg-transparent border-b border-white/10 py-4 pl-10 pr-4 text-white placeholder-white/10 focus:outline-none focus:border-white transition-all font-mono text-sm uppercase tracking-widest"
//                 />
//             </div>

//             {/* FILTERS */}
//             <div className="flex flex-wrap gap-x-6 gap-y-2">
//                 {FILTERS.map((filter) => (
//                     <button
//                         key={filter}
//                         onClick={() => setActiveFilter(filter)}
//                         className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative group ${
//                             activeFilter === filter ? 'text-white font-bold' : 'text-white/30 hover:text-white'
//                         }`}
//                     >
//                         {filter}
//                         {activeFilter === filter && (
//                             <motion.div layoutId="filterDot" className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-gold-500 rounded-full" />
//                         )}
//                     </button>
//                 ))}
//             </div>
//         </div>
//       </div>

//       {/* GRID */}
//       <motion.div 
//         layout 
//         className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12 md:gap-y-24"
//         onMouseLeave={() => setHoveredArtist(null)} 
//       >
//         <AnimatePresence mode="popLayout">
//             {displayedArtists.map((artist, i) => {
                
//                 // INTELLIGENT LABELING
//                 let displayLabel = artist.primary_role;
//                 if (activeFilter !== "All" && activeFilter !== "Core" && activeFilter !== "Alumni") {
//                     const specificRole = artist.roles.find(r => r.includes(activeFilter));
//                     if (specificRole) displayLabel = specificRole;
//                 }

//                 const isDimmed = hoveredArtist !== null && hoveredArtist !== artist.id;

//                 return (
//                     <motion.div
//                         layout
//                         key={artist.id}
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: isDimmed ? 0.2 : 1, scale: isDimmed ? 0.98 : 1 }}
//                         exit={{ opacity: 0, scale: 0.95 }}
//                         transition={{ duration: 0.4 }}
//                         className="group relative"
//                         onMouseEnter={() => setHoveredArtist(artist.id)}
//                     >
//                         <Link href={`/artist/${artist.slug}`} className="block w-full h-full">
                            
//                             {/* IMAGE CARD */}
//                             <div className="relative aspect-[2/3] overflow-hidden bg-[#050505] mb-4">
//                                 {artist.image_url ? (
//                                     <Image 
//                                         src={artist.image_url} 
//                                         alt={artist.name} 
//                                         fill 
//                                         className="object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[0.6s] ease-out"
//                                         sizes="(max-width: 768px) 50vw, 15vw" 
//                                     />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] border border-white/5">
//                                         <span className="text-white/10 text-6xl font-serif opacity-50">{artist.name.charAt(0)}</span>
//                                     </div>
//                                 )}

//                                 {/* RASA GLARE */}
//                                 <div 
//                                     className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay"
//                                     style={{ background: `linear-gradient(45deg, ${artist.color} 0%, transparent 100%)` }}
//                                 />

//                                 {/* HOVER STATE */}
//                                 <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm">
//                                     <div className="flex flex-col gap-2">
//                                         <span className="text-[9px] uppercase tracking-widest text-white/40 border-b border-white/10 pb-2 mb-1">
//                                             Competencies
//                                         </span>
//                                         {artist.roles.slice(0, 4).map((role, idx) => (
//                                             <span key={idx} className="font-serif text-white text-sm leading-tight">
//                                                 {role}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* CREDITS */}
//                             <div className="relative flex flex-col items-start pl-2 border-l border-transparent group-hover:border-gold-500/50 transition-colors duration-300">
//                                 <h2 className="text-xl md:text-2xl font-serif text-white/50 group-hover:text-white transition-colors duration-300 leading-[0.9]">
//                                     {artist.name.split(' ')[0]}<br/>
//                                     <span className="text-white/30 group-hover:text-white/80">{artist.name.split(' ').slice(1).join(' ')}</span>
//                                 </h2>
                                
//                                 <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 group-hover:text-gold-500 transition-colors mt-2 block">
//                                     {displayLabel}
//                                 </span>
//                             </div>

//                         </Link>
//                     </motion.div>
//                 );
//             })}
//         </AnimatePresence>
//       </motion.div>

//       {/* LOAD MORE */}
//       {hasMore && (
//         <div className="w-full flex justify-center mt-32">
//             <button 
//                 onClick={() => setVisibleCount(prev => prev + BATCH_SIZE)}
//                 className="group relative px-8 py-4 overflow-hidden"
//             >
//                 <div className="absolute inset-0 border border-white/10 skew-x-[-10deg] group-hover:bg-white/5 transition-all" />
//                 <span className="relative flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
//                     Expand Cast <DownArrow />
//                 </span>
//             </button>
//         </div>
//       )}

//       {/* GHOST LIGHT */}
//       {filtered.length === 0 && (
//           <div className="w-full h-[40vh] flex flex-col items-center justify-center text-center mt-12 border-t border-b border-white/5">
//               <span className="text-5xl md:text-7xl font-serif text-white/10 mb-4 mix-blend-difference">Ghost Light.</span>
//               <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
//                   No players found in the wings.
//               </p>
//           </div>
//       )}

//     </div>
//   );
// }


"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArtistSummary } from "@/types/schema"; 

const SearchIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const DownArrow = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>);

const BATCH_SIZE = 24;
const FILTERS = ["All", "Core", "Actor", "Director", "Writer", "Tech", "Alumni"];

export default function ArtistGrid({ artists }: { artists: ArtistSummary[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true) }, []);

  // 1. FILTER LOGIC
  const filtered = useMemo(() => {
    return artists.filter((a: ArtistSummary) => {
        const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase()) || 
                             a.roles.some((r) => r.toLowerCase().includes(query.toLowerCase()));
        
        let matchesFilter = false;
        if (activeFilter === "All") matchesFilter = true;
        else if (activeFilter === "Core") matchesFilter = a.rank === 'CROWN' || a.rank === 'ORBIT';
        else if (activeFilter === "Alumni") matchesFilter = a.rank === 'ALUMNI';
        else matchesFilter = a.roles.some((r) => r.includes(activeFilter)); 

        return matchesQuery && matchesFilter;
    });
  }, [artists, query, activeFilter]);

  const isSearching = query.length > 0 || activeFilter !== "All";
  const displayedArtists = isSearching ? filtered : filtered.slice(0, visibleCount);
  const hasMore = !isSearching && visibleCount < filtered.length;

  return (
    <div className="relative min-h-screen w-full px-6 py-32 md:py-48 max-w-[1800px] mx-auto">
      
      {/* ATMOSPHERE: The Noise of the Theatre */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] bg-[url('/noise.png')] mix-blend-overlay" />
      
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-24 gap-12 border-b border-white/10 pb-12">
        <div className="relative z-10">
            <h1 className="text-7xl md:text-[9rem] font-serif text-white tracking-tighter leading-[0.8] mb-6 mix-blend-screen">
                Dramatis<br/><span className="text-white/30 italic">Personae.</span>
            </h1>
            <p className="text-white/50 font-mono text-xs uppercase tracking-[0.3em] max-w-lg leading-relaxed mt-8">
                The Architects, The Voices, and The Shadows.
                <span className="block mt-2 text-gold-500">
                    {filtered.length} SOULS IN THE LIGHT
                </span>
            </p>
        </div>

        {/* CONTROLS */}
        <div className="w-full xl:w-auto flex flex-col items-start xl:items-end gap-8">
            {/* SEARCH */}
            <div className="relative group w-full md:w-[320px]">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
                    <SearchIcon />
                </div>
                <input 
                    type="text" 
                    placeholder="FIND TALENT..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-10 pr-4 text-white placeholder-white/10 focus:outline-none focus:border-white transition-all font-mono text-sm uppercase tracking-widest"
                />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {FILTERS.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                            activeFilter === filter ? 'text-white font-bold' : 'text-white/30 hover:text-white'
                        }`}
                    >
                        {filter}
                        {activeFilter === filter && (
                            <motion.div layoutId="filterDot" className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-gold-500 rounded-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* GRID: THE ENSEMBLE */}
      <motion.div 
        layout 
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12 md:gap-y-24"
        onMouseLeave={() => setHoveredArtist(null)} 
      >
        <AnimatePresence mode="popLayout">
            {displayedArtists.map((artist, i) => {
                
                let displayLabel = artist.primary_role;
                if (activeFilter !== "All" && activeFilter !== "Core" && activeFilter !== "Alumni") {
                    const specificRole = artist.roles.find(r => r.includes(activeFilter));
                    if (specificRole) displayLabel = specificRole;
                }

                const isDimmed = hoveredArtist !== null && hoveredArtist !== artist.id;

                return (
                    <motion.div
                        layout
                        key={artist.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: isDimmed ? 0.3 : 1, scale: isDimmed ? 0.98 : 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="group relative"
                        onMouseEnter={() => setHoveredArtist(artist.id)}
                    >
                        <Link href={`/artist/${artist.slug}`} className="block w-full h-full">
                            
                            {/* --- THE CINEMATIC PORTRAIT --- */}
                            <div className="relative aspect-[2/3] overflow-hidden bg-[#0a0a0a] mb-4 border border-white/5 group-hover:border-gold-500/30 transition-colors duration-700">
                                
                                {artist.image_url ? (
                                    <Image 
                                        src={artist.image_url} 
                                        alt={artist.name} 
                                        fill 
                                        // DESIGN CHOICE: Full Color Always. 
                                        // We use opacity and scale to create the "Spotlight" effect on hover.
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[0.8s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                        sizes="(max-width: 768px) 50vw, 15vw" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
                                        <span className="text-white/10 text-6xl font-serif opacity-50 group-hover:text-gold-500/50 transition-colors duration-500">{artist.name.charAt(0)}</span>
                                    </div>
                                )}

                                {/* THE SCRIM: A subtle gradient at the bottom for text readability. Does NOT cover the face. */}
                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                                {/* HOVER REVEAL: Competencies appear at the BOTTOM */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <div className="flex flex-wrap gap-1.5">
                                            {artist.roles.slice(0, 3).map((role, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-wider text-white/90 leading-none"
                                                >
                                                    {role}
                                                </span>
                                            ))}
                                            {artist.roles.length > 3 && (
                                                <span className="px-2 py-1 text-[9px] text-gold-500 font-mono">+ {artist.roles.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- THE TYPOGRAPHY (Always Visible) --- */}
                            <div className="relative flex flex-col items-start pl-2 border-l border-white/10 group-hover:border-gold-500/80 transition-colors duration-500">
                                <h2 className="text-2xl font-serif text-white/60 group-hover:text-white transition-colors duration-300 leading-none">
                                    {artist.name.split(' ')[0]}
                                    {/* Last name slightly softer */}
                                    <span className="block text-lg text-white/30 group-hover:text-white/70 transition-colors">
                                        {artist.name.split(' ').slice(1).join(' ')}
                                    </span>
                                </h2>
                                
                                {/* Primary Role (e.g. Secretary) */}
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-500/50 group-hover:text-gold-500 transition-colors mt-2 block">
                                    {displayLabel}
                                </span>
                            </div>

                        </Link>
                    </motion.div>
                );
            })}
        </AnimatePresence>
      </motion.div>

      {/* LOAD MORE */}
      {hasMore && (
        <div className="w-full flex justify-center mt-32">
            <button 
                onClick={() => setVisibleCount(prev => prev + BATCH_SIZE)}
                className="group relative px-8 py-4 overflow-hidden"
            >
                <div className="absolute inset-0 border border-white/10 skew-x-[-10deg] group-hover:bg-white/5 transition-all" />
                <span className="relative flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
                    Expand Cast <DownArrow />
                </span>
            </button>
        </div>
      )}

      {/* GHOST LIGHT (Empty State) */}
      {filtered.length === 0 && (
          <div className="w-full h-[40vh] flex flex-col items-center justify-center text-center mt-12 border-t border-b border-white/5">
              <span className="text-5xl md:text-7xl font-serif text-white/10 mb-4 mix-blend-difference">Ghost Light.</span>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                  No players found in the wings.
              </p>
          </div>
      )}

    </div>
  );
}