// // // // // // // "use client";

// // // // // // // import { motion } from "framer-motion";
// // // // // // // import Link from "next/link";
// // // // // // // import Image from "next/image";
// // // // // // // import { useState, useEffect } from "react";

// // // // // // // export default function TheSigil() {
// // // // // // //   const [scrolled, setScrolled] = useState(false);

// // // // // // //   // PSYCHOLOGY: The Seal respects the stage. When the play (scroll) starts, 
// // // // // // //   // the text fades to minimize distraction, but the Emblem (Logo) remains as the anchor.
// // // // // // //   useEffect(() => {
// // // // // // //     const handleScroll = () => setScrolled(window.scrollY > 50);
// // // // // // //     window.addEventListener("scroll", handleScroll);
// // // // // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // // // // //   }, []);

// // // // // // //   return (
// // // // // // //     <div className="fixed top-6 left-6 z-[100] mix-blend-difference">
// // // // // // //       <Link href="/" className="group flex items-center gap-5">
        
// // // // // // //         {/* 1. THE GHOST LIGHT (Logo Container) */}
// // // // // // //         <div className="relative w-14 h-14 flex items-center justify-center">
            
// // // // // // //             {/* The Aura (Cinematic Glow) */}
// // // // // // //             <motion.div 
// // // // // // //                 animate={{ 
// // // // // // //                     opacity: [0.3, 0.6, 0.3], 
// // // // // // //                     scale: [1, 1.1, 1] 
// // // // // // //                 }}
// // // // // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // // // // //                 className="absolute inset-0 bg-white/10 blur-xl rounded-full"
// // // // // // //             />
            
// // // // // // //             {/* The Orbit (Subtle Rotation) */}
// // // // // // //             <motion.div 
// // // // // // //                 animate={{ rotate: 360 }}
// // // // // // //                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// // // // // // //                 className="absolute inset-0 border border-white/10 rounded-full border-t-white/30 border-l-transparent"
// // // // // // //             />

// // // // // // //             {/* THE APPROVED SEAL */}
// // // // // // //             <div className="relative w-10 h-10 transition-transform duration-500 group-hover:scale-110">
// // // // // // //                 <Image 
// // // // // // //                     src="/logo.png" // <--- YOUR OFFICIAL FILE HERE
// // // // // // //                     alt="Aayam Seal"
// // // // // // //                     fill
// // // // // // //                     className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
// // // // // // //                 />
// // // // // // //             </div>
// // // // // // //         </div>

// // // // // // //         {/* 2. THE TITLE CARD (Typography) */}
// // // // // // //         <div className="flex flex-col">
// // // // // // //             <motion.span 
// // // // // // //                 className="font-serif text-2xl tracking-tighter text-white leading-none mix-blend-difference"
// // // // // // //             >
// // // // // // //                 Aayam
// // // // // // //             </motion.span>
            
// // // // // // //             {/* The Subtitle Reveal */}
// // // // // // //             <motion.div 
// // // // // // //                 initial={{ width: 0, opacity: 0 }}
// // // // // // //                 animate={{ 
// // // // // // //                     width: scrolled ? 0 : "auto", 
// // // // // // //                     opacity: scrolled ? 0 : 1 
// // // // // // //                 }}
// // // // // // //                 className="overflow-hidden"
// // // // // // //             >
// // // // // // //                 <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 whitespace-nowrap pl-0.5">
// // // // // // //                     Drama Society
// // // // // // //                 </span>
// // // // // // //             </motion.div>
// // // // // // //         </div>

// // // // // // //       </Link>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // "use client";

// // // // // // import { motion } from "framer-motion";
// // // // // // import Link from "next/link";
// // // // // // import Image from "next/image";
// // // // // // import { useState, useEffect } from "react";

// // // // // // export default function TheSigil() {
// // // // // //   const [scrolled, setScrolled] = useState(false);

// // // // // //   // PSYCHOLOGY: The Seal respects the stage. When the play (scroll) starts, 
// // // // // //   // the text fades to minimize distraction, but the Emblem (Logo) remains as the anchor.
// // // // // //   useEffect(() => {
// // // // // //     const handleScroll = () => setScrolled(window.scrollY > 50);
// // // // // //     window.addEventListener("scroll", handleScroll);
// // // // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <div className="fixed top-6 left-6 z-[100] mix-blend-difference">
// // // // // //       <Link href="/" className="group flex items-center gap-5">
        
