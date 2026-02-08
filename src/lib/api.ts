
// export async function getLatestOriginal(client?: SupabaseClient): Promise<Play | null> {
//   const supabase = client ?? await createClient();
//   try {
//     const { data } = await supabase
//       .from('plays')
//       .select('*')
//       .is('deleted_at', null)
//       .order('featured_score', { ascending: false }) // Gravity Control
//       .order('release_date', { ascending: false })
//       .limit(1)
//       .single();
    
//     return data as Play;
//   } catch (err) {
//     console.error("API Error (Latest Original):", err);
//     return null;
//   }
// }

// export async function getPlayBySlug(slug: string, client?: SupabaseClient): Promise<Play | null> {
//   const supabase = client ?? await createClient();
  
//   try {
//     const { data, error } = await supabase
//       .from('plays')
//       .select(`
//         *,
//         credits (
//           role_artist,
//           team_members (
//             name,
//             slug,
//             image_url,
//             color
//           )
//         )
//       `)
//       .eq('slug', slug)
//       .is('deleted_at', null)
//       .single();

//     if (error) {
//       console.warn(`API Warning: Play '${slug}' not found.`);
//       return null;
//     }

//     return data as any as Play;
//   } catch (err) {
//     console.error("API Error (Get Play):", err);
//     return null;
//   }
// }

// export async function getPlays(
//   page: number = 1, 
//   limit: number = 12,
//   category: PlayCategory | 'all' = 'all',
//   client?: SupabaseClient
// ): Promise<Play[]> {
//   const supabase = client ?? await createClient();
//   const from = (page - 1) * limit;
//   const to = from + limit - 1;

//   try {
//     let query = supabase.from('plays').select('*').is('deleted_at', null);

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

// // ==============================================================================
// // 2. THE ENSEMBLE (Roster & Team)
// // ==============================================================================

// export async function getSecretary(client?: SupabaseClient): Promise<TeamMember | null> {
//   const supabase = client ?? await createClient();
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
//       .ilike('role_student', '%Secretary%')
//       .eq('is_current', true)
//       .maybeSingle();

//     if (error || !data || !data.member) return null;

//     const raw = data as any;
//     const m = Array.isArray(raw.member) ? raw.member[0] : raw.member;
    
//     return {
//       ...m,
//       role_student: raw.role_student,
//       department: raw.department
//     } as TeamMember;

//   } catch (err) {
//     console.error("API Error (Secretary):", err);
//     return null;
//   }
// }

// export async function getEnsemble(year: string = '2025-2026', client?: SupabaseClient): Promise<EnsembleMember[]> {
//   const supabase = client ?? await createClient();
  
//   try {
//     let query = supabase
//       .from('tenures')
//       .select(`
//         role_student, department, rank, sort_order, year,
//         member:team_members (
//           id, name, slug, bio, image_url, voice_note_url, color, social_links
//         )
//       `)
//       .order('sort_order', { ascending: true }); // Hierachy Sort

//     if (year === 'Faculty') {
//         // 1. Faculty acrchive mode: show all faculty history (past and present)
//         query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`).order('year', { ascending: false });
//     } else {
//         // 2. Roaster Mode: show Students of this year + Active Faculty (Timeless)
//         // Syntax: Year is X OR ( Rank is Zinith And is_current is true)
//         // query = query.eq('year', year);
//         query = query.or(`year.eq.${year},and(rank.eq.ZENITH,is_current.eq.true)`);
//     }

//     const { data: rawData, error } = await query;

//     if (error || !rawData ){
//       console.warn(`API warning: Ensemple fetch empy for ${year}`);
//       return [];
//     }
    
//     // SAFE CASTING
//     const tenures = rawData as unknown as RawTenure[];
//     const seenMembers = new Set();
//     const cleanList: EnsembleMember[] = [];

//     for (const t of tenures) {
//         if (!t.member) continue;
        
//         if (year === 'Faculty') {
//             if (seenMembers.has(t.member.id)) continue;
//             seenMembers.add(t.member.id);
//         }

