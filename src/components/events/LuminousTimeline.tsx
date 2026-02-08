// "use client";

// import { useRef, useState } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import Image from "next/image";
// import { EventItem, Challenge } from "@/types/schema";
// import SubmissionModal from "./SubmissionModal";
// import { ExternalLink } from "lucide-react";

// // --- 1. UTILITIES ---
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

// // --- 2. THE BEACON (Divine Light Edition) ---
// const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Logic: Decide between External Link or Internal Modal
//     const handleAction = () => {
//         if (challenge.form_type === 'external' && challenge.external_link) {
//             window.open(challenge.external_link, '_blank');
//         } else {
//             setIsModalOpen(true);
//         }
//     };

//     return (
//         <div className="relative w-full max-w-4xl mx-auto mb-32 pt-32 px-6">
            
//             {/* --- DIVINE LIGHT CURTAIN (Visuals) --- */}
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
            
//             {/* --- CONTENT LAYER --- */}
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

//                 {/* ACTION BUTTON */}
//                 <div className="mt-16 flex flex-col items-center gap-6 relative z-50">
//                     <button
//                         onClick={handleAction}
//                         className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
//                     >
//                         {/* Button Visuals */}
//                         <div className="absolute inset-0 border border-red-500/50 group-hover:border-red-400 transition-colors duration-300" />
//                         <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300" />
//                         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[url('/noise.png')] mix-blend-overlay transition-opacity" />
                        
//                         <div className="relative z-10 flex items-center gap-4">
//                             <span className="font-mono text-sm text-white font-bold uppercase tracking-[0.2em] group-hover:text-red-100 transition-colors">
//                                 {challenge.form_type === 'external' ? 'Access External Portal' : "Submit Transmission"}
//                             </span>
//                             {challenge.form_type === 'external' ? (
//                                 <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
//                             ) : (
//                                 <span className="text-white group-hover:translate-x-1 transition-transform duration-300">→</span>
//                             )}
//                         </div>

//                         {/* Tech Corners */}
//                         <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
//                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
//                     </button>
                    
//                     {/* Caption */}
//                     <p className="font-mono text-[10px] text-red-500/60 uppercase tracking-widest animate-pulse">
//                         {challenge.form_type === 'external' ? "Redirecting to secure channel" : "Aayam Secure Uplink Active"}
//                     </p>
                    
//                     {/* The Ignition Line */}
//                     <div className="h-32 w-px bg-gradient-to-b from-red-500/50 to-transparent" />
//                 </div>
//             </div>

//             {/* Render Modal Only if Internal */}
//             {challenge.form_type !== 'external' && (
//                 <SubmissionModal challenge={challenge} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//             )}
//         </div>
//     );
// };

// // --- 3. THE EVENT NODE (FLUID ARCHITECTURE FIX) ---
// const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
//     const ref = useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: ref,
//         offset: ["start end", "center center"]
//     });

//     // We prioritize the Featured Image (Backdrop), then fall back to Poster
//     // Or prefer Poster if you want verticality. Let's use featured_image_url || poster_url as standard.
//     const imageSrc = event.featured_image_url || event.poster_url;
    
//     // Physics
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
//             {/* --- THE DOTS (Center Anchors) --- */}
            
//             {/* DESKTOP DOT (Centered absolutely to the flex container) */}
//             <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8">
//                  <div className={`absolute w-full h-full rounded-full opacity-40 ${isPast ? 'hidden' : 'bg-gold-500 animate-ping'}`} />
//                  <div className={`relative w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${isPast ? 'bg-white text-white' : 'bg-gold-500 text-gold-500'}`} />
//             </div>

//             {/* MOBILE DOT (Left Aligned to the thread) */}
//             <div className="md:hidden absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 flex">
//                  <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white' : 'bg-gold-500 animate-pulse'}`} />
//             </div>

