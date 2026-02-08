// // // // "use client";

// // // // import { useState } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { ArrowRight, Users, Lightbulb, Handshake, Clapperboard } from "lucide-react"; 
// // // // // Ensure you have lucide-react installed, or replace with standard SVGs

// // // // const ROLES = [
// // // //   {
// // // //     id: "member",
// // // //     title: "THE ARTIST",
// // // //     subtitle: "General Membership",
// // // //     description: "Step into the light. Join the general body of Aayam to perform, design, and learn.",
// // // //     icon: Users,
// // // //     color: "bg-red-600",
// // // //     image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2000&auto=format&fit=crop", // Crowd/Stage
// // // //     link: "https://forms.google.com/your-member-form",
// // // //     status: "OPEN FOR ALL"
// // // //   },
// // // //   {
// // // //     id: "suggestion",
// // // //     title: "THE VISIONARY",
// // // //     subtitle: "Proposals & Ideas",
// // // //     description: "The script is never finished. Pitch a play, suggest an event, or offer your unique voice.",
// // // //     icon: Lightbulb,
// // // //     color: "bg-gold-500",
// // // //     image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop", // Writing/Script
// // // //     link: "https://forms.google.com/your-idea-form",
// // // //     status: "ALWAYS LISTENING"
// // // //   },
// // // //   {
// // // //     id: "collab",
// // // //     title: "THE ALLIANCE",
// // // //     subtitle: "Collaborations & Sponsors",
// // // //     description: "Production Houses. Universities. Brands. Let us build a spectacle together.",
// // // //     icon: Handshake,
// // // //     color: "bg-blue-600",
// // // //     image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2000&auto=format&fit=crop", // Handshake/Meeting
// // // //     link: "mailto:secretary.aayam@iitm.ac.in",
// // // //     status: "OPEN FOR BUSINESS"
// // // //   },
// // // //   {
// // // //     id: "core",
// // // //     title: "THE ARCHITECT",
// // // //     subtitle: "Core Team Applications",
// // // //     description: "The backbone. Writers, Editors, PR, and Stage Managers. Build the legacy.",
// // // //     icon: Clapperboard,
// // // //     color: "bg-purple-600",
// // // //     image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000&auto=format&fit=crop", // Backstage/Tech
// // // //     link: "https://forms.google.com/core-team-form",
// // // //     status: "SELECTIVE ENTRY"
// // // //   }
// // // // ];

// // // // export default function CastingInterface() {
// // // //   const [activeId, setActiveId] = useState<string | null>("member"); // Default first one open on desktop

// // // //   return (
// // // //     <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-black">
      
// // // //       {ROLES.map((role) => {
// // // //         const isActive = activeId === role.id;
        
// // // //         return (
// // // //           <motion.div
// // // //             key={role.id}
// // // //             layout
// // // //             onClick={() => setActiveId(role.id)}
// // // //             className={`relative h-[25vh] md:h-full transition-all duration-700 ease-theater cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10 group ${isActive ? 'flex-[3]' : 'flex-[1] hover:flex-[1.2]'}`}
// // // //             onMouseEnter={() => setActiveId(role.id)}
// // // //           >
// // // //             {/* BACKGROUND IMAGE (Dimmed when inactive) */}
// // // //             <div 
// // // //                 className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
// // // //                 style={{ backgroundImage: `url(${role.image})` }}
// // // //             >
// // // //                 <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isActive ? 'opacity-60' : 'opacity-80 group-hover:opacity-70'}`} />
// // // //                 {/* Colored Overlay Gradient */}
// // // //                 <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90`} />
// // // //             </div>

// // // //             {/* CONTENT CONTAINER */}
// // // //             <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                
// // // //                 {/* 1. STATUS BADGE */}
// // // //                 <div className={`absolute top-6 left-6 md:top-12 md:left-12 flex items-center gap-2 ${isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'} transition-opacity duration-500`}>
// // // //                     <div className={`w-2 h-2 rounded-full ${role.color} animate-pulse`} />
// // // //                     <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">
// // // //                         {role.status}
// // // //                     </span>
// // // //                 </div>

