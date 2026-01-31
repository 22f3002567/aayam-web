// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { X, Camera, Palette, Save, Briefcase, User, Mic } from "lucide-react";
// // // import { upsertMember } from "@/app/admin/members/actions";
// // // import { toast } from "sonner";

// // // interface MemberSheetProps {
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   initialData?: any | null; 
// // // }

// // // const NAVARASA_COLORS = [
// // //   { name: 'Sringara (Pink)', hex: '#d946ef' },
// // //   { name: 'Hasya (Yellow)', hex: '#eab308' },
// // //   { name: 'Raudra (Red)', hex: '#ef4444' },
// // //   { name: 'Veera (Orange)', hex: '#f97316' },
// // //   { name: 'Bhayanaka (Black)', hex: '#000000' },
// // //   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
// // //   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
// // //   { name: 'Shanta (White)', hex: '#ffffff' },
// // //   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// // // ];

// // // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [preview, setPreview] = useState<string | null>(null);
// // //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');

// // //   useEffect(() => {
// // //     if (isOpen) {
// // //         setPreview(initialData?.image_url || null);
// // //         setSelectedColor(initialData?.color || '#eab308');
// // //     }
// // //   }, [isOpen, initialData]);

// // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // //     e.preventDefault();
// // //     setIsSubmitting(true);
// // //     const formData = new FormData(e.currentTarget);
// // //     if (initialData?.id) formData.append("id", initialData.id);
// // //     formData.set("color", selectedColor);

// // //     const result = await upsertMember(formData);
// // //     setIsSubmitting(false);
    
// // //     if (result.success) {
// // //         toast.success(initialData ? "Profile Updated" : "Member Recruited");
// // //         onClose();
// // //     } else {
// // //         toast.error(result.error);
// // //     }
// // //   };

// // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (file) setPreview(URL.createObjectURL(file));
// // //   };

// // //   return (
// // //     <AnimatePresence>
// // //       {isOpen && (
// // //         <>
// // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// // //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// // //             {/* HEADER */}
// // //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// // //               <div>
// // //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Profile" : "Recruit Member"}</h2>
// // //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// // //               </div>
// // //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // //             </div>

// // //             {/* FORM */}
// // //             <div className="flex-1 overflow-y-auto p-8">
// // //               <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                
// // //                 {/* 1. HEADSHOT */}
// // //                 <div className="flex justify-center">
// // //                     <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// // //                         <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// // //                         {preview ? (
// // //                             <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// // //                         ) : (
// // //                             <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// // //                         )}
// // //                     </div>
// // //                 </div>

// // //                 {/* 2. IDENTITY */}
// // //                 <div className="space-y-4">
// // //                     <div className="space-y-2">
// // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// // //                         <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // //                     </div>
                    
