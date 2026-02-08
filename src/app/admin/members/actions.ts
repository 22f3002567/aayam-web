// // // // // // // // // // "use server";

// // // // // // // // // // import { createAdminClient } from "@/lib/supabase/admin";
// // // // // // // // // // import { revalidatePath } from "next/cache";

// // // // // // // // // // // --- HELPER: Auto-Ranker (The Hierarchy Logic) ---
// // // // // // // // // // const getHierarchy = (role: string) => {
// // // // // // // // // //     const r = role.toLowerCase();
    
// // // // // // // // // //     // 1. ZENITH (Faculty)
// // // // // // // // // //     if (r.includes('faculty') || r.includes('mentor')) 
// // // // // // // // // //         return { rank: 'ZENITH', sort: 0 };
    
// // // // // // // // // //     // 2. CROWN (High Command)
// // // // // // // // // //     if (r.includes('secretary') && !r.includes('deputy')) 
// // // // // // // // // //         return { rank: 'CROWN', sort: 1 };
// // // // // // // // // //     if (r.includes('deputy secretary') || r.includes('joint secretary')) 
// // // // // // // // // //         return { rank: 'CROWN', sort: 2 };
        
// // // // // // // // // //     // 3. ORBIT (Department Leads)
// // // // // // // // // //     if (r.includes('head') && !r.includes('deputy') && !r.includes('co-')) 
// // // // // // // // // //         return { rank: 'ORBIT', sort: 10 };
// // // // // // // // // //     if (r.includes('deputy head') || r.includes('co-head')) 
// // // // // // // // // //         return { rank: 'ORBIT', sort: 11 };
        
// // // // // // // // // //     // 4. CLOUD (The Corps)
// // // // // // // // // //     if (r.includes('coordinator')) return { rank: 'CLOUD', sort: 20 };
    
// // // // // // // // // //     return { rank: 'CLOUD', sort: 99 }; // General Member
// // // // // // // // // // };

// // // // // // // // // // const generateSlug = (name: string) => 
// // // // // // // // // //   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // // // // // // // // // // --- UPSERT ACTION ---
// // // // // // // // // // export async function upsertMember(formData: FormData) {
// // // // // // // // // //   const supabase = createAdminClient();
  
// // // // // // // // // //   const id = formData.get("id") as string | null;
// // // // // // // // // //   const name = formData.get("name") as string;
// // // // // // // // // //   const email = formData.get("email") as string;
// // // // // // // // // //   const bio = formData.get("bio") as string;
// // // // // // // // // //   const color = formData.get("color") as string || '#eab308';
// // // // // // // // // //   const imageFile = formData.get("image_file") as File | null;
  
// // // // // // // // // //   // Tenure Specifics
// // // // // // // // // //   const role = formData.get("role") as string; 
// // // // // // // // // //   const department = formData.get("department") as string;
// // // // // // // // // //   const year = formData.get("year") as string || "2025-2026";
// // // // // // // // // //   const is_alumni = formData.get("is_alumni") === 'true';

// // // // // // // // // //   if (!name || !role) return { success: false, error: "Name and Role are required." };

// // // // // // // // // //   // 1. IDENTITY (team_members)
// // // // // // // // // //   const memberPayload: any = {
// // // // // // // // // //     name,
// // // // // // // // // //     email,
// // // // // // // // // //     bio,
// // // // // // // // // //     color, // Navarasa Aura
// // // // // // // // // //     is_alumni
// // // // // // // // // //   };

// // // // // // // // // //   if (!id) memberPayload.slug = generateSlug(name);

// // // // // // // // // //   // Image Upload Logic
// // // // // // // // // //   if (imageFile && imageFile.size > 0) {
// // // // // // // // // //     const fileExt = imageFile.name.split('.').pop();
// // // // // // // // // //     const fileName = `${memberPayload.slug || id}-${Date.now()}.${fileExt}`;
// // // // // // // // // //     const { error: uploadError } = await supabase.storage
// // // // // // // // // //       .from('avatars')
// // // // // // // // // //       .upload(fileName, imageFile, { upsert: true });

// // // // // // // // // //     if (!uploadError) {
// // // // // // // // // //         const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
// // // // // // // // // //         memberPayload.image_url = publicUrl;
// // // // // // // // // //     }
// // // // // // // // // //   }

// // // // // // // // // //   // Upsert Identity
// // // // // // // // // //   let memberId = id;
// // // // // // // // // //   if (id) {
// // // // // // // // // //     await supabase.from("team_members").update(memberPayload).eq("id", id);
// // // // // // // // // //   } else {
// // // // // // // // // //     const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
// // // // // // // // // //     if (error) return { success: false, error: error.message };
// // // // // // // // // //     memberId = data.id;
// // // // // // // // // //   }

// // // // // // // // // //   // 2. HIERARCHY (tenures)
// // // // // // // // // //   // We calculate the rank automatically so you don't have to guess
// // // // // // // // // //   const { rank, sort } = getHierarchy(role);

// // // // // // // // // //   const tenurePayload = {
// // // // // // // // // //       member_id: memberId,
// // // // // // // // // //       role_student: role,
// // // // // // // // // //       department,
// // // // // // // // // //       year,
// // // // // // // // // //       rank, // 'CROWN', 'ORBIT', etc.
// // // // // // // // // //       sort_order: sort,
// // // // // // // // // //       is_current: !is_alumni // If alumni, it's not current
// // // // // // // // // //   };

// // // // // // // // // //   // Check for existing tenure in this year to update instead of insert
// // // // // // // // // //   const { data: existingTenure } = await supabase
// // // // // // // // // //     .from("tenures")
// // // // // // // // // //     .select("id")
// // // // // // // // // //     .eq("member_id", memberId)
// // // // // // // // // //     .eq("year", year)
// // // // // // // // // //     .maybeSingle();

// // // // // // // // // //   if (existingTenure) {
// // // // // // // // // //       await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
// // // // // // // // // //   } else {
// // // // // // // // // //       await supabase.from("tenures").insert(tenurePayload);
// // // // // // // // // //   }

// // // // // // // // // //   revalidatePath("/admin/members");
// // // // // // // // // //   return { success: true };
// // // // // // // // // // }

// // // // // // // // // // // --- DELETE ACTION ---
// // // // // // // // // // export async function deleteMember(id: string) {
// // // // // // // // // //   const supabase = createAdminClient();
// // // // // // // // // //   const { error } = await supabase.from("team_members").delete().eq("id", id);
// // // // // // // // // //   if (error) return { success: false, error: error.message };
// // // // // // // // // //   revalidatePath("/admin/members");
// // // // // // // // // //   return { success: true };
// // // // // // // // // // }

// // // // // // // // // "use server";

// // // // // // // // // import { createAdminClient } from "@/lib/supabase/admin";
// // // // // // // // // import { revalidatePath } from "next/cache";

