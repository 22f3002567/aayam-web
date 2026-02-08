// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { X, Maximize2, Camera } from "lucide-react";

// // PHYSICS: Generate deterministic "chaos" based on index
// // This ensures the scatter looks random but is the same every time (no hydration mismatch)
// const getScatter = (index: number) => {
//   const rot = (index % 2 === 0 ? 1 : -1) * ((index * 7) % 12); // Rotation between -12 and 12 deg
//   const x = (index % 3 === 0 ? 1 : -1) * ((index * 5) % 20);  // Offset X
//   const y = (index % 4 === 0 ? 20 : -20);                      // Offset Y
//   return { rotate: rot, x, y, scale: 0.85 };
// };

// export default function ProductionGallery({ images }: { images: string[] }) {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   if (!images || images.length === 0) return null;

//   return (
//     <section className="w-full max-w-7xl mx-auto py-32 px-4 md:px-12 relative z-20 border-t border-white/5">
      
//       {/* 1. THE HEADER (Subtle & Elegant) */}
//       <div className="flex flex-col items-center mb-24 space-y-6">
//         <div className="flex flex-col items-center gap-2">
//             <Camera className="w-4 h-4 text-gold-500/50" />
//             <span className="w-px h-12 bg-gradient-to-b from-gold-500/50 to-transparent"></span>
//         </div>
//         <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight text-center">
//           Production Memories
//         </h2>
//         <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.3em]">
//           Fragments from the Set • {images.length} Captures
//         </p>
//       </div>

//       {/* 2. THE SCATTER GRID (The Animation) */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//         {images.map((src, index) => {
//           const scatter = getScatter(index);
          
//           return (
//             <motion.div
//               key={index + src}
//               // INITIAL STATE: Scattered Chaos
//               initial={{ 
//                 opacity: 0, 
//                 rotate: scatter.rotate, 
//                 x: scatter.x,
//                 y: 100 + scatter.y, // Start lower
//                 scale: scatter.scale 
//               }}
//               // FINAL STATE: Organized Grid
//               whileInView={{ 
//                 opacity: 1, 
//                 rotate: 0, 
//                 x: 0,
//                 y: 0,
//                 scale: 1 
//               }}
//               viewport={{ once: true, margin: "-100px" }} // Triggers when 100px into view
//               transition={{ 
//                 duration: 0.9, 
//                 delay: index * 0.05, // Staggered entry
//                 type: "spring", 
//                 stiffness: 50,
//                 damping: 20
//               }}
//               className="relative aspect-[4/3] group cursor-pointer"
//               onClick={() => setSelectedImage(src)}
//             >
//               {/* THE POLAROID FRAME (Visual Style) */}
//               <div className="absolute -inset-3 bg-white/5 border border-white/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 transform group-hover:rotate-2 group-hover:scale-105" />
              
//               <div className="relative w-full h-full overflow-hidden rounded-sm bg-neutral-900 border border-white/10 group-hover:border-gold-500/50 transition-colors duration-500">
//                 <Image
//                   src={src}
//                   alt={`Memory ${index + 1}`}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                   className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
//                 />
                
//                 {/* OVERLAY HINT */}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
//                     <span className="text-[9px] uppercase tracking-widest text-white border border-white/30 px-3 py-1 rounded-full">View</span>
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* 3. LIGHTBOX MODAL (The Full Experience) */}
//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
//             exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             onClick={() => setSelectedImage(null)}
//             className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
//           >
//             {/* Close Button */}
//             <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-4 z-50">
//                 <X className="w-10 h-10" />
//             </button>
            
//             {/* The Image */}
//             <motion.div
//               initial={{ scale: 0.9, y: 50, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.9, y: 50, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="relative w-full max-w-7xl h-full max-h-[85vh] rounded-lg overflow-hidden shadow-2xl"
//               onClick={(e) => e.stopPropagation()} 
//             >
//                <Image
//                   src={selectedImage}
//                   alt="Full Memory"
//                   fill
//                   className="object-contain"
//                   quality={100}
//                   priority
//                 />
//             </motion.div>
            
//             {/* Caption */}
//             <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-xs uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
//             >
//                 Aayam Archive • Original Capture
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </section>
//   );
// }

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import { Film, Camera } from "lucide-react";

// --- THE ARCHITECTURE OF MEMORY (Parallax Columns) ---
// We create a component that accepts a distinct 'speed' (y-transform).
// This differential speed creates the illusion of 3D depth.

