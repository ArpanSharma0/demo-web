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

      <motion.div style={{ y: yParallax, opacity: contentOpacity }} className="pt-[200px] pb-[120px]">
        
        {/* Centerpiece Statement */}
        <div className="text-center mb-32">
          <span className={`block text-[10px] uppercase tracking-[0.6em] mb-14 transition-colors duration-1000 ${isHovered ? 'text-text-primary/50' : 'text-text-primary/30'}`}>
            Stay with us
          </span>
          <h2 className={`font-serif text-[clamp(40px,5vw,64px)] font-light tracking-[0.15em] leading-tight transition-colors duration-1000 ${isHovered ? 'text-text-primary' : 'text-text-primary/90'}`}>
            Join our quiet world
          </h2>
        </div>

        {/* Newsletter Input */}
        <div className="flex justify-center mb-48">
          <div className="relative w-full max-w-[400px] px-8">
            <div className="flex items-center gap-8">
              <input 
                type="email" 
                placeholder="Your email"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="footer-input w-full"
              />
              <Magnetic strength={0.3}>
                <button className={`footer-submit transition-opacity duration-1000 ${isHovered ? '!opacity-70' : ''}`}>Subscribe</button>
              </Magnetic>
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
          <div className="flex justify-center gap-20 md:gap-32 mb-48">
            <FooterLink>Collections</FooterLink>
            <FooterLink>Journal</FooterLink>
            <FooterLink>Story</FooterLink>
            <FooterLink>Contact</FooterLink>
          </div>
        </div>

        {/* Brand Signature */}
        <div className="text-center">
          <Magnetic strength={0.15}>
            <h3 className={`font-serif text-3xl md:text-4xl tracking-[0.6em] uppercase mb-12 transition-colors duration-1000 ${isHovered ? 'text-text-primary' : 'text-text-primary/80'}`}>
              NOVAELLE
            </h3>
          </Magnetic>

          <div className="flex flex-col items-center gap-8">
            <p className={`text-[9px] tracking-[0.5em] uppercase transition-colors duration-1000 ${isHovered ? 'text-text-primary/35' : 'text-text-primary/15'}`}>
              London · Paris · Milano
            </p>
            <div className={`w-12 h-[1px] my-4 transition-colors duration-1000 ${isHovered ? 'bg-text-primary/20' : 'bg-text-primary/10'}`} />
            <div className="flex gap-16">
              <a href="#" className={`text-[8px] tracking-[0.4em] uppercase hover:text-text-primary/60 transition-colors duration-1000 ${isHovered ? 'text-text-primary/30' : 'text-text-primary/15'}`}>Privacy</a>
              <a href="#" className={`text-[8px] tracking-[0.4em] uppercase hover:text-text-primary/60 transition-colors duration-1000 ${isHovered ? 'text-text-primary/30' : 'text-text-primary/15'}`}>Terms</a>
            </div>
            <p className={`text-[8px] tracking-[0.4em] uppercase mt-4 transition-colors duration-1000 ${isHovered ? 'text-text-primary/25' : 'text-text-primary/10'}`}>
              © 2026 NOVAELLE STUDIO
            </p>
          </div>
        </div>

      </motion.div>
    </footer>
  );
};

export default CinematicFooter;
