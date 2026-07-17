import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  {
    title: "License Objective",
    content: "Expand Nevada contractor capabilities through Classification B General broadening support.",
    number: "01"
  },
  {
    title: "Qualifier Placement",
    content: "Coordinate qualified individual placement requirements necessary for Nevada classification expansion.",
    number: "02"
  },
  {
    title: "CCA Support",
    content: "Provide structured processing, documentation coordination, and application workflow management.",
    number: "03"
  }
];

export function Overview() {
  return (
    <section id="overview" className="py-24 md:py-32 bg-white relative selection:bg-champagne/20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-champagne" />
            <p className="text-champagne font-semibold tracking-[0.2em] uppercase text-[10px] md:text-xs">Engagement Overview</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-navy leading-tight">Strategic License<br />Expansion Support</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-black/5 bg-[#F9FAFB]/50 p-10 md:p-12 hover:bg-navy hover:border-navy transition-all duration-500 ease-out flex flex-col h-full"
            >
              <div className="text-3xl md:text-4xl font-serif text-black/10 group-hover:text-champagne/40 transition-colors duration-500 mb-8 md:mb-12">
                {card.number}
              </div>
              <h3 className="text-lg md:text-xl font-serif text-navy mb-5 group-hover:text-white transition-colors duration-500">
                {card.title}
              </h3>
              <div className="h-[1px] w-12 bg-champagne/50 mb-6 group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]" />
              <p className="text-sm md:text-base text-charcoal/60 font-sans leading-relaxed group-hover:text-white/70 transition-colors duration-500 flex-grow">
                {card.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
