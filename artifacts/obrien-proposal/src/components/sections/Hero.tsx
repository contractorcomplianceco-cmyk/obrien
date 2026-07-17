import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '@assets/generated_images/hero-bg.jpg';
import logo from '@assets/this_one_1784311238771.png';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-navy selection:bg-champagne/30">
      {/* Background Image with Parallax effect feeling */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay for better readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy/95 via-navy/80 to-navy/95" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 pt-32 pb-24 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <img src={logo} alt="O'Brien Construction" className="w-48 md:w-56 drop-shadow-xl opacity-90" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-[1.15] mb-6 tracking-tight">
            Nevada Classification<br />
            <span className="text-champagne font-medium italic pr-2">B General</span>
          </h1>
          <h2 className="text-lg md:text-2xl font-sans text-white/80 font-light mb-10 tracking-[0.02em] leading-relaxed">
            Broadening License Classification <br className="hidden md:block" />
            by Qualifier Placement
          </h2>
          <div className="w-12 h-[1px] bg-champagne mx-auto mb-10 opacity-70" />
          <p className="text-sm md:text-base text-white/60 font-sans max-w-2xl mx-auto leading-relaxed mb-16">
            Contractor Compliance & Advisory will coordinate the qualifier placement process and Nevada licensing workflow to support O'Brien Construction, Inc.'s expansion objectives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-10"
        >
          <a 
            href="#investment"
            className="group relative px-8 py-4 bg-transparent border border-champagne text-champagne text-xs font-semibold tracking-[0.15em] uppercase overflow-hidden hover:text-navy transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-champagne translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            <span className="relative z-10 flex items-center gap-4">
              Review Investment
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform duration-500">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
              </svg>
            </span>
          </a>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-2.5 border border-white/5 rounded-full">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-champagne/80">
              <path d="M11 6V4.33333C11 1.94 9.06 0 6.66667 0C4.27333 0 2.33333 1.94 2.33333 4.33333V6C1.04 6 0 7.04 0 9.33333C0 11.6267 1.04 12.6667 2.33333 12.6667H11C12.2933 12.6667 13.3333 11.6267 13.3333 9.33333C13.3333 7.04 12.2933 6 11 6ZM6.66667 10.6667C5.93333 10.6667 5.33333 10.0667 5.33333 9.33333C5.33333 8.6 5.93333 8 6.66667 8C7.4 8 8 8.6 8 9.33333C8 10.0667 7.4 10.6667 6.66667 10.6667ZM9.66667 6H3.66667V4.33333C3.66667 2.68 5.01333 1.33333 6.66667 1.33333C8.32 1.33333 9.66667 2.68 9.66667 4.33333V6Z" fill="currentColor"/>
            </svg>
            <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-medium">Secure Proposal Experience</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
