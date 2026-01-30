// // // // // // "use client";

// // // // // // import { useState } from "react";
// // // // // // import { RadioTower, PowerOff, Zap, Activity, Clock, AlertTriangle } from "lucide-react";
// // // // // // import { broadcastSignal, killSignal } from "@/app/admin/signals/actions";

// // // // // // export default function SignalConsole({ activeSignal }: { activeSignal: any }) {
// // // // // //   const [isTransmitting, setIsTransmitting] = useState(false);

// // // // // //   const handleBroadcast = async (e: React.FormEvent<HTMLFormElement>) => {
// // // // // //     e.preventDefault();
// // // // // //     setIsTransmitting(true);
    
// // // // // //     const formData = new FormData(e.currentTarget);
// // // // // //     const result = await broadcastSignal(formData);
    
// // // // // //     setIsTransmitting(false);
    
// // // // // //     if (!result.success) {
// // // // // //         alert(result.error);
// // // // // //     } else {
// // // // // //       // Success: Reset the form
// // // // // //       (e.target as HTMLFormElement).reset();
// // // // // //     }
// // // // // //   };

// // // // // //   const handleKill = async () => {
// // // // // //     if(!activeSignal) return;
// // // // // //     const confirmed = confirm("WARNING: This will sever the connection immediately. Participants will no longer be able to submit. Proceed?");
// // // // // //     if(confirmed) {
// // // // // //         await killSignal(activeSignal.id);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="space-y-12">
      
// // // // // //       {/* 1. THE MONITOR (Active State) */}
// // // // // //       <div className={`relative overflow-hidden p-8 rounded-2xl border transition-all duration-700 ${activeSignal ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_60px_rgba(220,38,38,0.15)]' : 'bg-[#0a0a0a] border-white/10'}`}>
         
// // // // // //          {/* Grain Overlay */}
// // // // // //          {activeSignal && (
// // // // // //              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-grain pointer-events-none mix-blend-overlay" />
// // // // // //          )}

// // // // // //          {activeSignal ? (
// // // // // //             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
// // // // // //                <div className="flex-1">
// // // // // //                   <div className="flex items-center gap-4 mb-6">
// // // // // //                      <span className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono text-[10px] uppercase tracking-widest animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.2)]">
// // // // // //                         <span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_currentColor]" /> Live Broadcast
// // // // // //                      </span>
// // // // // //                      <span className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
// // // // // //                         <Clock className="w-3 h-3" /> Ends: {new Date(activeSignal.deadline).toLocaleString()}
// // // // // //                      </span>
// // // // // //                   </div>
                  
// // // // // //                   <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight drop-shadow-lg">{activeSignal.theme}</h2>
                  
// // // // // //                   <div className="relative pl-6 border-l-2 border-red-500/30">
// // // // // //                       <p className="text-red-100/70 text-sm md:text-base leading-relaxed italic">
// // // // // //                         "{activeSignal.brief}"
// // // // // //                       </p>
// // // // // //                   </div>
// // // // // //                </div>
               
// // // // // //                {/* Kill Switch */}
// // // // // //                <button onClick={handleKill} className="group flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg hover:shadow-red-900/40">
// // // // // //                   <PowerOff className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
// // // // // //                   <span className="text-xs font-mono uppercase tracking-widest font-bold">Kill Signal</span>
// // // // // //                </button>
// // // // // //             </div>
// // // // // //          ) : (
// // // // // //             // Silent State
// // // // // //             <div className="text-center py-16 flex flex-col items-center gap-6">
// // // // // //                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
// // // // // //                     <RadioTower className="w-10 h-10 text-white/20" />
// // // // // //                </div>
// // // // // //                <div>
// // // // // //                    <h3 className="text-white/40 font-serif text-2xl mb-2">Silence on all frequencies</h3>
// // // // // //                    <p className="font-mono text-xs text-white/20 uppercase tracking-widest">Waiting for transmission...</p>
// // // // // //                </div>
// // // // // //             </div>
// // // // // //          )}
// // // // // //       </div>

// // // // // //       {/* 2. THE TRANSMITTER (Form) */}
// // // // // //       <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative group">
// // // // // //          {/* Decoration Line */}
// // // // // //          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         
// // // // // //          <div className="p-8 border-b border-white/5 bg-white/[0.02]">
// // // // // //             <h3 className="text-xl font-serif text-white flex items-center gap-3">
// // // // // //                 <Activity className="w-5 h-5 text-gold-500" />
// // // // // //                 Initialize Broadcast
// // // // // //             </h3>
// // // // // //          </div>
         
// // // // // //          <form onSubmit={handleBroadcast} className="p-8 space-y-8">
// // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // // //                <div className="space-y-3">
// // // // // //                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
// // // // // //                       Target Frequency (Theme)
// // // // // //                   </label>
// // // // // //                   <input name="theme" required placeholder="e.g. ECHOES IN THE DARK" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-gold-500 focus:outline-none transition-all font-serif text-lg tracking-wide" />
// // // // // //                </div>
// // // // // //                <div className="space-y-3">
// // // // // //                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
// // // // // //                       Transmission Cutoff (Deadline)
// // // // // //                   </label>
// // // // // //                   <input name="deadline" type="datetime-local" required className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 focus:outline-none transition-all font-mono" />
// // // // // //                </div>
// // // // // //             </div>
            
// // // // // //             <div className="space-y-3">
// // // // // //                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
// // // // // //                    Directive (Brief)
// // // // // //                </label>
// // // // // //                <textarea name="brief" required rows={4} placeholder="Detailed instructions for the society..." className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 focus:outline-none transition-all resize-none leading-relaxed" />
// // // // // //             </div>

// // // // // //             <div className="pt-4 flex justify-end">
// // // // // //                 <button disabled={isTransmitting} className="w-full md:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gold-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]">
// // // // // //                    {isTransmitting ? (
// // // // // //                        <span className="animate-pulse flex items-center gap-2">
// // // // // //                           <Zap className="w-4 h-4" /> Modulating...
// // // // // //                        </span>
// // // // // //                    ) : (
// // // // // //                        <>
// // // // // //                         <Zap className="w-4 h-4 fill-current" /> Transmit Signal
// // // // // //                        </>
// // // // // //                    )}
// // // // // //                 </button>
// // // // // //             </div>
// // // // // //          </form>
// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { useState } from "react";
// // // // // import { RadioTower, PowerOff, Zap, Activity, Clock } from "lucide-react";
// // // // // import { broadcastSignal, killSignal } from "@/app/admin/challenges/actions"; // Correct Import

// // // // // export default function SignalConsole({ activeSignal }: { activeSignal: any }) {
// // // // //   const [isTransmitting, setIsTransmitting] = useState(false);

