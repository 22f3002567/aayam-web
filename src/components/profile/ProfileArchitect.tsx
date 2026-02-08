
// // "use client";

// // import { useRef, useState, useEffect } from "react";
// // import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { MemberProfile } from "@/types/schema";

// // // --- SPECIFIC ICONS ---
// // const PlayIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // const PauseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);
// // const ArrowLeft = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>);

// // // Social Icons Logic
// // const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
// // const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
// // const TwitterIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 6.6 4.5c2.1-.2 3.8.4 4.8 1.4l1-1h6.2z" /></svg>); // Simplified X/Bird
// // const MailIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
// // const LinkIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>);

// // // Helper to pick the icon
// // const getSocialIcon = (platform: string) => {
// //     const p = platform.toLowerCase();
// //     if (p.includes('insta')) return <InstagramIcon />;
// //     if (p.includes('linkedin')) return <LinkedinIcon />;
// //     if (p.includes('twitter') || p.includes('x.com')) return <TwitterIcon />;
// //     return <LinkIcon />;
// // };

// // // --- ANIMATION CONSTANTS ---
// // const FADE_UP = {
// //     hidden: { opacity: 0, y: 40 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
// // };
// // const STAGGER_CHILDREN = {
// //     hidden: { opacity: 0 },
// //     visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
// // };

// // export default function ProfileArchitect({ member }: { member: MemberProfile }) {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const RASA = member.color || "#eab308";

// //   // SCROLL PHYSICS
// //   const { scrollY } = useScroll();
// //   const heroParallax = useTransform(scrollY, [0, 1000], [0, 500]); 
// //   const textParallax = useTransform(scrollY, [0, 1000], [0, -200]);
// //   const [isScrolled, setIsScrolled] = useState(false);

// //   useMotionValueEvent(scrollY, "change", (latest) => {
// //     setIsScrolled(latest > 100);
// //   });

// //   // AUDIO ENGINE
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const audioRef = useRef<HTMLAudioElement | null>(null);
// //   const [audioProgress, setAudioProgress] = useState(0);

// //   useEffect(() => {
// //     const audio = audioRef.current;
// //     if (!audio) return;
// //     const updateProgress = () => setAudioProgress((audio.currentTime / audio.duration) * 100);
// //     if (isPlaying) {
// //         audio.play().catch(() => setIsPlaying(false));
// //         audio.addEventListener('timeupdate', updateProgress);
// //     } else {
// //         audio.pause();
// //         audio.removeEventListener('timeupdate', updateProgress);
// //     }
// //     return () => audio.removeEventListener('timeupdate', updateProgress);
// //   }, [isPlaying]);

// //   return (
// //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] text-white selection:bg-white/20 selection:text-black overflow-hidden font-sans">
      
// //       {/* ATMOSPHERE */}
// //       <div 
// //         className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[150px] pointer-events-none opacity-20 mix-blend-screen animate-pulse-slow"
// //         style={{ background: `radial-gradient(circle, ${RASA}, transparent 70%)` }}
// //       />
// //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.07] bg-[url('/noise.png')] mix-blend-overlay" />

// //       {/* NAVIGATION */}
// //       <nav 
// //         className={`fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
// //       >
// //         <Link href="/ensemble" className="group flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
// //             <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
// //                 <ArrowLeft />
// //             </span>
// //             <span className="hidden md:inline group-hover:translate-x-1 transition-transform">The Lineage</span>
// //         </Link>
        
// //         {/* SOCIAL ORBIT (Top Right) */}
// //         <div className="flex gap-3">
// //             {member.social_links && Object.entries(member.social_links).map(([platform, url]: [string, any]) => (
// //                 <a 
// //                     key={platform} 
// //                     href={url} 
// //                     target="_blank" 
// //                     rel="noopener noreferrer" 
// //                     className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70" 
// //                     title={platform}
// //                     style={{ boxShadow: `0 0 0 0px ${RASA}` }} 
// //                 >
// //                     {getSocialIcon(platform)}
// //                 </a>
// //             ))}
// //             {/* Contact Button in Nav (always visible) */}
// //             {member.email && (
// //                  <a 
// //                     href={`mailto:${member.email}`}
// //                     className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70"
// //                     title="Send Email"
// //                  >
// //                     <MailIcon />
// //                  </a>
// //             )}
// //         </div>
// //       </nav>


// //       {/* HERO SECTION */}
// //       <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
        
// //         {/* IMAGE BACKDROP (Fixed Opacity Issue) */}
// //         <motion.div style={{ y: heroParallax }} className="absolute inset-0 z-0">
// //              {member.image_url ? (
// //                 <Image 
// //                     src={member.image_url} 
// //                     alt={member.name} 
// //                     fill 
// //                     // REMOVED grayscale, INCREASED opacity
// //                     className="object-cover opacity-80 transition-all duration-[2s]" 
// //                     priority 
// //                 />
// //              ) : (
// //                 <div className="w-full h-full bg-[#080808] flex items-center justify-center">
// //                     <span className="text-white/10 text-9xl font-serif">?</span>
// //                 </div>
// //              )}
             
// //              {/* Gradient for Text Readability */}
// //              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
// //              <div className="absolute inset-0 mix-blend-color opacity-20" style={{ backgroundColor: RASA }} />
// //         </motion.div>

// //         {/* HERO CONTENT */}
// //         <motion.div 
// //             style={{ y: textParallax }}
// //             className="relative z-10 text-center flex flex-col items-center max-w-5xl px-6"
// //         >
// //             {/* Badge */}
// //             <motion.div 
// //                 initial={{ opacity: 0, width: 0 }}
// //                 animate={{ opacity: 1, width: "auto" }}
// //                 transition={{ duration: 1, delay: 0.5 }}
// //                 className="flex items-center gap-4 mb-8 overflow-hidden"
// //             >
// //                 <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
// //                 <span style={{ color: RASA, textShadow: `0 0 30px ${RASA}` }} className="text-xs md:text-sm uppercase tracking-[0.6em] font-bold whitespace-nowrap">
// //                     {member.role}
// //                 </span>
// //                 <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
// //             </motion.div>

// //             {/* Name */}
// //             <motion.h1 
// //                 initial={{ opacity: 0, y: 100 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
// //                 className="text-[15vw] md:text-[9rem] lg:text-[11rem] font-serif leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
// //             >
// //                 {member.name}
// //             </motion.h1>

// //             {/* ACTION BAR (Voice + Contact) */}
// //             <motion.div 
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 1.2 }}
// //                 className="mt-16 flex flex-wrap justify-center gap-6"
// //             >
// //                 {member.audio_url && (
// //                     <button 
// //                         onClick={() => setIsPlaying(!isPlaying)}
// //                         className="group relative flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:border-white/30"
// //                     >
// //                         <div className="absolute inset-0 bg-white/10 z-0 transition-all duration-300 origin-left" style={{ width: `${audioProgress}%`, backgroundColor: RASA, opacity: 0.2 }} />
// //                         <div style={{ color: RASA }} className="relative z-10 w-6 h-6 flex items-center justify-center">
// //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// //                         </div>
// //                         <div className="relative z-10 text-left">
// //                             <span className="block text-[10px] uppercase tracking-widest text-white/60">Voice Note</span>
// //                             <span className="block text-xs font-medium text-white">{isPlaying ? "Playing..." : "Listen to Artist"}</span>
// //                         </div>
// //                         <audio ref={audioRef} src={member.audio_url} onEnded={() => setIsPlaying(false)} />
// //                     </button>
// //                 )}

// //                 {member.email && (
// //                     <a 
// //                         href={`mailto:${member.email}`}
// //                         className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
// //                     >
// //                         <MailIcon />
// //                         <div className="text-left">
// //                              <span className="block text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100">Get in Touch</span>
// //                              <span className="block text-xs font-medium">Contact Me</span>
// //                         </div>
// //                     </a>
// //                 )}
// //             </motion.div>
// //         </motion.div>
// //       </section>

