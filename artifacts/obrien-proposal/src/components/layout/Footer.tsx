import React from 'react';
import logo from '@assets/this_one_1784311238771.png';

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img src={logo} alt="O'Brien Construction, Inc." className="w-48 mb-8 opacity-90" />
            <h3 className="text-white font-serif text-xl mb-2">O'Brien Construction, Inc.</h3>
            <p className="text-white/60 font-sans text-sm">
              Nevada Classification B General<br/>
              License Expansion Proposal
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Prepared By</p>
            <p className="text-white font-serif text-lg">Contractor Compliance & Advisory</p>
            <p className="text-white/60 font-sans text-sm mt-2">
              Strategic Licensing & Qualifier Placement
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs font-sans">
            &copy; {new Date().getFullYear()} Contractor Compliance & Advisory. Confidential and Proprietary.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-champagne"></div>
            <span className="text-white/40 text-xs tracking-wider uppercase">Secure Proposal Experience</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
