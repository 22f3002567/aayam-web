// "use client";

// import { Calendar, MapPin, Trash2, RefreshCcw, ExternalLink } from "lucide-react";
// import { deleteEvent, restoreEvent } from "@/app/admin/events/actions";

// export default function EventList({ events }: { events: any[] }) {
//   if (!events?.length) return <div className="p-8 text-center border border-white/5 rounded-xl border-dashed text-white/20 font-mono text-sm">Timeline Empty. Initialize first event.</div>;

//   return (
//     <div className="space-y-2">
//       {events.map((event) => {
//         const isDeleted = !!event.deleted_at;
//         const isPast = new Date(event.date) < new Date();

//         return (
//           <div key={event.id} className={`
//             group flex items-center justify-between p-4 
//             bg-[#0a0a0a] border rounded-lg transition-all
//             ${isDeleted ? 'border-red-900/30 opacity-50 grayscale' : 'border-white/5 hover:border-white/20'}
//           `}>
            
//             {/* LEFT: INFO */}
//             <div className="flex items-center gap-6">
//                {/* Date Badge */}
//                <div className={`
//                   flex flex-col items-center justify-center w-12 h-12 rounded border transition-colors
//                   ${isDeleted ? 'bg-red-900/10 border-red-900/20' : 'bg-white/5 border-white/5 group-hover:border-gold-500/50'}
//                `}>
//                   <span className="text-[9px] font-mono uppercase text-white/40">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
//                   <span className="text-lg font-serif text-white">{new Date(event.date).getDate()}</span>
//                </div>

//                <div>
//                   <h4 className={`font-medium transition-colors ${isDeleted ? 'text-red-500 line-through' : 'text-white group-hover:text-gold-500'}`}>
//                     {event.title}
//                   </h4>
//                   <div className="flex items-center gap-3 mt-1">
//                       <span className="flex items-center gap-1 text-[10px] font-mono text-white/40 uppercase tracking-widest">
//                           <MapPin className="w-3 h-3" /> {event.location || "TBA"}
//                       </span>
//                       <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${event.type === 'show' ? 'bg-purple-900/30 text-purple-400' : 'bg-blue-900/30 text-blue-400'}`}>
//                           {event.type}
//                       </span>
//                       {event.registration_link && (
//                          <a href={event.registration_link} target="_blank" className="flex items-center gap-1 text-[10px] font-mono text-white/30 hover:text-white transition-colors">
//                             <ExternalLink className="w-3 h-3" /> Link
//                          </a>
//                       )}
//                   </div>
//                </div>
//             </div>

//             {/* RIGHT: STATUS & ACTIONS */}
//             <div className="flex items-center gap-6">
//                 <span className={`text-[10px] font-mono uppercase ${isPast ? 'text-white/20' : 'text-green-500'}`}>
//                     {isDeleted ? 'DELETED' : (isPast ? 'ARCHIVED' : 'UPCOMING')}
//                 </span>
                
//                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                     {isDeleted ? (
//                       <button onClick={() => restoreEvent(event.id)} className="p-2 hover:bg-green-900/20 text-green-700 hover:text-green-400 rounded transition-colors" title="Restore">
//                           <RefreshCcw className="w-4 h-4" />
//                       </button>
//                     ) : (
//                       <button onClick={() => deleteEvent(event.id)} className="p-2 hover:bg-red-900/20 text-white/20 hover:text-red-500 rounded transition-colors" title="Delete">
//                           <Trash2 className="w-4 h-4" />
//                       </button>
//                     )}
//                 </div>
//             </div>

//           </div>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Calendar, MapPin, Trash2, RefreshCcw, Edit3, Archive, EyeOff } from "lucide-react";
import { archiveEvent, restoreEvent, shredEvent } from "@/app/admin/events/actions";
import DeleteModal from "./DeleteModal";
import EventSheet from "./EventSheet";

