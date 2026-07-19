import robotAi from '~/assets/robot-ai.jpg';
import { CountUp } from '~/components/count-up/count-up';
import { DecoderText } from '~/components/decoder-text';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { SegmentedControl, SegmentedControlOption } from '~/components/segmented-control';
import { Text } from '~/components/text';
import { TypeStream } from '~/components/type-stream/type-stream';
import { baseMeta } from '~/utils/meta';
import { getService, getAdjacentServices } from '~/services-data';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import { useInViewport } from '~/hooks';
import { useHydrated } from '~/hooks/useHydrated';
import { Suspense, lazy, useRef, useState } from 'react';
import { media } from '~/utils/style';
import styles from './service-detail.module.css';

const DisplacementSphere = lazy(() =>
  import('~/routes/home/displacement-sphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

const revealOptions = { rootMargin: '0px 0px -12% 0px' };

// Per service: a visual (robot image or a before/after toggle), a self typing
// line, and an optional headline figure. Copy comes from services-data.
const config = {
  'business-automation': {
    kickers: { problem: 'The problem', get: 'What we automate' },
    phrases: [
      'Data entry, handled for you',
      'Reports that build themselves',
      'Checks that never get skipped',
      'Errors from manual work, gone',
    ],
    stat: { to: 365, suffix: '', label: 'days a year it keeps running, unattended and consistent' },
  },
  'rpa-and-bots': {
    kickers: { problem: 'The problem', get: 'What the bots do' },
    visual: 'robot',
    phrases: [
      'Retrieving data across your systems',
      'Filling in the forms',
      'Moving information from A to B',
      'No breaks, no mistakes',
    ],
    stat: { to: 24, suffix: '/7', label: 'hours a day, every day, with every action fully traceable' },
  },
  'ai-assistants': {
    kickers: { problem: 'The problem', get: 'What it does for your team' },
    visual: 'robot',
    phrases: [
      'Ask it anything about your business.',
      'Answers grounded in your own data.',
      'Available to your whole team at once.',
      'Your information never leaves.',
    ],
    stat: { to: 100, suffix: '%', label: 'of your data stays in your own environment, never with a third party' },
  },
  'crm-and-business-systems': {
    kickers: { problem: 'The problem', get: 'What you get' },
    phrases: [
      'One place for every customer',
      'It tells you what needs attention',
      'Pipeline, tasks and figures together',
      'A single source of truth',
    ],
    stat: { to: 1, suffix: '', label: 'system in place of the scattered tools your team works around today' },
  },
  'modernising-systems': {
    kickers: { problem: 'The problem', get: 'What changes' },
    visual: 'toggle',
    phrases: [
      'Faster and more stable',
      'The gaps filled in',
      'Your business logic preserved',
      'Ready for what is next',
    ],
  },
  'system-integration': {
    kickers: { problem: 'The problem', get: 'What you get' },
    phrases: [
      'Enter it once',
      'Correct everywhere',
      'No more copy and paste',
      'One connected landscape',
    ],
    stat: { to: 1, suffix: '', label: 'reliable picture across all of your applications at once' },
  },
};

const beforeAfter = {
  before:
    'Slow and unstable, with the features your team needs still missing. Every change feels risky, the knowledge lives in a few people’s heads, and the system holds the business back instead of carrying it.',
  after:
    'Fast and stable, with the gaps filled and the risks reduced. The business logic you built up over the years is preserved and documented, and the system keeps up with the way you work today.',
};

export const loader = ({ params }) => {
  const service = getService(params.slug);

  if (!service) {
    throw new Response('Not found', { status: 404 });
  }

  const { prev, next } = getAdjacentServices(params.slug);
  return json({ service, prev, next });
};

export const meta = ({ data }) => {
  if (!data?.service) {
    return baseMeta({ title: 'Services' });
  }

  return baseMeta({
    title: data.service.title,
    description: data.service.summary,
    prefix: 'Services',
  });
};

const Reveal = ({ children, className }) => {
  const ref = useRef();
  const visible = useInViewport(ref, true, revealOptions);
  return (
    <div ref={ref} className={`${styles.reveal} ${className || ''}`} data-visible={visible}>
      {children}
    </div>
  );
};

const Kicker = ({ children }) => (
  <div className={styles.kickerRow}>
    <Text className={styles.kicker} size="s" as="p">
      {children}
    </Text>
    <span className={styles.kickerLine} aria-hidden />
  </div>
);

const BeforeAfterHero = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className={styles.toggle}>
      <SegmentedControl currentIndex={index} onChange={setIndex}>
        <SegmentedControlOption>The current system</SegmentedControlOption>
        <SegmentedControlOption>After we modernise</SegmentedControlOption>
      </SegmentedControl>
      <div className={styles.togglePanel} key={index}>
        <Text size="l" as="p">
          {index === 0 ? beforeAfter.before : beforeAfter.after}
        </Text>
      </div>
    </div>
  );
};

