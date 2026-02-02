// // // // // // // // // // "use client";

// // // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // // // import { X, Camera, Palette, Save, Briefcase, User, Mic } from "lucide-react";
// // // // // // // // // // import { upsertMember } from "@/app/admin/members/actions";
// // // // // // // // // // import { toast } from "sonner";

// // // // // // // // // // interface MemberSheetProps {
// // // // // // // // // //   isOpen: boolean;
// // // // // // // // // //   onClose: () => void;
// // // // // // // // // //   initialData?: any | null; 
// // // // // // // // // // }

// // // // // // // // // // const NAVARASA_COLORS = [
// // // // // // // // // //   { name: 'Sringara (Pink)', hex: '#d946ef' },
// // // // // // // // // //   { name: 'Hasya (Yellow)', hex: '#eab308' },
// // // // // // // // // //   { name: 'Raudra (Red)', hex: '#ef4444' },
// // // // // // // // // //   { name: 'Veera (Orange)', hex: '#f97316' },
// // // // // // // // // //   { name: 'Bhayanaka (Black)', hex: '#000000' },
// // // // // // // // // //   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
// // // // // // // // // //   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
// // // // // // // // // //   { name: 'Shanta (White)', hex: '#ffffff' },
// // // // // // // // // //   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// // // // // // // // // // ];

// // // // // // // // // // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// // // // // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // // // // // //   const [preview, setPreview] = useState<string | null>(null);
// // // // // // // // // //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (isOpen) {
// // // // // // // // // //         setPreview(initialData?.image_url || null);
// // // // // // // // // //         setSelectedColor(initialData?.color || '#eab308');
// // // // // // // // // //     }
// // // // // // // // // //   }, [isOpen, initialData]);

// // // // // // // // // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     setIsSubmitting(true);
// // // // // // // // // //     const formData = new FormData(e.currentTarget);
// // // // // // // // // //     if (initialData?.id) formData.append("id", initialData.id);
// // // // // // // // // //     formData.set("color", selectedColor);

// // // // // // // // // //     const result = await upsertMember(formData);
// // // // // // // // // //     setIsSubmitting(false);
    
// // // // // // // // // //     if (result.success) {
// // // // // // // // // //         toast.success(initialData ? "Profile Updated" : "Member Recruited");
// // // // // // // // // //         onClose();
// // // // // // // // // //     } else {
// // // // // // // // // //         toast.error(result.error);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     const file = e.target.files?.[0];
// // // // // // // // // //     if (file) setPreview(URL.createObjectURL(file));
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <AnimatePresence>
// // // // // // // // // //       {isOpen && (
// // // // // // // // // //         <>
// // // // // // // // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// // // // // // // // // //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// // // // // // // // // //             {/* HEADER */}
// // // // // // // // // //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// // // // // // // // // //               <div>
// // // // // // // // // //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Profile" : "Recruit Member"}</h2>
// // // // // // // // // //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// // // // // // // // // //               </div>
// // // // // // // // // //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* FORM */}
// // // // // // // // // //             <div className="flex-1 overflow-y-auto p-8">
// // // // // // // // // //               <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                
// // // // // // // // // //                 {/* 1. HEADSHOT */}
// // // // // // // // // //                 <div className="flex justify-center">
// // // // // // // // // //                     <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// // // // // // // // // //                         <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// // // // // // // // // //                         {preview ? (
// // // // // // // // // //                             <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// // // // // // // // // //                         ) : (
// // // // // // // // // //                             <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// // // // // // // // // //                         )}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* 2. IDENTITY */}
// // // // // // // // // //                 <div className="space-y-4">
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// // // // // // // // // //                         <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // // // // // // // // //                     </div>
                    
// // // // // // // // // //                     {/* HIERARCHY CONTROLS */}
// // // // // // // // // //                     <div className="grid grid-cols-1 gap-4">
// // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-3 h-3"/> Role (Hierarchy)</label>
// // // // // // // // // //                             <select name="role" defaultValue={initialData?.tenures?.[0]?.role_student || 'Coordinator'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// // // // // // // // // //                                 <option value="Secretary">Secretary (The Crown)</option>
// // // // // // // // // //                                 <option value="Deputy Secretary">Deputy Secretary</option>
// // // // // // // // // //                                 <option disabled className="bg-white/10 text-white/30">---</option>
// // // // // // // // // //                                 <option value="Creative Head">Creative Head</option>
// // // // // // // // // //                                 <option value="Creative Deputy Head">Creative Deputy</option>
// // // // // // // // // //                                 <option value="Strategy Head">Strategy Head</option>
// // // // // // // // // //                                 <option value="Strategy Deputy Head">Strategy Deputy</option>
// // // // // // // // // //                                 <option value="PR Head">PR Head</option>
// // // // // // // // // //                                 <option value="PR Deputy Head">PR Deputy</option>
// // // // // // // // // //                                 <option value="Outreach Head">Outreach Head</option>
// // // // // // // // // //                                 <option value="Outreach Deputy Head">Outreach Deputy</option>
// // // // // // // // // //                                 <option value="Media Head">Media Head</option>
// // // // // // // // // //                                 <option value="Media Deputy Head">Media Deputy</option>
// // // // // // // // // //                                 <option value="Tech Head">Tech Head</option>
// // // // // // // // // //                                 <option value="Tech Deputy Head">Tech Deputy</option>
// // // // // // // // // //                                 <option value="Logistics Head">Logistics Head</option>
// // // // // // // // // //                                 <option value="Logistics Deputy Head">Logistics Deputy</option>
// // // // // // // // // //                                 <option disabled className="bg-white/10 text-white/30">---</option>
// // // // // // // // // //                                 <option value="Coordinator">Coordinator</option>
// // // // // // // // // //                                 <option value="Faculty">Faculty (Zenith)</option>
// // // // // // // // // //                             </select>
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <div className="space-y-2">
// // // // // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Department</label>
// // // // // // // // // //                             <select name="department" defaultValue={initialData?.tenures?.[0]?.department || 'Creative'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// // // // // // // // // //                                 <option value="High Command">High Command (Sec/Dy Sec)</option>
// // // // // // // // // //                                 <option value="Creative">Creative & Strategy</option>
// // // // // // // // // //                                 <option value="PR">PR & Outreach</option>
// // // // // // // // // //                                 <option value="Media">Media & Content</option>
// // // // // // // // // //                                 <option value="Tech">Tech & Design</option>
// // // // // // // // // //                                 <option value="Logistics">Logistics & Ops</option>
// // // // // // // // // //                                 <option value="Faculty">Faculty</option>
// // // // // // // // // //                             </select>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {/* 3. AURA & DETAILS */}
// // // // // // // // // //                 <div className="space-y-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
// // // // // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
// // // // // // // // // //                         <Palette className="w-3 h-3"/> Navarasa Aura
// // // // // // // // // //                     </label>
// // // // // // // // // //                     <div className="grid grid-cols-9 gap-2">
// // // // // // // // // //                         {NAVARASA_COLORS.map((c) => (
// // // // // // // // // //                             <button 
// // // // // // // // // //                                 key={c.hex} 
// // // // // // // // // //                                 type="button"
// // // // // // // // // //                                 onClick={() => setSelectedColor(c.hex)}
// // // // // // // // // //                                 className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`}
// // // // // // // // // //                                 style={{ backgroundColor: c.hex }}
// // // // // // // // // //                                 title={c.name}
// // // // // // // // // //                             />
// // // // // // // // // //                         ))}
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="space-y-2">
// // // // // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio (One Line)</label>
// // // // // // // // // //                     <textarea name="bio" defaultValue={initialData?.bio} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Year</label>
// // // // // // // // // //                         <input name="year" defaultValue={initialData?.tenures?.[0]?.year || "2025-2026"} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none font-mono text-sm" />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="space-y-2 flex items-center gap-3 pt-6">
// // // // // // // // // //                         <input type="checkbox" name="is_alumni" value="true" defaultChecked={initialData?.is_alumni} className="accent-gold-500 w-4 h-4" />
// // // // // // // // // //                         <span className="text-xs font-mono text-white/60">Alumni Status</span>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //               </form>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* FOOTER */}
// // // // // // // // // //             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// // // // // // // // // //               <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// // // // // // // // // //               <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// // // // // // // // // //                 {isSubmitting ? "Processing..." : "Confirm Roster"}
// // // // // // // // // //                 {!isSubmitting && <Save className="w-4 h-4" />}
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>

// // // // // // // // // //           </motion.div>
// // // // // // // // // //         </>
// // // // // // // // // //       )}
// // // // // // // // // //     </AnimatePresence>
// // // // // // // // // //   );
// // // // // // // // // // }




// // // // // // // // // "use client";

// // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // // import { X, Camera, Palette, Save, Briefcase, User, Mic, Link as LinkIcon, Instagram, Linkedin } from "lucide-react";
// // // // // // // // // import { upsertMember } from "@/app/admin/members/actions";
// // // // // // // // // import { toast } from "sonner";

