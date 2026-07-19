import { Text } from '~/components/text';
import { useInViewport } from '~/hooks';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './process-timeline.module.css';

const CYCLE_MS = 15000; // one full sweep of the line
const HOLD_MS = 2500; // pause on a full line before it restarts

const observerOptions = { rootMargin: '0px 0px -20% 0px' };

// A self-filling timeline: the accent line sweeps left to right on its own, the
// numbered nodes light up in turn and the caption follows. Same idea as the
// homepage "Six steps" section, reusable for any short process.
export const ProcessTimeline = ({ steps }) => {
  const ref = useRef();
  const active = useInViewport(ref, false, observerOptions);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active || reduceMotion) {
      setProgress(1);
      return;
    }
    let frame = 0;
    let start = null;
    const tick = now => {
      if (start === null) start = now;
      const elapsed = (now - start) % (CYCLE_MS + HOLD_MS);
      setProgress(Math.min(1, elapsed / CYCLE_MS));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion]);

  const activeIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <div className={styles.wrap} ref={ref}>
      <ol className={styles.timeline} style={{ '--progress': progress }}>
        <div className={styles.track} aria-hidden="true">
          <div className={styles.trackFill} />
        </div>
        {steps.map((step, index) => (
          <li
            key={step.label}
            className={styles.node}
            data-done={progress >= index / (steps.length - 1)}
            data-current={index === activeIndex}
          >
            <span className={styles.nodeCircle}>{index + 1}</span>
            <span className={styles.nodeLabel}>{step.label}</span>
          </li>
        ))}
      </ol>
      <Text className={styles.caption} size="l" as="p" aria-live="polite">
        {steps[activeIndex].text}
      </Text>
    </div>
  );
};
