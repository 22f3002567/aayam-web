// // // // import { createAdminClient } from "@/lib/supabase/admin";
// // // // import ChallengeList from "@/components/admin/pulse/ChallengeList";
// // // // import PulseToolbar from "@/components/admin/pulse/PulseToolbar";

// // // // export default async function PulseManager() {
// // // //   const supabase = createAdminClient();
  
// // // //   // FETCH ALL (Including Deleted)
// // // //   const { data: challenges } = await supabase
// // // //     .from('challenges')
// // // //     .select('*')
// // // //     .order('deadline', { ascending: false });

// // // //   return (
// // // //     <div className="space-y-8">
// // // //       {/* HEADER */}
// // // //       <div className="flex justify-between items-end border-b border-white/5 pb-6">
// // // //         <div>
// // // //           <h1 className="text-4xl font-serif text-white mb-2">The Pulse</h1>
// // // //           <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
// // // //             Signal & Challenge Control
// // // //           </p>
// // // //         </div>
// // // //         <PulseToolbar />
// // // //       </div>

// // // //       {/* LIST */}
// // // //       <ChallengeList challenges={challenges || []} />
// // // //     </div>
// // // //   );
// // // // }

// // // import { createAdminClient } from "@/lib/supabase/admin";
// // // import SignalConsole from "@/components/admin/pulse/SignalConsole"; // Correct Import
// // // import { RadioTower } from "lucide-react";

// // // export default async function PulseManager() {
// // //   const supabase = createAdminClient();
  
// // //   const { data: activeSignal } = await supabase
// // //     .from("challenges")
// // //     .select("*")
// // //     .eq("status", "active")
// // //     .maybeSingle();

// // //   return (
// // //     <div className="max-w-5xl mx-auto space-y-12 pb-20">
// // //       <div className="border-b border-white/5 pb-8">
// // //         <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 flex items-center gap-4">
// // //           <RadioTower className="w-10 h-10 text-red-500" />
// // //           Signal Tower
// // //         </h1>
// // //         <p className="font-mono text-xs text-white/40 uppercase tracking-widest ml-1">
// // //           Broadcast Control • The Beacon • Secure Channel
// // //         </p>
// // //       </div>

// // //       <SignalConsole activeSignal={activeSignal} />
// // //     </div>
// // //   );
// // // }

// // import { createAdminClient } from "@/lib/supabase/admin";
// // import SignalConsole from "@/components/admin/pulse/SignalConsole"; 
// // import { RadioTower } from "lucide-react";

// // export default async function PulseManager() {
// //   const supabase = createAdminClient();
  
// //   // FETCH ACTIVE SIGNAL
// //   const { data: activeSignal } = await supabase
// //     .from("challenges")
// //     .select("*")
// //     .eq("status", "active")
// //     .maybeSingle();

// //   return (
// //     <div className="max-w-5xl mx-auto space-y-12 pb-20">
// //       <div className="border-b border-white/5 pb-8">
// //         <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 flex items-center gap-4">
// //           <RadioTower className="w-10 h-10 text-red-500" />
// //           Signal Tower
// //         </h1>
// //         <p className="font-mono text-xs text-white/40 uppercase tracking-widest ml-1">
// //           Broadcast Control • The Beacon • Secure Channel
// //         </p>
// //       </div>

// //       <SignalConsole activeSignal={activeSignal} />
// //     </div>
// //   );
// // }
// import { createAdminClient } from "@/lib/supabase/admin";
// import SignalConsole from "@/components/admin/pulse/SignalConsole";
// import SignalHistory from "@/components/admin/pulse/SignalHistory";
// import { RadioTower } from "lucide-react";

// export default async function PulseManager() {
//   const supabase = createAdminClient();
  
//   // 1. FETCH ACTIVE
//   const { data: activeSignal } = await supabase
//     .from("challenges")
//     .select("*")
//     .eq("status", "active")
//     .maybeSingle();

//   // 2. FETCH HISTORY (Archived/Closed)
//   const { data: history } = await supabase
//     .from("challenges")
//     .select("*")
//     .neq("status", "active") // Everything else
//     .order("deadline", { ascending: false })
//     .limit(10);

//   return (
//     <div className="max-w-5xl mx-auto space-y-16 pb-20">
//       <div className="border-b border-white/5 pb-8">
//         <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 flex items-center gap-4">
//           <RadioTower className="w-10 h-10 text-red-500" />
//           Signal Tower
//         </h1>
//         <p className="font-mono text-xs text-white/40 uppercase tracking-widest ml-1">
//           Broadcast Control • The Beacon • Secure Channel
//         </p>
//       </div>

//       <SignalConsole activeSignal={activeSignal} />
      
//       <SignalHistory history={history || []} />
//     </div>
//   );
// }

import { createAdminClient } from "@/lib/supabase/admin";
import SignalConsole from "@/components/admin/pulse/SignalConsole";
import SignalHistory from "@/components/admin/pulse/SignalHistory";
import { RadioTower } from "lucide-react";

export default async function PulseManager() {
  const supabase = createAdminClient();
  
  // 1. FETCH ACTIVE
  const { data: activeSignal } = await supabase
    .from("challenges")
    .select("*")
    .eq("status", "active")
    .maybeSingle();

  // 2. FETCH HISTORY
  const { data: history } = await supabase
    .from("challenges")
    .select("*")
    .neq("status", "active")
    .order("deadline", { ascending: false })
    .limit(10);

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20">
      <div className="border-b border-white/5 pb-8">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 flex items-center gap-4">
          <RadioTower className="w-10 h-10 text-red-500" />
          Signal Tower
        </h1>
        <p className="font-mono text-xs text-white/40 uppercase tracking-widest ml-1">
          Broadcast Control • The Beacon • Secure Channel
        </p>
      </div>

      <SignalConsole activeSignal={activeSignal} />
      
      <SignalHistory history={history || []} />
    </div>
  );
}