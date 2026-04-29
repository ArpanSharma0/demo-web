'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';

const EASE = [0.22, 1, 0.36, 1];

const FooterLink = ({ children, href = '#' }) => (
  <Magnetic strength={0.3}>
    <a href={href} className="footer-link">
      {children}
    </a>
  </Magnetic>
);

const CinematicFooter = () => {
  const containerRef = useRef(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <footer 
      ref={containerRef} 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Soft divider */}
      <motion.div style={{ opacity: contentOpacity }} className="lux-container">
        <div className="w-full h-[1px] bg-text-primary/5" />
      </motion.div>

      <motion.div style={{ y: yParallax, opacity: contentOpacity }} className="pt-[100px] md:pt-[200px] pb-[80px] md:pb-[120px]">
        
        {/* Centerpiece Statement */}
        <div className="text-center mb-24 md:mb-32">
          <span className={`block text-[10px] uppercase tracking-[0.6em] mb-10 md:mb-14 transition-colors duration-1000 ${isHovered ? 'text-text-primary/90' : 'text-text-primary/70'}`}>
            Stay with us
          </span>
          <h2 className={`font-serif text-[clamp(32px,5vw,64px)] font-light tracking-[0.1em] md:tracking-[0.15em] leading-tight transition-colors duration-1000 ${isHovered ? 'text-text-primary' : 'text-text-primary/90'}`}>
            Join our quiet world
          </h2>
        </div>

        {/* Newsletter Input */}
        <div className="flex justify-center mb-32 md:mb-48 px-4">
          <div className="relative w-full max-w-[400px]">
            <div className="flex items-center gap-6 md:gap-8">
              <input 
                type="email" 
                placeholder="Your email"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="footer-input w-full"
              />
              <button className={`footer-submit transition-opacity duration-1000 ${isHovered ? '!opacity-70' : ''}`}>Subscribe</button>
            </div>
            
            <div className={`relative mt-3 h-[1px] transition-colors duration-1000 ${isHovered ? 'bg-text-primary/20' : 'bg-text-primary/10'}`}>
              <motion.div 
                animate={{ 
                  scaleX: emailFocused ? 1 : 0,
                  opacity: emailFocused ? 1 : 0.4
                }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0 bg-text-primary/40 origin-center"
              />
            </div>
          </div>
        </div>

        {/* Navigation Cluster */}
        <div className="lux-container">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 md:gap-32 mb-32 md:mb-48">
            <FooterLink>Collections</FooterLink>
            <FooterLink>Journal</FooterLink>
            <FooterLink>Story</FooterLink>
            <FooterLink>Contact</FooterLink>
          </div>
        </div>

        {/* Brand Signature */}
        <div className="text-center">
          <Magnetic strength={0.15}>
            <h3 className={`font-serif text-3xl md:text-5xl tracking-[0.05em] mb-8 md:mb-12 transition-colors duration-1000 ${isHovered ? 'text-text-primary' : 'text-text-primary/90'}`}>
              Sweety Fashion
            </h3>
          </Magnetic>

          <div className="flex flex-col items-center gap-6 md:gap-8">
            <p className={`text-[9px] tracking-[0.5em] uppercase transition-colors duration-1000 ${isHovered ? 'text-text-primary/90' : 'text-text-primary/80'}`}>
              London · Paris · Milano
            </p>
            <div className={`w-12 h-[1px] my-2 md:my-4 transition-colors duration-1000 ${isHovered ? 'bg-text-primary/20' : 'bg-text-primary/10'}`} />
            <div className="flex gap-12 md:gap-16">
              <a href="#" className={`text-[10px] tracking-[0.2em] hover:text-text-primary/95 transition-colors duration-1000 ${isHovered ? 'text-text-primary/85' : 'text-text-primary/75'}`}>Privacy</a>
              <a href="#" className={`text-[10px] tracking-[0.2em] hover:text-text-primary/95 transition-colors duration-1000 ${isHovered ? 'text-text-primary/85' : 'text-text-primary/75'}`}>Terms</a>
            </div>
            <p className={`text-[10px] tracking-[0.6em] mt-4 transition-colors duration-1000 ${isHovered ? 'text-text-primary/30' : 'text-text-primary/20'}`}>
              © 2026 Sweety Fashion Studio
            </p>
          </div>
        </div>

      </motion.div>
    </footer>
  );
};

export default CinematicFooter;
