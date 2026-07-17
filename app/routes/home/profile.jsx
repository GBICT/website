import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useEffect, useState } from 'react';
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
    text: 'Before we build, we lock the full scope, timeline and price. You know exactly where you stand, with no surprises and no budget overruns.',
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

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const [progress, setProgress] = useState(0);
  const titleId = `${id}-title`;

  // The bar fills as the section travels up through the viewport, so scrolling
  // drives it left to right instead of a timer. Progress runs from the section
  // reaching a read line at 85% of the viewport to its top scrolling past it,
  // a range the page can always cover since the section is the last content.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const raw = (window.innerHeight * 0.85 - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

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

              <div
                className={styles.progressTrack}
                data-visible={visible}
                aria-hidden="true"
              >
                <div
                  className={styles.progressFill}
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>

              <ol className={styles.steps} data-visible={visible}>
                {steps.map(({ title, text }, index) => (
                  <li
                    key={title}
                    className={styles.step}
                    data-done={progress >= (index + 0.5) / steps.length}
                  >
                    <span className={styles.stepNumber}>{`0${index + 1}`}</span>
                    <h4 className={styles.stepTitle}>{title}</h4>
                    <p className={styles.stepText}>{text}</p>
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
