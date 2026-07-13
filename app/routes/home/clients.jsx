import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { cssProps } from '~/utils/style';
import styles from './clients.module.css';

/**
 * Greep uit onze klanten — a selection of organisations GBICT has served.
 * Descriptions marked "verify" are placeholders; refine with the real scope.
 */
const clients = [
  {
    name: 'C2U Network',
    work: 'Mobiscout-app & Power BI in kioskmodus, plus MDM-uitrol met volledige migratie.',
    url: 'https://c2unetwork.com/',
  },
  {
    name: 'Zorgcentra Meerlanden',
    work: 'Software op maat, begeleiding en een volledige datamigratie.',
    url: 'https://www.zorgcentra-meerlanden.nl/',
  },
  {
    name: 'Boomerangzorg',
    work: 'Alle systemen, software en doorlopende support geleverd.',
    url: 'https://boomerangzorg.nl/',
  },
  {
    name: 'Wobouw',
    work: 'Native App Store-app ontworpen en gebouwd.',
    url: 'https://wobouw.nl/',
  },
  {
    name: 'TMA Logistics',
    work: 'Servicedesk vanaf de basis opgezet met volledige automatisering.',
    url: 'https://www.tmalogistics.nl/',
  },
  {
    name: 'Passly Wallet',
    work: 'Digitale wallet-oplossing gerealiseerd.', // verify
    url: 'https://passlywallet.com/',
  },
  {
    name: 'GBICT Energy',
    work: 'IT-partner voor de energiesector.', // verify
    url: 'https://www.gbict-energy.com/',
  },
  {
    name: 'FDMG',
    work: 'IT-dienstverlening, beheer en support.', // verify
    url: 'https://fdmg.nl/',
  },
  {
    name: 'TDM Systems',
    work: 'IT-oplossingen en systeemintegratie.', // verify
    url: 'https://www.tdmsystems.nl/',
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      className={styles.cardArrow}
      width="20"
      height="20"
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
  );
}

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
              Onze klanten
            </span>
          </div>
          <Heading
            level={2}
            as="h2"
            id={titleId}
            className={styles.title}
            data-visible={visible}
          >
            <DecoderText text="Greep uit onze klanten" start={visible} delay={300} />
          </Heading>
          <Text className={styles.description} data-visible={visible} size="l" as="p">
            Van servicedesk en migraties tot apps, Power BI en beheer op maat — een
            selectie van organisaties die wij mochten helpen.
          </Text>
        </header>
        <ul className={styles.grid}>
          {clients.map((client, index) => (
            <li
              key={client.name}
              className={styles.item}
              data-visible={visible}
              style={cssProps({ delay: 200 + index * 90 })}
            >
              <a
                href={client.url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.card}
              >
                <span className={styles.cardName}>
                  {visible ? (
                    <DecoderText
                      text={client.name}
                      start={visible}
                      delay={400 + index * 80}
                    />
                  ) : (
                    client.name
                  )}
                </span>
                <span className={styles.cardWork}>{client.work}</span>
                <span className={styles.cardLink}>
                  Bekijk site
                  <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
