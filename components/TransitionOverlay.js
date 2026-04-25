'use client';
import { motion } from 'framer-motion';

export default function TransitionOverlay() {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "-100%" }}
      transition={{ 
        duration: 2, 
        ease: [0.22, 1, 0.36, 1],
      }}
      className="transition-overlay"
    />
  );
}
