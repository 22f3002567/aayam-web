// // "use client";

// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { X, Save, Film, Upload, Youtube, AlignLeft } from "lucide-react";
// // import { upsertPlay } from "@/app/admin/originals/actions";
// // import { toast } from "sonner";

// // interface PlaySheetProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   initialData?: any | null; 
// // }

// // export default function PlaySheet({ isOpen, onClose, initialData }: PlaySheetProps) {
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [posterPreview, setPosterPreview] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (isOpen) setPosterPreview(initialData?.poster_url || null);
// //   }, [isOpen, initialData]);

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
// //     const formData = new FormData(e.currentTarget);
// //     if (initialData?.id) formData.append("id", initialData.id);

// //     const result = await upsertPlay(formData);
// //     setIsSubmitting(false);
    
// //     if (result.success) {
// //         toast.success(initialData ? "Production Updated" : "Production Created");
// //         onClose();
// //     } else {
// //         toast.error(result.error);
// //     }
// //   };

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) setPosterPreview(URL.createObjectURL(file));
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <>
// //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
// //           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
// //             <div className="flex justify-between items-center p-8 border-b border-white/5">
// //               <div>
// //                 <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Production" : "Greenlight Project"}</h2>
// //                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Originals Control</p>
// //               </div>
// //               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// //             </div>

// //             <div className="flex-1 overflow-y-auto p-8">
// //               <form id="play-form" onSubmit={handleSubmit} className="space-y-8">
                
// //                 {/* 1. METADATA */}
// //                 <div className="space-y-4">
// //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
// //                         <Film className="w-3 h-3"/> Title & Slug
// //                     </label>
// //                     <input name="title" defaultValue={initialData?.title} placeholder="Production Title" required className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 outline-none text-lg font-serif" />
// //                 </div>

// //                 {/* 2. MEDIA ASSETS */}
// //                 <div className="grid grid-cols-2 gap-6">
// //                     {/* Poster Upload */}
// //                     <div className="space-y-2">
// //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Upload className="w-3 h-3"/> Poster</label>
// //                         <div className="relative aspect-[2/3] bg-white/5 border-2 border-dashed border-white/10 rounded-lg hover:border-gold-500 transition-colors overflow-hidden group">
// //                             <input type="file" name="poster_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 z-20 cursor-pointer" accept="image/*" />
// //                             {posterPreview ? (
// //                                 <img src={posterPreview} className="w-full h-full object-cover" />
// //                             ) : (
// //                                 <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest">Upload</div>
// //                             )}
// //                         </div>
// //                     </div>

// //                     {/* Technical Details */}
// //                     <div className="space-y-4">
// //                         <div className="space-y-2">
// //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Category</label>
// //                             <select name="category" defaultValue={initialData?.category || 'stage'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// //                                 <option value="stage">Stage Play</option>
// //                                 <option value="street">Street Play</option>
// //                                 <option value="short">Short Film</option>
// //                                 <option value="film">Feature Film</option>
// //                                 <option value="workshop">Workshop</option>
// //                             </select>
// //                         </div>
// //                         <div className="space-y-2">
// //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Mood (Navarasa)</label>
// //                             <select name="mood" defaultValue={initialData?.mood || 'drama'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
// //                                 <option value="drama">Drama (Karuna)</option>
// //                                 <option value="thriller">Thriller (Bhayanaka)</option>
// //                                 <option value="comedy">Comedy (Hasya)</option>
// //                                 <option value="horror">Horror (Raudra)</option>
// //                                 <option value="experimental">Experimental (Adbhuta)</option>
// //                             </select>
// //                         </div>
// //                         <div className="space-y-2">
// //                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Youtube className="w-3 h-3"/> Youtube ID</label>
// //                             <input name="youtube_id" defaultValue={initialData?.youtube_id} placeholder="e.g. dQw4w9WgXcQ" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none font-mono text-xs" />
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* 3. SYNOPSIS */}
// //                 <div className="space-y-2">
// //                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><AlignLeft className="w-3 h-3"/> Synopsis</label>
// //                     <textarea name="description" defaultValue={initialData?.description} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm leading-relaxed" />
// //                 </div>

// //                 {/* 4. RELEASE DATE & SCORE */}
// //                 <div className="grid grid-cols-2 gap-4">
// //                     <div className="space-y-2">
// //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Release Date</label>
// //                         <input type="date" name="release_date" defaultValue={initialData?.release_date ? new Date(initialData.release_date).toISOString().split('T')[0] : ''} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-sm" />
// //                     </div>
// //                     <div className="space-y-2">
// //                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Featured Score</label>
// //                         <input type="number" name="featured_score" defaultValue={initialData?.featured_score || 0} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-sm" />
// //                     </div>
// //                 </div>

// //               </form>
// //             </div>

// //             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
// //               <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
// //               <button form="play-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
// //                 {isSubmitting ? "Processing..." : "Save Production"}
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
// import { X, Save, Film, Upload, Youtube, AlignLeft, Calendar, Star, Users } from "lucide-react";
// import { upsertPlay } from "@/app/admin/originals/actions";
// import { toast } from "sonner";
// import CastManager from "./CastManager";

