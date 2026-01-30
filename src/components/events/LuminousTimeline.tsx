// // // // // // // // // // // // // "use client";

// // // // // // // // // // // // // import { useRef } from "react";
// // // // // // // // // // // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // // // // // // // // // // --- HELPERS ---
// // // // // // // // // // // // // const formatDate = (date: string) => {
// // // // // // // // // // // // //   const d = new Date(date);
// // // // // // // // // // // // //   return `${d.getDate()} ${d.toLocaleString('default', { month: 'long' }).toUpperCase()} ${d.getFullYear()}`;
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // --- SUB-COMPONENT: THE BEACON (Active Challenge) ---
// // // // // // // // // // // // // // This is the "Head" of the timeline. It burns brightest.
// // // // // // // // // // // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //         <div className="relative w-full max-w-4xl mx-auto mb-40 pt-24 px-6">
// // // // // // // // // // // // //             {/* The Light Source */}
// // // // // // // // // // // // //             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none" />
            
// // // // // // // // // // // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // // // // // // // // // // //                 <span className="inline-block px-3 py-1 border border-red-500/30 rounded-full text-red-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
// // // // // // // // // // // // //                     Live Signal • 4 Days Left
// // // // // // // // // // // // //                 </span>
                
// // // // // // // // // // // // //                 <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-none mb-8 mix-blend-overlay opacity-90">
// // // // // // // // // // // // //                     {challenge.theme}
// // // // // // // // // // // // //                 </h1>
                
// // // // // // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
// // // // // // // // // // // // //                     "{challenge.brief}"
// // // // // // // // // // // // //                 </p>

// // // // // // // // // // // // //                 <button className="mt-12 group flex flex-col items-center gap-2">
// // // // // // // // // // // // //                     <span className="text-4xl text-white/20 group-hover:text-red-500 transition-colors duration-500">
// // // // // // // // // // // // //                         ↓
// // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // //                     <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest group-hover:text-white transition-colors">
// // // // // // // // // // // // //                         Accept Mission
// // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // --- SUB-COMPONENT: THE EVENT NODE (Future & Past) ---
// // // // // // // // // // // // // const EventNode = ({ event, isPast }: { event: EventItem, isPast: boolean }) => {
// // // // // // // // // // // // //     const ref = useRef(null);
// // // // // // // // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // // // // // // // //         target: ref,
// // // // // // // // // // // // //         offset: ["start end", "center center"]
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     // Physics: As it enters the center, it glows and scales up slightly
// // // // // // // // // // // // //     const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
// // // // // // // // // // // // //     const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
// // // // // // // // // // // // //     const blur = useTransform(scrollYProgress, [0, 1], ["5px", "0px"]);
    
// // // // // // // // // // // // //     // Smooth out the values
// // // // // // // // // // // // //     const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //         <motion.div 
// // // // // // // // // // // // //             ref={ref}
// // // // // // // // // // // // //             style={{ opacity: smoothOpacity, scale, filter: `blur(${blur.get()})` }} // Note: blur might need direct value binding if not working with motion style directly in some versions, but usually fine.
// // // // // // // // // // // // //             className={`group relative w-full max-w-5xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isPast ? 'opacity-50' : ''}`}
// // // // // // // // // // // // //         >
// // // // // // // // // // // // //             {/* 1. THE IMAGE (Visual Anchor) */}
// // // // // // // // // // // // //             <div className="w-full md:w-1/2 relative aspect-[4/3] overflow-hidden bg-white/5">
// // // // // // // // // // // // //                 {event.featured_image_url ? (
// // // // // // // // // // // // //                     <Image 
// // // // // // // // // // // // //                         src={event.featured_image_url} 
// // // // // // // // // // // // //                         alt={event.title} 
// // // // // // // // // // // // //                         fill 
// // // // // // // // // // // // //                         className={`object-cover transition-all duration-700 ${isPast ? 'grayscale contrast-125 group-hover:grayscale-0' : ''}`}
// // // // // // // // // // // // //                     />
// // // // // // // // // // // // //                 ) : (
// // // // // // // // // // // // //                     <div className="w-full h-full flex items-center justify-center border border-white/10">
// // // // // // // // // // // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                 )}
// // // // // // // // // // // // //                 {/* Overlay for depth */}
// // // // // // // // // // // // //                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             {/* 2. THE CONTENT (Typography) */}
// // // // // // // // // // // // //             <div className="w-full md:w-1/2 flex flex-col items-start text-left">
// // // // // // // // // // // // //                 <div className="flex items-center gap-4 mb-6">
// // // // // // // // // // // // //                     <span className={`w-2 h-2 rounded-full ${isPast ? 'bg-white/20' : 'bg-gold-500 animate-pulse'}`} />
// // // // // // // // // // // // //                     <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
// // // // // // // // // // // // //                         {formatDate(event.date)}
// // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // //                 </div>

// // // // // // // // // // // // //                 <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-[0.9] tracking-tight group-hover:text-gold-100 transition-colors">
// // // // // // // // // // // // //                     {event.title}
// // // // // // // // // // // // //                 </h2>

// // // // // // // // // // // // //                 <p className="font-sans text-white/50 leading-relaxed text-sm md:text-base max-w-sm mb-8">
// // // // // // // // // // // // //                     {event.description}
// // // // // // // // // // // // //                 </p>

// // // // // // // // // // // // //                 {/* The Action Button */}
// // // // // // // // // // // // //                 {!isPast && event.registration_link && (
// // // // // // // // // // // // //                     <a 
// // // // // // // // // // // // //                         href={event.registration_link}
// // // // // // // // // // // // //                         target="_blank"
// // // // // // // // // // // // //                         className="inline-block border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] hover:text-gold-500 hover:border-gold-500 transition-colors"
// // // // // // // // // // // // //                     >
// // // // // // // // // // // // //                         Secure Your Place ↗
// // // // // // // // // // // // //                     </a>
// // // // // // // // // // // // //                 )}
                
// // // // // // // // // // // // //                 {isPast && (
// // // // // // // // // // // // //                     <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
// // // // // // // // // // // // //                         Archived in Memory
// // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // //                 )}
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //         </motion.div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // };


// // // // // // // // // // // // // // --- MAIN COMPONENT ---
// // // // // // // // // // // // // export default function LuminousTimeline({ 
// // // // // // // // // // // // //     challenge, 
// // // // // // // // // // // // //     futureEvents, 
// // // // // // // // // // // // //     pastEvents 
// // // // // // // // // // // // // }: { 
// // // // // // // // // // // // //     challenge: Challenge | null, 
// // // // // // // // // // // // //     futureEvents: EventItem[], 
// // // // // // // // // // // // //     pastEvents: EventItem[] 
// // // // // // // // // // // // // }) {
    
// // // // // // // // // // // // //     // We create one unified list logic
// // // // // // // // // // // // //     return (
// // // // // // // // // // // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40">
            
// // // // // // // // // // // // //             {/* GLOBAL AMBIANCE */}
// // // // // // // // // // // // //             <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[url('/noise.png')]" />
            
// // // // // // // // // // // // //             {/* 1. THE BEACON (If active) */}
// // // // // // // // // // // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // // // // // // // // // // //             {/* THE THREAD (Subtle Central Line) */}
// // // // // // // // // // // // //             {/* It connects the beacon to the rest. Only visible on large screens. */}
// // // // // // // // // // // // //             <div className="absolute left-6 md:left-1/2 top-[40vh] bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

// // // // // // // // // // // // //             {/* 2. FUTURE EVENTS (The Horizon) */}
// // // // // // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // // // // // //                 {futureEvents.map((event) => (
// // // // // // // // // // // // //                     <EventNode key={event.id} event={event} isPast={false} />
// // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             {/* SPACER / DIVIDER */}
// // // // // // // // // // // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // // // // // // // // // // //                 <div className="py-32 flex justify-center opacity-30">
// // // // // // // // // // // // //                     <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40">
// // // // // // // // // // // // //                         The Threshold
// // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //             )}

// // // // // // // // // // // // //             {/* 3. PAST EVENTS (The Shadow) */}
// // // // // // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // // // // // //                 {pastEvents.map((event) => (
// // // // // // // // // // // // //                     <EventNode key={event.id} event={event} isPast={true} />
// // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // //             {/* EMPTY STATE HANDLER */}
// // // // // // // // // // // // //             {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // // // // // // // // // // //                  <div className="h-screen flex items-center justify-center">
// // // // // // // // // // // // //                     <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
// // // // // // // // // // // // //                         The Studio is Quiet.
// // // // // // // // // // // // //                     </span>
// // // // // // // // // // // // //                  </div>
// // // // // // // // // // // // //             )}
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //     );
// // // // // // // // // // // // // }

// // // // // // // // // // // // "use client";

// // // // // // // // // // // // import { useRef } from "react";
// // // // // // // // // // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // // // // // // // // // --- HELPERS ---
// // // // // // // // // // // // const formatDate = (date: string) => {
// // // // // // // // // // // //   const d = new Date(date);
// // // // // // // // // // // //   return `${d.getDate()} ${d.toLocaleString('default', { month: 'long' }).toUpperCase()} ${d.getFullYear()}`;
// // // // // // // // // // // // };

// // // // // // // // // // // // // --- SUB-COMPONENT: THE BEACON (Active Challenge) ---
// // // // // // // // // // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="relative w-full max-w-4xl mx-auto mb-40 pt-32 px-6">
// // // // // // // // // // // //             {/* The Light Source - Subtle and behind */}
// // // // // // // // // // // //             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
            
// // // // // // // // // // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // // // // // // // // // //                 <span className="inline-block px-4 py-2 border border-red-500/20 bg-red-500/5 rounded-full text-red-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-8">
// // // // // // // // // // // //                     Live Signal • Active
// // // // // // // // // // // //                 </span>
                
// // // // // // // // // // // //                 <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-none mb-8 opacity-90">
// // // // // // // // // // // //                     {challenge.theme}
// // // // // // // // // // // //                 </h1>
                
// // // // // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-2xl max-w-3xl leading-relaxed">
// // // // // // // // // // // //                     "{challenge.brief}"
// // // // // // // // // // // //                 </p>

// // // // // // // // // // // //                 <button className="mt-16 group flex flex-col items-center gap-4">
// // // // // // // // // // // //                     <span className="text-sm font-mono text-white/40 uppercase tracking-widest group-hover:text-red-500 transition-colors">
// // // // // // // // // // // //                         Accept Mission
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                     <span className="text-2xl text-white/20 group-hover:text-red-500 transition-colors duration-500 animate-bounce">
// // // // // // // // // // // //                         ↓
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // };

// // // // // // // // // // // // // --- SUB-COMPONENT: THE EVENT NODE (Future & Past) ---
// // // // // // // // // // // // const EventNode = ({ event, isPast }: { event: EventItem, isPast: boolean }) => {
// // // // // // // // // // // //     const ref = useRef(null);
// // // // // // // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // // // // // // //         target: ref,
// // // // // // // // // // // //         // Trigger animation when the item enters the viewport from the bottom
// // // // // // // // // // // //         offset: ["start end", "center center"]
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // 1. OPACITY: Fade in from 0.2 to 1
// // // // // // // // // // // //     const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
    
// // // // // // // // // // // //     // 2. SCALE: Grow slightly from 0.95 to 1
// // // // // // // // // // // //     const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
    
// // // // // // // // // // // //     // Smooth the physics so it doesn't feel jerky
// // // // // // // // // // // //     const smoothOpacity = useSpring(opacity, { stiffness: 60, damping: 20 });
// // // // // // // // // // // //     const smoothScale = useSpring(scale, { stiffness: 60, damping: 20 });

// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <motion.div 
// // // // // // // // // // // //             ref={ref}
// // // // // // // // // // // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // // // // // // // // // // //             className={`group relative w-full max-w-6xl mx-auto py-24 px-6 flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isPast ? 'opacity-50' : ''}`}
// // // // // // // // // // // //         >
// // // // // // // // // // // //             {/* 1. THE IMAGE (Sharp & Clear) */}
// // // // // // // // // // // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10">
// // // // // // // // // // // //                 {event.featured_image_url ? (
// // // // // // // // // // // //                     <Image 
// // // // // // // // // // // //                         src={event.featured_image_url} 
// // // // // // // // // // // //                         alt={event.title} 
// // // // // // // // // // // //                         fill 
// // // // // // // // // // // //                         className={`object-cover transition-all duration-700 ${isPast ? 'grayscale contrast-125 group-hover:grayscale-0' : ''}`}
// // // // // // // // // // // //                         // Priority loading for the first few items to prevent pop-in
// // // // // // // // // // // //                         priority={!isPast}
// // // // // // // // // // // //                     />
// // // // // // // // // // // //                 ) : (
// // // // // // // // // // // //                     <div className="w-full h-full flex items-center justify-center border border-white/10">
// // // // // // // // // // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 )}
                
// // // // // // // // // // // //                 {/* Subtle sheen overlay, disappears on hover */}
// // // // // // // // // // // //                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* 2. THE CONTENT (Typography) */}
// // // // // // // // // // // //             <div className="w-full md:w-1/2 flex flex-col items-start text-left">
// // // // // // // // // // // //                 <div className="flex items-center gap-4 mb-6">
// // // // // // // // // // // //                     <span className={`w-1.5 h-1.5 rounded-full ${isPast ? 'bg-white/20' : 'bg-gold-500 animate-pulse'}`} />
// // // // // // // // // // // //                     <span className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">
// // // // // // // // // // // //                         {formatDate(event.date)}
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-[0.9] tracking-tight group-hover:text-gold-200 transition-colors">
// // // // // // // // // // // //                     {event.title}
// // // // // // // // // // // //                 </h2>

// // // // // // // // // // // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-8">
// // // // // // // // // // // //                     {event.description}
// // // // // // // // // // // //                 </p>

// // // // // // // // // // // //                 {/* The Action Button */}
// // // // // // // // // // // //                 {!isPast && event.registration_link && (
// // // // // // // // // // // //                     <a 
// // // // // // // // // // // //                         href={event.registration_link}
// // // // // // // // // // // //                         target="_blank"
// // // // // // // // // // // //                         className="inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] hover:text-gold-500 hover:border-gold-500 transition-colors"
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                         Secure Your Place <span>↗</span>
// // // // // // // // // // // //                     </a>
// // // // // // // // // // // //                 )}
                
// // // // // // // // // // // //                 {isPast && (
// // // // // // // // // // // //                     <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm">
// // // // // // // // // // // //                         Archived
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                 )}
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //         </motion.div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // };


// // // // // // // // // // // // // --- MAIN COMPONENT ---
// // // // // // // // // // // // export default function LuminousTimeline({ 
// // // // // // // // // // // //     challenge, 
// // // // // // // // // // // //     futureEvents, 
// // // // // // // // // // // //     pastEvents 
// // // // // // // // // // // // }: { 
// // // // // // // // // // // //     challenge: Challenge | null, 
// // // // // // // // // // // //     futureEvents: EventItem[], 
// // // // // // // // // // // //     pastEvents: EventItem[] 
// // // // // // // // // // // // }) {
// // // // // // // // // // // //     return (
// // // // // // // // // // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40">
            
// // // // // // // // // // // //             {/* 1. THE BEACON (If active) */}
// // // // // // // // // // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // // // // // // // // // //             {/* THE THREAD (Central Line) */}
// // // // // // // // // // // //             <div className="absolute left-6 md:left-1/2 top-[20vh] bottom-0 w-px bg-white/5 hidden md:block" />

// // // // // // // // // // // //             {/* 2. FUTURE EVENTS */}
// // // // // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // // // // //                 {futureEvents.map((event) => (
// // // // // // // // // // // //                     <EventNode key={event.id} event={event} isPast={false} />
// // // // // // // // // // // //                 ))}
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* DIVIDER */}
// // // // // // // // // // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // // // // // // // // // //                 <div className="py-24 flex justify-center opacity-30 relative z-20">
// // // // // // // // // // // //                     <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 bg-[#020202] px-4">
// // // // // // // // // // // //                         The Threshold
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             )}

// // // // // // // // // // // //             {/* 3. PAST EVENTS */}
// // // // // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // // // // //                 {pastEvents.map((event) => (
// // // // // // // // // // // //                     <EventNode key={event.id} event={event} isPast={true} />
// // // // // // // // // // // //                 ))}
// // // // // // // // // // // //             </div>
            