// // // // //   const handleBroadcast = async (e: React.FormEvent<HTMLFormElement>) => {
// // // // //     e.preventDefault();
// // // // //     setIsTransmitting(true);
    
// // // // //     const formData = new FormData(e.currentTarget);
// // // // //     const result = await broadcastSignal(formData);
    
// // // // //     setIsTransmitting(false);
    
// // // // //     if (!result.success) {
// // // // //         alert(result.error);
// // // // //     } else {
// // // // //       (e.target as HTMLFormElement).reset();
// // // // //     }
// // // // //   };

// // // // //   const handleKill = async () => {
// // // // //     if(!activeSignal) return;
// // // // //     if(confirm("WARNING: This will sever the connection immediately. Proceed?")) {
// // // // //         await killSignal(activeSignal.id);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-12">
      
// // // // //       {/* 1. MONITOR */}
// // // // //       <div className={`relative overflow-hidden p-8 rounded-2xl border transition-all duration-700 ${activeSignal ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_60px_rgba(220,38,38,0.15)]' : 'bg-[#0a0a0a] border-white/10'}`}>
         
// // // // //          {activeSignal && <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-grain pointer-events-none mix-blend-overlay" />}

// // // // //          {activeSignal ? (
// // // // //             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
// // // // //                <div className="flex-1">
// // // // //                   <div className="flex items-center gap-4 mb-6">
// // // // //                      <span className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
// // // // //                         <span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_currentColor]" /> Live Broadcast
// // // // //                      </span>
// // // // //                      <span className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
// // // // //                         <Clock className="w-3 h-3" /> Ends: {new Date(activeSignal.deadline).toLocaleString()}
// // // // //                      </span>
// // // // //                   </div>
// // // // //                   <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight drop-shadow-lg">{activeSignal.theme}</h2>
// // // // //                   <div className="relative pl-6 border-l-2 border-red-500/30">
// // // // //                       <p className="text-red-100/70 text-sm md:text-base leading-relaxed italic">"{activeSignal.brief}"</p>
// // // // //                   </div>
// // // // //                </div>
// // // // //                <button onClick={handleKill} className="group flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg hover:shadow-red-900/40">
// // // // //                   <PowerOff className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
// // // // //                   <span className="text-xs font-mono uppercase tracking-widest font-bold">Kill Signal</span>
// // // // //                </button>
// // // // //             </div>
// // // // //          ) : (
// // // // //             <div className="text-center py-16 flex flex-col items-center gap-6">
// // // // //                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
// // // // //                     <RadioTower className="w-10 h-10 text-white/20" />
// // // // //                </div>
// // // // //                <div>
// // // // //                    <h3 className="text-white/40 font-serif text-2xl mb-2">Silence on all frequencies</h3>
// // // // //                    <p className="font-mono text-xs text-white/20 uppercase tracking-widest">Waiting for transmission...</p>
// // // // //                </div>
// // // // //             </div>
// // // // //          )}
// // // // //       </div>

// // // // //       {/* 2. TRANSMITTER */}
// // // // //       <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative group">
// // // // //          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         
// // // // //          <div className="p-8 border-b border-white/5 bg-white/[0.02]">
// // // // //             <h3 className="text-xl font-serif text-white flex items-center gap-3">
// // // // //                 <Activity className="w-5 h-5 text-gold-500" />
// // // // //                 Initialize Broadcast
// // // // //             </h3>
// // // // //          </div>
         
// // // // //          <form onSubmit={handleBroadcast} className="p-8 space-y-8">
// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // //                <div className="space-y-3">
// // // // //                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">Target Frequency (Theme)</label>
// // // // //                   <input name="theme" required placeholder="e.g. ECHOES IN THE DARK" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-gold-500 focus:outline-none transition-all font-serif text-lg tracking-wide" />
// // // // //                </div>
// // // // //                <div className="space-y-3">
// // // // //                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">Transmission Cutoff (Deadline)</label>
// // // // //                   <input name="deadline" type="datetime-local" required className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 focus:outline-none transition-all font-mono" />
// // // // //                </div>
// // // // //             </div>
            
// // // // //             <div className="space-y-3">
// // // // //                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">Directive (Brief)</label>
// // // // //                <textarea name="brief" required rows={4} placeholder="Detailed instructions..." className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 focus:outline-none transition-all resize-none leading-relaxed" />
// // // // //             </div>

// // // // //             <div className="pt-4 flex justify-end">
// // // // //                 <button disabled={isTransmitting} className="w-full md:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gold-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]">
// // // // //                    {isTransmitting ? (
// // // // //                        <span className="animate-pulse flex items-center gap-2"><Zap className="w-4 h-4" /> Modulating...</span>
// // // // //                    ) : (
// // // // //                        <><Zap className="w-4 h-4 fill-current" /> Transmit Signal</>
// // // // //                    )}
// // // // //                 </button>
// // // // //             </div>
// // // // //          </form>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useState } from "react";
// // // // import { RadioTower, PowerOff, Zap, Activity, Clock, Edit2, Save, X } from "lucide-react";
// // // // import { broadcastSignal, killSignal, updateSignal } from "@/app/admin/challenges/actions";

// // // // export default function SignalConsole({ activeSignal }: { activeSignal: any }) {
// // // //   const [isTransmitting, setIsTransmitting] = useState(false);
// // // //   const [isEditing, setIsEditing] = useState(false); // <--- EDIT STATE

// // // //   // 1. HANDLE BROADCAST (NEW)
// // // //   const handleBroadcast = async (e: React.FormEvent<HTMLFormElement>) => {
// // // //     e.preventDefault();
// // // //     setIsTransmitting(true);
// // // //     const result = await broadcastSignal(new FormData(e.currentTarget));
// // // //     setIsTransmitting(false);
// // // //     if (!result.success) alert(result.error);
// // // //     else (e.target as HTMLFormElement).reset();
// // // //   };

// // // //   // 2. HANDLE UPDATE (EDIT)
// // // //   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
// // // //     e.preventDefault();
// // // //     setIsTransmitting(true);
// // // //     const result = await updateSignal(new FormData(e.currentTarget));
// // // //     setIsTransmitting(false);
// // // //     if (!result.success) alert(result.error);
// // // //     else setIsEditing(false);
// // // //   };

// // // //   // 3. HANDLE KILL
// // // //   const handleKill = async () => {
// // // //     if(!activeSignal) return;
// // // //     if(confirm("WARNING: Kill Signal?")) await killSignal(activeSignal.id);
// // // //   };

// // // //   return (
// // // //     <div className="space-y-12">
      