// // //                     {/* HIERARCHY CONTROLS */}
// // //                     <div className="grid grid-cols-1 gap-4">
// // //                         <div className="space-y-2">
// // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-3 h-3"/> Role (Hierarchy)</label>
// // //                             <select name="role" defaultValue={initialData?.tenures?.[0]?.role_student || 'Coordinator'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// // //                                 <option value="Secretary">Secretary (The Crown)</option>
// // //                                 <option value="Deputy Secretary">Deputy Secretary</option>
// // //                                 <option disabled className="bg-white/10 text-white/30">---</option>
// // //                                 <option value="Creative Head">Creative Head</option>
// // //                                 <option value="Creative Deputy Head">Creative Deputy</option>
// // //                                 <option value="Strategy Head">Strategy Head</option>
// // //                                 <option value="Strategy Deputy Head">Strategy Deputy</option>
// // //                                 <option value="PR Head">PR Head</option>
// // //                                 <option value="PR Deputy Head">PR Deputy</option>
// // //                                 <option value="Outreach Head">Outreach Head</option>
// // //                                 <option value="Outreach Deputy Head">Outreach Deputy</option>
// // //                                 <option value="Media Head">Media Head</option>
// // //                                 <option value="Media Deputy Head">Media Deputy</option>
// // //                                 <option value="Tech Head">Tech Head</option>
// // //                                 <option value="Tech Deputy Head">Tech Deputy</option>
// // //                                 <option value="Logistics Head">Logistics Head</option>
// // //                                 <option value="Logistics Deputy Head">Logistics Deputy</option>
// // //                                 <option disabled className="bg-white/10 text-white/30">---</option>
// // //                                 <option value="Coordinator">Coordinator</option>
// // //                                 <option value="Faculty">Faculty (Zenith)</option>
// // //                             </select>
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Department</label>
// // //                             <select name="department" defaultValue={initialData?.tenures?.[0]?.department || 'Creative'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// // //                                 <option value="High Command">High Command (Sec/Dy Sec)</option>
// // //                                 <option value="Creative">Creative & Strategy</option>
// // //                                 <option value="PR">PR & Outreach</option>
// // //                                 <option value="Media">Media & Content</option>
// // //                                 <option value="Tech">Tech & Design</option>
// // //                                 <option value="Logistics">Logistics & Ops</option>
// // //                                 <option value="Faculty">Faculty</option>
// // //                             </select>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 {/* 3. AURA & DETAILS */}
// // //                 <div className="space-y-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
// // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
// // //                         <Palette className="w-3 h-3"/> Navarasa Aura
// // //                     </label>
// // //                     <div className="grid grid-cols-9 gap-2">
// // //                         {NAVARASA_COLORS.map((c) => (
// // //                             <button 
// // //                                 key={c.hex} 
// // //                                 type="button"
// // //                                 onClick={() => setSelectedColor(c.hex)}
// // //                                 className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`}
// // //                                 style={{ backgroundColor: c.hex }}
// // //                                 title={c.name}
// // //                             />
// // //                         ))}
// // //                     </div>
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio (One Line)</label>
// // //                     <textarea name="bio" defaultValue={initialData?.bio} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
// // //                 </div>

// // //                 <div className="grid grid-cols-2 gap-4">
// // //                     <div className="space-y-2">
// // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Year</label>
// // //                         <input name="year" defaultValue={initialData?.tenures?.[0]?.year || "2025-2026"} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none font-mono text-sm" />
// // //                     </div>
// // //                     <div className="space-y-2 flex items-center gap-3 pt-6">
// // //                         <input type="checkbox" name="is_alumni" value="true" defaultChecked={initialData?.is_alumni} className="accent-gold-500 w-4 h-4" />
// // //                         <span className="text-xs font-mono text-white/60">Alumni Status</span>
// // //                     </div>
// // //                 </div>

// // //               </form>
// // //             </div>

// // //             {/* FOOTER */}
// // //             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// // //               <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// // //               <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// // //                 {isSubmitting ? "Processing..." : "Confirm Roster"}
// // //                 {!isSubmitting && <Save className="w-4 h-4" />}
// // //               </button>
// // //             </div>

// // //           </motion.div>
// // //         </>
// // //       )}
// // //     </AnimatePresence>
// // //   );
// // // }




// // "use client";

// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { X, Camera, Palette, Save, Briefcase, User, Mic, Link as LinkIcon, Instagram, Linkedin } from "lucide-react";
// // import { upsertMember } from "@/app/admin/members/actions";
// // import { toast } from "sonner";

// // // ... (Keep MemberSheetProps and Colors array same as before) ...
// // const NAVARASA_COLORS = [
// //   { name: 'Sringara (Pink)', hex: '#d946ef' },
// //   { name: 'Hasya (Yellow)', hex: '#eab308' },
// //   { name: 'Raudra (Red)', hex: '#ef4444' },
// //   { name: 'Veera (Orange)', hex: '#f97316' },
// //   { name: 'Bhayanaka (Black)', hex: '#000000' },
// //   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
// //   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
// //   { name: 'Shanta (White)', hex: '#ffffff' },
// //   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// // ];

// // interface MemberSheetProps {
// //     isOpen: boolean;
// //     onClose: () => void;
// //     initialData?: any | null; 
// // }

// // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [preview, setPreview] = useState<string | null>(null);
// //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');