// // // // // // // // // // // //             {/* EMPTY STATE */}
// // // // // // // // // // // //             {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // // // // // // // // // //                  <div className="h-screen flex items-center justify-center">
// // // // // // // // // // // //                     <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
// // // // // // // // // // // //                         The Studio is Quiet.
// // // // // // // // // // // //                     </span>
// // // // // // // // // // // //                  </div>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // // }

// // // // // // // // // // // "use client";

// // // // // // // // // // // import { useRef } from "react";
// // // // // // // // // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // // // // // // // // import Image from "next/image";
// // // // // // // // // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // // // // // // // // --- HELPERS ---
// // // // // // // // // // // const formatDate = (date: string) => {
// // // // // // // // // // //   const d = new Date(date);
// // // // // // // // // // //   return `${d.getDate()} ${d.toLocaleString('default', { month: 'long' }).toUpperCase()} ${d.getFullYear()}`;
// // // // // // // // // // // };

// // // // // // // // // // // // --- SUB-COMPONENT: THE BEACON (Active Challenge) ---
// // // // // // // // // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // // // // // // // // //     return (
// // // // // // // // // // //         <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
// // // // // // // // // // //             {/* The Light Source */}
// // // // // // // // // // //             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] md:w-[600px] md:h-[400px] bg-red-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
            
// // // // // // // // // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // // // // // // // // //                 <span className="inline-block px-4 py-2 border border-red-500/20 bg-red-500/5 rounded-full text-red-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-8 animate-pulse">
// // // // // // // // // // //                     Live Signal • Active
// // // // // // // // // // //                 </span>
                
// // // // // // // // // // //                 <h1 className="text-5xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9] mb-8 opacity-90">
// // // // // // // // // // //                     {challenge.theme}
// // // // // // // // // // //                 </h1>
                
// // // // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-2xl max-w-3xl leading-relaxed">
// // // // // // // // // // //                     "{challenge.brief}"
// // // // // // // // // // //                 </p>

// // // // // // // // // // //                 <button className="mt-16 group flex flex-col items-center gap-4 cursor-pointer">
// // // // // // // // // // //                     <span className="text-xs font-mono text-white/40 uppercase tracking-widest group-hover:text-red-500 transition-colors">
// // // // // // // // // // //                         Accept Mission
// // // // // // // // // // //                     </span>
// // // // // // // // // // //                     <span className="text-xl text-white/20 group-hover:text-red-500 transition-colors duration-500 group-hover:translate-y-2 transform">
// // // // // // // // // // //                         ↓
// // // // // // // // // // //                     </span>
// // // // // // // // // // //                     {/* The Connection Point to the Timeline */}
// // // // // // // // // // //                     <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/20 mt-4" />
// // // // // // // // // // //                 </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // };

// // // // // // // // // // // // --- SUB-COMPONENT: THE EVENT NODE ---
// // // // // // // // // // // const EventNode = ({ event, isPast }: { event: EventItem, isPast: boolean }) => {
// // // // // // // // // // //     const ref = useRef(null);
// // // // // // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // // // // // //         target: ref,
// // // // // // // // // // //         offset: ["start end", "center center"]
// // // // // // // // // // //     });

// // // // // // // // // // //     const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
// // // // // // // // // // //     const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
    
// // // // // // // // // // //     const smoothOpacity = useSpring(opacity, { stiffness: 50, damping: 20 });
// // // // // // // // // // //     const smoothScale = useSpring(scale, { stiffness: 50, damping: 20 });

// // // // // // // // // // //     return (
// // // // // // // // // // //         <motion.div 
// // // // // // // // // // //             ref={ref}
// // // // // // // // // // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // // // // // // // // // //             className={`group relative w-full max-w-6xl mx-auto py-16 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-24 ${isPast ? 'opacity-60' : ''}`}
// // // // // // // // // // //         >
// // // // // // // // // // //             {/* 1. THE IMAGE (Visual Anchor) */}
// // // // // // // // // // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden">
// // // // // // // // // // //                 {event.featured_image_url ? (
// // // // // // // // // // //                     <Image 
// // // // // // // // // // //                         src={event.featured_image_url} 
// // // // // // // // // // //                         alt={event.title} 
// // // // // // // // // // //                         fill 
// // // // // // // // // // //                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// // // // // // // // // // //                         className={`object-cover transition-all duration-700 ease-out 
// // // // // // // // // // //                             ${isPast 
// // // // // // // // // // //                                 ? 'grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100' 
// // // // // // // // // // //                                 : 'group-hover:scale-105'
// // // // // // // // // // //                             }
// // // // // // // // // // //                         `}
// // // // // // // // // // //                         priority={!isPast}
// // // // // // // // // // //                     />
// // // // // // // // // // //                 ) : (
// // // // // // // // // // //                     <div className="w-full h-full flex items-center justify-center border border-white/10 bg-[#0a0a0a]">
// // // // // // // // // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 )}
                
// // // // // // // // // // //                 {/* ARCHIVAL GRAIN OVERLAY (For Past Events) */}
// // // // // // // // // // //                 {isPast && (
// // // // // // // // // // //                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
// // // // // // // // // // //                 )}
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* 2. THE CONTENT (Typography) */}
// // // // // // // // // // //             <div className="w-full md:w-1/2 flex flex-col items-start text-left pl-6 md:pl-0 border-l border-white/10 md:border-none">
                
// // // // // // // // // // //                 {/* The Mobile Connector Dot (Visible only on mobile relative to content) */}
// // // // // // // // // // //                 <div className="absolute left-[1.5rem] md:left-auto md:relative w-3 h-3 -translate-x-[1.9rem] md:translate-x-0 mt-1.5 md:mt-0 md:mb-6 flex items-center justify-center">
// // // // // // // // // // //                      <div className={`w-1.5 h-1.5 rounded-full ${isPast ? 'bg-white/30' : 'bg-gold-500 animate-pulse'}`} />
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 <div className="mb-4 hidden md:block">
// // // // // // // // // // //                     {/* Desktop Date Display */}
// // // // // // // // // // //                     <span className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">
// // // // // // // // // // //                         {formatDate(event.date)}
// // // // // // // // // // //                     </span>
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 <span className="md:hidden font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2 block">
// // // // // // // // // // //                     {formatDate(event.date)}
// // // // // // // // // // //                 </span>

// // // // // // // // // // //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// // // // // // // // // // //                     {event.title}
// // // // // // // // // // //                 </h2>

// // // // // // // // // // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-6 md:mb-8">
// // // // // // // // // // //                     {event.description}
// // // // // // // // // // //                 </p>

// // // // // // // // // // //                 {/* The Action Button */}
// // // // // // // // // // //                 {!isPast && event.registration_link && (
// // // // // // // // // // //                     <a 
// // // // // // // // // // //                         href={event.registration_link}
// // // // // // // // // // //                         target="_blank"
// // // // // // // // // // //                         className="inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] hover:text-gold-500 hover:border-gold-500 transition-colors"
// // // // // // // // // // //                     >
// // // // // // // // // // //                         Secure Your Place <span>↗</span>
// // // // // // // // // // //                     </a>
// // // // // // // // // // //                 )}
                
// // // // // // // // // // //                 {isPast && (
// // // // // // // // // // //                     <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm">
// // // // // // // // // // //                         Archive No. {new Date(event.date).getFullYear()}
// // // // // // // // // // //                     </span>
// // // // // // // // // // //                 )}
// // // // // // // // // // //             </div>

// // // // // // // // // // //         </motion.div>
// // // // // // // // // // //     );
// // // // // // // // // // // };


// // // // // // // // // // // // --- MAIN COMPONENT ---
// // // // // // // // // // // export default function LuminousTimeline({ 
// // // // // // // // // // //     challenge, 
// // // // // // // // // // //     futureEvents, 
// // // // // // // // // // //     pastEvents 
// // // // // // // // // // // }: { 
// // // // // // // // // // //     challenge: Challenge | null, 
// // // // // // // // // // //     futureEvents: EventItem[], 
// // // // // // // // // // //     pastEvents: EventItem[] 
// // // // // // // // // // // }) {
// // // // // // // // // // //     return (
// // // // // // // // // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
// // // // // // // // // // //             {/* 1. THE BEACON (If active) */}
// // // // // // // // // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // // // // // // // // //             {/* THE THREAD (The Physical Timeline Line) */}
// // // // // // // // // // //             {/* Mobile: Left aligned (24px) | Desktop: Center aligned */}
// // // // // // // // // // //             <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

// // // // // // // // // // //             {/* 2. FUTURE EVENTS */}
// // // // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // // // //                 {futureEvents.map((event) => (
// // // // // // // // // // //                     <EventNode key={event.id} event={event} isPast={false} />
// // // // // // // // // // //                 ))}
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* THE THRESHOLD (Horizon Line) */}
// // // // // // // // // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // // // // // // // // //                 <div className="py-24 relative z-20 flex items-center justify-center">
// // // // // // // // // // //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />
// // // // // // // // // // //                     <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30 bg-[#020202] px-4 pl-8 md:pl-4 ml-6 md:ml-0">
// // // // // // // // // // //                         The Threshold
// // // // // // // // // // //                     </span>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             )}

// // // // // // // // // // //             {/* 3. PAST EVENTS */}
// // // // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // // // //                 {pastEvents.map((event) => (
// // // // // // // // // // //                     <EventNode key={event.id} event={event} isPast={true} />
// // // // // // // // // // //                 ))}
// // // // // // // // // // //             </div>
            
// // // // // // // // // // //             {/* EMPTY STATE */}
// // // // // // // // // // //             {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // // // // // // // // //                  <div className="h-screen flex items-center justify-center relative z-20">
// // // // // // // // // // //                     <span className="font-mono text-xs text-white/20 uppercase tracking-widest animate-pulse">
// // // // // // // // // // //                         Scanning Frequencies...
// // // // // // // // // // //                     </span>
// // // // // // // // // // //                  </div>
// // // // // // // // // // //             )}
// // // // // // // // // // //         </div>
// // // // // // // // // // //     );
// // // // // // // // // // // }


// // // // // // // // // // "use client";

// // // // // // // // // // import { useRef } from "react";
// // // // // // // // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // // // // // // // import Image from "next/image";
// // // // // // // // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // // // // // // // --- HELPERS ---
// // // // // // // // // // const formatDate = (date: string) => {
// // // // // // // // // //   const d = new Date(date);
// // // // // // // // // //   return `${d.getDate()} ${d.toLocaleString('default', { month: 'long' }).toUpperCase()} ${d.getFullYear()}`;
// // // // // // // // // // };

// // // // // // // // // // // --- SUB-COMPONENT: THE BEACON (Active Challenge) ---
// // // // // // // // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // // // // // // // //     return (
// // // // // // // // // //         <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
// // // // // // // // // //             {/* 1. THE BREATHING LIGHT (Micro-Detail: Animated Pulse) */}
// // // // // // // // // //             <motion.div 
// // // // // // // // // //                 animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
// // // // // // // // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // // // // // // // //                 className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] md:w-[600px] md:h-[400px] bg-red-600/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" 
// // // // // // // // // //             />
            
// // // // // // // // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // // // // // // // //                 <span className="inline-block px-4 py-2 border border-red-500/20 bg-red-500/5 rounded-full text-red-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
// // // // // // // // // //                     Live Signal • Active
// // // // // // // // // //                 </span>
                
// // // // // // // // // //                 <h1 className="text-5xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9] mb-8 opacity-90 drop-shadow-2xl">
// // // // // // // // // //                     {challenge.theme}
// // // // // // // // // //                 </h1>
                
// // // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-2xl max-w-3xl leading-relaxed">
// // // // // // // // // //                     "{challenge.brief}"
// // // // // // // // // //                 </p>

// // // // // // // // // //                 <button className="mt-16 group flex flex-col items-center gap-4 cursor-pointer">
// // // // // // // // // //                     <span className="text-xs font-mono text-white/40 uppercase tracking-widest group-hover:text-red-500 transition-colors duration-300">
// // // // // // // // // //                         Accept Mission
// // // // // // // // // //                     </span>
// // // // // // // // // //                     <motion.span 
// // // // // // // // // //                         animate={{ y: [0, 5, 0] }}
// // // // // // // // // //                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
// // // // // // // // // //                         className="text-xl text-white/20 group-hover:text-red-500 transition-colors duration-300"
// // // // // // // // // //                     >
// // // // // // // // // //                         ↓
// // // // // // // // // //                     </motion.span>
// // // // // // // // // //                     {/* The Connection Point to the Timeline */}
// // // // // // // // // //                     <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/10 mt-4" />
// // // // // // // // // //                 </button>
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // };

// // // // // // // // // // // --- SUB-COMPONENT: THE EVENT NODE ---
// // // // // // // // // // const EventNode = ({ event, isPast }: { event: EventItem, isPast: boolean }) => {
// // // // // // // // // //     const ref = useRef(null);
// // // // // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // // // // //         target: ref,
// // // // // // // // // //         offset: ["start end", "center center"]
// // // // // // // // // //     });

// // // // // // // // // //     const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
// // // // // // // // // //     const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
    
// // // // // // // // // //     const smoothOpacity = useSpring(opacity, { stiffness: 50, damping: 20 });
// // // // // // // // // //     const smoothScale = useSpring(scale, { stiffness: 50, damping: 20 });

// // // // // // // // // //     return (
// // // // // // // // // //         <motion.div 
// // // // // // // // // //             ref={ref}
// // // // // // // // // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // // // // // // // // //             className={`group relative w-full max-w-6xl mx-auto py-16 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-24 ${isPast ? 'opacity-50 hover:opacity-100 transition-opacity duration-500' : ''}`}
// // // // // // // // // //         >
// // // // // // // // // //             {/* 1. THE IMAGE (Visual Anchor) */}
// // // // // // // // // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden">
// // // // // // // // // //                 {event.featured_image_url ? (
// // // // // // // // // //                     <Image 
// // // // // // // // // //                         src={event.featured_image_url} 
// // // // // // // // // //                         alt={event.title} 
// // // // // // // // // //                         fill 
// // // // // // // // // //                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// // // // // // // // // //                         className={`object-cover transition-all duration-1000 ease-out 
// // // // // // // // // //                             ${isPast 
// // // // // // // // // //                                 ? 'grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100' 
// // // // // // // // // //                                 : 'group-hover:scale-105'
// // // // // // // // // //                             }
// // // // // // // // // //                         `}
// // // // // // // // // //                         priority={!isPast}
// // // // // // // // // //                     />
// // // // // // // // // //                 ) : (
// // // // // // // // // //                     <div className="w-full h-full flex items-center justify-center border border-white/10 bg-[#0a0a0a]">
// // // // // // // // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}
                
// // // // // // // // // //                 {/* 2. MICRO-DETAIL: ANIMATED FILM GRAIN (Only for Past) */}
// // // // // // // // // //                 {isPast && (
// // // // // // // // // //                      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
// // // // // // // // // //                 )}
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* 3. THE CONTENT */}
// // // // // // // // // //             {/* Mobile: Added pl-8 to clear the timeline line. Desktop: pl-0 */}
// // // // // // // // // //             <div className="w-full md:w-1/2 flex flex-col items-start text-left pl-8 md:pl-0 border-l border-white/10 md:border-none relative">
                
// // // // // // // // // //                 {/* 4. MICRO-DETAIL: PIXEL PERFECT ALIGNMENT */}
// // // // // // // // // //                 {/* Mobile Logic: 
// // // // // // // // // //                     Timeline is at left-6 (24px).
// // // // // // // // // //                     This container has pl-8 (32px).
// // // // // // // // // //                     The dot needs to be at -8px (32 - 8 = 24px) to hit the line perfectly.
// // // // // // // // // //                     Actually, let's use absolute positioning relative to the screen edge logic 
// // // // // // // // // //                     or just negative margin. 
// // // // // // // // // //                     Better: Use the absolute calculation relative to this container.
// // // // // // // // // //                     If the line is at `left-6` of the PARENT wrapper...
// // // // // // // // // //                     It's safer to just visually align the dot to the left edge of the content 
// // // // // // // // // //                     minus the padding distance.
// // // // // // // // // //                 */}
// // // // // // // // // //                 <div className="absolute left-0 md:left-auto -translate-x-[1.9rem] md:translate-x-0 top-1 md:top-0 md:relative md:mb-6 w-3 h-3 flex items-center justify-center">
// // // // // // // // // //                      <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white/30 text-white/30' : 'bg-gold-500 text-gold-500 animate-pulse'}`} />
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="mb-4 hidden md:block">
// // // // // // // // // //                     <span className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">
// // // // // // // // // //                         {formatDate(event.date)}
// // // // // // // // // //                     </span>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <span className="md:hidden font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2 block">
// // // // // // // // // //                     {formatDate(event.date)}
// // // // // // // // // //                 </span>