// // // //       {/* --- A. THE MONITOR (Active Signal) --- */}
// // // //       <div className={`relative overflow-hidden p-8 rounded-2xl border transition-all duration-700 ${activeSignal ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_60px_rgba(220,38,38,0.15)]' : 'bg-[#0a0a0a] border-white/10'}`}>
// // // //          {activeSignal && <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-grain pointer-events-none mix-blend-overlay" />}

// // // //          {activeSignal ? (
// // // //             <div className="relative z-10">
// // // //                {/* EDIT MODE */}
// // // //                {isEditing ? (
// // // //                  <form onSubmit={handleUpdate} className="space-y-6">
// // // //                     <input type="hidden" name="id" value={activeSignal.id} />
// // // //                     <div className="flex justify-between items-center mb-4">
// // // //                         <span className="text-red-500 font-mono text-xs uppercase tracking-widest animate-pulse">● Live Signal Patching</span>
// // // //                         <button type="button" onClick={() => setIsEditing(false)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// // // //                     </div>
// // // //                     <div className="grid md:grid-cols-2 gap-6">
// // // //                         <input name="theme" defaultValue={activeSignal.theme} className="bg-black/50 border border-red-500/30 rounded p-3 text-2xl font-serif text-white w-full" />
// // // //                         <input name="deadline" type="datetime-local" defaultValue={new Date(activeSignal.deadline).toISOString().slice(0, 16)} className="bg-black/50 border border-red-500/30 rounded p-3 text-white font-mono w-full" />
// // // //                     </div>
// // // //                     <textarea name="brief" defaultValue={activeSignal.brief} rows={3} className="bg-black/50 border border-red-500/30 rounded p-3 text-white w-full resize-none" />
// // // //                     <button disabled={isTransmitting} className="px-6 py-3 bg-red-500 text-white font-bold uppercase text-xs rounded flex items-center gap-2 hover:bg-red-600">
// // // //                         <Save className="w-4 h-4" /> {isTransmitting ? "Patching..." : "Commit Hotfix"}
// // // //                     </button>
// // // //                  </form>
// // // //                ) : (
// // // //                  /* DISPLAY MODE */
// // // //                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
// // // //                     <div className="flex-1">
// // // //                         <div className="flex items-center gap-4 mb-6">
// // // //                             <span className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
// // // //                                 <span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_currentColor]" /> Live Broadcast
// // // //                             </span>
// // // //                             <span className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
// // // //                                 <Clock className="w-3 h-3" /> Ends: {new Date(activeSignal.deadline).toLocaleString()}
// // // //                             </span>
// // // //                         </div>
// // // //                         <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight drop-shadow-lg">{activeSignal.theme}</h2>
// // // //                         <div className="relative pl-6 border-l-2 border-red-500/30">
// // // //                             <p className="text-red-100/70 text-sm md:text-base leading-relaxed italic">"{activeSignal.brief}"</p>
// // // //                         </div>
// // // //                     </div>
// // // //                     <div className="flex flex-col gap-3">
// // // //                         <button onClick={() => setIsEditing(true)} className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
// // // //                             <Edit2 className="w-4 h-4" /> <span className="text-xs font-mono uppercase">Edit</span>
// // // //                         </button>
// // // //                         <button onClick={handleKill} className="px-6 py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg">
// // // //                             <PowerOff className="w-4 h-4" /> <span className="text-xs font-mono uppercase font-bold">Kill</span>
// // // //                         </button>
// // // //                     </div>
// // // //                  </div>
// // // //                )}
// // // //             </div>
// // // //          ) : (
// // // //             /* SILENCE STATE */
// // // //             <div className="text-center py-16 flex flex-col items-center gap-6">
// // // //                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
// // // //                     <RadioTower className="w-10 h-10 text-white/20" />
// // // //                </div>
// // // //                <div>
// // // //                    <h3 className="text-white/40 font-serif text-2xl mb-2">Silence on all frequencies</h3>
// // // //                    <p className="font-mono text-xs text-white/20 uppercase tracking-widest">Waiting for transmission...</p>
// // // //                </div>
// // // //             </div>
// // // //          )}
// // // //       </div>

// // // //       {/* --- B. THE TRANSMITTER (New Broadcast) --- */}
// // // //       <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative group">
// // // //          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
// // // //          <div className="p-8 border-b border-white/5 bg-white/[0.02]">
// // // //             <h3 className="text-xl font-serif text-white flex items-center gap-3">
// // // //                 <Activity className="w-5 h-5 text-gold-500" /> Initialize Broadcast
// // // //             </h3>
// // // //          </div>
// // // //          <form onSubmit={handleBroadcast} className="p-8 space-y-8">
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // //                <div className="space-y-3">
// // // //                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Target Frequency (Theme)</label>
// // // //                   <input name="theme" required placeholder="e.g. ECHOES IN THE DARK" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 outline-none transition-all font-serif text-lg" />
// // // //                </div>
// // // //                <div className="space-y-3">
// // // //                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Cutoff (Deadline)</label>
// // // //                   <input name="deadline" type="datetime-local" required className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 outline-none transition-all font-mono" />
// // // //                </div>
// // // //             </div>
// // // //             <div className="space-y-3">
// // // //                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Directive (Brief)</label>
// // // //                <textarea name="brief" required rows={4} placeholder="Detailed instructions..." className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 outline-none transition-all resize-none" />
// // // //             </div>
// // // //             <div className="pt-4 flex justify-end">
// // // //                 <button disabled={isTransmitting} className="w-full md:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gold-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
// // // //                    {isTransmitting ? <span className="animate-pulse">Modulating...</span> : <><Zap className="w-4 h-4 fill-current" /> Transmit Signal</>}
// // // //                 </button>
// // // //             </div>
// // // //          </form>
// // // //       </div>

// // // //     </div>
// // // //   );
// // // // }

// // // "use server";

// // // import { createAdminClient } from "@/lib/supabase/admin";
// // // import { revalidatePath } from "next/cache";

// // // // --- 1. INTELLIGENCE (Slug Generator) ---
// // // async function generateUniqueSlug(supabase: any, theme: string) {
// // //   let baseSlug = theme.toLowerCase()
// // //     .replace(/[^a-z0-9]+/g, '-')
// // //     .replace(/(^-|-$)+/g, '');
// // //   const yearSlug = `${baseSlug}-${new Date().getFullYear()}`;
  
// // //   const { data } = await supabase.from('challenges').select('slug').eq('slug', yearSlug).maybeSingle();
// // //   return data ? `${yearSlug}-${Date.now()}` : yearSlug;
// // // }

