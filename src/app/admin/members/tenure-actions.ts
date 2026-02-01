// // "use server";

// // import { createAdminClient } from "@/lib/supabase/admin";
// // import { revalidatePath } from "next/cache";

// // // --- 1. FETCH HISTORY ---
// // export async function getMemberTenures(memberId: string) {
// //   const supabase = createAdminClient();
// //   const { data } = await supabase
// //     .from('tenures')
// //     .select('*')
// //     .eq('member_id', memberId)
// //     .order('year', { ascending: false }); // Newest first
  
// //   return data || [];
// // }

// // // --- 2. APPOINT ROLE (Add Tenure) ---
// // export async function addTenure(memberId: string, formData: FormData) {
// //     const supabase = createAdminClient();
    
// //     const payload = {
// //         member_id: memberId,
// //         year: formData.get("year"), // "2025-2026"
// //         role_student: formData.get("role"), // "Secretary"
// //         department: formData.get("department"),
// //         rank: formData.get("rank"), // "CROWN"
// //         sort_order: parseInt(formData.get("sort_order") as string) || 99,
// //         is_current: formData.get("is_current") === 'true'
// //     };

// //     const { error } = await supabase.from('tenures').insert(payload);

// //     if (error) return { success: false, error: error.message };

// //     revalidatePath("/ensemble");
// //     revalidatePath("/admin/members");
// //     return { success: true };
// // }

// // // --- 3. REVOKE ROLE (Remove Tenure) ---
// // export async function deleteTenure(tenureId: string) {
// //     const supabase = createAdminClient();
// //     const { error } = await supabase.from('tenures').delete().eq('id', tenureId);
    
// //     if (error) return { success: false, error: error.message };

// //     revalidatePath("/ensemble");
// //     revalidatePath("/admin/members");
// //     return { success: true };
// // }

// "use server";

// import { createAdminClient } from "@/lib/supabase/admin";
// import { revalidatePath } from "next/cache";

// export async function getMemberTenures(memberId: string) {
//   const supabase = createAdminClient();
//   const { data } = await supabase
//     .from('tenures')
//     .select('*')
//     .eq('member_id', memberId)
//     .order('year', { ascending: false });
//   return data || [];
// }

// export async function addTenure(memberId: string, formData: FormData) {
//     const supabase = createAdminClient();
//     const payload = {
//         member_id: memberId,
//         year: formData.get("year"),
//         role_student: formData.get("role"),
//         department: formData.get("department"),
//         rank: formData.get("rank"),
//         sort_order: parseInt(formData.get("sort_order") as string) || 99,
//         is_current: formData.get("is_current") === 'true'
//     };
//     const { error } = await supabase.from('tenures').insert(payload);
//     if (error) return { success: false, error: error.message };
//     revalidatePath("/ensemble");
//     return { success: true };
// }

// export async function deleteTenure(tenureId: string) {
//     const supabase = createAdminClient();
//     const { error } = await supabase.from('tenures').delete().eq('id', tenureId);
//     if (error) return { success: false, error: error.message };
//     revalidatePath("/ensemble");
//     return { success: true };
// }

"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

// FETCH HISTORY
export async function getMemberTenures(memberId: string) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('tenures')
    .select('*')
    .eq('member_id', memberId)
    .order('year', { ascending: false });
  return data || [];
}

// ADD HISTORICAL RECORD
export async function addTenure(memberId: string, formData: FormData) {
    const supabase = createAdminClient();
    
    // Strict Validation for the Sub-Table
    const role = formData.get("role");
    if (!role) return { success: false, error: "Role is required for a timeline entry." };

    const payload = {
        member_id: memberId,
        year: formData.get("year"),
        role_student: role,
        department: formData.get("department"),
        rank: formData.get("rank"),
        sort_order: parseInt(formData.get("sort_order") as string) || 99,
        is_current: formData.get("is_current") === 'true'
    };

    const { error } = await supabase.from('tenures').insert(payload);

    if (error) return { success: false, error: error.message };

    revalidatePath("/ensemble");
    return { success: true };
}

// REMOVE HISTORICAL RECORD
export async function deleteTenure(tenureId: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from('tenures').delete().eq('id', tenureId);
    
    if (error) return { success: false, error: error.message };

    revalidatePath("/ensemble");
    return { success: true };
}