// // // // // // // // // //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// // // // // // // // // //                     {event.title}
// // // // // // // // // //                 </h2>

// // // // // // // // // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-6 md:mb-8">
// // // // // // // // // //                     {event.description}
// // // // // // // // // //                 </p>

// // // // // // // // // //                 {!isPast && event.registration_link && (
// // // // // // // // // //                     <a 
// // // // // // // // // //                         href={event.registration_link}
// // // // // // // // // //                         target="_blank"
// // // // // // // // // //                         className="inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] hover:text-gold-500 hover:border-gold-500 transition-colors"
// // // // // // // // // //                     >
// // // // // // // // // //                         Secure Your Place <span className="text-gold-500">↗</span>
// // // // // // // // // //                     </a>
// // // // // // // // // //                 )}
                
// // // // // // // // // //                 {isPast && (
// // // // // // // // // //                     <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm">
// // // // // // // // // //                         Archived
// // // // // // // // // //                     </span>
// // // // // // // // // //                 )}
// // // // // // // // // //             </div>

// // // // // // // // // //         </motion.div>
// // // // // // // // // //     );
// // // // // // // // // // };


// // // // // // // // // // // --- MAIN COMPONENT ---
// // // // // // // // // // export default function LuminousTimeline({ 
// // // // // // // // // //     challenge, 
// // // // // // // // // //     futureEvents, 
// // // // // // // // // //     pastEvents 
// // // // // // // // // // }: { 
// // // // // // // // // //     challenge: Challenge | null, 
// // // // // // // // // //     futureEvents: EventItem[], 
// // // // // // // // // //     pastEvents: EventItem[] 
// // // // // // // // // // }) {
// // // // // // // // // //     return (
// // // // // // // // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
// // // // // // // // // //             {/* 5. MICRO-DETAIL: GLOBAL ATMOSPHERE */}
// // // // // // // // // //             {/* A fixed noise layer that moves slightly to prevent 'dead pixels' look */}
// // // // // // // // // //             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
// // // // // // // // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // // // // // // // //             {/* THE THREAD (The Physical Timeline Line) */}
// // // // // // // // // //             {/* Mobile: left-6 (24px) | Desktop: left-1/2 (Center) */}
// // // // // // // // // //             <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-0" />

// // // // // // // // // //             {/* FUTURE EVENTS */}
// // // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // // //                 {futureEvents.map((event) => (
// // // // // // // // // //                     <EventNode key={event.id} event={event} isPast={false} />
// // // // // // // // // //                 ))}
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* 6. MICRO-DETAIL: THE THRESHOLD MARKER */}
// // // // // // // // // //             {/* A physical "Crosshair" on the timeline */}
// // // // // // // // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // // // // // // // //                 <div className="py-24 relative z-20 flex items-center justify-center">
// // // // // // // // // //                     {/* The Horizontal Cross Line */}
// // // // // // // // // //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-px bg-white/20" />
// // // // // // // // // //                     <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30 bg-[#020202] px-4 pl-8 md:pl-4 ml-6 md:ml-0 relative z-10">
// // // // // // // // // //                         The Threshold
// // // // // // // // // //                     </span>
// // // // // // // // // //                 </div>
// // // // // // // // // //             )}

// // // // // // // // // //             {/* PAST EVENTS */}
// // // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // // //                 {pastEvents.map((event) => (
// // // // // // // // // //                     <EventNode key={event.id} event={event} isPast={true} />
// // // // // // // // // //                 ))}
// // // // // // // // // //             </div>
            
// // // // // // // // // //             {/* EMPTY STATE */}
// // // // // // // // // //             {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // // // // // // // //                  <div className="h-screen flex items-center justify-center relative z-20">
// // // // // // // // // //                     <div className="flex flex-col items-center gap-4">
// // // // // // // // // //                         <div className="w-2 h-2 bg-white/20 rounded-full animate-ping" />
// // // // // // // // // //                         <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
// // // // // // // // // //                             Scanning Frequencies...
// // // // // // // // // //                         </span>
// // // // // // // // // //                     </div>
// // // // // // // // // //                  </div>
// // // // // // // // // //             )}
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // }


// // // // // // // // // "use client";

// // // // // // // // // import { useRef } from "react";
// // // // // // // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // // // // // // import Image from "next/image";
// // // // // // // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // // // // // // --- HELPERS ---
// // // // // // // // // const formatDate = (date: string) => {
// // // // // // // // //   const d = new Date(date);
// // // // // // // // //   return `${d.getDate()} ${d.toLocaleString('default', { month: 'long' }).toUpperCase()} ${d.getFullYear()}`;
// // // // // // // // // };

// // // // // // // // // // --- SUB-COMPONENT: THE BEACON (Active Challenge) ---
// // // // // // // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // // // // // // //     return (
// // // // // // // // //         <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
// // // // // // // // //             {/* 1. THE BREATHING LIGHT (Micro-Detail: Animated Pulse) */}
// // // // // // // // //             <motion.div 
// // // // // // // // //                 animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
// // // // // // // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // // // // // // //                 className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] md:w-[600px] md:h-[400px] bg-red-600/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" 
// // // // // // // // //             />
            
// // // // // // // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // // // // // // //                 <span className="inline-block px-4 py-2 border border-red-500/20 bg-red-500/5 rounded-full text-red-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
// // // // // // // // //                     Live Signal • Active
// // // // // // // // //                 </span>
                
// // // // // // // // //                 <h1 className="text-5xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9] mb-8 opacity-90 drop-shadow-2xl">
// // // // // // // // //                     {challenge.theme}
// // // // // // // // //                 </h1>
                
// // // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-2xl max-w-3xl leading-relaxed">
// // // // // // // // //                     "{challenge.brief}"
// // // // // // // // //                 </p>

// // // // // // // // //                 <button className="mt-16 group flex flex-col items-center gap-4 cursor-pointer">
// // // // // // // // //                     <span className="text-xs font-mono text-white/40 uppercase tracking-widest group-hover:text-red-500 transition-colors duration-300">
// // // // // // // // //                         Accept Mission
// // // // // // // // //                     </span>
// // // // // // // // //                     <motion.span 
// // // // // // // // //                         animate={{ y: [0, 5, 0] }}
// // // // // // // // //                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
// // // // // // // // //                         className="text-xl text-white/20 group-hover:text-red-500 transition-colors duration-300"
// // // // // // // // //                     >
// // // // // // // // //                         ↓
// // // // // // // // //                     </motion.span>
// // // // // // // // //                     {/* The Connection Point to the Timeline */}
// // // // // // // // //                     <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/10 mt-4" />
// // // // // // // // //                 </button>
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };

// // // // // // // // // // --- SUB-COMPONENT: THE EVENT NODE ---
// // // // // // // // // const EventNode = ({ event, isPast }: { event: EventItem, isPast: boolean }) => {
// // // // // // // // //     const ref = useRef(null);
// // // // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // // // //         target: ref,
// // // // // // // // //         offset: ["start end", "center center"]
// // // // // // // // //     });

// // // // // // // // //     const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
// // // // // // // // //     const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
    
// // // // // // // // //     const smoothOpacity = useSpring(opacity, { stiffness: 50, damping: 20 });
// // // // // // // // //     const smoothScale = useSpring(scale, { stiffness: 50, damping: 20 });

// // // // // // // // //     return (
// // // // // // // // //         <motion.div 
// // // // // // // // //             ref={ref}
// // // // // // // // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // // // // // // // //             className={`group relative w-full max-w-6xl mx-auto py-16 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-24 ${isPast ? 'opacity-50 hover:opacity-100 transition-opacity duration-500' : ''}`}
// // // // // // // // //         >
// // // // // // // // //             {/* 1. THE IMAGE (Visual Anchor) */}
// // // // // // // // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden">
// // // // // // // // //                 {event.featured_image_url ? (
// // // // // // // // //                     <Image 
// // // // // // // // //                         src={event.featured_image_url} 
// // // // // // // // //                         alt={event.title} 
// // // // // // // // //                         fill 
// // // // // // // // //                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// // // // // // // // //                         className={`object-cover transition-all duration-1000 ease-out 
// // // // // // // // //                             ${isPast 
// // // // // // // // //                                 ? 'grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100' 
// // // // // // // // //                                 : 'group-hover:scale-105'
// // // // // // // // //                             }
// // // // // // // // //                         `}
// // // // // // // // //                         priority={!isPast}
// // // // // // // // //                     />
// // // // // // // // //                 ) : (
// // // // // // // // //                     <div className="w-full h-full flex items-center justify-center border border-white/10 bg-[#0a0a0a]">
// // // // // // // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
                
// // // // // // // // //                 {/* 2. MICRO-DETAIL: ANIMATED FILM GRAIN (Only for Past) */}
// // // // // // // // //                 {isPast && (
// // // // // // // // //                      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
// // // // // // // // //                 )}
// // // // // // // // //             </div>

// // // // // // // // //             {/* 3. THE CONTENT */}
// // // // // // // // //             {/* Mobile: Added pl-8 to clear the timeline line. Desktop: pl-0 */}
// // // // // // // // //             <div className="w-full md:w-1/2 flex flex-col items-start text-left pl-8 md:pl-0 border-l border-white/10 md:border-none relative">
                
// // // // // // // // //                 {/* 4. MICRO-DETAIL: PIXEL PERFECT ALIGNMENT */}
// // // // // // // // //                 {/* Mobile Logic: 
// // // // // // // // //                     Timeline is at left-6 (24px).
// // // // // // // // //                     This container has pl-8 (32px).
// // // // // // // // //                     The dot needs to be at -8px (32 - 8 = 24px) to hit the line perfectly.
// // // // // // // // //                     Actually, let's use absolute positioning relative to the screen edge logic 
// // // // // // // // //                     or just negative margin. 
// // // // // // // // //                     Better: Use the absolute calculation relative to this container.
// // // // // // // // //                     If the line is at `left-6` of the PARENT wrapper...
// // // // // // // // //                     It's safer to just visually align the dot to the left edge of the content 
// // // // // // // // //                     minus the padding distance.
// // // // // // // // //                 */}
// // // // // // // // //                 <div className="absolute left-0 md:left-auto -translate-x-[1.9rem] md:translate-x-0 top-1 md:top-0 md:relative md:mb-6 w-3 h-3 flex items-center justify-center">
// // // // // // // // //                      <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white/30 text-white/30' : 'bg-gold-500 text-gold-500 animate-pulse'}`} />
// // // // // // // // //                 </div>

// // // // // // // // //                 <div className="mb-4 hidden md:block">
// // // // // // // // //                     <span className="font-mono text-xs text-white/40 uppercase tracking-[0.2em]">
// // // // // // // // //                         {formatDate(event.date)}
// // // // // // // // //                     </span>
// // // // // // // // //                 </div>

// // // // // // // // //                 <span className="md:hidden font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2 block">
// // // // // // // // //                     {formatDate(event.date)}
// // // // // // // // //                 </span>

// // // // // // // // //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// // // // // // // // //                     {event.title}
// // // // // // // // //                 </h2>

// // // // // // // // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-6 md:mb-8">
// // // // // // // // //                     {event.description}
// // // // // // // // //                 </p>

// // // // // // // // //                 {!isPast && event.registration_link && (
// // // // // // // // //                     <a 
// // // // // // // // //                         href={event.registration_link}
// // // // // // // // //                         target="_blank"
// // // // // // // // //                         className="inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] hover:text-gold-500 hover:border-gold-500 transition-colors"
// // // // // // // // //                     >
// // // // // // // // //                         Secure Your Place <span className="text-gold-500">↗</span>
// // // // // // // // //                     </a>
// // // // // // // // //                 )}
                
// // // // // // // // //                 {isPast && (
// // // // // // // // //                     <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm">
// // // // // // // // //                         Archived
// // // // // // // // //                     </span>
// // // // // // // // //                 )}
// // // // // // // // //             </div>

// // // // // // // // //         </motion.div>
// // // // // // // // //     );
// // // // // // // // // };


// // // // // // // // // // --- MAIN COMPONENT ---
// // // // // // // // // export default function LuminousTimeline({ 
// // // // // // // // //     challenge, 
// // // // // // // // //     futureEvents, 
// // // // // // // // //     pastEvents 
// // // // // // // // // }: { 
// // // // // // // // //     challenge: Challenge | null, 
// // // // // // // // //     futureEvents: EventItem[], 
// // // // // // // // //     pastEvents: EventItem[] 
// // // // // // // // // }) {
// // // // // // // // //     return (
// // // // // // // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
// // // // // // // // //             {/* 5. MICRO-DETAIL: GLOBAL ATMOSPHERE */}
// // // // // // // // //             {/* A fixed noise layer that moves slightly to prevent 'dead pixels' look */}
// // // // // // // // //             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
// // // // // // // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // // // // // // //             {/* THE THREAD (The Physical Timeline Line) */}
// // // // // // // // //             {/* Mobile: left-6 (24px) | Desktop: left-1/2 (Center) */}
// // // // // // // // //             <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-0" />

// // // // // // // // //             {/* FUTURE EVENTS */}
// // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // //                 {futureEvents.map((event) => (
// // // // // // // // //                     <EventNode key={event.id} event={event} isPast={false} />
// // // // // // // // //                 ))}
// // // // // // // // //             </div>

// // // // // // // // //             {/* 6. MICRO-DETAIL: THE THRESHOLD MARKER */}
// // // // // // // // //             {/* A physical "Crosshair" on the timeline */}
// // // // // // // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // // // // // // //                 <div className="py-24 relative z-20 flex items-center justify-center">
// // // // // // // // //                     {/* The Horizontal Cross Line */}
// // // // // // // // //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-px bg-white/20" />
// // // // // // // // //                     <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30 bg-[#020202] px-4 pl-8 md:pl-4 ml-6 md:ml-0 relative z-10">
// // // // // // // // //                         The Threshold
// // // // // // // // //                     </span>
// // // // // // // // //                 </div>
// // // // // // // // //             )}

// // // // // // // // //             {/* PAST EVENTS */}
// // // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // // //                 {pastEvents.map((event) => (
// // // // // // // // //                     <EventNode key={event.id} event={event} isPast={true} />
// // // // // // // // //                 ))}
// // // // // // // // //             </div>
            
// // // // // // // // //             {/* EMPTY STATE */}
// // // // // // // // //             {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // // // // // // //                  <div className="h-screen flex items-center justify-center relative z-20">
// // // // // // // // //                     <div className="flex flex-col items-center gap-4">
// // // // // // // // //                         <div className="w-2 h-2 bg-white/20 rounded-full animate-ping" />
// // // // // // // // //                         <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
// // // // // // // // //                             Scanning Frequencies...
// // // // // // // // //                         </span>
// // // // // // // // //                     </div>
// // // // // // // // //                  </div>
// // // // // // // // //             )}
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }


// // // // // // // // "use client";

// // // // // // // // import { useRef } from "react";
// // // // // // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // // // // // import Image from "next/image";
// // // // // // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // // // // // --- 1. IMPROVED TIME LOGIC (Humanized) ---
// // // // // // // // const formatCinematicDate = (dateString: string) => {
// // // // // // // //   const eventDate = new Date(dateString);
// // // // // // // //   const now = new Date();
  
// // // // // // // //   // Reset hours to compare pure dates
// // // // // // // //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// // // // // // // //   const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  
// // // // // // // //   const diffTime = target.getTime() - today.getTime();
// // // // // // // //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

// // // // // // // //   if (diffDays === 0) return "HAPPENING TODAY";
// // // // // // // //   if (diffDays === 1) return "TOMORROW";
// // // // // // // //   if (diffDays > 1 && diffDays < 7) return `THIS ${eventDate.toLocaleString('default', { weekday: 'long' }).toUpperCase()}`;
  
// // // // // // // //   // Standard format for distant future/past
// // // // // // // //   return `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' }).toUpperCase()} ${eventDate.getFullYear()}`;
// // // // // // // // };