//             {/* --- THE IMAGE (FLUID FIX) --- */}
//             {/* Logic: We removed 'aspect-ratio' and 'fill'. We use flow layout. */}
//             <div className="w-full md:w-1/2 relative bg-white/5 border border-white/10 overflow-hidden shadow-2xl rounded-sm">
//                 {imageSrc ? (
//                     <Image 
//                         src={imageSrc} 
//                         alt={event.title} 
//                         width={1000} // High res base
//                         height={0}   // Auto height
//                         sizes="(max-width: 768px) 100vw, 50vw"
//                         className={`w-full h-auto object-contain transition-all duration-1000 ease-out 
//                             ${isPast 
//                                 ? 'grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100' 
//                                 : 'group-hover:scale-[1.02]' 
//                             }
//                         `}
//                         style={{ width: '100%', height: 'auto' }} // THE KEY: Intrinsic Ratio Preservation
//                     />
//                 ) : (
//                     // Fallback visual
//                     <div className="w-full aspect-video flex items-center justify-center bg-[#0a0a0a]">
//                         <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
//                     </div>
//                 )}
                
//                 {/* Archive Grain Overlay */}
//                 {isPast && <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />}
//             </div>

//             {/* --- THE CONTENT --- */}
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

// // --- 4. MAIN COMPONENT ---
// export default function LuminousTimeline({ 
//     challenge, futureEvents, pastEvents 
// }: { 
//     challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
// }) {
//     return (
//         <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
//             {/* Global Noise */}
//             <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
//             {challenge && <TheBeacon challenge={challenge} />}

//             {/* THE RED THREAD */}
//             {/* Pushed down to top-[60vh] to clear the header cleanly. Mask creates a fade-in effect. */}
//             <div 
//                 className="absolute left-6 md:left-1/2 top-[60vh] bottom-0 w-px bg-white/10 z-0"
//                 style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%)" }}
//             >
//                 {/* The Scanning Beam Animation */}
//                 <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-red-500 to-transparent animate-scan opacity-70" />
//             </div>

//             {/* FUTURE EVENTS */}
//             <div className="flex flex-col gap-0 relative z-10">
//                 {futureEvents.map((event, index) => (
//                     <EventNode key={event.id} event={event} isPast={false} index={index} />
//                 ))}
//             </div>

//             {/* THE THRESHOLD (Horizon Marker) */}
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

//             {/* PAST EVENTS */}
//             <div className="flex flex-col gap-0 relative z-10">
//                 {pastEvents.map((event, index) => (
//                     <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
//                 ))}
//             </div>
            
//              {/* EMPTY STATE */}
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

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { EventItem, Challenge } from "@/types/schema";
import SubmissionModal from "./SubmissionModal";
import { ExternalLink } from "lucide-react";

// --- 1. UTILITIES ---
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

