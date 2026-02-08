
// "use server";

// import { createAdminClient } from "@/lib/supabase/admin";
// import { revalidatePath } from "next/cache";

// const generateSlug = (title: string) => 
//   title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // --- 1. THE PRODUCER (Atomic Upsert) ---
// export async function upsertPlay(formData: FormData) {
//   const supabase = createAdminClient();
  
//   const id = formData.get("id") as string | null;
//   const title = formData.get("title") as string;
  
//   if (!title) return { success: false, error: "Title is required." };

//   const playPayload: any = {
//     title,
//     youtube_id: formData.get("youtube_id"),
//     mood: formData.get("mood"),
//     category: formData.get("category"),
//     description: formData.get("description"),
//     release_date: formData.get("release_date") || new Date().toISOString(),
//     featured_score: parseInt(formData.get("featured_score") as string) || 0,
//   };

//   // --- LINK HANDLING (NEW) ---
//   // If a link is provided, we set it first.
//   const posterLink = formData.get("poster_link") as string;
//   if (posterLink) {
//     playPayload.poster_url = posterLink;
//   }

//   // SLUG LOGIC
//   if (!id) {
//       const slug = generateSlug(title);
//       const { data } = await supabase.from('plays').select('id').eq('slug', slug).single();
//       if (data) return { success: false, error: "A production with this title already exists." };
//       playPayload.slug = slug;
//   }
//   const currentSlug = playPayload.slug || (id ? (await supabase.from('plays').select('slug').eq('id', id).single()).data?.slug : 'draft');
//   // --- IMAGE UPLOAD HANDLING ---
//   // If a file is uploaded, it overrides the link.
//   const posterFile = formData.get("poster_file") as File | null;
//   if (posterFile && posterFile.size > 0) {
//       const fileName = `poster-${playPayload.slug || id}-${Date.now()}.${posterFile.name.split('.').pop()}`;
//       const { error, data } = await supabase.storage.from('avatars').upload(fileName, posterFile, { upsert: true });
      
//       if (!error && data) {
//           const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(fileName);
//           playPayload.poster_url = publicUrl.publicUrl;
//       }
//   }
// // --- C. GALLERY HANDLING (The Memory Archive) ---
//   // We need to merge existing gallery (if any), new links, and new uploads.
  
//   // 1. Get Existing Gallery (if updating)
//   let currentGallery: string[] = [];
//   if (id) {
//       const { data } = await supabase.from('plays').select('gallery_urls').eq('id', id).single();
//       if (data?.gallery_urls) currentGallery = data.gallery_urls;
//   }

//   // 2. Process New Links (Comma separated text)
//   const manualGalleryLinks = formData.get("gallery_links") as string;
//   if (manualGalleryLinks) {
//       const links = manualGalleryLinks.split(',').map(s => s.trim()).filter(s => s.length > 0);
//       // Add only unique new links
//       links.forEach(link => {
//           if (!currentGallery.includes(link)) currentGallery.push(link);
//       });
//   }

//   // 3. Process New File Uploads (Batch)
//   const galleryFiles = formData.getAll("gallery_files") as File[];
//   const validFiles = galleryFiles.filter(f => f.size > 0);

//   if (validFiles.length > 0) {
//       const uploadPromises = validFiles.map(async (file) => {
//           const fileName = `gallery-${currentSlug}-${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
//           const { error } = await supabase.storage.from('avatars').upload(fileName, file);
//           if (!error) {
//               const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
//               return data.publicUrl;
//           }
//           return null;
//       });

//       const uploadedUrls = await Promise.all(uploadPromises);
//       // Filter out failures and add to gallery
//       uploadedUrls.forEach(url => {
//           if (url) currentGallery.push(url);
//       });
//   }
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

//   revalidatePath("/originals");
//   revalidatePath("/admin/originals");
//   return { success: true };
// }

// // --- 2. THE CRITIC (Smart Delete) ---
// export async function deletePlay(id: string) {
//     const supabase = createAdminClient();

//     // Get URL to clean up storage if it was an internal upload
//     const { data: play } = await supabase.from('plays').select('poster_url').eq('id', id).single();

//     const { error } = await supabase.from("plays").delete().eq("id", id);
//     if (error) return { success: false, error: error.message };

