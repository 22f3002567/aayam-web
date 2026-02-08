// "use client";

// import { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
// import Image from "next/image";
// import { EnsembleMember } from "@/types/schema";

// // --- 1. PURE ICONS & CONSTANTS ---
// const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // THE GOD PHYSICS: Tuned for "Heavy Fluidity" (Not too bouncy, not too stiff)
// const PHYSICS = { stiffness: 120, damping: 30, restDelta: 0.001 };

// // --- 2. THE MASTER COMPONENT ---
// export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

//   // GLOBAL SCROLL ENGINE
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const fluidScroll = useSpring(scrollYProgress, PHYSICS);

//   return (
//     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden selection:bg-gold-500/30">
      
//       {/* ATMOSPHERE: The "Film Grain" Texture */}
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

//       {/* HEADER: The Genesis */}
//       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
//          <motion.div 
//             initial={{ opacity: 0, y: 50, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} // "Apple-style" ease
//             className="text-center px-6 relative z-20"
//          >
//              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
//              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
//                  The Thread<br/><span className="text-white/30">of Fate.</span>
//              </h1>
//          </motion.div>
//       </header>

//       {/* THE GLOBAL SPINE (The "Sutra") */}
//       <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
//           {/* The Gold Fill (Thermometer Effect) */}
//           <motion.div 
//              style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
//              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-300 to-white shadow-[0_0_20px_#eab308]"
//           >
//               {/* The "Leading Spark" */}
//               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
//           </motion.div>
//       </div>

//       {/* THE ENSEMBLE NODES */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
//           {members.map((member, index) => (
//               <ThreadNode 
//                 key={member.id} 
//                 member={member} 
//                 index={index} 
//                 activeAudioId={activeAudioId}
//                 setActiveAudioId={setActiveAudioId}
//               />
//           ))}
//       </div>

//       {/* FOOTER: The Destination */}
//       <TimeCapsule currentYear={currentYear} />

//     </div>
//   );
// }

// // --- 3. THE INDIVIDUAL NODE (The "Rasa") ---
// function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
//     member: EnsembleMember; 
//     index: number; 
//     activeAudioId: string | null; 
//     setActiveAudioId: (id: string | null) => void; 
// }) {
//     const isEven = index % 2 === 0;
//     const ref = useRef<HTMLDivElement>(null);
    
//     // NAVARASA LOGIC: The Soul Color
//     const RASA = member.color || "#eab308";

//     // LOCAL PHYSICS: Viewport Tracking
//     const { scrollYProgress } = useScroll({
//         target: ref,
//         offset: ["start center", "end center"] 
//     });
//     const smoothProgress = useSpring(scrollYProgress, PHYSICS);

//     // --- THE TRIGGER LOGIC (The "Snap") ---
//     // The "Ignition" happens exactly when the element hits 45% of the viewport.
//     const triggerStart = 0.45;
//     const triggerEnd = 0.50;

//     // The Animations mapped to the Scroll
//     const lineDraw = useTransform(smoothProgress, [triggerStart, triggerEnd], [0, 1]); 
//     const reveal = useTransform(smoothProgress, [triggerStart, 0.55], [0, 1]);
//     const parallaxY = useTransform(smoothProgress, [0, 1], ["8%", "-8%"]); // Subtle internal movement

//     // Audio State Handler
//     const isPlaying = activeAudioId === member.id;
//     const audioRef = useRef<HTMLAudioElement | null>(null);

//     useEffect(() => {
//         if (!audioRef.current) return;
//         if (isPlaying) audioRef.current.play().catch(() => {});
//         else audioRef.current.pause();
//     }, [isPlaying]);

//     return (
//         <motion.div 
//             ref={ref}
//             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
//         >
            
//             {/* --- A. THE JUNCTION (The Prism) --- */}
//             <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-20`}>
//                  <motion.div 
//                     style={{ 
//                         scale: useTransform(lineDraw, [0, 1], [0.5, 1]),
//                         opacity: lineDraw,
//                         // COLOR SHIFT: Starts Gold (Spine) -> Flashes White (Impact) -> Settles on Rasa (Member)
//                         backgroundColor: useTransform(lineDraw, [0, 0.5, 1], ["#eab308", "#ffffff", RASA]), 
//                         boxShadow: `0 0 20px ${RASA}`
//                     }}
//                     className="w-3 h-3 rounded-full"
//                  >
//                     {/* The Shockwave Ring */}
//                     <motion.div 
//                         style={{ 
//                             opacity: useTransform(lineDraw, [0.5, 1], [1, 0]), 
//                             scale: useTransform(lineDraw, [0, 1], [1, 4]),
//                             borderColor: RASA,
//                             borderWidth: useTransform(lineDraw, [0, 1], ["2px", "0px"]) 
//                         }}
//                         className="absolute inset-0 rounded-full border" 
//                     />
//                  </motion.div>
//             </div>

//             {/* --- B. THE HORIZONTAL NERVE (Desktop) --- */}
//             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
//                 <svg className="w-full h-full" overflow="visible">
//                     {/* Ghost Trace */}
//                     <path d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"} fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05" />
                    
//                     {/* Active Wire (Rasa Color) */}
//                     <motion.path
//                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
//                         fill="none" stroke={RASA} strokeWidth="2" strokeLinecap="round"
//                         style={{ pathLength: lineDraw }} 
//                     />

//                     {/* Traveling Photon (White Hot) */}
//                     <motion.circle 
//                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
//                         style={{ 
//                             offsetPath: `path("${isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}")`,
//                             offsetDistance: useTransform(lineDraw, (v) => `${v * 100}%`),
//                             opacity: lineDraw,
//                             scale: useTransform(lineDraw, [0, 0.1, 1], [0, 1.5, 1])
//                         }}
//                     />
//                 </svg>
//             </div>

//             {/* --- C. THE MOBILE PLUG (Responsive) --- */}
//             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
//                 <motion.div style={{ height: lineDraw, backgroundColor: RASA }} className="absolute top-0 left-0 w-full origin-top" />
//                 <motion.div style={{ scaleX: lineDraw, backgroundColor: RASA }} className="absolute top-1/2 left-0 w-8 h-px origin-left">
//                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff]" />
//                 </motion.div>
//             </div>

//             {/* --- D. THE PORTRAIT (The Destination) --- */}
//             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
//                 {/* 1. Divine Aura (Dynamic Gradient) */}
//                 <motion.div 
//                     style={{ 
//                         opacity: useTransform(reveal, [0, 1], [0, 0.6]),
//                         scale: useTransform(reveal, [0, 1], [0.8, 1.2]),
//                         background: `radial-gradient(circle at center, ${RASA}40, ${RASA}10, transparent)`
//                     }}
//                     className="absolute inset-0 rounded-full blur-[50px] z-0" 
//                 />

//                 {/* 2. The Frame */}
//                 <motion.div 
//                     style={{ 
//                         borderColor: useTransform(reveal, [0.5, 1], ["rgba(255,255,255,0.05)", RASA]),
//                         scale: useTransform(reveal, [0, 1], [0.95, 1])
//                     }}
//                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10 transition-colors duration-500"
//                 >
//                      {/* 3. The Image (Parallax) */}
//                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
//                         {member.image_url ? (
//                             <Image 
//                                 src={member.image_url} alt={member.name} fill 
//                                 className="object-cover" 
//                                 priority={index < 2} // Performance Optimization
//                             />
//                         ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
//                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
//                             </div>
//                         )}
//                         {/* B&W Filter Fade */}
//                         <motion.div 
//                             style={{ opacity: useTransform(reveal, [0, 1], [1, 0]) }}
//                             className="absolute inset-0 bg-black/90 mix-blend-saturation" 
//                         />
//                      </motion.div>

//                      {/* 4. Audio Controls */}
//                      <button 
//                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
//                         className="absolute bottom-6 right-6 z-30 group"
//                         aria-label={isPlaying ? "Stop Voice" : "Play Voice"}
//                      >
//                         {isPlaying && <span style={{ borderColor: RASA }} className="absolute inset-0 rounded-full border animate-ping opacity-50" />}
//                         <div 
//                             style={{ 
//                                 backgroundColor: isPlaying ? RASA : 'rgba(0,0,0,0.4)',
//                                 borderColor: isPlaying ? RASA : 'rgba(255,255,255,0.2)',
//                                 color: isPlaying ? '#000' : '#fff'
//                             }}
//                             className="relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300"
//                         >
//                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
//                         </div>
//                      </button>
//                 </motion.div>
//             </div>

//             {/* --- E. THE NARRATIVE (The Story) --- */}
//             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
//                 {/* Role Line */}
//                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
//                     <motion.div style={{ width: useTransform(reveal, [0, 1], [0, 40]), backgroundColor: RASA }} className="h-px" />
//                     <span style={{ color: RASA }} className="text-[10px] uppercase tracking-[0.3em] font-bold">
//                         {member.role}
//                     </span>
//                 </div>

