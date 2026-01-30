// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Send, Link as LinkIcon, User, Mail, FileText } from "lucide-react";
// import { toast } from "sonner"; // <--- NOTIFICATIONS
// import { submitToChallenge } from "@/app/actions";

// export default function SubmissionModal({ challenge, isOpen, onClose }: { challenge: any, isOpen: boolean, onClose: () => void }) {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     const formData = new FormData(e.currentTarget);
//     formData.append("challenge_id", challenge.id); // Link to active challenge

//     const result = await submitToChallenge(formData);
    
//     setIsSubmitting(false);
    
//     if (result.success) {
//         toast.success("Transmission Received. Stand by.");
//         onClose();
//     } else {
//         toast.error("Transmission Failed: " + result.error);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//           <motion.div 
//              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//              onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" 
//           />
          
//           <motion.div 
//              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
//              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
//           >
//              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
//                 <div>
//                     <h3 className="text-xl font-serif text-white">Submit Protocol</h3>
//                     <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Target: {challenge.theme}</p>
//                 </div>
//                 <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
//              </div>

//              <form onSubmit={handleSubmit} className="p-6 space-y-4">
//                 <div className="space-y-2">
//                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><User className="w-3 h-3"/> Name</label>
//                     <input name="name" required className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none transition-all" placeholder="Your Name" />
//                 </div>
                
//                 <div className="space-y-2">
//                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><Mail className="w-3 h-3"/> Contact</label>
//                     <input name="contact_info" required className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none transition-all" placeholder="Email or Phone" />
//                 </div>

//                 <div className="space-y-2">
//                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><LinkIcon className="w-3 h-3"/> Asset Link (Drive/Portfolio)</label>
//                     <input name="portfolio_link" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none transition-all" placeholder="https://..." />
//                 </div>

//                 <div className="space-y-2">
//                     <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2"><FileText className="w-3 h-3"/> Concept / Note</label>
//                     <textarea name="content" required rows={3} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none transition-all resize-none" placeholder="Brief description..." />
//                 </div>

//                 <button disabled={isSubmitting} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gold-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
//                     {isSubmitting ? "Uploading..." : "Transmit"}
//                 </button>
//              </form>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Link as LinkIcon, FileText, Video, Mic2 } from "lucide-react";
import { toast } from "sonner";
import { submitToChallenge } from "@/app/actions";

export default function SubmissionModal({ challenge, isOpen, onClose }: { challenge: any, isOpen: boolean, onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("challenge_id", challenge.id);

    const result = await submitToChallenge(formData);
    
    setIsSubmitting(false);
    if (result.success) {
        toast.success("Transmission Received.");
        onClose();
    } else {
        toast.error(result.error);
    }
  };

  // DYNAMIC FIELDS RENDERER
  const renderFields = () => {
      switch(challenge.form_type) {
          case 'audition':
              return (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup icon={User} name="name" label="Actor Name" />
                        <InputGroup icon={FileText} name="age" label="Age / Height" placeholder="e.g. 24 / 5'11" />
                    </div>
                    <InputGroup icon={Video} name="link1" label="Monologue Link (YouTube/Drive)" required />
                    <InputGroup icon={LinkIcon} name="link2" label="Headshots Folder (Drive)" />
                  </>
              );
          case 'writing':
              return (
                  <>
                    <InputGroup icon={User} name="name" label="Writer Name" />
                    <InputGroup icon={FileText} name="logline" label="Logline (One Sentence)" />
                    <InputGroup icon={LinkIcon} name="link1" label="Script PDF Link (Drive/Dropbox)" required />
                  </>
              );
          case 'design':
              return (
                  <>
                    <InputGroup icon={User} name="name" label="Artist Name" />
                    <InputGroup icon={LinkIcon} name="link1" label="Portfolio / Behance Link" required />
                    <InputGroup icon={LinkIcon} name="link2" label="Specific Asset Link" />
                  </>
              );
          default: // General
              return (
                  <>
                    <InputGroup icon={User} name="name" label="Name" />
                    <InputGroup icon={LinkIcon} name="link1" label="Relevant Link" />
                  </>
              );
      }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <motion.div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
             {/* Header */}
             <div className="p-6 border-b border-white/5 flex justify-between bg-white/[0.02]">
                <div>
                    <h3 className="text-xl font-serif text-white">Submit: {challenge.form_type.toUpperCase()}</h3>
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{challenge.theme}</p>
                </div>
                <button onClick={onClose}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
             </div>

             <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {renderFields()}
                
                {/* Common Fields */}
                <InputGroup icon={Mail} name="contact_info" label="Contact (Phone/Email)" required />
                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Note / Context</label>
                    <textarea name="content" rows={3} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none resize-none text-sm" placeholder="Any additional context..." />
                </div>

                <button disabled={isSubmitting} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gold-500 transition-all disabled:opacity-50">
                    {isSubmitting ? "Transmitting..." : "Submit Asset"}
                </button>
             </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Helper Component for cleaner code
function InputGroup({ icon: Icon, name, label, placeholder, required }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Icon className="w-3 h-3"/> {label}
            </label>
            <input name={name} required={required} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none transition-all text-sm" placeholder={placeholder} />
        </div>
    )
}