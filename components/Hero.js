'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { heroData } from '@/lib/data';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]); 
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax image container */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {/* Image — using transform: scale instead of filter: blur for GPU performance */}
        <motion.div 
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full h-full bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url('${heroData.path}')` }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Text content */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-10 text-center text-white"
      >
        <div className="overflow-hidden mb-8">
          <motion.h1 
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="font-h1"
          >
            {heroData.title}
          </motion.h1>
        </div>
        
        <div className="overflow-hidden">
          <motion.p 
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            className="text-[11px] uppercase tracking-[0.8em] opacity-60"
          >
            {heroData.subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator — simplified */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 w-[1px] h-16 bg-white/30"
      />
    </section>
  );
};

export default Hero;