//                 {/* Name Reveal */}
//                 <div className="overflow-hidden mb-6">
//                     <motion.h2 
//                         style={{ y: useTransform(reveal, [0, 1], ["100%", "0%"]) }}
//                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
//                     >
//                         {member.name}
//                     </motion.h2>
//                 </div>

//                 {/* Bio */}
//                 <motion.p 
//                     style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [20, 0]) }}
//                     className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
//                 >
//                     "{member.bio}"
//                 </motion.p>

//                 {/* Profile Link */}
//                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
//                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
//                         View Full Profile
//                         <span style={{ backgroundColor: RASA }} className="absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full" />
//                     </a>
//                 </div>

//             </div>
//         </motion.div>
//     );
// }

// // --- 4. THE FOOTER (Time Travel) ---
// // function TimeCapsule({ currentYear }: { currentYear: string }) {
// //     const years = ['2026', '2025', '2024', 'Faculty'];
// //     return (
// //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// //             <nav className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
// //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">Timeline</span>
// //                 {years.map(year => (
// //                     <button key={year} className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}>
// //                         {year}
// //                         {currentYear.includes(year) && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#eab308]" />}
// //                     </button>
// //                 ))}
// //             </nav>
// //         </div>
// //     );
// // }
// // --- 4. THE TIME CAPSULE (The Anchor) ---
// function TimeCapsule({ currentYear }: { currentYear: string }) {
//     const years = ['2026', '2025', '2024', 'Faculty'];
    
//     return (
//         <div className="absolute bottom-0 w-full flex flex-col items-center justify-end pb-12 z-50 pointer-events-none">
            
//             {/* THE TERMINUS (The connection point for the vertical thread) */}
//             {/* This sits exactly where the global spine ends, catching the light */}
//             <div className="relative flex flex-col items-center">
//                 {/* The Spark that hits the machine */}
//                 <div className="w-px h-16 bg-gradient-to-b from-gold-500 via-gold-500 to-transparent opacity-50" />
                
//                 {/* The Docking Port (Glow) */}
//                 <div className="absolute bottom-0 w-12 h-12 bg-gold-500/20 blur-[30px] rounded-full" />
                
//                 {/* The Physical Connector */}
//                 <div className="w-3 h-3 border border-gold-500/50 bg-[#020202] rounded-full z-10 translate-y-[50%]" />
//             </div>

//             {/* THE CHRONOMETER (The Timeline UI) */}
//             <nav className="pointer-events-auto relative mt-[-1px]">
//                 {/* Glass Panel */}
//                 <div className="bg-[#050505]/80 backdrop-blur-2xl border border-white/10 px-10 py-5 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center gap-12 group hover:border-gold-500/30 transition-colors duration-700">
                    
//                     {/* Label */}
//                     <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-8 mr-2">
//                         <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
//                         <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
//                             Temporal<br/>Archive
//                         </span>
//                     </div>

//                     {/* Years */}
//                     <div className="flex items-center gap-8">
//                         {years.map(year => {
//                             const isActive = currentYear.includes(year);
//                             return (
//                                 <button 
//                                     key={year} 
//                                     className={`relative text-[10px] md:text-xs font-mono tracking-widest transition-all duration-500 ${isActive ? 'text-gold-500 font-bold' : 'text-neutral-600 hover:text-white'}`}
//                                 >
//                                     {year}
                                    
//                                     {/* Active State Indicators */}
//                                     {isActive && (
//                                         <>
//                                             {/* Top Dot */}
//                                             <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-gold-500 rounded-full" />
//                                             {/* Bottom Glow */}
//                                             <span className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-gold-500/20 blur-[10px] -translate-y-1/2" />
//                                         </>
//                                     )}
//                                 </button>
//                             )
//                         })}
//                     </div>

//                 </div>

//                 {/* Decorative Tech Lines (Left/Right Wings) */}
//                 <div className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
//                 <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
//             </nav>
//         </div>
//     );
// }

// "use client";

// import { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useSpring, useTransform } from "framer-motion";
// import Image from "next/image";
// import { EnsembleMember } from "@/types/schema";

// // --- PURE ICONS ---
// const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // --- PHYSICS ENGINE: The "Harvard" Standard ---
// // Stiffness 120 / Damping 30 creates a "Heavy Liquid" feel. Serious, not playful.
// const PHYSICS = { stiffness: 120, damping: 30, restDelta: 0.001 };

// export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

//   // 1. GLOBAL PHYSICS
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const fluidScroll = useSpring(scrollYProgress, PHYSICS);

//   return (
//     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden">
      
//       {/* NOISE FILTER: The Cinematic Grain */}
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

//       {/* 2. HEADER */}
//       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
//          <motion.div 
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             className="text-center px-6 relative z-20"
//          >
//              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
//              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
//                  The Thread<br/><span className="text-white/30">of Fate.</span>
//              </h1>
//          </motion.div>
//       </header>

//       {/* 3. THE GLOBAL SPINE (The "Sutra") */}
//       <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
//           <motion.div 
//              style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
//              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-300 to-white shadow-[0_0_20px_#eab308]"
//           >
//               {/* The "Leading Spark" */}
//               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
//           </motion.div>
//       </div>

//       {/* 4. THE ENSEMBLE NODES */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
//           {members.map((member, index) => (
//               <ThreadNode 
//                 key={member.id} 
//                 member={member} 
//                 index={index} 
//                 activeAudioId={activeAudioId}
//                 setActiveAudioId={setActiveAudioId}
//               />
//           ))}
//       </div>

//       {/* 5. FOOTER */}
//       <TimeCapsule currentYear={currentYear} />

//     </div>
//   );
// }

// // --- INDIVIDUAL NODE ---
// function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
//     member: EnsembleMember; 
//     index: number; 
//     activeAudioId: string | null; 
//     setActiveAudioId: (id: string | null) => void; 
// }) {
//     const isEven = index % 2 === 0;
//     const ref = useRef<HTMLDivElement>(null);
    
//     // NAVARASA LOGIC
//     const RASA = member.color || "#eab308";

//     // PHYSICS: Viewport Tracking
//     const { scrollYProgress } = useScroll({
//         target: ref,
//         offset: ["start center", "end center"] 
//     });

//     const smoothProgress = useSpring(scrollYProgress, PHYSICS);

//     // --- PRECISION TIMING ---
//     // The "Snap" happens exactly at center screen.
//     const triggerStart = 0.45;
//     const triggerEnd = 0.50;

//     const lineDraw = useTransform(smoothProgress, [triggerStart, triggerEnd], [0, 1]); 
//     const reveal = useTransform(smoothProgress, [triggerStart, 0.55], [0, 1]);
//     const parallaxY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

//     // **THE 110% DETAIL: IMPACT RECOIL**
//     // When the line hits 100% (value 1), the image "bumps" slightly (scale 1.02) then settles.
//     // This makes the light feel like it has PHYSICAL FORCE.
//     const impactRecoil = useTransform(lineDraw, [0.9, 1], [1, 1.02]);

//     const isPlaying = activeAudioId === member.id;
//     const audioRef = useRef<HTMLAudioElement | null>(null);

//     useEffect(() => {
//         if (!audioRef.current) return;
//         if (isPlaying) audioRef.current.play().catch(() => {});
//         else audioRef.current.pause();
//     }, [isPlaying]);

//     return (
//         <motion.div 
//             ref={ref}
//             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
//         >
            
//             {/* --- 1. THE JUNCTION (The Prism) --- */}
//             <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-30`}>
//                  <motion.div 
//                     style={{ 
//                         scale: useTransform(lineDraw, [0, 1], [0.5, 1]),
//                         opacity: lineDraw,
//                         backgroundColor: useTransform(lineDraw, [0, 0.5, 1], ["#eab308", "#ffffff", RASA]), // Gold -> White -> Rasa
//                         boxShadow: `0 0 20px ${RASA}`
//                     }}
//                     className="w-3 h-3 rounded-full"
//                  >
//                     {/* Shockwave Ring */}
//                     <motion.div 
//                         style={{ 
//                             opacity: useTransform(lineDraw, [0.5, 1], [1, 0]), 
//                             scale: useTransform(lineDraw, [0, 1], [1, 4]),
//                             borderColor: RASA,
//                             borderWidth: useTransform(lineDraw, [0, 1], ["2px", "0px"]) 
//                         }}
//                         className="absolute inset-0 rounded-full border" 
//                     />
//                  </motion.div>
//             </div>

//             {/* --- 2. THE HORIZONTAL NERVE --- */}
//             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none z-20`}>
//                 <svg className="w-full h-full" overflow="visible">
//                     <path d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"} fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05" />
                    
//                     {/* Active Wire */}
//                     <motion.path
//                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
//                         fill="none" 
//                         stroke={RASA} 
//                         strokeWidth="2" strokeLinecap="round"
//                         style={{ pathLength: lineDraw }} 
//                     />

