'use client';
import { motion } from 'framer-motion';
import { products } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const ProductGrid = ({ columns = 3 }) => {
  return (
    <div className="w-full">
      <div className="lux-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-x-10 gap-y-20 md:gap-x-14 md:gap-y-28`}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#EAE6E1]">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full bg-cover bg-center will-change-transform"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-1000 flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    View
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-serif text-[15px] tracking-[0.08em] mb-2">{product.name}</h3>
                <span className="text-[11px] font-body text-text-primary/35 uppercase tracking-[0.15em]">{product.price}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductGrid;