export const ServiceDetail = () => {
  const { service, prev, next } = useLoaderData();
  const isHydrated = useHydrated();
  const cfg = config[service.slug] || {};

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
            Services
          </Text>
          <Heading id="svc-title" level={1} as="h1" className={styles.heroTitle}>
            <DecoderText text={service.title} delay={300} />
          </Heading>
          <Text size="xl" as="p" className={styles.heroText}>
            {service.statement}
          </Text>
          <Link href="#problem" className={styles.scrollCue}>
            Read on
          </Link>
        </div>
      </Section>

      <Section as="section" id="problem" className={styles.block}>
        <Reveal className={styles.lead}>
          <Kicker>{cfg.kickers?.problem || 'The problem'}</Kicker>
          <Text size="xl" as="p" className={styles.leadText}>
            {service.body[0]}
          </Text>
        </Reveal>
      </Section>

      {cfg.visual === 'robot' && (
        <Section as="section" className={styles.block}>
          <Reveal className={styles.wide}>
            <Image
              className={styles.robot}
              srcSet={`${robotAi} 1199w`}
              width={1199}
              height={637}
              placeholder={robotAi}
              alt="A friendly robot handling questions and tasks across systems."
              sizes={`(max-width: ${media.mobile}px) 100vw, 1000px`}
            />
          </Reveal>
        </Section>
      )}

      {cfg.visual === 'toggle' && (
        <Section as="section" className={styles.block}>
          <Reveal className={styles.wide}>
            <Kicker>Before and after</Kicker>
            <BeforeAfterHero />
          </Reveal>
        </Section>
      )}

      <Section as="section" className={styles.block}>
        <Reveal className={styles.wide}>
          <Kicker>{cfg.kickers?.get || 'What you get'}</Kicker>
          <Text size="l" as="p" className={styles.sectionIntro}>
            {service.body[1]}
          </Text>
          {cfg.phrases && (
            <TypeStream phrases={cfg.phrases} className={styles.typeStream} />
          )}
        </Reveal>
      </Section>

      {cfg.stat && (
        <Section as="section" className={styles.block}>
          <Reveal className={styles.statsWrap}>
            <Kicker>By the numbers</Kicker>
            <div className={styles.stat}>
              <span className={styles.statNum}>
                <CountUp to={cfg.stat.to} suffix={cfg.stat.suffix} />
              </span>
              <span className={styles.statLine} aria-hidden />
              <p className={styles.statLabel}>{cfg.stat.label}</p>
            </div>
          </Reveal>
        </Section>
      )}

      <Section as="section" className={styles.block}>
        <Reveal className={styles.lead}>
          <Kicker>After we deliver</Kicker>
          <Text size="l" as="p" className={styles.leadText}>
            {service.body[2]}
          </Text>
        </Reveal>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.ctaInner}>
          <Heading level={2} as="h2" className={styles.ctaTitle}>
            {service.closing}
          </Heading>
          <Text size="l" as="p" className={styles.ctaText}>
            It starts with a conversation and an analysis, with no obligation. We will show
            you concretely what it delivers for your organisation.
          </Text>
          <Link href="/contact" className={styles.ctaButton}>
            Discuss your project
          </Link>
          <nav className={styles.pager} aria-label="More services">
            {prev ? (
              <Link href={`/services/${prev.slug}`} className={styles.pagerLink}>
                <span className={styles.pagerDir}>Previous</span>
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
                <span className={styles.pagerDir}>Next</span>
                <span className={styles.pagerTitle}>{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Reveal>
      </Section>
      <Footer />
    </>
  );
};
