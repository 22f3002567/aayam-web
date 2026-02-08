// "use server";

// import { createAdminClient } from "@/lib/supabase/admin";
// import { revalidatePath } from "next/cache";
// import { SocialLinks } from "@/types/schema";

// const generateSlug = (name: string) => 
//   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// export async function upsertMember(formData: FormData) {
//   const supabase = createAdminClient();
  
//   const id = formData.get("id") as string | null;
//   const name = formData.get("name") as string;
  
//   if (!name) return { success: false, error: "Name is required." };

//   // 1. SANITIZE SOCIALS
//   const rawSocials: SocialLinks = {
//       instagram: formData.get("instagram")?.toString().trim() || undefined,
//       linkedin: formData.get("linkedin")?.toString().trim() || undefined,
//   };
//   const social_links = JSON.parse(JSON.stringify(rawSocials));

//   // 2. PARSE LEGACY TITLES
//   const legacyRaw = formData.get("legacy_titles") as string;
//   const legacy_titles = legacyRaw 
//       ? legacyRaw.split(',').map(t => t.trim()).filter(t => t.length > 0) 
//       : [];

//   // 3. PREPARE IDENTITY PAYLOAD
//   const memberPayload: any = {
//     name,
//     email: formData.get("email"),
//     short_bio: formData.get("short_bio"),
//     bio: formData.get("bio"),
//     sorting_weight: parseInt(formData.get("sorting_weight") as string) || 99,
//     is_hidden: formData.get("is_hidden") === 'true', 
//     color: formData.get("color"),
//     is_alumni: formData.get("is_alumni") === 'true',
//     social_links,
//     legacy_titles
//   };

//   // Auto-Slug
//   if (!id) {
//       const slug = generateSlug(name);
//       const { data: existing } = await supabase.from('team_members').select('id').eq('slug', slug).single();
//       if (existing) return { success: false, error: "Member name collision." };
//       memberPayload.slug = slug;
//   }

//   // 4. MEDIA HANDLING (Typescript Fixed)
//   // Explicitly cast as File to fix the ".size" red underline
//   const imageFile = formData.get("image_file") as File | null;
//   const voiceFile = formData.get("voice_file") as File | null;
  
//   // PRE-FETCH OLD DATA FOR CLEANUP
//   let oldData: any = null;
//   // We check strictly if it is a File instance to be safe
//   if (id && ((imageFile instanceof File && imageFile.size > 0) || (voiceFile instanceof File && voiceFile.size > 0))) {
//       const { data } = await supabase.from('team_members').select('image_url, voice_note_url').eq('id', id).single();
//       oldData = data;
//   }

//   const uploadPromises = [];
//   const filesToDelete = [];

//   // Handle Image
//   if (imageFile && imageFile instanceof File && imageFile.size > 0) {
//     const fileName = `img-${memberPayload.slug || id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
//     if (oldData?.image_url) {
//         const oldPath = oldData.image_url.split('/').pop();
//         if (oldPath) filesToDelete.push(oldPath);
//     }
//     uploadPromises.push(
//         supabase.storage.from('avatars').upload(fileName, imageFile, { upsert: true })
//         .then(({ data }) => { if (data) memberPayload.image_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; })
//     );
//   }
  
//   // Handle Voice
//   if (voiceFile && voiceFile instanceof File && voiceFile.size > 0) {
//     const fileName = `voice-${memberPayload.slug || id}-${Date.now()}.${voiceFile.name.split('.').pop()}`;
//     if (oldData?.voice_note_url) {
//         const oldPath = oldData.voice_note_url.split('/').pop();
//         if (oldPath) filesToDelete.push(oldPath);
//     }
//     uploadPromises.push(
//         supabase.storage.from('avatars').upload(fileName, voiceFile, { upsert: true })
//         .then(({ data }) => { if (data) memberPayload.voice_note_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; })
//     );
//   }

//   await Promise.all(uploadPromises);

//   // Execute Cleanup
//   if (filesToDelete.length > 0) {
//       supabase.storage.from('avatars').remove(filesToDelete).then(({ error }) => {
//           if (error) console.error("Cleanup Warning:", error);
//       });
//   }

//   // 5. DATABASE TRANSACTION
//   let memberId = id;
//   let isNewMember = false;

//   try {
//       // Upsert Member
//       if (id) {
//         await supabase.from("team_members").update(memberPayload).eq("id", id);
//       } else {
//         const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
//         if (error) throw error;
//         // FIX: Ensure data is not null before accessing .id
//         if (!data) throw new Error("Failed to return new member ID");
        
