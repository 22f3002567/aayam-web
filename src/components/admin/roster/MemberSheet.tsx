// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Camera, Palette, Save, User, Mic, Instagram, Linkedin, Briefcase, Tag, Eye, EyeOff, AlignLeft, Star } from "lucide-react";
// import { upsertMember } from "@/app/admin/members/actions";
// import TenureManager from "./TenureManager";
// import { toast } from "sonner";

// // ... Colors ...
// const NAVARASA_COLORS = [
//   { name: 'Sringara (Pink)', hex: '#d946ef' },
//   { name: 'Hasya (Yellow)', hex: '#eab308' },
//   { name: 'Raudra (Red)', hex: '#ef4444' },
//   { name: 'Veera (Orange)', hex: '#f97316' },
//   { name: 'Bhayanaka (Black)', hex: '#000000' },
//   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
//   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
//   { name: 'Shanta (White)', hex: '#ffffff' },
//   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// ];

// export default function MemberSheet({ isOpen, onClose, initialData }: any) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');
//   const [activeTab, setActiveTab] = useState<'profile' | 'timeline'>('profile');
  
//   // NEW STATE: Visibility
//   const [isHidden, setIsHidden] = useState(initialData?.is_hidden || false);

//   const defaultTenure = initialData?.tenures?.[0] || {};
//   const defaultLegacy = initialData?.legacy_titles ? initialData.legacy_titles.join(', ') : '';

//   useEffect(() => {
//     if (isOpen) {
//         setPreview(initialData?.image_url || null);
//         setSelectedColor(initialData?.color || '#eab308');
//         setIsHidden(initialData?.is_hidden || false);
//         setActiveTab('profile');
//     }
//   }, [isOpen, initialData]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     const formData = new FormData(e.currentTarget);
//     if (initialData?.id) formData.append("id", initialData.id);
//     formData.set("color", selectedColor);
//     formData.set("is_hidden", String(isHidden));

//     const result = await upsertMember(formData);
//     setIsSubmitting(false);
    
//     if (result.success) {
//         toast.success(initialData ? "Entity Updated" : "Entity Created");
//         if (!initialData) onClose(); 
//     } else {
//         toast.error(result.error);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div initial={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
//           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
//             <div className="flex justify-between items-center p-8 border-b border-white/5">
//               <div>
//                 <h2 className="font-serif text-2xl text-white">{initialData ? "Control Panel" : "New Entity"}</h2>
//                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
//                     {initialData?.name || "Unregistered"} • {isHidden ? "HIDDEN" : "VISIBLE"}
//                 </p>
//               </div>
//               <div className="flex gap-4">
//                   {/* STEALTH TOGGLE */}
//                   <button type="button" onClick={() => setIsHidden(!isHidden)} className={`p-2 rounded-full border transition-colors ${isHidden ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-white/10 text-white/50 hover:text-white'}`}>
//                       {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                   <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
//               </div>
//             </div>

//             {initialData && (
//                 <div className="flex border-b border-white/5">
//                     <button onClick={() => setActiveTab('profile')} className={`flex-1 py-3 text-[10px] uppercase font-bold transition-colors ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Identity</button>
//                     <button onClick={() => setActiveTab('timeline')} className={`flex-1 py-3 text-[10px] uppercase font-bold transition-colors ${activeTab === 'timeline' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Timeline</button>
//                 </div>
//             )}

//             <div className="flex-1 overflow-y-auto p-8">
//               {activeTab === 'profile' && (
//                   <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                    
//                     {/* PHOTO */}
//                     <div className="flex justify-center">
//                         <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors group">
//                             <input type="file" name="image_file" onChange={(e) => e.target.files?.[0] && setPreview(URL.createObjectURL(e.target.files[0]))} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
//                             {preview ? <img src={preview} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>}
//                         </div>
//                     </div>

//                     {/* IDENTITY MATRIX */}
//                     <div className="space-y-4">
//                         <div className="grid grid-cols-[1fr_auto] gap-4">
//                             <div className="space-y-2">
//                                 <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Name</label>
//                                 <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
//                             </div>
//                             <div className="space-y-2 w-24">
//                                 <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2"><Star className="w-3 h-3"/> Rank</label>
//                                 <input name="sorting_weight" type="number" defaultValue={initialData?.sorting_weight || 99} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-center focus:border-gold-500 outline-none" title="1 = Top, 99 = Bottom" />
//                             </div>
//                         </div>

//                         {/* SPECIAL SKILLS */}
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2"><Tag className="w-3 h-3"/> Legacy Credits (Comma Sep)</label>
//                             <input name="legacy_titles" defaultValue={defaultLegacy} placeholder="Web Dev, Founder" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
//                         </div>

