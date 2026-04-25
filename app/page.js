'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Editorial from '@/components/Editorial';
import Reveal from '@/components/Reveal';
import LuxuryButton from '@/components/LuxuryButton';
import CustomCursor from '@/components/CustomCursor';
import { products } from '@/lib/data';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const router = useRouter();
  const collectionRef = useRef(null);
  const isInView = useInView(collectionRef, { amount: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  // 1 & 2. Route Prefetching & Image Preloading
  useEffect(() => {
    router.prefetch('/collections');
    
    // Using native Image object to ensure items are in browser cache
    products.forEach((product) => {
      const img = new window.Image();
      img.src = product.image;
    });
  }, [router]);

  // Level 10 Scroll Interception & Transition Sequence
  useEffect(() => {
    if (isInView && !isTransitioning && !isLoading) {
      setIsTransitioning(true);
      document.body.style.overflow = 'hidden'; // Lock Scroll
      
      // Step 3: Activate overlay
      setTimeout(() => {
        setShowOverlay(true);
      }, 400);

      // Step 4: After overlay covers screen, navigate
      // Overlay takes 1.2s to slide up. 400ms delay + 1200ms = 1600ms total. 
      // We push exact frame overlay is full.
      setTimeout(() => {
        router.push('/collections');
      }, 1600);
    }
  }, [isInView, isTransitioning, isLoading, router]);


  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="transition-overlay !pointer-events-auto"
          />
        )}
      </AnimatePresence>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="min-h-screen overflow-x-hidden"
      >
        <Navbar />
        
        <motion.div 
          animate={{ 
            opacity: isTransitioning ? 0 : 1,
            y: isTransitioning ? -100 : 0 
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero />
          <Editorial />
        </motion.div>

        {/* Collection Trigger Section */}
        <motion.section 
          ref={collectionRef}
          layoutId="collection-view"
          animate={{ scale: isTransitioning ? 1.05 : 1 }}
          className="section-padding overflow-hidden relative z-20 bg-transparent"
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >

          <div className="lux-container text-center mb-40">
            <Reveal width="100%" delay={0.2} stagger>
              <span className="text-[10px] uppercase tracking-[0.6em] text-text-primary/30 block mb-10">Signature Pieces</span>
              <h2 className="font-h2 uppercase tracking-[0.3em]">The Current Edit</h2>
            </Reveal>
          </div>
          
          <ProductGrid />
          
          <div className="flex justify-center mt-32">
            <Reveal delay={0.4}>
              <LuxuryButton>View Full Collection</LuxuryButton>
            </Reveal>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="section-padding border-t border-black/5"
        >

          <div className="lux-container">
            <div className="flex flex-col md:flex-row justify-between items-start gap-40">
              <Reveal delay={0.2} stagger>
                <div className="max-w-[400px]">
                  <h2 className="text-4xl font-serif tracking-[0.4em] uppercase mb-14">NOVAELLE</h2>
                  <p className="font-body uppercase tracking-[0.15em] opacity-40 leading-loose">
                    A dialogue between heritage craftsmanship and contemporary silhouette. Designed for the conscious perspective.
                  </p>
                </div>
              </Reveal>
              
              <div className="grid grid-cols-2 gap-32">
                <Reveal delay={0.4} stagger>
                  <div className="flex flex-col gap-10">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium">Boutique</h4>
                    <div className="flex flex-col gap-6 text-[10px] uppercase tracking-[0.2em] text-text-primary/30">
                      <a href="#" className="nav-link">Collections</a>
                      <a href="#" className="nav-link">Archival</a>
                      <a href="#" className="nav-link">Journal</a>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.6} stagger>
                  <div className="flex flex-col gap-10">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium">Studio</h4>
                    <div className="flex flex-col gap-6 text-[10px] uppercase tracking-[0.2em] text-text-primary/30">
                      <a href="#" className="nav-link">Story</a>
                      <a href="#" className="nav-link">Contact</a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
            
            <Reveal delay={0.8} width="100%">
              <div className="mt-48 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10">
                <p className="text-[9px] text-text-primary/20 tracking-[0.4em] uppercase">© 2026 NOVAELLE STUDIO. LONDON.</p>
                <div className="flex gap-16 text-[9px] text-text-primary/20 tracking-[0.4em] uppercase">
                  <a href="#" className="hover:text-text-primary transition-colors duration-1000">Privacy</a>
                  <a href="#" className="hover:text-text-primary transition-colors duration-1000">Terms</a>
                </div>
              </div>
            </Reveal>
          </div>
        </motion.footer>
      </motion.main>

    </>
  );
}