//         memberId = data.id;
//         isNewMember = true;
//       }

//       // Upsert Tenure (Optional)
//       const role = formData.get("role")?.toString().trim();
//       if (role && memberId) {
//           const year = formData.get("year")?.toString().trim() || "2025-2026";
//           const tenurePayload = {
//               member_id: memberId,
//               year: year,
//               role_student: role,
//               department: formData.get("department"),
//               rank: formData.get("rank"),
//               sort_order: parseInt(formData.get("sort_order") as string) || 99,
//               is_current: !memberPayload.is_alumni
//           };

//           const { data: existingTenure } = await supabase
//             .from("tenures")
//             .select("id")
//             .eq("member_id", memberId)
//             .eq("year", year)
//             .maybeSingle();

//           if (existingTenure) {
//               await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
//           } else {
//               await supabase.from("tenures").insert(tenurePayload);
//           }
//       }

//   } catch (error: any) {
//       console.error("Transaction Error:", error);
//       if (isNewMember && memberId) {
//           await supabase.from("team_members").delete().eq("id", memberId);
//       }
//       return { success: false, error: "Database Error: " + error.message };
//   }

//   revalidatePath("/admin/members");
//   revalidatePath("/ensemble");
//   revalidatePath("/artist");
//   return { success: true };
// }

// export async function toggleVisibility(id: string, currentStatus: boolean) {
//     const supabase = createAdminClient();
//     await supabase.from("team_members").update({ is_hidden: !currentStatus }).eq("id", id);
//     revalidatePath("/admin/members");
//     revalidatePath("/artist");
//     revalidatePath("/ensemble");
//     return { success: true };
// }

// export async function deleteMember(id: string) {
//   const supabase = createAdminClient();
  
//   try {
//       const { data: member } = await supabase.from("team_members").select("image_url, voice_note_url").eq("id", id).single();

//       const { error } = await supabase.from("team_members").delete().eq("id", id);
//       if (error) throw error;

//       const filesToRemove = [];
//       if (member?.image_url) {
//           const name = member.image_url.split('/').pop();
//           if (name) filesToRemove.push(name);
//       }
//       if (member?.voice_note_url) {
//           const name = member.voice_note_url.split('/').pop();
//           if (name) filesToRemove.push(name);
//       }

//       if (filesToRemove.length > 0) {
//           await supabase.storage.from('avatars').remove(filesToRemove);
//       }

//       revalidatePath("/admin/members");
//       revalidatePath("/ensemble");
//       return { success: true };
//   } catch (error: any) {
//       return { success: false, error: error.message };
//   }
// }

"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { SocialLinks } from "@/types/schema";

