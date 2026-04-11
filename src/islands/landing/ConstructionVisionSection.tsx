import { type CSSProperties, type MutableRefObject, useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CalendarDaysIcon, CameraIcon, CpuIcon, DatabaseIcon, EyeIcon, FileTextIcon, MessageSquareIcon, SearchIcon } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';

import { constructionVisionScenarios } from '@/data/serviceRuntimes';
import { cn } from '@/lib/utils';

const DETECTION_INTERVAL_MS = 440;
const THINKING_DELAY_MS = 680;
const STEP_TYPE_START_INTERVAL_MS = 28;
const STEP_TYPE_INTERVAL_MS = 15;
const STEP_SETTLE_DELAY_MS = 220;
const DECISION_REVEAL_DELAY_MS = 180;
const CHIP_DELAY_MS = 180;
const MESSAGE_DELAY_MS = 460;
const MESSAGE_INTERVAL_MS = 82;
const MESSAGE_REPLY_DELAY_MS = 1450;
const LOOP_PAUSE_MS = 5600;

const stepIcons: Record<string, LucideIcon> = {
  calendarDays: CalendarDaysIcon,
  camera: CameraIcon,
  cpu: CpuIcon,
  database: DatabaseIcon,
  eye: EyeIcon,
  fileText: FileTextIcon,
  messageSquare: MessageSquareIcon,
  search: SearchIcon,
};

const handoffIcons: Record<string, LucideIcon> = {
  database: DatabaseIcon,
  messageSquare: MessageSquareIcon,
};

function queueDelay(timersRef: MutableRefObject<number[]>, durationMs: number) {
  return new Promise<void>((resolve) => {
    const timeoutId = window.setTimeout(resolve, durationMs);
    timersRef.current.push(timeoutId);
  });
}

