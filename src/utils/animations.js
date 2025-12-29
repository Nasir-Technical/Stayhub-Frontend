// Standard Animation Constants for StayHub
// Based on specs/frontend_animation_plan.md

export const DURATION = {
  FAST: 0.2,    // Micro-interactions, Close modals
  NORMAL: 0.4,  // Hover effects, simple fades
  SLOW: 0.6,    // Entry animations (Cards, Content)
  HERO: 1.2     // Hero section reveals
};

export const EASING = {
  DEFAULT: 'power2.out',
  BOUNCE: 'back.out(1.7)', // For Modals
  SMOOTH: 'power3.out'     // For Hero/Page Load
};

export const STAGGER = {
  DEFAULT: 0.1,
  GRID: 0.1
};

// Common GSAP Configs
export const FADE_UP = {
  y: 20,
  opacity: 0,
  duration: DURATION.SLOW,
  ease: EASING.DEFAULT
};

export const SCALE_IN = {
  scale: 0.95,
  opacity: 0,
  duration: DURATION.NORMAL,
  ease: EASING.BOUNCE
};
