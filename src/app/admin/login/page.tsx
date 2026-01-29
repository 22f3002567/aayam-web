// // // // "use client";

// // // // import { useState } from "react";
// // // // import { motion } from "framer-motion";
// // // // import { useRouter } from "next/navigation";
// // // // import { Lock, Cpu, Fingerprint, ArrowRight, ShieldAlert } from "lucide-react";

// // // // export default function AdminLogin() {
// // // //   const [passkey, setPasskey] = useState("");
// // // //   const [status, setStatus] = useState<"idle" | "scanning" | "denied" | "granted">("idle");
// // // //   const router = useRouter();

// // // //   const handleAuth = (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     setStatus("scanning");

// // // //     // SIMULATED SECURITY CHECK
// // // //     setTimeout(() => {
// // // //       if (passkey === "AAYAM_PRIME") { // Set your secure key
// // // //         setStatus("granted");
// // // //         setTimeout(() => router.push("/admin/dashboard"), 1000);
// // // //       } else {
// // // //         setStatus("denied");
// // // //         setPasskey("");
// // // //         setTimeout(() => setStatus("idle"), 2000);
// // // //       }
// // // //     }, 1500);
// // // //   };

// // // //   return (
// // // //     <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
// // // //       {/* ATMOSPHERE: The Red Alert */}
// // // //       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1)_0%,transparent_70%)] pointer-events-none" />
// // // //       <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none animate-grain" />

// // // //       {/* THE TERMINAL WINDOW */}
// // // //       <motion.div 
// // // //         initial={{ scale: 0.9, opacity: 0 }}
// // // //         animate={{ scale: 1, opacity: 1 }}
// // // //         transition={{ duration: 0.5 }}
// // // //         className="w-full max-w-md relative z-10"
// // // //       >
// // // //         <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
// // // //           {/* Scanning Line Animation */}
// // // //           {status === "scanning" && (
// // // //             <motion.div 
// // // //               layoutId="scan-line"
// // // //               className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_20px_#ff0000]"
// // // //               animate={{ top: ["0%", "100%"] }}
// // // //               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
// // // //             />
// // // //           )}

// // // //           {/* HEADER */}
// // // //           <div className="text-center mb-10">
// // // //             <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 relative">
// // // //               <Cpu className={`w-8 h-8 transition-colors ${status === 'denied' ? 'text-red-500' : 'text-white/50'}`} />
// // // //               {status === 'granted' && (
// // // //                 <motion.div layoutId="success-ring" className="absolute inset-0 border-2 border-green-500 rounded-full" />
// // // //               )}
// // // //             </div>
// // // //             <h1 className="font-serif text-3xl text-white mb-1 tracking-tight">
// // // //               NEXUS <span className="text-red-600">CORE</span>
// // // //             </h1>
// // // //             <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
// // // //               Restricted Access • Level 5 Clearance
// // // //             </p>
// // // //           </div>

// // // //           {/* THE FORM */}
// // // //           <form onSubmit={handleAuth} className="space-y-6">
// // // //             <div className="space-y-2">
// // // //               <label className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
// // // //                 <Lock className="w-3 h-3" /> Security Passkey
// // // //               </label>
// // // //               <div className="relative group">
// // // //                 <input 
// // // //                   type="password" 
// // // //                   value={passkey}
// // // //                   onChange={(e) => setPasskey(e.target.value)}
// // // //                   className="w-full bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xl text-center text-white tracking-[0.5em] focus:outline-none focus:border-red-500/50 transition-all placeholder:text-white/5"
// // // //                   placeholder="••••••••"
// // // //                   autoFocus
// // // //                 />
// // // //                 <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none group-hover:border-white/20 transition-colors" />
// // // //               </div>
// // // //             </div>

// // // //             {/* STATUS MESSAGE */}
// // // //             <div className="h-6 flex justify-center items-center">
// // // //               {status === "scanning" && <span className="text-xs font-mono text-gold-500 animate-pulse">VERIFYING BIOMETRICS...</span>}
// // // //               {status === "denied" && <span className="text-xs font-mono text-red-500 flex items-center gap-2"><ShieldAlert className="w-3 h-3"/> ACCESS DENIED</span>}
// // // //               {status === "granted" && <span className="text-xs font-mono text-green-500">IDENTITY CONFIRMED. WELCOME, SECRETARY.</span>}
// // // //             </div>

