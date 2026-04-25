'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled ? 'py-6 bg-white/80 backdrop-blur-lg border-b border-black/5' : 'py-12 bg-transparent text-white'
      }`}
    >
      <div className={`flex gap-14 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-700 ${isScrolled ? 'text-text-primary' : 'text-white'}`}>
        <Link href="/" className="nav-link">Collections</Link>
        <Link href="/" className="nav-link">Journal</Link>
      </div>

      <Link href="/" className={`text-4xl font-serif tracking-[0.6em] uppercase transition-all duration-1000 ${isScrolled ? 'text-text-primary scale-90' : 'text-white scale-100'}`}>
        NOVAELLE
      </Link>

      <div className={`flex gap-14 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-700 ${isScrolled ? 'text-text-primary' : 'text-white'}`}>
        <button className="nav-link uppercase">Search</button>
        <button className="nav-link uppercase">Cart (0)</button>
      </div>
    </motion.nav>
  );
};

export default Navbar;



