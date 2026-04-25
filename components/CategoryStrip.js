'use client';
import { motion } from 'framer-motion';

const categories = [
  { title: 'Cotton', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600' },
  { title: 'Linen', img: 'https://images.unsplash.com/photo-1560506820-2495d436ec0d?q=80&w=600' },
  { title: 'Summer Wear', img: 'https://images.unsplash.com/photo-1490481651871-ab68ec25d43d?q=80&w=600' },
  { title: 'Minimal Sets', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600' },
];

export default function CategoryStrip() {
  return (
    <section className="py-24 bg-bg-primary overflow-hidden">
      <div className="lux-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
            >
              <img 
                src={cat.img} 
                alt={cat.title} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1000ms] ease-out"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <h3 className="text-white text-xl font-serif tracking-widest uppercase">{cat.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
