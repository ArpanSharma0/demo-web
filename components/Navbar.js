'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isOverHero, setIsOverHero] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // On collection page there is no dark hero, so always use dark text
  const isHomePage = pathname === '/';

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    // Hero is roughly 1 viewport tall; switch color once past 80% of it
    setIsOverHero(latest < window.innerHeight * 0.8);
  });

  const useLightText = isHomePage && isOverHero && !isScrolled;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled 
          ? 'py-6 bg-[#F5F1ED]/90 backdrop-blur-xl border-b border-black/5' 
          : 'py-12 bg-transparent'
      }`}
    >
      <div className={`flex gap-14 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-700 ${useLightText ? 'text-white' : 'text-[#2C2824]'}`}>
        <Link href="/collections" className="nav-link">Collections</Link>
        <Link href="/" className="nav-link">Journal</Link>
      </div>

      <Link href="/" className={`text-4xl font-serif tracking-[0.6em] uppercase transition-all duration-1000 ${useLightText ? 'text-white scale-100' : 'text-[#2C2824] scale-90'}`}>
        NOVAELLE
      </Link>

      <div className={`flex gap-14 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-700 ${useLightText ? 'text-white' : 'text-[#2C2824]'}`}>
        <button className="nav-link uppercase">Search</button>
        <button className="nav-link uppercase">Cart (0)</button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