// // // // // //         {/* 1. THE GHOST LIGHT (Logo Container) */}
// // // // // //         <div className="relative w-14 h-14 flex items-center justify-center">
            
// // // // // //             {/* The Aura (Cinematic Glow) */}
// // // // // //             <motion.div 
// // // // // //                 animate={{ 
// // // // // //                     opacity: [0.3, 0.6, 0.3], 
// // // // // //                     scale: [1, 1.1, 1] 
// // // // // //                 }}
// // // // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // // // //                 className="absolute inset-0 bg-white/10 blur-xl rounded-full"
// // // // // //             />
            
// // // // // //             {/* The Orbit (Subtle Rotation) */}
// // // // // //             <motion.div 
// // // // // //                 animate={{ rotate: 360 }}
// // // // // //                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// // // // // //                 className="absolute inset-0 border border-white/10 rounded-full border-t-white/30 border-l-transparent"
// // // // // //             />

// // // // // //             {/* THE APPROVED SEAL */}
// // // // // //             <div className="relative w-10 h-10 transition-transform duration-500 group-hover:scale-110">
// // // // // //                 <Image 
// // // // // //                     src="/logo.png" // <--- YOUR OFFICIAL FILE HERE
// // // // // //                     alt="Aayam Seal"
// // // // // //                     fill
// // // // // //                     className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
// // // // // //                 />
// // // // // //             </div>
// // // // // //         </div>

// // // // // //         {/* 2. THE TITLE CARD (Typography) */}
// // // // // //         <div className="flex flex-col">
// // // // // //             <motion.span 
// // // // // //                 className="font-serif text-2xl tracking-tighter text-white leading-none mix-blend-difference"
// // // // // //             >
// // // // // //                 Aayam
// // // // // //             </motion.span>
            
// // // // // //             {/* The Subtitle Reveal */}
// // // // // //             <motion.div 
// // // // // //                 initial={{ width: 0, opacity: 0 }}
// // // // // //                 animate={{ 
// // // // // //                     width: scrolled ? 0 : "auto", 
// // // // // //                     opacity: scrolled ? 0 : 1 
// // // // // //                 }}
// // // // // //                 className="overflow-hidden"
// // // // // //             >
// // // // // //                 <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 whitespace-nowrap pl-0.5">
// // // // // //                     Drama Society
// // // // // //                 </span>
// // // // // //             </motion.div>
// // // // // //         </div>

// // // // // //       </Link>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { motion } from "framer-motion";
// // // // // import Link from "next/link";
// // // // // import Image from "next/image";
// // // // // import { useState, useEffect } from "react";

// // // // // export default function TheSigil() {
// // // // //   const [scrolled, setScrolled] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const handleScroll = () => setScrolled(window.scrollY > 50);
// // // // //     window.addEventListener("scroll", handleScroll);
// // // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="fixed top-6 left-6 z-[100] mix-blend-difference pointer-events-none">
// // // // //       <Link href="/" className="pointer-events-auto group flex items-center gap-4">
        
// // // // //         {/* 1. THE GHOST LIGHT (Logo Container) */}
// // // // //         <div className="relative w-14 h-14 flex items-center justify-center">
            
// // // // //             {/* The Aura (Cinematic Glow) - Behind */}
// // // // //             <motion.div 
// // // // //                 animate={{ 
// // // // //                     opacity: [0.3, 0.5, 0.3], 
// // // // //                     scale: [1, 1.05, 1] 
// // // // //                 }}
// // // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // // //                 className="absolute inset-0 bg-white/20 blur-2xl rounded-full"
// // // // //             />
            
// // // // //             {/* The Orbit (Subtle Rotation) */}
// // // // //             <motion.div 
// // // // //                 animate={{ rotate: 360 }}
// // // // //                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// // // // //                 className="absolute inset-0 border border-white/10 rounded-full border-t-white/30 border-l-transparent"
// // // // //             />

