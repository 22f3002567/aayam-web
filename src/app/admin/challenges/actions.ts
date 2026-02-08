
// "use server";

// import { createAdminClient } from "@/lib/supabase/admin";
// import { revalidatePath } from "next/cache";

// // --- 1. INTELLIGENCE (Slug Generator) ---
// async function generateUniqueSlug(supabase: any, theme: string) {
//   let baseSlug = theme.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
//   const yearSlug = `${baseSlug}-${new Date().getFullYear()}`;
//   const { data } = await supabase.from('challenges').select('slug').eq('slug', yearSlug).maybeSingle();
//   return data ? `${yearSlug}-${Date.now()}` : yearSlug;
// }

// // --- 2. BROADCAST (Create) ---
// export async function broadcastSignal(formData: FormData) {
//   const supabase = createAdminClient();
//   const theme = formData.get("theme") as string;
//   const brief = formData.get("brief") as string;
//   const deadlineStr = formData.get("deadline") as string;
//   const form_type = formData.get("form_type") as string || 'general';
//   const external_link = formData.get("external_link") as string || null;

//   // Validation
//   if (!theme || !brief || !deadlineStr) return { success: false, error: "Missing Frequency Data." };
//   if (form_type === 'external' && !external_link) return { success: false, error: "External Protocol requires a Target URL." };
  
//   const deadline = new Date(deadlineStr);
//   if (deadline < new Date()) return { success: false, error: "Cannot broadcast to the past." };

//   try {
//     const slug = await generateUniqueSlug(supabase, theme);

//     // Archive Active
//     const { data: current } = await supabase.from("challenges").select("id").eq("status", "active").maybeSingle();
//     if (current) {
//         await supabase.from("challenges").update({ status: "archived" }).eq("id", current.id);
//     }

//     // Launch New
//     const { error } = await supabase.from("challenges").insert({
//       theme, slug, brief, deadline: deadline.toISOString(), status: "active",
//       form_type, external_link
//     });

//     if (error) throw error;

//     await supabase.from("audit_logs").insert({
//         action: "BROADCAST", target_table: "challenges", target_id: slug,
//         details: `Signal Live: ${theme} [${form_type}]`, admin_email: "GOD_MODE_ADMIN"
//     });

//     revalidatePath("/admin/challenges");
//     return { success: true };
//   } catch (err: any) {
//     return { success: false, error: err.message };
//   }
// }

// // --- 3. HOTFIX (Update) ---
// export async function updateSignal(formData: FormData) {
//   const supabase = createAdminClient();
//   const id = formData.get("id") as string;
//   const theme = formData.get("theme") as string;
//   const brief = formData.get("brief") as string;
//   const deadlineStr = formData.get("deadline") as string;
//   const form_type = formData.get("form_type") as string;
//   const external_link = formData.get("external_link") as string || null;

//   // Validation (The Missing Piece)
//   if (form_type === 'external' && !external_link) return { success: false, error: "External Protocol requires a Target URL." };

//   try {
//     const { error } = await supabase.from("challenges").update({
//       theme, brief, deadline: new Date(deadlineStr).toISOString(),
//       form_type, external_link
//     }).eq("id", id);

//     if (error) throw error;

//     await supabase.from("audit_logs").insert({
//         action: "UPDATE_SIGNAL", target_table: "challenges", target_id: id,
//         details: `Hotfix applied: ${theme}`, admin_email: "GOD_MODE_ADMIN"
//     });

//     revalidatePath("/admin/challenges");
//     return { success: true };
//   } catch (err: any) {
//     return { success: false, error: err.message };
//   }
// }

// // --- 4. KILL SWITCH ---
// export async function killSignal(id: string) {
//   const supabase = createAdminClient();
//   try {
//     await supabase.from("challenges").update({ status: "closed" }).eq("id", id);
//     await supabase.from("audit_logs").insert({
//         action: "KILL_SIGNAL", target_table: "challenges", target_id: id, details: "Emergency Cutoff.", admin_email: "GOD_MODE_ADMIN"
//     });
//     revalidatePath("/admin/challenges");
//     return { success: true };
//   } catch (err: any) {
//     return { success: false, error: err.message };
//   }
// }

