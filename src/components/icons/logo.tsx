import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Maître Jean Dupont Logo"
      {...props}
    >
      {/* Simple abstract symbol, can be replaced with actual logo */}
      <path d="M25 75 L50 25 L75 75 Z" strokeWidth="10" />
      <path d="M20 80 H 80" strokeWidth="10" />
    </svg>
  );
}
