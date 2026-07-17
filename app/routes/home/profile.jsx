import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './profile.module.css';

const steps = [
  {
    label: 'Analysis',
    text: 'We start by understanding, never by building. We map how your organisation really works and find where the time and the money leak away.',
  },
  {
    label: 'Design',
    text: 'You see it before you commit. A clickable design of the real thing, so you never buy a promise on a slide.',
  },
  {
    label: 'Fixed fee agreement',
    text: 'Before we build, we lock the full scope, timeline and price. You know exactly where you stand, with no surprises and no budget overruns.',
  },
  {
    label: 'Development',
    text: 'We build it in short steps you can follow. You watch it take shape instead of waiting months for a reveal.',
  },
  {
    label: 'Implementation & support',
    text: 'We deliver it ready to use and stay close while your team settles in. Going live is the start, not the finish line.',
  },
  {
    label: 'Continuity & development',
    text: 'Your business keeps moving, so the software moves with it. We maintain it, improve it and add what you need next.',
  },
];

const CYCLE_MS = 24000; // one full sweep of the line (~4s per step to read)
const HOLD_MS = 2500; // pause on a full line before it restarts

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const titleId = `${id}-title`;
  const active = visible || focused;

  // The blue line fills itself and loops, so the steps light up on their own
  // without any scrolling. Off screen or with reduced motion it holds full.
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

  // The step the line currently sits on drives the caption below.
  const activeIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={active} timeout={0}>
        {({ visible: shown, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <Heading
              className={styles.title}
              data-visible={shown}
              level={3}
              as="h2"
              id={titleId}
            >
              Six steps to transform your business
            </Heading>

            <ol
              className={styles.timeline}
              data-visible={shown}
              style={{ '--progress': progress }}
            >
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

            <Text
              className={styles.caption}
              data-visible={shown}
              size="l"
              as="p"
              aria-live="polite"
            >
              {steps[activeIndex].text}
            </Text>
          </div>
        )}
      </Transition>
    </Section>
  );
};