// // // // //             {/* THE APPROVED SEAL (Masked & Centered) */}
// // // // //             {/* Added 'rounded-full overflow-hidden' to force the circular frame */}
// // // // //             <div className="relative w-10 h-10 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-110 flex items-center justify-center bg-black/20 backdrop-blur-sm">
// // // // //                 <Image 
// // // // //                     src="/logo.png" 
// // // // //                     alt="Aayam Seal"
// // // // //                     fill
// // // // //                     className="object-contain p-0.5 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
// // // // //                 />
// // // // //             </div>
// // // // //         </div>

// // // // //         {/* 2. THE TITLE CARD (Kinetic Typography) */}
// // // // //         <div className="flex flex-col justify-center h-14 relative">
            
// // // // //             {/* "AAYAM" - The Anchor */}
// // // // //             {/* Logic: When scrolled, y moves to 0 (Center). When not scrolled, y moves up (-6) to make room for subtitle. */}
// // // // //             <motion.span 
// // // // //                 animate={{ 
// // // // //                     y: scrolled ? 0 : -6, // <--- THE OPTICAL CORRECTION
// // // // //                     scale: scrolled ? 1.1 : 1 // Subtle zoom when it becomes the sole focus
// // // // //                 }}
// // // // //                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
// // // // //                 className="font-serif text-2xl tracking-tighter text-white leading-none mix-blend-difference origin-left"
// // // // //             >
// // // // //                 Aayam
// // // // //             </motion.span>
            
// // // // //             {/* "DRAMA SOCIETY" - The Subtitle */}
// // // // //             <motion.div 
// // // // //                 initial={{ opacity: 1, height: "auto" }}
// // // // //                 animate={{ 
// // // // //                     opacity: scrolled ? 0 : 1,
// // // // //                     height: scrolled ? 0 : "auto",
// // // // //                     y: scrolled ? -5 : 2 // Pulls up as it fades to reduce layout shift gaps
// // // // //                 }}
// // // // //                 transition={{ duration: 0.3, ease: "easeInOut" }}
// // // // //                 className="overflow-hidden absolute bottom-3 left-0.5" // Absolute positioning ensures precise alignment relative to Aayam
// // // // //             >
// // // // //                 <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 whitespace-nowrap">
// // // // //                     Drama Society
// // // // //                 </span>
// // // // //             </motion.div>
// // // // //         </div>

// // // // //       </Link>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { motion } from "framer-motion";
// // // // import Link from "next/link";
// // // // import Image from "next/image";
// // // // import { useState, useEffect } from "react";

// // // // export default function TheSigil() {
// // // //   const [scrolled, setScrolled] = useState(false);

// // // //   useEffect(() => {
// // // //     const handleScroll = () => setScrolled(window.scrollY > 50);
// // // //     window.addEventListener("scroll", handleScroll);
// // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // //   }, []);

// // // //   return (
// // // //     <div className="fixed top-6 left-6 z-[100] mix-blend-difference pointer-events-none">
// // // //       <Link href="/" className="pointer-events-auto group flex items-center gap-4">
        
// // // //         {/* 1. THE LENS (Strictly Circular & Contained) */}
// // // //         {/* Added 'overflow-hidden' to trap the light inside the circle */}
// // // //         <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-black/20 border border-white/10 backdrop-blur-sm shadow-2xl">
            
// // // //             {/* The Trapped Light (Inside the Lens) */}
// // // //             <motion.div 
// // // //                 animate={{ 
// // // //                     opacity: [0.1, 0.3, 0.1], 
// // // //                     scale: [1, 1.2, 1] 
// // // //                 }}
// // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // //                 className="absolute inset-0 bg-radial-gradient from-white/30 to-transparent blur-sm"
// // // //             />

// // // //             {/* The Orbit Ring */}
// // // //             <motion.div 
// // // //                 animate={{ rotate: 360 }}
// // // //                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// // // //                 className="absolute inset-0 border border-white/5 rounded-full border-t-white/20"
// // // //             />

// // // //             {/* THE SEAL (Properly Sized) */}
// // // //             <div className="relative w-6 h-6 z-10 transition-transform duration-500 group-hover:scale-110">
// // // //                 <Image 
// // // //                     src="/logo.svg" 
// // // //                     alt="Aayam Seal"
// // // //                     fill
// // // //                     className="object-contain drop-shadow-md"
// // // //                 />
// // // //             </div>
// // // //         </div>