// // // //             <button 
// // // //               disabled={status === "scanning" || status === "granted"}
// // // //               className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg text-xs hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
// // // //             >
// // // //               {status === "granted" ? "Loading System..." : "Initialize Session"}
// // // //               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // // //             </button>
// // // //           </form>

// // // //           {/* FOOTER */}
// // // //           <div className="mt-8 text-center">
// // // //             <p className="font-mono text-[9px] text-white/20">
// // // //               SECURE CONNECTION ESTABLISHED <br/>
// // // //               IP: {typeof window !== 'undefined' ? '127.0.0.1' : 'UNKNOWN'}
// // // //             </p>
// // // //           </div>

// // // //         </div>
// // // //       </motion.div>
// // // //     </main>
// // // //   );
// // // // }

// // // "use client";

// // // import { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import { useRouter } from "next/navigation";
// // // import { Lock, Cpu, ArrowRight, ShieldAlert, ScanLine } from "lucide-react";

// // // export default function AdminLogin() {
// // //   const [passkey, setPasskey] = useState("");
// // //   const [status, setStatus] = useState<"idle" | "scanning" | "denied" | "granted">("idle");
// // //   const router = useRouter();

// // //   const handleAuth = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setStatus("scanning");

// // //     // SIMULATED BIOMETRIC CHECK
// // //     setTimeout(() => {
// // //       // ⚠️ REPLACE THIS WITH REAL AUTH LOGIC LATER
// // //       if (passkey === "AAYAM_PRIME") { 
// // //         setStatus("granted");
// // //         setTimeout(() => router.push("/admin/dashboard"), 1500);
// // //       } else {
// // //         setStatus("denied");
// // //         setPasskey("");
// // //         setTimeout(() => setStatus("idle"), 2500);
// // //       }
// // //     }, 2000);
// // //   };

// // //   return (
// // //     <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
// // //       {/* 1. ATMOSPHERE: THE RED ALERT */}
// // //       {/* A subtle red pulse in the background indicating security mode */}
// // //       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none" />
      
// // //       {/* Your custom Grain Animation */}
// // //       <div className="absolute inset-0 opacity-[0.03] pointer-events-none animate-grain bg-[url('/noise.png')]" />

// // //       {/* 2. THE TERMINAL WINDOW */}
// // //       <motion.div 
// // //         initial={{ scale: 0.9, opacity: 0 }}
// // //         animate={{ scale: 1, opacity: 1 }}
// // //         transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} // Your "theater" curve
// // //         className="w-full max-w-md relative z-10"
// // //       >
// // //         <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          
// // //           {/* THE SCANNER BEAM (Using your tailwind config 'animate-scan') */}
// // //           {status === "scanning" && (
// // //             <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_20px_#ef4444] animate-scan opacity-50 z-20" />
// // //           )}

// // //           {/* HEADER */}
// // //           <div className="text-center mb-10">
// // //             <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 relative">
// // //               <Cpu className={`w-8 h-8 transition-colors duration-500 ${status === 'denied' ? 'text-navarasa-street' : 'text-white/30'}`} />
              
// // //               {/* Success Ring */}
// // //               {status === 'granted' && (
// // //                 <motion.div layoutId="success-ring" className="absolute inset-0 border-2 border-navarasa-peace rounded-full" />
// // //               )}
// // //             </div>
            
// // //             <h1 className="font-serif text-3xl text-white mb-1 tracking-tight">
// // //               NEXUS <span className="text-navarasa-street">CORE</span>
// // //             </h1>
// // //             <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
// // //               Level 5 Clearance Required
// // //             </p>
// // //           </div>

// // //           {/* THE FORM */}
// // //           <form onSubmit={handleAuth} className="space-y-6">
// // //             <div className="space-y-2">
// // //               <label className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
// // //                 <Lock className="w-3 h-3" /> Security Hash
// // //               </label>
              
// // //               <div className="relative">
// // //                 <input 
// // //                   type="password" 
// // //                   value={passkey}
// // //                   onChange={(e) => setPasskey(e.target.value)}
// // //                   className="w-full bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xl text-center text-white tracking-[0.5em] focus:outline-none focus:border-navarasa-street/50 transition-all placeholder:text-white/5 focus:ring-1 focus:ring-navarasa-street/20"
// // //                   placeholder="••••••••"
// // //                   autoFocus
// // //                 />
// // //                 <ScanLine className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
// // //               </div>
// // //             </div>

