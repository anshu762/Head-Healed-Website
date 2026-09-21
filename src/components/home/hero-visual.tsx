"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HeroIllustration } from "./hero-illustration";
import { BlobOne, BlobTwo, BlobThree } from "@/components/ui/organic-blobs";

export function HeroVisual() {
  const shouldReduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Gentle subtle parallax travel (<=40px)
  const yBlob1 = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : -35]);
  const yBlob2 = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : 40]);
  const yBlob3 = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : -20]);
  const yIllustration = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : -15]);

  return (
    <div className="relative w-full max-w-lg lg:max-w-none flex items-center justify-center select-none">
      {/* Background Parallax Layer 1: Sage Blob */}
      <motion.div
        style={{ y: yBlob1 }}
        animate={
          shouldReduce
            ? {}
            : {
                scale: [1, 1.04, 1],
                rotate: [0, 2, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-12 -left-12 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-70"
      >
        <BlobOne className="w-full h-full" />
      </motion.div>

      {/* Background Parallax Layer 2: Warm Yellow Sunbeam Blob */}
      <motion.div
        style={{ y: yBlob2 }}
        animate={
          shouldReduce
            ? {}
            : {
                scale: [1, 1.05, 1],
                x: [0, 8, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-16 -right-8 w-72 sm:w-88 h-72 sm:h-88 pointer-events-none opacity-60"
      >
        <BlobTwo className="w-full h-full" />
      </motion.div>

      {/* Background Parallax Layer 3: Soft Blue Blob */}
      <motion.div
        style={{ y: yBlob3 }}
        className="absolute top-1/3 -right-12 w-64 h-64 pointer-events-none opacity-50 hidden sm:block"
      >
        <BlobThree className="w-full h-full" />
      </motion.div>

      {/* Foreground Hand-Drawn Inline Illustration */}
      <motion.div
        style={{ y: yIllustration }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative z-10 w-full flex justify-center drop-shadow-[0_12px_32px_rgba(59,59,59,0.06)]"
      >
        <HeroIllustration />
      </motion.div>
    </div>
  );
}

export default HeroVisual;
