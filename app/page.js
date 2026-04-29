'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { products, lookbookImages, featuredPieces } from '@/lib/data';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Ensure scroll is enabled on mount
  useEffect(() => {
    if (!isLoading && !isTransitioning) {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading, isTransitioning]);

  // Prefetch & preload
  useEffect(() => {
    router.prefetch('/collections');
    products.forEach((p) => { if(p.image) { const img = new window.Image(); img.src = p.image; } });
    lookbookImages.forEach((src) => { const img = new window.Image(); img.src = src; });
    featuredPieces.forEach((p) => { if(p.image) { const img = new window.Image(); img.src = p.image; } });
  }, [router]);

  // Handle cinematic transition trigger
  useEffect(() => {
    const handleTrigger = () => {
      if (!isTransitioning && !isLoading) {
        setIsTransitioning(true);
        document.body.style.overflow = 'hidden';
      }
    };
    window.addEventListener('trigger-transition', handleTrigger);
    return () => window.removeEventListener('trigger-transition', handleTrigger);
  }, [isTransitioning, isLoading]);

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
            scale: isTransitioning ? 1.2 : 1,
            y: isTransitioning ? -120 : 0,
            opacity: isTransitioning ? 0.3 : 1,
            filter: isTransitioning ? 'blur(15px)' : 'blur(0px)'
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero />
          <Editorial />
          <FeaturedPieces />
          <BrandManifesto />
          <LookbookStrip />
        </motion.div>

        <CinematicFooter />
      </motion.main>
    </>
  );
}
