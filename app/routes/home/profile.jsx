import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useUi } from '~/i18n';
import styles from './profile.module.css';

export const Profile = ({ id, visible, sectionRef }) => {
  const titleId = `${id}-title`;
  const s = useUi().home.steps;
  const total = s.items.length;

  return (
    <Section
      className={styles.profile}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
    >
      <div className={styles.inner}>
        <div className={styles.head} data-visible={visible}>
          <Text className={styles.kicker} size="s" as="p">
            {s.kicker}
          </Text>
          <Heading className={styles.title} level={3} as="h2" id={titleId}>
            <DecoderText text={s.title} start={visible} delay={200} />
          </Heading>
        </div>

        <ol className={styles.timeline} data-visible={visible}>
          <span className={styles.track} aria-hidden>
            <span className={styles.trackFill} />
          </span>
          {s.items.map((step, index) => (
            <li
              key={step.label}
              className={styles.step}
              style={{ '--delay': `${(index / (total - 1)) * 2}s` }}
            >
              <span className={styles.dot} aria-hidden />
              <div className={styles.stepMain}>
                <div className={styles.stepHead}>
                  <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
                  <Heading level={5} as="h3" className={styles.stepLabel}>
                    {step.label}
                  </Heading>
                </div>
                <Text size="l" as="p" className={styles.stepText}>
                  {step.text}
                </Text>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
};
