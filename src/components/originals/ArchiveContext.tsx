

// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";
// import { RasaConfig, DEFAULT_RASA } from "@/lib/rasa";
// import { Play } from "@/types/schema";

// type ArchiveContextType = {
//   activeRasa: RasaConfig;
//   hoveredPlay: Play | null;
//   setFocus: (play: Play | null, rasa: RasaConfig | null) => void;
//   setBaseRasa: (rasa: RasaConfig) => void; // NEW: Change the room's default color
// };

// const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

// export function ArchiveProvider({ children }: { children: ReactNode }) {
//   const [baseRasa, setBaseRasaState] = useState<RasaConfig>(DEFAULT_RASA);
//   const [activeRasa, setActiveRasa] = useState<RasaConfig>(DEFAULT_RASA);
//   const [hoveredPlay, setHoveredPlay] = useState<Play | null>(null);

//   // When we set a base, we also reset the active to it immediately
//   const setBaseRasa = (rasa: RasaConfig) => {
//     setBaseRasaState(rasa);
//     if (!hoveredPlay) setActiveRasa(rasa);
//   };

//   const setFocus = (play: Play | null, rasa: RasaConfig | null) => {
//     setHoveredPlay(play);
//     // If hovering, use the card's rasa. If not, revert to the Room's Base Rasa.
//     setActiveRasa(rasa || baseRasa);
//   };

//   return (
//     <ArchiveContext.Provider value={{ activeRasa, hoveredPlay, baseRasa, setFocus, setBaseRasa }}>
//       {children}
//     </ArchiveContext.Provider>
//   );
// }

// export function useArchiveAtmosphere() {
//   const context = useContext(ArchiveContext);
//   if (!context) throw new Error("useArchiveAtmosphere must be used within a Provider");
//   return context;
// }

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { RasaConfig, DEFAULT_RASA } from "@/lib/rasa";
import { Play } from "@/types/schema";

type ArchiveContextType = {
  activeRasa: RasaConfig;
  hoveredPlay: Play | null;
  baseRasa: RasaConfig; // Defined here...
  setFocus: (play: Play | null, rasa: RasaConfig | null) => void;
  setBaseRasa: (rasa: RasaConfig) => void;
};

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export function ArchiveProvider({ children }: { children: ReactNode }) {
  const [baseRasa, setBaseRasaState] = useState<RasaConfig>(DEFAULT_RASA);
  const [activeRasa, setActiveRasa] = useState<RasaConfig>(DEFAULT_RASA);
  const [hoveredPlay, setHoveredPlay] = useState<Play | null>(null);

  const setBaseRasa = (rasa: RasaConfig) => {
    setBaseRasaState(rasa);
    // If not hovering anything, immediately update the active mood to match the room
    if (!hoveredPlay) setActiveRasa(rasa);
  };

  const setFocus = (play: Play | null, rasa: RasaConfig | null) => {
    setHoveredPlay(play);
    setActiveRasa(rasa || baseRasa);
  };

  return (
    <ArchiveContext.Provider value={{ 
        activeRasa, 
        hoveredPlay, 
        baseRasa, // <--- THIS WAS MISSING. ADD IT HERE.
        setFocus, 
        setBaseRasa 
    }}>
      {children}
    </ArchiveContext.Provider>
  );
}

export function useArchiveAtmosphere() {
  const context = useContext(ArchiveContext);
  if (!context) throw new Error("useArchiveAtmosphere must be used within a Provider");
  return context;
}