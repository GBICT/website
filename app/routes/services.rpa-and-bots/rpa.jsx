import { CountUp } from '~/components/count-up/count-up';
import { DecoderText } from '~/components/decoder-text';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { baseMeta } from '~/utils/meta';
import { getService, getAdjacentServices } from '~/services-data';
import { useInViewport } from '~/hooks';
import { useHydrated } from '~/hooks/useHydrated';
import { useLocale, useUi } from '~/i18n';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import styles from './rpa.module.css';

const SLUG = 'rpa-and-bots';

const DisplacementSphere = lazy(() =>
  import('~/routes/home/displacement-sphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

const metaService = getService(SLUG);

const revealOptions = { rootMargin: '0px 0px -12% 0px' };

const copy = {
  en: {
    heroTitle: 'Software that does the work between your systems.',
    heroButton: 'See it run',
    pitchTitle: 'Some work does not live in one system.',
    flowKicker: 'One loop, over and over',
    flowTitle: 'The bot carries the work from screen to screen.',
    flowText:
      'It picks up the data in one system, enters it in the next and updates the last, exactly as one of your people would. Then it does it again, without stopping.',
    nodes: [
      { name: 'Inbox', note: 'A new order arrives' },
      { name: 'Your ERP', note: 'The bot enters it' },
      { name: 'Finance sheet', note: 'The row is updated' },
    ],
    stepLabels: ['Reads the new order', 'Enters it in the ERP', 'Updates the sheet'],
    loopLabel: 'and again',
    stat: { tasks: 'tasks handled today', running: 'running, no breaks', skipped: 'steps skipped' },
    detailTitle: 'A decision where it needs one.',
    benefits: [
      {
        title: 'It runs day and night',
        text: 'The bot works around the clock and scales with your volume, so a busy week never means hiring or overtime.',
      },
      {
        title: 'It works on the systems you already have',
        text: 'No need to replace anything or wait for a vendor to build an integration. The bot works on top of the screens your team uses today.',
      },
      {
        title: 'Every action is identical and traceable',
        text: 'The same steps, performed exactly the same way every time, with a full log of what happened and when. No slips, no forgotten cases.',
      },
    ],
    ctaTitle: 'Hand the repetitive work to a bot.',
    ctaText:
      'Tell us which process eats your hours. We map it, build a bot that runs it on your own systems, and test it against your real cases before it goes live.',
  },
  nl: {
    heroTitle: 'Software die het werk tussen je systemen doet.',
    heroButton: 'Zie het draaien',
    pitchTitle: 'Sommig werk zit niet in één systeem.',
    flowKicker: 'Eén lus, keer op keer',
    flowTitle: 'De bot draagt het werk van scherm naar scherm.',
    flowText:
      'Hij pakt de data in het ene systeem, zet het in het volgende en werkt het laatste bij, precies zoals een van je mensen zou doen. Daarna doet hij het opnieuw, zonder te stoppen.',
    nodes: [
      { name: 'Inbox', note: 'Er komt een order binnen' },
      { name: 'Je ERP', note: 'De bot voert het in' },
      { name: 'Financiële sheet', note: 'De regel wordt bijgewerkt' },
    ],
    stepLabels: ['Leest de nieuwe order', 'Zet het in het ERP', 'Werkt de sheet bij'],
    loopLabel: 'en opnieuw',
    stat: { tasks: 'taken vandaag afgehandeld', running: 'draaiend, geen pauzes', skipped: 'stappen overgeslagen' },
    detailTitle: 'Een beslissing waar er een nodig is.',
    benefits: [
      {
        title: 'Het draait dag en nacht',
        text: 'De bot werkt de klok rond en schaalt mee met je volume, zodat een drukke week nooit betekent aannemen of overwerken.',
      },
      {
        title: 'Het werkt op de systemen die je al hebt',
        text: 'Niks vervangen of wachten tot een leverancier een koppeling bouwt. De bot werkt bovenop de schermen die je team vandaag gebruikt.',
      },
      {
        title: 'Elke actie is identiek en te herleiden',
        text: 'Dezelfde stappen, elke keer op precies dezelfde manier uitgevoerd, met een volledig logboek van wat er is gebeurd en wanneer. Geen missers, geen vergeten gevallen.',
      },
    ],
    ctaTitle: 'Geef het repetitieve werk aan een bot.',
    ctaText:
      'Vertel ons welk proces je uren opslokt. We brengen het in kaart, bouwen een bot die het op je eigen systemen draait, en testen het tegen je echte gevallen voordat het live gaat.',
  },
};

export const meta = () => {
  return baseMeta({
    title: metaService.title,
    description: metaService.summary,
    prefix: 'Services',
  });
};

const Reveal = ({ children, className }) => {
  const ref = useRef();
  const visible = useInViewport(ref, true, revealOptions);
  return (
    <div ref={ref} className={`${styles.reveal} ${className || ''}`} data-visible={visible}>
      {typeof children === 'function' ? children(visible) : children}
    </div>
  );
};

const BotFlow = () => {
  const ref = useRef();
  const inView = useInViewport(ref, false, { rootMargin: '0px 0px -20% 0px' });
  const [step, setStep] = useState(0);
  const c = copy[useLocale()];
  const { nodes, stepLabels } = c;

  useEffect(() => {
    if (!inView) return;
    if (typeof window !== 'undefined') {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (reduce.matches) return;
    }
    const id = setInterval(() => setStep(s => (s + 1) % nodes.length), 1700);
    return () => clearInterval(id);
  }, [inView, nodes.length]);

  return (
    <div className={styles.flow} ref={ref}>
      <div className={styles.track}>
        <span className={styles.rail} aria-hidden>
          <span className={styles.packet} style={{ '--i': step }} />
        </span>
        <div className={styles.nodes}>
          {nodes.map((node, index) => (
            <div
              key={node.name}
              className={styles.node}
              data-on={index === step ? 'true' : undefined}
            >
              <div className={styles.screen} aria-hidden>
                <span className={styles.screenBar} />
                <span className={styles.line} data-w="l" />
                <span className={styles.line} data-w="m" data-live />
                <span className={styles.line} data-w="s" />
              </div>
              <span className={styles.nodeName}>{node.name}</span>
              <span className={styles.nodeNote}>{node.note}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.steps}>
        {stepLabels.map((label, index) => (
          <span
            key={label}
            className={styles.step}
            data-on={index === step ? 'true' : undefined}
          >
            {label}
          </span>
        ))}
        <span className={styles.step} data-loop>
          {c.loopLabel}
        </span>
      </div>
    </div>
  );
};

export const Rpa = () => {
  const isHydrated = useHydrated();
  const locale = useLocale();
  const ui = useUi();
  const c = copy[locale];
  const service = getService(SLUG, locale);
  const { prev, next } = getAdjacentServices(SLUG, locale);

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
            <DecoderText text={c.heroTitle} delay={300} />
          </Heading>
          <Text size="xl" as="p" className={styles.heroText}>
            {service.statement}
          </Text>
          <Link href="#flow" className={styles.heroButton}>
            {c.heroButton}
          </Link>
        </div>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.pitch}>
          {visible => (
            <>
              <Heading level={2} as="h2" className={styles.pitchTitle}>
                <DecoderText text={c.pitchTitle} start={visible} />
              </Heading>
              <Text size="l" as="p" className={styles.pitchText}>
                {service.body[0]}
              </Text>
            </>
          )}
        </Reveal>
      </Section>

      <Section as="section" id="flow" className={styles.flowSection}>
        <div className={styles.flowInner}>
          <Reveal className={styles.flowHead}>
            <Text className={styles.kicker} size="s" as="p">
              {c.flowKicker}
            </Text>
            <Heading level={3} as="h3" className={styles.flowTitle}>
              {c.flowTitle}
            </Heading>
            <Text size="l" as="p" className={styles.flowText}>
              {c.flowText}
            </Text>
          </Reveal>

          <Reveal className={styles.flowStage}>
            <BotFlow />
          </Reveal>

          <Reveal className={styles.flowStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>
                <CountUp to={1240} />
              </span>
              <span className={styles.statLabel}>{c.stat.tasks}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>24/7</span>
              <span className={styles.statLabel}>{c.stat.running}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>
                <CountUp to={0} />
              </span>
              <span className={styles.statLabel}>{c.stat.skipped}</span>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.detail}>
          {visible => (
            <>
              <Heading level={2} as="h2" className={styles.detailTitle}>
                <DecoderText text={c.detailTitle} start={visible} />
              </Heading>
              <Text size="l" as="p" className={styles.detailText}>
                {service.body[1]}
              </Text>
            </>
          )}
        </Reveal>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.list}>
          <div className={styles.items}>
            {c.benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={styles.item}
                style={{ '--delay': `${index * 120}ms` }}
              >
                <Heading level={4} as="h3" className={styles.itemTitle}>
                  {benefit.title}
                </Heading>
                <Text size="l" as="p" className={styles.itemText}>
                  {benefit.text}
                </Text>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section as="section" className={styles.cta}>
        <Reveal className={styles.ctaInner}>
          {visible => (
            <>
              <Heading level={2} as="h2" className={styles.ctaTitle}>
                <DecoderText text={c.ctaTitle} start={visible} />
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
            </>
          )}
        </Reveal>
      </Section>
      <Footer />
    </>
  );
};