// //   // Extract socials from JSONB
// //   const socials = initialData?.social_links || {};

// //   useEffect(() => {
// //     if (isOpen) {
// //         setPreview(initialData?.image_url || null);
// //         setSelectedColor(initialData?.color || '#eab308');
// //     }
// //   }, [isOpen, initialData]);

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     const formData = new FormData(e.currentTarget);
// //     if (initialData?.id) formData.append("id", initialData.id);
// //     formData.set("color", selectedColor);

// //     const result = await upsertMember(formData);
// //     setIsSubmitting(false);
    
// //     if (result.success) {
// //         toast.success(initialData ? "Profile Updated" : "Member Recruited");
// //         onClose();
// //     } else {
// //         toast.error(result.error);
// //     }
// //   };

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) setPreview(URL.createObjectURL(file));
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <>
// //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// //             {/* HEADER */}
// //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// //               <div>
// //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Profile" : "Recruit Member"}</h2>
// //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// //               </div>
// //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// //             </div>

// //             {/* FORM */}
// //             <div className="flex-1 overflow-y-auto p-8">
// //               <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                
// //                 {/* 1. HEADSHOT */}
// //                 <div className="flex justify-center">
// //                     <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// //                         <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// //                         {preview ? (
// //                             <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// //                         ) : (
// //                             <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// //                         )}
// //                         <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] text-center text-white py-1 uppercase tracking-widest">Upload</div>
// //                     </div>
// //                 </div>

// //                 {/* 2. IDENTITY */}
// //                 <div className="space-y-4">
// //                     <div className="space-y-2">
// //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// //                         <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// //                     </div>
                    
// //                     {/* HIERARCHY */}
// //                     <div className="grid grid-cols-1 gap-4">
// //                         <div className="space-y-2">
// //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-3 h-3"/> Role (Hierarchy)</label>
// //                             <select name="role" defaultValue={initialData?.tenures?.[0]?.role_student || 'Coordinator'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// //                                 <option value="Secretary">Secretary (The Crown)</option>
// //                                 <option value="Deputy Secretary">Deputy Secretary</option>
// //                                 <option disabled className="bg-white/10 text-white/30">---</option>
// //                                 <option value="Creative Head">Creative Head</option>
// //                                 <option value="Creative Deputy Head">Creative Deputy</option>
// //                                 <option value="Strategy Head">Strategy Head</option>
// //                                 <option value="Strategy Deputy Head">Strategy Deputy</option>
// //                                 <option value="PR Head">PR Head</option>
// //                                 <option value="PR Deputy Head">PR Deputy</option>
// //                                 <option value="Outreach Head">Outreach Head</option>
// //                                 <option value="Outreach Deputy Head">Outreach Deputy</option>
// //                                 <option value="Media Head">Media Head</option>
// //                                 <option value="Media Deputy Head">Media Deputy</option>
// //                                 <option value="Tech Head">Tech Head</option>
// //                                 <option value="Tech Deputy Head">Tech Deputy</option>
// //                                 <option value="Logistics Head">Logistics Head</option>
// //                                 <option value="Logistics Deputy Head">Logistics Deputy</option>
// //                                 <option disabled className="bg-white/10 text-white/30">---</option>
// //                                 <option value="Coordinator">Coordinator</option>
// //                                 <option value="Faculty">Faculty (Zenith)</option>
// //                             </select>
// //                         </div>
// //                         <div className="space-y-2">
// //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Department</label>
// //                             <select name="department" defaultValue={initialData?.tenures?.[0]?.department || 'Creative'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// //                                 <option value="High Command">High Command</option>
// //                                 <option value="Creative">Creative & Strategy</option>
// //                                 <option value="PR">PR & Outreach</option>
// //                                 <option value="Media">Media & Content</option>
// //                                 <option value="Tech">Tech & Design</option>
// //                                 <option value="Logistics">Logistics & Ops</option>
// //                                 <option value="Faculty">Faculty</option>
// //                             </select>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* 3. AURA */}
// //                 <div className="space-y-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
// //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Palette className="w-3 h-3"/> Navarasa Aura</label>
// //                     <div className="grid grid-cols-9 gap-2">
// //                         {NAVARASA_COLORS.map((c) => (
// //                             <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
// //                         ))}
// //                     </div>
// //                 </div>

