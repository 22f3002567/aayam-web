// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export async function authenticateAdmin(prevState: any, formData: FormData) {
//   const inputKey = formData.get("passkey") as string;
//   const SECRET = process.env.ADMIN_PASSKEY;

//   // SAFETY CHECK: If the server is misconfigured, LOCK THE DOOR.
//   if (!SECRET) {
//     console.error("CRITICAL SECURITY ERROR: ADMIN_PASSKEY is not set in environment variables.");
//     return { success: false, error: "System Configuration Error. Contact Technician." };
//   }

//   if (inputKey === SECRET) {
//     const cookieStore = await cookies(); // Must await in Next.js 15+
    
//     cookieStore.set("nexus_session", "active", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 24, // 1 Day
//       path: "/",
//       sameSite: "strict",
//     });

//     return { success: true };
//   } else {
//     return { success: false, error: "Invalid Security Hash" };
//   }
// }

// export async function logoutAdmin() {
//     const cookieStore = await cookies();

//     // 1. Destroy the session cookie
//     cookieStore.delete("nexus_session");

//     // 2. Kick to airlock (login page)
//     redirect("/admin/login");
// }

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function loginWithGoogle() {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  // 1. GENERATE SECURE URL
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error("Auth Error:", error);
    // We don't return here to avoid client-side breaks, 
    // but in a real app you might want to handle this.
    return; 
  }

  // 2. REDIRECT TO GOOGLE
  if (data.url) {
    redirect(data.url);
  }
}

export async function logoutAdmin() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
}