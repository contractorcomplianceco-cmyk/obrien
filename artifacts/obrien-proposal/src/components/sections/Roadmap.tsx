import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: "01", label: "Engagement Confirmation" },
  { num: "02", label: "Qualifier Coordination" },
  { num: "03", label: "Application Preparation" },
  { num: "04", label: "Nevada Submission Support" },
  { num: "05", label: "Final Processing" }
];

export function Roadmap() {
  return (
    <section id="process" className="py-32 bg-gray-50 relative border-t border-gray-200 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <p className="text-champagne font-bold tracking-[0.2em] uppercase text-xs mb-4">Execution Strategy</p>
          <h2 className="text-3xl md:text-5xl font-serif text-navy">Process Roadmap</h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-gray-300" />
          
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col md:items-center text-left md:text-center group"
              >
                {/* Number Circle */}
                <div className="w-24 h-24 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm mb-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-champagne group-hover:shadow-md relative z-10">
                  <span className="font-serif text-2xl text-navy group-hover:text-champagne transition-colors">{step.num}</span>
                </div>
                
                {/* Content */}
                <div className="max-w-[160px]">
                  <h4 className="font-sans font-medium text-navy text-sm tracking-wide leading-tight group-hover:text-charcoal transition-colors">
                    {step.label}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