// //       {/* MANIFESTO & CAREER */}
// //       <motion.section 
// //         variants={STAGGER_CHILDREN}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true, margin: "-100px" }}
// //         className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32"
// //       >
// //           <div className="flex flex-col md:flex-row gap-20 md:gap-40 items-start">
// //               {/* Quote */}
// //               <div className="w-full md:w-1/2 md:sticky md:top-40">
// //                   <motion.div variants={FADE_UP}>
// //                       <span className="text-9xl font-serif text-white/10 absolute -top-12 -left-8">“</span>
// //                       <h2 className="text-3xl md:text-5xl font-serif italic leading-tight text-white/90 relative z-10">
// //                           {member.bio}
// //                       </h2>
// //                       <div style={{ backgroundColor: RASA }} className="w-32 h-1 mt-12 shadow-[0_0_20px_currentColor]" />
// //                   </motion.div>
// //               </div>

// //               {/* Career Timeline */}
// //               <div className="w-full md:w-1/2 flex flex-col gap-16">
// //                   <motion.div variants={FADE_UP}>
// //                       <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-6 mb-8">
// //                           The Career Arc
// //                       </h3>
// //                       <div className="flex flex-col gap-0 border-l border-white/10 ml-3">
// //                           {member.tenures?.map((tenure, i) => (
// //                               <div key={i} className="relative pl-10 pb-12 last:pb-0 group">
// //                                   <span 
// //                                     style={{ backgroundColor: tenure.is_current ? RASA : '#222' }}
// //                                     className={`absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#020202] transition-all duration-500 group-hover:scale-125 ${tenure.is_current ? 'shadow-[0_0_15px_currentColor]' : ''}`}
// //                                   />
// //                                   <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2">
// //                                       <span className="font-mono text-xs text-white/40">{tenure.year}</span>
// //                                       <span className="text-2xl font-serif text-white group-hover:text-white transition-colors">
// //                                           {tenure.role}
// //                                       </span>
// //                                   </div>
// //                               </div>
// //                           ))}
// //                       </div>
// //                   </motion.div>
// //               </div>
// //           </div>
// //       </motion.section>

// //       {/* REPERTOIRE (Gallery) */}
// //       <section className="relative z-10 w-full px-6 pb-40">
// //            <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
// //                 <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
// //                     <h3 className="text-5xl md:text-7xl font-serif text-white tracking-tight">Selected Works</h3>
// //                     <div className="flex items-center gap-4">
// //                         <span className="h-px w-12 bg-white/20" />
// //                         <span className="text-xs uppercase tracking-widest text-white/50">{member.credits?.length || 0} ARCHIVED PRODUCTIONS</span>
// //                     </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {member.credits?.length > 0 ? member.credits.map((credit, i) => (
// //                         <motion.div key={credit.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
// //                             <Link href={`/originals/${credit.play.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#050505] border border-white/5 hover:border-white/20 transition-colors">
// //                                 {credit.play.poster_url ? (
// //                                     <Image src={credit.play.poster_url} alt={credit.play.title} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />
// //                                 ) : (
// //                                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]"><span className="text-white/10 font-mono text-xs">NO POSTER</span></div>
// //                                 )}
// //                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />
// //                                 <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-color" style={{ backgroundColor: RASA }} />
// //                                 <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
// //                                     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
// //                                         <span style={{ color: RASA }} className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{credit.role}</span>
// //                                         <h4 className="text-3xl font-serif text-white mb-2 leading-none">{credit.play.title}</h4>
// //                                         <span className="font-mono text-xs text-white/40 block">{credit.play.year}</span>
// //                                     </div>
// //                                 </div>
// //                             </Link>
// //                         </motion.div>
// //                     )) : (
// //                         <div className="col-span-full py-32 text-center border border-dashed border-white/10 rounded-lg">
// //                             <span className="text-white/20 italic font-serif text-2xl block mb-4">"Silence."</span>
// //                             <span className="text-xs uppercase tracking-widest text-white/40">No productions found in the archive.</span>
// //                         </div>
// //                     )}
// //                 </div>
// //            </div>
// //       </section>
// //     </div>
// //   );
// // }

// // "use client";

// // import { useRef, useState, useEffect, useMemo } from "react";
// // import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { MemberProfile } from "@/types/schema";

// // // --- SPECIFIC ICONS ---
// // const PlayIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // const PauseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);
// // const ArrowLeft = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>);

// // // Social Icons Logic
// // const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
// // const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
// // const TwitterIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 6.6 4.5c2.1-.2 3.8.4 4.8 1.4l1-1h6.2z" /></svg>);
// // const MailIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
// // const LinkIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>);

// // const getSocialIcon = (platform: string) => {
// //     const p = platform.toLowerCase();
// //     if (p.includes('insta')) return <InstagramIcon />;
// //     if (p.includes('linkedin')) return <LinkedinIcon />;
// //     if (p.includes('twitter') || p.includes('x.com')) return <TwitterIcon />;
// //     return <LinkIcon />;
// // };

// // // --- ANIMATION CONSTANTS ---
// // const FADE_UP = {
// //     hidden: { opacity: 0, y: 40 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
// // };
// // const STAGGER_CHILDREN = {
// //     hidden: { opacity: 0 },
// //     visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
// // };

// // export default function ProfileArchitect({ member }: { member: MemberProfile }) {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const RASA = member.color || "#eab308";

// //   // SCROLL PHYSICS
// //   const { scrollY } = useScroll();
// //   const heroParallax = useTransform(scrollY, [0, 1000], [0, 500]); 
// //   const textParallax = useTransform(scrollY, [0, 1000], [0, -200]);
// //   const [isScrolled, setIsScrolled] = useState(false);

// //   useMotionValueEvent(scrollY, "change", (latest) => {
// //     setIsScrolled(latest > 100);
// //   });

// //   // AUDIO ENGINE
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const audioRef = useRef<HTMLAudioElement | null>(null);
// //   const [audioProgress, setAudioProgress] = useState(0);

// //   useEffect(() => {
// //     const audio = audioRef.current;
// //     if (!audio) return;
// //     const updateProgress = () => setAudioProgress((audio.currentTime / audio.duration) * 100);
// //     if (isPlaying) {
// //         audio.play().catch(() => setIsPlaying(false));
// //         audio.addEventListener('timeupdate', updateProgress);
// //     } else {
// //         audio.pause();
// //         audio.removeEventListener('timeupdate', updateProgress);
// //     }
// //     return () => audio.removeEventListener('timeupdate', updateProgress);
// //   }, [isPlaying]);


// //   // --- NEW: UNIFIED TIMELINE LOGIC ---
// //   const timeline = useMemo(() => {
// //     const list = [];
    
// //     // 1. Add Tenures (Office Roles)
// //     member.tenures?.forEach(t => {
// //         list.push({
// //             type: 'tenure',
// //             year: t.year,
// //             title: t.role,
// //             subtitle: t.is_current ? 'Current Office' : 'Office Bearer',
// //             isCurrent: t.is_current
// //         });
// //     });

// //     // 2. Add Credits (Creative Roles)
// //     member.credits?.forEach(c => {
// //         list.push({
// //             type: 'credit',
// //             year: c.play.year,
// //             title: c.role,
// //             subtitle: c.play.title, // "Director • Shor"
// //             isCurrent: false
// //         });
// //     });

// //     // 3. Sort by Year (Descending - Newest First)
// //     // We assume '2025-26' can be sorted by the first 4 digits
// //     return list.sort((a, b) => parseInt(b.year) - parseInt(a.year));
// //   }, [member]);


// //   return (
// //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] text-white selection:bg-white/20 selection:text-black overflow-hidden font-sans">
      
// //       {/* ATMOSPHERE */}
// //       <div 
// //         className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[150px] pointer-events-none opacity-20 mix-blend-screen animate-pulse-slow"
// //         style={{ background: `radial-gradient(circle, ${RASA}, transparent 70%)` }}
// //       />
// //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.07] bg-[url('/noise.png')] mix-blend-overlay" />

// //       {/* NAVIGATION */}
// //       <nav 
// //         className={`fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
// //       >
// //         <Link href="/ensemble" className="group flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
// //             <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
// //                 <ArrowLeft />
// //             </span>
// //             <span className="hidden md:inline group-hover:translate-x-1 transition-transform">The Lineage</span>
// //         </Link>
        
