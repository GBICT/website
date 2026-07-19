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
import { Fragment, Suspense, lazy, useEffect, useRef, useState } from 'react';
import styles from './integration.module.css';

const SLUG = 'system-integration';

const DisplacementSphere = lazy(() =>
  import('~/routes/home/displacement-sphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

const metaService = getService(SLUG);
const revealOptions = { rootMargin: '0px 0px -12% 0px' };

const syncOrder = { id: '4823', name: 'Nord & Co', amount: '€1,240' };

const contextRows = [
  { id: '4822', name: 'Vela Group', amount: '€4,150' },
  { id: '4821', name: 'Acme Corp', amount: '€2,400' },
];

const copy = {
  en: {
    heroTitle: 'Make your systems talk to each other.',
    heroButton: 'See it in action',
    pitchTitle: 'Right now, your people are the integration.',
    syncKicker: 'One order, three systems',
    syncTitle: 'Enter it once. It lands everywhere.',
    syncText:
      'A new order arrives in the webshop. Watch the same order appear in the ERP and in the accounting system seconds later, without anyone retyping a thing.',
    syncCaption:
      'Entered once in the webshop, correct in the ERP and the books moments later.',
    systems: [
      { name: 'Webshop', note: 'the order comes in' },
      { name: 'ERP', note: 'stock and order updated' },
      { name: 'Accounting', note: 'the invoice is created' },
    ],
    detailTitle: 'Enter it once, correct everywhere.',
    benefits: [
      { title: 'Enter data once', text: 'What is entered in one place is instantly correct everywhere else. No double entry, no export and import workarounds.' },
      { title: 'Higher data quality', text: 'One version of the truth across every system, so the numbers finally match and there is far less to reconcile.' },
      { title: 'A reliable picture', text: 'A dependable view across all your applications at once, built to keep running as your systems change.' },
    ],
    ctaTitle: 'Turn your islands into one system.',
    ctaText:
      'Tell us which systems refuse to talk to each other. We map the flows, build the connections, and test them against your real data before they go live.',
  },
  nl: {
    heroTitle: 'Laat je systemen met elkaar praten.',
    heroButton: 'Zie het in actie',
    pitchTitle: 'Nu zijn je mensen de koppeling.',
    syncKicker: 'Eén order, drie systemen',
    syncTitle: 'Eén keer invoeren. Het landt overal.',
    syncText:
      'Er komt een nieuwe order binnen in de webshop. Zie dezelfde order seconden later verschijnen in het ERP en in de boekhouding, zonder dat iemand iets overtikt.',
    syncCaption:
      'Één keer ingevoerd in de webshop, moment later correct in het ERP en de boekhouding.',
    systems: [
      { name: 'Webshop', note: 'er komt een order binnen' },
      { name: 'ERP', note: 'voorraad en order bijgewerkt' },
      { name: 'Boekhouding', note: 'de factuur wordt aangemaakt' },
    ],
    detailTitle: 'Eén keer invoeren, overal correct.',
    benefits: [
      { title: 'Voer data één keer in', text: 'Wat op één plek wordt ingevoerd, is meteen overal correct. Geen dubbel invoeren, geen omwegen via export en import.' },
      { title: 'Hogere datakwaliteit', text: 'Eén versie van de waarheid over elk systeem, zodat de cijfers eindelijk kloppen en er veel minder recht te trekken is.' },
      { title: 'Een betrouwbaar beeld', text: 'Een betrouwbaar beeld over al je applicaties tegelijk, gebouwd om te blijven draaien terwijl je systemen veranderen.' },
    ],
    ctaTitle: 'Maak van je eilanden één systeem.',
    ctaText:
      'Vertel ons welke systemen weigeren met elkaar te praten. We brengen de stromen in kaart, bouwen de koppelingen, en testen ze tegen je echte data voordat ze live gaan.',
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

const SyncFlow = () => {
  const ref = useRef();
  const inView = useInViewport(ref, false, { rootMargin: '0px 0px -20% 0px' });
  const [step, setStep] = useState(0);
  const systems = copy[useLocale()].systems;

  useEffect(() => {
    if (!inView) return;
    if (typeof window !== 'undefined') {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (reduce.matches) {
        setStep(systems.length);
        return;
      }
    }
    const id = setInterval(() => setStep(s => (s + 1) % (systems.length + 1)), 1400);
    return () => clearInterval(id);
  }, [inView, systems.length]);

  const stateFor = index => (step === index ? 'active' : step > index ? 'done' : 'pending');

  return (
    <div className={styles.sync} ref={ref}>
      <div className={styles.panels}>
        {systems.map((system, index) => (
          <Fragment key={system.name}>
            <div className={styles.sysPanel}>
              <div className={styles.sysBar}>
                <span className={styles.sysName}>{system.name}</span>
                <span
                  className={styles.sysDot}
                  data-on={stateFor(index) !== 'pending' ? 'true' : undefined}
                  aria-hidden
                />
              </div>
              <ul className={styles.sysRows}>
                <li className={styles.syncRow} data-state={stateFor(index)}>
                  <span className={styles.rId}>#{syncOrder.id}</span>
                  <span className={styles.rName}>{syncOrder.name}</span>
                  <span className={styles.rAmt}>{syncOrder.amount}</span>
                  <span className={styles.rMark} aria-hidden />
                </li>
                {contextRows.map(row => (
                  <li key={row.id} className={styles.ctxRow}>
                    <span className={styles.rId}>#{row.id}</span>
                    <span className={styles.rName}>{row.name}</span>
                    <span className={styles.rAmt}>{row.amount}</span>
                  </li>
                ))}
              </ul>
              <span className={styles.sysNote}>{system.note}</span>
            </div>
            {index < systems.length - 1 && (
              <span
                className={styles.chev}
                data-on={step > index ? 'true' : undefined}
                aria-hidden
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const Integration = () => {
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
          <Link href="#sync" className={styles.heroButton}>
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

      <Section as="section" id="sync" className={styles.syncSection}>
        <div className={styles.syncInner}>
          <Reveal className={styles.syncHead}>
            <Text className={styles.kicker} size="s" as="p">
              {c.syncKicker}
            </Text>
            <Heading level={3} as="h3" className={styles.syncTitle}>
              {c.syncTitle}
            </Heading>
            <Text size="l" as="p" className={styles.syncText}>
              {c.syncText}
            </Text>
          </Reveal>

          <Reveal className={styles.syncStage}>
            <div className={styles.syncPanel}>
              <SyncFlow />
            </div>
            <Text size="s" as="p" className={styles.syncCaption}>
              {c.syncCaption}
            </Text>
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
