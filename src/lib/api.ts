// // src/lib/api.ts
// import { createClient } from "@/lib/supabase/server";
// import { Play, TeamMember, PlayCategory } from "@/types/schema";
// import { RasaConfig } from "./rasa";
// import { EnsembleMember, AcademicYear } from "@/types/schema";
// export async function getLatestOriginal(): Promise<Play | null> {
//   const supabase = await createClient();
//   try {
//     const { data } = await supabase
//       .from('plays')
//       .select('*')
//       .is('deleted_at', null)
//       .order('release_date', { ascending: false })
//       .limit(1)
//       .single();
    
//     return data as Play;
//   } catch (err) {
//     return null; // Fail silently, show nothing
//   }
// }

// export async function getSecretary(): Promise<TeamMember | null> {
//   const supabase = await createClient();
//   try {
//     // 1. Fetch the Tenure (Role) AND the Member details
//     const { data, error } = await supabase
//       .from('tenures')
//       .select(`
//         role_student,
//         department,
//         member:team_members (
//           id, name, slug, image_url, bio, social_links
//         )
//       `)
//       .eq('role_student', 'Secretary')
//       .is('deleted_at', null)
//       .maybeSingle(); // Use maybeSingle to avoid 406 errors if 0 rows found

//     if (error || !data || !data.member) {
//       console.warn("Brain: Secretary not found or data incomplete.");
//       return null;
//     }

//     // 2. THE MAPPER (The Safety Net)
//     // We merge the Role info (from Tenure) into the Member object
//     // This creates the perfect 'TeamMember' shape our UI expects.
//     const memberData = Array.isArray(data.member) ? data.member[0] : data.member;

//     return {
//       ...memberData,
//       role_student: data.role_student,
//       department: data.department
//     } as TeamMember;

//   } catch (err) {
//     console.error("Brain Failure:", err);
//     return null;
//   }
// }



// // 3. THE SEEKER (Find specific play by Slug)
// export async function getPlayBySlug(slug: string): Promise<Play | null> {
//   const supabase = await createClient();
  
//   try {
//     const { data, error } = await supabase
//       .from('plays')
//       .select('*')
//       .eq('slug', slug)
//       .is('deleted_at', null)
//       .single();

//     if (error) {
//       console.warn(`Brain Warning: Play '${slug}' not found.`);
//       return null;
//     }

//     return data as Play;
//   } catch (err) {
//     console.error("Brain Failure:", err);
//     return null;
//   }
// }


// // // 4. THE CASTING CALL (Fetch all active members)
// // export async function getEnsemble(): Promise<TeamMember[]> {
// //   const supabase = await createClient();
  
// //   try {
// //     // Fetch members and their roles via the 'tenures' table
// //     // This is a complex join: Tenures -> TeamMembers
// //     const { data, error } = await supabase
// //       .from('tenures')
// //       .select(`
// //         role_student,
// //         department,
// //         member:team_members (
// //           id, name, slug, image_url, bio, social_links
// //         )
// //       `)
// //       .is('deleted_at', null)
// //       .is('end_date', null) // Only active members
// //       .order('priority', { ascending: true }); // Ensure your DB has a 'priority' column for sorting, or sort by name

// //     if (error) {
// //       console.warn("Brain Warning: Ensemble empty.");
// //       return [];
// //     }

// //     // MAPPER: Flatten the structure
// //     return data.map((row: any) => ({
// //       ...row.member, // The person details
// //       role_student: row.role_student, // The specific role for this tenure
// //       department: row.department
// //     })) as TeamMember[];

// //   } catch (err) {
// //     console.error("Brain Failure (Ensemble):", err);
// //     return [];
// //   }
// // }
// // src/lib/api.ts

// // // 5. THE ARCHIVIST (Fetch all plays for the grid)
// // export async function getAllPlays(): Promise<Play[]> {
// //   const supabase = await createClient();
  
