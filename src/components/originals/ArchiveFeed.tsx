
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Play, PlayCategory } from "@/types/schema";
// import PlayCard from "@/components/originals/PlayCard";
// import CategoryTabs from "@/components/originals/CategoryTabs";
// import ArchiveHeader from "@/components/originals/ArchiveHeader";
// import { fetchMorePlays } from "@/app/originals/actions";
// import { motion, AnimatePresence } from "framer-motion";
// // NEW IMPORTS
// import { useArchiveAtmosphere } from "@/components/originals/ArchiveContext";
// import { NAVARASA, DEFAULT_RASA } from "@/lib/rasa";

// import { getCardSize, getGridClasses } from "@/lib/layout";

// // MAP CATEGORIES TO DEFAULT MOODS
// const CATEGORY_MOODS: Record<string, string> = {
//   'all': 'adbhuta',      // Gold (Wonder)
//   'stage': 'raudra',     // Red (Drama)
//   'street': 'hasya',     // Yellow (Energy)
//   'film': 'karuna',      // Blue (Cinematic/Emotion)
//   'short': 'bhayanaka',  // Green (Modern/Edgy)
//   'workshop': 'shanta',  // White (Peace/Learning)
// };

// export default function ArchiveFeed({ initialPlays, initialCategory }: { initialPlays: Play[], initialCategory: PlayCategory | 'all' }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { setBaseRasa } = useArchiveAtmosphere(); // HOOK INTO CONTEXT
  
//   const [plays, setPlays] = useState<Play[]>(initialPlays);
//   const [activeCategory, setActiveCategory] = useState<PlayCategory | 'all'>(initialCategory);
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(initialPlays.length >= 12);

//   // SYNC ATMOSPHERE ON MOUNT & CHANGE
//   useEffect(() => {
//     const moodKey = CATEGORY_MOODS[activeCategory] || 'adbhuta';
//     const newBase = NAVARASA.find(r => r.id === moodKey) || DEFAULT_RASA;
//     setBaseRasa(newBase);
//   }, [activeCategory, setBaseRasa]);

//   // SYNC URL
//   useEffect(() => {
//     const catFromUrl = (searchParams.get('category') as PlayCategory) || 'all';
//     if (catFromUrl !== activeCategory) {
//         setActiveCategory(catFromUrl);
//     }
//   }, [searchParams]);

//   const handleCategoryChange = async (cat: PlayCategory | 'all') => {
//     if (isLoading) return;
//     setIsLoading(true);
//     router.push(`/originals?category=${cat}`, { scroll: false });
    
//     // The useEffect above will trigger the Atmosphere change
//     setActiveCategory(cat);
    
//     setPage(1);
//     setPlays([]); 

//     const newPlays = await fetchMorePlays(1, cat);
//     setPlays(newPlays);
//     setHasMore(newPlays.length >= 12);
//     setIsLoading(false);
//   };

//   // ... (LoadMore logic remains the same) ...
//   const loadMore = async () => {
//     if (isLoading || !hasMore) return;
//     setIsLoading(true);
//     const nextPage = page + 1;
//     const newPlays = await fetchMorePlays(nextPage, activeCategory);
    
//     if (newPlays.length === 0) {
//       setHasMore(false);
//     } else {
//       setPlays((prev) => [...prev, ...newPlays]);
//       setPage(nextPage);
//       if (newPlays.length < 12) setHasMore(false);
//     }
//     setIsLoading(false);
//   };

//   return (
//     <>
//       <ArchiveHeader category={activeCategory} />
//       <CategoryTabs activeTab={activeCategory} onChange={handleCategoryChange} />
//  {/* THE MOSAIC GRID */}
//       {/* We use 'auto-rows' to allow the grid to fill naturally */}
//       <motion.div 
//         layout
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]"
//       >
//           <AnimatePresence mode="popLayout">
//             {plays.map((play) => {
//                 // 1. CALCULATE SIZE BASED ON SCORE
//                 // Note: We force standard size on mobile (1 col) to avoid breaking layout
//                 const size = getCardSize(play.featured_score);
//                 const gridClass = getGridClasses(size);

//                 return (
//                     <motion.div 
//                         layout
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ duration: 0.5 }}
//                         key={play.id} 
//                         className={`${gridClass} w-full h-full`} 
//                     >
//                         <PlayCard play={play} size={size} />
//                     </motion.div>
//                 );
//             })}
//           </AnimatePresence>
          
//           {/* Empty State */}
//           {!isLoading && plays.length === 0 && (
//              <div className="col-span-full py-40 flex flex-col items-center justify-center border border-dashed border-white/5">
//                 <span className="text-neutral-600 font-mono text-xs uppercase mb-4">The Void is Empty</span>
//                 <p className="text-neutral-700 text-sm">No works found in {activeCategory}</p>
//              </div>
//           )}
//       </motion.div>
//       {/* <motion.div 
//         layout 
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 min-h-[50vh]"
//       >
//           <AnimatePresence mode="popLayout">
//             {plays.map((play, index) => {
//                 const isMiddleColumn = index % 3 === 1;
//                 return (
//                     <motion.div 
//                         layout
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ duration: 0.5 }}
//                         key={play.id} 
//                         className={`${isMiddleColumn ? 'lg:translate-y-24' : ''} transition-transform duration-700`}
//                     >
//                         <PlayCard play={play} index={index} />
//                     </motion.div>
//                 );
//             })}
//           </AnimatePresence>
          
