import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useEffect, useRef, useState } from 'react';
import { cssProps } from '~/utils/style';
import styles from './clients.module.css';

/**
 * Clients we've served, shown as a slowly rotating 3D ring of logos orbiting
 * a globe — on every screen size, including mobile. Hover (mouse) or tap
 * (touch) a logo to pause the ring and reveal a short blurb. Tiles are not
 * links, so a tap only toggles the blurb — it never navigates away.
 * Blurbs marked "verify" are placeholders; refine with the real scope.
 */
const clients = [
  {
    name: 'C2U Network',
    blurb:
      'We built the Mobiscout app, set up Power BI dashboards in kiosk mode and rolled out MDM across their devices with a full migration.',
    logo: '/clients/c2u.png',
  },
  {
    name: 'Zorgcentra Meerlanden',
    blurb:
      'We developed custom software for their care processes, guided the team through it and handled a complete data migration.',
    logo: '/clients/meerlanden.png',
  },
  {
    name: 'Boomerangzorg',
    blurb:
      'We deliver and manage all of their systems and software end to end, with day-to-day support.',
    logo: '/clients/boomerang-wit.svg',
  },
  {
    name: 'Wobouw',
    blurb:
      'We designed and built their native mobile app and shipped it to the App Store.',
    logo: '/clients/wobouw.png',
  },
  {
    name: 'TMA Logistics',
    blurb:
      'We set up their service desk from the ground up and automated the workflows behind it.',
    logo: '/clients/tma.jpg',
  },
  {
    name: 'Passly Wallet',
    blurb: 'We support the development of their digital wallet platform.', // verify
    logo: null,
  },
  {
    name: 'GBICT Energy',
    blurb:
      'IT partner for their energy operations — infrastructure, support and management.', // verify
    logo: '/clients/gbict-energy.png',
  },
  {
    name: 'FDMG',
    blurb: 'Managed IT: infrastructure, support and day-to-day management.', // verify
    logo: '/clients/fdmg.png',
  },
  {
    name: 'TDM Systems',
    blurb: 'IT advice, management and systems integration.', // verify
    logo: '/clients/tdm.png',
    invert: true, // dark wordmark on transparent bg → force to white on the dark tile
  },
];

const anglePerTile = 360 / clients.length;

function ClientLogo({ client }) {
  if (!client.logo) {
    return <span className={styles.tileText}>{client.name}</span>;
  }

  return (
    <img
      className={styles.logo}
      data-invert={client.invert}
      src={client.logo}
      alt={`${client.name} logo`}
      draggable={false}
    />
  );
}

export function Clients({ id, visible, sectionRef, ...rest }) {
  const titleId = `${id}-title`;
  // Which tile is "revealed" by a click/tap. The ring pauses while a tile is
  // active, then resumes automatically after 5 seconds.
  const [active, setActive] = useState(null);
  const resumeTimer = useRef();

  useEffect(() => {
    if (active === null) return undefined;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setActive(null), 5000);
    return () => clearTimeout(resumeTimer.current);
  }, [active]);

  const activeClient = active !== null ? clients[active] : null;

  return (
    <Section
      className={styles.clients}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.tag} aria-hidden>
            <Divider
              notchWidth="64px"
              notchHeight="8px"
              collapsed={!visible}
              collapseDelay={0}
            />
            <span className={styles.tagText} data-visible={visible}>
              Our clients
            </span>
          </div>
          <Heading
            level={2}
            as="h2"
            id={titleId}
            className={styles.title}
            data-visible={visible}
          >
            <DecoderText text="Clients we've served" start={visible} delay={300} />
          </Heading>
          <Text className={styles.description} data-visible={visible} size="l" as="p">
            From service desks and migrations to apps, Power BI and managed IT — a
            selection of the organisations we've helped move forward.
          </Text>
        </header>

        <div
          className={styles.stage}
          data-visible={visible}
          onClick={() => setActive(null)}
        >
          <div className={styles.glow} aria-hidden />
          <div className={styles.globe} aria-hidden>
            <span className={styles.globeGrid} />
            <span className={styles.globeShade} />
            <span className={styles.globeGlare} />
          </div>
          <div className={styles.ringWrap}>
            <div
              className={styles.ring}
              data-paused={active !== null}
              aria-label="Clients we've served"
            >
              {clients.map((client, index) => (
                <button
                  type="button"
                  key={client.name}
                  className={styles.tile}
                  data-active={active === index}
                  aria-pressed={active === index}
                  aria-label={`${client.name}: ${client.blurb}`}
                  onClick={event => {
                    // Don't let the tap bubble to the stage (which resumes)
                    event.stopPropagation();
                    setActive(active === index ? null : index);
                  }}
                  style={cssProps({ angle: `${index * anglePerTile}deg` })}
                >
                  <span className={styles.tileCard}>
                    <ClientLogo client={client} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.readout} data-visible={visible} aria-live="polite">
          {activeClient ? (
            <>
              <span className={styles.captionName}>{activeClient.name}</span>
              <span className={styles.captionBlurb}>{activeClient.blurb}</span>
            </>
          ) : (
            <span className={styles.hint}>Tap a logo to see what we built</span>
          )}
        </div>
      </div>
    </Section>
  );
}
