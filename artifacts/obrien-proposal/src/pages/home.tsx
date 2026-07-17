import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Overview } from '../components/sections/Overview';
import { Roadmap } from '../components/sections/Roadmap';
import { Investment } from '../components/sections/Investment';
import { Payment } from '../components/sections/Payment';
import { NextSteps } from '../components/sections/NextSteps';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Roadmap />
        <Investment />
        <Payment />
        <NextSteps />
      </main>
      <Footer />
    </div>
  );
}