// //   try {
// //     const { data, error } = await supabase
// //       .from('plays')
// //       .select('*')
// //       .is('deleted_at', null)
// //       .order('release_date', { ascending: false }); // Newest first

// //     if (error) {
// //       console.warn("Brain Warning: Archive empty.");
// //       return [];
// //     }

// //     return data as Play[];
// //   } catch (err) {
// //     console.error("Brain Failure (Archive):", err);
// //     return [];
// //   }
// // }


// // 5. THE SCALABLE ARCHIVIST (Fetch plays with pagination)
// // src/lib/api.ts

// // export async function getPlays(
// //   page: number = 1, 
// //   limit: number = 12,
// //   category?: PlayCategory | 'all' // Optional Filter
// // ): Promise<Play[]> {
// //   const supabase = await createClient();
// //   const from = (page - 1) * limit;
// //   const to = from + limit - 1;

// //   try {
// //     let query = supabase
// //       .from('plays')
// //       .select('*')
// //       .is('deleted_at', null);

// //     // 1. APPLY FILTER (If not 'all')
// //     if (category && category !== 'all') {
// //       query = query.eq('category', category);
// //     }

// //     // 2. APPLY THE CURATOR'S SORTING
// //     // First, push High Priority items to the top.
// //     // Then, sort by Newest.
// //     query = query
// //       .order('featured_score', { ascending: false }) 
// //       .order('release_date', { ascending: false })
// //       .range(from, to);

// //     const { data, error } = await query;

// //     if (error) {
// //       console.warn(`Brain Warning: Fetch failed for ${category}.`);
// //       return [];
// //     }

// //     return data as Play[];
// //   } catch (err) {
// //     console.error("Brain Failure (Archive):", err);
// //     return [];
// //   }
// // }

// // 5. THE SCALABLE ARCHIVIST (Fetch plays with pagination and category filter)
// export async function getPlays(
//   page: number = 1, 
//   limit: number = 12,
//   category: PlayCategory | 'all' = 'all'
// ): Promise<Play[]> {
//   const supabase = await createClient();
//   const from = (page - 1) * limit;
//   const to = from + limit - 1;

//   try {
//     let query = supabase
//       .from('plays')
//       .select('*')
//       .is('deleted_at', null);

//     if (category !== 'all') {
//       query = query.eq('category', category);
//     }

//     query = query
//       .order('featured_score', { ascending: false }) // Admin Priority
//       .order('release_date', { ascending: false })   // Recency
//       .range(from, to);

//     const { data, error } = await query;

//     if (error) {
//       console.warn(`Brain Warning: Fetch failed for ${category}.`);
//       return [];
//     }

//     return data as Play[];
//   } catch (err) {
//     console.error("Brain Failure (Archive):", err);
//     return [];
//   }
// }

// // src/lib/api.ts

// // 6. THE CONSTELLATION (Fetch Team by Year)
// export async function getEnsemble(year: AcademicYear = '2025-26'): Promise<EnsembleMember[]> {
//   const supabase = await createClient();

//   try {
//     // In a real Supabase setup, you would join 'profiles' with 'tenures'.
//     // For now, assuming we query a view or a table designed for tenures.
//     const { data, error } = await supabase
//       .from('ensemble_view') // You likely need a View in SQL for this join
//       .select('*')
//       .eq('year', year)
//       // SORT BY GRAVITY: Zenith (1) -> Crown (2) -> Orbit (3) -> Cloud (4)
//       .order('rank_order', { ascending: true }) 
//       .order('name', { ascending: true });

//     if (error) {
//       console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`);
//       return [];
//     }

//     return data as EnsembleMember[];
//   } catch (err) {
//     console.error("Brain Failure (Ensemble):", err);
//     return [];
//   }
// }

// // src/lib/api.ts
// import { createClient } from "@/lib/supabase/server";
// import { Play, TeamMember, PlayCategory, EnsembleMember, MemberProfile } from "@/types/schema";