//         cleanList.push({
//             id: t.member.id,
//             name: t.member.name,
//             slug: t.member.slug,
//             role: t.role_student,      
//             rank: t.rank,              
//             department: t.department,
//             sort_order: t.sort_order,
//             image_url: t.member.image_url,
//             bio: t.member.bio,
//             year: t.year,
//             social_links: t.member.social_links,
//             voice_note_url: t.member.voice_note_url,
//             color: t.member.color || '#eab308',
//             audio_url: t.member.voice_note_url,
//             legacy_titles: null // Ensemble view usually relies on 'role', but can add this if needed
//         });
//     }

//     return cleanList;

//   } catch (err) {
//     console.error("API Error (Ensemble):", err);
//     return [];
//   }
// }

// // ==============================================================================
// // 3. THE ARTIST PORTFOLIO
// // ==============================================================================

// // // --- Fetch All Artists (Grid) ---
// // // UPDATED: Now respects 'legacy_titles' for pure artists
// // export async function getAllArtists(client?: SupabaseClient): Promise<ArtistSummary[]> {
// //     const supabase = client ?? await createClient();

// //     const { data: rawData, error } = await supabase
// //         .from('team_members')
// //         .select(`
// //             id, name, slug, image_url, color, legacy_titles,
// //             tenures (role_student, is_current),
// //             credits (role_artist)
// //         `)
// //         .is('deleted_at', null)
// //         .order('name', { ascending: true });

// //     if (error) return [];

// //     const data = rawData as any[];

// //     return (data || [])
// //         // GOD TIER FILTER: Include if they have Tenure OR Credit OR Legacy Titles
// //         .filter((m: any) => (
// //             m.tenures?.length > 0 || 
// //             m.credits?.length > 0 || 
// //             (m.legacy_titles && m.legacy_titles.length > 0)
// //         ))
// //         .map((m: any) => {
// //             const roleSet = new Set<string>();
            
// //             // 1. Gather all roles from all sources
// //             m.tenures?.forEach((t: any) => roleSet.add(t.role_student));
// //             m.credits?.forEach((c: any) => roleSet.add(c.role_artist));
// //             if (m.legacy_titles && Array.isArray(m.legacy_titles)) {
// //                 m.legacy_titles.forEach((t: string) => roleSet.add(t));
// //             }
            
// //             let primary = "Member";
// //             const currentTenure = m.tenures?.find((t: any) => t.is_current);
            
// //             // 2. Hierarchy of Title Importance
// //             if (currentTenure) {
// //                 primary = currentTenure.role_student;
// //             } else if (m.tenures?.length > 0) {
// //                 primary = "Alumni";
// //             } else if (m.legacy_titles?.length > 0) {
// //                 primary = m.legacy_titles[0]; // Use their first custom title (e.g. "Web Dev")
// //             } else if (m.credits?.length > 0) {
// //                 primary = Array.from(roleSet)[0];
// //             }

// //             return {
// //                 id: m.id,
// //                 name: m.name,
// //                 slug: m.slug,
// //                 image_url: m.image_url,
// //                 color: m.color || '#eab308',
// //                 primary_role: primary,
// //                 roles: Array.from(roleSet)
// //             };
// //         });
// // }
// // src/lib/api.ts

// // ... imports

// // --- Fetch All Artists (Optimized) ---
// export async function getAllArtists(client?: SupabaseClient): Promise<ArtistSummary[]> {
//     const supabase = client ?? await createClient();

//     // 1. DATABASE LEVEL FILTERING
//     // We use !inner join to ensure we only get members who actually have records in these tables
//     // OR we use the 'not.is' filter on legacy_titles.
//     // However, Supabase complex OR logic across tables is tricky.
//     // The most robust way for "OR" across tables is strictly typing the response and filtering
//     // but we can optimize the SELECT to not fetch unnecessary heavy fields like 'bio'.
    
//     const { data: rawData, error } = await supabase
//         .from('team_members')
//         .select(`
//             id, name, slug, image_url, color, legacy_titles,
//             tenures (role_student, is_current),
//             credits (role_artist)
//         `)
//         .is('deleted_at', null)
//         .order('name', { ascending: true });

//     if (error) return [];