// //                 {/* 4. DIGITAL FOOTPRINT */}
// //                 <div className="space-y-4">
// //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><LinkIcon className="w-3 h-3"/> Digital Footprint</label>
// //                     <div className="grid grid-cols-2 gap-4">
// //                         <div className="relative">
// //                             <Instagram className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// //                             <input name="instagram" defaultValue={socials.instagram} placeholder="Instagram handle" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// //                         </div>
// //                         <div className="relative">
// //                             <Linkedin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// //                             <input name="linkedin" defaultValue={socials.linkedin} placeholder="LinkedIn URL" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// //                         </div>
// //                     </div>
// //                     {/* VOICE NOTE INPUT */}
// //                     <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
// //                         <Mic className="w-4 h-4 text-gold-500" />
// //                         <span className="text-xs text-white/50 font-mono">
// //                             {initialData?.voice_note_url ? "Voice Note Active (Upload to replace)" : "Upload Voice Note (MP3)"}
// //                         </span>
// //                         <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
// //                     </div>
// //                 </div>

// //                 {/* 5. TENURE DETAILS */}
// //                 <div className="space-y-2">
// //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio</label>
// //                     <textarea name="bio" defaultValue={initialData?.bio} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-4">
// //                     <div className="space-y-2">
// //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Year</label>
// //                         <input name="year" defaultValue={initialData?.tenures?.[0]?.year || "2025-2026"} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none font-mono text-sm" />
// //                     </div>
// //                     <div className="space-y-2 flex items-center gap-3 pt-6">
// //                         <input type="checkbox" name="is_alumni" value="true" defaultChecked={initialData?.is_alumni} className="accent-gold-500 w-4 h-4" />
// //                         <span className="text-xs font-mono text-white/60">Alumni Status</span>
// //                     </div>
// //                 </div>

// //               </form>
// //             </div>

// //             {/* FOOTER */}
// //             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// //               <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// //               <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// //                 {isSubmitting ? "Processing..." : "Confirm Roster"}
// //                 {!isSubmitting && <Save className="w-4 h-4" />}
// //               </button>
// //             </div>

// //           </motion.div>
// //         </>
// //       )}
// //     </AnimatePresence>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Camera, Palette, Save, Briefcase, User, Mic, Link as LinkIcon, Instagram, Linkedin, ListOrdered, Shield } from "lucide-react";
// import { upsertMember } from "@/app/admin/members/actions";
// import { toast } from "sonner";

// interface MemberSheetProps {
//   isOpen: boolean;
//   onClose: () => void;
//   initialData?: any | null; 
// }

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

// export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');

//   // Extract socials & tenure
//   const socials = initialData?.social_links || {};
//   const tenure = initialData?.tenures?.[0] || {};

//   useEffect(() => {
//     if (isOpen) {
//         setPreview(initialData?.image_url || null);
//         setSelectedColor(initialData?.color || '#eab308');
//     }
//   }, [isOpen, initialData]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     const formData = new FormData(e.currentTarget);
//     if (initialData?.id) formData.append("id", initialData.id);
//     formData.set("color", selectedColor);

//     const result = await upsertMember(formData);
//     setIsSubmitting(false);
    
//     if (result.success) {
//         toast.success(initialData ? "Profile Updated" : "Member Recruited");
//         onClose();
//     } else {
//         toast.error(result.error);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setPreview(URL.createObjectURL(file));
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
//           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
//             <div className="flex justify-between items-center p-8 border-b border-white/5">
//               <div>
//                 <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Profile" : "Recruit Member"}</h2>
//                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
//               </div>
//               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-8">
//               <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                
//                 {/* 1. HEADSHOT */}
//                 <div className="flex justify-center">
//                     <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
//                         <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
//                         {preview ? <img src={preview} className="w-full h-full object-cover" alt="Preview" /> : <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>}
//                         <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] text-center text-white py-1 uppercase tracking-widest">Upload</div>
//                     </div>
//                 </div>