//     // Clean up Storage only if it looks like a supabase file
//     if (play?.poster_url && play.poster_url.includes('supabase.co')) {
//         const fileName = play.poster_url.split('/').pop();
//         if (fileName) {
//             await supabase.storage.from('avatars').remove([fileName]);
//         }
//     }
    
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

  // 1. Base Payload
  const playPayload: any = {
    title,
    youtube_id: formData.get("youtube_id"),
    mood: formData.get("mood"),
    category: formData.get("category"),
    description: formData.get("description"),
    release_date: formData.get("release_date") || new Date().toISOString(),
    featured_score: parseInt(formData.get("featured_score") as string) || 0,
  };

  // 2. Slug Logic
  if (!id) {
      const slug = generateSlug(title);
      const { data } = await supabase.from('plays').select('id').eq('slug', slug).single();
      if (data) return { success: false, error: "A production with this title already exists." };
      playPayload.slug = slug;
  }
  
  // Retrieve current slug for filename generation
  const currentSlug = playPayload.slug || (id ? (await supabase.from('plays').select('slug').eq('id', id).single()).data?.slug : 'draft');

  // --- 3. POSTER HANDLING (Hybrid: Link vs Upload) ---
  const posterLink = formData.get("poster_link") as string;
  if (posterLink) playPayload.poster_url = posterLink;

  const posterFile = formData.get("poster_file") as File | null;
  if (posterFile && posterFile.size > 0) {
      const fileName = `poster-${currentSlug}-${Date.now()}.${posterFile.name.split('.').pop()}`;
      const { error, data } = await supabase.storage.from('avatars').upload(fileName, posterFile, { upsert: true });
      if (!error && data) {
          const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(fileName);
          playPayload.poster_url = publicUrl.publicUrl;
      }
  }

  // --- 4. GALLERY HANDLING (The Memory Archive) ---
  
  // A. Initialize with existing gallery if editing
  let currentGallery: string[] = [];
  if (id) {
      const { data } = await supabase.from('plays').select('gallery_urls').eq('id', id).single();
      if (data?.gallery_urls) currentGallery = data.gallery_urls;
  }

  // B. Process New Links (Comma separated text)
  const manualGalleryLinks = formData.get("gallery_links") as string;
  if (manualGalleryLinks) {
      const links = manualGalleryLinks.split(',').map(s => s.trim()).filter(s => s.length > 0);
      links.forEach(link => {
          if (!currentGallery.includes(link)) currentGallery.push(link);
      });
  }

  // C. Process New File Uploads (Batch Processing)
  const galleryFiles = formData.getAll("gallery_files") as File[];
  const validFiles = galleryFiles.filter(f => f.size > 0);

  if (validFiles.length > 0) {
      const uploadPromises = validFiles.map(async (file) => {
          const fileName = `gallery-${currentSlug}-${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
          const { error } = await supabase.storage.from('avatars').upload(fileName, file);
          if (!error) {
              const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
              return data.publicUrl;
          }
          return null;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      uploadedUrls.forEach(url => {
          if (url) currentGallery.push(url);
      });
  }

  // *** CRITICAL FIX: Assign the calculated gallery to the payload ***
  playPayload.gallery_urls = currentGallery;

  // --- 5. DB TRANSACTION ---
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

// --- 2. THE CRITIC (Full Cleanup) ---
export async function deletePlay(id: string) {
    const supabase = createAdminClient();

    // 1. Get Data for Cleanup (Poster AND Gallery)
    const { data: play } = await supabase.from('plays').select('poster_url, gallery_urls').eq('id', id).single();

    // 2. Delete Record
    const { error } = await supabase.from("plays").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    // 3. Cleanup Storage (Garbage Collection)
    const filesToDelete: string[] = [];

    // Check Poster
    if (play?.poster_url && play.poster_url.includes('supabase.co')) {
        const name = play.poster_url.split('/').pop();
        if (name) filesToDelete.push(name);
    }

    // Check Gallery Images
    if (play?.gallery_urls && Array.isArray(play.gallery_urls)) {
        play.gallery_urls.forEach(url => {
            if (typeof url === 'string' && url.includes('supabase.co')) {
                const name = url.split('/').pop();
                if (name) filesToDelete.push(name);
            }
        });
    }

    // Bulk Delete from Storage
    if (filesToDelete.length > 0) {
        await supabase.storage.from('avatars').remove(filesToDelete);
    }
    
    revalidatePath("/originals");
    revalidatePath("/admin/originals");
    return { success: true };
}