// // // //                 {/* 2. ICON & TITLE */}
// // // //                 <div className="relative z-10 transform origin-bottom-left transition-all duration-500">
// // // //                     <role.icon className={`w-8 h-8 md:w-12 md:h-12 mb-4 text-white/50 ${isActive ? 'text-white' : ''}`} />
                    
// // // //                     <h2 className={`font-serif text-3xl md:text-6xl text-white leading-none mb-2 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
// // // //                         {role.title}
// // // //                     </h2>
                    
// // // //                     {/* SUBTITLE (Rotated when inactive on Desktop) */}
// // // //                     <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'h-auto opacity-100 mt-2' : 'h-0 opacity-0'}`}>
// // // //                          <p className="font-mono text-xs md:text-sm text-gold-500 uppercase tracking-widest">
// // // //                             {role.subtitle}
// // // //                          </p>
// // // //                          <p className="font-sans text-white/60 text-sm md:text-lg mt-4 max-w-md leading-relaxed">
// // // //                             {role.description}
// // // //                          </p>

// // // //                          {/* ACTION BUTTON */}
// // // //                          <a 
// // // //                             href={role.link}
// // // //                             target="_blank"
// // // //                             className="mt-8 inline-flex items-center gap-4 group/btn"
// // // //                          >
// // // //                             <div className={`px-6 py-3 border border-white/20 bg-white/5 backdrop-blur-sm rounded-sm group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-300`}>
// // // //                                 <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
// // // //                                     Initiate
// // // //                                 </span>
// // // //                             </div>
// // // //                          </a>
// // // //                     </div>
// // // //                 </div>

// // // //             </div>
// // // //           </motion.div>
// // // //         );
// // // //       })}
// // // //     </div>
// // // //   );
// // // // }


// // // "use client";

// // // import { motion } from "framer-motion";
// // // import Image from "next/image";
// // // import { ArrowUpRight } from "lucide-react"; 

// // // const ROLES = [
// // //   {
// // //     id: "member",
// // //     title: "The Artist",
// // //     subtitle: "General Membership",
// // //     description: "For those who wish to perform, design, and exist on stage.",
// // //     image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000",
// // //     color: "from-red-600/40",
// // //     glow: "group-hover:shadow-[0_0_50px_rgba(220,38,38,0.4)]",
// // //     link: "https://forms.google.com/member"
// // //   },
// // //   {
// // //     id: "visionary",
// // //     title: "The Visionary",
// // //     subtitle: "Submit an Idea",
// // //     description: "For the writers and dreamers who have a script to burn.",
// // //     image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=1000",
// // //     color: "from-gold-500/40",
// // //     glow: "group-hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]",
// // //     link: "https://forms.google.com/ideas"
// // //   },
// // //   {
// // //     id: "partner",
// // //     title: "The Alliance",
// // //     subtitle: "Sponsors & Collabs",
// // //     description: "For brands and universities. Let us build a spectacle together.",
// // //     image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000",
// // //     color: "from-blue-600/40",
// // //     glow: "group-hover:shadow-[0_0_50px_rgba(37,99,235,0.4)]",
// // //     link: "mailto:secretary.aayam@iitm.ac.in"
// // //   },
// // //   {
// // //     id: "core",
// // //     title: "The Architect",
// // //     subtitle: "Core Team",
// // //     description: "For the leaders. The spine of the society. Selective entry.",
// // //     image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000",
// // //     color: "from-purple-600/40",
// // //     glow: "group-hover:shadow-[0_0_50px_rgba(147,51,234,0.4)]",
// // //     link: "https://forms.google.com/core"
// // //   }
// // // ];

// // // export default function CastingInterface() {
// // //   return (
// // //     <section className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 md:px-12 flex flex-col items-center">
      