// //         {/* SOCIAL ORBIT */}
// //         <div className="flex gap-3">
// //             {member.social_links && Object.entries(member.social_links).map(([platform, url]: [string, any]) => (
// //                 <a 
// //                     key={platform} 
// //                     href={url} 
// //                     target="_blank" 
// //                     rel="noopener noreferrer" 
// //                     className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70" 
// //                     title={platform}
// //                     style={{ boxShadow: `0 0 0 0px ${RASA}` }} 
// //                 >
// //                     {getSocialIcon(platform)}
// //                 </a>
// //             ))}
// //             {member.email && (
// //                  <a 
// //                     href={`mailto:${member.email}`}
// //                     className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70"
// //                     title="Send Email"
// //                  >
// //                     <MailIcon />
// //                  </a>
// //             )}
// //         </div>
// //       </nav>

// //       {/* HERO SECTION */}
// //       <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
// //         <motion.div style={{ y: heroParallax }} className="absolute inset-0 z-0">
// //              {member.image_url ? (
// //                 <Image 
// //                     src={member.image_url} 
// //                     alt={member.name} 
// //                     fill 
// //                     className="object-cover opacity-80 transition-all duration-[2s]" 
// //                     priority 
// //                 />
// //              ) : (
// //                 <div className="w-full h-full bg-[#080808] flex items-center justify-center">
// //                     <span className="text-white/10 text-9xl font-serif">?</span>
// //                 </div>
// //              )}
// //              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
// //              <div className="absolute inset-0 mix-blend-color opacity-20" style={{ backgroundColor: RASA }} />
// //         </motion.div>

// //         <motion.div 
// //             style={{ y: textParallax }}
// //             className="relative z-10 text-center flex flex-col items-center max-w-5xl px-6"
// //         >
// //             <motion.div 
// //                 initial={{ opacity: 0, width: 0 }}
// //                 animate={{ opacity: 1, width: "auto" }}
// //                 transition={{ duration: 1, delay: 0.5 }}
// //                 className="flex items-center gap-4 mb-8 overflow-hidden"
// //             >
// //                 <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
// //                 <span style={{ color: RASA, textShadow: `0 0 30px ${RASA}` }} className="text-xs md:text-sm uppercase tracking-[0.6em] font-bold whitespace-nowrap">
// //                     {member.role}
// //                 </span>
// //                 <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
// //             </motion.div>

// //             <motion.h1 
// //                 initial={{ opacity: 0, y: 100 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
// //                 className="text-[15vw] md:text-[9rem] lg:text-[11rem] font-serif leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
// //             >
// //                 {member.name}
// //             </motion.h1>

// //             <motion.div 
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 1.2 }}
// //                 className="mt-16 flex flex-wrap justify-center gap-6"
// //             >
// //                 {member.audio_url && (
// //                     <button 
// //                         onClick={() => setIsPlaying(!isPlaying)}
// //                         className="group relative flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:border-white/30"
// //                     >
// //                         <div className="absolute inset-0 bg-white/10 z-0 transition-all duration-300 origin-left" style={{ width: `${audioProgress}%`, backgroundColor: RASA, opacity: 0.2 }} />
// //                         <div style={{ color: RASA }} className="relative z-10 w-6 h-6 flex items-center justify-center">
// //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// //                         </div>
// //                         <div className="relative z-10 text-left">
// //                             <span className="block text-[10px] uppercase tracking-widest text-white/60">Voice Note</span>
// //                             <span className="block text-xs font-medium text-white">{isPlaying ? "Playing..." : "Listen to Artist"}</span>
// //                         </div>
// //                         <audio ref={audioRef} src={member.audio_url} onEnded={() => setIsPlaying(false)} />
// //                     </button>
// //                 )}
// //             </motion.div>
// //         </motion.div>
// //       </section>

// //       {/* MANIFESTO & UNIFIED CAREER ARC */}
// //       <motion.section 
// //         variants={STAGGER_CHILDREN}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true, margin: "-100px" }}
// //         className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32"
// //       >
// //           <div className="flex flex-col md:flex-row gap-20 md:gap-40 items-start">
              
// //               {/* QUOTE */}
// //               <div className="w-full md:w-1/2 md:sticky md:top-40">
// //                   <motion.div variants={FADE_UP}>
// //                       <span className="text-9xl font-serif text-white/10 absolute -top-12 -left-8">“</span>
// //                       <h2 className="text-3xl md:text-5xl font-serif italic leading-tight text-white/90 relative z-10">
// //                           {member.bio}
// //                       </h2>
// //                       <div style={{ backgroundColor: RASA }} className="w-32 h-1 mt-12 shadow-[0_0_20px_currentColor]" />
// //                   </motion.div>
// //               </div>

// //               {/* TIMELINE (MERGED) */}
// //               <div className="w-full md:w-1/2 flex flex-col gap-16">
// //                   <motion.div variants={FADE_UP}>
// //                       <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-6 mb-8">
// //                           The Complete Journey
// //                       </h3>
// //                       <div className="flex flex-col gap-0 border-l border-white/10 ml-3">
// //                           {timeline.map((item: any, i) => (
// //                               <div key={i} className="relative pl-10 pb-12 last:pb-0 group">
// //                                   {/* Dot Color: Gold for Tenure, Grey for Credit */}
// //                                   <span 
// //                                     style={{ backgroundColor: item.type === 'tenure' ? RASA : '#444' }}
// //                                     className={`absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#020202] transition-all duration-500 group-hover:scale-125 ${item.isCurrent ? 'shadow-[0_0_15px_currentColor]' : ''}`}
// //                                   />
                                  
// //                                   <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-2">
// //                                       <span className="font-mono text-xs text-white/40">{item.year}</span>
// //                                       <span className="text-2xl font-serif text-white group-hover:text-white transition-colors">
// //                                           {item.title}
// //                                       </span>
                                      
// //                                       {/* Subtitle: "Current Office" vs "Play Name" */}
// //                                       <span style={{ color: item.type === 'tenure' ? RASA : 'rgba(255,255,255,0.4)' }} className="text-[10px] uppercase tracking-widest font-bold">
// //                                           {item.subtitle}
// //                                       </span>
// //                                   </div>
// //                               </div>
// //                           ))}
                          
// //                           {timeline.length === 0 && (
// //                             <div className="text-white/20 italic">No timeline data available.</div>
// //                           )}
// //                       </div>
// //                   </motion.div>
// //               </div>
// //           </div>
// //       </motion.section>

// //       {/* SELECTED WORKS (Gallery) */}
// //       <section className="relative z-10 w-full px-6 pb-40">
// //            <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
// //                 <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
// //                     <h3 className="text-5xl md:text-7xl font-serif text-white tracking-tight">Selected Works</h3>
// //                     <div className="flex items-center gap-4">
// //                         <span className="h-px w-12 bg-white/20" />
// //                         <span className="text-xs uppercase tracking-widest text-white/50">{member.credits?.length || 0} ARCHIVED PRODUCTIONS</span>
// //                     </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {member.credits?.length > 0 ? member.credits.map((credit, i) => (
// //                         <motion.div key={credit.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
// //                             <Link href={`/originals/${credit.play.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#050505] border border-white/5 hover:border-white/20 transition-colors">
// //                                 {credit.play.poster_url ? (
// //                                     <Image src={credit.play.poster_url} alt={credit.play.title} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />
// //                                 ) : (
// //                                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]"><span className="text-white/10 font-mono text-xs">NO POSTER</span></div>
// //                                 )}
// //                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />
// //                                 <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-color" style={{ backgroundColor: RASA }} />
// //                                 <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
// //                                     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
// //                                         <span style={{ color: RASA }} className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{credit.role}</span>
// //                                         <h4 className="text-3xl font-serif text-white mb-2 leading-none">{credit.play.title}</h4>
// //                                         <span className="font-mono text-xs text-white/40 block">{credit.play.year}</span>
// //                                     </div>
// //                                 </div>
// //                             </Link>
// //                         </motion.div>
// //                     )) : (
// //                         <div className="col-span-full py-32 text-center border border-dashed border-white/10 rounded-lg">
// //                             <span className="text-white/20 italic font-serif text-2xl block mb-4">"Silence."</span>
// //                             <span className="text-xs uppercase tracking-widest text-white/40">No productions found in the archive.</span>
// //                         </div>
// //                     )}
// //                 </div>
// //            </div>
// //       </section>
// //     </div>
// //   );
// // }



