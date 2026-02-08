// "use client";

// import { useState, useEffect } from "react";
// import { Plus, Trash2, Shield, History } from "lucide-react";
// import { getMemberTenures, addTenure, deleteTenure } from "@/app/admin/members/tenure-actions";
// import { toast } from "sonner";

// export default function TenureManager({ memberId }: { memberId: string }) {
//   const [tenures, setTenures] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const loadData = async () => {
//       const data = await getMemberTenures(memberId);
//       setTenures(data);
//       setLoading(false);
//   };

//   useEffect(() => { loadData(); }, [memberId]);

//   const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const formData = new FormData(e.currentTarget);
//       const res = await addTenure(memberId, formData);
//       if (res.success) {
//           toast.success("Timeline Updated");
//           (e.target as HTMLFormElement).reset();
//           loadData();
//       } else {
//           toast.error(res.error);
//       }
//   };

//   const handleDelete = async (id: string) => {
//       if(!confirm("Erase this moment from history?")) return;
//       await deleteTenure(id);
//       loadData();
//   };

//   if (loading) return <div className="text-[10px] text-white/30 animate-pulse">Accessing Archives...</div>;

//   return (
//     <div className="space-y-6">
//         {/* ADD FORM */}
//         <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
//             <div className="flex items-center gap-2 text-[10px] font-mono text-gold-500 uppercase tracking-widest">
//                 <History className="w-3 h-3" /> Add Historical Epoch
//             </div>
            
//             <form onSubmit={handleAdd} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
//                 {/* Row 1 */}
//                 <div className="col-span-3 grid grid-cols-2 gap-2">
//                     <input name="role" placeholder="Role (e.g. PR Head)" required className="bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold-500" />
//                     <input name="year" placeholder="Year (e.g. 2023-2024)" required className="bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold-500" />
//                 </div>
                
//                 {/* Row 2 */}
//                 <input name="department" placeholder="Department" className="bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold-500" />
                
//                 <select name="rank" className="bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold-500">
//                     <option value="CLOUD">Member (Cloud)</option>
//                     <option value="ORBIT">Head (Orbit)</option>
//                     <option value="CROWN">Core (Crown)</option>
//                     <option value="ZENITH">Faculty (Zenith)</option>
//                 </select>

//                 <button type="submit" className="bg-gold-500 text-black p-2 rounded hover:bg-white transition-colors">
//                     <Plus className="w-4 h-4" />
//                 </button>
//             </form>
//         </div>

//         {/* LIST */}
//         <div className="space-y-2">
//             {tenures.length === 0 && <div className="text-center text-white/20 text-xs py-4">No active timeline. This is a pure Artist.</div>}
            
//             {tenures.map((t) => (
//                 <div key={t.id} className="group flex items-center justify-between p-3 bg-black border border-white/5 rounded hover:border-gold-500/30 transition-all">
//                     <div className="flex items-center gap-4">
//                         <div className="text-xs font-mono text-gold-500/80 bg-gold-500/10 px-2 py-1 rounded">{t.year}</div>
//                         <div>
//                             <div className="text-xs text-white font-bold">{t.role_student}</div>
//                             <div className="text-[10px] text-white/40 uppercase tracking-wider">{t.department}</div>
//                         </div>
//                     </div>
//                     <button onClick={() => handleDelete(t.id)} className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-500 transition-all">
//                         <Trash2 className="w-4 h-4" />
//                     </button>
//                 </div>
//             ))}
//         </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Shield, History, ArrowUpDown } from "lucide-react";
import { getMemberTenures, addTenure, deleteTenure } from "@/app/admin/members/tenure-actions";
import { toast } from "sonner";