//                     {/* Traveling Spark */}
//                     <motion.circle 
//                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
//                         style={{ 
//                             offsetPath: `path("${isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}")`,
//                             offsetDistance: useTransform(lineDraw, (v) => `${v * 100}%`),
//                             opacity: lineDraw,
//                             scale: useTransform(lineDraw, [0, 0.1, 1], [0, 1.5, 1])
//                         }}
//                     />
//                 </svg>
//             </div>

//             {/* --- 3. MOBILE CONNECTOR --- */}
//             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
//                 <motion.div style={{ height: lineDraw, backgroundColor: RASA }} className="absolute top-0 left-0 w-full origin-top" />
//                 <motion.div style={{ scaleX: lineDraw, backgroundColor: RASA }} className="absolute top-1/2 left-0 w-8 h-px origin-left" />
//             </div>

//             {/* --- 4. THE PORTRAIT --- */}
//             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
//                 {/* Divine Aura */}
//                 <motion.div 
//                     style={{ 
//                         opacity: useTransform(reveal, [0, 1], [0, 0.6]),
//                         scale: useTransform(reveal, [0, 1], [0.8, 1.2]),
//                         background: `radial-gradient(circle at center, ${RASA}40, ${RASA}10, transparent)`
//                     }}
//                     className="absolute inset-0 rounded-full blur-[50px] z-0" 
//                 />

//                 <motion.div 
//                     style={{ 
//                         borderColor: useTransform(reveal, [0.5, 1], ["rgba(255,255,255,0.05)", RASA]),
//                         scale: impactRecoil, // The Impact Recoil applied here
//                     }}
//                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10"
//                 >
//                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
//                         {member.image_url ? (
//                             <Image src={member.image_url} alt={member.name} fill className="object-cover" priority={index < 2} />
//                         ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
//                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
//                             </div>
//                         )}
//                         <motion.div 
//                             style={{ opacity: useTransform(reveal, [0, 1], [1, 0]) }}
//                             className="absolute inset-0 bg-black/90 mix-blend-saturation" 
//                         />
//                      </motion.div>

//                      {/* Audio Button */}
//                      <button 
//                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
//                         className="absolute bottom-6 right-6 z-30 group"
//                      >
//                         {isPlaying && <span style={{ borderColor: RASA }} className="absolute inset-0 rounded-full border animate-ping opacity-50" />}
//                         <div 
//                             style={{ 
//                                 backgroundColor: isPlaying ? RASA : 'rgba(0,0,0,0.4)',
//                                 borderColor: isPlaying ? RASA : 'rgba(255,255,255,0.2)',
//                                 color: isPlaying ? '#000' : '#fff'
//                             }}
//                             className="relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300"
//                         >
//                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
//                         </div>
//                      </button>
//                 </motion.div>
//             </div>

//             {/* --- 5. THE NARRATIVE --- */}
//             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
//                 {/* Role Line */}
//                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
//                     <motion.div style={{ width: useTransform(reveal, [0, 1], [0, 40]), backgroundColor: RASA }} className="h-px" />
//                     <span style={{ color: RASA }} className="text-[10px] uppercase tracking-[0.3em] font-bold">
//                         {member.role}
//                     </span>
//                 </div>

//                 {/* Name */}
//                 <div className="overflow-hidden mb-6">
//                     <motion.h2 
//                         style={{ y: useTransform(reveal, [0, 1], ["100%", "0%"]) }}
//                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
//                     >
//                         {member.name}
//                     </motion.h2>
//                 </div>

//                 {/* Bio */}
//                 <motion.p 
//                     style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [20, 0]) }}
//                     className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
//                 >
//                     "{member.bio}"
//                 </motion.p>

//                 {/* Link */}
//                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
//                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
//                         View Full Profile
//                         <span style={{ backgroundColor: RASA }} className="absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full" />
//                     </a>
//                 </div>

//             </div>
//         </motion.div>
//     );
// }

// // --- FOOTER ---
// function TimeCapsule({ currentYear }: { currentYear: string }) {
//     const years = ['2026', '2025', '2024', 'Faculty'];
//     return (
//         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
//             <nav className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
//                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">Timeline</span>
//                 {years.map(year => (
//                     <button key={year} className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}>
//                         {year}
//                         {currentYear.includes(year) && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#eab308]" />}
//                     </button>
//                 ))}
//             </nav>
//         </div>
//     );
// }


// "use client";

// import { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
// import Image from "next/image";
// import { EnsembleMember } from "@/types/schema";

// // --- 1. PURE ICONS & CONSTANTS ---
// const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // THE GOD PHYSICS: Tuned for "Heavy Fluidity" (Not too bouncy, not too stiff)
// const PHYSICS = { stiffness: 120, damping: 30, restDelta: 0.001 };

// // --- 2. THE MASTER COMPONENT ---
// export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

//   // GLOBAL SCROLL ENGINE
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const fluidScroll = useSpring(scrollYProgress, PHYSICS);

//   return (
//     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden selection:bg-gold-500/30">
      
//       {/* ATMOSPHERE: The "Film Grain" Texture */}
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

//       {/* HEADER: The Genesis */}
//       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
//          <motion.div 
//             initial={{ opacity: 0, y: 50, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} // "Apple-style" ease
//             className="text-center px-6 relative z-20"
//          >
//              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
//              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
//                  The Thread<br/><span className="text-white/30">of Fate.</span>
//              </h1>
//          </motion.div>
//       </header>

//       {/* THE GLOBAL SPINE (The "Sutra") */}
//       <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
//           {/* The Gold Fill (Thermometer Effect) */}
//           <motion.div 
//              style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
//              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-300 to-white shadow-[0_0_20px_#eab308]"
//           >
//               {/* The "Leading Spark" */}
//               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
//           </motion.div>
//       </div>

//       {/* THE ENSEMBLE NODES */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
//           {members.map((member, index) => (
//               <ThreadNode 
//                 key={member.id} 
//                 member={member} 
//                 index={index} 
//                 activeAudioId={activeAudioId}
//                 setActiveAudioId={setActiveAudioId}
//               />
//           ))}
//       </div>

//       {/* FOOTER: The Destination */}
//       <TimeCapsule currentYear={currentYear} />

//     </div>
//   );
// }

// // --- 3. THE INDIVIDUAL NODE (The "Rasa") ---
// function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
//     member: EnsembleMember; 
//     index: number; 
//     activeAudioId: string | null; 
//     setActiveAudioId: (id: string | null) => void; 
// }) {
//     const isEven = index % 2 === 0;
//     const ref = useRef<HTMLDivElement>(null);
    
//     // NAVARASA LOGIC: The Soul Color
//     const RASA = member.color || "#eab308";

//     // LOCAL PHYSICS: Viewport Tracking
//     const { scrollYProgress } = useScroll({
//         target: ref,
//         offset: ["start center", "end center"] 
//     });
//     const smoothProgress = useSpring(scrollYProgress, PHYSICS);

//     // --- THE TRIGGER LOGIC (The "Snap") ---
//     // The "Ignition" happens exactly when the element hits 45% of the viewport.
//     const triggerStart = 0.45;
//     const triggerEnd = 0.50;

//     // The Animations mapped to the Scroll
//     const lineDraw = useTransform(smoothProgress, [triggerStart, triggerEnd], [0, 1]); 
//     const reveal = useTransform(smoothProgress, [triggerStart, 0.55], [0, 1]);
//     const parallaxY = useTransform(smoothProgress, [0, 1], ["8%", "-8%"]); // Subtle internal movement

//     // Audio State Handler
//     const isPlaying = activeAudioId === member.id;
//     const audioRef = useRef<HTMLAudioElement | null>(null);

//     useEffect(() => {
//         if (!audioRef.current) return;
//         if (isPlaying) audioRef.current.play().catch(() => {});
//         else audioRef.current.pause();
//     }, [isPlaying]);

//     return (
//         <motion.div 
//             ref={ref}
//             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
//         >
            
//             {/* --- A. THE JUNCTION (The Prism) --- */}
//             <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-20`}>
//                  <motion.div 
//                     style={{ 
//                         scale: useTransform(lineDraw, [0, 1], [0.5, 1]),
//                         opacity: lineDraw,
//                         // COLOR SHIFT: Starts Gold (Spine) -> Flashes White (Impact) -> Settles on Rasa (Member)
//                         backgroundColor: useTransform(lineDraw, [0, 0.5, 1], ["#eab308", "#ffffff", RASA]), 
//                         boxShadow: `0 0 20px ${RASA}`
//                     }}
//                     className="w-3 h-3 rounded-full"
//                  >
//                     {/* The Shockwave Ring */}
//                     <motion.div 
//                         style={{ 
//                             opacity: useTransform(lineDraw, [0.5, 1], [1, 0]), 
//                             scale: useTransform(lineDraw, [0, 1], [1, 4]),
//                             borderColor: RASA,
//                             borderWidth: useTransform(lineDraw, [0, 1], ["2px", "0px"]) 
//                         }}
//                         className="absolute inset-0 rounded-full border" 
//                     />
//                  </motion.div>
//             </div>

