import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useState } from 'react';
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
    blurb: 'Mobiscout app, Power BI kiosk mode & MDM rollout with migration.',
    logo: '/clients/c2u.png',
  },
  {
    name: 'Zorgcentra Meerlanden',
    blurb: 'Custom software, hands-on guidance and a full data migration.',
    logo: '/clients/meerlanden.png',
  },
  {
    name: 'Boomerangzorg',
    blurb: 'All systems, software and ongoing support.',
    logo: '/clients/boomerang-wit.svg',
  },
  {
    name: 'Wobouw',
    blurb: 'A native App Store app designed and built from scratch.',
    logo: '/clients/wobouw.png',
  },
  {
    name: 'TMA Logistics',
    blurb: 'Service desk built from scratch, fully automated.',
    logo: '/clients/tma.jpg',
  },
  {
    name: 'Passly Wallet',
    blurb: 'A digital wallet solution.', // verify
    logo: null,
  },
  {
    name: 'GBICT Energy',
    blurb: 'IT partner for the energy sector.', // verify
    logo: '/clients/gbict-energy.png',
  },
  {
    name: 'FDMG',
    blurb: 'IT services, management and support.', // verify
    logo: '/clients/fdmg.png',
  },
  {
    name: 'TDM Systems',
    blurb: 'IT solutions and systems integration.', // verify
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
      loading="lazy"
      draggable={false}
    />
  );
}

export function Clients({ id, visible, sectionRef, ...rest }) {
  const titleId = `${id}-title`;
  // Which tile is "revealed" by tap (touch equivalent of hover)
  const [active, setActive] = useState(null);

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

        <div className={styles.stage} data-visible={visible}>
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
                  onClick={() => setActive(active === index ? null : index)}
                  style={cssProps({ angle: `${index * anglePerTile}deg` })}
                >
                  <span className={styles.tileCard}>
                    <ClientLogo client={client} />
                  </span>
                  <span className={styles.overlay} aria-hidden>
                    <span className={styles.overlayName}>{client.name}</span>
                    <span className={styles.overlayBlurb}>{client.blurb}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <p className={styles.hint} aria-hidden>
            Hover or tap a logo to see what we built
          </p>
        </div>
      </div>
    </Section>
  );
}