// // // // // // // // // --- SUB-COMPONENT: THE BEACON ---
// // // // // // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // // // // // //     return (
// // // // // // // //         <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
// // // // // // // //             <motion.div 
// // // // // // // //                 animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
// // // // // // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // // // // // //                 className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] md:w-[600px] md:h-[400px] bg-red-600/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" 
// // // // // // // //             />
            
// // // // // // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // // // // // //                 <span className="inline-block px-4 py-2 border border-red-500/20 bg-red-500/5 rounded-full text-red-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(220,38,38,0.2)] animate-pulse">
// // // // // // // //                     Live Signal • Active
// // // // // // // //                 </span>
                
// // // // // // // //                 <h1 className="text-5xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9] mb-8 opacity-90 drop-shadow-2xl">
// // // // // // // //                     {challenge.theme}
// // // // // // // //                 </h1>
                
// // // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-2xl max-w-3xl leading-relaxed">
// // // // // // // //                     "{challenge.brief}"
// // // // // // // //                 </p>

// // // // // // // //                 {/* IMPROVED: Functional Link */}
// // // // // // // //                 <a 
// // // // // // // //                     href={`mailto:secretary.aayam@iitm.ac.in?subject=Submission: ${challenge.theme}`}
// // // // // // // //                     className="mt-16 group flex flex-col items-center gap-4 cursor-pointer"
// // // // // // // //                 >
// // // // // // // //                     <span className="text-xs font-mono text-white/40 uppercase tracking-widest group-hover:text-red-500 transition-colors duration-300">
// // // // // // // //                         Submit Transmission
// // // // // // // //                     </span>
// // // // // // // //                     <motion.span 
// // // // // // // //                         animate={{ y: [0, 5, 0] }}
// // // // // // // //                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
// // // // // // // //                         className="text-xl text-white/20 group-hover:text-red-500 transition-colors duration-300"
// // // // // // // //                     >
// // // // // // // //                         ↓
// // // // // // // //                     </motion.span>
// // // // // // // //                     <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/10 mt-4" />
// // // // // // // //                 </a>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // // --- SUB-COMPONENT: THE EVENT NODE (Zig-Zag Edition) ---
// // // // // // // // const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
// // // // // // // //     const ref = useRef(null);
// // // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // // //         target: ref,
// // // // // // // //         offset: ["start end", "center center"]
// // // // // // // //     });

// // // // // // // //     const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
// // // // // // // //     const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
// // // // // // // //     const smoothOpacity = useSpring(opacity, { stiffness: 50, damping: 20 });
// // // // // // // //     const smoothScale = useSpring(scale, { stiffness: 50, damping: 20 });

// // // // // // // //     // ZIG-ZAG LOGIC: Even numbers = Normal, Odd numbers = Reversed (Desktop only)
// // // // // // // //     const isReversed = index % 2 !== 0;
// // // // // // // //     const dateString = formatCinematicDate(event.date);
// // // // // // // //     const isUrgent = dateString === "TOMORROW" || dateString === "HAPPENING TODAY";

// // // // // // // //     return (
// // // // // // // //         <motion.div 
// // // // // // // //             ref={ref}
// // // // // // // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // // // // // // //             className={`
// // // // // // // //                 group relative w-full max-w-7xl mx-auto py-16 md:py-24 px-6 md:px-12 
// // // // // // // //                 flex flex-col gap-8 md:gap-24 items-center
// // // // // // // //                 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
// // // // // // // //                 ${isPast ? 'opacity-60 hover:opacity-100 transition-opacity duration-500' : ''}
// // // // // // // //             `}
// // // // // // // //         >
// // // // // // // //             {/* 1. THE IMAGE (Visual Anchor) */}
// // // // // // // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
// // // // // // // //                 {event.featured_image_url ? (
// // // // // // // //                     <Image 
// // // // // // // //                         src={event.featured_image_url} 
// // // // // // // //                         alt={event.title} 
// // // // // // // //                         fill 
// // // // // // // //                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// // // // // // // //                         className={`object-cover transition-all duration-1000 ease-out 
// // // // // // // //                             ${isPast 
// // // // // // // //                                 ? 'grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100' 
// // // // // // // //                                 : 'group-hover:scale-105'
// // // // // // // //                             }
// // // // // // // //                         `}
// // // // // // // //                         priority={!isPast && index < 2} // Priority load only top 2 future events
// // // // // // // //                     />
// // // // // // // //                 ) : (
// // // // // // // //                     <div className="w-full h-full flex items-center justify-center border border-white/10 bg-[#0a0a0a]">
// // // // // // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // // // // // //                     </div>
// // // // // // // //                 )}
                
// // // // // // // //                 {isPast && (
// // // // // // // //                      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
// // // // // // // //                 )}
// // // // // // // //             </div>

// // // // // // // //             {/* 2. THE CONTENT */}
// // // // // // // //             {/* Logic: Add padding towards the center line based on direction */}
// // // // // // // //             <div className={`
// // // // // // // //                 w-full md:w-1/2 flex flex-col items-start text-left relative
// // // // // // // //                 ${isReversed ? 'md:items-end md:text-right md:pr-12' : 'md:pl-12'}
// // // // // // // //             `}>
                
// // // // // // // //                 {/* CONNECTOR DOT (Desktop) - Always sits on the center line */}
// // // // // // // //                 <div className={`
// // // // // // // //                     hidden md:flex absolute top-2 w-3 h-3 items-center justify-center
// // // // // // // //                     ${isReversed ? '-right-[calc(3rem+6px)]' : '-left-[calc(3rem+6px)]'}
// // // // // // // //                 `}>
// // // // // // // //                      <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white/30 text-white/30' : 'bg-gold-500 text-gold-500 animate-pulse'}`} />
// // // // // // // //                 </div>

// // // // // // // //                 {/* CONNECTOR DOT (Mobile) - Left aligned */}
// // // // // // // //                 <div className="md:hidden absolute left-0 -translate-x-[2.2rem] top-1 w-3 h-3 flex items-center justify-center">
// // // // // // // //                      <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white/30 text-white/30' : 'bg-gold-500 text-gold-500 animate-pulse'}`} />
// // // // // // // //                 </div>

// // // // // // // //                 {/* DATE DISPLAY */}
// // // // // // // //                 <div className="mb-4">
// // // // // // // //                     <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isUrgent ? 'text-red-500 animate-pulse font-bold' : 'text-white/40'}`}>
// // // // // // // //                         {dateString}
// // // // // // // //                     </span>
// // // // // // // //                 </div>

// // // // // // // //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// // // // // // // //                     {event.title}
// // // // // // // //                 </h2>

// // // // // // // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-6 md:mb-8">
// // // // // // // //                     {event.description}
// // // // // // // //                 </p>

// // // // // // // //                 {!isPast && event.registration_link && (
// // // // // // // //                     <a 
// // // // // // // //                         href={event.registration_link}
// // // // // // // //                         target="_blank"
// // // // // // // //                         className={`inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] hover:text-gold-500 hover:border-gold-500 transition-colors ${isReversed ? 'flex-row-reverse' : ''}`}
// // // // // // // //                     >
// // // // // // // //                         Secure Your Place <span className="text-gold-500">↗</span>
// // // // // // // //                     </a>
// // // // // // // //                 )}
                
// // // // // // // //                 {isPast && (
// // // // // // // //                     <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm">
// // // // // // // //                         Archived
// // // // // // // //                     </span>
// // // // // // // //                 )}
// // // // // // // //             </div>

// // // // // // // //         </motion.div>
// // // // // // // //     );
// // // // // // // // };


// // // // // // // // // --- MAIN COMPONENT ---
// // // // // // // // export default function LuminousTimeline({ 
// // // // // // // //     challenge, 
// // // // // // // //     futureEvents, 
// // // // // // // //     pastEvents 
// // // // // // // // }: { 
// // // // // // // //     challenge: Challenge | null, 
// // // // // // // //     futureEvents: EventItem[], 
// // // // // // // //     pastEvents: EventItem[] 
// // // // // // // // }) {
// // // // // // // //     return (
// // // // // // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
// // // // // // // //             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
// // // // // // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // // // // // //             {/* THE THREAD */}
// // // // // // // //             {/* Mobile: Left-aligned (24px) | Desktop: Center-aligned */}
// // // // // // // //             <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-0" />

// // // // // // // //             {/* FUTURE EVENTS */}
// // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // //                 {futureEvents.map((event, index) => (
// // // // // // // //                     <EventNode key={event.id} event={event} isPast={false} index={index} />
// // // // // // // //                 ))}
// // // // // // // //             </div>

// // // // // // // //             {/* THE THRESHOLD */}
// // // // // // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // // // // // //                 <div className="py-32 relative z-20 flex items-center justify-center">
// // // // // // // //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-px bg-white/20" />
// // // // // // // //                     <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/10 rounded-full">
// // // // // // // //                         <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 block ml-6 md:ml-0 pl-4 md:pl-0">
// // // // // // // //                             The Threshold
// // // // // // // //                         </span>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             )}

// // // // // // // //             {/* PAST EVENTS */}
// // // // // // // //             {/* Reset index logic for past events so the zig-zag starts fresh or continues naturally? 
// // // // // // // //                 Let's continue the count to maintain flow. 
// // // // // // // //             */}
// // // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // // //                 {pastEvents.map((event, index) => (
// // // // // // // //                     <EventNode 
// // // // // // // //                         key={event.id} 
// // // // // // // //                         event={event} 
// // // // // // // //                         isPast={true} 
// // // // // // // //                         index={futureEvents.length + index} // Continue the zigzag pattern
// // // // // // // //                     />
// // // // // // // //                 ))}
// // // // // // // //             </div>
            
// // // // // // // //             {/* EMPTY STATE */}
// // // // // // // //             {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // // // // // //                  <div className="h-screen flex items-center justify-center relative z-20">
// // // // // // // //                     <div className="flex flex-col items-center gap-4">
// // // // // // // //                         <div className="w-2 h-2 bg-white/20 rounded-full animate-ping" />
// // // // // // // //                         <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
// // // // // // // //                             Scanning Frequencies...
// // // // // // // //                         </span>
// // // // // // // //                     </div>
// // // // // // // //                  </div>
// // // // // // // //             )}
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // "use client";

// // // // // // // import { useRef } from "react";
// // // // // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // // // // import Image from "next/image";
// // // // // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // // // // --- 1. UTILS ---
// // // // // // // const formatCinematicDate = (dateString: string) => {
// // // // // // //   const eventDate = new Date(dateString);
// // // // // // //   const now = new Date();
// // // // // // //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// // // // // // //   const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
// // // // // // //   const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

// // // // // // //   if (diffDays === 0) return "HAPPENING TODAY";
// // // // // // //   if (diffDays === 1) return "TOMORROW";
// // // // // // //   if (diffDays > 1 && diffDays < 7) return `THIS ${eventDate.toLocaleString('default', { weekday: 'long' }).toUpperCase()}`;
// // // // // // //   return `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' }).toUpperCase()} ${eventDate.getFullYear()}`;
// // // // // // // };

// // // // // // // // --- 2. THE BEACON (Active Challenge) ---
// // // // // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // // // // //     return (
// // // // // // //         <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
// // // // // // //             {/* The Atmospheric Glow */}
// // // // // // //             <motion.div 
// // // // // // //                 animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
// // // // // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // // // // //                 className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] md:w-[600px] md:h-[400px] bg-red-600/15 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" 
// // // // // // //             />
            
// // // // // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // // // // //                 <span className="inline-block px-4 py-2 border border-red-500/20 bg-red-500/5 rounded-full text-red-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(220,38,38,0.2)] animate-pulse">
// // // // // // //                     Live Signal • Active
// // // // // // //                 </span>
                
// // // // // // //                 <h1 className="text-5xl md:text-9xl font-serif text-white tracking-tighter leading-[0.9] mb-8 opacity-90 drop-shadow-2xl mix-blend-screen">
// // // // // // //                     {challenge.theme}
// // // // // // //                 </h1>
                
// // // // // // //                 <p className="font-serif italic text-white/60 text-lg md:text-2xl max-w-3xl leading-relaxed">
// // // // // // //                     "{challenge.brief}"
// // // // // // //                 </p>

// // // // // // //                 <a 
// // // // // // //                     href={`mailto:secretary.aayam@iitm.ac.in?subject=Submission: ${challenge.theme}`}
// // // // // // //                     className="mt-16 group flex flex-col items-center gap-4 cursor-pointer outline-none focus-visible:scale-110 transition-transform"
// // // // // // //                 >
// // // // // // //                     <span className="text-xs font-mono text-white/40 uppercase tracking-widest group-hover:text-red-500 group-focus-visible:text-red-500 transition-colors duration-300">
// // // // // // //                         Submit Transmission
// // // // // // //                     </span>
// // // // // // //                     <motion.span 
// // // // // // //                         animate={{ y: [0, 5, 0] }}
// // // // // // //                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
// // // // // // //                         className="text-xl text-white/20 group-hover:text-red-500 group-focus-visible:text-red-500 transition-colors duration-300"
// // // // // // //                     >
// // // // // // //                         ↓
// // // // // // //                     </motion.span>
// // // // // // //                     {/* Connection Line */}
// // // // // // //                     <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/10 mt-4" />
// // // // // // //                 </a>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // // --- 3. THE EVENT NODE ---
// // // // // // // const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
// // // // // // //     const ref = useRef(null);
// // // // // // //     const { scrollYProgress } = useScroll({
// // // // // // //         target: ref,
// // // // // // //         offset: ["start end", "center center"]
// // // // // // //     });

// // // // // // //     const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1]), { stiffness: 50, damping: 20 });
// // // // // // //     const smoothScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.98, 1]), { stiffness: 50, damping: 20 });

// // // // // // //     const isReversed = index % 2 !== 0;
// // // // // // //     const dateString = formatCinematicDate(event.date);
// // // // // // //     const isUrgent = !isPast && (dateString === "TOMORROW" || dateString === "HAPPENING TODAY");

// // // // // // //     return (
// // // // // // //         <motion.div 
// // // // // // //             ref={ref}
// // // // // // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // // // // // //             className={`
// // // // // // //                 group relative w-full max-w-7xl mx-auto py-16 md:py-24 px-6 md:px-12 
// // // // // // //                 flex flex-col gap-8 md:gap-24 items-center
// // // // // // //                 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
// // // // // // //                 ${isPast ? 'opacity-60 hover:opacity-100 transition-opacity duration-500' : ''}
// // // // // // //             `}
// // // // // // //         >
// // // // // // //             {/* IMAGE ANCHOR */}
// // // // // // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
// // // // // // //                 {event.featured_image_url ? (
// // // // // // //                     <Image 
// // // // // // //                         src={event.featured_image_url} 
// // // // // // //                         alt={event.title} 
// // // // // // //                         fill 
// // // // // // //                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// // // // // // //                         className={`object-cover transition-all duration-1000 ease-out 
// // // // // // //                             ${isPast 
// // // // // // //                                 ? 'grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100' 
// // // // // // //                                 : 'group-hover:scale-105'
// // // // // // //                             }
// // // // // // //                         `}
// // // // // // //                         priority={!isPast && index < 2}
// // // // // // //                     />
// // // // // // //                 ) : (
// // // // // // //                     <div className="w-full h-full flex items-center justify-center border border-white/10 bg-[#0a0a0a]">
// // // // // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //                 {isPast && <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />}
// // // // // // //             </div>

// // // // // // //             {/* CONTENT BLOCK */}
// // // // // // //             <div className={`
// // // // // // //                 w-full md:w-1/2 flex flex-col items-start text-left relative
// // // // // // //                 ${isReversed ? 'md:items-end md:text-right md:pr-12' : 'md:pl-12'}
// // // // // // //             `}>
// // // // // // //                 {/* CONNECTOR DOTS */}
// // // // // // //                 <div className={`
// // // // // // //                     hidden md:flex absolute top-2 w-3 h-3 items-center justify-center
// // // // // // //                     ${isReversed ? '-right-[calc(3rem+6px)]' : '-left-[calc(3rem+6px)]'}
// // // // // // //                 `}>
// // // // // // //                      <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor] transition-all duration-500 ${isPast ? 'bg-white/30 text-white/30' : 'bg-gold-500 text-gold-500 animate-pulse group-hover:scale-150'}`} />
// // // // // // //                 </div>
// // // // // // //                 {/* Mobile Dot */}
// // // // // // //                 <div className="md:hidden absolute left-0 -translate-x-[2.2rem] top-1 w-3 h-3 flex items-center justify-center">
// // // // // // //                      <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white/30' : 'bg-gold-500 animate-pulse'}`} />
// // // // // // //                 </div>