// // //       {/* 1. THE HEADER (Simple & Direct) */}
// // //       <div className="text-center mb-16 relative z-10">
// // //           <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter mb-4">
// // //               CHOOSE YOUR ROLE
// // //           </h1>
// // //           <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
// // //               The stage has many entrances. Which one is yours?
// // //           </p>
// // //       </div>

// // //       {/* 2. THE CATHEDRAL GRID (2x2) */}
// // //       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
// // //           {ROLES.map((role, i) => (
// // //               <a 
// // //                 key={role.id} 
// // //                 href={role.link}
// // //                 target="_blank"
// // //                 className={`
// // //                     group relative h-[40vh] overflow-hidden rounded-sm border border-white/10 
// // //                     transition-all duration-500 hover:scale-[1.01] hover:border-white/30 hover:z-20
// // //                     ${role.glow}
// // //                 `}
// // //               >
// // //                   {/* BACKGROUND IMAGE */}
// // //                   <Image 
// // //                       src={role.image} 
// // //                       alt={role.title} 
// // //                       fill 
// // //                       className="object-cover transition-all duration-700 group-hover:scale-110 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75"
// // //                   />

// // //                   {/* THE DIVINE LIGHT OVERLAY */}
// // //                   {/* Fades in a specific color wash from the bottom on hover */}
// // //                   <div className={`absolute inset-0 bg-gradient-to-t ${role.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
// // //                   {/* PERMANENT GRADIENT (Text Readability) */}
// // //                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

// // //                   {/* CONTENT */}
// // //                   <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                      
// // //                       {/* Subtitle (Mobile: Visible / Desktop: Slides up) */}
// // //                       <span className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-widest mb-2 block transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
// // //                           0{i + 1} // {role.subtitle}
// // //                       </span>

// // //                       {/* Title */}
// // //                       <div className="flex items-center justify-between">
// // //                           <h2 className="text-4xl md:text-6xl font-serif text-white leading-none tracking-tight mix-blend-screen">
// // //                               {role.title}
// // //                           </h2>
// // //                           {/* Arrow Icon */}
// // //                           <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
// // //                                <ArrowUpRight className="w-5 h-5 text-white" />
// // //                           </div>
// // //                       </div>

// // //                       {/* Description (Reveals on Hover) */}
// // //                       <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 ease-in-out">
// // //                           <p className="font-sans text-white/70 text-sm md:text-lg mt-4 max-w-lg leading-relaxed pt-2 border-t border-white/20">
// // //                               {role.description}
// // //                           </p>
// // //                       </div>
// // //                   </div>
// // //               </a>
// // //           ))}
// // //       </div>

// // //     </section>
// // //   );
// // // }


// // "use client";

// // import { motion } from "framer-motion";
// // import Image from "next/image";
// // import { ArrowUpRight } from "lucide-react"; 

// // const ROLES = [
// //   {
// //     id: "member",
// //     title: "The Artist",
// //     subtitle: "Membership",
// //     description: "For those who wish to perform, design, and inhabit the stage.",
// //     image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1200", // Stage/Light
// //     color: "from-red-600/60",
// //     shadow: "group-hover:shadow-[0_0_80px_rgba(220,38,38,0.3)]",
// //     link: "https://forms.google.com/member"
// //   },
// //   {
// //     id: "visionary",
// //     title: "The Visionary",
// //     subtitle: "Proposals",
// //     description: "For the writers and directors who have a script to burn.",
// //     image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=1200", // Script/Pen
// //     color: "from-gold-500/60",
// //     shadow: "group-hover:shadow-[0_0_80px_rgba(212,175,55,0.3)]",
// //     link: "https://forms.google.com/ideas"
// //   },
// //   {
// //     id: "partner",
// //     title: "The Alliance",
// //     subtitle: "Sponsors",
// //     description: "For brands and universities. Let us build a spectacle together.",
// //     image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200", // Handshake/Event
// //     color: "from-blue-600/60",
// //     shadow: "group-hover:shadow-[0_0_80px_rgba(37,99,235,0.3)]",
// //     link: "mailto:secretary.aayam@iitm.ac.in"
// //   },
// //   {
// //     id: "core",
// //     title: "The Architect",
// //     subtitle: "Core Team",
// //     description: "For the leaders. The spine of the society. Selective entry.",
// //     image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200", // Backstage/Tech
// //     color: "from-purple-600/60",
// //     shadow: "group-hover:shadow-[0_0_80px_rgba(147,51,234,0.3)]",
// //     link: "https://forms.google.com/core"
// //   }
// // ];