//                 {/* 2. IDENTITY */}
//                 <div className="space-y-4">
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
//                         <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-3 h-3"/> Role Title</label>
//                             <input name="role" defaultValue={tenure.role_student} placeholder="e.g. PR Head" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" required />
//                         </div>
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Department</label>
//                             {/* FLEXIBLE INPUT + SUGGESTIONS */}
//                             <input name="department" list="dept-suggestions" defaultValue={tenure.department} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" placeholder="e.g. Public Relations" />
//                             <datalist id="dept-suggestions">
//                                 <option value="High Command" />
//                                 <option value="Creative" />
//                                 <option value="Public Relations" />
//                                 <option value="Logistics" />
//                                 <option value="Media" />
//                                 <option value="Tech" />
//                             </datalist>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 3. HIERARCHY CONTROL (God Mode) */}
//                 <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
//                     <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
//                         <Shield className="w-3 h-3"/> Hierarchy Protocol
//                     </label>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Visual Rank (Size)</label>
//                             <select name="rank" defaultValue={tenure.rank || 'CLOUD'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
//                                 <option value="ZENITH">ZENITH (Faculty)</option>
//                                 <option value="CROWN">CROWN (Secretary)</option>
//                                 <option value="ORBIT">ORBIT (Heads)</option>
//                                 <option value="CLOUD">CLOUD (Members)</option>
//                             </select>
//                         </div>
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
//                                 <ListOrdered className="w-3 h-3"/> Priority Order
//                             </label>
//                             <input name="sort_order" type="number" defaultValue={tenure.sort_order || 100} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" placeholder="1 = Top" />
//                             <p className="text-[9px] text-white/30">Lower # appears first (e.g. 10 above 11)</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* 4. AURA & DIGITAL */}
//                 <div className="space-y-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
//                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Palette className="w-3 h-3"/> Navarasa Aura</label>
//                     <div className="grid grid-cols-9 gap-2">
//                         {NAVARASA_COLORS.map((c) => (
//                             <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
//                         ))}
//                     </div>
//                 </div>

//                 <div className="space-y-4">
//                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><LinkIcon className="w-3 h-3"/> Digital Footprint</label>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="relative">
//                             <Instagram className="absolute left-3 top-3 w-4 h-4 text-white/30" />
//                             <input name="instagram" defaultValue={socials.instagram} placeholder="Instagram handle" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
//                         </div>
//                         <div className="relative">
//                             <Linkedin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
//                             <input name="linkedin" defaultValue={socials.linkedin} placeholder="LinkedIn URL" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
//                         </div>
//                     </div>
//                     {/* VOICE NOTE */}
//                     <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
//                         <Mic className="w-4 h-4 text-gold-500" />
//                         <span className="text-xs text-white/50 font-mono">
//                             {initialData?.voice_note_url ? "Voice Note Active (Upload to replace)" : "Upload Voice Note (MP3)"}
//                         </span>
//                         <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
//                     </div>
//                 </div>

//                 <div className="space-y-2">
//                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio</label>
//                     <textarea name="bio" defaultValue={initialData?.bio} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Year</label>
//                         <input name="year" defaultValue={tenure.year || "2025-2026"} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none font-mono text-sm" />
//                     </div>
//                     <div className="space-y-2 flex items-center gap-3 pt-6">
//                         <input type="checkbox" name="is_alumni" value="true" defaultChecked={initialData?.is_alumni} className="accent-gold-500 w-4 h-4" />
//                         <span className="text-xs font-mono text-white/60">Alumni Status</span>
//                     </div>
//                 </div>

//               </form>
//             </div>

//             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
//               <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
//               <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
//                 {isSubmitting ? "Processing..." : "Confirm Roster"}
//                 {!isSubmitting && <Save className="w-4 h-4" />}
//               </button>
//             </div>

//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Palette, Save, Briefcase, User, Mic, Link as LinkIcon, Instagram, Linkedin, ListOrdered, Shield } from "lucide-react";
import { upsertMember } from "@/app/admin/members/actions";
import { toast } from "sonner";