// // // // // // //                 {/* TEXT CONTENT */}
// // // // // // //                 <div className="mb-4">
// // // // // // //                     <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isUrgent ? 'text-red-500 animate-pulse font-bold' : 'text-white/40'}`}>
// // // // // // //                         {dateString}
// // // // // // //                     </span>
// // // // // // //                 </div>
// // // // // // //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// // // // // // //                     {event.title}
// // // // // // //                 </h2>
// // // // // // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-8">
// // // // // // //                     {event.description}
// // // // // // //                 </p>

// // // // // // //                 {/* ACTION BUTTON (Accessible) */}
// // // // // // //                 {!isPast && event.registration_link && (
// // // // // // //                     <a 
// // // // // // //                         href={event.registration_link}
// // // // // // //                         target="_blank"
// // // // // // //                         className={`
// // // // // // //                             inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] 
// // // // // // //                             hover:text-gold-500 hover:border-gold-500 focus-visible:text-gold-500 focus-visible:border-gold-500 outline-none transition-colors
// // // // // // //                             ${isReversed ? 'flex-row-reverse' : ''}
// // // // // // //                         `}
// // // // // // //                     >
// // // // // // //                         Secure Your Place <span className="text-gold-500">↗</span>
// // // // // // //                     </a>
// // // // // // //                 )}
// // // // // // //                 {isPast && (
// // // // // // //                     <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm">
// // // // // // //                         Archived
// // // // // // //                     </span>
// // // // // // //                 )}
// // // // // // //             </div>
// // // // // // //         </motion.div>
// // // // // // //     );
// // // // // // // };

// // // // // // // // --- 4. MAIN COMPONENT ---
// // // // // // // export default function LuminousTimeline({ 
// // // // // // //     challenge, futureEvents, pastEvents 
// // // // // // // }: { 
// // // // // // //     challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
// // // // // // // }) {
// // // // // // //     return (
// // // // // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
// // // // // // //             {/* Atmosphere */}
// // // // // // //             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
// // // // // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // // // // //             {/* THE RED THREAD (With Signal Beam) */}
// // // // // // //             <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 z-0 overflow-hidden">
// // // // // // //                 {/* The Signal Beam: A light pulse traveling down the line */}
// // // // // // //                 <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent via-red-500/50 to-transparent animate-[grain_4s_linear_infinite]" />
// // // // // // //             </div>

// // // // // // //             {/* CONTENT STACK */}
// // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // //                 {futureEvents.map((event, index) => (
// // // // // // //                     <EventNode key={event.id} event={event} isPast={false} index={index} />
// // // // // // //                 ))}
// // // // // // //             </div>

// // // // // // //             {/* THE THRESHOLD */}
// // // // // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // // // // //                 <div className="py-32 relative z-20 flex items-center justify-center">
// // // // // // //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-px bg-white/20" />
// // // // // // //                     <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/10 rounded-full">
// // // // // // //                         <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
// // // // // // //                             The Threshold
// // // // // // //                         </span>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             )}

// // // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // // //                 {pastEvents.map((event, index) => (
// // // // // // //                     <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
// // // // // // //                 ))}
// // // // // // //             </div>
            
// // // // // // //             {/* EMPTY STATE */}
// // // // // // //             {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // // // // //                  <div className="h-screen flex items-center justify-center relative z-20">
// // // // // // //                     <div className="flex flex-col items-center gap-4">
// // // // // // //                         <div className="w-2 h-2 bg-white/20 rounded-full animate-ping" />
// // // // // // //                         <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
// // // // // // //                             Scanning Frequencies...
// // // // // // //                         </span>
// // // // // // //                     </div>
// // // // // // //                  </div>
// // // // // // //             )}
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }


// // // // // // "use client";

// // // // // // import { useRef } from "react";
// // // // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // // // import Image from "next/image";
// // // // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // // // --- UTILS ---
// // // // // // const formatCinematicDate = (dateString: string) => {
// // // // // //   const eventDate = new Date(dateString);
// // // // // //   const now = new Date();
// // // // // //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// // // // // //   const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
// // // // // //   const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

// // // // // //   if (diffDays === 0) return "HAPPENING TODAY";
// // // // // //   if (diffDays === 1) return "TOMORROW";
// // // // // //   if (diffDays > 1 && diffDays < 7) return `THIS ${eventDate.toLocaleString('default', { weekday: 'long' }).toUpperCase()}`;
// // // // // //   return `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' }).toUpperCase()} ${eventDate.getFullYear()}`;
// // // // // // };

// // // // // // // --- 1. THE BEACON (The Submit Button Fix) ---
// // // // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // // // //     return (
// // // // // //         <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
// // // // // //             {/* Atmosphere */}
// // // // // //             <motion.div 
// // // // // //                 animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
// // // // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // // // //                 className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none" 
// // // // // //             />
            
// // // // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // // // //                 <span className="inline-block px-4 py-1.5 border border-red-500/30 bg-red-500/10 rounded-full text-red-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.3)]">
// // // // // //                     Live Signal • Active
// // // // // //                 </span>
                
// // // // // //                 <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
// // // // // //                     {challenge.theme}
// // // // // //                 </h1>
                
// // // // // //                 <p className="font-serif italic text-white/70 text-lg md:text-2xl max-w-2xl leading-relaxed">
// // // // // //                     "{challenge.brief}"
// // // // // //                 </p>

// // // // // //                 {/* THE NEW BUTTON: NUCLEAR OPTION */}
// // // // // //                 <div className="mt-16 flex flex-col items-center gap-6">
// // // // // //                     <a 
// // // // // //                         href={`mailto:secretary.aayam@iitm.ac.in?subject=Submission: ${challenge.theme}`}
// // // // // //                         className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105"
// // // // // //                     >
// // // // // //                         {/* Glowing Border Box */}
// // // // // //                         <div className="absolute inset-0 border border-white/30 group-hover:border-red-500 transition-colors duration-300" />
// // // // // //                         <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300" />
                        
// // // // // //                         {/* Text Content */}
// // // // // //                         <div className="relative z-10 flex items-center gap-4">
// // // // // //                             <span className="font-mono text-sm text-white font-bold uppercase tracking-[0.2em] group-hover:text-red-400 transition-colors">
// // // // // //                                 Submit Transmission
// // // // // //                             </span>
// // // // // //                             <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
// // // // // //                                 →
// // // // // //                             </span>
// // // // // //                         </div>

// // // // // //                         {/* Corner Accents (The "Tech" feel) */}
// // // // // //                         <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50 group-hover:border-red-500 transition-colors" />
// // // // // //                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50 group-hover:border-red-500 transition-colors" />
// // // // // //                     </a>

// // // // // //                     {/* The Connection Line to Timeline */}
// // // // // //                     <div className="h-24 w-px bg-gradient-to-b from-transparent via-white/20 to-white/5" />
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // // --- 2. THE EVENT NODE (Focus Dot Fix) ---
// // // // // // const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
// // // // // //     const ref = useRef(null);
// // // // // //     const { scrollYProgress } = useScroll({
// // // // // //         target: ref,
// // // // // //         offset: ["start end", "center center"]
// // // // // //     });

// // // // // //     const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1]), { stiffness: 50, damping: 20 });
// // // // // //     const smoothScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.95, 1]), { stiffness: 50, damping: 20 });

// // // // // //     const isReversed = index % 2 !== 0;
// // // // // //     const dateString = formatCinematicDate(event.date);
// // // // // //     const isUrgent = !isPast && (dateString === "TOMORROW" || dateString === "HAPPENING TODAY");

// // // // // //     return (
// // // // // //         <motion.div 
// // // // // //             ref={ref}
// // // // // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // // // // //             className={`
// // // // // //                 group relative w-full max-w-7xl mx-auto py-20 px-6 md:px-12 
// // // // // //                 flex flex-col gap-8 md:gap-24 items-center
// // // // // //                 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
// // // // // //                 ${isPast ? 'opacity-50 hover:opacity-100 transition-opacity duration-500' : ''}
// // // // // //             `}
// // // // // //         >
// // // // // //             {/* IMAGE */}
// // // // // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
// // // // // //                 {event.featured_image_url ? (
// // // // // //                     <Image 
// // // // // //                         src={event.featured_image_url} 
// // // // // //                         alt={event.title} 
// // // // // //                         fill 
// // // // // //                         sizes="(max-width: 768px) 100vw, 50vw"
// // // // // //                         className={`object-cover transition-all duration-1000 ease-out 
// // // // // //                             ${isPast 
// // // // // //                                 ? 'grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100' 
// // // // // //                                 : 'group-hover:scale-105'
// // // // // //                             }
// // // // // //                         `}
// // // // // //                     />
// // // // // //                 ) : (
// // // // // //                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // // // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // // // //                     </div>
// // // // // //                 )}
// // // // // //             </div>

// // // // // //             {/* CONTENT */}
// // // // // //             <div className={`
// // // // // //                 w-full md:w-1/2 flex flex-col items-start text-left relative
// // // // // //                 ${isReversed ? 'md:items-end md:text-right md:pr-12' : 'md:pl-12'}
// // // // // //             `}>
                
// // // // // //                 {/* --- THE FOCUS DOT (FIXED) --- */}
// // // // // //                 {/* Logic: We attach it absolutely to the content container, but positioned to hit the center line */}
// // // // // //                 <div className={`
// // // // // //                     hidden md:flex absolute top-2 w-4 h-4 items-center justify-center z-20
// // // // // //                     ${isReversed ? '-right-[calc(3rem+8px)]' : '-left-[calc(3rem+8px)]'}
// // // // // //                 `}>
// // // // // //                      {/* The Glow Ring */}
// // // // // //                      <div className={`absolute inset-0 rounded-full opacity-50 ${isPast ? 'bg-white/20' : 'bg-gold-500/50 animate-ping'}`} />
// // // // // //                      {/* The Solid Core */}
// // // // // //                      <div className={`relative w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white text-white' : 'bg-gold-500 text-gold-500'}`} />
// // // // // //                 </div>

// // // // // //                 {/* Mobile Dot (Left Aligned) */}
// // // // // //                 <div className="md:hidden absolute left-0 -translate-x-[2.2rem] top-1 w-4 h-4 flex items-center justify-center z-20">
// // // // // //                      <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white' : 'bg-gold-500 animate-pulse'}`} />
// // // // // //                 </div>

// // // // // //                 <div className="mb-4">
// // // // // //                     <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isUrgent ? 'text-red-500 font-bold animate-pulse' : 'text-white/40'}`}>
// // // // // //                         {dateString}
// // // // // //                     </span>
// // // // // //                 </div>
                
// // // // // //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// // // // // //                     {event.title}
// // // // // //                 </h2>
                
// // // // // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-8">
// // // // // //                     {event.description}
// // // // // //                 </p>

// // // // // //                 {!isPast && event.registration_link && (
// // // // // //                     <a 
// // // // // //                         href={event.registration_link}
// // // // // //                         target="_blank"
// // // // // //                         className={`
// // // // // //                             inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] 
// // // // // //                             hover:text-gold-500 hover:border-gold-500 transition-colors
// // // // // //                             ${isReversed ? 'flex-row-reverse' : ''}
// // // // // //                         `}
// // // // // //                     >
// // // // // //                         Secure Your Place <span className="text-gold-500">↗</span>
// // // // // //                     </a>
// // // // // //                 )}
// // // // // //             </div>
// // // // // //         </motion.div>
// // // // // //     );
// // // // // // };

// // // // // // // --- 3. MAIN COMPONENT (Beam Fix) ---
// // // // // // export default function LuminousTimeline({ 
// // // // // //     challenge, futureEvents, pastEvents 
// // // // // // }: { 
// // // // // //     challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
// // // // // // }) {
// // // // // //     return (
// // // // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
// // // // // //             {/* Background Noise */}
// // // // // //             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
// // // // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // // // //             {/* --- THE RED THREAD & BEAM --- */}
// // // // // //             {/* Mobile: 24px from left. Desktop: 50% (Center). */}
// // // // // //             <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 z-0">
// // // // // //                 {/* THE SCANNER BEAM: Forces a high-contrast gradient to move down */}
// // // // // //                 <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-scan opacity-70" />
// // // // // //             </div>

// // // // // //             {/* FUTURE EVENTS */}
// // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // //                 {futureEvents.map((event, index) => (
// // // // // //                     <EventNode key={event.id} event={event} isPast={false} index={index} />
// // // // // //                 ))}
// // // // // //             </div>

// // // // // //             {/* THE THRESHOLD */}
// // // // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // // // //                 <div className="py-32 relative z-20 flex items-center justify-center">
// // // // // //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-px bg-white/20" />
// // // // // //                     <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/10 rounded-full shadow-2xl">
// // // // // //                         <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
// // // // // //                             The Threshold
// // // // // //                         </span>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             )}

// // // // // //             {/* PAST EVENTS */}
// // // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // // //                 {pastEvents.map((event, index) => (
// // // // // //                     <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
// // // // // //                 ))}
// // // // // //             </div>
            
// // // // // //              {/* EMPTY STATE */}
// // // // // //              {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // // // //                  <div className="h-screen flex items-center justify-center relative z-20">
// // // // // //                     <span className="font-mono text-xs text-white/20 uppercase tracking-widest animate-pulse">
// // // // // //                         Scanning Frequencies...
// // // // // //                     </span>
// // // // // //                  </div>
// // // // // //             )}
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // "use client";

// // // // // import { useRef } from "react";
// // // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // // import Image from "next/image";
// // // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // // --- UTILS ---
// // // // // const formatCinematicDate = (dateString: string) => {
// // // // //   const eventDate = new Date(dateString);
// // // // //   const now = new Date();
// // // // //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// // // // //   const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
// // // // //   const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

// // // // //   if (diffDays === 0) return "HAPPENING TODAY";
// // // // //   if (diffDays === 1) return "TOMORROW";
// // // // //   if (diffDays > 1 && diffDays < 7) return `THIS ${eventDate.toLocaleString('default', { weekday: 'long' }).toUpperCase()}`;
// // // // //   return `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' }).toUpperCase()} ${eventDate.getFullYear()}`;
// // // // // };

// // // // // // --- 1. THE BEACON (Header) ---
// // // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // // //     return (
// // // // //         <div className="relative w-full max-w-4xl mx-auto mb-24 pt-32 px-6">
// // // // //             <motion.div 
// // // // //                 animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
// // // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // // //                 className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none" 
// // // // //             />
            
// // // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // // //                 <span className="inline-block px-4 py-1.5 border border-red-500/30 bg-red-500/10 rounded-full text-red-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.3)]">
// // // // //                     Live Signal • Active
// // // // //                 </span>
                
// // // // //                 <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
// // // // //                     {challenge.theme}
// // // // //                 </h1>
                
// // // // //                 <p className="font-serif italic text-white/70 text-lg md:text-2xl max-w-2xl leading-relaxed">
// // // // //                     "{challenge.brief}"
// // // // //                 </p>

// // // // //                 {/* NUCLEAR SUBMIT BUTTON */}
// // // // //                 <div className="mt-16 flex flex-col items-center gap-6">
// // // // //                     <a 
// // // // //                         href={`mailto:secretary.aayam@iitm.ac.in?subject=Submission: ${challenge.theme}`}
// // // // //                         className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-50"
// // // // //                     >
// // // // //                         <div className="absolute inset-0 border border-white/30 group-hover:border-red-500 transition-colors duration-300" />
// // // // //                         <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300" />
                        
// // // // //                         <div className="relative z-10 flex items-center gap-4">
// // // // //                             <span className="font-mono text-sm text-white font-bold uppercase tracking-[0.2em] group-hover:text-red-400 transition-colors">
// // // // //                                 Submit Transmission
// // // // //                             </span>
// // // // //                             <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
// // // // //                                 →
// // // // //                             </span>
// // // // //                         </div>

