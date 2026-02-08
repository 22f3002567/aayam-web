
"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { SubmissionStatus } from "@/types/schema";

// --- 1. FETCH TRANSMISSIONS ---
export async function getSubmissions() {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      *,
      challenges (
        theme,
        slug
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Inbox Error:", error.message || error);
    return [];
  }

  return data || [];
}

// --- 2. UPDATE STATUS (Instant Grading) ---
export async function updateStatus(id: string, status: SubmissionStatus) {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from('submissions')
    .update({ status })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/inbox");
  return { success: true };
}

// --- 3. DELETE (Purge) ---
export async function deleteSubmission(id: string) {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from('submissions')
    .delete()
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/inbox");
  return { success: true };
}