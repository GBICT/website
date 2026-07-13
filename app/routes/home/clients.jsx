import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { cssProps } from '~/utils/style';
import styles from './clients.module.css';

/**
 * Clients we've served — shown as a slowly rotating 3D ring of logos.
 * Hovering the ring pauses it; hovering a tile reveals a short blurb.
 * Blurbs marked "verify" are placeholders; refine with the real scope.
 */
const clients = [
  {
    name: 'C2U Network',
    blurb: 'Mobiscout app, Power BI kiosk mode & MDM rollout with migration.',
    url: 'https://c2unetwork.com/',
    logo: '/clients/c2u.png',
  },
  {
    name: 'Zorgcentra Meerlanden',
    blurb: 'Custom software, hands-on guidance and a full data migration.',
    url: 'https://www.zorgcentra-meerlanden.nl/',
    logo: '/clients/meerlanden.png',
  },
  {
    name: 'Boomerangzorg',
    blurb: 'All systems, software and ongoing support.',
    url: 'https://boomerangzorg.nl/',
    logo: '/clients/boomerang-wit.svg',
  },
  {
    name: 'Wobouw',
    blurb: 'A native App Store app designed and built from scratch.',
    url: 'https://wobouw.nl/',
    logo: '/clients/wobouw.png',
    tileDark: true,
  },
  {
    name: 'TMA Logistics',
    blurb: 'Service desk built from scratch, fully automated.',
    url: 'https://www.tmalogistics.nl/',
    logo: '/clients/tma.jpg',
  },
  {
    name: 'Passly Wallet',
    blurb: 'A digital wallet solution.', // verify
    url: 'https://passlywallet.com/',
    logo: null,
  },
  {
    name: 'GBICT Energy',
    blurb: 'IT partner for the energy sector.', // verify
    url: 'https://www.gbict-energy.com/',
    logo: '/clients/gbict-energy.png',
  },
  {
    name: 'FDMG',
    blurb: 'IT services, management and support.', // verify
    url: 'https://fdmg.nl/',
    logo: '/clients/fdmg.png',
  },
  {
    name: 'TDM Systems',
    blurb: 'IT solutions and systems integration.', // verify
    url: 'https://www.tdmsystems.nl/',
    logo: '/clients/tdm.png',
    invert: true, // dark wordmark on transparent bg → force to white for the dark tile
  },
];

const anglePerTile = 360 / clients.length;

export function Clients({ id, visible, sectionRef, ...rest }) {
  const titleId = `${id}-title`;

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
            <div className={styles.ring}>
              {clients.map((client, index) => (
                <a
                  key={client.name}
                  className={styles.tile}
                  href={client.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${client.name} — ${client.blurb}`}
                  style={cssProps({ angle: `${index * anglePerTile}deg` })}
                >
                  <span className={styles.tileCard} data-dark={client.tileDark}>
                    {client.logo ? (
                      <img
                        className={styles.logo}
                        data-invert={client.invert}
                        src={client.logo}
                        alt={`${client.name} logo`}
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <span className={styles.tileText}>{client.name}</span>
                    )}
                  </span>
                  <span className={styles.overlay} aria-hidden>
                    <span className={styles.overlayName}>{client.name}</span>
                    <span className={styles.overlayBlurb}>{client.blurb}</span>
                    <span className={styles.overlayLink}>
                      Visit site
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <p className={styles.hint} aria-hidden>
            Hover a logo to pause and see what we built
          </p>
        </div>
      </div>
    </Section>
  );
}