// // // // // // // // // const generateSlug = (name: string) => 
// // // // // // // // //   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // // // // // // // // const getHierarchy = (role: string) => {
// // // // // // // // //     const r = role.toLowerCase();
// // // // // // // // //     if (r.includes('faculty') || r.includes('mentor')) return { rank: 'ZENITH', sort: 0 };
// // // // // // // // //     if (r.includes('secretary') && !r.includes('deputy')) return { rank: 'CROWN', sort: 1 };
// // // // // // // // //     if (r.includes('deputy secretary') || r.includes('joint')) return { rank: 'CROWN', sort: 2 };
// // // // // // // // //     if (r.includes('head') && !r.includes('deputy') && !r.includes('co-')) return { rank: 'ORBIT', sort: 10 };
// // // // // // // // //     if (r.includes('deputy head') || r.includes('co-head')) return { rank: 'ORBIT', sort: 11 };
// // // // // // // // //     if (r.includes('coordinator')) return { rank: 'CLOUD', sort: 20 };
// // // // // // // // //     return { rank: 'CLOUD', sort: 99 };
// // // // // // // // // };

// // // // // // // // // export async function upsertMember(formData: FormData) {
// // // // // // // // //   const supabase = createAdminClient();
  
// // // // // // // // //   const id = formData.get("id") as string | null;
// // // // // // // // //   const name = formData.get("name") as string;
// // // // // // // // //   const email = formData.get("email") as string;
// // // // // // // // //   const bio = formData.get("bio") as string;
// // // // // // // // //   const color = formData.get("color") as string || '#eab308';
// // // // // // // // //   const is_alumni = formData.get("is_alumni") === 'true';
  
// // // // // // // // //   // Files
// // // // // // // // //   const imageFile = formData.get("image_file") as File | null;
// // // // // // // // //   const voiceFile = formData.get("voice_file") as File | null; // <--- NEW

// // // // // // // // //   // Socials (Pack into JSON)
// // // // // // // // //   const social_links = {
// // // // // // // // //       instagram: formData.get("instagram") as string,
// // // // // // // // //       linkedin: formData.get("linkedin") as string,
// // // // // // // // //       portfolio: formData.get("portfolio") as string
// // // // // // // // //   };

// // // // // // // // //   if (!name) return { success: false, error: "Name is required." };

// // // // // // // // //   // 1. PREPARE IDENTITY (team_members)
// // // // // // // // //   const memberPayload: any = {
// // // // // // // // //     name,
// // // // // // // // //     email,
// // // // // // // // //     bio,
// // // // // // // // //     color,
// // // // // // // // //     is_alumni,
// // // // // // // // //     social_links // <--- CORRECTED: Sending JSONB
// // // // // // // // //   };

// // // // // // // // //   // Generate slug only if new
// // // // // // // // //   if (!id) memberPayload.slug = generateSlug(name);

// // // // // // // // //   // --- IMAGE UPLOAD ---
// // // // // // // // //   if (imageFile && imageFile.size > 0) {
// // // // // // // // //     const fileName = `img-${memberPayload.slug || id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
// // // // // // // // //     const { error } = await supabase.storage.from('avatars').upload(fileName, imageFile, { upsert: true });
// // // // // // // // //     if (!error) {
// // // // // // // // //         const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
// // // // // // // // //         memberPayload.image_url = data.publicUrl;
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   // --- VOICE UPLOAD ---
// // // // // // // // //   if (voiceFile && voiceFile.size > 0) {
// // // // // // // // //     const fileName = `voice-${memberPayload.slug || id}-${Date.now()}.${voiceFile.name.split('.').pop()}`;
// // // // // // // // //     const { error } = await supabase.storage.from('avatars').upload(fileName, voiceFile, { upsert: true });
// // // // // // // // //     if (!error) {
// // // // // // // // //         const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
// // // // // // // // //         memberPayload.voice_note_url = data.publicUrl; // <--- MAPPED TO CORRECT COLUMN
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   // UPSERT IDENTITY
// // // // // // // // //   let memberId = id;
// // // // // // // // //   if (id) {
// // // // // // // // //     const { error } = await supabase.from("team_members").update(memberPayload).eq("id", id);
// // // // // // // // //     if (error) return { success: false, error: "Member Update Failed: " + error.message };
// // // // // // // // //   } else {
// // // // // // // // //     const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
// // // // // // // // //     if (error) return { success: false, error: "Member Create Failed: " + error.message };
// // // // // // // // //     memberId = data.id;
// // // // // // // // //   }

// // // // // // // // //   // 2. PREPARE TENURE (tenures)
// // // // // // // // //   const role = formData.get("role") as string; 
// // // // // // // // //   const department = formData.get("department") as string;
// // // // // // // // //   const year = formData.get("year") as string || "2025-2026";
// // // // // // // // //   const { rank, sort } = getHierarchy(role);

// // // // // // // // //   const tenurePayload = {
// // // // // // // // //       member_id: memberId,
// // // // // // // // //       role_student: role, // <--- CORRECTED: Mapped to role_student
// // // // // // // // //       department,
// // // // // // // // //       year,
// // // // // // // // //       rank,
// // // // // // // // //       sort_order: sort,
// // // // // // // // //       is_current: !is_alumni
// // // // // // // // //   };

// // // // // // // // //   // Check existing tenure for this year/member
// // // // // // // // //   const { data: existingTenure } = await supabase
// // // // // // // // //     .from("tenures")
// // // // // // // // //     .select("id")
// // // // // // // // //     .eq("member_id", memberId)
// // // // // // // // //     .eq("year", year)
// // // // // // // // //     .maybeSingle();

// // // // // // // // //   if (existingTenure) {
// // // // // // // // //       await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
// // // // // // // // //   } else {
// // // // // // // // //       await supabase.from("tenures").insert(tenurePayload);
// // // // // // // // //   }

// // // // // // // // //   revalidatePath("/admin/members");
// // // // // // // // //   return { success: true };
// // // // // // // // // }

// // // // // // // // // export async function deleteMember(id: string) {
// // // // // // // // //   const supabase = createAdminClient();
// // // // // // // // //   const { error } = await supabase.from("team_members").delete().eq("id", id);
// // // // // // // // //   if (error) return { success: false, error: error.message };
// // // // // // // // //   revalidatePath("/admin/members");
// // // // // // // // //   return { success: true };
// // // // // // // // // }

// // // // // // // // "use server";

// // // // // // // // import { createAdminClient } from "@/lib/supabase/admin";
// // // // // // // // import { revalidatePath } from "next/cache";

// // // // // // // // const generateSlug = (name: string) => 
// // // // // // // //   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // // // // // // // export async function upsertMember(formData: FormData) {
// // // // // // // //   const supabase = createAdminClient();
  
