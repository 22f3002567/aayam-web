"use client";

import { useState } from "react";
import Image from "next/image";

interface CinematicFrameProps {
  src?: string | null;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
}

export default function CinematicFrame({ 
  src, 
  alt, 
  title, 
  className = "",
  priority = false 
}: CinematicFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // --- 1. LINK SANITIZER ---
  // Transforms Google Drive "View" links to "Direct Image" links instantly.
  const sanitizeSrc = (url: string | null | undefined) => {
    if (!url) return null;
    if (url.includes("drive.google.com")) {
      const idMatch = url.match(/\/d\/(.*?)\//) || url.match(/id=(.*?)(&|$)/);
      if (idMatch && idMatch[1]) return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }
    return url;
  };

  const finalSrc = sanitizeSrc(src);
  
  // Detect external links to bypass Next.js server optimization (prevents 400 errors)
  const isExternal = finalSrc?.startsWith("http");

  // --- 2. FALLBACK STATE (No Image / Error) ---
  if (!finalSrc || hasError) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#080808] flex items-center justify-center group ${className}`}>
        {/* Generative Gradient Fallback */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-neutral-800 to-black" />
        <div className="relative z-10 flex flex-col items-center opacity-50 group-hover:opacity-100 transition-opacity">
            <span className="font-serif text-5xl md:text-7xl text-white/10 select-none">
                {title.charAt(0).toUpperCase()}
            </span>
            <span className="mt-2 font-mono text-[9px] text-white/30 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                No Visual
            </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#050505] group isolate ${className}`}>
      
      {/* --- LAYER 1: THE ATMOSPHERE (Background) --- */}
      {/* Fills the container completely. Blurred to create ambiance. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={finalSrc}
          alt="atmosphere"
          fill
          unoptimized={isExternal} // Bypass server to fix 400 errors
          className="object-cover blur-[40px] scale-125 opacity-50 brightness-75 transition-transform duration-[2s] group-hover:scale-110"
          aria-hidden="true"
        />
        {/* Vignette for focus */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* --- LAYER 2: THE ARTIFACT (Foreground) --- */}
      {/* Preserves aspect ratio. Never crops. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-3">
        <div className="relative w-full h-full shadow-2xl">
            <Image
                src={finalSrc}
                alt={alt}
                fill
                priority={priority}
                unoptimized={isExternal}
                className={`
                    object-contain 
                    drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] 
                    transition-all duration-700 ease-out
                    ${isLoading ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                    group-hover:scale-[1.02]
                `}
                onLoad={() => setIsLoading(false)}
                onError={() => setHasError(true)}
            />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-[#0a0a0a] animate-pulse flex items-center justify-center" />
      )}
    </div>
  );
}