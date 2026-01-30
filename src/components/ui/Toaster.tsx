"use client";

import { Toaster as Sonner } from "sonner";

export default function Toaster() {
  return (
    <Sonner 
      theme="dark" 
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg group-[.toaster]:font-mono group-[.toaster]:text-xs group-[.toaster]:uppercase group-[.toaster]:tracking-widest",
          description: "group-[.toaster]:text-white/40",
          actionButton: "group-[.toaster]:bg-gold-500 group-[.toaster]:text-black",
          cancelButton: "group-[.toaster]:bg-white/10 group-[.toaster]:text-white",
        },
      }}
    />
  );
}