// // // // // // // //   const id = formData.get("id") as string | null;
// // // // // // // //   const name = formData.get("name") as string;
// // // // // // // //   const email = formData.get("email") as string;
// // // // // // // //   const bio = formData.get("bio") as string;
// // // // // // // //   const color = formData.get("color") as string || '#eab308';
// // // // // // // //   const is_alumni = formData.get("is_alumni") === 'true';
// // // // // // // //   const imageFile = formData.get("image_file") as File | null;
// // // // // // // //   const voiceFile = formData.get("voice_file") as File | null;

// // // // // // // //   if (!name) return { success: false, error: "Name is required." };

// // // // // // // //   // 1. IDENTITY (team_members)
// // // // // // // //   // Pack socials into JSON
// // // // // // // //   const social_links = {
// // // // // // // //       instagram: formData.get("instagram"),
// // // // // // // //       linkedin: formData.get("linkedin")
// // // // // // // //   };

// // // // // // // //   const memberPayload: any = {
// // // // // // // //     name,
// // // // // // // //     email,
// // // // // // // //     bio,
// // // // // // // //     color,
// // // // // // // //     is_alumni,
// // // // // // // //     social_links // JSONB
// // // // // // // //   };

// // // // // // // //   if (!id) memberPayload.slug = generateSlug(name);

// // // // // // // //   // UPLOAD IMAGES/AUDIO
// // // // // // // //   if (imageFile && imageFile.size > 0) {
// // // // // // // //     const fileName = `img-${Date.now()}-${imageFile.name}`;
// // // // // // // //     const { error } = await supabase.storage.from('avatars').upload(fileName, imageFile);
// // // // // // // //     if (!error) {
// // // // // // // //         const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
// // // // // // // //         memberPayload.image_url = data.publicUrl;
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // //   if (voiceFile && voiceFile.size > 0) {
// // // // // // // //     const fileName = `voice-${Date.now()}-${voiceFile.name}`;
// // // // // // // //     const { error } = await supabase.storage.from('avatars').upload(fileName, voiceFile);
// // // // // // // //     if (!error) {
// // // // // // // //         const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
// // // // // // // //         memberPayload.voice_note_url = data.publicUrl;
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // UPSERT MEMBER
// // // // // // // //   let memberId = id;
// // // // // // // //   if (id) {
// // // // // // // //     const { error } = await supabase.from("team_members").update(memberPayload).eq("id", id);
// // // // // // // //     if (error) return { success: false, error: error.message };
// // // // // // // //   } else {
// // // // // // // //     const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
// // // // // // // //     if (error) return { success: false, error: error.message };
// // // // // // // //     memberId = data.id;
// // // // // // // //   }

// // // // // // // //   // 2. HIERARCHY (tenures)
// // // // // // // //   // We use the Explicit values from the form
// // // // // // // //   const role_student = formData.get("role") as string; 
// // // // // // // //   const department = formData.get("department") as string;
// // // // // // // //   const year = formData.get("year") as string || "2025-2026";
// // // // // // // //   const rank = formData.get("rank") as string; // Explicit
// // // // // // // //   const sort_order = parseInt(formData.get("sort_order") as string) || 99; // Explicit

// // // // // // // //   const tenurePayload = {
// // // // // // // //       member_id: memberId,
// // // // // // // //       role_student,
// // // // // // // //       department,
// // // // // // // //       year,
// // // // // // // //       rank,
// // // // // // // //       sort_order,
// // // // // // // //       is_current: !is_alumni
// // // // // // // //   };

// // // // // // // //   const { data: existingTenure } = await supabase.from("tenures").select("id").eq("member_id", memberId).eq("year", year).maybeSingle();

// // // // // // // //   if (existingTenure) {
// // // // // // // //       await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
// // // // // // // //   } else {
// // // // // // // //       await supabase.from("tenures").insert(tenurePayload);
// // // // // // // //   }

// // // // // // // //   revalidatePath("/admin/members");
// // // // // // // //   revalidatePath("/ensemble"); // REFRESH PUBLIC PAGE
// // // // // // // //   return { success: true };
// // // // // // // // }

// // // // // // // // export async function deleteMember(id: string) {
// // // // // // // //   const supabase = createAdminClient();
// // // // // // // //   const { error } = await supabase.from("team_members").delete().eq("id", id);
// // // // // // // //   if (error) return { success: false, error: error.message };
// // // // // // // //   revalidatePath("/admin/members");
// // // // // // // //   return { success: true };
// // // // // // // // }

// // // // // // // "use server";

// // // // // // // import { createAdminClient } from "@/lib/supabase/admin";
// // // // // // // import { revalidatePath } from "next/cache";
// // // // // // // import { SocialLinks } from "@/types/schema";

// // // // // // // const generateSlug = (name: string) => 
// // // // // // //   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // // // // // // export async function upsertMember(formData: FormData) {
// // // // // // //   const supabase = createAdminClient();
  
// // // // // // //   const id = formData.get("id") as string | null;
// // // // // // //   const name = formData.get("name") as string;
// // // // // // //   const year = formData.get("year") as string || "2025-2026";
  
  
// // // // // // //   if (!name) return { success: false, error: "Name is required." };

// // // // // // //   // // 1. IDENTITY LAYER (Global to the Human)
// // // // // // //   // const social_links = {
// // // // // // //   //     instagram: formData.get("instagram")?.toString() || "",
// // // // // // //   //     linkedin: formData.get("linkedin")?.toString() || ""
// // // // // // //   // };
// // // // // // //   // SANITIZATION LOGIC
// // // // // // //   const rawInsta = formData.get("instagram")?.toString().trim();
// // // // // // //   const rawLinked = formData.get("linkedin")?.toString().trim();

// // // // // // //   const social_links: any = {};
// // // // // // //   if (rawInsta) social_links.instagram = rawInsta;
// // // // // // //   if (rawLinked) social_links.linkedin = rawLinked;

// // // // // // //   const memberPayload: any = {
// // // // // // //     name,
// // // // // // //     email: formData.get("email"),
// // // // // // //     bio: formData.get("bio"),
// // // // // // //     color: formData.get("color"),
// // // // // // //     is_alumni: formData.get("is_alumni") === 'true',
// // // // // // //     social_links // Stores properly as JSONB
// // // // // // //   };

// // // // // // //   if (!id) memberPayload.slug = generateSlug(name);

// // // // // // //   // HANDLE FILES
// // // // // // //   const imageFile = formData.get("image_file") as File | null;
// // // // // // //   const voiceFile = formData.get("voice_file") as File | null;

// // // // // // //   if (imageFile && imageFile.size > 0) {
// // // // // // //     const fileName = `img-${memberPayload.slug || id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
// // // // // // //     const { error } = await supabase.storage.from('avatars').upload(fileName, imageFile);
// // // // // // //     if (!error) {
// // // // // // //         const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
// // // // // // //         memberPayload.image_url = data.publicUrl;
// // // // // // //     }
// // // // // // //   }
  