// // export default function CastingInterface() {
// //   return (
// //     <section className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-12 flex flex-col items-center">
      
// //       {/* 1. HEADER: PURE TEXT */}
// //       <div className="text-center mb-20 relative z-10">
// //           <motion.h1 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="text-5xl md:text-8xl font-serif text-white tracking-tighter mb-6"
// //           >
// //               CHOOSE YOUR ROLE
// //           </motion.h1>
// //           <div className="h-px w-24 bg-white/30 mx-auto mb-6" />
// //           <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
// //               The stage has four entrances. Which one is yours?
// //           </p>
// //       </div>

// //       {/* 2. THE PILLARS (2x2 Grid) */}
// //       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {ROLES.map((role, i) => (
// //               <a 
// //                 key={role.id} 
// //                 href={role.link}
// //                 target="_blank"
// //                 className={`
// //                     group relative h-[45vh] overflow-hidden border border-white/10 
// //                     transition-all duration-700 hover:z-20 hover:scale-[1.02] hover:border-white/40
// //                     ${role.shadow}
// //                 `}
// //               >
// //                   {/* A. THE IMAGE (Grayscale to Color) */}
// //                   <Image 
// //                       src={role.image} 
// //                       alt={role.title} 
// //                       fill 
// //                       className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale contrast-125 brightness-50 group-hover:grayscale-0 group-hover:brightness-100"
// //                   />

// //                   {/* B. THE DIVINE LIGHT (Gradient Wash) */}
// //                   {/* This creates the colored "Smoke" effect from the bottom */}
// //                   <div className={`absolute inset-0 bg-gradient-to-t ${role.color} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
// //                   {/* C. READABILITY LAYER */}
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

// //                   {/* D. CONTENT */}
// //                   <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                      
// //                       {/* Subtitle */}
// //                       <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-3 block transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
// //                           0{i + 1} // {role.subtitle}
// //                       </span>

// //                       {/* Title & Icon */}
// //                       <div className="flex items-end justify-between border-b border-white/20 pb-4 mb-4">
// //                           <h2 className="text-4xl md:text-6xl font-serif text-white leading-none tracking-tight mix-blend-screen">
// //                               {role.title}
// //                           </h2>
// //                           <ArrowUpRight className="w-8 h-8 text-white/50 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
// //                       </div>

// //                       {/* Description */}
// //                       <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 ease-in-out">
// //                           <p className="font-sans text-white/80 text-sm md:text-lg leading-relaxed pt-2">
// //                               {role.description}
// //                           </p>
// //                       </div>
// //                   </div>
// //               </a>
// //           ))}
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { ArrowUpRight } from "lucide-react"; 

