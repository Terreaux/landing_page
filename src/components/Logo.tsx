import * as React from 'react';

import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-[#c3e8b1]', className)}
      aria-hidden
      {...props}
    >
      <path
        d="M4 4h6v16H4V4zm10 0h6v8h-6V4zm0 12h4v4h-4v-4z"
        fill="currentColor"
      />
    </svg>
  );
}
