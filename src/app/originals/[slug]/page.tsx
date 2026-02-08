import { getPlayBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import ClientWrapper from "@/components/layout/ClientWrapper";
import PrismMenu from "@/components/layout/PrismMenu";
import CinemaPlayer from "@/components/originals/CinemaPlayer";
import AnimatedBackground from "@/components/originals/AnimatedBackground"; // 1. IMPORT NEW COMPONENT
import type { Metadata } from "next";
import CastRoll from "@/components/originals/CastRoll"; // <--- NEW COMPONENT
import ProductionGallery from "@/components/originals/ProductionGallery";


// DYNAMIC METADATA
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const play = await getPlayBySlug(slug);

  if (!play) {
    return { title: "Play Not Found | Aayam" };
  }

  return {
    title: `${play.title} | Aayam Originals`,
    description: play.description || "A production by Aayam Drama Society.",
    openGraph: {
      images: play.poster_url ? [play.poster_url] : [],
    },
  };
}

// THE PAGE COMPONENT
export default async function PlayPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params; 
  const play = await getPlayBySlug(slug);

  if (!play) notFound();

  return (
    <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
      <ClientWrapper>
        
        {/* 2. USE THE EXTRACTED COMPONENT */}
        {play.poster_url && <AnimatedBackground src={play.poster_url} />}

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center pt-32 pb-24 px-4 md:px-12 max-w-7xl mx-auto">
          
          {/* NAVIGATION */}
          <div className="w-full flex justify-between items-center mb-16 border-b border-white/5 pb-6">
            <Link href="/originals" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-gold-500 transition-colors">
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span>The Originals</span>
            </Link>
            <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"/>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500/50">
                Aayam Archive
                </span>
            </div>
          </div>

          {/* HEADER */}
          <div className="text-center space-y-8 mb-16 max-w-4xl w-full">
            <div className="flex justify-center gap-4">
               <span className="px-4 py-1.5 border border-gold-500/20 rounded-full text-[9px] uppercase tracking-widest text-gold-500/80 bg-gold-500/5 backdrop-blur-md">
                 {play.mood}
               </span>
               <span className="px-4 py-1.5 border border-white/5 rounded-full text-[9px] uppercase tracking-widest text-neutral-400 backdrop-blur-md">
                 {new Date(play.release_date).getFullYear()}
               </span>
            </div>

            {/* FLUID TYPOGRAPHY */}
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-tighter leading-none break-words">
              {play.title}
            </h1>

            <p className="text-neutral-400 text-sm md:text-lg leading-relaxed font-serif italic max-w-2xl mx-auto border-t border-white/5 pt-8 mt-8">
              "{play.description || "The dimensions are unfolding."}"
            </p>
          </div>

          {/* CINEMA PLAYER */}
          <CinemaPlayer 
            youtubeId={play.youtube_id} 
            posterUrl={play.poster_url} 
            title={play.title} 
          />
          
          {/* CREDITS & METADATA (THE PEOPLE & THEMES) */}
          <div className="w-full mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
            {/* Technical Details */}
             {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"> */}
             
             <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-widest text-gold-500">Production</span>
                <span className="text-2xl font-serif text-white">Aayam Drama Society</span>
                <span className="text-xs text-neutral-500 font-mono">IIT Madras BS Degree</span>
             </div>
             <div className="flex flex-col gap-4 md:items-end">
               <span className="text-[10px] uppercase tracking-widest text-gold-500">Themes</span>
               {play.tags && (
                 <div className="flex flex-wrap gap-2 md:justify-end">
                   {play.tags.map((tag: string) => (
                     <span key={tag} className="px-2 py-1 bg-white/5 text-[10px] text-neutral-400 uppercase tracking-wider rounded-sm">
                        {tag}
                     </span>
                   ))}
                 </div>
               )}
             </div>
            {/* </div> */}
          
            {/* CAST ROLL */}
            <CastRoll credits={play.credits || []}  />
          </div>
          {/* 3. THE SCATTERED MEMORY ARCHIVE (The Post-Show Nostalgia) */}
          {/* Moved to the very end, as requested */}
          {play.gallery_urls && play.gallery_urls.length > 0 && (
             <div className="w-full mt-32 border-t border-white/5 pt-12">
                <ProductionGallery images={play.gallery_urls} />
             </div>
          )}
        </div>
        <PrismMenu />
      </ClientWrapper>
    </main>
  );
}

