// import { createClient } from "@/lib/supabase/server"; // Import the server client creator
// import ClientWrapper from "@/components/layout/ClientWrapper";
// import PrismMenu from "@/components/layout/PrismMenu";
// import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; 
// import { EnsembleMember } from "@/types/schema";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "The Lineage | Aayam",
//   description: "The neural network of art.",
// };

// export const revalidate = 0; // Disable cache for debugging (Set to 60 later)

// export default async function EnsemblePage() {
//   // CRITICAL FIX: 'createClient' is async in Next.js 15. We MUST await it.
//   const supabase = await createClient(); 

//   // 1. FETCH REAL DATA
//   // We fetch ALL tenures sorted by Rank Priority (1 = Crown, 100 = Cloud)
//   const { data: tenures, error } = await supabase
//     .from('tenures')
//     .select(`
//       *,
//       member:team_members (
//         id, name, slug, bio, image_url, voice_note_url, color, social_links
//       )
//     `)
//     //.eq('year', '2025-2026') // <--- ENABLE THIS LATER to filter by year
//     .order('sort_order', { ascending: true });

//   if (error) {
//       console.error("Ensemble Fetch Error:", error);
//   }

//   // 2. MAP TO UI TYPE
//   // The 'member' object might be null if referential integrity was broken, so we filter those out.
//   const castList: EnsembleMember[] = (tenures || [])
//     .filter((t: any) => t.member !== null) 
//     .map((t: any) => ({
//       id: t.member.id,
//       name: t.member.name,
//       slug: t.member.slug,
//       role: t.role_student,      
//       rank: t.rank,              
//       department: t.department,
//       image_url: t.member.image_url,
//       bio: t.member.bio,
//       year: t.year,
//       social_links: t.member.social_links,
//       audio_url: t.member.voice_note_url
//     }));

//   return (
//     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
//       <ClientWrapper>
//         {/* Pass Real Data to the Component */}
//         <TheNarrativeThread members={castList} currentYear="2026" />
//         <PrismMenu />
//       </ClientWrapper>
//     </main>
//   );
// }

import { createClient } from "@/lib/supabase/server";
import { getEnsemble } from "@/lib/api";
import ClientWrapper from "@/components/layout/ClientWrapper";
import PrismMenu from "@/components/layout/PrismMenu";
import TheNarrativeThread from "@/components/ensemble/TheNarrativeThread"; 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Lineage | Aayam",
  description: "The neural network of art.",
};

export const revalidate = 0; // Dynamic for search params

// 1. ACCEPT SEARCH PARAMS (The Trigger)
export default async function EnsemblePage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const params = await searchParams;
  const currentYear = params.year || '2025-2026'; // Default to current

  // 2. FETCH DATA BASED ON URL
  const castList = await getEnsemble(currentYear);

  return (
    <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] overflow-x-hidden selection:bg-gold-500/30">
      <ClientWrapper>
        {/* Pass data AND the active year to the component */}
        <TheNarrativeThread members={castList} currentYear={currentYear} />
        <PrismMenu />
      </ClientWrapper>
    </main>
  );
}