// // "use client";

// // import { useRef, useState, useEffect, useMemo } from "react";
// // import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { MemberProfile } from "@/types/schema";

// // // --- ICONS ---
// // const PlayIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// // const PauseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);
// // const ArrowLeft = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>);
// // const DownArrow = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>);
// // const UpArrow = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>);

// // // Social Icons Logic
// // const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
// // const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
// // const TwitterIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 6.6 4.5c2.1-.2 3.8.4 4.8 1.4l1-1h6.2z" /></svg>);
// // const MailIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
// // const LinkIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>);

// // const getSocialIcon = (platform: string) => {
// //     const p = platform.toLowerCase();
// //     if (p.includes('insta')) return <InstagramIcon />;
// //     if (p.includes('linkedin')) return <LinkedinIcon />;
// //     if (p.includes('twitter') || p.includes('x.com')) return <TwitterIcon />;
// //     return <LinkIcon />;
// // };

// // // --- CONSTANTS ---
// // const TIMELINE_LIMIT = 6; // Show top 6 by default

// // const FADE_UP = {
// //     hidden: { opacity: 0, y: 40 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
// // };
// // const STAGGER_CHILDREN = {
// //     hidden: { opacity: 0 },
// //     visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
// // };

// // export default function ProfileArchitect({ member }: { member: MemberProfile }) {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const RASA = member.color || "#eab308";

// //   // SCROLL PHYSICS
// //   const { scrollY } = useScroll();
// //   const heroParallax = useTransform(scrollY, [0, 1000], [0, 500]); 
// //   const textParallax = useTransform(scrollY, [0, 1000], [0, -200]);
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [isExpanded, setIsExpanded] = useState(false); // STATE FOR TIMELINE EXPANSION

// //   useMotionValueEvent(scrollY, "change", (latest) => {
// //     setIsScrolled(latest > 100);
// //   });

// //   // AUDIO ENGINE
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const audioRef = useRef<HTMLAudioElement | null>(null);
// //   const [audioProgress, setAudioProgress] = useState(0);

// //   useEffect(() => {
// //     const audio = audioRef.current;
// //     if (!audio) return;
// //     const updateProgress = () => setAudioProgress((audio.currentTime / audio.duration) * 100);
// //     if (isPlaying) {
// //         audio.play().catch(() => setIsPlaying(false));
// //         audio.addEventListener('timeupdate', updateProgress);
// //     } else {
// //         audio.pause();
// //         audio.removeEventListener('timeupdate', updateProgress);
// //     }
// //     return () => audio.removeEventListener('timeupdate', updateProgress);
// //   }, [isPlaying]);


// //   // --- UNIFIED TIMELINE LOGIC ---
// //   const timeline = useMemo(() => {
// //     const list = [];
    
// //     // 1. Add Tenures (Office Roles)
// //     member.tenures?.forEach(t => {
// //         list.push({
// //             type: 'tenure',
// //             year: t.year,
// //             title: t.role,
// //             subtitle: t.is_current ? 'Current Office' : 'Office Bearer',
// //             isCurrent: t.is_current
// //         });
// //     });

// //     // 2. Add Credits (Creative Roles)
// //     member.credits?.forEach(c => {
// //         list.push({
// //             type: 'credit',
// //             year: c.play.year,
// //             title: c.role,
// //             subtitle: c.play.title, 
// //             isCurrent: false
// //         });
// //     });

// //     // 3. Sort by Year (Descending)
// //     return list.sort((a, b) => parseInt(b.year) - parseInt(a.year));
// //   }, [member]);

// //   // Determine which items to show
// //   const visibleTimeline = isExpanded ? timeline : timeline.slice(0, TIMELINE_LIMIT);
// //   const showExpandButton = timeline.length > TIMELINE_LIMIT;


// //   return (
// //     <div ref={containerRef} className="relative min-h-screen bg-[#020202] text-white selection:bg-white/20 selection:text-black overflow-hidden font-sans">
      
// //       {/* ATMOSPHERE */}
// //       <div 
// //         className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[150px] pointer-events-none opacity-20 mix-blend-screen animate-pulse-slow"
// //         style={{ background: `radial-gradient(circle, ${RASA}, transparent 70%)` }}
// //       />
// //       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.07] bg-[url('/noise.png')] mix-blend-overlay" />

// //       {/* NAVIGATION */}
// //       <nav 
// //         className={`fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
// //       >
// //         <Link href="/ensemble" className="group flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
// //             <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
// //                 <ArrowLeft />
// //             </span>
// //             <span className="hidden md:inline group-hover:translate-x-1 transition-transform">The Lineage</span>
// //         </Link>
        
// //         {/* SOCIAL ORBIT */}
// //         <div className="flex gap-3">
// //             {member.social_links && Object.entries(member.social_links).map(([platform, url]: [string, any]) => (
// //                 <a 
// //                     key={platform} 
// //                     href={url} 
// //                     target="_blank" 
// //                     rel="noopener noreferrer" 
// //                     className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70" 
// //                     title={platform}
// //                     style={{ boxShadow: `0 0 0 0px ${RASA}` }} 
// //                 >
// //                     {getSocialIcon(platform)}
// //                 </a>
// //             ))}
// //             {member.email && (
// //                  <a 
// //                     href={`mailto:${member.email}`}
// //                     className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70"
// //                     title="Send Email"
// //                  >
// //                     <MailIcon />
// //                  </a>
// //             )}
// //         </div>
// //       </nav>

// //       {/* HERO SECTION */}
// //       <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
// //         <motion.div style={{ y: heroParallax }} className="absolute inset-0 z-0">
// //              {member.image_url ? (
// //                 <Image 
// //                     src={member.image_url} 
// //                     alt={member.name} 
// //                     fill 
// //                     className="object-cover opacity-80 transition-all duration-[2s]" 
// //                     priority 
// //                 />
// //              ) : (
// //                 <div className="w-full h-full bg-[#080808] flex items-center justify-center">
// //                     <span className="text-white/10 text-9xl font-serif">?</span>
// //                 </div>
// //              )}
// //              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
// //              <div className="absolute inset-0 mix-blend-color opacity-20" style={{ backgroundColor: RASA }} />
// //         </motion.div>

// //         <motion.div 
// //             style={{ y: textParallax }}
// //             className="relative z-10 text-center flex flex-col items-center max-w-5xl px-6"
// //         >
// //             <motion.div 
// //                 initial={{ opacity: 0, width: 0 }}
// //                 animate={{ opacity: 1, width: "auto" }}
// //                 transition={{ duration: 1, delay: 0.5 }}
// //                 className="flex items-center gap-4 mb-8 overflow-hidden"
// //             >
// //                 <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
// //                 <span style={{ color: RASA, textShadow: `0 0 30px ${RASA}` }} className="text-xs md:text-sm uppercase tracking-[0.6em] font-bold whitespace-nowrap">
// //                     {member.role}
// //                 </span>
// //                 <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
// //             </motion.div>

// //             <motion.h1 
// //                 initial={{ opacity: 0, y: 100 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
// //                 className="text-[15vw] md:text-[9rem] lg:text-[11rem] font-serif leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
// //             >
// //                 {member.name}
// //             </motion.h1>

// //             <motion.div 
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 1.2 }}
// //                 className="mt-16 flex flex-wrap justify-center gap-6"
// //             >
// //                 {member.audio_url && (
// //                     <button 
// //                         onClick={() => setIsPlaying(!isPlaying)}
// //                         className="group relative flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:border-white/30"
// //                     >
// //                         <div className="absolute inset-0 bg-white/10 z-0 transition-all duration-300 origin-left" style={{ width: `${audioProgress}%`, backgroundColor: RASA, opacity: 0.2 }} />
// //                         <div style={{ color: RASA }} className="relative z-10 w-6 h-6 flex items-center justify-center">
// //                             {isPlaying ? <PauseIcon /> : <PlayIcon />}
// //                         </div>
// //                         <div className="relative z-10 text-left">
// //                             <span className="block text-[10px] uppercase tracking-widest text-white/60">Voice Note</span>
// //                             <span className="block text-xs font-medium text-white">{isPlaying ? "Playing..." : "Listen to Artist"}</span>
// //                         </div>
// //                         <audio ref={audioRef} src={member.audio_url} onEnded={() => setIsPlaying(false)} />
// //                     </button>
// //                 )}
// //             </motion.div>
// //         </motion.div>
// //       </section>
// // {/* ... (Previous Sections: Atmosphere, Nav, Hero) ... */}

