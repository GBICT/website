import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ServicesOverview } from './services-overview';
import { AiStatement } from './ai-statement';
import { WhyUs } from './why-us';
import { ContactCta } from './contact-cta';
import { useEffect, useRef, useState } from 'react';
import styles from './home.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Software, systems and AI for your business',
    description:
      'GBICT builds custom software, business systems, automation and AI, shaped around the way your organisation actually works. You try a working prototype before you commit.',
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const details = useRef();
  const contact = useRef();

  useEffect(() => {
    const sections = [intro, details, contact];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ServicesOverview />
      <AiStatement />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <WhyUs />
      <ContactCta
        sectionRef={contact}
        visible={visibleSections.includes(contact.current)}
        id="contact"
      />
      <Footer />
    </div>
  );
};
