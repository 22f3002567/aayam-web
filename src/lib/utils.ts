// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// /**
//  * ELITE UTILITY:
//  * Merges Tailwind classes conditionally and resolves conflicts.
//  * Example: cn("bg-red-500", isActive && "bg-blue-500") -> "bg-blue-500"
//  */
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // Generates academic years dynamically (e.g., ["2025-2026", "2024-2025", ...])
// export function getAcademicYears(count: number = 4) {
//   const currentDate = new Date();
//   // If we are past June, we are in the new session. Else, we are finishing the old one.
//   const currentYear = currentDate.getMonth() > 5 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
  
//   const years = [];
//   for (let i = 0; i < count; i++) {
//     const start = currentYear - i;
//     const end = start + 1;
//     // Format: "2025-2026"
//     years.push(`${start}-${end}`);
//   }
//   return years;
// }

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// GOD TIER ADDITION: Dynamic Academic Years
// Returns current session + past 3 years automatically.
// e.g. in Feb 2026 -> ["2025-2026", "2024-2025", "2023-2024", "2022-23"]
export function getAcademicYears(count: number = 4) {
  const date = new Date();
  const month = date.getMonth(); // 0-11
  
  // If we are in Jan-June (0-5), the current academic year started last year.
  // e.g. Feb 2026 is part of "2025-2026"
  // If we are in July-Dec (6-11), the current academic year starts this year.
  // e.g. Aug 2026 is part of "2026-2027"
  
  // Aayam session usually starts ~August. Let's use June as the cutoff.
  let startYear = month > 5 ? date.getFullYear() : date.getFullYear() - 1;

  const years = [];
  for (let i = 0; i < count; i++) {
      const y1 = startYear - i;
      const y2 = y1 + 1;
      years.push(`${y1}-${y2}`);
  }
  return years;
}

/**
 * THE SANITIZER:
 * 1. Converts Google Drive "View" links to "Direct" links.
 * 2. Handles null/undefined safely.
 */
export function sanitizeImage(url: string | null | undefined): string | undefined {
  if (!url) return undefined;

  // Fix Google Drive Links
  if (url.includes("drive.google.com")) {
    // Extract the ID
    const idMatch = url.match(/\/d\/(.*?)\//) || url.match(/id=(.*?)(&|$)/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }
  }

  return url;
}