// // // ... (Previous sections remain unchanged)

// //       {/* MANIFESTO & UNIFIED CAREER ARC */}
// //       <motion.section 
// //         variants={STAGGER_CHILDREN}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true, margin: "-100px" }}
// //         className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-32 md:py-48"
// //       >
// //           <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
              
// //               {/* LEFT COLUMN: The Artist Statement (Long Form) */}
// //               <div className="w-full lg:w-3/5">
// //                   <motion.div variants={FADE_UP} className="relative">
                      
// //                       {/* Decorative Quote Mark */}
// //                       <span className="text-[12rem] leading-none font-serif text-white/5 absolute -top-24 -left-12 select-none">“</span>
                      
// //                       {/* Editorial Layout Logic */}
// //                       {(() => {
// //                         const bioText = member.bio || "An artist of the Aayam Ensemble.";
// //                         const splitIndex = bioText.indexOf('.') + 1 || bioText.indexOf('\n') + 1 || bioText.length;
// //                         const headline = bioText.slice(0, splitIndex);
// //                         const body = bioText.slice(splitIndex);

// //                         return (
// //                             <div>
// //                                 <h2 className="text-3xl md:text-5xl font-serif text-white leading-[1.1] mb-8 relative z-10">
// //                                     {headline}
// //                                 </h2>
// //                                 <div style={{ backgroundColor: RASA }} className="w-24 h-1 mb-10 shadow-[0_0_20px_currentColor]" />
// //                                 {body && (
// //                                     <div className="prose prose-lg prose-invert text-white/70 font-sans leading-relaxed whitespace-pre-wrap">
// //                                         {body.trim()}
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         );
// //                       })()}
                      
// //                   </motion.div>
// //               </div>

// //               {/* RIGHT COLUMN: The Unified Timeline */}
// //               <div className="w-full lg:w-2/5 lg:sticky lg:top-32">
// //                   <motion.div variants={FADE_UP} className="relative">
                       
// //                       <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
// //                           <span className="text-xs uppercase tracking-[0.3em] text-white/40">The Journey</span>
// //                           <span className="text-xs font-mono text-gold-500">
// //                              {timeline.length} MILESTONES
// //                           </span>
// //                       </div>

// //                       {/* THE LIST */}
// //                       <div className="flex flex-col gap-0 border-l border-white/10 ml-3">
// //                           <AnimatePresence initial={false}>
// //                               {visibleTimeline.map((item: any, i) => (
// //                                   <motion.div 
// //                                     key={`${item.title}-${item.year}-${i}`}
// //                                     initial={{ opacity: 0, height: 0 }}
// //                                     animate={{ opacity: 1, height: "auto" }}
// //                                     exit={{ opacity: 0, height: 0 }}
// //                                     transition={{ duration: 0.3 }}
// //                                     // FIX APPLIED HERE:
// //                                     // 1. -ml-4 pulls the box 16px to the LEFT (covering the border area)
// //                                     // 2. pl-14 pushes content back (40px + 16px = 56px) so text aligns perfectly
// //                                     // 3. overflow-hidden no longer clips the dot because the box is wider
// //                                     className="relative -ml-4 pl-14 pb-12 last:pb-0 group overflow-hidden"
// //                                   >
// //                                       {/* Dot */}
// //                                       <span 
// //                                         style={{ backgroundColor: item.type === 'tenure' ? RASA : '#333' }}
// //                                         // FIX APPLIED HERE:
// //                                         // left-[11px] centers it exactly on the visual border line
// //                                         // (16px margin - 5px offset = 11px)
// //                                         className={`absolute left-[11px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#020202] transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_10px_currentColor]`}
// //                                       />
                                      
// //                                       {/* Content */}
// //                                       <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-2">
// //                                           <span className="font-mono text-xs text-white/30">{item.year}</span>
// //                                           <span className="text-xl md:text-2xl font-serif text-white/90 group-hover:text-white transition-colors">
// //                                               {item.title}
// //                                           </span>
// //                                           <span className={`text-[10px] uppercase tracking-widest font-bold ${item.type === 'tenure' ? 'text-white/60' : 'text-white/40'}`}>
// //                                               {item.subtitle}
// //                                           </span>
// //                                       </div>
// //                                   </motion.div>
// //                               ))}
// //                           </AnimatePresence>

// //                           {/* Expand Button */}
// //                           {showExpandButton && (
// //                             <div className="relative pt-6 pl-10">
// //                                 <button 
// //                                     onClick={() => setIsExpanded(!isExpanded)}
// //                                     className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
// //                                 >
// //                                     {isExpanded ? "Collapse" : "View Full History"}
// //                                     {isExpanded ? <UpArrow /> : <DownArrow />}
// //                                 </button>
// //                             </div>
// //                           )}
// //                       </div>

// //                   </motion.div>
// //               </div>
// //           </div>
// //       </motion.section>

// //       {/* ... (Next Section: Selected Works) ... */}
// //       {/* SELECTED WORKS (Gallery) */}
// //       <section className="relative z-10 w-full px-6 pb-40">
// //            <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
// //                 <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
// //                     <h3 className="text-5xl md:text-7xl font-serif text-white tracking-tight">Selected Works</h3>
// //                     <div className="flex items-center gap-4">
// //                         <span className="h-px w-12 bg-white/20" />
// //                         <span className="text-xs uppercase tracking-widest text-white/50">{member.credits?.length || 0} ARCHIVED PRODUCTIONS</span>
// //                     </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {member.credits?.length > 0 ? member.credits.map((credit, i) => (
// //                         <motion.div key={credit.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
// //                             <Link href={`/originals/${credit.play.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#050505] border border-white/5 hover:border-white/20 transition-colors">
// //                                 {credit.play.poster_url ? (
// //                                     <Image src={credit.play.poster_url} alt={credit.play.title} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />
// //                                 ) : (
// //                                     <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]"><span className="text-white/10 font-mono text-xs">NO POSTER</span></div>
// //                                 )}
// //                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />
// //                                 <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-color" style={{ backgroundColor: RASA }} />
// //                                 <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
// //                                     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
// //                                         <span style={{ color: RASA }} className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{credit.role}</span>
// //                                         <h4 className="text-3xl font-serif text-white mb-2 leading-none">{credit.play.title}</h4>
// //                                         <span className="font-mono text-xs text-white/40 block">{credit.play.year}</span>
// //                                     </div>
// //                                 </div>
// //                             </Link>
// //                         </motion.div>
// //                     )) : (
// //                         <div className="col-span-full py-32 text-center border border-dashed border-white/10 rounded-lg">
// //                             <span className="text-white/20 italic font-serif text-2xl block mb-4">"Silence."</span>
// //                             <span className="text-xs uppercase tracking-widest text-white/40">No productions found in the archive.</span>
// //                         </div>
// //                     )}
// //                 </div>
// //            </div>
// //       </section>
// //     </div>
// //   );
// // }
// "use client";

// import { useRef, useState, useEffect, useMemo } from "react";
// import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, Variants } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { MemberProfile } from "@/types/schema";

// // ... (Icons remain the same) ...
// const PlayIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
// const PauseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);
// const ArrowLeft = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>);
// const DownArrow = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>);
// const UpArrow = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>);
// const MailIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);

// // Social Icons
// const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
// const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
// const TwitterIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 6.6 4.5c2.1-.2 3.8.4 4.8 1.4l1-1h6.2z" /></svg>);
// const LinkIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>);

// const getSocialIcon = (platform: string) => {
//     const p = platform.toLowerCase();
//     if (p.includes('insta')) return <InstagramIcon />;
//     if (p.includes('linkedin')) return <LinkedinIcon />;
//     if (p.includes('twitter') || p.includes('x.com')) return <TwitterIcon />;
//     return <LinkIcon />;
// };

