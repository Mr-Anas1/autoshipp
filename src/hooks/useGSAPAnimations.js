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

    // Smooth scrolling setup
    const scrollContainer = containerRef.current;
    
    // Fade in animations for sections
    const sections = scrollContainer.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      gsap.fromTo(section, 
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Hero section animations
    const heroTitle = scrollContainer.querySelector('h1');
    const heroSubtitle = scrollContainer.querySelector('p');
    const heroButtons = scrollContainer.querySelectorAll('button');
    const heroBadge = scrollContainer.querySelector('.inline-flex');

    if (heroTitle) {
      gsap.fromTo(heroTitle,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out"
        }
      );
    }

    if (heroBadge) {
      gsap.fromTo(heroBadge,
        {
          opacity: 0,
          y: -20,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.1,
          ease: "power2.out"
        }
      );
    }

    if (heroSubtitle) {
      gsap.fromTo(heroSubtitle,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out"
        }
      );
    }

    if (heroButtons.length > 0) {
      gsap.fromTo(heroButtons,
        {
          opacity: 0,
          y: 20,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.7,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }

    // Dashboard preview animation
    const dashboard = scrollContainer.querySelector('.rounded-\\[2rem\\]');
    if (dashboard) {
      gsap.fromTo(dashboard,
        {
          opacity: 0,
          y: 40,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dashboard,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Problem cards stagger animation
    const problemCards = scrollContainer.querySelectorAll('.grid-cols-1.md\\:grid-cols-3 > div');
    if (problemCards.length > 0) {
      gsap.fromTo(problemCards,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: problemCards[0],
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Solution bento grid animation
    const solutionCards = scrollContainer.querySelectorAll('.md\\:col-span-8, .md\\:col-span-6, .md\\:col-span-4');
    if (solutionCards.length > 0) {
      gsap.fromTo(solutionCards,
        {
          opacity: 0,
          y: 40,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: solutionCards[0],
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Pricing card animation
    const pricingCard = scrollContainer.querySelector('.rounded-\\[3rem\\]');
    if (pricingCard) {
      gsap.fromTo(pricingCard,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pricingCard,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // CTA section animation
    const ctaSection = scrollContainer.querySelector('.py-44');
    if (ctaSection) {
      gsap.fromTo(ctaSection,
        {
          opacity: 0,
          scale: 0.98
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Parallax effect for background glows
    const glows = scrollContainer.querySelectorAll('.fixed.inset-0 > div');
    glows.forEach((glow, index) => {
      gsap.to(glow, {
        yPercent: index === 0 ? -20 : 20,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return containerRef;
}
