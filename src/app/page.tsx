import ClientWrapper from "@/components/layout/ClientWrapper";
import HeroStage from "@/components/home/HeroStage";
import PrismMenu from "@/components/layout/PrismMenu";
import { getLatestOriginal } from "@/lib/api";
export const revalidate = 0;
export default async function Home() {
  const latestPlay = await getLatestOriginal();

  return (
    <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-hidden selection:bg-gold-500/30">
      
      <ClientWrapper>
         <HeroStage play={latestPlay} />
         
         {/* THE INFINITE HINT (Ease / Psychological Assurance) */}
         <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
         
         <PrismMenu />
      </ClientWrapper>
      
    </main>
  );
}

// import ClientWrapper from "@/components/layout/ClientWrapper";
// import HeroStage from "@/components/home/HeroStage";
// import OriginalsSection from "@/components/home/OriginalsSection";
// import SecretaryDesk from "@/components/home/SecretaryDesk"; // IMPORT THIS
// import PrismMenu from "@/components/layout/PrismMenu";
// import { getLatestOriginal, getSecretary } from "@/lib/api"; // Import getSecretary

// export default async function Home() {
//   // 1. FETCH DATA (Parallel Fetching for Speed)
//   const [latestPlay, secretary] = await Promise.all([
//     getLatestOriginal(),
//     getSecretary()
//   ]);

//   // Debug Log
//   console.log("NEURAL LINK STATUS:");
//   console.log("Play:", latestPlay?.title ?? "N/A");
//   console.log("Secretary:", secretary?.name ?? "N/A");

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
      
//       <ClientWrapper>
//          {/* SECTION 1: HERO */}
//          <HeroStage />
         
//          {/* SECTION 2: THE WORK */}
//          <OriginalsSection play={latestPlay} />
         
//          {/* SECTION 3: THE VOICE (New) */}
//          <SecretaryDesk secretary={secretary} />
         
//          {/* NAVIGATION */}
//          <PrismMenu />
//       </ClientWrapper>
      
//     </main>
//   );
// }

// import ClientWrapper from "@/components/layout/ClientWrapper";
// import HeroStage from "@/components/home/HeroStage";
// import PrismMenu from "@/components/layout/PrismMenu";
// import { getLatestOriginal } from "@/lib/api"; // The Brain

// export default async function Home() {
//   // 1. ESTABLISH NEURAL LINK (Server-Side Fetch)
//   // This runs on the server before the page is sent to the user.
//   const latestPlay = await getLatestOriginal();

//   // 2. CONSOLE CHECK
//   // Check your VS Code terminal (not the browser console) to see this.
//   if (latestPlay) {
//     console.log("✅ NEURAL LINK ESTABLISHED. FETCHED PLAY:", latestPlay.title);
//   } else {
//     console.log("⚠️ NEURAL LINK ACTIVE. NO PLAYS FOUND.");
//   }

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
      
//       {/* 3. INJECT DATA INTO THE STAGE 
//           The ClientWrapper handles the 'Ghost Light' animation.
//           HeroStage and PrismMenu are passed as children.
//       */}
//       <ClientWrapper>
//          <HeroStage />
         
//          {/* Phase 3.5: We will pass 'latestPlay' to a new section here soon */}
         
//          <PrismMenu />
//       </ClientWrapper>
      
//     </main>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { AnimatePresence } from "framer-motion";
// import GhostLight from "@/components/intro/GhostLight";
// import HeroStage from "@/components/home/HeroStage";
// import PrismMenu from "@/components/layout/PrismMenu";
// import { getLatestOriginal, getSecretary } from "@/lib/api"; // The Brain (Server-side data fetching)
// export default function Home() {
//   const [stageReady, setStageReady] = useState(false);

//   useEffect(() => {
//     // Only skip if session exists
//     const hasVisited = sessionStorage.getItem("aayam_session");
//     if (hasVisited) setStageReady(true);
//   }, []);

//   const handleIgnition = () => {
//     sessionStorage.setItem("aayam_session", "true");
//     setStageReady(true);
//   };

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
      
//       {/* ACT 1: THE IGNITION 
//           AnimatePresence guarantees the 'exit' animation (Fade Out) plays 
//           before the component is removed from the DOM.
//       */}
//       <AnimatePresence mode="wait">
//         {!stageReady && <GhostLight onIgnite={handleIgnition} key="intro" />}
//       </AnimatePresence>

//       {/* ACT 2: THE REVEAL */}
//       {stageReady && (
//         <div className="relative flex flex-col animate-fade-in perspective-1000">
//            <HeroStage />
//            <PrismMenu />
//         </div>
//       )}
      