//           {!isLoading && plays.length === 0 && (
//              <div className="col-span-full py-20 flex justify-center border border-dashed border-white/5">
//                 <span className="text-neutral-600 font-mono text-xs uppercase">No works found in {activeCategory}</span>
//              </div>
//           )}
//       </motion.div> */}
//         {/* LOAD MORE BUTTON */}
//       <div className="w-full flex justify-center mt-32">
//         {isLoading && (
//             <span className="text-gold-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
//                 Accessing Archive...
//             </span>
//         )}
        
//         {!isLoading && hasMore && (
//           <button 
//             onClick={loadMore}
//             className="group px-8 py-4 border border-white/10 rounded-full hover:border-gold-500/50 transition-colors"
//           >
//             <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 group-hover:text-gold-500 font-mono">
//                 Reveal Further Dimensions
//             </span>
//           </button>
//         )}
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Play, PlayCategory } from "@/types/schema";
import PlayCard from "@/components/originals/PlayCard";
import CategoryTabs from "@/components/originals/CategoryTabs";
import ArchiveHeader from "@/components/originals/ArchiveHeader";
import { fetchMorePlays } from "@/app/originals/actions";
import { motion, AnimatePresence } from "framer-motion";
import { useArchiveAtmosphere } from "@/components/originals/ArchiveContext";
import { NAVARASA, DEFAULT_RASA } from "@/lib/rasa";
import { getCardSize, getGridClasses } from "@/lib/layout";

// MAP CATEGORIES TO DEFAULT MOODS
const CATEGORY_MOODS: Record<string, string> = {
  'all': 'adbhuta',      // Gold
  'stage': 'raudra',     // Red
  'street': 'hasya',     // Yellow
  'film': 'karuna',      // Blue
  'short': 'bhayanaka',  // Green
  'workshop': 'shanta',  // White
};

export default function ArchiveFeed({ initialPlays, initialCategory }: { initialPlays: Play[], initialCategory: PlayCategory | 'all' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setBaseRasa } = useArchiveAtmosphere();
  
  const [plays, setPlays] = useState<Play[]>(initialPlays);
  const [activeCategory, setActiveCategory] = useState<PlayCategory | 'all'>(initialCategory);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPlays.length >= 12);

  // Sync Atmosphere
  useEffect(() => {
    const moodKey = CATEGORY_MOODS[activeCategory] || 'adbhuta';
    const newBase = NAVARASA.find(r => r.id === moodKey) || DEFAULT_RASA;
    setBaseRasa(newBase);
  }, [activeCategory, setBaseRasa]);

  // Sync URL
  useEffect(() => {
    const catFromUrl = (searchParams.get('category') as PlayCategory) || 'all';
    if (catFromUrl !== activeCategory) {
        setActiveCategory(catFromUrl);
    }
  }, [searchParams]);

  const handleCategoryChange = async (cat: PlayCategory | 'all') => {
    if (isLoading) return;
    setIsLoading(true);
    router.push(`/originals?category=${cat}`, { scroll: false });
    
    setActiveCategory(cat);
    setPage(1);
    setPlays([]); 

    const newPlays = await fetchMorePlays(1, cat);
    setPlays(newPlays);
    setHasMore(newPlays.length >= 12);
    setIsLoading(false);
  };

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const nextPage = page + 1;
    const newPlays = await fetchMorePlays(nextPage, activeCategory);
    
    if (newPlays.length === 0) {
      setHasMore(false);
    } else {
      setPlays((prev) => [...prev, ...newPlays]);
      setPage(nextPage);
      if (newPlays.length < 12) setHasMore(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ArchiveHeader category={activeCategory} />
      <CategoryTabs activeTab={activeCategory} onChange={handleCategoryChange} />

      {/* THE MOSAIC GRID - ADJUSTED SPACING */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-[300px] md:auto-rows-[350px]"
      >
          <AnimatePresence mode="popLayout">
            {plays.map((play) => {
                // const size = getCardSize(play.featured_score);
                const size = getCardSize(play);
                const gridClass = getGridClasses(size);

                return (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        key={play.id} 
                        // className={`${gridClass} w-full h-full`}
                        // FIX: Added 'relative hover:z-50' to ensure pop-out effect works perfectly
                        className={`${gridClass} w-full relative hover:z-50 transition-all duration-300`} 
                    >
                        <PlayCard play={play} size={size} />
                    </motion.div>
                );
            })}
          </AnimatePresence>
          
          {!isLoading && plays.length === 0 && (
             <div className="col-span-full py-40 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-sm">
                <span className="text-neutral-600 font-mono text-xs uppercase mb-4">The Void is Empty</span>
                <p className="text-neutral-700 text-sm">No works found in {activeCategory}</p>
             </div>
          )}
      </motion.div>

      <div className="w-full flex justify-center mt-32">
        {isLoading && (
            <span className="text-gold-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
                Accessing Archive...
            </span>
        )}
        
        {!isLoading && hasMore && (
          <button 
            onClick={loadMore}
            className="group px-8 py-4 border border-white/10 rounded-full hover:border-gold-500/50 transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 group-hover:text-gold-500 font-mono">
                Reveal Further Dimensions
            </span>
          </button>
        )}
      </div>
    </>
  );
}