// // // // // // //   if (voiceFile && voiceFile.size > 0) {
// // // // // // //     const fileName = `voice-${memberPayload.slug || id}-${Date.now()}.${voiceFile.name.split('.').pop()}`;
// // // // // // //     const { error } = await supabase.storage.from('avatars').upload(fileName, voiceFile);
// // // // // // //     if (!error) {
// // // // // // //         const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
// // // // // // //         memberPayload.voice_note_url = data.publicUrl;
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // DB WRITE: IDENTITY
// // // // // // //   let memberId = id;
// // // // // // //   if (id) {
// // // // // // //     await supabase.from("team_members").update(memberPayload).eq("id", id);
// // // // // // //   } else {
// // // // // // //     const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
// // // // // // //     if (error) return { success: false, error: error.message };
// // // // // // //     memberId = data.id;
// // // // // // //   }

// // // // // // //   // 2. TENURE LAYER (Specific to the Year)
// // // // // // //   // This allows "Siddharth" to have different roles in different years
// // // // // // //   const tenurePayload = {
// // // // // // //       member_id: memberId,
// // // // // // //       role_student: formData.get("role"),
// // // // // // //       department: formData.get("department"),
// // // // // // //       year: year,
// // // // // // //       rank: formData.get("rank"),
// // // // // // //       sort_order: parseInt(formData.get("sort_order") as string) || 99,
// // // // // // //       is_current: !memberPayload.is_alumni
// // // // // // //   };

// // // // // // //   // UPSERT TENURE (Match by Member + Year)
// // // // // // //   const { data: existingTenure } = await supabase
// // // // // // //     .from("tenures")
// // // // // // //     .select("id")
// // // // // // //     .eq("member_id", memberId)
// // // // // // //     .eq("year", year)
// // // // // // //     .maybeSingle();

// // // // // // //   if (existingTenure) {
// // // // // // //       await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
// // // // // // //   } else {
// // // // // // //       await supabase.from("tenures").insert(tenurePayload);
// // // // // // //   }

// // // // // // //   revalidatePath("/admin/members");
// // // // // // //   revalidatePath("/ensemble");
// // // // // // //   return { success: true };
// // // // // // // }

// // // // // // // export async function deleteMember(id: string) {
// // // // // // //   const supabase = createAdminClient();
// // // // // // //   // Soft Delete preferred, but hard delete for now per request
// // // // // // //   const { error } = await supabase.from("team_members").delete().eq("id", id);
// // // // // // //   if (error) return { success: false, error: error.message };
// // // // // // //   revalidatePath("/admin/members");
// // // // // // //   return { success: true };
// // // // // // // }

// // // // // // "use server";

// // // // // // import { createAdminClient } from "@/lib/supabase/admin";
// // // // // // import { revalidatePath } from "next/cache";
// // // // // // import { SocialLinks } from "@/types/schema";

// // // // // // const generateSlug = (name: string) => 
// // // // // //   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // // // // // export async function upsertMember(formData: FormData) {
// // // // // //   const supabase = createAdminClient();
  
// // // // // //   const id = formData.get("id") as string | null;
// // // // // //   const name = formData.get("name") as string;
// // // // // //   const year = formData.get("year") as string || "2025-2026";
  
// // // // // //   if (!name) return { success: false, error: "Name is required." };

// // // // // //   // 1. SANITIZE SOCIALS (Prevent empty strings)
// // // // // //   const rawSocials: SocialLinks = {
// // // // // //       instagram: formData.get("instagram")?.toString().trim() || undefined,
// // // // // //       linkedin: formData.get("linkedin")?.toString().trim() || undefined,
// // // // // //   };
// // // // // //   // Remove undefined keys so we don't save { instagram: undefined } in DB
// // // // // //   const social_links = JSON.parse(JSON.stringify(rawSocials));

// // // // // //   // 2. PREPARE MEMBER PAYLOAD
// // // // // //   const memberPayload: any = {
// // // // // //     name,
// // // // // //     email: formData.get("email"),
// // // // // //     bio: formData.get("bio"),
// // // // // //     color: formData.get("color"),
// // // // // //     is_alumni: formData.get("is_alumni") === 'true',
// // // // // //     social_links
// // // // // //   };

// // // // // //   // 3. GENERATE SLUG (Only if new)
// // // // // //   if (!id) {
// // // // // //       // Check for collision first
// // // // // //       const slug = generateSlug(name);
// // // // // //       const { data: existing } = await supabase.from('team_members').select('id').eq('slug', slug).single();
// // // // // //       if (existing) return { success: false, error: "Member with this name already exists." };
// // // // // //       memberPayload.slug = slug;
// // // // // //   }

// // // // // //   // 4. HANDLE FILES (Parallel Uploads for Speed)
// // // // // //   const imageFile = formData.get("image_file") as File | null;
// // // // // //   const voiceFile = formData.get("voice_file") as File | null;
// // // // // //   const uploadPromises = [];

// // // // // //   if (imageFile && imageFile.size > 0) {
// // // // // //     const fileName = `img-${memberPayload.slug || id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
// // // // // //     uploadPromises.push(
// // // // // //         supabase.storage.from('avatars').upload(fileName, imageFile)
// // // // // //         .then(({ data }) => { 
// // // // // //             if (data) memberPayload.image_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; 
// // // // // //         })
// // // // // //     );
// // // // // //   }
  
// // // // // //   if (voiceFile && voiceFile.size > 0) {
// // // // // //     const fileName = `voice-${memberPayload.slug || id}-${Date.now()}.${voiceFile.name.split('.').pop()}`;
// // // // // //     uploadPromises.push(
// // // // // //         supabase.storage.from('avatars').upload(fileName, voiceFile)
// // // // // //         .then(({ data }) => { 
// // // // // //             if (data) memberPayload.voice_note_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; 
// // // // // //         })
// // // // // //     );
// // // // // //   }

// // // // // //   // Wait for uploads to finish before touching DB
// // // // // //   await Promise.all(uploadPromises);

// // // // // //   // 5. DB TRANSACTION (Manual Simulation)
// // // // // //   let memberId = id;
// // // // // //   let isNewMember = false;

// // // // // //   try {
// // // // // //       // STEP A: UPSERT IDENTITY
// // // // // //       if (id) {
// // // // // //         const { error } = await supabase.from("team_members").update(memberPayload).eq("id", id);
// // // // // //         if (error) throw error;
// // // // // //       } else {
// // // // // //         const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
// // // // // //         if (error) throw error;
// // // // // //         memberId = data.id;
// // // // // //         isNewMember = true;
// // // // // //       }