// // // // //                         {/* Tech Corners */}
// // // // //                         <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50 group-hover:border-red-500 transition-colors" />
// // // // //                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50 group-hover:border-red-500 transition-colors" />
// // // // //                     </a>

// // // // //                     {/* The "Ignition" Line that connects to the main thread */}
// // // // //                     <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/50 to-white/10" />
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // // --- 2. THE EVENT NODE (Geometric Fix) ---
// // // // // const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
// // // // //     const ref = useRef(null);
// // // // //     const { scrollYProgress } = useScroll({
// // // // //         target: ref,
// // // // //         offset: ["start end", "center center"]
// // // // //     });

// // // // //     const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1]), { stiffness: 50, damping: 20 });
// // // // //     const smoothScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.95, 1]), { stiffness: 50, damping: 20 });

// // // // //     const isReversed = index % 2 !== 0;
// // // // //     const dateString = formatCinematicDate(event.date);
// // // // //     const isUrgent = !isPast && (dateString === "TOMORROW" || dateString === "HAPPENING TODAY");

// // // // //     return (
// // // // //         <motion.div 
// // // // //             ref={ref}
// // // // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // // // //             className={`
// // // // //                 group relative w-full max-w-7xl mx-auto py-20 px-6 md:px-12 
// // // // //                 flex flex-col gap-8 md:gap-24 items-center
// // // // //                 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
// // // // //                 ${isPast ? 'opacity-50 hover:opacity-100 transition-opacity duration-500' : ''}
// // // // //             `}
// // // // //         >
// // // // //             {/* --- THE GEOMETRIC FIX: DOT IS NOW ABSOLUTE TO PARENT --- */}
// // // // //             {/* 1. It is outside the flex children.
// // // // //                 2. It uses left-1/2 -translate-x-1/2 to hit the exact dead center.
// // // // //                 3. Top-20 aligns it roughly with the top of the content (py-20).
// // // // //             */}
// // // // //             <div className="hidden md:flex absolute left-1/2 top-20 -translate-x-1/2 z-20 items-center justify-center w-8 h-8">
// // // // //                  {/* Pulse Ring */}
// // // // //                  <div className={`absolute w-full h-full rounded-full opacity-40 ${isPast ? 'hidden' : 'bg-gold-500 animate-ping'}`} />
// // // // //                  {/* Core Dot */}
// // // // //                  <div className={`relative w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${isPast ? 'bg-white text-white' : 'bg-gold-500 text-gold-500'}`} />
// // // // //             </div>

// // // // //             {/* Mobile Dot (Left Aligned to the mobile line at left-6) */}
// // // // //             <div className="md:hidden absolute left-6 top-20 -translate-x-1/2 z-20 items-center justify-center w-6 h-6 flex">
// // // // //                  <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white' : 'bg-gold-500 animate-pulse'}`} />
// // // // //             </div>


// // // // //             {/* IMAGE COLUMN */}
// // // // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
// // // // //                 {event.featured_image_url ? (
// // // // //                     <Image 
// // // // //                         src={event.featured_image_url} 
// // // // //                         alt={event.title} 
// // // // //                         fill 
// // // // //                         sizes="(max-width: 768px) 100vw, 50vw"
// // // // //                         className={`object-cover transition-all duration-1000 ease-out 
// // // // //                             ${isPast 
// // // // //                                 ? 'grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100' 
// // // // //                                 : 'group-hover:scale-105'
// // // // //                             }
// // // // //                         `}
// // // // //                     />
// // // // //                 ) : (
// // // // //                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // // //                     </div>
// // // // //                 )}
// // // // //             </div>

// // // // //             {/* CONTENT COLUMN */}
// // // // //             <div className={`
// // // // //                 w-full md:w-1/2 flex flex-col items-start text-left relative
// // // // //                 ${isReversed ? 'md:items-end md:text-right' : ''}
// // // // //             `}>
// // // // //                 <div className="mb-4">
// // // // //                     <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isUrgent ? 'text-red-500 font-bold animate-pulse' : 'text-white/40'}`}>
// // // // //                         {dateString}
// // // // //                     </span>
// // // // //                 </div>
                
// // // // //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// // // // //                     {event.title}
// // // // //                 </h2>
                
// // // // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-8">
// // // // //                     {event.description}
// // // // //                 </p>

// // // // //                 {!isPast && event.registration_link && (
// // // // //                     <a 
// // // // //                         href={event.registration_link}
// // // // //                         target="_blank"
// // // // //                         className={`
// // // // //                             inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] 
// // // // //                             hover:text-gold-500 hover:border-gold-500 transition-colors
// // // // //                             ${isReversed ? 'flex-row-reverse' : ''}
// // // // //                         `}
// // // // //                     >
// // // // //                         Secure Your Place <span className="text-gold-500">↗</span>
// // // // //                     </a>
// // // // //                 )}
// // // // //             </div>
// // // // //         </motion.div>
// // // // //     );
// // // // // };

// // // // // // --- 3. MAIN COMPONENT (Timeline Fix) ---
// // // // // export default function LuminousTimeline({ 
// // // // //     challenge, futureEvents, pastEvents 
// // // // // }: { 
// // // // //     challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
// // // // // }) {
// // // // //     return (
// // // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
// // // // //             {/* Static Noise */}
// // // // //             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
// // // // //             {/* The Header */}
// // // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // // //             {/* --- THE RED THREAD --- */}
// // // // //             {/* FIX 1: top-[500px] ensures it starts BELOW the beacon header, not at the top of the screen. */}
// // // // //             <div className="absolute left-6 md:left-1/2 top-[550px] bottom-0 w-px bg-white/10 z-0">
// // // // //                 {/* FIX 2: Beam animation runs down from this new starting point */}
// // // // //                 <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-scan opacity-70" />
// // // // //             </div>

// // // // //             {/* FUTURE EVENTS */}
// // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // //                 {futureEvents.map((event, index) => (
// // // // //                     <EventNode key={event.id} event={event} isPast={false} index={index} />
// // // // //                 ))}
// // // // //             </div>

// // // // //             {/* THE THRESHOLD */}
// // // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // // //                 <div className="py-32 relative z-20 flex items-center justify-center">
// // // // //                     {/* Crosshair Line */}
// // // // //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-px bg-white/20" />
// // // // //                     <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/10 rounded-full shadow-2xl">
// // // // //                         <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
// // // // //                             The Threshold
// // // // //                         </span>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             )}

// // // // //             {/* PAST EVENTS */}
// // // // //             <div className="flex flex-col gap-0 relative z-10">
// // // // //                 {pastEvents.map((event, index) => (
// // // // //                     <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
// // // // //                 ))}
// // // // //             </div>
            
// // // // //              {/* EMPTY STATE */}
// // // // //              {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // // //                  <div className="h-screen flex items-center justify-center relative z-20">
// // // // //                     <span className="font-mono text-xs text-white/20 uppercase tracking-widest animate-pulse">
// // // // //                         Scanning Frequencies...
// // // // //                     </span>
// // // // //                  </div>
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // }


// // // // "use client";

// // // // import { useRef } from "react";
// // // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // // import Image from "next/image";
// // // // import { EventItem, Challenge } from "@/types/schema";

// // // // // --- UTILS ---
// // // // const formatCinematicDate = (dateString: string) => {
// // // //   const eventDate = new Date(dateString);
// // // //   const now = new Date();
// // // //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// // // //   const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
// // // //   const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

// // // //   if (diffDays === 0) return "HAPPENING TODAY";
// // // //   if (diffDays === 1) return "TOMORROW";
// // // //   if (diffDays > 1 && diffDays < 7) return `THIS ${eventDate.toLocaleString('default', { weekday: 'long' }).toUpperCase()}`;
// // // //   return `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' }).toUpperCase()} ${eventDate.getFullYear()}`;
// // // // };

// // // // // --- 1. THE BEACON (Header) ---
// // // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // // //     return (
// // // //         <div className="relative w-full max-w-4xl mx-auto mb-24 pt-32 px-6">
// // // //             <motion.div 
// // // //                 animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
// // // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // // //                 className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none" 
// // // //             />
            
// // // //             <div className="relative z-10 text-center flex flex-col items-center">
// // // //                 <span className="inline-block px-4 py-1.5 border border-red-500/30 bg-red-500/10 rounded-full text-red-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.3)]">
// // // //                     Live Signal • Active
// // // //                 </span>
                
// // // //                 <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
// // // //                     {challenge.theme}
// // // //                 </h1>
                
// // // //                 <p className="font-serif italic text-white/70 text-lg md:text-2xl max-w-2xl leading-relaxed">
// // // //                     "{challenge.brief}"
// // // //                 </p>

// // // //                 {/* SUBMIT BUTTON */}
// // // //                 <div className="mt-16 flex flex-col items-center gap-6 relative z-50">
// // // //                     <a 
// // // //                         href={`mailto:secretary.aayam@iitm.ac.in?subject=Submission: ${challenge.theme}`}
// // // //                         className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
// // // //                     >
// // // //                         <div className="absolute inset-0 border border-white/30 group-hover:border-red-500 transition-colors duration-300" />
// // // //                         <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300" />
                        
// // // //                         <div className="relative z-10 flex items-center gap-4">
// // // //                             <span className="font-mono text-sm text-white font-bold uppercase tracking-[0.2em] group-hover:text-red-400 transition-colors">
// // // //                                 Submit Transmission
// // // //                             </span>
// // // //                             <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
// // // //                                 →
// // // //                             </span>
// // // //                         </div>

// // // //                         {/* Tech Corners */}
// // // //                         <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50 group-hover:border-red-500 transition-colors" />
// // // //                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50 group-hover:border-red-500 transition-colors" />
// // // //                     </a>

// // // //                     {/* The "Ignition" Line - Visually connects button to the main timeline below */}
// // // //                     {/* This line fades OUT as it goes down, bridging the gap to the main thread */}
// // // //                     <div className="h-32 w-px bg-gradient-to-b from-white/40 to-transparent" />
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // // --- 2. THE EVENT NODE ---
// // // // const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
// // // //     const ref = useRef(null);
// // // //     const { scrollYProgress } = useScroll({
// // // //         target: ref,
// // // //         offset: ["start end", "center center"]
// // // //     });

// // // //     const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1]), { stiffness: 50, damping: 20 });
// // // //     const smoothScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.95, 1]), { stiffness: 50, damping: 20 });

// // // //     const isReversed = index % 2 !== 0;
// // // //     const dateString = formatCinematicDate(event.date);
// // // //     const isUrgent = !isPast && (dateString === "TOMORROW" || dateString === "HAPPENING TODAY");

// // // //     return (
// // // //         <motion.div 
// // // //             ref={ref}
// // // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // // //             className={`
// // // //                 group relative w-full max-w-7xl mx-auto py-20 px-6 md:px-12 
// // // //                 flex flex-col gap-8 md:gap-24 items-center
// // // //                 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
// // // //                 ${isPast ? 'opacity-50 hover:opacity-100 transition-opacity duration-500' : ''}
// // // //             `}
// // // //         >
// // // //             {/* --- FIX: CENTERED DOT --- */}
// // // //             {/* 1. Position Absolute to the Node Container
// // // //                 2. top-1/2 -translate-y-1/2 forces it to the exact vertical center
// // // //                 3. left-1/2 -translate-x-1/2 forces it to the exact horizontal center (Desktop)
// // // //             */}
            
// // // //             {/* DESKTOP DOT */}
// // // //             <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8">
// // // //                  {/* Pulse Ring */}
// // // //                  <div className={`absolute w-full h-full rounded-full opacity-40 ${isPast ? 'hidden' : 'bg-gold-500 animate-ping'}`} />
// // // //                  {/* Core Dot */}
// // // //                  <div className={`relative w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${isPast ? 'bg-white text-white' : 'bg-gold-500 text-gold-500'}`} />
// // // //             </div>

// // // //             {/* MOBILE DOT (Left Aligned) */}
// // // //             <div className="md:hidden absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 flex">
// // // //                  <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white' : 'bg-gold-500 animate-pulse'}`} />
// // // //             </div>


// // // //             {/* IMAGE COLUMN */}
// // // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
// // // //                 {event.featured_image_url ? (
// // // //                     <Image 
// // // //                         src={event.featured_image_url} 
// // // //                         alt={event.title} 
// // // //                         fill 
// // // //                         sizes="(max-width: 768px) 100vw, 50vw"
// // // //                         className={`object-cover transition-all duration-1000 ease-out 
// // // //                             ${isPast 
// // // //                                 ? 'grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100' 
// // // //                                 : 'group-hover:scale-105'
// // // //                             }
// // // //                         `}
// // // //                     />
// // // //                 ) : (
// // // //                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // // //                     </div>
// // // //                 )}
// // // //             </div>

// // // //             {/* CONTENT COLUMN */}
// // // //             <div className={`
// // // //                 w-full md:w-1/2 flex flex-col items-start text-left relative
// // // //                 ${isReversed ? 'md:items-end md:text-right' : ''}
// // // //             `}>
// // // //                 <div className="mb-4">
// // // //                     <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isUrgent ? 'text-red-500 font-bold animate-pulse' : 'text-white/40'}`}>
// // // //                         {dateString}
// // // //                     </span>
// // // //                 </div>
                
// // // //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// // // //                     {event.title}
// // // //                 </h2>
                
// // // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-8">
// // // //                     {event.description}
// // // //                 </p>

// // // //                 {!isPast && event.registration_link && (
// // // //                     <a 
// // // //                         href={event.registration_link}
// // // //                         target="_blank"
// // // //                         className={`
// // // //                             inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] 
// // // //                             hover:text-gold-500 hover:border-gold-500 transition-colors
// // // //                             ${isReversed ? 'flex-row-reverse' : ''}
// // // //                         `}
// // // //                     >
// // // //                         Secure Your Place <span className="text-gold-500">↗</span>
// // // //                     </a>
// // // //                 )}
// // // //             </div>
// // // //         </motion.div>
// // // //     );
// // // // };

// // // // // --- 3. MAIN COMPONENT ---
// // // // export default function LuminousTimeline({ 
// // // //     challenge, futureEvents, pastEvents 
// // // // }: { 
// // // //     challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
// // // // }) {
// // // //     return (
// // // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
// // // //             {/* Background Noise */}
// // // //             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
// // // //             {challenge && <TheBeacon challenge={challenge} />}

// // // //             {/* --- FIX: THE MAIN THREAD POSITION --- */}
// // // //             {/* We push the line significantly down (top-[60vh] or top-[700px]) so it never intersects the header.
// // // //                 We also use a 'mask-image' gradient to make it fade in softly at the top.
// // // //             */}
// // // //             <div 
// // // //                 className="absolute left-6 md:left-1/2 top-[60vh] bottom-0 w-px bg-white/10 z-0"
// // // //                 style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%)" }}
// // // //             >
// // // //                 {/* The Scanning Beam */}
// // // //                 <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-scan opacity-70" />
// // // //             </div>

// // // //             {/* FUTURE EVENTS */}
// // // //             <div className="flex flex-col gap-0 relative z-10">
// // // //                 {futureEvents.map((event, index) => (
// // // //                     <EventNode key={event.id} event={event} isPast={false} index={index} />
// // // //                 ))}
// // // //             </div>

// // // //             {/* THE THRESHOLD */}
// // // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // // //                 <div className="py-32 relative z-20 flex items-center justify-center">
// // // //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-px bg-white/20" />
// // // //                     <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/10 rounded-full shadow-2xl">
// // // //                         <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
// // // //                             The Threshold
// // // //                         </span>
// // // //                     </div>
// // // //                 </div>
// // // //             )}

// // // //             {/* PAST EVENTS */}
// // // //             <div className="flex flex-col gap-0 relative z-10">
// // // //                 {pastEvents.map((event, index) => (
// // // //                     <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
// // // //                 ))}
// // // //             </div>
            
// // // //              {/* EMPTY STATE */}
// // // //              {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // // //                  <div className="h-screen flex items-center justify-center relative z-20">
// // // //                     <span className="font-mono text-xs text-white/20 uppercase tracking-widest animate-pulse">
// // // //                         Scanning Frequencies...
// // // //                     </span>
// // // //                  </div>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // }


// // // "use client";

// // // import { useRef } from "react";
// // // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // // import Image from "next/image";
// // // import { EventItem, Challenge } from "@/types/schema";

