
// import { Users, Calendar, Award, Activity, Film } from "lucide-react";
// import { createClient } from "@/lib/supabase/server";

// export default async function AdminDashboard() {
//   const supabase = await createClient();

//   // PARALLEL DATA FETCHING (God Tier Speed)
//   const [members, events, plays, certs] = await Promise.all([
//     supabase.from('team_members').select('id', { count: 'exact' }),
//     supabase.from('events').select('id', { count: 'exact' }),
//     supabase.from('plays').select('id', { count: 'exact' }),
//     supabase.from('certificates').select('id', { count: 'exact' })
//   ]);

//   const stats = [
//     { label: "Active Souls", value: members.count || 0, icon: Users, color: "text-blue-400" },
//     { label: "Chronicle Entries", value: events.count || 0, icon: Calendar, color: "text-gold-400" },
//     { label: "Original Works", value: plays.count || 0, icon: Film, color: "text-navarasa-street" },
//     { label: "Legacy Minted", value: certs.count || 0, icon: Award, color: "text-purple-400" },
//   ];

//   return (
//     <div className="space-y-12">
      
//       {/* HEADER */}
//       <div>
//         <h1 className="text-4xl font-serif text-white mb-2">The Bridge</h1>
//         <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
//           System Overview • {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//         </p>
//       </div>

//       {/* STATS GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, i) => (
//           <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors group">
//             <div className="flex justify-between items-start mb-4">
//               <div className={`p-2 bg-white/5 rounded-lg ${stat.color} bg-opacity-10`}>
//                 <stat.icon className={`w-5 h-5 ${stat.color}`} />
//               </div>
//               <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
//                 Real-time
//               </span>
//             </div>
//             <h3 className="text-3xl font-serif text-white mb-1 group-hover:translate-x-1 transition-transform">
//               {stat.value}
//             </h3>
//             <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
//               {stat.label}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* SYSTEM LOGS (Static Placeholder until Phase 2) */}
//       <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8">
//         <div className="flex justify-between items-center mb-6">
//             <h3 className="font-serif text-xl text-white">System Activity</h3>
//             <div className="flex items-center gap-2 text-green-500">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                 </span>
//                 <span className="font-mono text-[10px] uppercase tracking-widest">Live</span>
//             </div>
//         </div>
        
//         <div className="space-y-0 divide-y divide-white/5">
//             {[1,2,3].map((_, i) => (
//                 <div key={i} className="flex items-center gap-4 py-4 text-sm hover:bg-white/[0.02] px-4 -mx-4 transition-colors">
//                     <span className="font-mono text-[10px] text-white/30 w-20">10:{42-i} AM</span>
//                     <span className="text-white/60">System initialized. Waiting for command.</span>
//                 </div>
//             ))}
//         </div>
//       </div>

//     </div>
//   );
// }

import { Users, Calendar, Award, Activity, Film } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin"; // <--- THE KEY CHANGE

export default async function AdminDashboard() {
  // Use the Admin Client to see EVERYTHING (Drafts, Hidden, Deleted)
  const supabase = createAdminClient();

  // PARALLEL DATA FETCHING
  // Note: 'count' with 'head: true' is faster as it doesn't return data, just numbers.
  const [members, events, plays, certs] = await Promise.all([
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('plays').select('*', { count: 'exact', head: true }),
    supabase.from('certificates').select('*', { count: 'exact', head: true })
  ]);

  const stats = [
    { label: "Total Souls", value: members.count || 0, icon: Users, color: "text-blue-400" },
    { label: "Chronicle Entries", value: events.count || 0, icon: Calendar, color: "text-gold-400" },
    { label: "Original Works", value: plays.count || 0, icon: Film, color: "text-navarasa-street" },
    { label: "Legacy Minted", value: certs.count || 0, icon: Award, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-serif text-white mb-2">The Bridge</h1>
        <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
          System Overview • God Mode Active
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-white/5 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-3xl font-serif text-white mb-1 group-hover:translate-x-1 transition-transform">
              {stat.value}
            </h3>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}

      </div>

      
    </div>
  );
}