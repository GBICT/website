import { CountUp } from '~/components/count-up/count-up';
import { DecoderText } from '~/components/decoder-text';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { TypeOnce } from '~/components/type-once/type-once';
import { baseMeta } from '~/utils/meta';
import { getService, getAdjacentServices } from '~/services-data';
import { useInViewport } from '~/hooks';
import { useHydrated } from '~/hooks/useHydrated';
import { useLocale, useUi } from '~/i18n';
import { Suspense, lazy, useRef } from 'react';
import styles from './crm.module.css';

const SLUG = 'crm-and-business-systems';

const DisplacementSphere = lazy(() =>
  import('~/routes/home/displacement-sphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

const metaService = getService(SLUG);
const revealOptions = { rootMargin: '0px 0px -12% 0px' };

const copy = {
  en: {
    heroTitle: 'One system for how your business runs.',
    heroButton: 'Take the tour',
    pitchTitle: 'Built around your workflow, not the other way around.',
    tourKicker: 'A guided look inside',
    tourLead:
      'Here is what a system we build for you actually looks like. Three screens, one place, no switching between tools.',
    scene1: {
      kicker: 'The overview',
      title: 'Everything on one screen.',
      text: 'Your customers, pipeline, tasks and figures together in one place, so your team stops switching between tools and spreadsheets.',
    },
    scene2: {
      kicker: 'Every customer',
      title: 'Know exactly where you stand.',
      text: 'Open any customer and see the whole story at a glance. Every call, meeting, document and deal in one profile, always up to date.',
    },
    scene3: {
      kicker: 'The optional AI layer',
      title: 'It works alongside your team.',
      text: 'When you want it, an AI layer reads your pipeline, tells you where your attention is needed, and even drafts the next message for you to send.',
    },
    mock: {
      commandCentre: 'Command centre',
      live: 'Live',
      pipeline: 'Pipeline',
      today: 'Today',
      modules: ['Dashboard', 'Contacts', 'Pipeline', 'Tasks', 'Reports'],
      kpis: [
        { to: 74, prefix: '€', suffix: 'k', label: 'Revenue this month' },
        { to: 12, prefix: '', suffix: '', label: 'Open deals' },
        { to: 5, prefix: '', suffix: '', label: 'Tasks today' },
      ],
      deals: [
        { name: 'Acme Corp', initials: 'AC', stage: 'Proposal', value: '€24k', hot: true },
        { name: 'Bright Labs', initials: 'BL', stage: 'Negotiation', value: '€8.5k' },
        { name: 'Vela Group', initials: 'VG', stage: 'Qualified', value: '€41k' },
      ],
      tasks: [
        { text: 'Send the proposal to Vela Group', meta: 'Today', done: true },
        { text: 'Call Bright Labs about the quote', meta: 'Today', done: false },
        { text: 'Prepare the quarterly review', meta: 'Tomorrow', done: false },
      ],
      activeClient: 'Active client',
      clientSince: 'Client since 2024 · Amsterdam',
      lifetimeValue: 'Lifetime value',
      openDeals: 'Open deals',
      sinceContact: 'Since last contact',
      threeDays: '3 days',
      recentActivity: 'Recent activity',
      timeline: [
        { title: 'Proposal sent', meta: '3 days ago' },
        { title: 'Call with their team', meta: '1 week ago' },
        { title: 'Meeting at their office', meta: '2 weeks ago' },
        { title: 'Became a client', meta: '2024' },
      ],
      todaysFocus: 'Today’s focus',
      aiActions: [
        { kind: 'Priority', tag: 'Priority', title: 'Follow up with Acme Corp', text: 'Their proposal expires on Friday.' },
        { kind: 'Flagged', tag: 'Flagged', title: 'Vela Group has gone quiet', text: 'No contact for 12 days, time for a check in.' },
        { kind: 'New', tag: 'New', title: '3 new leads match your best clients', text: 'Ready for you to review.' },
      ],
      suggested: 'Suggested message',
      draftText:
        'Hi Sarah, just checking in on the proposal we sent last week. Happy to walk you through it whenever suits you.',
      send: 'Send',
      edit: 'Edit',
    },
    whyTitle: 'Why build it with us.',
    whyUs: [
      { title: 'You click it before you commit', text: 'We build a working prototype of your system first. You try the real thing before you sign, so you never buy a promise on a slide.' },
      { title: 'It is yours', text: 'You get the source code and full ownership. Your data stays in your own environment, and you are never locked in.' },
      { title: 'You work with the people who build it', text: 'No account managers or helpdesk in between. You talk directly to the team that designs and builds your system.' },
    ],
    ctaTitle: 'A system your team wants to use.',
    ctaText:
      'It starts with a conversation and an analysis, with no obligation. We build it around your process and show you exactly what it delivers.',
  },
  nl: {
    heroTitle: 'Eén systeem voor hoe jouw bedrijf draait.',
    heroButton: 'Bekijk de rondleiding',
    pitchTitle: 'Gebouwd rond jouw workflow, niet andersom.',
    tourKicker: 'Een begeleide blik van binnen',
    tourLead:
      'Zo ziet een systeem dat we voor je bouwen er echt uit. Drie schermen, één plek, geen geschakel tussen tools.',
    scene1: {
      kicker: 'Het overzicht',
      title: 'Alles op één scherm.',
      text: 'Je klanten, pipeline, taken en cijfers samen op één plek, zodat je team stopt met schakelen tussen tools en spreadsheets.',
    },
    scene2: {
      kicker: 'Elke klant',
      title: 'Weet precies waar je staat.',
      text: 'Open een klant en zie het hele verhaal in één oogopslag. Elk gesprek, elke afspraak, elk document en elke deal in één profiel, altijd actueel.',
    },
    scene3: {
      kicker: 'De optionele AI-laag',
      title: 'Het werkt naast je team.',
      text: 'Als je het wilt, leest een AI-laag je pipeline, vertelt waar je aandacht nodig is, en schrijft zelfs het volgende bericht dat je kunt versturen.',
    },
    mock: {
      commandCentre: 'Commandocentrum',
      live: 'Live',
      pipeline: 'Pipeline',
      today: 'Vandaag',
      modules: ['Dashboard', 'Contacten', 'Pipeline', 'Taken', 'Rapporten'],
      kpis: [
        { to: 74, prefix: '€', suffix: 'k', label: 'Omzet deze maand' },
        { to: 12, prefix: '', suffix: '', label: 'Open deals' },
        { to: 5, prefix: '', suffix: '', label: 'Taken vandaag' },
      ],
      deals: [
        { name: 'Acme Corp', initials: 'AC', stage: 'Voorstel', value: '€24k', hot: true },
        { name: 'Bright Labs', initials: 'BL', stage: 'Onderhandeling', value: '€8.5k' },
        { name: 'Vela Group', initials: 'VG', stage: 'Gekwalificeerd', value: '€41k' },
      ],
      tasks: [
        { text: 'Stuur het voorstel naar Vela Group', meta: 'Vandaag', done: true },
        { text: 'Bel Bright Labs over de offerte', meta: 'Vandaag', done: false },
        { text: 'Bereid de kwartaalreview voor', meta: 'Morgen', done: false },
      ],
      activeClient: 'Actieve klant',
      clientSince: 'Klant sinds 2024 · Amsterdam',
      lifetimeValue: 'Levenslange waarde',
      openDeals: 'Open deals',
      sinceContact: 'Sinds laatste contact',
      threeDays: '3 dagen',
      recentActivity: 'Recente activiteit',
      timeline: [
        { title: 'Voorstel verstuurd', meta: '3 dagen geleden' },
        { title: 'Gesprek met hun team', meta: '1 week geleden' },
        { title: 'Afspraak op hun kantoor', meta: '2 weken geleden' },
        { title: 'Klant geworden', meta: '2024' },
      ],
      todaysFocus: 'Focus van vandaag',
      aiActions: [
        { kind: 'Priority', tag: 'Prioriteit', title: 'Volg Acme Corp op', text: 'Hun voorstel verloopt vrijdag.' },
        { kind: 'Flagged', tag: 'Gemarkeerd', title: 'Vela Group is stil geworden', text: '12 dagen geen contact, tijd om te checken.' },
        { kind: 'New', tag: 'Nieuw', title: '3 nieuwe leads passen bij je beste klanten', text: 'Klaar om te bekijken.' },
      ],
      suggested: 'Voorgesteld bericht',
      draftText:
        'Hoi Sarah, ik check even in op het voorstel dat we vorige week stuurden. Ik loop het graag met je door wanneer het jou uitkomt.',
      send: 'Versturen',
      edit: 'Aanpassen',
    },
    whyTitle: 'Waarom je het met ons bouwt.',
    whyUs: [
      { title: 'Je klikt het voordat je je vastlegt', text: 'We bouwen eerst een werkend prototype van je systeem. Je probeert het echte ding voordat je tekent, dus je koopt nooit een belofte op een dia.' },
      { title: 'Het is van jou', text: 'Je krijgt de broncode en het volledige eigendom. Je data blijft in je eigen omgeving, en je zit nooit vast.' },
      { title: 'Je werkt met de mensen die het bouwen', text: 'Geen accountmanagers of helpdesk ertussen. Je praat direct met het team dat je systeem ontwerpt en bouwt.' },
    ],
    ctaTitle: 'Een systeem dat je team wil gebruiken.',
    ctaText:
      'Het begint met een gesprek en een analyse, vrijblijvend. We bouwen het rond jouw proces en laten je precies zien wat het oplevert.',
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

export const Crm = () => {
  const isHydrated = useHydrated();
  const locale = useLocale();
  const ui = useUi();
  const c = copy[locale];
  const m = c.mock;
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
            {service.title}
          </Text>
          <Heading id="svc-title" level={1} as="h1" className={styles.heroTitle}>
            <DecoderText text={c.heroTitle} delay={300} />
          </Heading>
          <Text size="xl" as="p" className={styles.heroText}>
            {service.statement}
          </Text>
          <Link href="#inside" className={styles.heroButton}>
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

      <Section as="section" id="inside" className={styles.tour}>
        <div className={styles.tourInner}>
          <Reveal className={styles.tourIntro}>
            <Text className={styles.kicker} size="s" as="p">
              {c.tourKicker}
            </Text>
            <Text size="l" as="p" className={styles.tourLead}>
              {c.tourLead}
            </Text>
          </Reveal>

          <div className={styles.scene}>
            <Reveal className={styles.sceneHead}>
              <Text className={styles.sceneKicker} size="s" as="p">
                {c.scene1.kicker}
              </Text>
              <Heading level={3} as="h3" className={styles.sceneTitle}>
                {c.scene1.title}
              </Heading>
              <Text size="l" as="p" className={styles.sceneText}>
                {c.scene1.text}
              </Text>
            </Reveal>

            <Reveal className={styles.sceneStage}>
              <div className={styles.app}>
                <div className={styles.appBar}>
                  <span className={styles.dots} aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.appTitle}>{m.commandCentre}</span>
                  <span className={styles.appLive}>
                    <span className={styles.liveDot} aria-hidden /> {m.live}
                  </span>
                </div>
                <div className={styles.appBody}>
                  <nav className={styles.sidebar} aria-label="Modules">
                    {m.modules.map((item, index) => (
                      <span
                        key={item}
                        className={styles.navItem}
                        data-active={index === 0 ? 'true' : undefined}
                      >
                        <span className={styles.navDot} aria-hidden />
                        {item}
                      </span>
                    ))}
                  </nav>
                  <div className={styles.main}>
                    <div className={styles.kpis}>
                      {m.kpis.map(kpi => (
                        <div key={kpi.label} className={styles.kpi}>
                          <span className={styles.kpiNum}>
                            <CountUp to={kpi.to} prefix={kpi.prefix} suffix={kpi.suffix} />
                          </span>
                          <span className={styles.kpiLabel}>{kpi.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.panels}>
                      <div className={styles.panel}>
                        <span className={styles.panelHead}>{m.pipeline}</span>
                        <ul className={styles.deals}>
                          {m.deals.map(deal => (
                            <li
                              key={deal.name}
                              className={styles.deal}
                              data-hot={deal.hot ? 'true' : undefined}
                            >
                              <span className={styles.avatar}>{deal.initials}</span>
                              <span className={styles.dealName}>{deal.name}</span>
                              <span className={styles.stage}>{deal.stage}</span>
                              <span className={styles.value}>{deal.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.panel}>
                        <span className={styles.panelHead}>{m.today}</span>
                        <ul className={styles.tasks}>
                          {m.tasks.map(task => (
                            <li key={task.text} className={styles.task}>
                              <span
                                className={styles.check}
                                data-done={task.done ? 'true' : undefined}
                                aria-hidden
                              />
                              <span
                                className={styles.taskText}
                                data-done={task.done ? 'true' : undefined}
                              >
                                {task.text}
                              </span>
                              <span className={styles.taskMeta}>{task.meta}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className={styles.scene}>
            <Reveal className={styles.sceneHead}>
              <Text className={styles.sceneKicker} size="s" as="p">
                {c.scene2.kicker}
              </Text>
              <Heading level={3} as="h3" className={styles.sceneTitle}>
                {c.scene2.title}
              </Heading>
              <Text size="l" as="p" className={styles.sceneText}>
                {c.scene2.text}
              </Text>
            </Reveal>

            <Reveal className={styles.sceneStage}>
              {visible => (
                <div className={styles.app}>
                  <div className={styles.appBar}>
                    <span className={styles.dots} aria-hidden>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className={styles.appTitle}>Acme Corp</span>
                    <span className={styles.tag}>{m.activeClient}</span>
                  </div>
                  <div className={styles.profile}>
                    <div className={styles.profileHead}>
                      <span className={styles.avatarLg}>AC</span>
                      <div className={styles.profileWho}>
                        <span className={styles.profileName}>Acme Corp</span>
                        <span className={styles.profileSub}>{m.clientSince}</span>
                      </div>
                    </div>
                    <div className={styles.profileStats}>
                      <div className={styles.pStat}>
                        <span className={styles.pStatNum}>
                          <CountUp to={128} prefix="€" suffix="k" />
                        </span>
                        <span className={styles.pStatLabel}>{m.lifetimeValue}</span>
                      </div>
                      <div className={styles.pStat}>
                        <span className={styles.pStatNum}>
                          <CountUp to={2} />
                        </span>
                        <span className={styles.pStatLabel}>{m.openDeals}</span>
                      </div>
                      <div className={styles.pStat}>
                        <span className={styles.pStatNum}>{m.threeDays}</span>
                        <span className={styles.pStatLabel}>{m.sinceContact}</span>
                      </div>
                    </div>
                    <div className={styles.timeline} data-on={visible ? 'true' : undefined}>
                      <span className={styles.tlHead}>{m.recentActivity}</span>
                      <ul className={styles.tlItems}>
                        <span className={styles.tlAxis} aria-hidden>
                          <span className={styles.tlFill} />
                        </span>
                        {m.timeline.map((event, index) => (
                          <li
                            key={event.title}
                            className={styles.tlItem}
                            style={{ '--delay': `${index * 140 + 200}ms` }}
                          >
                            <span className={styles.tlDot} aria-hidden />
                            <span className={styles.tlTitle}>{event.title}</span>
                            <span className={styles.tlMeta}>{event.meta}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          </div>

          <div className={styles.scene}>
            <Reveal className={styles.sceneHead}>
              <Text className={styles.sceneKicker} size="s" as="p">
                {c.scene3.kicker}
              </Text>
              <Heading level={3} as="h3" className={styles.sceneTitle}>
                {c.scene3.title}
              </Heading>
              <Text size="l" as="p" className={styles.sceneText}>
                {c.scene3.text}
              </Text>
            </Reveal>

            <Reveal className={styles.sceneStage}>
              <div className={styles.app}>
                <div className={styles.appBar}>
                  <span className={styles.dots} aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.appTitle}>{m.todaysFocus}</span>
                  <span className={styles.aiBadge}>GBICT AI</span>
                </div>
                <div className={styles.ai}>
                  <ul className={styles.aiList}>
                    {m.aiActions.map((action, index) => (
                      <li
                        key={action.title}
                        className={styles.aiItem}
                        style={{ '--delay': `${index * 130}ms` }}
                      >
                        <span className={styles.aiTag} data-kind={action.kind}>
                          {action.tag}
                        </span>
                        <div className={styles.aiCopy}>
                          <span className={styles.aiTitle}>{action.title}</span>
                          <span className={styles.aiText}>{action.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.aiDraft}>
                    <span className={styles.aiDraftHead}>{m.suggested}</span>
                    <TypeOnce className={styles.aiDraftText} text={m.draftText} />
                    <div className={styles.aiDraftActions}>
                      <span className={styles.aiSend}>{m.send}</span>
                      <span className={styles.aiEdit}>{m.edit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section as="section" className={styles.block}>
        <Reveal className={styles.why}>
          {visible => (
            <>
              <Heading level={2} as="h2" className={styles.whyTitle}>
                <DecoderText text={c.whyTitle} start={visible} />
              </Heading>
              <div className={styles.whyItems}>
                {c.whyUs.map((point, index) => (
                  <div
                    key={point.title}
                    className={styles.whyItem}
                    style={{ '--delay': `${index * 120}ms` }}
                  >
                    <Heading level={4} as="h3" className={styles.whyItemTitle}>
                      {point.title}
                    </Heading>
                    <Text size="l" as="p" className={styles.whyItemText}>
                      {point.text}
                    </Text>
                  </div>
                ))}
              </div>
            </>
          )}
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
