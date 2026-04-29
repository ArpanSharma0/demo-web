'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { featuredPieces } from '@/lib/data';
import Reveal from './Reveal';

const FeaturedPieces = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const y1_val = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2_val = useTransform(scrollYProgress, [0, 1], [30, -30]);
  
  const y1 = isMobile ? 0 : y1_val;
  const y2 = isMobile ? 0 : y2_val;

  return (
    <section ref={containerRef} className="py-40 overflow-hidden">
      <div className="lux-container">

        {/* Section label */}
        <Reveal delay={0.1}>
          <p className="text-[10px] uppercase tracking-[0.6em] text-text-primary/25 text-center mb-20">
            Selected Pieces
          </p>
        </Reveal>

        {/* Asymmetric two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left piece — larger, pushed up */}
          <motion.div style={{ y: y1 }}>
            <Reveal delay={0.2}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-8">
                  <motion.div
                    initial={{ scale: 1.08, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full bg-cover bg-center will-change-transform"
                    style={{ backgroundImage: `url('${featuredPieces[0].image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-1000" />
                </div>
                <h3 className="font-serif text-2xl tracking-[0.08em] mb-2">{featuredPieces[0].name}</h3>
                <p className="text-[12px] text-text-primary/40 tracking-wide mb-2">{featuredPieces[0].description}</p>
                <span className="text-[11px] text-text-primary/30 tracking-[0.2em]">{featuredPieces[0].price}</span>
              </div>
            </Reveal>
          </motion.div>

          {/* Right piece — smaller, pushed down for asymmetry */}
          <motion.div style={{ y: y2 }} className="md:mt-48">
            <Reveal delay={0.4}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden mb-8">
                  <motion.div
                    initial={{ scale: 1.08, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full bg-cover bg-center will-change-transform"
                    style={{ backgroundImage: `url('${featuredPieces[1].image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-1000" />
                </div>
                <h3 className="font-serif text-2xl tracking-[0.08em] mb-2">{featuredPieces[1].name}</h3>
                <p className="text-[12px] text-text-primary/40 tracking-wide mb-2">{featuredPieces[1].description}</p>
                <span className="text-[11px] text-text-primary/30 tracking-[0.2em]">{featuredPieces[1].price}</span>
              </div>
            </Reveal>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedPieces;
