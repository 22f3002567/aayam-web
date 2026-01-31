// // // // // // // // // // // // "use client";

// // // // // // // // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // // // // // // // import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
// // // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // // // // // // --- ICONS ---
// // // // // // // // // // // // const PlayIcon = () => (
// // // // // // // // // // // //   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
// // // // // // // // // // // //     <polygon points="5 3 19 12 5 21 5 3" />
// // // // // // // // // // // //   </svg>
// // // // // // // // // // // // );
// // // // // // // // // // // // const PauseIcon = () => (
// // // // // // // // // // // //   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // // // // // // // // // // //     <rect x="6" y="4" width="4" height="16" />
// // // // // // // // // // // //     <rect x="14" y="4" width="4" height="16" />
// // // // // // // // // // // //   </svg>
// // // // // // // // // // // // );

// // // // // // // // // // // // // --- THE MAIN COMPONENT ---
// // // // // // // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
  
// // // // // // // // // // // //   // SCROLL PROGRESS FOR THE LINE
// // // // // // // // // // // //   const { scrollYProgress } = useScroll({
// // // // // // // // // // // //     target: containerRef,
// // // // // // // // // // // //     offset: ["start center", "end end"]
// // // // // // // // // // // //   });
  
// // // // // // // // // // // //   const scaleY = useSpring(scrollYProgress, { stiffness: 30, damping: 10 });

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#050505] pb-40 overflow-hidden">
      
// // // // // // // // // // // //       {/* 1. THE TITLE HEADER */}
// // // // // // // // // // // //       <header className="relative w-full h-[60vh] flex flex-col items-center justify-center z-10">
// // // // // // // // // // // //          <motion.div 
// // // // // // // // // // // //             initial={{ opacity: 0, y: 30 }}
// // // // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // // //             transition={{ duration: 1 }}
// // // // // // // // // // // //             className="text-center"
// // // // // // // // // // // //          >
// // // // // // // // // // // //              <span className="text-gold-500 uppercase tracking-[0.5em] text-xs mb-4 block">The Aayam Ensemble</span>
// // // // // // // // // // // //              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tight">
// // // // // // // // // // // //                  The Thread<br/>of Fate.
// // // // // // // // // // // //              </h1>
// // // // // // // // // // // //          </motion.div>
// // // // // // // // // // // //          {/* THE STARTING POINT OF THE THREAD */}
// // // // // // // // // // // //          <motion.div 
// // // // // // // // // // // //             style={{ scaleY }}
// // // // // // // // // // // //             className="absolute bottom-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold-500/50 to-gold-500 origin-top"
// // // // // // // // // // // //          />
// // // // // // // // // // // //       </header>

// // // // // // // // // // // //       {/* 2. THE THREAD (Central Line Background) */}
// // // // // // // // // // // //       <div className="absolute top-[60vh] left-1/2 -translate-x-1/2 w-px h-full bg-white/5 z-0" />

// // // // // // // // // // // //       {/* 3. THE NODES (People) */}
// // // // // // // // // // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20">
// // // // // // // // // // // //           {members.map((member, index) => (
// // // // // // // // // // // //               <ThreadNode 
// // // // // // // // // // // //                 key={member.id} 
// // // // // // // // // // // //                 member={member} 
// // // // // // // // // // // //                 index={index} 
// // // // // // // // // // // //                 isLast={index === members.length - 1}
// // // // // // // // // // // //               />
// // // // // // // // // // // //           ))}
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* 4. THE TIME CAPSULE (Footer Nav) */}
// // // // // // // // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // // --- INDIVIDUAL NODE (The Person) ---
// // // // // // // // // // // // function ThreadNode({ member, index, isLast }: { member: EnsembleMember; index: number; isLast: boolean }) {
// // // // // // // // // // // //     const isEven = index % 2 === 0;
// // // // // // // // // // // //     const ref = useRef(null);
// // // // // // // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // // // // // // //         target: ref,
// // // // // // // // // // // //         offset: ["start end", "center center"]
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // ANIMATIONS
// // // // // // // // // // // //     // As you scroll down, the card floats UP and comes into focus
// // // // // // // // // // // //     const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
// // // // // // // // // // // //     const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
// // // // // // // // // // // //     const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
// // // // // // // // // // // //     const grayscale = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]); // B&W -> Color

// // // // // // // // // // // //     // AUDIO STATE
// // // // // // // // // // // //     const [isPlaying, setIsPlaying] = useState(false);
// // // // // // // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // // // // // // // //     const toggleAudio = () => {
// // // // // // // // // // // //         if (!audioRef.current) return;
// // // // // // // // // // // //         if (isPlaying) {
// // // // // // // // // // // //             audioRef.current.pause();
// // // // // // // // // // // //         } else {
// // // // // // // // // // // //             // Stop others? Ideally context, but simple logic for now
// // // // // // // // // // // //             document.querySelectorAll('audio').forEach(el => el.pause());
// // // // // // // // // // // //             audioRef.current.play();
// // // // // // // // // // // //         }
// // // // // // // // // // // //         setIsPlaying(!isPlaying);
// // // // // // // // // // // //     };

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <motion.div 
// // // // // // // // // // // //             ref={ref}
// // // // // // // // // // // //             style={{ opacity, y, scale }}
// // // // // // // // // // // //             className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32 md:mb-48 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // // // // // // // // // //         >
            
// // // // // // // // // // // //             {/* THE CONNECTOR LINE (Horizontal Branch) */}
// // // // // // // // // // // //             {/* Draws a line from center spine to the image */}
// // // // // // // // // // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-px bg-white/10 ${isEven ? 'right-1/2' : 'left-1/2'}`}>
// // // // // // // // // // // //                 <div className={`absolute top-0 w-2 h-2 bg-gold-500 rounded-full -translate-y-1/2 ${isEven ? 'right-0' : 'left-0'}`} />
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* A. THE PROFILE (Image) */}
// // // // // // // // // // // //             <div className="w-full md:w-1/2 flex justify-center relative group">
// // // // // // // // // // // //                 {/* The "Divine Light" Halo */}
// // // // // // // // // // // //                 <div className="absolute inset-0 bg-gold-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
// // // // // // // // // // // //                 <motion.div 
// // // // // // // // // // // //                     style={{ filter: useTransform(grayscale, v => `grayscale(${v})`) }}
// // // // // // // // // // // //                     className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] overflow-hidden rounded-sm border border-white/10 group-hover:border-gold-500/50 transition-colors duration-500"
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                      {member.image_url ? (
// // // // // // // // // // // //                         <Image src={member.image_url} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
// // // // // // // // // // // //                      ) : (
// // // // // // // // // // // //                         <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
// // // // // // // // // // // //                             <span className="text-6xl font-serif text-white/20">{member.name.charAt(0)}</span>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                      )}
// // // // // // // // // // // //                 </motion.div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* B. THE STORY (Text) */}
// // // // // // // // // // // //             <div className={`w-full md:w-1/2 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                
// // // // // // // // // // // //                 {/* Role Badge */}
// // // // // // // // // // // //                 <div className={`inline-flex items-center gap-2 mb-4 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
// // // // // // // // // // // //                     <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
// // // // // // // // // // // //                     <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-300">
// // // // // // // // // // // //                         {member.role}
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 {/* Name */}
// // // // // // // // // // // //                 <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-none">
// // // // // // // // // // // //                     {member.name}
// // // // // // // // // // // //                 </h2>

// // // // // // // // // // // //                 {/* The "One Line" */}
// // // // // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-xl mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
// // // // // // // // // // // //                     "{member.bio}"
// // // // // // // // // // // //                 </p>

// // // // // // // // // // // //                 {/* AUDIO PLAYER */}
// // // // // // // // // // // //                 {/* Only render if URL exists (or use mock for now) */}
// // // // // // // // // // // //                 <button 
// // // // // // // // // // // //                     onClick={toggleAudio}
// // // // // // // // // // // //                     className={`group relative inline-flex items-center gap-4 px-6 py-3 border border-white/20 rounded-full hover:bg-gold-500 hover:border-gold-500 hover:text-black transition-all duration-300 ${isPlaying ? 'bg-gold-500 text-black border-gold-500' : 'text-white'}`}
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                     <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
// // // // // // // // // // // //                         {isPlaying ? 'Listening...' : 'Hear Voice'}
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                     <span className="w-8 h-8 flex items-center justify-center border border-current rounded-full">
// // // // // // // // // // // //                         {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // // // // // // //                     </span>
                    
// // // // // // // // // // // //                     {/* Visual Waveform (Fake animation) */}
// // // // // // // // // // // //                     {isPlaying && (
// // // // // // // // // // // //                         <div className="absolute -right-12 flex gap-1 h-4 items-center">
// // // // // // // // // // // //                             {[1,2,3,4].map(i => (
// // // // // // // // // // // //                                 <motion.div 
// // // // // // // // // // // //                                     key={i}
// // // // // // // // // // // //                                     animate={{ height: [4, 16, 4] }}
// // // // // // // // // // // //                                     transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
// // // // // // // // // // // //                                     className="w-0.5 bg-gold-500" 
// // // // // // // // // // // //                                 />
// // // // // // // // // // // //                             ))}
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                 </button>

// // // // // // // // // // // //                 <audio ref={audioRef} src={member.audio_url || "/mock-voice.mp3"} onEnded={() => setIsPlaying(false)} />

// // // // // // // // // // // //                 {/* PROFILE LINK (Subtle) */}
// // // // // // // // // // // //                 <div className={`mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex ${isEven ? 'justify-start' : 'justify-end'}`}>
// // // // // // // // // // // //                     <a href={`/artist/${member.slug}`} className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white border-b border-transparent hover:border-white pb-1 transition-colors">
// // // // // // // // // // // //                         View Full Artist Profile
// // // // // // // // // // // //                     </a>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         </motion.div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }

// // // // // // // // // // // // // --- THE TIME CAPSULE (Footer Navigation) ---
// // // // // // // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // // // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50">
// // // // // // // // // // // //             <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl">
// // // // // // // // // // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-500 border-r border-white/10 pr-6 mr-2">
// // // // // // // // // // // //                     Time Travel
// // // // // // // // // // // //                 </span>
                
// // // // // // // // // // // //                 {years.map(year => (
// // // // // // // // // // // //                     <button 
// // // // // // // // // // // //                         key={year}
// // // // // // // // // // // //                         className={`text-xs font-mono tracking-widest transition-all duration-300 ${currentYear.includes(year) ? 'text-gold-500 scale-110 font-bold' : 'text-neutral-400 hover:text-white'}`}
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                         {year}
// // // // // // // // // // // //                     </button>
// // // // // // // // // // // //                 ))}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }


// // // // // // // // // // // // "use client";

// // // // // // // // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // // // // // // // import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
// // // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // // // // // // --- ICONS ---
// // // // // // // // // // // // const PlayIcon = () => (
// // // // // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
// // // // // // // // // // // //     <polygon points="5 3 19 12 5 21 5 3" />
// // // // // // // // // // // //   </svg>
// // // // // // // // // // // // );
// // // // // // // // // // // // const PauseIcon = () => (
// // // // // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
// // // // // // // // // // // //     <rect x="6" y="4" width="4" height="16" />
// // // // // // // // // // // //     <rect x="14" y="4" width="4" height="16" />
// // // // // // // // // // // //   </svg>
// // // // // // // // // // // // );
// // // // // // // // // // // // const ArrowRight = () => (
// // // // // // // // // // // //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
// // // // // // // // // // // //         <path d="M5 12h14" />
// // // // // // // // // // // //         <path d="M12 5l7 7-7 7" />
// // // // // // // // // // // //     </svg>
// // // // // // // // // // // // );

// // // // // // // // // // // // // --- MAIN COMPONENT ---
// // // // // // // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
  
// // // // // // // // // // // //   // SHARED AUDIO STATE (Only one plays at a time)
// // // // // // // // // // // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // // // // // // // // // // //   // SCROLL PROGRESS FOR THE TITLE FADE
// // // // // // // // // // // //   const { scrollYProgress } = useScroll({ target: containerRef });
// // // // // // // // // // // //   const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
// // // // // // // // // // // //   const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#050505] pb-40 overflow-hidden">
      
// // // // // // // // // // // //       {/* 1. THE CINEMATIC HEADER */}
// // // // // // // // // // // //       <motion.header 
// // // // // // // // // // // //         style={{ opacity: titleOpacity, scale: titleScale }}
// // // // // // // // // // // //         className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none z-0"
// // // // // // // // // // // //       >
// // // // // // // // // // // //          <div className="relative z-10 text-center">
// // // // // // // // // // // //              <span className="text-gold-500 uppercase tracking-[0.6em] text-[10px] md:text-xs mb-6 block animate-pulse">
// // // // // // // // // // // //                 The Ensemble / {currentYear}
// // // // // // // // // // // //              </span>
// // // // // // // // // // // //              <h1 className="text-[12vw] md:text-[8vw] font-serif text-white/10 leading-none tracking-tighter">
// // // // // // // // // // // //                  THE THREAD
// // // // // // // // // // // //              </h1>
// // // // // // // // // // // //          </div>
// // // // // // // // // // // //       </motion.header>

// // // // // // // // // // // //       {/* 2. THE CENTRAL SPINE (Background Guide) */}
// // // // // // // // // // // //       <div className="absolute top-0 left-6 md:left-1/2 md:-translate-x-1/2 w-px h-full bg-white/5 z-0" />

// // // // // // // // // // // //       {/* 3. THE NODES */}
// // // // // // // // // // // //       <div className="relative z-10 w-full pt-[50vh] pb-[20vh]">
// // // // // // // // // // // //           {members.map((member, index) => (
// // // // // // // // // // // //               <NarrativeNode 
// // // // // // // // // // // //                 key={member.id} 
// // // // // // // // // // // //                 member={member} 
// // // // // // // // // // // //                 index={index} 
// // // // // // // // // // // //                 activeAudioId={activeAudioId}
// // // // // // // // // // // //                 setActiveAudioId={setActiveAudioId}
// // // // // // // // // // // //               />
// // // // // // // // // // // //           ))}
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* 4. THE TIME CAPSULE */}
// // // // // // // // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // // --- INDIVIDUAL NODE (The Person) ---
// // // // // // // // // // // // function NarrativeNode({ 
// // // // // // // // // // // //     member, 
// // // // // // // // // // // //     index, 
// // // // // // // // // // // //     activeAudioId, 
// // // // // // // // // // // //     setActiveAudioId 
// // // // // // // // // // // // }: { 
// // // // // // // // // // // //     member: EnsembleMember; 
// // // // // // // // // // // //     index: number; 
// // // // // // // // // // // //     activeAudioId: string | null; 
// // // // // // // // // // // //     setActiveAudioId: (id: string | null) => void;
// // // // // // // // // // // // }) {
// // // // // // // // // // // //     const isEven = index % 2 === 0;
// // // // // // // // // // // //     const ref = useRef(null);
// // // // // // // // // // // //     const isPlaying = activeAudioId === member.id;
// // // // // // // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // // // // // // // //     // Stop audio if another starts
// // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // //         if (!audioRef.current) return;
// // // // // // // // // // // //         if (isPlaying) {
// // // // // // // // // // // //             audioRef.current.play().catch(() => {}); // Catch autoplay errors
// // // // // // // // // // // //         } else {
// // // // // // // // // // // //             audioRef.current.pause();
// // // // // // // // // // // //             audioRef.current.currentTime = 0; // Reset
// // // // // // // // // // // //         }
// // // // // // // // // // // //     }, [isPlaying]);

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <motion.div 
// // // // // // // // // // // //             ref={ref}
// // // // // // // // // // // //             initial={{ opacity: 0, y: 50 }}
// // // // // // // // // // // //             whileInView={{ opacity: 1, y: 0 }}
// // // // // // // // // // // //             viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
// // // // // // // // // // // //             transition={{ duration: 0.8, ease: "easeOut" }}
// // // // // // // // // // // //             className={`relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-0 mb-40 md:mb-60 px-6 md:px-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
// // // // // // // // // // // //         >
            
// // // // // // // // // // // //             {/* A. THE SNAKE CONNECTOR (SVG) */}
// // // // // // // // // // // //             {/* This draws a curve from the center spine to the image */}
// // // // // // // // // // // //             <div className={`absolute top-1/2 left-6 md:left-1/2 md:-translate-x-1/2 w-8 md:w-[50%] h-[2px] z-0 hidden md:block ${isEven ? 'origin-left' : 'origin-right'}`}>
// // // // // // // // // // // //                  <svg 
// // // // // // // // // // // //                     className={`absolute top-1/2 -translate-y-1/2 w-full h-[100px] overflow-visible ${isEven ? 'left-0' : 'right-0 -scale-x-100'}`} 
// // // // // // // // // // // //                     preserveAspectRatio="none"
// // // // // // // // // // // //                  >
// // // // // // // // // // // //                     {/* The Curve */}
// // // // // // // // // // // //                     <motion.path 
// // // // // // // // // // // //                         d="M 0,0 C 50,0 50,0 100,0" // Simple straight connector for clean look, or use bezier "M 0,0 C 50,0 150,50 300,50"
// // // // // // // // // // // //                         fill="none" 
// // // // // // // // // // // //                         stroke="url(#goldGradient)" 
// // // // // // // // // // // //                         strokeWidth="1"
// // // // // // // // // // // //                         initial={{ pathLength: 0 }}
// // // // // // // // // // // //                         whileInView={{ pathLength: 1 }}
// // // // // // // // // // // //                         transition={{ duration: 1.5, ease: "easeInOut" }}
// // // // // // // // // // // //                     />
// // // // // // // // // // // //                     <defs>
// // // // // // // // // // // //                         <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
// // // // // // // // // // // //                             <stop offset="0%" stopColor="#eab308" stopOpacity="1" />
// // // // // // // // // // // //                             <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
// // // // // // // // // // // //                         </linearGradient>
// // // // // // // // // // // //                     </defs>
// // // // // // // // // // // //                  </svg>
// // // // // // // // // // // //                  {/* The Dot at the spine */}
// // // // // // // // // // // //                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-500 shadow-[0_0_10px_#eab308]" />
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* B. THE PORTRAIT (Image) */}
// // // // // // // // // // // //             <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-start' : 'md:justify-end'} relative`}>
// // // // // // // // // // // //                 <motion.div 
// // // // // // // // // // // //                     className="group relative w-full md:w-[400px] aspect-[3/4] cursor-pointer"
// // // // // // // // // // // //                     whileHover={{ scale: 1.02, y: -5 }}
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                      {/* The Divine Light (Glow) */}
// // // // // // // // // // // //                      <div className="absolute -inset-4 bg-gold-500/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                     
// // // // // // // // // // // //                      {/* The Card */}
// // // // // // // // // // // //                      <div className="relative w-full h-full overflow-hidden rounded-sm border border-white/10 group-hover:border-gold-500/50 transition-colors duration-500 bg-neutral-900">
// // // // // // // // // // // //                         {member.image_url ? (
// // // // // // // // // // // //                             <Image 
// // // // // // // // // // // //                                 src={member.image_url} 
// // // // // // // // // // // //                                 alt={member.name} 
// // // // // // // // // // // //                                 fill 
// // // // // // // // // // // //                                 className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
// // // // // // // // // // // //                             />
// // // // // // // // // // // //                         ) : (
// // // // // // // // // // // //                             <div className="w-full h-full flex items-center justify-center bg-neutral-800">
// // // // // // // // // // // //                                 <span className="text-8xl font-serif text-white/10 group-hover:text-gold-500/20 transition-colors">
// // // // // // // // // // // //                                     {member.name.charAt(0)}
// // // // // // // // // // // //                                 </span>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         )}

// // // // // // // // // // // //                         {/* Audio Button (Integrated into Image Corner) */}
// // // // // // // // // // // //                         <button 
// // // // // // // // // // // //                             onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
// // // // // // // // // // // //                             className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold-500 hover:text-black hover:scale-110 transition-all z-20"
// // // // // // // // // // // //                         >
// // // // // // // // // // // //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // // // // // // //                         </button>
                        
// // // // // // // // // // // //                         {/* Audio Element */}
// // // // // // // // // // // //                         <audio ref={audioRef} src={member.audio_url || "/mock.mp3"} onEnded={() => setActiveAudioId(null)} />
// // // // // // // // // // // //                      </div>

// // // // // // // // // // // //                      {/* Profile Link Overlay (Appears on Hover) */}
// // // // // // // // // // // //                      <Link href={`/artist/${member.slug}`}>
// // // // // // // // // // // //                         <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
// // // // // // // // // // // //                             <div className="px-6 py-2 border border-white/30 rounded-full backdrop-blur-sm bg-black/30 text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors">
// // // // // // // // // // // //                                 View Profile
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                      </Link>
// // // // // // // // // // // //                 </motion.div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* C. THE STORY (Text) */}
// // // // // // // // // // // //             <div className={`w-full md:w-1/2 mt-8 md:mt-0 px-4 ${isEven ? 'md:pl-24 md:text-left' : 'md:pr-24 md:text-right'} text-center`}>
                
// // // // // // // // // // // //                 {/* 1. Role (Pill) */}
// // // // // // // // // // // //                 <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-sm`}>
// // // // // // // // // // // //                      <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gold-500'}`} />
// // // // // // // // // // // //                      <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
// // // // // // // // // // // //                         {member.role}
// // // // // // // // // // // //                      </span>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 {/* 2. Name */}
// // // // // // // // // // // //                 <h2 className="text-5xl md:text-7xl font-serif text-white leading-none mb-6">
// // // // // // // // // // // //                     {member.name}
// // // // // // // // // // // //                 </h2>

// // // // // // // // // // // //                 {/* 3. The "Pulse" Quote */}
// // // // // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-xl leading-relaxed mb-8">
// // // // // // // // // // // //                     "{member.bio}"
// // // // // // // // // // // //                 </p>

// // // // // // // // // // // //                 {/* 4. The Connector Link (Text) */}
// // // // // // // // // // // //                 <Link href={`/artist/${member.slug}`} className="group/link inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-gold-500 transition-colors">
// // // // // // // // // // // //                     <span>Explore Dimensions</span>
// // // // // // // // // // // //                     <span className="group-hover/link:translate-x-1 transition-transform">
// // // // // // // // // // // //                         <ArrowRight />
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                 </Link>

// // // // // // // // // // // //             </div>

// // // // // // // // // // // //         </motion.div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }

// // // // // // // // // // // // // --- THE TIME CAPSULE (Footer) ---
// // // // // // // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // // // // // // //     const years = ['2026', '2025', '2024', 'Legacy'];

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="absolute bottom-12 left-0 w-full flex justify-center z-50 pointer-events-none">
// // // // // // // // // // // //             <div className="pointer-events-auto bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 px-1 py-1 rounded-full flex items-center shadow-2xl scale-90 md:scale-100">
// // // // // // // // // // // //                 {years.map(year => {
// // // // // // // // // // // //                     const isActive = currentYear.includes(year);
// // // // // // // // // // // //                     return (
// // // // // // // // // // // //                         <button 
// // // // // // // // // // // //                             key={year}
// // // // // // // // // // // //                             className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all duration-500 ${isActive ? 'bg-white text-black font-bold shadow-lg' : 'text-neutral-500 hover:text-white'}`}
// // // // // // // // // // // //                         >
// // // // // // // // // // // //                             {year}
// // // // // // // // // // // //                         </button>
// // // // // // // // // // // //                     )
// // // // // // // // // // // //                 })}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }

// // // // // // // // // // // // // // "use client";

// // // // // // // // // // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // // // // // // // // // import { motion, useScroll, useTransform, useInView } from "framer-motion";
// // // // // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // // // // // // // // --- ICONS ---
// // // // // // // // // // // // // // const PlayIcon = () => (
// // // // // // // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
// // // // // // // // // // // // // //     <polygon points="5 3 19 12 5 21 5 3" />
// // // // // // // // // // // // // //   </svg>
// // // // // // // // // // // // // // );
// // // // // // // // // // // // // // const PauseIcon = () => (
// // // // // // // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
// // // // // // // // // // // // // //     <rect x="6" y="4" width="4" height="16" />
// // // // // // // // // // // // // //     <rect x="14" y="4" width="4" height="16" />
// // // // // // // // // // // // // //   </svg>
// // // // // // // // // // // // // // );
// // // // // // // // // // // // // // const ArrowRight = () => (
// // // // // // // // // // // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
// // // // // // // // // // // // // //         <path d="M5 12h14" />
// // // // // // // // // // // // // //         <path d="M12 5l7 7-7 7" />
// // // // // // // // // // // // // //     </svg>
// // // // // // // // // // // // // // );

