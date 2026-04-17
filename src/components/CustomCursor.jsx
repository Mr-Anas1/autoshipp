'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Disable custom cursor on touch devices and smaller screens
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Set initial positions to avoid jumping from (0,0)
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveCursor = (e) => {
      // Main dot: very fast/instant
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        opacity: 1
      });
      // Outer ring: slight delay for "premium" fluid feel
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
        opacity: 1
      });
    };

    const handleHover = (e) => {
      const target = e.target.closest('button, a, .magnetic-item');
      if (target) {
        gsap.to(follower, {
          scale: 2.5,
          backgroundColor: "rgba(139, 92, 246, 0.1)", // Violet tint
          borderColor: "rgba(139, 92, 246, 0.5)",
          duration: 0.3
        });
        gsap.to(cursor, { scale: 0, duration: 0.2 }); // Hide inner dot on hover
      } else {
        gsap.to(follower, { scale: 1, backgroundColor: "transparent", borderColor: "rgb(139, 92, 246)", duration: 0.3 });
        gsap.to(cursor, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  // Don't render custom cursor on smaller screens
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        html, body, a, button { cursor: none !important; }
      `}</style>
      <div ref={cursorRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-violet-500 rounded-full pointer-events-none z-[9999] mix-blend-difference" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-violet-500 rounded-full pointer-events-none z-[9998]" />
    </>
  );
}