'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import CustomCursor from '@/components/CustomCursor';
import CinematicFooter from '@/components/CinematicFooter';
import Reveal from '@/components/Reveal';

export default function CollectionsPage() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
    router.prefetch('/');
  }, [router]);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="min-h-screen bg-transparent"
      >
        {/* Header — generous spacing */}
        <section className="pt-48 pb-24">
          <div className="lux-container text-center">
            <Reveal width="100%" delay={0.2} stagger>
              <span className="text-[10px] uppercase tracking-[0.6em] text-text-primary/25 block mb-8">
                Archive
              </span>
              <h1 className="font-h1 uppercase tracking-[0.3em]">
                Full Collection
              </h1>
              <p className="font-body mt-10 max-w-[520px] mx-auto text-text-primary/40">
                A definitive archive of minimalist luxury. Each piece is meticulously crafted to endure beyond seasonal trends.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Filters strip */}
        <div className="lux-container mb-20">
          <div className="flex justify-center gap-12 md:gap-20">
            {['All', 'Outerwear', 'Knitwear', 'Tailoring', 'Essentials'].map((cat) => (
              <button 
                key={cat}
                className={`text-[10px] uppercase tracking-[0.3em] pb-2 border-b transition-all duration-700 cursor-pointer ${
                  cat === 'All' 
                    ? 'text-text-primary/70 border-text-primary/30' 
                    : 'text-text-primary/25 border-transparent hover:text-text-primary/50 hover:border-text-primary/15'
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
