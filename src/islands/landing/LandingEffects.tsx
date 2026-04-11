import { useEffect } from 'react';

/** Global landing chrome: reveal observer, parallax, blueprint guide sync. */
export function LandingEffects() {
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

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

      document.documentElement.style.setProperty(
        '--blueprint-guide-left-x',
        `${leftRect.left + leftRect.width / 2 - layerRect.left}px`
      );
      document.documentElement.style.setProperty(
        '--blueprint-guide-right-x',
        `${rightRect.left + rightRect.width / 2 - layerRect.left}px`
      );
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
    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady
        .then(() => {
          syncGuidesAfterLayout();
          runGuideSyncWindow(900);
        })
        .catch(() => {
          syncGuidesAfterLayout();
        });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('load', syncGuidesAfterLayout);
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

  return null;
}
