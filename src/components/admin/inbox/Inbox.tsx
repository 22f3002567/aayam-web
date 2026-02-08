
// "use client";

// import { useState, useOptimistic, startTransition } from "react";
// import { Mail, ExternalLink, CheckCircle, XCircle, Trash2, Filter, Inbox } from "lucide-react";
// import { updateStatus, deleteSubmission } from "@/app/admin/inbox/actions";
// import { toast } from "sonner";

// // --- GOD TIER UTILITY: Native Time Algo (No Libraries) ---
// function timeAgo(dateString: string) {
//   const date = new Date(dateString);
//   const now = new Date();
//   const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

//   let interval = Math.floor(seconds / 31536000);
//   if (interval > 1) return interval + " years ago";
  
//   interval = Math.floor(seconds / 2592000);
//   if (interval > 1) return interval + " months ago";
  
//   interval = Math.floor(seconds / 86400);
//   if (interval > 1) return interval + " days ago";
//   if (interval === 1) return "1 day ago";
  
//   interval = Math.floor(seconds / 3600);
//   if (interval > 1) return interval + " hours ago";
//   if (interval === 1) return "1 hour ago";
  
//   interval = Math.floor(seconds / 60);
//   if (interval > 1) return interval + " mins ago";
  
//   return "just now";
// }

// // Strict Type Definition
// type Submission = {
//     id: string;
//     name: string;
//     type: string;
//     status: 'pending' | 'selected' | 'rejected';
//     created_at: string;
//     challenges?: { theme: string } | null;
//     content: string;
//     contact_info: string;
//     portfolio_link?: string;
// };

// export default function InboxList({ initialSubmissions }: { initialSubmissions: Submission[] }) {
//   const [filter, setFilter] = useState<'all' | 'pending' | 'selected' | 'rejected'>('all');

//   // OPTIMISTIC UI: Instant Feedback
//   const [optimisticSubmissions, setOptimisticSubmissions] = useOptimistic(
//     initialSubmissions,
//     (state, { id, action, value }: { id: string, action: 'update' | 'delete', value?: any }) => {
//         if (action === 'delete') return state.filter(s => s.id !== id);
//         if (action === 'update') return state.map(s => s.id === id ? { ...s, status: value } : s);
//         return state;
//     }
//   );

//   const filtered = filter === 'all' 
//     ? optimisticSubmissions 
//     : optimisticSubmissions.filter(s => s.status === filter);

//   // HANDLERS
//   const handleStatus = async (id: string, status: 'selected' | 'rejected') => {
//     startTransition(() => {
//         setOptimisticSubmissions({ id, action: 'update', value: status });
//     });
    
//     const res = await updateStatus(id, status);
//     if (res.success) toast.success(`Transmission ${status}`);
//     else toast.error("Signal failed.");
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Permanently erase signal?")) return;
    
//     startTransition(() => {
//         setOptimisticSubmissions({ id, action: 'delete' });
//     });

//     const res = await deleteSubmission(id);
//     if (res.success) toast.success("Signal erased");
//     else toast.error("Deletion failed");
//   };

//   if (!optimisticSubmissions?.length) return (
//     <div className="flex flex-col items-center justify-center p-24 border border-white/5 rounded-2xl border-dashed bg-white/5 text-center">
//         <Inbox className="w-12 h-12 text-white/20 mb-4" />
//         <p className="font-mono text-sm text-white/40">No frequencies detected.</p>
//     </div>
//   );

//   return (
//     <div className="space-y-6">
      
//       {/* FILTER DECK */}
//       <div className="flex items-center justify-between">
//           <div className="flex gap-1 p-1 bg-white/5 rounded-lg border border-white/5">
//             {['all', 'pending', 'selected', 'rejected'].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f as any)}
//                 className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-black shadow-lg font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//           <div className="text-[10px] font-mono text-white/30 uppercase flex items-center gap-2">
//             <Filter className="w-3 h-3" />
//             Showing {filtered.length}
//           </div>
//       </div>