//             {/* --- B. THE HORIZONTAL NERVE (Desktop) --- */}
//             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
//                 <svg className="w-full h-full" overflow="visible">
//                     {/* Ghost Trace */}
//                     <path d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"} fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05" />
                    
//                     {/* Active Wire (Rasa Color) */}
//                     <motion.path
//                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
//                         fill="none" stroke={RASA} strokeWidth="2" strokeLinecap="round"
//                         style={{ pathLength: lineDraw }} 
//                     />

//                     {/* Traveling Photon (White Hot) */}
//                     <motion.circle 
//                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
//                         style={{ 
//                             offsetPath: `path("${isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}")`,
//                             offsetDistance: useTransform(lineDraw, (v) => `${v * 100}%`),
//                             opacity: lineDraw,
//                             scale: useTransform(lineDraw, [0, 0.1, 1], [0, 1.5, 1])
//                         }}
//                     />
//                 </svg>
//             </div>

//             {/* --- C. THE MOBILE PLUG (Responsive) --- */}
//             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
//                 <motion.div style={{ height: lineDraw, backgroundColor: RASA }} className="absolute top-0 left-0 w-full origin-top" />
//                 <motion.div style={{ scaleX: lineDraw, backgroundColor: RASA }} className="absolute top-1/2 left-0 w-8 h-px origin-left">
//                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff]" />
//                 </motion.div>
//             </div>

//             {/* --- D. THE PORTRAIT (The Destination) --- */}
//             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
//                 {/* 1. Divine Aura (Dynamic Gradient) */}
//                 <motion.div 
//                     style={{ 
//                         opacity: useTransform(reveal, [0, 1], [0, 0.6]),
//                         scale: useTransform(reveal, [0, 1], [0.8, 1.2]),
//                         background: `radial-gradient(circle at center, ${RASA}40, ${RASA}10, transparent)`
//                     }}
//                     className="absolute inset-0 rounded-full blur-[50px] z-0" 
//                 />

//                 {/* 2. The Frame */}
//                 <motion.div 
//                     style={{ 
//                         borderColor: useTransform(reveal, [0.5, 1], ["rgba(255,255,255,0.05)", RASA]),
//                         scale: useTransform(reveal, [0, 1], [0.95, 1])
//                     }}
//                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10 transition-colors duration-500"
//                 >
//                      {/* 3. The Image (Parallax) */}
//                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
//                         {member.image_url ? (
//                             <Image 
//                                 src={member.image_url} alt={member.name} fill 
//                                 className="object-cover" 
//                                 priority={index < 2} // Performance Optimization
//                             />
//                         ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
//                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
//                             </div>
//                         )}
//                         {/* B&W Filter Fade */}
//                         <motion.div 
//                             style={{ opacity: useTransform(reveal, [0, 1], [1, 0]) }}
//                             className="absolute inset-0 bg-black/90 mix-blend-saturation" 
//                         />
//                      </motion.div>

//                      {/* 4. Audio Controls */}
//                      <button 
//                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
//                         className="absolute bottom-6 right-6 z-30 group"
//                         aria-label={isPlaying ? "Stop Voice" : "Play Voice"}
//                      >
//                         {isPlaying && <span style={{ borderColor: RASA }} className="absolute inset-0 rounded-full border animate-ping opacity-50" />}
//                         <div 
//                             style={{ 
//                                 backgroundColor: isPlaying ? RASA : 'rgba(0,0,0,0.4)',
//                                 borderColor: isPlaying ? RASA : 'rgba(255,255,255,0.2)',
//                                 color: isPlaying ? '#000' : '#fff'
//                             }}
//                             className="relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300"
//                         >
//                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
//                         </div>
//                      </button>
//                 </motion.div>
//             </div>

//             {/* --- E. THE NARRATIVE (The Story) --- */}
//             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
//                 {/* Role Line */}
//                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
//                     <motion.div style={{ width: useTransform(reveal, [0, 1], [0, 40]), backgroundColor: RASA }} className="h-px" />
//                     <span style={{ color: RASA }} className="text-[10px] uppercase tracking-[0.3em] font-bold">
//                         {member.role}
//                     </span>
//                 </div>

//                 {/* Name Reveal */}
//                 <div className="overflow-hidden mb-6">
//                     <motion.h2 
//                         style={{ y: useTransform(reveal, [0, 1], ["100%", "0%"]) }}
//                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
//                     >
//                         {member.name}
//                     </motion.h2>
//                 </div>

//                 {/* Bio */}
//                 <motion.p 
//                     style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [20, 0]) }}
//                     className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
//                 >
//                     "{member.bio}"
//                 </motion.p>

//                 {/* Profile Link */}
//                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
//                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
//                         View Full Profile
//                         <span style={{ backgroundColor: RASA }} className="absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full" />
//                     </a>
//                 </div>

//             </div>
//         </motion.div>
//     );
// }

// // --- 4. THE FOOTER (Time Travel) ---
// // function TimeCapsule({ currentYear }: { currentYear: string }) {
// //     const years = ['2026', '2025', '2024', 'Faculty'];
// //     return (
// //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// //             <nav className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
// //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">Timeline</span>
// //                 {years.map(year => (
// //                     <button key={year} className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}>
// //                         {year}
// //                         {currentYear.includes(year) && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#eab308]" />}
// //                     </button>
// //                 ))}
// //             </nav>
// //         </div>
// //     );
// // }
// // --- 4. THE TIME CAPSULE (The Anchor) ---
// function TimeCapsule({ currentYear, }: { currentYear: string }) {
//     const years = ['2026', '2025', '2024', 'Faculty'];
    
//     return (
//         <div className="absolute bottom-0 w-full flex flex-col items-center justify-end pb-12 z-50 pointer-events-none">
            
//             {/* THE TERMINUS (The connection point for the vertical thread) */}
//             {/* This sits exactly where the global spine ends, catching the light */}
//             <div className="relative flex flex-col items-center">
//                 {/* The Spark that hits the machine */}
//                 <div className="w-px h-16 bg-gradient-to-b from-gold-500 via-gold-500 to-transparent opacity-50" />
                
//                 {/* The Docking Port (Glow) */}
//                 <div className="absolute bottom-0 w-12 h-12 bg-gold-500/20 blur-[30px] rounded-full" />
                
//                 {/* The Physical Connector */}
//                 <div className="w-3 h-3 border border-gold-500/50 bg-[#020202] rounded-full z-10 translate-y-[50%]" />
//             </div>

//             {/* THE CHRONOMETER (The Timeline UI) */}
//             <nav className="pointer-events-auto relative mt-[-1px]">
//                 {/* Glass Panel */}
//                 <div className="bg-[#050505]/80 backdrop-blur-2xl border border-white/10 px-10 py-5 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center gap-12 group hover:border-gold-500/30 transition-colors duration-700">
                    
//                     {/* Label */}
//                     <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-8 mr-2">
//                         <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
//                         <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
//                             Temporal<br/>Archive
//                         </span>
//                     </div>

//                     {/* Years */}
//                     <div className="flex items-center gap-8">
//                         {years.map(year => {
//                             const isActive = currentYear.includes(year);
//                             return (
//                                 <button 
//                                     key={year} 
//                                     className={`relative text-[10px] md:text-xs font-mono tracking-widest transition-all duration-500 ${isActive ? 'text-gold-500 font-bold' : 'text-neutral-600 hover:text-white'}`}
//                                 >
//                                     {year}
                                    
//                                     {/* Active State Indicators */}
//                                     {isActive && (
//                                         <>
//                                             {/* Top Dot */}
//                                             <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-gold-500 rounded-full" />
//                                             {/* Bottom Glow */}
//                                             <span className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-gold-500/20 blur-[10px] -translate-y-1/2" />
//                                         </>
//                                     )}
//                                 </button>
//                             )
//                         })}
//                     </div>

//                 </div>

//                 {/* Decorative Tech Lines (Left/Right Wings) */}
//                 <div className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
//                 <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
//             </nav>
//         </div>
//     );
// }



// "use client";

// import { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
// import Image from "next/image";
// import { EnsembleMember } from "@/types/schema";
// import Link from "next/link";
// import { label } from "framer-motion/client";

// // --- 1. PURE ICONS & CONSTANTS ---
// const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // THE GOD PHYSICS: Tuned for "Heavy Fluidity" (Not too bouncy, not too stiff)
// const PHYSICS = { stiffness: 120, damping: 30, restDelta: 0.001 };

// // --- 2. THE MASTER COMPONENT ---
// export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

//   // GLOBAL SCROLL ENGINE
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   const fluidScroll = useSpring(scrollYProgress, PHYSICS);

//   return (
//     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden selection:bg-gold-500/30">
      
//       {/* ATMOSPHERE: The "Film Grain" Texture */}
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

