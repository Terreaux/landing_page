/** Aligns footer column with `<main>` for each `SiteLayout` preset (blueprint guides). */
export type SiteMainVariant =
  | 'content'
  | 'landing'
  | 'playgroundAgentic'
  | 'playgroundCv'
  | 'fluid';

const FOOTER_INNER_BY_VARIANT: Record<SiteMainVariant, string> = {
  content:
    'mx-auto flex w-[min(980px,calc(100vw-2*var(--blueprint-content-inset)))] flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-0',
  landing:
    'mx-auto flex w-[min(1200px,calc(100vw-2*var(--blueprint-content-inset)))] flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-0',
  playgroundAgentic:
    'mx-auto flex w-[min(1700px,96vw)] flex-col items-center justify-between gap-4 px-4 py-8 sm:px-[max(1rem,2vw)] md:flex-row md:px-[max(1.5rem,2vw)]',
  playgroundCv:
    'mx-auto flex w-[min(1280px,94vw)] flex-col items-center justify-between gap-4 px-4 py-8 sm:px-[max(1rem,2vw)] md:flex-row md:px-[max(1.5rem,2vw)]',
  fluid:
    'mx-auto flex w-[min(980px,calc(100vw-2*var(--blueprint-content-inset)))] flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-0'
};

interface SiteFooterProps {
  rootPath?: string;
  mainVariant?: SiteMainVariant;
}

export function SiteFooter({ rootPath = '/', mainVariant = 'content' }: SiteFooterProps) {
  const base = (rootPath || '/').replace(/\/$/, '') || '/';
  const prefix = base === '/' ? '' : base;
  const year = new Date().getFullYear();

  const linkClass =
    'text-[#b6bfab] transition-colors hover:text-[#f7f9f2] text-[0.79rem] uppercase tracking-[0.1em]';

  return (
    <footer className="border-t border-[#d1e4b033]/40 bg-black/30">
      <div className={FOOTER_INNER_BY_VARIANT[mainVariant]}>
        <p className="text-[0.79rem] text-[#b6bfab]">
          © {year} Terreaux. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <a href={`${prefix}/privacy-policy/`} className={linkClass}>
            Privacy Policy
          </a>
          <a href={`${prefix}/security/`} className={linkClass}>
            Security
          </a>
        </nav>
      </div>
    </footer>
  );
}