//       {/* THE GRID */}
//       <div className="grid gap-3">
//         {filtered.map((sub) => (
//           <div key={sub.id} className="group relative p-5 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-gold-500/30 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
            
//             {/* 1. STATUS BAR */}
//             <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors ${
//               sub.status === 'selected' ? 'bg-green-500' : 
//               sub.status === 'rejected' ? 'bg-red-900' : 'bg-gold-500'
//             }`} />

//             {/* 2. MAIN DATA */}
//             <div className="flex-1 min-w-0">
//                <div className="flex items-center gap-3 mb-1">
//                  <h3 className="text-white font-medium truncate font-serif text-lg">{sub.name}</h3>
//                  <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[9px] font-mono uppercase text-white/60">{sub.type}</span>
//                  {/* USING NATIVE TIME AGO HERE */}
//                  <span className="text-[9px] font-mono text-white/20">• {timeAgo(sub.created_at)}</span>
//                </div>
               
//                <div className="text-xs text-gold-500/80 font-mono mb-2 uppercase tracking-wide">
//                  {sub.challenges?.theme ? `Target: ${sub.challenges.theme}` : "General Inquiry"}
//                </div>

//                <p className="text-sm text-white/50 line-clamp-2 leading-relaxed max-w-2xl font-serif italic">
//                  "{sub.content}"
//                </p>
               
//                {/* LINKS */}
//                <div className="flex gap-4 mt-3">
//                  <a href={`mailto:${sub.contact_info}`} className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-white/40 hover:text-white transition-colors group/link">
//                     <Mail className="w-3 h-3 group-hover/link:text-gold-500" /> {sub.contact_info}
//                  </a>
//                  {sub.portfolio_link && (
//                    <a href={sub.portfolio_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-blue-400/60 hover:text-blue-400 hover:underline transition-colors">
//                       <ExternalLink className="w-3 h-3" /> View Asset
//                    </a>
//                  )}
//                </div>
//             </div>

//             {/* 3. ACTION DECK */}
//             <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
//                {sub.status !== 'selected' && (
//                  <button onClick={() => handleStatus(sub.id, 'selected')} title="Accept" className="p-2 bg-green-900/10 hover:bg-green-500 text-green-500 hover:text-black rounded-lg transition-all border border-green-500/20">
//                    <CheckCircle className="w-4 h-4" />
//                  </button>
//                )}
               
//                {sub.status !== 'rejected' && (
//                  <button onClick={() => handleStatus(sub.id, 'rejected')} title="Reject" className="p-2 bg-red-900/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all border border-red-500/20">
//                    <XCircle className="w-4 h-4" />
//                  </button>
//                )}

//                <div className="w-px h-6 bg-white/10 mx-2" />

//                <button onClick={() => handleDelete(sub.id)} title="Purge" className="p-2 hover:bg-white/10 text-white/20 hover:text-white rounded-lg transition-colors">
//                    <Trash2 className="w-4 h-4" />
//                </button>
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useOptimistic, startTransition } from "react";
import { Mail, ExternalLink, CheckCircle, XCircle, Trash2, Filter, Inbox } from "lucide-react";
import { updateStatus, deleteSubmission } from "@/app/admin/inbox/actions";
import { toast } from "sonner";

// --- NATIVE TIME AGO (No external libraries) ---
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + " years ago";
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " months ago";
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + " days ago";
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + " hours ago";
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + " mins ago";
  return "just now";
}

type Submission = {
    id: string;
    name: string;
    type: string;
    status: 'pending' | 'selected' | 'rejected';
    created_at: string;
    challenges?: { theme: string } | null; // <--- FIXED: 'theme' not 'title'
    content: string;
    contact_info: string;
    portfolio_link?: string;
};

