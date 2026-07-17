import React, { useEffect, useState } from 'react';
import logo from '@assets/this_one_1784311238771.png';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Process', href: '#process' },
    { name: 'Investment', href: '#investment' },
    { name: 'Payment', href: '#payment' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-[0.16,1,0.3,1] border-b ${
        scrolled 
          ? 'bg-navy/95 backdrop-blur-md py-4 border-white/10 shadow-lg' 
          : 'bg-transparent py-6 md:py-8 border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="block w-40 md:w-48 transition-opacity duration-300 hover:opacity-80">
          <img src={logo} alt="O'Brien Construction, Inc." className="w-full h-auto object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
