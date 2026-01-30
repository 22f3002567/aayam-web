// "use client";

// import { Clock, Archive } from "lucide-react";

// export default function SignalHistory({ history }: { history: any[] }) {
//   if (!history?.length) return null;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <div className="h-px flex-1 bg-white/5" />
//         <span className="text-[10px] font-mono uppercase text-white/30 tracking-widest">Transmission Logs</span>
//         <div className="h-px flex-1 bg-white/5" />
//       </div>

//       <div className="grid gap-4 opacity-60 hover:opacity-100 transition-opacity">
//         {history.map((signal) => (
//           <div key={signal.id} className="flex items-center justify-between p-4 border border-white/5 rounded-lg bg-black/40 hover:border-white/20 transition-all">
//              <div>
//                 <h4 className="text-white/60 font-serif">{signal.theme}</h4>
//                 <div className="flex gap-4 mt-1">
//                    <span className="text-[9px] font-mono uppercase text-white/30 flex items-center gap-1">
//                       <Archive className="w-3 h-3" /> {signal.status}
//                    </span>
//                    <span className="text-[9px] font-mono uppercase text-white/30 flex items-center gap-1">
//                       <Clock className="w-3 h-3" /> Ends: {new Date(signal.deadline).toLocaleDateString()}
//                    </span>
//                 </div>
//              </div>
//              <span className="text-[9px] font-mono text-white/20">{signal.slug}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { Clock, Archive } from "lucide-react";

export default function SignalHistory({ history }: { history: any[] }) {
  if (!history?.length) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/5" />
        <span className="text-[10px] font-mono uppercase text-white/30 tracking-widest">Transmission Logs</span>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      <div className="grid gap-4 opacity-60 hover:opacity-100 transition-opacity">
        {history.map((signal) => (
          <div key={signal.id} className="flex items-center justify-between p-4 border border-white/5 rounded-lg bg-black/40 hover:border-white/20 transition-all">
             <div>
                <h4 className="text-white/60 font-serif">{signal.theme}</h4>
                <div className="flex gap-4 mt-1">
                   <span className="text-[9px] font-mono uppercase text-white/30 flex items-center gap-1">
                      <Archive className="w-3 h-3" /> {signal.status}
                   </span>
                   <span className="text-[9px] font-mono uppercase text-white/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Ends: {new Date(signal.deadline).toLocaleDateString()}
                   </span>
                </div>
             </div>
             <span className="text-[9px] font-mono text-white/20">{signal.slug}</span>
          </div>
        ))}
      </div>
    </div>
  );
}