//       {/* HEADER: The Genesis */}
//       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
//          <motion.div 
//             initial={{ opacity: 0, y: 50, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} // "Apple-style" ease
//             className="text-center px-6 relative z-20"
//          >
//              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
//              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
//                  The Thread<br/><span className="text-white/30">of Fate.</span>
//              </h1>
//          </motion.div>
//       </header>

//       {/* THE GLOBAL SPINE (The "Sutra") */}
//       <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
//           {/* The Gold Fill (Thermometer Effect) */}
//           <motion.div 
//              style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
//              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-300 to-white shadow-[0_0_20px_#eab308]"
//           >
//               {/* The "Leading Spark" */}
//               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
//           </motion.div>
//       </div>

//       {/* THE ENSEMBLE NODES */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
//           {members.map((member, index) => (
//               <ThreadNode 
//                 key={member.id} 
//                 member={member} 
//                 index={index} 
//                 activeAudioId={activeAudioId}
//                 setActiveAudioId={setActiveAudioId}
//               />
//           ))}
//       </div>

//       {/* FOOTER: The Destination (Now Connected to Physics) */}
//       <TimeCapsule currentYear={currentYear} scrollProgress={fluidScroll} />

//     </div>
//   );
// }

// // --- 3. THE INDIVIDUAL NODE (The "Rasa") ---
// function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
//     member: EnsembleMember; 
//     index: number; 
//     activeAudioId: string | null; 
//     setActiveAudioId: (id: string | null) => void; 
// }) {
//     const isEven = index % 2 === 0;
//     const ref = useRef<HTMLDivElement>(null);
    
//     // NAVARASA LOGIC: The Soul Color
//     const RASA = member.color || "#eab308";

//     // LOCAL PHYSICS: Viewport Tracking
//     const { scrollYProgress } = useScroll({
//         target: ref,
//         offset: ["start center", "end center"] 
//     });
//     const smoothProgress = useSpring(scrollYProgress, PHYSICS);

//     // --- THE TRIGGER LOGIC (The "Snap") ---
//     const triggerStart = 0.45;
//     const triggerEnd = 0.50;

//     // The Animations mapped to the Scroll
//     const lineDraw = useTransform(smoothProgress, [triggerStart, triggerEnd], [0, 1]); 
//     const reveal = useTransform(smoothProgress, [triggerStart, 0.55], [0, 1]);
//     const parallaxY = useTransform(smoothProgress, [0, 1], ["8%", "-8%"]);
    
//     // IMPACT RECOIL (The 110% Polish)
//     const impactRecoil = useTransform(lineDraw, [0.9, 1], [1, 1.02]);

//     // Audio State Handler
//     const isPlaying = activeAudioId === member.id;
//     const audioRef = useRef<HTMLAudioElement | null>(null);

//     useEffect(() => {
//         if (!audioRef.current) return;
//         if (isPlaying) audioRef.current.play().catch(() => {});
//         else audioRef.current.pause();
//     }, [isPlaying]);

//     return (
//         <motion.div 
//             ref={ref}
//             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
//         >
            
//             {/* --- A. THE JUNCTION (The Prism) --- */}
//             <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-20`}>
//                  <motion.div 
//                     style={{ 
//                         scale: useTransform(lineDraw, [0, 1], [0.5, 1]),
//                         opacity: lineDraw,
//                         // COLOR SHIFT: Starts Gold (Spine) -> Flashes White (Impact) -> Settles on Rasa (Member)
//                         backgroundColor: useTransform(lineDraw, [0, 0.5, 1], ["#eab308", "#ffffff", RASA]), 
//                         boxShadow: `0 0 20px ${RASA}`
//                     }}
//                     className="w-3 h-3 rounded-full"
//                  >
//                     {/* The Shockwave Ring */}
//                     <motion.div 
//                         style={{ 
//                             opacity: useTransform(lineDraw, [0.5, 1], [1, 0]), 
//                             scale: useTransform(lineDraw, [0, 1], [1, 4]),
//                             borderColor: RASA,
//                             borderWidth: useTransform(lineDraw, [0, 1], ["2px", "0px"]) 
//                         }}
//                         className="absolute inset-0 rounded-full border" 
//                     />
//                  </motion.div>
//             </div>

//             {/* --- B. THE HORIZONTAL NERVE (Desktop) --- */}
//             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
//                 <svg className="w-full h-full" overflow="visible">
//                     {/* Ghost Trace */}
//                     <path d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"} fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05" />
                    
//                     {/* Active Wire (Rasa Color) */}
//                     <motion.path
//                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
//                         fill="none" stroke={RASA} strokeWidth="2" strokeLinecap="round"
//                         style={{ pathLength: lineDraw }} 
//                     />

//                     {/* Traveling Photon (White Hot) */}
//                     <motion.circle 
//                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
//                         style={{ 
//                             offsetPath: `path("${isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}")`,
//                             offsetDistance: useTransform(lineDraw, (v) => `${v * 100}%`),
//                             opacity: lineDraw,
//                             scale: useTransform(lineDraw, [0, 0.1, 1], [0, 1.5, 1])
//                         }}
//                     />
//                 </svg>
//             </div>

//             {/* --- C. THE MOBILE PLUG (Responsive) --- */}
//             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
//                 <motion.div style={{ height: lineDraw, backgroundColor: RASA }} className="absolute top-0 left-0 w-full origin-top" />
//                 <motion.div style={{ scaleX: lineDraw, backgroundColor: RASA }} className="absolute top-1/2 left-0 w-8 h-px origin-left">
//                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff]" />
//                 </motion.div>
//             </div>

//             {/* --- D. THE PORTRAIT (The Destination) --- */}
//             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
//                 {/* 1. Divine Aura (Dynamic Gradient) */}
//                 <motion.div 
//                     style={{ 
//                         opacity: useTransform(reveal, [0, 1], [0, 0.6]),
//                         scale: useTransform(reveal, [0, 1], [0.8, 1.2]),
//                         background: `radial-gradient(circle at center, ${RASA}40, ${RASA}10, transparent)`
//                     }}
//                     className="absolute inset-0 rounded-full blur-[50px] z-0" 
//                 />

//                 {/* 2. The Frame */}
//                 <motion.div 
//                     style={{ 
//                         borderColor: useTransform(reveal, [0.5, 1], ["rgba(255,255,255,0.05)", RASA]),
//                         scale: impactRecoil
//                     }}
//                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10 transition-colors duration-500"
//                 >
//                      {/* 3. The Image (Parallax) */}
//                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
//                         {member.image_url ? (
//                             <Image 
//                                 src={member.image_url} alt={member.name} fill 
//                                 className="object-cover" 
//                                 priority={index < 2} // Performance Optimization
//                             />
//                         ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
//                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
//                             </div>
//                         )}
//                         {/* B&W Filter Fade */}
//                         <motion.div 
//                             style={{ opacity: useTransform(reveal, [0, 1], [1, 0]) }}
//                             className="absolute inset-0 bg-black/90 mix-blend-saturation" 
//                         />
//                      </motion.div>

//                      {/* 4. Audio Controls */}
//                      <button 
//                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
//                         className="absolute bottom-6 right-6 z-30 group"
//                         aria-label={isPlaying ? "Stop Voice" : "Play Voice"}
//                      >
//                         {isPlaying && <span style={{ borderColor: RASA }} className="absolute inset-0 rounded-full border animate-ping opacity-50" />}
//                         <div 
//                             style={{ 
//                                 backgroundColor: isPlaying ? RASA : 'rgba(0,0,0,0.4)',
//                                 borderColor: isPlaying ? RASA : 'rgba(255,255,255,0.2)',
//                                 color: isPlaying ? '#000' : '#fff'
//                             }}
//                             className="relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300"
//                         >
//                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
//                         </div>
//                      </button>
//                 </motion.div>
//             </div>

//             {/* --- E. THE NARRATIVE (The Story) --- */}
//             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
//                 {/* Role Line */}
//                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
//                     <motion.div style={{ width: useTransform(reveal, [0, 1], [0, 40]), backgroundColor: RASA }} className="h-px" />
//                     <span style={{ color: RASA }} className="text-[10px] uppercase tracking-[0.3em] font-bold">
//                         {member.role}
//                     </span>
//                 </div>

//                 {/* Name Reveal */}
//                 <div className="overflow-hidden mb-6">
//                     <motion.h2 
//                         style={{ y: useTransform(reveal, [0, 1], ["100%", "0%"]) }}
//                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
//                     >
//                         {member.name}
//                     </motion.h2>
//                 </div>

//                 {/* Bio */}
//                 <motion.p 
//                     style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [20, 0]) }}
//                     className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
//                 >
//                     "{member.bio}"
//                 </motion.p>

//                 {/* Profile Link */}
//                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
//                     {/* <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2"> */}
//                     <a href={`/ensemble/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
//                         View Full Profile
//                         <span style={{ backgroundColor: RASA }} className="absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full" />
//                     </a>
//                 </div>

//             </div>
//         </motion.div>
//     );
// }

