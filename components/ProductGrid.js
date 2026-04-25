'use client';
import { motion } from 'framer-motion';
import { products } from '@/lib/data';
import Reveal from './Reveal';

const ProductGrid = () => {
  return (
    <section className="section-padding">

      <div className="lux-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-x-20 md:gap-y-32">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.15}>
              <motion.div 
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-10 bg-bg-secondary img-reveal-container">
                  <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-1000 flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-h3 mb-3">{product.name}</h3>
                  <span className="text-[11px] font-body opacity-40 uppercase tracking-widest">{product.price}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;


