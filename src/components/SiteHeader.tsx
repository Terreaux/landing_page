import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

interface SiteHeaderProps {
  rootPath?: string;
  activePage?: 'services' | 'approach' | 'contact' | 'schedule';
}

export function SiteHeader({ rootPath = '/', activePage }: SiteHeaderProps) {
  const base = (rootPath || '/').replace(/\/$/, '') || '/';
  const homeHref = base === '/' ? '/' : `${base}/`;
  const linkClass = (page: 'services' | 'approach' | 'contact' | 'schedule') =>
    cn(
      'transition-colors hover:text-[#f7f9f2]',
      page === activePage && 'text-[#f7f9f2]'
    );

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-5 border-b-2 border-[#d1e4b033] bg-black/60 px-[5vw] py-5 backdrop-blur-md">
      <span className="blueprint-cross blueprint-cross-left" aria-hidden="true" />
      <span className="blueprint-cross blueprint-cross-right" aria-hidden="true" />
      <a
        href={homeHref}
        className="-ml-[3.65vw] flex items-center gap-2 transition-opacity hover:opacity-90"
      >
        <Logo className="h-8 w-8 md:h-9 md:w-9" alt="Terreaux - Home" />
        <span className="font-display text-base font-extrabold tracking-[0.09em]">
          TERREAUX
        </span>
      </a>
      <nav className="hidden font-monoSans text-[0.79rem] uppercase tracking-[0.14em] text-[#b6bfab] md:flex md:gap-7 lg:gap-10 xl:gap-12">
        <a href={`${homeHref}#services`} className={linkClass('services')}>
          Services
        </a>
        <a href={`${homeHref}#approach`} className={linkClass('approach')}>
          Approach
        </a>
        <a href={`${homeHref}contact/`} className={linkClass('contact')}>
          Contact
        </a>
        <a href={`${homeHref}schedule/`} className={linkClass('schedule')}>
          Schedule
        </a>
      </nav>
      <Button asChild variant="outline" size="sm">
        <a href={`${homeHref}#contact`}>Start a Project</a>
      </Button>
    </header>
  );
}
