import * as React from "react";
import { cn } from "@/lib/utils";

interface HeroIllustrationProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Bespoke Hand-Drawn Inline SVG Scene:
 * A youth seated peacefully with an open notebook, beside a blossoming sprout,
 * rendered in the gentle Heard & Healed color palette (Blue, Sage, Yellow, Cream, Ink).
 */
export function HeroIllustration({ className, ...props }: HeroIllustrationProps) {
  return (
    <svg
      viewBox="0 0 540 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a young person resting comfortably with a journal and a gentle growing plant"
      className={cn("w-full h-auto max-w-[500px] select-none", className)}
      {...props}
    >
      <defs>
        {/* Soft background aura */}
        <radialGradient id="hero-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F7E7A1" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#A8C8B0" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
        </radialGradient>

        {/* Cushion gradient */}
        <linearGradient id="cushion-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7FA9C9" />
          <stop offset="100%" stopColor="#5C88A8" />
        </linearGradient>

        {/* Sprout leaf gradient */}
        <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8C8B0" />
          <stop offset="100%" stopColor="#6E9B7A" />
        </linearGradient>

        {/* Warm sweater gradient */}
        <linearGradient id="sweater-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF7F2" />
          <stop offset="100%" stopColor="#EAE3DA" />
        </linearGradient>
      </defs>

      {/* Ambient background soft glowing blob */}
      <circle cx="270" cy="230" r="210" fill="url(#hero-aura)" />

      {/* Soft ground rug / floor circle */}
      <ellipse
        cx="270"
        cy="400"
        rx="220"
        ry="36"
        fill="#EAE3DA"
        fillOpacity="0.6"
      />

      {/* Cozy floor cushion */}
      <ellipse
        cx="270"
        cy="380"
        rx="145"
        ry="28"
        fill="url(#cushion-grad)"
        fillOpacity="0.85"
      />

      {/* Gentle plant pot on the left */}
      <g id="plant-group">
        {/* Plant Pot */}
        <path
          d="M100 340 L112 400 Q130 408 148 400 L160 340 Z"
          fill="#FAF7F2"
          stroke="#3B3B3B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="130"
          cy="340"
          rx="30"
          ry="8"
          fill="#EAE3DA"
          stroke="#3B3B3B"
          strokeWidth="2.5"
        />

        {/* Plant stems */}
        <path
          d="M130 338 Q125 280 100 240"
          stroke="#6E9B7A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M130 338 Q140 270 165 220"
          stroke="#6E9B7A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M130 310 Q145 285 160 270"
          stroke="#6E9B7A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Soft rounded leaves */}
        <path
          d="M100 240 C80 230 75 200 95 205 C115 210 110 235 100 240 Z"
          fill="url(#leaf-grad)"
          stroke="#3B3B3B"
          strokeWidth="2"
        />
        <path
          d="M165 220 C185 210 195 180 175 185 C155 190 155 215 165 220 Z"
          fill="url(#leaf-grad)"
          stroke="#3B3B3B"
          strokeWidth="2"
        />
        <path
          d="M160 270 C180 265 185 245 170 248 C155 252 152 268 160 270 Z"
          fill="#A8C8B0"
          stroke="#3B3B3B"
          strokeWidth="2"
        />
        <path
          d="M110 280 C90 280 88 260 102 262 C115 265 118 278 110 280 Z"
          fill="#A8C8B0"
          stroke="#3B3B3B"
          strokeWidth="2"
        />

        {/* Little golden star / sparkle near sprout */}
        <path
          d="M185 170 Q185 180 195 180 Q185 180 185 190 Q185 180 175 180 Q185 180 185 170 Z"
          fill="#F7E7A1"
          stroke="#3B3B3B"
          strokeWidth="1.5"
        />
      </g>

      {/* Person Sitting Comfortably with Journal */}
      <g id="person-group">
        {/* Legs crossed / resting on cushion */}
        <path
          d="M210 375 Q250 395 310 375 Q350 355 330 330 Q290 340 250 345 Q205 345 210 375 Z"
          fill="#5C88A8"
          stroke="#3B3B3B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Foot / sock detail */}
        <ellipse cx="205" cy="370" rx="14" ry="9" fill="#FAF7F2" stroke="#3B3B3B" strokeWidth="2" />
        <ellipse cx="335" cy="365" rx="14" ry="9" fill="#FAF7F2" stroke="#3B3B3B" strokeWidth="2" />

        {/* Torso / Warm knit sweater */}
        <path
          d="M245 230 Q285 220 310 235 L320 340 Q280 350 235 340 Z"
          fill="url(#sweater-grad)"
          stroke="#3B3B3B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Neck */}
        <path
          d="M272 205 L272 230 L288 230 L288 205 Z"
          fill="#FAF7F2"
          stroke="#3B3B3B"
          strokeWidth="2"
        />

        {/* Head / peaceful face looking down at book */}
        <ellipse
          cx="280"
          cy="175"
          rx="26"
          ry="30"
          fill="#FAF7F2"
          stroke="#3B3B3B"
          strokeWidth="2.5"
        />

        {/* Friendly soft wavy hair */}
        <path
          d="M255 170 C250 145 270 135 295 140 C315 145 315 165 310 180 C305 160 295 155 280 158 C265 160 260 175 255 170 Z"
          fill="#3B3B3B"
        />
        <path
          d="M255 170 C248 185 252 205 260 208 C255 198 256 180 258 175 Z"
          fill="#3B3B3B"
        />

        {/* Peaceful closed eye curve & gentle smile */}
        <path
          d="M285 180 Q292 186 298 180"
          stroke="#3B3B3B"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M288 194 Q294 198 298 193"
          stroke="#3B3B3B"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Soft pink cheek */}
        <ellipse cx="295" cy="188" rx="5" ry="3.5" fill="#E8836F" fillOpacity="0.4" />

        {/* Arms holding journal in lap */}
        <path
          d="M245 250 Q235 295 265 315"
          stroke="#3B3B3B"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M305 250 Q320 290 295 315"
          stroke="#3B3B3B"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Open Journal / Notebook in hands */}
        <g id="journal">
          <path
            d="M260 305 L280 312 L300 305 L298 328 L280 334 L262 328 Z"
            fill="#FAF7F2"
            stroke="#3B3B3B"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Spine crease */}
          <line x1="280" y1="312" x2="280" y2="334" stroke="#7FA9C9" strokeWidth="1.5" />
          {/* Gentle text lines on page */}
          <line x1="266" y1="314" x2="276" y2="317" stroke="#A8C8B0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="266" y1="319" x2="275" y2="322" stroke="#A8C8B0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="284" y1="317" x2="294" y2="314" stroke="#A8C8B0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="284" y1="322" x2="293" y2="319" stroke="#A8C8B0" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      {/* Floating Gentle Thought Sparks / Empathy Leaflets */}
      <g id="floating-elements">
        {/* Soft leaf floating */}
        <path
          d="M370 160 C385 145 405 155 395 170 C385 185 365 175 370 160 Z"
          fill="#A8C8B0"
          fillOpacity="0.7"
          stroke="#3B3B3B"
          strokeWidth="1.5"
        />
        {/* Small warm bubble */}
        <circle cx="340" cy="130" r="8" fill="#F7E7A1" fillOpacity="0.7" stroke="#3B3B3B" strokeWidth="1.5" />
        {/* Small blue droplet */}
        <circle cx="395" cy="210" r="6" fill="#7FA9C9" fillOpacity="0.6" stroke="#3B3B3B" strokeWidth="1.5" />
        {/* Little heart sprout badge */}
        <path
          d="M210 135 C205 125 195 128 195 136 C195 145 210 152 210 152 C210 152 225 145 225 136 C225 128 215 125 210 135 Z"
          fill="#E8836F"
          fillOpacity="0.6"
          stroke="#3B3B3B"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
