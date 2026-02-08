
// import { createAdminClient } from "@/lib/supabase/admin";
// import EventList from "@/components/admin/chronicle/EventList";
// import EventSheet from "@/components/admin/chronicle/EventSheet";

// export default async function ChronicleManager() {
//   const supabase = createAdminClient();
  
//   // FETCH ALL (Ordered by Date Descending)
//   // We want to see deleted ones too, so we don't filter them out.
//   const { data: events } = await supabase
//     .from('events')
//     .select('*')
//     .order('date', { ascending: false });

//   return (
//     <div className="space-y-8">
      
//       {/* HEADER */}
//       <div className="flex justify-between items-end border-b border-white/5 pb-6">
//         <div>
//           <h1 className="text-4xl font-serif text-white mb-2">The Chronicle</h1>
//           <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
//             Timeline Control • {events?.length || 0} Entries
//           </p>
//         </div>
        
//         {/* THE COMMAND SHEET (Slide-Over) */}
//         <EventSheet />
//       </div>

//       {/* THE FLIGHT STRIP */}
//       <EventList events={events || []} />

//     </div>
//   );
// }
import { createAdminClient } from "@/lib/supabase/admin";
import EventList from "@/components/admin/chronicle/EventList";
import ChronicleToolbar from "@/components/admin/chronicle/ChronicleToolbar"; // <--- NEW IMPORT

export default async function ChronicleManager() {
  const supabase = createAdminClient();
  
  // FETCH ALL (Ordered by Date Descending)
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2">The Chronicle</h1>
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
            Timeline Control • {events?.length || 0} Entries
          </p>
        </div>
        
        {/* THE TOOLBAR (Handles the Add Button & Sheet) */}
        <ChronicleToolbar /> 
      </div>

      {/* THE FLIGHT STRIP */}
      <EventList events={events || []} />

    </div>
  );
}