// // "use server";

// // import { createAdminClient } from "@/lib/supabase/admin";
// // import { revalidatePath } from "next/cache";

// // const generateSlug = (title: string) => 
// //   title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // // --- 1. THE PRODUCER (Upsert Play) ---
// // export async function upsertPlay(formData: FormData) {
// //   const supabase = createAdminClient();
  
// //   const id = formData.get("id") as string | null;
// //   const title = formData.get("title") as string;
  
// //   if (!title) return { success: false, error: "Title is required." };

// //   // PREPARE PAYLOAD
// //   const playPayload: any = {
// //     title,
// //     youtube_id: formData.get("youtube_id"),
// //     mood: formData.get("mood"),
// //     category: formData.get("category"),
// //     description: formData.get("description"),
// //     release_date: formData.get("release_date") || new Date().toISOString(),
// //     featured_score: parseInt(formData.get("featured_score") as string) || 0,
// //   };

// //   // Auto-Slug
// //   if (!id) {
// //       const slug = generateSlug(title);
// //       // Simple collision check
// //       const { data } = await supabase.from('plays').select('id').eq('slug', slug).single();
// //       if (data) return { success: false, error: "A play with this title already exists." };
// //       playPayload.slug = slug;
// //   }

// //   // POSTER UPLOAD
// //   const posterFile = formData.get("poster_file") as File | null;
// //   if (posterFile && posterFile.size > 0) {
// //       const fileName = `poster-${playPayload.slug || id}-${Date.now()}.${posterFile.name.split('.').pop()}`;
// //       const { error } = await supabase.storage.from('avatars').upload(fileName, posterFile, { upsert: true });
      
// //       if (!error) {
// //           const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
// //           playPayload.poster_url = data.publicUrl;
// //       }
// //   }

// //   // DB TRANSACTION
// //   try {
// //       if (id) {
// //           const { error } = await supabase.from("plays").update(playPayload).eq("id", id);
// //           if (error) throw error;
// //       } else {
// //           const { error } = await supabase.from("plays").insert(playPayload);
// //           if (error) throw error;
// //       }
// //   } catch (error: any) {
// //       return { success: false, error: error.message };
// //   }

// //   revalidatePath("/originals");
// //   revalidatePath("/admin/originals");
// //   return { success: true };
// // }

// // // --- 2. THE CRITIC (Delete Play) ---
// // export async function deletePlay(id: string) {
// //     const supabase = createAdminClient();
// //     const { error } = await supabase.from("plays").delete().eq("id", id);
// //     if (error) return { success: false, error: error.message };
    
// //     revalidatePath("/originals");
// //     revalidatePath("/admin/originals");
// //     return { success: true };
// // }

// "use server";

// import { createAdminClient } from "@/lib/supabase/admin";
// import { revalidatePath } from "next/cache";

// const generateSlug = (title: string) => 
//   title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // --- 1. THE PRODUCER (Create/Update) ---
// export async function upsertPlay(formData: FormData) {
//   const supabase = createAdminClient();
  
//   const id = formData.get("id") as string | null;
//   const title = formData.get("title") as string;
  
//   if (!title) return { success: false, error: "Title is required." };

//   // PREPARE PAYLOAD
//   const playPayload: any = {
//     title,
//     youtube_id: formData.get("youtube_id"),
//     mood: formData.get("mood"),
//     category: formData.get("category"),
//     description: formData.get("description"),
//     release_date: formData.get("release_date") || new Date().toISOString(),
//     featured_score: parseInt(formData.get("featured_score") as string) || 0,
//   };

//   // Auto-Slug Logic
//   if (!id) {
//       const slug = generateSlug(title);
//       // Check collision
//       const { data } = await supabase.from('plays').select('id').eq('slug', slug).single();
//       if (data) return { success: false, error: "A production with this title already exists." };
//       playPayload.slug = slug;
//   }