// // --- TYPES ---
// // FIX: Define the shape of a Timeline Item to satisfy TypeScript
// interface TimelineItem {
//     type: 'tenure' | 'credit';
//     year: string;
//     title: string;
//     subtitle: string;
//     isCurrent: boolean;
// }

// // --- CONSTANTS ---
// const TIMELINE_LIMIT = 6;

// const FADE_UP: Variants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
// };
// const STAGGER_CHILDREN: Variants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
// };

// export default function ProfileArchitect({ member }: { member: MemberProfile }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const RASA = member.color || "#eab308";

//   // SCROLL PHYSICS
//   const { scrollY } = useScroll();
//   const heroParallax = useTransform(scrollY, [0, 1000], [0, 500]); 
//   const textParallax = useTransform(scrollY, [0, 1000], [0, -200]);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useMotionValueEvent(scrollY, "change", (latest) => {
//     setIsScrolled(latest > 100);
//   });

//   // AUDIO ENGINE
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [audioProgress, setAudioProgress] = useState(0);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     const updateProgress = () => setAudioProgress((audio.currentTime / audio.duration) * 100);
//     if (isPlaying) {
//         audio.play().catch(() => setIsPlaying(false));
//         audio.addEventListener('timeupdate', updateProgress);
//     } else {
//         audio.pause();
//         audio.removeEventListener('timeupdate', updateProgress);
//     }
//     return () => audio.removeEventListener('timeupdate', updateProgress);
//   }, [isPlaying]);


//   // --- UNIFIED TIMELINE LOGIC ---
//   const timeline = useMemo(() => {
//     // FIX: Typed Array
//     const list: TimelineItem[] = []; 
    
//     // 1. Tenures
//     member.tenures?.forEach(t => {
//         list.push({
//             type: 'tenure',
//             year: t.year,
//             title: t.role,
//             subtitle: t.is_current ? 'Current Office' : 'Office Bearer',
//             isCurrent: t.is_current
//         });
//     });

//     // 2. Credits
//     member.credits?.forEach(c => {
//         list.push({
//             type: 'credit',
//             year: c.play.year,
//             title: c.role,
//             subtitle: c.play.title, 
//             isCurrent: false
//         });
//     });

//     return list.sort((a, b) => parseInt(b.year) - parseInt(a.year));
//   }, [member]);

//   const visibleTimeline = isExpanded ? timeline : timeline.slice(0, TIMELINE_LIMIT);
//   const showExpandButton = timeline.length > TIMELINE_LIMIT;


//   return (
//     <div ref={containerRef} className="relative min-h-screen bg-[#020202] text-white selection:bg-white/20 selection:text-black overflow-hidden font-sans">
      
//       {/* ATMOSPHERE */}
//       <div 
//         className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[150px] pointer-events-none opacity-20 mix-blend-screen animate-pulse-slow"
//         style={{ background: `radial-gradient(circle, ${RASA}, transparent 70%)` }}
//       />
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.07] bg-[url('/noise.png')] mix-blend-overlay" />

//       {/* NAVIGATION */}
//       <nav 
//         className={`fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
//       >
//         <Link href="/ensemble" className="group flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
//             <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
//                 <ArrowLeft />
//             </span>
//             <span className="hidden md:inline group-hover:translate-x-1 transition-transform">The Lineage</span>
//         </Link>
//         <div className="flex gap-3">
//             {member.social_links && Object.entries(member.social_links).map(([platform, url]: [string, any]) => (
//                 <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70" style={{ boxShadow: `0 0 0 0px ${RASA}` }}>{getSocialIcon(platform)}</a>
//             ))}
//             {member.email && (
//                  <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70"><MailIcon /></a>
//             )}
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
//         <motion.div style={{ y: heroParallax }} className="absolute inset-0 z-0">
//              {member.image_url ? (
//                 <Image src={member.image_url} alt={member.name} fill className="object-cover opacity-80 transition-all duration-[2s]" priority />
//              ) : (
//                 <div className="w-full h-full bg-[#080808] flex items-center justify-center"><span className="text-white/10 text-9xl font-serif">?</span></div>
//              )}
//              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
//              <div className="absolute inset-0 mix-blend-color opacity-20" style={{ backgroundColor: RASA }} />
//         </motion.div>

//         <motion.div style={{ y: textParallax }} className="relative z-10 text-center flex flex-col items-center max-w-5xl px-6">
//             <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} transition={{ duration: 1, delay: 0.5 }} className="flex items-center gap-4 mb-8 overflow-hidden">
//                 <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
//                 <span style={{ color: RASA, textShadow: `0 0 30px ${RASA}` }} className="text-xs md:text-sm uppercase tracking-[0.6em] font-bold whitespace-nowrap">{member.role}</span>
//                 <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
//             </motion.div>
//             <motion.h1 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="text-[15vw] md:text-[9rem] lg:text-[11rem] font-serif leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">{member.name}</motion.h1>
            
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-16 flex flex-wrap justify-center gap-6">
//                 {member.audio_url && (
//                     <button onClick={() => setIsPlaying(!isPlaying)} className="group relative flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:border-white/30">
//                         <div className="absolute inset-0 bg-white/10 z-0 transition-all duration-300 origin-left" style={{ width: `${audioProgress}%`, backgroundColor: RASA, opacity: 0.2 }} />
//                         <div style={{ color: RASA }} className="relative z-10 w-6 h-6 flex items-center justify-center">{isPlaying ? <PauseIcon /> : <PlayIcon />}</div>
//                         <div className="relative z-10 text-left">
//                             <span className="block text-[10px] uppercase tracking-widest text-white/60">Voice Note</span>
//                             <span className="block text-xs font-medium text-white">{isPlaying ? "Playing..." : "Listen to Artist"}</span>
//                         </div>
//                         <audio ref={audioRef} src={member.audio_url} onEnded={() => setIsPlaying(false)} />
//                     </button>
//                 )}
//             </motion.div>
//         </motion.div>
//       </section>

//       {/* MANIFESTO & TIMELINE */}
//       <motion.section 
//         variants={STAGGER_CHILDREN}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-32 md:py-48"
//       >
//           <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
              
//               {/* LEFT: ARTIST STATEMENT */}
//               <div className="w-full lg:w-3/5">
//                   <motion.div variants={FADE_UP} className="relative">
//                       <span className="text-[12rem] leading-none font-serif text-white/5 absolute -top-24 -left-12 select-none">“</span>
//                       {(() => {
//                         const bioText = member.bio || "An artist of the Aayam Ensemble.";
//                         const splitIndex = bioText.indexOf('.') + 1 || bioText.indexOf('\n') + 1 || bioText.length;
//                         const headline = bioText.slice(0, splitIndex);
//                         const body = bioText.slice(splitIndex);

//                         return (
//                             <div>
//                                 <h2 className="text-3xl md:text-5xl font-serif text-white leading-[1.1] mb-8 relative z-10">{headline}</h2>
//                                 <div style={{ backgroundColor: RASA }} className="w-24 h-1 mb-10 shadow-[0_0_20px_currentColor]" />
//                                 {body && <div className="prose prose-lg prose-invert text-white/70 font-sans leading-relaxed whitespace-pre-wrap">{body.trim()}</div>}
//                             </div>
//                         );
//                       })()}
//                   </motion.div>
//               </div>

//               {/* RIGHT: TIMELINE */}
//               <div className="w-full lg:w-2/5 lg:sticky lg:top-32">
//                   <motion.div variants={FADE_UP} className="relative">
                       
//                       <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
//                           <span className="text-xs uppercase tracking-[0.3em] text-white/40">The Journey</span>
//                           <span className="text-xs font-mono text-gold-500">{timeline.length} MILESTONES</span>
//                       </div>

//                       {/* THE TIMELINE CONTAINER */}
//                       <div className="flex flex-col gap-0 border-l border-white/10 ml-3">
//                           <AnimatePresence initial={false}>
//                               {visibleTimeline.map((item, i) => {
//                                   // Determine Dot Color
//                                   const dotColor = item.type === 'tenure' ? RASA : '#444';
//                                   // Determine Shadow for Current Role
//                                   const dotShadow = item.isCurrent ? `0 0 15px ${RASA}` : 'none';

