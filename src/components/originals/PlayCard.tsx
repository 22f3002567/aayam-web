

// // "use client";

// // import { motion } from "framer-motion";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { Play } from "@/types/schema";
// // import { playSound } from "@/lib/audio";
// // import { getRasaForPlay } from "@/lib/rasa"; 
// // import { useArchiveAtmosphere } from "@/components/originals/ArchiveContext";

// // export default function PlayCard({ play, index }: { play: Play; index: number }) {
// //   const rasa = getRasaForPlay(play.mood);
// //   const { setFocus, hoveredPlay } = useArchiveAtmosphere();
  
// //   // Focus Logic: Spotlight the active card, dim the others
// //   const isHovered = hoveredPlay?.id === play.id;
// //   const isDimmed = hoveredPlay !== null && !isHovered;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 40 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true }}
// //       transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
// //       animate={{ 
// //         opacity: isDimmed ? 0.4 : 1, 
// //         scale: isDimmed ? 0.98 : 1,
// //         filter: isDimmed ? "grayscale(100%) blur(2px)" : "grayscale(0%) blur(0px)" 
// //       }}
// //       className="relative group perspective-1000"
// //     >
// //       <Link 
// //         href={`/originals/${play.slug}`}
// //         className="flex flex-col gap-6"
// //         onMouseEnter={() => {
// //             playSound('hover');
// //             setFocus(play, rasa); 
// //         }}
// //         onMouseLeave={() => {
// //             setFocus(null, null); 
// //         }}
// //       >
// //         {/* --- THE POSTER FRAME --- */}
// //         <div 
// //             className="relative w-full aspect-[2/3] overflow-hidden rounded-sm bg-neutral-900 transition-all duration-700 ease-out group-hover:-translate-y-2"
// //             style={{ 
// //                boxShadow: isHovered ? `0 25px 50px -12px ${rasa.color}40` : '0 0 0 transparent'
// //             }}
// //         >
// //           {/* 1. BORDER ACCENT (The Rasa Color) */}
// //           <div 
// //             className="absolute inset-0 border-[1px] opacity-0 transition-opacity duration-500 z-30 pointer-events-none rounded-sm"
// //             style={{ 
// //                 borderColor: rasa.color, 
// //                 opacity: isHovered ? 1 : 0 
// //             }}
// //           />

// //           {/* 2. THE STORY OVERLAY (The Whisper) */}
// //           <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
// //              {/* Heavy Gradient for Readability */}
// //              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
             
// //              {/* Text Container - Slides Up on Hover */}
// //              <div className="relative z-30 flex flex-col gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
// //                 <span className="text-[10px] uppercase tracking-[0.2em] font-mono" style={{ color: rasa.color }}>
// //                     {rasa.label}
// //                 </span>
// //                 <p className="text-sm font-serif text-neutral-300 italic leading-relaxed line-clamp-4">
// //                     "{play.description || "The dimensions are unfolding."}"
// //                 </p>
// //                 <div className="pt-2 flex items-center gap-2">
// //                     <span className="text-[9px] uppercase tracking-widest text-white border-b border-white/30 pb-0.5">Enter Production</span>
// //                 </div>
// //              </div>
// //           </div>

// //           {/* 3. THE IMAGE */}
// //           {play.poster_url ? (
// //             <Image
// //               src={play.poster_url}
// //               alt={play.title}
// //               fill
// //               className="object-cover transition-all duration-1000"
// //               style={{
// //                   // When hovered, scale up slightly and lose grayscale
// //                   filter: isHovered ? 'grayscale(0%) contrast(1.1)' : 'grayscale(100%) contrast(1)',
// //                   transform: isHovered ? 'scale(1.1)' : 'scale(1)'
// //               }}
// //             />
// //           ) : (
// //             <div className="w-full h-full bg-neutral-800" />
// //           )}
          
