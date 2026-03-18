import * as React from 'react';

import { cn } from '@/lib/utils';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function Logo({ className, alt = 'Terreaux', ...props }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt={alt}
      className={cn('object-contain brightness-0 invert', className)}
      aria-hidden={alt === 'Terreaux'}
      {...props}
    />
  );
}
