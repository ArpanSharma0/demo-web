'use client';
import { motion } from 'framer-motion';

export default function Newsletter() {
  return (
    <section className="py-40 bg-[#EDE8E2]">
      <div className="lux-container max-w-4xl text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2 }}
           viewport={{ once: true }}
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-accent block mb-8">Journal</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-12 tracking-tight">JOIN OUR QUIET WORLD</h2>
          <p className="text-sm text-text-muted mb-16 font-light tracking-wide italic">
             Receive occasional notes on minimalism, seasonal shifts, and new collections.
          </p>
          
          <form className="flex flex-col md:flex-row gap-0 max-w-lg mx-auto overflow-hidden border-b border-text-primary/20" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="flex-1 bg-transparent py-4 text-[10px] uppercase tracking-widest-luxury outline-none placeholder:text-text-muted/50"
            />
            <button className="py-4 px-10 text-[10px] uppercase tracking-widest-luxury font-medium hover:text-accent transition-colors duration-500">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
