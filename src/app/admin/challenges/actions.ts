// // // // "use server";

// // // // import { createAdminClient } from "@/lib/supabase/admin";
// // // // import { revalidatePath } from "next/cache";

// // // // // --- HELPERS ---
// // // // const generateSlug = (theme: string) => 
// // // //   theme.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + "-" + new Date().getFullYear();

// // // // // --- 1. BROADCAST SIGNAL (Create/Update) ---
// // // // export async function upsertChallenge(formData: FormData) {
// // // //   const supabase = createAdminClient();
  
// // // //   const id = formData.get("id") as string | null;
// // // //   const theme = formData.get("theme") as string;
  
// // // //   const payload: any = {
// // // //     theme,
// // // //     brief: formData.get("brief") as string,
// // // //     deadline: formData.get("deadline") as string,
// // // //     status: formData.get("status") as string,
// // // //   };

// // // //   if (!id) {
// // // //     payload.slug = generateSlug(theme);
// // // //   }

// // // //   // DB OPERATION
// // // //   let error;
// // // //   if (id) {
// // // //     const { error: uErr } = await supabase.from("challenges").update(payload).eq("id", id);
// // // //     error = uErr;
// // // //   } else {
// // // //     const { error: iErr } = await supabase.from("challenges").insert(payload);
// // // //     error = iErr;
// // // //   }

// // // //   if (error) return { success: false, error: error.message };

// // // //   revalidatePath("/admin/challenges");
// // // //   return { success: true };
// // // // }

// // // // // --- 2. KILL SIGNAL (Soft Delete) ---
// // // // export async function archiveChallenge(id: string) {
// // // //   const supabase = createAdminClient();
// // // //   const { error } = await supabase.from("challenges").update({ deleted_at: new Date().toISOString() }).eq("id", id);
// // // //   if (error) return { success: false, error: error.message };
// // // //   revalidatePath("/admin/challenges");
// // // //   return { success: true };
// // // // }

// // // // // --- 3. RESTORE SIGNAL ---
// // // // export async function restoreChallenge(id: string) {
// // // //   const supabase = createAdminClient();
// // // //   const { error } = await supabase.from("challenges").update({ deleted_at: null }).eq("id", id);
// // // //   if (error) return { success: false, error: error.message };
// // // //   revalidatePath("/admin/challenges");
// // // //   return { success: true };
// // // // }

// // // // // --- 4. SHRED SIGNAL (Hard Delete) ---
// // // // export async function shredChallenge(id: string) {
// // // //   const supabase = createAdminClient();
// // // //   const { error } = await supabase.from("challenges").delete().eq("id", id);
// // // //   if (error) return { success: false, error: error.message };
// // // //   revalidatePath("/admin/challenges");
// // // //   return { success: true };
// // // // }

// // // "use server";

// // // import { createAdminClient } from "@/lib/supabase/admin";
// // // import { revalidatePath } from "next/cache";

// // // // --- 1. INTELLIGENCE (Slug Generator) ---
// // // async function generateUniqueSlug(supabase: any, theme: string) {
// // //   let baseSlug = theme.toLowerCase()
// // //     .replace(/[^a-z0-9]+/g, '-')
// // //     .replace(/(^-|-$)+/g, '');
    
// // //   const yearSlug = `${baseSlug}-${new Date().getFullYear()}`;
  
// // //   const { data } = await supabase
// // //     .from('challenges')
// // //     .select('slug')
// // //     .eq('slug', yearSlug)
// // //     .maybeSingle(); 
  
// // //   if (data) {
// // //     return `${yearSlug}-${Date.now()}`; 
// // //   }
// // //   return yearSlug;
// // // }

// // // // --- 2. TRANSMIT (Broadcast) ---
// // // export async function broadcastSignal(formData: FormData) {
// // //   const supabase = createAdminClient();
  
// // //   const theme = formData.get("theme") as string;
// // //   const brief = formData.get("brief") as string;
// // //   const deadlineStr = formData.get("deadline") as string;
  
// // //   // A. VALIDATION
// // //   if (!theme || !brief || !deadlineStr) {
// // //     return { success: false, error: "Transmission Error: Missing Frequency Data." };
// // //   }

