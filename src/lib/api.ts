// // // // // // src/lib/api.ts
// // // // // import { createClient } from "@/lib/supabase/server";
// // // // // import { Play, TeamMember, PlayCategory } from "@/types/schema";
// // // // // import { RasaConfig } from "./rasa";
// // // // // import { EnsembleMember, AcademicYear } from "@/types/schema";
// // // // // export async function getLatestOriginal(): Promise<Play | null> {
// // // // //   const supabase = await createClient();
// // // // //   try {
// // // // //     const { data } = await supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .is('deleted_at', null)
// // // // //       .order('release_date', { ascending: false })
// // // // //       .limit(1)
// // // // //       .single();
    
// // // // //     return data as Play;
// // // // //   } catch (err) {
// // // // //     return null; // Fail silently, show nothing
// // // // //   }
// // // // // }

// // // // // export async function getSecretary(): Promise<TeamMember | null> {
// // // // //   const supabase = await createClient();
// // // // //   try {
// // // // //     // 1. Fetch the Tenure (Role) AND the Member details
// // // // //     const { data, error } = await supabase
// // // // //       .from('tenures')
// // // // //       .select(`
// // // // //         role_student,
// // // // //         department,
// // // // //         member:team_members (
// // // // //           id, name, slug, image_url, bio, social_links
// // // // //         )
// // // // //       `)
// // // // //       .eq('role_student', 'Secretary')
// // // // //       .is('deleted_at', null)
// // // // //       .maybeSingle(); // Use maybeSingle to avoid 406 errors if 0 rows found

// // // // //     if (error || !data || !data.member) {
// // // // //       console.warn("Brain: Secretary not found or data incomplete.");
// // // // //       return null;
// // // // //     }

// // // // //     // 2. THE MAPPER (The Safety Net)
// // // // //     // We merge the Role info (from Tenure) into the Member object
// // // // //     // This creates the perfect 'TeamMember' shape our UI expects.
// // // // //     const memberData = Array.isArray(data.member) ? data.member[0] : data.member;

// // // // //     return {
// // // // //       ...memberData,
// // // // //       role_student: data.role_student,
// // // // //       department: data.department
// // // // //     } as TeamMember;

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure:", err);
// // // // //     return null;
// // // // //   }
// // // // // }



// // // // // // 3. THE SEEKER (Find specific play by Slug)
// // // // // export async function getPlayBySlug(slug: string): Promise<Play | null> {
// // // // //   const supabase = await createClient();
  
// // // // //   try {
// // // // //     const { data, error } = await supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .eq('slug', slug)
// // // // //       .is('deleted_at', null)
// // // // //       .single();

// // // // //     if (error) {
// // // // //       console.warn(`Brain Warning: Play '${slug}' not found.`);
// // // // //       return null;
// // // // //     }

// // // // //     return data as Play;
// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure:", err);
// // // // //     return null;
// // // // //   }
// // // // // }


// // // // // // // 4. THE CASTING CALL (Fetch all active members)
// // // // // // export async function getEnsemble(): Promise<TeamMember[]> {
// // // // // //   const supabase = await createClient();
  
// // // // // //   try {
// // // // // //     // Fetch members and their roles via the 'tenures' table
// // // // // //     // This is a complex join: Tenures -> TeamMembers
// // // // // //     const { data, error } = await supabase
// // // // // //       .from('tenures')
// // // // // //       .select(`
// // // // // //         role_student,
// // // // // //         department,
// // // // // //         member:team_members (
// // // // // //           id, name, slug, image_url, bio, social_links
// // // // // //         )
// // // // // //       `)
// // // // // //       .is('deleted_at', null)
// // // // // //       .is('end_date', null) // Only active members
// // // // // //       .order('priority', { ascending: true }); // Ensure your DB has a 'priority' column for sorting, or sort by name

// // // // // //     if (error) {
// // // // // //       console.warn("Brain Warning: Ensemble empty.");
// // // // // //       return [];
// // // // // //     }

// // // // // //     // MAPPER: Flatten the structure
// // // // // //     return data.map((row: any) => ({
// // // // // //       ...row.member, // The person details
// // // // // //       role_student: row.role_student, // The specific role for this tenure
// // // // // //       department: row.department
// // // // // //     })) as TeamMember[];

// // // // // //   } catch (err) {
// // // // // //     console.error("Brain Failure (Ensemble):", err);
// // // // // //     return [];
// // // // // //   }
// // // // // // }
// // // // // // src/lib/api.ts

// // // // // // // 5. THE ARCHIVIST (Fetch all plays for the grid)
// // // // // // export async function getAllPlays(): Promise<Play[]> {
// // // // // //   const supabase = await createClient();
  
// // // // // //   try {
// // // // // //     const { data, error } = await supabase
// // // // // //       .from('plays')
// // // // // //       .select('*')
// // // // // //       .is('deleted_at', null)
// // // // // //       .order('release_date', { ascending: false }); // Newest first

// // // // // //     if (error) {
// // // // // //       console.warn("Brain Warning: Archive empty.");
// // // // // //       return [];
// // // // // //     }

// // // // // //     return data as Play[];
// // // // // //   } catch (err) {
// // // // // //     console.error("Brain Failure (Archive):", err);
// // // // // //     return [];
// // // // // //   }
// // // // // // }


// // // // // // 5. THE SCALABLE ARCHIVIST (Fetch plays with pagination)
// // // // // // src/lib/api.ts

// // // // // // export async function getPlays(
// // // // // //   page: number = 1, 
// // // // // //   limit: number = 12,
// // // // // //   category?: PlayCategory | 'all' // Optional Filter
// // // // // // ): Promise<Play[]> {
// // // // // //   const supabase = await createClient();
// // // // // //   const from = (page - 1) * limit;
// // // // // //   const to = from + limit - 1;

// // // // // //   try {
// // // // // //     let query = supabase
// // // // // //       .from('plays')
// // // // // //       .select('*')
// // // // // //       .is('deleted_at', null);

// // // // // //     // 1. APPLY FILTER (If not 'all')
// // // // // //     if (category && category !== 'all') {
// // // // // //       query = query.eq('category', category);
// // // // // //     }

// // // // // //     // 2. APPLY THE CURATOR'S SORTING
// // // // // //     // First, push High Priority items to the top.
// // // // // //     // Then, sort by Newest.
// // // // // //     query = query
// // // // // //       .order('featured_score', { ascending: false }) 
// // // // // //       .order('release_date', { ascending: false })
// // // // // //       .range(from, to);

// // // // // //     const { data, error } = await query;

// // // // // //     if (error) {
// // // // // //       console.warn(`Brain Warning: Fetch failed for ${category}.`);
// // // // // //       return [];
// // // // // //     }

// // // // // //     return data as Play[];
// // // // // //   } catch (err) {
// // // // // //     console.error("Brain Failure (Archive):", err);
// // // // // //     return [];
// // // // // //   }
// // // // // // }

// // // // // // 5. THE SCALABLE ARCHIVIST (Fetch plays with pagination and category filter)
// // // // // export async function getPlays(
// // // // //   page: number = 1, 
// // // // //   limit: number = 12,
// // // // //   category: PlayCategory | 'all' = 'all'
// // // // // ): Promise<Play[]> {
// // // // //   const supabase = await createClient();
// // // // //   const from = (page - 1) * limit;
// // // // //   const to = from + limit - 1;

// // // // //   try {
// // // // //     let query = supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .is('deleted_at', null);

// // // // //     if (category !== 'all') {
// // // // //       query = query.eq('category', category);
// // // // //     }

// // // // //     query = query
// // // // //       .order('featured_score', { ascending: false }) // Admin Priority
// // // // //       .order('release_date', { ascending: false })   // Recency
// // // // //       .range(from, to);

// // // // //     const { data, error } = await query;

// // // // //     if (error) {
// // // // //       console.warn(`Brain Warning: Fetch failed for ${category}.`);
// // // // //       return [];
// // // // //     }

// // // // //     return data as Play[];
// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure (Archive):", err);
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // // src/lib/api.ts

// // // // // // 6. THE CONSTELLATION (Fetch Team by Year)
// // // // // export async function getEnsemble(year: AcademicYear = '2025-26'): Promise<EnsembleMember[]> {
// // // // //   const supabase = await createClient();

// // // // //   try {
// // // // //     // In a real Supabase setup, you would join 'profiles' with 'tenures'.
// // // // //     // For now, assuming we query a view or a table designed for tenures.
// // // // //     const { data, error } = await supabase
// // // // //       .from('ensemble_view') // You likely need a View in SQL for this join
// // // // //       .select('*')
// // // // //       .eq('year', year)
// // // // //       // SORT BY GRAVITY: Zenith (1) -> Crown (2) -> Orbit (3) -> Cloud (4)
// // // // //       .order('rank_order', { ascending: true }) 
// // // // //       .order('name', { ascending: true });

// // // // //     if (error) {
// // // // //       console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`);
// // // // //       return [];
// // // // //     }

// // // // //     return data as EnsembleMember[];
// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure (Ensemble):", err);
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // // src/lib/api.ts
// // // // // import { createClient } from "@/lib/supabase/server";
// // // // // import { Play, TeamMember, PlayCategory, EnsembleMember, MemberProfile } from "@/types/schema";

// // // // // // --- 1. THE LATEST ORIGINAL ---
// // // // // export async function getLatestOriginal(): Promise<Play | null> {
// // // // //   const supabase = await createClient();
// // // // //   try {
// // // // //     const { data } = await supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .is('deleted_at', null)
// // // // //       .order('release_date', { ascending: false })
// // // // //       .limit(1)
// // // // //       .single();
    
// // // // //     return data as Play;
// // // // //   } catch (err) {
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // --- 2. THE SECRETARY (Landing Page) ---
// // // // // export async function getSecretary(): Promise<TeamMember | null> {
// // // // //   const supabase = await createClient();
// // // // //   try {
// // // // //     const { data, error } = await supabase
// // // // //       .from('tenures')
// // // // //       .select(`
// // // // //         role_student,
// // // // //         department,
// // // // //         member:team_members (
// // // // //           id, name, slug, image_url, bio, social_links, color, voice_note_url
// // // // //         )
// // // // //       `)
// // // // //       .eq('role_student', 'Secretary')
// // // // //       .is('deleted_at', null)
// // // // //       .maybeSingle();

// // // // //     if (error || !data || !data.member) {
// // // // //       return null;
// // // // //     }

// // // // //     // Flattening for the basic TeamMember type
// // // // //     const m = Array.isArray(data.member) ? data.member[0] : data.member;
// // // // //     return {
// // // // //       ...m,
// // // // //       role_student: data.role_student,
// // // // //       department: data.department
// // // // //     } as TeamMember;

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure:", err);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // --- 3. THE SEEKER (Play by Slug) ---
// // // // // export async function getPlayBySlug(slug: string): Promise<Play | null> {
// // // // //   const supabase = await createClient();
  
// // // // //   try {
// // // // //     const { data, error } = await supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .eq('slug', slug)
// // // // //       .is('deleted_at', null)
// // // // //       .single();

// // // // //     if (error) return null;
// // // // //     return data as Play;
// // // // //   } catch (err) {
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // --- 4. THE ARCHIVIST (Pagination) ---
// // // // // export async function getPlays(
// // // // //   page: number = 1, 
// // // // //   limit: number = 12,
// // // // //   category: PlayCategory | 'all' = 'all'
// // // // // ): Promise<Play[]> {
// // // // //   const supabase = await createClient();
// // // // //   const from = (page - 1) * limit;
// // // // //   const to = from + limit - 1;

// // // // //   try {
// // // // //     let query = supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .is('deleted_at', null);

// // // // //     if (category !== 'all') {
// // // // //       query = query.eq('category', category);
// // // // //     }

// // // // //     query = query
// // // // //       .order('featured_score', { ascending: false })
// // // // //       .order('release_date', { ascending: false })
// // // // //       .range(from, to);

// // // // //     const { data, error } = await query;
// // // // //     if (error) return [];

// // // // //     return data as Play[];
// // // // //   } catch (err) {
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // // --- 5. THE CONSTELLATION (Ensemble Page) ---
// // // // // // This is the new logic connecting Tenures + Navarasa Colors
// // // // // export async function getEnsemble(year: string = '2025-26'): Promise<EnsembleMember[]> {
// // // // //   const supabase = await createClient();

// // // // //   try {
// // // // //     // 1. COMPLEX JOIN FETCH
// // // // //     const { data: tenures, error } = await supabase
// // // // //       .from('tenures')
// // // // //       .select(`
// // // // //         role_student,
// // // // //         department,
// // // // //         rank,
// // // // //         sort_order,
// // // // //         year,
// // // // //         member:team_members (
// // // // //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// // // // //         )
// // // // //       `)
// // // // //       .eq('year', year)
// // // // //       .is('deleted_at', null)
// // // // //       // Sort by Hierarchy (1. Secretary, 2. Heads...)
// // // // //       .order('sort_order', { ascending: true });

