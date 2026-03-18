import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { serviceCards } from '@/data/landing';

export function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-28 py-24 md:py-32">
      <div className="relative z-10 reveal mb-16 md:mb-20" data-reveal>
        <p className="eyebrow">Core Expertise</p>
        <h2 className="max-w-[21ch] font-display text-[clamp(1.6rem,4vw,3.25rem)] leading-[1.05]">
          End-to-end delivery from strategy to stable production.
        </h2>
      </div>

      <div className="relative z-10 mt-2 grid grid-cols-1 gap-8 md:mt-4 md:grid-cols-2 md:gap-10">
        {serviceCards.map((card) => (
          <Card key={card.title} className="reveal" data-reveal>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>{card.copy}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