// //           {/* 4. COLOR WASH (Subtle Tint) */}
// //           <div 
// //             className="absolute inset-0 mix-blend-overlay z-10 transition-opacity duration-700" 
// //             style={{ 
// //                 background: `linear-gradient(to top, ${rasa.color}, transparent)`,
// //                 opacity: isHovered ? 0.6 : 0
// //             }}
// //           />
// //         </div>

// //         {/* --- METADATA (Under the card) --- */}
// //         <div className="flex flex-col gap-1 px-1 transition-opacity duration-300 group-hover:opacity-100">
// //           <div className="flex justify-between items-baseline">
// //              <h3 className="text-lg font-serif text-neutral-400 transition-colors duration-300 group-hover:text-white">
// //                 {play.title}
// //              </h3>
// //              <span className="text-[10px] font-mono text-neutral-600 transition-colors duration-300"
// //                  style={{ color: isHovered ? rasa.color : undefined }}>
// //                 {new Date(play.release_date).getFullYear()}
// //              </span>
// //           </div>
// //         </div>

// //       </Link>
// //     </motion.div>
// //   );
// // }

// // "use client";

// // import { useState, useRef } from "react";
// // import { motion } from "framer-motion";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { Play } from "@/types/schema";
// // import { getRasaForPlay } from "@/lib/rasa"; 
// // import { CardSize } from "@/lib/layout"; // Import types
// // import { img } from "framer-motion/client";

// // // Helper for YouTube Thumbnails
// // const getPosterSrc = (play: Play) => {
// //   if (play.poster_url) return play.poster_url;
// //   if (play.youtube_id) return `https://img.youtube.com/vi/${play.youtube_id}/maxresdefault.jpg`;
// //   return null;
// // };

// // interface PlayCardProps {
// //   play: Play;
// //   size?: CardSize; // We pass the size to adjust text sizing dynamically
// // }

// // export default function PlayCard({ play, size = 'standard' }: PlayCardProps) {
// //   const rasa = getRasaForPlay(play.mood);
// //   // const imageSrc = getPosterSrc(play);
// //   const initialSrc = getPosterSrc(play);
// //   const [imgError, setImgError] = useState(false); // NEW STATE: Track if image fails
// //   const [isHovered, setIsHovered] = useState(false);
  
// //   // Logic: Only 'Titan' cards get the video preview privilege
// //   const canPlayVideo = size === 'titan' && play.youtube_id;
// //   // const videoRef = useRef<HTMLIFrameElement>(null);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, scale: 0.95 }}
// //       whileInView={{ opacity: 1, scale: 1 }}
// //       viewport={{ once: true }}
// //       transition={{ duration: 0.5 }}
// //       // FIX 1: REMOVE OVERFLOW HIDDEN FROM HERE
// //       // This Outer Div handles the "Glow" and "Structure"
// //       // className={`relative group w-full h-full min-h-[300px] overflow-hidden rounded-sm bg-neutral-900 border border-white/5`}
// //       className={`relative group w-full h-full`}
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //     >
// //       <Link href={`/originals/${play.slug}`} className="block w-full h-full">
// //         {/* FIX 2: THE GLOW (Rasa Atmosphere) */}
// //         {/* This sits BEHIND the card and bleeds out */}
// //         <div 
// //             className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
// //             style={{ backgroundColor: rasa.color, opacity: isHovered ? 0.4 : 0 }} 
// //         />

