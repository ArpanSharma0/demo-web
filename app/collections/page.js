'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import CustomCursor from '@/components/CustomCursor';
import CinematicFooter from '@/components/CinematicFooter';
import Reveal from '@/components/Reveal';

export default function CollectionsPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
    router.prefetch('/');
  }, [router]);

  // Handle cinematic transition trigger
  useEffect(() => {
    const handleTrigger = () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        document.body.style.overflow = 'hidden';
      }
    };
    const handleTransitionReady = (e) => {
      const route = e.detail?.route;
      if (route) router.push(route);
    };

    window.addEventListener('trigger-transition', handleTrigger);
    window.addEventListener('transition-ready', handleTransitionReady);
    return () => {
      window.removeEventListener('trigger-transition', handleTrigger);
      window.removeEventListener('transition-ready', handleTransitionReady);
    };
  }, [isTransitioning, router]);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <motion.main
        animate={{ 
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.05 : 1,
          filter: isTransitioning ? 'blur(10px)' : 'blur(0px)'
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="min-h-screen bg-transparent"
      >
        {/* Header — generous spacing */}
        <section className="pt-40 md:pt-60 pb-16 md:pb-32">
          <div className="lux-container">
            <Reveal width="100%" delay={0.2} stagger>
              <span className="text-[10px] uppercase tracking-[0.8em] text-text-primary/80 block mb-10 font-medium">
                The Archive
              </span>
              <h1 className="font-h1">
                Full Collection
              </h1>
              <p className="font-body mt-12 max-w-[600px] text-text-primary/95">
                A definitive archive of minimalist luxury. Each piece is meticulously crafted to endure beyond seasonal trends.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Filters strip — with horizontal scroll on mobile */}
        <div className="lux-container mb-12 md:mb-20 overflow-x-auto no-scrollbar">
          <div className="flex justify-start md:justify-center gap-8 md:gap-20 min-w-max pb-4">
            {['All', 'Outerwear', 'Knitwear', 'Tailoring', 'Essentials'].map((cat) => (
              <button 
                key={cat}
                className={`text-[10px] uppercase tracking-[0.3em] pb-2 border-b transition-all duration-700 cursor-pointer ${
                  cat === 'All' 
                    ? 'text-text-primary border-bg-secondary' 
                    : 'text-text-primary/60 border-transparent hover:text-text-primary/90 hover:border-text-primary/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <section className="pb-40 max-w-[1200px] mx-auto">
          <ProductGrid />
        </section>

        <CinematicFooter />
      </motion.main>
    </>
  );
}
