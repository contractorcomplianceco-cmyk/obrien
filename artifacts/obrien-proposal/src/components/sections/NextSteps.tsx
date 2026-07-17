import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  "Confirm engagement",
  "Submit payment",
  "Begin qualifier coordination",
  "Start Nevada application workflow"
];

export function NextSteps() {
  return (
    <section className="py-24 md:py-32 bg-white relative selection:bg-champagne/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-champagne" />
              <p className="text-champagne font-semibold tracking-[0.2em] uppercase text-[10px] md:text-xs">Immediate Action</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-navy">Next Steps</h2>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-6 md:gap-8 bg-[#F9FAFB] border border-black/5 p-6 md:p-8 hover:bg-white hover:border-black/10 hover:shadow-sm transition-all duration-500 group"
              >
                <span className="font-serif text-2xl md:text-3xl text-navy/20 group-hover:text-champagne transition-colors duration-500 w-12 text-center shrink-0">0{i + 1}</span>
                <span className="font-sans text-base md:text-lg text-charcoal/80 group-hover:text-navy transition-colors duration-500">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