// //         {/* FIX 3: THE CARD CONTENT (Masked) */}
// //         <div className="relative w-full h-full overflow-hidden rounded-sm bg-neutral-900 border border-white/10 ring-1 ring-white/5 group-hover:border-white/30 transition-colors duration-300"></div>
        
        
// //         {/* --- 1. THE MEDIA LAYER --- */}
// //         <div className="absolute inset-0 z-0">
// //             {/* The Image (Always visible initially) */}
// //             {initialSrc && !imgError ? (
// //                 <Image
// //                     src={initialSrc}
// //                     alt={play.title}
// //                     fill
// //                     // OPTIMIZATION: Helps browser pick right size
// //                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //                     // // className={`object-cover transition-all duration-700 ${isHovered ? 'scale-105 opacity-40' : 'scale-100 opacity-80'}`}
// //                     // // LAYOUT FIX: 'cover' fills the space, 'center' keeps the face visible
// //                     // className={`object-cover object-center transition-all duration-700 ${isHovered ? 'scale-105 opacity-40' : 'scale-100 opacity-80'}`}
// //                     // FIX 4: CENTER THE IMAGE (Crucial for thumbnails)
// //                     className={`object-cover object-center transition-transform duration-1000 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
// //                     style={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)' }}
// //                     onError = {() => setImgError(true)} // If image fails, set error state (Trigger fallback on fail)
// //                 />
// //             // ) : (
// //             //     <div className="w-full h-full flex items-center justify-center bg-neutral-800">
// //             //         <span className="text-white/20 font-mono text-xs">NO SIGNAL</span>
// //             //     </div>
// //             // )}
// //             // ) : (
// //             //     // THE FALLBACK (If image is missing or broken)
// //             //     <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 relative overflow-hidden">
// //             //         {/* Abstract Pattern Background */}
// //             //         <div className="absolute inset-0 opacity-20" 
// //             //             style={{ 
// //             //                 backgroundImage: `radial-gradient(circle at 2px 2px, ${rasa.color} 1px, transparent 0)`,
// //             //                 backgroundSize: '20px 20px' 
// //             //             }} 
// //             //         />
// //             //         <span className="text-white/20 font-mono text-xs uppercase tracking-widest z-10">
// //             //             Aayam Archive
// //             //         </span>
// //             //     </div>
// //             // )}
// //             ) : (
// //                 // FIX 5: THE GOD-TIER FALLBACK (Typographic Card)
// //                 // No ugly patterns. Just Color and Typography.
// //                 <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
// //                       <div className="absolute inset-0 opacity-20" style={{ backgroundColor: rasa.color }} />
// //                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      
// //                       {/* Large Letter Representation */}
// //                       <span className="text-9xl font-serif font-bold opacity-10 select-none" style={{ color: rasa.color }}>
// //                         {play.title.charAt(0)}
// //                       </span>
// //                 </div>
// //             )}

// //             {/* The Video Preview (Only for Titans on Hover) */}
// //             {canPlayVideo && isHovered && (
// //                 <div className="absolute inset-0 z-10 animate-fadeIn">
// //                      <iframe 
// //                         className="w-full h-full pointer-events-none scale-150" // Scale to remove black bars/controls
// //                         src={`https://www.youtube.com/embed/${play.youtube_id}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${play.youtube_id}`} 
// //                         allow="autoplay; encrypted-media"
// //                      />
// //                      {/* Gradient Overlay to keep text readable */}
// //                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
// //                 </div>
// //             )}
// //         </div>

// //         {/* --- 2. THE ATMOSPHERE LAYER --- */}
// //         <div 
// //             className="absolute inset-0 z-20 mix-blend-overlay transition-opacity duration-500"
// //             style={{ 
// //                 background: `linear-gradient(to top, ${rasa.color}, transparent)`,
// //                 opacity: isHovered ? 0.6 : 0 
// //             }}
// //         />

// //         {/* --- 3. THE CONTENT LAYER (Info) --- */}
// //         <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-8">
// //             {/* Rasa Tag */}
// //             <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
// //                 <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rasa.color }} />
// //                 <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: rasa.color }}>
// //                     {rasa.label}
// //                 </span>
// //             </div>