// // --- 4. THE TIME CAPSULE (The Active Anchor) ---
// function TimeCapsule({ currentYear, scrollProgress }: { currentYear: string, scrollProgress: MotionValue<number> }) {
//     // const years = ['2026', '2025', '2024', 'Faculty'];

//     const years = [
//         { label: '2026', value: '2025-2026' },
//         { label: '2025', value: '2024-2025' },
//         { label: '2024', value: '2023-2024' },
//         { label: '2023', value: '2022-2023' },
//         { label: 'Faculty', value: 'Faculty' }

//     ];

//     // TRIGGER LOGIC: 
//     // The "Landing" happens in the last 5% of the page scroll.
//     const arrival = useTransform(scrollProgress, [0.95, 1], [0, 1]);
    
//     // 1. The Vertical Beam (Shoots down)
//     const beamHeight = useTransform(arrival, [0, 1], ["0%", "100%"]);
    
//     // 2. The Impact Flash (Explodes on contact)
//     const impactFlash = useTransform(arrival, [0.8, 1], [0, 1]);
    
//     // 3. The Machine Power-Up (Glows after impact)
//     const machineGlow = useTransform(arrival, [0.9, 1], ["rgba(255,255,255,0.05)", "rgba(234,179,8,0.2)"]);
//     const borderGlow = useTransform(arrival, [0.9, 1], ["rgba(255,255,255,0.1)", "rgba(234,179,8,0.5)"]);

//     return (
//         <div className="absolute bottom-0 w-full flex flex-col items-center justify-end pb-12 z-50 pointer-events-none">
            
//             {/* A. THE CONNECTOR (The Umbilical Cord) */}
//             <div className="relative h-24 w-px bg-white/5 mb-[-1px] overflow-visible">
//                 {/* The Active Beam */}
//                 <motion.div 
//                     style={{ height: beamHeight }}
//                     className="absolute top-0 left-0 w-full bg-gold-500 shadow-[0_0_20px_#eab308]"
//                 />
//                 {/* The Spark at the tip */}
//                 <motion.div 
//                     style={{ top: beamHeight, opacity: arrival }}
//                     className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff] -translate-y-1/2 z-20"
//                 />
//             </div>
            
//             {/* B. THE DOCKING PORT (The Receiver) */}
//             <div className="relative flex flex-col items-center z-20">
//                 {/* The Physical Ring */}
//                 <motion.div 
//                     style={{ 
//                         borderColor: borderGlow,
//                         backgroundColor: useTransform(arrival, [0.9, 1], ["#020202", "#eab308"]), // Turns Gold on impact
//                         scale: useTransform(arrival, [0.9, 1], [1, 1.2]) 
//                     }}
//                     className="w-4 h-4 rounded-full border bg-[#020202] z-20 transition-colors"
//                 >
//                     {/* The Shockwave Explosion */}
//                     <motion.div 
//                         style={{ 
//                             opacity: useTransform(arrival, [0.9, 1], [0, 1]), 
//                             scale: useTransform(arrival, [0.9, 1], [0.5, 3]),
//                             borderWidth: useTransform(arrival, [0.9, 1], ["2px", "0px"]) 
//                         }}
//                         className="absolute inset-0 rounded-full border border-white" 
//                     />
//                 </motion.div>

//                 {/* The Ambient Energy Cloud */}
//                 <motion.div 
//                     style={{ opacity: impactFlash, scale: useTransform(arrival, [0, 1], [0.5, 1.5]) }}
//                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gold-500/30 blur-[40px] rounded-full z-0" 
//                 />
//             </div>

//             {/* C. THE CHRONOMETER (The Timeline UI) */}
//             <nav className="pointer-events-auto relative mt-[-8px] z-10">
//                 {/* The Glass Capsule */}
//                 <motion.div 
//                     style={{ 
//                         backgroundColor: machineGlow, // Lights up internally
//                         borderColor: borderGlow,      // Border energizes
//                         boxShadow: useTransform(arrival, [0, 1], ["0 0 0px transparent", "0 0 40px rgba(234,179,8,0.15)"])
//                     }}
//                     className="backdrop-blur-2xl border px-10 py-5 rounded-full flex items-center gap-12 group transition-all duration-300"
//                 >
                    
//                     {/* Label */}
//                     <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-8 mr-2">
//                         <motion.span 
//                             animate={{ opacity: [0.5, 1, 0.5] }}
//                             transition={{ duration: 2, repeat: Infinity }}
//                             className="w-1.5 h-1.5 bg-gold-500 rounded-full" 
//                         />
//                         <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
//                             Temporal<br/>Archive
//                         </span>
//                     </div>

//                     {/* Years */}
//                     <div className="flex items-center gap-8">
//                         {years.map(year => {
//                             const isActive = currentYear.includes(year);
//                             return (
//                                 <button 
//                                     key={year} 
//                                     className={`relative text-[10px] md:text-xs font-mono tracking-widest transition-all duration-500 ${isActive ? 'text-gold-500 font-bold' : 'text-neutral-600 hover:text-white'}`}
//                                 >
//                                     {year}
//                                     {isActive && (
//                                         <>
//                                             <motion.span layoutId="activeYearDot" className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-gold-500 rounded-full" />
//                                             <motion.span 
//                                                 layoutId="activeYearGlow"
//                                                 className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-6 bg-gold-500/20 blur-[15px] -translate-y-1/2" 
//                                             />
//                                         </>
//                                     )}
//                                 </button>
//                             )
//                         })}
//                     </div>

//                 </motion.div>

//                 {/* Tech Wings (Retract when active) */}
//                 <motion.div style={{ width: useTransform(arrival, [0, 1], [48, 0]), opacity: useTransform(arrival, [0, 1], [1, 0]) }} className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 h-px bg-gradient-to-r from-transparent to-white/10" />
//                 <motion.div style={{ width: useTransform(arrival, [0, 1], [48, 0]), opacity: useTransform(arrival, [0, 1], [1, 0]) }} className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 h-px bg-gradient-to-l from-transparent to-white/10" />
//             </nav>
//         </div>
//     );
// }



"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { EnsembleMember } from "@/types/schema";
import Link from "next/link";
import { label } from "framer-motion/client";
import { getAcademicYears } from "@/lib/utils";

// --- 1. PURE ICONS & CONSTANTS ---
const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// THE GOD PHYSICS: Tuned for "Heavy Fluidity" (Not too bouncy, not too stiff)
const PHYSICS = { stiffness: 120, damping: 30, restDelta: 0.001 };

