// // // src/app/ensemble/[slug]/page.tsx

// // import { getMemberProfile, getEnsemble } from "@/lib/api";
// // import ClientWrapper from "@/components/layout/ClientWrapper";
// // import PrismMenu from "@/components/layout/PrismMenu";
// // import ProfileArchitect from "@/components/profile/ProfileArchitect";
// // import { notFound } from "next/navigation";
// // import type { Metadata } from "next";
// // import { createStaticClient } from "@/lib/supabase/server";

// // // 1. STATIC PARAMS (Keep this, it's correct)
// // export async function generateStaticParams() {
// //   const supabase = createStaticClient(); // Use static client for build-time data fetching  
// //   const members = await getEnsemble('2025-26', supabase);
  
// //   return members.map((member) => ({
// //     slug: member.slug,
// //   }));
// // }

// // // 2. METADATA (Updated for Async Params)
// // export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
// //   const { slug } = await params; // <--- AWAIT THIS
// //   const member = await getMemberProfile(slug);
// //   if (!member) return { title: "Artist Not Found" };
  
// //   return {
// //     title: `${member.name} | The Lineage`,
// //     description: member.bio || "An artist of the Aayam Ensemble.",
// //   };
// // }

// // // 3. THE PAGE (Updated for Async Params)
// // export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
// //   const { slug } = await params; // <--- AWAIT THIS
  
// //   // Fetch Data
// //   const member = await getMemberProfile(slug);

// //   // Debugging: If this logs NULL in your terminal, check your Database Slugs!
// //   console.log(`[ProfilePage] Fetching slug: ${slug} -> Result:`, member ? "Found" : "NULL");

// //   if (!member) {
// //     notFound();
// //   }

// //   return (
// //     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] selection:bg-white/20">
// //       <ClientWrapper>
// //         <ProfileArchitect member={member} />
// //         <PrismMenu />
// //       </ClientWrapper>
// //     </main>
// //   );
// // }


// import { getMemberProfile, getEnsemble, getAllMemberSlugs } from "@/lib/api";
// import { createStaticClient } from "@/lib/supabase/server"; // The Build-Time Fix
// import ClientWrapper from "@/components/layout/ClientWrapper";
// import PrismMenu from "@/components/layout/PrismMenu";
// import ProfileArchitect from "@/components/profile/ProfileArchitect";
// import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import { createAdminClient } from "@/lib/supabase/admin";
// // --- 1. THE STATIC BUILDER (Speed) ---
// // This tells Next.js: "Find every member in the DB and build their page NOW."
// // No loading spinners. Instant access.
// export async function generateStaticParams() {
//   // const supabase = createStaticClient();
//   const adminClient = createAdminClient(); //No cookies required
//   const members = await getAllMemberSlugs(adminClient); // Pass it here
  
//   return members.map((member) => ({
//     slug: member.slug,
//   }));
// }

// // --- 2. THE META ARCHITECT (SEO) ---
// // This ensures when you share the link on WhatsApp/LinkedIn, 
// // it shows the Artist's Face and Bio, not generic text.
// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const { slug } = await params;
//   const member = await getMemberProfile(slug);
  
//   if (!member) {
//     return {
//       title: "Artist Not Found | Aayam",
//       description: "The requested artist profile does not exist in the archive."
//     };
//   }
  
//   return {
//     title: `${member.name} | The Lineage`,
//     description: member.bio || `Explore the artistic journey of ${member.name} at Aayam.`,
//     openGraph: {
//       title: `${member.name} | The Lineage`,
//       description: member.bio || "Aayam Drama Society",
//       images: member.image_url ? [member.image_url] : [],
//     }
//   };
// }

// // --- 3. THE MAIN PAGE (The Stage) ---
// export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
  
//   // Fetch the full "Protagonist" data
//   const member = await getMemberProfile(slug);

//   // If they don't exist, show the 404 Curtain
//   if (!member) {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] selection:bg-white/20">
//       <ClientWrapper>
        
//         {/* THE MASTERPIECE COMPONENT */}
//         <ProfileArchitect member={member} />

//         {/* The Navigation Prism (Always accessible) */}
//         <PrismMenu />
        
//       </ClientWrapper>
//     </main>
//   );
// }

import { getMemberProfile, getAllMemberSlugs } from "@/lib/api";
import { createAdminClient } from "@/lib/supabase/admin"; // <--- THE KEY TO STATIC GENERATION
import ClientWrapper from "@/components/layout/ClientWrapper";
import PrismMenu from "@/components/layout/PrismMenu";
import ProfileArchitect from "@/components/profile/ProfileArchitect"; // Reusing the Architect for consistent design
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// --- 1. THE STATIC BUILDER (Speed) ---
// This runs at BUILD time. No cookies exist here.
export async function generateStaticParams() {
  // We explicitly use the Admin Client to bypass cookie checks
  const adminClient = createAdminClient();
  
  // We pass this client to the API so it uses the Service Key
  const members = await getAllMemberSlugs(adminClient); 
  
  return members.map((member) => ({
    slug: member.slug,
  }));
}

// --- 2. THE META ARCHITECT (SEO) ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // Fetch data for SEO tags
  const member = await getMemberProfile(slug);
  
  if (!member) {
    return {
      title: "Member Not Found | Aayam",
      description: "The requested profile does not exist in the archive."
    };
  }
  
  return {
    title: `${member.name} | The Lineage`,
    description: member.bio || `Explore the journey of ${member.name} at Aayam.`,
    openGraph: {
      title: `${member.name} | The Lineage`,
      description: member.bio || "Aayam Drama Society",
      images: member.image_url ? [member.image_url] : [],
    }
  };
}

// --- 3. THE MAIN PAGE (The Stage) ---
export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch the full "Dossier" (Tenures + Credits)
  // At runtime, this uses the default client (cookies allowed), which is fine.
  const member = await getMemberProfile(slug);

  // If they don't exist, show the 404 Curtain
  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-[#020202] text-[#F0F0F0] selection:bg-gold-500/30">
      <ClientWrapper>
        
        {/* THE MASTERPIECE COMPONENT */}
        {/* We use ProfileArchitect here because it's the perfect layout for a deep dive */}
        <ProfileArchitect member={member} />

        {/* The Navigation Prism (Always accessible) */}
        <PrismMenu />
        
      </ClientWrapper>
    </main>
  );
}