// --- 2. THE BEACON (Active Signal Header) ---
const TheBeacon = ({ challenge }: { challenge: Challenge }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAction = () => {
        if (challenge.form_type === 'external' && challenge.external_link) {
            window.open(challenge.external_link, '_blank');
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto mb-12 pt-32 px-6">
            {/* ... (Visuals remain same) ... */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
                <motion.div
                    animate={{ opacity: [0.5, 0.8, 0.5], scaleX: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[140%] h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-red-950/20 to-transparent blur-[120px]"
                />
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

                <div className="mt-16 flex flex-col items-center gap-6 relative z-50">
                    <button
                        onClick={handleAction}
                        className="group relative px-8 py-4 overflow-hidden rounded-sm bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
                    >
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

                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-400/60 group-hover:border-red-300 transition-colors" />
                    </button>
                    
                    <p className="font-mono text-[10px] text-red-500/60 uppercase tracking-widest animate-pulse">
                        {challenge.form_type === 'external' ? "Redirecting to secure channel" : "Aayam Secure Uplink Active"}
                    </p>
                    
                    {/* The Ignition Line */}
                    <div className="h-32 w-px bg-gradient-to-b from-red-500/50 to-transparent" />
                </div>
            </div>

            {challenge.form_type !== 'external' && (
                <SubmissionModal challenge={challenge} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

// --- 3. THE CHRONICLE HEADER (Standard Header when No Signal) ---
const ChronicleHeader = () => (
    <div className="relative w-full max-w-4xl mx-auto pt-40 pb-12 px-6 text-center z-10">
        <div className="flex flex-col items-center gap-6">
            <span className="inline-block h-px w-12 bg-gold-500/50" />
            <span className="text-gold-500 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse">
                System Operational
            </span>
            <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter opacity-90">
                The Chronicle
            </h1>
            <p className="font-serif italic text-white/50 text-lg md:text-xl max-w-xl leading-relaxed">
                "The timeline of our journey. From the horizons of tomorrow to the echoes of yesterday."
            </p>
        </div>
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none z-[-1]" />
    </div>
);

// --- 4. SECTION MARKER (The Divider) ---
const SectionMarker = ({ label }: { label: string }) => (
    <div className="py-24 relative z-20 flex items-center justify-center">
        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-px bg-white/10" />
        <div className="relative z-10 bg-[#020202] px-6 py-2 border border-white/5 rounded-full shadow-2xl">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
                {label}
            </span>
        </div>
    </div>
);

// --- 5. THE EVENT NODE (FLUID) ---
const EventNode = ({ event, isPast, index }: { event: EventItem, isPast: boolean, index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

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
            {/* Dots */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8">
                 <div className={`absolute w-full h-full rounded-full opacity-40 ${isPast ? 'hidden' : 'bg-gold-500 animate-ping'}`} />
                 <div className={`relative w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${isPast ? 'bg-white text-white' : 'bg-gold-500 text-gold-500'}`} />
            </div>
            <div className="md:hidden absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 flex">
                 <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isPast ? 'bg-white' : 'bg-gold-500 animate-pulse'}`} />
            </div>

            {/* Fluid Image */}
            <div className="w-full md:w-1/2 relative bg-white/5 border border-white/10 overflow-hidden shadow-2xl rounded-sm">
                {imageSrc ? (
                    <Image 
                        src={imageSrc} 
                        alt={event.title} 
                        width={1000}
                        height={0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`w-full h-auto object-contain transition-all duration-1000 ease-out 
                            ${isPast 
                                ? 'grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100' 
                                : 'group-hover:scale-[1.02]' 
                            }
                        `}
                        style={{ width: '100%', height: 'auto' }}
                    />
                ) : (
                    <div className="w-full aspect-video flex items-center justify-center bg-[#0a0a0a]">
                        <span className="font-mono text-[10px] text-white/20">NO VISUAL</span>
                    </div>
                )}
                {isPast && <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />}
            </div>

            {/* Content */}
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

// --- 6. MAIN COMPONENT ---
export default function LuminousTimeline({ 
    challenge, futureEvents, pastEvents 
}: { 
    challenge: Challenge | null, futureEvents: EventItem[], pastEvents: EventItem[] 
}) {
    return (
        <div className="relative w-full min-h-screen bg-[#020202] text-white pb-40 overflow-hidden">
            
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] animate-grain z-0" />
            
            {/* LOGIC: IF SIGNAL EXISTS, SHOW BEACON. ELSE, SHOW CHRONICLE HEADER */}
            {challenge ? (
                <TheBeacon challenge={challenge} />
            ) : (
                <ChronicleHeader />
            )}

            {/* THE RED THREAD */}
            {/* Pushed down to top-[60vh] to clear the header cleanly. */}
            <div 
                className="absolute left-6 md:left-1/2 top-[40vh] bottom-0 w-px bg-white/10 z-0"
                style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%)" }}
            >
                {/* The Scanning Beam Animation (Red only if active signal, else Gold/White) */}
                <div className={`absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent ${challenge ? 'via-red-500' : 'via-gold-500/50'} to-transparent animate-scan opacity-70`} />
            </div>

            {/* HORIZON MARKER (The Guidance) */}
            {futureEvents.length > 0 && (
                <SectionMarker label="The Horizon" />
            )}

            {/* FUTURE EVENTS */}
            <div className="flex flex-col gap-0 relative z-10">
                {futureEvents.map((event, index) => (
                    <EventNode key={event.id} event={event} isPast={false} index={index} />
                ))}
            </div>

            {/* THRESHOLD MARKER */}
            {pastEvents.length > 0 && (
                <SectionMarker label="The Threshold" />
            )}

            {/* PAST EVENTS */}
            <div className="flex flex-col gap-0 relative z-10">
                {pastEvents.map((event, index) => (
                    <EventNode key={event.id} event={event} isPast={true} index={futureEvents.length + index} />
                ))}
            </div>
            
             {/* EMPTY STATE */}
             {!challenge && futureEvents.length === 0 && pastEvents.length === 0 && (
                 <div className="py-24 flex items-center justify-center relative z-20">
                    <span className="font-mono text-xs text-white/20 uppercase tracking-widest animate-pulse">
                        Scanning Frequencies...
                    </span>
                 </div>
            )}
        </div>
    );
}