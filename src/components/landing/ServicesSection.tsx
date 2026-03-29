import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServiceHref, serviceCards } from '@/data/services';

interface ServicesSectionProps {
  rootPath?: string;
}

export function ServicesSection({ rootPath = '/' }: ServicesSectionProps) {
  return (
    <section id="services" className="relative scroll-mt-28 py-24 md:py-32">
      <div className="relative z-10 reveal mb-16 md:mb-20" data-reveal>
        <p className="eyebrow">Core Expertise</p>
        <h2 className="max-w-[21ch] font-display text-[clamp(1.6rem,4vw,3.25rem)] leading-[1.05]">
          From strategy and architecture to production delivery.
        </h2>
      </div>

      <div className="relative z-10 mt-2 grid grid-cols-1 gap-8 md:mt-4 md:grid-cols-2 md:gap-10">
        {serviceCards.map((card) => (
          <a
            key={card.slug}
            href={getServiceHref(rootPath, card.slug)}
            className="group reveal block"
            data-reveal
          >
            <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1">
              <CardHeader className="space-y-5">
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>{card.copy}</p>
                <p className="font-monoSans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#98f2be] transition-colors duration-300 group-hover:text-[#d6ffc8]">
                  Explore use cases
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
