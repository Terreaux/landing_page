import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BotIcon,
  BrainCircuitIcon,
  CalendarDaysIcon,
  CameraIcon,
  CpuIcon,
  DatabaseIcon,
  EyeIcon,
  FileTextIcon,
  GitBranchIcon,
  MessageSquareIcon,
  SearchIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';

import { heroThoughtScenarios, type HeroThoughtIconKey } from '@/data/serviceRuntimes';
import { cn } from '@/lib/utils';

const PROMPT_INTERVAL_MS = 56;
const PROMPT_START_INTERVAL_MS = 78;
const LOADING_DELAY_MS = 860;
const STEP_TYPE_START_INTERVAL_MS = 38;
const STEP_TYPE_INTERVAL_MS = 22;
const STEP_SETTLE_DELAY_MS = 320;
const RESPONSE_INTERVAL_MS = 104;
const CHIP_DELAY_MS = 180;
const INVENTORY_CARD_REVEAL_INTERVAL = 120;
const LOOP_PAUSE_MS = 3600;

const iconByKey: Record<HeroThoughtIconKey, LucideIcon> = {
  bot: BotIcon,
  brainCircuit: BrainCircuitIcon,
  calendarDays: CalendarDaysIcon,
  camera: CameraIcon,
  cpu: CpuIcon,
  database: DatabaseIcon,
  eye: EyeIcon,
  fileText: FileTextIcon,
  gitBranch: GitBranchIcon,
  messageSquare: MessageSquareIcon,
  search: SearchIcon,
  shieldCheck: ShieldCheckIcon,
  workflow: WorkflowIcon
};

function queueDelay(timersRef: MutableRefObject<number[]>, durationMs: number) {
  return new Promise<void>((resolve) => {
    const timeoutId = window.setTimeout(resolve, durationMs);
    timersRef.current.push(timeoutId);
  });
}

interface HeroChainOfThoughtProps {
  className?: string;
  scenarioIndex?: number;
  cycleScenarios?: boolean;
}

