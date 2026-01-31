"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, User, Search } from "lucide-react";
import { getCastPool, getPlayCredits, addCredit, removeCredit } from "@/app/admin/originals/cast-actions";
import { toast } from "sonner";
import Image from "next/image";

export default function CastManager({ playId }: { playId: string }) {
  const [members, setMembers] = useState<any[]>([]);
  const [credits, setCredits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [selectedMember, setSelectedMember] = useState("");
  const [role, setRole] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Load Data
  const loadData = async () => {
      const [m, c] = await Promise.all([getCastPool(), getPlayCredits(playId)]);
      setMembers(m);
      setCredits(c as any[]); // Cast to any to handle join structure
      setIsLoading(false);
  };

  useEffect(() => {
      loadData();
  }, [playId]);

  // Handle Add
  const handleAdd = async () => {
      if (!selectedMember || !role) return;
      setIsAdding(true);
      const res = await addCredit(playId, selectedMember, role);
      
      if (res.success) {
          toast.success("Member Casted");
          setRole("");
          setSelectedMember("");
          await loadData(); // Refresh list
      } else {
          toast.error(res.error);
      }
      setIsAdding(false);
  };

  // Handle Remove
  const handleRemove = async (id: string) => {
      if (!confirm("Remove this cast member?")) return;
      const res = await removeCredit(id);
      if (res.success) {
          await loadData();
      }
  };

  if (isLoading) return <div className="text-[10px] text-white/30 animate-pulse">Loading Casting Database...</div>;

  return (
    <div className="space-y-6">
        
        {/* ADD NEW CAST */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
            <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
                <User className="w-3 h-3" /> Add Cast & Crew
            </label>
            
            <div className="grid grid-cols-[1.5fr_1fr_auto] gap-2">
                {/* Member Select */}
                <div className="relative">
                    <select 
                        value={selectedMember} 
                        onChange={(e) => setSelectedMember(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-md p-2 text-xs text-white outline-none appearance-none"
                    >
                        <option value="">Select Artist...</option>
                        {members.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                </div>

                {/* Role Input */}
                <input 
                    placeholder="Role (e.g. Director)" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-black border border-white/10 rounded-md p-2 text-xs text-white outline-none"
                />

                {/* Action */}
                <button 
                    onClick={handleAdd} 
                    disabled={isAdding || !selectedMember || !role}
                    className="bg-gold-500 text-black p-2 rounded-md hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* CAST LIST */}
        <div className="space-y-2">
            {credits.length === 0 && <div className="text-center text-white/20 text-xs py-4">No cast assigned yet.</div>}
            
            {credits.map((credit) => (
                <div key={credit.id} className="group flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-lg hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-white/5">
                            {credit.member?.image_url ? (
                                <Image src={credit.member.image_url} alt="cast" fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[8px]">{credit.member?.name?.[0]}</div>
                            )}
                        </div>
                        {/* Info */}
                        <div>
                            <div className="text-xs text-white font-medium">{credit.member?.name}</div>
                            <div className="text-[10px] text-gold-500/80 uppercase tracking-wider">{credit.role_artist}</div>
                        </div>
                    </div>

                    <button 
                        onClick={() => handleRemove(credit.id)} 
                        className="opacity-0 group-hover:opacity-100 p-2 text-white/30 hover:text-red-500 transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>

    </div>
  );
}