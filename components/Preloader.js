'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('writing'); // writing → hold → exit

  useEffect(() => {
    // Phase 1: Writing animation plays (1.2s)
    // Phase 2: Hold the completed text briefly (0.3s)
    const holdTimer = setTimeout(() => setPhase('hold'), 1200);
    // Phase 3: Exit
    const exitTimer = setTimeout(() => setPhase('exit'), 1500);
    // Phase 4: Fully gone
    const doneTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2300);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'exit' ? 0 : 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="preloader"
        >
          {/* Subtle tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'hold' || phase === 'writing' ? 0.3 : 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="preloader-tagline"
          >
            Modern Luxury Fashion
          </motion.p>

          {/* SVG Calligraphy Text */}
          <svg
            viewBox="0 0 900 120"
            className="preloader-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              className="preloader-text"
            >
              Sweety Fashion
            </text>
          </svg>

          {/* Progress line */}
          <div className="preloader-line-container">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="preloader-line"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