//     </main>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { AnimatePresence } from "framer-motion"; // IMPORT THIS
// import GhostLight from "@/components/intro/GhostLight";
// import HeroStage from "@/components/home/HeroStage";
// import PrismMenu from "@/components/layout/PrismMenu";

// export default function Home() {
//   const [stageReady, setStageReady] = useState(false);

//   useEffect(() => {
//     const hasVisited = sessionStorage.getItem("aayam_session");
//     if (hasVisited) setStageReady(true);
//   }, []);

//   const handleIgnition = () => {
//     sessionStorage.setItem("aayam_session", "true");
//     setStageReady(true);
//   };

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden">
      
//       {/* 1. THE CURTAIN RAISER */}
//       {/* AnimatePresence ensures the exit transition of GhostLight plays fully */}
//       <AnimatePresence mode="wait">
//         {!stageReady && <GhostLight onIgnite={handleIgnition} />}
//       </AnimatePresence>

//       {/* 2. THE MAIN STAGE */}
//       {stageReady && (
//         <div className="relative flex flex-col">
//            <HeroStage />
//            <PrismMenu />
//         </div>
//       )}
      
//     </main>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import GhostLight from "@/components/intro/GhostLight";
// import HeroStage from "@/components/home/HeroStage";
// import PrismMenu from "@/components/layout/PrismMenu";

// export default function Home() {
//   const [stageReady, setStageReady] = useState(false);

//   useEffect(() => {
//     const hasVisited = sessionStorage.getItem("aayam_session");
//     if (hasVisited) setStageReady(true);
//   }, []);

//   const handleIgnition = () => {
//     sessionStorage.setItem("aayam_session", "true");
//     setStageReady(true);
//   };

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] overflow-x-hidden">
//       {!stageReady && <GhostLight onIgnite={handleIgnition} />}

//       {stageReady && (
//         <div className="relative flex flex-col">
//            {/* HERO STAGE */}
//            <HeroStage />
           
//            {/* MENU (Global Navigation) */}
//            <PrismMenu />
//         </div>
//       )}
//     </main>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// // --- LAYOUT & UTILS ---
// // import NewsMarquee from "@/components/layout/NewsMarquee";
// import NewsMarquee from "@/components/layout/NewsMarguee";
// import Footer from "@/components/layout/Footer";
// import DirectorConsole from "@/components/navigation/DirectorConsole";
// import { supabase } from "@/lib/supabase";

// // --- ACT 1: IGNITION ---
// import GhostLight from "@/components/intro/GhostLight";

// // --- ACT 2: ATMOSPHERE ---
// import PrismMenu from "@/components/navigation/PrismMenu";
// import { NAVARASA_MOODS, Mood } from "@/lib/constants";

// // --- ACT 3: THE CONTENT (PHANTOM PLAYER) ---
// import ContentGrid from "@/components/content/ContentGrid";
// import { PLAY_LIST, Video } from "@/lib/content";

// // --- ACT 4: THE ENSEMBLE (SPOTLIGHT) ---
// import SpotlightCard from "@/components/team/SpotlightCard";
// import { TEAM_LIST } from "@/lib/team";

// // // // --- ACT 5: THE LEGACY ---
// // import CertificateSearch from "@/components/legacy/CertificateSearch";
// import CertificateSearch from "@/components/legacy/CertificationSearch";
// export default function Home() {
//   const [stageReady, setStageReady] = useState(false);
//   const [isFirstVisit, setIsFirstVisit] = useState(true);
//   const [currentMood, setCurrentMood] = useState<Mood>(NAVARASA_MOODS[0]); // Default: All
  
//   // STATE: Initialize with static data so the site is never empty
//   const [videos, setVideos] = useState<Video[]>(PLAY_LIST);

//   // 1. Check if the user has visited before (The "Smart Cookie" Logic)
//   useEffect(() => {
//      const hasVisited = localStorage.getItem("aayam_visited");
//      if (hasVisited) {
//        setIsFirstVisit(false);
//        setStageReady(true);
//      }
//   }, []);

//   // 2. Fetch Live Data from Supabase (The CMS Integration)
//   useEffect(() => {
//     const fetchDynamicPlays = async () => {
//       const { data, error } = await supabase
//         .from('plays')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (data && data.length > 0) {
//         // Map database columns to our Video interface
//         // We use a trick to get the YouTube thumbnail automatically
//         const liveVideos: Video[] = data.map((item: any) => ({
//           id: item.id,
//           title: item.title,
//           youtubeId: item.youtubeId,
//           thumbnail: `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`,
//           mood: item.mood,
//           duration: "New Release", 
//           director: item.director,
//           cast: [] 
//         }));
        