// // // // // //       // STEP B: UPSERT TENURE (The "Race Condition" Fix)
// // // // // //       // We use .upsert() with onConflict to handle the logic atomically in Postgres
// // // // // //       const tenurePayload = {
// // // // // //           member_id: memberId,
// // // // // //           year: year, // The Conflict Key part 1
// // // // // //           // We need a unique constraint on (member_id, year) in the DB for this to be perfect, 
// // // // // //           // but upsert by ID is safer than select-then-insert.
// // // // // //           role_student: formData.get("role"),
// // // // // //           department: formData.get("department"),
// // // // // //           rank: formData.get("rank"),
// // // // // //           sort_order: parseInt(formData.get("sort_order") as string) || 99,
// // // // // //           is_current: !memberPayload.is_alumni
// // // // // //       };

// // // // // //       // We attempt to find the ID via a join logic implicitly by using upsert if we had the ID.
// // // // // //       // Since we don't have the tenure ID readily available in a robust way without a select, 
// // // // // //       // we perform a "Smart Upsert":
      
// // // // // //       const { data: existingTenure } = await supabase
// // // // // //         .from("tenures")
// // // // // //         .select("id")
// // // // // //         .eq("member_id", memberId)
// // // // // //         .eq("year", year)
// // // // // //         .maybeSingle();

// // // // // //       if (existingTenure) {
// // // // // //           const { error } = await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
// // // // // //           if (error) throw error;
// // // // // //       } else {
// // // // // //           const { error } = await supabase.from("tenures").insert(tenurePayload);
// // // // // //           if (error) throw error;
// // // // // //       }

// // // // // //   } catch (error: any) {
// // // // // //       // ROLLBACK LOGIC (Compensating Transaction)
// // // // // //       console.error("Transaction Failed:", error);
      
// // // // // //       if (isNewMember && memberId) {
// // // // // //           // If we created a member but failed to create a tenure, DELETE the orphan member.
// // // // // //           // This keeps the database clean.
// // // // // //           await supabase.from("team_members").delete().eq("id", memberId);
// // // // // //       }
// // // // // //       return { success: false, error: "Database Transaction Failed. Changes Reverted." };
// // // // // //   }

// // // // // //   revalidatePath("/admin/members");
// // // // // //   revalidatePath("/ensemble");
// // // // // //   return { success: true };
// // // // // // }

// // // // // "use server";

// // // // // import { createAdminClient } from "@/lib/supabase/admin";
// // // // // import { revalidatePath } from "next/cache";
// // // // // import { SocialLinks } from "@/types/schema";

// // // // // const generateSlug = (name: string) => 
// // // // //   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // // // // // --- 1. THE CREATOR (Atomic Upsert) ---
// // // // // export async function upsertMember(formData: FormData) {
// // // // //   const supabase = createAdminClient();
  
// // // // //   const id = formData.get("id") as string | null;
// // // // //   const name = formData.get("name") as string;
// // // // //   const year = formData.get("year") as string || "2025-2026";
  
// // // // //   if (!name) return { success: false, error: "Name is required." };

// // // // //   // 1. SANITIZE SOCIALS
// // // // //   const rawSocials: SocialLinks = {
// // // // //       instagram: formData.get("instagram")?.toString().trim() || undefined,
// // // // //       linkedin: formData.get("linkedin")?.toString().trim() || undefined,
// // // // //   };
// // // // //   const social_links = JSON.parse(JSON.stringify(rawSocials)); // Remove undefined keys

// // // // //   // 2. PREPARE MEMBER PAYLOAD
// // // // //   const memberPayload: any = {
// // // // //     name,
// // // // //     email: formData.get("email"),
// // // // //     bio: formData.get("bio"),
// // // // //     color: formData.get("color"),
// // // // //     is_alumni: formData.get("is_alumni") === 'true',
// // // // //     social_links
// // // // //   };

// // // // //   // 3. GENERATE SLUG
// // // // //   if (!id) {
// // // // //       const slug = generateSlug(name);
// // // // //       const { data: existing } = await supabase.from('team_members').select('id').eq('slug', slug).single();
// // // // //       if (existing) return { success: false, error: "Member with this name already exists." };
// // // // //       memberPayload.slug = slug;
// // // // //   }

// // // // //   // 4. HANDLE FILES
// // // // //   const imageFile = formData.get("image_file") as File | null;
// // // // //   const voiceFile = formData.get("voice_file") as File | null;
// // // // //   const uploadPromises = [];

// // // // //   if (imageFile && imageFile.size > 0) {
// // // // //     const fileName = `img-${memberPayload.slug || id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
// // // // //     uploadPromises.push(
// // // // //         supabase.storage.from('avatars').upload(fileName, imageFile, { upsert: true })
// // // // //         .then(({ data }) => { 
// // // // //             if (data) memberPayload.image_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; 
// // // // //         })
// // // // //     );
// // // // //   }
  
// // // // //   if (voiceFile && voiceFile.size > 0) {
// // // // //     const fileName = `voice-${memberPayload.slug || id}-${Date.now()}.${voiceFile.name.split('.').pop()}`;
// // // // //     uploadPromises.push(
// // // // //         supabase.storage.from('avatars').upload(fileName, voiceFile, { upsert: true })
// // // // //         .then(({ data }) => { 
// // // // //             if (data) memberPayload.voice_note_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; 
// // // // //         })
// // // // //     );
// // // // //   }

// // // // //   await Promise.all(uploadPromises);

// // // // //   // 5. ATOMIC DB TRANSACTION (Simulated)
// // // // //   let memberId = id;
// // // // //   let isNewMember = false;

// // // // //   try {
// // // // //       // A. UPSERT IDENTITY
// // // // //       if (id) {
// // // // //         const { error } = await supabase.from("team_members").update(memberPayload).eq("id", id);
// // // // //         if (error) throw error;
// // // // //       } else {
// // // // //         const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
// // // // //         if (error) throw error;
// // // // //         memberId = data.id;
// // // // //         isNewMember = true;
// // // // //       }

// // // // //       // B. UPSERT TENURE
// // // // //       const tenurePayload = {
// // // // //           member_id: memberId,
// // // // //           year: year,
// // // // //           role_student: formData.get("role"),
// // // // //           department: formData.get("department"),
// // // // //           rank: formData.get("rank"),
// // // // //           sort_order: parseInt(formData.get("sort_order") as string) || 99,
// // // // //           is_current: !memberPayload.is_alumni
// // // // //       };

// // // // //       // Smart Upsert Logic for Tenure
// // // // //       const { data: existingTenure } = await supabase
// // // // //         .from("tenures")
// // // // //         .select("id")
// // // // //         .eq("member_id", memberId)
// // // // //         .eq("year", year)
// // // // //         .maybeSingle();

// // // // //       if (existingTenure) {
// // // // //           const { error } = await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
// // // // //           if (error) throw error;
// // // // //       } else {
// // // // //           const { error } = await supabase.from("tenures").insert(tenurePayload);
// // // // //           if (error) throw error;
// // // // //       }