//                                   return (
//                                       <motion.div 
//                                         key={`${item.title}-${item.year}-${i}`}
//                                         initial={{ opacity: 0, height: 0 }}
//                                         animate={{ opacity: 1, height: "auto" }}
//                                         exit={{ opacity: 0, height: 0 }}
//                                         transition={{ duration: 0.3 }}
//                                         className="relative -ml-[20px] pl-[60px] pb-12 last:pb-0 group overflow-hidden"
//                                       >
//                                           {/* THE DOT */}
//                                           <span 
//                                             style={{ backgroundColor: dotColor, boxShadow: dotShadow }}
//                                             className="absolute left-[15px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#020202] transition-all duration-500 group-hover:scale-125"
//                                           />
                                          
//                                           {/* THE CONTENT */}
//                                           <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-2">
//                                               <span className="font-mono text-xs text-white/30">{item.year}</span>
//                                               <span className="text-xl md:text-2xl font-serif text-white/90 group-hover:text-white transition-colors">
//                                                   {item.title}
//                                               </span>
//                                               <span 
//                                                 style={{ color: item.type === 'tenure' ? RASA : 'rgba(255,255,255,0.4)' }}
//                                                 className="text-[10px] uppercase tracking-widest font-bold"
//                                               >
//                                                   {item.subtitle}
//                                               </span>
//                                           </div>
//                                       </motion.div>
//                                   );
//                               })}
//                           </AnimatePresence>

//                           {/* EXPAND BUTTON */}
//                           {showExpandButton && (
//                             <div className="relative pt-6 pl-10">
//                                 <button 
//                                     onClick={() => setIsExpanded(!isExpanded)}
//                                     className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
//                                 >
//                                     {isExpanded ? "Collapse" : "View Full History"}
//                                     {isExpanded ? <UpArrow /> : <DownArrow />}
//                                 </button>
//                             </div>
//                           )}
//                       </div>

//                   </motion.div>
//               </div>
//           </div>
//       </motion.section>

//       {/* SELECTED WORKS */}
//       <section className="relative z-10 w-full px-6 pb-40">
//            <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
//                 <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
//                     <h3 className="text-5xl md:text-7xl font-serif text-white tracking-tight">Selected Works</h3>
//                     <div className="flex items-center gap-4"><span className="h-px w-12 bg-white/20" /><span className="text-xs uppercase tracking-widest text-white/50">{member.credits?.length || 0} ARCHIVED PRODUCTIONS</span></div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {member.credits?.length > 0 ? member.credits.map((credit, i) => (
//                         <motion.div key={credit.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
//                             <Link href={`/originals/${credit.play.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#050505] border border-white/5 hover:border-white/20 transition-colors">
//                                 {credit.play.poster_url ? (<Image src={credit.play.poster_url} alt={credit.play.title} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />) : (<div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]"><span className="text-white/10 font-mono text-xs">NO POSTER</span></div>)}
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />
//                                 <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-color" style={{ backgroundColor: RASA }} />
//                                 <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
//                                     <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                                         <span style={{ color: RASA }} className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{credit.role}</span>
//                                         <h4 className="text-3xl font-serif text-white mb-2 leading-none">{credit.play.title}</h4>
//                                         <span className="font-mono text-xs text-white/40 block">{credit.play.year}</span>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </motion.div>
//                     )) : (<div className="col-span-full py-32 text-center border border-dashed border-white/10 rounded-lg"><span className="text-white/20 italic font-serif text-2xl block mb-4">"Silence."</span><span className="text-xs uppercase tracking-widest text-white/40">No productions found in the archive.</span></div>)}
//                 </div>
//            </div>
//       </section>
//     </div>
//   );
// }


"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MemberProfile } from "@/types/schema";

// --- 1. ICONOGRAPHY (Pure SVG Geometry) ---
const PlayIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
const PauseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>);
const ArrowLeft = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>);
const DownArrow = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>);
const UpArrow = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>);
const MailIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);

// Socials
const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const TwitterIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 6.6 4.5c2.1-.2 3.8.4 4.8 1.4l1-1h6.2z" /></svg>);
const LinkIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>);

const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('insta')) return <InstagramIcon />;
    if (p.includes('linkedin')) return <LinkedinIcon />;
    if (p.includes('twitter') || p.includes('x.com')) return <TwitterIcon />;
    return <LinkIcon />;
};

// --- 2. TYPES & LOGIC ---
interface TimelineItem {
    type: 'tenure' | 'credit' | 'legacy';
    year: string;
    title: string;
    subtitle: string;
    isCurrent: boolean;
    slug?: string; // Added Slug for future linking of plays
}

const TIMELINE_LIMIT = 6;

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};
const STAGGER_CHILDREN: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

