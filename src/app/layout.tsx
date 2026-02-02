// import type { Metadata } from "next";
// import { fontSans, fontSerif, fontMono } from "@/lib/fonts";


// import "./globals.css";
// import Toaster from "@/components/ui/Toaster";
// import TheSigil from "@/components/layout/TheSigil";

// export const metadata: Metadata = {
//   title: "Aayam | Dimensions Unfolding",
//   description: "The Dramatics Society of IIT Madras BS Degree.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="dark">
//       <body className={`
//         ${fontSans.variable} 
//         ${fontSerif.variable} 
//         ${fontMono.variable} 
//         bg-[#050505] 
//         text-[#F0F0F0]
//       `}>
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { fontSans, fontSerif, fontMono } from "@/lib/fonts";
import "./globals.css";
import Toaster from "@/components/ui/Toaster";
import TheSigil from "@/components/layout/TheSigil"; // <--- THE EMBLEM

export const metadata: Metadata = {
  title: "Aayam | Dimensions Unfolding",
  description: "The Dramatics Society of IIT Madras BS Degree.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`
        ${fontSans.variable} 
        ${fontSerif.variable} 
        ${fontMono.variable} 
        bg-[#050505] 
        text-[#F0F0F0]
        selection:bg-[#eab308] selection:text-black
      `}>
        
        {/* THE PERMANENT ANCHOR */}
        <TheSigil />

        {/* THE STAGE */}
        {children}
        
        <Toaster />
      </body>
    </html>
  );
}