// // // // //     if (error) {
// // // // //       console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`, error);
// // // // //       return [];
// // // // //     }

// // // // //     // 2. DATA FLATTENING (The Adapter)
// // // // //     // We map DB columns to the strictly typed EnsembleMember interface
// // // // //     return (tenures || []).map((t: any) => ({
// // // // //       id: t.member.id,
// // // // //       name: t.member.name,
// // // // //       slug: t.member.slug,
// // // // //       role: t.role_student, // DB: role_student -> UI: role
// // // // //       department: t.department,
// // // // //       bio: t.member.bio,
// // // // //       year: t.year,
// // // // //       rank: t.rank,         
// // // // //       sort_order: t.sort_order, 
// // // // //       image_url: t.member.image_url,
// // // // //       audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
// // // // //       color: t.member.color || '#eab308',  // Fallback to Gold
// // // // //       social_links: t.member.social_links
// // // // //     })) as EnsembleMember[];

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure (Ensemble):", err);
// // // // //     return [];
// // // // //   }
// // // // // }


// // // // // // src/lib/api.ts
// // // // // // ... (Previous imports)

// // // // // // --- 6. THE PROTAGONIST (Full Profile Fetch) ---
// // // // // export async function getMemberProfile(slug: string): Promise<MemberProfile | null> {
// // // // //   const supabase = await createClient();

// // // // //   try {
// // // // //     // 1. Fetch Core Identity
// // // // //     const { data: member, error } = await supabase
// // // // //       .from('team_members')
// // // // //       .select('*')
// // // // //       .eq('slug', slug)
// // // // //       .is('deleted_at', null)
// // // // //       .single();

// // // // //     if (error || !member) return null;

// // // // //     // 2. Fetch History (Tenures)
// // // // //     const { data: tenures } = await supabase
// // // // //       .from('tenures')
// // // // //       .select('role_student, year, is_current')
// // // // //       .eq('member_id', member.id)
// // // // //       .order('year', { ascending: false }); // Newest first

// // // // //     // 3. Fetch Filmography (Credits -> Plays)
// // // // //     const { data: credits } = await supabase
// // // // //       .from('credits')
// // // // //       .select(`
// // // // //         id,
// // // // //         role_artist,
// // // // //         play:plays (
// // // // //           title, slug, poster_url, release_date
// // // // //         )
// // // // //       `)
// // // // //       .eq('member_id', member.id);

// // // // //     // 4. THE ASSEMBLY
// // // // //     return {
// // // // //       id: member.id,
// // // // //       name: member.name,
// // // // //       slug: member.slug,
// // // // //       bio: member.bio,
// // // // //       image_url: member.image_url,
// // // // //       audio_url: member.voice_note_url,
// // // // //       color: member.color || '#eab308',
// // // // //       social_links: member.social_links,
      
// // // // //       // Map Tenures
// // // // //       tenures: (tenures || []).map((t: any) => ({
// // // // //         role: t.role_student,
// // // // //         year: t.year,
// // // // //         is_current: t.is_current
// // // // //       })),
      
// // // // //       // Map Credits
// // // // //       credits: (credits || []).map((c: any) => ({
// // // // //         id: c.id,
// // // // //         role: c.role_artist,
// // // // //         play: {
// // // // //           title: c.play.title,
// // // // //           slug: c.play.slug,
// // // // //           poster_url: c.play.poster_url,
// // // // //           year: new Date(c.play.release_date).getFullYear().toString()
// // // // //         }
// // // // //       })),
      
// // // // //       // Default fields to satisfy EnsembleMember type (not strictly used here but good for type safety)
// // // // //       role: tenures?.[0]?.role_student || 'Member',
// // // // //       department: member.department || '',
// // // // //       rank: 'CLOUD',
// // // // //       sort_order: 99,
// // // // //       year: 'N/A'
// // // // //     };

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure (Profile):", err);
// // // // //     return null;
// // // // //   }
// // // // // }



// // // // // // src/lib/api.ts
// // // // // import { createClient } from "@/lib/supabase/server";
// // // // // import { Play, TeamMember, PlayCategory, EnsembleMember, MemberProfile, ArtistSummary } from "@/types/schema";
// // // // // import { RasaConfig } from "./rasa";
// // // // // import { AcademicYear } from "@/types/schema";
// // // // // import { Metadata } from "next";
// // // // // import React from "react";
// // // // // import { SupabaseClient } from "@supabase/supabase-js";
// // // // // import { desc } from "framer-motion/client";
// // // // // import { create } from "domain";
// // // // // import { EventItem } from "@/types/schema";
// // // // // // --- 1. THE LATEST ORIGINAL ---
// // // // // export async function getLatestOriginal(): Promise<Play | null> {
// // // // //   const supabase = await createClient();
// // // // //   try {
// // // // //     const { data } = await supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .is('deleted_at', null)
// // // // //       .order('release_date', { ascending: false })
// // // // //       .limit(1)
// // // // //       .single();
    
// // // // //     return data as Play;
// // // // //   } catch (err) {
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // --- 2. THE SECRETARY (Landing Page) ---
// // // // // export async function getSecretary(): Promise<TeamMember | null> {
// // // // //   const supabase = await createClient();
// // // // //   try {
// // // // //     const { data, error } = await supabase
// // // // //       .from('tenures')
// // // // //       .select(`
// // // // //         role_student,
// // // // //         department,
// // // // //         member:team_members (
// // // // //           id, name, slug, image_url, bio, social_links, color, voice_note_url
// // // // //         )
// // // // //       `)
// // // // //       .eq('role_student', 'Secretary')
// // // // //       .is('deleted_at', null)
// // // // //       .maybeSingle();

// // // // //     if (error || !data || !data.member) {
// // // // //       return null;
// // // // //     }

// // // // //     // Flattening for the basic TeamMember type
// // // // //     const m = Array.isArray(data.member) ? data.member[0] : data.member;
// // // // //     return {
// // // // //       ...m,
// // // // //       role_student: data.role_student,
// // // // //       department: data.department
// // // // //     } as TeamMember;

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure:", err);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // // --- 3. THE SEEKER (Play by Slug) ---
// // // // // // export async function getPlayBySlug(slug: string): Promise<Play | null> {
// // // // // //   const supabase = await createClient();
  
// // // // // //   try {
// // // // // //     const { data, error } = await supabase
// // // // // //       .from('plays')
// // // // // //       .select('*')
// // // // // //       .eq('slug', slug)
// // // // // //       .is('deleted_at', null)
// // // // // //       .single();

// // // // // //     if (error) return null;
// // // // // //     return data as Play;
// // // // // //   } catch (err) {
// // // // // //     return null;
// // // // // //   }
// // // // // // }

// // // // // // src/lib/api.ts

// // // // // // --- 3. THE SEEKER (Play by Slug + Cast & Crew) ---
// // // // // export async function getPlayBySlug(slug: string): Promise<Play | null> {
// // // // //   const supabase = await createClient();
  
// // // // //   try {
// // // // //     const { data, error } = await supabase
// // // // //       .from('plays')
// // // // //       .select(`
// // // // //         *,
// // // // //         credits (
// // // // //           role_artist,
// // // // //           team_members (
// // // // //             name,
// // // // //             slug,
// // // // //             image_url,
// // // // //             color
// // // // //           )
// // // // //         )
// // // // //       `)
// // // // //       .eq('slug', slug)
// // // // //       .is('deleted_at', null)
// // // // //       .single();

// // // // //     if (error) {
// // // // //       console.warn(`Brain Warning: Play '${slug}' not found.`);
// // // // //       return null;
// // // // //     }

// // // // //     return data as Play;
// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure:", err);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // --- 4. THE ARCHIVIST (Pagination) ---
// // // // // export async function getPlays(
// // // // //   page: number = 1, 
// // // // //   limit: number = 12,
// // // // //   category: PlayCategory | 'all' = 'all'
// // // // // ): Promise<Play[]> {
// // // // //   const supabase = await createClient();
// // // // //   const from = (page - 1) * limit;
// // // // //   const to = from + limit - 1;

// // // // //   try {
// // // // //     let query = supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .is('deleted_at', null);

// // // // //     if (category !== 'all') {
// // // // //       query = query.eq('category', category);
// // // // //     }

// // // // //     query = query
// // // // //       .order('featured_score', { ascending: false })
// // // // //       .order('release_date', { ascending: false })
// // // // //       .range(from, to);

// // // // //     const { data, error } = await query;
// // // // //     if (error) return [];

// // // // //     return data as Play[];
// // // // //   } catch (err) {
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // // --- 5. THE CONSTELLATION (Ensemble Page) ---
// // // // // // This is the new logic connecting Tenures + Navarasa Colors
// // // // // // export async function getEnsemble(year: string = '2025-26', client?: SupabaseClient): Promise<EnsembleMember[]> {
// // // // // //   const supabase = client ?? await createClient();

// // // // // //   try {
// // // // // //     // 1. COMPLEX JOIN FETCH
// // // // // //     const { data: tenures, error } = await supabase
// // // // // //       .from('tenures')
// // // // // //       .select(`
// // // // // //         role_student,
// // // // // //         department,
// // // // // //         rank,
// // // // // //         sort_order,
// // // // // //         year,
// // // // // //         member:team_members (
// // // // // //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// // // // // //         )
// // // // // //       `)
// // // // // //       .eq('year', year)
// // // // // //       .is('deleted_at', null)
// // // // // //       // Sort by Hierarchy (1. Secretary, 2. Heads...)
// // // // // //       .order('sort_order', { ascending: true });

// // // // // //     if (error) {
// // // // // //       console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`, error);
// // // // // //       return [];
// // // // // //     }

// // // // // //     // 2. DATA FLATTENING (The Adapter)
// // // // // //     // We map DB columns to the strictly typed EnsembleMember interface
// // // // // //     return (tenures || []).map((t: any) => ({
// // // // // //       id: t.member.id,
// // // // // //       name: t.member.name,
// // // // // //       slug: t.member.slug,
// // // // // //       role: t.role_student, // DB: role_student -> UI: role
// // // // // //       department: t.department,
// // // // // //       bio: t.member.bio,
// // // // // //       year: t.year,
// // // // // //       rank: t.rank,         
// // // // // //       sort_order: t.sort_order, 
// // // // // //       image_url: t.member.image_url,
// // // // // //       audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
// // // // // //       color: t.member.color || '#eab308',  // Fallback to Gold
// // // // // //       social_links: t.member.social_links
// // // // // //     })) as EnsembleMember[];

// // // // // //   } catch (err) {
// // // // // //     console.error("Brain Failure (Ensemble):", err);
// // // // // //     return [];
// // // // // //   }
// // // // // // }


// // // // // // ---5. THE CONSTELLATION (Ensemble Page)---
// // // // // // export async function getEnsemble(year: string = '2025-26', client?: SupabaseClient): Promise<EnsembleMember[]> {
// // // // // //   const supabase = client ?? await createClient();

// // // // // //   try {
// // // // // //     let query = supabase
// // // // // //       .from('tenures')
// // // // // //       .select(`
// // // // // //         role_student,
// // // // // //         department,
// // // // // //         rank,
// // // // // //         sort_order,
// // // // // //         year,
// // // // // //         member:team_members (
// // // // // //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// // // // // //           )
// // // // // //         `)
// // // // // //         .is('deleted_at', null);
    
// // // // // //     // Logic: Faculty vs Year Filter
// // // // // //     if (year === 'faculty') {
// // // // // //       //Fetch anyone with ZENITH RANK OR 'Faculty' in title, regardless of year
// // // // // //       // we use .or() to be safe, but rank = "ZENITH" is the God mode indicator
// // // // // //       query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`);

// // // // // //     } else {
// // // // // //       // Regular Year-based Fetch
// // // // // //       query = query.eq('year', year);
// // // // // //     }

// // // // // //     const { data: tenures, error } = await query.order('sort_order', { ascending: true });
    
// // // // // //     if (error) {
// // // // // //       console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`, error);
// // // // // //       return [];
// // // // // //     }

// // // // // //     // Mapper (Handle Null Members Safely)
// // // // // //     return (tenures || [])
// // // // // //       .filter((t: any) => t.member !== null && t.member !== undefined)
// // // // // //       .map((t: any) => ({
// // // // // //         id: t.member.id,
// // // // // //         name: t.member.name,
// // // // // //         slug: t.member.slug,
// // // // // //         role: t.role_student, // DB: role_student -> UI: role
// // // // // //         rank: t.rank,
// // // // // //         department: t.department,
// // // // // //         image_url: t.member.image_url,
// // // // // //         bio: t.member.bio,
// // // // // //         year: t.year,
// // // // // //         social_links: t.member.social_links,
// // // // // //         audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
// // // // // //         color: t.member.color || '#eab308',  // Fallback to Gold
// // // // // //         sort_order: t.sort_order,
// // // // // //       })) as EnsembleMember[];



