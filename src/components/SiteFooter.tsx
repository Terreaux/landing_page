interface SiteFooterProps {
  rootPath?: string;
}

export function SiteFooter({ rootPath = '/' }: SiteFooterProps) {
  const base = (rootPath || '/').replace(/\/$/, '') || '/';
  const prefix = base === '/' ? '' : base;
  const year = new Date().getFullYear();

  const linkClass =
    'text-[#b6bfab] transition-colors hover:text-[#f7f9f2] text-[0.79rem] uppercase tracking-[0.1em]';

  return (
    <footer className="border-t border-[#d1e4b033]/40 bg-black/30">
      <div className="mx-auto flex w-[min(980px,92vw)] flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-0">
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