// interface PlaySheetProps {
//   isOpen: boolean;
//   onClose: () => void;
//   initialData?: any | null; 
// }

// export default function PlaySheet({ isOpen, onClose, initialData }: PlaySheetProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [posterPreview, setPosterPreview] = useState<string | null>(null);
  
//   //MODE SWITCHER (DETAILS VS CAST)
//   const [activeTab, setActiveTab] = useState<'details' | 'cast'>('details')
//   useEffect(() => {
//     if (isOpen) {
//         setPosterPreview(initialData?.poster_url || null);
//         setActiveTab('details');
//     }

//   }, [isOpen, initialData]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     const formData = new FormData(e.currentTarget);
//     if (initialData?.id) formData.append("id", initialData.id);

//     const result = await upsertPlay(formData);
//     setIsSubmitting(false);
    
//     if (result.success) {
//         toast.success(initialData ? "Production Updated" : "Production Greenlit");
//         onClose();
//     } else {
//         toast.error(result.error);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setPosterPreview(URL.createObjectURL(file));
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
//           <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
//             <div className="flex justify-between items-center p-8 border-b border-white/5">
//               <div>
//                 <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Production" : "Greenlight Project"}</h2>
//                 <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Studio Controls</p>
//               </div>
//               <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-8">
//               <form id="play-form" onSubmit={handleSubmit} className="space-y-8">
                
//                 {/* 1. TITLE BLOCK */}
//                 <div className="space-y-4">
//                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
//                         <Film className="w-3 h-3"/> Title & Identity
//                     </label>
//                     <input name="title" defaultValue={initialData?.title} placeholder="Production Title" required className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 outline-none text-lg font-serif placeholder:text-white/20" />
//                 </div>

//                 {/* 2. MEDIA ASSETS */}
//                 <div className="grid grid-cols-2 gap-6">
//                     {/* Poster */}
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Upload className="w-3 h-3"/> Official Poster</label>
//                         <div className="relative aspect-[2/3] bg-white/5 border-2 border-dashed border-white/10 rounded-lg hover:border-gold-500 transition-colors overflow-hidden group">
//                             <input type="file" name="poster_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 z-20 cursor-pointer" accept="image/*" />
//                             {posterPreview ? (
//                                 <img src={posterPreview} className="w-full h-full object-cover" />
//                             ) : (
//                                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
//                                     <Upload className="w-6 h-6 mb-2" />
//                                     <span className="text-[9px] uppercase tracking-widest">Upload JPG/PNG</span>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Metadata */}
//                     <div className="space-y-4">
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Category</label>
//                             <select name="category" defaultValue={initialData?.category || 'stage'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
//                                 <option value="stage">Stage Play</option>
//                                 <option value="street">Street Play</option>
//                                 <option value="short">Short Film</option>
//                                 <option value="film">Feature Film</option>
//                                 <option value="workshop">Workshop</option>
//                             </select>
//                         </div>
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Mood (Navarasa)</label>
//                             <select name="mood" defaultValue={initialData?.mood || 'drama'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
//                                 <option value="drama">Drama (Karuna)</option>
//                                 <option value="thriller">Thriller (Bhayanaka)</option>
//                                 <option value="comedy">Comedy (Hasya)</option>
//                                 <option value="horror">Horror (Raudra)</option>
//                                 <option value="experimental">Experimental (Adbhuta)</option>
//                             </select>
//                         </div>
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Youtube className="w-3 h-3 text-red-500"/> Youtube ID</label>
//                             <input name="youtube_id" defaultValue={initialData?.youtube_id} placeholder="e.g. dQw4w9WgXcQ" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none font-mono text-xs" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* 3. SYNOPSIS */}
//                 <div className="space-y-2">
//                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><AlignLeft className="w-3 h-3"/> Synopsis</label>
//                     <textarea name="description" defaultValue={initialData?.description} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm leading-relaxed" placeholder="The story begins when..." />
//                 </div>

//                 {/* 4. RELEASE LOGIC */}
//                 <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3"/> Release Date</label>
//                         <input type="date" name="release_date" defaultValue={initialData?.release_date ? new Date(initialData.release_date).toISOString().split('T')[0] : ''} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-sm" />
//                     </div>
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Star className="w-3 h-3 text-gold-500"/> Featured Score</label>
//                         <input type="number" name="featured_score" defaultValue={initialData?.featured_score || 0} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-sm" placeholder="0 - 100" />
//                     </div>
//                 </div>

//               </form>
//             </div>

//             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
//               <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
//               <button form="play-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
//                 {isSubmitting ? "Processing..." : "Save Production"}
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
import { X, Save, Film, Upload, Youtube, AlignLeft, Calendar, Star, Users } from "lucide-react"; // Import Users
import { upsertPlay } from "@/app/admin/originals/actions";
import { toast } from "sonner";
import CastManager from "./CastManager"; // <--- IMPORT THIS

interface PlaySheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null; 
}