// // // // // // // // // // // // // // // --- MAIN COMPONENT ---
// // // // // // // // // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // // // // // // // // // // // // //   // SCROLL PROGRESS FOR HEADER FADE
// // // // // // // // // // // // // //   const { scrollYProgress } = useScroll({ target: containerRef });
// // // // // // // // // // // // // //   const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
// // // // // // // // // // // // // //   const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#050505] pb-40 overflow-hidden">
      
// // // // // // // // // // // // // //       {/* 1. CINEMATIC HEADER (Fades out as you scroll) */}
// // // // // // // // // // // // // //       <motion.header 
// // // // // // // // // // // // // //         style={{ opacity: headerOpacity, y: headerY }}
// // // // // // // // // // // // // //         className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none z-0"
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //           <div className="relative z-10 text-center">
// // // // // // // // // // // // // //               <span className="text-gold-500 uppercase tracking-[0.6em] text-xs mb-8 block animate-pulse">
// // // // // // // // // // // // // //                  The Ensemble / {currentYear}
// // // // // // // // // // // // // //               </span>
// // // // // // // // // // // // // //               <h1 className="text-[10vw] font-serif text-white/10 leading-none tracking-tighter mix-blend-overlay">
// // // // // // // // // // // // // //                   THE LINEAGE
// // // // // // // // // // // // // //               </h1>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //       </motion.header>

// // // // // // // // // // // // // //       {/* 2. THE CENTRAL SPINE (The Timeline) */}
// // // // // // // // // // // // // //       {/* This line runs down the entire page. It turns gold as you scroll. */}
// // // // // // // // // // // // // //       <div className="absolute top-0 left-6 md:left-1/2 md:-translate-x-[0.5px] w-[1px] h-full bg-white/5 z-0">
// // // // // // // // // // // // // //           <motion.div 
// // // // // // // // // // // // // //             style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
// // // // // // // // // // // // // //             className="w-full bg-gradient-to-b from-gold-500 via-gold-500 to-transparent shadow-[0_0_10px_#eab308]"
// // // // // // // // // // // // // //           />
// // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // //       {/* 3. THE NODES (Actors) */}
// // // // // // // // // // // // // //       <div className="relative z-10 w-full pt-[50vh] pb-[20vh]">
// // // // // // // // // // // // // //           {members.map((member, index) => (
// // // // // // // // // // // // // //               <NarrativeNode 
// // // // // // // // // // // // // //                 key={member.id} 
// // // // // // // // // // // // // //                 member={member} 
// // // // // // // // // // // // // //                 index={index} 
// // // // // // // // // // // // // //                 activeAudioId={activeAudioId}
// // // // // // // // // // // // // //                 setActiveAudioId={setActiveAudioId}
// // // // // // // // // // // // // //               />
// // // // // // // // // // // // // //           ))}
// // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // //       {/* 4. THE TIME CAPSULE (Sticky Footer) */}
// // // // // // // // // // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // --- INDIVIDUAL NODE COMPONENT ---
// // // // // // // // // // // // // // function NarrativeNode({ 
// // // // // // // // // // // // // //     member, 
// // // // // // // // // // // // // //     index, 
// // // // // // // // // // // // // //     activeAudioId, 
// // // // // // // // // // // // // //     setActiveAudioId 
// // // // // // // // // // // // // // }: { 
// // // // // // // // // // // // // //     member: EnsembleMember; 
// // // // // // // // // // // // // //     index: number; 
// // // // // // // // // // // // // //     activeAudioId: string | null; 
// // // // // // // // // // // // // //     setActiveAudioId: (id: string | null) => void;
// // // // // // // // // // // // // // }) {
// // // // // // // // // // // // // //     const isEven = index % 2 === 0;
// // // // // // // // // // // // // //     const ref = useRef(null);
    
// // // // // // // // // // // // // //     // TRIGGER: When the element comes into the middle of the screen
// // // // // // // // // // // // // //     const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", once: false });
    
// // // // // // // // // // // // // //     const isPlaying = activeAudioId === member.id;
// // // // // // // // // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // // // // // // // // // //     // Audio Logic
// // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // //         if (!audioRef.current) return;
// // // // // // // // // // // // // //         if (isPlaying) {
// // // // // // // // // // // // // //             audioRef.current.play().catch(() => {});
// // // // // // // // // // // // // //         } else {
// // // // // // // // // // // // // //             audioRef.current.pause();
// // // // // // // // // // // // // //             audioRef.current.currentTime = 0;
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //     }, [isPlaying]);

// // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // //         <motion.div 
// // // // // // // // // // // // // //             ref={ref}
// // // // // // // // // // // // // //             className={`relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-0 mb-32 md:mb-60 px-6 md:px-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
// // // // // // // // // // // // // //         >
            
// // // // // // // // // // // // // //             {/* A. THE CONNECTOR NERVE (SVG) */}
// // // // // // // // // // // // // //             {/* This connects the Center Spine to the Person */}
// // // // // // // // // // // // // //             <div className={`absolute top-1/2 left-6 md:left-1/2 md:-translate-x-1/2 w-8 md:w-[50%] h-[100px] -translate-y-1/2 z-0 hidden md:block pointer-events-none ${isEven ? 'origin-left' : 'origin-right scale-x-[-1]'}`}>
// // // // // // // // // // // // // //                  <svg className="w-full h-full overflow-visible">
// // // // // // // // // // // // // //                     {/* The Path */}
// // // // // // // // // // // // // //                     <motion.path 
// // // // // // // // // // // // // //                         d="M 0,50 C 50,50 50,50 150,50" 
// // // // // // // // // // // // // //                         fill="none" 
// // // // // // // // // // // // // //                         stroke="#eab308" 
// // // // // // // // // // // // // //                         strokeWidth="1"
// // // // // // // // // // // // // //                         initial={{ pathLength: 0, opacity: 0 }}
// // // // // // // // // // // // // //                         animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
// // // // // // // // // // // // // //                         transition={{ duration: 1.5, ease: "easeOut" }}
// // // // // // // // // // // // // //                     />
// // // // // // // // // // // // // //                     {/* The Glowing Dot at connection point */}
// // // // // // // // // // // // // //                     <motion.circle 
// // // // // // // // // // // // // //                         cx="0" cy="50" r="3" fill="#eab308"
// // // // // // // // // // // // // //                         initial={{ opacity: 0 }}
// // // // // // // // // // // // // //                         animate={{ opacity: isInView ? 1 : 0 }}
// // // // // // // // // // // // // //                     />
// // // // // // // // // // // // // //                  </svg>
// // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // //             {/* B. THE PORTRAIT (Spotlight Section) */}
// // // // // // // // // // // // // //             <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-start' : 'md:justify-end'} relative`}>
// // // // // // // // // // // // // //                 <motion.div 
// // // // // // // // // // // // // //                     className="group relative w-full md:w-[380px] aspect-[3/4] cursor-pointer"
// // // // // // // // // // // // // //                     initial={{ scale: 0.9, opacity: 0 }}
// // // // // // // // // // // // // //                     animate={{ 
// // // // // // // // // // // // // //                         scale: isInView ? 1.05 : 0.9, 
// // // // // // // // // // // // // //                         opacity: isInView ? 1 : 0.3,
// // // // // // // // // // // // // //                         filter: isInView ? "grayscale(0%)" : "grayscale(100%)"
// // // // // // // // // // // // // //                     }}
// // // // // // // // // // // // // //                     transition={{ duration: 0.8 }}
// // // // // // // // // // // // // //                     onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                       {/* 1. THE DIVINE LIGHT (Background Glow) */}
// // // // // // // // // // // // // //                       <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold-500/20 rounded-full blur-[80px] transition-opacity duration-1000 pointer-events-none ${isInView ? 'opacity-100' : 'opacity-0'}`} />
                      
// // // // // // // // // // // // // //                       {/* 2. THE IMAGE FRAME */}
// // // // // // // // // // // // // //                       <div className={`relative w-full h-full overflow-hidden rounded-sm border transition-all duration-700 bg-neutral-900 ${isInView ? 'border-gold-500/50 shadow-2xl' : 'border-white/10'}`}>
// // // // // // // // // // // // // //                          {member.image_url ? (
// // // // // // // // // // // // // //                              <Image 
// // // // // // // // // // // // // //                                  src={member.image_url} 
// // // // // // // // // // // // // //                                  alt={member.name} 
// // // // // // // // // // // // // //                                  fill 
// // // // // // // // // // // // // //                                  className="object-cover transition-transform duration-1000 hover:scale-110"
// // // // // // // // // // // // // //                              />
// // // // // // // // // // // // // //                          ) : (
// // // // // // // // // // // // // //                              <div className="w-full h-full flex items-center justify-center">
// // // // // // // // // // // // // //                                  <span className="text-8xl font-serif text-white/10">{member.name.charAt(0)}</span>
// // // // // // // // // // // // // //                              </div>
// // // // // // // // // // // // // //                          )}

// // // // // // // // // // // // // //                          {/* Play Button (Integrated) */}
// // // // // // // // // // // // // //                          <div className={`absolute bottom-6 right-6 w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${isPlaying ? 'bg-gold-500 text-black border-gold-500' : 'bg-black/40 text-white border-white/20 hover:scale-110'}`}>
// // // // // // // // // // // // // //                              {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // // // // // // // // //                          </div>

// // // // // // // // // // // // // //                          {/* Audio Waveform Visualizer */}
// // // // // // // // // // // // // //                          {isPlaying && (
// // // // // // // // // // // // // //                              <div className="absolute bottom-6 left-6 flex items-end gap-1 h-4">
// // // // // // // // // // // // // //                                 {[1,2,3,4].map(i => (
// // // // // // // // // // // // // //                                     <motion.div 
// // // // // // // // // // // // // //                                         key={i}
// // // // // // // // // // // // // //                                         animate={{ height: [4, 16, 4] }}
// // // // // // // // // // // // // //                                         transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.1 }}
// // // // // // // // // // // // // //                                         className="w-0.5 bg-black" 
// // // // // // // // // // // // // //                                     />
// // // // // // // // // // // // // //                                 ))}
// // // // // // // // // // // // // //                              </div>
// // // // // // // // // // // // // //                          )}
// // // // // // // // // // // // // //                          <audio ref={audioRef} src={member.audio_url || "/mock.mp3"} onEnded={() => setActiveAudioId(null)} />
// // // // // // // // // // // // // //                       </div>

// // // // // // // // // // // // // //                       {/* 3. PROFILE LINK OVERLAY */}
// // // // // // // // // // // // // //                       <Link href={`/artist/${member.slug}`}>
// // // // // // // // // // // // // //                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
// // // // // // // // // // // // // //                             <div className="border border-white/30 px-6 py-2 rounded-full backdrop-blur-md text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors">
// // // // // // // // // // // // // //                                 View Profile
// // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // //                          </div>
// // // // // // // // // // // // // //                       </Link>
// // // // // // // // // // // // // //                 </motion.div>
// // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // //             {/* C. THE SCRIPT (Text Section) */}
// // // // // // // // // // // // // //             <div className={`w-full md:w-1/2 mt-8 md:mt-0 px-4 ${isEven ? 'md:pl-20 md:text-left' : 'md:pr-20 md:text-right'} text-center md:text-left`}>
                
// // // // // // // // // // // // // //                 <motion.div
// // // // // // // // // // // // // //                     initial={{ opacity: 0, x: isEven ? 20 : -20 }}
// // // // // // // // // // // // // //                     animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (isEven ? 20 : -20) }}
// // // // // // // // // // // // // //                     transition={{ duration: 0.8, delay: 0.2 }}
// // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // //                     {/* Role */}
// // // // // // // // // // // // // //                     <div className={`inline-flex items-center gap-3 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// // // // // // // // // // // // // //                          <span className={`h-px w-8 ${isInView ? 'bg-gold-500' : 'bg-white/20'}`} />
// // // // // // // // // // // // // //                          <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500">{member.role}</span>
// // // // // // // // // // // // // //                     </div>

// // // // // // // // // // // // // //                     {/* Name */}
// // // // // // // // // // // // // //                     <h2 className="text-6xl md:text-7xl font-serif text-white leading-none mb-6">
// // // // // // // // // // // // // //                         {member.name}
// // // // // // // // // // // // // //                     </h2>

// // // // // // // // // // // // // //                     {/* Bio */}
// // // // // // // // // // // // // //                     <p className="font-serif italic text-white/60 text-lg leading-relaxed mb-8 max-w-md">
// // // // // // // // // // // // // //                         "{member.bio}"
// // // // // // // // // // // // // //                     </p>

// // // // // // // // // // // // // //                     {/* Interactive Link */}
// // // // // // // // // // // // // //                     <Link href={`/artist/${member.slug}`} className={`group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors ${isEven ? '' : 'md:flex-row-reverse'}`}>
// // // // // // // // // // // // // //                         <span>Explore</span>
// // // // // // // // // // // // // //                         <ArrowRight />
// // // // // // // // // // // // // //                     </Link>
// // // // // // // // // // // // // //                 </motion.div>

// // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // //         </motion.div>
// // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // --- THE TIME CAPSULE (Fixed Bottom Navigation) ---
// // // // // // // // // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // // // // // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];

// // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // //         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
// // // // // // // // // // // // // //             <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 px-1 py-1 rounded-full flex gap-1 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
// // // // // // // // // // // // // //                 {years.map(year => {
// // // // // // // // // // // // // //                     const isActive = currentYear.includes(year);
// // // // // // // // // // // // // //                     return (
// // // // // // // // // // // // // //                         <button 
// // // // // // // // // // // // // //                             key={year}
// // // // // // // // // // // // // //                             className={`
// // // // // // // // // // // // // //                                 relative px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all duration-500 overflow-hidden
// // // // // // // // // // // // // //                                 ${isActive ? 'text-black' : 'text-neutral-500 hover:text-white'}
// // // // // // // // // // // // // //                             `}
// // // // // // // // // // // // // //                         >
// // // // // // // // // // // // // //                             {isActive && (
// // // // // // // // // // // // // //                                 <motion.div 
// // // // // // // // // // // // // //                                     layoutId="activeYear"
// // // // // // // // // // // // // //                                     className="absolute inset-0 bg-gold-500"
// // // // // // // // // // // // // //                                 />
// // // // // // // // // // // // // //                             )}
// // // // // // // // // // // // // //                             <span className="relative z-10">{year}</span>
// // // // // // // // // // // // // //                         </button>
// // // // // // // // // // // // // //                     )
// // // // // // // // // // // // // //                 })}
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // }


// // // // // // // // // // // // // "use client";

// // // // // // // // // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // // // // // // // // import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
// // // // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // // // // // // // --- ICONS ---
// // // // // // // // // // // // // const PlayIcon = () => (
// // // // // // // // // // // // //   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
// // // // // // // // // // // // // );
// // // // // // // // // // // // // const PauseIcon = () => (
// // // // // // // // // // // // //   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
// // // // // // // // // // // // // );

// // // // // // // // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
  
// // // // // // // // // // // // //   // 1. THE MAIN SPINE (Scroll Progress)
// // // // // // // // // // // // //   const { scrollYProgress } = useScroll({
// // // // // // // // // // // // //     target: containerRef,
// // // // // // // // // // // // //     offset: ["start start", "end end"]
// // // // // // // // // // // // //   });
// // // // // // // // // // // // //   const scaleY = useSpring(scrollYProgress, { stiffness: 30, damping: 10 });

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-40 overflow-hidden">
      
// // // // // // // // // // // // //       {/* BACKGROUND NOISE */}
// // // // // // // // // // // // //       <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-0" />

// // // // // // // // // // // // //       {/* 2. HEADER */}
// // // // // // // // // // // // //       <header className="relative w-full h-[50vh] flex flex-col items-center justify-center z-10 mt-20">
// // // // // // // // // // // // //          <motion.div 
// // // // // // // // // // // // //             initial={{ opacity: 0, y: 30 }}
// // // // // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // // // //             transition={{ duration: 1 }}
// // // // // // // // // // // // //             className="text-center"
// // // // // // // // // // // // //          >
// // // // // // // // // // // // //              <div className="inline-block border border-gold-500/30 px-4 py-1 rounded-full bg-gold-500/5 mb-6 backdrop-blur-md">
// // // // // // // // // // // // //                 <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold">The Ensemble</span>
// // // // // // // // // // // // //              </div>
// // // // // // // // // // // // //              <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tight mb-4">
// // // // // // // // // // // // //                  The Thread.
// // // // // // // // // // // // //              </h1>
// // // // // // // // // // // // //              <p className="text-white/40 font-serif italic max-w-lg mx-auto">
// // // // // // // // // // // // //                  "We are but actors, painting silence with noise."
// // // // // // // // // // // // //              </p>
// // // // // // // // // // // // //          </motion.div>
// // // // // // // // // // // // //       </header>

// // // // // // // // // // // // //       {/* 3. THE SPINE (The Central Line) */}
// // // // // // // // // // // // //       <div className="absolute top-[50vh] left-4 md:left-1/2 md:-translate-x-px w-px h-full bg-white/10 z-0">
// // // // // // // // // // // // //           <motion.div 
// // // // // // // // // // // // //             style={{ scaleY }}
// // // // // // // // // // // // //             className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gold-500 via-gold-500 to-transparent origin-top"
// // // // // // // // // // // // //           />
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       {/* 4. THE CAST (The Nodes) */}
// // // // // // // // // // // // //       <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-0 pt-20">
// // // // // // // // // // // // //           {members.map((member, index) => (
// // // // // // // // // // // // //               <ThreadNode 
// // // // // // // // // // // // //                 key={member.id} 
// // // // // // // // // // // // //                 member={member} 
// // // // // // // // // // // // //                 index={index} 
// // // // // // // // // // // // //               />
// // // // // // // // // // // // //           ))}
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       {/* 5. THE FOOTER (Time Travel) */}
// // // // // // // // // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // --- SUB-COMPONENT: THE NODE ---
// // // // // // // // // // // // // function ThreadNode({ member, index }: { member: EnsembleMember; index: number }) {
// // // // // // // // // // // // //     const isEven = index % 2 === 0;
// // // // // // // // // // // // //     const ref = useRef(null);
// // // // // // // // // // // // //     // Trigger animation when the element is in the middle of the screen
// // // // // // // // // // // // //     const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

// // // // // // // // // // // // //     // AUDIO LOGIC
// // // // // // // // // // // // //     const [isPlaying, setIsPlaying] = useState(false);
// // // // // // // // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // // // // // // // // //     const toggleAudio = () => {
// // // // // // // // // // // // //         if (!audioRef.current) return;
// // // // // // // // // // // // //         if (isPlaying) {
// // // // // // // // // // // // //             audioRef.current.pause();
// // // // // // // // // // // // //         } else {
// // // // // // // // // // // // //             // Pause all other audios (Crucial for UX)
// // // // // // // // // // // // //             document.querySelectorAll('audio').forEach((el) => {
// // // // // // // // // // // // //                 (el as HTMLAudioElement).pause();
// // // // // // // // // // // // //             });
// // // // // // // // // // // // //             audioRef.current.play();
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //         setIsPlaying(!isPlaying);
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //         <motion.div 
// // // // // // // // // // // // //             ref={ref}
// // // // // // // // // // // // //             className={`flex flex-col md:flex-row items-center gap-8 md:gap-20 mb-32 md:mb-56 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // // // // // // // // // // //         >
            
// // // // // // // // // // // // //             {/* 1. THE CONNECTOR (The "Snake" Branch) */}
// // // // // // // // // // // // //             {/* This draws a line from the center spine to the card */}
// // // // // // // // // // // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-20 ${isEven ? 'right-1/2' : 'left-1/2'} -translate-y-1/2 pointer-events-none`}>
// // // // // // // // // // // // //                 <svg className="w-full h-full" overflow="visible">
// // // // // // // // // // // // //                     {/* The Path */}
// // // // // // // // // // // // //                     <motion.path 
// // // // // // // // // // // // //                         d={isEven ? "M 100% 50% C 50% 50%, 50% 50%, 0% 50%" : "M 0% 50% C 50% 50%, 50% 50%, 100% 50%"}
// // // // // // // // // // // // //                         fill="none"
// // // // // // // // // // // // //                         stroke="#eab308"
// // // // // // // // // // // // //                         strokeWidth="1"
// // // // // // // // // // // // //                         initial={{ pathLength: 0, opacity: 0 }}
// // // // // // // // // // // // //                         animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
// // // // // // // // // // // // //                         transition={{ duration: 1.5, ease: "easeInOut" }}
// // // // // // // // // // // // //                     />
// // // // // // // // // // // // //                     {/* The Dot at the intersection */}
// // // // // // // // // // // // //                     <motion.circle 
// // // // // // // // // // // // //                         cx={isEven ? "100%" : "0%"} 
// // // // // // // // // // // // //                         cy="50%" 
// // // // // // // // // // // // //                         r="3" 
// // // // // // // // // // // // //                         fill="#eab308"
// // // // // // // // // // // // //                         animate={{ scale: isInView ? 1 : 0 }}
// // // // // // // // // // // // //                     />
// // // // // // // // // // // // //                 </svg>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             {/* 2. THE IMAGE (The Portal) */}
// // // // // // // // // // // // //             <div className={`w-full md:w-5/12 flex ${isEven ? 'justify-end' : 'justify-start'} relative group`}>
                
// // // // // // // // // // // // //                 {/* THE "DIVINE LIGHT" (Back Glow) */}
// // // // // // // // // // // // //                 <div 
// // // // // // // // // // // // //                     className={`absolute inset-0 bg-gold-500/30 blur-[80px] rounded-full transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`} 
// // // // // // // // // // // // //                 />

// // // // // // // // // // // // //                 <div className={`
// // // // // // // // // // // // //                     relative w-[280px] h-[380px] md:w-[350px] md:h-[450px] overflow-hidden rounded-sm border 
// // // // // // // // // // // // //                     transition-all duration-700 
// // // // // // // // // // // // //                     ${isInView ? 'border-gold-500 shadow-[0_0_30px_rgba(234,179,8,0.2)] grayscale-0' : 'border-white/10 grayscale blur-[2px]'}
// // // // // // // // // // // // //                 `}>
// // // // // // // // // // // // //                      {member.image_url ? (
// // // // // // // // // // // // //                         <Image 
// // // // // // // // // // // // //                             src={member.image_url} 
// // // // // // // // // // // // //                             alt={member.name} 
// // // // // // // // // // // // //                             fill 
// // // // // // // // // // // // //                             className={`object-cover transition-transform duration-1000 ${isInView ? 'scale-100' : 'scale-110'}`} 
// // // // // // // // // // // // //                         />
// // // // // // // // // // // // //                      ) : (
// // // // // // // // // // // // //                         <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center">
// // // // // // // // // // // // //                             <span className="text-8xl font-serif text-white/10">{member.name.charAt(0)}</span>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                      )}

// // // // // // // // // // // // //                      {/* Play Button Overlay */}
// // // // // // // // // // // // //                      <button 
// // // // // // // // // // // // //                         onClick={toggleAudio}
// // // // // // // // // // // // //                         className={`absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300
// // // // // // // // // // // // //                             ${isPlaying ? 'bg-gold-500 text-black' : 'bg-black/40 text-white hover:bg-white hover:text-black'}
// // // // // // // // // // // // //                         `}
// // // // // // // // // // // // //                      >
// // // // // // // // // // // // //                         {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // // // // // // // //                      </button>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             {/* 3. THE SCRIPT (Text) */}
// // // // // // // // // // // // //             <div className={`w-full md:w-5/12 text-center ${isEven ? 'md:text-left' : 'md:text-right'} z-10`}>
                
// // // // // // // // // // // // //                 <motion.div
// // // // // // // // // // // // //                     initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // // // //                     animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
// // // // // // // // // // // // //                     transition={{ duration: 0.8, delay: 0.2 }}
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                     {/* Role */}
// // // // // // // // // // // // //                     <div className={`inline-flex items-center gap-3 mb-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
// // // // // // // // // // // // //                         <div className={`h-px w-12 ${isInView ? 'bg-gold-500' : 'bg-white/20'}`} />
// // // // // // // // // // // // //                         <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isInView ? 'text-gold-500' : 'text-neutral-500'}`}>
// // // // // // // // // // // // //                             {member.role}
// // // // // // // // // // // // //                         </span>
// // // // // // // // // // // // //                     </div>

