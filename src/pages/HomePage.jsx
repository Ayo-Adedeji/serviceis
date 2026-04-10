import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WhatWeDo from '../components/WhatWeDo';
import WhoItsFor from '../components/WhoItsFor';
import HowItWorks from '../components/HowItWorks';
import WhyServiceIS from '../components/WhyServiceIS';
import { Values } from '../components/Values';
import Centres from '../components/Centres';
import ServiceProvider from '../components/ServiceProvider';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import useScrollAnimation from '../hooks/useScrollAnimation';

import GetStarted from '../components/GetStarted';

const HomePage = () => {
  const valuesRef = useScrollAnimation(0.1, { single: true });
  const centresRef = useScrollAnimation(0.1, { single: true });
  const partnersRef = useScrollAnimation(0.1, { single: true });

  return (
    <div className="pt-16">
      <Navbar />
      <HeroSection />
      <GetStarted />
      <WhatWeDo />
      <WhoItsFor />
      <HowItWorks />
      <WhyServiceIS />
      <div ref={valuesRef} className="bg-[#0A0F1E]">
        <Values />
      </div>
      <div ref={centresRef}>
        <Centres />
      </div>
      <div ref={partnersRef} className="bg-gray-50">
        <ServiceProvider />
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
