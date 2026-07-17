import React from 'react';
import { motion } from 'framer-motion';

const lineItems = [
  { label: "Qualifier Sourcing and Coordination Fee", amount: "$6,000" },
  { label: "Initial Qualifier Placement Fee", amount: "$3,000" },
  { label: "CCA Application Processing Fee", amount: "$1,700" },
  { label: "Nevada State Application Fee", amount: "$250" },
  { label: "Fingerprinting Estimate", amount: "$70" },
  { label: "FedEx / Document Shipping Estimate", amount: "$100" }
];

export function Investment() {
  return (
    <section id="investment" className="py-24 md:py-32 bg-navy relative text-white selection:bg-champagne/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-champagne" />
            <p className="text-champagne font-semibold tracking-[0.2em] uppercase text-[10px] md:text-xs">Financial Scope</p>
            <div className="w-8 h-[1px] bg-champagne" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-white">Investment Overview</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Detailed Line Items */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0B233F]/50 border border-white/10 p-8 md:p-14 mb-8 backdrop-blur-sm"
          >
            <h3 className="font-serif text-xl md:text-2xl mb-8 md:mb-10 border-b border-white/10 pb-6 text-white/90">Fee Schedule</h3>
            <div className="space-y-4 md:space-y-5">
              {lineItems.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex justify-between items-end border-b border-white/5 pb-4 group"
                >
                  <span className="font-sans text-sm md:text-base text-white/60 group-hover:text-white/90 transition-colors duration-300 pr-4">{item.label}</span>
                  <span className="font-serif text-base md:text-lg text-champagne">{item.amount}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Totals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0B233F]/50 border border-champagne/30 p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-champagne/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50 mb-4 relative z-10">Wire Payment Total</p>
              <p className="text-3xl md:text-5xl font-serif text-white relative z-10">$11,120.00</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0B233F]/30 border border-white/10 p-8 md:p-12 flex flex-col justify-center items-center text-center group"
            >
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50 mb-4">Card Payment Total</p>
              <p className="text-3xl md:text-5xl font-serif text-white/80 mb-5">$11,553.68</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/40">Card payments include a 3.9% processing fee.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