// // // // // // // // // // // // //                     {/* Name */}
// // // // // // // // // // // // //                     <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-none">
// // // // // // // // // // // // //                         {member.name}
// // // // // // // // // // // // //                     </h2>

// // // // // // // // // // // // //                     {/* Bio */}
// // // // // // // // // // // // //                     <p className="font-serif italic text-white/60 text-lg mb-8 leading-relaxed">
// // // // // // // // // // // // //                         "{member.bio}"
// // // // // // // // // // // // //                     </p>

// // // // // // // // // // // // //                     {/* Audio Visualizer (If Playing) */}
// // // // // // // // // // // // //                     {isPlaying && (
// // // // // // // // // // // // //                         <div className={`flex gap-1 h-6 mb-6 ${isEven ? 'justify-start' : 'justify-end'}`}>
// // // // // // // // // // // // //                              {[1,2,3,4,5].map(i => (
// // // // // // // // // // // // //                                 <motion.div 
// // // // // // // // // // // // //                                     key={i}
// // // // // // // // // // // // //                                     animate={{ height: [4, 24, 4] }}
// // // // // // // // // // // // //                                     transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
// // // // // // // // // // // // //                                     className="w-1 bg-gold-500" 
// // // // // // // // // // // // //                                 />
// // // // // // // // // // // // //                              ))}
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                     )}
// // // // // // // // // // // // //                     <audio ref={audioRef} src={member.audio_url || "/mock.mp3"} onEnded={() => setIsPlaying(false)} />

// // // // // // // // // // // // //                     {/* Link */}
// // // // // // // // // // // // //                     <Link href={`/artist/${member.slug}`} className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors">
// // // // // // // // // // // // //                         <span>Full Profile</span>
// // // // // // // // // // // // //                         <span className="w-4 h-px bg-neutral-700 group-hover:bg-white transition-colors" />
// // // // // // // // // // // // //                     </Link>
// // // // // // // // // // // // //                 </motion.div>

// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         </motion.div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // --- SUB-COMPONENT: TIMELINE NAV ---
// // // // // // // // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // // // // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];

// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
// // // // // // // // // // // // //             <div className="bg-[#050505]/90 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full flex items-center gap-6 shadow-2xl hover:border-gold-500/30 transition-colors">
// // // // // // // // // // // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-4 mr-2 hidden md:block">
// // // // // // // // // // // // //                     Timeline
// // // // // // // // // // // // //                 </span>
                
// // // // // // // // // // // // //                 {years.map(year => (
// // // // // // // // // // // // //                     <button 
// // // // // // // // // // // // //                         key={year}
// // // // // // // // // // // // //                         className={`text-[10px] font-mono tracking-widest transition-all duration-300 relative group ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-400 hover:text-white'}`}
// // // // // // // // // // // // //                     >
// // // // // // // // // // // // //                         {year}
// // // // // // // // // // // // //                         {currentYear.includes(year) && (
// // // // // // // // // // // // //                             <motion.div layoutId="activeYear" className="absolute -bottom-1 left-0 w-full h-px bg-gold-500" />
// // // // // // // // // // // // //                         )}
// // // // // // // // // // // // //                     </button>
// // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // }

// // // // // // // // // // // // "use client";

// // // // // // // // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // // // // // // // import { motion, useScroll, useSpring, useTransform, useInView, MotionValue } from "framer-motion";
// // // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // // // // // // --- ICONS ---
// // // // // // // // // // // // const PlayIcon = () => (
// // // // // // // // // // // //   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
// // // // // // // // // // // // );
// // // // // // // // // // // // const PauseIcon = () => (
// // // // // // // // // // // //   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
// // // // // // // // // // // // );

// // // // // // // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
  
// // // // // // // // // // // //   // 1. THE GLOBAL THREAD PROGRESS
// // // // // // // // // // // //   const { scrollYProgress } = useScroll({
// // // // // // // // // // // //     target: containerRef,
// // // // // // // // // // // //     offset: ["start start", "end end"]
// // // // // // // // // // // //   });

// // // // // // // // // // // //   // Smooth out the progress for the "Ball" logic
// // // // // // // // // // // //   const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div ref={containerRef} className="relative bg-[#020202]">
      
// // // // // // // // // // // //       {/* 2. THE GLOBAL SPINE (Background Line) */}
// // // // // // // // // // // //       {/* This runs through the entire page */}
// // // // // // // // // // // //       <div className="absolute top-0 left-4 md:left-1/2 md:-translate-x-px w-px h-full bg-white/5 z-0" />

// // // // // // // // // // // //       {/* 3. THE "SPARK" (The Traveling Ball) */}
// // // // // // // // // // // //       {/* It physically moves down the line as you scroll */}
// // // // // // // // // // // //       <div className="fixed top-0 left-4 md:left-1/2 md:-translate-x-px w-px h-full z-0 pointer-events-none">
// // // // // // // // // // // //           <motion.div 
// // // // // // // // // // // //             style={{ scaleY: smoothProgress }}
// // // // // // // // // // // //             className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-gold-500 to-gold-500 origin-top"
// // // // // // // // // // // //           >
// // // // // // // // // // // //              {/* The "Ball" at the tip of the line */}
// // // // // // // // // // // //              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold-500 rounded-full shadow-[0_0_20px_#eab308] translate-y-1/2" />
// // // // // // // // // // // //           </motion.div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* 4. THE HEADER */}
// // // // // // // // // // // //       <section className="h-[80vh] flex flex-col items-center justify-center relative z-10 snap-start">
// // // // // // // // // // // //          <motion.div 
// // // // // // // // // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // // // // // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // // // // // // // //             transition={{ duration: 1.5 }}
// // // // // // // // // // // //             className="text-center"
// // // // // // // // // // // //          >
// // // // // // // // // // // //              <span className="text-gold-500 uppercase tracking-[0.5em] text-[10px] mb-6 block">The Lineage</span>
// // // // // // // // // // // //              <h1 className="text-7xl md:text-9xl font-serif text-white tracking-tight mb-4">
// // // // // // // // // // // //                  The Thread.
// // // // // // // // // // // //              </h1>
// // // // // // // // // // // //              <p className="text-white/40 font-serif italic text-sm md:text-lg">Scroll to ignite the connection.</p>
// // // // // // // // // // // //          </motion.div>
// // // // // // // // // // // //       </section>

// // // // // // // // // // // //       {/* 5. THE CAST (Snap Container) */}
// // // // // // // // // // // //       <div className="relative z-10 w-full">
// // // // // // // // // // // //           {members.map((member, index) => (
// // // // // // // // // // // //               <ThreadNode 
// // // // // // // // // // // //                 key={member.id} 
// // // // // // // // // // // //                 member={member} 
// // // // // // // // // // // //                 index={index} 
// // // // // // // // // // // //               />
// // // // // // // // // // // //           ))}
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* 6. FOOTER */}
// // // // // // // // // // // //       <div className="h-[50vh] flex items-end justify-center pb-20 snap-start">
// // // // // // // // // // // //          <TimeCapsule currentYear={currentYear} />
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // // --- SUB-COMPONENT: THE NODE (The Interactive Section) ---
// // // // // // // // // // // // function ThreadNode({ member, index }: { member: EnsembleMember; index: number }) {
// // // // // // // // // // // //     const isEven = index % 2 === 0;
// // // // // // // // // // // //     const ref = useRef(null);
    
// // // // // // // // // // // //     // TRIGGER LOGIC: 
// // // // // // // // // // // //     // "amount: 0.5" means the animation triggers exactly when 50% of the element is visible (The Center Hit)
// // // // // // // // // // // //     const isInView = useInView(ref, { margin: "-45% 0px -45% 0px", amount: "some" });

// // // // // // // // // // // //     // AUDIO LOGIC
// // // // // // // // // // // //     const [isPlaying, setIsPlaying] = useState(false);
// // // // // // // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // // // // // // // //     const toggleAudio = () => {
// // // // // // // // // // // //         if (!audioRef.current) return;
// // // // // // // // // // // //         if (isPlaying) {
// // // // // // // // // // // //             audioRef.current.pause();
// // // // // // // // // // // //         } else {
// // // // // // // // // // // //             document.querySelectorAll('audio').forEach((el) => (el as HTMLAudioElement).pause());
// // // // // // // // // // // //             audioRef.current.play();
// // // // // // // // // // // //         }
// // // // // // // // // // // //         setIsPlaying(!isPlaying);
// // // // // // // // // // // //     };

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         // SNAP-ALIGN: This forces the scroll to stop exactly here ("Slowing" the user)
// // // // // // // // // // // //         <section 
// // // // // // // // // // // //             ref={ref}
// // // // // // // // // // // //             className="min-h-screen w-full flex items-center justify-center relative snap-center py-20"
// // // // // // // // // // // //         >
// // // // // // // // // // // //             <div className={`relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-32`}>
                
// // // // // // // // // // // //                 {/* 1. THE CENTRAL DOT (The Target) */}
// // // // // // // // // // // //                 <div className="absolute left-4 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
// // // // // // // // // // // //                      <motion.div 
// // // // // // // // // // // //                         animate={{ 
// // // // // // // // // // // //                             scale: isInView ? 1.5 : 1,
// // // // // // // // // // // //                             backgroundColor: isInView ? "#eab308" : "#333" 
// // // // // // // // // // // //                         }}
// // // // // // // // // // // //                         className="w-3 h-3 rounded-full border border-black transition-colors duration-500"
// // // // // // // // // // // //                      />
// // // // // // // // // // // //                      {/* The Shockwave Effect on Hit */}
// // // // // // // // // // // //                      {isInView && (
// // // // // // // // // // // //                          <motion.div 
// // // // // // // // // // // //                             initial={{ scale: 1, opacity: 1 }}
// // // // // // // // // // // //                             animate={{ scale: 3, opacity: 0 }}
// // // // // // // // // // // //                             transition={{ duration: 1, repeat: Infinity }}
// // // // // // // // // // // //                             className="absolute inset-0 bg-gold-500 rounded-full z-[-1]"
// // // // // // // // // // // //                          />
// // // // // // // // // // // //                      )}
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 {/* 2. THE CONNECTOR (The Arrow) */}
// // // // // // // // // // // //                 <div className={`hidden md:block absolute top-1/2 w-1/2 ${isEven ? 'right-1/2 pr-16' : 'left-1/2 pl-16'} -translate-y-1/2 pointer-events-none z-10`}>
// // // // // // // // // // // //                     <svg className="w-full h-12" overflow="visible">
// // // // // // // // // // // //                         <defs>
// // // // // // // // // // // //                             <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
// // // // // // // // // // // //                                 <polygon points="0 0, 10 3.5, 0 7" fill="#eab308" />
// // // // // // // // // // // //                             </marker>
// // // // // // // // // // // //                         </defs>
// // // // // // // // // // // //                         {/* The Beam of Light */}
// // // // // // // // // // // //                         <motion.line 
// // // // // // // // // // // //                             x1={isEven ? "100%" : "0%"} 
// // // // // // // // // // // //                             y1="50%" 
// // // // // // // // // // // //                             x2={isEven ? "0%" : "100%"} 
// // // // // // // // // // // //                             y2="50%" 
// // // // // // // // // // // //                             stroke="#eab308"
// // // // // // // // // // // //                             strokeWidth="1"
// // // // // // // // // // // //                             markerEnd="url(#arrowhead)"
// // // // // // // // // // // //                             initial={{ pathLength: 0, opacity: 0 }}
// // // // // // // // // // // //                             animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
// // // // // // // // // // // //                             transition={{ duration: 0.8, ease: "circOut" }}
// // // // // // // // // // // //                         />
// // // // // // // // // // // //                     </svg>
// // // // // // // // // // // //                 </div>


// // // // // // // // // // // //                 {/* 3. LEFT SIDE (Profile or Text based on Zig-Zag) */}
// // // // // // // // // // // //                 <div className={`order-2 md:order-none ${isEven ? 'md:order-1 flex justify-end' : 'md:order-2 text-left'}`}>
// // // // // // // // // // // //                     {isEven ? (
// // // // // // // // // // // //                         // TEXT BLOCK (Left)
// // // // // // // // // // // //                         <TextBlock member={member} isInView={isInView} align="right" toggleAudio={toggleAudio} isPlaying={isPlaying} />
// // // // // // // // // // // //                     ) : (
// // // // // // // // // // // //                         // IMAGE BLOCK (Left)
// // // // // // // // // // // //                         <ImageBlock member={member} isInView={isInView} toggleAudio={toggleAudio} isPlaying={isPlaying} />
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                 </div>


// // // // // // // // // // // //                 {/* 4. RIGHT SIDE (Profile or Text based on Zig-Zag) */}
// // // // // // // // // // // //                 <div className={`order-1 md:order-none ${isEven ? 'md:order-2 flex justify-start' : 'md:order-1 text-right'}`}>
// // // // // // // // // // // //                      {isEven ? (
// // // // // // // // // // // //                         // IMAGE BLOCK (Right)
// // // // // // // // // // // //                         <ImageBlock member={member} isInView={isInView} toggleAudio={toggleAudio} isPlaying={isPlaying} />
// // // // // // // // // // // //                     ) : (
// // // // // // // // // // // //                         // TEXT BLOCK (Right)
// // // // // // // // // // // //                         <TextBlock member={member} isInView={isInView} align="left" toggleAudio={toggleAudio} isPlaying={isPlaying} />
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* Hidden Audio Element */}
// // // // // // // // // // // //             <audio ref={audioRef} src={member.audio_url || "/mock.mp3"} onEnded={() => setIsPlaying(false)} />

// // // // // // // // // // // //         </section>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }

// // // // // // // // // // // // // --- SUB-COMPONENT: IMAGE BLOCK (The Divine Light) ---
// // // // // // // // // // // // function ImageBlock({ member, isInView, toggleAudio, isPlaying }: any) {
// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="relative group cursor-pointer" onClick={toggleAudio}>
// // // // // // // // // // // //              {/* THE DIVINE LIGHT (Gold Glow) */}
// // // // // // // // // // // //              <motion.div 
// // // // // // // // // // // //                 animate={{ 
// // // // // // // // // // // //                     opacity: isInView ? 0.6 : 0,
// // // // // // // // // // // //                     scale: isInView ? 1.2 : 0.8,
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //                 transition={{ duration: 1.5 }}
// // // // // // // // // // // //                 className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/40 via-gold-500/10 to-transparent blur-2xl rounded-full z-0" 
// // // // // // // // // // // //             />

// // // // // // // // // // // //             {/* THE FRAME */}
// // // // // // // // // // // //             <motion.div 
// // // // // // // // // // // //                 animate={{ 
// // // // // // // // // // // //                     scale: isInView ? 1 : 0.9,
// // // // // // // // // // // //                     borderColor: isInView ? "rgba(234,179,8,0.5)" : "rgba(255,255,255,0.1)",
// // // // // // // // // // // //                     filter: isInView ? "grayscale(0%)" : "grayscale(100%) brightness(50%)"
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //                 transition={{ duration: 1 }}
// // // // // // // // // // // //                 className="relative w-[300px] h-[400px] md:w-[380px] md:h-[500px] border bg-[#050505] overflow-hidden z-10"
// // // // // // // // // // // //             >
// // // // // // // // // // // //                 {member.image_url ? (
// // // // // // // // // // // //                     <Image src={member.image_url} alt={member.name} fill className="object-cover" />
// // // // // // // // // // // //                 ) : (
// // // // // // // // // // // //                     <div className="w-full h-full flex items-center justify-center">
// // // // // // // // // // // //                          <span className="text-9xl font-serif text-white/5">{member.name.charAt(0)}</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 )}
                
// // // // // // // // // // // //                 {/* Play Button Overlay */}
// // // // // // // // // // // //                 <div className={`absolute bottom-6 right-6 w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-500 ${isPlaying ? 'bg-gold-500 border-gold-500 text-black' : 'border-white/20 text-white bg-black/40'}`}>
// // // // // // // // // // // //                     {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             </motion.div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     )
// // // // // // // // // // // // }

// // // // // // // // // // // // // --- SUB-COMPONENT: TEXT BLOCK ---
// // // // // // // // // // // // function TextBlock({ member, isInView, align, toggleAudio, isPlaying }: any) {
// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <motion.div 
// // // // // // // // // // // //             initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
// // // // // // // // // // // //             animate={{ opacity: isInView ? 1 : 0.2, x: 0 }}
// // // // // // // // // // // //             transition={{ duration: 1, delay: 0.2 }}
// // // // // // // // // // // //             className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
// // // // // // // // // // // //         >
// // // // // // // // // // // //             {/* Role Label */}
// // // // // // // // // // // //             <div className="flex items-center gap-4 mb-6">
// // // // // // // // // // // //                  {align === 'right' && <div className={`h-px w-12 transition-colors duration-1000 ${isInView ? 'bg-gold-500' : 'bg-white/10'}`} />}
// // // // // // // // // // // //                  <span className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-1000 ${isInView ? 'text-gold-500' : 'text-neutral-600'}`}>
// // // // // // // // // // // //                     {member.role}
// // // // // // // // // // // //                  </span>
// // // // // // // // // // // //                  {align === 'left' && <div className={`h-px w-12 transition-colors duration-1000 ${isInView ? 'bg-gold-500' : 'bg-white/10'}`} />}
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* Name */}
// // // // // // // // // // // //             <h2 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-[0.8]">
// // // // // // // // // // // //                 {member.name}
// // // // // // // // // // // //             </h2>

// // // // // // // // // // // //             {/* Bio */}
// // // // // // // // // // // //             <p className="font-serif italic text-white/50 text-xl max-w-sm mb-8 leading-relaxed">
// // // // // // // // // // // //                 "{member.bio}"
// // // // // // // // // // // //             </p>

// // // // // // // // // // // //             {/* Profile Link */}
// // // // // // // // // // // //             <Link href={`/artist/${member.slug}`} className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white border-b border-transparent hover:border-white pb-1 transition-colors">
// // // // // // // // // // // //                 View Profile
// // // // // // // // // // // //             </Link>
// // // // // // // // // // // //         </motion.div>
// // // // // // // // // // // //     )
// // // // // // // // // // // // }

// // // // // // // // // // // // // --- FOOTER CAPSULE ---
// // // // // // // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // // // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];
// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="bg-[#050505]/90 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full flex items-center gap-6 shadow-2xl">
// // // // // // // // // // // //             {years.map(year => (
// // // // // // // // // // // //                 <button key={year} className={`text-[10px] tracking-widest transition-colors ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500'}`}>
// // // // // // // // // // // //                     {year}
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //             ))}
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }

// // // // // // // // // // // "use client";

// // // // // // // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // // // // // // import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
// // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // // // // // --- ICONS ---
// // // // // // // // // // // const PlayIcon = () => (
// // // // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
// // // // // // // // // // // );
// // // // // // // // // // // const PauseIcon = () => (
// // // // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
// // // // // // // // // // // );

// // // // // // // // // // // // --- THE MAIN COMPONENT ---
// // // // // // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
  
// // // // // // // // // // //   // SCROLL PROGRESS FOR THE LINE
// // // // // // // // // // //   const { scrollYProgress } = useScroll({
// // // // // // // // // // //     target: containerRef,
// // // // // // // // // // //     offset: ["start center", "end end"]
// // // // // // // // // // //   });
  
// // // // // // // // // // //   const scaleY = useSpring(scrollYProgress, { stiffness: 30, damping: 10 });

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-40 overflow-hidden">
      
// // // // // // // // // // //       {/* 1. THE TITLE HEADER */}
// // // // // // // // // // //       <header className="relative w-full h-[60vh] flex flex-col items-center justify-center z-10">
// // // // // // // // // // //          <motion.div 
// // // // // // // // // // //             initial={{ opacity: 0, y: 30 }}
// // // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //             transition={{ duration: 1 }}
// // // // // // // // // // //             className="text-center"
// // // // // // // // // // //          >
// // // // // // // // // // //              <span className="text-gold-500 uppercase tracking-[0.5em] text-xs mb-4 block">The Aayam Ensemble</span>
// // // // // // // // // // //              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tight">
// // // // // // // // // // //                  The Thread<br/>of Fate.
// // // // // // // // // // //              </h1>
// // // // // // // // // // //          </motion.div>
// // // // // // // // // // //          {/* THE STARTING POINT OF THE THREAD */}
// // // // // // // // // // //          <motion.div 
// // // // // // // // // // //             style={{ scaleY }}
// // // // // // // // // // //             className="absolute bottom-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold-500/50 to-gold-500 origin-top"
// // // // // // // // // // //          />
// // // // // // // // // // //       </header>

// // // // // // // // // // //       {/* 2. THE THREAD (Central Line Background) */}
// // // // // // // // // // //       <div className="absolute top-[60vh] left-1/2 -translate-x-1/2 w-px h-full bg-white/5 z-0" />

// // // // // // // // // // //       {/* 3. THE NODES (People) */}
// // // // // // // // // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20">
// // // // // // // // // // //           {members.map((member, index) => (
// // // // // // // // // // //               <ThreadNode 
// // // // // // // // // // //                 key={member.id} 
// // // // // // // // // // //                 member={member} 
// // // // // // // // // // //                 index={index} 
// // // // // // // // // // //                 isLast={index === members.length - 1}
// // // // // // // // // // //               />
// // // // // // // // // // //           ))}
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* 4. THE TIME CAPSULE (Footer Nav) */}
// // // // // // // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // // // --- INDIVIDUAL NODE (The Person) ---
// // // // // // // // // // // function ThreadNode({ member, index, isLast }: { member: EnsembleMember; index: number; isLast: boolean }) {
// // // // // // // // // // //     const isEven = index % 2 === 0;
// // // // // // // // // // //     const ref = useRef(null);
    
// // // // // // // // // // //     // TRIGGER: Detect when this person is perfectly centered
// // // // // // // // // // //     const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", once: false });

// // // // // // // // // // //     // AUDIO STATE
// // // // // // // // // // //     const [isPlaying, setIsPlaying] = useState(false);
// // // // // // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // // // // // // //     const toggleAudio = () => {
// // // // // // // // // // //         if (!audioRef.current) return;
// // // // // // // // // // //         if (isPlaying) {
// // // // // // // // // // //             audioRef.current.pause();
// // // // // // // // // // //         } else {
// // // // // // // // // // //             document.querySelectorAll('audio').forEach((el) => (el as HTMLAudioElement).pause());
// // // // // // // // // // //             audioRef.current.play();
// // // // // // // // // // //         }
// // // // // // // // // // //         setIsPlaying(!isPlaying);
// // // // // // // // // // //     };

// // // // // // // // // // //     return (
// // // // // // // // // // //         <motion.div 
// // // // // // // // // // //             ref={ref}
// // // // // // // // // // //             // We use opacity here for general fade in, but specific triggers for the light
// // // // // // // // // // //             initial={{ opacity: 0.2 }}
// // // // // // // // // // //             animate={{ opacity: isInView ? 1 : 0.4 }} 
// // // // // // // // // // //             transition={{ duration: 0.8 }}
// // // // // // // // // // //             className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32 md:mb-48 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // // // // // // // // //         >
            
// // // // // // // // // // //             {/* --- UPGRADE 1: THE ACTIVE CONNECTOR (SVG) --- */}
// // // // // // // // // // //             {/* Replaces the static div with a drawing arrow */}
// // // // // // // // // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-12 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
// // // // // // // // // // //                 <svg className="w-full h-full" overflow="visible">
// // // // // // // // // // //                     <motion.line
// // // // // // // // // // //                         x1={isEven ? "100%" : "0%"} y1="50%"
// // // // // // // // // // //                         x2={isEven ? "0%" : "100%"} y2="50%"
// // // // // // // // // // //                         stroke="#eab308"
// // // // // // // // // // //                         strokeWidth="1"
// // // // // // // // // // //                         initial={{ pathLength: 0 }}
// // // // // // // // // // //                         animate={{ pathLength: isInView ? 1 : 0 }}
// // // // // // // // // // //                         transition={{ duration: 1, ease: "circOut" }}
// // // // // // // // // // //                     />
// // // // // // // // // // //                     {/* The "Ball" hitting the profile */}
// // // // // // // // // // //                     <motion.circle 
// // // // // // // // // // //                         cx={isEven ? "0%" : "100%"} 
// // // // // // // // // // //                         cy="50%" 
// // // // // // // // // // //                         r="3" 
// // // // // // // // // // //                         fill="#eab308"
// // // // // // // // // // //                         initial={{ scale: 0 }}
// // // // // // // // // // //                         animate={{ scale: isInView ? 1 : 0 }}
// // // // // // // // // // //                         transition={{ delay: 0.9, type: "spring" }} // Appears right when line finishes
// // // // // // // // // // //                     />
// // // // // // // // // // //                 </svg>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* A. THE PROFILE (Image) */}
// // // // // // // // // // //             <div className="w-full md:w-1/2 flex justify-center relative group">
                