// // //             {/* STATUS MESSAGE FEEDBACK */}
// // //             <div className="h-6 flex justify-center items-center">
// // //               {status === "scanning" && (
// // //                 <span className="text-xs font-mono text-gold-500 animate-pulse-fast flex items-center gap-2">
// // //                    VERIFYING BIOMETRICS...
// // //                 </span>
// // //               )}
// // //               {status === "denied" && (
// // //                 <motion.span 
// // //                     initial={{ x: -10 }} animate={{ x: 0 }} 
// // //                     className="text-xs font-mono text-navarasa-street flex items-center gap-2"
// // //                 >
// // //                     <ShieldAlert className="w-3 h-3"/> ACCESS DENIED
// // //                 </motion.span>
// // //               )}
// // //               {status === "granted" && (
// // //                 <span className="text-xs font-mono text-navarasa-peace">
// // //                     IDENTITY CONFIRMED. WELCOME, SECRETARY.
// // //                 </span>
// // //               )}
// // //             </div>

// // //             <button 
// // //               disabled={status === "scanning" || status === "granted"}
// // //               className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg text-xs hover:bg-navarasa-street hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
// // //             >
// // //               {status === "granted" ? "Initializing..." : "Authenticate"}
// // //               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// // //             </button>
// // //           </form>

// // //           {/* FOOTER */}
// // //           <div className="mt-8 text-center border-t border-white/5 pt-4">
// // //             <p className="font-mono text-[9px] text-white/20">
// // //               SECURE CONNECTION: ENCRYPTED <br/>
// // //               SYSTEM ID: AYM-NEXUS-V1
// // //             </p>
// // //           </div>

// // //         </div>
// // //       </motion.div>
// // //     </main>
// // //   );
// // // }

// // "use client";

// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { useRouter } from "next/navigation";
// // import { Lock, Cpu, ArrowRight, ShieldAlert, ScanLine } from "lucide-react";
// // import { createClient } from "@/lib/supabase/client"; // Ensure you have a client-side supabase helper

// // export default function AdminLogin() {
// //   const [passkey, setPasskey] = useState("");
// //   const [status, setStatus] = useState<"idle" | "scanning" | "denied" | "granted">("idle");
// //   const router = useRouter();
// //   const supabase = createClient();

// //   const handleAuth = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setStatus("scanning");

// //     // --- REAL AUTHENTICATION LOGIC ---
// //     // In a real scenario, we use supabase.auth.signInWithPassword()
// //     // For now, adhering to your "GOD Mode" request, we use the Master Key logic
// //     // but wrap it in a secure-feeling delay.
    
// //     setTimeout(() => {
// //       if (passkey === "AAYAM_PRIME") { // ⚠️ CHANGE THIS TO A REAL ENV VARIABLE LATER
// //         setStatus("granted");
// //         // Set a session cookie or local storage flag here if not using full Auth
// //         document.cookie = "nexus_session=active; path=/"; 
// //         setTimeout(() => router.push("/admin/dashboard"), 1500);
// //       } else {
// //         setStatus("denied");
// //         setPasskey("");
// //         setTimeout(() => setStatus("idle"), 2500);
// //       }
// //     }, 2000);
// //   };

// //   return (
// //     <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
// //       {/* 1. ATMOSPHERE */}
// //       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none" />
// //       <div className="absolute inset-0 opacity-[0.03] pointer-events-none animate-grain bg-[url('/noise.png')]" />

// //       {/* 2. THE TERMINAL */}
// //       <motion.div 
// //         initial={{ scale: 0.9, opacity: 0 }}
// //         animate={{ scale: 1, opacity: 1 }}
// //         transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
// //         className="w-full max-w-md relative z-10"
// //       >
// //         <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          
// //           {/* THE SCANNER BEAM */}
// //           {status === "scanning" && (
// //             <div className="absolute top-0 left-0 w-full h-1 bg-navarasa-street shadow-[0_0_20px_#ef4444] animate-scan opacity-50 z-20" />
// //           )}

// //           {/* HEADER */}
// //           <div className="text-center mb-10">
// //             <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 relative">
// //               <Cpu className={`w-8 h-8 transition-colors duration-500 ${status === 'denied' ? 'text-navarasa-street' : 'text-white/30'}`} />
// //               {status === 'granted' && (
// //                 <motion.div layoutId="success-ring" className="absolute inset-0 border-2 border-navarasa-peace rounded-full" />
// //               )}
// //             </div>
            
