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
    <section id="overview" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center md:text-left"
        >
          <p className="text-champagne font-bold tracking-[0.2em] uppercase text-xs mb-4">Engagement Overview</p>
          <h2 className="text-3xl md:text-5xl font-serif text-navy">Strategic License Expansion Support</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group border border-gray-200 bg-gray-50/50 p-10 hover:bg-navy hover:border-navy transition-colors duration-500 flex flex-col h-full"
            >
              <div className="text-4xl font-serif text-silver group-hover:text-champagne/40 transition-colors mb-8">
                {card.number}
              </div>
              <h3 className="text-xl font-serif text-navy mb-4 group-hover:text-white transition-colors">
                {card.title}
              </h3>
              <div className="h-[1px] w-12 bg-champagne mb-6 group-hover:w-full transition-all duration-700 ease-in-out" />
              <p className="text-charcoal/70 font-sans leading-relaxed group-hover:text-white/80 transition-colors flex-grow">
                {card.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
