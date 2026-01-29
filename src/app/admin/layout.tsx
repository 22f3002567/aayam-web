// // "use client";

// // import { usePathname } from "next/navigation";
// // import NexusLayout from "@/components/admin/NexusLayout";

// // export default function AdminRootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const pathname = usePathname();
// //   const isLoginPage = pathname === "/admin/login";

// //   if (isLoginPage) {
// //     return <>{children}</>;
// //   }

// //   return <NexusLayout>{children}</NexusLayout>;
// // }

// "use client";

// import { usePathname } from "next/navigation";
// import NexusLayout from "@/components/admin/NexusLayout";

// export default function AdminRootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isLoginPage = pathname === "/admin/login";

//   // If we are on the login page, render purely (no sidebar)
//   if (isLoginPage) {
//     return <>{children}</>;
//   }

//   // Otherwise, wrap in The Nexus
//   return <NexusLayout>{children}</NexusLayout>;
// }

"use client";

import { usePathname } from "next/navigation";
import NexusLayout from "@/components/admin/NexusLayout";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // If we are on the login page, render purely (no sidebar)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Otherwise, wrap in The Nexus Shell
  return <NexusLayout>{children}</NexusLayout>;
}