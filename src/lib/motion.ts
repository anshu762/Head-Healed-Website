"use client";

import { useReducedMotion, type Variants, type Transition } from "framer-motion";

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const calmTransition: Transition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const emergencyTransition: Transition = {
  duration: 0.15,
  ease: "easeOut",
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const calmFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: calmTransition,
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

/**
 * useSafeMotion hook
 * Automatically substitutes opacity-only transitions when prefers-reduced-motion is active.
 */
export function useSafeMotion() {
  const shouldReduce = useReducedMotion();

  return {
    shouldReduce,
    fadeUp: shouldReduce ? reducedMotionVariants : fadeUpVariants,
    calmFadeUp: shouldReduce ? reducedMotionVariants : calmFadeUpVariants,
    fadeIn: shouldReduce ? reducedMotionVariants : fadeInVariants,
    scaleIn: shouldReduce ? reducedMotionVariants : scaleInVariants,
    stagger: shouldReduce
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.1 } },
        }
      : staggerContainerVariants,
  };
}
