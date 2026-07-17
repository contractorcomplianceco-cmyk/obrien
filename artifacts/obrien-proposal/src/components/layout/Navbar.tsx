import React, { useEffect, useState } from 'react';
import logo from '@assets/this_one_1784311238771.png';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-navy/95 backdrop-blur-md py-4 border-white/10 shadow-lg' 
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="block w-40 md:w-48 transition-opacity hover:opacity-80">
          <img src={logo} alt="O'Brien Construction, Inc." className="w-full h-auto object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs tracking-widest uppercase text-white/80 hover:text-white hover:border-b-accent border-b border-transparent transition-all duration-300 pb-1 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