// import { getPlayBySlug } from "@/lib/api";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import ClientWrapper from "@/components/layout/ClientWrapper";
// import PrismMenu from "@/components/layout/PrismMenu";
// import CinemaPlayer from "@/components/originals/CinemaPlayer";
// import type { Metadata } from "next"; // Import Metadata type

// // 1. DYNAMIC METADATA (The "Harvard" Touch)
// // This ensures Google and Social Media see the correct Title/Description
// export async function generateMetadata({ 
//   params 
// }: { 
//   params: Promise<{ slug: string }> 
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const play = await getPlayBySlug(slug);

//   if (!play) {
//     return { title: "Play Not Found | Aayam" };
//   }

//   return {
//     title: `${play.title} | Aayam Originals`,
//     description: play.description || "A production by Aayam Drama Society.",
//     openGraph: {
//       images: play.poster_url ? [play.poster_url] : [],
//     },
//   };
// }

// // 2. THE PAGE COMPONENT
// export default async function PlayPage({ 
//   params 
// }: { 
//   params: Promise<{ slug: string }> 
// }) {
//   const { slug } = await params; 
//   const play = await getPlayBySlug(slug);

//   if (!play) notFound();

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
//       <ClientWrapper>
        
//         {/* ATMOSPHERE (Ken Burns) */}
//         {play.poster_url && (
//           <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
//             <div className="absolute inset-0 bg-black" />
//             <div className="relative w-full h-full animate-slow-zoom opacity-30">
//                 <Image
//                     src={play.poster_url}
//                     alt="Atmosphere"
//                     fill
//                     className="object-cover blur-3xl"
//                     priority
//                 />
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]/60" />
//             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
//           </div>
//         )}

//         {/* CONTENT */}
//         <div className="relative z-10 flex flex-col items-center pt-32 pb-24 px-4 md:px-12 max-w-7xl mx-auto">
          
//           {/* NAVIGATION */}
//           <div className="w-full flex justify-between items-center mb-16 border-b border-white/5 pb-6">
//             <Link href="/" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-gold-500 transition-colors">
//               <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
//               <span>The Stage</span>
//             </Link>
//             <div className="flex items-center gap-2">
//                 <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"/>
//                 <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500/50">
//                 Aayam Archive
//                 </span>
//             </div>
//           </div>

//           {/* HEADER */}
//           <div className="text-center space-y-8 mb-16 max-w-4xl w-full">
//             <div className="flex justify-center gap-4">
//                <span className="px-4 py-1.5 border border-gold-500/20 rounded-full text-[9px] uppercase tracking-widest text-gold-500/80 bg-gold-500/5 backdrop-blur-md">
//                  {play.mood}
//                </span>
//                <span className="px-4 py-1.5 border border-white/5 rounded-full text-[9px] uppercase tracking-widest text-neutral-400 backdrop-blur-md">
//                  {new Date(play.release_date).getFullYear()}
//                </span>
//             </div>

//             {/* 3. FLUID TYPOGRAPHY (Prevents Mobile Breakage) */}
//             <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-tighter leading-none break-words">
//               {play.title}
//             </h1>

//             <p className="text-neutral-400 text-sm md:text-lg leading-relaxed font-serif italic max-w-2xl mx-auto border-t border-white/5 pt-8 mt-8">
//               "{play.description || "The dimensions are unfolding."}"
//             </p>
//           </div>

//           {/* CINEMA PLAYER */}
//           <CinemaPlayer 
//             youtubeId={play.youtube_id} 
//             posterUrl={play.poster_url} 
//             title={play.title} 
//           />

//           {/* FOOTER */}
//           <div className="w-full mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
//              <div className="flex flex-col gap-4">
//                 <span className="text-[10px] uppercase tracking-widest text-gold-500">Production</span>
//                 <span className="text-2xl font-serif text-white">Aayam Drama Society</span>
//                 <span className="text-xs text-neutral-500 font-mono">IIT Madras BS Degree</span>
//              </div>
//              <div className="flex flex-col gap-4 md:items-end">
//                <span className="text-[10px] uppercase tracking-widest text-gold-500">Themes</span>
//                {play.tags && (
//                  <div className="flex flex-wrap gap-2 md:justify-end">
//                    {play.tags.map((tag: string) => (
//                      <span key={tag} className="px-2 py-1 bg-white/5 text-[10px] text-neutral-400 uppercase tracking-wider rounded-sm">
//                         {tag}
//                      </span>
//                    ))}
//                  </div>
//                )}
//              </div>
//           </div>

