import { CountUp } from '~/components/count-up/count-up';
import { DecoderText } from '~/components/decoder-text';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { TypeStream } from '~/components/type-stream/type-stream';
import { baseMeta } from '~/utils/meta';
import { getService, getAdjacentServices } from '~/services-data';
import { useInViewport } from '~/hooks';
import { useHydrated } from '~/hooks/useHydrated';
import { useLocale, useUi } from '~/i18n';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import styles from './business-automation.module.css';

const SLUG = 'business-automation';

const DisplacementSphere = lazy(() =>
  import('~/routes/home/displacement-sphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

const metaService = getService(SLUG);

const copy = {
  en: {
    scrollCue: 'Follow the line',
    k: { problem: 'The problem', automate: 'What we automate', result: 'The result', after: 'After we deliver' },
    phrases: [
      'Data entry, handled for you',
      'Reports that build themselves',
      'Checks that never get skipped',
      'Errors from manual work, gone',
    ],
    resultText:
      'days a year it keeps running, unattended and consistent, so your team gets its time back for the work that actually needs judgement.',
    ctaText:
      'It starts with a conversation and an analysis, with no obligation. We will show you concretely what it delivers for your organisation.',
  },
  nl: {
    scrollCue: 'Volg de lijn',
    k: { problem: 'Het probleem', automate: 'Wat we automatiseren', result: 'Het resultaat', after: 'Na de oplevering' },
    phrases: [
      'Gegevens invoeren, voor je gedaan',
      'Rapporten die zichzelf maken',
      'Controles die nooit worden overgeslagen',
      'Fouten uit handwerk, verdwenen',
    ],
    resultText:
      'dagen per jaar blijft het draaien, onbewaakt en consistent, zodat je team zijn tijd terugkrijgt voor het werk dat echt oordeel vraagt.',
    ctaText:
      'Het begint met een gesprek en een analyse, vrijblijvend. We laten je concreet zien wat het jouw organisatie oplevert.',
  },
};

const nodeOptions = { rootMargin: '-45% 0px -45% 0px' };

export const meta = () => {
  return baseMeta({
    title: metaService.title,
    description: metaService.summary,
    prefix: 'Services',
  });
};

const Step = ({ kicker, children }) => {
  const ref = useRef();
  const active = useInViewport(ref, false, nodeOptions);
  return (
    <div ref={ref} className={styles.step} data-on={active}>
      <div className={styles.nodeCol} aria-hidden>
        <span className={styles.node} />
      </div>
      <div className={styles.stepInner}>
        <Text className={styles.kicker} size="s" as="p">
          {kicker}
        </Text>
        {children}
      </div>
    </div>
  );
};

export const BusinessAutomation = () => {
  const isHydrated = useHydrated();
  const trackRef = useRef();
  const [progress, setProgress] = useState(0);
  const locale = useLocale();
  const ui = useUi();
  const c = copy[locale];
  const service = getService(SLUG, locale);
  const { prev, next } = getAdjacentServices(SLUG, locale);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const scrolled = vh * 0.5 - rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <Section as="section" className={styles.hero} aria-labelledby="svc-title">
        {isHydrated && (
          <div className={styles.sphere} aria-hidden>
            <Suspense>
              <DisplacementSphere />
            </Suspense>
          </div>
        )}
        <div className={styles.heroFade} aria-hidden />
        <div className={styles.heroInner}>
          <Text className={styles.eyebrow} size="s" as="p">
            {ui.common.servicesEyebrow}
          </Text>
          <Heading id="svc-title" level={1} as="h1" className={styles.heroTitle}>
            <DecoderText text={service.title} delay={300} />
          </Heading>
          <Text size="xl" as="p" className={styles.heroText}>
            {service.statement}
          </Text>
          <Link href="#journey" className={styles.scrollCue}>
            {c.scrollCue}
          </Link>
        </div>
      </Section>

      <div className={styles.wrap} id="journey">
        <div className={styles.track} ref={trackRef} style={{ '--progress': progress }}>
          <div className={styles.rail} aria-hidden>
            <div className={styles.railFill} />
          </div>

          <Step kicker={c.k.problem}>
            <Text size="xl" as="p" className={styles.stepText}>
              {service.body[0]}
            </Text>
          </Step>

          <Step kicker={c.k.automate}>
            <Text size="l" as="p" className={styles.stepText}>
              {service.body[1]}
            </Text>
            <TypeStream phrases={c.phrases} className={styles.typeStream} />
          </Step>

          <Step kicker={c.k.result}>
            <span className={styles.statNum}>
              <CountUp to={365} />
            </span>
            <span className={styles.statLine} aria-hidden />
            <Text size="l" as="p" className={styles.stepText}>
              {c.resultText}
            </Text>
          </Step>

          <Step kicker={c.k.after}>
            <Text size="l" as="p" className={styles.stepText}>
              {service.body[2]}
            </Text>
          </Step>
        </div>
      </div>

      <Section as="section" className={styles.cta}>
        <div className={styles.ctaInner}>
          <Heading level={2} as="h2" className={styles.ctaTitle}>
            {service.closing}
          </Heading>
          <Text size="l" as="p" className={styles.ctaText}>
            {c.ctaText}
          </Text>
          <Link href="/contact" className={styles.ctaButton}>
            {ui.common.discuss}
          </Link>
          <nav className={styles.pager} aria-label="More services">
            {prev ? (
              <Link href={`/services/${prev.slug}`} className={styles.pagerLink}>
                <span className={styles.pagerDir}>{ui.common.previous}</span>
                <span className={styles.pagerTitle}>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/services/${next.slug}`}
                className={`${styles.pagerLink} ${styles.pagerNext}`}
              >
                <span className={styles.pagerDir}>{ui.common.next}</span>
                <span className={styles.pagerTitle}>{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </Section>
      <Footer />
    </>
  );
};
