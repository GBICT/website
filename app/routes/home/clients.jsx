import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useWindowSize } from '~/hooks';
import { cssProps, media } from '~/utils/style';
import styles from './clients.module.css';

/**
 * Clients we've served. On desktop they orbit a globe as a rotating 3D ring
 * (hover a logo to pause it and reveal a short blurb). On phones the ring is
 * swapped for a static grid with the blurbs always visible, since touch has
 * no hover. Tiles are not links — clicking does nothing on purpose.
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

function ClientLogo({ client, className }) {
  if (!client.logo) {
    return <span className={styles.tileText}>{client.name}</span>;
  }

  return (
    <img
      className={className}
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
  const { width } = useWindowSize();
  // width is undefined until mounted, so SSR/desktop render the ring
  const isMobile = width > 0 && width <= media.mobile;

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

        {isMobile ? (
          <ul className={styles.grid} data-visible={visible}>
            {clients.map(client => (
              <li key={client.name} className={styles.card}>
                <span className={styles.cardLogo}>
                  <ClientLogo client={client} className={styles.logo} />
                </span>
                <span className={styles.cardName}>{client.name}</span>
                <span className={styles.cardBlurb}>{client.blurb}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.stage} data-visible={visible}>
            <div className={styles.glow} aria-hidden />
            <div className={styles.globe} aria-hidden>
              <span className={styles.globeGrid} />
              <span className={styles.globeShade} />
              <span className={styles.globeGlare} />
            </div>
            <div className={styles.ringWrap}>
              <div className={styles.ring} role="list" aria-label="Clients we've served">

                {clients.map((client, index) => (
                  <div
                    key={client.name}
                    className={styles.tile}
                    role="listitem"
                    aria-label={`${client.name}: ${client.blurb}`}
                    style={cssProps({ angle: `${index * anglePerTile}deg` })}
                  >
                    <span className={styles.tileCard}>
                      <ClientLogo client={client} className={styles.logo} />
                    </span>
                    <span className={styles.overlay} aria-hidden>
                      <span className={styles.overlayName}>{client.name}</span>
                      <span className={styles.overlayBlurb}>{client.blurb}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className={styles.hint} aria-hidden>
              Hover a logo to pause and see what we built
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