//         </div>
//         <PrismMenu />
//       </ClientWrapper>
//     </main>
//   );
// }
// import { getPlayBySlug } from "@/lib/api";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import ClientWrapper from "@/components/layout/ClientWrapper";
// import PrismMenu from "@/components/layout/PrismMenu";
// import CinemaPlayer from "@/components/originals/CinemaPlayer"; // IMPORT NEW COMPONENT

// // Helper component for the Ken Burns background
// // We need this to use 'framer-motion' in a client component, 
// // but we want to keep the main page cleaner. 
// // We'll just embed a simple CSS animation for the background to keep it light.
// const AnimatedBackground = ({ src }: { src: string }) => (
//   <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
//     <div className="absolute inset-0 bg-black" />
//     <div className="relative w-full h-full animate-slow-zoom opacity-30">
//         <Image
//             src={src}
//             alt="Atmosphere"

//             fill
//             className="object-cover blur-3xl"
//             priority
//         />
//     </div>
//     {/* Cinematic Vignette */}
//     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]/60" />
//     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
//   </div>
// );

// export default async function PlayPage({ 
//   params 
// }: { 
//   params: Promise<{ slug: string }> 
// }) {
//   const { slug } = await params; 
//   const play = await getPlayBySlug(slug);

//   if (!play) notFound();

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
//       <ClientWrapper>
        
//         {/* --- LAYER 1: LIVING ATMOSPHERE --- */}
//         {play.poster_url && <AnimatedBackground src={play.poster_url} />}

//         {/* --- LAYER 2: THE STAGE --- */}
//         <div className="relative z-10 flex flex-col items-center pt-32 pb-24 px-4 md:px-12 max-w-7xl mx-auto">
          
//           {/* NAVIGATION */}
//           <div className="w-full flex justify-between items-center mb-16 border-b border-white/5 pb-6">
//             <Link href="/" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-gold-500 transition-colors">
//               <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
//               <span>The Stage</span>
//             </Link>
//             <div className="flex items-center gap-2">
//                 <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"/>
//                 <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500/50">
//                 Aayam Archive
//                 </span>
//             </div>
//           </div>

//           {/* THE HEADER */}
//           <div className="text-center space-y-8 mb-16 max-w-4xl">
//             {/* Tags */}
//             <div className="flex justify-center gap-4">
//                <span className="px-4 py-1.5 border border-gold-500/20 rounded-full text-[9px] uppercase tracking-widest text-gold-500/80 bg-gold-500/5 backdrop-blur-md">
//                  {play.mood}
//                </span>
//                <span className="px-4 py-1.5 border border-white/5 rounded-full text-[9px] uppercase tracking-widest text-neutral-400 backdrop-blur-md">
//                  {new Date(play.release_date).getFullYear()}
//                </span>
//             </div>

//             {/* Title */}
//             <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white tracking-tighter leading-none">
//               {play.title}
//             </h1>

//             {/* Description */}
//             <p className="text-neutral-400 text-sm md:text-lg leading-relaxed font-serif italic max-w-2xl mx-auto border-t border-white/5 pt-8 mt-8">
//               "{play.description || "The dimensions are unfolding."}"
//             </p>
//           </div>

//           {/* --- THE CINEMA PLAYER (The Facade) --- */}
//           <CinemaPlayer 
//             youtubeId={play.youtube_id} 
//             posterUrl={play.poster_url} 
//             title={play.title} 
//           />

//           {/* FOOTER CREDITS */}
//           <div className="w-full mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
//              <div className="flex flex-col gap-4">
//                 <span className="text-[10px] uppercase tracking-widest text-gold-500">Production</span>
//                 <span className="text-2xl font-serif text-white">Aayam Drama Society</span>
//                 <span className="text-xs text-neutral-500 font-mono">IIT Madras BS Degree</span>
//              </div>
             
//              {/* Tags */}
//              <div className="flex flex-col gap-4 md:items-end">
//                <span className="text-[10px] uppercase tracking-widest text-gold-500">Themes</span>
//                {play.tags && (
//                  <div className="flex flex-wrap gap-2 md:justify-end">
//                    {play.tags.map((tag: string) => (
//                      <span key={tag} className="px-2 py-1 bg-white/5 text-[10px] text-neutral-400 uppercase tracking-wider rounded-sm">
//                         {tag}
//                      </span>
//                    ))}
//                  </div>
//                )}
//              </div>
//           </div>