// // // // // //   } catch (err){
// // // // // //     console.error("Brain Failure (Ensemble):", err);
// // // // // //     return [];
// // // // // //   }
// // // // // // }



// // // // // // --- 1. GET ENSEMBLE (The Roster) ---
// // // // // export async function getEnsemble(year: string = '2025-2026'): Promise<EnsembleMember[]> {
// // // // //   const supabase = await createClient();
  
// // // // //   try {
// // // // //     let query = supabase
// // // // //       .from('tenures')
// // // // //       .select(`
// // // // //         role_student, department, rank, sort_order, year,
// // // // //         member:team_members (
// // // // //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// // // // //         )
// // // // //       `)
// // // // //       .order('sort_order', { ascending: true }); // <--- CONTROL: You decide who is on top

// // // // //     // LOGIC: FACULTY vs YEAR
// // // // //     if (year === 'Faculty') {
// // // // //         // Fetch ALL Faculty tenures ever, sorted by year desc (latest first)
// // // // //         query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`).order('year', { ascending: false });
// // // // //     } else {
// // // // //         // Fetch Specific Year
// // // // //         query = query.eq('year', year);
// // // // //     }

// // // // //     const { data: tenures, error } = await query;

// // // // //     if (error || !tenures) {
// // // // //         console.warn(`Brain: Ensemble fetch failed for ${year}`, error);
// // // // //         return [];
// // // // //     }

// // // // //     // MAPPER & DEDUPLICATOR
// // // // //     const seenMembers = new Set();
// // // // //     const cleanList: EnsembleMember[] = [];

// // // // //     for (const t of tenures) {
// // // // //         if (!t.member) continue; // Skip broken links
        
// // // // //         // DEDUPLICATE: Only for Faculty (Show their latest profile only)
// // // // //         if (year === 'Faculty') {
// // // // //             if (seenMembers.has(t.member.id)) continue;
// // // // //             seenMembers.add(t.member.id);
// // // // //         }

// // // // //         cleanList.push({
// // // // //             id: t.member.id,
// // // // //             name: t.member.name,
// // // // //             slug: t.member.slug,
// // // // //             role: t.role_student,      
// // // // //             rank: t.rank,              
// // // // //             department: t.department,
// // // // //             sort_order: t.sort_order,
// // // // //             image_url: t.member.image_url,
// // // // //             bio: t.member.bio,
// // // // //             year: t.year,
// // // // //             social_links: t.member.social_links,
// // // // //             voice_note_url: t.member.voice_note_url,
// // // // //             color: t.member.color || '#eab308'
// // // // //         });
// // // // //     }

// // // // //     return cleanList;

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure (Ensemble):", err);
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // // --- 2. GET ALL ARTISTS (The Portfolio) ---
// // // // // export async function getAllArtists(): Promise<ArtistSummary[]> {
// // // // //     const supabase = await createClient();

// // // // //     // Fetch EVERYONE who has a tenure OR a credit
// // // // //     const { data, error } = await supabase
// // // // //         .from('team_members')
// // // // //         .select(`
// // // // //             id, name, slug, image_url, color,
// // // // //             tenures (role_student),
// // // // //             credits (role_artist)
// // // // //         `)
// // // // //         .is('deleted_at', null)
// // // // //         .order('name', { ascending: true });

// // // // //     if (error) return [];

// // // // //     // Filter: Eliminate Ghosts (People with 0 work history)
// // // // //     return (data || [])
// // // // //         .filter((m: any) => m.tenures.length > 0 || m.credits.length > 0)
// // // // //         .map((m: any) => {
// // // // //             // Smart Labeling Logic
// // // // //             let label = "Artist";
// // // // //             // 1. If they were ever Secretary, that's their badge
// // // // //             if (m.tenures.some((t: any) => t.role_student.includes('Secretary'))) label = "Secretary";
// // // // //             // 2. Else, use their latest official title
// // // // //             else if (m.tenures.length > 0) label = m.tenures[0].role_student; 
// // // // //             // 3. Else, if they only acted, use "Actor" (or look up specific role if needed)
// // // // //             else if (m.credits.length > 0) label = "Thespian";

// // // // //             return {
// // // // //                 id: m.id,
// // // // //                 name: m.name,
// // // // //                 slug: m.slug,
// // // // //                 image_url: m.image_url,
// // // // //                 color: m.color || '#eab308',
// // // // //                 label: label
// // // // //             };
// // // // //         });
// // // // // }

// // // // // // --- 6. THE PROTAGONIST (Full Profile Fetch) ---
// // // // // export async function getMemberProfile(slug: string, client?: SupabaseClient): Promise<MemberProfile | null> {
// // // // //   const supabase = client ?? await createClient();

// // // // //   try {
// // // // //     // 1. Fetch Core Identity
// // // // //     const { data: member, error } = await supabase
// // // // //       .from('team_members')
// // // // //       .select('*')
// // // // //       .eq('slug', slug)
// // // // //       .is('deleted_at', null)
// // // // //       .single();

// // // // //     if (error || !member) return null;

// // // // //     // 2. Fetch History (Tenures)
// // // // //     const { data: tenures } = await supabase
// // // // //       .from('tenures')
// // // // //       .select('role_student, year, is_current')
// // // // //       .eq('member_id', member.id)
// // // // //       .order('year', { ascending: false }); // Newest first

// // // // //     // 3. Fetch Filmography (Credits -> Plays)
// // // // //     const { data: credits } = await supabase
// // // // //       .from('credits')
// // // // //       .select(`
// // // // //         id,
// // // // //         role_artist,
// // // // //         play:plays (
// // // // //           title, slug, poster_url, release_date
// // // // //         )
// // // // //       `)
// // // // //       .eq('member_id', member.id);

// // // // //     // 4. THE ASSEMBLY
// // // // //     return {
// // // // //       id: member.id,
// // // // //       name: member.name,
// // // // //       slug: member.slug,
// // // // //       bio: member.bio,
// // // // //       image_url: member.image_url,
// // // // //       audio_url: member.voice_note_url,
// // // // //       color: member.color || '#eab308',
// // // // //       social_links: member.social_links,
      
// // // // //       // Map Tenures
// // // // //       tenures: (tenures || []).map((t: any) => ({
// // // // //         role: t.role_student,
// // // // //         year: t.year,
// // // // //         is_current: t.is_current
// // // // //       })),
      
// // // // //       // Map Credits
// // // // //       credits: (credits || []).map((c: any) => ({
// // // // //         id: c.id,
// // // // //         role: c.role_artist,
// // // // //         play: {
// // // // //           title: c.play.title,
// // // // //           slug: c.play.slug,
// // // // //           poster_url: c.play.poster_url,
// // // // //           year: new Date(c.play.release_date).getFullYear().toString()
// // // // //         }
// // // // //       })),
      
// // // // //       // Default fields to satisfy EnsembleMember type (not strictly used here but good for type safety)
// // // // //       role: tenures?.[0]?.role_student || 'Member',
// // // // //       department: member.department || '',
// // // // //       rank: 'CLOUD',
// // // // //       sort_order: 99,
// // // // //       year: 'N/A'
// // // // //     };

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure (Profile):", err);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // src/lib/api.ts

// // // // // // ... existing imports

// // // // // // NEW: Fetch ALL slugs for the Artist Pages (Past & Present)
// // // // // export async function getAllMemberSlugs(client?: SupabaseClient): Promise<{ slug: string }[]> {
// // // // //   const supabase = client ?? await createClient();
  
// // // // //   const { data, error } = await supabase
// // // // //     .from('team_members')
// // // // //     .select('slug')
// // // // //     .is('deleted_at', null); // Fetch everyone who isn't deleted

// // // // //   if (error) {
// // // // //     console.warn("Brain Warning: Could not fetch member slugs.", error);
// // // // //     return [];
// // // // //   }
  
// // // // //   return data || [];
// // // // // }

// // // // // // src/lib/api.ts

// // // // // // ... imports

// // // // // // export interface ArtistSummary {
// // // // // //   id: string;
// // // // // //   name: string;
// // // // // //   slug: string;
// // // // // //   image_url: string | null;
// // // // // //   color: string;
// // // // // //   label: string; // e.g. "Secretary" or "Actor" or "Alumni"
// // // // // // }

// // // // // // // 7. THE CAST (Fetch All Artists)
// // // // // // export async function getAllArtists(): Promise<ArtistSummary[]> {
// // // // // //   const supabase = await createClient();

// // // // // //   const { data, error } = await supabase
// // // // // //     .from('team_members')
// // // // // //     .select(`
// // // // // //       id, name, slug, image_url, color,
// // // // // //       tenures (role_student, is_current),
// // // // // //       credits (role_artist)
// // // // // //     `)
// // // // // //     .is('deleted_at', null)
// // // // // //     .order('name', { ascending: true }); // Alphabetical

// // // // // //   if (error) return [];

// // // // // //   // SMART LABEL LOGIC:
// // // // // //   // 1. If they have a Current Tenure -> Use that (e.g. "Secretary")
// // // // // //   // 2. If they have Past Tenure -> "Alumni"
// // // // // //   // 3. If they have Credits -> "Artist"
// // // // // //   // 4. Fallback -> "Member"
  
// // // // // //   return (data || []).map((m: any) => {
// // // // // //     let label = "Member";
// // // // // //     const currentTenure = m.tenures?.find((t: any) => t.is_current);
// // // // // //     const pastTenure = m.tenures?.length > 0;
// // // // // //     const hasCredits = m.credits?.length > 0;

// // // // // //     if (currentTenure) label = currentTenure.role_student;
// // // // // //     else if (pastTenure) label = "Alumni";
// // // // // //     else if (hasCredits) label = "Artist";

// // // // // //     return {
// // // // // //       id: m.id,
// // // // // //       name: m.name,
// // // // // //       slug: m.slug,
// // // // // //       image_url: m.image_url,
// // // // // //       color: m.color || '#eab308',
// // // // // //       label: label
// // // // // //     };
// // // // // //   });
// // // // // // }

// // // // // // src/lib/api.ts

// // // // // export interface ArtistSummary {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   slug: string;
// // // // //   image_url: string | null;
// // // // //   color: string;
// // // // //   primary_role: string; // The "Big Title" (e.g. Secretary)
// // // // //   roles: string[];      // The "Full List" (e.g. ["Secretary", "Actor", "Director"])
// // // // // }

// // // // // export async function getAllArtists(): Promise<ArtistSummary[]> {
// // // // //   const supabase = await createClient();

// // // // //   const { data, error } = await supabase
// // // // //     .from('team_members')
// // // // //     .select(`
// // // // //       id, name, slug, image_url, color,
// // // // //       tenures (role_student, is_current),
// // // // //       credits (role_artist)
// // // // //     `)
// // // // //     .is('deleted_at', null)
// // // // //     .order('name', { ascending: true });

// // // // //   if (error) return [];

// // // // //   return (data || []).map((m: any) => {
// // // // //     // 1. COLLECT ALL ROLES
// // // // //     const roleSet = new Set<string>();
    
// // // // //     // Add Tenure Roles
// // // // //     m.tenures?.forEach((t: any) => roleSet.add(t.role_student));
// // // // //     // Add Credit Roles (Actor, Director, etc.)
// // // // //     m.credits?.forEach((c: any) => roleSet.add(c.role_artist));
    
// // // // //     // Fallback
// // // // //     if (roleSet.size === 0) roleSet.add("Member");

// // // // //     // 2. DETERMINE PRIMARY (HIERARCHY) ROLE
// // // // //     let primary = "Member";
// // // // //     const currentTenure = m.tenures?.find((t: any) => t.is_current);
    
// // // // //     if (currentTenure) primary = currentTenure.role_student;
// // // // //     else if (m.tenures?.length > 0) primary = "Alumni";
// // // // //     else if (m.credits?.length > 0) primary = Array.from(roleSet)[0]; // Pick first creative role

// // // // //     return {
// // // // //       id: m.id,
// // // // //       name: m.name,
// // // // //       slug: m.slug,
// // // // //       image_url: m.image_url,
// // // // //       color: m.color || '#eab308',
// // // // //       primary_role: primary,
// // // // //       roles: Array.from(roleSet) // Convert Set to Array
// // // // //     };
// // // // //   });
// // // // // }

// // // // // // src/lib/api.ts

// // // // // // src/lib/api.ts

// // // // // // ... existing imports

// // // // // // --- 8. THE CHRONICLE (Events System) ---