// // --- 1. THE LATEST ORIGINAL ---
// export async function getLatestOriginal(): Promise<Play | null> {
//   const supabase = await createClient();
//   try {
//     const { data } = await supabase
//       .from('plays')
//       .select('*')
//       .is('deleted_at', null)
//       .order('release_date', { ascending: false })
//       .limit(1)
//       .single();
    
//     return data as Play;
//   } catch (err) {
//     return null;
//   }
// }

// // --- 2. THE SECRETARY (Landing Page) ---
// export async function getSecretary(): Promise<TeamMember | null> {
//   const supabase = await createClient();
//   try {
//     const { data, error } = await supabase
//       .from('tenures')
//       .select(`
//         role_student,
//         department,
//         member:team_members (
//           id, name, slug, image_url, bio, social_links, color, voice_note_url
//         )
//       `)
//       .eq('role_student', 'Secretary')
//       .is('deleted_at', null)
//       .maybeSingle();

//     if (error || !data || !data.member) {
//       return null;
//     }

//     // Flattening for the basic TeamMember type
//     const m = Array.isArray(data.member) ? data.member[0] : data.member;
//     return {
//       ...m,
//       role_student: data.role_student,
//       department: data.department
//     } as TeamMember;

//   } catch (err) {
//     console.error("Brain Failure:", err);
//     return null;
//   }
// }

// // --- 3. THE SEEKER (Play by Slug) ---
// export async function getPlayBySlug(slug: string): Promise<Play | null> {
//   const supabase = await createClient();
  
//   try {
//     const { data, error } = await supabase
//       .from('plays')
//       .select('*')
//       .eq('slug', slug)
//       .is('deleted_at', null)
//       .single();

//     if (error) return null;
//     return data as Play;
//   } catch (err) {
//     return null;
//   }
// }

// // --- 4. THE ARCHIVIST (Pagination) ---
// export async function getPlays(
//   page: number = 1, 
//   limit: number = 12,
//   category: PlayCategory | 'all' = 'all'
// ): Promise<Play[]> {
//   const supabase = await createClient();
//   const from = (page - 1) * limit;
//   const to = from + limit - 1;

//   try {
//     let query = supabase
//       .from('plays')
//       .select('*')
//       .is('deleted_at', null);

//     if (category !== 'all') {
//       query = query.eq('category', category);
//     }

//     query = query
//       .order('featured_score', { ascending: false })
//       .order('release_date', { ascending: false })
//       .range(from, to);

//     const { data, error } = await query;
//     if (error) return [];

//     return data as Play[];
//   } catch (err) {
//     return [];
//   }
// }

// // --- 5. THE CONSTELLATION (Ensemble Page) ---
// // This is the new logic connecting Tenures + Navarasa Colors
// export async function getEnsemble(year: string = '2025-26'): Promise<EnsembleMember[]> {
//   const supabase = await createClient();

//   try {
//     // 1. COMPLEX JOIN FETCH
//     const { data: tenures, error } = await supabase
//       .from('tenures')
//       .select(`
//         role_student,
//         department,
//         rank,
//         sort_order,
//         year,
//         member:team_members (
//           id, name, slug, bio, image_url, voice_note_url, color, social_links
//         )
//       `)
//       .eq('year', year)
//       .is('deleted_at', null)
//       // Sort by Hierarchy (1. Secretary, 2. Heads...)
//       .order('sort_order', { ascending: true });

//     if (error) {
//       console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`, error);
//       return [];
//     }

//     // 2. DATA FLATTENING (The Adapter)
//     // We map DB columns to the strictly typed EnsembleMember interface
//     return (tenures || []).map((t: any) => ({
//       id: t.member.id,
//       name: t.member.name,
//       slug: t.member.slug,
//       role: t.role_student, // DB: role_student -> UI: role
//       department: t.department,
//       bio: t.member.bio,
//       year: t.year,
//       rank: t.rank,         
//       sort_order: t.sort_order, 
//       image_url: t.member.image_url,
//       audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
//       color: t.member.color || '#eab308',  // Fallback to Gold
//       social_links: t.member.social_links
//     })) as EnsembleMember[];

