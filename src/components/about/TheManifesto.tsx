// "use client";

// import { motion } from "framer-motion";
// import { Instagram, Linkedin, Mail, Globe, Youtube } from "lucide-react"; 

// const SOCIALS = [
//   { id: "insta", label: "Instagram", handle: "@aayam_iitm", icon: Instagram, link: "https://instagram.com/aayam_iitm" },
//   { id: "linkedin", label: "LinkedIn", handle: "/company/aayam", icon: Linkedin, link: "https://linkedin.com" },
//   { id: "youtube", label: "YouTube", handle: "Aayam Originals", icon: Youtube, link: "https://youtube.com" },
//   { id: "email", label: "Email", handle: "secretary.aayam", icon: Mail, link: "mailto:secretary.aayam@iitm.ac.in" },
// ];

// export default function TheManifesto() {
//   return (
//     <section className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row">
      
//       {/* LEFT: THE PHILOSOPHY (Scrollable) */}
//       <div className="w-full md:w-2/3 p-6 md:p-24 border-r border-white/10 flex flex-col justify-center relative overflow-hidden">
//          {/* Background Decoration */}
//          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

//          <span className="font-mono text-xs text-red-500 uppercase tracking-widest mb-8">
//             // The Manifesto
//          </span>

//          <h1 className="text-4xl md:text-7xl font-serif leading-[1.1] md:leading-[1] mb-12 mix-blend-screen">
//             We are the storytellers of the <span className="text-gold-500 italic">Madras Institute.</span>
//          </h1>

//          <div className="space-y-8 max-w-2xl text-white/60 font-serif text-lg md:text-xl leading-relaxed">
//             <p>
//                 Aayam is not just a drama society. It is a laboratory of human emotion.
//                 From the dust of the Open Air Theatre to the silence of the Studio, 
//                 we explore the spectrum of performative arts.
//             </p>
//             <p>
//                 Founded on the principles of <strong>Risk, Truth, and Spectacle</strong>, 
//                 we operate at the intersection of traditional theater and modern cinema.
//                 We do not just act. We inhabit.
//             </p>
//          </div>

//          <div className="mt-24">
//              <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-4" />
//              <div className="flex gap-8 font-mono text-xs text-white/30 uppercase tracking-widest">
//                  <span>Est. 20XX</span>
//                  <span>IIT Madras</span>
//                  <span>Chennai, India</span>
//              </div>
//          </div>
//       </div>

//       {/* RIGHT: THE FREQUENCIES (Contact Switchboard) */}
//       <div className="w-full md:w-1/3 bg-[#0a0a0a] flex flex-col">
         
//          <div className="p-12 border-b border-white/10">
//              <h3 className="font-mono text-xl uppercase tracking-widest text-white mb-2">
//                 Frequencies
//              </h3>
//              <p className="text-white/40 text-sm">
//                 Open Channels for Transmission
//              </p>
//          </div>

//          {/* LINKS GRID */}
//          <div className="flex-1 flex flex-col">
//              {SOCIALS.map((social, i) => (
//                  <a 
//                     key={social.id}
//                     href={social.link}
//                     target="_blank"
//                     className="group flex-1 flex items-center justify-between px-12 border-b border-white/10 hover:bg-white hover:text-black transition-colors duration-500"
//                  >
//                     <div className="flex items-center gap-6">
//                         <social.icon className="w-6 h-6 text-white/50 group-hover:text-black transition-colors" />
//                         <div>
//                             <span className="block font-mono text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100 mb-1">
//                                 {social.label}
//                             </span>
//                             <span className="block font-serif text-xl group-hover:translate-x-2 transition-transform duration-300">
//                                 {social.handle}
//                             </span>
//                         </div>
//                     </div>
                    
//                     <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-2xl">
//                         ↗
//                     </span>
//                  </a>
//              ))}
//          </div>
         
//          {/* LOCATION FOOTER */}
//          <div className="p-12 bg-[#020202]">
//              <p className="font-mono text-[10px] text-white/20 uppercase leading-loose text-center">
//                 3rd Floor, Students Activity Center (SAC)<br/>
//                 Indian Institute of Technology Madras<br/>
//                 Chennai, Tamil Nadu 600036
//              </p>
//          </div>

//       </div>
//     </section>
//   );
// }



// "use client";

// import { motion } from "framer-motion";
// import { ArrowRight, Radio } from "lucide-react";

// const LINKS = [
//   { label: "FREQUENCY A", sub: "Visual Feed", value: "@aayam_iitm", href: "https://instagram.com/aayam_iitm" },
//   { label: "FREQUENCY B", sub: "Direct Line", value: "secretary.aayam", href: "mailto:secretary.aayam@iitm.ac.in" },
//   { label: "FREQUENCY C", sub: "The Archives", value: "Youtube Channel", href: "https://youtube.com" },
//   { label: "FREQUENCY D", sub: "Professional", value: "LinkedIn", href: "https://linkedin.com" },
// ];

