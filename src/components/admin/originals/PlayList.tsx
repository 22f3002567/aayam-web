// "use client";
// import { useState } from "react";
// import { Edit2, Trash2, Youtube, Calendar } from "lucide-react";
// import { deletePlay } from "@/app/admin/originals/actions";
// import PlaySheet from "./PlaySheet";
// import Image from "next/image";

// export default function PlayList({ plays }: { plays: any[] }) {
//   const [editingItem, setEditingItem] = useState<any | null>(null);

//   const handleDelete = async (id: string) => {
//       if (confirm("Delete this production? This cannot be undone.")) {
//           await deletePlay(id);
//       }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {plays.map((play) => (
//           <div key={play.id} className="group relative bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all">
//             {/* Poster Aspect Ratio 2:3 */}
//             <div className="relative aspect-[2/3] w-full bg-white/5">
//                 {play.poster_url ? (
//                     <Image src={play.poster_url} alt={play.title} fill className="object-cover" />
//                 ) : (
//                     <div className="w-full h-full flex items-center justify-center text-white/10 text-4xl font-serif">?</div>
//                 )}
                
//                 {/* Overlay Actions */}
//                 <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                     <button onClick={() => setEditingItem(play)} className="p-3 bg-white text-black rounded-full hover:bg-gold-500 transition-colors">
//                         <Edit2 className="w-5 h-5" />
//                     </button>
//                     <button onClick={() => handleDelete(play.id)} className="p-3 bg-red-900/50 text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors">
//                         <Trash2 className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>

//             {/* Info Block */}
//             <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                     <span className="text-[9px] font-mono text-gold-500 uppercase tracking-widest border border-gold-500/20 px-2 py-1 rounded">
//                         {play.category}
//                     </span>
//                     <span className="text-[9px] font-mono text-white/30 flex items-center gap-1">
//                         <Calendar className="w-3 h-3" />
//                         {new Date(play.release_date).getFullYear()}
//                     </span>
//                 </div>
//                 <h3 className="text-white font-serif text-xl leading-tight mb-2 truncate">{play.title}</h3>
//                 {play.youtube_id && (
//                     <div className="flex items-center gap-2 text-white/40 text-xs">
//                         <Youtube className="w-3 h-3 text-red-500" />
//                         <span className="font-mono truncate">{play.youtube_id}</span>
//                     </div>
//                 )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <PlaySheet isOpen={!!editingItem} onClose={() => setEditingItem(null)} initialData={editingItem} />
//     </>
//   );
// }

"use client";
import { useState } from "react";
import { Edit2, Trash2, Youtube, Calendar, Film } from "lucide-react";
import { deletePlay } from "@/app/admin/originals/actions";
import PlaySheet from "./PlaySheet";
import Image from "next/image";

export default function PlayList({ plays }: { plays: any[] }) {
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleDelete = async (id: string) => {
      if (confirm("WARNING: Delete this production? This will remove it from the archive forever.")) {
          await deletePlay(id);
      }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {plays.map((play) => (
          <div key={play.id} className="group relative bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all shadow-lg hover:shadow-gold-500/10">
            
            {/* Poster Aspect Ratio 2:3 */}
            <div className="relative aspect-[2/3] w-full bg-white/5">
                {play.poster_url ? (
                    <Image src={play.poster_url} alt={play.title} fill className="object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                        <Film className="w-12 h-12" />
                    </div>
                )}
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    <button onClick={() => setEditingItem(play)} className="p-3 bg-white text-black rounded-full hover:bg-gold-500 transition-colors transform hover:scale-110">
                        <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(play.id)} className="p-3 bg-red-900/20 text-red-500 border border-red-500/50 rounded-full hover:bg-red-500 hover:text-white transition-colors transform hover:scale-110">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Info Block */}
            <div className="p-4 border-t border-white/5">
                <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-mono text-gold-500 uppercase tracking-widest border border-gold-500/20 px-2 py-1 rounded bg-gold-500/5">
                        {play.category}
                    </span>
                    <span className="text-[10px] font-mono text-white/30 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(play.release_date).getFullYear()}
                    </span>
                </div>
                <h3 className="text-white font-serif text-lg leading-tight mb-2 truncate" title={play.title}>{play.title}</h3>
                <div className="flex items-center gap-2 text-white/30 text-[10px]">
                    {play.youtube_id ? <Youtube className="w-3 h-3 text-red-500" /> : <Film className="w-3 h-3" />}
                    <span className="font-mono truncate">{play.slug}</span>
                </div>
            </div>
          </div>
        ))}
      </div>

      <PlaySheet isOpen={!!editingItem} onClose={() => setEditingItem(null)} initialData={editingItem} />
    </>
  );
}