// // // //         {/* 2. THE TYPOGRAPHY (Vertical Rhythm Fixed) */}
// // // //         <div className="flex flex-col justify-center h-12 relative">
            
// // // //             {/* "AAYAM" - Anchored */}
// // // //             {/* Added 'pb-0.5' to create breathing room for the 'y' descender */}
// // // //             <motion.span 
// // // //                 animate={{ 
// // // //                     y: scrolled ? 1 : -5, 
// // // //                     scale: scrolled ? 1.05 : 1
// // // //                 }}
// // // //                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
// // // //                 className="font-serif text-xl tracking-tight text-white leading-none mix-blend-difference origin-left pb-0.5"
// // // //             >
// // // //                 Aayam
// // // //             </motion.span>
            
// // // //             {/* "DRAMA SOCIETY" - The Credit */}
// // // //             <motion.div 
// // // //                 initial={{ opacity: 1, height: "auto" }}
// // // //                 animate={{ 
// // // //                     opacity: scrolled ? 0 : 1,
// // // //                     height: scrolled ? 0 : "auto",
// // // //                     y: scrolled ? -2 : 0 // Slides up slightly as it vanishes
// // // //                 }}
// // // //                 className="overflow-hidden origin-top absolute left-0.5 bottom-2"
// // // //             >
// // // //                 <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/50 whitespace-nowrap block pt-1">
// // // //                     Drama Society
// // // //                 </span>
// // // //             </motion.div>
// // // //         </div>

// // // //       </Link>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import { motion } from "framer-motion";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { useState, useEffect } from "react";

// // // export default function TheSigil() {
// // //   const [scrolled, setScrolled] = useState(false);