// // // // // // // // // // //                 {/* --- UPGRADE 2: THE DIVINE LIGHT (Automatic) --- */}
// // // // // // // // // // //                 {/* Now triggers on Scroll (isInView), not just Hover */}
// // // // // // // // // // //                 <motion.div 
// // // // // // // // // // //                     animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
// // // // // // // // // // //                     transition={{ duration: 1.2 }}
// // // // // // // // // // //                     className="absolute inset-0 bg-gold-500/20 blur-[80px] rounded-full" 
// // // // // // // // // // //                 />
                
// // // // // // // // // // //                 <motion.div 
// // // // // // // // // // //                     animate={{ 
// // // // // // // // // // //                         filter: isInView ? "grayscale(0%)" : "grayscale(100%)",
// // // // // // // // // // //                         borderColor: isInView ? "rgba(234,179,8,0.5)" : "rgba(255,255,255,0.1)"
// // // // // // // // // // //                     }}
// // // // // // // // // // //                     transition={{ duration: 0.8 }}
// // // // // // // // // // //                     className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] overflow-hidden rounded-sm border bg-black transition-colors duration-500 z-10"
// // // // // // // // // // //                 >
// // // // // // // // // // //                      {member.image_url ? (
// // // // // // // // // // //                         <Image src={member.image_url} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
// // // // // // // // // // //                      ) : (
// // // // // // // // // // //                         <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
// // // // // // // // // // //                             <span className="text-8xl font-serif text-white/10">{member.name.charAt(0)}</span>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                      )}

// // // // // // // // // // //                      {/* UPGRADE 3: INTEGRATED AUDIO BUTTON */}
// // // // // // // // // // //                      <button 
// // // // // // // // // // //                         onClick={toggleAudio}
// // // // // // // // // // //                         className={`absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300
// // // // // // // // // // //                             ${isPlaying ? 'bg-gold-500 border-gold-500 text-black' : 'border-white/20 bg-black/40 text-white hover:bg-white hover:text-black'}
// // // // // // // // // // //                         `}
// // // // // // // // // // //                      >
// // // // // // // // // // //                         {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // // // // // //                      </button>
// // // // // // // // // // //                 </motion.div>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* B. THE STORY (Text) */}
// // // // // // // // // // //             <div className={`w-full md:w-1/2 text-center ${isEven ? 'md:text-left' : 'md:text-right'} z-10`}>
                
// // // // // // // // // // //                 {/* Role Badge */}
// // // // // // // // // // //                 <div className={`inline-flex items-center gap-3 mb-6 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
// // // // // // // // // // //                     <motion.div 
// // // // // // // // // // //                         animate={{ width: isInView ? 40 : 0 }} 
// // // // // // // // // // //                         className="h-px bg-gold-500"
// // // // // // // // // // //                     />
// // // // // // // // // // //                     <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isInView ? 'text-gold-500' : 'text-neutral-500'}`}>
// // // // // // // // // // //                         {member.role}
// // // // // // // // // // //                     </span>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 {/* Name */}
// // // // // // // // // // //                 <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-none">
// // // // // // // // // // //                     {member.name}
// // // // // // // // // // //                 </h2>

// // // // // // // // // // //                 {/* The "One Line" */}
// // // // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-xl mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
// // // // // // // // // // //                     "{member.bio}"
// // // // // // // // // // //                 </p>

// // // // // // // // // // //                 {/* AUDIO WAVEFORM (Only if playing) */}
// // // // // // // // // // //                 {isPlaying && (
// // // // // // // // // // //                     <div className={`flex gap-1 h-4 items-center ${isEven ? 'justify-start' : 'justify-end'}`}>
// // // // // // // // // // //                         {[1,2,3,4,5].map(i => (
// // // // // // // // // // //                             <motion.div 
// // // // // // // // // // //                                 key={i}
// // // // // // // // // // //                                 animate={{ height: [4, 16, 4] }}
// // // // // // // // // // //                                 transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
// // // // // // // // // // //                                 className="w-0.5 bg-gold-500" 
// // // // // // // // // // //                             />
// // // // // // // // // // //                         ))}
// // // // // // // // // // //                         <span className="text-[10px] uppercase tracking-widest text-gold-500 ml-2">Playing Voice</span>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 )}

// // // // // // // // // // //                 <audio ref={audioRef} src={member.audio_url || "/mock-voice.mp3"} onEnded={() => setIsPlaying(false)} />

// // // // // // // // // // //                 {/* PROFILE LINK */}
// // // // // // // // // // //                 <div className={`mt-8 transition-opacity duration-500 flex ${isEven ? 'justify-start' : 'justify-end'} ${isInView ? 'opacity-100' : 'opacity-0'}`}>
// // // // // // // // // // //                     <a href={`/artist/${member.slug}`} className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white border-b border-transparent hover:border-white pb-1 transition-colors">
// // // // // // // // // // //                         View Full Artist Profile
// // // // // // // // // // //                     </a>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //             </div>
// // // // // // // // // // //         </motion.div>
// // // // // // // // // // //     );
// // // // // // // // // // // }

// // // // // // // // // // // // --- THE TIME CAPSULE (Footer Navigation) ---
// // // // // // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];

// // // // // // // // // // //     return (
// // // // // // // // // // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50">
// // // // // // // // // // //             <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl">
// // // // // // // // // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-500 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">
// // // // // // // // // // //                     Time Travel
// // // // // // // // // // //                 </span>
                
// // // // // // // // // // //                 {years.map(year => (
// // // // // // // // // // //                     <button 
// // // // // // // // // // //                         key={year}
// // // // // // // // // // //                         className={`text-xs font-mono tracking-widest transition-all duration-300 ${currentYear.includes(year) ? 'text-gold-500 scale-110 font-bold' : 'text-neutral-400 hover:text-white'}`}
// // // // // // // // // // //                     >
// // // // // // // // // // //                         {year}
// // // // // // // // // // //                     </button>
// // // // // // // // // // //                 ))}
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // }

// // // // // // // // // // "use client";

// // // // // // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // // // // // import { motion, useScroll, useSpring, useInView } from "framer-motion";
// // // // // // // // // // import Image from "next/image";
// // // // // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // // // // --- ICONS ---
// // // // // // // // // // const PlayIcon = () => (
// // // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
// // // // // // // // // // );
// // // // // // // // // // const PauseIcon = () => (
// // // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
// // // // // // // // // // );

// // // // // // // // // // // --- THE MAIN COMPONENT ---
// // // // // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
  
// // // // // // // // // //   // IIT FIX: SHARED AUDIO STATE
// // // // // // // // // //   // Instead of querying the DOM, we track which ID is playing. 
// // // // // // // // // //   // If 'activeAudioId' changes, all others automatically stop reacting.
// // // // // // // // // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // // // // // // // // //   // SCROLL PROGRESS FOR THE MAIN SPINE
// // // // // // // // // //   const { scrollYProgress } = useScroll({
// // // // // // // // // //     target: containerRef,
// // // // // // // // // //     offset: ["start center", "end end"]
// // // // // // // // // //   });
  
// // // // // // // // // //   // Physics-based smoothing for the vertical line
// // // // // // // // // //   const scaleY = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

// // // // // // // // // //   return (
// // // // // // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-40 overflow-hidden">
      
// // // // // // // // // //       {/* 1. THE HEADER (The Source) */}
// // // // // // // // // //       <header className="relative w-full h-[60vh] flex flex-col items-center justify-center z-10">
// // // // // // // // // //          <motion.div 
// // // // // // // // // //             initial={{ opacity: 0, y: 30 }}
// // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // //             transition={{ duration: 1, delay: 0.2 }}
// // // // // // // // // //             className="text-center px-4"
// // // // // // // // // //          >
// // // // // // // // // //              <span className="text-gold-500 uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6 block animate-pulse">The Aayam Ensemble</span>
// // // // // // // // // //              <h1 className="text-5xl md:text-9xl font-serif text-white tracking-tight leading-tight">
// // // // // // // // // //                  The Thread<br/>of Fate.
// // // // // // // // // //              </h1>
// // // // // // // // // //          </motion.div>
         
// // // // // // // // // //          {/* THE SPINE ORIGIN */}
// // // // // // // // // //          <motion.div 
// // // // // // // // // //             style={{ scaleY }}
// // // // // // // // // //             className="absolute bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px h-full bg-gradient-to-b from-transparent via-gold-500/50 to-gold-500 origin-top"
// // // // // // // // // //          />
// // // // // // // // // //       </header>

// // // // // // // // // //       {/* 2. THE SPINE (The Global Line) */}
// // // // // // // // // //       {/* Mobile: Left aligned (1rem). Desktop: Center aligned. */}
// // // // // // // // // //       <div className="absolute top-[60vh] left-4 md:left-1/2 md:-translate-x-px w-px h-full bg-white/5 z-0" />

// // // // // // // // // //       {/* 3. THE NODES (The Actors) */}
// // // // // // // // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-20">
// // // // // // // // // //           {members.map((member, index) => (
// // // // // // // // // //               <ThreadNode 
// // // // // // // // // //                 key={member.id} 
// // // // // // // // // //                 member={member} 
// // // // // // // // // //                 index={index} 
// // // // // // // // // //                 activeAudioId={activeAudioId}
// // // // // // // // // //                 setActiveAudioId={setActiveAudioId}
// // // // // // // // // //               />
// // // // // // // // // //           ))}
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 4. THE FOOTER (Time Travel) */}
// // // // // // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // // --- INDIVIDUAL NODE (The Person) ---
// // // // // // // // // // function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
// // // // // // // // // //     member: EnsembleMember; 
// // // // // // // // // //     index: number; 
// // // // // // // // // //     activeAudioId: string | null; 
// // // // // // // // // //     setActiveAudioId: (id: string | null) => void; 
// // // // // // // // // // }) {
// // // // // // // // // //     const isEven = index % 2 === 0;
// // // // // // // // // //     const ref = useRef(null);
    
// // // // // // // // // //     // HARVARD FIX: FOCAL TRIGGER
// // // // // // // // // //     // margin: "-45%" ensures the event triggers EXACTLY when the element hits the dead center of the viewport.
// // // // // // // // // //     const isInView = useInView(ref, { margin: "-45% 0px -45% 0px", once: false });

// // // // // // // // // //     // AUDIO LOGIC (React Way)
// // // // // // // // // //     const isPlaying = activeAudioId === member.id;
// // // // // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // // // // // //     useEffect(() => {
// // // // // // // // // //         if (!audioRef.current) return;
// // // // // // // // // //         if (isPlaying) {
// // // // // // // // // //             audioRef.current.play().catch(e => console.log("Audio prevented:", e));
// // // // // // // // // //         } else {
// // // // // // // // // //             audioRef.current.pause();
// // // // // // // // // //         }
// // // // // // // // // //     }, [isPlaying]);

// // // // // // // // // //     const toggleAudio = () => {
// // // // // // // // // //         if (isPlaying) {
// // // // // // // // // //             setActiveAudioId(null); // Stop this one
// // // // // // // // // //         } else {
// // // // // // // // // //             setActiveAudioId(member.id); // Start this one (others will auto-stop via effect)
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     return (
// // // // // // // // // //         <motion.div 
// // // // // // // // // //             ref={ref}
// // // // // // // // // //             // PERFORMANCE: 'will-change' tells the browser to optimize for these properties
// // // // // // // // // //             style={{ willChange: "opacity, transform" }}
// // // // // // // // // //             initial={{ opacity: 0.2 }}
// // // // // // // // // //             animate={{ opacity: isInView ? 1 : 0.3 }} 
// // // // // // // // // //             transition={{ duration: 0.8 }}
// // // // // // // // // //             className={`flex flex-col md:flex-row items-center gap-10 md:gap-24 mb-32 md:mb-48 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // // // // // // // //         >
            
// // // // // // // // // //             {/* --- UPGRADE 1: THE ORGANIC CONNECTOR (Bézier Curve) --- */}
// // // // // // // // // //             {/* Desktop Only: A curved vine connecting the spine to the frame */}
// // // // // // // // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
// // // // // // // // // //                 <svg className="w-full h-full" overflow="visible">
// // // // // // // // // //                     {/* The Path: Using 'C' (Cubic Bezier) for a smooth, organic flow instead of a straight line */}
// // // // // // // // // //                     <motion.path
// // // // // // // // // //                         d={isEven 
// // // // // // // // // //                             ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%"  // Right to Left Curve
// // // // // // // // // //                             : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"  // Left to Right Curve
// // // // // // // // // //                         }
// // // // // // // // // //                         fill="none"
// // // // // // // // // //                         stroke="#eab308"
// // // // // // // // // //                         strokeWidth="1.5"
// // // // // // // // // //                         initial={{ pathLength: 0, opacity: 0 }}
// // // // // // // // // //                         animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
// // // // // // // // // //                         // PSYCHOLOGY FIX: Duration is fast (0.8s) to feel like an electrical impulse
// // // // // // // // // //                         transition={{ duration: 0.8, ease: "easeOut" }}
// // // // // // // // // //                     />
                    
// // // // // // // // // //                     {/* The "Spark" Impact Point */}
// // // // // // // // // //                     <motion.circle 
// // // // // // // // // //                         cx={isEven ? "0%" : "100%"} 
// // // // // // // // // //                         cy="50%" 
// // // // // // // // // //                         r="3" 
// // // // // // // // // //                         fill="#eab308"
// // // // // // // // // //                         initial={{ scale: 0 }}
// // // // // // // // // //                         animate={{ scale: isInView ? 1.5 : 0 }}
// // // // // // // // // //                         // SEQUENCE FIX: Delays until the line arrives (0.7s)
// // // // // // // // // //                         transition={{ delay: 0.7, type: "spring", stiffness: 200 }} 
// // // // // // // // // //                     />
// // // // // // // // // //                 </svg>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* --- MOBILE CONNECTOR --- */}
// // // // // // // // // //             {/* Since the main spine is on the left in mobile, we draw a small horizontal line to the card */}
// // // // // // // // // //             <div className="md:hidden absolute left-4 top-[150px] w-8 h-px bg-gold-500/50">
// // // // // // // // // //                  <motion.div 
// // // // // // // // // //                     animate={{ scaleX: isInView ? 1 : 0 }} 
// // // // // // // // // //                     className="w-full h-full bg-gold-500 origin-left"
// // // // // // // // // //                  />
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* A. THE PROFILE (The Artifact) */}
// // // // // // // // // //             <div className="w-full md:w-1/2 flex justify-center relative group pl-12 md:pl-0">
                
// // // // // // // // // //                 {/* --- UPGRADE 2: THE DIVINE LIGHT SEQUENCE --- */}
// // // // // // // // // //                 {/* The Back Glow: Pulses gently when active */}
// // // // // // // // // //                 <motion.div 
// // // // // // // // // //                     animate={{ 
// // // // // // // // // //                         opacity: isInView ? 0.8 : 0, 
// // // // // // // // // //                         scale: isInView ? 1.1 : 0.9 
// // // // // // // // // //                     }}
// // // // // // // // // //                     transition={{ duration: 1.5, delay: 0.5 }} // Delayed to appear AFTER impact
// // // // // // // // // //                     className="absolute inset-0 bg-gold-500/20 blur-[80px] rounded-full mix-blend-screen" 
// // // // // // // // // //                 />
                
// // // // // // // // // //                 <motion.div 
// // // // // // // // // //                     animate={{ 
// // // // // // // // // //                         filter: isInView ? "grayscale(0%)" : "grayscale(100%)",
// // // // // // // // // //                         borderColor: isInView ? "rgba(234,179,8,0.6)" : "rgba(255,255,255,0.1)",
// // // // // // // // // //                         boxShadow: isInView ? "0 0 30px rgba(234,179,8,0.15)" : "none"
// // // // // // // // // //                     }}
// // // // // // // // // //                     transition={{ duration: 0.8, delay: 0.2 }}
// // // // // // // // // //                     className="relative w-[280px] h-[360px] md:w-[380px] md:h-[480px] overflow-hidden rounded-sm border bg-[#050505] z-10"
// // // // // // // // // //                 >
// // // // // // // // // //                      {member.image_url ? (
// // // // // // // // // //                         <Image 
// // // // // // // // // //                             src={member.image_url} 
// // // // // // // // // //                             alt={member.name} 
// // // // // // // // // //                             fill 
// // // // // // // // // //                             sizes="(max-width: 768px) 100vw, 50vw" // MIT FIX: Performance Optimization
// // // // // // // // // //                             className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
// // // // // // // // // //                         />
// // // // // // // // // //                      ) : (
// // // // // // // // // //                         <div className="w-full h-full bg-[#080808] flex items-center justify-center">
// // // // // // // // // //                             <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
// // // // // // // // // //                         </div>
// // // // // // // // // //                      )}

// // // // // // // // // //                      {/* UPGRADE 3: THE INTEGRATED AUDIO CONTROLLER */}
// // // // // // // // // //                      <button 
// // // // // // // // // //                         onClick={toggleAudio}
// // // // // // // // // //                         className={`absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 z-20
// // // // // // // // // //                             ${isPlaying ? 'bg-gold-500 border-gold-500 text-black shadow-[0_0_20px_#eab308]' : 'border-white/20 bg-black/40 text-white hover:bg-white hover:text-black'}
// // // // // // // // // //                         `}
// // // // // // // // // //                         aria-label={isPlaying ? "Pause voice" : "Play voice"}
// // // // // // // // // //                      >
// // // // // // // // // //                         {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // // // // //                      </button>
// // // // // // // // // //                 </motion.div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* B. THE STORY (Text) */}
// // // // // // // // // //             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
// // // // // // // // // //                 {/* Role Badge */}
// // // // // // // // // //                 <div className={`inline-flex items-center gap-3 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// // // // // // // // // //                     <motion.div 
// // // // // // // // // //                         initial={{ width: 0 }}
// // // // // // // // // //                         animate={{ width: isInView ? 40 : 0 }} 
// // // // // // // // // //                         transition={{ duration: 0.8, delay: 0.4 }}
// // // // // // // // // //                         className="h-px bg-gold-500"
// // // // // // // // // //                     />
// // // // // // // // // //                     <span className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-500 ${isInView ? 'text-gold-500' : 'text-neutral-500'}`}>
// // // // // // // // // //                         {member.role}
// // // // // // // // // //                     </span>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* Name */}
// // // // // // // // // //                 <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[0.9] tracking-tight">
// // // // // // // // // //                     {member.name}
// // // // // // // // // //                 </h2>

// // // // // // // // // //                 {/* Bio */}
// // // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-xl mb-8 leading-relaxed max-w-md md:mx-0">
// // // // // // // // // //                     "{member.bio}"
// // // // // // // // // //                 </p>

// // // // // // // // // //                 {/* AUDIO VISUALIZER (Only if playing) */}
// // // // // // // // // //                 <div className={`h-6 flex items-center ${isEven ? 'justify-start' : 'md:justify-end'} gap-1`}>
// // // // // // // // // //                     {isPlaying && (
// // // // // // // // // //                         <>
// // // // // // // // // //                             {[1,2,3,4].map(i => (
// // // // // // // // // //                                 <motion.div 
// // // // // // // // // //                                     key={i}
// // // // // // // // // //                                     animate={{ height: [4, 16, 4] }}
// // // // // // // // // //                                     transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.1 }}
// // // // // // // // // //                                     className="w-0.5 bg-gold-500" 
// // // // // // // // // //                                 />
// // // // // // // // // //                             ))}
// // // // // // // // // //                             <span className="text-[9px] uppercase tracking-widest text-gold-500 ml-2 animate-pulse">Voice Active</span>
// // // // // // // // // //                         </>
// // // // // // // // // //                     )}
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* Hidden Audio Element */}
// // // // // // // // // //                 <audio ref={audioRef} src={member.audio_url || "/mock.mp3"} onEnded={() => setActiveAudioId(null)} />

// // // // // // // // // //                 {/* PROFILE LINK */}
// // // // // // // // // //                 <div className={`mt-8 transition-all duration-700 flex ${isEven ? 'justify-start' : 'md:justify-end'} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
// // // // // // // // // //                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
// // // // // // // // // //                         View Full Artist Profile
// // // // // // // // // //                         <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-500 transition-all duration-300 group-hover:w-full" />
// // // // // // // // // //                     </a>
// // // // // // // // // //                 </div>

// // // // // // // // // //             </div>
// // // // // // // // // //         </motion.div>
// // // // // // // // // //     );
// // // // // // // // // // }

// // // // // // // // // // // --- THE TIME CAPSULE (Footer) ---
// // // // // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];

// // // // // // // // // //     return (
// // // // // // // // // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// // // // // // // // // //             <div className="bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10 px-6 py-4 rounded-full flex items-center gap-4 md:gap-8 shadow-2xl">
// // // // // // // // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-4 mr-2 hidden md:inline-block">
// // // // // // // // // //                     Timeline
// // // // // // // // // //                 </span>
                
// // // // // // // // // //                 {years.map(year => (
// // // // // // // // // //                     <button 
// // // // // // // // // //                         key={year}
// // // // // // // // // //                         className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 ${currentYear.includes(year) ? 'text-gold-500 font-bold scale-110' : 'text-neutral-500 hover:text-white'}`}
// // // // // // // // // //                     >
// // // // // // // // // //                         {year}
// // // // // // // // // //                     </button>
// // // // // // // // // //                 ))}
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // }

// // // // // // // // // "use client";

// // // // // // // // // import { useRef, useState, useEffect, useMemo } from "react";
// // // // // // // // // import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
// // // // // // // // // import Image from "next/image";
// // // // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // // // --- ICONS (Minimalist) ---
// // // // // // // // // const PlayIcon = () => (
// // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
// // // // // // // // // );
// // // // // // // // // const PauseIcon = () => (
// // // // // // // // //   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
// // // // // // // // // );

// // // // // // // // // // --- MAIN ORCHESTRATOR ---
// // // // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // // // // // // // //   // GLOBAL SCROLL PHYSICS
// // // // // // // // //   const { scrollYProgress } = useScroll({
// // // // // // // // //     target: containerRef,
// // // // // // // // //     offset: ["start start", "end end"]
// // // // // // // // //   });
  
// // // // // // // // //   // The "Life Force" of the page - Smooth, heavy physics
// // // // // // // // //   const fluidScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });

// // // // // // // // //   return (
// // // // // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-40 overflow-hidden selection:bg-gold-500/30">
      
// // // // // // // // //       {/* 1. ATMOSPHERE (Cinematic Grain) */}
// // // // // // // // //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

// // // // // // // // //       {/* 2. THE HEADER (The Genesis) */}
// // // // // // // // //       <header className="relative w-full h-[70vh] flex flex-col items-center justify-center z-10">
// // // // // // // // //          <motion.div 
// // // // // // // // //             initial={{ opacity: 0, y: 40 }}
// // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // //             transition={{ duration: 1.2, ease: "easeOut" }}
// // // // // // // // //             className="text-center px-6 relative"
// // // // // // // // //          >
// // // // // // // // //              {/* Decorative Top Line */}
// // // // // // // // //              <motion.div initial={{ height: 0 }} animate={{ height: 60 }} transition={{ duration: 1, delay: 0.5 }} className="absolute -top-24 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent to-gold-500/50" />
             
// // // // // // // // //              <span className="text-gold-500 uppercase tracking-[0.6em] text-[10px] md:text-xs mb-8 block font-medium">The Aayam Lineage</span>
// // // // // // // // //              <h1 className="text-6xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 tracking-tight leading-[0.9]">
// // // // // // // // //                  The Thread<br/>of Fate.
// // // // // // // // //              </h1>
// // // // // // // // //          </motion.div>
         
// // // // // // // // //          {/* THE SOURCE (The Thread Start) */}
// // // // // // // // //          <motion.div 
// // // // // // // // //             style={{ scaleY: fluidScroll }}
// // // // // // // // //             className="absolute bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px h-full bg-gradient-to-b from-transparent via-gold-500 to-gold-500 origin-top shadow-[0_0_15px_rgba(234,179,8,0.5)]"
// // // // // // // // //          />
// // // // // // // // //       </header>

