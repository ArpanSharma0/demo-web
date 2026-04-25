'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('default');
  const cursorRef = useRef(null);
  
  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100)
  };

  const smoothOptions = { damping: 20, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouse.x, smoothOptions);
  const smoothY = useSpring(mouse.y, smoothOptions);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        setCursorState('hover');
      } else if (target.closest('.group') || target.tagName === 'IMG') {
        setCursorState('view');
      }
    };

    const handleMouseLeave = () => {
      setCursorState('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseover', handleMouseEnter, true);
    document.body.addEventListener('mouseout', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseover', handleMouseEnter);
      document.body.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  const variants = {
    default: {
      width: 10,
      height: 10,
      backgroundColor: '#2B2B2B',
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(43, 43, 43, 0.1)',
      backdropFilter: 'blur(4px)',
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: '#2B2B2B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      letterSpacing: '0.2em',
      fontWeight: '500'
    }
  };

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 flex items-center justify-center font-sans pointer-events-none z-[10000]"
      variants={variants}
      animate={cursorState}
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {cursorState === 'view' && <span className="uppercase opacity-100">View</span>}
    </motion.div>
  );
};

export default CustomCursor;