// //             <h1 className="font-serif text-3xl text-white mb-1 tracking-tight">
// //               NEXUS <span className="text-navarasa-street">CORE</span>
// //             </h1>
// //             <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
// //               Level 5 Clearance Required
// //             </p>
// //           </div>

// //           {/* FORM */}
// //           <form onSubmit={handleAuth} className="space-y-6">
// //             <div className="space-y-2">
// //               <label className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
// //                 <Lock className="w-3 h-3" /> Security Hash
// //               </label>
// //               <div className="relative">
// //                 <input 
// //                   type="password" 
// //                   value={passkey}
// //                   onChange={(e) => setPasskey(e.target.value)}
// //                   className="w-full bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xl text-center text-white tracking-[0.5em] focus:outline-none focus:border-navarasa-street/50 transition-all placeholder:text-white/5 focus:ring-1 focus:ring-navarasa-street/20"
// //                   placeholder="••••••••"
// //                   autoFocus
// //                 />
// //                 <ScanLine className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
// //               </div>
// //             </div>

// //             {/* FEEDBACK */}
// //             <div className="h-6 flex justify-center items-center">
// //               {status === "scanning" && <span className="text-xs font-mono text-gold-500 animate-pulse-fast">VERIFYING BIOMETRICS...</span>}
// //               {status === "denied" && <span className="text-xs font-mono text-navarasa-street flex items-center gap-2"><ShieldAlert className="w-3 h-3"/> ACCESS DENIED</span>}
// //               {status === "granted" && <span className="text-xs font-mono text-navarasa-peace">IDENTITY CONFIRMED.</span>}
// //             </div>

// //             <button 
// //               disabled={status === "scanning" || status === "granted"}
// //               className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg text-xs hover:bg-navarasa-street hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
// //             >
// //               {status === "granted" ? "Initializing..." : "Authenticate"}
// //               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //             </button>
// //           </form>
// //         </div>
// //       </motion.div>
// //     </main>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { Lock, Cpu, ArrowRight, ShieldAlert, ScanLine } from "lucide-react";
// import { createClient } from "@/lib/supabase/client"; 

// export default function AdminLogin() {
//   const [passkey, setPasskey] = useState("");
//   const [status, setStatus] = useState<"idle" | "scanning" | "denied" | "granted">("idle");
//   const router = useRouter();
//   const supabase = createClient();

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("scanning");

//     // SIMULATED BIOMETRIC DELAY (The Theater of Security)
//     setTimeout(() => {
//       // ⚠️ MASTER KEY OVERRIDE (For God Mode)
//       // In production, you can replace this with supabase.auth.signInWithPassword
//       if (passkey === "AAYAM_PRIME") { 
//         setStatus("granted");
//         // --- ADD THIS LINE (THE DIGITAL KEY) ---
//         // This sets a cookie that expires in 1 day (86400 seconds)
//         document.cookie = "nexus_session=active; path=/; max-age=86400; SameSite=Strict";
//         // Set a session cookie via a Server Action or Middleware in a real app
//         // For now, we trust the client router push for the prototype
//         setTimeout(() => router.push("/admin/dashboard"), 1500);
//       } else {
//         setStatus("denied");
//         setPasskey("");
//         setTimeout(() => setStatus("idle"), 2500);
//       }
//     }, 2000);
//   };

//   return (
//     <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
//       {/* 1. ATMOSPHERE: THE RED ALERT */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none" />
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none animate-grain bg-[url('/noise.png')]" />

//       {/* 2. THE TERMINAL WINDOW */}
//       <motion.div 
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
//         className="w-full max-w-md relative z-10"
//       >
//         <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          
//           {/* THE SCANNER BEAM */}
//           {status === "scanning" && (
//             <div className="absolute top-0 left-0 w-full h-1 bg-navarasa-street shadow-[0_0_20px_#ef4444] animate-scan opacity-50 z-20" />
//           )}

//           {/* HEADER */}
//           <div className="text-center mb-10">
//             <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 relative">
//               <Cpu className={`w-8 h-8 transition-colors duration-500 ${status === 'denied' ? 'text-navarasa-street' : 'text-white/30'}`} />
              
//               {/* Success Ring */}
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

//           {/* THE FORM */}
//           <form onSubmit={handleAuth} className="space-y-6">
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

