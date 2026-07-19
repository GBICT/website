import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useInViewport } from '~/hooks';
import { useUi } from '~/i18n';
import { useRef } from 'react';
import styles from './why-us.module.css';

export const WhyUs = () => {
  const headRef = useRef();
  const listRef = useRef();
  const headVisible = useInViewport(headRef, true, { rootMargin: '0px 0px -15% 0px' });
  const listVisible = useInViewport(listRef, true, { rootMargin: '0px 0px -10% 0px' });
  const s = useUi().home.why;

  return (
    <Section as="section" className={styles.section} aria-labelledby="why-us">
      <div className={styles.inner}>
        <div className={styles.head} ref={headRef} data-visible={headVisible}>
          <Text className={styles.kicker} size="s" as="p">
            {s.kicker}
          </Text>
          <Heading id="why-us" level={2} as="h2" className={styles.title}>
            <DecoderText text={s.title} start={headVisible} />
          </Heading>
        </div>

        <div className={styles.list} ref={listRef} data-visible={listVisible}>
          {s.points.map((point, index) => (
            <article
              key={point.title}
              className={styles.item}
              style={{ '--delay': `${index * 130}ms` }}
            >
              <span className={styles.itemLabel}>{point.label}</span>
              <span className={styles.itemRule} aria-hidden />
              <Heading level={4} as="h3" className={styles.itemTitle}>
                {point.title}
              </Heading>
              <Text size="l" as="p" className={styles.itemText}>
                {point.text}
              </Text>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
};