//                         {/* QUICK ROLE (Only for New/Quick) */}
//                         <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
//                             <label className="text-[10px] font-mono text-white/60 uppercase tracking-widest flex gap-2"><Briefcase className="w-3 h-3"/> Current Role (Optional)</label>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <input name="role" defaultValue={defaultTenure.role_student} placeholder="Role" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
//                                 <input name="year" defaultValue={defaultTenure.year || "2025-2026"} placeholder="Year" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
//                                 <select name="rank" defaultValue={defaultTenure.rank || 'CLOUD'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none text-xs">
//                                     <option value="ZENITH">ZENITH (Faculty)</option>
//                                     <option value="CROWN">CROWN (High Command)</option>
//                                     <option value="ORBIT">ORBIT (Head)</option>
//                                     <option value="CLOUD">CLOUD (Member)</option>
//                                 </select>
//                                 <input name="department" defaultValue={defaultTenure.department} placeholder="Dept" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
//                             </div>
//                         </div>

//                         {/* BIO CONTROL */}
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><AlignLeft className="w-3 h-3"/> Logline (Intro)</label>
//                                 <input name="short_bio" defaultValue={initialData?.short_bio} maxLength={120} placeholder="A short tagline (max 120 chars)..." className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
//                             </div>
//                             <div className="space-y-2">
//                                 <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Manifesto (Bio)</label>
//                                 <textarea name="bio" defaultValue={initialData?.bio} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" placeholder="The full story..." />
//                             </div>
//                         </div>

//                         {/* SOCIALS & AURA */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <input name="instagram" defaultValue={initialData?.social_links?.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-xs outline-none" />
//                             <input name="linkedin" defaultValue={initialData?.social_links?.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-xs outline-none" />
//                         </div>
//                         <div className="grid grid-cols-9 gap-2">
//                             {NAVARASA_COLORS.map((c) => (
//                                 <button type="button" key={c.hex} onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent'}`} style={{ backgroundColor: c.hex }} />
//                             ))}
//                         </div>
//                     </div>
//                   </form>
//               )}

//               {activeTab === 'timeline' && initialData && <TenureManager memberId={initialData.id} />}
//             </div>

//             {activeTab === 'profile' && (
//                 <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
//                     <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 text-xs uppercase hover:bg-white/5">Cancel</button>
//                     <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 flex items-center justify-center gap-2">
//                         {isSubmitting ? "Processing..." : "Save"} <Save className="w-4 h-4" />
//                     </button>
//                 </div>
//             )}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Palette, Save, User, Mic, Instagram, Linkedin, Briefcase, Tag, Eye, EyeOff, AlignLeft, Star, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { upsertMember } from "@/app/admin/members/actions";
import TenureManager from "./TenureManager";
import { toast } from "sonner";

