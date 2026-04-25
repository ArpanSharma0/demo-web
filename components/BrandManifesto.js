'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { manifesto } from '@/lib/data';

const BrandManifesto = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen w-full flex items-center justify-center py-40"
    >
      <motion.div 
        style={{ opacity, y }}
        className="text-center max-w-[800px] mx-auto px-8"
      >
        {/* Decorative line */}
        <motion.div 
          style={{ scaleX: lineScale }}
          className="w-16 h-[1px] bg-text-primary/15 mx-auto mb-20 origin-center"
        />

        {/* The statement */}
        <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-light leading-[1.5] tracking-[0.04em] text-text-primary/80 mb-16">
          {manifesto.statement}
        </h2>

        {/* Attribution */}
        <p className="text-[10px] uppercase tracking-[0.5em] text-text-primary/25">
          {manifesto.attribution}
        </p>

        {/* Bottom decorative line */}
        <motion.div 
          style={{ scaleX: lineScale }}
          className="w-16 h-[1px] bg-text-primary/15 mx-auto mt-20 origin-center"
        />
      </motion.div>
    </section>
  );
};

export default BrandManifesto;
