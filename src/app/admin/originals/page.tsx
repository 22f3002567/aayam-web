// import { createAdminClient } from "@/lib/supabase/admin";
// import PlayList from "@/components/admin/originals/PlayList";
// import PlayToolbar from "@/components/admin/originals/PlayToolbar";
// import { Clapperboard } from "lucide-react";

// export default async function OriginalsConsole() {
//   const supabase = createAdminClient();

//   // Fetch Plays sorted by Release Date (Newest First)
//   const { data: plays } = await supabase
//     .from('plays')
//     .select('*')
//     .order('release_date', { ascending: false });

//   return (
//     <div className="space-y-8 pb-20">
//       <div className="flex justify-between items-end border-b border-white/5 pb-6">
//         <div>
//           <h1 className="text-4xl font-serif text-white mb-2 flex items-center gap-4">
//             <Clapperboard className="w-8 h-8 text-gold-500" />
//             Originals
//           </h1>
//           <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
//             Production Control • {plays?.length || 0} Titles
//           </p>
//         </div>
//         <PlayToolbar />
//       </div>

//       <PlayList plays={plays || []} />
//     </div>
//   );
// }

import { createAdminClient } from "@/lib/supabase/admin";
import PlayList from "@/components/admin/originals/PlayList";
import PlayToolbar from "@/components/admin/originals/PlayToolbar";
import { Clapperboard } from "lucide-react";

export default async function OriginalsConsole() {
  const supabase = createAdminClient();

  // Fetch Plays sorted by Release Date (Newest First)
  const { data: plays } = await supabase
    .from('plays')
    .select('*')
    .order('release_date', { ascending: false });

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2 flex items-center gap-4">
            <Clapperboard className="w-8 h-8 text-gold-500" />
            Originals
          </h1>
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
            Production Control • {plays?.length || 0} Titles
          </p>
        </div>
        <PlayToolbar />
      </div>

      <PlayList plays={plays || []} />
    </div>
  );
}