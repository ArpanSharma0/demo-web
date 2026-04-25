'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function GlobalTransition() {
  const pathname = usePathname();
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pendingRoute = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleStart = async (e) => {
      if (isAnimating) return;
      setIsAnimating(true);
      
      // Store the route to navigate to
      pendingRoute.current = e.detail?.route || '/';
      
      // Ensure it starts from bottom
      await controls.set({ y: "100%" });
      
      // Slide up to cover the screen
      await controls.start({ 
        y: "0%", 
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
      });
      
      // Screen is now fully covered — fire the route change
      window.dispatchEvent(new CustomEvent('transition-ready', { 
        detail: { route: pendingRoute.current } 
      }));
    };

    window.addEventListener('trigger-transition', handleStart);
    return () => window.removeEventListener('trigger-transition', handleStart);
  }, [controls, isAnimating]);

  useEffect(() => {
    if (hasMounted && isAnimating) {
      // Pathname changed — new page is painted underneath the overlay.
      // Wait briefly for DOM paint, then reveal.
      setTimeout(() => {
        controls.start({ 
          y: "-100%", 
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
        }).then(() => {
          setIsAnimating(false);
          pendingRoute.current = null;
        });
      }, 150);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!hasMounted) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={controls}
      className={`fixed inset-0 z-[99999] bg-bg-primary w-full h-full ${isAnimating ? 'pointer-events-auto' : 'pointer-events-none'}`}
    />
  );
}