// // // // --- 2. BROADCAST (New Signal) ---
// // // export async function broadcastSignal(formData: FormData) {
// // //   const supabase = createAdminClient();
// // //   const theme = formData.get("theme") as string;
// // //   const brief = formData.get("brief") as string;
// // //   const deadlineStr = formData.get("deadline") as string;

// // //   if (!theme || !brief || !deadlineStr) return { success: false, error: "Missing Frequency Data." };
  
// // //   const deadline = new Date(deadlineStr);
// // //   if (deadline < new Date()) return { success: false, error: "Cannot broadcast to the past." };

// // //   try {
// // //     // A. Archive Active
// // //     const { data: current } = await supabase.from("challenges").select("id").eq("status", "active").maybeSingle();
// // //     if (current) {
// // //         await supabase.from("challenges").update({ status: "archived" }).eq("id", current.id);
// // //     }

// // //     // B. Create New
// // //     const slug = await generateUniqueSlug(supabase, theme);
// // //     const { data: newSignal, error } = await supabase.from("challenges").insert({
// // //       theme, slug, brief, deadline: deadline.toISOString(), status: "active"
// // //     }).select().single();

// // //     if (error) throw error;

// // //     // C. Audit
// // //     await supabase.from("audit_logs").insert({
// // //         action: "BROADCAST", target_table: "challenges", target_id: newSignal.id,
// // //         details: `Signal Live: ${theme}`, admin_email: "GOD_MODE_ADMIN"
// // //     });

// // //     revalidatePath("/admin/challenges");
// // //     return { success: true };
// // //   } catch (err: any) {
// // //     return { success: false, error: err.message };
// // //   }
// // // }

// // // // --- 3. HOTFIX (Update Active Signal) --- <--- NEW SUPERPOWER
// // // export async function updateSignal(formData: FormData) {
// // //   const supabase = createAdminClient();
// // //   const id = formData.get("id") as string;
// // //   const theme = formData.get("theme") as string;
// // //   const brief = formData.get("brief") as string;
// // //   const deadlineStr = formData.get("deadline") as string;

// // //   try {
// // //     const { error } = await supabase.from("challenges").update({
// // //       theme, brief, deadline: new Date(deadlineStr).toISOString()
// // //     }).eq("id", id);

// // //     if (error) throw error;

// // //     await supabase.from("audit_logs").insert({
// // //         action: "UPDATE_SIGNAL", target_table: "challenges", target_id: id,
// // //         details: `Hotfix applied to: ${theme}`, admin_email: "GOD_MODE_ADMIN"
// // //     });

// // //     revalidatePath("/admin/challenges");
// // //     return { success: true };
// // //   } catch (err: any) {
// // //     return { success: false, error: err.message };
// // //   }
// // // }

// // // // --- 4. KILL SWITCH ---
// // // export async function killSignal(id: string) {
// // //   const supabase = createAdminClient();
// // //   try {
// // //     await supabase.from("challenges").update({ status: "closed" }).eq("id", id);
    
// // //     await supabase.from("audit_logs").insert({
// // //         action: "KILL_SIGNAL", target_table: "challenges", target_id: id,
// // //         details: "Emergency Cutoff.", admin_email: "GOD_MODE_ADMIN"
// // //     });

// // //     revalidatePath("/admin/challenges");
// // //     return { success: true };
// // //   } catch (err: any) {
// // //     return { success: false, error: err.message };
// // //   }
// // // }

// // "use client";

// // import { useEffect, useState } from "react";
// // import { RadioTower, PowerOff, Zap, Activity, Clock, Edit2, Save, X } from "lucide-react";
// // import { broadcastSignal, killSignal, updateSignal } from "@/app/admin/challenges/actions";
// // import { LayoutTemplate, FileText, Video, Mic2, PenTool, Link as LinkIcon, Globe } from "lucide-react"; // Icons
// // import React from "react";
// // import { toast } from "sonner" 
// // export default function SignalConsole({ activeSignal }: { activeSignal: any }) {
// //   const [isTransmitting, setIsTransmitting] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [selectedType, setSelectedType] = useState<string>(activeSignal?.form_type || "general");
// //   const [editType, setEditType] = useState('general');

// //   useEffect(() => {
// //     if(activeSignal) {
// //         // setSelectedType(activeSignal.form_type || "general");
// //         setEditType(activeSignal.form_type || "general");
// //     }
// //     }, [activeSignal, isEditing]);
// //   // 1. BROADCAST
// //   const handleBroadcast = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsTransmitting(true);
// //     const result = await broadcastSignal(new FormData(e.currentTarget));
// //     setIsTransmitting(false);
// //     if (!result.success) 
// //         toast.error(result.error);
// //     else toast.success("Signal Broadcasted Successfully!");
// //     (e.target as HTMLFormElement).reset();
// //   };

// //   // 2. UPDATE (HOTFIX)
// //   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsTransmitting(true);
// //     const result = await updateSignal(new FormData(e.currentTarget));
// //     setIsTransmitting(false);
// //     if (!result.success)
// //         toast.error(result.error);
// //     else {
// //         toast.success("Signal Updated Successfully!");
// //         setIsEditing(false);
// //     }
// //   };

// //   // 3. KILL
// //   const handleKill = async () => {
// //     if(!activeSignal) return;
// //     if(confirm("WARNING: Are you sure you want to kill the live signal?")) await killSignal(activeSignal.id);
// //   };

// //   return (
// //     <div className="space-y-12">
      
// //       {/* --- MONITOR SECTION --- */}
// //       <div className={`relative overflow-hidden p-8 rounded-2xl border transition-all duration-700 ${activeSignal ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_60px_rgba(220,38,38,0.15)]' : 'bg-[#0a0a0a] border-white/10'}`}>
// //          {activeSignal && <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-grain pointer-events-none mix-blend-overlay" />}