// //             {/* Title - Dynamic Sizing based on Card Size
// //             <h3 className={`font-serif text-white leading-none tracking-tight transition-all duration-300 break-words
// //                 ${size === 'titan' ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}
// //                 ${isHovered ? 'text-white' : 'text-neutral-300'}
// //             `}>
// //                 {play.title}
// //             </h3> */}
// //             {/* FIX 6: TYPOGRAPHY (Text Balance) */}
// //             <h3 className={`font-serif text-white leading-tight tracking-tight mb-2
// //                 ${size === 'titan' ? 'text-5xl' : 'text-2xl'}
// //                 ${play.title.length > 20 && size !== 'titan' ? 'text-xl' : ''} 
// //             `} style={{ textWrap: 'balance' }}> 
// //                 {play.title}
// //             </h3>

// //             {/* Description (Visible mainly on larger cards or hover) */}
// //             <div className={`overflow-hidden transition-all duration-500 
// //                 ${isHovered ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
// //             `}>
// //                 <p className="text-neutral-400 font-serif italic text-sm leading-relaxed line-clamp-3">
// //                     {play.description || "A story waiting to be told."}
// //                 </p>
// //                 <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold-500">
// //                     <span>Enter Experience</span>
// //                     <span>→</span>
// //                 </div>
// //             </div>
// //         </div>

// //       </Link>
// //     </motion.div>
// //   );
// // }

// // ////*******Above is good version, lets check below version, two files will be changed this one and lib/layout.ts */
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play } from "@/types/schema";
import { getRasaForPlay } from "@/lib/rasa"; 
import { CardSize } from "@/lib/layout"; // Import types
import { img } from "framer-motion/client";

// Helper for YouTube Thumbnails
const getPosterSrc = (play: Play) => {
  if (play.poster_url) return play.poster_url;
  if (play.youtube_id) return `https://img.youtube.com/vi/${play.youtube_id}/maxresdefault.jpg`;
  return null;
};

interface PlayCardProps {
  play: Play;
  size?: CardSize; // We pass the size to adjust text sizing dynamically
}

