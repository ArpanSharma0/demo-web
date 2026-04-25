'use client';
import { Children } from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, delay = 0, width = "fit-content", stagger = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: {
        delayChildren: delay,
        staggerChildren: stagger ? 0.25 : 0,
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full h-full"
      >
        {stagger ? (
          Children.map(children, (child) => (
            <motion.div variants={itemVariants} className="w-full h-full">
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants} className="w-full h-full">
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Reveal;


