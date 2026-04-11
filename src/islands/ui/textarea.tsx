import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[132px] w-full rounded-xl border border-[#c5dab74a] bg-[#0a0d09]/80 px-3 py-2 text-sm text-[#f7f9f2] shadow-sm transition-colors placeholder:text-[#9aa592] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b7ffdb] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