//     // The mapping logic remains the same because it is complex business logic,
//     // but now we are ensuring we handle the new Legacy Titles safely.
//     return (rawData || [])
//         .filter((m: any) => (
//             (m.tenures && m.tenures.length > 0) || 
//             (m.credits && m.credits.length > 0) || 
//             (m.legacy_titles && m.legacy_titles.length > 0)
//         ))
//         .map((m: any) => {
//             const roleSet = new Set<string>();
            
//             m.tenures?.forEach((t: any) => roleSet.add(t.role_student));
//             m.credits?.forEach((c: any) => roleSet.add(c.role_artist));
//             m.legacy_titles?.forEach((t: string) => roleSet.add(t));
            
//             let primary = "Member";
//             const currentTenure = m.tenures?.find((t: any) => t.is_current);
            
//             // PRIORITY SYSTEM
//             if (currentTenure) {
//                 primary = currentTenure.role_student;
//             } else if (m.legacy_titles?.length > 0) {
//                 primary = m.legacy_titles[0]; // Custom Title takes precedence for pure artists
//             } else if (m.tenures?.length > 0) {
//                 primary = "Alumni";
//             } else if (m.credits?.length > 0) {
//                 primary = Array.from(roleSet)[0];
//             }

//             return {
//                 id: m.id,
//                 name: m.name,
//                 slug: m.slug,
//                 image_url: m.image_url,
//                 color: m.color || '#eab308',
//                 primary_role: primary,
//                 roles: Array.from(roleSet)
//             };
//         });
// }
// // --- Fetch Full Profile (Dossier) ---
// // UPDATED: passes legacy_titles to the profile
// export async function getMemberProfile(slug: string, client?: SupabaseClient): Promise<MemberProfile | null> {
//     const supabase = client ?? await createClient();

//     const { data: member } = await supabase
//         .from('team_members')
//         .select('*')
//         .eq('slug', slug)
//         .single();

//     if (!member) return null;

//     const { data: tenures } = await supabase
//         .from('tenures')
//         .select('*')
//         .eq('member_id', member.id)
//         .order('year', { ascending: false });

//     const { data: creditsData } = await supabase
//         .from('credits')
//         .select(`id, role_artist, play:plays(title, slug, poster_url, release_date)`)
//         .eq('member_id', member.id);
    
//     const credits = creditsData as any[];

//     return {
//         id: member.id,
//         name: member.name,
//         slug: member.slug,
//         bio: member.bio,
//         image_url: member.image_url,
//         voice_note_url: member.voice_note_url,
//         color: member.color || '#eab308',
//         social_links: member.social_links,
//         legacy_titles: member.legacy_titles || [], // <--- Pass the legacy data
        
//         tenures: (tenures || []).map((t: any) => ({
//             role: t.role_student,
//             year: t.year,
//             is_current: t.is_current,
//             department: t.department,
//             rank: t.rank
//         })),
        
//         credits: (credits || []).map((c: any) => ({
//             id: c.id,
//             role: c.role_artist,
//             play: {
//                 title: c.play.title,
//                 slug: c.play.slug,
//                 poster_url: c.play.poster_url,
//                 year: new Date(c.play.release_date).getFullYear().toString()
//             }
//         })),
        
//         role: tenures?.[0]?.role_student || member.legacy_titles?.[0] || 'Member',
//         rank: tenures?.[0]?.rank || 'CLOUD',
//         department: tenures?.[0]?.department || 'General',
//         year: tenures?.[0]?.year || 'N/A',
//         sort_order: 99
//     };
// }

// // --- Fetch All Slugs ---
// export async function getAllMemberSlugs(client?: SupabaseClient): Promise<{ slug: string }[]> {
//   const supabase = client ?? await createClient();
//   const { data } = await supabase.from('team_members').select('slug').is('deleted_at', null);
//   return data || [];
// }

// // ==============================================================================
// // 4. THE PULSE (Events & Challenges)
// // ==============================================================================

// export async function getActiveChallenge(client?: SupabaseClient): Promise<Challenge | null> {
//   const supabase = client ?? await createClient();
  
//   const { data } = await supabase
//     .from('challenges')
//     .select('*')
//     .eq('status', 'active')
//     .gt('deadline', new Date().toISOString())
//     .order('deadline', { ascending: true })
//     .limit(1)
//     .single();

