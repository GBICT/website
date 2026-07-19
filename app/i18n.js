import { useRouteLoaderData } from '@remix-run/react';

export const locales = ['nl', 'en'];
export const defaultLocale = 'nl';

// Dutch browsers get Dutch, everyone else English.
export function detectLocale(acceptLanguage = '') {
  return /(^|[,;\s])nl\b/i.test(acceptLanguage) ? 'nl' : 'en';
}

export function useLocale() {
  const data = useRouteLoaderData('root');
  return data?.locale === 'en' ? 'en' : 'nl';
}

const dict = {
  en: {
    nav: { details: 'How we work', articles: 'Articles', services: 'Services', contact: 'Contact' },
    langLabel: { nl: 'Nederlands', en: 'English' },
    common: {
      learnMore: 'Learn more',
      viewAll: 'View all services',
      servicesEyebrow: 'Services',
      readOn: 'Read on',
      discuss: 'Discuss your project',
      previous: 'Previous',
      next: 'Next',
    },
    contactPage: {
      sayHello: 'Say hello',
      sending: 'Sending',
      sendMessage: 'Send message',
      sentTitle: 'Message Sent',
      sentText: 'We’ll get back to you within a couple of days, sit tight.',
      backHome: 'Back to homepage',
      form: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        servicesLegend: 'What can we help you with?',
        message: 'Message (optional)',
        services: ['AI', 'App development', 'Webbots', 'Business automation'],
      },
    },
    cookie: {
      text: 'We use cookies to understand how this site is used and to make it better. You decide what is switched on.',
      accept: 'Accept',
      decline: 'Decline',
    },
    home: {
      services: {
        kicker: 'What we build',
        title: 'One partner for every part of your software.',
        lead: 'From a first app to a full business system, and the automation and AI that make it work. Four of the things we do most.',
        cards: [
          { name: 'Custom software', blurb: 'Applications and business software built around the way your team actually works.' },
          { name: 'Business automation', blurb: 'Slow, repetitive work turned into a process that runs itself, day and night.' },
          { name: 'CRM & business systems', blurb: 'One place for your customers, your pipeline, your tasks and your figures.' },
          { name: 'AI assistants', blurb: 'AI trained on your own data, answering your team and your customers in seconds.' },
        ],
      },
      ai: {
        kicker: 'Artificial intelligence',
        title: 'AI, built on your business.',
        copy: 'Not a generic tool with your logo on it. We train AI on your own data, run it inside your own environment, and put it to work where it saves you the most. It could be',
        phrases: [
          'an assistant trained on your own documents',
          'a bot that works through the night',
          'a phone agent that answers every call',
          'a system that flags what needs your attention',
        ],
        link: 'See what AI can do for you',
      },
      why: {
        kicker: 'Why GBICT',
        title: 'Built to last, and to deliver.',
        points: [
          { label: 'Long term', title: 'We think in years, not weeks', text: 'We do not deliver and disappear. We build software that keeps working and growing with you, and we stay on to maintain, extend and improve it as your business changes.' },
          { label: 'Transparent', title: 'You always know where you stand', text: 'Clear scope, clear price, clear progress. You see the work take shape as we build it, with no hidden hours and no surprises when the invoice arrives.' },
          { label: 'Results', title: 'We are measured on what it delivers', text: 'Every choice comes back to one question: what does this give you? Time saved, cost cut or growth gained. We sell outcomes, not hours.' },
        ],
      },
      steps: {
        kicker: 'How we work',
        title: 'Six steps to transform your business',
        items: [
          { label: 'Analysis', text: 'We start by understanding, never by building. We map how your organisation really works and find where the time and the money leak away.' },
          { label: 'Design', text: 'You see it before you commit. A clickable design of the real thing, so you never buy a promise on a slide.' },
          { label: 'Fixed fee agreement', text: 'Before we build, we lock the full scope, timeline and price. You know exactly where you stand, with no surprises and no budget overruns.' },
          { label: 'Development', text: 'We build it in short steps you can follow. You watch it take shape instead of waiting months for a reveal.' },
          { label: 'Implementation & support', text: 'We deliver it ready to use and stay close while your team settles in. Going live is the start, not the finish line.' },
          { label: 'Continuity & development', text: 'Your business keeps moving, so the software moves with it. We maintain it, improve it and add what you need next.' },
        ],
      },
      contact: {
        title: 'Get in touch',
        intro: "Tell us what you need and we'll get back to you within a couple of days.",
        send: 'Send message',
        sending: 'Sending',
        sentTitle: 'Message sent',
        sentIntro: "Thanks. We'll get back to you within a couple of days.",
      },
    },
  },
  nl: {
    nav: { details: 'Onze werkwijze', articles: 'Artikelen', services: 'Diensten', contact: 'Contact' },
    langLabel: { nl: 'Nederlands', en: 'English' },
    common: {
      learnMore: 'Meer info',
      viewAll: 'Alle diensten',
      servicesEyebrow: 'Diensten',
      readOn: 'Lees verder',
      discuss: 'Bespreek je project',
      previous: 'Vorige',
      next: 'Volgende',
    },
    contactPage: {
      sayHello: 'Zeg hallo',
      sending: 'Versturen',
      sendMessage: 'Verstuur bericht',
      sentTitle: 'Bericht verstuurd',
      sentText: 'We reageren binnen een paar dagen, hou vol.',
      backHome: 'Terug naar de homepage',
      form: {
        firstName: 'Voornaam',
        lastName: 'Achternaam',
        email: 'E-mailadres',
        servicesLegend: 'Waarmee kunnen we je helpen?',
        message: 'Bericht (optioneel)',
        services: ['AI', 'App-ontwikkeling', 'Webbots', 'Bedrijfsautomatisering'],
      },
    },
    cookie: {
      text: 'We gebruiken cookies om te zien hoe de site gebruikt wordt en om hem beter te maken. Jij bepaalt wat er aanstaat.',
      accept: 'Accepteren',
      decline: 'Weigeren',
    },
    home: {
      services: {
        kicker: 'Wat we bouwen',
        title: 'Eén partner voor elk deel van je software.',
        lead: 'Van een eerste app tot een compleet bedrijfssysteem, en de automatisering en AI die het laten werken. Vier van de dingen die we het vaakst doen.',
        cards: [
          { name: 'Software op maat', blurb: 'Apps en bedrijfssoftware gebouwd rond de manier waarop jouw team echt werkt.' },
          { name: 'Bedrijfsautomatisering', blurb: 'Traag, repetitief werk wordt een proces dat zichzelf draait, dag en nacht.' },
          { name: 'CRM & bedrijfssystemen', blurb: 'Eén plek voor je klanten, je pipeline, je taken en je cijfers.' },
          { name: 'AI-assistenten', blurb: 'AI getraind op je eigen data, die je team en je klanten binnen seconden antwoord geeft.' },
        ],
      },
      ai: {
        kicker: 'Kunstmatige intelligentie',
        title: 'AI, gebouwd op jouw bedrijf.',
        copy: 'Geen generieke tool met jouw logo erop. We trainen AI op je eigen data, draaien het in je eigen omgeving, en zetten het in waar het je het meest oplevert. Denk aan',
        phrases: [
          'een assistent getraind op je eigen documenten',
          'een bot die de hele nacht doorwerkt',
          'een telefoonagent die elk gesprek opneemt',
          'een systeem dat aangeeft waar je aandacht nodig is',
        ],
        link: 'Bekijk wat AI voor je kan doen',
      },
      why: {
        kicker: 'Waarom GBICT',
        title: 'Gebouwd om te blijven, en om te leveren.',
        points: [
          { label: 'Lange termijn', title: 'We denken in jaren, niet in weken', text: 'We leveren niet op en verdwijnen. We bouwen software die blijft werken en met je meegroeit, en we blijven onderhouden, uitbreiden en verbeteren terwijl je bedrijf verandert.' },
          { label: 'Transparant', title: 'Je weet altijd waar je staat', text: 'Heldere scope, heldere prijs, heldere voortgang. Je ziet het werk vorm krijgen terwijl we bouwen, zonder verborgen uren en zonder verrassingen op de factuur.' },
          { label: 'Resultaat', title: 'We worden afgerekend op wat het oplevert', text: 'Elke keuze komt terug op één vraag: wat levert dit jou op? Tijdwinst, kostenbesparing of groei. We verkopen uitkomsten, geen uren.' },
        ],
      },
      steps: {
        kicker: 'Hoe we werken',
        title: 'Zes stappen om je bedrijf te veranderen',
        items: [
          { label: 'Analyse', text: 'We beginnen met begrijpen, nooit met bouwen. We brengen in kaart hoe je organisatie echt werkt en vinden waar tijd en geld weglekken.' },
          { label: 'Ontwerp', text: 'Je ziet het voordat je je vastlegt. Een klikbaar ontwerp van het echte ding, zodat je nooit een belofte op een dia koopt.' },
          { label: 'Vaste prijsafspraak', text: 'Voordat we bouwen leggen we de volledige scope, planning en prijs vast. Je weet precies waar je aan toe bent, zonder verrassingen en zonder budgetoverschrijdingen.' },
          { label: 'Ontwikkeling', text: 'We bouwen het in korte stappen die je kunt volgen. Je ziet het vorm krijgen in plaats van maanden op een onthulling te wachten.' },
          { label: 'Oplevering & ondersteuning', text: 'We leveren het klaar voor gebruik op en blijven dichtbij terwijl je team eraan went. Live gaan is het begin, niet de finish.' },
          { label: 'Continuïteit & doorontwikkeling', text: 'Je bedrijf blijft in beweging, dus de software beweegt mee. We onderhouden het, verbeteren het en voegen toe wat je nodig hebt.' },
        ],
      },
      contact: {
        title: 'Neem contact op',
        intro: 'Vertel ons wat je nodig hebt, dan reageren we binnen een paar dagen.',
        send: 'Verstuur bericht',
        sending: 'Versturen',
        sentTitle: 'Bericht verstuurd',
        sentIntro: 'Bedankt. We reageren binnen een paar dagen.',
      },
    },
  },
};

export function useUi() {
  return dict[useLocale()];
}
