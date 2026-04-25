'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import CustomCursor from '@/components/CustomCursor';
import Reveal from '@/components/Reveal';

export default function CollectionsPage() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Restore scroll on entering the page
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);

    // Fade out overlay
    const timer = setTimeout(() => setShowOverlay(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="transition-overlay !pointer-events-auto"
          />
        )}
      </AnimatePresence>
      
      <motion.main
        layoutId="collection-view"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="min-h-screen bg-transparent"
      >

        <section className="section-padding pt-60">
          <div className="lux-container text-center mb-40">
            <Reveal width="100%" delay={0.2} stagger>
              <span className="text-[10px] uppercase tracking-[0.6em] text-text-primary/30 block mb-10">Archive</span>
              <h1 className="font-h1 uppercase tracking-[0.3em]">Full Collection</h1>
              <p className="font-body mt-14 max-w-[600px] mx-auto opacity-40">
                A definitive archive of minimalist luxury. Each piece is meticulously crafted to endure beyond seasonal trends.
              </p>
            </Reveal>
          </div>
          
          <ProductGrid />
          
          {/* Extended Grid for the full page feel */}
          <div className="mt-20">
            <ProductGrid />
          </div>
        </section>

        <footer className="section-padding bg-[#EAE4DD]/30 border-t border-black/5">
          <div className="lux-container text-center">
            <Reveal delay={0.2}>
              <h2 className="text-4xl font-serif tracking-[0.4em] uppercase mb-10">NOVAELLE</h2>
              <p className="text-[9px] text-text-primary/20 tracking-[0.4em] uppercase">© 2026 NOVAELLE STUDIO. LONDON.</p>
            </Reveal>
          </div>
        </footer>
      </motion.main>
    </>
  );
}