// // // // // // // // //       {/* 3. THE SPINE (Global Axis) */}
// // // // // // // // //       <div className="absolute top-[70vh] left-4 md:left-1/2 md:-translate-x-px w-px h-full bg-white/5 z-0" />

// // // // // // // // //       {/* 4. THE ENSEMBLE (The Nodes) */}
// // // // // // // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-10">
// // // // // // // // //           {members.map((member, index) => (
// // // // // // // // //               <ThreadNode 
// // // // // // // // //                 key={member.id} 
// // // // // // // // //                 member={member} 
// // // // // // // // //                 index={index} 
// // // // // // // // //                 activeAudioId={activeAudioId}
// // // // // // // // //                 setActiveAudioId={setActiveAudioId}
// // // // // // // // //               />
// // // // // // // // //           ))}
// // // // // // // // //       </div>

// // // // // // // // //       {/* 5. FOOTER */}
// // // // // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // // --- THE ACTOR (The Node) ---
// // // // // // // // // function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
// // // // // // // // //     member: EnsembleMember; 
// // // // // // // // //     index: number; 
// // // // // // // // //     activeAudioId: string | null; 
// // // // // // // // //     setActiveAudioId: (id: string | null) => void; 
// // // // // // // // // }) {
// // // // // // // // //     const isEven = index % 2 === 0;
// // // // // // // // //     const ref = useRef<HTMLDivElement>(null);
    
// // // // // // // // //     // IIT LEVEL PHYSICS:
// // // // // // // // //     // Instead of a boolean "isInView", we track the EXACT progress of this element 
// // // // // // // // //     // passing through the viewport (0 = enters bottom, 1 = leaves top).
// // // // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // // // //         target: ref,
// // // // // // // // //         offset: ["start end", "end start"]
// // // // // // // // //     });

// // // // // // // // //     // HARVARD PSYCHOLOGY: 
// // // // // // // // //     // The "Sweet Spot" is 0.5 (Center of screen).
// // // // // // // // //     // We create a "Bell Curve" of activation. 0 -> 1 -> 0 based on proximity to center.
// // // // // // // // //     // This makes the light "dawn" and "dusk" organically.
// // // // // // // // //     const activation = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
// // // // // // // // //     const parallaxY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]); // Internal Image Move
// // // // // // // // //     const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.9, 1, 0.9]);
// // // // // // // // //     const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);
    
// // // // // // // // //     // Derived state for strict boolean triggers (like the line drawing)
// // // // // // // // //     const [isActive, setIsActive] = useState(false);
    
// // // // // // // // //     // Use motion value listener to trigger "hard" state changes
// // // // // // // // //     useEffect(() => {
// // // // // // // // //         return activation.on("change", (v) => {
// // // // // // // // //             setIsActive(v > 0.6); // Trigger "Active" state when 60% prominent
// // // // // // // // //         });
// // // // // // // // //     }, [activation]);

// // // // // // // // //     // AUDIO MANAGEMENT
// // // // // // // // //     const isPlaying = activeAudioId === member.id;
// // // // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const audio = audioRef.current;
// // // // // // // // //         if (!audio) return;

// // // // // // // // //         if (isPlaying) {
// // // // // // // // //             const playPromise = audio.play();
// // // // // // // // //             if (playPromise !== undefined) {
// // // // // // // // //                 playPromise.catch(error => console.log("Playback prevented:", error));
// // // // // // // // //             }
// // // // // // // // //         } else {
// // // // // // // // //             audio.pause();
// // // // // // // // //         }
// // // // // // // // //     }, [isPlaying]);

// // // // // // // // //     const toggleAudio = () => {
// // // // // // // // //         setActiveAudioId(isPlaying ? null : member.id);
// // // // // // // // //     };

// // // // // // // // //     return (
// // // // // // // // //         <motion.div 
// // // // // // // // //             ref={ref}
// // // // // // // // //             style={{ opacity }}
// // // // // // // // //             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-40 md:mb-64 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // // // // // // //         >
            
// // // // // // // // //             {/* --- THE SYNAPTIC CONNECTOR (The Vein) --- */}
// // // // // // // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-32 ${isEven ? 'right-1/2 pr-16' : 'left-1/2 pl-16'} -translate-y-1/2 pointer-events-none`}>
// // // // // // // // //                 <svg className="w-full h-full" overflow="visible">
// // // // // // // // //                     {/* The Pulse Path (Glow) */}
// // // // // // // // //                     <motion.path
// // // // // // // // //                         d={isEven ? "M 100% 50% C 60% 50%, 40% 50%, 0% 50%" : "M 0% 50% C 40% 50%, 60% 50%, 100% 50%"}
// // // // // // // // //                         fill="none"
// // // // // // // // //                         stroke="#eab308"
// // // // // // // // //                         strokeWidth="1"
// // // // // // // // //                         strokeOpacity="0.3"
// // // // // // // // //                         initial={{ pathLength: 0 }}
// // // // // // // // //                         animate={{ pathLength: isActive ? 1 : 0 }}
// // // // // // // // //                         transition={{ duration: 1.5, ease: "easeInOut" }}
// // // // // // // // //                     />
// // // // // // // // //                     {/* The Core Path (White Hot) */}
// // // // // // // // //                     <motion.path
// // // // // // // // //                         d={isEven ? "M 100% 50% C 60% 50%, 40% 50%, 0% 50%" : "M 0% 50% C 40% 50%, 60% 50%, 100% 50%"}
// // // // // // // // //                         fill="none"
// // // // // // // // //                         stroke="#fff"
// // // // // // // // //                         strokeWidth="0.5"
// // // // // // // // //                         initial={{ pathLength: 0 }}
// // // // // // // // //                         animate={{ pathLength: isActive ? 1 : 0 }}
// // // // // // // // //                         transition={{ duration: 1.5, ease: "easeInOut" }}
// // // // // // // // //                     />
// // // // // // // // //                     {/* The Spark (Energy Transfer) */}
// // // // // // // // //                     <motion.circle 
// // // // // // // // //                         cx={isEven ? "0%" : "100%"} cy="50%" r="2" fill="#fff"
// // // // // // // // //                         animate={{ scale: isActive ? [0, 1.5, 0] : 0, opacity: isActive ? [0, 1, 0] : 0 }}
// // // // // // // // //                         transition={{ duration: 0.5, delay: 1.4 }}
// // // // // // // // //                     />
// // // // // // // // //                 </svg>
// // // // // // // // //             </div>

// // // // // // // // //             {/* --- MOBILE CONNECTOR --- */}
// // // // // // // // //             <div className="md:hidden absolute left-4 top-[150px] w-12 h-px bg-gradient-to-r from-gold-500 to-transparent">
// // // // // // // // //                  <motion.div animate={{ scaleX: isActive ? 1 : 0 }} className="w-full h-full bg-white origin-left" />
// // // // // // // // //             </div>

// // // // // // // // //             {/* A. THE PORTRAIT (The Parallax Window) */}
// // // // // // // // //             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
// // // // // // // // //                 {/* 1. Divine Light (Volumetric) */}
// // // // // // // // //                 <motion.div 
// // // // // // // // //                     style={{ opacity: activation, scale }}
// // // // // // // // //                     className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/30 via-gold-500/5 to-transparent blur-[60px] rounded-full mix-blend-screen z-0" 
// // // // // // // // //                 />
                
// // // // // // // // //                 {/* 2. The Frame */}
// // // // // // // // //                 <motion.div 
// // // // // // // // //                     style={{ 
// // // // // // // // //                         borderColor: isActive ? "rgba(234,179,8,0.5)" : "rgba(255,255,255,0.1)",
// // // // // // // // //                         scale
// // // // // // // // //                     }}
// // // // // // // // //                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#050505] z-10 shadow-2xl"
// // // // // // // // //                 >
// // // // // // // // //                      {/* 3. The Image (Parallax Movement) */}
// // // // // // // // //                      {/* The image is taller than the frame and moves UP as you scroll DOWN */}
// // // // // // // // //                      {member.image_url ? (
// // // // // // // // //                         <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
// // // // // // // // //                             <Image 
// // // // // // // // //                                 src={member.image_url} 
// // // // // // // // //                                 alt={member.name} 
// // // // // // // // //                                 fill 
// // // // // // // // //                                 sizes="(max-width: 768px) 100vw, 50vw"
// // // // // // // // //                                 className="object-cover"
// // // // // // // // //                                 priority={index < 2} // Load top images first
// // // // // // // // //                             />
// // // // // // // // //                             {/* B&W to Color Filter */}
// // // // // // // // //                             <motion.div 
// // // // // // // // //                                 style={{ opacity: useTransform(activation, [0.5, 1], [0.8, 0]) }}
// // // // // // // // //                                 className="absolute inset-0 bg-black mix-blend-color" 
// // // // // // // // //                             />
// // // // // // // // //                         </motion.div>
// // // // // // // // //                      ) : (
// // // // // // // // //                         <div className="w-full h-full flex items-center justify-center">
// // // // // // // // //                             <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
// // // // // // // // //                         </div>
// // // // // // // // //                      )}

// // // // // // // // //                      {/* 4. Audio Controls */}
// // // // // // // // //                      <button 
// // // // // // // // //                         onClick={toggleAudio}
// // // // // // // // //                         className="absolute bottom-6 right-6 z-20 group"
// // // // // // // // //                      >
// // // // // // // // //                         {/* Pulse Ring */}
// // // // // // // // //                         {isPlaying && <span className="absolute inset-0 rounded-full border border-gold-500 animate-ping opacity-50" />}
                        
// // // // // // // // //                         <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-500
// // // // // // // // //                             ${isPlaying ? 'bg-gold-500 border-gold-500 text-black' : 'border-white/20 bg-black/40 text-white group-hover:bg-white group-hover:text-black'}
// // // // // // // // //                         `}>
// // // // // // // // //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // // // //                         </div>
// // // // // // // // //                      </button>
// // // // // // // // //                 </motion.div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* B. THE SCRIPT (Typography) */}
// // // // // // // // //             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
// // // // // // // // //                 {/* Role */}
// // // // // // // // //                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// // // // // // // // //                     <motion.div 
// // // // // // // // //                         initial={{ width: 0 }} 
// // // // // // // // //                         animate={{ width: isActive ? 40 : 0 }} 
// // // // // // // // //                         className="h-px bg-gold-500"
// // // // // // // // //                     />
// // // // // // // // //                     <span className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${isActive ? 'text-gold-500' : 'text-neutral-500'}`}>
// // // // // // // // //                         {member.role}
// // // // // // // // //                     </span>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* Name */}
// // // // // // // // //                 <h2 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-[0.85] tracking-tight">
// // // // // // // // //                     <span className="block overflow-hidden">
// // // // // // // // //                         <motion.span 
// // // // // // // // //                             initial={{ y: "100%" }} 
// // // // // // // // //                             animate={{ y: isActive ? "0%" : "100%" }} 
// // // // // // // // //                             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-style easing
// // // // // // // // //                             className="block"
// // // // // // // // //                         >
// // // // // // // // //                             {member.name}
// // // // // // // // //                         </motion.span>
// // // // // // // // //                     </span>
// // // // // // // // //                 </h2>

// // // // // // // // //                 {/* Bio */}
// // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0">
// // // // // // // // //                     "{member.bio}"
// // // // // // // // //                 </p>

// // // // // // // // //                 {/* Active Audio Indicator */}
// // // // // // // // //                 <div className={`h-6 flex items-center ${isEven ? 'justify-start' : 'md:justify-end'} gap-1 opacity-0 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : ''}`}>
// // // // // // // // //                     {[1,2,3,4].map(i => (
// // // // // // // // //                         <motion.div 
// // // // // // // // //                             key={i}
// // // // // // // // //                             animate={{ height: [4, 20, 4] }}
// // // // // // // // //                             transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1, ease: "easeInOut" }}
// // // // // // // // //                             className="w-0.5 bg-gold-500 rounded-full" 
// // // // // // // // //                         />
// // // // // // // // //                     ))}
// // // // // // // // //                     <span className="text-[9px] uppercase tracking-widest text-gold-500 ml-2 font-bold">Voice Active</span>
// // // // // // // // //                 </div>

// // // // // // // // //                 <audio ref={audioRef} src={member.audio_url || "/mock.mp3"} onEnded={() => setActiveAudioId(null)} />

// // // // // // // // //                 {/* Link */}
// // // // // // // // //                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
// // // // // // // // //                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2 overflow-hidden">
// // // // // // // // //                         <span className="relative z-10">View Full Profile</span>
// // // // // // // // //                         <span className="absolute bottom-0 left-0 w-full h-px bg-white/20" />
// // // // // // // // //                         <span className="absolute bottom-0 left-0 w-full h-px bg-gold-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
// // // // // // // // //                     </a>
// // // // // // // // //                 </div>

// // // // // // // // //             </div>
// // // // // // // // //         </motion.div>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // // // // --- TIME CAPSULE (Footer) ---
// // // // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];
// // // // // // // // //     return (
// // // // // // // // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// // // // // // // // //             <nav className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
// // // // // // // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">
// // // // // // // // //                     Timeline
// // // // // // // // //                 </span>
// // // // // // // // //                 {years.map(year => (
// // // // // // // // //                     <button 
// // // // // // // // //                         key={year}
// // // // // // // // //                         className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}
// // // // // // // // //                     >
// // // // // // // // //                         {year}
// // // // // // // // //                         {currentYear.includes(year) && <motion.div layoutId="activeDot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full" />}
// // // // // // // // //                     </button>
// // // // // // // // //                 ))}
// // // // // // // // //             </nav>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // // "use client";

// // // // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // // // import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
// // // // // // // // import Image from "next/image";
// // // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // // --- MINIMALIST ICONS ---
// // // // // // // // const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // // // // // // // const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // // // // // // // // --- THE MASTER COMPONENT ---
// // // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // // // // // // //   // GLOBAL PHYSICS ENGINE
// // // // // // // //   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
// // // // // // // //   // Heavy, viscous spring physics (The "Gold" feeling)
// // // // // // // //   const fluidScroll = useSpring(scrollYProgress, { stiffness: 40, damping: 25, restDelta: 0.0001 });

// // // // // // // //   return (
// // // // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-40 overflow-hidden selection:bg-gold-500/30">
      
// // // // // // // //       {/* 1. THE ATMOSPHERE (Global Grain & Filters) */}
// // // // // // // //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
      
// // // // // // // //       {/* SVG FILTERS (The "Living" Gold) */}
// // // // // // // //       <svg className="absolute w-0 h-0">
// // // // // // // //         <defs>
// // // // // // // //           <filter id="liquid-gold">
// // // // // // // //             <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
// // // // // // // //             <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
// // // // // // // //             <feGaussianBlur stdDeviation="1" />
// // // // // // // //           </filter>
// // // // // // // //         </defs>
// // // // // // // //       </svg>

// // // // // // // //       {/* 2. THE GENESIS (Header) */}
// // // // // // // //       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
// // // // // // // //          <motion.div 
// // // // // // // //             initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
// // // // // // // //             animate={{ opacity: 1, scale: 1, rotateX: 0 }}
// // // // // // // //             transition={{ duration: 1.5, ease: "easeOut" }}
// // // // // // // //             className="text-center px-6"
// // // // // // // //          >
// // // // // // // //              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Lineage</span>
// // // // // // // //              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
// // // // // // // //                  The Thread<br/><span className="text-white/30">of Fate.</span>
// // // // // // // //              </h1>
// // // // // // // //          </motion.div>
         
// // // // // // // //          {/* THE SOURCE (The Thread Start) */}
// // // // // // // //          <div className="absolute bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px h-[40vh] overflow-hidden">
// // // // // // // //              <motion.div 
// // // // // // // //                 style={{ scaleY: fluidScroll }}
// // // // // // // //                 className="w-full h-full bg-gradient-to-b from-transparent via-gold-500 to-gold-500 origin-top shadow-[0_0_20px_#eab308]"
// // // // // // // //              />
// // // // // // // //          </div>
// // // // // // // //       </header>

// // // // // // // //       {/* 3. THE SPINE (Global Axis) */}
// // // // // // // //       <div className="absolute top-[80vh] left-4 md:left-1/2 md:-translate-x-px w-px h-full bg-white/5 z-0" />

// // // // // // // //       {/* 4. THE ENSEMBLE (The Nodes) */}
// // // // // // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
// // // // // // // //           {members.map((member, index) => (
// // // // // // // //               <ThreadNode 
// // // // // // // //                 key={member.id} 
// // // // // // // //                 member={member} 
// // // // // // // //                 index={index} 
// // // // // // // //                 activeAudioId={activeAudioId}
// // // // // // // //                 setActiveAudioId={setActiveAudioId}
// // // // // // // //               />
// // // // // // // //           ))}
// // // // // // // //       </div>

// // // // // // // //       {/* 5. FOOTER */}
// // // // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // // --- THE ACTOR (The Node) ---
// // // // // // // // function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
// // // // // // // //     member: EnsembleMember; 
// // // // // // // //     index: number; 
// // // // // // // //     activeAudioId: string | null; 
// // // // // // // //     setActiveAudioId: (id: string | null) => void; 
// // // // // // // // }) {
// // // // // // // //     const isEven = index % 2 === 0;
// // // // // // // //     const ref = useRef<HTMLDivElement>(null);
    
// // // // // // // //     // PHYSICS: Viewport Intersection
// // // // // // // //     const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

// // // // // // // //     // TRANSFORMATIONS (The "Bell Curve" of Attention)
// // // // // // // //     // 0.0 -> 0.5 (Peak) -> 1.0
// // // // // // // //     const activation = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]); 
// // // // // // // //     const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]); // Image Parallax
// // // // // // // //     const textParallax = useTransform(scrollYProgress, [0.2, 0.8], ["5%", "-5%"]); // Text Parallax (Subtle)
    
// // // // // // // //     // BOOLEAN STATE (For "Hard" triggers like line drawing)
// // // // // // // //     const [isActive, setIsActive] = useState(false);
// // // // // // // //     useEffect(() => activation.on("change", v => setIsActive(v > 0.6)), [activation]);

// // // // // // // //     // AUDIO LOGIC
// // // // // // // //     const isPlaying = activeAudioId === member.id;
// // // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);
    
// // // // // // // //     useEffect(() => {
// // // // // // // //         const audio = audioRef.current;
// // // // // // // //         if (!audio) return;
// // // // // // // //         if (isPlaying) {
// // // // // // // //             audio.play().catch(() => {});
// // // // // // // //         } else {
// // // // // // // //             audio.pause();
// // // // // // // //         }
// // // // // // // //     }, [isPlaying]);

// // // // // // // //     return (
// // // // // // // //         <motion.div 
// // // // // // // //             ref={ref}
// // // // // // // //             style={{ opacity: useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]) }} // Fade in/out whole block
// // // // // // // //             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-80 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // // // // // //         >
            
// // // // // // // //             {/* --- 1. THE SYNAPSE (Desktop Connector) --- */}
// // // // // // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-32 ${isEven ? 'right-1/2 pr-16' : 'left-1/2 pl-16'} -translate-y-1/2 pointer-events-none`}>
// // // // // // // //                 <svg className="w-full h-full" overflow="visible">
// // // // // // // //                     {/* The Glow Path (Blurry) */}
// // // // // // // //                     <motion.path
// // // // // // // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // // // // // // //                         fill="none" stroke="#eab308" strokeWidth="2" strokeOpacity="0.2" filter="url(#liquid-gold)"
// // // // // // // //                         animate={{ pathLength: isActive ? 1 : 0 }} transition={{ duration: 1.2, ease: "easeInOut" }}
// // // // // // // //                     />
// // // // // // // //                     {/* The Core Wire (Sharp) */}
// // // // // // // //                     <motion.path
// // // // // // // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // // // // // // //                         fill="none" stroke="#fff" strokeWidth="1"
// // // // // // // //                         animate={{ pathLength: isActive ? 1 : 0 }} transition={{ duration: 1.2, ease: "easeInOut" }}
// // // // // // // //                     />
// // // // // // // //                     {/* The Spark (Travelling Energy) */}
// // // // // // // //                     <motion.circle 
// // // // // // // //                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#eab308"
// // // // // // // //                         animate={{ scale: isActive ? [0, 1.5, 0] : 0, opacity: isActive ? [0, 1, 0] : 0 }}
// // // // // // // //                         transition={{ duration: 0.6, delay: 1.1 }}
// // // // // // // //                     />
// // // // // // // //                 </svg>
// // // // // // // //             </div>

// // // // // // // //             {/* --- 2. THE JUNCTION (Mobile Connector) --- */}
// // // // // // // //             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
// // // // // // // //                 {/* The glowing active line segment */}
// // // // // // // //                  <motion.div 
// // // // // // // //                     style={{ height: useTransform(activation, [0, 1], ["0%", "100%"]), opacity: activation }}
// // // // // // // //                     className="absolute top-0 left-0 w-full bg-gold-500 shadow-[0_0_10px_#eab308]"
// // // // // // // //                  />
// // // // // // // //                  {/* The horizontal plug into the card */}
// // // // // // // //                  <motion.div 
// // // // // // // //                     style={{ scaleX: isActive ? 1 : 0 }}
// // // // // // // //                     className="absolute top-1/2 left-0 w-8 h-px bg-gold-500 origin-left shadow-[0_0_10px_#eab308]"
// // // // // // // //                  />
// // // // // // // //             </div>

// // // // // // // //             {/* --- 3. THE PORTRAIT (Parallax Window) --- */}
// // // // // // // //             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
// // // // // // // //                 {/* A. The Living Light (Turbulence Filter) */}
// // // // // // // //                 <motion.div 
// // // // // // // //                     style={{ opacity: activation, scale: useTransform(activation, [0, 1], [0.8, 1.2]) }}
// // // // // // // //                     className="absolute inset-0 bg-gold-500/20 rounded-full blur-[50px] mix-blend-screen z-0" 
// // // // // // // //                 />

// // // // // // // //                 {/* B. The Frame */}
// // // // // // // //                 <motion.div 
// // // // // // // //                     style={{ 
// // // // // // // //                         borderColor: isActive ? "rgba(234,179,8,0.6)" : "rgba(255,255,255,0.1)",
// // // // // // // //                         boxShadow: isActive ? "0 0 50px rgba(234,179,8,0.1)" : "none"
// // // // // // // //                     }}
// // // // // // // //                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10 transition-colors duration-700"
// // // // // // // //                 >
// // // // // // // //                      {/* C. Image Parallax Container */}
// // // // // // // //                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-15%] w-[130%] h-[130%]">
// // // // // // // //                         {member.image_url ? (
// // // // // // // //                             <Image 
// // // // // // // //                                 src={member.image_url} alt={member.name} fill 
// // // // // // // //                                 sizes="(max-width: 768px) 100vw, 50vw"
// // // // // // // //                                 className="object-cover" priority={index < 2}
// // // // // // // //                             />
// // // // // // // //                         ) : (
// // // // // // // //                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // // // // // // //                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                         {/* B&W Filter Overlay */}
// // // // // // // //                         <motion.div 
// // // // // // // //                             style={{ opacity: useTransform(activation, [0.5, 1], [1, 0]) }}
// // // // // // // //                             className="absolute inset-0 bg-black/80 mix-blend-saturation" 
// // // // // // // //                         />
// // // // // // // //                      </motion.div>

// // // // // // // //                      {/* D. Integrated Audio Button */}
// // // // // // // //                      <button 
// // // // // // // //                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
// // // // // // // //                         className="absolute bottom-6 right-6 z-30 group"
// // // // // // // //                         aria-label={isPlaying ? "Pause" : "Play"}
// // // // // // // //                      >
// // // // // // // //                         <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-500
// // // // // // // //                             ${isPlaying ? 'bg-gold-500 border-gold-500 text-black shadow-[0_0_20px_#eab308]' : 'border-white/20 bg-black/20 text-white hover:bg-white hover:text-black'}
// // // // // // // //                         `}>
// // // // // // // //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // // //                         </div>
// // // // // // // //                      </button>
// // // // // // // //                 </motion.div>
// // // // // // // //             </div>

// // // // // // // //             {/* --- 4. THE NARRATIVE (Text) --- */}
// // // // // // // //             <motion.div 
// // // // // // // //                 style={{ y: textParallax }}
// // // // // // // //                 className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}
// // // // // // // //             >
                