// // // // // // A. Get the Active "Signal" (Challenge)
// // // // // export async function getActiveChallenge() {
// // // // //   const supabase = await createClient();
  
// // // // //   const { data } = await supabase
// // // // //     .from('challenges')
// // // // //     .select('*')
// // // // //     .eq('status', 'active')
// // // // //     .gt('deadline', new Date().toISOString()) // Only future deadlines
// // // // //     .order('deadline', { ascending: true }) // Get the most urgent one
// // // // //     .limit(1)
// // // // //     .single();

// // // // //   return data; // Returns null if no active challenge
// // // // // }

// // // // // // B. Get The Timeline (All Events)
// // // // // export async function getEvents(): Promise<EventItem[]> {
// // // // //   const supabase = await createClient();
  
// // // // //   const { data, error } = await supabase
// // // // //     .from('events')
// // // // //     .select(`
// // // // //       id,
// // // // //       title,
// // // // //       slug,
// // // // //       date,
// // // // //       type,
// // // // //       location,
// // // // //       description,
// // // // //       featured_image_url,
// // // // //       poster_url,
// // // // //       registration_link,
// // // // //       created_at
// // // // //       `)
// // // // //     .is('deleted_at', null)
// // // // //     .order('date', { ascending: false }); // Fetch all, we sort in UI

// // // // //   if (error) {
// // // // //     console.warn("Brain Warning: Could not fetch events.", error);
// // // // //     return [];
// // // // //   }
// // // // //   return ( data as any[]) || [];
// // // // // }










// // // // // // src/lib/api.ts
// // // // // import { createClient } from "@/lib/supabase/server";
// // // // // import { EnsembleMember, ArtistSummary, MemberProfile, Play, EventItem } from "@/types/schema";
// // // // // import { SupabaseClient } from "@supabase/supabase-js";


// // // // // // --- 1. THE LATEST ORIGINAL ---
// // // // // export async function getLatestOriginal(): Promise<Play | null> {
// // // // //   const supabase = await createClient();
// // // // //   try {
// // // // //     const { data } = await supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .is('deleted_at', null)
// // // // //       .order('release_date', { ascending: false })
// // // // //       .limit(1)
// // // // //       .single();
    
// // // // //     return data as Play;
// // // // //   } catch (err) {
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // --- 2. THE SECRETARY (Landing Page) ---
// // // // // export async function getSecretary(): Promise<TeamMember | null> {
// // // // //   const supabase = await createClient();
// // // // //   try {
// // // // //     const { data, error } = await supabase
// // // // //       .from('tenures')
// // // // //       .select(`
// // // // //         role_student,
// // // // //         department,
// // // // //         member:team_members (
// // // // //           id, name, slug, image_url, bio, social_links, color, voice_note_url
// // // // //         )
// // // // //       `)
// // // // //       .eq('role_student', 'Secretary')
// // // // //       .is('deleted_at', null)
// // // // //       .maybeSingle();

// // // // //     if (error || !data || !data.member) {
// // // // //       return null;
// // // // //     }

// // // // //     // Flattening for the basic TeamMember type
// // // // //     const m = Array.isArray(data.member) ? data.member[0] : data.member;
// // // // //     return {
// // // // //       ...m,
// // // // //       role_student: data.role_student,
// // // // //       department: data.department
// // // // //     } as TeamMember;

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure:", err);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // // --- 3. THE SEEKER (Play by Slug) ---
// // // // // // export async function getPlayBySlug(slug: string): Promise<Play | null> {
// // // // // //   const supabase = await createClient();
  
// // // // // //   try {
// // // // // //     const { data, error } = await supabase
// // // // // //       .from('plays')
// // // // // //       .select('*')
// // // // // //       .eq('slug', slug)
// // // // // //       .is('deleted_at', null)
// // // // // //       .single();

// // // // // //     if (error) return null;
// // // // // //     return data as Play;
// // // // // //   } catch (err) {
// // // // // //     return null;
// // // // // //   }
// // // // // // }

// // // // // // src/lib/api.ts

// // // // // // --- 3. THE SEEKER (Play by Slug + Cast & Crew) ---
// // // // // export async function getPlayBySlug(slug: string): Promise<Play | null> {
// // // // //   const supabase = await createClient();
  
// // // // //   try {
// // // // //     const { data, error } = await supabase
// // // // //       .from('plays')
// // // // //       .select(`
// // // // //         *,
// // // // //         credits (
// // // // //           role_artist,
// // // // //           team_members (
// // // // //             name,
// // // // //             slug,
// // // // //             image_url,
// // // // //             color
// // // // //           )
// // // // //         )
// // // // //       `)
// // // // //       .eq('slug', slug)
// // // // //       .is('deleted_at', null)
// // // // //       .single();

// // // // //     if (error) {
// // // // //       console.warn(`Brain Warning: Play '${slug}' not found.`);
// // // // //       return null;
// // // // //     }

// // // // //     return data as Play;
// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure:", err);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // --- 4. THE ARCHIVIST (Pagination) ---
// // // // // export async function getPlays(
// // // // //   page: number = 1, 
// // // // //   limit: number = 12,
// // // // //   category: PlayCategory | 'all' = 'all'
// // // // // ): Promise<Play[]> {
// // // // //   const supabase = await createClient();
// // // // //   const from = (page - 1) * limit;
// // // // //   const to = from + limit - 1;

// // // // //   try {
// // // // //     let query = supabase
// // // // //       .from('plays')
// // // // //       .select('*')
// // // // //       .is('deleted_at', null);

// // // // //     if (category !== 'all') {
// // // // //       query = query.eq('category', category);
// // // // //     }

// // // // //     query = query
// // // // //       .order('featured_score', { ascending: false })
// // // // //       .order('release_date', { ascending: false })
// // // // //       .range(from, to);

// // // // //     const { data, error } = await query;
// // // // //     if (error) return [];

// // // // //     return data as Play[];
// // // // //   } catch (err) {
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // // --- 5. THE CONSTELLATION (Ensemble Page) ---
// // // // // // This is the new logic connecting Tenures + Navarasa Colors
// // // // // // export async function getEnsemble(year: string = '2025-26', client?: SupabaseClient): Promise<EnsembleMember[]> {
// // // // // //   const supabase = client ?? await createClient();

// // // // // //   try {
// // // // // //     // 1. COMPLEX JOIN FETCH
// // // // // //     const { data: tenures, error } = await supabase
// // // // // //       .from('tenures')
// // // // // //       .select(`
// // // // // //         role_student,
// // // // // //         department,
// // // // // //         rank,
// // // // // //         sort_order,
// // // // // //         year,
// // // // // //         member:team_members (
// // // // // //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// // // // // //         )
// // // // // //       `)
// // // // // //       .eq('year', year)
// // // // // //       .is('deleted_at', null)
// // // // // //       // Sort by Hierarchy (1. Secretary, 2. Heads...)
// // // // // //       .order('sort_order', { ascending: true });

// // // // // //     if (error) {
// // // // // //       console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`, error);
// // // // // //       return [];
// // // // // //     }

// // // // // //     // 2. DATA FLATTENING (The Adapter)
// // // // // //     // We map DB columns to the strictly typed EnsembleMember interface
// // // // // //     return (tenures || []).map((t: any) => ({
// // // // // //       id: t.member.id,
// // // // // //       name: t.member.name,
// // // // // //       slug: t.member.slug,
// // // // // //       role: t.role_student, // DB: role_student -> UI: role
// // // // // //       department: t.department,
// // // // // //       bio: t.member.bio,
// // // // // //       year: t.year,
// // // // // //       rank: t.rank,         
// // // // // //       sort_order: t.sort_order, 
// // // // // //       image_url: t.member.image_url,
// // // // // //       audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
// // // // // //       color: t.member.color || '#eab308',  // Fallback to Gold
// // // // // //       social_links: t.member.social_links
// // // // // //     })) as EnsembleMember[];

// // // // // //   } catch (err) {
// // // // // //     console.error("Brain Failure (Ensemble):", err);
// // // // // //     return [];
// // // // // //   }
// // // // // // }


// // // // // // ---5. THE CONSTELLATION (Ensemble Page)---
// // // // // // export async function getEnsemble(year: string = '2025-26', client?: SupabaseClient): Promise<EnsembleMember[]> {
// // // // // //   const supabase = client ?? await createClient();

// // // // // //   try {
// // // // // //     let query = supabase
// // // // // //       .from('tenures')
// // // // // //       .select(`
// // // // // //         role_student,
// // // // // //         department,
// // // // // //         rank,
// // // // // //         sort_order,
// // // // // //         year,
// // // // // //         member:team_members (
// // // // // //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// // // // // //           )
// // // // // //         `)
// // // // // //         .is('deleted_at', null);
    
// // // // // //     // Logic: Faculty vs Year Filter
// // // // // //     if (year === 'faculty') {
// // // // // //       //Fetch anyone with ZENITH RANK OR 'Faculty' in title, regardless of year
// // // // // //       // we use .or() to be safe, but rank = "ZENITH" is the God mode indicator
// // // // // //       query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`);

// // // // // //     } else {
// // // // // //       // Regular Year-based Fetch
// // // // // //       query = query.eq('year', year);
// // // // // //     }

// // // // // //     const { data: tenures, error } = await query.order('sort_order', { ascending: true });
    
// // // // // //     if (error) {
// // // // // //       console.warn(`Brain Warning: Could not fetch ensemble for ${year}.`, error);
// // // // // //       return [];
// // // // // //     }

// // // // // //     // Mapper (Handle Null Members Safely)
// // // // // //     return (tenures || [])
// // // // // //       .filter((t: any) => t.member !== null && t.member !== undefined)
// // // // // //       .map((t: any) => ({
// // // // // //         id: t.member.id,
// // // // // //         name: t.member.name,
// // // // // //         slug: t.member.slug,
// // // // // //         role: t.role_student, // DB: role_student -> UI: role
// // // // // //         rank: t.rank,
// // // // // //         department: t.department,
// // // // // //         image_url: t.member.image_url,
// // // // // //         bio: t.member.bio,
// // // // // //         year: t.year,
// // // // // //         social_links: t.member.social_links,
// // // // // //         audio_url: t.member.voice_note_url, // DB: voice_note_url -> UI: audio_url
// // // // // //         color: t.member.color || '#eab308',  // Fallback to Gold
// // // // // //         sort_order: t.sort_order,
// // // // // //       })) as EnsembleMember[];



// // // // // //   } catch (err){
// // // // // //     console.error("Brain Failure (Ensemble):", err);
// // // // // //     return [];
// // // // // //   }
// // // // // // }



// // // // // // --- 1. GET ENSEMBLE (The Roster) ---
// // // // // export async function getEnsemble(year: string = '2025-2026'): Promise<EnsembleMember[]> {
// // // // //   const supabase = await createClient();
  
// // // // //   try {
// // // // //     let query = supabase
// // // // //       .from('tenures')
// // // // //       .select(`
// // // // //         role_student, department, rank, sort_order, year,
// // // // //         member:team_members (
// // // // //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// // // // //         )
// // // // //       `)
// // // // //       .order('sort_order', { ascending: true }); // <--- CONTROL: You decide who is on top

// // // // //     // LOGIC: FACULTY vs YEAR
// // // // //     if (year === 'Faculty') {
// // // // //         // Fetch ALL Faculty tenures ever, sorted by year desc (latest first)
// // // // //         query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`).order('year', { ascending: false });
// // // // //     } else {
// // // // //         // Fetch Specific Year
// // // // //         query = query.eq('year', year);
// // // // //     }

// // // // //     const { data: tenures, error } = await query;

// // // // //     if (error || !tenures) {
// // // // //         console.warn(`Brain: Ensemble fetch failed for ${year}`, error);
// // // // //         return [];
// // // // //     }

// // // // //     // MAPPER & DEDUPLICATOR
// // // // //     const seenMembers = new Set();
// // // // //     const cleanList: EnsembleMember[] = [];

// // // // //     for (const t of tenures) {
// // // // //         if (!t.member) continue; // Skip broken links
        
// // // // //         // DEDUPLICATE: Only for Faculty (Show their latest profile only)
// // // // //         if (year === 'Faculty') {
// // // // //             if (seenMembers.has(t.member.id)) continue;
// // // // //             seenMembers.add(t.member.id);
// // // // //         }

// // // // //         cleanList.push({
// // // // //             id: t.member.id,
// // // // //             name: t.member.name,
// // // // //             slug: t.member.slug,
// // // // //             role: t.role_student,      
// // // // //             rank: t.rank,              
// // // // //             department: t.department,
// // // // //             sort_order: t.sort_order,
// // // // //             image_url: t.member.image_url,
// // // // //             bio: t.member.bio,
// // // // //             year: t.year,
// // // // //             social_links: t.member.social_links,
// // // // //             voice_note_url: t.member.voice_note_url,
// // // // //             color: t.member.color || '#eab308'
// // // // //         });
// // // // //     }

