
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { logoutAdmin } from "@/app/admin/actions";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, // Bridge
  Award,           // Forge
  Calendar,        // Chronicle
  Users,           // Roster
  LogOut, 
  FileText, 
  Activity 
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Bridge", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Chronicle", path: "/admin/events", icon: Calendar },   
  { label: "Originals", path: "/admin/plays", icon: FileText },    
  { label: "Roster", path: "/admin/members", icon: Users },        
  { label: "The Forge", path: "/admin/forge", icon: Award },       
  { label: "Signals", path: "/admin/challenges", icon: Activity }, 
];

export default function NexusLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans selection:bg-navarasa-street/30">
      
      {/* SIDEBAR: THE CONTROL PANEL */}
      <aside className="w-72 border-r border-white/5 bg-[#080808] hidden md:flex flex-col fixed inset-y-0 left-0 z-50">
        
        {/* HEADER */}
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-navarasa-street/10 rounded-lg flex items-center justify-center border border-navarasa-street/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              <span className="font-serif font-bold text-navarasa-street text-xl">N</span>
            </div>
            <div>
              <h2 className="font-serif text-xl tracking-tight text-white">NEXUS</h2>
              <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-navarasa-peace rounded-full animate-pulse"/> Online
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? "bg-white/5 text-white border border-white/10 shadow-lg" 
                    : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"}
                `}
              >
                <item.icon className={`w-4 h-4 transition-colors ${isActive ? "text-navarasa-street" : "group-hover:text-white"}`} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
                
                {isActive && (
                    <div className="ml-auto">
                        <div className="w-1 h-1 bg-navarasa-street rounded-full shadow-[0_0_8px_#ef4444]" />
                    </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-6 border-t border-white/5">
          <form action={logoutAdmin}>
            <button 
              type="submit"
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-white/30 hover:text-navarasa-street transition-colors rounded-lg hover:bg-navarasa-street/5 group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Terminate Session</span>
            </button>
          </form>
        </div>

      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 md:ml-72 p-8 md:p-12 relative overflow-y-auto">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
            {children}
        </div>
      </main>

    </div>
  );
}