// export default function TheManifesto() {
//   return (
//     <section className="min-h-screen bg-[#050505] text-[#f0f0f0] pt-32 pb-24 px-6 md:px-24 relative overflow-hidden">
      
//       {/* BACKGROUND GRAIN */}
//       <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] animate-grain pointer-events-none" />

//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 relative z-10">
          
//           {/* 1. THE SCRIPT (Left Column) */}
//           <div className="md:col-span-7">
//               {/* Stage Direction */}
//               <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-12 flex items-center gap-3">
//                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
//                   [ SCENE START: THE PROLOGUE ]
//               </div>
              
//               {/* The Hook */}
//               <h1 className="text-5xl md:text-8xl font-serif leading-[0.95] tracking-tighter mb-12 text-white mix-blend-screen">
//                   WE DO NOT<br/> 
//                   JUST ACT.<br/> 
//                   <span className="text-white/30 italic">WE INHABIT.</span>
//               </h1>

//               {/* The Monologue */}
//               <div className="space-y-10 text-lg md:text-2xl font-serif leading-relaxed text-white/70 border-l border-white/10 pl-8 md:pl-12">
//                   <p>
//                       <span className="font-mono text-xs text-gold-500 uppercase tracking-widest block mb-2 opacity-50">NARRATOR:</span>
//                       Aayam is the Dramatics Society of <strong className="text-white font-normal">IIT Madras</strong>. 
//                       But definitions are boring. In truth? We are a collective of engineers trying to engineer a soul.
//                   </p>
//                   <p>
//                       <span className="font-mono text-xs text-white/30 uppercase tracking-widest block mb-2 opacity-50">(Beat)</span>
//                       We believe the stage is a dangerous place. It is where we strip away the masks we wear in the classroom 
//                       and reveal the raw, messy truth of the human condition. 
//                   </p>
//                   <p>
//                       From the dust of the Street Play to the silence of the Studio, we deal in one currency: <span className="text-white italic">Truth.</span>
//                   </p>
//                   <p>
//                       <span className="font-mono text-xs text-white/30 uppercase tracking-widest block mb-2 opacity-50">[TURNS TO AUDIENCE]</span>
//                       We are open to everyone. If you have a voice, we have a microphone.
//                   </p>
//               </div>

//               {/* Meta Data */}
//               <div className="mt-24 pt-8 border-t border-white/10 flex gap-8 font-mono text-xs text-white/30 uppercase tracking-widest">
//                   <span>Est. 2010</span>
//                   <span>Chennai, IND</span>
//                   <span>Lat: 12.99° N</span>
//               </div>
//           </div>

//           {/* 2. THE RADIO TOWER (Right Column) */}
//           <div className="md:col-span-5 flex flex-col justify-end">
//               <div className="mb-12">
//                   <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
//                       <Radio className="w-4 h-4" />
//                       Open Frequencies
//                   </h3>
//                   <div className="h-px w-full bg-gradient-to-r from-white/30 to-transparent" />
//               </div>

//               <div className="flex flex-col">
//                   {LINKS.map((link) => (
//                       <a 
//                         key={link.label}
//                         href={link.href}
//                         target="_blank"
//                         className="group relative py-8 border-b border-white/5 hover:border-white/30 transition-colors duration-500"
//                       >
//                           <div className="flex items-baseline justify-between relative z-10">
//                               <div>
//                                   <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block mb-1 group-hover:text-gold-500 transition-colors">
//                                       {link.label}
//                                   </span>
//                                   <span className="font-serif text-2xl md:text-3xl text-white/60 group-hover:text-white transition-colors duration-300">
//                                       {link.value}
//                                   </span>
//                               </div>
                              
//                               <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
//                           </div>
//                       </a>
//                   ))}
//               </div>

//               {/* Location Block */}
//               <div className="mt-20 p-8 bg-[#0a0a0a] border border-white/5 relative group hover:border-white/20 transition-colors">
//                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 to-transparent opacity-50" />
//                   <p className="font-mono text-[10px] text-white/40 uppercase leading-loose text-center">
//                       // BASE OF OPERATIONS<br/>
//                       Students Activity Center (SAC)<br/>
//                       Indian Institute of Technology Madras<br/>
//                       Chennai, 600036
//                   </p>
//               </div>
//           </div>

//       </div>
//     </section>
//   );
// }




"use client";