export function HeroChainOfThought({
  className,
  scenarioIndex,
  cycleScenarios = true
}: HeroChainOfThoughtProps = {}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const isInView = useInView(panelRef, { amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const hasPinnedScenario = typeof scenarioIndex === 'number';
  const normalizedScenarioIndex =
    typeof scenarioIndex === 'number'
      ? ((scenarioIndex % heroThoughtScenarios.length) + heroThoughtScenarios.length) %
        heroThoughtScenarios.length
      : 0;

  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(normalizedScenarioIndex);
  const [visiblePromptChars, setVisiblePromptChars] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [visibleStepCount, setVisibleStepCount] = useState(0);
  const [visibleStepChars, setVisibleStepChars] = useState<number[]>(() =>
    heroThoughtScenarios[normalizedScenarioIndex].steps.map(() => 0)
  );
  const [visibleResponseWords, setVisibleResponseWords] = useState(0);
  const [visibleChipCount, setVisibleChipCount] = useState(0);
  const [visibleInventoryCardCount, setVisibleInventoryCardCount] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [phase, setPhase] = useState<'snapshot' | 'prompting' | 'thinking' | 'acting' | 'resolved'>('snapshot');

  const scenario = heroThoughtScenarios[activeScenarioIndex];
  const responseWords = scenario.response.split(' ');
  const inventoryCards = scenario.inventoryCards ?? [];
  const inventoryRevealStepIndex = scenario.steps.findIndex((step) => step.icon === 'database');
  const comparisonStepIndex = scenario.steps.findIndex((step) => step.icon === 'workflow');
  const shouldAnimate = !prefersReducedMotion && (isInView || !hasEnteredView);
  const isComparisonActive =
    comparisonStepIndex >= 0 && phase === 'thinking' && activeStepIndex === comparisonStepIndex;

  useEffect(() => {
    if (hasPinnedScenario) {
      setActiveScenarioIndex(normalizedScenarioIndex);
    }
  }, [hasPinnedScenario, normalizedScenarioIndex]);

  useEffect(() => {
    if (isInView) {
      setHasEnteredView(true);
    }
  }, [isInView]);

  useEffect(() => {
    return () => {
      for (const timeoutId of timersRef.current) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const resetTimers = () => {
      for (const timeoutId of timersRef.current) {
        window.clearTimeout(timeoutId);
      }
      timersRef.current = [];
    };

    const syncSnapshot = () => {
      setVisiblePromptChars(scenario.prompt.length);
      setActiveStepIndex(scenario.steps.length);
      setVisibleStepCount(scenario.steps.length);
      setVisibleStepChars(scenario.steps.map((step) => step.label.length));
      setVisibleResponseWords(responseWords.length);
      setVisibleChipCount(scenario.chips?.length ?? 0);
      setVisibleInventoryCardCount(inventoryCards.length);
      setIsThinking(false);
      setPhase('snapshot');
    };

    resetTimers();

    if (!shouldAnimate) {
      syncSnapshot();
      return;
    }

    let isCancelled = false;

    const runScenario = async () => {
      setVisiblePromptChars(0);
      setActiveStepIndex(-1);
      setVisibleStepCount(0);
      setVisibleStepChars(scenario.steps.map(() => 0));
      setVisibleResponseWords(0);
      setVisibleChipCount(0);
      setVisibleInventoryCardCount(0);
      setIsThinking(false);
      setPhase('prompting');

      for (let charIndex = 1; charIndex <= scenario.prompt.length; charIndex += 1) {
        if (isCancelled) return;
        setVisiblePromptChars(charIndex);
        await queueDelay(timersRef, charIndex < 10 ? PROMPT_START_INTERVAL_MS : PROMPT_INTERVAL_MS);
      }

      if (isCancelled) return;

      setIsThinking(true);
      setPhase('thinking');
      await queueDelay(timersRef, LOADING_DELAY_MS);

      for (let stepIndex = 0; stepIndex < scenario.steps.length; stepIndex += 1) {
        if (isCancelled) return;
        setActiveStepIndex(stepIndex);
        setVisibleStepCount(stepIndex + 1);

        for (let charIndex = 1; charIndex <= scenario.steps[stepIndex].label.length; charIndex += 1) {
          if (isCancelled) return;
          setVisibleStepChars((currentChars) =>
            currentChars.map((count, index) => (index === stepIndex ? charIndex : count))
          );

          if (stepIndex === inventoryRevealStepIndex && inventoryCards.length > 0) {
            const nextCardCount = Math.min(
              inventoryCards.length,
              Math.max(0, Math.floor((charIndex - 2) / Math.max(1, Math.round(INVENTORY_CARD_REVEAL_INTERVAL / STEP_TYPE_INTERVAL_MS))) + 1)
            );
            setVisibleInventoryCardCount(nextCardCount);
          }

          await queueDelay(timersRef, charIndex < 10 ? STEP_TYPE_START_INTERVAL_MS : STEP_TYPE_INTERVAL_MS);
        }

        if (stepIndex === inventoryRevealStepIndex && inventoryCards.length > 0) {
          setVisibleInventoryCardCount(inventoryCards.length);
        }

        await queueDelay(timersRef, STEP_SETTLE_DELAY_MS);
      }

      if (isCancelled) return;

      setActiveStepIndex(scenario.steps.length);
      setVisibleStepCount(scenario.steps.length);
      setIsThinking(false);
      setPhase('acting');

      for (let wordIndex = 1; wordIndex <= responseWords.length; wordIndex += 1) {
        if (isCancelled) return;
        setVisibleResponseWords(wordIndex);
        await queueDelay(timersRef, RESPONSE_INTERVAL_MS);
      }

      const chipCount = scenario.chips?.length ?? 0;
      for (let chipIndex = 1; chipIndex <= chipCount; chipIndex += 1) {
        if (isCancelled) return;
        setVisibleChipCount(chipIndex);
        await queueDelay(timersRef, CHIP_DELAY_MS);
      }

      setPhase('resolved');

      if (hasPinnedScenario || !cycleScenarios) {
        return;
      }

      await queueDelay(timersRef, LOOP_PAUSE_MS);
      if (isCancelled) return;

      setActiveScenarioIndex((currentIndex) => (currentIndex + 1) % heroThoughtScenarios.length);
    };

    void runScenario();

    return () => {
      isCancelled = true;
      resetTimers();
    };
  }, [cycleScenarios, hasPinnedScenario, responseWords.length, scenario, shouldAnimate]);

  const visiblePrompt = scenario.prompt.slice(0, visiblePromptChars);
  const visibleResponse = responseWords.slice(0, visibleResponseWords).join(' ');
  const visibleChips = scenario.chips?.slice(0, visibleChipCount) ?? [];
  const renderedSteps = shouldAnimate ? scenario.steps.slice(0, visibleStepCount) : scenario.steps;
  const visibleInventoryCards = shouldAnimate ? inventoryCards.slice(0, visibleInventoryCardCount) : inventoryCards;
  const hasInventoryCards = inventoryCards.length > 0;

  let panelStatus = 'Snapshot';
  if (shouldAnimate) {
    if (phase === 'prompting') {
      panelStatus = 'Parsing prompt';
    } else if (phase === 'thinking') {
      const currentStep = Math.max(activeStepIndex + 1, 1);
      panelStatus = `Thinking ${currentStep}/${scenario.steps.length}`;
    } else if (phase === 'acting') {
      panelStatus = 'Acting';
    } else if (phase === 'resolved' && visibleResponseWords > 0) {
      panelStatus = 'Resolved';
    } else {
      panelStatus = 'Queued';
    }
  }

  return (
    <div ref={panelRef} className={cn('hero-cot-shell', className)}>
      <div className="hero-cot-window">
        <div className="hero-cot-window-header">
          <div className="hero-cot-window-controls" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="hero-cot-window-title">Terreaux Runtime</p>
          <span
            className={cn(
              'hero-cot-window-status',
              shouldAnimate && 'is-live',
              (phase === 'prompting' || phase === 'thinking') && 'is-thinking',
              phase === 'acting' && 'is-acting'
            )}
          >
            <span className="hero-cot-status-indicator" aria-hidden="true" />
            {panelStatus}
          </span>
        </div>

        <div className="hero-cot-panel">
          <div className="hero-cot-prompt">
            <div className="hero-cot-meta">
              <span>Operator prompt</span>
              <span>{scenario.label}</span>
            </div>
            <p className="hero-cot-prompt-text">
              {visiblePrompt}
              <span className={cn('hero-cot-cursor', visiblePromptChars >= scenario.prompt.length && isThinking && 'is-busy')}>
                |
              </span>
            </p>
          </div>

          <div className={cn('hero-cot-progress', isThinking && 'is-active')} aria-hidden="true" />

          <div className={cn('hero-cot-trace-slot', hasInventoryCards && 'has-inventory')}>
            <AnimatePresence initial={false} mode="wait">
              {(isThinking || activeStepIndex >= 0 || !shouldAnimate) && (
                <motion.div
                  key={`${scenario.id}-trace`}
                  className={cn('hero-cot-trace', hasInventoryCards && 'has-overlay')}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <div className="hero-cot-trace-header">
                    <span>Execution trace</span>
                    <span>{scenario.steps.length} checkpoints</span>
                  </div>
                  <ul className="hero-cot-steps">
                    {renderedSteps.map((step, index) => {
                      const StepIcon = iconByKey[step.icon] ?? SearchIcon;
                      const stepStatus =
                        activeStepIndex > index ? 'complete' : activeStepIndex === index ? 'active' : 'pending';
                      const visibleStepLabel = step.label.slice(0, visibleStepChars[index] ?? 0);
                      const isStepTyping =
                        shouldAnimate && activeStepIndex === index && visibleStepLabel.length < step.label.length;

                      return (
                        <li key={step.label} className="hero-cot-step" data-status={stepStatus}>
                          <span className="hero-cot-step-rail" aria-hidden="true">
                            <span className="hero-cot-step-marker">
                              <StepIcon className="size-[0.9rem]" />
                            </span>
                          </span>
                          <span className="hero-cot-step-label-shell">
                            <span className="hero-cot-step-label hero-cot-step-label-measure" aria-hidden="true">
                              {step.label}
                            </span>
                            <span className="hero-cot-step-label hero-cot-step-label-live">
                              {visibleStepLabel}
                              {isStepTyping && <span className="hero-cot-step-cursor">|</span>}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {hasInventoryCards && (
              <div className="hero-cot-inventory-overlay">
                <AnimatePresence initial={false}>
                  {visibleInventoryCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      className={cn(
                        'hero-cot-product-card',
                        isComparisonActive && card.isComparisonFocus && 'is-focused',
                        isComparisonActive && !card.isComparisonFocus && 'is-muted'
                      )}
                      initial={{ opacity: 0, x: 20, y: 8, scale: 0.985 }}
                      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 14, y: 6, scale: 0.985 }}
                      transition={{ duration: 0.22, delay: index * 0.045, ease: 'easeOut' }}
                    >
                      <div className="hero-cot-product-hero">
                        <img
                          src={card.imageSrc}
                          alt={card.imageAlt}
                          className="hero-cot-product-image"
                        />
                      </div>

                      <div className="hero-cot-product-body">
                        <div className="hero-cot-product-head">
                          <span>{card.title}</span>
                          <span>{card.sku}</span>
                        </div>
                        <div className="hero-cot-product-status-row">
                          <span
                            className={cn(
                              'hero-cot-product-status',
                              card.statusTone === 'ready' && 'is-ready',
                              card.statusTone === 'watch' && 'is-watch',
                              card.statusTone === 'risk' && 'is-risk'
                            )}
                          >
                            {card.statusLabel}
                          </span>
                        </div>
                        <div className="hero-cot-product-metric">
                          <span>Available</span>
                          <strong>{card.available}</strong>
                        </div>
                        <div className="hero-cot-product-meta">
                          <span>{card.inbound}</span>
                          <span>{card.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="hero-cot-response-slot">
            <AnimatePresence initial={false} mode="wait">
              {visibleResponseWords > 0 && (
                <motion.div
                  key={`${scenario.id}-response`}
                  className="hero-cot-response"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <div className="hero-cot-response-header">
                    <span>{scenario.resultLabel}</span>
                    <span>{scenario.label}</span>
                  </div>
                  <p className="hero-cot-response-text">{visibleResponse}</p>

                  {visibleChips.length > 0 && (
                    <div className="hero-cot-chip-row">
                      {visibleChips.map((chip) => (
                        <motion.span
                          key={chip}
                          className="hero-cot-chip"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                        >
                          {chip}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
