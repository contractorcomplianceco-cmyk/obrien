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
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 border-l-4 border-champagne pl-8"
          >
            <p className="text-navy/50 font-bold tracking-[0.2em] uppercase text-xs mb-4">Immediate Action</p>
            <h2 className="text-3xl md:text-5xl font-serif text-navy">Next Steps</h2>
          </motion.div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-8 bg-gray-50/50 border border-gray-100 p-6 hover:bg-gray-50 transition-colors"
              >
                <span className="font-serif text-2xl text-silver w-12 text-center">0{i + 1}</span>
                <span className="font-sans text-lg text-charcoal/90">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
