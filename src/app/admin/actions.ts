// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export async function authenticateAdmin(prevState: any, formData: FormData) {
//   const inputKey = formData.get("passkey") as string;
//   const SECRET = process.env.ADMIN_PASSKEY || "AAYAM_PRIME"; // Fallback if env missing

//   // 1. THE CHECK (Happens on Server, invisible to user)
//   if (inputKey === SECRET) {
    
//     // 2. THE STAMP (Secure, HTTP-Only Cookie)
//     // "httpOnly: true" means JavaScript cannot read this cookie (prevents XSS)
//     // "secure: true" means it only travels over HTTPS
//     (await cookies()).set("nexus_session", "active", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 24, // 1 Day
//       path: "/",
//       sameSite: "strict",
//     });

//     return { success: true };
//   } else {
//     return { success: false, error: "Invalid Credentials" };
//   }
// }

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticateAdmin(prevState: any, formData: FormData) {
  const inputKey = formData.get("passkey") as string;
  const SECRET = process.env.ADMIN_PASSKEY;

  // SAFETY CHECK: If the server is misconfigured, LOCK THE DOOR.
  if (!SECRET) {
    console.error("CRITICAL SECURITY ERROR: ADMIN_PASSKEY is not set in environment variables.");
    return { success: false, error: "System Configuration Error. Contact Technician." };
  }

  if (inputKey === SECRET) {
    const cookieStore = await cookies(); // Must await in Next.js 15+
    
    cookieStore.set("nexus_session", "active", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 Day
      path: "/",
      sameSite: "strict",
    });

    return { success: true };
  } else {
    return { success: false, error: "Invalid Security Hash" };
  }
}

export async function logoutAdmin() {
    const cookieStore = await cookies();

    // 1. Destroy the session cookie
    cookieStore.delete("nexus_session");

    // 2. Kick to airlock (login page)
    redirect("/admin/login");
}