import { Mail, Instagram, Youtube, MapPin, ArrowUpRight, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function TheManifesto() {
  return (
    <section className="min-h-screen bg-[#050505] text-[#f0f0f0] pt-32 pb-24 px-6 md:px-24">
      
      <div className="max-w-6xl mx-auto">
          
          {/* 1. THE STORY */}
          <div className="mb-32">
              <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white/60 mb-8">
                  The Philosophy
              </span>
              
              <h1 className="text-4xl md:text-7xl font-serif leading-tight mb-12 text-white">
                  We are a group of engineers<br/> 
                  who fell in love with <span className="text-red-500 italic">Storytelling.</span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg md:text-xl font-serif leading-relaxed text-white/70">
                  <div className="space-y-6">
                      <p>
                          At IIT Madras, everyone is building the future. But at Aayam, we are trying to understand the present. We are trying to understand what it means to be human.
                      </p>
                      <p>
                          We don't just put on plays. We build families. We spend late nights painting sets, rewriting scripts, and rehearsing lines until they feel like the truth.
                      </p>
                  </div>
                  <div className="space-y-6">
                      <p>
                          Whether it's a street play that makes you question society, or a stage play that makes you cry in the dark—we do it because we love it. 
                      </p>
                      <p className="text-white font-medium">
                          And we want you to be a part of it.
                      </p>

                      {/* --- THE SIGNATURE (The Heart) --- */}
                      <div className="mt-16 pt-8 border-t border-white/10">
                          <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-4">
                              From the core of my heart,
                          </p>
                          
                          <div className="relative inline-block">
                              {/* The Name */}
                              <span className="block text-3xl md:text-4xl font-serif text-white mb-1">
                                  Siddharth
                              </span>
                              
                              {/* The Title (Struck Through) */}
                              <div className="relative inline-block">
                                  <span className="text-sm font-mono text-white/30 uppercase tracking-widest">
                                      The Secretary
                                  </span>
                                  {/* The Red Strike Line */}
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute top-1/2 left-0 h-[1px] bg-red-500 -rotate-2"
                                  />
                              </div>

                              {/* The Real Identity */}
                              <motion.span 
                                initial={{ opacity: 0, y: 5 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1.5 }}
                                className="block mt-2 font-serif italic text-gold-500 text-lg"
                              >
                                  "Just your friend."
                              </motion.span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* 2. THE CONTACT GRID */}
          <div className="border-t border-white/10 pt-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif text-white">
                      Let's Connect.
                  </h2>
                  <p className="text-white/50 mt-2 md:mt-0">
                      We reply to every message.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* INSTAGRAM */}
                  <a href="https://www.instagram.com/iitmbs_dramasociety" target="_blank" className="group bg-[#0a0a0a] p-8 rounded-xl border border-white/5 hover:border-red-500/50 hover:bg-[#0f0f0f] transition-all duration-300">
                      <div className="flex justify-between items-start mb-8">
                          <Instagram className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors" />
                          <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-serif text-white mb-1">Instagram</h3>
                      <p className="text-sm text-white/40">@iitmbs_dramasociety</p>
                  </a>

                  {/* EMAIL */}
                  <a href="mailto:drama.society@study.iitm.ac.in" className="group bg-[#0a0a0a] p-8 rounded-xl border border-white/5 hover:border-red-500/50 hover:bg-[#0f0f0f] transition-all duration-300">
                      <div className="flex justify-between items-start mb-8">
                          <Mail className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors" />
                          <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-serif text-white mb-1">Email</h3>
                      <p className="text-sm text-white/40">drama.society@study.iitm.ac.in</p>
                  </a>

                  {/* YOUTUBE */}
                  <a href="https://www.youtube.com/@AayamIITMBSDramaSociety" target="_blank" className="group bg-[#0a0a0a] p-8 rounded-xl border border-white/5 hover:border-red-500/50 hover:bg-[#0f0f0f] transition-all duration-300">
                      <div className="flex justify-between items-start mb-8">
                          <Youtube className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors" />
                          <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-serif text-white mb-1">YouTube</h3>
                      <p className="text-sm text-white/40">Watch our performances</p>
                  </a>

                  {/* LINKTREE (Digital HQ) */}
                  <a href="https://linktr.ee/aayamdramasociety" target="_blank" className="group bg-[#0a0a0a] p-8 rounded-xl border border-white/5 hover:border-green-500/50 hover:bg-[#0f0f0f] transition-all duration-300">
                      <div className="flex justify-between items-start mb-8">
                          {/* Icon changes from MapPin to Link */}
                          <LinkIcon className="w-8 h-8 text-white/40 group-hover:text-green-500 transition-colors" />
                          <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-serif text-white mb-1">Digital HQ</h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                          All our links in one place.<br/>
                          Linktree / Events / Forms
                      </p>
                  </a>

              </div>
          </div>

      </div>
    </section>
  );
}