// // //   const deadline = new Date(deadlineStr);
// // //   if (isNaN(deadline.getTime())) {
// // //      return { success: false, error: "Transmission Error: Invalid Temporal Coordinates." };
// // //   }
// // //   if (deadline < new Date()) {
// // //     return { success: false, error: "Temporal Paradox: Cannot broadcast to the past." };
// // //   }

// // //   try {
// // //     const slug = await generateUniqueSlug(supabase, theme);

// // //     // B. THE HANDOVER (Archive Old -> Launch New)
// // //     const { data: currentActive } = await supabase
// // //         .from("challenges")
// // //         .select("id, theme")
// // //         .eq("status", "active")
// // //         .maybeSingle(); 
    
// // //     if (currentActive) {
// // //         await supabase.from("challenges")
// // //             .update({ status: "archived" })
// // //             .eq("id", currentActive.id);
            
// // //         await supabase.from("audit_logs").insert({
// // //             action: "AUTO_ARCHIVE",
// // //             target_table: "challenges",
// // //             target_id: currentActive.id,
// // //             details: `Archived by new broadcast: ${theme}`,
// // //             admin_email: "GOD_MODE_ADMIN"
// // //         });
// // //     }

// // //     // C. LAUNCH NEW SIGNAL
// // //     const { data: newSignal, error } = await supabase.from("challenges").insert({
// // //       theme,
// // //       slug,
// // //       brief,
// // //       deadline: deadline.toISOString(),
// // //       status: "active"
// // //     }).select().single();

// // //     if (error) throw error;

// // //     await supabase.from("audit_logs").insert({
// // //         action: "BROADCAST",
// // //         target_table: "challenges",
// // //         target_id: newSignal.id,
// // //         details: `Signal Live: ${theme}`,
// // //         admin_email: "GOD_MODE_ADMIN"
// // //     });

// // //     // D. REFRESH (Targeting the correct paths)
// // //     revalidatePath("/events"); 
// // //     revalidatePath("/admin/challenges"); // <--- CORRECTED PATH
// // //     revalidatePath("/");
    
// // //     return { success: true };

// // //   } catch (err: any) {
// // //     console.error("Broadcast Failure:", err);
// // //     return { success: false, error: "System Failure: " + err.message };
// // //   }
// // // }

// // // // --- 3. TERMINATE (Kill Switch) ---
// // // export async function killSignal(id: string) {
// // //   const supabase = createAdminClient();
  
// // //   try {
// // //     const { error } = await supabase
// // //       .from("challenges")
// // //       .update({ status: "closed" })
// // //       .eq("id", id);

// // //     if (error) throw error;

// // //     await supabase.from("audit_logs").insert({
// // //         action: "KILL_SIGNAL",
// // //         target_table: "challenges",
// // //         target_id: id,
// // //         details: "Emergency Cutoff Initiated.",
// // //         admin_email: "GOD_MODE_ADMIN"
// // //     });

// // //     revalidatePath("/events");
// // //     revalidatePath("/admin/challenges"); // <--- CORRECTED PATH
// // //     return { success: true };

// // //   } catch (err: any) {
// // //     return { success: false, error: err.message };
// // //   }
// // // }
// // "use server";

// // import { createAdminClient } from "@/lib/supabase/admin";
// // import { revalidatePath } from "next/cache";

// // // --- 1. INTELLIGENCE (Slug Generator) ---
// // async function generateUniqueSlug(supabase: any, theme: string) {
// //   let baseSlug = theme.toLowerCase()
// //     .replace(/[^a-z0-9]+/g, '-')
// //     .replace(/(^-|-$)+/g, '');
    
// //   const yearSlug = `${baseSlug}-${new Date().getFullYear()}`;
  
// //   const { data } = await supabase
// //     .from('challenges')
// //     .select('slug')
// //     .eq('slug', yearSlug)
// //     .maybeSingle(); 
  
// //   if (data) {
// //     return `${yearSlug}-${Date.now()}`; 
// //   }
// //   return yearSlug;
// // }

// // // --- 2. TRANSMIT (Broadcast) ---
// // export async function broadcastSignal(formData: FormData) {
// //   const supabase = createAdminClient();
  
// //   const theme = formData.get("theme") as string;
// //   const brief = formData.get("brief") as string;
// //   const deadlineStr = formData.get("deadline") as string;
  
