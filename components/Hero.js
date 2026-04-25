'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { heroData } from '@/lib/data';
import LuxuryButton from './LuxuryButton';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]); 
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-bg-primary">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <motion.div 
          initial={{ scale: 1.15, filter: 'blur(10px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${heroData.path}')` }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-10 text-center text-white"
      >
        <div className="overflow-hidden mb-12">
          <motion.h1 
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="font-h1 leading-none tracking-[0.1em]"
          >
            {heroData.title}
          </motion.h1>
        </div>
        
        <div className="overflow-hidden mb-16">
          <motion.p 
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            className="text-[12px] md:text-[14px] uppercase tracking-[0.6em] opacity-80"
          >
            {heroData.subtitle}
          </motion.p>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
        >
          <LuxuryButton className="border-white/10 !text-white">
            Explore Collection
          </LuxuryButton>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 0.4, height: 80 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="w-[1px] bg-white/40"
        >
          <motion.div 
            animate={{ y: [0, 80, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/4 bg-white"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;




