
// "use server";

// import { createAdminClient } from "@/lib/supabase/admin";
// import { revalidatePath } from "next/cache";

// // --- HELPERS ---
// const generateSlug = (title: string) => 
//   title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + "-" + new Date().getFullYear();

// // --- 1. CREATE & UPDATE (The Mutator) ---
// export async function upsertEvent(formData: FormData) {
//   const supabase = createAdminClient();
  
//   // Extract ID
//   const id = formData.get("id") as string | null;
//   const title = formData.get("title") as string;
  
//   // --- EXTRACT INPUTS (Matches EventSheet.tsx) ---
//   const posterFile = formData.get("poster_file") as File | null; // Fixed Name
//   const posterLink = formData.get("poster_link") as string;
//   const backdropLink = formData.get("featured_image_url") as string; // Fixed Name

//   // BASE PAYLOAD (Safe Fields Only)
//   const payload: any = {
//     title,
//     date: formData.get("date") as string,
//     type: formData.get("type") as string,
//     location: formData.get("location") as string,
//     description: formData.get("description") as string,
//     registration_link: formData.get("registration_link") || null,
//   };

//   // If New -> Generate Slug
//   if (!id) {
//     payload.slug = generateSlug(title);
//   }

//   // --- IMAGE LOGIC (The Safe Way) ---
  
//   // 1. POSTER: Priority File > Link
//   if (posterFile && posterFile.size > 0) {
//     // A. Upload File
//     const fileExt = posterFile.name.split('.').pop();
//     const fileName = `${payload.slug || id}-${Date.now()}.${fileExt}`;
//     const filePath = `posters/${fileName}`;

//     const { error: uploadError } = await supabase.storage
//       .from('events')
//       .upload(filePath, posterFile, { upsert: true, contentType: posterFile.type });

//     if (uploadError) {
//       console.error("Poster Upload Failed:", uploadError);
//       return { success: false, error: "Poster Upload Failed: " + uploadError.message };
//     }

//     // Get URL
//     const { data: { publicUrl } } = supabase.storage.from('events').getPublicUrl(filePath);
//     payload.poster_url = publicUrl;
  
//   } else if (posterLink && posterLink.trim().length > 0) {
//     // B. Use Link
//     payload.poster_url = posterLink;
//   }
//   // C. Else: Do NOTHING. This keeps the existing poster_url in the DB.

//   // 2. BACKDROP (Cinematic Image)
//   // We check 'featured_image_url' (Schema Name)
//   if (backdropLink && backdropLink.trim().length > 0) {
//     payload.featured_image_url = backdropLink;
//   }

//   // --- DB OPERATION ---
//   let error;
//   if (id) {
//     const { error: uErr } = await supabase.from("events").update(payload).eq("id", id);
//     error = uErr;
//   } else {
//     const { error: iErr } = await supabase.from("events").insert(payload);
//     error = iErr;
//   }

//   if (error) {
//     console.error("Operation Failed:", error);
//     return { success: false, error: error.message };
//   }

//   revalidatePath("/admin/events");
//   return { success: true };
// }

// // --- 2. THE ARCHIVIST (Soft Delete) ---
// export async function archiveEvent(id: string) {
//   const supabase = createAdminClient();
//   const { error } = await supabase.from("events").update({ deleted_at: new Date().toISOString() }).eq("id", id);
//   if (error) return { success: false, error: error.message };
//   revalidatePath("/admin/events");
//   return { success: true };
// }

// // --- 3. THE RESTORER (Undo) ---
// export async function restoreEvent(id: string) {
//   const supabase = createAdminClient();
//   const { error } = await supabase.from("events").update({ deleted_at: null }).eq("id", id);
//   if (error) return { success: false, error: error.message };
//   revalidatePath("/admin/events");
//   return { success: true };
// }

// // --- 4. THE SHREDDER (Permanent Delete) ---
// export async function shredEvent(id: string, reason: string = "Admin Action") {
//   const supabase = createAdminClient();
//   const { data: event } = await supabase.from("events").select("title, slug").eq("id", id).single();
  
//   if (event) {
//       await supabase.from("audit_logs").insert({
//           action: "PERMANENT_DELETE",
//           target_table: "events",
//           target_id: id,
//           details: `Destroyed Event: ${event.title} (${event.slug}). Reason: ${reason}`,
//           admin_email: "GOD_MODE_ADMIN"
//       });
//   }

//   const { error } = await supabase.from("events").delete().eq("id", id);
//   if (error) return { success: false, error: error.message };
//   revalidatePath("/admin/events");
//   return { success: true };
// }


"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

// --- HELPER: Smart Slug ---
const generateSlug = (title: string) => 
  title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dashes
    .replace(/(^-|-$)+/g, '')     // Trim dashes
    + "-" + new Date().getFullYear();

