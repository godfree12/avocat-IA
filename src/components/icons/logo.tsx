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
      aria-label="L'Apparence Élégante Logo"
      {...props}
    >
      <path d="M20 80 Q 50 20, 80 80" />
      <path d="M30 70 Q 50 40, 70 70" />
      <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
    </svg>
  );
}
