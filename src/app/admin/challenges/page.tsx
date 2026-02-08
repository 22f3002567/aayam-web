
// import { createAdminClient } from "@/lib/supabase/admin";
// import SignalConsole from "@/components/admin/pulse/SignalConsole";
// import SignalHistory from "@/components/admin/pulse/SignalHistory";
// import { RadioTower } from "lucide-react";
// import Link from "next/link";
// export default async function PulseManager() {
//   const supabase = createAdminClient();
  
//   // 1. FETCH ACTIVE
//   const { data: activeSignal } = await supabase
//     .from("challenges")
//     .select("*")
//     .eq("status", "active")
//     .maybeSingle();

//   // 2. FETCH HISTORY
//   const { data: history } = await supabase
//     .from("challenges")
//     .select("*")
//     .neq("status", "active")
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
import { RadioTower, Inbox } from "lucide-react"; // Import Inbox Icon
import Link from "next/link"; // Import Link

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
      
      {/* HEADER: NOW WITH NAVIGATION */}
      <div className="border-b border-white/5 pb-8 flex justify-between items-end">
        <div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 flex items-center gap-4">
                <RadioTower className="w-10 h-10 text-red-500" />
                Signal Tower
            </h1>
            <p className="font-mono text-xs text-white/40 uppercase tracking-widest ml-1">
                Broadcast Control • The Beacon • Secure Channel
            </p>
        </div>

        {/* THE RECEIVER LINK */}
        <Link 
            href="/admin/inbox" 
            className="group flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-lg hover:bg-white/10 hover:border-gold-500/50 transition-all"
        >
            <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-white group-hover:text-gold-500 transition-colors">ACCESS RECEIVER</div>
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Incoming Transmissions</div>
            </div>
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-gold-500/10 transition-colors">
                <Inbox className="w-5 h-5 text-gold-500" />
            </div>
        </Link>
      </div>

      <SignalConsole activeSignal={activeSignal} />
      
      <SignalHistory history={history || []} />
    </div>
  );
}