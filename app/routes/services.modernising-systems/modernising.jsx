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
import { Suspense, lazy, useRef, useState } from 'react';
import styles from './modernising.module.css';

const SLUG = 'modernising-systems';

const DisplacementSphere = lazy(() =>
  import('~/routes/home/displacement-sphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

const metaService = getService(SLUG);
const revealOptions = { rootMargin: '0px 0px -12% 0px' };

const orders = [
  { id: '4821', name: 'Acme Corp', status: 'Paid', amount: '€2,400' },
  { id: '4820', name: 'Bright Labs', status: 'Pending', amount: '€880' },
  { id: '4819', name: 'Vela Group', status: 'Paid', amount: '€4,150' },
  { id: '4818', name: 'Nord & Co', status: 'Overdue', amount: '€1,020' },
];

const copy = {
  en: {
    heroTitle: 'Not every old system needs replacing.',
    heroButton: 'See the difference',
    pitchTitle: 'Before you tear it down, ask a simpler question.',
    compare: {
      kicker: 'Before and after',
      title: 'The same system, brought up to date.',
      text: 'Drag the handle. On the left, the system as it was. On the right, the same system after we modernised it. Same data, same logic, faster and clearer.',
      hint: 'Faster, stable and secure, on the system you already own.',
    },
    mock: {
      newTitle: 'Orders',
      oldTitle: 'ORDERS.EXE · SYSTEM v2.1',
      pillOld: 'load 12.4s',
      pillNew: 'Live · 0.4s',
      footOld: '4 records · last sync unknown',
      footNew: '4 orders · synced just now',
      before: 'Before',
      after: 'After',
      dragAria: 'Drag to compare before and after',
      status: { Paid: 'Paid', Pending: 'Pending', Overdue: 'Overdue' },
    },
    detailTitle: 'We improve where it counts.',
    quote:
      'Sometimes a rebuild really is the wiser choice. When it is, we say so, instead of defaulting to the most expensive option.',
    benefits: [
      { title: 'Your investment preserved', text: 'Years of business logic and the systems your team already knows stay in place. We build on what works instead of writing it off.' },
      { title: 'Lower risk, no standstill', text: 'We improve in careful steps while your operation keeps running, so there is no big bang cutover and no week of downtime.' },
      { title: 'Honest advice, either way', text: 'If modernising is the smart move, we do it. If a rebuild is genuinely wiser, we tell you, with the reasoning to back it up.' },
    ],
    ctaTitle: 'Let us look under the hood first.',
    ctaText:
      'We assess what you have, map where the real bottlenecks are, and give you a clear plan and an honest recommendation before anything gets rebuilt.',
  },
  nl: {
    heroTitle: 'Niet elk oud systeem hoeft vervangen te worden.',
    heroButton: 'Zie het verschil',
    pitchTitle: 'Voordat je het afbreekt, stel een simpelere vraag.',
    compare: {
      kicker: 'Voor en na',
      title: 'Hetzelfde systeem, weer bij de tijd.',
      text: 'Sleep de handle. Links het systeem zoals het was. Rechts hetzelfde systeem nadat we het moderniseerden. Dezelfde data, dezelfde logica, sneller en helderder.',
      hint: 'Sneller, stabiel en veilig, op het systeem dat je al hebt.',
    },
    mock: {
      newTitle: 'Orders',
      oldTitle: 'ORDERS.EXE · SYSTEEM v2.1',
      pillOld: 'laadt 12,4s',
      pillNew: 'Live · 0,4s',
      footOld: '4 records · laatste sync onbekend',
      footNew: '4 orders · zojuist gesynct',
      before: 'Voor',
      after: 'Na',
      dragAria: 'Sleep om voor en na te vergelijken',
      status: { Paid: 'Betaald', Pending: 'In behandeling', Overdue: 'Te laat' },
    },
    detailTitle: 'We verbeteren waar het telt.',
    quote:
      'Soms is een herbouw echt de verstandigere keuze. Als dat zo is, zeggen we dat, in plaats van standaard voor de duurste optie te kiezen.',
    benefits: [
      { title: 'Je investering behouden', text: 'Jaren aan bedrijfslogica en de systemen die je team al kent blijven staan. We bouwen voort op wat werkt in plaats van het af te schrijven.' },
      { title: 'Minder risico, geen stilstand', text: 'We verbeteren in zorgvuldige stappen terwijl je operatie doorloopt, dus geen big bang en geen week downtime.' },
      { title: 'Eerlijk advies, hoe dan ook', text: 'Als moderniseren de slimme zet is, doen we dat. Als een herbouw echt verstandiger is, zeggen we dat, met de onderbouwing erbij.' },
    ],
    ctaTitle: 'Laten we eerst onder de motorkap kijken.',
    ctaText:
      'We beoordelen wat je hebt, brengen in kaart waar de echte knelpunten zitten, en geven je een helder plan en een eerlijk advies voordat er iets wordt herbouwd.',
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

const Screen = ({ variant }) => {
  const isOld = variant === 'old';
  const m = copy[useLocale()].mock;
  return (
    <div className={isOld ? styles.screenOld : styles.screenNew} aria-hidden>
      <div className={styles.scBar}>
        <span className={styles.scTitle}>{isOld ? m.oldTitle : m.newTitle}</span>
        <span className={isOld ? styles.scPillOld : styles.scPillNew}>
          {isOld ? m.pillOld : m.pillNew}
        </span>
      </div>
      <ul className={styles.scRows}>
        {orders.map(order => (
          <li key={order.id} className={styles.scRow}>
            <span className={styles.scId}>#{order.id}</span>
            <span className={styles.scName}>{order.name}</span>
            <span className={styles.scStatus} data-status={order.status}>
              {m.status[order.status]}
            </span>
            <span className={styles.scAmount}>{order.amount}</span>
          </li>
        ))}
      </ul>
      <div className={styles.scFoot}>{isOld ? m.footOld : m.footNew}</div>
    </div>
  );
};

const BeforeAfter = () => {
  const ref = useRef();
  const dragging = useRef(false);
  const [pos, setPos] = useState(58);
  const m = copy[useLocale()].mock;

  const setFromX = clientX => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(5, Math.min(95, next)));
  };

  const onDown = event => {
    dragging.current = true;
    setFromX(event.clientX);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const onMove = event => {
    if (dragging.current) setFromX(event.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };
  const onKey = event => {
    if (event.key === 'ArrowLeft') setPos(p => Math.max(5, p - 4));
    if (event.key === 'ArrowRight') setPos(p => Math.min(95, p + 4));
  };

  return (
    <div
      className={styles.ba}
      ref={ref}
      style={{ '--pos': `${pos}%` }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
    >
      <div className={styles.baBase}>
        <Screen variant="new" />
      </div>
      <div className={styles.baTop}>
        <Screen variant="old" />
      </div>
      <span className={styles.baLabelOld} aria-hidden>
        {m.before}
      </span>
      <span className={styles.baLabelNew} aria-hidden>
        {m.after}
      </span>
      <button
        type="button"
        className={styles.baHandle}
        role="slider"
        aria-label={m.dragAria}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
      >
        <span className={styles.baGrip} aria-hidden />
      </button>
    </div>
  );
};

export const Modernising = () => {
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
          <Link href="#compare" className={styles.heroButton}>
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

      <Section as="section" id="compare" className={styles.compareSection}>
        <div className={styles.compareInner}>
          <Reveal className={styles.compareHead}>
            <Text className={styles.kicker} size="s" as="p">
              {c.compare.kicker}
            </Text>
            <Heading level={3} as="h3" className={styles.compareTitle}>
              {c.compare.title}
            </Heading>
            <Text size="l" as="p" className={styles.compareText}>
              {c.compare.text}
            </Text>
          </Reveal>

          <Reveal className={styles.compareStage}>
            <BeforeAfter />
            <Text size="s" as="p" className={styles.compareHint}>
              {c.compare.hint}
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

      <Section as="section" className={styles.quoteSection}>
        <Reveal className={styles.quoteInner}>
          <Heading level={3} as="p" className={styles.quote}>
            {c.quote}
          </Heading>
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