const ParallaxColumn = ({ 
  images, 
  y, 
  className 
}: { 
  images: string[]; 
  y: MotionValue<number>; 
  className?: string; 
}) => {
  return (
    <motion.div 
      style={{ y }} 
      className={`relative flex flex-col gap-8 md:gap-16 w-full ${className}`}
    >
      {images.map((src, i) => (
        <div key={i} className="relative group perspective-1000">
          <div className="relative overflow-hidden rounded-sm transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:z-50 shadow-2xl">
            
            {/* 1. The Glass Frame (Subtle Border Reflection) */}
            <div className="absolute inset-0 border border-white/10 opacity-20 z-20 pointer-events-none rounded-sm group-hover:border-gold-500/30 transition-colors" />
            
            {/* 2. The Artifact (Image) */}
            {/* We alternate aspect ratios to break the grid and feel organic */}
            <div className={`relative w-full ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[2/3]'} grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000`}>
                <Image
                  src={src}
                  alt="Memory fragment"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
            </div>

            {/* 3. The Atmosphere (Lighting Overlay) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />

          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default function ProductionGallery({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. HOOK INTO PHYSICS
  // We track the scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], 
  });

  // 2. DEFINE THE PHYSICS (The "Goosebumps" Settings)
  // Heavy mass, low stiffness = Underwater floating feel
  const springConfig = { stiffness: 40, damping: 30, mass: 1.5 }; 

  // 3. CREATE LAYERS (The 3D Effect)
  // Column 1 (Left): Moves FAST (Foreground) -> -1000px up
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const smoothY1 = useSpring(y1, springConfig);

  // Column 2 (Center): Moves SLOW (Background anchor) -> -400px up
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const smoothY2 = useSpring(y2, springConfig);

  // Column 3 (Right): Moves MEDIUM (Midground) -> -700px up
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -700]);
  const smoothY3 = useSpring(y3, springConfig);

  // Mobile Column (Right): Moves FAST -> -800px up
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const smoothY4 = useSpring(y4, springConfig);

  if (!images || images.length === 0) return null;

  // 4. DISTRIBUTE MEMORIES
  // Split images into 3 columns for desktop, 2 for mobile
  const col1 = images.filter((_, i) => i % 3 === 0);
  const col2 = images.filter((_, i) => i % 3 === 1);
  const col3 = images.filter((_, i) => i % 3 === 2);
  
  const mobileCol1 = images.filter((_, i) => i % 2 === 0);
  const mobileCol2 = images.filter((_, i) => i % 2 === 1);

  return (
    <section ref={containerRef} className="w-full bg-[#030303] relative overflow-hidden border-t border-white/5">
      
      {/* --- ATMOSPHERE LAYERS --- */}
      
      {/* A. Cinematic Grain (The Film Texture) */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay fixed" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* B. The Void Glow (Ambient Light) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-gold-500/5 blur-[150px] rounded-full pointer-events-none" />


      {/* --- THE STAGE --- */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-32 relative z-10">
        
        {/* HEADER (Floating in the void) */}
        <div className="mb-32 md:mb-48 flex flex-col items-center justify-center text-center relative">
            <div className="flex items-center gap-3 text-gold-500/60 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/40" />
                <Camera className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.4em]">The Archive</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/40" />
            </div>
            
            <h2 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.8] opacity-90 drop-shadow-2xl">
              Visual<br/>
              <span className="italic text-white/20">Artifacts</span>
            </h2>
            
            <p className="mt-8 text-neutral-500 font-mono text-xs uppercase tracking-widest max-w-md">
                Fragments of time • Scrolldown to explore
            </p>
        </div>

        {/* --- DESKTOP PARALLAX ENGINE (3 COLUMNS) --- */}
        <div className="hidden md:flex gap-8 lg:gap-16 min-h-[150vh] relative">
            {/* Foreground Layer (Fast) */}
            <ParallaxColumn images={col1} y={smoothY1} className="pt-24 z-30" />
            
            {/* Background Layer (Slow - The Anchor) */}
            <ParallaxColumn images={col2} y={smoothY2} className="-mt-32 z-10 opacity-80 scale-95" />
            
            {/* Midground Layer (Medium) */}
            <ParallaxColumn images={col3} y={smoothY3} className="pt-64 z-20" />
        </div>

        {/* --- MOBILE PARALLAX ENGINE (2 COLUMNS) --- */}
        <div className="flex md:hidden gap-4 min-h-[100vh] relative">
            <ParallaxColumn images={mobileCol1} y={smoothY1} className="pt-12" />
            <ParallaxColumn images={mobileCol2} y={smoothY4} className="-mt-12" />
        </div>

      </div>

      {/* GRADIENT FADE OUT (Smooth Exit) */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-40 pointer-events-none" />
    </section>
  );
}