const generateSlug = (name: string) => 
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export async function upsertMember(formData: FormData) {
  const supabase = createAdminClient();
  
  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  
  if (!name) return { success: false, error: "Name is required." };

  // 1. SANITIZE SOCIALS
  const rawSocials: SocialLinks = {
      instagram: formData.get("instagram")?.toString().trim() || undefined,
      linkedin: formData.get("linkedin")?.toString().trim() || undefined,
  };
  const social_links = JSON.parse(JSON.stringify(rawSocials));

  // 2. PARSE LEGACY TITLES
  const legacyRaw = formData.get("legacy_titles") as string;
  const legacy_titles = legacyRaw 
      ? legacyRaw.split(',').map(t => t.trim()).filter(t => t.length > 0) 
      : [];

  // 3. PREPARE IDENTITY PAYLOAD
  const memberPayload: any = {
    name,
    email: formData.get("email"),
    short_bio: formData.get("short_bio"),
    bio: formData.get("bio"),
    sorting_weight: parseInt(formData.get("sorting_weight") as string) || 99,
    is_hidden: formData.get("is_hidden") === 'true', 
    color: formData.get("color"),
    is_alumni: formData.get("is_alumni") === 'true',
    social_links,
    legacy_titles
  };

  // --- LINK HANDLING (NEW) ---
  const imageLink = formData.get("image_link") as string;
  if (imageLink) {
      memberPayload.image_url = imageLink;
  }

  // Auto-Slug
  if (!id) {
      const slug = generateSlug(name);
      const { data: existing } = await supabase.from('team_members').select('id').eq('slug', slug).single();
      if (existing) return { success: false, error: "Member name collision." };
      memberPayload.slug = slug;
  }

  // 4. MEDIA UPLOAD (Overrides link if file present)
  const imageFile = formData.get("image_file") as File | null;
  const voiceFile = formData.get("voice_file") as File | null;
  
  let oldData: any = null;
  if (id && ((imageFile instanceof File && imageFile.size > 0) || (voiceFile instanceof File && voiceFile.size > 0))) {
      const { data } = await supabase.from('team_members').select('image_url, voice_note_url').eq('id', id).single();
      oldData = data;
  }

  const uploadPromises = [];
  const filesToDelete = [];

  // Handle Image
  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    const fileName = `img-${memberPayload.slug || id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
    if (oldData?.image_url && oldData.image_url.includes('supabase.co')) {
        const oldPath = oldData.image_url.split('/').pop();
        if (oldPath) filesToDelete.push(oldPath);
    }
    uploadPromises.push(
        supabase.storage.from('avatars').upload(fileName, imageFile, { upsert: true })
        .then(({ data }) => { if (data) memberPayload.image_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; })
    );
  }
  
  // Handle Voice
  if (voiceFile && voiceFile instanceof File && voiceFile.size > 0) {
    const fileName = `voice-${memberPayload.slug || id}-${Date.now()}.${voiceFile.name.split('.').pop()}`;
    if (oldData?.voice_note_url && oldData.voice_note_url.includes('supabase.co')) {
        const oldPath = oldData.voice_note_url.split('/').pop();
        if (oldPath) filesToDelete.push(oldPath);
    }
    uploadPromises.push(
        supabase.storage.from('avatars').upload(fileName, voiceFile, { upsert: true })
        .then(({ data }) => { if (data) memberPayload.voice_note_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; })
    );
  }

  await Promise.all(uploadPromises);

  if (filesToDelete.length > 0) {
      supabase.storage.from('avatars').remove(filesToDelete);
  }

  // 5. DATABASE TRANSACTION
  let memberId = id;
  let isNewMember = false;

  try {
      if (id) {
        await supabase.from("team_members").update(memberPayload).eq("id", id);
      } else {
        const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
        if (error) throw error;
        if (!data) throw new Error("Failed to return new member ID");
        memberId = data.id;
        isNewMember = true;
      }

      // Upsert Tenure (Optional logic remains same)
      const role = formData.get("role")?.toString().trim();
      if (role && memberId) {
          const year = formData.get("year")?.toString().trim() || "2025-2026";
          const tenurePayload = {
              member_id: memberId,
              year: year,
              role_student: role,
              department: formData.get("department"),
              rank: formData.get("rank"),
              sort_order: parseInt(formData.get("sort_order") as string) || 99,
              is_current: !memberPayload.is_alumni
          };

          const { data: existingTenure } = await supabase
            .from("tenures")
            .select("id")
            .eq("member_id", memberId)
            .eq("year", year)
            .maybeSingle();

          if (existingTenure) {
              await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
          } else {
              await supabase.from("tenures").insert(tenurePayload);
          }
      }

  } catch (error: any) {
      console.error("Transaction Error:", error);
      if (isNewMember && memberId) {
          await supabase.from("team_members").delete().eq("id", memberId);
      }
      return { success: false, error: "Database Error: " + error.message };
  }

  revalidatePath("/admin/members");
  revalidatePath("/ensemble");
  revalidatePath("/artist");
  return { success: true };
}

// ... (Rest of exports like toggleVisibility and deleteMember remain the same)
export async function toggleVisibility(id: string, currentStatus: boolean) {
    const supabase = createAdminClient();
    await supabase.from("team_members").update({ is_hidden: !currentStatus }).eq("id", id);
    revalidatePath("/admin/members");
    revalidatePath("/artist");
    revalidatePath("/ensemble");
    return { success: true };
}

export async function deleteMember(id: string) {
  const supabase = createAdminClient();
  try {
      const { data: member } = await supabase.from("team_members").select("image_url, voice_note_url").eq("id", id).single();
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;

      const filesToRemove = [];
      if (member?.image_url && member.image_url.includes('supabase.co')) {
          const name = member.image_url.split('/').pop();
          if (name) filesToRemove.push(name);
      }
      if (member?.voice_note_url && member.voice_note_url.includes('supabase.co')) {
          const name = member.voice_note_url.split('/').pop();
          if (name) filesToRemove.push(name);
      }

      if (filesToRemove.length > 0) {
          await supabase.storage.from('avatars').remove(filesToRemove);
      }

      revalidatePath("/admin/members");
      revalidatePath("/ensemble");
      return { success: true };
  } catch (error: any) {
      return { success: false, error: error.message };
  }
}