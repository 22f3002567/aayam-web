// "use client";

// import { useState } from "react";
// import { Edit2, Trash2, Crown, Star, Shield, Users } from "lucide-react";
// import { deleteMember } from "@/app/admin/members/actions";
// import MemberSheet from "./MemberSheet";
// import Image from "next/image";

// // Helper to get the correct icon for the rank
// const RankIcon = ({ rank }: { rank: string }) => {
//     switch (rank) {
//         case 'CROWN': return <Crown className="w-3 h-3 text-gold-500" />;
//         case 'ORBIT': return <Star className="w-3 h-3 text-blue-400" />;
//         case 'ZENITH': return <Shield className="w-3 h-3 text-purple-400" />;
//         default: return <Users className="w-3 h-3 text-white/20" />;
//     }
// };

// export default function MemberList({ members }: { members: any[] }) {
//   const [editingItem, setEditingItem] = useState<any | null>(null);

//   const handleDelete = async (id: string) => {
//       if(confirm("WARNING: This will remove the member and their history. Proceed?")) {
//           await deleteMember(id);
//       }
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {members.map((m) => {
//           // LOGIC: Find the most relevant tenure (Current > Latest)
//           const activeTenure = m.tenures?.find((t: any) => t.is_current) || m.tenures?.[0];
//           const role = activeTenure?.role_student || "Member";
//           const dept = activeTenure?.department || "General";
//           const rank = activeTenure?.rank || "CLOUD";

//           return (
//             <div key={m.id} className="group relative p-4 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-white/20 transition-all flex items-center gap-4 overflow-hidden">
                
//                 {/* Aura Strip */}
//                 <div className="absolute left-0 top-0 bottom-0 w-1 transition-all group-hover:w-1.5" style={{ backgroundColor: m.color || '#333' }} />
                
//                 {/* Avatar */}
//                 <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-white/5 shrink-0">
//                     {m.image_url ? (
//                         <Image src={m.image_url} alt={m.name} fill className="object-cover" />
//                     ) : (
//                         <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-white/30">{m.name.charAt(0)}</div>
//                     )}
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1 min-w-0">
//                     <h3 className="text-white font-medium text-sm truncate flex items-center gap-2">
//                         {m.name}
//                     </h3>
//                     <div className="flex flex-col gap-0.5 mt-1">
//                         <div className="flex items-center gap-1.5">
//                             <RankIcon rank={rank} />
//                             <span className="text-[10px] font-mono text-gold-500/80 uppercase tracking-wide truncate">{role}</span>
//                         </div>
//                         <span className="text-[10px] text-white/30 truncate pl-5">{dept}</span>
//                     </div>
//                 </div>

//                 {/* Quick Actions (Hover) */}
//                 <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
//                     <button onClick={() => setEditingItem(m)} className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
//                         <Edit2 className="w-4 h-4" />
//                     </button>
//                     <button onClick={() => handleDelete(m.id)} className="p-2 hover:bg-red-900/20 rounded-lg text-white/50 hover:text-red-500 transition-colors">
//                         <Trash2 className="w-4 h-4" />
//                     </button>
//                 </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* The Sheet in Edit Mode (Passes the clicked item) */}
//       <MemberSheet 
//         isOpen={!!editingItem} 
//         onClose={() => setEditingItem(null)} 
//         initialData={editingItem} 
//       />
//     </>
//   );
// }

"use client";
import { useState } from "react";
import { Edit2, Trash2, EyeOff, Star, Shield, Briefcase, Tag } from "lucide-react";
import { deleteMember } from "@/app/admin/members/actions";
import MemberSheet from "./MemberSheet";
import Image from "next/image";

// Helper to determine the "Main Label" for the list
const getPrimaryRole = (m: any) => {
    if (m.tenures?.[0]) return m.tenures[0].role_student;
    if (m.legacy_titles?.length > 0) return m.legacy_titles[0]; // Artist Skill
    return "Member";
};

export default function MemberList({ members }: { members: any[] }) {
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleDelete = async (id: string) => {
      if (confirm("Permanently discharge this member?")) {
          await deleteMember(id);
      }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {members.map((member) => {
          const isHidden = member.is_hidden;
          const role = getPrimaryRole(member);
          const isZenith = member.tenures?.some((t: any) => t.rank === 'ZENITH');

          return (
            <div 
                key={member.id} 
                className={`group relative bg-[#0a0a0a] border rounded-xl p-4 transition-all hover:border-gold-500/50 ${isHidden ? 'border-red-900/30 opacity-60' : 'border-white/5'}`}
            >
                {/* HEADERS & BADGES */}
                <div className="flex justify-between items-start mb-4">
                    {/* AVATAR */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10">
                        {member.image_url ? (
                            <Image src={member.image_url} alt={member.name} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">{member.name[0]}</div>
                        )}
                    </div>

                    {/* STATUS ICONS */}
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-white/30">
                            <Star className={`w-3 h-3 ${member.sorting_weight < 50 ? 'text-gold-500' : 'text-white/20'}`} />
                            <span>#{member.sorting_weight}</span>
                        </div>
                        {isHidden && (
                            <span className="text-[8px] bg-red-900/50 text-red-400 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <EyeOff className="w-2 h-2" /> HIDDEN
                            </span>
                        )}
                    </div>
                </div>

                {/* IDENTITY */}
                <div>
                    <h3 className={`font-serif text-lg leading-tight mb-1 ${isHidden ? 'text-white/50' : 'text-white'}`}>
                        {member.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                        {isZenith ? (
                            <span className="text-purple-400 flex items-center gap-1"><Shield className="w-3 h-3" /> Faculty</span>
                        ) : member.tenures?.length > 0 ? (
                            <span className="text-gold-500/80 flex items-center gap-1"><Briefcase className="w-3 h-3" /> {role}</span>
                        ) : (
                            <span className="text-blue-400/80 flex items-center gap-1"><Tag className="w-3 h-3" /> {role}</span>
                        )}
                    </div>
                </div>

                {/* ACTIONS (Hover) */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm rounded-xl">
                    <button onClick={() => setEditingItem(member)} className="p-2 bg-white text-black rounded-full hover:bg-gold-500 transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="p-2 bg-red-900/30 text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
          );
        })}
      </div>

      <MemberSheet isOpen={!!editingItem} onClose={() => setEditingItem(null)} initialData={editingItem} />
    </>
  );
}