// // // // //     return cleanList;

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure (Ensemble):", err);
// // // // //     return [];
// // // // //   }
// // // // // }

// // // // // // --- 2. GET ALL ARTISTS (The Portfolio) ---
// // // // // export async function getAllArtists(): Promise<ArtistSummary[]> {
// // // // //     const supabase = await createClient();

// // // // //     // Fetch EVERYONE who has a tenure OR a credit
// // // // //     const { data, error } = await supabase
// // // // //         .from('team_members')
// // // // //         .select(`
// // // // //             id, name, slug, image_url, color,
// // // // //             tenures (role_student),
// // // // //             credits (role_artist)
// // // // //         `)
// // // // //         .is('deleted_at', null)
// // // // //         .order('name', { ascending: true });

// // // // //     if (error) return [];

// // // // //     // Filter: Eliminate Ghosts (People with 0 work history)
// // // // //     return (data || [])
// // // // //         .filter((m: any) => m.tenures.length > 0 || m.credits.length > 0)
// // // // //         .map((m: any) => {
// // // // //             // Smart Labeling Logic
// // // // //             let label = "Artist";
// // // // //             // 1. If they were ever Secretary, that's their badge
// // // // //             if (m.tenures.some((t: any) => t.role_student.includes('Secretary'))) label = "Secretary";
// // // // //             // 2. Else, use their latest official title
// // // // //             else if (m.tenures.length > 0) label = m.tenures[0].role_student; 
// // // // //             // 3. Else, if they only acted, use "Actor" (or look up specific role if needed)
// // // // //             else if (m.credits.length > 0) label = "Thespian";

// // // // //             return {
// // // // //                 id: m.id,
// // // // //                 name: m.name,
// // // // //                 slug: m.slug,
// // // // //                 image_url: m.image_url,
// // // // //                 color: m.color || '#eab308',
// // // // //                 label: label
// // // // //             };
// // // // //         });
// // // // // }

// // // // // // --- 6. THE PROTAGONIST (Full Profile Fetch) ---
// // // // // export async function getMemberProfile(slug: string, client?: SupabaseClient): Promise<MemberProfile | null> {
// // // // //   const supabase = client ?? await createClient();

// // // // //   try {
// // // // //     // 1. Fetch Core Identity
// // // // //     const { data: member, error } = await supabase
// // // // //       .from('team_members')
// // // // //       .select('*')
// // // // //       .eq('slug', slug)
// // // // //       .is('deleted_at', null)
// // // // //       .single();

// // // // //     if (error || !member) return null;

// // // // //     // 2. Fetch History (Tenures)
// // // // //     const { data: tenures } = await supabase
// // // // //       .from('tenures')
// // // // //       .select('role_student, year, is_current')
// // // // //       .eq('member_id', member.id)
// // // // //       .order('year', { ascending: false }); // Newest first

// // // // //     // 3. Fetch Filmography (Credits -> Plays)
// // // // //     const { data: credits } = await supabase
// // // // //       .from('credits')
// // // // //       .select(`
// // // // //         id,
// // // // //         role_artist,
// // // // //         play:plays (
// // // // //           title, slug, poster_url, release_date
// // // // //         )
// // // // //       `)
// // // // //       .eq('member_id', member.id);

// // // // //     // 4. THE ASSEMBLY
// // // // //     return {
// // // // //       id: member.id,
// // // // //       name: member.name,
// // // // //       slug: member.slug,
// // // // //       bio: member.bio,
// // // // //       image_url: member.image_url,
// // // // //       audio_url: member.voice_note_url,
// // // // //       color: member.color || '#eab308',
// // // // //       social_links: member.social_links,
      
// // // // //       // Map Tenures
// // // // //       tenures: (tenures || []).map((t: any) => ({
// // // // //         role: t.role_student,
// // // // //         year: t.year,
// // // // //         is_current: t.is_current
// // // // //       })),
      
// // // // //       // Map Credits
// // // // //       credits: (credits || []).map((c: any) => ({
// // // // //         id: c.id,
// // // // //         role: c.role_artist,
// // // // //         play: {
// // // // //           title: c.play.title,
// // // // //           slug: c.play.slug,
// // // // //           poster_url: c.play.poster_url,
// // // // //           year: new Date(c.play.release_date).getFullYear().toString()
// // // // //         }
// // // // //       })),
      
// // // // //       // Default fields to satisfy EnsembleMember type (not strictly used here but good for type safety)
// // // // //       role: tenures?.[0]?.role_student || 'Member',
// // // // //       department: member.department || '',
// // // // //       rank: 'CLOUD',
// // // // //       sort_order: 99,
// // // // //       year: 'N/A'
// // // // //     };

// // // // //   } catch (err) {
// // // // //     console.error("Brain Failure (Profile):", err);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // src/lib/api.ts

// // // // // // ... existing imports

// // // // // // NEW: Fetch ALL slugs for the Artist Pages (Past & Present)
// // // // // export async function getAllMemberSlugs(client?: SupabaseClient): Promise<{ slug: string }[]> {
// // // // //   const supabase = client ?? await createClient();
  
// // // // //   const { data, error } = await supabase
// // // // //     .from('team_members')
// // // // //     .select('slug')
// // // // //     .is('deleted_at', null); // Fetch everyone who isn't deleted

// // // // //   if (error) {
// // // // //     console.warn("Brain Warning: Could not fetch member slugs.", error);
// // // // //     return [];
// // // // //   }
  
// // // // //   return data || [];
// // // // // }

// // // // // // src/lib/api.ts

// // // // // // ... imports

// // // // // // export interface ArtistSummary {
// // // // // //   id: string;
// // // // // //   name: string;
// // // // // //   slug: string;
// // // // // //   image_url: string | null;
// // // // // //   color: string;
// // // // // //   label: string; // e.g. "Secretary" or "Actor" or "Alumni"
// // // // // // }

// // // // // // // 7. THE CAST (Fetch All Artists)
// // // // // // export async function getAllArtists(): Promise<ArtistSummary[]> {
// // // // // //   const supabase = await createClient();

// // // // // //   const { data, error } = await supabase
// // // // // //     .from('team_members')
// // // // // //     .select(`
// // // // // //       id, name, slug, image_url, color,
// // // // // //       tenures (role_student, is_current),
// // // // // //       credits (role_artist)
// // // // // //     `)
// // // // // //     .is('deleted_at', null)
// // // // // //     .order('name', { ascending: true }); // Alphabetical

// // // // // //   if (error) return [];

// // // // // //   // SMART LABEL LOGIC:
// // // // // //   // 1. If they have a Current Tenure -> Use that (e.g. "Secretary")
// // // // // //   // 2. If they have Past Tenure -> "Alumni"
// // // // // //   // 3. If they have Credits -> "Artist"
// // // // // //   // 4. Fallback -> "Member"
  
// // // // // //   return (data || []).map((m: any) => {
// // // // // //     let label = "Member";
// // // // // //     const currentTenure = m.tenures?.find((t: any) => t.is_current);
// // // // // //     const pastTenure = m.tenures?.length > 0;
// // // // // //     const hasCredits = m.credits?.length > 0;

// // // // // //     if (currentTenure) label = currentTenure.role_student;
// // // // // //     else if (pastTenure) label = "Alumni";
// // // // // //     else if (hasCredits) label = "Artist";

// // // // // //     return {
// // // // // //       id: m.id,
// // // // // //       name: m.name,
// // // // // //       slug: m.slug,
// // // // // //       image_url: m.image_url,
// // // // // //       color: m.color || '#eab308',
// // // // // //       label: label
// // // // // //     };
// // // // // //   });
// // // // // // }

// // // // // // src/lib/api.ts

// // // // // export interface ArtistSummary {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   slug: string;
// // // // //   image_url: string | null;
// // // // //   color: string;
// // // // //   primary_role: string; // The "Big Title" (e.g. Secretary)
// // // // //   roles: string[];      // The "Full List" (e.g. ["Secretary", "Actor", "Director"])
// // // // // }

// // // // // export async function getAllArtists(): Promise<ArtistSummary[]> {
// // // // //   const supabase = await createClient();

// // // // //   const { data, error } = await supabase
// // // // //     .from('team_members')
// // // // //     .select(`
// // // // //       id, name, slug, image_url, color,
// // // // //       tenures (role_student, is_current),
// // // // //       credits (role_artist)
// // // // //     `)
// // // // //     .is('deleted_at', null)
// // // // //     .order('name', { ascending: true });

// // // // //   if (error) return [];

// // // // //   return (data || []).map((m: any) => {
// // // // //     // 1. COLLECT ALL ROLES
// // // // //     const roleSet = new Set<string>();
    
// // // // //     // Add Tenure Roles
// // // // //     m.tenures?.forEach((t: any) => roleSet.add(t.role_student));
// // // // //     // Add Credit Roles (Actor, Director, etc.)
// // // // //     m.credits?.forEach((c: any) => roleSet.add(c.role_artist));
    
// // // // //     // Fallback
// // // // //     if (roleSet.size === 0) roleSet.add("Member");

// // // // //     // 2. DETERMINE PRIMARY (HIERARCHY) ROLE
// // // // //     let primary = "Member";
// // // // //     const currentTenure = m.tenures?.find((t: any) => t.is_current);
    
// // // // //     if (currentTenure) primary = currentTenure.role_student;
// // // // //     else if (m.tenures?.length > 0) primary = "Alumni";
// // // // //     else if (m.credits?.length > 0) primary = Array.from(roleSet)[0]; // Pick first creative role

// // // // //     return {
// // // // //       id: m.id,
// // // // //       name: m.name,
// // // // //       slug: m.slug,
// // // // //       image_url: m.image_url,
// // // // //       color: m.color || '#eab308',
// // // // //       primary_role: primary,
// // // // //       roles: Array.from(roleSet) // Convert Set to Array
// // // // //     };
// // // // //   });
// // // // // }

// // // // // // src/lib/api.ts

// // // // // // src/lib/api.ts

// // // // // // ... existing imports

// // // // // // --- 8. THE CHRONICLE (Events System) ---

// // // // // // A. Get the Active "Signal" (Challenge)
// // // // // export async function getActiveChallenge() {
// // // // //   const supabase = await createClient();
  
// // // // //   const { data } = await supabase
// // // // //     .from('challenges')
// // // // //     .select('*')
// // // // //     .eq('status', 'active')
// // // // //     .gt('deadline', new Date().toISOString()) // Only future deadlines
// // // // //     .order('deadline', { ascending: true }) // Get the most urgent one
// // // // //     .limit(1)
// // // // //     .single();

// // // // //   return data; // Returns null if no active challenge
// // // // // }

// // // // // // B. Get The Timeline (All Events)
// // // // // export async function getEvents(): Promise<EventItem[]> {
// // // // //   const supabase = await createClient();
  
// // // // //   const { data, error } = await supabase
// // // // //     .from('events')
// // // // //     .select(`
// // // // //       id,
// // // // //       title,
// // // // //       slug,
// // // // //       date,
// // // // //       type,
// // // // //       location,
// // // // //       description,
// // // // //       featured_image_url,
// // // // //       poster_url,
// // // // //       registration_link,
// // // // //       created_at
// // // // //       `)
// // // // //     .is('deleted_at', null)
// // // // //     .order('date', { ascending: false }); // Fetch all, we sort in UI

// // // // //   if (error) {
// // // // //     console.warn("Brain Warning: Could not fetch events.", error);
// // // // //     return [];
// // // // //   }
// // // // //   return ( data as any[]) || [];
// // // // // }


// // // // import { createClient } from "@/lib/supabase/server";
// // // // import { 
// // // //   Play, 
// // // //   TeamMember, 
// // // //   PlayCategory, 
// // // //   EnsembleMember, 
// // // //   MemberProfile, 
// // // //   ArtistSummary, 
// // // //   EventItem,
// // // //   Challenge
// // // // } from "@/types/schema";
// // // // import { SupabaseClient } from "@supabase/supabase-js";

// // // // // ==============================================================================
// // // // // 1. THE ORIGINALS (Plays & Productions)
// // // // // ==============================================================================

// // // // // --- Fetch the Highlight Play (For Home Page Hero) ---
// // // // export async function getLatestOriginal(): Promise<Play | null> {
// // // //   const supabase = await createClient();
// // // //   try {
// // // //     const { data } = await supabase
// // // //       .from('plays')
// // // //       .select('*')
// // // //       .is('deleted_at', null)
// // // //       .order('release_date', { ascending: false })
// // // //       .limit(1)
// // // //       .single();
    
// // // //     return data as Play;
// // // //   } catch (err) {
// // // //     console.error("API Error (Latest Original):", err);
// // // //     return null;
// // // //   }
// // // // }

