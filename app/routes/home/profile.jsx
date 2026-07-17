import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useInterval } from '~/hooks';
import { useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import styles from './profile.module.css';

const steps = [
  {
    title: 'Analysis',
    text: 'We start by understanding, never by building. We map how your organisation really works and find where the time and the money leak away.',
  },
  {
    title: 'Design',
    text: 'You see it before you commit. A clickable design of the real thing, so you never buy a promise on a slide.',
  },
  {
    title: 'Fixed fee agreement',
    text: 'One price, agreed before we start. No hourly billing, no surprises halfway. You know what it costs and what you get.',
  },
  {
    title: 'Development',
    text: 'We build it in short steps you can follow. You watch it take shape instead of waiting months for a reveal.',
  },
  {
    title: 'Implementation and support',
    text: 'We deliver it ready to use and stay close while your team settles in. Going live is the start, not the finish line.',
  },
  {
    title: 'Continuity and further development',
    text: 'Your business keeps moving, so the software moves with it. We maintain it, improve it and add what you need next.',
  },
];

const stepDuration = 3500;

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const titleId = `${id}-title`;

  // Cycle through the steps while the section is on screen. Passing a null delay
  // stops the interval, so it idles off screen and stays put for reduced motion.
  const cycling = (visible || focused) && !reduceMotion;

  useInterval(
    () => setActiveStep(step => (step + 1) % steps.length),
    cycling ? stepDuration : null
  );

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
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <Heading
                className={styles.title}
                data-visible={visible}
                level={3}
                id={titleId}
              >
                <DecoderText text="How we work" start={visible} delay={500} />
              </Heading>
              <Text className={styles.description} data-visible={visible} size="l" as="p">
                From the first conversation to software that keeps earning its place. Six
                steps, no surprises.
              </Text>
              <ol className={styles.steps} data-visible={visible}>
                {steps.map(({ title, text }, index) => (
                  <li
                    key={title}
                    className={styles.step}
                    data-active={index === activeStep}
                  >
                    <Divider
                      className={styles.stepDivider}
                      notchWidth="24px"
                      notchHeight="4px"
                      collapsed={index !== activeStep}
                    />
                    <div className={styles.stepBody}>
                      <span className={styles.stepNumber}>{`0${index + 1}`}</span>
                      <h4 className={styles.stepTitle}>{title}</h4>
                      <p className={styles.stepText}>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
