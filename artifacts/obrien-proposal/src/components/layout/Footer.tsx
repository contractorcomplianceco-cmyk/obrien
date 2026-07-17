import React from 'react';
import logo from '@assets/this_one_1784311238771.png';

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 pt-24 pb-12 selection:bg-champagne/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <img src={logo} alt="O'Brien Construction, Inc." className="w-44 mb-10 opacity-90" />
            <h3 className="text-white font-serif text-xl md:text-2xl mb-3">O'Brien Construction, Inc.</h3>
            <p className="text-white/50 font-sans text-sm leading-relaxed">
              Nevada Classification B General<br/>
              License Expansion Proposal
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-4">Prepared By</p>
            <p className="text-white font-serif text-lg md:text-xl mb-3">Contractor Compliance & Advisory</p>
            <p className="text-white/50 font-sans text-sm leading-relaxed">
              Strategic Licensing & Qualifier Placement
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-[10px] md:text-xs font-sans">
            &copy; {new Date().getFullYear()} Contractor Compliance & Advisory. Confidential and Proprietary.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-champagne shadow-[0_0_8px_rgba(212,175,55,0.6)]"></div>
            <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Secure Proposal Experience</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