// ... Colors ...
const NAVARASA_COLORS = [
  { name: 'Sringara (Pink)', hex: '#d946ef' },
  { name: 'Hasya (Yellow)', hex: '#eab308' },
  { name: 'Raudra (Red)', hex: '#ef4444' },
  { name: 'Veera (Orange)', hex: '#f97316' },
  { name: 'Bhayanaka (Black)', hex: '#000000' },
  { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
  { name: 'Adbhuta (Purple)', hex: '#a855f7' },
  { name: 'Shanta (White)', hex: '#ffffff' },
  { name: 'Karuna (Grey)', hex: '#9ca3af' },
];

export default function MemberSheet({ isOpen, onClose, initialData }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');
  const [activeTab, setActiveTab] = useState<'profile' | 'timeline'>('profile');
  const [isHidden, setIsHidden] = useState(initialData?.is_hidden || false);

  // --- VISUAL STATES ---
  const [imageMode, setImageMode] = useState<'upload' | 'link'>('upload');

  const defaultTenure = initialData?.tenures?.[0] || {};
  const defaultLegacy = initialData?.legacy_titles ? initialData.legacy_titles.join(', ') : '';

  useEffect(() => {
    if (isOpen) {
        setPreview(initialData?.image_url || null);
        setSelectedColor(initialData?.color || '#eab308');
        setIsHidden(initialData?.is_hidden || false);
        setActiveTab('profile');

        // Detect Mode
        if (initialData?.image_url && !initialData.image_url.includes('supabase.co')) {
            setImageMode('link');
        } else {
            setImageMode('upload');
        }
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (initialData?.id) formData.append("id", initialData.id);
    formData.set("color", selectedColor);
    formData.set("is_hidden", String(isHidden));

    const result = await upsertMember(formData);
    setIsSubmitting(false);
    
    if (result.success) {
        toast.success(initialData ? "Entity Updated" : "Entity Created");
        if (!initialData) onClose(); 
    } else {
        toast.error(result.error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <div>
                <h2 className="font-serif text-2xl text-white">{initialData ? "Control Panel" : "New Entity"}</h2>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
                    {initialData?.name || "Unregistered"} • {isHidden ? "HIDDEN" : "VISIBLE"}
                </p>
              </div>
              <div className="flex gap-4">
                  <button type="button" onClick={() => setIsHidden(!isHidden)} className={`p-2 rounded-full border transition-colors ${isHidden ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-white/10 text-white/50 hover:text-white'}`}>
                      {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
              </div>
            </div>

            {initialData && (
                <div className="flex border-b border-white/5">
                    <button onClick={() => setActiveTab('profile')} className={`flex-1 py-3 text-[10px] uppercase font-bold transition-colors ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Identity</button>
                    <button onClick={() => setActiveTab('timeline')} className={`flex-1 py-3 text-[10px] uppercase font-bold transition-colors ${activeTab === 'timeline' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Timeline</button>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-8">
              {activeTab === 'profile' && (
                  <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* PHOTO VISUALIZER */}
                    <div className="space-y-4">
                        <div className="flex justify-center items-center gap-4">
                            <button type="button" onClick={() => setImageMode('upload')} className={`text-[9px] uppercase px-3 py-1 rounded-full border ${imageMode === 'upload' ? 'bg-white text-black border-white' : 'border-white/10 text-white/40'}`}>Upload</button>
                            <button type="button" onClick={() => setImageMode('link')} className={`text-[9px] uppercase px-3 py-1 rounded-full border ${imageMode === 'link' ? 'bg-white text-black border-white' : 'border-white/10 text-white/40'}`}>Link</button>
                        </div>

                        <div className="flex justify-center">
                            {imageMode === 'upload' ? (
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors group">
                                    <input type="file" name="image_file" onChange={(e) => e.target.files?.[0] && setPreview(URL.createObjectURL(e.target.files[0]))} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
                                    {preview ? <img src={preview} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>}
                                </div>
                            ) : (
                                <div className="w-full max-w-xs space-y-2">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-32 h-32 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center">
                                            {initialData?.image_url ? (
                                                <img src={initialData.image_url} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-8 h-8 text-white/20" />
                                            )}
                                        </div>
                                    </div>
                                    <input name="image_link" defaultValue={initialData?.image_url || ''} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-center text-white focus:border-gold-500 outline-none text-xs font-mono" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* IDENTITY MATRIX */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-[1fr_auto] gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Name</label>
                                <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
                            </div>
                            <div className="space-y-2 w-24">
                                <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2"><Star className="w-3 h-3"/> Rank</label>
                                <input name="sorting_weight" type="number" defaultValue={initialData?.sorting_weight || 99} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-center focus:border-gold-500 outline-none" title="1 = Top, 99 = Bottom" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2"><Tag className="w-3 h-3"/> Legacy Credits (Comma Sep)</label>
                            <input name="legacy_titles" defaultValue={defaultLegacy} placeholder="Web Dev, Founder" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
                        </div>

                        {/* QUICK ROLE (Only for New/Quick) */}
                        {!initialData && (
                            <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
                                <label className="text-[10px] font-mono text-white/60 uppercase tracking-widest flex gap-2"><Briefcase className="w-3 h-3"/> Current Role (Optional)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="role" defaultValue={defaultTenure.role_student} placeholder="Role" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
                                    <input name="year" defaultValue={defaultTenure.year || "2025-2026"} placeholder="Year" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
                                    <select name="rank" defaultValue={defaultTenure.rank || 'CLOUD'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none text-xs">
                                        <option value="ZENITH">ZENITH (Faculty)</option>
                                        <option value="CROWN">CROWN (High Command)</option>
                                        <option value="ORBIT">ORBIT (Head)</option>
                                        <option value="CLOUD">CLOUD (Member)</option>
                                    </select>
                                    <input name="department" defaultValue={defaultTenure.department} placeholder="Dept" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
                                </div>
                            </div>
                        )}

                        {/* BIO CONTROL */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><AlignLeft className="w-3 h-3"/> Logline (Intro)</label>
                                <input name="short_bio" defaultValue={initialData?.short_bio} maxLength={120} placeholder="A short tagline (max 120 chars)..." className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Manifesto (Bio)</label>
                                <textarea name="bio" defaultValue={initialData?.bio} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" placeholder="The full story..." />
                            </div>
                        </div>

                        {/* SOCIALS & AURA */}
                        <div className="grid grid-cols-2 gap-4">
                            <input name="instagram" defaultValue={initialData?.social_links?.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-xs outline-none" />
                            <input name="linkedin" defaultValue={initialData?.social_links?.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-xs outline-none" />
                        </div>
                        
                        <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
                            <Mic className="w-4 h-4 text-gold-500" />
                            <span className="text-xs text-white/50 font-mono">
                                {initialData?.voice_note_url ? "Voice Note Active" : "Upload Voice Note (MP3)"}
                            </span>
                            <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>

                        <div className="grid grid-cols-9 gap-2">
                            {NAVARASA_COLORS.map((c) => (
                                <button type="button" key={c.hex} onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent'}`} style={{ backgroundColor: c.hex }} />
                            ))}
                        </div>
                    </div>
                  </form>
              )}

              {activeTab === 'timeline' && initialData && <TenureManager memberId={initialData.id} />}
            </div>

            {activeTab === 'profile' && (
                <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
                    <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 text-xs uppercase hover:bg-white/5">Cancel</button>
                    <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 flex items-center justify-center gap-2">
                        {isSubmitting ? "Processing..." : "Save"} <Save className="w-4 h-4" />
                    </button>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}