// //          {activeSignal ? (
// //             <div className="relative z-10">
// //                {isEditing ? (
// //                  <form onSubmit={handleUpdate} className="space-y-6">
// //                     <input type="hidden" name="id" value={activeSignal.id} />
// //                     <div className="flex justify-between items-center mb-4">
// //                         <span className="text-red-500 font-mono text-xs uppercase tracking-widest animate-pulse">● Live Signal Patching</span>
// //                         <button type="button" onClick={() => setIsEditing(false)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
// //                     </div>
// //                     <div className="grid md:grid-cols-2 gap-6">
// //                         <input name="theme" defaultValue={activeSignal.theme} className="bg-black/50 border border-red-500/30 rounded p-3 text-2xl font-serif text-white w-full" />
// //                         <input name="deadline" type="datetime-local" defaultValue={new Date(activeSignal.deadline).toISOString().slice(0, 16)} className="bg-black/50 border border-red-500/30 rounded p-3 text-white font-mono w-full" />
// //                     </div>
// //                     <textarea name="brief" defaultValue={activeSignal.brief} rows={3} className="bg-black/50 border border-red-500/30 rounded p-3 text-white w-full resize-none" />
// //                     <button disabled={isTransmitting} className="px-6 py-3 bg-red-500 text-white font-bold uppercase text-xs rounded flex items-center gap-2 hover:bg-red-600">
// //                         <Save className="w-4 h-4" /> {isTransmitting ? "Patching..." : "Commit Hotfix"}
// //                     </button>
// //                  </form>
// //                ) : (
// //                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
// //                     <div className="flex-1">
// //                         <div className="flex items-center gap-4 mb-6">
// //                             <span className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
// //                                 <span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_currentColor]" /> Live Broadcast
// //                             </span>
// //                             <span className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
// //                                 <Clock className="w-3 h-3" /> Ends: {new Date(activeSignal.deadline).toLocaleString()}
// //                             </span>
// //                         </div>
// //                         <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight drop-shadow-lg">{activeSignal.theme}</h2>
// //                         <div className="relative pl-6 border-l-2 border-red-500/30">
// //                             <p className="text-red-100/70 text-sm md:text-base leading-relaxed italic">"{activeSignal.brief}"</p>
// //                         </div>
// //                     </div>
// //                     <div className="flex flex-col gap-3">
// //                         <button onClick={() => setIsEditing(true)} className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
// //                             <Edit2 className="w-4 h-4" /> <span className="text-xs font-mono uppercase">Edit</span>
// //                         </button>
// //                         <button onClick={handleKill} className="px-6 py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg">
// //                             <PowerOff className="w-4 h-4" /> <span className="text-xs font-mono uppercase font-bold">Kill</span>
// //                         </button>
// //                     </div>
// //                  </div>
// //                )}
// //             </div>
// //          ) : (
// //             <div className="text-center py-16 flex flex-col items-center gap-6">
// //                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
// //                     <RadioTower className="w-10 h-10 text-white/20" />
// //                </div>
// //                <div>
// //                    <h3 className="text-white/40 font-serif text-2xl mb-2">Silence on all frequencies</h3>
// //                    <p className="font-mono text-xs text-white/20 uppercase tracking-widest">Waiting for transmission...</p>
// //                </div>
// //             </div>
// //          )}
// //       </div>

// //       {/* --- TRANSMITTER SECTION --- */}
// //       <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative group">
// //          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
// //          <div className="p-8 border-b border-white/5 bg-white/[0.02]">
// //             <h3 className="text-xl font-serif text-white flex items-center gap-3">
// //                 <Activity className="w-5 h-5 text-gold-500" /> Initialize Broadcast
// //             </h3>
// //          </div>
// //          <form onSubmit={handleBroadcast} className="p-8 space-y-8">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //                <div className="space-y-3">
// //                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Target Frequency (Theme)</label>
// //                   <input name="theme" required placeholder="e.g. ECHOES IN THE DARK" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 outline-none transition-all font-serif text-lg" />
// //                </div>
// //                <div className="space-y-3">
// //                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Cutoff (Deadline)</label>
// //                   <input name="deadline" type="datetime-local" required className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 outline-none transition-all font-mono" />
// //                </div>
// //             </div>
// //             <div className="space-y-3">
// //                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Directive (Brief)</label>
// //                <textarea name="brief" required rows={4} placeholder="Detailed instructions..." className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 outline-none transition-all resize-none" />
// //             </div>
// //             <div className="pt-4 flex justify-end">
// //                 <button disabled={isTransmitting} className="w-full md:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gold-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
// //                    {isTransmitting ? <span className="animate-pulse">Modulating...</span> : <><Zap className="w-4 h-4 fill-current" /> Transmit Signal</>}
// //                 </button>
// //             </div>
// //             {/* NEW: FORM ARCHETYPE SELECTOR */}
// //             <div className="space-y-3">
// //                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
// //                    Submission Protocol (Form Type)
// //                </label>
// //                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                    {[
// //                        { id: 'general', label: 'General', icon: LayoutTemplate },
// //                        { id: 'audition', label: 'Audition (Video)', icon: Video },
// //                        { id: 'writing', label: 'Script (PDF)', icon: FileText },
// //                        { id: 'design', label: 'Portfolio', icon: PenTool },
// //                        { id: 'external', label: 'External Link', icon: Globe },
// //                    ].map((type) => (
// //                        <label key={type.id} className="cursor-pointer group/item">
// //                            <input 
// //                                 type="radio" 
// //                                 name="form_type" 
// //                                 value={type.id} 
// //                                 defaultChecked={type.id === 'general'} 
// //                                 onChange={(e) => setSelectedType(e.target.value)} 
// //                                 className="peer sr-only" 
// //                             />
// //                            <div className="flex flex-col items-center gap-2 p-4 border border-white/10 rounded-lg bg-black peer-checked:bg-gold-500/10 peer-checked:border-gold-500 peer-checked:text-gold-500 text-white/40 transition-all hover:bg-white/5">
// //                                <type.icon className="w-5 h-5" />
// //                                <span className="text-[10px] font-mono uppercase">{type.label}</span>
// //                            </div>
// //                        </label>
// //                    ))}
// //                </div>
// //             </div>
// //             { /* CONDITIONAL HELP TEXT BASED ON SELECTED TYPE */}
// //             {selectedType === 'external' && (
// //                 <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
// //                     <label className="text-[10px] font-mono text-gold-500 uppercase tracking-widest flex items-center gap-2">
// //                         <LinkIcon className="w-3 h-3"/> Target URL (GForm / Luma / Drive)
// //                     </label>
// //                     <input 
// //                         name="external_link" 
// //                         type="url" 
// //                         required 
// //                         placeholder="https://docs.google.com/forms/..." 
// //                         className="w-full bg-gold-500/5 border border-gold-500/30 rounded-lg p-4 text-gold-500 placeholder:text-gold-500/20 focus:border-gold-500 outline-none transition-all font-mono text-sm" 
// //                     />
// //                 </div>
// //             )}
// //          </form>
// //       </div>

// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import { RadioTower, PowerOff, Zap, Activity, Clock, Edit2, Save, X, LayoutTemplate, FileText, Video, PenTool, Globe, Link as LinkIcon } from "lucide-react";
// import { broadcastSignal, killSignal, updateSignal } from "@/app/admin/challenges/actions";
// import { toast } from "sonner";

// export default function SignalConsole({ activeSignal }: { activeSignal: any }) {
//   const [isTransmitting, setIsTransmitting] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
  
//   // STATE FOR CREATE MODE
//   const [createType, setCreateType] = useState('general');
//   // STATE FOR EDIT MODE
//   const [editType, setEditType] = useState('general');

