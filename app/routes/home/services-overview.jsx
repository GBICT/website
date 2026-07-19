import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useInViewport } from '~/hooks';
import { useUi } from '~/i18n';
import { useRef } from 'react';
import styles from './services-overview.module.css';

const cardMeta = [
  { slug: 'custom-software', video: '/services/custom-software.mp4' },
  { slug: 'business-automation', video: '/services/business-automation.mp4' },
  { slug: 'crm-and-business-systems', video: '/services/crm.mp4' },
  { slug: 'ai-assistants', video: '/services/ai-assistants.mp4' },
];

export const ServicesOverview = () => {
  const headRef = useRef();
  const gridRef = useRef();
  const headVisible = useInViewport(headRef, true, { rootMargin: '0px 0px -12% 0px' });
  const gridVisible = useInViewport(gridRef, true, { rootMargin: '0px 0px -8% 0px' });
  const ui = useUi();
  const s = ui.home.services;

  return (
    <Section as="section" className={styles.section} aria-labelledby="what-we-build">
      <div className={styles.inner}>
        <div className={styles.head} ref={headRef} data-visible={headVisible}>
          <Text className={styles.kicker} size="s" as="p">
            {s.kicker}
          </Text>
          <Heading id="what-we-build" level={2} as="h2" className={styles.title}>
            <DecoderText text={s.title} start={headVisible} />
          </Heading>
          <Text size="l" as="p" className={styles.lead}>
            {s.lead}
          </Text>
        </div>

        <div className={styles.grid} ref={gridRef} data-visible={gridVisible}>
          {cardMeta.map((card, index) => {
            const copy = s.cards[index];
            return (
              <Link
                key={card.slug}
                href={`/services/${card.slug}`}
                className={styles.card}
                style={{ '--delay': `${index * 100}ms` }}
              >
                <div className={styles.media}>
                  <video
                    className={styles.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    ref={el => {
                      if (el) el.muted = true;
                    }}
                  >
                    <source src={card.video} type="video/mp4" />
                  </video>
                  <span className={styles.scrim} aria-hidden />
                </div>
                <div className={styles.content}>
                  <Heading level={4} as="h3" className={styles.cardTitle}>
                    {copy.name}
                  </Heading>
                  <Text size="m" as="p" className={styles.cardBlurb}>
                    {copy.blurb}
                  </Text>
                  <span className={styles.cardLink}>
                    {ui.common.learnMore}
                    <span className={styles.arrow} aria-hidden>
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={styles.foot}>
          <Link href="/services" className={styles.allLink}>
            {ui.common.viewAll}
          </Link>
        </div>
      </div>
    </Section>
  );
};