export default function PlaySheet({ isOpen, onClose, initialData }: PlaySheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  
  // MODE SWITCHER (Details vs Cast)
  const [activeTab, setActiveTab] = useState<'details' | 'cast'>('details');

  useEffect(() => {
    if (isOpen) {
        setPosterPreview(initialData?.poster_url || null);
        setActiveTab('details'); // Reset to details on open
    }
  }, [isOpen, initialData]);

  // ... (Keep handleSubmit and handleFileChange exactly as before) ...
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (initialData?.id) formData.append("id", initialData.id);

    const result = await upsertPlay(formData);
    setIsSubmitting(false);
    
    if (result.success) {
        toast.success(initialData ? "Production Updated" : "Production Greenlit");
        if (!initialData) onClose(); // Close on create
    } else {
        toast.error(result.error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPosterPreview(URL.createObjectURL(file));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl">
            
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <div>
                <h2 className="font-serif text-2xl text-white">{initialData ? "Edit Production" : "Greenlight Project"}</h2>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">Studio Controls</p>
              </div>
              <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
            </div>

            {/* TAB SWITCHER (Only if editing) */}
            {initialData && (
                <div className="flex border-b border-white/5">
                    <button 
                        onClick={() => setActiveTab('details')}
                        className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${activeTab === 'details' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}
                    >
                        Details
                    </button>
                    <button 
                        onClick={() => setActiveTab('cast')}
                        className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${activeTab === 'cast' ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5'}`}
                    >
                        Cast & Crew
                    </button>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-8">
              
              {/* TAB 1: DETAILS FORM */}
              {activeTab === 'details' && (
                  <form id="play-form" onSubmit={handleSubmit} className="space-y-8">
                    {/* ... (PASTE THE ENTIRE FORM CODE FROM PREVIOUS STEP HERE) ... */}
                    {/* 1. TITLE BLOCK */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Film className="w-3 h-3"/> Title & Identity
                        </label>
                        <input name="title" defaultValue={initialData?.title} placeholder="Production Title" required className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 outline-none text-lg font-serif placeholder:text-white/20" />
                    </div>

                    {/* 2. MEDIA ASSETS */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Upload className="w-3 h-3"/> Official Poster</label>
                            <div className="relative aspect-[2/3] bg-white/5 border-2 border-dashed border-white/10 rounded-lg hover:border-gold-500 transition-colors overflow-hidden group">
                                <input type="file" name="poster_file" onChange={handleFileChange} className="absolute inset-0 opacity-0 z-20 cursor-pointer" accept="image/*" />
                                {posterPreview ? (
                                    <img src={posterPreview} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                                        <Upload className="w-6 h-6 mb-2" />
                                        <span className="text-[9px] uppercase tracking-widest">Upload JPG/PNG</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Category</label>
                                <select name="category" defaultValue={initialData?.category || 'stage'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
                                    <option value="stage">Stage Play</option>
                                    <option value="street">Street Play</option>
                                    <option value="short">Short Film</option>
                                    <option value="film">Feature Film</option>
                                    <option value="workshop">Workshop</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Mood</label>
                                <select name="mood" defaultValue={initialData?.mood || 'drama'} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none appearance-none">
                                    <option value="drama">Drama</option>
                                    <option value="thriller">Thriller</option>
                                    <option value="comedy">Comedy</option>
                                    <option value="horror">Horror</option>
                                    <option value="experimental">Experimental</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Youtube className="w-3 h-3 text-red-500"/> Youtube ID</label>
                                <input name="youtube_id" defaultValue={initialData?.youtube_id} placeholder="ID only" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none font-mono text-xs" />
                            </div>
                        </div>
                    </div>

                    {/* 3. SYNOPSIS */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><AlignLeft className="w-3 h-3"/> Synopsis</label>
                        <textarea name="description" defaultValue={initialData?.description} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm leading-relaxed" />
                    </div>

                    {/* 4. META */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3"/> Release Date</label>
                            <input type="date" name="release_date" defaultValue={initialData?.release_date ? new Date(initialData.release_date).toISOString().split('T')[0] : ''} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Star className="w-3 h-3 text-gold-500"/> Featured Score</label>
                            <input type="number" name="featured_score" defaultValue={initialData?.featured_score || 0} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none text-sm" />
                        </div>
                    </div>
                  </form>
              )}

              {/* TAB 2: CAST MANAGER */}
              {activeTab === 'cast' && initialData && (
                  <CastManager playId={initialData.id} />
              )}

            </div>

            {/* Footer */}
            {activeTab === 'details' && (
                <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-4">
                <button onClick={onClose} type="button" className="flex-1 py-4 border border-white/10 rounded-lg text-white/50 font-mono text-xs uppercase hover:bg-white/5">Cancel</button>
                <button form="play-form" disabled={isSubmitting} className="flex-[2] bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-gold-500 transition-colors flex items-center justify-center gap-2">
                    {isSubmitting ? "Processing..." : "Save Production"}
                    {!isSubmitting && <Save className="w-4 h-4" />}
                </button>
                </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}