// // // // // --- Fetch Play Details + Cast (For Individual Play Page) ---
// // // // export async function getPlayBySlug(slug: string): Promise<Play | null> {
// // // //   const supabase = await createClient();
  
// // // //   try {
// // // //     const { data, error } = await supabase
// // // //       .from('plays')
// // // //       .select(`
// // // //         *,
// // // //         credits (
// // // //           role_artist,
// // // //           team_members (
// // // //             name,
// // // //             slug,
// // // //             image_url,
// // // //             color
// // // //           )
// // // //         )
// // // //       `)
// // // //       .eq('slug', slug)
// // // //       .is('deleted_at', null)
// // // //       .single();

// // // //     if (error) {
// // // //       console.warn(`API Warning: Play '${slug}' not found.`);
// // // //       return null;
// // // //     }

// // // //     return data as Play;
// // // //   } catch (err) {
// // // //     console.error("API Error (Get Play):", err);
// // // //     return null;
// // // //   }
// // // // }

// // // // // --- Fetch All Plays (For Archive/Gallery) ---
// // // // export async function getPlays(
// // // //   page: number = 1, 
// // // //   limit: number = 12,
// // // //   category: PlayCategory | 'all' = 'all'
// // // // ): Promise<Play[]> {
// // // //   const supabase = await createClient();
// // // //   const from = (page - 1) * limit;
// // // //   const to = from + limit - 1;

// // // //   try {
// // // //     let query = supabase
// // // //       .from('plays')
// // // //       .select('*')
// // // //       .is('deleted_at', null);

// // // //     if (category !== 'all') {
// // // //       query = query.eq('category', category);
// // // //     }

// // // //     query = query
// // // //       .order('featured_score', { ascending: false }) // Curated first
// // // //       .order('release_date', { ascending: false })   // Then newest
// // // //       .range(from, to);

// // // //     const { data, error } = await query;
// // // //     if (error) return [];

// // // //     return data as Play[];
// // // //   } catch (err) {
// // // //     return [];
// // // //   }
// // // // }

// // // // // ==============================================================================
// // // // // 2. THE ENSEMBLE (Roster & Team)
// // // // // ==============================================================================

// // // // // --- Fetch the Secretary (For Home Page Desk) ---
// // // // export async function getSecretary(): Promise<TeamMember | null> {
// // // //   const supabase = await createClient();
// // // //   try {
// // // //     const { data, error } = await supabase
// // // //       .from('tenures')
// // // //       .select(`
// // // //         role_student,
// // // //         department,
// // // //         member:team_members (
// // // //           id, name, slug, image_url, bio, social_links, color, voice_note_url
// // // //         )
// // // //       `)
// // // //       .ilike('role_student', '%Secretary%') // Fuzzy match to catch "General Secretary" etc.
// // // //       .eq('is_current', true)
// // // //       .maybeSingle();

// // // //     if (error || !data || !data.member) return null;

// // // //     // Flatten for UI
// // // //     const m: any = Array.isArray(data.member) ? data.member[0] : data.member;
// // // //     return {
// // // //       ...m,
// // // //       role_student: data.role_student,
// // // //       department: data.department
// // // //     } as TeamMember;

// // // //   } catch (err) {
// // // //     console.error("API Error (Secretary):", err);
// // // //     return null;
// // // //   }
// // // // }

// // // // // --- Fetch The Lineage (For Ensemble Page Timeline) ---
// // // // export async function getEnsemble(year: string = '2025-2026'): Promise<EnsembleMember[]> {
// // // //   const supabase = await createClient();
  
// // // //   try {
// // // //     let query = supabase
// // // //       .from('tenures')
// // // //       .select(`
// // // //         role_student, department, rank, sort_order, year,
// // // //         member:team_members (
// // // //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// // // //         )
// // // //       `)
// // // //       .order('sort_order', { ascending: true }); // Hierarchy Sort (Crown -> Cloud)

// // // //     // LOGIC: FACULTY vs ACADEMIC YEAR
// // // //     if (year === 'Faculty') {
// // // //         // Fetch ALL Faculty tenures ever
// // // //         // Using .or() to catch explicit Rank OR Role title
// // // //         query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`).order('year', { ascending: false });
// // // //     } else {
// // // //         // Fetch Specific Academic Year
// // // //         query = query.eq('year', year);
// // // //     }

// // // //     const { data: tenures, error } = await query;

// // // //     if (error || !tenures) {
// // // //         console.warn(`API Warning: Ensemble fetch empty for ${year}`, error);
// // // //         return [];
// // // //     }

// // // //     // INTELLIGENT MAPPING & DEDUPLICATION
// // // //     const seenMembers = new Set();
// // // //     const cleanList: EnsembleMember[] = [];

// // // //     for (const t of tenures) {
// // // //         if (!t.member) continue; // Skip broken records
        
// // // //         // DEDUPLICATE: Only needed for Faculty (Keep latest tenure)
// // // //         if (year === 'Faculty') {
// // // //             if (seenMembers.has(t.member.id)) continue;
// // // //             seenMembers.add(t.member.id);
// // // //         }

// // // //         cleanList.push({
// // // //             id: t.member.id,
// // // //             name: t.member.name,
// // // //             slug: t.member.slug,
// // // //             role: t.role_student,      // Database 'role_student' -> UI 'role'
// // // //             rank: t.rank,              
// // // //             department: t.department,
// // // //             sort_order: t.sort_order,
// // // //             image_url: t.member.image_url,
// // // //             bio: t.member.bio,
// // // //             year: t.year,
// // // //             social_links: t.member.social_links,
// // // //             voice_note_url: t.member.voice_note_url, // Database 'voice_note_url' -> UI 'audio_url' logic
// // // //             color: t.member.color || '#eab308'
// // // //         });
// // // //     }

// // // //     return cleanList;

// // // //   } catch (err) {
// // // //     console.error("API Error (Ensemble):", err);
// // // //     return [];
// // // //   }
// // // // }

// // // // // ==============================================================================
// // // // // 3. THE ARTIST PORTFOLIO (Grid & Profiles)
// // // // // ==============================================================================

// // // // // --- Fetch All Artists (For The Grid) ---
// // // // export async function getAllArtists(): Promise<ArtistSummary[]> {
// // // //     const supabase = await createClient();

// // // //     // Fetch EVERYONE with their history
// // // //     const { data, error } = await supabase
// // // //         .from('team_members')
// // // //         .select(`
// // // //             id, name, slug, image_url, color,
// // // //             tenures (role_student, is_current),
// // // //             credits (role_artist)
// // // //         `)
// // // //         .is('deleted_at', null)
// // // //         .order('name', { ascending: true });

// // // //     if (error) return [];

// // // //     return (data || [])
// // // //         // FILTER: Eliminate Ghosts (People with 0 work history)
// // // //         .filter((m: any) => (m.tenures?.length > 0 || m.credits?.length > 0))
// // // //         .map((m: any) => {
// // // //             // 1. Collect All Roles into a Set
// // // //             const roleSet = new Set<string>();
// // // //             m.tenures?.forEach((t: any) => roleSet.add(t.role_student));
// // // //             m.credits?.forEach((c: any) => roleSet.add(c.role_artist));
            
// // // //             // 2. Determine Primary Role (The Badge)
// // // //             let primary = "Member";
// // // //             const currentTenure = m.tenures?.find((t: any) => t.is_current);
            
// // // //             if (currentTenure) primary = currentTenure.role_student;
// // // //             else if (m.tenures?.length > 0) primary = "Alumni";
// // // //             else if (m.credits?.length > 0) primary = Array.from(roleSet)[0]; // Pick first creative role

// // // //             return {
// // // //                 id: m.id,
// // // //                 name: m.name,
// // // //                 slug: m.slug,
// // // //                 image_url: m.image_url,
// // // //                 color: m.color || '#eab308',
// // // //                 primary_role: primary,
// // // //                 roles: Array.from(roleSet)
// // // //             };
// // // //         });
// // // // }

// // // // // --- Fetch Full Profile (For The Dossier Page) ---
// // // // export async function getMemberProfile(slug: string): Promise<MemberProfile | null> {
// // // //     const supabase = await createClient();

// // // //     // 1. Fetch Identity
// // // //     const { data: member } = await supabase
// // // //         .from('team_members')
// // // //         .select('*')
// // // //         .eq('slug', slug)
// // // //         .single();

// // // //     if (!member) return null;

// // // //     // 2. Fetch History (Tenures)
// // // //     const { data: tenures } = await supabase
// // // //         .from('tenures')
// // // //         .select('*')
// // // //         .eq('member_id', member.id)
// // // //         .order('year', { ascending: false });

// // // //     // 3. Fetch Works (Credits)
// // // //     const { data: credits } = await supabase
// // // //         .from('credits')
// // // //         .select(`id, role_artist, play:plays(title, slug, poster_url, release_date)`)
// // // //         .eq('member_id', member.id);

// // // //     // 4. Assemble The Dossier
// // // //     return {
// // // //         id: member.id,
// // // //         name: member.name,
// // // //         slug: member.slug,
// // // //         bio: member.bio,
// // // //         image_url: member.image_url,
// // // //         voice_note_url: member.voice_note_url,
// // // //         color: member.color || '#eab308',
// // // //         social_links: member.social_links,
        
// // // //         // Map Tenures
// // // //         tenures: (tenures || []).map((t: any) => ({
// // // //             role: t.role_student,
// // // //             year: t.year,
// // // //             is_current: t.is_current,
// // // //             department: t.department,
// // // //             rank: t.rank
// // // //         })),
        
// // // //         // Map Credits
// // // //         credits: (credits || []).map((c: any) => ({
// // // //             id: c.id,
// // // //             role: c.role_artist,
// // // //             play: {
// // // //                 title: c.play.title,
// // // //                 slug: c.play.slug,
// // // //                 poster_url: c.play.poster_url,
// // // //                 year: new Date(c.play.release_date).getFullYear().toString()
// // // //             }
// // // //         })),
        
// // // //         // Defaults to satisfy base type
// // // //         role: tenures?.[0]?.role_student || 'Member',
// // // //         rank: tenures?.[0]?.rank || 'CLOUD',
// // // //         department: tenures?.[0]?.department || 'General',
// // // //         year: tenures?.[0]?.year || 'N/A',
// // // //         sort_order: 99
// // // //     };
// // // // }

// // // // // --- Fetch Slugs for Static Generation ---
// // // // export async function getAllMemberSlugs(): Promise<{ slug: string }[]> {
// // // //   const supabase = await createClient();
// // // //   const { data } = await supabase.from('team_members').select('slug').is('deleted_at', null);
// // // //   return data || [];
// // // // }

// // // // // ==============================================================================
// // // // // 4. THE PULSE (Events & Challenges)
// // // // // ==============================================================================

// // // // // --- Get Active Weekly Challenge ---
// // // // export async function getActiveChallenge(): Promise<Challenge | null> {
// // // //   const supabase = await createClient();
  
// // // //   const { data } = await supabase
// // // //     .from('challenges')
// // // //     .select('*')
// // // //     .eq('status', 'active')
// // // //     .gt('deadline', new Date().toISOString())
// // // //     .order('deadline', { ascending: true })
// // // //     .limit(1)
// // // //     .single();

// // // //   return data as Challenge;
// // // // }

// // // // // --- Get Event Timeline ---
// // // // export async function getEvents(): Promise<EventItem[]> {
// // // //   const supabase = await createClient();
  
// // // //   const { data, error } = await supabase
// // // //     .from('events')
// // // //     .select(`
// // // //       id, title, slug, date, type, location, description, 
// // // //       featured_image_url, poster_url, registration_link, created_at
// // // //     `)
// // // //     .is('deleted_at', null)
// // // //     .order('date', { ascending: false });

// // // //   if (error) {
// // // //     console.warn("API Warning: Could not fetch events.", error);
// // // //     return [];
// // // //   }
// // // //   return (data as any[]) || [];
// // // // }


// // // import { createClient } from "@/lib/supabase/server";
// // // import { 
// // //   Play, 
// // //   TeamMember, 
// // //   PlayCategory, 
// // //   EnsembleMember, 
// // //   MemberProfile, 
// // //   ArtistSummary, 
// // //   EventItem,
// // //   Challenge
// // // } from "@/types/schema";

// // // // ==============================================================================
// // // // 1. THE ORIGINALS (Plays & Productions)
// // // // ==============================================================================

// // // // --- Fetch the Highlight Play (For Home Page Hero) ---
// // // export async function getLatestOriginal(): Promise<Play | null> {
// // //   const supabase = await createClient();
// // //   try {
// // //     const { data } = await supabase
// // //       .from('plays')
// // //       .select('*')
// // //       .is('deleted_at', null)
// // //       .order('release_date', { ascending: false })
// // //       .limit(1)
// // //       .single();
    
