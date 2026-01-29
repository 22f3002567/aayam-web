// import { createClient } from '@supabase/supabase-js'

// // ⚠️ ONLY USE THIS ON THE SERVER. NEVER IN CLIENT COMPONENTS.
// export function createAdminClient() {
//   return createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!, 
//     {
//       auth: {
//         autoRefreshToken: false,
//         persistSession: false
//       }
//     }
//   )
// }

import { createClient } from '@supabase/supabase-js'

// ⚠️ SYSTEM USE ONLY. BYPASSES ALL RLS POLICIES.
export function createAdminClient() {
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sbServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!sbUrl || !sbServiceKey) {
    throw new Error("CRITICAL: Supabase Admin Keys missing.");
  }

  return createClient(
    sbUrl,
    sbServiceKey, 
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}