// // // // // // // //                 {/* Role */}
// // // // // // // //                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// // // // // // // //                     <motion.div initial={{ width: 0 }} animate={{ width: isActive ? 40 : 0 }} className="h-px bg-gold-500 shadow-[0_0_10px_#eab308]" />
// // // // // // // //                     <span className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${isActive ? 'text-gold-500' : 'text-neutral-500'}`}>
// // // // // // // //                         {member.role}
// // // // // // // //                     </span>
// // // // // // // //                 </div>

// // // // // // // //                 {/* Name Reveal (Masked) */}
// // // // // // // //                 <div className="overflow-hidden mb-6">
// // // // // // // //                     <motion.h2 
// // // // // // // //                         initial={{ y: "100%" }} 
// // // // // // // //                         animate={{ y: isActive ? "0%" : "100%" }} 
// // // // // // // //                         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
// // // // // // // //                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
// // // // // // // //                     >
// // // // // // // //                         {member.name}
// // // // // // // //                     </motion.h2>
// // // // // // // //                 </div>

// // // // // // // //                 {/* Bio */}
// // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0">
// // // // // // // //                     "{member.bio}"
// // // // // // // //                 </p>

// // // // // // // //                 {/* Live Audio Visualizer */}
// // // // // // // //                 <div className={`h-8 flex items-end ${isEven ? 'justify-start' : 'md:justify-end'} gap-1 opacity-0 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : ''}`}>
// // // // // // // //                     {[1,2,3,4,5].map(i => (
// // // // // // // //                         <AudioBar key={i} delay={i * 0.1} />
// // // // // // // //                     ))}
// // // // // // // //                     <span className="text-[9px] uppercase tracking-widest text-gold-500 ml-3 mb-1 font-bold">Live Signal</span>
// // // // // // // //                 </div>

// // // // // // // //                 <audio ref={audioRef} src={member.audio_url || "/mock.mp3"} onEnded={() => setActiveAudioId(null)} />

// // // // // // // //                 {/* Profile Link */}
// // // // // // // //                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
// // // // // // // //                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2 overflow-hidden">
// // // // // // // //                         <span className="relative z-10">Explore Profile</span>
// // // // // // // //                         <span className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
// // // // // // // //                         <span className="absolute bottom-0 left-0 w-full h-px bg-gold-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-expo" />
// // // // // // // //                     </a>
// // // // // // // //                 </div>

// // // // // // // //             </motion.div>
// // // // // // // //         </motion.div>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // // // --- SUB-COMPONENT: AUDIO BAR (Optimized) ---
// // // // // // // // // Separated to prevent re-rendering the whole parent on animation frame
// // // // // // // // function AudioBar({ delay }: { delay: number }) {
// // // // // // // //     return (
// // // // // // // //         <motion.div 
// // // // // // // //             animate={{ height: [4, 24, 8, 16, 4] }}
// // // // // // // //             transition={{ repeat: Infinity, duration: 0.8, delay: delay, ease: "linear" }}
// // // // // // // //             className="w-0.5 bg-gold-500 rounded-full" 
// // // // // // // //         />
// // // // // // // //     )
// // // // // // // // }

// // // // // // // // // --- SUB-COMPONENT: TIME CAPSULE (Footer) ---
// // // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];
// // // // // // // //     return (
// // // // // // // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// // // // // // // //             <nav className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
// // // // // // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">Timeline</span>
// // // // // // // //                 {years.map(year => (
// // // // // // // //                     <button key={year} className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}>
// // // // // // // //                         {year}
// // // // // // // //                         {currentYear.includes(year) && <motion.div layoutId="activeDot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#eab308]" />}
// // // // // // // //                     </button>
// // // // // // // //                 ))}
// // // // // // // //             </nav>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // "use client";

// // // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // // import { motion, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValueEvent } from "framer-motion";
// // // // // // // import Image from "next/image";
// // // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // // --- ICONS ---
// // // // // // // const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // // // // // // const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // // // // // // // --- MAIN COMPONENT ---
// // // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // // // // // //   // 1. GLOBAL SCROLL PHYSICS
// // // // // // //   const { scrollYProgress } = useScroll({
// // // // // // //     target: containerRef,
// // // // // // //     offset: ["start start", "end end"]
// // // // // // //   });
  
// // // // // // //   // Smooth out the jitter
// // // // // // //   const smoothY = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

// // // // // // //   return (
// // // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-40 overflow-hidden selection:bg-gold-500/30">
      
// // // // // // //       {/* NOISE FILTER (Subtle Texture) */}
// // // // // // //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />

// // // // // // //       {/* 2. HEADER */}
// // // // // // //       <header className="relative w-full h-[70vh] flex flex-col items-center justify-center z-10">
// // // // // // //          <motion.div 
// // // // // // //             initial={{ opacity: 0, y: 50 }}
// // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // //             transition={{ duration: 1.2 }}
// // // // // // //             className="text-center px-6"
// // // // // // //          >
// // // // // // //              <span className="text-gold-500 uppercase tracking-[0.6em] text-[10px] md:text-xs mb-8 block font-bold animate-pulse">The Aayam Lineage</span>
// // // // // // //              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
// // // // // // //                  The Thread<br/>of Fate.
// // // // // // //              </h1>
// // // // // // //          </motion.div>
         
// // // // // // //          {/* THE SOURCE SPARK (The Ball that starts it all) */}
// // // // // // //          <div className="absolute bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px h-[30vh] overflow-visible">
// // // // // // //              <motion.div 
// // // // // // //                 style={{ scaleY: smoothY }}
// // // // // // //                 className="w-full h-full bg-gradient-to-b from-transparent via-gold-500 to-gold-500 origin-top"
// // // // // // //              />
// // // // // // //          </div>
// // // // // // //       </header>

// // // // // // //       {/* 3. THE GLOBAL SPINE (With the Traveling Dot) */}
// // // // // // //       <div className="absolute top-[70vh] left-4 md:left-1/2 md:-translate-x-px w-px h-full bg-white/5 z-0">
// // // // // // //           {/* THE TRAVELING LIGHT (The "Dot" on the main line) */}
// // // // // // //           {/* This moves exactly with your scroll position down the entire page */}
// // // // // // //           <motion.div 
// // // // // // //             style={{ top: useTransform(smoothY, [0, 1], ["0%", "100%"]) }}
// // // // // // //             className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gold-500 rounded-full shadow-[0_0_15px_#eab308] z-20"
// // // // // // //           />
// // // // // // //       </div>

// // // // // // //       {/* 4. THE ENSEMBLE NODES */}
// // // // // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
// // // // // // //           {members.map((member, index) => (
// // // // // // //               <ThreadNode 
// // // // // // //                 key={member.id} 
// // // // // // //                 member={member} 
// // // // // // //                 index={index} 
// // // // // // //                 activeAudioId={activeAudioId}
// // // // // // //                 setActiveAudioId={setActiveAudioId}
// // // // // // //               />
// // // // // // //           ))}
// // // // // // //       </div>

// // // // // // //       {/* 5. FOOTER */}
// // // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // // --- THE INDIVIDUAL ACTOR NODE ---
// // // // // // // function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
// // // // // // //     member: EnsembleMember; 
// // // // // // //     index: number; 
// // // // // // //     activeAudioId: string | null; 
// // // // // // //     setActiveAudioId: (id: string | null) => void; 
// // // // // // // }) {
// // // // // // //     const isEven = index % 2 === 0;
// // // // // // //     const ref = useRef<HTMLDivElement>(null);
    
// // // // // // //     // PHYSICS: SCROLL MAPPING
// // // // // // //     // We map the scroll to animation values directly. No State.
// // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // //         target: ref,
// // // // // // //         offset: ["start end", "center center"] 
// // // // // // //     });

// // // // // // //     // 1. ACTIVATION CURVE: 0 -> 1 as it hits the center
// // // // // // //     const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
    
// // // // // // //     // 2. PARALLAX: Image moves slightly slower than text
// // // // // // //     const parallaxY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);
    
// // // // // // //     // 3. OPACITY/SCALE: Fades in as it approaches
// // // // // // //     const opacity = useTransform(smoothProgress, [0, 0.8], [0.2, 1]);
// // // // // // //     const scale = useTransform(smoothProgress, [0, 0.8], [0.8, 1]);
    
// // // // // // //     // 4. THE CONNECTOR LINE LOGIC (Directly mapped)
// // // // // // //     // The line draws from 0 to 1 based on scroll progress
// // // // // // //     const lineDraw = useTransform(smoothProgress, [0.4, 1], [0, 1]); 

// // // // // // //     // AUDIO LOGIC
// // // // // // //     const isPlaying = activeAudioId === member.id;
// // // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // // //     useEffect(() => {
// // // // // // //         if (!audioRef.current) return;
// // // // // // //         if (isPlaying) audioRef.current.play().catch(() => {});
// // // // // // //         else audioRef.current.pause();
// // // // // // //     }, [isPlaying]);

// // // // // // //     return (
// // // // // // //         <motion.div 
// // // // // // //             ref={ref}
// // // // // // //             style={{ opacity, scale }}
// // // // // // //             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-40 md:mb-64 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // // // // //         >
            
// // // // // // //             {/* --- 1. THE HORIZONTAL SNAKE (The Logic Fix) --- */}
// // // // // // //             {/* We use 'motion.path' mapped directly to 'lineDraw' (scroll position) */}
// // // // // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-16' : 'left-1/2 pl-16'} -translate-y-1/2 pointer-events-none`}>
// // // // // // //                 <svg className="w-full h-full" overflow="visible">
// // // // // // //                     {/* Background Trace (Dim) */}
// // // // // // //                     <path
// // // // // // //                         d={isEven ? "M 100% 50% C 60% 50%, 40% 50%, 0% 50%" : "M 0% 50% C 40% 50%, 60% 50%, 100% 50%"}
// // // // // // //                         fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.1"
// // // // // // //                     />
                    
// // // // // // //                     {/* The Active Line (Bright Gold) - Draws with Scroll */}
// // // // // // //                     <motion.path
// // // // // // //                         d={isEven ? "M 100% 50% C 60% 50%, 40% 50%, 0% 50%" : "M 0% 50% C 40% 50%, 60% 50%, 100% 50%"}
// // // // // // //                         fill="none" 
// // // // // // //                         stroke="#eab308" 
// // // // // // //                         strokeWidth="2"
// // // // // // //                         style={{ pathLength: lineDraw }} // DIRECT MAPPING
// // // // // // //                     />

// // // // // // //                     {/* The "Traveling Dot" (The Impact) */}
// // // // // // //                     {/* We can cheat the curve math by scaling a circle at the END of the line */}
// // // // // // //                     {/* But to make it travel, we use a Mask logic or simpler: The 'Head' of the line is the dot */}
                    
// // // // // // //                     {/* THE IMPACT SPARK: Only appears when line finishes drawing (progress > 0.95) */}
// // // // // // //                     <motion.circle 
// // // // // // //                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
// // // // // // //                         style={{ 
// // // // // // //                             scale: useTransform(lineDraw, [0.9, 1], [0, 1.5]), // Pops in at the end
// // // // // // //                             opacity: useTransform(lineDraw, [0.9, 1], [0, 1])
// // // // // // //                         }}
// // // // // // //                     />
                    
// // // // // // //                     {/* THE GLOW PULSE (Always beating) */}
// // // // // // //                     <motion.circle 
// // // // // // //                         cx={isEven ? "0%" : "100%"} cy="50%" r="6" fill="#eab308"
// // // // // // //                         initial={{ opacity: 0 }}
// // // // // // //                         animate={{ opacity: [0, 0.5, 0], scale: [1, 2, 1] }}
// // // // // // //                         transition={{ repeat: Infinity, duration: 2 }}
// // // // // // //                         style={{ opacity: useTransform(lineDraw, [0.95, 1], [0, 1]) }} // Only pulses when connected
// // // // // // //                     />
// // // // // // //                 </svg>
// // // // // // //             </div>

// // // // // // //             {/* --- 2. MOBILE CONNECTOR (Simple & Robust) --- */}
// // // // // // //             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
// // // // // // //                 {/* Vertical Fill */}
// // // // // // //                 <motion.div 
// // // // // // //                     style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
// // // // // // //                     className="absolute top-0 left-0 w-full bg-gold-500"
// // // // // // //                 />
// // // // // // //                 {/* Horizontal Plug */}
// // // // // // //                 <motion.div 
// // // // // // //                     style={{ scaleX: useTransform(smoothProgress, [0.5, 1], [0, 1]) }}
// // // // // // //                     className="absolute top-1/2 left-0 w-8 h-px bg-gold-500 origin-left"
// // // // // // //                 />
// // // // // // //             </div>

// // // // // // //             {/* --- 3. THE PORTRAIT (The Destination) --- */}
// // // // // // //             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
// // // // // // //                 {/* DIVINE LIGHT (Mapped to Scroll - No State) */}
// // // // // // //                 <motion.div 
// // // // // // //                     style={{ 
// // // // // // //                         opacity: useTransform(smoothProgress, [0.8, 1], [0, 0.8]), // Lights up at the end
// // // // // // //                         scale: useTransform(smoothProgress, [0.8, 1], [0.8, 1.1])
// // // // // // //                     }}
// // // // // // //                     className="absolute inset-0 bg-gold-500/20 rounded-full blur-[60px] z-0" 
// // // // // // //                 />

// // // // // // //                 <motion.div 
// // // // // // //                     style={{ 
// // // // // // //                         borderColor: useTransform(smoothProgress, [0.8, 1], ["rgba(255,255,255,0.1)", "rgba(234,179,8,0.6)"]),
// // // // // // //                     }}
// // // // // // //                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10"
// // // // // // //                 >
// // // // // // //                      {/* IMAGE WITH PARALLAX */}
// // // // // // //                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
// // // // // // //                         {member.image_url ? (
// // // // // // //                             <Image src={member.image_url} alt={member.name} fill className="object-cover" priority={index < 2} />
// // // // // // //                         ) : (
// // // // // // //                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // // // // // //                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                         {/* B&W Filter that fades away */}
// // // // // // //                         <motion.div 
// // // // // // //                             style={{ opacity: useTransform(smoothProgress, [0.5, 1], [1, 0]) }}
// // // // // // //                             className="absolute inset-0 bg-black/80 mix-blend-saturation" 
// // // // // // //                         />
// // // // // // //                      </motion.div>

// // // // // // //                      {/* AUDIO BUTTON */}
// // // // // // //                      <button 
// // // // // // //                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
// // // // // // //                         className="absolute bottom-6 right-6 z-30 group"
// // // // // // //                      >
// // // // // // //                         {isPlaying && <span className="absolute inset-0 rounded-full border border-gold-500 animate-ping opacity-50" />}
// // // // // // //                         <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300 ${isPlaying ? 'bg-gold-500 border-gold-500 text-black' : 'border-white/20 bg-black/20 text-white'}`}>
// // // // // // //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // // //                         </div>
// // // // // // //                      </button>
// // // // // // //                 </motion.div>
// // // // // // //             </div>

// // // // // // //             {/* --- 4. THE NARRATIVE --- */}
// // // // // // //             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
// // // // // // //                 {/* Role */}
// // // // // // //                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// // // // // // //                     <motion.div style={{ width: useTransform(smoothProgress, [0.5, 1], [0, 40]) }} className="h-px bg-gold-500" />
// // // // // // //                     <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500">
// // // // // // //                         {member.role}
// // // // // // //                     </span>
// // // // // // //                 </div>

// // // // // // //                 {/* Name */}
// // // // // // //                 <div className="overflow-hidden mb-6">
// // // // // // //                     <motion.h2 
// // // // // // //                         style={{ y: useTransform(smoothProgress, [0.3, 1], ["100%", "0%"]) }}
// // // // // // //                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
// // // // // // //                     >
// // // // // // //                         {member.name}
// // // // // // //                     </motion.h2>
// // // // // // //                 </div>

// // // // // // //                 {/* Bio */}
// // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0">
// // // // // // //                     "{member.bio}"
// // // // // // //                 </p>

// // // // // // //                 {/* Profile Link */}
// // // // // // //                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
// // // // // // //                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
// // // // // // //                         View Full Profile
// // // // // // //                         <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-500 transition-all duration-500 group-hover:w-full" />
// // // // // // //                     </a>
// // // // // // //                 </div>

// // // // // // //             </div>
// // // // // // //         </motion.div>
// // // // // // //     );
// // // // // // // }

// // // // // // // // --- FOOTER ---
// // // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];
// // // // // // //     return (
// // // // // // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// // // // // // //             <nav className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
// // // // // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">Timeline</span>
// // // // // // //                 {years.map(year => (
// // // // // // //                     <button key={year} className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}>
// // // // // // //                         {year}
// // // // // // //                         {currentYear.includes(year) && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#eab308]" />}
// // // // // // //                     </button>
// // // // // // //                 ))}
// // // // // // //             </nav>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }

// // // // // // "use client";

// // // // // // import { useRef, useState, useEffect } from "react";
// // // // // // import { motion, useScroll, useSpring, useTransform, useVelocity, useMotionValueEvent } from "framer-motion";
// // // // // // import Image from "next/image";
// // // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // // --- PURE ICONS ---
// // // // // // const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // // // // // const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // // // // // // --- THE MASTER COMPONENT ---
// // // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // // // // //   // 1. GLOBAL PHYSICS ENGINE
// // // // // //   const { scrollYProgress } = useScroll({
// // // // // //     target: containerRef,
// // // // // //     offset: ["start start", "end end"]
// // // // // //   });

// // // // // //   // "Heavy" fluid physics to make the line feel liquid (Mass: 0.5 slows it down)
// // // // // //   const fluidScroll = useSpring(scrollYProgress, { stiffness: 40, damping: 30, mass: 0.5 });

// // // // // //   return (
// // // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden selection:bg-gold-500/30">
      
// // // // // //       {/* GLOBAL GRAIN TEXTURE */}
// // // // // //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />

// // // // // //       {/* 2. HEADER SECTION */}
// // // // // //       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
// // // // // //          <motion.div 
// // // // // //             initial={{ opacity: 0, scale: 0.95 }}
// // // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // // //             transition={{ duration: 1.5, ease: "easeOut" }}
// // // // // //             className="text-center px-6 relative z-20"
// // // // // //          >
// // // // // //              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
// // // // // //              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
// // // // // //                  The Thread<br/><span className="text-white/30">of Fate.</span>
// // // // // //              </h1>
// // // // // //          </motion.div>
// // // // // //       </header>

// // // // // //       {/* 3. THE CENTRAL NERVOUS SYSTEM (The Spine) */}
// // // // // //       <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
          
// // // // // //           {/* THE GOLD FILL (The "Thermometer" Effect) */}
// // // // // //           <motion.div 
// // // // // //              style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
// // // // // //              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-400 to-white shadow-[0_0_20px_#eab308]"
// // // // // //           >
// // // // // //               {/* THE LEADING EDGE (The "Dot" - now stays at the tip of the fill) */}
// // // // // //               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
// // // // // //           </motion.div>

// // // // // //       </div>

// // // // // //       {/* 4. THE ENSEMBLE NODES */}
// // // // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
// // // // // //           {members.map((member, index) => (
// // // // // //               <ThreadNode 
// // // // // //                 key={member.id} 
// // // // // //                 member={member} 
// // // // // //                 index={index} 
// // // // // //                 activeAudioId={activeAudioId}
// // // // // //                 setActiveAudioId={setActiveAudioId}
// // // // // //               />
// // // // // //           ))}
// // // // // //       </div>

// // // // // //       {/* 5. FOOTER */}
// // // // // //       <TimeCapsule currentYear={currentYear} />

// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // // --- INDIVIDUAL ACTOR NODE ---
// // // // // // function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
// // // // // //     member: EnsembleMember; 
// // // // // //     index: number; 
// // // // // //     activeAudioId: string | null; 
// // // // // //     setActiveAudioId: (id: string | null) => void; 
// // // // // // }) {
// // // // // //     const isEven = index % 2 === 0;
// // // // // //     const ref = useRef<HTMLDivElement>(null);
    
// // // // // //     // PRECISION PHYSICS:
// // // // // //     // We track exactly when this specific node crosses the "Center Line" of the viewport.
// // // // // //     const { scrollYProgress } = useScroll({
// // // // // //         target: ref,
// // // // // //         offset: ["start center", "end center"] 
// // // // // //     });

// // // // // //     // 1. ACTIVATION LOGIC (0 -> 1 as it hits center)
// // // // // //     // We map 0.0 to 1.0. When progress hits 1.0, the "Liquid" has fully reached the node.
// // // // // //     const fillProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
    
// // // // // //     // 2. PARALLAX & OPACITY
// // // // // //     const parallaxY = useTransform(fillProgress, [0, 1], ["10%", "-5%"]);
// // // // // //     const opacity = useTransform(fillProgress, [0, 0.2], [0.3, 1]); // Fades in quickly
// // // // // //     const scale = useTransform(fillProgress, [0, 1], [0.9, 1]);

// // // // // //     // 3. THE "IGNITION" MOMENT
// // // // // //     // This value triggers the horizontal line drawing ONLY after the vertical fill reaches it.
// // // // // //     const lineDraw = useTransform(fillProgress, [0.8, 1], [0, 1]); 

// // // // // //     // AUDIO LOGIC
// // // // // //     const isPlaying = activeAudioId === member.id;
// // // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // // //     useEffect(() => {
// // // // // //         if (!audioRef.current) return;
// // // // // //         if (isPlaying) audioRef.current.play().catch(() => {});
// // // // // //         else audioRef.current.pause();
// // // // // //     }, [isPlaying]);

// // // // // //     return (
// // // // // //         <motion.div 
// // // // // //             ref={ref}
// // // // // //             style={{ opacity }}
// // // // // //             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // // // //         >
            
// // // // // //             {/* --- 1. THE JUNCTION POINT (The Ignition) --- */}
// // // // // //             {/* This sits ON the central spine and glows when the vertical fill passes it */}
// // // // // //             <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-20`}>
// // // // // //                  <motion.div 
// // // // // //                     style={{ 
// // // // // //                         scale: lineDraw, 
// // // // // //                         opacity: lineDraw 
// // // // // //                     }}
// // // // // //                     className="w-4 h-4 rounded-full border border-gold-500 bg-[#020202] shadow-[0_0_20px_#eab308]"
// // // // // //                  >
// // // // // //                     <div className="absolute inset-0 bg-gold-500 rounded-full animate-ping opacity-75" />
// // // // // //                  </motion.div>
// // // // // //             </div>

// // // // // //             {/* --- 2. THE HORIZONTAL NERVE (Desktop) --- */}
// // // // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
// // // // // //                 <svg className="w-full h-full" overflow="visible">
// // // // // //                     {/* Background Trace */}
// // // // // //                     <path
// // // // // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // // // // //                         fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05"
// // // // // //                     />
                    
// // // // // //                     {/* The Active Energy Line - Draws based on 'lineDraw' */}
// // // // // //                     <motion.path
// // // // // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // // // // //                         fill="none" 
// // // // // //                         stroke="#eab308" 
// // // // // //                         strokeWidth="1.5"
// // // // // //                         strokeLinecap="round"
// // // // // //                         style={{ pathLength: lineDraw }} 
// // // // // //                     />

// // // // // //                     {/* The Spark traveling the horizontal line */}
// // // // // //                     {/* We use a mask trick: A circle that scales up at the end of the line */}
// // // // // //                     <motion.circle 
// // // // // //                         cx={isEven ? "0%" : "100%"} cy="50%" r="2" fill="#fff"
// // // // // //                         style={{ 
// // // // // //                             scale: useTransform(lineDraw, [0.95, 1], [0, 2]), 
// // // // // //                             opacity: useTransform(lineDraw, [0.95, 1], [0, 1])
// // // // // //                         }}
// // // // // //                     />
// // // // // //                 </svg>
// // // // // //             </div>

// // // // // //             {/* --- 3. MOBILE CONNECTOR (The "Plug") --- */}
// // // // // //             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
// // // // // //                 <motion.div 
// // // // // //                     style={{ height: lineDraw }} // Uses same timing
// // // // // //                     className="absolute top-0 left-0 w-full bg-gold-500 origin-top shadow-[0_0_10px_#eab308]"
// // // // // //                 />
// // // // // //                 <motion.div 
// // // // // //                     style={{ scaleX: lineDraw }}
// // // // // //                     className="absolute top-1/2 left-0 w-8 h-px bg-gold-500 origin-left shadow-[0_0_10px_#eab308]"
// // // // // //                 />
// // // // // //             </div>

