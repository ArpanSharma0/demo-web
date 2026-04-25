'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { lookbookImages } from '@/lib/data';

const LookbookStrip = () => {
  const containerRef = useRef(null);

  // Track scroll progress of the TALL parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll → horizontal translateX
  // Move from 0% to -100% of the overflow (total width - viewport width)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  // Fade in the label
  const labelOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    // TALL parent — this creates the vertical scroll distance
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>

      {/* STICKY container — pins at top for the duration of the tall parent */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

        {/* Section label */}
        <motion.p
          style={{ opacity: labelOpacity }}
          className="text-[10px] uppercase tracking-[0.6em] text-text-primary/25 text-center mb-12"
        >
          Lookbook — Spring 2026
        </motion.p>

        {/* HORIZONTAL TRACK — driven by vertical scroll */}
        <motion.div
          style={{ x }}
          className="flex gap-5 pl-[5vw] will-change-transform"
        >
          {lookbookImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] md:w-[380px] lg:w-[420px] aspect-[2/3] overflow-hidden group"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full bg-cover bg-center will-change-transform"
                style={{ backgroundImage: `url('${src}')` }}
              />
            </div>
          ))}
        </motion.div>

        {/* Scroll hint — fades out as user scrolls */}
        <motion.p
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0.3, 0]) }}
          className="text-[9px] uppercase tracking-[0.5em] text-text-primary/20 text-center mt-12"
        >
          Scroll to explore
        </motion.p>
      </div>
    </section>
  );
};

export default LookbookStrip;
