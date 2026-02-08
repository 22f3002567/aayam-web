
// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// export default function TheSigil() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="fixed top-6 left-6 z-[100] mix-blend-difference pointer-events-none">
//       <Link href="/" className="pointer-events-auto group flex items-center gap-4">
        
//         {/* 1. THE LANTERN (The Container) */}
//         {/* Removed rotating rings. Increased size to w-14 h-14 to let the logo breathe. */}
//         <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
            
//             {/* THE HEARTBEAT (The Soul) */}
//             {/* A slow, warm amber pulse. No rotation. Just life. */}
//             <motion.div 
//                 animate={{ 
//                     opacity: [0.3, 0.6, 0.3], 
//                 }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.3)_0%,transparent_70%)] blur-md"
//             />

//             {/* THE EMBLEM (The Authority) */}
//             {/* Removed padding. Maximize size relative to container (w-10 = 40px inside 56px container). */}
//             {/* This ensures it fits 'properly'—dominant but contained. */}
//             <div className="relative w-10 h-10 z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
//                 <Image 
//                     src="/logo.svg" 
//                     alt="Aayam Seal"
//                     fill
//                     className="object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
//                     priority
//                 />
//             </div>
//         </div>

//         {/* 2. THE TYPOGRAPHY (The Name) */}
//         {/* No hover hiding. It respects the scroll (hides subtitle when moving), but stays visible otherwise. */}
//         <div className="flex flex-col justify-center h-14 relative top-0.5">
            
//             {/* TITLE */}
//             <motion.span 
//                 animate={{ y: scrolled ? 6 : -2 }} // Slides to optical center on scroll
//                 transition={{ type: "spring", stiffness: 300, damping: 25 }}
//                 className="font-serif text-2xl tracking-tight text-white leading-none mix-blend-difference"
//             >
//                 Aayam
//             </motion.span>
            
//             {/* SUBTITLE */}
//             <motion.div 
//                 initial={{ opacity: 1, height: "auto" }}
//                 animate={{ 
//                     opacity: scrolled ? 0 : 1,
//                     height: scrolled ? 0 : "auto",
//                     y: 0 
//                 }}
//                 className="overflow-hidden origin-top"
//             >
//                 <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 whitespace-nowrap block mt-1">
//                     Drama Society
//                 </span>
//             </motion.div>
//         </div>

//       </Link>
//     </div>
//   );
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function TheSigil() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-6 z-[100] mix-blend-difference pointer-events-none">
      <Link href="/" className="pointer-events-auto group flex items-center gap-4">
        
        {/* 1. THE LANTERN (Logo Container) */}
        {/* Fixed: Standardized size (w-14 h-14) and padding (p-2.5) for perfect fit */}
        <div className="relative w-14 h-14 shrink-0 rounded-full flex items-center justify-center bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
            
            {/* THE SOUL (Warm Tungsten Core) */}
            {/* Fixed: Valid Tailwind Gradient Syntax */}
            <motion.div 
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-amber-500/20 blur-xl"
            />

            {/* THE EMBLEM (Fitted) */}
            {/* p-2.5 ensures the logo doesn't touch edges but fills the space comfortably */}
            <div className="relative w-full h-full p-2.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                <Image 
                    src="/logo.svg" 
                    alt="Aayam Seal"
                    fill
                    className="object-contain drop-shadow-md"
                    priority
                />
            </div>
        </div>

        {/* 2. THE TYPOGRAPHY (Automatic Centering) */}
        {/* 'layout' prop tells Framer to animate layout changes automatically */}
        <motion.div 
            layout 
            className="flex flex-col justify-center"
        >
            {/* TITLE */}
            <motion.span 
                layout
                className="font-serif text-2xl tracking-tight text-white leading-none mix-blend-difference"
            >
                Aayam
            </motion.span>
            
            {/* SUBTITLE */}
            <AnimatePresence>
                {!scrolled && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 whitespace-nowrap block mt-1">
                            Drama Society
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

      </Link>
    </div>
  );
}