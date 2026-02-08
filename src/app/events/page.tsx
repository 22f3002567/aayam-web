// import type { Metadata } from "next";
// import ClientWrapper from "@/components/layout/ClientWrapper";
// import PrismMenu from "@/components/layout/PrismMenu";
// import ActOneImprovisation from "@/components/events/ActOneImprovisation";
// import ActTwoCueSheet from "@/components/events/ActTwoCueSheet";
// import ActThreeMemory from "@/components/events/ActThreeMemory";
// import { getActiveChallenge, getEvents } from "@/lib/api";

// export const metadata: Metadata = {
//   title: "The Living Script | Aayam",
//   description: "A continuous production. Challenges, Schedules, and Memories.",
// };

// export default async function EventsPage() {
//   const [activeChallenge, allEvents] = await Promise.all([
//     getActiveChallenge(),
//     getEvents()
//   ]);

//   const now = new Date();
//   const futureEvents = allEvents.filter(e => new Date(e.date) >= now);
//   const pastEvents = allEvents.filter(e => new Date(e.date) < now);

//   return (
//     <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] selection:bg-red-500/30">
//       <ClientWrapper>
        
//         {/* ACT I: THE CHALLENGE (Writer's Room) */}
//         {activeChallenge ? (
//             <ActOneImprovisation challenge={activeChallenge} />
//         ) : (
//             // Fallback Intro if no challenge
//             <div className="h-[50vh] flex items-center justify-center font-mono text-xs text-white/20 uppercase tracking-widest">
//                 [ SCENE MISSING: WAITING FOR DIRECTOR ]
//             </div>
//         )}

//         {/* ACT II: THE CUE SHEET (Backstage) */}
//         {/* Only show if cues exist */}
//         {futureEvents.length > 0 && <ActTwoCueSheet events={futureEvents} />}

//         {/* ACT III: THE MEMORY (The Archive) */}
//         {pastEvents.length > 0 && <ActThreeMemory events={pastEvents} />}

//         <PrismMenu />
//       </ClientWrapper>
//     </main>
//   );
// }


import type { Metadata } from "next";
import ClientWrapper from "@/components/layout/ClientWrapper";
import PrismMenu from "@/components/layout/PrismMenu";
import LuminousTimeline from "@/components/events/LuminousTimeline";
import { getActiveChallenge, getEvents } from "@/lib/api";

export const metadata: Metadata = {
  title: "Timeline | Aayam",
  description: "The Luminous Path. Active signals, upcoming horizons, and the archive of echoes.",
};

export default async function EventsPage() {
  // 1. FETCH
  const [activeChallenge, allEvents] = await Promise.all([
    getActiveChallenge(),
    getEvents()
  ]);

  // 2. SORT & FILTER
  const now = new Date();
  // Future events: Ascending (Soonest first)
  const futureEvents = allEvents
    .filter(e => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Past events: Descending (Most recent first)
  const pastEvents = allEvents
    .filter(e => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="w-full bg-[#020202] selection:bg-red-500/30">
      <ClientWrapper>
        
        <LuminousTimeline 
            challenge={activeChallenge}
            futureEvents={futureEvents}
            pastEvents={pastEvents}
        />

        <PrismMenu />
      </ClientWrapper>
    </main>
  );
}