import { DecoderText } from '~/components/decoder-text';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { ThemeProvider } from '~/components/theme-provider';
import { baseMeta } from '~/utils/meta';
import { getServices, getFaqs } from '~/services-data';
import { useLocale } from '~/i18n';
import { Link as RouterLink } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import styles from './services-page.module.css';

const copy = {
  en: {
    eyebrow: 'Services',
    heroTitle: 'We build the software that moves your business forward.',
    intro:
      'From a first app to a full business system, and the automation and AI that make it work. Scroll to move through what we build.',
    scrollCue: 'Scroll',
    servicePrefix: 'Service',
    viewService: 'View this service',
    faqLabel: 'Good to know',
    faqTitle: 'Frequently asked',
    ctaTitle: 'Let’s map what’s possible.',
    ctaText:
      'It starts with a conversation and an analysis, with no obligation. We’ll show you concretely what it delivers for your organisation.',
    ctaButton: 'Start the conversation',
  },
  nl: {
    eyebrow: 'Diensten',
    heroTitle: 'Wij bouwen de software die jouw bedrijf vooruit beweegt.',
    intro:
      'Van een eerste app tot een compleet bedrijfssysteem, en de automatisering en AI die het laten werken. Scroll om door onze diensten te bewegen.',
    scrollCue: 'Scroll',
    servicePrefix: 'Dienst',
    viewService: 'Bekijk deze dienst',
    faqLabel: 'Goed om te weten',
    faqTitle: 'Veelgestelde vragen',
    ctaTitle: 'Laten we in kaart brengen wat mogelijk is.',
    ctaText:
      'Het begint met een gesprek en een analyse, vrijblijvend. We laten je concreet zien wat het jouw organisatie oplevert.',
    ctaButton: 'Start het gesprek',
  },
};

export const meta = () => {
  return baseMeta({
    title: 'Services',
    description:
      'Custom software, automation and AI, built around how your organisation works. From analysis to delivery.',
  });
};

const Journey = ({ c, services }) => {
  const ref = useRef();
  const videoRef = useRef();
  const [active, setActive] = useState(0);
  const total = services.length + 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const dist = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / (dist || 1)));
      if (videoRef.current && !reduce) {
        const scale = 1 + p * 0.42;
        const drift = Math.sin(p * Math.PI * 2) * 3.5;
        const rot = Math.sin(p * Math.PI * 2) * 2;
        videoRef.current.style.transform = `scale(${scale}) translate3d(${drift}%, 0, 0) rotate(${rot}deg)`;
      }
      const idx = Math.min(total - 1, Math.round(p * (total - 1)));
      setActive(prev => (prev === idx ? prev : idx));
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
  }, [total]);

  return (
    <section
      ref={ref}
      className={styles.journey}
      style={{ height: `${total * 80}vh` }}
      aria-label="Services"
    >
      <div className={styles.sticky}>
        <video
          ref={videoRef}
          className={styles.bgVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/services/particles-hero.mp4" type="video/mp4" />
        </video>
        <span className={styles.bgScrim} aria-hidden />

        <div className={styles.panels}>
          <div className={styles.panel} data-active={active === 0 ? 'true' : undefined}>
            <Text className={styles.pEyebrow} size="s" as="p">
              {c.eyebrow}
            </Text>
            <Heading level={1} as="h1" className={styles.pTitle}>
              <DecoderText text={c.heroTitle} delay={300} />
            </Heading>
            <Text size="xl" as="p" className={styles.pIntro}>
              {c.intro}
            </Text>
          </div>

          {services.map((service, index) => (
            <div
              key={service.slug}
              className={styles.panel}
              data-active={active === index + 1 ? 'true' : undefined}
            >
              <Text className={styles.pNum} size="s" as="p">
                {c.servicePrefix} {String(index + 1).padStart(2, '0')}
              </Text>
              <Heading level={2} as="h2" className={styles.pServiceTitle}>
                {service.title}
              </Heading>
              <Text size="l" as="p" className={styles.pIntro}>
                {service.summary}
              </Text>
              <RouterLink
                to={`/services/${service.slug}`}
                className={styles.pLink}
                prefetch="intent"
              >
                {c.viewService}
                <span aria-hidden> &rarr;</span>
              </RouterLink>
            </div>
          ))}
        </div>

        <div className={styles.progress} aria-hidden>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={styles.dot} data-on={i === active ? 'true' : undefined} />
          ))}
        </div>

        <span
          className={styles.scrollHint}
          data-hide={active !== 0 ? 'true' : undefined}
          aria-hidden
        >
          {c.scrollCue}
        </span>
      </div>
    </section>
  );
};

export const ServicesPage = () => {
  const locale = useLocale();
  const c = copy[locale];
  const services = getServices(locale);
  const faqs = getFaqs(locale);

  return (
    <ThemeProvider theme="dark" data-invert as="div" className={styles.darkPage}>
      <Journey c={c} services={services} />

      <Section as="section" className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.faqInner}>
          <div className={styles.faqHead}>
            <Text className={styles.label} size="s" as="p">
              {c.faqLabel}
            </Text>
            <Heading id="faq-title" level={3} as="h2">
              {c.faqTitle}
            </Heading>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details key={index} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  <span>{faq.question}</span>
                  <svg
                    className={styles.faqIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M8 3v10M3 8h10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <Text size="m" as="p" className={styles.faqAnswer}>
                  {faq.answer}
                </Text>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section as="section" className={styles.cta}>
        <div className={styles.ctaInner}>
          <Heading level={2} as="h2" className={styles.ctaTitle}>
            {c.ctaTitle}
          </Heading>
          <Text size="l" as="p" className={styles.ctaText}>
            {c.ctaText}
          </Text>
          <RouterLink to="/contact" className={styles.ctaButton} prefetch="intent">
            {c.ctaButton}
            <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
              <path
                d="M0 4h23M19 1l4 3-4 3"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </RouterLink>
        </div>
      </Section>

      <Footer />
    </ThemeProvider>
  );
};