function useConstructionVisionRuntimeState() {
  const runtimeRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const isInView = useInView(runtimeRef, { amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [visibleDetectionCount, setVisibleDetectionCount] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [visibleStepCount, setVisibleStepCount] = useState(0);
  const [visibleStepChars, setVisibleStepChars] = useState<number[]>(() =>
    constructionVisionScenarios[0].steps.map(() => 0)
  );
  const [visibleDecisionWords, setVisibleDecisionWords] = useState(0);
  const [visibleChipCount, setVisibleChipCount] = useState(0);
  const [visibleMessageWords, setVisibleMessageWords] = useState(0);
  const [showHandoffReply, setShowHandoffReply] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [phase, setPhase] = useState<'snapshot' | 'detecting' | 'thinking' | 'acting' | 'resolved'>('snapshot');

  const scenario = constructionVisionScenarios[scenarioIndex];
  const decisionWords = scenario.decision.split(' ');
  const messageWords = scenario.handoffText.split(' ');
  const shouldAnimate = !prefersReducedMotion && (isInView || !hasEnteredView);

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
      setVisibleDetectionCount(scenario.detections.length);
      setActiveStepIndex(scenario.steps.length);
      setVisibleStepCount(scenario.steps.length);
      setVisibleStepChars(scenario.steps.map((step) => step.label.length));
      setVisibleDecisionWords(decisionWords.length);
      setVisibleChipCount(scenario.chips.length);
      setVisibleMessageWords(messageWords.length);
      setShowHandoffReply(Boolean(scenario.handoffReplyText));
      setIsThinking(false);
      setPhase('snapshot');
    };

    resetTimers();

    if (!shouldAnimate) {
      syncSnapshot();
      return;
    }

    let isCancelled = false;

    const runSequence = async () => {
      setVisibleDetectionCount(0);
      setActiveStepIndex(-1);
      setVisibleStepCount(0);
      setVisibleStepChars(scenario.steps.map(() => 0));
      setVisibleDecisionWords(0);
      setVisibleChipCount(0);
      setVisibleMessageWords(0);
      setShowHandoffReply(false);
      setIsThinking(false);
      setPhase('detecting');

      for (let detectionIndex = 1; detectionIndex <= scenario.detections.length; detectionIndex += 1) {
        if (isCancelled) return;
        setVisibleDetectionCount(detectionIndex);
        await queueDelay(timersRef, DETECTION_INTERVAL_MS);
      }

      if (isCancelled) return;

      setIsThinking(true);
      setPhase('thinking');
      await queueDelay(timersRef, THINKING_DELAY_MS);

      for (let stepIndex = 0; stepIndex < scenario.steps.length; stepIndex += 1) {
        if (isCancelled) return;
        setActiveStepIndex(stepIndex);
        setVisibleStepCount(stepIndex + 1);

        for (let charIndex = 1; charIndex <= scenario.steps[stepIndex].label.length; charIndex += 1) {
          if (isCancelled) return;
          setVisibleStepChars((currentChars) =>
            currentChars.map((count, index) => (index === stepIndex ? charIndex : count))
          );
          await queueDelay(timersRef, charIndex < 10 ? STEP_TYPE_START_INTERVAL_MS : STEP_TYPE_INTERVAL_MS);
        }

        await queueDelay(timersRef, STEP_SETTLE_DELAY_MS);
      }

      if (isCancelled) return;

      setActiveStepIndex(scenario.steps.length);
      setVisibleStepCount(scenario.steps.length);
      setIsThinking(false);
      setPhase('acting');

      await queueDelay(timersRef, DECISION_REVEAL_DELAY_MS);
      if (isCancelled) return;
      setVisibleDecisionWords(decisionWords.length);

      for (let chipIndex = 1; chipIndex <= scenario.chips.length; chipIndex += 1) {
        if (isCancelled) return;
        setVisibleChipCount(chipIndex);
        await queueDelay(timersRef, CHIP_DELAY_MS);
      }

      if (isCancelled) return;

      await queueDelay(timersRef, MESSAGE_DELAY_MS);

      if (scenario.handoffMode === 'message') {
        setVisibleMessageWords(messageWords.length);

        if (scenario.handoffReplyText) {
          await queueDelay(timersRef, MESSAGE_REPLY_DELAY_MS);
          if (isCancelled) return;
          setShowHandoffReply(true);
        }
      } else {
        for (let wordIndex = 1; wordIndex <= messageWords.length; wordIndex += 1) {
          if (isCancelled) return;
          setVisibleMessageWords(wordIndex);
          await queueDelay(timersRef, MESSAGE_INTERVAL_MS);
        }
      }

      setPhase('resolved');

      await queueDelay(timersRef, LOOP_PAUSE_MS);
      if (isCancelled) return;

      setScenarioIndex((currentIndex) => (currentIndex + 1) % constructionVisionScenarios.length);
    };

    void runSequence();

    return () => {
      isCancelled = true;
      resetTimers();
    };
  }, [decisionWords.length, messageWords.length, scenario, shouldAnimate]);

  const visibleDecision = decisionWords.slice(0, visibleDecisionWords).join(' ');
  const visibleChips = scenario.chips.slice(0, visibleChipCount);
  const visibleMessage = messageWords.slice(0, visibleMessageWords).join(' ');

  let runtimeStatus = 'Snapshot';
  if (shouldAnimate) {
    if (phase === 'detecting') {
      runtimeStatus = `Detecting ${visibleDetectionCount}/${scenario.detections.length}`;
    } else if (phase === 'thinking') {
      runtimeStatus = `Thinking ${Math.max(activeStepIndex + 1, 1)}/${scenario.steps.length}`;
    } else if (phase === 'acting') {
      runtimeStatus = 'Acting';
    } else if (phase === 'resolved' && visibleDecisionWords > 0) {
      runtimeStatus = 'Action ready';
    } else {
      runtimeStatus = 'Queued';
    }
  }

  return {
    runtimeRef,
    scenario,
    runtimeStatus,
    shouldAnimate,
    visibleDetectionCount,
    activeStepIndex,
    visibleStepCount,
    visibleStepChars,
    visibleDecisionWords,
    visibleDecision,
    visibleChips,
    visibleMessageWords,
    visibleMessage,
    showHandoffReply,
    isThinking,
    phase,
  };
}

type ConstructionVisionRuntimeState = ReturnType<typeof useConstructionVisionRuntimeState>;

