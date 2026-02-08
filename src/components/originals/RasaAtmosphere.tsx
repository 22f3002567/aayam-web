
// // "use client";

// // import { motion } from "framer-motion";
// // import { useArchiveAtmosphere } from "@/components/originals/ArchiveContext";

// // export default function RasaAtmosphere() {
// //   const { activeRasa } = useArchiveAtmosphere();

// //   return (
// //     <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-1000 bg-[#050505]">
      
// //       {/* 1. THE DIVINE LIGHT (The Breathing Soul) */}
// //       <motion.div 
// //         className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140vw] h-[100vh] blur-[120px] opacity-20"
// //         animate={{ 
// //             backgroundColor: activeRasa.color,
// //             scale: [1, 1.1, 1], // The Breath
// //         }}
// //         transition={{ 
// //             backgroundColor: { duration: 1.2, ease: "circOut" },
// //             scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } // Slow pulse
// //         }}
// //       />
      
// //       {/* 2. CINEMATIC VIGNETTE (Focuses the eye on the center/grid) */}
// //       <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80" />

// //       {/* 3. GLOBAL GRAIN (Unified Texture) */}
// //       {/* This ensures the light interacts with the texture */}
// //       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay" />
// //     </div>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";
// import { useArchiveAtmosphere } from "@/components/originals/ArchiveContext";

// export default function RasaAtmosphere() {
//   const { activeRasa } = useArchiveAtmosphere();

//   return (
//     <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      
//       {/* 1. THE DIVINE LIGHT */}
//       <motion.div 
//         className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140vw] h-[100vh] blur-[120px] opacity-20"
//         animate={{ 
//             backgroundColor: activeRasa.color,
//             scale: [1, 1.1, 1],
//         }}
//         transition={{ 
//             // INCREASED DURATION: From 1.2s to 2.5s for a 'liquid' feel
//             backgroundColor: { duration: 2.5, ease: "linear" }, 
//             scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
//         }}
//       />
      
//       {/* 2. CINEMATIC VIGNETTE */}
//       <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80" />

//       {/* 3. GLOBAL GRAIN */}
//       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay" />
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useArchiveAtmosphere } from "@/components/originals/ArchiveContext";

export default function RasaAtmosphere() {
  const { activeRasa, hoveredPlay, baseRasa } = useArchiveAtmosphere();

  // LOGIC: If hovering a play, use its color. 
  // If NOT hovering, use the Room's Base Color (The Divine Category Color).
  const currentColor = hoveredPlay ? activeRasa.color : baseRasa.color;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      
      {/* 1. THE DIVINE LIGHT */}
      <motion.div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140vw] h-[100vh] blur-[120px] opacity-20"
        animate={{ 
            backgroundColor: currentColor, // ANIMATES SMOOTHLY BETWEEN CATEGORIES
            scale: [1, 1.1, 1],
        }}
        transition={{ 
            backgroundColor: { duration: 1.5, ease: "easeInOut" }, // Smooth color shift
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* 2. CINEMATIC VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80" />

      {/* 3. GLOBAL GRAIN */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
  );
}