// --- HELPER: Storage Cleaner ---
async function deleteStorageFile(path: string | null) {
  if (!path) return;
  const supabase = createAdminClient();
  
  // Extract the path after the bucket name if it's a full URL
  // Example: .../storage/v1/object/public/events/posters/abc.jpg -> posters/abc.jpg
  const relativePath = path.split('/events/').pop();
  if (relativePath) {
    await supabase.storage.from('events').remove([relativePath]);
  }
}

// --- 1. CREATE & UPDATE (The Mutator) ---
export async function upsertEvent(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  
  // --- EXTRACT INPUTS ---
  const posterFile = formData.get("poster_file") as File | null;
  const posterLink = formData.get("poster_link") as string;
  
  const backdropFile = formData.get("featured_file") as File | null; // <--- NEW
  const backdropLink = formData.get("featured_image_url") as string;

  // VALIDATION
  if (!title || title.trim().length === 0) {
    return { success: false, error: "Event Title is required." };
  }

  // BASE PAYLOAD
  const payload: any = {
    title,
    date: formData.get("date") as string,
    type: formData.get("type") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    registration_link: formData.get("registration_link") || null,
  };

  if (!id) {
    payload.slug = generateSlug(title);
  }

  // --- IMAGE LOGIC A: POSTER ---
  if (posterFile && posterFile.size > 0) {
    const fileExt = posterFile.name.split('.').pop();
    const fileName = `posters/${payload.slug || id}-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('events').upload(fileName, posterFile, { upsert: true, contentType: posterFile.type });

    if (uploadError) return { success: false, error: "Poster Upload Failed: " + uploadError.message };
    
    const { data: { publicUrl } } = supabase.storage.from('events').getPublicUrl(fileName);
    payload.poster_url = publicUrl;
  } else if (posterLink && posterLink.trim().length > 0) {
    payload.poster_url = posterLink;
  }

  // --- IMAGE LOGIC B: BACKDROP (NEW) ---
  if (backdropFile && backdropFile.size > 0) {
    const fileExt = backdropFile.name.split('.').pop();
    const fileName = `backdrops/${payload.slug || id}-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('events').upload(fileName, backdropFile, { upsert: true, contentType: backdropFile.type });

    if (uploadError) return { success: false, error: "Backdrop Upload Failed: " + uploadError.message };
    
    const { data: { publicUrl } } = supabase.storage.from('events').getPublicUrl(fileName);
    payload.featured_image_url = publicUrl;
  } else if (backdropLink && backdropLink.trim().length > 0) {
    payload.featured_image_url = backdropLink;
  }

  // --- DB OPERATION ---
  let error;
  if (id) {
    const { error: uErr } = await supabase.from("events").update(payload).eq("id", id);
    error = uErr;
  } else {
    const { error: iErr } = await supabase.from("events").insert(payload);
    error = iErr;
  }

  if (error) {
    // Specialized Error Handling for Duplicate Slugs
    if (error.code === '23505') { // Postgres Unique Violation
        return { success: false, error: "An event with this title already exists this year. Please adjust the title." };
    }
    return { success: false, error: error.message };
  }
  // --- REVALIDATE (The Signal) ---
  revalidatePath("/admin/events");
  revalidatePath("/events"); // New: Upadates the public timeline
  revalidatePath("/"); // Home might list upcoming events
  return { success: true };
}

// --- 2. THE ARCHIVIST (Soft Delete) ---
export async function archiveEvent(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("events").update({ deleted_at: new Date().toISOString() }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/events");
  return { success: true };
}

// --- 3. THE RESTORER (Undo) ---
export async function restoreEvent(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("events").update({ deleted_at: null }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/events");
  return { success: true };
}

// --- 4. THE SHREDDER (Permanent Delete + Cleanup) ---
export async function shredEvent(id: string, reason: string = "Admin Action") {
  const supabase = createAdminClient();

  // A. FETCH DATA BEFORE DEATH (To clean images & log)
  const { data: event } = await supabase
    .from("events")
    .select("title, slug, poster_url, featured_image_url")
    .eq("id", id)
    .single();
  
  if (event) {
      // 1. Audit Log
      await supabase.from("audit_logs").insert({
          action: "PERMANENT_DELETE",
          target_table: "events",
          target_id: id,
          details: `Destroyed: ${event.title}. Reason: ${reason}`,
          admin_email: "GOD_MODE_ADMIN"
      });

      // 2. CLEAN UP STORAGE (The Garbage Collector)
      // We fire these and don't wait (fire and forget) to keep UI fast, 
      // or await them if we want strict cleanliness.
      await Promise.all([
          deleteStorageFile(event.poster_url),
          deleteStorageFile(event.featured_image_url)
      ]);
  }

  // B. DESTROY ROW
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/events");
  return { success: true };
}