//   } catch (err) {
//     console.error("Brain Failure (Ensemble):", err);
//     return [];
//   }
// }


// // src/lib/api.ts
// // ... (Previous imports)

// // --- 6. THE PROTAGONIST (Full Profile Fetch) ---
// export async function getMemberProfile(slug: string): Promise<MemberProfile | null> {
//   const supabase = await createClient();

//   try {
//     // 1. Fetch Core Identity
//     const { data: member, error } = await supabase
//       .from('team_members')
//       .select('*')
//       .eq('slug', slug)
//       .is('deleted_at', null)
//       .single();

//     if (error || !member) return null;

//     // 2. Fetch History (Tenures)
//     const { data: tenures } = await supabase
//       .from('tenures')
//       .select('role_student, year, is_current')
//       .eq('member_id', member.id)
//       .order('year', { ascending: false }); // Newest first

//     // 3. Fetch Filmography (Credits -> Plays)
//     const { data: credits } = await supabase
//       .from('credits')
//       .select(`
//         id,
//         role_artist,
//         play:plays (
//           title, slug, poster_url, release_date
//         )
//       `)
//       .eq('member_id', member.id);

//     // 4. THE ASSEMBLY
//     return {
//       id: member.id,
//       name: member.name,
//       slug: member.slug,
//       bio: member.bio,
//       image_url: member.image_url,
//       audio_url: member.voice_note_url,
//       color: member.color || '#eab308',
//       social_links: member.social_links,
      
//       // Map Tenures
//       tenures: (tenures || []).map((t: any) => ({
//         role: t.role_student,
//         year: t.year,
//         is_current: t.is_current
//       })),
      
//       // Map Credits
//       credits: (credits || []).map((c: any) => ({
//         id: c.id,
//         role: c.role_artist,
//         play: {
//           title: c.play.title,
//           slug: c.play.slug,
//           poster_url: c.play.poster_url,
//           year: new Date(c.play.release_date).getFullYear().toString()
//         }
//       })),
      
//       // Default fields to satisfy EnsembleMember type (not strictly used here but good for type safety)
//       role: tenures?.[0]?.role_student || 'Member',
//       department: member.department || '',
//       rank: 'CLOUD',
//       sort_order: 99,
//       year: 'N/A'
//     };

//   } catch (err) {
//     console.error("Brain Failure (Profile):", err);
//     return null;
//   }
// }



// src/lib/api.ts
import { createClient } from "@/lib/supabase/server";
import { Play, TeamMember, PlayCategory, EnsembleMember, MemberProfile } from "@/types/schema";
import { RasaConfig } from "./rasa";
import { AcademicYear } from "@/types/schema";
import { Metadata } from "next";
import React from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { desc } from "framer-motion/client";
import { create } from "domain";
import { EventItem } from "@/types/schema";
// --- 1. THE LATEST ORIGINAL ---
export async function getLatestOriginal(): Promise<Play | null> {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from('plays')
      .select('*')
      .is('deleted_at', null)
      .order('release_date', { ascending: false })
      .limit(1)
      .single();
    
    return data as Play;
  } catch (err) {
    return null;
  }
}

// --- 2. THE SECRETARY (Landing Page) ---
export async function getSecretary(): Promise<TeamMember | null> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('tenures')
      .select(`
        role_student,
        department,
        member:team_members (
          id, name, slug, image_url, bio, social_links, color, voice_note_url
        )
      `)
      .eq('role_student', 'Secretary')
      .is('deleted_at', null)
      .maybeSingle();

    if (error || !data || !data.member) {
      return null;
    }

    // Flattening for the basic TeamMember type
    const m = Array.isArray(data.member) ? data.member[0] : data.member;
    return {
      ...m,
      role_student: data.role_student,
      department: data.department
    } as TeamMember;

  } catch (err) {
    console.error("Brain Failure:", err);
    return null;
  }
}