// // // // // //             {/* --- 4. THE PORTRAIT (The Destination) --- */}
// // // // // //             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
// // // // // //                 {/* DIVINE LIGHT (Controlled by lineDraw completion) */}
// // // // // //                 <motion.div 
// // // // // //                     style={{ 
// // // // // //                         opacity: useTransform(lineDraw, [0.8, 1], [0, 0.6]),
// // // // // //                         scale: useTransform(lineDraw, [0.8, 1], [0.8, 1.1])
// // // // // //                     }}
// // // // // //                     className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/40 via-gold-500/10 to-transparent rounded-full blur-[50px] z-0" 
// // // // // //                 />

// // // // // //                 {/* THE FRAME */}
// // // // // //                 <motion.div 
// // // // // //                     style={{ 
// // // // // //                         borderColor: useTransform(lineDraw, [0.9, 1], ["rgba(255,255,255,0.1)", "rgba(234,179,8,0.5)"]),
// // // // // //                         scale
// // // // // //                     }}
// // // // // //                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10"
// // // // // //                 >
// // // // // //                      {/* IMAGE WITH INTERNAL PARALLAX */}
// // // // // //                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
// // // // // //                         {member.image_url ? (
// // // // // //                             <Image 
// // // // // //                                 src={member.image_url} alt={member.name} fill 
// // // // // //                                 className="object-cover" priority={index < 2}
// // // // // //                             />
// // // // // //                         ) : (
// // // // // //                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // // // // //                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                         {/* B&W Filter that dissolves on contact */}
// // // // // //                         <motion.div 
// // // // // //                             style={{ opacity: useTransform(lineDraw, [0.5, 1], [1, 0]) }}
// // // // // //                             className="absolute inset-0 bg-black/80 mix-blend-saturation" 
// // // // // //                         />
// // // // // //                      </motion.div>

// // // // // //                      {/* AUDIO BUTTON (Optimized) */}
// // // // // //                      <button 
// // // // // //                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
// // // // // //                         className="absolute bottom-6 right-6 z-30 group"
// // // // // //                      >
// // // // // //                         {isPlaying && <span className="absolute inset-0 rounded-full border border-gold-500 animate-ping opacity-50" />}
// // // // // //                         <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300 ${isPlaying ? 'bg-gold-500 border-gold-500 text-black' : 'border-white/20 bg-black/20 text-white hover:bg-white hover:text-black'}`}>
// // // // // //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // // //                         </div>
// // // // // //                      </button>
// // // // // //                 </motion.div>
// // // // // //             </div>

// // // // // //             {/* --- 5. THE NARRATIVE --- */}
// // // // // //             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
// // // // // //                 {/* Role */}
// // // // // //                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// // // // // //                     <motion.div style={{ width: useTransform(lineDraw, [0.5, 1], [0, 40]) }} className="h-px bg-gold-500 shadow-[0_0_10px_#eab308]" />
// // // // // //                     <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500">
// // // // // //                         {member.role}
// // // // // //                     </span>
// // // // // //                 </div>

// // // // // //                 {/* Name Reveal */}
// // // // // //                 <div className="overflow-hidden mb-6">
// // // // // //                     <motion.h2 
// // // // // //                         style={{ y: useTransform(lineDraw, [0.2, 1], ["100%", "0%"]) }}
// // // // // //                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
// // // // // //                     >
// // // // // //                         {member.name}
// // // // // //                     </motion.h2>
// // // // // //                 </div>

// // // // // //                 {/* Bio */}
// // // // // //                 <motion.p 
// // // // // //                     style={{ opacity: lineDraw, y: useTransform(lineDraw, [0.5, 1], [20, 0]) }}
// // // // // //                     className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
// // // // // //                 >
// // // // // //                     "{member.bio}"
// // // // // //                 </motion.p>

// // // // // //                 {/* Profile Link */}
// // // // // //                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
// // // // // //                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
// // // // // //                         View Full Profile
// // // // // //                         <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-500 transition-all duration-500 group-hover:w-full" />
// // // // // //                     </a>
// // // // // //                 </div>

// // // // // //             </div>
// // // // // //         </motion.div>
// // // // // //     );
// // // // // // }

// // // // // // // --- FOOTER ---
// // // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // // //     const years = ['2026', '2025', '2024', 'Faculty'];
// // // // // //     return (
// // // // // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// // // // // //             <nav className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
// // // // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">Timeline</span>
// // // // // //                 {years.map(year => (
// // // // // //                     <button key={year} className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}>
// // // // // //                         {year}
// // // // // //                         {currentYear.includes(year) && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#eab308]" />}
// // // // // //                     </button>
// // // // // //                 ))}
// // // // // //             </nav>
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // "use client";

// // // // // import { useRef, useState, useEffect } from "react";
// // // // // import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";
// // // // // import Image from "next/image";
// // // // // import { EnsembleMember } from "@/types/schema";

// // // // // // --- ICONS ---
// // // // // const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // // // // const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // // // // // --- MAIN COMPONENT ---
// // // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // // // //   // 1. GLOBAL PHYSICS
// // // // //   const { scrollYProgress } = useScroll({
// // // // //     target: containerRef,
// // // // //     offset: ["start start", "end end"]
// // // // //   });

// // // // //   // Tighter spring for more responsive feel (Mass 0.1 = Lightweight/Fast)
// // // // //   const fluidScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.1 });

// // // // //   return (
// // // // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden selection:bg-gold-500/30">
      
// // // // //       {/* NOISE FILTER */}
// // // // //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

// // // // //       {/* 2. HEADER */}
// // // // //       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
// // // // //          <motion.div 
// // // // //             initial={{ opacity: 0, y: 50 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 1.2, ease: "easeOut" }}
// // // // //             className="text-center px-6 relative z-20"
// // // // //          >
// // // // //              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
// // // // //              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
// // // // //                  The Thread<br/><span className="text-white/30">of Fate.</span>
// // // // //              </h1>
// // // // //          </motion.div>
// // // // //       </header>

// // // // //       {/* 3. THE GLOBAL SPINE */}
// // // // //       <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
          
// // // // //           {/* THE FILL BAR */}
// // // // //           <motion.div 
// // // // //              style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
// // // // //              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-300 to-white shadow-[0_0_20px_#eab308]"
// // // // //           >
// // // // //               {/* THE LEADING EDGE (The "Spark") */}
// // // // //               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
// // // // //           </motion.div>
// // // // //       </div>

// // // // //       {/* 4. THE ENSEMBLE NODES */}
// // // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
// // // // //           {members.map((member, index) => (
// // // // //               <ThreadNode 
// // // // //                 key={member.id} 
// // // // //                 member={member} 
// // // // //                 index={index} 
// // // // //                 activeAudioId={activeAudioId}
// // // // //                 setActiveAudioId={setActiveAudioId}
// // // // //               />
// // // // //           ))}
// // // // //       </div>

// // // // //       {/* 5. FOOTER */}
// // // // //       <TimeCapsule currentYear={currentYear} />

// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // --- INDIVIDUAL NODE ---
// // // // // function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
// // // // //     member: EnsembleMember; 
// // // // //     index: number; 
// // // // //     activeAudioId: string | null; 
// // // // //     setActiveAudioId: (id: string | null) => void; 
// // // // // }) {
// // // // //     const isEven = index % 2 === 0;
// // // // //     const ref = useRef<HTMLDivElement>(null);
    
// // // // //     // PHYSICS: CENTER ALIGNMENT
// // // // //     // We track when the node's center hits the viewport's center.
// // // // //     const { scrollYProgress } = useScroll({
// // // // //         target: ref,
// // // // //         offset: ["start center", "end center"] 
// // // // //     });

// // // // //     // We use a spring to smooth out the micro-stutters, but keep it tight
// // // // //     const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

// // // // //     // --- THE MASTER LOGIC (Corrected Timing) ---
// // // // //     // 0.45 -> 0.55 is the "Sweet Spot" (Center of Viewport)
    
// // // // //     // 1. HORIZONTAL CONNECTION: Snaps as it hits center
// // // // //     const lineDraw = useTransform(smoothProgress, [0.45, 0.55], [0, 1]); 
    
// // // // //     // 2. CONTENT REVEAL: Explodes slightly after connection
// // // // //     const reveal = useTransform(smoothProgress, [0.45, 0.6], [0, 1]);
    
// // // // //     // 3. PARALLAX: Standard movement
// // // // //     const parallaxY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

// // // // //     // AUDIO LOGIC
// // // // //     const isPlaying = activeAudioId === member.id;
// // // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // // //     useEffect(() => {
// // // // //         if (!audioRef.current) return;
// // // // //         if (isPlaying) audioRef.current.play().catch(() => {});
// // // // //         else audioRef.current.pause();
// // // // //     }, [isPlaying]);

// // // // //     return (
// // // // //         <motion.div 
// // // // //             ref={ref}
// // // // //             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // // //         >
            
// // // // //             {/* --- 1. THE JUNCTION (The Spark Plug) --- */}
// // // // //             {/* Sits on the spine. Explodes when lineDraw hits > 0.1 */}
// // // // //             <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-20`}>
// // // // //                  <motion.div 
// // // // //                     style={{ scale: lineDraw, opacity: lineDraw }}
// // // // //                     className="w-3 h-3 rounded-full bg-white shadow-[0_0_20px_#eab308]"
// // // // //                  >
// // // // //                     {/* The Shockwave Ring */}
// // // // //                     <motion.div 
// // // // //                         style={{ opacity: useTransform(lineDraw, [0.8, 1], [1, 0]), scale: useTransform(lineDraw, [0, 1], [1, 3]) }}
// // // // //                         className="absolute inset-0 rounded-full border border-gold-500" 
// // // // //                     />
// // // // //                  </motion.div>
// // // // //             </div>

// // // // //             {/* --- 2. THE HORIZONTAL NERVE --- */}
// // // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
// // // // //                 <svg className="w-full h-full" overflow="visible">
// // // // //                     {/* Background Trace */}
// // // // //                     <path
// // // // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // // // //                         fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05"
// // // // //                     />
                    
// // // // //                     {/* THE ACTIVE LINE (Gold) */}
// // // // //                     <motion.path
// // // // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // // // //                         fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round"
// // // // //                         style={{ pathLength: lineDraw }} 
// // // // //                     />

// // // // //                     {/* THE TRAVELLING SPARK */}
// // // // //                     <motion.circle 
// // // // //                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
// // // // //                         style={{ 
// // // // //                             offsetPath: `path("${isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}")`,
// // // // //                             offsetDistance: useTransform(lineDraw, (v) => `${v * 100}%`),
// // // // //                             opacity: lineDraw
// // // // //                         }}
// // // // //                     />
// // // // //                 </svg>
// // // // //             </div>

// // // // //             {/* --- 3. MOBILE CONNECTOR --- */}
// // // // //             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
// // // // //                 <motion.div style={{ height: lineDraw }} className="absolute top-0 left-0 w-full bg-gold-500 origin-top" />
// // // // //                 <motion.div style={{ scaleX: lineDraw }} className="absolute top-1/2 left-0 w-8 h-px bg-gold-500 origin-left" />
// // // // //             </div>

// // // // //             {/* --- 4. THE PORTRAIT (The Reveal) --- */}
// // // // //             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
// // // // //                 {/* DIVINE LIGHT (Explodes on Contact) */}
// // // // //                 <motion.div 
// // // // //                     style={{ 
// // // // //                         opacity: useTransform(reveal, [0, 1], [0, 0.5]),
// // // // //                         scale: useTransform(reveal, [0, 1], [0.8, 1.2])
// // // // //                     }}
// // // // //                     className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/40 via-gold-500/10 to-transparent rounded-full blur-[50px] z-0" 
// // // // //                 />

// // // // //                 <motion.div 
// // // // //                     style={{ 
// // // // //                         borderColor: useTransform(reveal, [0, 1], ["rgba(255,255,255,0.05)", "rgba(234,179,8,0.5)"]),
// // // // //                         scale: useTransform(reveal, [0, 1], [0.95, 1])
// // // // //                     }}
// // // // //                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10"
// // // // //                 >
// // // // //                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
// // // // //                         {member.image_url ? (
// // // // //                             <Image src={member.image_url} alt={member.name} fill className="object-cover" priority={index < 2} />
// // // // //                         ) : (
// // // // //                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // // // //                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
// // // // //                             </div>
// // // // //                         )}
// // // // //                         {/* B&W Filter that lifts */}
// // // // //                         <motion.div 
// // // // //                             style={{ opacity: useTransform(reveal, [0, 1], [1, 0]) }}
// // // // //                             className="absolute inset-0 bg-black/90 mix-blend-saturation" 
// // // // //                         />
// // // // //                      </motion.div>

// // // // //                      {/* AUDIO BUTTON */}
// // // // //                      <button 
// // // // //                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
// // // // //                         className="absolute bottom-6 right-6 z-30 group"
// // // // //                      >
// // // // //                         {isPlaying && <span className="absolute inset-0 rounded-full border border-gold-500 animate-ping opacity-50" />}
// // // // //                         <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300 ${isPlaying ? 'bg-gold-500 border-gold-500 text-black' : 'border-white/20 bg-black/20 text-white'}`}>
// // // // //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // // //                         </div>
// // // // //                      </button>
// // // // //                 </motion.div>
// // // // //             </div>

// // // // //             {/* --- 5. THE NARRATIVE (The Story) --- */}
// // // // //             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
// // // // //                 {/* Role */}
// // // // //                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// // // // //                     <motion.div style={{ width: useTransform(reveal, [0, 1], [0, 40]) }} className="h-px bg-gold-500" />
// // // // //                     <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500">
// // // // //                         {member.role}
// // // // //                     </span>
// // // // //                 </div>

// // // // //                 {/* Name */}
// // // // //                 <div className="overflow-hidden mb-6">
// // // // //                     <motion.h2 
// // // // //                         style={{ y: useTransform(reveal, [0, 1], ["100%", "0%"]) }}
// // // // //                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
// // // // //                     >
// // // // //                         {member.name}
// // // // //                     </motion.h2>
// // // // //                 </div>

// // // // //                 {/* Bio */}
// // // // //                 <motion.p 
// // // // //                     style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [20, 0]) }}
// // // // //                     className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
// // // // //                 >
// // // // //                     "{member.bio}"
// // // // //                 </motion.p>

// // // // //                 {/* Profile Link */}
// // // // //                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
// // // // //                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
// // // // //                         View Full Profile
// // // // //                         <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-500 transition-all duration-500 group-hover:w-full" />
// // // // //                     </a>
// // // // //                 </div>

// // // // //             </div>
// // // // //         </motion.div>
// // // // //     );
// // // // // }

// // // // // // --- FOOTER ---
// // // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // // //     const years = ['2026', '2025', '2024', 'Faculty'];
// // // // //     return (
// // // // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// // // // //             <nav className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
// // // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">Timeline</span>
// // // // //                 {years.map(year => (
// // // // //                     <button key={year} className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}>
// // // // //                         {year}
// // // // //                         {currentYear.includes(year) && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#eab308]" />}
// // // // //                     </button>
// // // // //                 ))}
// // // // //             </nav>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // "use client";

// // // // import { useRef, useState, useEffect } from "react";
// // // // import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
// // // // import Image from "next/image";
// // // // import { EnsembleMember } from "@/types/schema";

// // // // // --- PURE ICONS ---
// // // // const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // // // const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // // // // --- THE MASTER COMPONENT ---
// // // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // // //   // 1. GLOBAL PHYSICS
// // // //   const { scrollYProgress } = useScroll({
// // // //     target: containerRef,
// // // //     offset: ["start start", "end end"]
// // // //   });

// // // //   // TIGHT FLUID PHYSICS: Increased stiffness (300) to remove lag
// // // //   const fluidScroll = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 });

// // // //   return (
// // // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden selection:bg-gold-500/30">
      
// // // //       {/* NOISE FILTER */}
// // // //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

// // // //       {/* 2. HEADER */}
// // // //       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
// // // //          <motion.div 
// // // //             initial={{ opacity: 0, y: 50 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 1.2, ease: "easeOut" }}
// // // //             className="text-center px-6 relative z-20"
// // // //          >
// // // //              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
// // // //              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
// // // //                  The Thread<br/><span className="text-white/30">of Fate.</span>
// // // //              </h1>
// // // //          </motion.div>
// // // //       </header>

// // // //       {/* 3. THE GLOBAL SPINE */}
// // // //       <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
          
// // // //           {/* THE FILL BAR */}
// // // //           <motion.div 
// // // //              style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
// // // //              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-300 to-white shadow-[0_0_20px_#eab308]"
// // // //           >
// // // //               {/* THE LEADING EDGE (The "Spark") */}
// // // //               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
// // // //           </motion.div>
// // // //       </div>

// // // //       {/* 4. THE ENSEMBLE NODES */}
// // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
// // // //           {members.map((member, index) => (
// // // //               <ThreadNode 
// // // //                 key={member.id} 
// // // //                 member={member} 
// // // //                 index={index} 
// // // //                 activeAudioId={activeAudioId}
// // // //                 setActiveAudioId={setActiveAudioId}
// // // //               />
// // // //           ))}
// // // //       </div>

// // // //       {/* 5. FOOTER */}
// // // //       <TimeCapsule currentYear={currentYear} />

// // // //     </div>
// // // //   );
// // // // }

// // // // // --- INDIVIDUAL NODE ---
// // // // function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
// // // //     member: EnsembleMember; 
// // // //     index: number; 
// // // //     activeAudioId: string | null; 
// // // //     setActiveAudioId: (id: string | null) => void; 
// // // // }) {
// // // //     const isEven = index % 2 === 0;
// // // //     const ref = useRef<HTMLDivElement>(null);
    
// // // //     // PHYSICS: CENTER ALIGNMENT
// // // //     const { scrollYProgress } = useScroll({
// // // //         target: ref,
// // // //         offset: ["start center", "end center"] 
// // // //     });

// // // //     // HIGH TENSION SPRING: Removes the "Floaty" lag. Instant response.
// // // //     const smoothProgress = useSpring(scrollYProgress, { stiffness: 250, damping: 30 });

// // // //     // --- THE MASTER LOGIC (PREDICTIVE TIMING) ---
    
// // // //     // 1. HORIZONTAL CONNECTION: 
// // // //     // Starts at 0.35 (Before Center). Finishes at 0.5 (Dead Center).
// // // //     // This ensures that when the dot hits the center, the line is ALREADY fully extended.
// // // //     const lineDraw = useTransform(smoothProgress, [0.35, 0.5], [0, 1]); 
    
// // // //     // 2. CONTENT REVEAL: 
// // // //     // Starts slightly later (0.4) but finishes exactly at 0.5.
// // // //     const reveal = useTransform(smoothProgress, [0.4, 0.5], [0, 1]);
    
// // // //     // 3. PARALLAX
// // // //     const parallaxY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

// // // //     // AUDIO LOGIC
// // // //     const isPlaying = activeAudioId === member.id;
// // // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // // //     useEffect(() => {
// // // //         if (!audioRef.current) return;
// // // //         if (isPlaying) audioRef.current.play().catch(() => {});
// // // //         else audioRef.current.pause();
// // // //     }, [isPlaying]);

// // // //     return (
// // // //         <motion.div 
// // // //             ref={ref}
// // // //             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // // //         >
            
// // // //             {/* --- 1. THE JUNCTION (The Ignition Point) --- */}
// // // //             {/* Sits on the spine. Reacts to lineDraw. */}
// // // //             <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-20`}>
// // // //                  <motion.div 
// // // //                     style={{ scale: lineDraw, opacity: lineDraw }}
// // // //                     className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#eab308]"
// // // //                  >
// // // //                     {/* The Shockwave Ring - Explodes OUT as line draws */}
// // // //                     <motion.div 
// // // //                         style={{ 
// // // //                             opacity: useTransform(lineDraw, [0.8, 1], [1, 0]), 
// // // //                             scale: useTransform(lineDraw, [0, 1], [0.5, 3]),
// // // //                             borderWidth: useTransform(lineDraw, [0, 1], ["2px", "0px"]) 
// // // //                         }}
// // // //                         className="absolute inset-0 rounded-full border border-gold-500" 
// // // //                     />
// // // //                  </motion.div>
// // // //             </div>

// // // //             {/* --- 2. THE HORIZONTAL NERVE --- */}
// // // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
// // // //                 <svg className="w-full h-full" overflow="visible">
// // // //                     {/* Background Trace */}
// // // //                     <path
// // // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // // //                         fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05"
// // // //                     />
                    
// // // //                     {/* THE ACTIVE LINE (Gold) */}
// // // //                     <motion.path
// // // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // // //                         fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round"
// // // //                         style={{ pathLength: lineDraw }} 
// // // //                     />

// // // //                     {/* THE TRAVELLING SPARK */}
// // // //                     <motion.circle 
// // // //                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
// // // //                         style={{ 
// // // //                             offsetPath: `path("${isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}")`,
// // // //                             offsetDistance: useTransform(lineDraw, (v) => `${v * 100}%`),
// // // //                             opacity: lineDraw,
// // // //                             scale: useTransform(lineDraw, [0, 0.1, 1], [0, 1, 1]) // Pops in instantly
// // // //                         }}
// // // //                     />
// // // //                 </svg>
// // // //             </div>

// // // //             {/* --- 3. MOBILE CONNECTOR --- */}
// // // //             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
// // // //                 <motion.div style={{ height: lineDraw }} className="absolute top-0 left-0 w-full bg-gold-500 origin-top" />
// // // //                 <motion.div style={{ scaleX: lineDraw }} className="absolute top-1/2 left-0 w-8 h-px bg-gold-500 origin-left" />
// // // //             </div>

// // // //             {/* --- 4. THE PORTRAIT (The Reveal) --- */}
// // // //             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
// // // //                 {/* DIVINE LIGHT */}
// // // //                 <motion.div 
// // // //                     style={{ 
// // // //                         opacity: useTransform(reveal, [0, 1], [0, 0.6]),
// // // //                         scale: useTransform(reveal, [0, 1], [0.8, 1.2])
// // // //                     }}
// // // //                     className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/40 via-gold-500/10 to-transparent rounded-full blur-[50px] z-0" 
// // // //                 />

// // // //                 <motion.div 
// // // //                     style={{ 
// // // //                         borderColor: useTransform(reveal, [0.5, 1], ["rgba(255,255,255,0.05)", "rgba(234,179,8,0.5)"]),
// // // //                         scale: useTransform(reveal, [0, 1], [0.95, 1])
// // // //                     }}
// // // //                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10"
// // // //                 >
// // // //                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
// // // //                         {member.image_url ? (
// // // //                             <Image src={member.image_url} alt={member.name} fill className="object-cover" priority={index < 2} />
// // // //                         ) : (
// // // //                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // // //                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
// // // //                             </div>
// // // //                         )}
// // // //                         {/* B&W Filter that lifts */}
// // // //                         <motion.div 
// // // //                             style={{ opacity: useTransform(reveal, [0, 1], [1, 0]) }}
// // // //                             className="absolute inset-0 bg-black/90 mix-blend-saturation" 
// // // //                         />
// // // //                      </motion.div>

// // // //                      {/* AUDIO BUTTON */}
// // // //                      <button 
// // // //                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
// // // //                         className="absolute bottom-6 right-6 z-30 group"
// // // //                      >
// // // //                         {isPlaying && <span className="absolute inset-0 rounded-full border border-gold-500 animate-ping opacity-50" />}
// // // //                         <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300 ${isPlaying ? 'bg-gold-500 border-gold-500 text-black' : 'border-white/20 bg-black/20 text-white'}`}>
// // // //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // // //                         </div>
// // // //                      </button>
// // // //                 </motion.div>
// // // //             </div>

// // // //             {/* --- 5. THE NARRATIVE --- */}
// // // //             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
// // // //                 {/* Role */}
// // // //                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// // // //                     <motion.div style={{ width: useTransform(reveal, [0, 1], [0, 40]) }} className="h-px bg-gold-500" />
// // // //                     <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500">
// // // //                         {member.role}
// // // //                     </span>
// // // //                 </div>

// // // //                 {/* Name */}
// // // //                 <div className="overflow-hidden mb-6">
// // // //                     <motion.h2 
// // // //                         style={{ y: useTransform(reveal, [0, 1], ["100%", "0%"]) }}
// // // //                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
// // // //                     >
// // // //                         {member.name}
// // // //                     </motion.h2>
// // // //                 </div>