// // // // --- UTILS ---
// // // const formatCinematicDate = (dateString: string) => {
// // //   const eventDate = new Date(dateString);
// // //   const now = new Date();
// // //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// // //   const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
// // //   const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

// // //   if (diffDays === 0) return "HAPPENING TODAY";
// // //   if (diffDays === 1) return "TOMORROW";
// // //   if (diffDays > 1 && diffDays < 7) return `THIS ${eventDate.toLocaleString('default', { weekday: 'long' }).toUpperCase()}`;
// // //   return `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' }).toUpperCase()} ${eventDate.getFullYear()}`;
// // // };

// // // // --- 1. THE BEACON (Header with Divine Light) ---
// // // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// // //     return (
// // //         <div className="relative w-full max-w-4xl mx-auto mb-24 pt-32 px-6">
            
// // //             {/* --- THE NEW DIVINE CURTAIN LIGHT EFFECT --- */}
// // //             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
// // //                 {/* Layer 1: The Deep, Wide Theater Curtain Glow */}
// // //                 <motion.div
// // //                     animate={{ opacity: [0.5, 0.8, 0.5], scaleX: [0.95, 1.05, 0.95] }}
// // //                     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
// // //                     className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[140%] h-full bg-gradient-radial from-red-900/50 via-red-950/30 to-transparent blur-[180px]"
// // //                 />
// // //                 {/* Layer 2: The Central Divine Radiance */}
// // //                 <motion.div
// // //                     animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
// // //                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
// // //                     className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/30 blur-[120px] rounded-full mix-blend-screen"
// // //                 />
// // //             </div>
            
// // //             <div className="relative z-10 text-center flex flex-col items-center">
// // //                 <span className="inline-block px-4 py-1.5 border border-red-500/50 bg-red-500/20 rounded-full text-red-300 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 animate-pulse shadow-[0_0_25px_rgba(220,38,38,0.4)]">
// // //                     Live Signal • Active
// // //                 </span>
                
// // //                 <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl relative">
// // //                     {challenge.theme}
// // //                 </h1>
                
// // //                 <p className="font-serif italic text-white/80 text-lg md:text-2xl max-w-2xl leading-relaxed drop-shadow-lg">
// // //                     "{challenge.brief}"
// // //                 </p>

// // //                 {/* SUBMIT BUTTON */}
// // //                 <div className="mt-16 flex flex-col items-center gap-6 relative z-50">
// // //                     <a 
// // //                         href={`mailto:secretary.aayam@iitm.ac.in?subject=Submission: ${challenge.theme}`}
// // //                         className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
// // //                     >
// // //                         <div className="absolute inset-0 border border-red-500/50 group-hover:border-red-400 transition-colors duration-300" />
// // //                         <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300" />
                        
// // //                         <div className="relative z-10 flex items-center gap-4">
// // //                             <span className="font-mono text-sm text-white font-bold uppercase tracking-[0.2em] group-hover:text-red-100 transition-colors">
// // //                                 Submit Transmission
// // //                             </span>
// // //                             <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
// // //                                 →
// // //                             </span>
// // //                         </div>

// // //                         {/* Tech Corners */}
// // //                         <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
// // //                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
// // //                     </a>

// // //                     {/* The "Ignition" Line */}
// // //                     <div className="h-32 w-px bg-gradient-to-b from-red-500/50 to-transparent" />
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // // --- 2. THE EVENT NODE ---
// // // const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
// // //     const ref = useRef(null);
// // //     const { scrollYProgress } = useScroll({
// // //         target: ref,
// // //         offset: ["start end", "center center"]
// // //     });

// // //     const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1]), { stiffness: 50, damping: 20 });
// // //     const smoothScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.95, 1]), { stiffness: 50, damping: 20 });

// // //     const isReversed = index % 2 !== 0;
// // //     const dateString = formatCinematicDate(event.date);
// // //     const isUrgent = !isPast && (dateString === "TOMORROW" || dateString === "HAPPENING TODAY");

// // //     return (
// // //         <motion.div 
// // //             ref={ref}
// // //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// // //             className={`
// // //                 group relative w-full max-w-7xl mx-auto py-20 px-6 md:px-12 
// // //                 flex flex-col gap-8 md:gap-24 items-center
// // //                 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
// // //                 ${isPast ? 'opacity-50 hover:opacity-100 transition-opacity duration-500' : ''}
// // //             `}
// // //         >
// // //             {/* DESKTOP DOT */}
// // //             <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8">
// // //                  <div className={`absolute w-full h-full rounded-full opacity-40 ${isPast ? 'hidden' : 'bg-gold-500 animate-ping'}`} />
// // //                  <div className={`relative w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${isPast ? 'bg-white text-white' : 'bg-gold-500 text-gold-500'}`} />
// // //             </div>

// // //             {/* MOBILE DOT */}
// // //             <div className="md:hidden absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 flex">
// // //                  <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white' : 'bg-gold-500 animate-pulse'}`} />
// // //             </div>

// // //             {/* IMAGE COLUMN */}
// // //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
// // //                 {event.featured_image_url ? (
// // //                     <Image 
// // //                         src={event.featured_image_url} 
// // //                         alt={event.title} 
// // //                         fill 
// // //                         sizes="(max-width: 768px) 100vw, 50vw"
// // //                         className={`object-cover transition-all duration-1000 ease-out 
// // //                             ${isPast 
// // //                                 ? 'grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100' 
// // //                                 : 'group-hover:scale-105'
// // //                             }
// // //                         `}
// // //                     />
// // //                 ) : (
// // //                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// // //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// // //                     </div>
// // //                 )}
// // //             </div>

// // //             {/* CONTENT COLUMN */}
// // //             <div className={`
// // //                 w-full md:w-1/2 flex flex-col items-start text-left relative
// // //                 ${isReversed ? 'md:items-end md:text-right' : ''}
// // //             `}>
// // //                 <div className="mb-4">
// // //                     <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isUrgent ? 'text-red-500 font-bold animate-pulse' : 'text-white/40'}`}>
// // //                         {dateString}
// // //                     </span>
// // //                 </div>
                
// // //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// // //                     {event.title}
// // //                 </h2>
                
// // //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-8">
// // //                     {event.description}
// // //                 </p>

// // //                 {!isPast && event.registration_link && (
// // //                     <a 
// // //                         href={event.registration_link}
// // //                         target="_blank"
// // //                         className={`
// // //                             inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] 
// // //                             hover:text-gold-500 hover:border-gold-500 transition-colors
// // //                             ${isReversed ? 'flex-row-reverse' : ''}
// // //                         `}
// // //                     >
// // //                         Secure Your Place <span className="text-gold-500">↗</span>
// // //                     </a>
// // //                 )}
// // //             </div>
// // //         </motion.div>
// // //     );
// // // };

// // // // --- 3. MAIN COMPONENT ---
// // // export default function LuminousTimeline({ 
// // //     challenge, futureEvents, pastEvents 
// // // }: { 
// // //     challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
// // // }) {
// // //     return (
// // //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
// // //             {/* Background Noise */}
// // //             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
// // //             {challenge && <TheBeacon challenge={challenge} />}

// // //             {/* THE RED THREAD */}
// // //             <div 
// // //                 className="absolute left-6 md:left-1/2 top-[60vh] bottom-0 w-px bg-white/10 z-0"
// // //                 style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%)" }}
// // //             >
// // //                 <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-scan opacity-70" />
// // //             </div>

// // //             {/* FUTURE EVENTS */}
// // //             <div className="flex flex-col gap-0 relative z-10">
// // //                 {futureEvents.map((event, index) => (
// // //                     <EventNode key={event.id} event={event} isPast={false} index={index} />
// // //                 ))}
// // //             </div>

// // //             {/* THE THRESHOLD */}
// // //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// // //                 <div className="py-32 relative z-20 flex items-center justify-center">
// // //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-px bg-white/20" />
// // //                     <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/10 rounded-full shadow-2xl">
// // //                         <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
// // //                             The Threshold
// // //                         </span>
// // //                     </div>
// // //                 </div>
// // //             )}

// // //             {/* PAST EVENTS */}
// // //             <div className="flex flex-col gap-0 relative z-10">
// // //                 {pastEvents.map((event, index) => (
// // //                     <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
// // //                 ))}
// // //             </div>
            
// // //              {/* EMPTY STATE */}
// // //              {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// // //                  <div className="h-screen flex items-center justify-center relative z-20">
// // //                     <span className="font-mono text-xs text-white/20 uppercase tracking-widest animate-pulse">
// // //                         Scanning Frequencies...
// // //                     </span>
// // //                  </div>
// // //             )}
// // //         </div>
// // //     );
// // // }


// // "use client";

// // import { useRef } from "react";
// // import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// // import Image from "next/image";
// // import { EventItem, Challenge } from "@/types/schema";

// // // --- UTILS ---
// // const formatCinematicDate = (dateString: string) => {
// //   const eventDate = new Date(dateString);
// //   const now = new Date();
// //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// //   const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
// //   const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

// //   if (diffDays === 0) return "HAPPENING TODAY";
// //   if (diffDays === 1) return "TOMORROW";
// //   if (diffDays > 1 && diffDays < 7) return `THIS ${eventDate.toLocaleString('default', { weekday: 'long' }).toUpperCase()}`;
// //   return `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' }).toUpperCase()} ${eventDate.getFullYear()}`;
// // };

// // // --- 1. THE BEACON (Divine Light Edition) ---
// // const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
// //     return (
// //         <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
            
// //             {/* --- DIVINE LIGHT CURTAIN --- */}
// //             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
// //                 {/* Layer 1: Wide Curtain Glow (Patched Syntax) */}
// //                 <motion.div
// //                     animate={{ opacity: [0.5, 0.8, 0.5], scaleX: [0.95, 1.05, 0.95] }}
// //                     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
// //                     className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[140%] h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-red-950/20 to-transparent blur-[120px]"
// //                 />
// //                 {/* Layer 2: Core Radiance */}
// //                 <motion.div
// //                     animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
// //                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
// //                     className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-red-600/20 blur-[100px] rounded-full mix-blend-screen"
// //                 />
// //             </div>
            
// //             <div className="relative z-10 text-center flex flex-col items-center">
// //                 <span className="inline-block px-4 py-1.5 border border-red-500/50 bg-red-500/10 rounded-full text-red-300 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 animate-pulse shadow-[0_0_25px_rgba(220,38,38,0.4)]">
// //                     Live Signal • Active
// //                 </span>
                
// //                 <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl relative">
// //                     {challenge.theme}
// //                 </h1>
                
// //                 <p className="font-serif italic text-white/80 text-lg md:text-2xl max-w-2xl leading-relaxed drop-shadow-lg">
// //                     "{challenge.brief}"
// //                 </p>

// //                 {/* SUBMIT BUTTON */}
// //                 <div className="mt-16 flex flex-col items-center gap-6 relative z-50">
// //                     <a 
// //                         href={`mailto:secretary.aayam@iitm.ac.in?subject=Submission: ${challenge.theme}`}
// //                         className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
// //                     >
// //                         <div className="absolute inset-0 border border-red-500/50 group-hover:border-red-400 transition-colors duration-300" />
// //                         <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300" />
                        
// //                         <div className="relative z-10 flex items-center gap-4">
// //                             <span className="font-mono text-sm text-white font-bold uppercase tracking-[0.2em] group-hover:text-red-100 transition-colors">
// //                                 Submit Transmission
// //                             </span>
// //                             <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
// //                                 →
// //                             </span>
// //                         </div>

// //                         {/* Tech Corners */}
// //                         <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
// //                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
// //                     </a>

// //                     {/* The Ignition Line */}
// //                     <div className="h-32 w-px bg-gradient-to-b from-red-500/50 to-transparent" />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // // --- 2. THE EVENT NODE ---
// // const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
// //     const ref = useRef(null);
// //     const { scrollYProgress } = useScroll({
// //         target: ref,
// //         offset: ["start end", "center center"]
// //     });
// //     const imageSrc = event.poster_url || event.featured_image_url;
// //     const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1]), { stiffness: 50, damping: 20 });
// //     const smoothScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.95, 1]), { stiffness: 50, damping: 20 });

// //     const isReversed = index % 2 !== 0;
// //     const dateString = formatCinematicDate(event.date);
// //     const isUrgent = !isPast && (dateString === "TOMORROW" || dateString === "HAPPENING TODAY");

// //     return (
// //         <motion.div 
// //             ref={ref}
// //             style={{ opacity: smoothOpacity, scale: smoothScale }}
// //             className={`
// //                 group relative w-full max-w-7xl mx-auto py-24 px-6 md:px-12 
// //                 flex flex-col gap-12 md:gap-24 items-center
// //                 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
// //                 ${isPast ? 'opacity-50 hover:opacity-100 transition-opacity duration-500' : ''}
// //             `}
// //         >
// //             {/* DESKTOP DOT (Centered) */}
// //             <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8">
// //                  <div className={`absolute w-full h-full rounded-full opacity-40 ${isPast ? 'hidden' : 'bg-gold-500 animate-ping'}`} />
// //                  <div className={`relative w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${isPast ? 'bg-white text-white' : 'bg-gold-500 text-gold-500'}`} />
// //             </div>

// //             {/* MOBILE DOT (Left Aligned) */}
// //             <div className="md:hidden absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 flex">
// //                  <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white' : 'bg-gold-500 animate-pulse'}`} />
// //             </div>

// //             {/* IMAGE */}
// //             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
// //                 {/* {event.featured_image_url ? ( */}
// //                 {imageSrc ? (
// //                     <Image 
// //                         src={imageSrc} 
// //                         alt={event.title} 
// //                         fill 
// //                         sizes="(max-width: 768px) 100vw, 50vw"
// //                         className={`object-cover transition-all duration-1000 ease-out 
// //                             ${isPast 
// //                                 ? 'grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100' 
// //                                 : 'group-hover:scale-105'
// //                             }
// //                         `}
// //                     />
// //                 ) : (
// //                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
// //                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
// //                     </div>
// //                 )}
// //                 {isPast && <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />}
// //             </div>

// //             {/* CONTENT */}
// //             <div className={`
// //                 w-full md:w-1/2 flex flex-col items-start text-left relative
// //                 ${isReversed ? 'md:items-end md:text-right' : ''}
// //             `}>
// //                 <div className="mb-4">
// //                     <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isUrgent ? 'text-red-500 font-bold animate-pulse' : 'text-white/40'}`}>
// //                         {dateString}
// //                     </span>
// //                 </div>
                
// //                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
// //                     {event.title}
// //                 </h2>
                
// //                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-8">
// //                     {event.description}
// //                 </p>

// //                 {!isPast && event.registration_link && (
// //                     <a 
// //                         href={event.registration_link}
// //                         target="_blank"
// //                         className={`
// //                             inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] 
// //                             hover:text-gold-500 hover:border-gold-500 transition-colors
// //                             ${isReversed ? 'flex-row-reverse' : ''}
// //                         `}
// //                     >
// //                         Secure Your Place <span className="text-gold-500">↗</span>
// //                     </a>
// //                 )}
// //             </div>
// //         </motion.div>
// //     );
// // };

// // // --- 3. MAIN COMPONENT ---
// // export default function LuminousTimeline({ 
// //     challenge, futureEvents, pastEvents 
// // }: { 
// //     challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
// // }) {
// //     return (
// //         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
// //             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
// //             {challenge && <TheBeacon challenge={challenge} />}

// //             {/* THE RED THREAD */}
// //             {/* Pushed down to top-[60vh] to clear the header cleanly */}
// //             <div 
// //                 className="absolute left-6 md:left-1/2 top-[60vh] bottom-0 w-px bg-white/10 z-0"
// //                 style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%)" }}
// //             >
// //                 <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-scan opacity-70" />
// //             </div>

// //             <div className="flex flex-col gap-0 relative z-10">
// //                 {futureEvents.map((event, index) => (
// //                     <EventNode key={event.id} event={event} isPast={false} index={index} />
// //                 ))}
// //             </div>

// //             {futureEvents.length > 0 && pastEvents.length > 0 && (
// //                 <div className="py-32 relative z-20 flex items-center justify-center">
// //                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-px bg-white/20" />
// //                     <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/10 rounded-full shadow-2xl">
// //                         <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
// //                             The Threshold
// //                         </span>
// //                     </div>
// //                 </div>
// //             )}

