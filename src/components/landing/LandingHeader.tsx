import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-5 border-b-2 border-[#d1e4b033] bg-black/60 px-[5vw] py-5 backdrop-blur-md">
      <span className="blueprint-cross blueprint-cross-left" aria-hidden="true" />
      <span className="blueprint-cross blueprint-cross-right" aria-hidden="true" />
      <a href="/" className="-ml-[3.65vw] flex items-center gap-2 transition-opacity hover:opacity-90">
        <Logo className="h-8 w-8 md:h-9 md:w-9" alt="Terreaux - Home" />
        <span className="font-display text-base font-extrabold tracking-[0.09em]">TERREAUX</span>
      </a>
      <nav className="hidden font-monoSans text-[0.79rem] uppercase tracking-[0.14em] text-[#b6bfab] md:flex md:gap-7 lg:gap-10 xl:gap-12">
        <a href="#services" className="transition-colors hover:text-[#f7f9f2]">
          Services
        </a>
        <a href="#approach" className="transition-colors hover:text-[#f7f9f2]">
          Approach
        </a>
        <a href="#contact" className="transition-colors hover:text-[#f7f9f2]">
          Contact
        </a>
        <a href="/schedule/" className="transition-colors hover:text-[#f7f9f2]">
          Schedule
        </a>
      </nav>
      <Button asChild variant="outline" size="sm">
        <a href="#contact">Start a Project</a>
      </Button>
    </header>
  );
}