function ConstructionVisionRuntime({ state }: { state: ConstructionVisionRuntimeState }) {
  const {
    runtimeRef,
    scenario,
    runtimeStatus,
    shouldAnimate,
    visibleDetectionCount,
    activeStepIndex,
    visibleStepCount,
    isThinking,
    visibleStepChars,
    phase,
  } = state;
  const renderedSteps = shouldAnimate ? scenario.steps.slice(0, visibleStepCount) : scenario.steps;

  return (
    <div ref={runtimeRef} className="construction-runtime">
      <div className="construction-runtime-header">
        <div className="construction-runtime-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="construction-runtime-title">Terreaux Runtime</p>
        <span
          className={cn(
            'construction-runtime-status',
            shouldAnimate && 'is-live',
            (phase === 'detecting' || phase === 'thinking') && 'is-thinking',
            phase === 'acting' && 'is-acting'
          )}
        >
          <span className="construction-runtime-indicator" aria-hidden="true" />
          {runtimeStatus}
        </span>
      </div>

      <div className="construction-runtime-grid">
        <div className="construction-scene">
          <div className={cn('construction-scan-line', visibleDetectionCount > 0 && shouldAnimate && 'is-active')} aria-hidden="true" />
          <img src={scenario.imageSrc} alt={scenario.imageAlt} className="construction-scene-image" />
          <div className="construction-scene-wash" aria-hidden="true" />

          {scenario.detections.map((detection, index) => {
            const isVisible = index < visibleDetectionCount || !shouldAnimate;
            const isFocused = detection.id === scenario.focusDetectionId && visibleDetectionCount === scenario.detections.length;

            return (
              <div
                key={detection.id}
                className={cn(
                  'construction-detection',
                  isVisible && 'is-visible',
                  detection.tone === 'risk' && 'is-risk',
                  isFocused && 'is-focused'
                )}
                style={
                  {
                    '--x': detection.x,
                    '--y': detection.y,
                    '--width': detection.width,
                    '--height': detection.height
                  } as CSSProperties
                }
              >
                <span className="construction-detection-label">{detection.label}</span>
              </div>
            );
          })}
        </div>

        <div className="construction-trace-card">
          <div className="construction-trace-slot">
            <AnimatePresence initial={false}>
              {(isThinking || activeStepIndex >= 0 || !shouldAnimate) && (
                <motion.div
                  className="construction-steps-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <div className="construction-mini-header">
                    <span>Reasoning trace</span>
                    <span>{scenario.steps.length} checks</span>
                  </div>

                  <ul className="construction-steps">
                    {renderedSteps.map((step, index) => {
                      const StepIcon = stepIcons[step.icon] ?? SearchIcon;
                      const stepStatus =
                        activeStepIndex > index ? 'complete' : activeStepIndex === index ? 'active' : 'pending';
                      const visibleStepLabel = step.label.slice(0, visibleStepChars[index] ?? 0);
                      const isStepTyping =
                        shouldAnimate && activeStepIndex === index && visibleStepLabel.length < step.label.length;

                      return (
                        <li key={step.label} className="construction-step" data-status={stepStatus}>
                          <span className="construction-step-icon">
                            <StepIcon className="size-[0.9rem]" />
                          </span>
                          <span className="construction-step-label-shell">
                            <span className="construction-step-label construction-step-label-measure" aria-hidden="true">
                              {step.label}
                            </span>
                            <span className="construction-step-label construction-step-label-live">
                              {visibleStepLabel}
                              {isStepTyping && <span className="construction-step-cursor">|</span>}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ConstructionVisionSectionProps {
  className?: string;
  enableReveal?: boolean;
  showBlob?: boolean;
  showHeading?: boolean;
  layout?: 'split' | 'stacked';
}

function ConstructionVisionActions({
  state,
  align = 'default',
  showScenarioLabel = true
}: {
  state: ConstructionVisionRuntimeState;
  align?: 'default' | 'stacked';
  showScenarioLabel?: boolean;
}) {
  const HandoffIcon = handoffIcons[state.scenario.handoffIcon] ?? DatabaseIcon;

  return (
    <div className={cn('construction-vision-action', align === 'stacked' && 'is-stacked')}>
      <div className="construction-action-stack">
        {showScenarioLabel ? (
          <p className={cn('construction-vision-scenario-label', align === 'stacked' && 'is-stacked')}>
            {state.scenario.label}
          </p>
        ) : null}

        <div className="construction-decision-slot">
          <AnimatePresence initial={false}>
            {state.visibleDecisionWords > 0 && (
              <motion.div
                className="construction-decision-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <div className="construction-mini-header">
                  <span>{state.scenario.resultLabel}</span>
                  <span>{state.scenario.label}</span>
                </div>
                <p className="construction-decision-text">{state.visibleDecision}</p>

                <div className="construction-chip-row">
                  {state.visibleChips.map((chip) => (
                    <motion.span
                      key={chip}
                      className="construction-chip"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="construction-chat-slot">
          <AnimatePresence initial={false}>
            {state.visibleMessageWords > 0 && (
              <motion.div
                className="construction-chat-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <div className="construction-mini-header">
                  <span>{state.scenario.handoffLabel}</span>
                  <span>{state.scenario.handoffTarget}</span>
                </div>

                <div className="construction-chat-thread">
                  {state.scenario.handoffMode === 'database' ? (
                    <div className="construction-db-panel">
                      <div className="construction-chat-sender">
                        <HandoffIcon className="size-[0.82rem]" />
                        <span>Terreaux agent</span>
                      </div>
                      <p className="construction-db-command">{state.visibleMessage}</p>

                      <div className="construction-db-table" role="presentation">
                        <div className="construction-db-head">
                          <span>Field</span>
                          <span>Previous</span>
                          <span>New</span>
                        </div>

                        {state.scenario.handoffRows?.map((row) => (
                          <div key={row.field} className="construction-db-row">
                            <span className="construction-db-field">{row.field}</span>
                            <span className="construction-db-value construction-db-value-old">{row.previous}</span>
                            <span className="construction-db-value construction-db-value-new">{row.next}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <motion.div
                        className="construction-chat-bubble"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.26, ease: 'easeOut' }}
                      >
                        <div className="construction-chat-sender">
                          <HandoffIcon className="size-[0.82rem]" />
                          <span>Terreaux agent</span>
                        </div>
                        <p className="construction-chat-text">{state.visibleMessage}</p>
                      </motion.div>

                      <AnimatePresence initial={false}>
                        {state.showHandoffReply && state.scenario.handoffReplyText && (
                          <motion.div
                            className="construction-chat-reply"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.24, ease: 'easeOut' }}
                          >
                            <div className="construction-chat-reply-sender">{state.scenario.handoffReplySender}</div>
                            <p className="construction-chat-reply-text">{state.scenario.handoffReplyText}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function ConstructionVisionSection({
  className,
  enableReveal = true,
  showBlob = true,
  showHeading = true,
  layout = 'split'
}: ConstructionVisionSectionProps = {}) {
  const state = useConstructionVisionRuntimeState();

  return (
    <section className={cn('relative py-20 md:py-28', className)}>
      {showBlob ? (
        <span
          className="section-blob"
          style={
            {
              '--x': '18%',
              '--y': '28%',
              '--size': '24rem',
              '--hue': '154',
              '--alpha': '0.16',
              '--drift-x': '88px',
              '--drift-y': '-34px',
              '--duration': '14.5s',
              '--delay': '-1.8s'
            } as CSSProperties
          }
          aria-hidden="true"
        />
      ) : null}

      {layout === 'stacked' ? (
        <div
          className={cn('relative z-10 construction-vision-stack', enableReveal && 'reveal')}
          data-reveal={enableReveal ? 'true' : undefined}
        >
          <ConstructionVisionRuntime state={state} />
          <ConstructionVisionActions state={state} align="stacked" showScenarioLabel={false} />
        </div>
      ) : (
        <div
          className={cn('relative z-10 construction-vision-layout', enableReveal && 'reveal')}
          data-reveal={enableReveal ? 'true' : undefined}
        >
          <div className="construction-vision-runtime">
            <ConstructionVisionRuntime state={state} />
          </div>

          <div className="construction-vision-copy">
            {showHeading ? (
              <>
                <h2 className="font-display text-[clamp(1.7rem,4vw,3.3rem)] leading-[1.02]">Computer Vision</h2>
                <p className="mt-4 text-[0.98rem] leading-[1.75] text-[#cad5c3]">
                  The runtime cycles through field-safety examples, reading live site frames, locking detections onto
                  workers and access conditions, then reasoning toward the supervisor action that should happen next.
                </p>
              </>
            ) : null}
            <ConstructionVisionActions state={state} />
          </div>
        </div>
      )}
    </section>
  );
}