// --- 2. THE MASTER COMPONENT ---
export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  // GLOBAL SCROLL ENGINE
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const fluidScroll = useSpring(scrollYProgress, PHYSICS);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden selection:bg-gold-500/30">
      
      {/* ATMOSPHERE: The "Film Grain" Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

      {/* HEADER: The Genesis */}
      <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
         <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} // "Apple-style" ease
            className="text-center px-6 relative z-20"
         >
             <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
             <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
                 The Thread<br/><span className="text-white/30">of Fate.</span>
             </h1>
         </motion.div>
      </header>

      {/* THE GLOBAL SPINE (The "Sutra") */}
      <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
          {/* The Gold Fill (Thermometer Effect) */}
          <motion.div 
             style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
             className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-300 to-white shadow-[0_0_20px_#eab308]"
          >
              {/* The "Leading Spark" */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
          </motion.div>
      </div>

      {/* THE ENSEMBLE NODES */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
          {members.map((member, index) => (
              <ThreadNode 
                key={member.id} 
                member={member} 
                index={index} 
                activeAudioId={activeAudioId}
                setActiveAudioId={setActiveAudioId}
              />
          ))}
      </div>

      {/* FOOTER: The Destination (Now Connected to Physics) */}
      <TimeCapsule currentYear={currentYear} scrollProgress={fluidScroll} />

    </div>
  );
}

// --- 3. THE INDIVIDUAL NODE (The "Rasa") ---
function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
    member: EnsembleMember; 
    index: number; 
    activeAudioId: string | null; 
    setActiveAudioId: (id: string | null) => void; 
}) {
    const isEven = index % 2 === 0;
    const ref = useRef<HTMLDivElement>(null);
    
    // NAVARASA LOGIC: The Soul Color
    const RASA = member.color || "#eab308";

    // LOCAL PHYSICS: Viewport Tracking
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"] 
    });
    const smoothProgress = useSpring(scrollYProgress, PHYSICS);

    // --- THE TRIGGER LOGIC (The "Snap") ---
    const triggerStart = 0.45;
    const triggerEnd = 0.50;

    // The Animations mapped to the Scroll
    const lineDraw = useTransform(smoothProgress, [triggerStart, triggerEnd], [0, 1]); 
    const reveal = useTransform(smoothProgress, [triggerStart, 0.55], [0, 1]);
    const parallaxY = useTransform(smoothProgress, [0, 1], ["8%", "-8%"]);
    
    // IMPACT RECOIL (The 110% Polish)
    const impactRecoil = useTransform(lineDraw, [0.9, 1], [1, 1.02]);

    // Audio State Handler
    const isPlaying = activeAudioId === member.id;
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) audioRef.current.play().catch(() => {});
        else audioRef.current.pause();
    }, [isPlaying]);

    return (
        <motion.div 
            ref={ref}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
        >
            
            {/* --- A. THE JUNCTION (The Prism) --- */}
            <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-20`}>
                 <motion.div 
                    style={{ 
                        scale: useTransform(lineDraw, [0, 1], [0.5, 1]),
                        opacity: lineDraw,
                        // COLOR SHIFT: Starts Gold (Spine) -> Flashes White (Impact) -> Settles on Rasa (Member)
                        backgroundColor: useTransform(lineDraw, [0, 0.5, 1], ["#eab308", "#ffffff", RASA]), 
                        boxShadow: `0 0 20px ${RASA}`
                    }}
                    className="w-3 h-3 rounded-full"
                 >
                    {/* The Shockwave Ring */}
                    <motion.div 
                        style={{ 
                            opacity: useTransform(lineDraw, [0.5, 1], [1, 0]), 
                            scale: useTransform(lineDraw, [0, 1], [1, 4]),
                            borderColor: RASA,
                            borderWidth: useTransform(lineDraw, [0, 1], ["2px", "0px"]) 
                        }}
                        className="absolute inset-0 rounded-full border" 
                    />
                 </motion.div>
            </div>

            {/* --- B. THE HORIZONTAL NERVE (Desktop) --- */}
            <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
                <svg className="w-full h-full" overflow="visible">
                    {/* Ghost Trace */}
                    <path d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"} fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05" />
                    
                    {/* Active Wire (Rasa Color) */}
                    <motion.path
                        d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
                        fill="none" stroke={RASA} strokeWidth="2" strokeLinecap="round"
                        style={{ pathLength: lineDraw }} 
                    />

                    {/* Traveling Photon (White Hot) */}
                    <motion.circle 
                        cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
                        style={{ 
                            offsetPath: `path("${isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}")`,
                            offsetDistance: useTransform(lineDraw, (v) => `${v * 100}%`),
                            opacity: lineDraw,
                            scale: useTransform(lineDraw, [0, 0.1, 1], [0, 1.5, 1])
                        }}
                    />
                </svg>
            </div>

            {/* --- C. THE MOBILE PLUG (Responsive) --- */}
            <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
                <motion.div style={{ height: lineDraw, backgroundColor: RASA }} className="absolute top-0 left-0 w-full origin-top" />
                <motion.div style={{ scaleX: lineDraw, backgroundColor: RASA }} className="absolute top-1/2 left-0 w-8 h-px origin-left">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff]" />
                </motion.div>
            </div>

            {/* --- D. THE PORTRAIT (The Destination) --- */}
            <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
                {/* 1. Divine Aura (Dynamic Gradient) */}
                <motion.div 
                    style={{ 
                        opacity: useTransform(reveal, [0, 1], [0, 0.6]),
                        scale: useTransform(reveal, [0, 1], [0.8, 1.2]),
                        background: `radial-gradient(circle at center, ${RASA}40, ${RASA}10, transparent)`
                    }}
                    className="absolute inset-0 rounded-full blur-[50px] z-0" 
                />

                {/* 2. The Frame */}
                <motion.div 
                    style={{ 
                        borderColor: useTransform(reveal, [0.5, 1], ["rgba(255,255,255,0.05)", RASA]),
                        scale: impactRecoil
                    }}
                    className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10 transition-colors duration-500"
                >
                     {/* 3. The Image (Parallax) */}
                     <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                        {member.image_url ? (
                            <Image 
                                src={member.image_url} alt={member.name} fill 
                                className="object-cover" 
                                priority={index < 2} // Performance Optimization
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
                                <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
                            </div>
                        )}
                        {/* B&W Filter Fade */}
                        <motion.div 
                            style={{ opacity: useTransform(reveal, [0, 1], [1, 0]) }}
                            className="absolute inset-0 bg-black/90 mix-blend-saturation" 
                        />
                     </motion.div>

                     {/* 4. Audio Controls */}
                     <button 
                        onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
                        className="absolute bottom-6 right-6 z-30 group"
                        aria-label={isPlaying ? "Stop Voice" : "Play Voice"}
                     >
                        {isPlaying && <span style={{ borderColor: RASA }} className="absolute inset-0 rounded-full border animate-ping opacity-50" />}
                        <div 
                            style={{ 
                                backgroundColor: isPlaying ? RASA : 'rgba(0,0,0,0.4)',
                                borderColor: isPlaying ? RASA : 'rgba(255,255,255,0.2)',
                                color: isPlaying ? '#000' : '#fff'
                            }}
                            className="relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300"
                        >
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </div>
                     </button>
                </motion.div>
            </div>

            {/* --- E. THE NARRATIVE (The Story) --- */}
            <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
                {/* Role Line */}
                <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
                    <motion.div style={{ width: useTransform(reveal, [0, 1], [0, 40]), backgroundColor: RASA }} className="h-px" />
                    <span style={{ color: RASA }} className="text-[10px] uppercase tracking-[0.3em] font-bold">
                        {member.role}
                    </span>
                </div>

                {/* Name Reveal */}
                <div className="overflow-hidden mb-6">
                    <motion.h2 
                        style={{ y: useTransform(reveal, [0, 1], ["100%", "0%"]) }}
                        className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
                    >
                        {member.name}
                    </motion.h2>
                </div>

                {/* Bio */}
                <motion.p 
                    style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [20, 0]) }}
                    className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
                >
                    "{member.bio}"
                </motion.p>

                {/* Profile Link */}
                <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                    {/* <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2"> */}
                    <a href={`/ensemble/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
                        View Full Profile
                        <span style={{ backgroundColor: RASA }} className="absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full" />
                    </a>
                </div>

            </div>
        </motion.div>
    );
}

// // --- 4. THE TIME CAPSULE (The Active Anchor) ---
// function TimeCapsule({ currentYear, scrollProgress }: { currentYear: string, scrollProgress: MotionValue<number> }) {
//     // const years = ['2026', '2025', '2024', 'Faculty'];

//     const years = [
//         { label: '2026', value: '2025-2026' },
//         { label: '2025', value: '2024-2025' },
//         { label: '2024', value: '2023-2024' },
//         { label: 'Faculty', value: 'Faculty' }
//     ];

//     // TRIGGER LOGIC: 
//     // The "Landing" happens in the last 5% of the page scroll.
//     const arrival = useTransform(scrollProgress, [0.95, 1], [0, 1]);
    
//     // 1. The Vertical Beam (Shoots down)
//     const beamHeight = useTransform(arrival, [0, 1], ["0%", "100%"]);
    
//     // 2. The Impact Flash (Explodes on contact)
//     const impactFlash = useTransform(arrival, [0.8, 1], [0, 1]);
    
//     // 3. The Machine Power-Up (Glows after impact)
//     const machineGlow = useTransform(arrival, [0.9, 1], ["rgba(255,255,255,0.05)", "rgba(234,179,8,0.2)"]);
//     const borderGlow = useTransform(arrival, [0.9, 1], ["rgba(255,255,255,0.1)", "rgba(234,179,8,0.5)"]);

//     return (
//         <div className="absolute bottom-0 w-full flex flex-col items-center justify-end pb-12 z-50 pointer-events-none">
            
//             {/* A. THE CONNECTOR (The Umbilical Cord) */}
//             <div className="relative h-24 w-px bg-white/5 mb-[-1px] overflow-visible">
//                 {/* The Active Beam */}
//                 <motion.div 
//                     style={{ height: beamHeight }}
//                     className="absolute top-0 left-0 w-full bg-gold-500 shadow-[0_0_20px_#eab308]"
//                 />
//                 {/* The Spark at the tip */}
//                 <motion.div 
//                     style={{ top: beamHeight, opacity: arrival }}
//                     className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff] -translate-y-1/2 z-20"
//                 />
//             </div>
            
//             {/* B. THE DOCKING PORT (The Receiver) */}
//             <div className="relative flex flex-col items-center z-20">
//                 {/* The Physical Ring */}
//                 <motion.div 
//                     style={{ 
//                         borderColor: borderGlow,
//                         backgroundColor: useTransform(arrival, [0.9, 1], ["#020202", "#eab308"]), // Turns Gold on impact
//                         scale: useTransform(arrival, [0.9, 1], [1, 1.2]) 
//                     }}
//                     className="w-4 h-4 rounded-full border bg-[#020202] z-20 transition-colors"
//                 >
//                     {/* The Shockwave Explosion */}
//                     <motion.div 
//                         style={{ 
//                             opacity: useTransform(arrival, [0.9, 1], [0, 1]), 
//                             scale: useTransform(arrival, [0.9, 1], [0.5, 3]),
//                             borderWidth: useTransform(arrival, [0.9, 1], ["2px", "0px"]) 
//                         }}
//                         className="absolute inset-0 rounded-full border border-white" 
//                     />
//                 </motion.div>