//   // Sync Edit State when activeSignal loads or Edit Mode opens
//   useEffect(() => {
//       if (activeSignal) {
//           setEditType(activeSignal.form_type || 'general');
//       }
//   }, [activeSignal, isEditing]);

//   // 1. BROADCAST
//   const handleBroadcast = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsTransmitting(true);
//     const result = await broadcastSignal(new FormData(e.currentTarget));
//     setIsTransmitting(false);
    
//     if (!result.success) {
//         toast.error(result.error);
//     } else {
//         toast.success("Signal Broadcasted Successfully");
//         (e.target as HTMLFormElement).reset();
//         setCreateType('general'); // Reset selector
//     }
//   };

//   // 2. UPDATE
//   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsTransmitting(true);
//     const result = await updateSignal(new FormData(e.currentTarget));
//     setIsTransmitting(false);
    
//     if (!result.success) {
//         toast.error(result.error);
//     } else {
//         toast.success("Signal Patched Successfully");
//         setIsEditing(false);
//     }
//   };

//   // 3. KILL
//   const handleKill = async () => {
//     if(!activeSignal) return;
//     if(confirm("WARNING: Are you sure you want to kill the live signal?")) await killSignal(activeSignal.id);
//   };

//   // HELPER: The Protocol Selector Component (Reused for both modes)
//   // We pass 'currentType' and 'setType' to control the state
//   // We pass 'prefix' to handle defaultValue for inputs differently
//   const ProtocolSelector = ({ currentType, setType, prefix = "create" }: any) => (
//     <div className="space-y-3">
//         <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
//             Submission Protocol
//         </label>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//             {[
//                 { id: 'general', label: 'General', icon: LayoutTemplate },
//                 { id: 'audition', label: 'Audition', icon: Video },
//                 { id: 'writing', label: 'Script', icon: FileText },
//                 { id: 'design', label: 'Design', icon: PenTool },
//                 { id: 'external', label: 'External', icon: Globe },
//             ].map((type) => (
//                 <label key={type.id} className="cursor-pointer group/item">
//                     <input 
//                         type="radio" 
//                         name="form_type" 
//                         value={type.id} 
//                         checked={currentType === type.id}
//                         onChange={(e) => setType(e.target.value)}
//                         className="peer sr-only" 
//                     />
//                     <div className="flex flex-col items-center gap-2 p-3 border border-white/10 rounded-lg bg-black peer-checked:bg-gold-500/10 peer-checked:border-gold-500 peer-checked:text-gold-500 text-white/40 transition-all hover:bg-white/5">
//                         <type.icon className="w-4 h-4" />
//                         <span className="text-[9px] font-mono uppercase">{type.label}</span>
//                     </div>
//                 </label>
//             ))}
//         </div>
        
//         {/* External Link Input (Shows only when 'external' is selected) */}
//         {currentType === 'external' && (
//             <div className="animate-in fade-in slide-in-from-top-2 pt-2">
//                 <div className="relative">
//                     <input 
//                         name="external_link" 
//                         type="url" 
//                         // If editing, preload the link. If creating, start empty.
//                         defaultValue={prefix === 'edit' ? activeSignal?.external_link : ''}
//                         required 
//                         placeholder="https://docs.google.com/forms/..." 
//                         className="w-full bg-black border border-gold-500/50 rounded-lg p-3 pl-10 text-gold-500 text-xs font-mono focus:outline-none placeholder:text-gold-500/30" 
//                     />
//                     <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
//                 </div>
//             </div>
//         )}
//     </div>
//   );

//   return (
//     <div className="space-y-12">
      
//       {/* --- MONITOR (With Enhanced Edit Form) --- */}
//       <div className={`relative overflow-hidden p-8 rounded-2xl border transition-all duration-700 ${activeSignal ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_60px_rgba(220,38,38,0.15)]' : 'bg-[#0a0a0a] border-white/10'}`}>
//          {activeSignal && <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-grain pointer-events-none mix-blend-overlay" />}

//          {activeSignal ? (
//             <div className="relative z-10">
//                {isEditing ? (
//                  /* EDIT MODE FORM */
//                  <form onSubmit={handleUpdate} className="space-y-6">
//                     <input type="hidden" name="id" value={activeSignal.id} />
                    
//                     <div className="flex justify-between items-center border-b border-white/10 pb-4">
//                         <span className="text-red-500 font-mono text-xs uppercase tracking-widest animate-pulse flex items-center gap-2">
//                             <Activity className="w-4 h-4" /> Live Signal Patching
//                         </span>
//                         <button type="button" onClick={() => setIsEditing(false)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-6">
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase">Theme</label>
//                             <input name="theme" defaultValue={activeSignal.theme} className="bg-black/50 border border-white/10 rounded p-3 text-white w-full focus:border-red-500 outline-none font-serif text-xl" />
//                         </div>
//                         <div className="space-y-2">
//                             <label className="text-[10px] font-mono text-white/40 uppercase">Deadline</label>
//                             <input name="deadline" type="datetime-local" defaultValue={new Date(activeSignal.deadline).toISOString().slice(0, 16)} className="bg-black/50 border border-white/10 rounded p-3 text-white font-mono w-full focus:border-red-500 outline-none" />
//                         </div>
//                     </div>

//                     {/* THE EDITABLE SELECTOR */}
//                     <ProtocolSelector currentType={editType} setType={setEditType} prefix="edit" />

//                     <div className="space-y-2">
//                         <label className="text-[10px] font-mono text-white/40 uppercase">Brief</label>
//                         <textarea name="brief" defaultValue={activeSignal.brief} rows={3} className="bg-black/50 border border-white/10 rounded p-3 text-white w-full resize-none focus:border-red-500 outline-none" />
//                     </div>

//                     <div className="flex justify-end gap-4 pt-2">
//                         <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 border border-white/10 text-white/50 hover:text-white rounded text-xs uppercase tracking-widest">Cancel</button>
//                         <button disabled={isTransmitting} className="px-6 py-3 bg-red-500 text-white font-bold uppercase text-xs rounded flex items-center gap-2 hover:bg-red-600 shadow-lg shadow-red-900/20">
//                             <Save className="w-4 h-4" /> {isTransmitting ? "Patching..." : "Commit Hotfix"}
//                         </button>
//                     </div>
//                  </form>
//                ) : (
//                  /* DISPLAY MODE */
//                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
//                     <div className="flex-1">
//                         {/* Status Badges */}
//                         <div className="flex items-center gap-4 mb-6">
//                             <span className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
//                                 <span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_currentColor]" /> Live Broadcast
//                             </span>
//                             <span className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
//                                 <Clock className="w-3 h-3" /> Ends: {new Date(activeSignal.deadline).toLocaleString()}
//                             </span>
//                             {/* Form Type Badge */}
//                             <span className="px-2 py-0.5 border border-white/10 rounded text-[9px] font-mono uppercase text-white/30">
//                                 {activeSignal.form_type}
//                             </span>
//                         </div>
                        