// // --- 3. THE SEEKER (Play by Slug) ---
// export async function getPlayBySlug(slug: string): Promise<Play | null> {
//   const supabase = await createClient();
  
//   try {
//     const { data, error } = await supabase
//       .from('plays')
//       .select('*')
//       .eq('slug', slug)
//       .is('deleted_at', null)
//       .single();

//     if (error) return null;
//     return data as Play;
//   } catch (err) {
//     return null;
//   }
// }

// src/lib/api.ts

// --- 3. THE SEEKER (Play by Slug + Cast & Crew) ---
export async function getPlayBySlug(slug: string): Promise<Play | null> {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from('plays')
      .select(`
        *,
        credits (
          role_artist,
          team_members (
            name,
            slug,
            image_url,
            color
          )
        )
      `)
      .eq('slug', slug)
      .is('deleted_at', null)
      .single();

    if (error) {
      console.warn(`Brain Warning: Play '${slug}' not found.`);
      return null;
    }

    return data as Play;
  } catch (err) {
    console.error("Brain Failure:", err);
    return null;
  }
}

// --- 4. THE ARCHIVIST (Pagination) ---
export async function getPlays(
  page: number = 1, 
  limit: number = 12,
  category: PlayCategory | 'all' = 'all'
): Promise<Play[]> {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase
      .from('plays')
      .select('*')
      .is('deleted_at', null);

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    query = query
      .order('featured_score', { ascending: false })
      .order('release_date', { ascending: false })
      .range(from, to);

    const { data, error } = await query;
    if (error) return [];

    return data as Play[];
  } catch (err) {
    return [];
  }
}

// --- 5. THE CONSTELLATION (Ensemble Page) ---
// This is the new logic connecting Tenures + Navarasa Colors
// export async function getEnsemble(year: string = '2025-26', client?: SupabaseClient): Promise<EnsembleMember[]> {
//   const supabase = client ?? await createClient();

//   try {
//     // 1. COMPLEX JOIN FETCH
//     const { data: tenures, error } = await supabase
//       .from('tenures')
//       .select(`
//         role_student,
//         department,
//         rank,
//         sort_order,
//         year,
//         member:team_members (
//           id, name, slug, bio, image_url, voice_note_url, color, social_links
//         )
//       `)
//       .eq('year', year)
//       .is('deleted_at', null)
//       // Sort by Hierarchy (1. Secretary, 2. Heads...)
//       .order('sort_order', { ascending: true });

//     if (error) {
//       console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`, error);
//       return [];
//     }

//     // 2. DATA FLATTENING (The Adapter)
//     // We map DB columns to the strictly typed EnsembleMember interface
//     return (tenures || []).map((t: any) => ({
//       id: t.member.id,
//       name: t.member.name,
//       slug: t.member.slug,
//       role: t.role_student, // DB: role_student -> UI: role
//       department: t.department,
//       bio: t.member.bio,
//       year: t.year,
//       rank: t.rank,         
//       sort_order: t.sort_order, 
//       image_url: t.member.image_url,
//       audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
//       color: t.member.color || '#eab308',  // Fallback to Gold
//       social_links: t.member.social_links
//     })) as EnsembleMember[];

//   } catch (err) {
//     console.error("Brain Failure (Ensemble):", err);
//     return [];
//   }
// }


