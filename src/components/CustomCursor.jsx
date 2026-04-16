'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const delayedPos = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    // 1. Feature detection for touch
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleInteraction = (e) => {
      const target = e.target;
      const isInteractable = target.closest('button, a, input, [role="button"], textarea');
      isHoveringRef.current = !!isInteractable;
    };

    const animate = () => {
      // Smooth interpolation (lerp) for the follower
      // Formula: current + (target - current) * factor
      delayedPos.current.x += (mousePos.current.x - delayedPos.current.x) * 0.15;
      delayedPos.current.y += (mousePos.current.y - delayedPos.current.y) * 0.15;

      const hoverScale = isHoveringRef.current ? 1.5 : 1;

      // Update Cursor (snappy)
      cursor.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(${hoverScale})`;

      // Update Follower (delayed)
      follower.style.transform = `translate3d(${delayedPos.current.x}px, ${delayedPos.current.y}px, 0) scale(${hoverScale})`;

      rafId.current = requestAnimationFrame(animate);
    };

    // Event Listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleInteraction);

    // Hide/Show cursor when leaving window
    const handleVisibility = (val) => {
      cursor.style.opacity = val;
      follower.style.opacity = val;
    };

    document.addEventListener('mouseenter', () => handleVisibility(1));
    document.addEventListener('mouseleave', () => handleVisibility(0));

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleInteraction);
      document.removeEventListener('mouseenter', () => handleVisibility(1));
      document.removeEventListener('mouseleave', () => handleVisibility(0));
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Hide the default cursor globally */
        html, body, a, button {
          cursor: none !important;
        }
      `}</style>

      {/* Main Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-violet-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          marginLeft: '-4px',
          marginTop: '-4px',
          willChange: 'transform',
          transition: 'transform 0.1s ease-out, opacity 0.3s ease'
        }}
      />

      {/* Lagging Ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-violet-500 rounded-full pointer-events-none z-[9998]"
        style={{
          marginLeft: '-16px',
          marginTop: '-16px',
          willChange: 'transform',
          transition: 'transform 0.2s ease-out, opacity 0.3s ease'
        }}
      />
    </>
  );
}