//   // POSTER UPLOAD
//   const posterFile = formData.get("poster_file") as File | null;
//   if (posterFile && posterFile.size > 0) {
//       const fileName = `poster-${playPayload.slug || id}-${Date.now()}.${posterFile.name.split('.').pop()}`;
//       // Reuse the 'avatars' bucket for all public media
//       const { error } = await supabase.storage.from('avatars').upload(fileName, posterFile, { upsert: true });
      
//       if (!error) {
//           const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
//           playPayload.poster_url = data.publicUrl;
//       }
//   }

//   // ATOMIC DB WRITE
//   try {
//       if (id) {
//           const { error } = await supabase.from("plays").update(playPayload).eq("id", id);
//           if (error) throw error;
//       } else {
//           const { error } = await supabase.from("plays").insert(playPayload);
//           if (error) throw error;
//       }
//   } catch (error: any) {
//       return { success: false, error: error.message };
//   }

//   revalidatePath("/originals"); // Refresh Public Page
//   revalidatePath("/admin/originals"); // Refresh Admin Page
//   return { success: true };
// }

// // --- 2. THE CRITIC (Delete) ---
// export async function deletePlay(id: string) {
//     const supabase = createAdminClient();
//     const { error } = await supabase.from("plays").delete().eq("id", id);
//     if (error) return { success: false, error: error.message };
    
//     revalidatePath("/originals");
//     revalidatePath("/admin/originals");
//     return { success: true };
// }



"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

const generateSlug = (title: string) => 
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// --- 1. THE PRODUCER (Atomic Upsert) ---
export async function upsertPlay(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  
  if (!title) return { success: false, error: "Title is required." };

  const playPayload: any = {
    title,
    youtube_id: formData.get("youtube_id"),
    mood: formData.get("mood"),
    category: formData.get("category"),
    description: formData.get("description"),
    release_date: formData.get("release_date") || new Date().toISOString(),
    featured_score: parseInt(formData.get("featured_score") as string) || 0,
  };

  // SLUG LOGIC: Only generate on creation to preserve SEO links
  if (!id) {
      const slug = generateSlug(title);
      const { data } = await supabase.from('plays').select('id').eq('slug', slug).single();
      if (data) return { success: false, error: "A production with this title already exists." };
      playPayload.slug = slug;
  }

  // IMAGE HANDLING
  const posterFile = formData.get("poster_file") as File | null;
  if (posterFile && posterFile.size > 0) {
      // 1. Upload New
      const fileName = `poster-${playPayload.slug || id}-${Date.now()}.${posterFile.name.split('.').pop()}`;
      const { error, data } = await supabase.storage.from('avatars').upload(fileName, posterFile, { upsert: true });
      
      if (!error && data) {
          const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(fileName);
          playPayload.poster_url = publicUrl.publicUrl;
      }
  }

  try {
      if (id) {
          const { error } = await supabase.from("plays").update(playPayload).eq("id", id);
          if (error) throw error;
      } else {
          const { error } = await supabase.from("plays").insert(playPayload);
          if (error) throw error;
      }
  } catch (error: any) {
      return { success: false, error: error.message };
  }

  revalidatePath("/originals");
  revalidatePath("/admin/originals");
  return { success: true };
}

// --- 2. THE CRITIC (Smart Delete) ---
export async function deletePlay(id: string) {
    const supabase = createAdminClient();

    // STEP 1: Get the Poster URL before deleting the record
    const { data: play } = await supabase.from('plays').select('poster_url').eq('id', id).single();

    // STEP 2: Delete from Database
    const { error } = await supabase.from("plays").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    // STEP 3: Clean up Storage (The Garbage Collector)
    if (play?.poster_url) {
        // Extract filename from URL: ".../avatars/poster-slug-123.jpg"
        const fileName = play.poster_url.split('/').pop();
        if (fileName) {
            await supabase.storage.from('avatars').remove([fileName]);
        }
    }
    
    revalidatePath("/originals");
    revalidatePath("/admin/originals");
    return { success: true };
}