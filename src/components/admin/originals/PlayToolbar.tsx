// "use client";
// import { useState } from "react";
// import { Plus } from "lucide-react";
// import PlaySheet from "./PlaySheet";

// export default function PlayToolbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <button 
//         onClick={() => setIsOpen(true)}
//         className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-lg hover:bg-gold-500 transition-all font-bold uppercase text-xs tracking-widest"
//       >
//         <Plus className="w-4 h-4" />
//         New Production
//       </button>
//       <PlaySheet isOpen={isOpen} onClose={() => setIsOpen(false)} initialData={null} />
//     </>
//   );
// }

"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import PlaySheet from "./PlaySheet";

export default function PlayToolbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-3 px-6 py-3 bg-white text-black rounded-lg hover:bg-gold-500 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]"
      >
        <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
        <span className="font-bold uppercase text-xs tracking-widest">New Production</span>
      </button>
      <PlaySheet isOpen={isOpen} onClose={() => setIsOpen(false)} initialData={null} />
    </>
  );
}