// // //     return data as Play;
// // //   } catch (err) {
// // //     console.error("API Error (Latest Original):", err);
// // //     return null;
// // //   }
// // // }

// // // // --- Fetch Play Details + Cast (For Individual Play Page) ---
// // // export async function getPlayBySlug(slug: string): Promise<Play | null> {
// // //   const supabase = await createClient();
  
// // //   try {
// // //     // We cast to 'any' because the deep join type inference can be brittle
// // //     const { data, error } = await supabase
// // //       .from('plays')
// // //       .select(`
// // //         *,
// // //         credits (
// // //           role_artist,
// // //           team_members (
// // //             name,
// // //             slug,
// // //             image_url,
// // //             color
// // //           )
// // //         )
// // //       `)
// // //       .eq('slug', slug)
// // //       .is('deleted_at', null)
// // //       .single();

// // //     if (error) {
// // //       console.warn(`API Warning: Play '${slug}' not found.`);
// // //       return null;
// // //     }

// // //     return data as any as Play; // Force cast to match our Interface
// // //   } catch (err) {
// // //     console.error("API Error (Get Play):", err);
// // //     return null;
// // //   }
// // // }

// // // // --- Fetch All Plays (For Archive/Gallery) ---
// // // export async function getPlays(
// // //   page: number = 1, 
// // //   limit: number = 12,
// // //   category: PlayCategory | 'all' = 'all'
// // // ): Promise<Play[]> {
// // //   const supabase = await createClient();
// // //   const from = (page - 1) * limit;
// // //   const to = from + limit - 1;

// // //   try {
// // //     let query = supabase
// // //       .from('plays')
// // //       .select('*')
// // //       .is('deleted_at', null);

// // //     if (category !== 'all') {
// // //       query = query.eq('category', category);
// // //     }

// // //     query = query
// // //       .order('featured_score', { ascending: false }) // Curated first
// // //       .order('release_date', { ascending: false })   // Then newest
// // //       .range(from, to);

// // //     const { data, error } = await query;
// // //     if (error) return [];

// // //     return data as Play[];
// // //   } catch (err) {
// // //     return [];
// // //   }
// // // }

// // // // ==============================================================================
// // // // 2. THE ENSEMBLE (Roster & Team)
// // // // ==============================================================================

// // // // --- Fetch the Secretary (For Home Page Desk) ---
// // // export async function getSecretary(): Promise<TeamMember | null> {
// // //   const supabase = await createClient();
// // //   try {
// // //     const { data, error } = await supabase
// // //       .from('tenures')
// // //       .select(`
// // //         role_student,
// // //         department,
// // //         member:team_members (
// // //           id, name, slug, image_url, bio, social_links, color, voice_note_url
// // //         )
// // //       `)
// // //       .ilike('role_student', '%Secretary%') // Fuzzy match to catch "General Secretary" etc.
// // //       .eq('is_current', true)
// // //       .maybeSingle();

// // //     if (error || !data || !data.member) return null;

// // //     // Flatten for UI
// // //     // 'data' is typed loosely by Supabase, so we treat it as 'any' to access the join safely
// // //     const raw = data as any;
// // //     const m = Array.isArray(raw.member) ? raw.member[0] : raw.member;
    
// // //     return {
// // //       ...m,
// // //       role_student: raw.role_student,
// // //       department: raw.department
// // //     } as TeamMember;

// // //   } catch (err) {
// // //     console.error("API Error (Secretary):", err);
// // //     return null;
// // //   }
// // // }

// // // // --- Fetch The Lineage (For Ensemble Page Timeline) ---
// // // export async function getEnsemble(year: string = '2025-2026'): Promise<EnsembleMember[]> {
// // //   const supabase = await createClient();
  
// // //   try {
// // //     let query = supabase
// // //       .from('tenures')
// // //       .select(`
// // //         role_student, department, rank, sort_order, year,
// // //         member:team_members (
// // //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// // //         )
// // //       `)
// // //       .order('sort_order', { ascending: true }); // Hierarchy Sort (Crown -> Cloud)

// // //     // LOGIC: FACULTY vs ACADEMIC YEAR
// // //     if (year === 'Faculty') {
// // //         // Fetch ALL Faculty tenures ever
// // //         // Using .or() to catch explicit Rank OR Role title
// // //         query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`).order('year', { ascending: false });
// // //     } else {
// // //         // Fetch Specific Academic Year
// // //         query = query.eq('year', year);
// // //     }

// // //     const { data: tenuresData, error } = await query;

// // //     if (error || !tenuresData) {
// // //         console.warn(`API Warning: Ensemble fetch empty for ${year}`, error);
// // //         return [];
// // //     }

// // //     // CRITICAL FIX: Cast to 'any[]' to bypass TypeScript complaining about the 'member' join property.
// // //     // We know 'member' exists because we asked for it in .select()
// // //     const tenures = tenuresData as any[];

// // //     // INTELLIGENT MAPPING & DEDUPLICATION
// // //     const seenMembers = new Set();
// // //     const cleanList: EnsembleMember[] = [];

// // //     for (const t of tenures) {
// // //         if (!t.member) continue; // Skip broken records
        
// // //         // DEDUPLICATE: Only needed for Faculty (Keep latest tenure)
// // //         if (year === 'Faculty') {
// // //             if (seenMembers.has(t.member.id)) continue;
// // //             seenMembers.add(t.member.id);
// // //         }

// // //         cleanList.push({
// // //             id: t.member.id,
// // //             name: t.member.name,
// // //             slug: t.member.slug,
// // //             role: t.role_student,      // Database 'role_student' -> UI 'role'
// // //             rank: t.rank,              
// // //             department: t.department,
// // //             sort_order: t.sort_order,
// // //             image_url: t.member.image_url,
// // //             bio: t.member.bio,
// // //             year: t.year,
// // //             social_links: t.member.social_links,
// // //             voice_note_url: t.member.voice_note_url, // Database 'voice_note_url' -> UI 'audio_url' logic
// // //             color: t.member.color || '#eab308',
// // //             audio_url: t.member.voice_note_url // Redundant but safe mapping for UI
// // //         });
// // //     }

// // //     return cleanList;

// // //   } catch (err) {
// // //     console.error("API Error (Ensemble):", err);
// // //     return [];
// // //   }
// // // }

// // // // ==============================================================================
// // // // 3. THE ARTIST PORTFOLIO (Grid & Profiles)
// // // // ==============================================================================

// // // // --- Fetch All Artists (For The Grid) ---
// // // export async function getAllArtists(): Promise<ArtistSummary[]> {
// // //     const supabase = await createClient();

// // //     // Fetch EVERYONE with their history
// // //     const { data: rawData, error } = await supabase
// // //         .from('team_members')
// // //         .select(`
// // //             id, name, slug, image_url, color,
// // //             tenures (role_student, is_current),
// // //             credits (role_artist)
// // //         `)
// // //         .is('deleted_at', null)
// // //         .order('name', { ascending: true });

// // //     if (error) return [];

// // //     // Cast to any to handle the deep joins
// // //     const data = rawData as any[];

// // //     return (data || [])
// // //         // FILTER: Eliminate Ghosts (People with 0 work history)
// // //         .filter((m: any) => (m.tenures?.length > 0 || m.credits?.length > 0))
// // //         .map((m: any) => {
// // //             // 1. Collect All Roles into a Set
// // //             const roleSet = new Set<string>();
// // //             m.tenures?.forEach((t: any) => roleSet.add(t.role_student));
// // //             m.credits?.forEach((c: any) => roleSet.add(c.role_artist));
            
// // //             // 2. Determine Primary Role (The Badge)
// // //             let primary = "Member";
// // //             const currentTenure = m.tenures?.find((t: any) => t.is_current);
            
// // //             if (currentTenure) primary = currentTenure.role_student;
// // //             else if (m.tenures?.length > 0) primary = "Alumni";
// // //             else if (m.credits?.length > 0) primary = Array.from(roleSet)[0]; // Pick first creative role

// // //             return {
// // //                 id: m.id,
// // //                 name: m.name,
// // //                 slug: m.slug,
// // //                 image_url: m.image_url,
// // //                 color: m.color || '#eab308',
// // //                 primary_role: primary,
// // //                 roles: Array.from(roleSet)
// // //             };
// // //         });
// // // }

// // // // --- Fetch Full Profile (For The Dossier Page) ---
// // // export async function getMemberProfile(slug: string): Promise<MemberProfile | null> {
// // //     const supabase = await createClient();

// // //     // 1. Fetch Identity
// // //     const { data: member } = await supabase
// // //         .from('team_members')
// // //         .select('*')
// // //         .eq('slug', slug)
// // //         .single();

// // //     if (!member) return null;

// // //     // 2. Fetch History (Tenures)
// // //     const { data: tenures } = await supabase
// // //         .from('tenures')
// // //         .select('*')
// // //         .eq('member_id', member.id)
// // //         .order('year', { ascending: false });

// // //     // 3. Fetch Works (Credits)
// // //     const { data: creditsData } = await supabase
// // //         .from('credits')
// // //         .select(`id, role_artist, play:plays(title, slug, poster_url, release_date)`)
// // //         .eq('member_id', member.id);
    
// // //     // Cast Credits to handle the nested play object
// // //     const credits = creditsData as any[];

// // //     // 4. Assemble The Dossier
// // //     return {
// // //         id: member.id,
// // //         name: member.name,
// // //         slug: member.slug,
// // //         bio: member.bio,
// // //         image_url: member.image_url,
// // //         voice_note_url: member.voice_note_url,
// // //         color: member.color || '#eab308',
// // //         social_links: member.social_links,
        
// // //         // Map Tenures
// // //         tenures: (tenures || []).map((t: any) => ({
// // //             role: t.role_student,
// // //             year: t.year,
// // //             is_current: t.is_current
// // //         })),
        
// // //         // Map Credits
// // //         credits: (credits || []).map((c: any) => ({
// // //             id: c.id,
// // //             role: c.role_artist,
// // //             play: {
// // //                 title: c.play.title,
// // //                 slug: c.play.slug,
// // //                 poster_url: c.play.poster_url,
// // //                 year: new Date(c.play.release_date).getFullYear().toString()
// // //             }
// // //         })),
        
// // //         // Defaults to satisfy base type
// // //         role: tenures?.[0]?.role_student || 'Member',
// // //         rank: tenures?.[0]?.rank || 'CLOUD',
// // //         department: tenures?.[0]?.department || 'General',
// // //         year: tenures?.[0]?.year || 'N/A',
// // //         sort_order: 99
// // //     };
// // // }

// // // // --- Fetch Slugs for Static Generation ---
// // // export async function getAllMemberSlugs(): Promise<{ slug: string }[]> {
// // //   const supabase = await createClient();
// // //   const { data } = await supabase.from('team_members').select('slug').is('deleted_at', null);
// // //   return data || [];
// // // }

// // // // ==============================================================================
// // // // 4. THE PULSE (Events & Challenges)
// // // // ==============================================================================

// // // // --- Get Active Weekly Challenge ---
// // // export async function getActiveChallenge(): Promise<Challenge | null> {
// // //   const supabase = await createClient();
  
// // //   const { data } = await supabase
// // //     .from('challenges')
// // //     .select('*')
// // //     .eq('status', 'active')
// // //     .gt('deadline', new Date().toISOString())
// // //     .order('deadline', { ascending: true })
// // //     .limit(1)
// // //     .single();

// // //   return data as Challenge;
// // // }

// // // // --- Get Event Timeline ---
// // // export async function getEvents(): Promise<EventItem[]> {
// // //   const supabase = await createClient();
  
// // //   const { data, error } = await supabase
// // //     .from('events')
// // //     .select(`
// // //       id, title, slug, date, type, location, description, 
// // //       featured_image_url, poster_url, registration_link, created_at
// // //     `)
// // //     .is('deleted_at', null)
// // //     .order('date', { ascending: false });

// // //   if (error) {
// // //     console.warn("API Warning: Could not fetch events.", error);
// // //     return [];
// // //   }
// // //   return (data as any[]) || [];
// // // }

// // import { createClient } from "@/lib/supabase/server";
// // import { 
// //   Play, 
// //   TeamMember, 
// //   PlayCategory, 
// //   EnsembleMember, 
// //   MemberProfile, 
// //   ArtistSummary, 
// //   EventItem,
// //   Challenge
// // } from "@/types/schema";
// // import { SupabaseClient } from "@supabase/supabase-js";

// // // ==============================================================================
// // // 1. THE ORIGINALS (Plays & Productions)
// // // ==============================================================================