//         </div>

//         <PrismMenu />
//       </ClientWrapper>
//     </main>
//   );
// }

// import { getPlayBySlug } from "@/lib/api";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import ClientWrapper from "@/components/layout/ClientWrapper";
// import PrismMenu from "@/components/layout/PrismMenu";

// // 1. UPDATE TYPE: params is now a Promise
// export default async function PlayPage({ 
//   params 
// }: { 
//   params: Promise<{ slug: string }> 
// }) {
  
//   // 2. AWAIT THE PARAMS: Unwrap the promise to get the slug
//   const { slug } = await params; 
  
//   // 3. FETCH DATA
//   const play = await getPlayBySlug(slug);

//   // If the play doesn't exist, show the 404 page
//   if (!play) {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
//       <ClientWrapper>
        
//         {/* --- LAYER 1: THE ATMOSPHERE (Blurred Background) --- */}
//         <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
//           {play.poster_url && (
//             <Image
//               src={play.poster_url}
//               alt="Atmosphere"
//               fill
//               className="object-cover blur-3xl"
//               priority
//             />
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40" />
//         </div>

//         {/* --- LAYER 2: THE STAGE (Content) --- */}
//         <div className="relative z-10 flex flex-col items-center pt-32 pb-24 px-4 md:px-12 max-w-7xl mx-auto">
          
//           {/* NAVIGATION (Back to Reality) */}
//           <div className="w-full flex justify-between items-center mb-16 border-b border-white/5 pb-6">
//             <Link href="/" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-gold-500 transition-colors">
//               <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
//               <span>Back to Stage</span>
//             </Link>
//             <div className="text-[10px] uppercase tracking-[0.3em] text-gold-500/50">
//               Original Production
//             </div>
//           </div>

//           {/* THE HEADER */}
//           <div className="text-center space-y-6 mb-16 max-w-4xl">
//             {/* Tags */}
//             <div className="flex justify-center gap-4">
//                <span className="px-4 py-1.5 border border-gold-500/20 rounded-full text-[9px] uppercase tracking-widest text-gold-500/80 bg-gold-500/5 backdrop-blur-md">
//                  {play.mood}
//                </span>
//                <span className="px-4 py-1.5 border border-white/5 rounded-full text-[9px] uppercase tracking-widest text-neutral-400 backdrop-blur-md">
//                  {new Date(play.release_date).getFullYear()}
//                </span>
//             </div>

//             {/* Title */}
//             <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tighter">
//               {play.title}
//             </h1>

//             {/* Description */}
//             <p className="text-neutral-400 text-sm md:text-base leading-loose font-serif italic max-w-2xl mx-auto">
//               "{play.description || "The dimensions are unfolding."}"
//             </p>
//           </div>

//           {/* THE CINEMA SCREEN (YouTube Embed) */}
//           <div className="w-full aspect-video rounded-sm overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(212,175,55,0.05)] bg-black relative group">
//             <iframe 
//               src={`https://www.youtube.com/embed/${play.youtube_id}?autoplay=0&rel=0&modestbranding=1`} 
//               title={play.title}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//               allowFullScreen 
//               className="absolute inset-0 w-full h-full"
//             />
//           </div>

//           {/* FOOTER METADATA */}
//           <div className="w-full mt-16 flex flex-col md:flex-row justify-between items-start gap-8 border-t border-white/5 pt-8">
//              <div className="flex flex-col gap-2">
//                 <span className="text-[9px] uppercase tracking-widest text-neutral-600">Produced By</span>
//                 <span className="text-sm font-serif text-white">Aayam Drama Society</span>
//              </div>
             
//              {/* Tags Display */}
//              {play.tags && (
//                <div className="flex flex-wrap gap-2 md:justify-end max-w-md">
//                  {play.tags.map((tag: string) => (
//                    <span key={tag} className="text-[9px] text-neutral-500 uppercase tracking-wider">#{tag}</span>
//                  ))}
//                </div>
//              )}
//           </div>

//         </div>

//         <PrismMenu />
//       </ClientWrapper>
//     </main>
//   );
// }