import React from "react";

interface ForkLogoProps {
  className?: string;
  size?: number;
}

export function ForkLogo({ className, size = 32 }: ForkLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Stickafork logo"
    >
      <line x1="10" y1="4" x2="10" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="4" x2="16" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="4" x2="22" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M10 13 Q10 18 16 18 Q22 18 22 13"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      <line x1="16" y1="18" x2="16" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}