// // //   useEffect(() => {
// // //     const handleScroll = () => setScrolled(window.scrollY > 50);
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   return (
// // //     <div className="fixed top-6 left-6 z-[100] mix-blend-difference pointer-events-none">
// // //       <Link href="/" className="pointer-events-auto group flex items-center gap-5">
        
// // //         {/* 1. THE LENS (The Reliquary) */}
// // //         {/* Increased ring definition (border-white/20) for better containment */}
// // //         <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-black/40 border border-white/20 backdrop-blur-md shadow-2xl">
            
// // //             {/* THE FILAMENT (The Trapped Light) */}
// // //             {/* Tighter gradient: Stops at 40% to prevent filling the whole circle */}
// // //             <motion.div 
// // //                 animate={{ 
// // //                     opacity: [0.2, 0.5, 0.2], 
// // //                     scale: [0.8, 1, 0.8] 
// // //                 }}
// // //                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
// // //                 className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5)_0%,transparent_50%)] blur-sm"
// // //             />

// // //             {/* The Mechanical Ring (Rotating) */}
// // //             <motion.div 
// // //                 animate={{ rotate: 360 }}
// // //                 transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
// // //                 className="absolute inset-0 rounded-full border border-white/10 border-t-white/30 border-r-transparent"
// // //             />

// // //             {/* THE SEAL (Visual Anchor) */}
// // //             <div className="relative w-6 h-6 z-10 transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100">
// // //                 <Image 
// // //                     src="/logo.svg" 
// // //                     alt="Aayam Seal"
// // //                     fill
// // //                     className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
// // //                 />
// // //             </div>
// // //         </div>

// // //         {/* 2. THE TYPOGRAPHY (Vertical Rhythm Adjusted) */}
// // //         <div className="flex flex-col justify-center h-12 relative">
            
// // //             {/* "AAYAM" - Lifted Up */}
// // //             <motion.span 
// // //                 animate={{ 
// // //                     y: scrolled ? 2 : -4, // Moves UP when subtitle is present
// // //                     scale: scrolled ? 1.1 : 1
// // //                 }}
// // //                 transition={{ type: "spring", stiffness: 250, damping: 20 }}
// // //                 className="font-serif text-2xl tracking-tighter text-white leading-none mix-blend-difference origin-left"
// // //             >
// // //                 Aayam
// // //             </motion.span>
            
// // //             {/* "DRAMA SOCIETY" - Pushed Down */}
// // //             <motion.div 
// // //                 initial={{ opacity: 1, height: "auto" }}
// // //                 animate={{ 
// // //                     opacity: scrolled ? 0 : 1,
// // //                     height: scrolled ? 0 : "auto",
// // //                     y: scrolled ? -2 : 2 // Pushes DOWN when visible to create the gap
// // //                 }}
// // //                 className="overflow-hidden origin-top absolute left-0.5 bottom-1.5"
// // //             >
// // //                 <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/50 whitespace-nowrap block">
// // //                     Drama Society
// // //                 </span>
// // //             </motion.div>
// // //         </div>

// // //       </Link>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { motion } from "framer-motion";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { useState, useEffect } from "react";

// // export default function TheSigil() {
// //   const [scrolled, setScrolled] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 50);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   return (
// //     <div className="fixed top-6 left-6 z-[100] mix-blend-difference pointer-events-none">
// //       <Link href="/" className="pointer-events-auto group flex items-center gap-5">
        
// //         {/* 1. THE RELIQUARY (The Portal) */}
// //         {/* We use a deep black background to simulate a 'void' or 'depth' behind the glass */}
// //         <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-[#050505] border border-white/10 shadow-2xl group-hover:border-gold-500/30 transition-colors duration-700">
            
// //             {/* A. THE FILM GRAIN (Texture) */}
// //             {/* This noise creates the cinematic 'reality' - it's not a vector, it's a film strip */}
// //             <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

// //             {/* B. THE GHOST LIGHT (Tungsten Core) */}
// //             {/* Changed from cold white to 'amber-500' (Gold/Tungsten). This is the warmth of the stage. */}
// //             <motion.div 
// //                 animate={{ 
// //                     opacity: [0.15, 0.3, 0.15], 
// //                     scale: [0.9, 1.1, 0.9] 
// //                 }}
// //                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
// //                 className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--token-gold)_0%,transparent_60%)] blur-md opacity-20"
// //                 style={{ ["--token-gold" as any]: "rgba(234, 179, 8, 0.4)" }} 
// //             />

// //             {/* C. THE PRISM RING (The Dimension) */}
// //             <motion.div 
// //                 animate={{ rotate: 360 }}
// //                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
// //                 className="absolute inset-0 rounded-full border border-white/5 border-t-white/20 border-l-transparent"
// //             />

// //             {/* D. THE EMBLEM (The Artifact) */}
// //             {/* The logo floats in the void. */}
// //             <div className="relative w-6 h-6 z-10 transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0">
// //                 <Image 
// //                     src="/logo.png" 
// //                     alt="Aayam Seal"
// //                     fill
// //                     className="object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
// //                 />
// //             </div>
// //         </div>

// //         {/* 2. THE SCRIPT (The Narrative) */}
// //         <div className="flex flex-col justify-center h-12 relative">
            
// //             {/* TITLE: "AAYAM" (The Constant Truth) */}
// //             <motion.span 
// //                 animate={{ 
// //                     y: scrolled ? 2 : -4, 
// //                     filter: scrolled ? "blur(0px)" : "blur(0px)",
// //                     color: scrolled ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)"
// //                 }}
// //                 transition={{ type: "spring", stiffness: 200, damping: 20 }}
// //                 className="font-serif text-xl tracking-tight text-white leading-none mix-blend-difference origin-left"
// //             >
// //                 Aayam
// //             </motion.span>
            
// //             {/* SUBTITLE: "DRAMA SOCIETY" (The Performance) */}
// //             {/* CINEMATIC EFFECT: Rack Focus. It doesn't just fade; it blurs out like a camera changing focus. */}
// //             <motion.div 
// //                 initial={{ opacity: 1, filter: "blur(0px)" }}
// //                 animate={{ 
// //                     opacity: scrolled ? 0 : 1,
// //                     filter: scrolled ? "blur(4px)" : "blur(0px)", // <--- The Rack Focus Effect
// //                     y: scrolled ? 2 : 2 
// //                 }}
// //                 transition={{ duration: 0.5, ease: "easeInOut" }}
// //                 className="overflow-hidden absolute left-0.5 bottom-1.5 origin-left"
// //             >
// //                 <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/40 whitespace-nowrap block">
// //                     Drama Society
// //                 </span>
// //             </motion.div>
// //         </div>

// //       </Link>
// //     </div>
// //   );
// // }

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