export default function TenureManager({ memberId }: { memberId: string }) {
  const [tenures, setTenures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load the history
  const loadData = async () => {
      const data = await getMemberTenures(memberId);
      setTenures(data);
      setLoading(false);
  };

  useEffect(() => { loadData(); }, [memberId]);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      
      // Defaults
      if (!formData.get("year")) formData.set("year", "2025-2026");
      
      const res = await addTenure(memberId, formData);
      if (res.success) {
          toast.success("Timeline Updated");
          (e.target as HTMLFormElement).reset();
          loadData();
      } else {
          toast.error(res.error);
      }
  };

  const handleDelete = async (id: string) => {
      if(!confirm("Erase this moment from history?")) return;
      await deleteTenure(id);
      loadData();
  };

  if (loading) return <div className="text-[10px] text-white/30 animate-pulse">Accessing Archives...</div>;

  return (
    <div className="space-y-6">
        
        {/* --- ADD NEW EPOCH FORM --- */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono text-gold-500 uppercase tracking-widest">
                    <History className="w-3 h-3" /> Add Historical Role
                </div>
            </div>
            
            <form onSubmit={handleAdd} className="space-y-3">
                {/* Row 1: Role & Year */}
                <div className="grid grid-cols-2 gap-3">
                    <input name="role" placeholder="Role (e.g. PR Head)" required className="bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold-500" />
                    <input name="year" placeholder="Year (e.g. 2023-2024)" required className="bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold-500" />
                </div>
                
                {/* Row 2: Rank & Department */}
                <div className="grid grid-cols-2 gap-3">
                    <select name="rank" className="bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold-500 appearance-none">
                        <option value="CLOUD">CLOUD (Member)</option>
                        <option value="ORBIT">ORBIT (Head)</option>
                        <option value="CROWN">CROWN (High Command)</option>
                        <option value="ZENITH">ZENITH (Faculty)</option>
                    </select>
                    <input name="department" placeholder="Department (e.g. Creatives)" className="bg-black border border-white/10 rounded p-2 text-xs text-white outline-none focus:border-gold-500" />
                </div>

                {/* Row 3: Priority (Ensemble Sort Order) */}
                <div className="flex gap-3 items-center">
                    <div className="relative w-24">
                        <ArrowUpDown className="absolute left-2 top-2.5 w-3 h-3 text-white/30" />
                        <input 
                            name="sort_order" 
                            type="number" 
                            placeholder="99" 
                            defaultValue="99"
                            className="w-full bg-black border border-white/10 rounded p-2 pl-8 text-xs text-white outline-none focus:border-gold-500" 
                            title="Sort Order (1 = Top of List)"
                        />
                    </div>
                    <button type="submit" className="flex-1 bg-gold-500 text-black text-xs font-bold uppercase p-2 rounded hover:bg-white transition-colors">
                        Add to Timeline
                    </button>
                </div>
                <p className="text-[9px] text-white/20 text-center">* "Sort Order" determines position on the Ensemble Page for that specific year.</p>
            </form>
        </div>

        {/* --- TIMELINE HISTORY LIST --- */}
        <div className="space-y-2">
            {tenures.length === 0 && <div className="text-center text-white/20 text-xs py-4">No active roles in history. (Pure Artist)</div>}
            
            {tenures.map((t) => (
                <div key={t.id} className="group flex items-center justify-between p-3 bg-black border border-white/5 rounded hover:border-gold-500/30 transition-all">
                    <div className="flex items-center gap-4">
                        {/* Year Badge */}
                        <div className="flex flex-col items-center justify-center w-12 h-10 bg-white/5 rounded border border-white/10">
                            <span className="text-[9px] text-white/40 font-mono">YEAR</span>
                            <span className="text-[10px] text-gold-500 font-bold">{t.year.split('-')[0]}</span>
                        </div>
                        
                        {/* Details */}
                        <div>
                            <div className="text-xs text-white font-bold flex items-center gap-2">
                                {t.role_student}
                                {t.rank === 'ZENITH' && <Shield className="w-3 h-3 text-purple-500" />}
                            </div>
                            <div className="text-[10px] text-white/40 uppercase tracking-wider flex gap-2">
                                <span>{t.department || 'General'}</span>
                                <span className="text-white/20">•</span>
                                <span>Sort: {t.sort_order}</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => handleDelete(t.id)} className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
}