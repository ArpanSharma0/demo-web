'use client';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const LuxuryButton = ({ children, className = "" }) => {
  return (
    <Magnetic strength={0.3}>
      <motion.button
        className={`relative px-12 py-5 border border-text-primary/10 text-[10px] uppercase tracking-[0.3em] overflow-hidden group transition-all duration-1000 ${className}`}
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        initial="initial"
      >
        <motion.span 
          className="relative z-10 transition-colors duration-700 block"
          variants={{
            initial: { color: "inherit" },
            hover: { color: "#fff" }
          }}
        >
          {children}
        </motion.span>
        <motion.div
          className="absolute inset-0 bg-text-primary z-0"
          variants={{
            initial: { x: "-100%" },
            hover: { x: 0 }
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1] 
          }}
        />
      </motion.button>
    </Magnetic>
  );
};

export default LuxuryButton;


