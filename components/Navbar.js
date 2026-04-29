'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isOverHero, setIsOverHero] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    setIsOverHero(latest < window.innerHeight * 0.8);
  });

  const useLightText = isHomePage && isOverHero && !isScrolled;

  const handleNavClick = (e, href) => {
    if (pathname === href) {
      if (href === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('trigger-transition', {
      detail: { route: href }
    }));
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled 
          ? 'py-4 md:py-6 bg-[#F9F6F1]/90 backdrop-blur-xl border-b border-black/5' 
          : 'py-8 md:py-12 bg-transparent'
      }`}
    >
      {/* Left Links */}
      <div className={`flex items-center gap-4 md:gap-14 text-[10px] uppercase tracking-[0.1em] md:tracking-[0.3em] font-medium transition-colors duration-700 ${useLightText ? 'text-white' : 'text-text-primary'}`}>
        <a 
          href="/collections" 
          onClick={(e) => handleNavClick(e, '/collections')}
          className="nav-link inline-block"
        >
          Collections
        </a>
        <a 
          href="/" 
          onClick={(e) => handleNavClick(e, '/')}
          className="nav-link !hidden lg:!inline-block"
        >
          Journal
        </a>
      </div>

      {/* Center Logo */}
      <a 
        href="/" 
        onClick={(e) => handleNavClick(e, '/')}
        className={`absolute left-1/2 -translate-x-1/2 text-lg md:text-4xl font-serif tracking-normal md:tracking-[0.1em] text-center transition-all duration-1000 ${useLightText ? 'text-white scale-100' : 'text-text-primary scale-90'}`}
      >
        Sweety Fashion
      </a>

      {/* Right Links */}
      <div className={`flex items-center gap-4 md:gap-14 text-[10px] uppercase tracking-[0.1em] md:tracking-[0.3em] font-medium transition-colors duration-700 ${useLightText ? 'text-white' : 'text-text-primary'}`}>
        <button className="nav-link !hidden lg:!inline-block">Search</button>
        <button className="nav-link inline-block">
          <span className="hidden md:inline">Cart </span>(0)
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