//   return data as Challenge;
// }

// export async function getEvents(client?: SupabaseClient): Promise<EventItem[]> {
//   const supabase = client ?? await createClient();
  
//   const { data, error } = await supabase
//     .from('events')
//     .select(`
//       id, title, slug, date, type, location, description, 
//       featured_image_url, poster_url, registration_link, created_at
//     `)
//     .is('deleted_at', null)
//     .order('date', { ascending: false });

//   if (error) {
//     console.warn("API Warning: Could not fetch events.", error);
//     return [];
//   }
//   return (data as any[]) || [];
// }

// // 1. Raw Tenure Interface
// interface RawTenure {
//     role_student: string;
//     department: string;
//     rank: any; 
//     sort_order: number;
//     year: string;
//     member: {
//         id: string;
//         name: string;
//         slug: string;
//         bio: string | null;
//         image_url: string | null;
//         voice_note_url: string | null;
//         color: string;
//         social_links: any;
//     } | null;
// }


import { createClient } from "@/lib/supabase/server";
import { 
  Play, 
  TeamMember, 
  PlayCategory, 
  EnsembleMember, 
  MemberProfile, 
  ArtistSummary, 
  EventItem,
  Challenge
} from "@/types/schema";
import { SupabaseClient } from "@supabase/supabase-js";

// ==============================================================================
// 1. THE ORIGINALS (Plays & Productions)
// ==============================================================================

export async function getLatestOriginal(client?: SupabaseClient): Promise<Play | null> {
  const supabase = client ?? await createClient();
  try {
    const { data } = await supabase
      .from('plays')
      .select('*')
      .is('deleted_at', null)
      .order('featured_score', { ascending: false }) 
      .order('release_date', { ascending: false })
      .limit(1)
      .single();
    
    return data as Play;
  } catch (err) {
    console.error("API Error (Latest Original):", err);
    return null;
  }
}

export async function getPlayBySlug(slug: string, client?: SupabaseClient): Promise<Play | null> {
  const supabase = client ?? await createClient();
  
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
      console.warn(`API Warning: Play '${slug}' not found.`);
      return null;
    }

    return data as any as Play;
  } catch (err) {
    console.error("API Error (Get Play):", err);
    return null;
  }
}

export async function getPlays(
  page: number = 1, 
  limit: number = 12,
  category: PlayCategory | 'all' = 'all',
  client?: SupabaseClient
): Promise<Play[]> {
  const supabase = client ?? await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase.from('plays').select('*').is('deleted_at', null);

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

// ==============================================================================
// 2. THE ENSEMBLE (Roster & Team)
// ==============================================================================

export async function getSecretary(client?: SupabaseClient): Promise<TeamMember | null> {
  const supabase = client ?? await createClient();
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
      .ilike('role_student', '%Secretary%')
      .eq('is_current', true)
      .maybeSingle();

    if (error || !data || !data.member) return null;

    const raw = data as any;
    const m = Array.isArray(raw.member) ? raw.member[0] : raw.member;
    
    return {
      ...m,
      role_student: raw.role_student,
      department: raw.department
    } as TeamMember;

  } catch (err) {
    console.error("API Error (Secretary):", err);
    return null;
  }
}