export default function PlayCard({ play, size = 'portrait' }: PlayCardProps) {
  const rasa = getRasaForPlay(play.mood);
  // const imageSrc = getPosterSrc(play);
  const initialSrc = getPosterSrc(play);
  const [imgError, setImgError] = useState(false); // NEW STATE: Track if image fails
  const [isHovered, setIsHovered] = useState(false);
  
  // Logic: Only 'Titan' cards get the video preview privilege
  const canPlayVideo = size === 'titan' && play.youtube_id;
  // const videoRef = useRef<HTMLIFrameElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      // FIX 1: REMOVE OVERFLOW HIDDEN FROM HERE
      // This Outer Div handles the "Glow" and "Structure"
      // className={`relative group w-full h-full min-h-[300px] overflow-hidden rounded-sm bg-neutral-900 border border-white/5`}
      className={`relative group w-full h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/originals/${play.slug}`} className="block w-full h-full">
        {/* GLOW */}
        {/* FIX 2: THE GLOW (Rasa Atmosphere) */}
        {/* This sits BEHIND the card and bleeds out */}
        <div 
            className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
            style={{ backgroundColor: rasa.color, opacity: isHovered ? 0.3 : 0 }} 
        />
        {/* MASK */}
        {/* FIX 3: THE CARD CONTENT (Masked) */}
        <div className="relative w-full h-full overflow-hidden rounded-sm bg-neutral-900 border border-white/10 ring-1 ring-white/5 group-hover:border-white/30 transition-colors duration-300"></div>
        
        {/* MEDIA */}
        {/* --- 1. THE MEDIA LAYER --- */}
        <div className="absolute inset-0 z-0">
            {/* The Image (Always visible initially) */}
            {initialSrc && !imgError ? (
                <Image
                    src={initialSrc}
                    alt={play.title}
                    fill
                    // OPTIMIZATION: Helps browser pick right size
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // // className={`object-cover transition-all duration-700 ${isHovered ? 'scale-105 opacity-40' : 'scale-100 opacity-80'}`}
                    // // LAYOUT FIX: 'cover' fills the space, 'center' keeps the face visible
                    // className={`object-cover object-center transition-all duration-700 ${isHovered ? 'scale-105 opacity-40' : 'scale-100 opacity-80'}`}
                    // FIX 4: CENTER THE IMAGE (Crucial for thumbnails)
                    className={`object-cover object-center transition-transform duration-1000 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
                    style={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)' }}
                    onError = {() => setImgError(true)} // If image fails, set error state (Trigger fallback on fail)
                />
            // ) : (
            //     <div className="w-full h-full flex items-center justify-center bg-neutral-800">
            //         <span className="text-white/20 font-mono text-xs">NO SIGNAL</span>
            //     </div>
            // )}
            // ) : (
            //     // THE FALLBACK (If image is missing or broken)
            //     <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 relative overflow-hidden">
            //         {/* Abstract Pattern Background */}
            //         <div className="absolute inset-0 opacity-20" 
            //             style={{ 
            //                 backgroundImage: `radial-gradient(circle at 2px 2px, ${rasa.color} 1px, transparent 0)`,
            //                 backgroundSize: '20px 20px' 
            //             }} 
            //         />
            //         <span className="text-white/20 font-mono text-xs uppercase tracking-widest z-10">
            //             Aayam Archive
            //         </span>
            //     </div>
            // )}
            ) : (
                // FIX 5: THE GOD-TIER FALLBACK (Typographic Card)
                // No ugly patterns. Just Color and Typography.
                <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundColor: rasa.color }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      
                      {/* Large Letter Representation */}
                      <span className="text-9xl font-serif font-bold opacity-10 select-none" style={{ color: rasa.color }}>
                        {play.title.charAt(0)}
                      </span>
                </div>
            )}
            {/*  */}
            {/* The Video Preview (Only for Titans on Hover) */}
            {canPlayVideo && isHovered && (
                <div className="absolute inset-0 z-10 animate-fadeIn">
                     <iframe 
                        className="w-full h-full pointer-events-none scale-150" // Scale to remove black bars/controls
                        src={`https://www.youtube.com/embed/${play.youtube_id}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${play.youtube_id}`} 
                        allow="autoplay; encrypted-media"
                     />
                     {/* Gradient Overlay to keep text readable */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
            )}
        </div>
        {/* Gradient Overlay to keep text readable */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />  */}

        {/* --- 2. THE ATMOSPHERE LAYER --- */}
        <div 
            className="absolute inset-0 z-20 mix-blend-overlay transition-opacity duration-500"
            style={{ 
                background: `linear-gradient(to top, ${rasa.color}, transparent)`,
                opacity: isHovered ? 0.6 : 0 
            }}
        />

        {/* --- 3. THE CONTENT LAYER (Info) --- */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-8">
            {/* Rasa Tag */}
            <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rasa.color }} />
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: rasa.color }}>
                    {rasa.label}
                </span>
            </div>

            {/* Title - Dynamic Sizing based on Card Size
            <h3 className={`font-serif text-white leading-none tracking-tight transition-all duration-300 break-words
                ${size === 'titan' ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}
                ${isHovered ? 'text-white' : 'text-neutral-300'}
            `}>
                {play.title}
            </h3> */}
            {/* FIX 6: TYPOGRAPHY (Text Balance) */}
            <h3 className={`font-serif text-white leading-tight tracking-tight mb-2
                ${size === 'titan' ? 'text-5xl' : 'text-2xl'}
                ${play.title.length > 20 && size !== 'titan' ? 'text-xl' : ''} 
            `} style={{ textWrap: 'balance' }}> 
                {play.title}
            </h3>

            {/* Description (Visible mainly on larger cards or hover) */}
            <div className={`overflow-hidden transition-all duration-500 
                ${isHovered ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
            `}>
                <p className="text-neutral-400 font-serif italic text-sm leading-relaxed line-clamp-3">
                    {play.description || "A story waiting to be told."}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold-500">
                    <span>Enter Experience</span>
                    <span>→</span>
                </div>
            </div>
        </div>

      </Link>
    </motion.div>
  );
}
