import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);
  const glowOpacity = useMotionValue(0.3);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const ringSpringConfig = { stiffness: 50, damping: 20, mass: 0.5 };

  const smoothDotX = useSpring(dotX, springConfig);
  const smoothDotY = useSpring(dotY, springConfig);
  const smoothRingX = useSpring(ringX, ringSpringConfig);
  const smoothRingY = useSpring(ringY, ringSpringConfig);
  const smoothGlow = useSpring(glowOpacity, { stiffness: 100, damping: 20 });

  const magnetTarget = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  const handleMove = useCallback((e: MouseEvent) => {
    let x = e.clientX;
    let y = e.clientY;

    // Magnetic pull toward interactive elements
    if (magnetTarget.current.active) {
      const tx = magnetTarget.current.x;
      const ty = magnetTarget.current.y;
      const pull = 0.3;
      x = x + (tx - x) * pull;
      y = y + (ty - y) * pull;
    }

    dotX.set(x);
    dotY.set(y);
    ringX.set(x);
    ringY.set(y);
  }, [dotX, dotY, ringX, ringY]);

  useEffect(() => {
    if ('ontouchstart' in window) return;
    setVisible(true);

    window.addEventListener('mousemove', handleMove);

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const addHover = (e: Event) => {
      setHovering(true);
      glowOpacity.set(0.8);
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      magnetTarget.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        active: true,
      };
    };
    const removeHover = () => {
      setHovering(false);
      glowOpacity.set(0.3);
      magnetTarget.current.active = false;
    };

    const attachListeners = () => {
      const els = document.querySelectorAll('a, button, [role="button"], .cursor-magnetic');
      els.forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
      return els;
    };

    const els = attachListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      els.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      observer.disconnect();
      els.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, [handleMove, glowOpacity]);

  if (!visible) return null;

  return (
    <>
      {/* Outer aura glow */}
      <motion.div
        style={{
          position: 'fixed',
          width: 60,
          height: 60,
          borderRadius: 9999,
          left: smoothRingX,
          top: smoothRingY,
          x: -30,
          y: -30,
          zIndex: 9998,
          pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)',
          opacity: smoothGlow,
          scale: hovering ? 2.5 : clicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />

      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          width: 32,
          height: 32,
          borderRadius: 9999,
          left: smoothRingX,
          top: smoothRingY,
          x: -16,
          y: -16,
          zIndex: 9999,
          pointerEvents: 'none',
          border: '1.5px solid rgba(6,182,212,0.35)',
          scale: hovering ? 2.2 : clicking ? 0.7 : 1,
          opacity: hovering ? 1 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      />

      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: '#06B6D4',
          left: smoothDotX,
          top: smoothDotY,
          x: -3,
          y: -3,
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          scale: hovering ? 0 : clicking ? 1.8 : 1,
          boxShadow: '0 0 6px rgba(6,182,212,0.6)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      />
    </>
  );
};

export default CustomCursor;