// //   // A. VALIDATION
// //   if (!theme || !brief || !deadlineStr) {
// //     return { success: false, error: "Transmission Error: Missing Frequency Data." };
// //   }

// //   const deadline = new Date(deadlineStr);
// //   if (isNaN(deadline.getTime())) {
// //      return { success: false, error: "Transmission Error: Invalid Temporal Coordinates." };
// //   }
// //   if (deadline < new Date()) {
// //     return { success: false, error: "Temporal Paradox: Cannot broadcast to the past." };
// //   }

// //   try {
// //     const slug = await generateUniqueSlug(supabase, theme);

// //     // B. THE HANDOVER (Archive Old -> Launch New)
// //     const { data: currentActive } = await supabase
// //         .from("challenges")
// //         .select("id, theme")
// //         .eq("status", "active")
// //         .maybeSingle(); 
    
// //     if (currentActive) {
// //         await supabase.from("challenges")
// //             .update({ status: "archived" })
// //             .eq("id", currentActive.id);
            
// //         await supabase.from("audit_logs").insert({
// //             action: "AUTO_ARCHIVE",
// //             target_table: "challenges",
// //             target_id: currentActive.id,
// //             details: `Archived by new broadcast: ${theme}`,
// //             admin_email: "GOD_MODE_ADMIN"
// //         });
// //     }

// //     // C. LAUNCH NEW SIGNAL
// //     const { data: newSignal, error } = await supabase.from("challenges").insert({
// //       theme,
// //       slug,
// //       brief,
// //       deadline: deadline.toISOString(),
// //       status: "active"
// //     }).select().single();

// //     if (error) throw error;

// //     await supabase.from("audit_logs").insert({
// //         action: "BROADCAST",
// //         target_table: "challenges",
// //         target_id: newSignal.id,
// //         details: `Signal Live: ${theme}`,
// //         admin_email: "GOD_MODE_ADMIN"
// //     });

// //     // D. REFRESH
// //     revalidatePath("/events"); 
// //     revalidatePath("/admin/challenges");
// //     revalidatePath("/");
    
// //     return { success: true };

// //   } catch (err: any) {
// //     console.error("Broadcast Failure:", err);
// //     return { success: false, error: "System Failure: " + err.message };
// //   }
// // }

// // // --- 3. TERMINATE (Kill Switch) ---
// // export async function killSignal(id: string) {
// //   const supabase = createAdminClient();
  
// //   try {
// //     const { error } = await supabase
// //       .from("challenges")
// //       .update({ status: "closed" })
// //       .eq("id", id);

// //     if (error) throw error;

// //     await supabase.from("audit_logs").insert({
// //         action: "KILL_SIGNAL",
// //         target_table: "challenges",
// //         target_id: id,
// //         details: "Emergency Cutoff Initiated.",
// //         admin_email: "GOD_MODE_ADMIN"
// //     });

// //     revalidatePath("/events");
// //     revalidatePath("/admin/challenges");
// //     return { success: true };

// //   } catch (err: any) {
// //     return { success: false, error: err.message };
// //   }
// // }


// // "use server";

// // import { createAdminClient } from "@/lib/supabase/admin";
// // import { revalidatePath } from "next/cache";

// // // --- 1. INTELLIGENCE (Slug Generator) ---
// // async function generateUniqueSlug(supabase: any, theme: string) {
// //   let baseSlug = theme.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
// //   const yearSlug = `${baseSlug}-${new Date().getFullYear()}`;
  
// //   const { data } = await supabase.from('challenges').select('slug').eq('slug', yearSlug).maybeSingle();
// //   return data ? `${yearSlug}-${Date.now()}` : yearSlug;
// // }

// // // --- 2. BROADCAST (New Signal) ---
// // export async function broadcastSignal(formData: FormData) {
// //   const supabase = createAdminClient();
// //   const theme = formData.get("theme") as string;
// //   const brief = formData.get("brief") as string;
// //   const deadlineStr = formData.get("deadline") as string;

// //   if (!theme || !brief || !deadlineStr) return { success: false, error: "Missing Frequency Data." };
  