// ---5. THE CONSTELLATION (Ensemble Page)---
export async function getEnsemble(year: string = '2025-26', client?: SupabaseClient): Promise<EnsembleMember[]> {
  const supabase = client ?? await createClient();

  try {
    let query = supabase
      .from('tenures')
      .select(`
        role_student,
        department,
        rank,
        sort_order,
        year,
        member:team_members (
          id, name, slug, bio, image_url, voice_note_url, color, social_links
          )
        `)
        .is('deleted_at', null);
    
    // Logic: Faculty vs Year Filter
    if (year === 'faculty') {
      //Fetch anyone with ZENITH RANK OR 'Faculty' in title, regardless of year
      // we use .or() to be safe, but rank = "ZENITH" is the God mode indicator
      query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`);

    } else {
      // Regular Year-based Fetch
      query = query.eq('year', year);
    }

    const { data: tenures, error } = await query.order('sort_order', { ascending: true });
    
    if (error) {
      console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`, error);
      return [];
    }

    // Mapper (Handle Null Members Safely)
    return (tenures || [])
      .filter((t: any) => t.member !== null && t.member !== undefined)
      .map((t: any) => ({
        id: t.member.id,
        name: t.member.name,
        slug: t.member.slug,
        role: t.role_student, // DB: role_student -> UI: role
        rank: t.rank,
        department: t.department,
        image_url: t.member.image_url,
        bio: t.member.bio,
        year: t.year,
        social_links: t.member.social_links,
        audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
        color: t.member.color || '#eab308',  // Fallback to Gold
        sort_order: t.sort_order,
      })) as EnsembleMember[];



  } catch (err){
    console.error("Brain Failure (Ensemble):", err);
    return [];
  }
}

