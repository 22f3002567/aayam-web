// "use server";

// import { createClient } from "@/lib/supabase/client"; // Use standard client for public
// import { revalidatePath } from "next/cache";

// export async function submitToChallenge(formData: FormData) {
//   const supabase = createClient();
  
//   const challenge_id = formData.get("challenge_id") as string;
//   const name = formData.get("name") as string;
//   const contact = formData.get("contact_info") as string;
//   const link = formData.get("portfolio_link") as string;
//   const content = formData.get("content") as string;

//   if (!name || !contact || !content) {
//     return { success: false, error: "Identity and Content are required." };
//   }

//   // INSERT INTO DATABASE
//   const { error } = await supabase.from("submissions").insert({
//     challenge_id,
//     name,
//     contact_info: contact,
//     portfolio_link: link,
//     content,
//     type: "general", // You can make this dynamic later
//     status: "pending"
//   });

//   if (error) return { success: false, error: error.message };

//   return { success: true };
// }

"use server";

import { createClient } from "@/lib/supabase/client";

export async function submitToChallenge(formData: FormData) {
  const supabase = createClient();
  
  // Extract Common Data
  const challenge_id = formData.get("challenge_id");
  const contact_info = formData.get("contact_info");
  const content = formData.get("content"); // The Note

  // Extract Dynamic Data (Everything else)
  const dynamicData: any = {};
  formData.forEach((value, key) => {
      if (!['challenge_id', 'contact_info', 'content'].includes(key)) {
          dynamicData[key] = value;
      }
  });

  // SAVE AS JSON
  const { error } = await supabase.from("submissions").insert({
    challenge_id,
    contact_info,
    content,       // The Note
    data: dynamicData, // <--- THE MAGIC (Stores Name, Age, Links, Logline, etc.)
    status: 'pending'
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}