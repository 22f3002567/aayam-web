
// "use client";

// import { motion } from "framer-motion";
// import { Challenge } from "@/types/schema";

// export default function TheCrucible({ challenge }: { challenge: Challenge | null }) {
//   if (!challenge) return null;

//   return (
//     <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        
//         {/* 1. THE ATMOSPHERE (Breathing Void) */}
//         {/* A subtle, moving spotlight behind the text. No cheap noise textures. */}
//         <div className="absolute inset-0 bg-[#050505]" />
//         <motion.div 
//             animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none"
//         />

//         {/* 2. THE COUNTDOWN (Small, Top Center - The only 'UI') */}
//         <div className="absolute top-32 flex flex-col items-center gap-2">
//              <span className="w-px h-12 bg-gradient-to-b from-transparent to-red-500" />
//              <span className="font-mono text-red-500 text-[10px] uppercase tracking-[0.3em]">
//                 Deadline: {new Date(challenge.deadline).toLocaleDateString()}
//              </span>
//         </div>

//         {/* 3. THE MONOLITH (Pure Typography) */}
//         <div className="relative z-10 text-center mix-blend-screen">
//             <motion.span 
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 className="block font-mono text-white/40 text-xs md:text-sm uppercase tracking-[0.6em] mb-6"
//             >
//                 The Current Directive
//             </motion.span>
            
//             <h2 className="text-[12vw] leading-[0.8] font-serif font-medium text-white tracking-tighter mb-8">
//                 {challenge.theme}
//             </h2>

//             <p className="max-w-xl mx-auto text-white/60 font-serif italic text-lg md:text-xl leading-relaxed">
//                 "{challenge.brief}"
//             </p>
//         </div>

//         {/* 4. THE INTERACTION (Minimalist Button) */}
//         <div className="mt-16">
//             <motion.button 
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full hover:border-red-500 transition-colors duration-500"
//             >
//                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//                 <span className="font-mono text-xs text-white uppercase tracking-widest group-hover:text-red-500 transition-colors">
//                     Accept Mission
//                 </span>
//             </motion.button>
//         </div>

//     </section>
//   );
// }