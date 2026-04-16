'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function useGSAPAnimations() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const scrollContainer = containerRef.current;

    // 1. Premium Section Reveal
    const sections = scrollContainer.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(section, 
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 2. Parallax Background Glows
    const glows = scrollContainer.querySelectorAll('.fixed.inset-0 > div');
    glows.forEach((glow, index) => {
      gsap.to(glow, {
        yPercent: index === 0 ? -30 : 30,
        xPercent: index === 0 ? 10 : -10,
        scale: index === 0 ? 1.2 : 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });
    });

    // 3. Floating Animations (Continuous)
    const floaters = scrollContainer.querySelectorAll('.gsap-float');
    floaters.forEach((floater, i) => {
      gsap.to(floater, {
        y: "-=15",
        rotation: i % 2 === 0 ? 1.5 : -1.5,
        duration: 3 + (i * 0.5),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    // 4. Staggered Grid Reveal
    const grids = scrollContainer.querySelectorAll('.gsap-stagger-grid');
    grids.forEach(grid => {
      const items = grid.children;
      gsap.fromTo(items, 
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, y: 0, scale: 1, 
          duration: 1, 
          stagger: 0.15, 
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 6. Scale-up reveals (Dashboard, Cards)
    const scaleUps = scrollContainer.querySelectorAll('.gsap-scale-up');
    scaleUps.forEach(elem => {
      gsap.fromTo(elem,
        { opacity: 0, scale: 0.92, y: 30 },
        { 
          opacity: 1, scale: 1, y: 0,
          duration: 1.2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 7. Parallax Items within Layout
    const parallaxItems = scrollContainer.querySelectorAll('.gsap-parallax');
    parallaxItems.forEach(elem => {
      const speed = parseFloat(elem.dataset.speed || 30);
      gsap.fromTo(elem,
        { y: speed },
        {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: elem.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    // 8. Custom Slide In Content (CTA text etc.)
    const slideIns = scrollContainer.querySelectorAll('.gsap-slide-in');
    slideIns.forEach(elem => {
      gsap.fromTo(elem,
        { opacity: 0, x: -40 },
        { 
          opacity: 1, x: 0, 
          duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 9. CTA Background Text Scroll (huge parallax horizontally)
    const ctaBgText = scrollContainer.querySelectorAll('.gsap-cta-bg-text');
    if(ctaBgText.length > 0) {
       gsap.fromTo(ctaBgText, 
         { x: "5%" },
         {
           x: "-15%",
           ease: "none",
           scrollTrigger: {
             trigger: ctaBgText[0].closest('section'),
             start: "top bottom",
             end: "bottom top",
             scrub: 1
           }
         });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return containerRef;
}
