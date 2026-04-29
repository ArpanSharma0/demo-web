'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { editorialData } from '@/lib/data';
import Reveal from './Reveal';

const Editorial = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={containerRef} className="min-h-screen w-full flex items-center justify-center overflow-hidden py-32">

      <div className="lux-container w-full">
        <div className="flex flex-col md:flex-row items-center gap-24 md:gap-40">
          {/* Left: Image */}
          <div className="w-full md:w-5/12 aspect-[3/4] max-h-[70vh] overflow-hidden img-reveal-container">
            <motion.div 
              style={{ 
                scale: imgScale,
                backgroundImage: `url('${editorialData.image}')` 
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full bg-cover bg-center"
            />

          </div>

          {/* Right: Editorial Content */}
          <motion.div 
            style={{ y: yParallax }}
            className="w-full md:w-1/2 flex flex-col items-start px-0 md:px-12"
          >
            <Reveal delay={0.3}>
              <h2 className="font-h2 leading-tight mb-14 tracking-tight lux-text-shadow">
                {editorialData.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="font-body max-w-[480px] text-text-primary/95">
                {editorialData.paragraph}
              </p>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Editorial;