// const ROLES = [
//   {
//     id: "member",
//     title: "The Protagonist",
//     subtitle: "General Body",
//     tag: "ACT I: THE VOICE",
//     description: "The stage is a mirror. If you are ready to face your reflection, step into the light. Perform. Design. Inhabit.",
//     image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1200", // Spotlight/Stage
//     color: "from-red-600/60",
//     shadow: "group-hover:shadow-[0_0_100px_rgba(220,38,38,0.4)]",
//     link: "https://forms.google.com/member"
//   },
//   {
//     id: "visionary",
//     title: "The Playwright",
//     subtitle: "Submit Ideas",
//     tag: "ACT II: THE INK",
//     description: "Ink is cheaper than blood, but just as vital. If you have a script that burns, we have the fire to light it.",
//     image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=1200", // Writing
//     color: "from-gold-500/60",
//     shadow: "group-hover:shadow-[0_0_100px_rgba(212,175,55,0.4)]",
//     link: "https://forms.google.com/ideas"
//   },
//   {
//     id: "partner",
//     title: "The Patron",
//     subtitle: "Collaborations",
//     tag: "ACT III: THE ALLIANCE",
//     description: "For the Universities. For the Brands. Art needs a canvas. Let us build a spectacle that defies boundaries.",
//     image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200", // Crowd/Connection
//     color: "from-blue-600/60",
//     shadow: "group-hover:shadow-[0_0_100px_rgba(37,99,235,0.4)]",
//     link: "mailto:secretary.aayam@iitm.ac.in"
//   },
//   {
//     id: "core",
//     title: "The Architect",
//     subtitle: "Core Team",
//     tag: "ACT IV: THE SPINE",
//     description: "The heavy lifting. The late nights. The legacy. Selective entry for those who wish to lead the narrative.",
//     image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200", // Backstage
//     color: "from-purple-600/60",
//     shadow: "group-hover:shadow-[0_0_100px_rgba(147,51,234,0.4)]",
//     link: "https://forms.google.com/core"
//   }
// ];

// export default function CastingInterface() {
//   return (
//     <section className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-12 flex flex-col items-center relative overflow-hidden">
      
//       {/* ATMOSPHERE: The 'Green Room' Dust */}
//       <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] animate-grain pointer-events-none z-0" />

//       {/* 1. HEADER: THE CALL */}
//       <div className="text-center mb-24 relative z-10">
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             transition={{ duration: 1 }}
//             className="font-mono text-[10px] text-red-500 uppercase tracking-[0.4em] mb-4"
//           >
//               [ OPENING CASTING CALL ]
//           </motion.div>
          
//           <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter mb-8 leading-none">
//               CHOOSE YOUR<br/>
//               <span className="text-white/20">MASK.</span>
//           </h1>
          
//           <div className="h-px w-12 bg-white/20 mx-auto" />
//       </div>

//       {/* 2. THE FOUR MASKS (2x2 Grid) */}
//       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
//           {ROLES.map((role, i) => (
//               <a 
//                 key={role.id} 
//                 href={role.link}
//                 target="_blank"
//                 className={`
//                     group relative h-[45vh] overflow-hidden border border-white/10 
//                     transition-all duration-700 hover:z-20 hover:scale-[1.01] hover:border-white/30
//                     ${role.shadow}
//                 `}
//               >
//                   {/* A. IMAGE (The Void -> The Life) */}
//                   <Image 
//                       src={role.image} 
//                       alt={role.title} 
//                       fill 
//                       className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-100"
//                   />

//                   {/* B. LIGHT WASH (The Spotlight) */}
//                   <div className={`absolute inset-0 bg-gradient-to-t ${role.color} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
//                   {/* C. PERMANENT SHADOW (For Text) */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

//                   {/* D. CONTENT LAYER */}
//                   <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                      
//                       {/* Top Tag (e.g., ACT I: THE VOICE) */}
//                       <div className="absolute top-8 left-8 md:top-12 md:left-12 overflow-hidden">
//                           <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest block transform transition-transform duration-500 -translate-y-8 group-hover:translate-y-0">
//                               {role.tag}
//                           </span>
//                       </div>

//                       {/* Title */}
//                       <div className="flex items-end justify-between border-b border-white/20 pb-6 mb-6">
//                           <div>
//                               <span className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-2 block opacity-70 group-hover:opacity-100 transition-opacity">
//                                   0{i + 1} // {role.subtitle}
//                               </span>
//                               <h2 className="text-4xl md:text-6xl font-serif text-white leading-none tracking-tight">
//                                   {role.title}
//                               </h2>
//                           </div>
                          
