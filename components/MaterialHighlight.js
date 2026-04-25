'use client';
import { motion } from 'framer-motion';

const stats = [
  { label: '40% Cotton Staples', desc: 'Sustainably sourced GIZA cotton' },
  { label: '30% Quiet Minimal', desc: 'Design restraint for timeless silhouettes' },
  { label: '20% Vintage Traditions', desc: 'Hand-woven techniques from Provence' },
];

export default function MaterialHighlight() {
  return (
    <section className="py-32 bg-bg-secondary relative overflow-hidden">
      {/* Abstract blurred background shapes for premium feel */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="lux-container text-center mb-24">
        <span className="text-[10px] uppercase tracking-[0.5em] text-accent block mb-6">Fabric Story</span>
        <h2 className="text-4xl md:text-5xl font-serif leading-tight">THE ESSENCE OF NOBLE FIBERS</h2>
      </div>

      <div className="lux-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="glass p-12 text-center flex flex-col gap-6 group hover:translate-y-[-10px] transition-transform duration-700"
            >
              <h3 className="font-serif text-2xl group-hover:text-accent transition-colors duration-500">{stat.label}</h3>
              <div className="h-[1px] w-12 bg-accent/30 mx-auto" />
              <p className="text-xs text-text-secondary tracking-widest uppercase leading-loose">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
