import * as React from 'react';

import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'blueprint-card relative overflow-visible rounded-none bg-[linear-gradient(180deg,rgba(10,15,12,0.95),rgba(5,8,6,0.98))] p-6 md:p-7',
      className
    )}
    {...props}
  >
    <span className="blueprint-card-frame" aria-hidden="true">
      <span className="blueprint-card-line blueprint-card-line-top" />
      <span className="blueprint-card-line blueprint-card-line-right" />
      <span className="blueprint-card-line blueprint-card-line-bottom" />
      <span className="blueprint-card-line blueprint-card-line-left" />
      <span className="blueprint-card-cross blueprint-card-cross-tl" />
      <span className="blueprint-card-cross blueprint-card-cross-tr" />
      <span className="blueprint-card-cross blueprint-card-cross-br" />
      <span className="blueprint-card-cross blueprint-card-cross-bl" />
    </span>
    {children}
  </div>
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-3', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('font-display text-2xl leading-[1.15]', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-[#cad3bc]', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export { Card, CardContent, CardHeader, CardTitle };