//             {/* STATUS MESSAGE FEEDBACK */}
//             <div className="h-6 flex justify-center items-center">
//               {status === "scanning" && (
//                 <span className="text-xs font-mono text-gold-500 animate-pulse-fast flex items-center gap-2">
//                    VERIFYING BIOMETRICS...
//                 </span>
//               )}
//               {status === "denied" && (
//                 <motion.span 
//                     initial={{ x: -10 }} animate={{ x: 0 }} 
//                     className="text-xs font-mono text-navarasa-street flex items-center gap-2"
//                 >
//                     <ShieldAlert className="w-3 h-3"/> ACCESS DENIED
//                 </motion.span>
//               )}
//               {status === "granted" && (
//                 <span className="text-xs font-mono text-navarasa-peace">
//                     IDENTITY CONFIRMED.
//                 </span>
//               )}
//             </div>

//             <button 
//               disabled={status === "scanning" || status === "granted"}
//               className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg text-xs hover:bg-navarasa-street hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//             >
//               {status === "granted" ? "Initializing..." : "Authenticate"}
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </form>

//           {/* FOOTER */}
//           <div className="mt-8 text-center border-t border-white/5 pt-4">
//             <p className="font-mono text-[9px] text-white/20">
//               SECURE CONNECTION: ENCRYPTED <br/>
//               SYSTEM ID: AYM-NEXUS-V1
//             </p>
//           </div>

//         </div>
//       </motion.div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Cpu, ArrowRight, ShieldAlert, ScanLine } from "lucide-react";
import { authenticateAdmin } from "../actions"; // Import the Server Action

export default function AdminLogin() {
  const [passkey, setPasskey] = useState("");
  const [status, setStatus] = useState<"idle" | "scanning" | "denied" | "granted">("idle");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("scanning");

    // Create FormData to send to the server
    const formData = new FormData();
    formData.append("passkey", passkey);

    // CALL THE SERVER ACTION (Secure Check)
    // We add a simulated delay purely for the "Cinematic Effect"
    setTimeout(async () => {
      const result = await authenticateAdmin(null, formData);

      if (result.success) {
        setStatus("granted");
        setTimeout(() => router.push("/admin/dashboard"), 1500);
      } else {
        setStatus("denied");
        setPasskey("");
        setTimeout(() => setStatus("idle"), 2500);
      }
    }, 2000); // 2s Artificial Delay for the "Scan" animation
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none animate-grain bg-[url('/noise.png')]" />

      {/* TERMINAL WINDOW */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          
          {/* SCANNER BEAM */}
          {status === "scanning" && (
            <div className="absolute top-0 left-0 w-full h-1 bg-navarasa-street shadow-[0_0_20px_#ef4444] animate-scan opacity-50 z-20" />
          )}

          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4 relative">
              <Cpu className={`w-8 h-8 transition-colors duration-500 ${status === 'denied' ? 'text-navarasa-street' : 'text-white/30'}`} />
              {status === 'granted' && (
                <motion.div layoutId="success-ring" className="absolute inset-0 border-2 border-navarasa-peace rounded-full" />
              )}
            </div>
            <h1 className="font-serif text-3xl text-white mb-1 tracking-tight">
              NEXUS <span className="text-navarasa-street">CORE</span>
            </h1>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
              Level 5 Clearance Required
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                <Lock className="w-3 h-3" /> Security Hash
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xl text-center text-white tracking-[0.5em] focus:outline-none focus:border-navarasa-street/50 transition-all placeholder:text-white/5 focus:ring-1 focus:ring-navarasa-street/20"
                  placeholder="••••••••"
                  autoFocus
                />
                <ScanLine className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10" />
              </div>
            </div>

            {/* STATUS FEEDBACK */}
            <div className="h-6 flex justify-center items-center">
              {status === "scanning" && <span className="text-xs font-mono text-gold-500 animate-pulse-fast">VERIFYING HASH...</span>}
              {status === "denied" && <span className="text-xs font-mono text-navarasa-street flex items-center gap-2"><ShieldAlert className="w-3 h-3"/> ACCESS DENIED</span>}
              {status === "granted" && <span className="text-xs font-mono text-navarasa-peace">IDENTITY CONFIRMED.</span>}
            </div>

            <button 
              disabled={status === "scanning" || status === "granted"}
              className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg text-xs hover:bg-navarasa-street hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {status === "granted" ? "Initializing..." : "Authenticate"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}