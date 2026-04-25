'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Editorial from '@/components/Editorial';
import FeaturedPieces from '@/components/FeaturedPieces';
import BrandManifesto from '@/components/BrandManifesto';
import LookbookStrip from '@/components/LookbookStrip';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import CinematicFooter from '@/components/CinematicFooter';
import Reveal from '@/components/Reveal';
import { products, lookbookImages, featuredPieces } from '@/lib/data';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const transitionTriggerRef = useRef(null);
  const isTriggerInView = useInView(transitionTriggerRef, { amount: 0.6 });

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Prefetch & preload
  useEffect(() => {
    router.prefetch('/collections');
    products.forEach((p) => { const img = new window.Image(); img.src = p.image; });
    lookbookImages.forEach((src) => { const img = new window.Image(); img.src = src; });
    featuredPieces.forEach((p) => { const img = new window.Image(); img.src = p.image; });
  }, [router]);

  // Scroll interception — triggers after Lookbook section
  useEffect(() => {
    if (isTriggerInView && !isTransitioning && !isLoading) {
      setIsTransitioning(true);
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('trigger-transition', {
          detail: { route: '/collections' }
        }));
      }, 400);
    }
  }, [isTriggerInView, isTransitioning, isLoading]);

  // Listen for overlay completion → push route
  useEffect(() => {
    const handleTransitionReady = (e) => {
      const route = e.detail?.route;
      if (route) router.push(route);
    };
    window.addEventListener('transition-ready', handleTransitionReady);
    return () => window.removeEventListener('transition-ready', handleTransitionReady);
  }, [router]);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="min-h-screen overflow-x-clip"
      >
        <Navbar />

        <motion.div
          animate={{
            opacity: isTransitioning ? 0 : 1,
            y: isTransitioning ? -80 : 0
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Scene 1: Hero */}
          <Hero />

          {/* Scene 2: Editorial — Provence Textiles */}
          <Editorial />

          {/* Scene 3: Featured Pieces */}
          <FeaturedPieces />

          {/* Scene 4: Brand Manifesto */}
          <BrandManifesto />

          {/* Scene 5: Lookbook */}
          <LookbookStrip />
        </motion.div>

        {/* Transition Trigger — after Lookbook, before Footer */}
        <div ref={transitionTriggerRef} className="py-40">
          <motion.div
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <Reveal delay={0.2}>
              <p className="text-[10px] uppercase tracking-[0.6em] text-text-primary/20 mb-8">
                Continue the journey
              </p>
              <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-light tracking-[0.1em] text-text-primary/60">
                View Full Collection
              </h2>
            </Reveal>
          </motion.div>
        </div>

        {/* Scene 6: Cinematic Footer */}
        <motion.div
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: 1 }}
        >
          <CinematicFooter />
        </motion.div>
      </motion.main>
    </>
  );
}
