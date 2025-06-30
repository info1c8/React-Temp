import React from 'react';
import HeroSection from '../components/home/HeroSection';
import QuickLinks from '../components/home/QuickLinks';
import FeaturedProperties from '../components/home/FeaturedProperties';
import StatsSection from '../components/home/StatsSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsSection from '../components/home/NewsSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <QuickLinks />
      <FeaturedProperties />
      <ServicesSection />
      <TestimonialsSection />
      <StatsSection />
      <NewsSection />
    </div>
  );
};

export default Index;