interface MemberSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null; 
}

// THE NAVARASA PALETTE (Standardized)
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

export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');

  // Intelligent Defaults
  // If editing, pull from 'tenures[0]'. If new, defaults.
  const tenure = initialData?.tenures?.[0] || {};
  const socials = initialData?.social_links || {};

  useEffect(() => {
    if (isOpen) {
        setPreview(initialData?.image_url || null);
        setSelectedColor(initialData?.color || '#eab308');
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (initialData?.id) formData.append("id", initialData.id);
    formData.set("color", selectedColor);

    const result = await upsertMember(formData);
    setIsSubmitting(false);
    
    if (result.success) {
        toast.success("Roster Updated Successfully");
        onClose();
    } else {
        toast.error("Operation Failed: " + result.error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <div>
                <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Profile" : "Recruit Member"}</h2>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
              </div>
              <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. VISUAL IDENTITY */}
                <div className="flex justify-center">
                    <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
                        <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
                        {preview ? (
                            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] text-center text-white py-1 uppercase tracking-widest">Upload</div>
                    </div>
                </div>

                {/* 2. CORE IDENTITY */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
                        <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-3 h-3"/> Role Title</label>
                            <input name="role" defaultValue={tenure.role_student} placeholder="e.g. PR Head" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Department</label>
                            <input name="department" list="departments" defaultValue={tenure.department} placeholder="e.g. Creative" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
                            <datalist id="departments">
                                <option value="High Command"/>
                                <option value="Creative"/>
                                <option value="Public Relations"/>
                                <option value="Logistics"/>
                                <option value="Media"/>
                                <option value="Tech"/>
                                <option value="Faculty"/>
                            </datalist>
                        </div>
                    </div>
                </div>

                {/* 3. GOD MODE CONTROLS (Hierarchy) */}
                <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
                    <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-3 h-3"/> Hierarchy Protocol
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Visual Rank</label>
                            <select name="rank" defaultValue={tenure.rank || 'CLOUD'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
                                <option value="ZENITH">ZENITH (Faculty)</option>
                                <option value="CROWN">CROWN (Secretary)</option>
                                <option value="ORBIT">ORBIT (Heads)</option>
                                <option value="CLOUD">CLOUD (Members)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                                <ListOrdered className="w-3 h-3"/> Priority Index
                            </label>
                            <input name="sort_order" type="number" defaultValue={tenure.sort_order || 100} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" placeholder="1 = Top" />
                        </div>
                    </div>
                </div>

                {/* 4. DIGITAL & AURA */}
                <div className="space-y-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Palette className="w-3 h-3"/> Navarasa Aura</label>
                    <div className="grid grid-cols-9 gap-2">
                        {NAVARASA_COLORS.map((c) => (
                            <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <Instagram className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                        <input name="instagram" defaultValue={socials.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
                    </div>
                    <div className="relative">
                        <Linkedin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
                        <input name="linkedin" defaultValue={socials.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
                    </div>
                </div>

                {/* VOICE NOTE */}
                <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
                    <Mic className="w-4 h-4 text-gold-500" />
                    <span className="text-xs text-white/50 font-mono">
                        {initialData?.voice_note_url ? "Voice Note Active (Upload to replace)" : "Upload Voice Note (MP3)"}
                    </span>
                    <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>

                {/* 5. TIMELINE CONTROL */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio</label>
                    <textarea name="bio" defaultValue={initialData?.bio} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Year Assignment</label>
                        <input name="year" defaultValue={tenure.year || "2025-2026"} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none font-mono text-sm" />
                    </div>
                    <div className="space-y-2 flex items-center gap-3 pt-6">
                        <input type="checkbox" name="is_alumni" value="true" defaultChecked={initialData?.is_alumni} className="accent-gold-500 w-4 h-4" />
                        <span className="text-xs font-mono text-white/60">Alumni Status</span>
                    </div>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
              <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
              <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
                {isSubmitting ? "Updating..." : "Execute"}
                {!isSubmitting && <Save className="w-4 h-4" />}
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}