// // // // // // // // // // ... (Keep MemberSheetProps and Colors array same as before) ...
// // // // // // // // // const NAVARASA_COLORS = [
// // // // // // // // //   { name: 'Sringara (Pink)', hex: '#d946ef' },
// // // // // // // // //   { name: 'Hasya (Yellow)', hex: '#eab308' },
// // // // // // // // //   { name: 'Raudra (Red)', hex: '#ef4444' },
// // // // // // // // //   { name: 'Veera (Orange)', hex: '#f97316' },
// // // // // // // // //   { name: 'Bhayanaka (Black)', hex: '#000000' },
// // // // // // // // //   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
// // // // // // // // //   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
// // // // // // // // //   { name: 'Shanta (White)', hex: '#ffffff' },
// // // // // // // // //   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// // // // // // // // // ];

// // // // // // // // // interface MemberSheetProps {
// // // // // // // // //     isOpen: boolean;
// // // // // // // // //     onClose: () => void;
// // // // // // // // //     initialData?: any | null; 
// // // // // // // // // }

// // // // // // // // // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// // // // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // // // // //   const [preview, setPreview] = useState<string | null>(null);
// // // // // // // // //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');

// // // // // // // // //   // Extract socials from JSONB
// // // // // // // // //   const socials = initialData?.social_links || {};

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (isOpen) {
// // // // // // // // //         setPreview(initialData?.image_url || null);
// // // // // // // // //         setSelectedColor(initialData?.color || '#eab308');
// // // // // // // // //     }
// // // // // // // // //   }, [isOpen, initialData]);

// // // // // // // // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     setIsSubmitting(true);
// // // // // // // // //     const formData = new FormData(e.currentTarget);
// // // // // // // // //     if (initialData?.id) formData.append("id", initialData.id);
// // // // // // // // //     formData.set("color", selectedColor);

// // // // // // // // //     const result = await upsertMember(formData);
// // // // // // // // //     setIsSubmitting(false);
    
// // // // // // // // //     if (result.success) {
// // // // // // // // //         toast.success(initialData ? "Profile Updated" : "Member Recruited");
// // // // // // // // //         onClose();
// // // // // // // // //     } else {
// // // // // // // // //         toast.error(result.error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     const file = e.target.files?.[0];
// // // // // // // // //     if (file) setPreview(URL.createObjectURL(file));
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <AnimatePresence>
// // // // // // // // //       {isOpen && (
// // // // // // // // //         <>
// // // // // // // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// // // // // // // // //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// // // // // // // // //             {/* HEADER */}
// // // // // // // // //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// // // // // // // // //               <div>
// // // // // // // // //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Profile" : "Recruit Member"}</h2>
// // // // // // // // //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// // // // // // // // //               </div>
// // // // // // // // //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // // // // // // // //             </div>

// // // // // // // // //             {/* FORM */}
// // // // // // // // //             <div className="flex-1 overflow-y-auto p-8">
// // // // // // // // //               <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                
// // // // // // // // //                 {/* 1. HEADSHOT */}
// // // // // // // // //                 <div className="flex justify-center">
// // // // // // // // //                     <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// // // // // // // // //                         <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// // // // // // // // //                         {preview ? (
// // // // // // // // //                             <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// // // // // // // // //                         ) : (
// // // // // // // // //                             <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// // // // // // // // //                         )}
// // // // // // // // //                         <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] text-center text-white py-1 uppercase tracking-widest">Upload</div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* 2. IDENTITY */}
// // // // // // // // //                 <div className="space-y-4">
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// // // // // // // // //                         <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // // // // // // // //                     </div>
                    
// // // // // // // // //                     {/* HIERARCHY */}
// // // // // // // // //                     <div className="grid grid-cols-1 gap-4">
// // // // // // // // //                         <div className="space-y-2">
// // // // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-3 h-3"/> Role (Hierarchy)</label>
// // // // // // // // //                             <select name="role" defaultValue={initialData?.tenures?.[0]?.role_student || 'Coordinator'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// // // // // // // // //                                 <option value="Secretary">Secretary (The Crown)</option>
// // // // // // // // //                                 <option value="Deputy Secretary">Deputy Secretary</option>
// // // // // // // // //                                 <option disabled className="bg-white/10 text-white/30">---</option>
// // // // // // // // //                                 <option value="Creative Head">Creative Head</option>
// // // // // // // // //                                 <option value="Creative Deputy Head">Creative Deputy</option>
// // // // // // // // //                                 <option value="Strategy Head">Strategy Head</option>
// // // // // // // // //                                 <option value="Strategy Deputy Head">Strategy Deputy</option>
// // // // // // // // //                                 <option value="PR Head">PR Head</option>
// // // // // // // // //                                 <option value="PR Deputy Head">PR Deputy</option>
// // // // // // // // //                                 <option value="Outreach Head">Outreach Head</option>
// // // // // // // // //                                 <option value="Outreach Deputy Head">Outreach Deputy</option>
// // // // // // // // //                                 <option value="Media Head">Media Head</option>
// // // // // // // // //                                 <option value="Media Deputy Head">Media Deputy</option>
// // // // // // // // //                                 <option value="Tech Head">Tech Head</option>
// // // // // // // // //                                 <option value="Tech Deputy Head">Tech Deputy</option>
// // // // // // // // //                                 <option value="Logistics Head">Logistics Head</option>
// // // // // // // // //                                 <option value="Logistics Deputy Head">Logistics Deputy</option>
// // // // // // // // //                                 <option disabled className="bg-white/10 text-white/30">---</option>
// // // // // // // // //                                 <option value="Coordinator">Coordinator</option>
// // // // // // // // //                                 <option value="Faculty">Faculty (Zenith)</option>
// // // // // // // // //                             </select>
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="space-y-2">
// // // // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Department</label>
// // // // // // // // //                             <select name="department" defaultValue={initialData?.tenures?.[0]?.department || 'Creative'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// // // // // // // // //                                 <option value="High Command">High Command</option>
// // // // // // // // //                                 <option value="Creative">Creative & Strategy</option>
// // // // // // // // //                                 <option value="PR">PR & Outreach</option>
// // // // // // // // //                                 <option value="Media">Media & Content</option>
// // // // // // // // //                                 <option value="Tech">Tech & Design</option>
// // // // // // // // //                                 <option value="Logistics">Logistics & Ops</option>
// // // // // // // // //                                 <option value="Faculty">Faculty</option>
// // // // // // // // //                             </select>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* 3. AURA */}
// // // // // // // // //                 <div className="space-y-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
// // // // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Palette className="w-3 h-3"/> Navarasa Aura</label>
// // // // // // // // //                     <div className="grid grid-cols-9 gap-2">
// // // // // // // // //                         {NAVARASA_COLORS.map((c) => (
// // // // // // // // //                             <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
// // // // // // // // //                         ))}
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* 4. DIGITAL FOOTPRINT */}
// // // // // // // // //                 <div className="space-y-4">
// // // // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><LinkIcon className="w-3 h-3"/> Digital Footprint</label>
// // // // // // // // //                     <div className="grid grid-cols-2 gap-4">
// // // // // // // // //                         <div className="relative">
// // // // // // // // //                             <Instagram className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // // // // // // //                             <input name="instagram" defaultValue={socials.instagram} placeholder="Instagram handle" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="relative">
// // // // // // // // //                             <Linkedin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // // // // // // //                             <input name="linkedin" defaultValue={socials.linkedin} placeholder="LinkedIn URL" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     {/* VOICE NOTE INPUT */}
// // // // // // // // //                     <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
// // // // // // // // //                         <Mic className="w-4 h-4 text-gold-500" />
// // // // // // // // //                         <span className="text-xs text-white/50 font-mono">
// // // // // // // // //                             {initialData?.voice_note_url ? "Voice Note Active (Upload to replace)" : "Upload Voice Note (MP3)"}
// // // // // // // // //                         </span>
// // // // // // // // //                         <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* 5. TENURE DETAILS */}
// // // // // // // // //                 <div className="space-y-2">
// // // // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio</label>
// // // // // // // // //                     <textarea name="bio" defaultValue={initialData?.bio} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
// // // // // // // // //                 </div>

// // // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Year</label>
// // // // // // // // //                         <input name="year" defaultValue={initialData?.tenures?.[0]?.year || "2025-2026"} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none font-mono text-sm" />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="space-y-2 flex items-center gap-3 pt-6">
// // // // // // // // //                         <input type="checkbox" name="is_alumni" value="true" defaultChecked={initialData?.is_alumni} className="accent-gold-500 w-4 h-4" />
// // // // // // // // //                         <span className="text-xs font-mono text-white/60">Alumni Status</span>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>

// // // // // // // // //               </form>
// // // // // // // // //             </div>

// // // // // // // // //             {/* FOOTER */}
// // // // // // // // //             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// // // // // // // // //               <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// // // // // // // // //               <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// // // // // // // // //                 {isSubmitting ? "Processing..." : "Confirm Roster"}
// // // // // // // // //                 {!isSubmitting && <Save className="w-4 h-4" />}
// // // // // // // // //               </button>
// // // // // // // // //             </div>

// // // // // // // // //           </motion.div>
// // // // // // // // //         </>
// // // // // // // // //       )}
// // // // // // // // //     </AnimatePresence>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // "use client";

// // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // // import { X, Camera, Palette, Save, Briefcase, User, Mic, Link as LinkIcon, Instagram, Linkedin, ListOrdered, Shield } from "lucide-react";
// // // // // // // // import { upsertMember } from "@/app/admin/members/actions";
// // // // // // // // import { toast } from "sonner";

