import * as React from "react";
import { cn } from "@/lib/utils";

interface BlobProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Organic Blob 1: Gentle flowing soft blue / sage cloud
 */
export function BlobOne({ className, ...props }: BlobProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      {...props}
    >
      <defs>
        <linearGradient id="blob-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7FA9C9" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#A8C8B0" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M421.5 287.5C407 353 358 409.5 294.5 431C231 452.5 153 439 104 394C55 349 35 272.5 53 205C71 137.5 127 79 194.5 57.5C262 36 341 51.5 388.5 99C436 146.5 436 222 421.5 287.5Z"
        fill="url(#blob-grad-1)"
      />
    </svg>
  );
}

/**
 * Organic Blob 2: Warm gentle sage / yellow sunburst
 */
export function BlobTwo({ className, ...props }: BlobProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      {...props}
    >
      <defs>
        <linearGradient id="blob-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7E7A1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#A8C8B0" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M397.5 316.5C362.5 381 294 438.5 222 441.5C150 444.5 74.5 393 50.5 326.5C26.5 260 54 178.5 106.5 121C159 63.5 236.5 30 307.5 47C378.5 64 443 131.5 450 205C457 278.5 432.5 252 397.5 316.5Z"
        fill="url(#blob-grad-2)"
      />
    </svg>
  );
}

/**
 * Organic Blob 3: Calming pastel pebble
 */
export function BlobThree({ className, ...props }: BlobProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      {...props}
    >
      <defs>
        <linearGradient id="blob-grad-3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7FA9C9" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#FAF7F2" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#F7E7A1" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path
        d="M444 213C458.5 284.5 407.5 359 344 402.5C280.5 446 204.5 458.5 142.5 426C80.5 393.5 32.5 316 38.5 244C44.5 172 104.5 105.5 174 69.5C243.5 33.5 322.5 28 376.5 67.5C430.5 107 429.5 141.5 444 213Z"
        fill="url(#blob-grad-3)"
      />
    </svg>
  );
}
