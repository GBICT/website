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
import { Suspense, lazy, useRef } from 'react';
import styles from './custom-software.module.css';

const SLUG = 'custom-software';

const DisplacementSphere = lazy(() =>
  import('~/routes/home/displacement-sphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

const metaService = getService(SLUG);
const revealOptions = { rootMargin: '0px 0px -12% 0px' };

const copy = {
  en: {
    k: {
      problem: 'The problem',
      whatYouGet: 'What you get',
      builtToFit: 'Built to keep fitting',
      numbers: 'By the numbers',
      after: 'After we deliver',
    },
    getTitle: 'Software that fits, and keeps fitting',
    problem: [
      'Most businesses do not really choose the way they work. The software they bought chose it for them. A standard package arrives with fixed assumptions about how you should operate, and from day one your team bends its process to fit the tool. The parts that do not fit turn into workarounds: a spreadsheet on the side, a step everyone knows to skip, a report that gets rebuilt by hand every single week.',
      'None of it is written down, and all of it depends on a few people remembering how it really works. Over time the tool you bought to save time quietly becomes the thing that slows you down. Custom software solves that at the root. Instead of shaping your business around the software, we shape the software around your business.',
    ],
    valuePhrases: [
      'Shaped around the way you actually work',
      'A working prototype before we build',
      'A modern stack, and the code stays yours',
      'Ongoing support, long after launch',
    ],
    whatYouGet: [
      'The result is not a generic system with your logo on it. It is software shaped around your operation, whether that is an app your customers use every day, an internal tool that replaces a stack of spreadsheets, or a platform that ties your whole business together. It does the things your team actually does, in the order they actually do them.',
      'It is built to last and built to grow. New features, new locations and new ways of working can be added without starting over, because the foundation was designed for it. And because we build it for you, it stays yours. The code, the data and the direction remain in your hands, with no vendor holding the keys.',
    ],
    stats: [
      { to: 12, suffix: '', label: 'weeks from the first conversation to a working version your team is actually using' },
      { to: 365, suffix: '', label: 'days a year we keep it running, monitored and supported, because launch is the start' },
      { to: 100, suffix: '%', label: 'yours to run, change and move, with the code and data in your own hands' },
    ],
    afterDeliver: [
      'Going live is the start, not the finish line. Your business keeps moving, so the software moves with it. We stay on to maintain it, fix the small things quickly, and build out the next features as your needs change.',
      'You can lean on us for as much or as little as you want, from light maintenance to a team that keeps developing the product alongside you. Either way you are never left with software that slowly falls behind, and you are never locked in, because everything we build is yours to take anywhere.',
    ],
    ctaText:
      'It starts with a conversation and an analysis, with no obligation. We will show you concretely what it delivers for your organisation.',
  },
  nl: {
    k: {
      problem: 'Het probleem',
      whatYouGet: 'Wat je krijgt',
      builtToFit: 'Gebouwd om te blijven passen',
      numbers: 'In cijfers',
      after: 'Na de oplevering',
    },
    getTitle: 'Software die past, en blijft passen',
    problem: [
      'De meeste bedrijven kiezen niet echt hoe ze werken. De software die ze kochten koos het voor ze. Een standaardpakket komt binnen met vaste aannames over hoe jij zou moeten werken, en vanaf dag één plooit je team zijn proces naar de tool. De stukken die niet passen worden omwegen: een spreadsheet ernaast, een stap die iedereen weet over te slaan, een rapport dat elke week met de hand opnieuw wordt gemaakt.',
      'Niks ervan staat opgeschreven, en het hangt allemaal af van een paar mensen die onthouden hoe het echt werkt. Na verloop van tijd wordt de tool die je kocht om tijd te besparen stilletjes het ding dat je vertraagt. Software op maat lost dat bij de wortel op. In plaats van je bedrijf rond de software te vormen, vormen wij de software rond jouw bedrijf.',
    ],
    valuePhrases: [
      'Gevormd rond hoe jij echt werkt',
      'Een werkend prototype voordat we bouwen',
      'Een moderne stack, en de code blijft van jou',
      'Ondersteuning, lang na de lancering',
    ],
    whatYouGet: [
      'Het resultaat is geen generiek systeem met jouw logo erop. Het is software gevormd rond jouw operatie, of dat nu een app is die je klanten elke dag gebruiken, een interne tool die een stapel spreadsheets vervangt, of een platform dat je hele bedrijf aan elkaar knoopt. Het doet de dingen die je team echt doet, in de volgorde waarin ze het echt doen.',
      'Het is gebouwd om te blijven en gebouwd om te groeien. Nieuwe functies, nieuwe locaties en nieuwe manieren van werken kunnen worden toegevoegd zonder opnieuw te beginnen, omdat het fundament daarvoor is ontworpen. En omdat we het voor jou bouwen, blijft het van jou. De code, de data en de richting blijven in jouw handen, zonder een leverancier die de sleutels vasthoudt.',
    ],
    stats: [
      { to: 12, suffix: '', label: 'weken van het eerste gesprek tot een werkende versie die je team echt gebruikt' },
      { to: 365, suffix: '', label: 'dagen per jaar houden we het draaiend, gemonitord en ondersteund, want de lancering is het begin' },
      { to: 100, suffix: '%', label: 'van jou om te draaien, aan te passen en te verplaatsen, met de code en data in je eigen handen' },
    ],
    afterDeliver: [
      'Live gaan is het begin, niet de finish. Je bedrijf blijft in beweging, dus de software beweegt mee. We blijven het onderhouden, lossen de kleine dingen snel op, en bouwen de volgende functies uit naarmate je behoeften veranderen.',
      'Je kunt op ons leunen voor zoveel of zo weinig als je wilt, van licht onderhoud tot een team dat het product samen met jou blijft doorontwikkelen. Hoe dan ook blijf je nooit achter met software die langzaam achterop raakt, en zit je nooit vast, want alles wat we bouwen is van jou om overal mee naartoe te nemen.',
    ],
    ctaText:
      'Het begint met een gesprek en een analyse, vrijblijvend. We laten je concreet zien wat het jouw organisatie oplevert.',
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

export const CustomSoftware = () => {
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
            <DecoderText text={service.title} delay={300} />
          </Heading>
          <Text size="xl" as="p" className={styles.heroText}>
            {service.statement}
          </Text>
          <Link href="#problem" className={styles.scrollCue}>
            {ui.common.readOn}
          </Link>
        </div>
      </Section>

      <Section as="section" id="problem" className={styles.block}>
        <Reveal className={styles.lead}>
          <Kicker>{c.k.problem}</Kicker>
          {c.problem.map((paragraph, index) => (
            <Text key={index} size={index === 0 ? 'xl' : 'l'} as="p" className={styles.leadText}>
              {paragraph}
            </Text>
          ))}
        </Reveal>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.wide}>
          <Kicker>{c.k.whatYouGet}</Kicker>
          <Heading level={3} as="h2" className={styles.sectionTitle}>
            <DecoderText text={c.getTitle} />
          </Heading>
          <Text size="l" as="p" className={styles.sectionIntro}>
            {c.whatYouGet[0]}
          </Text>
          <TypeStream phrases={c.valuePhrases} className={styles.typeStream} />
        </Reveal>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.wide}>
          <Kicker>{c.k.builtToFit}</Kicker>
          <Text size="l" as="p" className={styles.sectionIntro}>
            {c.whatYouGet[1]}
          </Text>
        </Reveal>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.statsWrap}>
          <Kicker>{c.k.numbers}</Kicker>
          <div className={styles.stats}>
            {c.stats.map(stat => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statNum}>
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </span>
                <span className={styles.statLine} aria-hidden />
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.lead}>
          <Kicker>{c.k.after}</Kicker>
          {c.afterDeliver.map((paragraph, index) => (
            <Text key={index} size={index === 0 ? 'xl' : 'l'} as="p" className={styles.leadText}>
              {paragraph}
            </Text>
          ))}
        </Reveal>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.ctaInner}>
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
        </Reveal>
      </Section>
      <Footer />
    </>
  );
};