// // // --- Fetch the Highlight Play ---
// // export async function getLatestOriginal(client?: SupabaseClient): Promise<Play | null> {
// //   const supabase = client ?? await createClient();
// //   try {
// //     const { data } = await supabase
// //       .from('plays')
// //       .select('*')
// //       .is('deleted_at', null)
// //       // 1. GRAVITY CONTROL: HIGH scores float to the top
// //       .order('featured_score', { ascending: false })
// //       //2. CHRONOLOGY: If scores are equal (e.g. both 0), show newest
// //       .order('release_date', { ascending: false })
// //       .limit(1)
// //       .single();
    
// //     return data as Play;
// //   } catch (err) {
// //     console.error("API Error (Latest Original):", err);
// //     return null;
// //   }
// // }

// // // --- Fetch Play Details + Cast ---
// // export async function getPlayBySlug(slug: string, client?: SupabaseClient): Promise<Play | null> {
// //   const supabase = client ?? await createClient();
  
// //   try {
// //     const { data, error } = await supabase
// //       .from('plays')
// //       .select(`
// //         *,
// //         credits (
// //           role_artist,
// //           team_members (
// //             name,
// //             slug,
// //             image_url,
// //             color
// //           )
// //         )
// //       `)
// //       .eq('slug', slug)
// //       .is('deleted_at', null)
// //       .single();

// //     if (error) {
// //       console.warn(`API Warning: Play '${slug}' not found.`);
// //       return null;
// //     }

// //     return data as any as Play;
// //   } catch (err) {
// //     console.error("API Error (Get Play):", err);
// //     return null;
// //   }
// // }

// // // --- Fetch All Plays ---
// // export async function getPlays(
// //   page: number = 1, 
// //   limit: number = 12,
// //   category: PlayCategory | 'all' = 'all',
// //   client?: SupabaseClient
// // ): Promise<Play[]> {
// //   const supabase = client ?? await createClient();
// //   const from = (page - 1) * limit;
// //   const to = from + limit - 1;

// //   try {
// //     let query = supabase.from('plays').select('*').is('deleted_at', null);

// //     if (category !== 'all') {
// //       query = query.eq('category', category);
// //     }

// //     query = query
// //       .order('featured_score', { ascending: false })
// //       .order('release_date', { ascending: false })
// //       .range(from, to);

// //     const { data, error } = await query;
// //     if (error) return [];

// //     return data as Play[];
// //   } catch (err) {
// //     return [];
// //   }
// // }

// // // ==============================================================================
// // // 2. THE ENSEMBLE (Roster & Team)
// // // ==============================================================================

// // // --- Fetch the Secretary ---
// // export async function getSecretary(client?: SupabaseClient): Promise<TeamMember | null> {
// //   const supabase = client ?? await createClient();
// //   try {
// //     const { data, error } = await supabase
// //       .from('tenures')
// //       .select(`
// //         role_student,
// //         department,
// //         member:team_members (
// //           id, name, slug, image_url, bio, social_links, color, voice_note_url
// //         )
// //       `)
// //       .ilike('role_student', '%Secretary%')
// //       .eq('is_current', true)
// //       .maybeSingle();

// //     if (error || !data || !data.member) return null;

// //     const raw = data as any;
// //     const m = Array.isArray(raw.member) ? raw.member[0] : raw.member;
    
// //     return {
// //       ...m,
// //       role_student: raw.role_student,
// //       department: raw.department
// //     } as TeamMember;

// //   } catch (err) {
// //     console.error("API Error (Secretary):", err);
// //     return null;
// //   }
// // }

// // // --- Fetch The Lineage (Ensemble) ---
// // export async function getEnsemble(year: string = '2025-2026', client?: SupabaseClient): Promise<EnsembleMember[]> {
// //   const supabase = client ?? await createClient();
  
// //   try {
// //     let query = supabase
// //       .from('tenures')
// //       .select(`
// //         role_student, department, rank, sort_order, year,
// //         member:team_members (
// //           id, name, slug, bio, image_url, voice_note_url, color, social_links
// //         )
// //       `)
// //       .order('sort_order', { ascending: true });

// //     if (year === 'Faculty') {
// //         query = query.or(`rank.eq.ZENITH,role_student.ilike.%Faculty%`).order('year', { ascending: false });
// //     } else {
// //         query = query.eq('year', year);
// //     }

// //     // const { data: tenuresData, error } = await query;

// //     // if (error || !tenuresData) {
// //     //     // console.warn(`API Warning: Ensemble fetch empty for ${year}`);
// //     //     return [];
// //     // }

// //     // const tenures = tenuresData as any[];
// //     // const seenMembers = new Set();
// //     // const cleanList: EnsembleMember[] = [];

// //     const { data: rawData, error } = await query;

// //     if (error || !rawData ){console.warn(`API warning: Ensemple fetch empy for ${year}`);
// //       return [];
// //     }
// //     // CAST TO THE RAW TYPE (SAFE CASTING)
// //     const tenures = rawData as unknown as RawTenure[];
// //     const seenMembers = new Set();
// //     const cleanList: EnsembleMember[] = [];


// //     for (const t of tenures) {
// //         if (!t.member) continue;
        
// //         if (year === 'Faculty') {
// //             if (seenMembers.has(t.member.id)) continue;
// //             seenMembers.add(t.member.id);
// //         }

// //         cleanList.push({
// //             id: t.member.id,
// //             name: t.member.name,
// //             slug: t.member.slug,
// //             role: t.role_student,      
// //             rank: t.rank,              
// //             department: t.department,
// //             sort_order: t.sort_order,
// //             image_url: t.member.image_url,
// //             bio: t.member.bio,
// //             year: t.year,
// //             social_links: t.member.social_links,
// //             voice_note_url: t.member.voice_note_url,
// //             color: t.member.color || '#eab308',
// //             audio_url: t.member.voice_note_url,
// //             legacy_titles: null 
// //         });
// //     }

// //     return cleanList;

// //   } catch (err) {
// //     console.error("API Error (Ensemble):", err);
// //     return [];
// //   }
// // }

// // // ==============================================================================
// // // 3. THE ARTIST PORTFOLIO
// // // ==============================================================================

// // // --- Fetch All Artists (Grid) ---
// // export async function getAllArtists(client?: SupabaseClient): Promise<ArtistSummary[]> {
// //     const supabase = client ?? await createClient();

// //     const { data: rawData, error } = await supabase
// //         .from('team_members')
// //         .select(`
// //             id, name, slug, image_url, color,
// //             tenures (role_student, is_current),
// //             credits (role_artist)
// //         `)
// //         .is('deleted_at', null)
// //         .order('name', { ascending: true });

// //     if (error) return [];

// //     const data = rawData as any[];

// //     return (data || [])
// //         .filter((m: any) => (m.tenures?.length > 0 || m.credits?.length > 0))
// //         .map((m: any) => {
// //             const roleSet = new Set<string>();
// //             m.tenures?.forEach((t: any) => roleSet.add(t.role_student));
// //             m.credits?.forEach((c: any) => roleSet.add(c.role_artist));
            
// //             let primary = "Member";
// //             const currentTenure = m.tenures?.find((t: any) => t.is_current);
            
// //             if (currentTenure) primary = currentTenure.role_student;
// //             else if (m.tenures?.length > 0) primary = "Alumni";
// //             else if (m.credits?.length > 0) primary = Array.from(roleSet)[0];

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

// // // --- Fetch Full Profile (Dossier) ---
// // export async function getMemberProfile(slug: string, client?: SupabaseClient): Promise<MemberProfile | null> {
// //     const supabase = client ?? await createClient();

// //     const { data: member } = await supabase
// //         .from('team_members')
// //         .select('*')
// //         .eq('slug', slug)
// //         .single();

// //     if (!member) return null;

// //     const { data: tenures } = await supabase
// //         .from('tenures')
// //         .select('*')
// //         .eq('member_id', member.id)
// //         .order('year', { ascending: false });

// //     const { data: creditsData } = await supabase
// //         .from('credits')
// //         .select(`id, role_artist, play:plays(title, slug, poster_url, release_date)`)
// //         .eq('member_id', member.id);
    
// //     const credits = creditsData as any[];

// //     return {
// //         id: member.id,
// //         name: member.name,
// //         slug: member.slug,
// //         bio: member.bio,
// //         image_url: member.image_url,
// //         voice_note_url: member.voice_note_url,
// //         color: member.color || '#eab308',
// //         social_links: member.social_links,
// //         legacy_titles: member.legacy_titles || [],
        
// //         tenures: (tenures || []).map((t: any) => ({
// //             role: t.role_student,
// //             year: t.year,
// //             is_current: t.is_current,
// //             department: t.department,
// //             rank: t.rank
// //         })),
        
// //         credits: (credits || []).map((c: any) => ({
// //             id: c.id,
// //             role: c.role_artist,
// //             play: {
// //                 title: c.play.title,
// //                 slug: c.play.slug,
// //                 poster_url: c.play.poster_url,
// //                 year: new Date(c.play.release_date).getFullYear().toString()
// //             }
// //         })),
        
// //         role: tenures?.[0]?.role_student || 'Member',
// //         rank: tenures?.[0]?.rank || 'CLOUD',
// //         department: tenures?.[0]?.department || 'General',
// //         year: tenures?.[0]?.year || 'N/A',
// //         sort_order: 99
// //     };
// // }

// // // --- Fetch All Slugs (For Static Generation) ---
// // export async function getAllMemberSlugs(client?: SupabaseClient): Promise<{ slug: string }[]> {
// //   const supabase = client ?? await createClient();
// //   const { data } = await supabase.from('team_members').select('slug').is('deleted_at', null);
// //   return data || [];
// // }

// // // ==============================================================================
// // // 4. THE PULSE (Events & Challenges)
// // // ==============================================================================

// // export async function getActiveChallenge(client?: SupabaseClient): Promise<Challenge | null> {
// //   const supabase = client ?? await createClient();
  
// //   const { data } = await supabase
// //     .from('challenges')
// //     .select('*')
// //     .eq('status', 'active')
// //     .gt('deadline', new Date().toISOString())
// //     .order('deadline', { ascending: true })
// //     .limit(1)
// //     .single();

// //   return data as Challenge;
// // }

// // export async function getEvents(client?: SupabaseClient): Promise<EventItem[]> {
// //   const supabase = client ?? await createClient();
  
// //   const { data, error } = await supabase
// //     .from('events')
// //     .select(`
// //       id, title, slug, date, type, location, description, 
// //       featured_image_url, poster_url, registration_link, created_at
// //     `)
// //     .is('deleted_at', null)
// //     .order('date', { ascending: false });

// //   if (error) {
// //     console.warn("API Warning: Could not fetch events.", error);
// //     return [];
// //   }
// //   return (data as any[]) || [];
// // }

// // // 1. Define the Shape of the RAW response from Supabase (The Join)
// // interface RawTenure {
// //     role_student: string;
// //     department: string;
// //     rank: any; // Using 'any' for Enum is acceptable here, or import MemberRank
// //     sort_order: number;
// //     year: string;
// //     member: {
// //         id: string;
// //         name: string;
// //         slug: string;
// //         bio: string | null;
// //         image_url: string | null;
// //         voice_note_url: string | null;
// //         color: string;
// //         social_links: any;
// //     } | null; // Member might be null if soft-deleted
// // }

// import { createClient } from "@/lib/supabase/server";
// import { 
//   Play, 
//   TeamMember, 
//   PlayCategory, 
//   EnsembleMember, 
//   MemberProfile, 
//   ArtistSummary, 
//   EventItem,
//   Challenge
// } from "@/types/schema";
// import { SupabaseClient } from "@supabase/supabase-js";

// // ==============================================================================
// // 1. THE ORIGINALS (Plays & Productions)
// // ==============================================================================

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
            tenures (role_student, is_current, rank), // Added 'rank' fetch
            credits (role_artist)
        `)
        .is('deleted_at', null)
        //GOD TIER SORT: First by your Manual Rank (1-99), then Alphabetical
        .order('sorthing_weight', { ascending: true })
        .order('name', { ascending: true });
        

    if (error) return [];

    const data = rawData as any[];

    return (data || [])
        .filter((m: any) => {
            // 1. Stealth protocol: If hidden, vanish.
            if (m.is_hidden) return false;

            // 2. STRICT ISOLATION: If they are Faculty (ZENITH), HIDE THEM.
            // Even if they have other roles, Faculty status makes them invisible here.
            
            const isFaculty = m.tenures?.some((t: any) => t.rank === 'ZENITH');
            if (isFaculty) return false;

            // 3. Standard Inclusion Check
            return true;
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
            const currentTenure = m.tenures?.find((t: any) => t.is_current);
            
            if (currentTenure) {
                primary = currentTenure.role_student;
            } else if (m.legacy_titles?.length > 0) {
                primary = m.legacy_titles[0];
            } else if (m.tenures?.length > 0) {
                primary = "Alumni";
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
                roles: Array.from(roleSet),
                short_bio: m.short_bio // Pass the Intro
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