export default function InboxList({ initialSubmissions }: { initialSubmissions: Submission[] }) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'selected' | 'rejected'>('all');

  const [optimisticSubmissions, setOptimisticSubmissions] = useOptimistic(
    initialSubmissions,
    (state, { id, action, value }: { id: string, action: 'update' | 'delete', value?: any }) => {
        if (action === 'delete') return state.filter(s => s.id !== id);
        if (action === 'update') return state.map(s => s.id === id ? { ...s, status: value } : s);
        return state;
    }
  );

  const filtered = filter === 'all' 
    ? optimisticSubmissions 
    : optimisticSubmissions.filter(s => s.status === filter);

  const handleStatus = async (id: string, status: 'selected' | 'rejected') => {
    startTransition(() => {
        setOptimisticSubmissions({ id, action: 'update', value: status });
    });
    const res = await updateStatus(id, status);
    if (res.success) toast.success(`Transmission ${status}`);
    else toast.error("Signal failed.");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently erase signal?")) return;
    startTransition(() => {
        setOptimisticSubmissions({ id, action: 'delete' });
    });
    const res = await deleteSubmission(id);
    if (res.success) toast.success("Signal erased");
    else toast.error("Deletion failed");
  };

  if (!optimisticSubmissions?.length) return (
    <div className="flex flex-col items-center justify-center p-24 border border-white/5 rounded-2xl border-dashed bg-white/5 text-center">
        <Inbox className="w-12 h-12 text-white/20 mb-4" />
        <p className="font-mono text-sm text-white/40">No frequencies detected.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <div className="flex gap-1 p-1 bg-white/5 rounded-lg border border-white/5">
            {['all', 'pending', 'selected', 'rejected'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-black shadow-lg font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-mono text-white/30 uppercase flex items-center gap-2">
            <Filter className="w-3 h-3" />
            Showing {filtered.length}
          </div>
      </div>

      <div className="grid gap-3">
        {filtered.map((sub) => (
          <div key={sub.id} className="group relative p-5 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-gold-500/30 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
            
            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors ${
              sub.status === 'selected' ? 'bg-green-500' : 
              sub.status === 'rejected' ? 'bg-red-900' : 'bg-gold-500'
            }`} />

            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-3 mb-1">
                 <h3 className="text-white font-medium truncate font-serif text-lg">{sub.name}</h3>
                 <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[9px] font-mono uppercase text-white/60">{sub.type}</span>
                 <span className="text-[9px] font-mono text-white/20">• {timeAgo(sub.created_at)}</span>
               </div>
               
               <div className="text-xs text-gold-500/80 font-mono mb-2 uppercase tracking-wide">
                 {/* FIXED: Reading 'theme' correctly */}
                 {sub.challenges?.theme ? `Target: ${sub.challenges.theme}` : "General Inquiry"}
               </div>

               <p className="text-sm text-white/50 line-clamp-2 leading-relaxed max-w-2xl font-serif italic">
                 "{sub.content}"
               </p>
               
               <div className="flex gap-4 mt-3">
                 <a href={`mailto:${sub.contact_info}`} className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-white/40 hover:text-white transition-colors group/link">
                    <Mail className="w-3 h-3 group-hover/link:text-gold-500" /> {sub.contact_info}
                 </a>
                 {sub.portfolio_link && (
                   <a href={sub.portfolio_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-blue-400/60 hover:text-blue-400 hover:underline transition-colors">
                      <ExternalLink className="w-3 h-3" /> View Asset
                   </a>
                 )}
               </div>
            </div>

            <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
               {sub.status !== 'selected' && (
                 <button onClick={() => handleStatus(sub.id, 'selected')} title="Accept" className="p-2 bg-green-900/10 hover:bg-green-500 text-green-500 hover:text-black rounded-lg transition-all border border-green-500/20">
                   <CheckCircle className="w-4 h-4" />
                 </button>
               )}
               
               {sub.status !== 'rejected' && (
                 <button onClick={() => handleStatus(sub.id, 'rejected')} title="Reject" className="p-2 bg-red-900/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all border border-red-500/20">
                   <XCircle className="w-4 h-4" />
                 </button>
               )}

               <div className="w-px h-6 bg-white/10 mx-2" />

               <button onClick={() => handleDelete(sub.id)} title="Purge" className="p-2 hover:bg-white/10 text-white/20 hover:text-white rounded-lg transition-colors">
                   <Trash2 className="w-4 h-4" />
               </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}