"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

// --- 1. INTELLIGENCE (Slug Generator) ---
async function generateUniqueSlug(supabase: any, theme: string) {
  let baseSlug = theme.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const yearSlug = `${baseSlug}-${new Date().getFullYear()}`;
  const { data } = await supabase.from('challenges').select('slug').eq('slug', yearSlug).maybeSingle();
  return data ? `${yearSlug}-${Date.now()}` : yearSlug;
}

// --- 2. BROADCAST (Create New) ---
// Keeps your original logic: Archiving old signals + Generating Slug + specific "BROADCAST" log
export async function broadcastSignal(formData: FormData) {
  const supabase = createAdminClient();
  const theme = formData.get("theme") as string;
  const brief = formData.get("brief") as string;
  const deadlineStr = formData.get("deadline") as string;
  const form_type = formData.get("form_type") as string || 'general';
  const external_link = formData.get("external_link") as string || null;

  if (!theme || !brief || !deadlineStr) return { success: false, error: "Missing Frequency Data." };
  if (form_type === 'external' && !external_link) return { success: false, error: "External Protocol requires a Target URL." };
  
  const deadline = new Date(deadlineStr);
  if (deadline < new Date()) return { success: false, error: "Cannot broadcast to the past." };

  try {
    const slug = await generateUniqueSlug(supabase, theme);

    // ARCHIVE PROTOCOL: Retire the current active signal before launching new one
    const { data: current } = await supabase.from("challenges").select("id").eq("status", "active").maybeSingle();
    if (current) {
        await supabase.from("challenges").update({ status: "archived" }).eq("id", current.id);
    }

    const { error } = await supabase.from("challenges").insert({
      theme, slug, brief, deadline: deadline.toISOString(), status: "active",
      form_type, external_link
    });

    if (error) throw error;

    await supabase.from("audit_logs").insert({
        action: "BROADCAST", target_table: "challenges", target_id: slug,
        details: `Signal Live: ${theme} [${form_type}]`, admin_email: "GOD_MODE_ADMIN"
    });

    revalidatePath("/admin/challenges");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// --- 3. MODULATE (Update Existing) ---
// Keeps your logic: Updates fields but preserves Slug/Status logic + specific "UPDATE" log
export async function updateSignal(formData: FormData) {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;
  const theme = formData.get("theme") as string;
  const brief = formData.get("brief") as string;
  const deadlineStr = formData.get("deadline") as string;
  const form_type = formData.get("form_type") as string;
  const external_link = formData.get("external_link") as string || null;
  
  // Also allow updating status manually if provided in the form
  const status = formData.get("status") as string;

  if (form_type === 'external' && !external_link) return { success: false, error: "External Protocol requires a Target URL." };

  try {
    const payload: any = {
      theme, brief, deadline: new Date(deadlineStr).toISOString(),
      form_type, external_link
    };
    if (status) payload.status = status;

    const { error } = await supabase.from("challenges").update(payload).eq("id", id);

    if (error) throw error;

    await supabase.from("audit_logs").insert({
        action: "UPDATE_SIGNAL", target_table: "challenges", target_id: id,
        details: `Hotfix applied: ${theme}`, admin_email: "GOD_MODE_ADMIN"
    });

    revalidatePath("/admin/challenges");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// --- 4. THE DISPATCHER (The Bridge) ---
// This is what ChallengeSheet.tsx is calling. It routes to the correct specialist.
export async function upsertChallenge(formData: FormData) {
    const id = formData.get("id") as string | null;
    if (id) {
        return updateSignal(formData);
    } else {
        return broadcastSignal(formData);
    }
}

// --- 5. KILL SWITCH ---
export async function killSignal(id: string) {
  const supabase = createAdminClient();
  try {
    await supabase.from("challenges").update({ status: "closed" }).eq("id", id);
    await supabase.from("audit_logs").insert({
        action: "KILL_SIGNAL", target_table: "challenges", target_id: id, details: "Emergency Cutoff.", admin_email: "GOD_MODE_ADMIN"
    });
    revalidatePath("/admin/challenges");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}