export default function EventList({ events }: { events: any[] }) {
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  
  // MODAL STATE
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; event: any; type: 'archive'|'shred' }>({
    isOpen: false, event: null, type: 'archive'
  });

  const handleDeleteClick = (event: any) => {
    // If already deleted -> Shred. If active -> Archive.
    const type = event.deleted_at ? 'shred' : 'archive';
    setDeleteModal({ isOpen: true, event, type });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.event) return;

    if (deleteModal.type === 'archive') {
      await archiveEvent(deleteModal.event.id);
    } else {
      await shredEvent(deleteModal.event.id);
    }
    setDeleteModal({ ...deleteModal, isOpen: false });
  };

  if (!events?.length) return <div className="p-12 text-center border border-white/5 rounded-xl border-dashed text-white/20 font-mono text-sm">No records found in the timeline.</div>;

  return (
    <>
      <div className="space-y-3">
        {events.map((event) => {
          const isDeleted = !!event.deleted_at;
          const isPast = new Date(event.date) < new Date();

          return (
            <div key={event.id} className={`
              group flex items-center justify-between p-5 
              bg-[#0a0a0a] border rounded-xl transition-all duration-300
              ${isDeleted ? 'border-red-900/30 bg-red-900/5 opacity-70 grayscale-[0.5]' : 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]'}
            `}>
              
              {/* LEFT: INFO */}
              <div className="flex items-center gap-6">
                 {/* DATE BLOCK */}
                 <div className={`
                    flex flex-col items-center justify-center w-14 h-14 rounded-lg border transition-colors
                    ${isDeleted ? 'bg-red-900/10 border-red-900/20' : 'bg-white/5 border-white/5 group-hover:border-gold-500/50'}
                 `}>
                    <span className="text-[9px] font-mono uppercase text-white/40">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-xl font-serif text-white">{new Date(event.date).getDate()}</span>
                 </div>

                 <div>
                    <div className="flex items-center gap-3">
                        <h4 className={`text-lg font-medium transition-colors ${isDeleted ? 'text-white/50 line-through decoration-red-500' : 'text-white group-hover:text-gold-500'}`}>
                            {event.title}
                        </h4>
                        {isDeleted && <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[9px] font-mono uppercase tracking-widest border border-red-500/20">Archived</span>}
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                            <MapPin className="w-3 h-3" /> {event.location || "TBA"}
                        </span>
                        <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${event.type === 'show' ? 'bg-purple-900/30 text-purple-400' : 'bg-blue-900/30 text-blue-400'}`}>
                            {event.type}
                        </span>
                    </div>
                 </div>
              </div>

              {/* RIGHT: CONTROL DECK */}
              <div className="flex items-center gap-4">
                  
                  {/* RESTORE BUTTON (Only for Deleted) */}
                  {isDeleted && (
                    <button onClick={() => restoreEvent(event.id)} className="flex items-center gap-2 px-3 py-2 hover:bg-green-900/20 text-green-700 hover:text-green-400 rounded-lg transition-colors group/restore">
                        <RefreshCcw className="w-4 h-4" />
                        <span className="text-[10px] font-mono uppercase hidden group-hover/restore:block">Restore</span>
                    </button>
                  )}

                  {/* EDIT BUTTON (Only for Active) */}
                  {!isDeleted && (
                    <button onClick={() => setEditingEvent(event)} className="p-2.5 hover:bg-white/10 text-white/40 hover:text-white rounded-lg transition-colors" title="Edit Protocol">
                        <Edit3 className="w-4 h-4" />
                    </button>
                  )}

                  {/* DELETE / SHRED BUTTON */}
                  <button 
                    onClick={() => handleDeleteClick(event)} 
                    className={`p-2.5 rounded-lg transition-colors ${isDeleted ? 'hover:bg-red-900/40 text-red-500/50 hover:text-red-500' : 'hover:bg-red-900/20 text-white/20 hover:text-red-400'}`}
                    title={isDeleted ? "Permanently Shred" : "Archive Event"}
                  >
                      {isDeleted ? <Trash2 className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                  </button>

              </div>

            </div>
          );
        })}
      </div>

      {/* MODALS */}
      <DeleteModal 
        isOpen={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={handleConfirmDelete}
        eventName={deleteModal.event?.title || "Event"}
        type={deleteModal.type}
      />

      {/* EDIT SHEET */}
      <EventSheet 
        isOpen={!!editingEvent} 
        onClose={() => setEditingEvent(null)} 
        initialData={editingEvent} 
      />
    </>
  );
}