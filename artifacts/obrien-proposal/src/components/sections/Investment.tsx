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
    <section id="investment" className="py-32 bg-midnight relative text-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-champagne font-bold tracking-[0.2em] uppercase text-xs mb-4">Financial Scope</p>
          <h2 className="text-3xl md:text-5xl font-serif">Investment Overview</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Detailed Line Items */}
          <div className="bg-navy border border-white/10 p-8 md:p-12 mb-12 shadow-2xl">
            <h3 className="font-serif text-2xl mb-8 border-b border-white/10 pb-6 text-white/90">Fee Schedule</h3>
            <div className="space-y-6">
              {lineItems.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex justify-between items-end border-b border-white/5 pb-4 group"
                >
                  <span className="font-sans text-white/70 group-hover:text-white transition-colors">{item.label}</span>
                  <span className="font-serif text-lg text-champagne">{item.amount}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Totals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-navy border border-champagne/30 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-champagne/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-xs tracking-[0.15em] uppercase text-white/60 mb-3 relative z-10">Wire Payment Total</p>
              <p className="text-4xl font-serif text-white relative z-10">$11,120.00</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-navy border border-white/10 p-8 flex flex-col justify-center items-center text-center group"
            >
              <p className="text-xs tracking-[0.15em] uppercase text-white/60 mb-3">Card Payment Total</p>
              <p className="text-4xl font-serif text-white/90 mb-4">$11,553.68</p>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Card payments include a 3.9% processing fee.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