//         // Merge: Show Newest (Live) videos first, then Static videos
//         setVideos([...liveVideos, ...PLAY_LIST]);
//       }
//     };

//     fetchDynamicPlays();
//   }, []);

//   // 3. Handle the "Snap" from Act 1
//   const handleIgnition = () => {
//     localStorage.setItem("aayam_visited", "true");
//     setStageReady(true);
//   };

//   return (
//     <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-amber-500/30">
      
//       {/* GLOBAL UTILITIES */}
//       <NewsMarquee />
//       <DirectorConsole />

//       {/* --- ACT 1: THE GHOST LIGHT (Entry) --- */}
//       {isFirstVisit && !stageReady && <GhostLight onIgnite={handleIgnition} />}

//       {/* --- THE MAIN STAGE --- */}
//       {stageReady && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="relative w-full h-full min-h-screen"
//         >
//           {/* A. THE ATMOSPHERE ENGINE (Background Glow) */}
//           <motion.div 
//             className="fixed inset-0 pointer-events-none z-0"
//             animate={{
//               background: `radial-gradient(circle at 50% -20%, ${currentMood.color}15 0%, rgba(5,5,5,0) 70%)`
//             }}
//             transition={{ duration: 1.5 }}
//           />
          
//           {/* B. THE CONTENT CONTAINER */}
//           <div className="relative z-10 p-4 md:p-8 pt-24 pb-40">
//              <div className="max-w-7xl mx-auto space-y-32">
                
//                 {/* HEADER: Dynamic Title based on Mood */}
//                 <motion.div 
//                    key={currentMood.id}
//                    initial={{ y: 20, opacity: 0 }}
//                    animate={{ y: 0, opacity: 1 }}
//                    className="text-center space-y-4"
//                 >
//                     <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight">
//                         {currentMood.label}
//                     </h2>
//                     <p className="text-white/40 font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
//                         {currentMood.description}
//                     </p>
//                 </motion.div>

//                 {/* --- ACT 3: AAYAM ORIGINALS (Phantom Player) --- */}
//                 <section id="originals">
//                    {/* We pass the 'videos' state which contains both Static + Supabase data */}
//                    <ContentGrid videos={videos} currentMoodId={currentMood.id} />
//                 </section>

//                 {/* --- ACT 4: THE ENSEMBLE (Spotlight Cards) --- */}
//                 <section id="ensemble">
//                   <div className="mb-12 border-l-2 border-amber-500 pl-6">
//                     <h3 className="text-3xl font-serif text-white">The Ensemble</h3>
//                     <p className="text-white/40 text-sm mt-2">
//                         The dual lives of IITM Students. Tap the <span className="text-amber-500">mic</span> to hear their truth.
//                     </p>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {TEAM_LIST.map((member) => (
//                       <SpotlightCard key={member.id} member={member} />
//                     ))}
//                   </div>
//                 </section>

//                 {/* --- ACT 5: THE ARCHIVES (Certificates) --- */}
//                 <section id="legacy" className="flex justify-center">
//                    <CertificateSearch />
//                 </section>

//              </div>
//           </div>

//           {/* C. THE NAVIGATION RIBBON (Fixed at Bottom) */}
//           <PrismMenu currentMood={currentMood} onMoodChange={setCurrentMood} />
          
//         </motion.div>
//       )}

//       {/* --- FOOTER --- */}
//       {stageReady && <Footer />}

//     </main>
//   );
// }


// // "use client";

// // import { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import NewsMarquee from "@/components/layout/NewsMarguee";

// // // --- ACT 1: IGNITION ---
// // import GhostLight from "@/components/intro/GhostLight";

// // // --- ACT 2: ATMOSPHERE ---
// // import PrismMenu from "@/components/navigation/PrismMenu";
// // import { NAVARASA_MOODS, Mood } from "@/lib/constants";

// // // --- ACT 3: THE CONTENT (PHANTOM PLAYER) ---
// // import ContentGrid from "@/components/content/ContentGrid";
// // import { PLAY_LIST } from "@/lib/content";

// // // --- ACT 4: THE ENSEMBLE (SPOTLIGHT) ---
// // import SpotlightCard from "@/components/team/SpotlightCard";
// // import { TEAM_LIST } from "@/lib/team";