// --- Fetch The Lineage (Ensemble) ---
// UPDATED: Faculty only appear in 'Faculty' year. Strict Isolation.
export async function getEnsemble(year: string = '2025-2026', client?: SupabaseClient): Promise<EnsembleMember[]> {
  const supabase = client ?? await createClient();
  
  try {
    let query = supabase
      .from('tenures')
      .select(`
        role_student, department, rank, sort_order, year, is_current,
        member:team_members (
          id, name, slug, bio, short_bio, image_url, voice_note_url, color, social_links, legacy_titles, is_hidden
        )
      `)
      .order('sort_order', { ascending: true });

    if (year === 'Faculty') {
        // 1. FACULTY MODE: Show ZENITH rank members
        query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`).order('year', { ascending: false });
    } else {
        // 2. STUDENT ROSTER MODE: Strict Year Match.
        // Faculty are deliberately EXCLUDED unless they have a specific student tenure in this year.
        // We removed the OR condition that injected ZENITH active members.
        query = query.eq('year', year);
    }

    const { data: rawData, error } = await query;

    if (error || !rawData ){
      console.warn(`API warning: Ensemble fetch empty for ${year}`);
      return [];
    }
    
    const tenures = rawData as unknown as RawTenure[];
    const seenMembers = new Set();
    const cleanList: EnsembleMember[] = [];

    for (const t of tenures) {
        // Ghost filter: if member doesn't exist or is Hidden, skip.
        if (!t.member || t.member.is_hidden ) continue;
        
        // Safety Dedup
        if (seenMembers.has(t.member.id)) continue;
        seenMembers.add(t.member.id);

        cleanList.push({
            id: t.member.id,
            name: t.member.name,
            slug: t.member.slug,
            role: t.role_student,      
            rank: t.rank,              
            department: t.department,
            sort_order: t.sort_order,
            image_url: t.member.image_url,
            bio: t.member.short_bio || t.member.bio,
            year: t.year,
            social_links: t.member.social_links,
            voice_note_url: t.member.voice_note_url,
            color: t.member.color || '#eab308',
            audio_url: t.member.voice_note_url,
            legacy_titles: t.member.legacy_titles
        });
    }

    return cleanList;

  } catch (err) {
    console.error("API Error (Ensemble):", err);
    return [];
  }
}

// ==============================================================================
// 3. THE ARTIST PORTFOLIO
// ==============================================================================

// --- Fetch All Artists (Grid) ---
// UPDATED: EXCLUDES Faculty (ZENITH) from the general artist grid.
export async function getAllArtists(client?: SupabaseClient): Promise<ArtistSummary[]> {
    const supabase = client ?? await createClient();

    const { data: rawData, error } = await supabase
        .from('team_members')
        .select(`
            id, name, slug, image_url, color, legacy_titles, sorting_weight, short_bio, is_hidden,
            tenures (role_student, is_current, rank), 
            credits (role_artist)
        `)
        .is('deleted_at', null)
        //GOD TIER SORT: First by your Manual Rank (1-99), then Alphabetical
        .order('sorting_weight', { ascending: true })
        .order('name', { ascending: true });
        

    if (error) {
      console.error("API Error (getAllArtist):", error);
      return [];

    } 

    const data = rawData as any[];

    return (data || [])
        .filter((m: any) => {
            // 1. Stealth protocol: If hidden, vanish.
            if (m.is_hidden === true) return false;

            // 2. STRICT ISOLATION: If they are Faculty (ZENITH), HIDE THEM.
            // Even if they have other roles, Faculty status makes them invisible here.
            // we check all tenures. IF they ever held the rank of  ZENITH, they are filtered out of the Artist Grid.
            // const isFaculty = m.tenures?.some((t: any) => t.rank === 'ZENITH');
            // if (isFaculty) return false;
            const currentTenure = m.tenures?.find((t: any) => t.is_current);
            if (currentTenure?.rank === 'ZENITH') return false;

            return true;
            

            // 3. Standard Inclusion Check
            // // return true;
            // return (
            //     (m.tenures && m.tenures.length > 0) || 
            //     (m.credits && m.credits.length > 0) || 
            //     (m.legacy_titles && m.legacy_titles.length > 0)
            // );
        })
        .map((m: any) => {
            const roleSet = new Set<string>();
            
            m.tenures?.forEach((t: any) => roleSet.add(t.role_student));
            m.credits?.forEach((c: any) => roleSet.add(c.role_artist));
            m.legacy_titles?.forEach((t: string) => roleSet.add(t));
            
            // let primary = "Artist";
            // // Logic to pick the "Best" title to show on the card
            // if (m.legacy_titles?.length > 0) primary = m.legacy_titles[0];
            // else if (m.tenures?.length > 0) primary = "Alumni";
            // else if (m.credits?.length > 0) primary = "Cast Member";
            let primary = "Member";
            let rank = "CLOUD"; //NEW ADDED // DEFAULT RANK
            const currentTenure = m.tenures?.find((t: any) => t.is_current);
            
            if (currentTenure) {
                primary = currentTenure.role_student;
                rank = currentTenure.rank; // New Added // Capture the rank (CROWN/ORBIT/CLOUD)
            } else if (m.legacy_titles?.length > 0) {
                primary = m.legacy_titles[0];
                rank = "ALUMNI"; //NEW ADDED // VIRTUAL RANK FOR ALUMS
            } else if (m.tenures?.length > 0) {
                primary = "Alumni";
                rank = "ALUMNI"
            } else if (m.credits?.length > 0) {
                primary = Array.from(roleSet)[0];
            }

            return {
                id: m.id,
                name: m.name,
                slug: m.slug,
                image_url: m.image_url,
                color: m.color || '#eab308',
                primary_role: primary,
                label: primary, //New Added // Compatibility
                roles: Array.from(roleSet),
                short_bio: m.short_bio, // Pass the Intro
                rank: rank,
                sorting_weight: m.sorting_weight
            };
        });
}

// --- Fetch Full Profile (Dossier) ---
export async function getMemberProfile(slug: string, client?: SupabaseClient): Promise<MemberProfile | null> {
    const supabase = client ?? await createClient();

    const { data: member } = await supabase
        .from('team_members')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!member) return null;

    const { data: tenures } = await supabase
        .from('tenures')
        .select('*')
        .eq('member_id', member.id)
        .order('year', { ascending: false });

    const { data: creditsData } = await supabase
        .from('credits')
        .select(`id, role_artist, play:plays(title, slug, poster_url, release_date)`)
        .eq('member_id', member.id);
    
    const credits = creditsData as any[];

    return {
        id: member.id,
        name: member.name,
        slug: member.slug,
        bio: member.bio,
        short_bio: member.short_bio,
        image_url: member.image_url,
        voice_note_url: member.voice_note_url,
        color: member.color || '#eab308',
        social_links: member.social_links,
        legacy_titles: member.legacy_titles || [],
        
        tenures: (tenures || []).map((t: any) => ({
            role: t.role_student,
            year: t.year,
            is_current: t.is_current,
            department: t.department,
            rank: t.rank
        })),
        
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
        
        role: tenures?.[0]?.role_student || member.legacy_titles?.[0] || 'Member',
        rank: tenures?.[0]?.rank || 'CLOUD',
        department: tenures?.[0]?.department || 'General',
        year: tenures?.[0]?.year || 'N/A',
        sort_order: 99
    };
}

export async function getAllMemberSlugs(client?: SupabaseClient): Promise<{ slug: string }[]> {
  const supabase = client ?? await createClient();
  const { data } = await supabase.from('team_members').select('slug').is('deleted_at', null);
  return data || [];
}

// ==============================================================================
// 4. THE PULSE (Events & Challenges)
// ==============================================================================

export async function getActiveChallenge(client?: SupabaseClient): Promise<Challenge | null> {
  const supabase = client ?? await createClient();
  
  const { data } = await supabase
    .from('challenges')
    .select('*')
    .eq('status', 'active')
    .gt('deadline', new Date().toISOString())
    .order('deadline', { ascending: true })
    .limit(1)
    .single();

  return data as Challenge;
}

export async function getEvents(client?: SupabaseClient): Promise<EventItem[]> {
  const supabase = client ?? await createClient();
  
  const { data, error } = await supabase
    .from('events')
    .select(`
      id, title, slug, date, type, location, description, 
      featured_image_url, poster_url, registration_link, created_at
    `)
    .is('deleted_at', null)
    .order('date', { ascending: false });

  if (error) {
    console.warn("API Warning: Could not fetch events.", error);
    return [];
  }
  return (data as any[]) || [];
}

// 1. Raw Tenure Interface
interface RawTenure {
    role_student: string;
    department: string;
    rank: any; 
    sort_order: number;
    year: string;
    is_current: boolean;
    member: {
        id: string;
        name: string;
        slug: string;
        bio: string | null;
        short_bio: string | null;
        image_url: string | null;
        voice_note_url: string | null;
        color: string;
        social_links: any;
        legacy_titles: string[] | null;
        is_hidden: boolean;
    } | null;
}