// // // // // // // // interface MemberSheetProps {
// // // // // // // //   isOpen: boolean;
// // // // // // // //   onClose: () => void;
// // // // // // // //   initialData?: any | null; 
// // // // // // // // }

// // // // // // // // const NAVARASA_COLORS = [
// // // // // // // //   { name: 'Sringara (Pink)', hex: '#d946ef' },
// // // // // // // //   { name: 'Hasya (Yellow)', hex: '#eab308' },
// // // // // // // //   { name: 'Raudra (Red)', hex: '#ef4444' },
// // // // // // // //   { name: 'Veera (Orange)', hex: '#f97316' },
// // // // // // // //   { name: 'Bhayanaka (Black)', hex: '#000000' },
// // // // // // // //   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
// // // // // // // //   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
// // // // // // // //   { name: 'Shanta (White)', hex: '#ffffff' },
// // // // // // // //   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// // // // // // // // ];

// // // // // // // // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// // // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // // // //   const [preview, setPreview] = useState<string | null>(null);
// // // // // // // //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');

// // // // // // // //   // Extract socials & tenure
// // // // // // // //   const socials = initialData?.social_links || {};
// // // // // // // //   const tenure = initialData?.tenures?.[0] || {};

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (isOpen) {
// // // // // // // //         setPreview(initialData?.image_url || null);
// // // // // // // //         setSelectedColor(initialData?.color || '#eab308');
// // // // // // // //     }
// // // // // // // //   }, [isOpen, initialData]);

// // // // // // // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     setIsSubmitting(true);
// // // // // // // //     const formData = new FormData(e.currentTarget);
// // // // // // // //     if (initialData?.id) formData.append("id", initialData.id);
// // // // // // // //     formData.set("color", selectedColor);

// // // // // // // //     const result = await upsertMember(formData);
// // // // // // // //     setIsSubmitting(false);
    
// // // // // // // //     if (result.success) {
// // // // // // // //         toast.success(initialData ? "Profile Updated" : "Member Recruited");
// // // // // // // //         onClose();
// // // // // // // //     } else {
// // // // // // // //         toast.error(result.error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     const file = e.target.files?.[0];
// // // // // // // //     if (file) setPreview(URL.createObjectURL(file));
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <AnimatePresence>
// // // // // // // //       {isOpen && (
// // // // // // // //         <>
// // // // // // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// // // // // // // //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// // // // // // // //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// // // // // // // //               <div>
// // // // // // // //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Profile" : "Recruit Member"}</h2>
// // // // // // // //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// // // // // // // //               </div>
// // // // // // // //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // // // // // // //             </div>

// // // // // // // //             <div className="flex-1 overflow-y-auto p-8">
// // // // // // // //               <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                
// // // // // // // //                 {/* 1. HEADSHOT */}
// // // // // // // //                 <div className="flex justify-center">
// // // // // // // //                     <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// // // // // // // //                         <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// // // // // // // //                         {preview ? <img src={preview} className="w-full h-full object-cover" alt="Preview" /> : <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>}
// // // // // // // //                         <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] text-center text-white py-1 uppercase tracking-widest">Upload</div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 {/* 2. IDENTITY */}
// // // // // // // //                 <div className="space-y-4">
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// // // // // // // //                         <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // // // // // // //                     </div>
                    
// // // // // // // //                     <div className="grid grid-cols-2 gap-4">
// // // // // // // //                         <div className="space-y-2">
// // // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-3 h-3"/> Role Title</label>
// // // // // // // //                             <input name="role" defaultValue={tenure.role_student} placeholder="e.g. PR Head" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" required />
// // // // // // // //                         </div>
// // // // // // // //                         <div className="space-y-2">
// // // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Department</label>
// // // // // // // //                             {/* FLEXIBLE INPUT + SUGGESTIONS */}
// // // // // // // //                             <input name="department" list="dept-suggestions" defaultValue={tenure.department} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" placeholder="e.g. Public Relations" />
// // // // // // // //                             <datalist id="dept-suggestions">
// // // // // // // //                                 <option value="High Command" />
// // // // // // // //                                 <option value="Creative" />
// // // // // // // //                                 <option value="Public Relations" />
// // // // // // // //                                 <option value="Logistics" />
// // // // // // // //                                 <option value="Media" />
// // // // // // // //                                 <option value="Tech" />
// // // // // // // //                             </datalist>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 {/* 3. HIERARCHY CONTROL (God Mode) */}
// // // // // // // //                 <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
// // // // // // // //                     <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
// // // // // // // //                         <Shield className="w-3 h-3"/> Hierarchy Protocol
// // // // // // // //                     </label>
// // // // // // // //                     <div className="grid grid-cols-2 gap-4">
// // // // // // // //                         <div className="space-y-2">
// // // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Visual Rank (Size)</label>
// // // // // // // //                             <select name="rank" defaultValue={tenure.rank || 'CLOUD'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// // // // // // // //                                 <option value="ZENITH">ZENITH (Faculty)</option>
// // // // // // // //                                 <option value="CROWN">CROWN (Secretary)</option>
// // // // // // // //                                 <option value="ORBIT">ORBIT (Heads)</option>
// // // // // // // //                                 <option value="CLOUD">CLOUD (Members)</option>
// // // // // // // //                             </select>
// // // // // // // //                         </div>
// // // // // // // //                         <div className="space-y-2">
// // // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
// // // // // // // //                                 <ListOrdered className="w-3 h-3"/> Priority Order
// // // // // // // //                             </label>
// // // // // // // //                             <input name="sort_order" type="number" defaultValue={tenure.sort_order || 100} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" placeholder="1 = Top" />
// // // // // // // //                             <p className="text-[9px] text-white/30">Lower # appears first (e.g. 10 above 11)</p>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 {/* 4. AURA & DIGITAL */}
// // // // // // // //                 <div className="space-y-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
// // // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Palette className="w-3 h-3"/> Navarasa Aura</label>
// // // // // // // //                     <div className="grid grid-cols-9 gap-2">
// // // // // // // //                         {NAVARASA_COLORS.map((c) => (
// // // // // // // //                             <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
// // // // // // // //                         ))}
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 <div className="space-y-4">
// // // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><LinkIcon className="w-3 h-3"/> Digital Footprint</label>
// // // // // // // //                     <div className="grid grid-cols-2 gap-4">
// // // // // // // //                         <div className="relative">
// // // // // // // //                             <Instagram className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // // // // // //                             <input name="instagram" defaultValue={socials.instagram} placeholder="Instagram handle" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // // // // // //                         </div>
// // // // // // // //                         <div className="relative">
// // // // // // // //                             <Linkedin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // // // // // //                             <input name="linkedin" defaultValue={socials.linkedin} placeholder="LinkedIn URL" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     {/* VOICE NOTE */}
// // // // // // // //                     <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
// // // // // // // //                         <Mic className="w-4 h-4 text-gold-500" />
// // // // // // // //                         <span className="text-xs text-white/50 font-mono">
// // // // // // // //                             {initialData?.voice_note_url ? "Voice Note Active (Upload to replace)" : "Upload Voice Note (MP3)"}
// // // // // // // //                         </span>
// // // // // // // //                         <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //                 <div className="space-y-2">
// // // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio</label>
// // // // // // // //                     <textarea name="bio" defaultValue={initialData?.bio} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
// // // // // // // //                 </div>

// // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Year</label>
// // // // // // // //                         <input name="year" defaultValue={tenure.year || "2025-2026"} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none font-mono text-sm" />
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-2 flex items-center gap-3 pt-6">
// // // // // // // //                         <input type="checkbox" name="is_alumni" value="true" defaultChecked={initialData?.is_alumni} className="accent-gold-500 w-4 h-4" />
// // // // // // // //                         <span className="text-xs font-mono text-white/60">Alumni Status</span>
// // // // // // // //                     </div>
// // // // // // // //                 </div>

// // // // // // // //               </form>
// // // // // // // //             </div>

// // // // // // // //             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// // // // // // // //               <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// // // // // // // //               <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// // // // // // // //                 {isSubmitting ? "Processing..." : "Confirm Roster"}
// // // // // // // //                 {!isSubmitting && <Save className="w-4 h-4" />}
// // // // // // // //               </button>
// // // // // // // //             </div>

// // // // // // // //           </motion.div>
// // // // // // // //         </>
// // // // // // // //       )}
// // // // // // // //     </AnimatePresence>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // "use client";

// // // // // // // import { useState, useEffect } from "react";
// // // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // // import { X, Camera, Palette, Save, Briefcase, User, Mic, Link as LinkIcon, Instagram, Linkedin, ListOrdered, Shield } from "lucide-react";
// // // // // // // import { upsertMember } from "@/app/admin/members/actions";
// // // // // // // import { toast } from "sonner";

// // // // // // // interface MemberSheetProps {
// // // // // // //   isOpen: boolean;
// // // // // // //   onClose: () => void;
// // // // // // //   initialData?: any | null; 
// // // // // // // }

// // // // // // // // THE NAVARASA PALETTE (Standardized)
// // // // // // // const NAVARASA_COLORS = [
// // // // // // //   { name: 'Sringara (Pink)', hex: '#d946ef' },
// // // // // // //   { name: 'Hasya (Yellow)', hex: '#eab308' },
// // // // // // //   { name: 'Raudra (Red)', hex: '#ef4444' },
// // // // // // //   { name: 'Veera (Orange)', hex: '#f97316' },
// // // // // // //   { name: 'Bhayanaka (Black)', hex: '#000000' },
// // // // // // //   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
// // // // // // //   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
// // // // // // //   { name: 'Shanta (White)', hex: '#ffffff' },
// // // // // // //   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// // // // // // // ];

// // // // // // // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // // //   const [preview, setPreview] = useState<string | null>(null);
// // // // // // //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');

// // // // // // //   // Intelligent Defaults
// // // // // // //   // If editing, pull from 'tenures[0]'. If new, defaults.
// // // // // // //   const tenure = initialData?.tenures?.[0] || {};
// // // // // // //   const socials = initialData?.social_links || {};

// // // // // // //   useEffect(() => {
// // // // // // //     if (isOpen) {
// // // // // // //         setPreview(initialData?.image_url || null);
// // // // // // //         setSelectedColor(initialData?.color || '#eab308');
// // // // // // //     }
// // // // // // //   }, [isOpen, initialData]);

// // // // // // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // // // // // //     e.preventDefault();
// // // // // // //     setIsSubmitting(true);
// // // // // // //     const formData = new FormData(e.currentTarget);
// // // // // // //     if (initialData?.id) formData.append("id", initialData.id);
// // // // // // //     formData.set("color", selectedColor);

// // // // // // //     const result = await upsertMember(formData);
// // // // // // //     setIsSubmitting(false);
    
// // // // // // //     if (result.success) {
// // // // // // //         toast.success("Roster Updated Successfully");
// // // // // // //         onClose();
// // // // // // //     } else {
// // // // // // //         toast.error("Operation Failed: " + result.error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const file = e.target.files?.[0];
// // // // // // //     if (file) setPreview(URL.createObjectURL(file));
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <AnimatePresence>
// // // // // // //       {isOpen && (
// // // // // // //         <>
// // // // // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// // // // // // //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// // // // // // //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// // // // // // //               <div>
// // // // // // //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Profile" : "Recruit Member"}</h2>
// // // // // // //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// // // // // // //               </div>
// // // // // // //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // // // // // //             </div>

// // // // // // //             <div className="flex-1 overflow-y-auto p-8">
// // // // // // //               <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                
// // // // // // //                 {/* 1. VISUAL IDENTITY */}
// // // // // // //                 <div className="flex justify-center">
// // // // // // //                     <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// // // // // // //                         <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// // // // // // //                         {preview ? (
// // // // // // //                             <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// // // // // // //                         ) : (
// // // // // // //                             <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// // // // // // //                         )}
// // // // // // //                         <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] text-center text-white py-1 uppercase tracking-widest">Upload</div>
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 {/* 2. CORE IDENTITY */}
// // // // // // //                 <div className="space-y-4">
// // // // // // //                     <div className="space-y-2">
// // // // // // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// // // // // // //                         <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // // // // // //                     </div>
                    
// // // // // // //                     <div className="grid grid-cols-2 gap-4">
// // // // // // //                         <div className="space-y-2">
// // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-3 h-3"/> Role Title</label>
// // // // // // //                             <input name="role" defaultValue={tenure.role_student} placeholder="e.g. PR Head" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" required />
// // // // // // //                         </div>
// // // // // // //                         <div className="space-y-2">
// // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Department</label>
// // // // // // //                             <input name="department" list="departments" defaultValue={tenure.department} placeholder="e.g. Creative" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // // // // // //                             <datalist id="departments">
// // // // // // //                                 <option value="High Command"/>
// // // // // // //                                 <option value="Creative"/>
// // // // // // //                                 <option value="Public Relations"/>
// // // // // // //                                 <option value="Logistics"/>
// // // // // // //                                 <option value="Media"/>
// // // // // // //                                 <option value="Tech"/>
// // // // // // //                                 <option value="Faculty"/>
// // // // // // //                             </datalist>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 {/* 3. GOD MODE CONTROLS (Hierarchy) */}
// // // // // // //                 <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
// // // // // // //                     <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
// // // // // // //                         <Shield className="w-3 h-3"/> Hierarchy Protocol
// // // // // // //                     </label>
// // // // // // //                     <div className="grid grid-cols-2 gap-4">
// // // // // // //                         <div className="space-y-2">
// // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Visual Rank</label>
// // // // // // //                             <select name="rank" defaultValue={tenure.rank || 'CLOUD'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// // // // // // //                                 <option value="ZENITH">ZENITH (Faculty)</option>
// // // // // // //                                 <option value="CROWN">CROWN (Secretary)</option>
// // // // // // //                                 <option value="ORBIT">ORBIT (Heads)</option>
// // // // // // //                                 <option value="CLOUD">CLOUD (Members)</option>
// // // // // // //                             </select>
// // // // // // //                         </div>
// // // // // // //                         <div className="space-y-2">
// // // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
// // // // // // //                                 <ListOrdered className="w-3 h-3"/> Priority Index
// // // // // // //                             </label>
// // // // // // //                             <input name="sort_order" type="number" defaultValue={tenure.sort_order || 100} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" placeholder="1 = Top" />
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 {/* 4. DIGITAL & AURA */}
// // // // // // //                 <div className="space-y-3 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
// // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Palette className="w-3 h-3"/> Navarasa Aura</label>
// // // // // // //                     <div className="grid grid-cols-9 gap-2">
// // // // // // //                         {NAVARASA_COLORS.map((c) => (
// // // // // // //                             <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
// // // // // // //                         ))}
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // //                     <div className="relative">
// // // // // // //                         <Instagram className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // // // // //                         <input name="instagram" defaultValue={socials.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // // // // //                     </div>
// // // // // // //                     <div className="relative">
// // // // // // //                         <Linkedin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // // // // //                         <input name="linkedin" defaultValue={socials.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //                 {/* VOICE NOTE */}
// // // // // // //                 <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
// // // // // // //                     <Mic className="w-4 h-4 text-gold-500" />
// // // // // // //                     <span className="text-xs text-white/50 font-mono">
// // // // // // //                         {initialData?.voice_note_url ? "Voice Note Active (Upload to replace)" : "Upload Voice Note (MP3)"}
// // // // // // //                     </span>
// // // // // // //                     <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
// // // // // // //                 </div>

// // // // // // //                 {/* 5. TIMELINE CONTROL */}
// // // // // // //                 <div className="space-y-2">
// // // // // // //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio</label>
// // // // // // //                     <textarea name="bio" defaultValue={initialData?.bio} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
// // // // // // //                 </div>

// // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // //                     <div className="space-y-2">
// // // // // // //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Year Assignment</label>
// // // // // // //                         <input name="year" defaultValue={tenure.year || "2025-2026"} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none font-mono text-sm" />
// // // // // // //                     </div>
// // // // // // //                     <div className="space-y-2 flex items-center gap-3 pt-6">
// // // // // // //                         <input type="checkbox" name="is_alumni" value="true" defaultChecked={initialData?.is_alumni} className="accent-gold-500 w-4 h-4" />
// // // // // // //                         <span className="text-xs font-mono text-white/60">Alumni Status</span>
// // // // // // //                     </div>
// // // // // // //                 </div>

// // // // // // //               </form>
// // // // // // //             </div>

// // // // // // //             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// // // // // // //               <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// // // // // // //               <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// // // // // // //                 {isSubmitting ? "Updating..." : "Execute"}
// // // // // // //                 {!isSubmitting && <Save className="w-4 h-4" />}
// // // // // // //               </button>
// // // // // // //             </div>

// // // // // // //           </motion.div>
// // // // // // //         </>
// // // // // // //       )}
// // // // // // //     </AnimatePresence>
// // // // // // //   );
// // // // // // // }

// // // // // // "use client";

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // // import { X, Camera, Palette, Save, User, Mic, Instagram, Linkedin } from "lucide-react";
// // // // // // import { upsertMember } from "@/app/admin/members/actions";
// // // // // // import TenureManager from "./TenureManager"; // <--- IMPORT THE TIME MACHINE
// // // // // // import { toast } from "sonner";

// // // // // // const NAVARASA_COLORS = [
// // // // // //   { name: 'Sringara (Pink)', hex: '#d946ef' },
// // // // // //   { name: 'Hasya (Yellow)', hex: '#eab308' },
// // // // // //   { name: 'Raudra (Red)', hex: '#ef4444' },
// // // // // //   { name: 'Veera (Orange)', hex: '#f97316' },
// // // // // //   { name: 'Bhayanaka (Black)', hex: '#000000' },
// // // // // //   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
// // // // // //   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
// // // // // //   { name: 'Shanta (White)', hex: '#ffffff' },
// // // // // //   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// // // // // // ];

// // // // // // interface MemberSheetProps {
// // // // // //     isOpen: boolean;
// // // // // //     onClose: () => void;
// // // // // //     initialData?: any | null; 
// // // // // // }

// // // // // // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// // // // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // //   const [preview, setPreview] = useState<string | null>(null);
// // // // // //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');
  
// // // // // //   // TABS: 'profile' is default. 'timeline' enables only after creation.
// // // // // //   const [activeTab, setActiveTab] = useState<'profile' | 'timeline'>('profile');

// // // // // //   useEffect(() => {
// // // // // //     if (isOpen) {
// // // // // //         setPreview(initialData?.image_url || null);
// // // // // //         setSelectedColor(initialData?.color || '#eab308');
// // // // // //         setActiveTab('profile'); // Reset
// // // // // //     }
// // // // // //   }, [isOpen, initialData]);

// // // // // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // // // // //     e.preventDefault();
// // // // // //     setIsSubmitting(true);
// // // // // //     const formData = new FormData(e.currentTarget);
// // // // // //     if (initialData?.id) formData.append("id", initialData.id);
// // // // // //     formData.set("color", selectedColor);

// // // // // //     const result = await upsertMember(formData);
// // // // // //     setIsSubmitting(false);
    
// // // // // //     if (result.success) {
// // // // // //         toast.success(initialData ? "Profile Updated" : "Member Created. Now Assign Roles.");
// // // // // //         if (!initialData) onClose(); // Close on create, or switch tab logic if you prefer
// // // // // //     } else {
// // // // // //         toast.error(result.error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     const file = e.target.files?.[0];
// // // // // //     if (file) setPreview(URL.createObjectURL(file));
// // // // // //   };

// // // // // //   return (
// // // // // //     <AnimatePresence>
// // // // // //       {isOpen && (
// // // // // //         <>
// // // // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// // // // // //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// // // // // //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// // // // // //               <div>
// // // // // //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Access Profile" : "New Recruit"}</h2>
// // // // // //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// // // // // //               </div>
// // // // // //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // // // // //             </div>

// // // // // //             {/* TAB SWITCHER */}
// // // // // //             {initialData && (
// // // // // //                 <div className="flex border-b border-white/5">
// // // // // //                     <button 
// // // // // //                         onClick={() => setActiveTab('profile')}
// // // // // //                         className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}
// // // // // //                     >
// // // // // //                         Identity
// // // // // //                     </button>
// // // // // //                     <button 
// // // // // //                         onClick={() => setActiveTab('timeline')}
// // // // // //                         className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${activeTab === 'timeline' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}
// // // // // //                     >
// // // // // //                         Timeline & Roles
// // // // // //                     </button>
// // // // // //                 </div>
// // // // // //             )}

// // // // // //             <div className="flex-1 overflow-y-auto p-8">
              
// // // // // //               {/* TAB 1: IDENTITY (The Artist) */}
// // // // // //               {activeTab === 'profile' && (
// // // // // //                   <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                    
// // // // // //                     {/* VISUAL IDENTITY */}
// // // // // //                     <div className="flex justify-center">
// // // // // //                         <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// // // // // //                             <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// // // // // //                             {preview ? (
// // // // // //                                 <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// // // // // //                             ) : (
// // // // // //                                 <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// // // // // //                             )}
// // // // // //                         </div>
// // // // // //                     </div>

// // // // // //                     {/* CORE INFO */}
// // // // // //                     <div className="space-y-4">
// // // // // //                         <div className="space-y-2">
// // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// // // // // //                             <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // // // // //                         </div>
                        
// // // // // //                         {/* SOCIALS */}
// // // // // //                         <div className="grid grid-cols-2 gap-4">
// // // // // //                             <div className="relative">
// // // // // //                                 <Instagram className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // // // //                                 <input name="instagram" defaultValue={initialData?.social_links?.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // // // //                             </div>
// // // // // //                             <div className="relative">
// // // // // //                                 <Linkedin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // // // //                                 <input name="linkedin" defaultValue={initialData?.social_links?.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // // // //                             </div>
// // // // // //                         </div>

// // // // // //                         {/* BIO & AUDIO */}
// // // // // //                         <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
// // // // // //                             <Mic className="w-4 h-4 text-gold-500" />
// // // // // //                             <span className="text-xs text-white/50 font-mono">
// // // // // //                                 {initialData?.voice_note_url ? "Voice Note Active (Upload to replace)" : "Upload Voice Note (MP3)"}
// // // // // //                             </span>
// // // // // //                             <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
// // // // // //                         </div>

// // // // // //                         <div className="space-y-2">
// // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio</label>
// // // // // //                             <textarea name="bio" defaultValue={initialData?.bio} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
// // // // // //                         </div>

// // // // // //                         {/* AURA */}
// // // // // //                         <div className="space-y-2">
// // // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Palette className="w-3 h-3"/> Navarasa Aura</label>
// // // // // //                             <div className="grid grid-cols-9 gap-2">
// // // // // //                                 {NAVARASA_COLORS.map((c) => (
// // // // // //                                     <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
// // // // // //                                 ))}
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                   </form>
// // // // // //               )}

// // // // // //               {/* TAB 2: TIMELINE (The Tenure Manager) */}
// // // // // //               {activeTab === 'timeline' && initialData && (
// // // // // //                   <TenureManager memberId={initialData.id} />
// // // // // //               )}

// // // // // //             </div>

// // // // // //             {/* ACTIONS */}
// // // // // //             {activeTab === 'profile' && (
// // // // // //                 <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// // // // // //                 <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// // // // // //                 <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// // // // // //                     {isSubmitting ? "Processing..." : (initialData ? "Update Identity" : "Create Artist")}
// // // // // //                     {!isSubmitting && <Save className="w-4 h-4" />}
// // // // // //                 </button>
// // // // // //                 </div>
// // // // // //             )}

// // // // // //           </motion.div>
// // // // // //         </>
// // // // // //       )}
// // // // // //     </AnimatePresence>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { useState, useEffect } from "react";
// // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // import { X, Camera, Palette, Save, User, Mic, Instagram, Linkedin, Briefcase, Shield, ListOrdered } from "lucide-react";
// // // // // import { upsertMember } from "@/app/admin/members/actions";
// // // // // import TenureManager from "./TenureManager"; // Ensure this file exists
// // // // // import { toast } from "sonner";

// // // // // const NAVARASA_COLORS = [
// // // // //   { name: 'Sringara (Pink)', hex: '#d946ef' },
// // // // //   { name: 'Hasya (Yellow)', hex: '#eab308' },
// // // // //   { name: 'Raudra (Red)', hex: '#ef4444' },
// // // // //   { name: 'Veera (Orange)', hex: '#f97316' },
// // // // //   { name: 'Bhayanaka (Black)', hex: '#000000' },
// // // // //   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
// // // // //   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
// // // // //   { name: 'Shanta (White)', hex: '#ffffff' },
// // // // //   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// // // // // ];

// // // // // interface MemberSheetProps {
// // // // //     isOpen: boolean;
// // // // //     onClose: () => void;
// // // // //     initialData?: any | null; 
// // // // // }

// // // // // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// // // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // // //   const [preview, setPreview] = useState<string | null>(null);
// // // // //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');
// // // // //   const [activeTab, setActiveTab] = useState<'profile' | 'timeline'>('profile');

// // // // //   // Defaults
// // // // //   const tenure = initialData?.tenures?.[0] || {};

// // // // //   useEffect(() => {
// // // // //     if (isOpen) {
// // // // //         setPreview(initialData?.image_url || null);
// // // // //         setSelectedColor(initialData?.color || '#eab308');
// // // // //         setActiveTab('profile'); 
// // // // //     }
// // // // //   }, [isOpen, initialData]);

// // // // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // // // //     e.preventDefault();
// // // // //     setIsSubmitting(true);
// // // // //     const formData = new FormData(e.currentTarget);
// // // // //     if (initialData?.id) formData.append("id", initialData.id);
// // // // //     formData.set("color", selectedColor);

// // // // //     const result = await upsertMember(formData);
// // // // //     setIsSubmitting(false);
    
// // // // //     if (result.success) {
// // // // //         toast.success(initialData ? "Profile Updated" : "Member Created");
// // // // //         if (!initialData) onClose(); 
// // // // //     } else {
// // // // //         toast.error(result.error);
// // // // //     }
// // // // //   };

// // // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const file = e.target.files?.[0];
// // // // //     if (file) setPreview(URL.createObjectURL(file));
// // // // //   };

// // // // //   return (
// // // // //     <AnimatePresence>
// // // // //       {isOpen && (
// // // // //         <>
// // // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// // // // //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// // // // //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// // // // //               <div>
// // // // //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Access Profile" : "New Recruit"}</h2>
// // // // //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// // // // //               </div>
// // // // //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // // // //             </div>

// // // // //             {/* TAB SWITCHER (Only if editing) */}
// // // // //             {initialData && (
// // // // //                 <div className="flex border-b border-white/5">
// // // // //                     <button 
// // // // //                         onClick={() => setActiveTab('profile')}
// // // // //                         className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}
// // // // //                     >
// // // // //                         Identity
// // // // //                     </button>
// // // // //                     <button 
// // // // //                         onClick={() => setActiveTab('timeline')}
// // // // //                         className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${activeTab === 'timeline' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}
// // // // //                     >
// // // // //                         Timeline & Roles
// // // // //                     </button>
// // // // //                 </div>
// // // // //             )}

// // // // //             <div className="flex-1 overflow-y-auto p-8">
              
// // // // //               {/* TAB 1: IDENTITY */}
// // // // //               {activeTab === 'profile' && (
// // // // //                   <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                    
// // // // //                     <div className="flex justify-center">
// // // // //                         <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// // // // //                             <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// // // // //                             {preview ? (
// // // // //                                 <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// // // // //                             ) : (
// // // // //                                 <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     <div className="space-y-4">
// // // // //                         <div className="space-y-2">
// // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// // // // //                             <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // // // //                         </div>
                        
// // // // //                         {/* THE "MISSING" FIELDS (Restored) */}
// // // // //                         <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
// // // // //                             <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
// // // // //                                 <Briefcase className="w-3 h-3"/> Primary Role (For Ensemble)
// // // // //                             </label>
// // // // //                             <div className="grid grid-cols-2 gap-4">
// // // // //                                 <input name="role" defaultValue={tenure.role_student} placeholder="Role (e.g. Secretary)" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
// // // // //                                 <input name="department" defaultValue={tenure.department} placeholder="Dept (e.g. High Command)" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
                                
// // // // //                                 <select name="rank" defaultValue={tenure.rank || 'CLOUD'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none text-xs">
// // // // //                                     <option value="ZENITH">ZENITH (Faculty)</option>
// // // // //                                     <option value="CROWN">CROWN (High Command)</option>
// // // // //                                     <option value="ORBIT">ORBIT (Head)</option>
// // // // //                                     <option value="CLOUD">CLOUD (Member)</option>
// // // // //                                 </select>
// // // // //                                 <input name="year" defaultValue={tenure.year || "2025-2026"} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white outline-none text-xs" placeholder="Year" />
// // // // //                             </div>
// // // // //                             <div className="text-[9px] text-gold-500/50 italic">* Leave "Role" empty to create an Artist Only (No Ensemble listing).</div>
// // // // //                         </div>

// // // // //                         {/* SOCIALS & BIO */}
// // // // //                         <div className="grid grid-cols-2 gap-4">
// // // // //                             <input name="instagram" defaultValue={initialData?.social_links?.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
// // // // //                             <input name="linkedin" defaultValue={initialData?.social_links?.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
// // // // //                         </div>

// // // // //                         <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
// // // // //                             <Mic className="w-4 h-4 text-gold-500" />
// // // // //                             <span className="text-xs text-white/50 font-mono">
// // // // //                                 {initialData?.voice_note_url ? "Voice Note Active" : "Upload Voice Note (MP3)"}
// // // // //                             </span>
// // // // //                             <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
// // // // //                         </div>

// // // // //                         <div className="space-y-2">
// // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio</label>
// // // // //                             <textarea name="bio" defaultValue={initialData?.bio} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
// // // // //                         </div>

// // // // //                         <div className="space-y-2">
// // // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Navarasa Aura</label>
// // // // //                             <div className="grid grid-cols-9 gap-2">
// // // // //                                 {NAVARASA_COLORS.map((c) => (
// // // // //                                     <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
// // // // //                                 ))}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                   </form>
// // // // //               )}

// // // // //               {/* TAB 2: TIMELINE */}
// // // // //               {activeTab === 'timeline' && initialData && (
// // // // //                   <TenureManager memberId={initialData.id} />
// // // // //               )}

// // // // //             </div>

// // // // //             {activeTab === 'profile' && (
// // // // //                 <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// // // // //                 <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// // // // //                 <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// // // // //                     {isSubmitting ? "Processing..." : (initialData ? "Update Identity" : "Create Artist")}
// // // // //                     {!isSubmitting && <Save className="w-4 h-4" />}
// // // // //                 </button>
// // // // //                 </div>
// // // // //             )}

// // // // //           </motion.div>
// // // // //         </>
// // // // //       )}
// // // // //     </AnimatePresence>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { X, Camera, Palette, Save, User, Mic, Instagram, Linkedin, Briefcase, Shield } from "lucide-react";
// // // // import { upsertMember } from "@/app/admin/members/actions";
// // // // import TenureManager from "./TenureManager"; 
// // // // import { toast } from "sonner";

// // // // const NAVARASA_COLORS = [
// // // //   { name: 'Sringara (Pink)', hex: '#d946ef' },
// // // //   { name: 'Hasya (Yellow)', hex: '#eab308' },
// // // //   { name: 'Raudra (Red)', hex: '#ef4444' },
// // // //   { name: 'Veera (Orange)', hex: '#f97316' },
// // // //   { name: 'Bhayanaka (Black)', hex: '#000000' },
// // // //   { name: 'Bibhatsa (Blue)', hex: '#2563eb' },
// // // //   { name: 'Adbhuta (Purple)', hex: '#a855f7' },
// // // //   { name: 'Shanta (White)', hex: '#ffffff' },
// // // //   { name: 'Karuna (Grey)', hex: '#9ca3af' },
// // // // ];

// // // // interface MemberSheetProps {
// // // //     isOpen: boolean;
// // // //     onClose: () => void;
// // // //     initialData?: any | null; 
// // // // }

// // // // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // //   const [preview, setPreview] = useState<string | null>(null);
// // // //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');
  
// // // //   // TABS: Only show 'timeline' if the member already exists (is editing)
// // // //   const [activeTab, setActiveTab] = useState<'profile' | 'timeline'>('profile');

// // // //   // Pull existing tenure data for the "Quick Add" form in Profile tab
// // // //   const defaultTenure = initialData?.tenures?.[0] || {};

// // // //   useEffect(() => {
// // // //     if (isOpen) {
// // // //         setPreview(initialData?.image_url || null);
// // // //         setSelectedColor(initialData?.color || '#eab308');
// // // //         setActiveTab('profile'); // Always start on profile
// // // //     }
// // // //   }, [isOpen, initialData]);

// // // //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// // // //     e.preventDefault();
// // // //     setIsSubmitting(true);
// // // //     const formData = new FormData(e.currentTarget);
// // // //     if (initialData?.id) formData.append("id", initialData.id);
// // // //     formData.set("color", selectedColor);

// // // //     const result = await upsertMember(formData);
// // // //     setIsSubmitting(false);
    
// // // //     if (result.success) {
// // // //         toast.success(initialData ? "Entity Updated" : "Entity Created");
// // // //         if (!initialData) onClose(); 
// // // //     } else {
// // // //         toast.error(result.error);
// // // //     }
// // // //   };

// // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = e.target.files?.[0];
// // // //     if (file) setPreview(URL.createObjectURL(file));
// // // //   };

// // // //   return (
// // // //     <AnimatePresence>
// // // //       {isOpen && (
// // // //         <>
// // // //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// // // //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// // // //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// // // //               <div>
// // // //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Access Mainframe" : "New Entry"}</h2>
// // // //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// // // //               </div>
// // // //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // // //             </div>

// // // //             {/* TAB HEADER */}
// // // //             {initialData && (
// // // //                 <div className="flex border-b border-white/5">
// // // //                     <button onClick={() => setActiveTab('profile')} className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Identity</button>
// // // //                     <button onClick={() => setActiveTab('timeline')} className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${activeTab === 'timeline' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Timeline (Tenures)</button>
// // // //                 </div>
// // // //             )}

// // // //             <div className="flex-1 overflow-y-auto p-8">
              
// // // //               {/* --- TAB 1: IDENTITY --- */}
// // // //               {activeTab === 'profile' && (
// // // //                   <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                    
// // // //                     {/* AVATAR */}
// // // //                     <div className="flex justify-center">
// // // //                         <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// // // //                             <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// // // //                             {preview ? (
// // // //                                 <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// // // //                             ) : (
// // // //                                 <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* BASIC INFO */}
// // // //                     <div className="space-y-4">
// // // //                         <div className="space-y-2">
// // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// // // //                             <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // // //                         </div>
                        
// // // //                         {/* THE HYBRID INPUT (Optional Role) */}
// // // //                         <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
// // // //                             <div className="flex justify-between items-center">
// // // //                                 <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
// // // //                                     <Briefcase className="w-3 h-3"/> Current Role (Optional)
// // // //                                 </label>
// // // //                                 {!initialData && <span className="text-[9px] text-white/30">Leave empty for Artist only</span>}
// // // //                             </div>
                            
// // // //                             <div className="grid grid-cols-2 gap-4">
// // // //                                 <input name="role" defaultValue={defaultTenure.role_student} placeholder="e.g. Secretary" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
// // // //                                 <input name="year" defaultValue={defaultTenure.year || "2025-2026"} placeholder="Year" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
                                
// // // //                                 <select name="rank" defaultValue={defaultTenure.rank || 'CLOUD'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none text-xs">
// // // //                                     <option value="ZENITH">ZENITH (Faculty)</option>
// // // //                                     <option value="CROWN">CROWN (High Command)</option>
// // // //                                     <option value="ORBIT">ORBIT (Head)</option>
// // // //                                     <option value="CLOUD">CLOUD (Member)</option>
// // // //                                 </select>
// // // //                                 <input name="department" defaultValue={defaultTenure.department} placeholder="Dept" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
// // // //                             </div>
// // // //                         </div>

// // // //                         {/* SOCIALS & BIO */}
// // // //                         <div className="grid grid-cols-2 gap-4">
// // // //                             <div className="relative">
// // // //                                 <Instagram className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // //                                 <input name="instagram" defaultValue={initialData?.social_links?.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // //                             </div>
// // // //                             <div className="relative">
// // // //                                 <Linkedin className="absolute left-3 top-3 w-4 h-4 text-white/30" />
// // // //                                 <input name="linkedin" defaultValue={initialData?.social_links?.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-gold-500 outline-none text-xs" />
// // // //                             </div>
// // // //                         </div>

// // // //                         <div className="space-y-2">
// // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Bio</label>
// // // //                             <textarea name="bio" defaultValue={initialData?.bio} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" />
// // // //                         </div>

// // // //                         <div className="space-y-2">
// // // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Palette className="w-3 h-3"/> Aura</label>
// // // //                             <div className="grid grid-cols-9 gap-2">
// // // //                                 {NAVARASA_COLORS.map((c) => (
// // // //                                     <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
// // // //                                 ))}
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                   </form>
// // // //               )}

// // // //               {/* --- TAB 2: TIMELINE (History) --- */}
// // // //               {activeTab === 'timeline' && initialData && (
// // // //                   <TenureManager memberId={initialData.id} />
// // // //               )}

// // // //             </div>

// // // //             {/* FOOTER ACTIONS */}
// // // //             {activeTab === 'profile' && (
// // // //                 <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// // // //                 <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// // // //                 <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// // // //                     {isSubmitting ? "Processing..." : (initialData ? "Update Identity" : "Create Entity")}
// // // //                     {!isSubmitting && <Save className="w-4 h-4" />}
// // // //                 </button>
// // // //                 </div>
// // // //             )}

// // // //           </motion.div>
// // // //         </>
// // // //       )}
// // // //     </AnimatePresence>
// // // //   );
// // // // }

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { X, Camera, Palette, Save, User, Mic, Instagram, Linkedin, Briefcase, Shield, History, Tag } from "lucide-react";
// // // import { upsertMember } from "@/app/admin/members/actions";
// // // import TenureManager from "./TenureManager";
// // // import { toast } from "sonner";

// // // // ... Colors array ...
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

// // // interface MemberSheetProps {
// // //     isOpen: boolean;
// // //     onClose: () => void;
// // //     initialData?: any | null; 
// // // }

// // // export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [preview, setPreview] = useState<string | null>(null);
// // //   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');
// // //   const [activeTab, setActiveTab] = useState<'profile' | 'timeline'>('profile');

// // //   // Load existing legacy titles (Array -> Comma String)
// // //   const defaultLegacy = initialData?.legacy_titles ? initialData.legacy_titles.join(', ') : '';

// // //   useEffect(() => {
// // //     if (isOpen) {
// // //         setPreview(initialData?.image_url || null);
// // //         setSelectedColor(initialData?.color || '#eab308');
// // //         setActiveTab('profile');
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
// // //         toast.success("Identity Updated");
// // //         if (!initialData) onClose(); 
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
// // //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Access Mainframe" : "New Entity"}</h2>
// // //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// // //               </div>
// // //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // //             </div>

// // //             {/* TAB SYSTEM */}
// // //             {initialData && (
// // //                 <div className="flex border-b border-white/5">
// // //                     <button onClick={() => setActiveTab('profile')} className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Identity & Skills</button>
// // //                     <button onClick={() => setActiveTab('timeline')} className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${activeTab === 'timeline' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Governance (Ensemble)</button>
// // //                 </div>
// // //             )}

// // //             <div className="flex-1 overflow-y-auto p-8">
              
// // //               {/* --- TAB 1: IDENTITY (The Artist) --- */}
// // //               {activeTab === 'profile' && (
// // //                   <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                    
// // //                     {/* AVATAR */}
// // //                     <div className="flex justify-center">
// // //                         <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// // //                             <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// // //                             {preview ? (
// // //                                 <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// // //                             ) : (
// // //                                 <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// // //                             )}
// // //                         </div>
// // //                     </div>

// // //                     <div className="space-y-4">
// // //                         <div className="space-y-2">
// // //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// // //                             <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// // //                         </div>

// // //                         {/* GOD TIER FEATURE: CUSTOM ROLES */}
// // //                         <div className="space-y-2">
// // //                             <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
// // //                                 <Tag className="w-3 h-3"/> Special Skills / Credits
// // //                             </label>
// // //                             <input 
// // //                                 name="legacy_titles" 
// // //                                 defaultValue={defaultLegacy} 
// // //                                 placeholder="e.g. Website Developer, Event Head, Backstage (Comma Separated)" 
// // //                                 className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" 
// // //                             />
// // //                             <p className="text-[9px] text-white/30">* These appear on the Artist Profile but do NOT place them in the Ensemble hierarchy.</p>
// // //                         </div>

// // //                         {/* QUICK TENURE (Only for new members or quick edits) */}
// // //                         {!initialData && (
// // //                             <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
// // //                                 <label className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Quick Ensemble Assignment (Optional)</label>
// // //                                 <div className="grid grid-cols-2 gap-4">
// // //                                     <input name="role" placeholder="Role (e.g. Member)" className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white" />
// // //                                     <input name="year" defaultValue="2025-2026" className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white" />
// // //                                 </div>
// // //                             </div>
// // //                         )}

// // //                         <div className="grid grid-cols-2 gap-4">
// // //                             <input name="instagram" defaultValue={initialData?.social_links?.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
// // //                             <input name="linkedin" defaultValue={initialData?.social_links?.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
// // //                         </div>

// // //                         <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
// // //                             <Mic className="w-4 h-4 text-gold-500" />
// // //                             <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
// // //                             <span className="text-xs text-white/50 font-mono">{initialData?.voice_note_url ? "Voice Note Active" : "Upload Voice Note"}</span>
// // //                         </div>

// // //                         <textarea name="bio" defaultValue={initialData?.bio} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none resize-none text-sm" placeholder="Bio..." />

// // //                         <div className="grid grid-cols-9 gap-2">
// // //                             {NAVARASA_COLORS.map((c) => (
// // //                                 <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
// // //                             ))}
// // //                         </div>
// // //                     </div>
// // //                   </form>
// // //               )}

// // //               {/* --- TAB 2: GOVERNANCE (Timeline) --- */}
// // //               {activeTab === 'timeline' && initialData && (
// // //                   <TenureManager memberId={initialData.id} />
// // //               )}

// // //             </div>

// // //             {/* FOOTER */}
// // //             {activeTab === 'profile' && (
// // //                 <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// // //                 <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// // //                 <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// // //                     {isSubmitting ? "Processing..." : (initialData ? "Save Identity" : "Create Artist")}
// // //                     {!isSubmitting && <Save className="w-4 h-4" />}
// // //                 </button>
// // //                 </div>
// // //             )}

// // //           </motion.div>
// // //         </>
// // //       )}
// // //     </AnimatePresence>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { X, Camera, Palette, Save, User, Mic, Instagram, Linkedin, Briefcase, Shield, History, Tag } from "lucide-react";
// // import { upsertMember } from "@/app/admin/members/actions";
// // import TenureManager from "./TenureManager";
// // import { toast } from "sonner";

// // // ... Colors array ...
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
// //   const [activeTab, setActiveTab] = useState<'profile' | 'timeline'>('profile');

// //   // Load existing legacy titles (Array -> Comma String)
// //   const defaultLegacy = initialData?.legacy_titles ? initialData.legacy_titles.join(', ') : '';

// //   useEffect(() => {
// //     if (isOpen) {
// //         setPreview(initialData?.image_url || null);
// //         setSelectedColor(initialData?.color || '#eab308');
// //         setActiveTab('profile');
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
// //         toast.success("Identity Updated");
// //         if (!initialData) onClose(); 
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
// //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Access Mainframe" : "New Entity"}</h2>
// //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
// //               </div>
// //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// //             </div>

// //             {/* TAB SYSTEM */}
// //             {initialData && (
// //                 <div className="flex border-b border-white/5">
// //                     <button onClick={() => setActiveTab('profile')} className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Identity & Skills</button>
// //                     <button onClick={() => setActiveTab('timeline')} className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${activeTab === 'timeline' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Governance (Ensemble)</button>
// //                 </div>
// //             )}

// //             <div className="flex-1 overflow-y-auto p-8">
              
// //               {/* --- TAB 1: IDENTITY (The Artist) --- */}
// //               {activeTab === 'profile' && (
// //                   <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                    
// //                     {/* AVATAR */}
// //                     <div className="flex justify-center">
// //                         <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
// //                             <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
// //                             {preview ? (
// //                                 <img src={preview} className="w-full h-full object-cover" alt="Preview" />
// //                             ) : (
// //                                 <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
// //                             )}
// //                         </div>
// //                     </div>

// //                     <div className="space-y-4">
// //                         <div className="space-y-2">
// //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
// //                             <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
// //                         </div>

// //                         {/* GOD TIER FEATURE: CUSTOM ROLES */}
// //                         <div className="space-y-2">
// //                             <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
// //                                 <Tag className="w-3 h-3"/> Special Skills / Credits
// //                             </label>
// //                             <input 
// //                                 name="legacy_titles" 
// //                                 defaultValue={defaultLegacy} 
// //                                 placeholder="e.g. Website Developer, Event Head, Backstage (Comma Separated)" 
// //                                 className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" 
// //                             />
// //                             <p className="text-[9px] text-white/30">* These appear on the Artist Profile but do NOT place them in the Ensemble hierarchy.</p>
// //                         </div>

// //                         {/* QUICK TENURE (Only for new members or quick edits) */}
// //                         {!initialData && (
// //                             <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
// //                                 <label className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Quick Ensemble Assignment (Optional)</label>
// //                                 <div className="grid grid-cols-2 gap-4">
// //                                     <input name="role" placeholder="Role (e.g. Member)" className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white" />
// //                                     <input name="year" defaultValue="2025-2026" className="w-full bg-black border border-white/10 rounded p-2 text-xs text-white" />
// //                                 </div>
// //                             </div>
// //                         )}

// //                         <div className="grid grid-cols-2 gap-4">
// //                             <input name="instagram" defaultValue={initialData?.social_links?.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
// //                             <input name="linkedin" defaultValue={initialData?.social_links?.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none text-xs" />
// //                         </div>

// //                         <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
// //                             <Mic className="w-4 h-4 text-gold-500" />
// //                             <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
// //                             <span className="text-xs text-white/50 font-mono">{initialData?.voice_note_url ? "Voice Note Active" : "Upload Voice Note"}</span>
// //                         </div>

// //                         <textarea name="bio" defaultValue={initialData?.bio} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none resize-none text-sm" placeholder="Bio..." />

// //                         <div className="grid grid-cols-9 gap-2">
// //                             {NAVARASA_COLORS.map((c) => (
// //                                 <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
// //                             ))}
// //                         </div>
// //                     </div>
// //                   </form>
// //               )}

// //               {/* --- TAB 2: GOVERNANCE (Timeline) --- */}
// //               {activeTab === 'timeline' && initialData && (
// //                   <TenureManager memberId={initialData.id} />
// //               )}

// //             </div>

// //             {/* FOOTER */}
// //             {activeTab === 'profile' && (
// //                 <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// //                 <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// //                 <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// //                     {isSubmitting ? "Processing..." : (initialData ? "Save Identity" : "Create Artist")}
// //                     {!isSubmitting && <Save className="w-4 h-4" />}
// //                 </button>
// //                 </div>
// //             )}

// //           </motion.div>
// //         </>
// //       )}
// //     </AnimatePresence>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Camera, Palette, Save, User, Mic, Instagram, Linkedin, Briefcase, Tag } from "lucide-react";
// import { upsertMember } from "@/app/admin/members/actions";
// import TenureManager from "./TenureManager";
// import { toast } from "sonner";

// // The Navarasa Palette
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

// interface MemberSheetProps {
//     isOpen: boolean;
//     onClose: () => void;
//     initialData?: any | null; 
// }

// export default function MemberSheet({ isOpen, onClose, initialData }: MemberSheetProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [selectedColor, setSelectedColor] = useState(initialData?.color || '#eab308');
  
//   // TABS: 'profile' (Identity) vs 'timeline' (Governance)
//   const [activeTab, setActiveTab] = useState<'profile' | 'timeline'>('profile');

//   // Intelligent Defaults
//   const defaultTenure = initialData?.tenures?.[0] || {};
//   // Handle legacy_titles (Array -> String)
//   const defaultLegacy = initialData?.legacy_titles ? initialData.legacy_titles.join(', ') : '';

//   useEffect(() => {
//     if (isOpen) {
//         setPreview(initialData?.image_url || null);
//         setSelectedColor(initialData?.color || '#eab308');
//         setActiveTab('profile'); // Reset to profile
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
//         toast.success(initialData ? "Identity Updated" : "New Entity Created");
//         if (!initialData) onClose(); 
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
//                 <h2 className="font-serif text-2xl text-white">{initialData ? "Access Mainframe" : "New Entity"}</h2>
//                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Roster Control</p>
//               </div>
//               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
//             </div>

//             {/* TAB HEADER (Only show Timeline if editing existing member) */}
//             {initialData && (
//                 <div className="flex border-b border-white/5">
//                     <button onClick={() => setActiveTab('profile')} className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${activeTab === 'profile' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Identity</button>
//                     <button onClick={() => setActiveTab('timeline')} className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${activeTab === 'timeline' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}>Timeline (Tenures)</button>
//                 </div>
//             )}

//             <div className="flex-1 overflow-y-auto p-8">
              
//               {/* --- TAB 1: IDENTITY (The Artist) --- */}
//               {activeTab === 'profile' && (
//                   <form id="member-form" onSubmit={handleSubmit} className="space-y-8">
                    
//                     {/* VISUALS */}
//                     <div className="flex justify-center">
//                         <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors">
//                             <input type="file" name="image_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" accept="image/*" />
//                             {preview ? (
//                                 <img src={preview} className="w-full h-full object-cover" alt="Preview" />
//                             ) : (
//                                 <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="space-y-4">
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Full Name</label>
//                             <input name="name" defaultValue={initialData?.name} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none" />
//                         </div>

//                         {/* LEGACY TITLES (The "Artist Only" Skills) */}
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2"><Tag className="w-3 h-3"/> Special Credits / Skills</label>
//                             <input 
//                                 name="legacy_titles" 
//                                 defaultValue={defaultLegacy} 
//                                 placeholder="e.g. Website Dev, Stage Manager (Comma separated)" 
//                                 className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" 
//                             />
//                             <p className="text-[9px] text-white/30">* These appear on the Artist Profile endlessly.</p>
//                         </div>

//                         {/* INITIAL TENURE (Optional Quick-Add) */}
//                         <div className="space-y-4 p-4 border border-gold-500/20 bg-gold-500/5 rounded-xl">
//                             <label className="text-[10px] font-mono text-white/60 uppercase tracking-widest flex items-center gap-2">
//                                 <Briefcase className="w-3 h-3"/> Current Role (Optional)
//                             </label>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <input name="role" defaultValue={defaultTenure.role_student} placeholder="e.g. Secretary" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
//                                 <input name="year" defaultValue={defaultTenure.year || "2025-2026"} placeholder="Year" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
                                
//                                 <select name="rank" defaultValue={defaultTenure.rank || 'CLOUD'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none text-xs">
//                                     <option value="ZENITH">ZENITH (Faculty)</option>
//                                     <option value="CROWN">CROWN (High Command)</option>
//                                     <option value="ORBIT">ORBIT (Head)</option>
//                                     <option value="CLOUD">CLOUD (Member)</option>
//                                 </select>
//                                 <input name="department" defaultValue={defaultTenure.department} placeholder="Dept" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
//                             </div>
//                             <div className="text-[9px] text-gold-500/50 italic">* Leave "Role" empty to create an Artist Only (No Ensemble listing).</div>
//                         </div>

//                         {/* SOCIALS & BIO */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <input name="instagram" defaultValue={initialData?.social_links?.instagram} placeholder="Instagram" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
//                             <input name="linkedin" defaultValue={initialData?.social_links?.linkedin} placeholder="LinkedIn" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
//                         </div>

//                         <div className="relative group border border-white/10 bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
//                             <Mic className="w-4 h-4 text-gold-500" />
//                             <input type="file" name="voice_file" accept="audio/*" className="absolute inset-0 opacity-0 cursor-pointer" />
//                             <span className="text-xs text-white/50 font-mono">{initialData?.voice_note_url ? "Voice Note Active" : "Upload Voice Note"}</span>
//                         </div>

//                         <textarea name="bio" defaultValue={initialData?.bio} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none resize-none text-sm" placeholder="Bio..." />

//                         <div className="grid grid-cols-9 gap-2">
//                             {NAVARASA_COLORS.map((c) => (
//                                 <button key={c.hex} type="button" onClick={() => setSelectedColor(c.hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c.hex ? 'scale-125 border-white' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.hex }} title={c.name} />
//                             ))}
//                         </div>
//                     </div>
//                   </form>
//               )}

//               {/* --- TAB 2: GOVERNANCE (Timeline) --- */}
//               {activeTab === 'timeline' && initialData && (
//                   <TenureManager memberId={initialData.id} />
//               )}

//             </div>

//             {/* FOOTER */}
//             {activeTab === 'profile' && (
//                 <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
//                 <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
//                 <button form="member-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
//                     {isSubmitting ? "Processing..." : (initialData ? "Save Identity" : "Create Entity")}
//                     {!isSubmitting && <Save className="w-4 h-4" />}
//                 </button>
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
import { X, Camera, Palette, Save, User, Mic, Instagram, Linkedin, Briefcase, Tag, Eye, EyeOff, AlignLeft, Star } from "lucide-react";
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
  
  // NEW STATE: Visibility
  const [isHidden, setIsHidden] = useState(initialData?.is_hidden || false);

  const defaultTenure = initialData?.tenures?.[0] || {};
  const defaultLegacy = initialData?.legacy_titles ? initialData.legacy_titles.join(', ') : '';

  useEffect(() => {
    if (isOpen) {
        setPreview(initialData?.image_url || null);
        setSelectedColor(initialData?.color || '#eab308');
        setIsHidden(initialData?.is_hidden || false);
        setActiveTab('profile');
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
                  {/* STEALTH TOGGLE */}
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
                    
                    {/* PHOTO */}
                    <div className="flex justify-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-gold-500 transition-colors group">
                            <input type="file" name="image_file" onChange={(e) => e.target.files?.[0] && setPreview(URL.createObjectURL(e.target.files[0]))} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                            {preview ? <img src={preview} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-white/20"><Camera className="w-8 h-8" /></div>}
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

                        {/* SPECIAL SKILLS */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2"><Tag className="w-3 h-3"/> Legacy Credits (Comma Sep)</label>
                            <input name="legacy_titles" defaultValue={defaultLegacy} placeholder="Web Dev, Founder" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-xs" />
                        </div>

                        {/* QUICK ROLE (Only for New/Quick) */}
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