// // // --- ACT 5: THE LEGACY ---
// // import CertificateSearch from "@/components/legacy/CertificationSearch";
// // import Footer from "@/components/layout/Footer";

// // import DirectorConsole from "@/components/navigation/DirectorConsole";
// // import { supabase } from "@/lib/supabase";
// // export default function Home() {
// //   const [stageReady, setStageReady] = useState(false);
// //   const [isFirstVisit, setIsFirstVisit] = useState(true);
// //   const [currentMood, setCurrentMood] = useState<Mood>(NAVARASA_MOODS[0]); // Default: All
// //   const [videos, setVideos] = useState([]);
// //   // 1. Check if the user has visited before (The "Smart Cookie" Logic)
// //   useEffect(() => {
// //      const hasVisited = localStorage.getItem("aayam_visited");
// //      if (hasVisited) {
// //        setIsFirstVisit(false);
// //        setStageReady(true);
// //      }
// //   }, []);

// //   // 2. Handle the "Snap" from Act 1
// //   const handleIgnition = () => {
// //     localStorage.setItem("aayam_visited", "true");
// //     setStageReady(true);
// //   };

// //   return (
// //     <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-amber-500/30">
      
// //       <NewsMarquee />
// //       <DirectorConsole />
// //       {/* --- ACT 1: THE GHOST LIGHT (Entry) --- */}
// //       {isFirstVisit && !stageReady && <GhostLight onIgnite={handleIgnition} />}

// //       {/* --- THE MAIN STAGE --- */}
// //       {stageReady && (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 1 }}
// //           className="relative w-full h-full min-h-screen"
// //         >
// //           {/* A. THE ATMOSPHERE ENGINE (Background Glow) */}
// //           <motion.div 
// //             className="fixed inset-0 pointer-events-none z-0"
// //             animate={{
// //               background: `radial-gradient(circle at 50% -20%, ${currentMood.color}15 0%, rgba(5,5,5,0) 70%)`
// //             }}
// //             transition={{ duration: 1.5 }}
// //           />
          
// //           {/* B. THE CONTENT CONTAINER */}
// //           <div className="relative z-10 p-4 md:p-8 pt-24 pb-40">
// //              <div className="max-w-7xl mx-auto space-y-32">
                
// //                 {/* HEADER: Dynamic Title based on Mood */}
// //                 <motion.div 
// //                    key={currentMood.id}
// //                    initial={{ y: 20, opacity: 0 }}
// //                    animate={{ y: 0, opacity: 1 }}
// //                    className="text-center space-y-4"
// //                 >
// //                     <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight">
// //                         {currentMood.label}
// //                     </h2>
// //                     <p className="text-white/40 font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
// //                         {currentMood.description}
// //                     </p>
// //                 </motion.div>

// //                 {/* --- ACT 3: AAYAM ORIGINALS (Phantom Player) --- */}
// //                 <section id="originals">
// //                    <ContentGrid videos={PLAY_LIST} currentMoodId={currentMood.id} />
// //                 </section>

// //                 {/* --- ACT 4: THE ENSEMBLE (Spotlight Cards) --- */}
// //                 <section id="ensemble">
// //                   <div className="mb-12 border-l-2 border-amber-500 pl-6">
// //                     <h3 className="text-3xl font-serif text-white">The Ensemble</h3>
// //                     <p className="text-white/40 text-sm mt-2">
// //                         The dual lives of IITM Students. Tap the <span className="text-amber-500">mic</span> to hear their truth.
// //                     </p>
// //                   </div>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //                     {TEAM_LIST.map((member) => (
// //                       <SpotlightCard key={member.id} member={member} />
// //                     ))}
// //                   </div>
// //                 </section>

// //                 {/* --- ACT 5: THE ARCHIVES (Certificates) --- */}
// //                 <section id="legacy" className="flex justify-center">
// //                    <CertificateSearch />
// //                 </section>

// //              </div>
// //           </div>

// //           {/* C. THE NAVIGATION RIBBON (Fixed at Bottom) */}
// //           <PrismMenu currentMood={currentMood} onMoodChange={setCurrentMood} />
          
// //         </motion.div>
// //       )}

// //       {/* --- FOOTER --- */}
// //       {stageReady && <Footer />}

// //     </main>
// //   );
// // }


// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import GhostLight from "@/components/intro/GhostLight";
// // // import PrismMenu from "@/components/navigation/PrismMenu";
// // // import { NAVARASA_MOODS, Mood } from "@/lib/constants";
// // // import ContentGrid from "@/components/content/ContentGrid";
// // // import { PLAY_LIST } from "@/lib/content";
// // // import SpotlightCard from "@/components/team/SpotlightCard";
// // // import PhantomPlayer from "@/components/content/PhantomPlayer";
// // // import { TEAM_LIST } from "@/lib/team";
// // // import CertificateSearch from "@/components/legacy/CertificationSearch";
// // // import Footer from "@/components/layout/Footer";
// // // export default function Home() {
// // //   const [stageReady, setStageReady] = useState(false);
// // //   const [isFirstVisit, setIsFirstVisit] = useState(true);
// // //   const [currentMood, setCurrentMood] = useState<Mood>(NAVARASA_MOODS[0]); // Default: All

// // //   // ... (Keep the localStorage logic from Act 1 here) ...
// // //   useEffect(() => {
// // //      const hasVisited = localStorage.getItem("aayam_visited");
// // //      if (hasVisited) {
// // //        setIsFirstVisit(false);
// // //        setStageReady(true);
// // //      }
// // //   }, []);

// // //   const handleIgnition = () => {
// // //     localStorage.setItem("aayam_visited", "true");
// // //     setStageReady(true);
// // //   };

// // //   return (
// // //     <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-amber-500/30">
      
// // //       {/* ACT 1: The Ignition */}
// // //       {isFirstVisit && !stageReady && <GhostLight onIgnite={handleIgnition} />}

// // //       {/* ACT 2: The Prism Environment */}
// // //       {stageReady && (
// // //         <motion.div
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ duration: 1 }}
// // //           className="relative w-full h-full min-h-screen"
// // //         >
// // //           {/* THE ATMOSPHERE ENGINE (Background Glow) */}
// // //           {/* We animate the gradient color based on currentMood.color */}
// // //           <motion.div 
// // //             className="fixed inset-0 pointer-events-none z-0"
// // //             animate={{
// // //               background: `radial-gradient(circle at 50% -20%, ${currentMood.color}15 0%, rgba(5,5,5,0) 70%)`
// // //             }}
// // //             transition={{ duration: 1.5 }} // Slow, breathing transition
// // //           />
          
// // //           {/* The Content Container (Where Acts 3 & 4 will live) */}
// // //           <div className="relative z-10 p-8 pt-24 pb-32">
// // //              <div className="max-w-7xl mx-auto">
                
// // //                 {/* Dynamic Title based on Mood */}
// // //                 <motion.div 
// // //                    key={currentMood.id} // Re-animates text on change
// // //                    initial={{ y: 20, opacity: 0 }}
// // //                    animate={{ y: 0, opacity: 1 }}
// // //                    className="mb-12 text-center"
// // //                 >
// // //                     <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
// // //                         {currentMood.label}
// // //                     </h2>
// // //                     <p className="mt-2 text-white/40 font-mono text-sm tracking-widest uppercase">
// // //                         {currentMood.description}
// // //                     </p>
// // //                 </motion.div>

// // //                 {/* PLACEHOLDER FOR CONTENT GRID (ACT 3) */}
// // //                 {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50 border-2 border-dashed border-white/10 p-12 rounded-lg text-center text-white/20">
// // //                     [Act 3: The Content Grid will load here filtered by "{currentMood.id}"]
// // //                 </div> */}
// // //                 <div className="mt-8">
// // //                    <ContentGrid videos={PLAY_LIST} currentMoodId={currentMood.id} />
// // //                 </div>
// // //                 {/* SPOTLIGHT TEAM CARDS (ACT 4) */}
// // //                 {/* ACT 4: THE ENSEMBLE */}
// // //                 <div className="mt-32 mb-20">
// // //                   <div className="mb-12 flex items-end justify-between">
// // //                     <div>
// // //                       <h3 className="text-3xl font-serif text-white">The Ensemble</h3>
// // //                       <p className="text-white/40 text-sm mt-2">Tap the microphone to hear their story.</p>
// // //                     </div>
// // //                   </div>

// // //                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// // //                     {TEAM_LIST.map((member) => (
// // //                       <SpotlightCard key={member.id} member={member} />
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //                 {/* ACT 5: THE LEGACY (Certificates) */}
// // //                 <div className="mt-32 mb-20 px-4">
// // //                   <CertificateSearch />
// // //                 </div>

// // //                 {/* THE END */}
// // //                 <Footer />
// // //              </div>
// // //           </div>

// // //           {/* THE NAVIGATION RIBBON */}
// // //           <PrismMenu currentMood={currentMood} onMoodChange={setCurrentMood} />
          
// // //         </motion.div>
// // //       )}
// // //     </main>
// // //   );
// // // }