export default function ProfileArchitect({ member }: { member: MemberProfile }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // THE SOUL (Navarasa Logic)
  const RASA = member.color || "#eab308";

  // SCROLL PHYSICS
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, 500]); 
  const textParallax = useTransform(scrollY, [0, 1000], [0, -200]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  // AUDIO ENGINE
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => setAudioProgress((audio.currentTime / audio.duration) * 100);
    if (isPlaying) {
        audio.play().catch(() => setIsPlaying(false));
        audio.addEventListener('timeupdate', updateProgress);
    } else {
        audio.pause();
        audio.removeEventListener('timeupdate', updateProgress);
    }
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [isPlaying]);


  // --- 3. THE UNIFIED TIMELINE ENGINE ---
  const timeline = useMemo(() => {
    const list: TimelineItem[] = [];
    
    // A. Tenures (The Hierarchy)
    member.tenures?.forEach(t => {
        list.push({
            type: 'tenure',
            year: t.year,
            title: t.role,
            subtitle: t.is_current ? 'Current Office' : 'Office Bearer',
            isCurrent: t.is_current
        });
    });

    // B. Credits (The Art)
    member.credits?.forEach(c => {
        list.push({
            type: 'credit',
            year: c.play.year,
            title: c.role,
            subtitle: c.play.title, 
            isCurrent: false,
            slug: c.play.slug
        });
    });
    // C. LEGACY CREDITS (The Missing Link)
    member.legacy_titles?.forEach(t => {
        // Attempt to extract a year (e.g. "Creative Head 2024")
        const yearMatch = t.match(/\b(20\d{2})\b/);
        const extractedYear = yearMatch ? yearMatch[0] : "—";
        
        list.push({
            type: 'legacy',
            year: extractedYear,
            title: t,
            subtitle: 'Special Contribution',
            isCurrent: false
        });
    });

    // C. Chronological Sort (Newest First)
    return list.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }, [member]);

  const visibleTimeline = isExpanded ? timeline : timeline.slice(0, TIMELINE_LIMIT);
  const showExpandButton = timeline.length > TIMELINE_LIMIT;


  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020202] text-white selection:bg-white/20 selection:text-black overflow-hidden font-sans">
      
      {/* LAYER 0: THE ATMOSPHERE */}
      <div 
        className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[150px] pointer-events-none opacity-20 mix-blend-screen animate-pulse-slow"
        style={{ background: `radial-gradient(circle, ${RASA}, transparent 70%)` }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.07] bg-[url('/noise.png')] mix-blend-overlay" />

      {/* LAYER 1: NAVIGATION */}
      <nav 
        // className={`fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
        className={`fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-end items-center transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
      > 
        <Link href="/artist" className="group flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
            <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowLeft />
            </span>
            <span className="hidden md:inline group-hover:translate-x-1 transition-transform">The Artist</span>
        </Link>
        <div className="flex gap-3">
            {member.social_links && Object.entries(member.social_links).map(([platform, url]: [string, any]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70" style={{ boxShadow: `0 0 0 0px ${RASA}` }}>{getSocialIcon(platform)}</a>
            ))}
            {member.email && (
                 <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white/70"><MailIcon /></a>
            )}
        </div>
      </nav>

      {/* LAYER 2: THE HERO (Cinematic) */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroParallax }} className="absolute inset-0 z-0">
             {member.image_url ? (
                <Image src={member.image_url} alt={member.name} fill className="object-cover opacity-80 transition-all duration-[2s]" priority />
             ) : (
                <div className="w-full h-full bg-[#080808] flex items-center justify-center"><span className="text-white/10 text-9xl font-serif">?</span></div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
             <div className="absolute inset-0 mix-blend-color opacity-20" style={{ backgroundColor: RASA }} />
        </motion.div>

        <motion.div style={{ y: textParallax }} className="relative z-10 text-center flex flex-col items-center max-w-5xl px-6">
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} transition={{ duration: 1, delay: 0.5 }} className="flex items-center gap-4 mb-8 overflow-hidden">
                <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
                <span style={{ color: RASA, textShadow: `0 0 30px ${RASA}` }} className="text-xs md:text-sm uppercase tracking-[0.6em] font-bold whitespace-nowrap">{member.role}</span>
                <div style={{ backgroundColor: RASA }} className="w-12 h-px shadow-[0_0_15px_currentColor]" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="text-[15vw] md:text-[9rem] lg:text-[11rem] font-serif leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">{member.name}</motion.h1>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-16 flex flex-wrap justify-center gap-6">
                {member.audio_url && (
                    <button onClick={() => setIsPlaying(!isPlaying)} className="group relative flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all hover:border-white/30">
                        <div className="absolute inset-0 bg-white/10 z-0 transition-all duration-300 origin-left" style={{ width: `${audioProgress}%`, backgroundColor: RASA, opacity: 0.2 }} />
                        <div style={{ color: RASA }} className="relative z-10 w-6 h-6 flex items-center justify-center">{isPlaying ? <PauseIcon /> : <PlayIcon />}</div>
                        <div className="relative z-10 text-left">
                            <span className="block text-[10px] uppercase tracking-widest text-white/60">Voice Note</span>
                            <span className="block text-xs font-medium text-white">{isPlaying ? "Playing..." : "Listen to Artist"}</span>
                        </div>
                        <audio ref={audioRef} src={member.audio_url} onEnded={() => setIsPlaying(false)} />
                    </button>
                )}
            </motion.div>
        </motion.div>
      </section>

      {/* LAYER 3: MANIFESTO & TIMELINE (The Core) */}
      <motion.section 
        variants={STAGGER_CHILDREN}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-32 md:py-48"
      >
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
              
              {/* LEFT: ARTIST STATEMENT (Editorial) (Logic Fixed) */}
              <div className="w-full lg:w-3/5">
                  <motion.div variants={FADE_UP} className="relative">
                      <span className="text-[12rem] leading-none font-serif text-white/5 absolute -top-24 -left-12 select-none">“</span>
                      {(() => {
                        // Fix: Prioritizing short bio for headline
                        let headline = "";
                        let body = "";
                        if (member.short_bio){
                            // if short_bio exists, it takes the stage.
                            headline = member.short_bio;
                            body = member.bio || "";
                        } else {
                            // Fallback: Split the Bio
                            const bioText = member.bio || "An artist of the Aayam Ensemble.";
                            const splitIndex = bioText.indexOf('.') + 1 || bioText.indexOf('\n') + 1 || bioText.length;
                            headline = bioText.slice(0, splitIndex);
                            body = bioText.slice(splitIndex);
                        }
                        return (
                            <div>
                                <h2 className="text-3xl md:text-5xl font-serif text-white leading-[1.1] mb-8 relative z-10">{headline}</h2>
                                <div style={{ backgroundColor: RASA }} className="w-24 h-1 mb-10 shadow-[0_0_20px_currentColor]" />
                                {body && <div className="prose prose-lg prose-invert text-white/70 font-sans leading-relaxed whitespace-pre-wrap">{body.trim()}</div>}
                            </div>
                        );
                      })()}
                  </motion.div>
              </div>

              {/* RIGHT: TIMELINE (Perfected Geometry) */}
              <div className="w-full lg:w-2/5 lg:sticky lg:top-32">
                  <motion.div variants={FADE_UP} className="relative">
                       
                      <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                          <span className="text-xs uppercase tracking-[0.3em] text-white/40">The Journey</span>
                          <span className="text-xs font-mono text-gold-500">{timeline.length} MILESTONES</span>
                      </div>

                      {/* THE LIST CONTAINER */}
                      <div className="flex flex-col gap-0 border-l border-white/10 ml-3">
                          <AnimatePresence initial={false}>
                              {visibleTimeline.map((item, i) => {
                                  // --- LOGIC: DYNAMIC STYLING ---
                                  // 1. Color: If Tenure -> RASA (Gold). If Credit -> Grey (#444).
                                  const dotColor = item.type === 'tenure' ? RASA : '#444';
                                  // 2. Shadow: Only for Current Office.
                                  const dotShadow = item.isCurrent ? `0 0 15px ${RASA}` : 'none';
                                  // 3. Subtitle Color: Tenure -> RASA. Credit -> White/40.
                                  const subtitleColor = item.type === 'tenure' ? RASA : 'rgba(255,255,255,0.4)';

                                  return (
                                      <motion.div 
                                        key={`${item.title}-${item.year}-${i}`}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        // --- GEOMETRY FIX (THE 110% SOLUTION) ---
                                        // Problem: overflow-hidden clips the dot on the left edge.
                                        // Solution: Shift the visual box LEFT (-ml-6) so the border line is "inside" the box.
                                        // Then shift the content RIGHT (pl-16) so it aligns visually with the header.
                                        className="relative -ml-6 pl-16 pb-12 last:pb-0 group overflow-hidden"
                                      >
                                          {/* THE DOT */}
                                          <span 
                                            style={{ backgroundColor: dotColor, boxShadow: dotShadow }}
                                            // left-[19px] positions it exactly on the visual border line.
                                            // Math: 24px (margin) - 5px (half dot width) = 19px
                                            className="absolute left-[19px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#020202] transition-all duration-500 group-hover:scale-125"
                                          />
                                          
                                          {/* THE CONTENT */}
                                          <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-2">
                                              <span className="font-mono text-xs text-white/30">{item.year}</span>
                                              <span className="text-xl md:text-2xl font-serif text-white/90 group-hover:text-white transition-colors">
                                                  {item.title}
                                              </span>
                                              <span 
                                                style={{ color: subtitleColor }}
                                                className="text-[10px] uppercase tracking-widest font-bold"
                                              >
                                                  {item.subtitle}
                                              </span>
                                          </div>
                                      </motion.div>
                                  );
                              })}
                          </AnimatePresence>

                          {/* EXPAND BUTTON */}
                          {showExpandButton && (
                            <div className="relative pt-6 pl-10">
                                <button 
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    {isExpanded ? "Collapse" : "View Full History"}
                                    {isExpanded ? <UpArrow /> : <DownArrow />}
                                </button>
                            </div>
                          )}
                      </div>

                  </motion.div>
              </div>
          </div>
      </motion.section>

      {/* LAYER 4: SELECTED WORKS */}
      <section className="relative z-10 w-full px-6 pb-40">
           <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
                    <h3 className="text-5xl md:text-7xl font-serif text-white tracking-tight">Selected Works</h3>
                    <div className="flex items-center gap-4"><span className="h-px w-12 bg-white/20" /><span className="text-xs uppercase tracking-widest text-white/50">{member.credits?.length || 0} ARCHIVED PRODUCTIONS</span></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {member.credits?.length > 0 ? member.credits.map((credit, i) => (
                        <motion.div key={credit.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
                            <Link href={`/originals/${credit.play.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#050505] border border-white/5 hover:border-white/20 transition-colors">
                                {credit.play.poster_url ? (<Image src={credit.play.poster_url} alt={credit.play.title} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />) : (<div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]"><span className="text-white/10 font-mono text-xs">NO POSTER</span></div>)}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 mix-blend-color" style={{ backgroundColor: RASA }} />
                                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span style={{ color: RASA }} className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{credit.role}</span>
                                        <h4 className="text-3xl font-serif text-white mb-2 leading-none">{credit.play.title}</h4>
                                        <span className="font-mono text-xs text-white/40 block">{credit.play.year}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )) : (<div className="col-span-full py-32 text-center border border-dashed border-white/10 rounded-lg"><span className="text-white/20 italic font-serif text-2xl block mb-4">"Silence."</span><span className="text-xs uppercase tracking-widest text-white/40">No productions found in the archive.</span></div>)}
                </div>
           </div>
      </section>
    </div>
  );
}