// --- 6. THE PROTAGONIST (Full Profile Fetch) ---
export async function getMemberProfile(slug: string, client?: SupabaseClient): Promise<MemberProfile | null> {
  const supabase = client ?? await createClient();

  try {
    // 1. Fetch Core Identity
    const { data: member, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single();

    if (error || !member) return null;

    // 2. Fetch History (Tenures)
    const { data: tenures } = await supabase
      .from('tenures')
      .select('role_student, year, is_current')
      .eq('member_id', member.id)
      .order('year', { ascending: false }); // Newest first

    // 3. Fetch Filmography (Credits -> Plays)
    const { data: credits } = await supabase
      .from('credits')
      .select(`
        id,
        role_artist,
        play:plays (
          title, slug, poster_url, release_date
        )
      `)
      .eq('member_id', member.id);

    // 4. THE ASSEMBLY
    return {
      id: member.id,
      name: member.name,
      slug: member.slug,
      bio: member.bio,
      image_url: member.image_url,
      audio_url: member.voice_note_url,
      color: member.color || '#eab308',
      social_links: member.social_links,
      
      // Map Tenures
      tenures: (tenures || []).map((t: any) => ({
        role: t.role_student,
        year: t.year,
        is_current: t.is_current
      })),
      
      // Map Credits
      credits: (credits || []).map((c: any) => ({
        id: c.id,
        role: c.role_artist,
        play: {
          title: c.play.title,
          slug: c.play.slug,
          poster_url: c.play.poster_url,
          year: new Date(c.play.release_date).getFullYear().toString()
        }
      })),
      
      // Default fields to satisfy EnsembleMember type (not strictly used here but good for type safety)
      role: tenures?.[0]?.role_student || 'Member',
      department: member.department || '',
      rank: 'CLOUD',
      sort_order: 99,
      year: 'N/A'
    };

  } catch (err) {
    console.error("Brain Failure (Profile):", err);
    return null;
  }
}

// src/lib/api.ts

// ... existing imports

// NEW: Fetch ALL slugs for the Artist Pages (Past & Present)
export async function getAllMemberSlugs(client?: SupabaseClient): Promise<{ slug: string }[]> {
  const supabase = client ?? await createClient();
  
  const { data, error } = await supabase
    .from('team_members')
    .select('slug')
    .is('deleted_at', null); // Fetch everyone who isn't deleted

  if (error) {
    console.warn("Brain Warning: Could not fetch member slugs.", error);
    return [];
  }
  
  return data || [];
}

// src/lib/api.ts

// ... imports

// export interface ArtistSummary {
//   id: string;
//   name: string;
//   slug: string;
//   image_url: string | null;
//   color: string;
//   label: string; // e.g. "Secretary" or "Actor" or "Alumni"
// }

// // 7. THE CAST (Fetch All Artists)
// export async function getAllArtists(): Promise<ArtistSummary[]> {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from('team_members')
//     .select(`
//       id, name, slug, image_url, color,
//       tenures (role_student, is_current),
//       credits (role_artist)
//     `)
//     .is('deleted_at', null)
//     .order('name', { ascending: true }); // Alphabetical

//   if (error) return [];

//   // SMART LABEL LOGIC:
//   // 1. If they have a Current Tenure -> Use that (e.g. "Secretary")
//   // 2. If they have Past Tenure -> "Alumni"
//   // 3. If they have Credits -> "Artist"
//   // 4. Fallback -> "Member"
  
//   return (data || []).map((m: any) => {
//     let label = "Member";
//     const currentTenure = m.tenures?.find((t: any) => t.is_current);
//     const pastTenure = m.tenures?.length > 0;
//     const hasCredits = m.credits?.length > 0;

//     if (currentTenure) label = currentTenure.role_student;
//     else if (pastTenure) label = "Alumni";
//     else if (hasCredits) label = "Artist";

//     return {
//       id: m.id,
//       name: m.name,
//       slug: m.slug,
//       image_url: m.image_url,
//       color: m.color || '#eab308',
//       label: label
//     };
//   });
// }

// src/lib/api.ts

export interface ArtistSummary {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  color: string;
  primary_role: string; // The "Big Title" (e.g. Secretary)
  roles: string[];      // The "Full List" (e.g. ["Secretary", "Actor", "Director"])
}

export async function getAllArtists(): Promise<ArtistSummary[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('team_members')
    .select(`
      id, name, slug, image_url, color,
      tenures (role_student, is_current),
      credits (role_artist)
    `)
    .is('deleted_at', null)
    .order('name', { ascending: true });

  if (error) return [];

  return (data || []).map((m: any) => {
    // 1. COLLECT ALL ROLES
    const roleSet = new Set<string>();
    
    // Add Tenure Roles
    m.tenures?.forEach((t: any) => roleSet.add(t.role_student));
    // Add Credit Roles (Actor, Director, etc.)
    m.credits?.forEach((c: any) => roleSet.add(c.role_artist));
    
    // Fallback
    if (roleSet.size === 0) roleSet.add("Member");

    // 2. DETERMINE PRIMARY (HIERARCHY) ROLE
    let primary = "Member";
    const currentTenure = m.tenures?.find((t: any) => t.is_current);
    
    if (currentTenure) primary = currentTenure.role_student;
    else if (m.tenures?.length > 0) primary = "Alumni";
    else if (m.credits?.length > 0) primary = Array.from(roleSet)[0]; // Pick first creative role

    return {
      id: m.id,
      name: m.name,
      slug: m.slug,
      image_url: m.image_url,
      color: m.color || '#eab308',
      primary_role: primary,
      roles: Array.from(roleSet) // Convert Set to Array
    };
  });
}

// src/lib/api.ts

// src/lib/api.ts

// ... existing imports

// --- 8. THE CHRONICLE (Events System) ---

// A. Get the Active "Signal" (Challenge)
export async function getActiveChallenge() {
  const supabase = await createClient();
  
  const { data } = await supabase
    .from('challenges')
    .select('*')
    .eq('status', 'active')
    .gt('deadline', new Date().toISOString()) // Only future deadlines
    .order('deadline', { ascending: true }) // Get the most urgent one
    .limit(1)
    .single();

  return data; // Returns null if no active challenge
}

// B. Get The Timeline (All Events)
export async function getEvents(): Promise<EventItem[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('events')
    .select(`
      id,
      title,
      slug,
      date,
      type,
      location,
      description,
      featured_image_url,
      poster_url,
      registration_link,
      created_at
      `)
    .is('deleted_at', null)
    .order('date', { ascending: false }); // Fetch all, we sort in UI

  if (error) {
    console.warn("Brain Warning: Could not fetch events.", error);
    return [];
  }
  return ( data as any[]) || [];
}