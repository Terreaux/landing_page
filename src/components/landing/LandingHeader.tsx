import { Button } from '@/components/ui/button';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-5 border-b-2 border-[#d1e4b033] bg-black/60 px-[5vw] py-5 backdrop-blur-md">
      <span className="blueprint-cross blueprint-cross-left" aria-hidden="true" />
      <span className="blueprint-cross blueprint-cross-right" aria-hidden="true" />
      <div className="font-display text-base font-extrabold tracking-[0.09em]">TERREAUX</div>
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
      </nav>
      <Button asChild variant="outline" size="sm">
        <a href="#contact">Start a Project</a>
      </Button>
    </header>
  );
}
