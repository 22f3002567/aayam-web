"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PlayCategory } from "@/types/schema";

const MANIFESTOS: Record<string, { title: string; desc: string }> = {
  all: { 
    title: "Aayam Originals", 
    desc: "The Archive of emotions. A collection of stories engineered to break the silence." 
  },
  stage: { 
    title: "The Stage", 
    desc: "Live performances where the Fourth Wall is shattered in real-time." 
  },
  street: { 
    title: "The Street", 
    desc: "Raw, unfiltered, and loud. Theatre that comes to the people." 
  },
  film: { 
    title: "Cinema", 
    desc: "Capturing the fleeting expressions of the human condition through the lens." 
  },
  short: { 
    title: "Shorts", 
    desc: "Micro-stories. High impact, low duration." 
  },
  workshop: { 
    title: "The Lab", 
    desc: "The process behind the performance. Learning, failing, and evolving." 
  },
};

export default function ArchiveHeader({ category }: { category: PlayCategory | 'all' }) {
  const content = MANIFESTOS[category] || MANIFESTOS['all'];

  return (
    <div className="flex flex-col gap-8 mb-16 border-b border-white/5 pb-16 min-h-[200px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
            <span className="text-gold-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                The Fourth Wall / {category === 'all' ? 'Archive' : category}
            </span>
            <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter">
                {content.title}
            </h1>
            <p className="text-neutral-500 max-w-xl text-sm md:text-base leading-relaxed">
                {content.desc}
            </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}