//                 {/* The Ambient Energy Cloud */}
//                 <motion.div 
//                     style={{ opacity: impactFlash, scale: useTransform(arrival, [0, 1], [0.5, 1.5]) }}
//                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gold-500/30 blur-[40px] rounded-full z-0" 
//                 />
//             </div>

//             {/* C. THE CHRONOMETER (The Timeline UI) */}
//             <nav className="pointer-events-auto relative mt-[-8px] z-10">
//                 {/* The Glass Capsule */}
//                 <motion.div 
//                     style={{ 
//                         backgroundColor: machineGlow, // Lights up internally
//                         borderColor: borderGlow,      // Border energizes
//                         boxShadow: useTransform(arrival, [0, 1], ["0 0 0px transparent", "0 0 40px rgba(234,179,8,0.15)"])
//                     }}
//                     className="backdrop-blur-2xl border px-10 py-5 rounded-full flex items-center gap-12 group transition-all duration-300"
//                 >
                    
//                     {/* Label */}
//                     <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-8 mr-2">
//                         <motion.span 
//                             animate={{ opacity: [0.5, 1, 0.5] }}
//                             transition={{ duration: 2, repeat: Infinity }}
//                             className="w-1.5 h-1.5 bg-gold-500 rounded-full" 
//                         />
//                         <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
//                             Temporal<br/>Archive
//                         </span>
//                     </div>

//                     {/* Years (here we are changing )*/}
//                     <div className="flex items-center gap-8">
//                         {years.map(item  => {
//                             const isActive = currentYear === item.value;
//                             return (
//                                 <Link 
//                                     key={item.value}
//                                     href={`/ensemble?year=${item.value}`} // <--- URL TRIGGER
//                                     scroll={false} // Prevents jarring jump to top
//                                     className={`relative text-[10px] md:text-xs font-mono tracking-widest transition-all duration-500 ${isActive ? 'text-gold-500 font-bold' : 'text-neutral-600 hover:text-white'}`}
//                                 >
//                                     {item.label}
//                                     {isActive && (
//                                         <>
//                                             <motion.span layoutId="activeYearDot" className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-gold-500 rounded-full" />
//                                             <motion.span 
//                                                 layoutId="activeYearGlow"
//                                                 className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-6 bg-gold-500/20 blur-[15px] -translate-y-1/2" 
//                                             />
//                                         </>
//                                     )}
//                                 </Link>
//                             )
//                         })}
//                     </div>

//                 </motion.div>

//                 {/* Tech Wings (Retract when active) */}
//                 <motion.div style={{ width: useTransform(arrival, [0, 1], [48, 0]), opacity: useTransform(arrival, [0, 1], [1, 0]) }} className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 h-px bg-gradient-to-r from-transparent to-white/10" />
//                 <motion.div style={{ width: useTransform(arrival, [0, 1], [48, 0]), opacity: useTransform(arrival, [0, 1], [1, 0]) }} className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 h-px bg-gradient-to-l from-transparent to-white/10" />
//             </nav>
//         </div>
//     );
// }


// --- 4. THE TIME CAPSULE (The Active Anchor) ---
function TimeCapsule({ currentYear, scrollProgress }: { currentYear: string, scrollProgress: MotionValue<number> }) {
    // const years = ['2026', '2025', '2024', 'Faculty'];

    // GENERATE TIMELINE DYNAMICALLY
    const dynamicYears = getAcademicYears(4).map(y => ({
        label: y.split('-')[1], // Extracts "2026" from "2025-2026"
        value: y
    }));

    const years = [
        ...dynamicYears,
        { label: 'Faculty', value: 'Faculty' }
    ];
    // const years = [
    //     { label: '2026', value: '2025-2026' },
    //     { label: '2025', value: '2024-2025' },
    //     { label: '2024', value: '2023-2024' },
    //     { label: 'Faculty', value: 'Faculty' }
    // ];

    // TRIGGER LOGIC: 
    // The "Landing" happens in the last 5% of the page scroll.
    const arrival = useTransform(scrollProgress, [0.95, 1], [0, 1]);
    
    // 1. The Vertical Beam (Shoots down)
    const beamHeight = useTransform(arrival, [0, 1], ["0%", "100%"]);
    
    // 2. The Impact Flash (Explodes on contact)
    const impactFlash = useTransform(arrival, [0.8, 1], [0, 1]);
    
    // 3. The Machine Power-Up (Glows after impact)
    const machineGlow = useTransform(arrival, [0.9, 1], ["rgba(255,255,255,0.05)", "rgba(234,179,8,0.2)"]);
    const borderGlow = useTransform(arrival, [0.9, 1], ["rgba(255,255,255,0.1)", "rgba(234,179,8,0.5)"]);

    return (
        <div className="absolute bottom-0 w-full flex flex-col items-center justify-end pb-12 z-50 pointer-events-none">
            
            {/* A. THE CONNECTOR (The Umbilical Cord) */}
            <div className="relative h-24 w-px bg-white/5 mb-[-1px] overflow-visible">
                {/* The Active Beam */}
                <motion.div 
                    style={{ height: beamHeight }}
                    className="absolute top-0 left-0 w-full bg-gold-500 shadow-[0_0_20px_#eab308]"
                />
                {/* The Spark at the tip */}
                <motion.div 
                    style={{ top: beamHeight, opacity: arrival }}
                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1. bg-white rounded-full shadow-[0_0_10px_#fff] -translate-y-1/2 z-20"
                />
            </div>
            
            {/* B. THE DOCKING PORT (The Receiver) */}
            <div className="relative flex flex-col items-center z-20">
                {/* The Physical Ring */}
                <motion.div 
                    style={{ 
                        borderColor: borderGlow,
                        backgroundColor: useTransform(arrival, [0.9, 1], ["#020202", "#eab308"]), // Turns Gold on impact
                        scale: useTransform(arrival, [0.9, 1], [1, 1.2]) 
                    }}
                    className="w-3 h-3 rounded-full border bg-[#020202] z-20 transition-colors"
                >
                    {/* The Shockwave Explosion */}
                    <motion.div 
                        style={{ 
                            opacity: useTransform(arrival, [0.9, 1], [0, 1]), 
                            scale: useTransform(arrival, [0.9, 1], [0.5, 3]),
                            borderWidth: useTransform(arrival, [0.9, 1], ["2px", "0px"]) 
                        }}
                        className="absolute inset-0 rounded-full border border-white" 
                    />
                </motion.div>

                {/* The Ambient Energy Cloud */}
                <motion.div 
                    style={{ opacity: impactFlash, scale: useTransform(arrival, [0, 1], [0.5, 1.5]) }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gold-500/30 blur-[40px] rounded-full z-0" 
                />
            </div>

            {/* C. THE CHRONOMETER (The Timeline UI) */}
            <nav className="pointer-events-auto relative mt-[-8px] z-10">
                {/* The Glass Capsule */}
                <motion.div 
                    style={{ 
                        backgroundColor: machineGlow, // Lights up internally
                        borderColor: borderGlow,      // Border energizes
                        boxShadow: useTransform(arrival, [0, 1], ["0 0 0px transparent", "0 0 40px rgba(234,179,8,0.15)"])
                    }}
                    className="backdrop-blur-2xl border px-10 py-5 rounded-full flex items-center gap-12 group transition-all duration-300"
                >
                    
                    {/* Label */}
                    <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-8 mr-2">
                        <motion.span 
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-gold-500 rounded-full" 
                        />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
                            Temporal<br/>Archive
                        </span>
                    </div>

                    {/* Years (here we are changing )*/}
                    <div className="flex items-center gap-8">
                        {years.map(item  => {
                            const isActive = currentYear === item.value;
                            return (
                                // Start Change
                                <Link 
                                    key={item.value}
                                    href={`/ensemble?year=${item.value}`} // <--- URL TRIGGER
                                    scroll={false} // Prevents jarring jump to top
                                    className={`relative text-[10px] md:text-xs font-mono tracking-widest transition-all duration-500 ${isActive ? 'text-gold-500 font-bold' : 'text-neutral-600 hover:text-white'}`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <>
                                            <motion.span layoutId="activeYearDot" className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-gold-500 rounded-full" />
                                            <motion.span 
                                                layoutId="activeYearGlow"
                                                className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-6 bg-gold-500/20 blur-[15px] -translate-y-1/2" 
                                            />
                                        </>
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                </motion.div>

                {/* Tech Wings (Retract when active) */}
                <motion.div style={{ width: useTransform(arrival, [0, 1], [48, 0]), opacity: useTransform(arrival, [0, 1], [1, 0]) }} className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 h-px bg-gradient-to-r from-transparent to-white/10" />
                <motion.div style={{ width: useTransform(arrival, [0, 1], [48, 0]), opacity: useTransform(arrival, [0, 1], [1, 0]) }} className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 h-px bg-gradient-to-l from-transparent to-white/10" />
            </nav>
        </div>
    );
}