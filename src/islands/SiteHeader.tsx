import { useEffect, useId, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { Button } from '@/islands/ui/button';
import { Logo } from '@/islands/Logo';
import { cn } from '@/lib/utils';

interface SiteHeaderProps {
  rootPath?: string;
  activePage?: 'services' | 'approach' | 'contact' | 'schedule';
}

export function SiteHeader({ rootPath = '/', activePage }: SiteHeaderProps) {
  const base = (rootPath || '/').replace(/\/$/, '') || '/';
  const homeHref = base === '/' ? '/' : `${base}/`;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelId = useId();

  const linkClass = (page: 'services' | 'approach' | 'contact' | 'schedule') =>
    cn(
      'transition-colors hover:text-[#f7f9f2]',
      page === activePage && 'text-[#f7f9f2]'
    );

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const navItems: Array<{ page: 'services' | 'approach' | 'contact' | 'schedule'; label: string; href: string }> = [
    { page: 'services', label: 'Services', href: `${homeHref}#services` },
    { page: 'approach', label: 'Approach', href: `${homeHref}#approach` },
    { page: 'contact', label: 'Contact', href: `${homeHref}contact/` },
    { page: 'schedule', label: 'Schedule', href: `${homeHref}schedule/` }
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex items-center justify-between gap-2 border-b-2 border-[#d1e4b033] bg-black/60 py-5 backdrop-blur-md',
        'pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]',
        'sm:gap-4 sm:pl-[max(5vw,env(safe-area-inset-left))] sm:pr-[max(5vw,env(safe-area-inset-right))]',
        'md:gap-5'
      )}
    >
      <span className="blueprint-cross blueprint-cross-left" aria-hidden="true" />
      <span className="blueprint-cross blueprint-cross-right" aria-hidden="true" />

      <a
        href={homeHref}
        className="flex min-w-0 shrink items-center gap-2 transition-opacity hover:opacity-90 md:-ml-[3.65vw]"
      >
        <Logo className="h-8 w-8 shrink-0 md:h-9 md:w-9" alt="Terreaux - Home" />
        <span className="truncate font-display text-sm font-extrabold tracking-[0.09em] md:text-base">
          TERREAUX
        </span>
      </a>

      <nav
        className="hidden font-monoSans text-[0.79rem] uppercase tracking-[0.14em] text-[#b6bfab] md:flex md:gap-7 lg:gap-10 xl:gap-12"
        aria-label="Primary"
      >
        {navItems.map(({ page, label, href }) => (
          <a key={page} href={href} className={linkClass(page)}>
            {label}
          </a>
        ))}
      </nav>

      <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c1e19b6b] text-[#e2f0c8] transition-colors hover:bg-white/5 md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuPanelId}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
        </button>

        <Button asChild variant="outline" size="sm" className="shrink-0">
          <a href={`${homeHref}#contact`} aria-label="Start a Project">
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Start a Project</span>
          </a>
        </Button>
      </div>

      {menuOpen ? (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-[4.75rem] z-30 bg-black/65 md:hidden"
            role="presentation"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            className="fixed left-0 right-0 top-[4.75rem] z-40 max-h-[min(70vh,calc(100dvh-4.75rem))] overflow-y-auto border-b border-[#d1e4b033] bg-[#060706]/98 shadow-[0_12px_48px_rgba(0,0,0,0.45)] backdrop-blur-md md:hidden"
            id={menuPanelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex flex-col gap-1 px-[max(1rem,env(safe-area-inset-left))] py-4 pb-[max(1rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] font-monoSans text-[0.85rem] uppercase tracking-[0.14em] text-[#b6bfab]">
              {navItems.map(({ page, label, href }) => (
                <a
                  key={page}
                  href={href}
                  className={cn(
                    'rounded-lg px-3 py-3 transition-colors hover:bg-white/5 hover:text-[#f7f9f2]',
                    linkClass(page)
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                href={`${homeHref}#contact`}
                className="mt-2 rounded-lg border border-[#c1e19b6b] px-3 py-3 text-center text-[#e2f0c8] transition-colors hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
              >
                Start a Project
              </a>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
