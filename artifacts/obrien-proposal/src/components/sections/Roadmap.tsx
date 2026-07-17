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
    <section id="process" className="py-24 md:py-32 bg-[#F9FAFB] relative border-t border-black/5 overflow-hidden selection:bg-champagne/20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-champagne" />
            <p className="text-champagne font-semibold tracking-[0.2em] uppercase text-[10px] md:text-xs">Execution Strategy</p>
            <div className="w-8 h-[1px] bg-champagne" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-navy">Process Roadmap</h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal line for desktop */}
          <div className="hidden md:block absolute top-[2.75rem] left-[5%] right-[5%] h-[1px] bg-black/5" />
          
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center group gap-6 md:gap-0"
              >
                {/* Number Circle */}
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white border border-black/5 rounded-full flex items-center justify-center shadow-sm md:mb-8 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-2 group-hover:border-champagne/50 group-hover:shadow-lg relative z-10 shrink-0">
                  <span className="font-serif text-xl md:text-2xl text-navy/40 group-hover:text-champagne transition-colors duration-500">{step.num}</span>
                </div>
                
                {/* Content */}
                <div className="max-w-[160px]">
                  <h4 className="font-sans font-medium text-navy text-sm tracking-wide leading-relaxed group-hover:text-charcoal transition-colors duration-500">
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
