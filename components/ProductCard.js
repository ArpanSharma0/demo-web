'use client';
import { motion } from 'framer-motion';

export default function ProductCard({ image, name, price, category }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-secondary mb-6">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1)"
        />
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-text-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
           <button className="px-8 py-3 bg-white text-text-primary text-[10px] uppercase tracking-[0.2em] shadow-sm hover:bg-text-primary hover:text-white transition-colors duration-500 whitespace-nowrap">
             Explore Details
           </button>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="font-serif text-lg text-text-primary mb-1 tracking-tight">{name}</h3>
        <p className="text-[11px] text-accent uppercase tracking-widest leading-loose">{price}</p>
      </div>
    </motion.div>
  );
}