// //   const deadline = new Date(deadlineStr);
// //   if (deadline < new Date()) return { success: false, error: "Cannot broadcast to the past." };

// //   try {
// //     // A. Archive Active
// //     const { data: current } = await supabase.from("challenges").select("id").eq("status", "active").maybeSingle();
// //     if (current) {
// //         await supabase.from("challenges").update({ status: "archived" }).eq("id", current.id);
// //     }

// //     // B. Create New
// //     const slug = await generateUniqueSlug(supabase, theme);
// //     const { data: newSignal, error } = await supabase.from("challenges").insert({
// //       theme, slug, brief, deadline: deadline.toISOString(), status: "active"
// //     }).select().single();

// //     if (error) throw error;

// //     // C. Audit
// //     await supabase.from("audit_logs").insert({
// //         action: "BROADCAST", target_table: "challenges", target_id: newSignal.id,
// //         details: `Signal Live: ${theme}`, admin_email: "GOD_MODE_ADMIN"
// //     });

// //     revalidatePath("/admin/challenges");
// //     return { success: true };
// //   } catch (err: any) {
// //     return { success: false, error: err.message };
// //   }
// // }

// // // --- 3. HOTFIX (Update Active Signal) --- <--- NEW SUPERPOWER
// // export async function updateSignal(formData: FormData) {
// //   const supabase = createAdminClient();
// //   const id = formData.get("id") as string;
// //   const theme = formData.get("theme") as string;
// //   const brief = formData.get("brief") as string;
// //   const deadlineStr = formData.get("deadline") as string;

// //   try {
// //     const { error } = await supabase.from("challenges").update({
// //       theme, brief, deadline: new Date(deadlineStr).toISOString()
// //     }).eq("id", id);

// //     if (error) throw error;

// //     await supabase.from("audit_logs").insert({
// //         action: "UPDATE_SIGNAL", target_table: "challenges", target_id: id,
// //         details: `Hotfix applied to: ${theme}`, admin_email: "GOD_MODE_ADMIN"
// //     });

// //     revalidatePath("/admin/challenges");
// //     return { success: true };
// //   } catch (err: any) {
// //     return { success: false, error: err.message };
// //   }
// // }

// // // --- 4. KILL SWITCH ---
// // export async function killSignal(id: string) {
// //   const supabase = createAdminClient();
// //   try {
// //     await supabase.from("challenges").update({ status: "closed" }).eq("id", id);
    
// //     await supabase.from("audit_logs").insert({
// //         action: "KILL_SIGNAL", target_table: "challenges", target_id: id,
// //         details: "Emergency Cutoff.", admin_email: "GOD_MODE_ADMIN"
// //     });

// //     revalidatePath("/admin/challenges");
// //     return { success: true };
// //   } catch (err: any) {
// //     return { success: false, error: err.message };
// //   }
// // }

// "use server";

// import { createAdminClient } from "@/lib/supabase/admin";
// import { revalidatePath } from "next/cache";

// // --- 1. INTELLIGENCE (Slug Generator) ---
// async function generateUniqueSlug(supabase: any, theme: string) {
//   let baseSlug = theme.toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/(^-|-$)+/g, '');
//   const yearSlug = `${baseSlug}-${new Date().getFullYear()}`;
  
//   const { data } = await supabase.from('challenges').select('slug').eq('slug', yearSlug).maybeSingle();
//   return data ? `${yearSlug}-${Date.now()}` : yearSlug;
// }

// // --- 2. BROADCAST (New Signal) ---
// export async function broadcastSignal(formData: FormData) {
//   const supabase = createAdminClient();
//   const theme = formData.get("theme") as string;
//   const brief = formData.get("brief") as string;
//   const deadlineStr = formData.get("deadline") as string;

//   if (!theme || !brief || !deadlineStr) return { success: false, error: "Missing Frequency Data." };
  
//   const deadline = new Date(deadlineStr);
//   if (deadline < new Date()) return { success: false, error: "Cannot broadcast to the past." };

//   try {
//     // A. Archive Active
//     const { data: current } = await supabase.from("challenges").select("id").eq("status", "active").maybeSingle();
//     if (current) {
//         await supabase.from("challenges").update({ status: "archived" }).eq("id", current.id);
//     }

