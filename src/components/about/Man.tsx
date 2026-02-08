
// "use client";

// import { Mail, Instagram, Youtube, Link, ArrowUpRight } from "lucide-react";
// import { motion } from "framer-motion";

// export default function TheManifesto() {
//   return (
//     <section className="min-h-screen bg-[#050505] text-[#f0f0f0] pt-32 pb-24 px-6 md:px-24">
      
//       <div className="max-w-6xl mx-auto">
          
//           {/* 1. THE STORY */}
//           <div className="mb-32">
//               <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white/60 mb-8">
//                   The Philosophy
//               </span>
              
//               <h1 className="text-4xl md:text-7xl font-serif leading-tight mb-12 text-white">
//                   We are a group of engineers<br/> 
//                   who fell in love with <span className="text-red-500 italic">Storytelling.</span>
//               </h1>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg md:text-xl font-serif leading-relaxed text-white/70">
//                   <div className="space-y-6">
//                       <p>
//                           The <strong>IIT Madras BS Degree</strong> is a revolution in education. And Aayam is the heartbeat of that revolution. We are trying to understand what it means to be human in a digital world.
//                       </p>
//                       <p>
//                           We don't just put on plays. We build families across time zones. We spend late nights rewriting scripts and rehearsing lines until they feel like the truth.
//                       </p>
//                   </div>
//                   <div className="space-y-6">
//                       <p>
//                           Whether it's a street play that makes you question society, or a film that makes you cry in the dark—we do it because we love it. 
//                       </p>
//                       <p className="text-white font-medium">
//                           And we want you to be a part of it.
//                       </p>

//                       {/* --- THE SIGNATURE (The Heart) --- */}
//                       <div className="mt-16 pt-8 border-t border-white/10">
//                           <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">
//                               From the core of my heart,
//                           </p>
                          
//                           <div className="relative inline-block">
//                               {/* The Name */}
//                               <span className="block text-3xl md:text-4xl font-serif text-white mb-1">
//                                   Siddharth
//                               </span>
                              
//                               {/* The Title (Struck Through) */}
//                               <div className="relative inline-block">
//                                   <span className="text-sm font-mono text-white/30 uppercase tracking-widest">
//                                       The Secretary
//                                   </span>
//                                   {/* The Red Strike Line */}
//                                   <motion.div 
//                                     initial={{ width: 0 }}
//                                     whileInView={{ width: "100%" }}
//                                     transition={{ duration: 1, delay: 0.5 }}
//                                     className="absolute top-1/2 left-0 h-[1px] bg-red-500 -rotate-2"
//                                   />
//                               </div>

//                               {/* The Real Identity */}
//                               <motion.span 
//                                 initial={{ opacity: 0, y: 5 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 1, delay: 1.5 }}
//                                 className="block mt-2 font-serif italic text-gold-500 text-lg"
//                               >
//                                   "Just a Believer."
//                               </motion.span>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>

//           {/* 2. THE CONTACT GRID */}
//           <div className="border-t border-white/10 pt-16">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//                   <h2 className="text-3xl md:text-4xl font-serif text-white">
//                       Let's Connect.
//                   </h2>
//                   <p className="text-white/50 mt-2 md:mt-0">
//                       We reply to every message.
//                   </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
//                   {/* INSTAGRAM */}
//                   <a href="https://instagram.com/aayam_iitm" target="_blank" className="group bg-[#0a0a0a] p-8 rounded-xl border border-white/5 hover:border-red-500/50 hover:bg-[#0f0f0f] transition-all duration-300">
//                       <div className="flex justify-between items-start mb-8">
//                           <Instagram className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors" />
//                           <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
//                       </div>
//                       <h3 className="text-xl font-serif text-white mb-1">Instagram</h3>
//                       <p className="text-sm text-white/40">@aayam_iitm</p>
//                   </a>

//                   {/* EMAIL */}
//                   <a href="mailto:secretary.aayam@iitm.ac.in" className="group bg-[#0a0a0a] p-8 rounded-xl border border-white/5 hover:border-red-500/50 hover:bg-[#0f0f0f] transition-all duration-300">
//                       <div className="flex justify-between items-start mb-8">
//                           <Mail className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors" />
//                           <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
//                       </div>
//                       <h3 className="text-xl font-serif text-white mb-1">Email</h3>
//                       <p className="text-sm text-white/40">secretary.aayam@iitm.ac.in</p>
//                   </a>

//                   {/* YOUTUBE */}
//                   <a href="https://youtube.com" target="_blank" className="group bg-[#0a0a0a] p-8 rounded-xl border border-white/5 hover:border-red-500/50 hover:bg-[#0f0f0f] transition-all duration-300">
//                       <div className="flex justify-between items-start mb-8">
//                           <Youtube className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors" />
//                           <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
//                       </div>
//                       <h3 className="text-xl font-serif text-white mb-1">YouTube</h3>
//                       <p className="text-sm text-white/40">Watch our performances</p>
//                   </a>

//                   {/* THE HUB (LINKTREE) */}
//                   <a href="https://linktr.ee/aayam_iitm" target="_blank" className="group bg-[#0a0a0a] p-8 rounded-xl border border-white/5 hover:border-gold-500/50 hover:bg-[#0f0f0f] transition-all duration-300">
//                       <div className="flex justify-between items-start mb-8">
//                           <Link className="w-8 h-8 text-white/40 group-hover:text-gold-500 transition-colors" />
//                           <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
//                       </div>
//                       <h3 className="text-xl font-serif text-white mb-1">The Hub</h3>
//                       <p className="text-sm text-white/40">
//                           Merch. Tickets. Hidden Files.<br/>
//                           Everything else is here.
//                       </p>
//                   </a>

//               </div>
//           </div>

//       </div>
//     </section>
//   );
// }