// // // // //   } catch (error: any) {
// // // // //       console.error("Transaction Failed:", error);
// // // // //       if (isNewMember && memberId) {
// // // // //           await supabase.from("team_members").delete().eq("id", memberId); // Rollback
// // // // //       }
// // // // //       return { success: false, error: "Database Error: " + error.message };
// // // // //   }

// // // // //   revalidatePath("/admin/members");
// // // // //   revalidatePath("/ensemble");
// // // // //   return { success: true };
// // // // // }

// // // // // // --- 2. THE DESTROYER (Delete Action) ---
// // // // // // THIS WAS MISSING IN THE PREVIOUS TURN
// // // // // export async function deleteMember(id: string) {
// // // // //   const supabase = createAdminClient();
  
// // // // //   try {
// // // // //       // We rely on Postgres "ON DELETE CASCADE" to clean up tenures/credits.
// // // // //       // If your DB isn't set up that way, we might need manual cleanup, 
// // // // //       // but usually 'team_members' is the parent.
// // // // //       const { error } = await supabase.from("team_members").delete().eq("id", id);
      
// // // // //       if (error) throw error;

// // // // //       revalidatePath("/admin/members");
// // // // //       revalidatePath("/ensemble");
// // // // //       return { success: true };
// // // // //   } catch (error: any) {
// // // // //       return { success: false, error: error.message };
// // // // //   }
// // // // // }

// // // // "use server";

// // // // import { createAdminClient } from "@/lib/supabase/admin";
// // // // import { revalidatePath } from "next/cache";
// // // // import { SocialLinks } from "@/types/schema";

// // // // const generateSlug = (name: string) => 
// // // //   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // // // // --- 1. THE CREATOR (Atomic Upsert) ---
// // // // export async function upsertMember(formData: FormData) {
// // // //   const supabase = createAdminClient();
  
// // // //   const id = formData.get("id") as string | null;
// // // //   const name = formData.get("name") as string;
// // // //   const year = formData.get("year") as string || "2025-2026";
  
// // // //   if (!name) return { success: false, error: "Name is required." };

// // // //   // 1. SANITIZE SOCIALS
// // // //   const rawSocials: SocialLinks = {
// // // //       instagram: formData.get("instagram")?.toString().trim() || undefined,
// // // //       linkedin: formData.get("linkedin")?.toString().trim() || undefined,
// // // //   };
// // // //   const social_links = JSON.parse(JSON.stringify(rawSocials));

// // // //   // 2. PREPARE MEMBER PAYLOAD
// // // //   const memberPayload: any = {
// // // //     name,
// // // //     email: formData.get("email"),
// // // //     bio: formData.get("bio"),
// // // //     color: formData.get("color"),
// // // //     is_alumni: formData.get("is_alumni") === 'true',
// // // //     social_links
// // // //   };

// // // //   if (!id) {
// // // //       const slug = generateSlug(name);
// // // //       const { data: existing } = await supabase.from('team_members').select('id').eq('slug', slug).single();
// // // //       if (existing) return { success: false, error: "Member with this name already exists." };
// // // //       memberPayload.slug = slug;
// // // //   }

// // // //   // 4. HANDLE FILES
// // // //   const imageFile = formData.get("image_file") as File | null;
// // // //   const voiceFile = formData.get("voice_file") as File | null;
// // // //   const uploadPromises = [];

// // // //   if (imageFile && imageFile.size > 0) {
// // // //     const fileName = `img-${memberPayload.slug || id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
// // // //     uploadPromises.push(
// // // //         supabase.storage.from('avatars').upload(fileName, imageFile, { upsert: true })
// // // //         .then(({ data }) => { 
// // // //             if (data) memberPayload.image_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; 
// // // //         })
// // // //     );
// // // //   }
  
// // // //   if (voiceFile && voiceFile.size > 0) {
// // // //     const fileName = `voice-${memberPayload.slug || id}-${Date.now()}.${voiceFile.name.split('.').pop()}`;
// // // //     uploadPromises.push(
// // // //         supabase.storage.from('avatars').upload(fileName, voiceFile, { upsert: true })
// // // //         .then(({ data }) => { 
// // // //             if (data) memberPayload.voice_note_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; 
// // // //         })
// // // //     );
// // // //   }

// // // //   await Promise.all(uploadPromises);

// // // //   // 5. ATOMIC DB TRANSACTION
// // // //   let memberId = id;
// // // //   let isNewMember = false;

// // // //   try {
// // // //       // A. UPSERT IDENTITY
// // // //       if (id) {
// // // //         const { error } = await supabase.from("team_members").update(memberPayload).eq("id", id);
// // // //         if (error) throw error;
// // // //       } else {
// // // //         const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
// // // //         if (error) throw error;
// // // //         memberId = data.id;
// // // //         isNewMember = true;
// // // //       }

// // // //       // B. UPSERT TENURE (CONDITIONAL LOGIC)
// // // //       // Only try to create a tenure if a Role is actually provided.
// // // //       const role = formData.get("role")?.toString().trim();
      
// // // //       if (role) {
// // // //           const tenurePayload = {
// // // //               member_id: memberId,
// // // //               year: year,
// // // //               role_student: role,
// // // //               department: formData.get("department"),
// // // //               rank: formData.get("rank"),
// // // //               sort_order: parseInt(formData.get("sort_order") as string) || 99,
// // // //               is_current: !memberPayload.is_alumni
// // // //           };

// // // //           const { data: existingTenure } = await supabase
// // // //             .from("tenures")
// // // //             .select("id")
// // // //             .eq("member_id", memberId)
// // // //             .eq("year", year)
// // // //             .maybeSingle();

// // // //           if (existingTenure) {
// // // //               const { error } = await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
// // // //               if (error) throw error;
// // // //           } else {
// // // //               const { error } = await supabase.from("tenures").insert(tenurePayload);
// // // //               if (error) throw error;
// // // //           }
// // // //       }

// // // //   } catch (error: any) {
// // // //       console.error("Transaction Failed:", error);
// // // //       if (isNewMember && memberId) {
// // // //           await supabase.from("team_members").delete().eq("id", memberId); // Rollback
// // // //       }
// // // //       return { success: false, error: "Database Error: " + error.message };
// // // //   }

// // // //   revalidatePath("/admin/members");
// // // //   revalidatePath("/ensemble");
// // // //   revalidatePath("/artist");
// // // //   return { success: true };
// // // // }

// // // // // --- 2. THE DESTROYER (Delete Action) ---
// // // // export async function deleteMember(id: string) {
// // // //   const supabase = createAdminClient();
// // // //   try {
// // // //       const { error } = await supabase.from("team_members").delete().eq("id", id);
// // // //       if (error) throw error;
// // // //       revalidatePath("/admin/members");
// // // //       revalidatePath("/ensemble");
// // // //       return { success: true };
// // // //   } catch (error: any) {
// // // //       return { success: false, error: error.message };
// // // //   }
// // // // }