//                         <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight drop-shadow-lg">{activeSignal.theme}</h2>
                        
//                         <div className="relative pl-6 border-l-2 border-red-500/30">
//                             <p className="text-red-100/70 text-sm md:text-base leading-relaxed italic">"{activeSignal.brief}"</p>
//                             {activeSignal.form_type === 'external' && activeSignal.external_link && (
//                                 <a href={activeSignal.external_link} target="_blank" className="mt-3 inline-flex items-center gap-2 text-[10px] font-mono text-red-400 hover:text-red-300 border-b border-red-500/30 pb-0.5">
//                                     <Globe className="w-3 h-3" /> {activeSignal.external_link}
//                                 </a>
//                             )}
//                         </div>
//                     </div>
                    
//                     {/* Controls */}
//                     <div className="flex flex-col gap-3">
//                         <button onClick={() => setIsEditing(true)} className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
//                             <Edit2 className="w-4 h-4 group-hover:text-gold-500 transition-colors" /> 
//                             <span className="text-xs font-mono uppercase">Edit Signal</span>
//                         </button>
//                         <button onClick={handleKill} className="px-6 py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-900/40">
//                             <PowerOff className="w-4 h-4" /> <span className="text-xs font-mono uppercase font-bold">Kill</span>
//                         </button>
//                     </div>
//                  </div>
//                )}
//             </div>
//          ) : (
//             /* SILENCE STATE */
//             <div className="text-center py-16 flex flex-col items-center gap-6">
//                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
//                     <RadioTower className="w-10 h-10 text-white/20" />
//                </div>
//                <div>
//                    <h3 className="text-white/40 font-serif text-2xl mb-2">Silence on all frequencies</h3>
//                    <p className="font-mono text-xs text-white/20 uppercase tracking-widest">Waiting for transmission...</p>
//                </div>
//             </div>
//          )}
//       </div>

//       {/* --- TRANSMITTER (Create New) --- */}
//       <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative group">
//          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         
//          <div className="p-8 border-b border-white/5 bg-white/[0.02]">
//             <h3 className="text-xl font-serif text-white flex items-center gap-3">
//                 <Activity className="w-5 h-5 text-gold-500" />
//                 Initialize Broadcast
//             </h3>
//          </div>
         
//          <form onSubmit={handleBroadcast} className="p-8 space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                <div className="space-y-3">
//                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
//                       Target Frequency (Theme)
//                   </label>
//                   <input name="theme" required placeholder="e.g. ECHOES IN THE DARK" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:border-gold-500 focus:outline-none transition-all font-serif text-lg tracking-wide" />
//                </div>
//                <div className="space-y-3">
//                   <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
//                       Transmission Cutoff (Deadline)
//                   </label>
//                   <input name="deadline" type="datetime-local" required className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 focus:outline-none transition-all font-mono" />
//                </div>
//             </div>
            
//             {/* THE PROTOCOL SELECTOR */}
//             <ProtocolSelector currentType={createType} setType={setCreateType} prefix="create" />
            
//             <div className="space-y-3">
//                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
//                    Directive (Brief)
//                </label>
//                <textarea name="brief" required rows={4} placeholder="Detailed instructions for the society..." className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 focus:outline-none transition-all resize-none leading-relaxed" />
//             </div>

//             <div className="pt-4 flex justify-end">
//                 <button disabled={isTransmitting} className="w-full md:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gold-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]">
//                    {isTransmitting ? (
//                        <span className="animate-pulse flex items-center gap-2"><Zap className="w-4 h-4" /> Modulating...</span>
//                    ) : (
//                        <><Zap className="w-4 h-4 fill-current" /> Transmit Signal</>
//                    )}
//                 </button>
//             </div>
//          </form>
//       </div>

//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { RadioTower, PowerOff, Zap, Activity, Clock, Edit2, Save, X, LayoutTemplate, FileText, Video, PenTool, Globe, Link as LinkIcon } from "lucide-react";
import { broadcastSignal, killSignal, updateSignal } from "@/app/admin/challenges/actions";
import { toast } from "sonner";

