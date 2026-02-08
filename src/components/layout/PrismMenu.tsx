
// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { 
//   Home,         // Stage
//   Feather,      // Manifesto
//   Clock,        // Chronicle
//   Film,         // Cinema
//   Users,        // Guild
//   Mic2,         // Voices
//   Fingerprint,  // Legacy
//   Sparkles      // Union
// } from "lucide-react";

// // --- THE CONSTELLATION ---
// const MENU_ITEMS = [
//   { label: "STAGE", path: "/", icon: Home },
//   { label: "MANIFESTO", path: "/about", icon: Feather },
//   { label: "CHRONICLE", path: "/events", icon: Clock },
//   { label: "CINEMA", path: "/originals", icon: Film },
//   { label: "GUILD", path: "/ensemble", icon: Users },
//   { label: "VOICES", path: "/artist", icon: Mic2 },
//   { label: "LEGACY", path: "/certificate", icon: Fingerprint },
//   { label: "UNION", path: "/join", icon: Sparkles, special: true },
// ];

// export default function PrismMenu() {
//   const pathname = usePathname();

//   return (
//     <motion.nav 
//       initial={{ y: 100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
//       // POSITIONING: Bottom Right, with safe padding
//       className="fixed bottom-6 right-6 z-50 max-w-[calc(100vw-3rem)]"
//       style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} 
//     >
//       {/* THE GLASS STRIP */}
//       <div className="
//         flex items-center gap-1 p-2
//         bg-[#050505]/80 backdrop-blur-2xl 
//         border border-white/10 rounded-2xl
//         shadow-[0_0_40px_rgba(0,0,0,0.5)]
//         overflow-x-auto no-scrollbar
//         mask-image: linear-gradient(to right, transparent, black 10px)
//       ">
        
//         {/* Cinematic Noise Overlay */}
//         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none rounded-2xl" />

//         {MENU_ITEMS.map((item) => {
//           const isActive = pathname === item.path;
          
//           return (
//             <Link 
//               key={item.path} 
//               href={item.path}
//               className="relative group p-2 rounded-xl transition-all duration-300 flex-shrink-0"
//             >
//               {/* 1. ACTIVE HIGHLIGHT (Subtle Glass Block) */}
//               {isActive && (
//                 <motion.div
//                   layoutId="ghost-active"
//                   className="absolute inset-0 bg-white/10 rounded-xl border border-white/5"
//                   transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                 />
//               )}

//               {/* 2. ICON */}
//               <div className="relative z-10 p-1">
//                  <item.icon 
//                     strokeWidth={1.5}
//                     className={`
//                       w-5 h-5 transition-all duration-300
//                       ${isActive ? "text-gold-500 scale-110" : "text-white/40 group-hover:text-white group-hover:scale-110"}
//                       ${item.special && !isActive ? "text-red-500/80 group-hover:text-red-500" : ""}
//                     `} 
//                  />
//               </div>

//               {/* 3. TOOLTIP LABEL (Floats Up on Hover) */}
//               {/* Using group-hover to reveal. Absolute positioning relative to the icon. */}
//               <div className="
//                 absolute bottom-full mb-4 left-1/2 -translate-x-1/2 
//                 pointer-events-none opacity-0 translate-y-2 scale-90
//                 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
//                 transition-all duration-200 ease-out z-50
//               ">
//                 <div className="
//                   bg-[#0a0a0a] border border-white/10 px-3 py-1.5 rounded-lg
//                   text-[10px] font-mono uppercase tracking-[0.2em] text-white
//                   whitespace-nowrap shadow-xl flex flex-col items-center
//                 ">
//                   {item.label}
//                   {/* Tiny arrow pointing down */}
//                   <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#0a0a0a]" />
//                 </div>
//               </div>

//               {/* MOBILE ACTIVE DOT (Since hover doesn't exist on touch) */}
//               {isActive && (
//                 <motion.div 
//                   layoutId="ghost-dot"
//                   className="md:hidden absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full" 
//                 />
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </motion.nav>
//   );
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,         // Stage
  Feather,      // Manifesto
  Clock,        // Chronicle
  Film,         // Cinema
  Users,        // Guild
  Mic2,         // Voices
  Fingerprint,  // Legacy
  Sparkles      // Union
} from "lucide-react";

// THE OCTAVE (8 Notes)
const MENU_ITEMS = [
  { label: "STAGE", path: "/", icon: Home },
  { label: "Originals", path: "/originals", icon: Film },
  
  { label: "Events", path: "/events", icon: Clock },
  
  { label: "Ensemble", path: "/ensemble", icon: Users },
  { label: "Artists", path: "/artist", icon: Mic2 },
  // { label: "LEGACY", path: "/certificate", icon: Fingerprint },
  { label: "About-Us", path: "/about", icon: Feather },
  { label: "Join", path: "/join", icon: Sparkles, special: true },
];

export default function PrismMenu() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      // ANCHOR: Bottom Right
      className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 max-w-[calc(100vw-2rem)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} 
    >
      {/* THE GLASS CAPSULE */}
      <div className="
        flex items-center gap-1 p-2
        bg-[#0a0a0a]/80 backdrop-blur-2xl 
        border border-white/10 rounded-full
        shadow-[0_0_40px_rgba(0,0,0,0.6)]
        overflow-x-auto no-scrollbar
      ">
        
        {/* Cinematic Grain */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none rounded-full" />

        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className="relative group flex items-center justify-center outline-none rounded-full"
            >
              {/* 1. ACTIVE HIGHLIGHT (The Glow) */}
              {isActive && (
                <motion.div
                  layoutId="kinetic-active"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* 2. THE CONTENT CONTAINER (Icon + Text) */}
              <div className="
                flex items-center px-3 py-2 md:py-3
                transition-all duration-500 ease-out
              ">
                
                {/* ICON */}
                <item.icon 
                  strokeWidth={1.5}
                  className={`
                    w-5 h-5 flex-shrink-0 transition-all duration-300
                    ${isActive ? "text-gold-500" : "text-white/40 group-hover:text-white"}
                    ${item.special && !isActive ? "text-red-500/80 group-hover:text-red-500" : ""}
                  `} 
                />

                {/* TEXT (The Kinetic Reveal) */}
                {/* Desktop: Reveals on Hover. Mobile: Hidden to save space, relies on active state or icon */}
                <div className="
                  relative overflow-hidden w-0 
                  group-hover:w-auto group-focus:w-auto
                  transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                ">
                  <span className={`
                    block pl-2 pr-1
                    text-[10px] font-mono uppercase tracking-[0.2em] whitespace-nowrap
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75
                    ${isActive ? "text-white" : "text-white/60"}
                  `}>
                    {item.label}
                  </span>
                </div>

                {/* 3. ACTIVE TEXT (Always visible IF active? Optional. Let's keep it kinetic for drama) */}
                {/* If you want the Active tab to ALWAYS show text, uncomment below and adjust logic above.
                    But "Kinetic" usually means only expand on interaction. */}

              </div>

              {/* MOBILE DOT (Since hover is hard on phones) */}
              {isActive && (
                <motion.div 
                  layoutId="kinetic-dot"
                  className="md:hidden absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#ffd700]" 
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}