// //             <div className="flex flex-col gap-0 relative z-10">
// //                 {pastEvents.map((event, index) => (
// //                     <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
// //                 ))}
// //             </div>
            
// //              {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
// //                  <div className="h-screen flex items-center justify-center relative z-20">
// //                     <span className="font-mono text-xs text-white/20 uppercase tracking-widest animate-pulse">
// //                         Scanning Frequencies...
// //                     </span>
// //                  </div>
// //             )}
// //         </div>
// //     );
// // }

// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import Image from "next/image";
// import { EventItem, Challenge } from "@/types/schema";
// import SubmissionModal from "./SubmissionModal";
// import { useState } from "react"; 
// // --- UTILS ---
// const formatCinematicDate = (dateString: string) => {
//   const eventDate = new Date(dateString);
//   const now = new Date();
//   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//   const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
//   const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

//   if (diffDays === 0) return "HAPPENING TODAY";
//   if (diffDays === 1) return "TOMORROW";
//   if (diffDays > 1 && diffDays < 7) return `THIS ${eventDate.toLocaleString('default', { weekday: 'long' }).toUpperCase()}`;
//   return `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' }).toUpperCase()} ${eventDate.getFullYear()}`;
// };

// // --- 1. THE BEACON (Divine Light Edition) ---
// const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     return (
//         <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
            
//             {/* --- DIVINE LIGHT CURTAIN --- */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
//                 {/* Layer 1: Wide Curtain Glow */}
//                 <motion.div
//                     animate={{ opacity: [0.5, 0.8, 0.5], scaleX: [0.95, 1.05, 0.95] }}
//                     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//                     className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[140%] h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-red-950/20 to-transparent blur-[120px]"
//                 />
//                 {/* Layer 2: Core Radiance */}
//                 <motion.div
//                     animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
//                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//                     className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-red-600/20 blur-[100px] rounded-full mix-blend-screen"
//                 />
//             </div>
            
//             <div className="relative z-10 text-center flex flex-col items-center">
//                 <span className="inline-block px-4 py-1.5 border border-red-500/50 bg-red-500/10 rounded-full text-red-300 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 animate-pulse shadow-[0_0_25px_rgba(220,38,38,0.4)]">
//                     Live Signal • Active
//                 </span>
                
//                 <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl relative">
//                     {challenge.theme}
//                 </h1>
                
//                 <p className="font-serif italic text-white/80 text-lg md:text-2xl max-w-2xl leading-relaxed drop-shadow-lg">
//                     "{challenge.brief}"
//                 </p>

//                 {/* SUBMIT BUTTON */}
//                 <div className="mt-16 flex flex-col items-center gap-6 relative z-50">
//                     {/* <a 
//                         href={`mailto:secretary.aayam@iitm.ac.in?subject=Submission: ${challenge.theme}`}
//                         className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
//                     > */}
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
//                     >
//                         <div className="absolute inset-0 border border-red-500/50 group-hover:border-red-400 transition-colors duration-300" />
//                         <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300" />
                        
//                         <div className="relative z-10 flex items-center gap-4">
//                             <span className="font-mono text-sm text-white font-bold uppercase tracking-[0.2em] group-hover:text-red-100 transition-colors">
//                                 Submit Transmission
//                             </span>
//                             <span className="text-white group-hover:translate-x-1 transition-transform duration-300">
//                                 →
//                             </span>
//                         </div>

//                         {/* Tech Corners */}
//                         <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
//                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
//                     </button>

//                     {/* The Ignition Line */}
//                     <div className="h-32 w-px bg-gradient-to-b from-red-500/50 to-transparent" />
//                 </div>
//             </div>
//             <SubmissionModal challenge={challenge} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//         </div>
//     );
// };

// // --- 2. THE EVENT NODE ---
// const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
//     const ref = useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: ref,
//         offset: ["start end", "center center"]
//     });

//     // --- FIX: SELECT THE IMAGE SOURCE ---
//     // We prioritize the Poster URL, then fall back to Featured Image
//     // const imageSrc = event.poster_url || event.featured_image_url;
//     const imageSrc = event.featured_image_url || event.poster_url;
//     const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1]), { stiffness: 50, damping: 20 });
//     const smoothScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.95, 1]), { stiffness: 50, damping: 20 });

//     const isReversed = index % 2 !== 0;
//     const dateString = formatCinematicDate(event.date);
//     const isUrgent = !isPast && (dateString === "TOMORROW" || dateString === "HAPPENING TODAY");

//     return (
//         <motion.div 
//             ref={ref}
//             style={{ opacity: smoothOpacity, scale: smoothScale }}
//             className={`
//                 group relative w-full max-w-7xl mx-auto py-24 px-6 md:px-12 
//                 flex flex-col gap-12 md:gap-24 items-center
//                 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
//                 ${isPast ? 'opacity-50 hover:opacity-100 transition-opacity duration-500' : ''}
//             `}
//         >
//             {/* DESKTOP DOT (Centered) */}
//             <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8">
//                  <div className={`absolute w-full h-full rounded-full opacity-40 ${isPast ? 'hidden' : 'bg-gold-500 animate-ping'}`} />
//                  <div className={`relative w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${isPast ? 'bg-white text-white' : 'bg-gold-500 text-gold-500'}`} />
//             </div>

//             {/* MOBILE DOT (Left Aligned) */}
//             <div className="md:hidden absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 flex">
//                  <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white' : 'bg-gold-500 animate-pulse'}`} />
//             </div>

//             {/* IMAGE */}
//             <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
//                 {imageSrc ? (
//                     <Image 
//                         src={imageSrc} 
//                         alt={event.title} 
//                         fill 
//                         sizes="(max-width: 768px) 100vw, 50vw"
//                         className={`object-cover transition-all duration-1000 ease-out 
//                             ${isPast 
//                                 ? 'grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100' 
//                                 : 'group-hover:scale-105'
//                             }
//                         `}
//                     />
//                 ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
//                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
//                     </div>
//                 )}
//                 {isPast && <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />}
//             </div>

//             {/* CONTENT */}
//             <div className={`
//                 w-full md:w-1/2 flex flex-col items-start text-left relative
//                 ${isReversed ? 'md:items-end md:text-right' : ''}
//             `}>
//                 <div className="mb-4">
//                     <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isUrgent ? 'text-red-500 font-bold animate-pulse' : 'text-white/40'}`}>
//                         {dateString}
//                     </span>
//                 </div>
                
//                 <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
//                     {event.title}
//                 </h2>
                
//                 <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-8">
//                     {event.description}
//                 </p>

//                 {!isPast && event.registration_link && (
//                     <a 
//                         href={event.registration_link}
//                         target="_blank"
//                         className={`
//                             inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] 
//                             hover:text-gold-500 hover:border-gold-500 transition-colors
//                             ${isReversed ? 'flex-row-reverse' : ''}
//                         `}
//                     >
//                         Secure Your Place <span className="text-gold-500">↗</span>
//                     </a>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// // --- 3. MAIN COMPONENT ---
// export default function LuminousTimeline({ 
//     challenge, futureEvents, pastEvents 
// }: { 
//     challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
// }) {
//     return (
//         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
//             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
//             {challenge && <TheBeacon challenge={challenge} />}

//             {/* THE RED THREAD */}
//             {/* Pushed down to top-[60vh] to clear the header cleanly */}
//             <div 
//                 className="absolute left-6 md:left-1/2 top-[60vh] bottom-0 w-px bg-white/10 z-0"
//                 style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%)" }}
//             >
//                 <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-scan opacity-70" />
//             </div>

//             <div className="flex flex-col gap-0 relative z-10">
//                 {futureEvents.map((event, index) => (
//                     <EventNode key={event.id} event={event} isPast={false} index={index} />
//                 ))}
//             </div>

//             {futureEvents.length > 0 && pastEvents.length > 0 && (
//                 <div className="py-32 relative z-20 flex items-center justify-center">
//                     <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-px bg-white/20" />
//                     <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/10 rounded-full shadow-2xl">
//                         <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
//                             The Threshold
//                         </span>
//                     </div>
//                 </div>
//             )}

//             <div className="flex flex-col gap-0 relative z-10">
//                 {pastEvents.map((event, index) => (
//                     <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
//                 ))}
//             </div>
            
//              {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
//                  <div className="h-screen flex items-center justify-center relative z-20">
//                     <span className="font-mono text-xs text-white/20 uppercase tracking-widest animate-pulse">
//                         Scanning Frequencies...
//                     </span>
//                  </div>
//             )}
//         </div>
//     );
// }

"use client";

import { useRef, useState } from "react"; // <--- Consolidated Imports
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { EventItem, Challenge } from "@/types/schema";
import SubmissionModal from "./SubmissionModal";
import { ExternalLink } from "lucide-react";

// --- UTILS ---
const formatCinematicDate = (dateString: string) => {
  const eventDate = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "HAPPENING TODAY";
  if (diffDays === 1) return "TOMORROW";
  if (diffDays > 1 && diffDays < 7) return `THIS ${eventDate.toLocaleString('default', { weekday: 'long' }).toUpperCase()}`;
  return `${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' }).toUpperCase()} ${eventDate.getFullYear()}`;
};

// --- 1. THE BEACON (Divine Light Edition) ---
const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // LOGIC: DECIDE ACTION
    const handleAction = () => {
        if (challenge.form_type === 'external' && challenge.external_link) {
            // WORMHOLE : Go to external link
            window.open(challenge.external_link, '_blank');
        } else {
            // NATIVE : Open modal
            setIsModalOpen(true);
        }
    }; // <--- THIS WAS MISSING!

    return (
        <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
            
            {/* --- DIVINE LIGHT CURTAIN --- */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
                {/* Layer 1: Wide Curtain Glow */}
                <motion.div
                    animate={{ opacity: [0.5, 0.8, 0.5], scaleX: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[140%] h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-red-950/20 to-transparent blur-[120px]"
                />
                {/* Layer 2: Core Radiance */}
                <motion.div
                    animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-red-600/20 blur-[100px] rounded-full mix-blend-screen"
                />
            </div>
            
            <div className="relative z-10 text-center flex flex-col items-center">
                <span className="inline-block px-4 py-1.5 border border-red-500/50 bg-red-500/10 rounded-full text-red-300 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 animate-pulse shadow-[0_0_25px_rgba(220,38,38,0.4)]">
                    Live Signal • Active
                </span>
                
                <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl relative">
                    {challenge.theme}
                </h1>
                
                <p className="font-serif italic text-white/80 text-lg md:text-2xl max-w-2xl leading-relaxed drop-shadow-lg">
                    "{challenge.brief}"
                </p>

                {/* SUBMIT BUTTON */}
                <div className="mt-16 flex flex-col items-center gap-6 relative z-50">
                    <button
                        onClick={handleAction}
                        className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
                    >
                        {/* Button Visuals */}
                        <div className="absolute inset-0 border border-red-500/50 group-hover:border-red-400 transition-colors duration-300" />
                        <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[url('/noise.png')] mix-blend-overlay transition-opacity" />
                        
                        <div className="relative z-10 flex items-center gap-4">
                            <span className="font-mono text-sm text-white font-bold uppercase tracking-[0.2em] group-hover:text-red-100 transition-colors">
                                {challenge.form_type === 'external' ? 'Access External Portal' : "Submit Transmission"}
                            </span>
                            {challenge.form_type === 'external' ? (
                                <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                            ) : (
                                <span className="text-white group-hover:translate-x-1 transition-transform duration-300">→</span>
                            )}
                        </div>

                        {/* Tech Corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
                    </button>
                    {/* Caption */}
                    <p className="font-mono text-[10px] text-red-500/60 uppercase tracking-widest animate-pulse">
                        {challenge.form_type === 'external' ? "Redirecting to secure channel" : "Aayam Secure Uplink Active"}
                    </p>
                    {/* The Ignition Line */}
                    <div className="h-32 w-px bg-gradient-to-b from-red-500/50 to-transparent" />
                </div>
            </div>
            {/* Render Modal Only if Internal */}
            {challenge.form_type !== 'external' && (
                <SubmissionModal challenge={challenge} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

// --- 2. THE EVENT NODE ---
const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    // We prioritize the Backdrop, then fall back to Poster
    const imageSrc = event.featured_image_url || event.poster_url;
    
    const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0.3, 1]), { stiffness: 50, damping: 20 });
    const smoothScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.95, 1]), { stiffness: 50, damping: 20 });

    const isReversed = index % 2 !== 0;
    const dateString = formatCinematicDate(event.date);
    const isUrgent = !isPast && (dateString === "TOMORROW" || dateString === "HAPPENING TODAY");

    return (
        <motion.div 
            ref={ref}
            style={{ opacity: smoothOpacity, scale: smoothScale }}
            className={`
                group relative w-full max-w-7xl mx-auto py-24 px-6 md:px-12 
                flex flex-col gap-12 md:gap-24 items-center
                ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
                ${isPast ? 'opacity-50 hover:opacity-100 transition-opacity duration-500' : ''}
            `}
        >
            {/* DESKTOP DOT (Centered) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8">
                 <div className={`absolute w-full h-full rounded-full opacity-40 ${isPast ? 'hidden' : 'bg-gold-500 animate-ping'}`} />
                 <div className={`relative w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${isPast ? 'bg-white text-white' : 'bg-gold-500 text-gold-500'}`} />
            </div>

            {/* MOBILE DOT (Left Aligned) */}
            <div className="md:hidden absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 flex">
                 <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white' : 'bg-gold-500 animate-pulse'}`} />
            </div>

            {/* IMAGE */}
            <div className="w-full md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
                {imageSrc ? (
                    <Image 
                        src={imageSrc} 
                        alt={event.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover transition-all duration-1000 ease-out 
                            ${isPast 
                                ? 'grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100' 
                                : 'group-hover:scale-105'
                            }
                        `}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
                        <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
                    </div>
                )}
                {isPast && <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />}
            </div>

            {/* CONTENT */}
            <div className={`
                w-full md:w-1/2 flex flex-col items-start text-left relative
                ${isReversed ? 'md:items-end md:text-right' : ''}
            `}>
                <div className="mb-4">
                    <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isUrgent ? 'text-red-500 font-bold animate-pulse' : 'text-white/40'}`}>
                        {dateString}
                    </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-[1] tracking-tight group-hover:text-gold-200 transition-colors">
                    {event.title}
                </h2>
                
                <p className="font-sans text-white/60 leading-relaxed text-sm md:text-lg max-w-md mb-8">
                    {event.description}
                </p>

                {!isPast && event.registration_link && (
                    <a 
                        href={event.registration_link}
                        target="_blank"
                        className={`
                            inline-flex items-center gap-2 border-b border-white/30 pb-1 font-mono text-[10px] text-white uppercase tracking-[0.2em] 
                            hover:text-gold-500 hover:border-gold-500 transition-colors
                            ${isReversed ? 'flex-row-reverse' : ''}
                        `}
                    >
                        Secure Your Place <span className="text-gold-500">↗</span>
                    </a>
                )}
            </div>
        </motion.div>
    );
};

// --- 3. MAIN COMPONENT ---
export default function LuminousTimeline({ 
    challenge, futureEvents, pastEvents 
}: { 
    challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
}) {
    return (
        <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
            {challenge && <TheBeacon challenge={challenge} />}

            {/* THE RED THREAD */}
            {/* Pushed down to top-[60vh] to clear the header cleanly */}
            <div 
                className="absolute left-6 md:left-1/2 top-[60vh] bottom-0 w-px bg-white/10 z-0"
                style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%)" }}
            >
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-scan opacity-70" />
            </div>

            <div className="flex flex-col gap-0 relative z-10">
                {futureEvents.map((event, index) => (
                    <EventNode key={event.id} event={event} isPast={false} index={index} />
                ))}
            </div>

            {futureEvents.length > 0 && pastEvents.length > 0 && (
                <div className="py-32 relative z-20 flex items-center justify-center">
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-16 h-px bg-white/20" />
                    <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/10 rounded-full shadow-2xl">
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
                            The Threshold
                        </span>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-0 relative z-10">
                {pastEvents.map((event, index) => (
                    <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
                ))}
            </div>
            
             {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
                 <div className="h-screen flex items-center justify-center relative z-20">
                    <span className="font-mono text-xs text-white/20 uppercase tracking-widest animate-pulse">
                        Scanning Frequencies...
                    </span>
                 </div>
            )}
        </div>
    );
}