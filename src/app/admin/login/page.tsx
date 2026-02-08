
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { Lock, Cpu, ArrowRight, ShieldAlert, ScanLine } from "lucide-react";
// import { authenticateAdmin } from "../actions"; // Import the Server Action

// export default function AdminLogin() {
//   const [passkey, setPasskey] = useState("");
//   const [status, setStatus] = useState<"idle" | "scanning" | "denied" | "granted">("idle");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("scanning");

//     // Create FormData to send to the server
//     const formData = new FormData();
//     formData.append("passkey", passkey);

//     // CALL THE SERVER ACTION (Secure Check)
//     // We add a simulated delay purely for the "Cinematic Effect"
//     setTimeout(async () => {
//       const result = await authenticateAdmin(null, formData);

//       if (result.success) {
//         setStatus("granted");
//         setTimeout(() => router.push("/admin/dashboard"), 1500);
//       } else {
//         setStatus("denied");
//         setPasskey("");
//         setTimeout(() => setStatus("idle"), 2500);
//       }
//     }, 2000); // 2s Artificial Delay for the "Scan" animation
//   };

//   return (
//     <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
//       {/* ATMOSPHERE */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none" />
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none animate-grain bg-[url('/noise.png')]" />

//       {/* TERMINAL WINDOW */}
//       <motion.div 
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
//         className="w-full max-w-md relative z-10"
//       >
//         <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          
//           {/* SCANNER BEAM */}
//           {status === "scanning" && (
//             <div className="absolute top-0 left-0 w-full h-1 bg-navarasa-street shadow-[0_0_20px_#ef4444] animate-scan opacity-50 z-20" />
//           )}

//           {/* HEADER */}
//           <div className="text-center mb-10">
//             <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 relative">
//               <Cpu className={`w-8 h-8 transition-colors duration-500 ${status === 'denied' ? 'text-navarasa-street' : 'text-white/30'}`} />
//               {status === 'granted' && (
//                 <motion.div layoutId="success-ring" className="absolute inset-0 border-2 border-navarasa-peace rounded-full" />
//               )}
//             </div>
//             <h1 className="font-serif text-3xl text-white mb-1 tracking-tight">
//               NEXUS <span className="text-navarasa-street">CORE</span>
//             </h1>
//             <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
//               Level 5 Clearance Required
//             </p>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
//                 <Lock className="w-3 h-3" /> Security Hash
//               </label>
//               <div className="relative">
//                 <input 
//                   type="password" 
//                   value={passkey}
//                   onChange={(e) => setPasskey(e.target.value)}
//                   className="w-full bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xl text-center text-white tracking-[0.5em] focus:outline-none focus:border-navarasa-street/50 transition-all placeholder:text-white/5 focus:ring-1 focus:ring-navarasa-street/20"
//                   placeholder="••••••••"
//                   autoFocus
//                 />
//                 <ScanLine className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
//               </div>
//             </div>

//             {/* STATUS FEEDBACK */}
//             <div className="h-6 flex justify-center items-center">
//               {status === "scanning" && <span className="text-xs font-mono text-gold-500 animate-pulse-fast">VERIFYING HASH...</span>}
//               {status === "denied" && <span className="text-xs font-mono text-navarasa-street flex items-center gap-2"><ShieldAlert className="w-3 h-3"/> ACCESS DENIED</span>}
//               {status === "granted" && <span className="text-xs font-mono text-navarasa-peace">IDENTITY CONFIRMED.</span>}
//             </div>

//             <button 
//               disabled={status === "scanning" || status === "granted"}
//               className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg text-xs hover:bg-navarasa-street hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//             >
//               {status === "granted" ? "Initializing..." : "Authenticate"}
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Cpu, ArrowRight, ScanLine, Fingerprint } from "lucide-react";
import { loginWithGoogle } from "../actions";

export default function AdminLogin() {
  const [status, setStatus] = useState<"idle" | "scanning" | "redirecting">("idle");

  const handleLogin = async () => {
    // 1. START THE THEATER
    setStatus("scanning");

    // 2. ARTIFICIAL DELAY (For the "Scanning" effect)
    setTimeout(async () => {
      setStatus("redirecting");
      
      // 3. EXECUTE PROTOCOL (Redirect to Google)
      await loginWithGoogle();
    }, 2000); // 2 seconds of scanning drama
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* --- ATMOSPHERE --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none animate-grain bg-[url('/noise.png')]" />

      {/* --- TERMINAL WINDOW --- */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          
          {/* --- SCANNER BEAM (The Cool Part) --- */}
          {status === "scanning" && (
            <motion.div 
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] opacity-50 z-20" 
            />
          )}

          {/* --- HEADER --- */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
              {/* Icon Change based on State */}
              {status === "idle" && <Cpu className="w-8 h-8 text-white/30" />}
              {status === "scanning" && <ScanLine className="w-8 h-8 text-blue-500 animate-pulse" />}
              {status === "redirecting" && <Lock className="w-8 h-8 text-green-500" />}

              {/* Success Ring */}
              {status === "redirecting" && (
                <motion.div layoutId="ring" className="absolute inset-0 border-2 border-green-500 rounded-full" />
              )}
            </div>
            
            <h1 className="font-serif text-3xl text-white mb-1 tracking-tight">
              NEXUS <span className="text-blue-500">CORE</span>
            </h1>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
              Level 5 Biometric Auth
            </p>
          </div>

          {/* --- INTERFACE --- */}
          <div className="space-y-6">
            
            {/* Status Display */}
            <div className="h-12 flex justify-center items-center">
                {status === "idle" && (
                   <div className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <Fingerprint className="w-4 h-4" /> Awaiting Input
                   </div>
                )}
                {status === "scanning" && (
                  <span className="text-xs font-mono text-blue-400 animate-pulse tracking-widest">
                     VERIFYING BIOMETRICS...
                  </span>
                )}
                {status === "redirecting" && (
                  <span className="text-xs font-mono text-green-500 tracking-widest">
                     IDENTITY CONFIRMED. REDIRECTING...
                  </span>
                )}
            </div>

            {/* THE BUTTON */}
            <button 
              onClick={handleLogin}
              disabled={status !== "idle"}
              className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg text-xs hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-2">
                 {status === "scanning" ? "Processing..." : "Initiate Sequence"}
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              
              {/* Button Hover Glow */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-600/10 transition-colors" />
            </button>
            
          </div>

          {/* --- FOOTER --- */}
          <div className="mt-8 text-center border-t border-white/5 pt-4">
            <p className="font-mono text-[9px] text-white/20">
              SECURE CONNECTION: TLS 1.3 <br/>
              SYSTEM ID: AYM-NEXUS-V1
            </p>
          </div>

        </div>
      </motion.div>
    </main>
  );
}