export default function SignalConsole({ activeSignal }: { activeSignal: any }) {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // SEPARATE STATES (Fixes the "State Contamination" error)
  const [createType, setCreateType] = useState('general');
  const [editType, setEditType] = useState('general');

  // Sync Edit State when activeSignal changes or edit mode opens
  useEffect(() => {
      if (activeSignal) {
          setEditType(activeSignal.form_type || 'general');
      }
  }, [activeSignal, isEditing]);

  // 1. BROADCAST
  const handleBroadcast = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTransmitting(true);
    const result = await broadcastSignal(new FormData(e.currentTarget));
    setIsTransmitting(false);
    
    if (!result.success) toast.error(result.error);
    else {
        toast.success("Signal Broadcasted Successfully");
        (e.target as HTMLFormElement).reset();
        setCreateType('general'); // Reset selector
    }
  };

  // 2. UPDATE
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTransmitting(true);
    const result = await updateSignal(new FormData(e.currentTarget));
    setIsTransmitting(false);
    
    if (!result.success) toast.error(result.error);
    else {
        toast.success("Signal Patched Successfully");
        setIsEditing(false);
    }
  };

  // 3. KILL
  const handleKill = async () => {
    if(!activeSignal) return;
    if(confirm("WARNING: Kill Signal?")) await killSignal(activeSignal.id);
  };

  // REUSABLE COMPONENT (Fixes "Code Duplication" error)
  const ProtocolSelector = ({ currentType, setType, defaultLink }: { currentType: string, setType: (t: string) => void, defaultLink?: string }) => (
    <div className="space-y-3">
        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
            Submission Protocol
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
                { id: 'general', label: 'General', icon: LayoutTemplate },
                { id: 'audition', label: 'Audition', icon: Video },
                { id: 'writing', label: 'Script', icon: FileText },
                { id: 'design', label: 'Design', icon: PenTool },
                { id: 'external', label: 'External', icon: Globe },
            ].map((type) => (
                <label key={type.id} className="cursor-pointer group/item">
                    <input 
                        type="radio" 
                        name="form_type" 
                        value={type.id} 
                        checked={currentType === type.id}
                        onChange={(e) => setType(e.target.value)}
                        className="peer sr-only" 
                    />
                    <div className="flex flex-col items-center gap-2 p-3 border border-white/10 rounded-lg bg-black peer-checked:bg-gold-500/10 peer-checked:border-gold-500 peer-checked:text-gold-500 text-white/40 transition-all hover:bg-white/5">
                        <type.icon className="w-4 h-4" />
                        <span className="text-[9px] font-mono uppercase">{type.label}</span>
                    </div>
                </label>
            ))}
        </div>
        
        {/* Conditional External Link Input */}
        {currentType === 'external' && (
            <div className="animate-in fade-in slide-in-from-top-2 pt-2">
                <div className="relative">
                    <input 
                        name="external_link" 
                        type="url" 
                        defaultValue={defaultLink || ''}
                        required 
                        placeholder="https://docs.google.com/forms/..." 
                        className="w-full bg-black border border-gold-500/50 rounded-lg p-3 pl-10 text-gold-500 text-xs font-mono focus:outline-none placeholder:text-gold-500/30" 
                    />
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                </div>
            </div>
        )}
    </div>
  );

  return (
    <div className="space-y-12">
      
      {/* --- MONITOR (Edit Mode) --- */}
      <div className={`relative overflow-hidden p-8 rounded-2xl border transition-all duration-700 ${activeSignal ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_60px_rgba(220,38,38,0.15)]' : 'bg-[#0a0a0a] border-white/10'}`}>
         {activeSignal && <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 animate-grain pointer-events-none mix-blend-overlay" />}

         {activeSignal ? (
            <div className="relative z-10">
               {isEditing ? (
                 <form onSubmit={handleUpdate} className="space-y-6">
                    <input type="hidden" name="id" value={activeSignal.id} />
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-red-500 font-mono text-xs uppercase tracking-widest animate-pulse flex items-center gap-2"><Activity className="w-4 h-4" /> Live Patching</span>
                        <button type="button" onClick={() => setIsEditing(false)}><X className="w-5 h-5 text-white/50 hover:text-white" /></button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/40 uppercase">Theme</label>
                            <input name="theme" defaultValue={activeSignal.theme} className="bg-black/50 border border-white/10 rounded p-3 text-white w-full focus:border-red-500 outline-none font-serif text-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-white/40 uppercase">Deadline</label>
                            <input name="deadline" type="datetime-local" defaultValue={new Date(activeSignal.deadline).toISOString().slice(0, 16)} className="bg-black/50 border border-white/10 rounded p-3 text-white font-mono w-full focus:border-red-500 outline-none" />
                        </div>
                    </div>

                    {/* EDIT MODE SELECTOR */}
                    <ProtocolSelector currentType={editType} setType={setEditType} defaultLink={activeSignal.external_link} />

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-white/40 uppercase">Brief</label>
                        <textarea name="brief" defaultValue={activeSignal.brief} rows={3} className="bg-black/50 border border-white/10 rounded p-3 text-white w-full resize-none focus:border-red-500 outline-none" />
                    </div>
                    <div className="flex justify-end gap-4 pt-2">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 border border-white/10 text-white/50 hover:text-white rounded text-xs uppercase tracking-widest">Cancel</button>
                        <button disabled={isTransmitting} className="px-6 py-3 bg-red-500 text-white font-bold uppercase text-xs rounded flex items-center gap-2 hover:bg-red-600 shadow-lg shadow-red-900/20">
                            <Save className="w-4 h-4" /> {isTransmitting ? "Patching..." : "Commit Hotfix"}
                        </button>
                    </div>
                 </form>
               ) : (
                 /* DISPLAY MODE */
                 <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_currentColor]" /> Live Broadcast
                            </span>
                            <span className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                                <Clock className="w-3 h-3" /> Ends: {new Date(activeSignal.deadline).toLocaleString()}
                            </span>
                            <span className="px-2 py-0.5 border border-white/10 rounded text-[9px] font-mono uppercase text-white/30">{activeSignal.form_type}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight drop-shadow-lg">{activeSignal.theme}</h2>
                        <div className="relative pl-6 border-l-2 border-red-500/30">
                            <p className="text-red-100/70 text-sm md:text-base leading-relaxed italic">"{activeSignal.brief}"</p>
                            {activeSignal.form_type === 'external' && activeSignal.external_link && (
                                <a href={activeSignal.external_link} target="_blank" className="mt-3 inline-flex items-center gap-2 text-[10px] font-mono text-red-400 hover:text-red-300 border-b border-red-500/30 pb-0.5">
                                    <Globe className="w-3 h-3" /> {activeSignal.external_link}
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => setIsEditing(true)} className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                            <Edit2 className="w-4 h-4 group-hover:text-gold-500 transition-colors" /> <span className="text-xs font-mono uppercase">Edit</span>
                        </button>
                        <button onClick={handleKill} className="px-6 py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg">
                            <PowerOff className="w-4 h-4" /> <span className="text-xs font-mono uppercase font-bold">Kill</span>
                        </button>
                    </div>
                 </div>
               )}
            </div>
         ) : (
            <div className="text-center py-16 flex flex-col items-center gap-6">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
                    <RadioTower className="w-10 h-10 text-white/20" />
                </div>
                <div>
                    <h3 className="text-white/40 font-serif text-2xl mb-2">Silence on all frequencies</h3>
                    <p className="font-mono text-xs text-white/20 uppercase tracking-widest">Waiting for transmission...</p>
                </div>
            </div>
         )}
      </div>

      {/* --- TRANSMITTER (Create Mode) --- */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative group">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         <div className="p-8 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-xl font-serif text-white flex items-center gap-3"><Activity className="w-5 h-5 text-gold-500" /> Initialize Broadcast</h3>
         </div>
         <form onSubmit={handleBroadcast} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Target Frequency (Theme)</label>
                  <input name="theme" required placeholder="e.g. ECHOES IN THE DARK" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 outline-none transition-all font-serif text-lg" />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Cutoff (Deadline)</label>
                  <input name="deadline" type="datetime-local" required className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 outline-none transition-all font-mono" />
               </div>
            </div>
            
            {/* CREATE MODE SELECTOR */}
            <ProtocolSelector currentType={createType} setType={setCreateType} />

            <div className="space-y-3">
               <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Directive (Brief)</label>
               <textarea name="brief" required rows={4} placeholder="Detailed instructions..." className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-gold-500 outline-none transition-all resize-none" />
            </div>
            <div className="pt-4 flex justify-end">
                <button disabled={isTransmitting} className="w-full md:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gold-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                   {isTransmitting ? <span className="animate-pulse">Modulating...</span> : <><Zap className="w-4 h-4 fill-current" /> Transmit Signal</>}
                </button>
            </div>
         </form>
      </div>

    </div>
  );
}