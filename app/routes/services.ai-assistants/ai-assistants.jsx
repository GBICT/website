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
import { Suspense, lazy, useRef } from 'react';
import styles from './ai-assistants.module.css';

const SLUG = 'ai-assistants';

const DisplacementSphere = lazy(() =>
  import('~/routes/home/displacement-sphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

const metaService = getService(SLUG);
const revealOptions = { rootMargin: '0px 0px -12% 0px' };

const copy = {
  en: {
    heroTitle: 'Put an AI to work on everything you know.',
    heroText:
      'A custom AI assistant, trained on your own documents and data, answering your team and your customers in seconds. Inside your own environment, never anyone else’s.',
    pitchTitle: 'It knows your business, because we build it on your business.',
    pitchText:
      'Not a generic chatbot with your logo on it. We train it on your own policies, products, data and processes, so it answers the way someone who knows your company inside out would answer, only in seconds and never off sick.',
    benefits: [
      { stat: 100, suffix: '%', title: 'Trained on your own data', text: 'It answers from your own documents, policies and records, not the open internet, so every answer actually fits your business.' },
      { stat: 24, suffix: '/7', title: 'Always answering', text: 'Your customers and your team get a clear answer straight away, in your own tone, by chat or by voice, day and night.' },
      { stat: 1, suffix: '', title: 'Assistant for the whole team', text: 'No licence per person. One assistant serves everyone, so the cost never climbs as your team grows.' },
      { stat: 0, suffix: '', title: 'Data leaves your environment', text: 'Everything runs inside your own environment. No business data goes to a third party, so you stay compliant with the GDPR.' },
    ],
    ctaTitle: 'Ready to put your knowledge to work?',
    ctaText:
      'It starts with a conversation and an analysis, with no obligation. We build it on your knowledge, in your environment, and show you exactly what it delivers.',
  },
  nl: {
    heroTitle: 'Zet AI aan het werk op alles wat je weet.',
    heroText:
      'Een AI-assistent op maat, getraind op je eigen documenten en data, die je team en je klanten binnen seconden antwoord geeft. Binnen je eigen omgeving, nooit die van een ander.',
    pitchTitle: 'Het kent je bedrijf, omdat we het op je bedrijf bouwen.',
    pitchText:
      'Geen generieke chatbot met jouw logo erop. We trainen hem op je eigen beleid, producten, data en processen, zodat hij antwoordt zoals iemand die je bedrijf door en door kent zou antwoorden, alleen in seconden en nooit ziek.',
    benefits: [
      { stat: 100, suffix: '%', title: 'Getraind op je eigen data', text: 'Hij antwoordt vanuit je eigen documenten, beleid en gegevens, niet het open internet, zodat elk antwoord echt bij je bedrijf past.' },
      { stat: 24, suffix: '/7', title: 'Altijd antwoord', text: 'Je klanten en je team krijgen meteen een helder antwoord, in je eigen toon, via chat of spraak, dag en nacht.' },
      { stat: 1, suffix: '', title: 'Eén assistent voor het hele team', text: 'Geen licentie per persoon. Eén assistent bedient iedereen, zodat de kosten nooit stijgen naarmate je team groeit.' },
      { stat: 0, suffix: '', title: 'Data verlaat je omgeving', text: 'Alles draait binnen je eigen omgeving. Er gaat geen bedrijfsdata naar een derde partij, zodat je voldoet aan de AVG.' },
    ],
    ctaTitle: 'Klaar om je kennis aan het werk te zetten?',
    ctaText:
      'Het begint met een gesprek en een analyse, vrijblijvend. We bouwen het op jouw kennis, in jouw omgeving, en laten je precies zien wat het oplevert.',
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

export const AiAssistants = () => {
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
            {c.heroText}
          </Text>
          <Link href="/contact" className={styles.heroButton}>
            {ui.common.discuss}
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
                {c.pitchText}
              </Text>
            </>
          )}
        </Reveal>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.stats}>
          {c.benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={styles.stat}
              style={{ '--delay': `${index * 130}ms` }}
            >
              <span className={styles.statNum}>
                <CountUp to={benefit.stat} suffix={benefit.suffix} />
              </span>
              <div className={styles.statBody}>
                <Heading level={4} as="h3" className={styles.statTitle}>
                  {benefit.title}
                </Heading>
                <Text size="l" as="p" className={styles.statText}>
                  {benefit.text}
                </Text>
              </div>
            </div>
          ))}
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