//                           {/* The "Enter" Arrow */}
//                           <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
//                                <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-black transition-colors" />
//                           </div>
//                       </div>

//                       {/* The Description (Script Lines) */}
//                       <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
//                           <p className="font-serif italic text-white/80 text-lg md:text-xl leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
//                               "{role.description}"
//                           </p>
//                       </div>
//                   </div>
//               </a>
//           ))}
//       </div>
      
//       {/* FOOTER NOTE */}
//       <div className="mt-20 font-mono text-[10px] text-white/20 uppercase tracking-widest">
//           [ End of Casting Call ]
//       </div>

//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, PenTool, Handshake, Users } from "lucide-react"; 

const PATHS = [
  {
    id: "act",
    icon: Sparkles,
    statement: "I WANT TO PERFORM.",
    sub: "Join the General Body",
    description: "You crave the lights. You want to feel the stage beneath your feet. Join us to act, design, and bring stories to life.",
    // image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1200", // Stage Light
    image: "/membership.png", // Stage Light
    link: "https://forms.google.com/member",
    action: "APPLY FOR MEMBERSHIP"
  },
  {
    id: "write",
    icon: PenTool,
    statement: "I HAVE A STORY.",
    sub: "Submit an Idea",
    description: "You have a script in your notes app. A scene in your head. Don't let it fade. Give it to us, and we will build it.",
    // image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200", // Writing
    image: "/idea",
    link: "https://forms.google.com/ideas",
    action: "PITCH YOUR IDEA"
  },
  {
    id: "sponsor",
    icon: Handshake,
    statement: "I WANT TO PARTNER.",
    sub: "Collaborate / Sponsor",
    description: "You see the energy of Aayam Society. You want your Society or House or brand or university to be part of the spectacle. Let's create impact.",
    // image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200", // Handshake
    image: "/collab",
    link: "mailto:drama.society@study.iitm.ac.in",
    action: "START A CONVERSATION"
  },
  {
    id: "lead",
    icon: Users,
    statement: "I WANT TO LEAD.",
    sub: "Join Core Team",
    description: "You are an organizer. A leader. You want to build the legacy of Aayam from the inside out.",
    // image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200", // Team
    image: "/core",
    link: "https://forms.google.com/core",
    action: "VIEW OPEN ROLES"
  }
];

export default function CastingInterface() {
  return (
    <section className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-12 flex flex-col items-center">
      
      {/* 1. HEADER: PURE WELCOME */}
      <div className="text-center mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-6">
              Come Home to <span className="text-red-500 italic">Aayam.</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-serif leading-relaxed">
              Whether you are an actor, a writer, a leader, or a friend—there is a place for you here. How do you want to contribute?
          </p>
      </div>

      {/* 2. THE CARDS (The Human Choice) */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {PATHS.map((path) => (
              <a 
                key={path.id} 
                href={path.link}
                target="_blank"
                className="group relative h-[400px] md:h-[450px] overflow-hidden rounded-2xl border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:scale-[1.01]"
              >
                  {/* BACKGROUND IMAGE (Subtle until hover) */}
                  <Image 
                      src={path.image} 
                      alt={path.statement} 
                      fill 
                      className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                  />
                  
                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                      
                      {/* Top Icon */}
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-red-500 group-hover:text-white transition-colors duration-500">
                          <path.icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Text Block */}
                      <div>
                          <h2 className="text-3xl md:text-5xl font-serif text-white mb-3 tracking-tight group-hover:text-red-100 transition-colors">
                              {path.statement}
                          </h2>
                          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-md group-hover:text-white/80 transition-colors">
                              {path.description}
                          </p>
                          
                          {/* THE BUTTON (Clear, Clickable, Real) */}
                          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all duration-300">
                              {path.action}
                              <ArrowRight className="w-4 h-4" />
                          </div>
                      </div>
                  </div>
              </a>
          ))}
      </div>
      
    </section>
  );
}