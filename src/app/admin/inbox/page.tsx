
import { createAdminClient } from "@/lib/supabase/admin";
import InboxList from "@/components/admin/inbox/Inbox"; // Fixed Import Path
import { Inbox, Radio } from "lucide-react";
import { getSubmissions } from "./actions"; // Fixed Import Filename

export default async function InboxPage() {
  const submissions = await getSubmissions();
  
  // LOGIC: 'Unread' means status is 'pending'
  const pendingCount = submissions.filter((s: any) => s.status === 'pending').length;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2 flex items-center gap-3">
            The Receiver
            {pendingCount > 0 && (
                <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
            )}
          </h1>
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest flex items-center gap-2">
            <Radio className="w-3 h-3" /> Incoming Transmissions • <span className={pendingCount > 0 ? "text-gold-500" : "text-white/40"}>{pendingCount} Pending</span>
          </p>
        </div>
        <div className="p-3 bg-white/5 rounded-full border border-white/10 text-gold-500">
          <Inbox className="w-6 h-6" />
        </div>
      </div>

      {/* LIST */}
      <InboxList initialSubmissions={submissions} />
    </div>
  );
}