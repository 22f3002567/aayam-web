"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

// --- 1. FETCH POOL (Get all potential actors) ---
export async function getCastPool() {
  const supabase = createAdminClient();
  // Fetch concise list for dropdown
  const { data } = await supabase
    .from('team_members')
    .select('id, name, slug, image_url')
    .order('name', { ascending: true });
  
  return data || [];
}

// --- 2. FETCH CURRENT CAST ---
export async function getPlayCredits(playId: string) {
    const supabase = createAdminClient();
    const { data } = await supabase
        .from('credits')
        .select(`
            id,
            role_artist,
            member:team_members (id, name, image_url)
        `)
        .eq('play_id', playId)
        //Sort by role Priority (Optional logic, or just alphabestical)
        .order('role_artist', { ascending: true });
        
    return data || [];
}

// --- 3. CASTING CALL (Add Credit) ---
export async function addCredit(playId: string, memberId: string, role: string) {
    const supabase = createAdminClient();
    
    if (!playId || !memberId || !role) return { success: false, error: "Missing data" };


    // DUPLICATE CHECK
    const { data: existing } = await supabase
        .from('credits')
        .select('id')
        .eq('play_id', playId)
        .eq('role_artist', role)
        .single();
    if (existing) {
        return { success: false, error: "This member is already cast is this role." };

    }

    
    const { error } = await supabase.from('credits').insert({
        play_id: playId,
        member_id: memberId,
        role_artist: role
    });

    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/originals");
    revalidatePath("/originals");
    return { success: true };
}

// --- 4. YOU'RE FIRED (Remove Credit) ---
export async function removeCredit(creditId: string) {
    const supabase = createAdminClient();
    
    const { error } = await supabase.from('credits').delete().eq('id', creditId);
    if (error) return { success: false, error: error.message };

    revalidatePath("/admin/originals");
    revalidatePath("/originals");
    return { success: true };
}