//     // B. Create New
//     const slug = await generateUniqueSlug(supabase, theme);
//     const { data: newSignal, error } = await supabase.from("challenges").insert({
//       theme, slug, brief, deadline: deadline.toISOString(), status: "active"
//     }).select().single();

//     if (error) throw error;

//     // C. Audit
//     await supabase.from("audit_logs").insert({
//         action: "BROADCAST", target_table: "challenges", target_id: newSignal.id,
//         details: `Signal Live: ${theme}`, admin_email: "GOD_MODE_ADMIN"
//     });

//     revalidatePath("/admin/challenges");
//     return { success: true };
//   } catch (err: any) {
//     return { success: false, error: err.message };
//   }
// }

// // --- 3. HOTFIX (Update Active Signal) --- <--- NEW SUPERPOWER
// export async function updateSignal(formData: FormData) {
//   const supabase = createAdminClient();
//   const id = formData.get("id") as string;
//   const theme = formData.get("theme") as string;
//   const brief = formData.get("brief") as string;
//   const deadlineStr = formData.get("deadline") as string;

//   try {
//     const { error } = await supabase.from("challenges").update({
//       theme, brief, deadline: new Date(deadlineStr).toISOString()
//     }).eq("id", id);

//     if (error) throw error;

//     await supabase.from("audit_logs").insert({
//         action: "UPDATE_SIGNAL", target_table: "challenges", target_id: id,
//         details: `Hotfix applied to: ${theme}`, admin_email: "GOD_MODE_ADMIN"
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
//         action: "KILL_SIGNAL", target_table: "challenges", target_id: id,
//         details: "Emergency Cutoff.", admin_email: "GOD_MODE_ADMIN"
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

// --- 2. BROADCAST (Create New Signal) ---
export async function broadcastSignal(formData: FormData) {
  const supabase = createAdminClient();
  const theme = formData.get("theme") as string;
  const brief = formData.get("brief") as string;
  const deadlineStr = formData.get("deadline") as string;

  if (!theme || !brief || !deadlineStr) return { success: false, error: "Missing Frequency Data." };
  
  const deadline = new Date(deadlineStr);
  if (deadline < new Date()) return { success: false, error: "Cannot broadcast to the past." };

  try {
    // Archive Active
    const { data: current } = await supabase.from("challenges").select("id").eq("status", "active").maybeSingle();
    if (current) {
        await supabase.from("challenges").update({ status: "archived" }).eq("id", current.id);
    }

    // Create New
    const slug = await generateUniqueSlug(supabase, theme);
    const { data: newSignal, error } = await supabase.from("challenges").insert({
      theme, slug, brief, deadline: deadline.toISOString(), status: "active"
    }).select().single();

    if (error) throw error;

    await supabase.from("audit_logs").insert({
        action: "BROADCAST", target_table: "challenges", target_id: newSignal.id,
        details: `Signal Live: ${theme}`, admin_email: "GOD_MODE_ADMIN"
    });

    revalidatePath("/admin/challenges");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// --- 3. HOTFIX (Edit Active Signal) ---
export async function updateSignal(formData: FormData) {
  const supabase = createAdminClient();
  const id = formData.get("id") as string;
  const theme = formData.get("theme") as string;
  const brief = formData.get("brief") as string;
  const deadlineStr = formData.get("deadline") as string;

  try {
    const { error } = await supabase.from("challenges").update({
      theme, brief, deadline: new Date(deadlineStr).toISOString()
    }).eq("id", id);

    if (error) throw error;

    await supabase.from("audit_logs").insert({
        action: "UPDATE_SIGNAL", target_table: "challenges", target_id: id,
        details: `Hotfix applied to: ${theme}`, admin_email: "GOD_MODE_ADMIN"
    });

    revalidatePath("/admin/challenges");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// --- 4. KILL SWITCH (Destroy Signal) ---
export async function killSignal(id: string) {
  const supabase = createAdminClient();
  try {
    await supabase.from("challenges").update({ status: "closed" }).eq("id", id);
    
    await supabase.from("audit_logs").insert({
        action: "KILL_SIGNAL", target_table: "challenges", target_id: id,
        details: "Emergency Cutoff.", admin_email: "GOD_MODE_ADMIN"
    });

    revalidatePath("/admin/challenges");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}