// // // "use server";

// // // import { createAdminClient } from "@/lib/supabase/admin";
// // // import { revalidatePath } from "next/cache";
// // // import { SocialLinks } from "@/types/schema";

// // // const generateSlug = (name: string) => 
// // //   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // // // --- 1. THE CREATOR (God Tier Upsert) ---
// // // export async function upsertMember(formData: FormData) {
// // //   const supabase = createAdminClient();
  
// // //   const id = formData.get("id") as string | null;
// // //   const name = formData.get("name") as string;
  
// // //   if (!name) return { success: false, error: "Name is required." };

// // //   // 1. DATA SANITIZATION (The Filter)
// // //   const rawSocials: SocialLinks = {
// // //       instagram: formData.get("instagram")?.toString().trim() || undefined,
// // //       linkedin: formData.get("linkedin")?.toString().trim() || undefined,
// // //   };
// // //   // Cleans { instagram: "" } -> {} to keep DB clean
// // //   const social_links = JSON.parse(JSON.stringify(rawSocials)); 
// // //   //   PARSE LEGACY TITLES (THE  "Website/Backstage" Fix)
// // //   // we expect a comma-separated string from the UI: "web dev, Stage Manager"
// // //   const legacyRaw = formData.get("legacy_titles") as string;
// // //   const legacy_titles = legacyRaw ? legacyRaw.split(',').map(t => t.trim()).filter(t => t.length > 0) : [];
  
// // //   // 2. IDENTITY MATRIX (The Human)
// // //   const memberPayload: any = {
// // //     name,
// // //     email: formData.get("email"),
// // //     bio: formData.get("bio"),
// // //     color: formData.get("color"),
// // //     is_alumni: formData.get("is_alumni") === 'true',
// // //     social_links,
// // //     legacy_titles // <----- New field
// // //   };

// // //   // Auto-Slug for new entities
// // //   if (!id) {
// // //       const slug = generateSlug(name);
// // //       const { data: existing } = await supabase.from('team_members').select('id').eq('slug', slug).single();
// // //       if (existing) return { success: false, error: "A member with this name already exists." };
// // //       memberPayload.slug = slug;
// // //   }

// // //   // 3. MEDIA INGESTION (Parallel Processing)
// // //   const imageFile = formData.get("image_file") as File | null;
// // //   const voiceFile = formData.get("voice_file") as File | null;
// // //   const uploadPromises = [];

// // //   if (imageFile && imageFile.size > 0) {
// // //     const fileName = `img-${memberPayload.slug || id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
// // //     uploadPromises.push(
// // //         supabase.storage.from('avatars').upload(fileName, imageFile, { upsert: true })
// // //         .then(({ data }) => { 
// // //             if (data) memberPayload.image_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; 
// // //         })
// // //     );
// // //   }
  
// // //   if (voiceFile && voiceFile.size > 0) {
// // //     const fileName = `voice-${memberPayload.slug || id}-${Date.now()}.${voiceFile.name.split('.').pop()}`;
// // //     uploadPromises.push(
// // //         supabase.storage.from('avatars').upload(fileName, voiceFile, { upsert: true })
// // //         .then(({ data }) => { 
// // //             if (data) memberPayload.voice_note_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; 
// // //         })
// // //     );
// // //   }

// // //   await Promise.all(uploadPromises);

// // //   // 4. ATOMIC TRANSACTION (The Execution)
// // //   let memberId = id;
// // //   let isNewMember = false;

// // //   try {
// // //       // STEP A: Create/Update The Entity
// // //       if (id) {
// // //         const { error } = await supabase.from("team_members").update(memberPayload).eq("id", id);
// // //         if (error) throw error;
// // //       } else {
// // //         const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
// // //         if (error) throw error;
// // //         memberId = data.id;
// // //         isNewMember = true;
// // //       }

// // //       // STEP B: The Epoch (Tenure) - OPTIONAL
// // //       // Only attempt this if the user actually typed a Role.
// // //       const role = formData.get("role")?.toString().trim();
// // //       const year = formData.get("year")?.toString().trim() || "2025-2026";

// // //       if (role && year ) {
// // //           const tenurePayload = {
// // //               member_id: memberId,
// // //               year: year,
// // //               role_student: role,
// // //               department: formData.get("department"),
// // //               rank: formData.get("rank"),
// // //               sort_order: parseInt(formData.get("sort_order") as string) || 99,
// // //               is_current: !memberPayload.is_alumni
// // //           };

// // //           // Smart Upsert: Check if tenure exists for this Year/Member
// // //           const { data: existingTenure } = await supabase
// // //             .from("tenures")
// // //             .select("id")
// // //             .eq("member_id", memberId)
// // //             .eq("year", year)
// // //             .maybeSingle();

// // //           if (existingTenure) {
// // //               const { error } = await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
// // //               if (error) throw error;
// // //           } else {
// // //               const { error } = await supabase.from("tenures").insert(tenurePayload);
// // //               if (error) throw error;
// // //           }
// // //       } 
// // //       // NOTE: If role is empty, we do NOTHING. This is correct. 
// // //       // The member is created as an Artist with no Tenure.

// // //   } catch (error: any) {
// // //       console.error("Transaction Failed:", error);
// // //       // ROLLBACK: If we made a ghost member but failed the tenure, kill the ghost.
// // //       if (isNewMember && memberId) {
// // //           await supabase.from("team_members").delete().eq("id", memberId);
// // //       }
// // //       return { success: false, error: "Database Error: " + error.message };
// // //   }

// // //   // 5. CACHE PURGE
// // //   revalidatePath("/admin/members");
// // //   revalidatePath("/ensemble");
// // //   revalidatePath("/artist");
// // //   return { success: true };
// // // }

// // // // --- 2. THE DESTROYER ---
// // // export async function deleteMember(id: string) {
// // //   const supabase = createAdminClient();
// // //   try {
// // //       const { error } = await supabase.from("team_members").delete().eq("id", id);
// // //       if (error) throw error;
      
// // //       revalidatePath("/admin/members");
// // //       revalidatePath("/ensemble");
// // //       return { success: true };
// // //   } catch (error: any) {
// // //       return { success: false, error: error.message };
// // //   }
// // // }

// // "use server";

// // import { createAdminClient } from "@/lib/supabase/admin";
// // import { revalidatePath } from "next/cache";
// // import { SocialLinks } from "@/types/schema";

// // const generateSlug = (name: string) => 
// //   name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// // export async function upsertMember(formData: FormData) {
// //   const supabase = createAdminClient();
  
// //   const id = formData.get("id") as string | null;
// //   const name = formData.get("name") as string;
  
// //   if (!name) return { success: false, error: "Name is required." };