// // // //                 {/* Bio */}
// // // //                 <motion.p 
// // // //                     style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [20, 0]) }}
// // // //                     className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
// // // //                 >
// // // //                     "{member.bio}"
// // // //                 </motion.p>

// // // //                 {/* Profile Link */}
// // // //                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
// // // //                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
// // // //                         View Full Profile
// // // //                         <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-500 transition-all duration-500 group-hover:w-full" />
// // // //                     </a>
// // // //                 </div>

// // // //             </div>
// // // //         </motion.div>
// // // //     );
// // // // }

// // // // // --- FOOTER ---
// // // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // // //     const years = ['2026', '2025', '2024', 'Faculty'];
// // // //     return (
// // // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// // // //             <nav className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
// // // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">Timeline</span>
// // // //                 {years.map(year => (
// // // //                     <button key={year} className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}>
// // // //                         {year}
// // // //                         {currentYear.includes(year) && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#eab308]" />}
// // // //                     </button>
// // // //                 ))}
// // // //             </nav>
// // // //         </div>
// // // //     );
// // // // }

// // // "use client";

// // // import { useRef, useState, useEffect } from "react";
// // // import { motion, useScroll, useSpring, useTransform } from "framer-motion";
// // // import Image from "next/image";
// // // import { EnsembleMember } from "@/types/schema";

// // // // --- PURE ICONS ---
// // // const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // // const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // // // --- PHYSICS CONFIGURATION (Unified for Sync) ---
// // // const PHYSICS = { stiffness: 120, damping: 30, restDelta: 0.001 };

// // // // --- THE MASTER COMPONENT ---
// // // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// // //   const containerRef = useRef<HTMLDivElement>(null);
// // //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// // //   // 1. GLOBAL PHYSICS
// // //   const { scrollYProgress } = useScroll({
// // //     target: containerRef,
// // //     offset: ["start start", "end end"]
// // //   });

// // //   // UNIFIED PHYSICS: Matches the local nodes exactly so they don't de-sync
// // //   const fluidScroll = useSpring(scrollYProgress, PHYSICS);

// // //   return (
// // //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden selection:bg-gold-500/30">
      
// // //       {/* NOISE FILTER */}
// // //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

// // //       {/* 2. HEADER */}
// // //       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
// // //          <motion.div 
// // //             initial={{ opacity: 0, y: 50 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 1.2, ease: "easeOut" }}
// // //             className="text-center px-6 relative z-20"
// // //          >
// // //              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
// // //              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
// // //                  The Thread<br/><span className="text-white/30">of Fate.</span>
// // //              </h1>
// // //          </motion.div>
// // //       </header>

// // //       {/* 3. THE GLOBAL SPINE */}
// // //       <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
          
// // //           {/* THE FILL BAR */}
// // //           <motion.div 
// // //              style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
// // //              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-300 to-white shadow-[0_0_20px_#eab308]"
// // //           >
// // //               {/* THE LEADING EDGE (The "Spark") */}
// // //               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
// // //           </motion.div>
// // //       </div>

// // //       {/* 4. THE ENSEMBLE NODES */}
// // //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
// // //           {members.map((member, index) => (
// // //               <ThreadNode 
// // //                 key={member.id} 
// // //                 member={member} 
// // //                 index={index} 
// // //                 activeAudioId={activeAudioId}
// // //                 setActiveAudioId={setActiveAudioId}
// // //               />
// // //           ))}
// // //       </div>

// // //       {/* 5. FOOTER */}
// // //       <TimeCapsule currentYear={currentYear} />

// // //     </div>
// // //   );
// // // }

// // // // --- INDIVIDUAL NODE ---
// // // function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
// // //     member: EnsembleMember; 
// // //     index: number; 
// // //     activeAudioId: string | null; 
// // //     setActiveAudioId: (id: string | null) => void; 
// // // }) {
// // //     const isEven = index % 2 === 0;
// // //     const ref = useRef<HTMLDivElement>(null);
    
// // //     // PHYSICS: CENTER ALIGNMENT
// // //     const { scrollYProgress } = useScroll({
// // //         target: ref,
// // //         offset: ["start center", "end center"] 
// // //     });

// // //     // UNIFIED PHYSICS: Matches global spine exactly
// // //     const smoothProgress = useSpring(scrollYProgress, PHYSICS);

// // //     // --- THE MASTER TIMING (The "Snap") ---
    
// // //     // 1. THE TRIGGER WINDOW (0.45 -> 0.50)
// // //     // Extremely narrow window (5%). This forces the line to shoot out FAST exactly at center.
// // //     // It creates an "Electrical Snap" feeling rather than a "Drawing" feeling.
// // //     const triggerStart = 0.45;
// // //     const triggerEnd = 0.50;

// // //     const lineDraw = useTransform(smoothProgress, [triggerStart, triggerEnd], [0, 1]); 
// // //     const reveal = useTransform(smoothProgress, [triggerStart, 0.55], [0, 1]); // Content reveals slightly after line
// // //     const parallaxY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

// // //     // AUDIO LOGIC
// // //     const isPlaying = activeAudioId === member.id;
// // //     const audioRef = useRef<HTMLAudioElement | null>(null);

// // //     useEffect(() => {
// // //         if (!audioRef.current) return;
// // //         if (isPlaying) audioRef.current.play().catch(() => {});
// // //         else audioRef.current.pause();
// // //     }, [isPlaying]);

// // //     return (
// // //         <motion.div 
// // //             ref={ref}
// // //             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// // //         >
            
// // //             {/* --- 1. THE JUNCTION (The Ignition Point) --- */}
// // //             {/* Sits on the spine. Flashes WHITE when active. */}
// // //             <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-20`}>
// // //                  <motion.div 
// // //                     style={{ 
// // //                         scale: useTransform(lineDraw, [0, 1], [0.5, 1]), // Pops up
// // //                         opacity: lineDraw,
// // //                         backgroundColor: useTransform(lineDraw, [0, 0.5, 1], ["#eab308", "#ffffff", "#eab308"]) // FLASHES WHITE ON IMPACT
// // //                     }}
// // //                     className="w-3 h-3 rounded-full shadow-[0_0_20px_#eab308]"
// // //                  >
// // //                     {/* The Shockwave Ring */}
// // //                     <motion.div 
// // //                         style={{ 
// // //                             opacity: useTransform(lineDraw, [0.5, 1], [1, 0]), 
// // //                             scale: useTransform(lineDraw, [0, 1], [1, 4]),
// // //                             borderWidth: useTransform(lineDraw, [0, 1], ["2px", "0px"]) 
// // //                         }}
// // //                         className="absolute inset-0 rounded-full border border-white" 
// // //                     />
// // //                  </motion.div>
// // //             </div>

// // //             {/* --- 2. THE HORIZONTAL NERVE --- */}
// // //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
// // //                 <svg className="w-full h-full" overflow="visible">
// // //                     {/* Background Trace */}
// // //                     <path
// // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // //                         fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05"
// // //                     />
                    
// // //                     {/* THE ACTIVE LINE (Gold) */}
// // //                     <motion.path
// // //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// // //                         fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round"
// // //                         style={{ pathLength: lineDraw }} 
// // //                     />

// // //                     {/* THE TRAVELLING SPARK */}
// // //                     <motion.circle 
// // //                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
// // //                         style={{ 
// // //                             offsetPath: `path("${isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}")`,
// // //                             offsetDistance: useTransform(lineDraw, (v) => `${v * 100}%`),
// // //                             opacity: lineDraw,
// // //                             scale: useTransform(lineDraw, [0, 0.1, 1], [0, 1.5, 1]) // Pops in instantly
// // //                         }}
// // //                     />
// // //                 </svg>
// // //             </div>

// // //             {/* --- 3. MOBILE CONNECTOR --- */}
// // //             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
// // //                 <motion.div style={{ height: lineDraw }} className="absolute top-0 left-0 w-full bg-gold-500 origin-top" />
// // //                 <motion.div style={{ scaleX: lineDraw }} className="absolute top-1/2 left-0 w-8 h-px bg-gold-500 origin-left" />
// // //             </div>

// // //             {/* --- 4. THE PORTRAIT (The Reveal) --- */}
// // //             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
// // //                 {/* DIVINE LIGHT */}
// // //                 <motion.div 
// // //                     style={{ 
// // //                         opacity: useTransform(reveal, [0, 1], [0, 0.6]),
// // //                         scale: useTransform(reveal, [0, 1], [0.8, 1.2])
// // //                     }}
// // //                     className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/40 via-gold-500/10 to-transparent rounded-full blur-[50px] z-0" 
// // //                 />

// // //                 <motion.div 
// // //                     style={{ 
// // //                         borderColor: useTransform(reveal, [0.5, 1], ["rgba(255,255,255,0.05)", "rgba(234,179,8,0.5)"]),
// // //                         scale: useTransform(reveal, [0, 1], [0.95, 1])
// // //                     }}
// // //                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10"
// // //                 >
// // //                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
// // //                         {member.image_url ? (
// // //                             <Image src={member.image_url} alt={member.name} fill className="object-cover" priority={index < 2} />
// // //                         ) : (
// // //                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // //                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
// // //                             </div>
// // //                         )}
// // //                         <motion.div 
// // //                             style={{ opacity: useTransform(reveal, [0, 1], [1, 0]) }}
// // //                             className="absolute inset-0 bg-black/90 mix-blend-saturation" 
// // //                         />
// // //                      </motion.div>

// // //                      {/* AUDIO BUTTON */}
// // //                      <button 
// // //                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
// // //                         className="absolute bottom-6 right-6 z-30 group"
// // //                      >
// // //                         {isPlaying && <span className="absolute inset-0 rounded-full border border-gold-500 animate-ping opacity-50" />}
// // //                         <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300 ${isPlaying ? 'bg-gold-500 border-gold-500 text-black' : 'border-white/20 bg-black/20 text-white'}`}>
// // //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// // //                         </div>
// // //                      </button>
// // //                 </motion.div>
// // //             </div>

// // //             {/* --- 5. THE NARRATIVE --- */}
// // //             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
// // //                 {/* Role */}
// // //                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// // //                     <motion.div style={{ width: useTransform(reveal, [0, 1], [0, 40]) }} className="h-px bg-gold-500" />
// // //                     <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500">
// // //                         {member.role}
// // //                     </span>
// // //                 </div>

// // //                 {/* Name */}
// // //                 <div className="overflow-hidden mb-6">
// // //                     <motion.h2 
// // //                         style={{ y: useTransform(reveal, [0, 1], ["100%", "0%"]) }}
// // //                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
// // //                     >
// // //                         {member.name}
// // //                     </motion.h2>
// // //                 </div>

// // //                 {/* Bio */}
// // //                 <motion.p 
// // //                     style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [20, 0]) }}
// // //                     className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
// // //                 >
// // //                     "{member.bio}"
// // //                 </motion.p>

// // //                 {/* Profile Link */}
// // //                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
// // //                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
// // //                         View Full Profile
// // //                         <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-500 transition-all duration-500 group-hover:w-full" />
// // //                     </a>
// // //                 </div>

// // //             </div>
// // //         </motion.div>
// // //     );
// // // }

// // // // --- FOOTER ---
// // // function TimeCapsule({ currentYear }: { currentYear: string }) {
// // //     const years = ['2026', '2025', '2024', 'Faculty'];
// // //     return (
// // //         <div className="absolute bottom-0 w-full flex justify-center pb-12 z-50 px-4">
// // //             <nav className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl hover:border-gold-500/20 transition-colors duration-500">
// // //                 <span className="text-[10px] uppercase tracking-widest text-neutral-600 border-r border-white/10 pr-6 mr-2 hidden md:inline-block">Timeline</span>
// // //                 {years.map(year => (
// // //                     <button key={year} className={`text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300 relative ${currentYear.includes(year) ? 'text-gold-500 font-bold' : 'text-neutral-500 hover:text-white'}`}>
// // //                         {year}
// // //                         {currentYear.includes(year) && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full shadow-[0_0_10px_#eab308]" />}
// // //                     </button>
// // //                 ))}
// // //             </nav>
// // //         </div>
// // //     );
// // // }

// // "use client";

// // import { useRef, useState, useEffect } from "react";
// // import { motion, useScroll, useSpring, useTransform } from "framer-motion";
// // import Image from "next/image";
// // import { EnsembleMember } from "@/types/schema";

// // // --- PURE ICONS ---
// // const PlayIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // const PauseIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);

// // // --- PHYSICS CONFIGURATION (The "Masterpiece" Settings) ---
// // const PHYSICS = { stiffness: 120, damping: 30, restDelta: 0.001 };

// // export default function TheNarrativeThread({ members, currentYear }: { members: EnsembleMember[], currentYear: string }) {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

// //   // 1. GLOBAL PHYSICS
// //   const { scrollYProgress } = useScroll({
// //     target: containerRef,
// //     offset: ["start start", "end end"]
// //   });

// //   const fluidScroll = useSpring(scrollYProgress, PHYSICS);

// //   return (
// //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] pb-60 overflow-hidden">
      
// //       {/* NOISE FILTER */}
// //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay" />

// //       {/* 2. HEADER */}
// //       <header className="relative w-full h-[80vh] flex flex-col items-center justify-center z-10 perspective-1000">
// //          <motion.div 
// //             initial={{ opacity: 0, y: 50 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 1.2, ease: "easeOut" }}
// //             className="text-center px-6 relative z-20"
// //          >
// //              <span className="text-gold-500 uppercase tracking-[0.8em] text-[9px] md:text-xs mb-8 block font-medium animate-pulse">The Aayam Lineage</span>
// //              <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9]">
// //                  The Thread<br/><span className="text-white/30">of Fate.</span>
// //              </h1>
// //          </motion.div>
// //       </header>

// //       {/* 3. THE GLOBAL SPINE (Remains Gold - The Common Fate) */}
// //       <div className="absolute top-[80vh] bottom-0 left-4 md:left-1/2 md:-translate-x-px w-px bg-white/5 z-0">
// //           <motion.div 
// //              style={{ height: useTransform(fluidScroll, [0, 1], ["0%", "100%"]) }}
// //              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-gold-300 to-white shadow-[0_0_20px_#eab308]"
// //           >
// //               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#ffffff,0_0_30px_#eab308] z-20 translate-y-1/2" />
// //           </motion.div>
// //       </div>

// //       {/* 4. THE ENSEMBLE NODES (The Rasas - Individual Colors) */}
// //       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-0">
// //           {members.map((member, index) => (
// //               <ThreadNode 
// //                 key={member.id} 
// //                 member={member} 
// //                 index={index} 
// //                 activeAudioId={activeAudioId}
// //                 setActiveAudioId={setActiveAudioId}
// //               />
// //           ))}
// //       </div>

// //       {/* 5. FOOTER */}
// //       <TimeCapsule currentYear={currentYear} />

// //     </div>
// //   );
// // }

// // // --- INDIVIDUAL NODE ---
// // function ThreadNode({ member, index, activeAudioId, setActiveAudioId }: { 
// //     member: EnsembleMember; 
// //     index: number; 
// //     activeAudioId: string | null; 
// //     setActiveAudioId: (id: string | null) => void; 
// // }) {
// //     const isEven = index % 2 === 0;
// //     const ref = useRef<HTMLDivElement>(null);
    
// //     // NAVARASA LOGIC: Extract color or default to Gold
// //     // We treat 'color' as the divine aura of this specific person
// //     const RASA = member.color || "#eab308";

// //     // PHYSICS
// //     const { scrollYProgress } = useScroll({
// //         target: ref,
// //         offset: ["start center", "end center"] 
// //     });

// //     const smoothProgress = useSpring(scrollYProgress, PHYSICS);

// //     // TIMING (The "Snap")
// //     const triggerStart = 0.45;
// //     const triggerEnd = 0.50;

// //     const lineDraw = useTransform(smoothProgress, [triggerStart, triggerEnd], [0, 1]); 
// //     const reveal = useTransform(smoothProgress, [triggerStart, 0.55], [0, 1]);
// //     const parallaxY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

// //     const isPlaying = activeAudioId === member.id;
// //     const audioRef = useRef<HTMLAudioElement | null>(null);

// //     useEffect(() => {
// //         if (!audioRef.current) return;
// //         if (isPlaying) audioRef.current.play().catch(() => {});
// //         else audioRef.current.pause();
// //     }, [isPlaying]);

// //     return (
// //         <motion.div 
// //             ref={ref}
// //             className={`flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-48 md:mb-72 relative ${isEven ? '' : 'md:flex-row-reverse'}`}
// //         >
            
// //             {/* --- 1. THE JUNCTION (The Prism Point) --- */}
// //             {/* This is where the Gold Spine splits into the Colored Branch */}
// //             <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 z-20`}>
// //                  <motion.div 
// //                     style={{ 
// //                         scale: useTransform(lineDraw, [0, 1], [0.5, 1]),
// //                         opacity: lineDraw,
// //                         backgroundColor: useTransform(lineDraw, [0, 0.5, 1], ["#eab308", "#ffffff", RASA]), // Transition: Gold -> White -> Rasa
// //                         boxShadow: `0 0 20px ${RASA}`
// //                     }}
// //                     className="w-3 h-3 rounded-full"
// //                  >
// //                     {/* Shockwave Ring */}
// //                     <motion.div 
// //                         style={{ 
// //                             opacity: useTransform(lineDraw, [0.5, 1], [1, 0]), 
// //                             scale: useTransform(lineDraw, [0, 1], [1, 4]),
// //                             borderColor: RASA,
// //                             borderWidth: useTransform(lineDraw, [0, 1], ["2px", "0px"]) 
// //                         }}
// //                         className="absolute inset-0 rounded-full border" 
// //                     />
// //                  </motion.div>
// //             </div>

// //             {/* --- 2. THE HORIZONTAL NERVE (Colored) --- */}
// //             <div className={`hidden md:block absolute top-1/2 w-1/2 h-24 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} -translate-y-1/2 pointer-events-none`}>
// //                 <svg className="w-full h-full" overflow="visible">
// //                     {/* Background Trace */}
// //                     <path
// //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// //                         fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.05"
// //                     />
                    
// //                     {/* THE ACTIVE LINE (Reflects the Rasa Color) */}
// //                     <motion.path
// //                         d={isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}
// //                         fill="none" 
// //                         stroke={RASA} 
// //                         strokeWidth="2" strokeLinecap="round"
// //                         style={{ pathLength: lineDraw }} 
// //                     />

// //                     {/* THE TRAVELLING SPARK */}
// //                     <motion.circle 
// //                         cx={isEven ? "0%" : "100%"} cy="50%" r="3" fill="#fff"
// //                         style={{ 
// //                             offsetPath: `path("${isEven ? "M 100% 50% C 70% 50%, 30% 50%, 0% 50%" : "M 0% 50% C 30% 50%, 70% 50%, 100% 50%"}")`,
// //                             offsetDistance: useTransform(lineDraw, (v) => `${v * 100}%`),
// //                             opacity: lineDraw,
// //                             scale: useTransform(lineDraw, [0, 0.1, 1], [0, 1.5, 1])
// //                         }}
// //                     />
// //                 </svg>
// //             </div>

// //             {/* --- 3. MOBILE CONNECTOR --- */}
// //             <div className="md:hidden absolute left-4 top-[100px] bottom-[100px] w-px bg-white/5">
// //                 <motion.div style={{ height: lineDraw, backgroundColor: RASA }} className="absolute top-0 left-0 w-full origin-top" />
// //                 <motion.div style={{ scaleX: lineDraw, backgroundColor: RASA }} className="absolute top-1/2 left-0 w-8 h-px origin-left" />
// //             </div>

// //             {/* --- 4. THE PORTRAIT --- */}
// //             <div className="w-full md:w-1/2 flex justify-center relative pl-12 md:pl-0">
                
// //                 {/* DIVINE LIGHT (Dynamic Gradient) */}
// //                 <motion.div 
// //                     style={{ 
// //                         opacity: useTransform(reveal, [0, 1], [0, 0.6]),
// //                         scale: useTransform(reveal, [0, 1], [0.8, 1.2]),
// //                         // Construct the gradient dynamically based on the Rasa color
// //                         background: `radial-gradient(circle at center, ${RASA}40, ${RASA}10, transparent)`
// //                     }}
// //                     className="absolute inset-0 rounded-full blur-[50px] z-0" 
// //                 />

// //                 <motion.div 
// //                     style={{ 
// //                         borderColor: useTransform(reveal, [0.5, 1], ["rgba(255,255,255,0.05)", RASA]), // Border Glows Color
// //                         scale: useTransform(reveal, [0, 1], [0.95, 1])
// //                     }}
// //                     className="relative w-[280px] h-[380px] md:w-[360px] md:h-[480px] overflow-hidden rounded-sm border bg-[#080808] z-10"
// //                 >
// //                      <motion.div style={{ y: parallaxY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
// //                         {member.image_url ? (
// //                             <Image src={member.image_url} alt={member.name} fill className="object-cover" priority={index < 2} />
// //                         ) : (
// //                             <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// //                                 <span className="text-8xl font-serif text-white/5">{member.name.charAt(0)}</span>
// //                             </div>
// //                         )}
// //                         <motion.div 
// //                             style={{ opacity: useTransform(reveal, [0, 1], [1, 0]) }}
// //                             className="absolute inset-0 bg-black/90 mix-blend-saturation" 
// //                         />
// //                      </motion.div>

// //                      {/* AUDIO BUTTON (Dynamic Color) */}
// //                      <button 
// //                         onClick={() => setActiveAudioId(isPlaying ? null : member.id)}
// //                         className="absolute bottom-6 right-6 z-30 group"
// //                      >
// //                         {isPlaying && <span style={{ borderColor: RASA }} className="absolute inset-0 rounded-full border animate-ping opacity-50" />}
// //                         <div 
// //                             style={{ 
// //                                 backgroundColor: isPlaying ? RASA : 'rgba(0,0,0,0.4)',
// //                                 borderColor: isPlaying ? RASA : 'rgba(255,255,255,0.2)',
// //                                 color: isPlaying ? '#000' : '#fff'
// //                             }}
// //                             className="relative w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-xl transition-all duration-300"
// //                         >
// //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// //                         </div>
// //                      </button>
// //                 </motion.div>
// //             </div>

// //             {/* --- 5. THE NARRATIVE --- */}
// //             <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-left' : 'md:text-right'} z-10 pl-12 md:pl-0`}>
                
// //                 {/* Role */}
// //                 <div className={`flex items-center gap-4 mb-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}>
// //                     {/* The Line matches the Rasa */}
// //                     <motion.div style={{ width: useTransform(reveal, [0, 1], [0, 40]), backgroundColor: RASA }} className="h-px" />
// //                     <span style={{ color: RASA }} className="text-[10px] uppercase tracking-[0.3em] font-bold">
// //                         {member.role}
// //                     </span>
// //                 </div>

// //                 {/* Name */}
// //                 <div className="overflow-hidden mb-6">
// //                     <motion.h2 
// //                         style={{ y: useTransform(reveal, [0, 1], ["100%", "0%"]) }}
// //                         className="text-5xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight"
// //                     >
// //                         {member.name}
// //                     </motion.h2>
// //                 </div>

// //                 {/* Bio */}
// //                 <motion.p 
// //                     style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [20, 0]) }}
// //                     className="font-serif italic text-white/60 text-lg md:text-2xl mb-8 leading-relaxed max-w-md md:mx-0"
// //                 >
// //                     "{member.bio}"
// //                 </motion.p>

// //                 {/* Profile Link (Hover matches Rasa) */}
// //                 <div className={`mt-10 flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
// //                     <a href={`/artist/${member.slug}`} className="group relative text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors py-2">
// //                         View Full Profile
// //                         <span style={{ backgroundColor: RASA }} className="absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full" />
// //                     </a>
// //                 </div>

// //             </div>
// //         </motion.div>
// //     );
// // }

// // // --- FOOTER ---
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

// --- 4. THE TIME CAPSULE (The Active Anchor) ---
function TimeCapsule({ currentYear, scrollProgress }: { currentYear: string, scrollProgress: MotionValue<number> }) {
    // const years = ['2026', '2025', '2024', 'Faculty'];

    const years = [
        { label: '2026', value: '2025-2026' },
        { label: '2025', value: '2024-2025' },
        { label: '2024', value: '2023-2024' },
        { label: 'Faculty', value: 'Faculty' }
    ];

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
                    className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff] -translate-y-1/2 z-20"
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
                    className="w-4 h-4 rounded-full border bg-[#020202] z-20 transition-colors"
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