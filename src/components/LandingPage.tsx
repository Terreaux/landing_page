import { useEffect } from 'react';

import {
  ApproachSection,
  ContactSection,
  HeroSection,
  LandingDecorations,
  LandingHeader,
  ServicesSection,
  WorkflowBridgeSection
} from '@/components/landing';

export function LandingPage() {
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.classList.toggle('is-visible', e.isIntersecting);
        }
      },
      { root: null, rootMargin: '0px 0px -24px 0px', threshold: 0.01 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;
    let guideSyncRafId = 0;
    let guideSyncUntil = 0;
    let guidesVisible = false;

    const syncBlueprintGuides = () => {
      const guideLayer = document.querySelector<HTMLElement>('.page-blueprint-guides');
      const leftCross = document.querySelector<HTMLElement>('.blueprint-cross-left');
      const rightCross = document.querySelector<HTMLElement>('.blueprint-cross-right');
      if (!guideLayer || !leftCross || !rightCross) return;

      const layerRect = guideLayer.getBoundingClientRect();
      const leftRect = leftCross.getBoundingClientRect();
      const rightRect = rightCross.getBoundingClientRect();

      document.documentElement.style.setProperty('--blueprint-guide-left-x', `${leftRect.left + leftRect.width / 2 - layerRect.left}px`);
      document.documentElement.style.setProperty('--blueprint-guide-right-x', `${rightRect.left + rightRect.width / 2 - layerRect.left}px`);
      if (!guidesVisible) {
        document.documentElement.style.setProperty('--blueprint-guides-opacity', '1');
        guidesVisible = true;
      }
    };

    const syncGuidesAfterLayout = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(syncBlueprintGuides);
      });
    };

    const runGuideSyncWindow = (durationMs = 1400) => {
      guideSyncUntil = Math.max(guideSyncUntil, performance.now() + durationMs);
      if (guideSyncRafId !== 0) return;

      const tick = (now: number) => {
        syncBlueprintGuides();
        if (now < guideSyncUntil) {
          guideSyncRafId = window.requestAnimationFrame(tick);
          return;
        }
        guideSyncRafId = 0;
      };

      guideSyncRafId = window.requestAnimationFrame(tick);
    };

    const updateParallax = () => {
      document.documentElement.style.setProperty('--parallax-scroll', `${window.scrollY}px`);
      syncBlueprintGuides();
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    syncGuidesAfterLayout();
    runGuideSyncWindow();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('load', syncGuidesAfterLayout);
    document.fonts?.ready.then(() => {
      syncGuidesAfterLayout();
      runGuideSyncWindow(900);
    });

    const headerEl = document.querySelector<HTMLElement>('header[data-reveal]');
    const handleHeaderTransitionStart = () => runGuideSyncWindow(1200);
    const handleHeaderTransitionEnd = () => syncGuidesAfterLayout();
    headerEl?.addEventListener('transitionstart', handleHeaderTransitionStart);
    headerEl?.addEventListener('transitionend', handleHeaderTransitionEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('load', syncGuidesAfterLayout);
      headerEl?.removeEventListener('transitionstart', handleHeaderTransitionStart);
      headerEl?.removeEventListener('transitionend', handleHeaderTransitionEnd);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      if (guideSyncRafId !== 0) {
        window.cancelAnimationFrame(guideSyncRafId);
      }
      document.documentElement.style.removeProperty('--blueprint-guide-left-x');
      document.documentElement.style.removeProperty('--blueprint-guide-right-x');
      document.documentElement.style.removeProperty('--blueprint-guides-opacity');
    };
  }, []);

  return (
    <>
      <div className="site-bg" aria-hidden="true" />

      <LandingHeader />

      <main className="relative mx-auto w-[min(1200px,92vw)] pb-24 md:pb-32 font-monoSans text-[#f7f9f2]">
        <LandingDecorations />

        <div className="relative z-10">
          <HeroSection />
          <ServicesSection />
          <WorkflowBridgeSection />
          <ApproachSection />
          <ContactSection />
        </div>
      </main>
    </>
  );
}