// //   // 1. SANITIZE SOCIALS
// //   const rawSocials: SocialLinks = {
// //       instagram: formData.get("instagram")?.toString().trim() || undefined,
// //       linkedin: formData.get("linkedin")?.toString().trim() || undefined,
// //   };
// //   const social_links = JSON.parse(JSON.stringify(rawSocials));

// //   // 2. PARSE LEGACY TITLES (The "Artist" Skills)
// //   // Input: "Web Dev, Writer" -> Output: ["Web Dev", "Writer"]
// //   const legacyRaw = formData.get("legacy_titles") as string;
// //   const legacy_titles = legacyRaw 
// //       ? legacyRaw.split(',').map(t => t.trim()).filter(t => t.length > 0) 
// //       : [];

// //   // 3. PREPARE IDENTITY
// //   const memberPayload: any = {
// //     name,
// //     email: formData.get("email"),
// //     short_bio: formData.get("short_bio"),
// //     bio: formData.get("bio"),
// //     sorting_weight: parseInt(formData.get("sorting_weight") as string) || 99,
// //     is_hidden: formData.get("is_hideen") === 'true', 
// //     color: formData.get("color"),
// //     is_alumni: formData.get("is_alumni") === 'true',
// //     social_links,
// //     legacy_titles // <--- The new capability
// //   };

// //   // Auto-Slug for new members
// //   if (!id) {
// //       const slug = generateSlug(name);
// //       const { data: existing } = await supabase.from('team_members').select('id').eq('slug', slug).single();
// //       if (existing) return { success: false, error: "Member name collision." };
// //       memberPayload.slug = slug;
// //   }

// //   // 4. MEDIA UPLOAD (Parallel)
// //   const imageFile = formData.get("image_file") as File | null;
// //   const voiceFile = formData.get("voice_file") as File | null;
// //   const uploadPromises = [];

// //   if (imageFile && imageFile.size > 0) {
// //     const fileName = `img-${memberPayload.slug || id}-${Date.now()}.${imageFile.name.split('.').pop()}`;
// //     uploadPromises.push(
// //         supabase.storage.from('avatars').upload(fileName, imageFile, { upsert: true })
// //         .then(({ data }) => { if (data) memberPayload.image_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; })
// //     );
// //   }
  
// //   if (voiceFile && voiceFile.size > 0) {
// //     const fileName = `voice-${memberPayload.slug || id}-${Date.now()}.${voiceFile.name.split('.').pop()}`;
// //     uploadPromises.push(
// //         supabase.storage.from('avatars').upload(fileName, voiceFile, { upsert: true })
// //         .then(({ data }) => { if (data) memberPayload.voice_note_url = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl; })
// //     );
// //   }

// //   await Promise.all(uploadPromises);

// //   // 5. EXECUTION TRANSACTION
// //   let memberId = id;
// //   let isNewMember = false;

// //   try {
// //       // A. UPSERT IDENTITY (The Human)
// //       if (id) {
// //         const { error } = await supabase.from("team_members").update(memberPayload).eq("id", id);
// //         if (error) throw error;
// //       } else {
// //         const { data, error } = await supabase.from("team_members").insert(memberPayload).select("id").single();
// //         if (error) throw error;
// //         memberId = data.id;
// //         isNewMember = true;
// //       }

// //       // B. UPSERT TENURE (The Role) -- CONDITIONAL
// //       // We only touch the 'tenures' table if the user actually assigned a role.
// //       const role = formData.get("role")?.toString().trim();
      
// //       if (role) {
// //           const year = formData.get("year")?.toString().trim() || "2025-2026";
// //           const tenurePayload = {
// //               member_id: memberId,
// //               year: year,
// //               role_student: role,
// //               department: formData.get("department"),
// //               rank: formData.get("rank"),
// //               sort_order: parseInt(formData.get("sort_order") as string) || 99,
// //               is_current: !memberPayload.is_alumni
// //           };

// //           const { data: existingTenure } = await supabase
// //             .from("tenures")
// //             .select("id")
// //             .eq("member_id", memberId)
// //             .eq("year", year)
// //             .maybeSingle();

// //           if (existingTenure) {
// //               await supabase.from("tenures").update(tenurePayload).eq("id", existingTenure.id);
// //           } else {
// //               await supabase.from("tenures").insert(tenurePayload);
// //           }
// //       }

// //   } catch (error: any) {
// //       console.error("Transaction Error:", error);
// //       // Rollback if new member failed
// //       if (isNewMember && memberId) {
// //           await supabase.from("team_members").delete().eq("id", memberId);
// //       }
// //       return { success: false, error: "Database Error: " + error.message };
// //   }

// //   revalidatePath("/admin/members");
// //   revalidatePath("/ensemble");
// //   revalidatePath("/artist");
// //   return { success: true };
// // }

// // // export async function deleteMember(id: string) {
// // //   const supabase = createAdminClient();
// // //   try {
// // //       const { error } = await supabase.from("team_members").delete().eq("id", id);
// // //       if (error) throw error;
// // //       revalidatePath("/admin/members");
// // //       return { success: true };
// // //   } catch (error: any) {
// // //       return { success: false, error: error.message };
// // //   }
// // // }

// // // --- NEW FEATURE: THE QUICK TOGGLE ---
// // export async function toggleVisibility(id: string, currentStatus: boolean) {
// //     const supabase = createAdminClient();
// //     await supabase.from("team_members").update({ is_hidden: !currentStatus }).eq("id", id);
// //     revalidatePath("/admin/members");
// //     revalidatePath("/artist");
// //     revalidatePath("/ensemble");
// //     return { success: true };
// // }

// // export async function deleteMember(id: string) {
// //   const supabase = createAdminClient();
  
// //   try {
// //       // 1. GET FILE PATHS BEFORE DELETION
// //       const { data: member } = await supabase
// //           .from("team_members")
// //           .select("image_url, voice_note_url")
// //           .eq("id", id)
// //           .single();

// //       // 2. DELETE FROM DATABASE
// //       // We do this first to ensure the UI updates. If storage fails, it's less critical than DB remaining dirty.
// //       const { error } = await supabase.from("team_members").delete().eq("id", id);
// //       if (error) throw error;

// //       // 3. PURGE STORAGE (The Cleanup)
// //       const filesToRemove = [];
// //       if (member?.image_url) {
// //           const imgPath = member.image_url.split('/').pop(); // Extract "img-123.jpg"
// //           if (imgPath) filesToRemove.push(imgPath);
// //       }
// //       if (member?.voice_note_url) {
// //           const voicePath = member.voice_note_url.split('/').pop();
// //           if (voicePath) filesToRemove.push(voicePath);
// //       }

// //       if (filesToRemove.length > 0) {
// //           await supabase.storage.from('avatars').remove(filesToRemove);
// //       }

// //       revalidatePath("/admin/members");
// //       revalidatePath("/ensemble");
// //       return { success: true };
// //   } catch (error: any) {
// //       return { success: false, error: error.message };
// //   }
// // }


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