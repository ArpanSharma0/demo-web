'use client';
import { motion } from 'framer-motion';

export default function Story() {
  return (
    <section className="py-40 bg-bg-primary overflow-hidden">
      <div className="lux-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          {/* Editorial Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=1000&auto=format&fit=crop" 
              alt="Provence Craftsmanship" 
              className="w-full h-full object-cover grayscale-[0.2]"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent">Heritage</span>
            <h2 className="text-5xl md:text-7xl font-serif leading-none tracking-tight">PROVENCE<br/>TEXTILES</h2>
            <div className="h-[1px] w-24 bg-text-primary/20" />
            <p className="text-base text-text-muted font-light leading-relaxed max-w-md italic">
               "Founded on the principle of minimal luxury, we believe style resides in the quiet essence of simplicity. Every stitch tells a story of heritage, sourced from the sun-drenched fields of southern France."
            </p>
            <p className="text-sm text-text-primary leading-loose tracking-wide max-w-sm">
               Our collection is an ode to the natural world. By utilizing traditional weaving techniques and organic cotton staples, we craft silhouettes that endure beyond the season.
            </p>
            <button className="self-start text-[10px] uppercase tracking-widest-luxury border-b border-accent pb-2 hover:text-accent transition-all duration-500">
               Our Legacy
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
