import * as React from 'react';

import { cn } from '@/lib/utils';

interface HighlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pattern?: React.ReactNode;
  gridProps?: { y?: number; squares?: Array<[number, number]> };
}

export function HighlightCard({
  className,
  pattern,
  gridProps,
  children,
  ...props
}: HighlightCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[#bcd69f59] bg-[linear-gradient(175deg,rgba(16,21,14,0.95),rgba(8,10,7,0.99))] p-6 md:p-8',
        'shadow-[inset_0_0_0_1px_rgba(208,231,198,0.04)]',
        className
      )}
      {...props}
    >
      {pattern}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
