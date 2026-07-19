// Single source of truth for the services shown on the /services index page and
// the /services/:slug detail pages. Every translatable field is { en, nl }. Copy
// is written in full sentences with no dashes. Dutch is informal (je/jij).

const services = [
  {
    slug: 'custom-software',
    title: { en: 'Custom software & applications', nl: 'Software op maat & applicaties' },
    statement: {
      en: 'Software designed around your processes, not a package you have to bend to.',
      nl: 'Software ontworpen rond jouw processen, niet een pakket waar jij je naar moet plooien.',
    },
    summary: {
      en: 'Tailored applications and business software for mobile, web and desktop, built around how your organisation actually works.',
      nl: 'Maatwerk-applicaties en bedrijfssoftware voor mobiel, web en desktop, gebouwd rond hoe jouw organisatie echt werkt.',
    },
    body: {
      en: [
        'Most businesses end up shaping their work around the software they bought, instead of the other way around. Standard packages come with fixed assumptions about how you should operate, and every exception becomes a workaround. We build the opposite. We develop applications and business software that fit the way your organisation actually works today, whether that is a customer facing app, an internal tool for your team, or a platform that ties your whole operation together.',
        'Every project begins with a thorough analysis. We sit down with the people who do the work, map the process step by step, and pin down exactly what the software has to achieve and where the current situation costs you time or money. From there we define the scope, the data model, the architecture and a realistic timeline, and we translate all of it into a clickable prototype. You review and click through the real product before we write a single line of production code, so you are never buying a promise on a slide.',
        'We then build in short, visible steps on a modern and maintainable stack, so you watch the product take shape instead of waiting months for a reveal. You work directly with the people building it, with no layers in between. A typical first version goes from concept to a working application in around twelve weeks, ready for the App Store or the web. When we deliver, the source code and the full ownership are yours, and we stay on to maintain it, extend it and add what you need next.',
      ],
      nl: [
        'De meeste bedrijven passen hun werk uiteindelijk aan de software aan die ze kochten, in plaats van andersom. Standaardpakketten komen met vaste aannames over hoe jij zou moeten werken, en elke uitzondering wordt een omweg. Wij doen het tegenovergestelde. We bouwen applicaties en bedrijfssoftware die passen bij hoe jouw organisatie vandaag echt werkt, of dat nu een app voor je klanten is, een interne tool voor je team, of een platform dat je hele operatie aan elkaar knoopt.',
        'Elk project begint met een grondige analyse. We gaan zitten met de mensen die het werk doen, brengen het proces stap voor stap in kaart, en leggen precies vast wat de software moet bereiken en waar de huidige situatie je tijd of geld kost. Van daaruit bepalen we de scope, het datamodel, de architectuur en een realistische planning, en vertalen we dat alles naar een klikbaar prototype. Je bekijkt en klikt door het echte product voordat we één regel productiecode schrijven, dus je koopt nooit een belofte op een dia.',
        'Daarna bouwen we in korte, zichtbare stappen op een moderne en onderhoudbare stack, zodat je het product vorm ziet krijgen in plaats van maanden op een onthulling te wachten. Je werkt direct met de mensen die het bouwen, zonder lagen ertussen. Een typische eerste versie gaat in ongeveer twaalf weken van concept naar een werkende applicatie, klaar voor de App Store of het web. Bij oplevering zijn de broncode en het volledige eigendom van jou, en we blijven het onderhouden, uitbreiden en toevoegen wat je nodig hebt.',
      ],
    },
    points: {
      en: [
        'Fully bespoke, designed to scale as you grow',
        'A clickable prototype before we build, so there are no surprises',
        'A modern, maintainable stack, with the source code and ownership yours',
        'Ongoing support and maintenance after launch, so it keeps running and improving',
      ],
      nl: [
        'Volledig op maat, ontworpen om mee te groeien',
        'Een klikbaar prototype voordat we bouwen, dus geen verrassingen',
        'Een moderne, onderhoudbare stack, met de broncode en het eigendom van jou',
        'Onderhoud en ondersteuning na de lancering, zodat het blijft draaien en verbeteren',
      ],
    },
    closing: {
      en: 'From analysis to delivery. Your software, your property.',
      nl: 'Van analyse tot oplevering. Jouw software, jouw eigendom.',
    },
  },
  {
    slug: 'ux-ui-web-design',
    title: { en: 'UX/UI & web design', nl: 'UX/UI & webdesign' },
    statement: {
      en: 'Great software is only as good as the experience of using it.',
      nl: 'Goede software is maar zo goed als de ervaring van het gebruiken ervan.',
    },
    summary: {
      en: 'Interfaces and websites that are intuitive, fast and genuinely pleasant to use, designed around your users rather than around a template.',
      nl: 'Interfaces en websites die intuïtief, snel en echt prettig in gebruik zijn, ontworpen rond jouw gebruikers in plaats van rond een template.',
    },
    body: {
      en: [
        'Design is not decoration. It decides whether people actually use what we build. We design intuitive, engaging interfaces that start from your users and their needs, and we test the experience with interactive prototypes before a line of production code is written.',
        'The same care goes into the web. We build sites that look sharp, load fast and work flawlessly on every device, made to be found and to perform. Where it adds value we bring subtle motion and 3D, animation that guides people through the product rather than distracting from it.',
      ],
      nl: [
        'Design is geen versiering. Het bepaalt of mensen echt gebruiken wat we bouwen. We ontwerpen intuïtieve, aantrekkelijke interfaces die vertrekken vanuit jouw gebruikers en hun behoeften, en we testen de ervaring met interactieve prototypes voordat er een regel productiecode geschreven wordt.',
        'Dezelfde zorg gaat naar het web. We bouwen sites die er scherp uitzien, snel laden en vlekkeloos werken op elk apparaat, gemaakt om gevonden te worden en om te presteren. Waar het waarde toevoegt brengen we subtiele beweging en 3D, animatie die mensen door het product leidt in plaats van af te leiden.',
      ],
    },
    points: {
      en: [
        'Design focused on your users, validated with prototypes',
        'Responsive, fast and easy to find in search on every device',
        'A consistent design system, with clear principles, accessibility and components',
      ],
      nl: [
        'Design gericht op jouw gebruikers, gevalideerd met prototypes',
        'Responsive, snel en goed vindbaar in zoekmachines op elk apparaat',
        'Een consistent designsysteem, met heldere principes, toegankelijkheid en componenten',
      ],
    },
    closing: {
      en: 'Software people reach for, rather than software they tolerate.',
      nl: 'Software waar mensen naar grijpen, in plaats van software die ze tolereren.',
    },
  },
  {
    slug: 'business-automation',
    title: { en: 'Business process automation', nl: 'Bedrijfsprocessen automatiseren' },
    statement: {
      en: 'Repetitive manual work is rarely a shortage of people. It is a shortage of automated processes.',
      nl: 'Repetitief handwerk is zelden een tekort aan mensen. Het is een tekort aan geautomatiseerde processen.',
    },
    summary: {
      en: 'We identify the recurring, labour intensive tasks in your organisation and automate them from start to finish, grounded in a proper cost analysis.',
      nl: 'We sporen de terugkerende, arbeidsintensieve taken in je organisatie op en automatiseren ze van begin tot eind, onderbouwd met een echte kostenanalyse.',
    },
    body: {
      en: [
        'Repetitive manual work is rarely a sign that you need more people. It is a sign that a process has never been automated. Data that gets copied between systems, reports that are assembled by hand every week, status updates, checks and approvals all quietly consume hours, and every manual step is a chance for an error to slip in. We find that work and take it off your team so it stays gone.',
        'We start with a process analysis. Task by task, we establish how a job is done today, how long it takes and what it costs, so we have a clear baseline. That baseline does two things. It tells us exactly which steps are worth automating, and it gives you the business case in black and white, including the point at which the investment pays for itself. Nothing is automated on a hunch. The price follows from the numbers, not from a guess.',
        'From there we design and build the automation from start to finish, connecting the systems involved and handling the exceptions, not just the easy cases. You get an operation that runs faster and more consistently, with far fewer errors, and your people get their time back for work that actually needs judgement and expertise. We test it thoroughly, roll it out carefully, and stay involved to adjust it as your process changes.',
      ],
      nl: [
        'Repetitief handwerk is zelden een teken dat je meer mensen nodig hebt. Het is een teken dat een proces nooit is geautomatiseerd. Data die tussen systemen wordt overgetikt, rapporten die elke week met de hand in elkaar worden gezet, statusupdates, controles en goedkeuringen slurpen stilletjes uren op, en elke handmatige stap is een kans op een fout. Wij vinden dat werk en halen het bij je team weg, zodat het weg blijft.',
        'We beginnen met een procesanalyse. Taak voor taak stellen we vast hoe een klus vandaag wordt gedaan, hoe lang het duurt en wat het kost, zodat we een heldere nulmeting hebben. Die nulmeting doet twee dingen. Ze vertelt ons precies welke stappen de moeite waard zijn om te automatiseren, en ze geeft je de businesscase zwart op wit, inclusief het punt waarop de investering zichzelf terugverdient. Niks wordt op gevoel geautomatiseerd. De prijs volgt uit de cijfers, niet uit een gok.',
        'Van daaruit ontwerpen en bouwen we de automatisering van begin tot eind, koppelen we de betrokken systemen en handelen we de uitzonderingen af, niet alleen de makkelijke gevallen. Je krijgt een operatie die sneller en consistenter draait, met veel minder fouten, en je mensen krijgen hun tijd terug voor werk dat echt oordeel en expertise vraagt. We testen het grondig, rollen het zorgvuldig uit en blijven betrokken om het aan te passen als je proces verandert.',
      ],
    },
    points: {
      en: [
        'A business case backed by real figures, with a clear payback point',
        'Shorter turnaround times and far fewer errors',
        'Capacity returned to your team for work that needs judgement',
      ],
      nl: [
        'Een businesscase onderbouwd met echte cijfers, met een helder terugverdienpunt',
        'Kortere doorlooptijden en veel minder fouten',
        'Capaciteit terug naar je team voor werk dat oordeel vraagt',
      ],
    },
    closing: {
      en: 'We automate on the basis of figures, not gut feeling.',
      nl: 'We automatiseren op basis van cijfers, niet op onderbuikgevoel.',
    },
  },
  {
    slug: 'rpa-and-bots',
    title: { en: 'Robotic process automation & bots', nl: 'Robotic process automation & bots' },
    statement: {
      en: 'Software that independently carries out the work that runs across your systems.',
      nl: 'Software die zelfstandig het werk uitvoert dat over je systemen heen loopt.',
    },
    summary: {
      en: 'RPA and AI driven bots automate tasks that span multiple systems and screens, running around the clock on the interfaces you already have.',
      nl: 'RPA en bots met AI automatiseren taken die meerdere systemen en schermen overspannen, dag en nacht draaiend op de interfaces die je al hebt.',
    },
    body: {
      en: [
        'Some work does not live inside a single system. It runs across many of them, pulling data from one screen, entering it into another, filling in forms, checking records and moving information from one place to the next. People are good at judgement, but this kind of repetitive, rule based work is exactly what software should be doing. That is what robotic process automation and AI driven bots are for.',
        'We map the process the way one of your employees performs it, then build a bot that carries out the same steps on the interfaces you already have. There is no need to replace your systems or wait for a vendor to build an integration, because the bot works on top of what is there. Where a step needs a decision, we add an AI layer that can read, classify and choose, so the bot handles the messy real cases as well as the simple ones.',
        'The result runs continuously, day and night, and scales with your volume without you having to hire. Every action is performed identically and is fully traceable, so you always know what happened and when. We build it, test it against your real cases, and keep it running as your systems and volumes change. It is particularly powerful for high volume processes with a fixed pattern, where the hours add up fast.',
      ],
      nl: [
        'Sommig werk zit niet in één systeem. Het loopt over veel systemen heen, haalt data uit het ene scherm, zet het in het andere, vult formulieren in, controleert gegevens en verplaatst informatie van de ene plek naar de volgende. Mensen zijn goed in oordelen, maar dit soort repetitief, op regels gebaseerd werk is precies wat software zou moeten doen. Daar zijn robotic process automation en bots met AI voor.',
        'We brengen het proces in kaart zoals een van je medewerkers het uitvoert, en bouwen dan een bot die dezelfde stappen doet op de interfaces die je al hebt. Je hoeft je systemen niet te vervangen of te wachten tot een leverancier een koppeling bouwt, want de bot werkt bovenop wat er is. Waar een stap een beslissing vraagt, voegen we een AI-laag toe die kan lezen, classificeren en kiezen, zodat de bot ook de rommelige echte gevallen aankan, niet alleen de simpele.',
        'Het resultaat draait continu, dag en nacht, en schaalt mee met je volume zonder dat je hoeft aan te nemen. Elke actie wordt identiek uitgevoerd en is volledig te herleiden, dus je weet altijd wat er is gebeurd en wanneer. We bouwen het, testen het tegen je echte gevallen, en houden het draaiend terwijl je systemen en volumes veranderen. Het is vooral krachtig bij processen met veel volume en een vast patroon, waar de uren snel oplopen.',
      ],
    },
    points: {
      en: [
        'Runs continuously, day and night, and scales with your volume',
        'Works on the systems you already have, with no replacement needed',
        'Every action identical and fully traceable',
      ],
      nl: [
        'Draait continu, dag en nacht, en schaalt mee met je volume',
        'Werkt op de systemen die je al hebt, zonder iets te vervangen',
        'Elke actie identiek en volledig te herleiden',
      ],
    },
    closing: {
      en: 'From hours of repetitive work to a process that runs itself.',
      nl: 'Van uren repetitief werk naar een proces dat zichzelf draait.',
    },
  },
  {
    slug: 'crm-and-business-systems',
    title: { en: 'Custom CRM & business systems', nl: 'CRM & bedrijfssystemen op maat' },
    statement: {
      en: 'One system for the way your business runs, with your customers, your work and your figures in a single place.',
      nl: 'Eén systeem voor hoe jouw bedrijf draait, met je klanten, je werk en je cijfers op één plek.',
    },
    summary: {
      en: 'All in one CRM and business systems, built around your processes. Everything your team needs on one screen, with an optional AI layer on top.',
      nl: 'Alles in één CRM en bedrijfssystemen, gebouwd rond jouw processen. Alles wat je team nodig heeft op één scherm, met optioneel een AI-laag erbovenop.',
    },
    body: {
      en: [
        'A generic CRM makes you fit your business into its boxes. Fields you never use, steps that do not match your process, and a team that quietly keeps its real work in spreadsheets on the side. We build the opposite. We develop a CRM or business system shaped around the way you actually work, so it becomes the place your team wants to be rather than an extra chore.',
        'We bring your customers, your pipeline, your tasks and your figures together into one environment, configured to your workflow, your terminology and your roles. One place that is always current, where nothing hides in an inbox or a separate sheet. It becomes a single source of truth that the whole team can rely on and that grows with you.',
        'We speak from experience, because we run our own operational command centre on exactly this principle, with pipeline, leads and figures on a single screen. That taught us what a system has to do to be used every single day rather than end up in a drawer. It has to be fast, it has to fit the work, and it has to earn its place. And when you want it, we add an AI layer on top that prioritises and proposes the next step, so the system also thinks along.',
      ],
      nl: [
        'Een generiek CRM laat je je bedrijf in zijn hokjes persen. Velden die je nooit gebruikt, stappen die niet bij je proces passen, en een team dat z’n echte werk stiekem in spreadsheets ernaast bijhoudt. Wij doen het tegenovergestelde. We bouwen een CRM of bedrijfssysteem gevormd rond hoe jij echt werkt, zodat het de plek wordt waar je team wil zijn in plaats van een extra klus.',
        'We brengen je klanten, je pipeline, je taken en je cijfers samen in één omgeving, ingericht op jouw workflow, je terminologie en je rollen. Eén plek die altijd actueel is, waar niks verstopt zit in een inbox of een losse sheet. Het wordt één bron van waarheid waar het hele team op kan bouwen en die met je meegroeit.',
        'We spreken uit ervaring, want we draaien ons eigen operationele commandocentrum op precies dit principe, met pipeline, leads en cijfers op één scherm. Dat leerde ons wat een systeem moet doen om elke dag gebruikt te worden in plaats van in een la te belanden. Het moet snel zijn, het moet bij het werk passen, en het moet zijn plek verdienen. En als je het wilt, zetten we er een AI-laag bovenop die prioriteert en de volgende stap voorstelt, zodat het systeem ook meedenkt.',
      ],
    },
    points: {
      en: [
        'Configured to your workflow, terminology and roles',
        'A single source of truth, always current',
        'An optional AI layer that thinks along',
      ],
      nl: [
        'Ingericht op jouw workflow, terminologie en rollen',
        'Eén bron van waarheid, altijd actueel',
        'Optioneel een AI-laag die meedenkt',
      ],
    },
    closing: {
      en: 'A system that works with you, rather than creating administration for you.',
      nl: 'Een systeem dat met je meewerkt, in plaats van administratie voor je maakt.',
    },
  },
  {
    slug: 'ai-assistants',
    title: { en: 'Custom AI assistants', nl: 'AI-assistenten op maat' },
    statement: {
      en: 'The power of generative AI, trained on your knowledge and secure within your own environment.',
      nl: 'De kracht van generatieve AI, getraind op jouw kennis en veilig binnen je eigen omgeving.',
    },
    summary: {
      en: 'AI assistants trained on your own documents and data, answering questions in seconds while your information stays under your control.',
      nl: 'AI-assistenten getraind op je eigen documenten en data, die binnen seconden antwoord geven terwijl je informatie onder jouw controle blijft.',
    },
    body: {
      en: [
        'Generative AI is powerful, but the public tools do not know your business, and sending your data to them is rarely something you want to do. We build AI assistants that are trained on your own documents, data and processes, so they answer with the knowledge that actually matters to your organisation, and they do it inside your own environment.',
        'We start by understanding where the knowledge lives and where the time goes. The questions customers keep asking, the documents employees keep searching through, the requests that eat up your team every day. Then we build an assistant grounded in that material. It answers questions from customers and staff, surfaces internal knowledge in seconds, and takes routine information requests off your hands, in your tone and within your rules.',
        'Your information stays under your own control, and no business data leaves for third parties, which keeps you compliant with the GDPR. Instead of paying a licence for every employee, you get one assistant for the whole organisation, so the cost does not climb as your team grows. We build it, test it on your real questions, and keep training it as your knowledge changes.',
      ],
      nl: [
        'Generatieve AI is krachtig, maar de publieke tools kennen jouw bedrijf niet, en je data ernaartoe sturen is zelden iets wat je wilt. Wij bouwen AI-assistenten die getraind zijn op je eigen documenten, data en processen, zodat ze antwoorden met de kennis die er echt toe doet voor jouw organisatie, en dat doen ze binnen je eigen omgeving.',
        'We beginnen met begrijpen waar de kennis zit en waar de tijd naartoe gaat. De vragen die klanten steeds stellen, de documenten waar medewerkers steeds doorheen zoeken, de verzoeken die je team elke dag opslokken. Dan bouwen we een assistent gefundeerd op dat materiaal. Hij beantwoordt vragen van klanten en medewerkers, haalt interne kennis in seconden boven, en neemt routinematige informatieverzoeken uit handen, in jouw toon en binnen jouw regels.',
        'Je informatie blijft onder je eigen controle, en er gaat geen bedrijfsdata naar derden, waardoor je voldoet aan de AVG. In plaats van een licentie per medewerker te betalen, krijg je één assistent voor de hele organisatie, zodat de kosten niet stijgen naarmate je team groeit. We bouwen het, testen het op je echte vragen, en blijven het trainen terwijl je kennis verandert.',
      ],
    },
    points: {
      en: [
        'Trained on your own context, for accurate answers',
        'Your data stays under your control, compliant with the GDPR',
        'One solution for the whole team, with no per user licences',
      ],
      nl: [
        'Getraind op jouw eigen context, voor accurate antwoorden',
        'Je data blijft onder jouw controle, voldoet aan de AVG',
        'Eén oplossing voor het hele team, zonder licenties per gebruiker',
      ],
    },
    closing: {
      en: 'Your own AI, built on your knowledge and under your control.',
      nl: 'Je eigen AI, gebouwd op jouw kennis en onder jouw controle.',
    },
  },
  {
    slug: 'modernising-systems',
    title: { en: 'Modernising existing systems', nl: 'Bestaande systemen moderniseren' },
    statement: {
      en: 'Not every ageing system needs replacing. Often, targeted modernisation is enough.',
      nl: 'Niet elk verouderd systeem hoeft vervangen te worden. Vaak is gerichte modernisering genoeg.',
    },
    summary: {
      en: 'We assess what you have, map the bottlenecks and improve where it counts, protecting the investment you have already made.',
      nl: 'We beoordelen wat je hebt, brengen de knelpunten in kaart en verbeteren waar het telt, zodat de investering die je al deed behouden blijft.',
    },
    body: {
      en: [
        'Not every ageing system needs to be torn down and rebuilt. Software that is slow, unstable or missing a few key features is often carrying years of hard won business logic, and throwing that away is expensive and risky. Before anyone reaches for a rebuild, it is worth asking a simpler question. What does this system actually need in order to work well again?',
        'We start by assessing what you have. We look under the hood, map where the bottlenecks and the risks really are, and separate what still works from what holds you back. Then we improve where it counts, in performance, stability, security, usability and the features that are missing. In many cases that gets you the same result as a full rebuild, at a fraction of the cost and with far less disruption to your live operation.',
        'Sometimes a rebuild genuinely is the wiser choice, and when that is the case we say so, with the reasoning to back it up, rather than defaulting to the most expensive option. Either way you get honest advice and a clear plan, and we protect the investment you have already made instead of writing it off. We work in careful steps, so your day to day keeps running while the system gets better underneath it.',
      ],
      nl: [
        'Niet elk verouderd systeem hoeft afgebroken en herbouwd te worden. Software die traag, instabiel of een paar functies te kort is, draagt vaak jaren aan zuurverdiende bedrijfslogica, en dat weggooien is duur en riskant. Voordat iemand naar een herbouw grijpt, is het de moeite waard om een simpelere vraag te stellen. Wat heeft dit systeem eigenlijk nodig om weer goed te werken?',
        'We beginnen met beoordelen wat je hebt. We kijken onder de motorkap, brengen in kaart waar de knelpunten en de risico’s echt zitten, en scheiden wat nog werkt van wat je tegenhoudt. Dan verbeteren we waar het telt, in snelheid, stabiliteit, veiligheid, gebruiksgemak en de functies die missen. In veel gevallen levert dat hetzelfde resultaat op als een volledige herbouw, tegen een fractie van de kosten en met veel minder verstoring van je lopende operatie.',
        'Soms is een herbouw echt de verstandigere keuze, en als dat zo is, zeggen we dat, met de onderbouwing erbij, in plaats van standaard voor de duurste optie te kiezen. Hoe dan ook krijg je eerlijk advies en een helder plan, en beschermen we de investering die je al deed in plaats van hem af te schrijven. We werken in zorgvuldige stappen, zodat je dagelijkse werk doorgaat terwijl het systeem eronder beter wordt.',
      ],
    },
    points: {
      en: [
        'Your existing investment preserved wherever possible',
        'Lower risk, with your live operation kept running',
        'Honest advice on whether to modernise or rebuild',
      ],
      nl: [
        'Je bestaande investering waar mogelijk behouden',
        'Minder risico, met je lopende operatie in de lucht',
        'Eerlijk advies over moderniseren of herbouwen',
      ],
    },
    closing: {
      en: 'A well founded judgement on what your system needs, not an automatic rebuild.',
      nl: 'Een gefundeerd oordeel over wat je systeem nodig heeft, geen automatische herbouw.',
    },
  },
  {
    slug: 'system-integration',
    title: { en: 'System integration & connectivity', nl: 'Systeemintegratie & koppelingen' },
    statement: {
      en: 'Disconnected systems that do not talk to each other cost you time, oversight and reliability.',
      nl: 'Losse systemen die niet met elkaar praten kosten je tijd, overzicht en betrouwbaarheid.',
    },
    summary: {
      en: 'We connect your existing applications so data flows automatically and reliably, a coherent landscape rather than isolated islands.',
      nl: 'We koppelen je bestaande applicaties zodat data automatisch en betrouwbaar stroomt, een samenhangend landschap in plaats van losse eilanden.',
    },
    body: {
      en: [
        'Most organisations run on a patchwork of systems that were never designed to talk to each other. So people become the integration, exporting a file here, importing it there, retyping the same data into three places, and reconciling the differences when the numbers do not match. It is slow, it is error prone, and it hides the real picture.',
        'We connect your existing applications so that data flows between them automatically and reliably. What is entered once is correct everywhere, without double entry and without export and import workarounds. We design the integration around your actual processes and data flows, and we build it to be dependable and manageable over the long term, rather than a fragile script that breaks the first time something changes.',
        'The result is a coherent system landscape instead of a collection of isolated islands. Your data quality goes up because there is only one version of the truth, your team stops doing mechanical copy work, and you finally get a reliable picture across all your applications at once. We map the flows, build the connections, test them against real data, and keep them running as your systems evolve.',
      ],
      nl: [
        'De meeste organisaties draaien op een lappendeken van systemen die nooit zijn ontworpen om met elkaar te praten. Dus worden mensen de koppeling, die hier een bestand exporteren, daar importeren, dezelfde data in drie plekken overtikken, en de verschillen rechttrekken als de cijfers niet kloppen. Het is traag, het is foutgevoelig, en het verbergt het echte beeld.',
        'We koppelen je bestaande applicaties zodat data automatisch en betrouwbaar tussen ze stroomt. Wat één keer wordt ingevoerd, is overal correct, zonder dubbel invoeren en zonder omwegen via export en import. We ontwerpen de koppeling rond je echte processen en datastromen, en bouwen hem om betrouwbaar en beheersbaar te zijn op de lange termijn, in plaats van een fragiel scriptje dat breekt zodra er iets verandert.',
        'Het resultaat is een samenhangend systeemlandschap in plaats van een verzameling losse eilanden. Je datakwaliteit gaat omhoog omdat er maar één versie van de waarheid is, je team stopt met mechanisch overtikwerk, en je krijgt eindelijk een betrouwbaar beeld over al je applicaties tegelijk. We brengen de stromen in kaart, bouwen de koppelingen, testen ze tegen echte data, en houden ze draaiend terwijl je systemen evolueren.',
      ],
    },
    points: {
      en: [
        'Enter data once, and it is current everywhere',
        'Higher data quality, with far fewer errors',
        'A reliable picture across all your applications',
      ],
      nl: [
        'Voer data één keer in, en het is overal actueel',
        'Hogere datakwaliteit, met veel minder fouten',
        'Een betrouwbaar beeld over al je applicaties',
      ],
    },
    closing: {
      en: 'From separate systems to one coherent whole.',
      nl: 'Van losse systemen naar één samenhangend geheel.',
    },
  },
];

const faqList = [
  {
    question: {
      en: 'How do you determine the price of a project?',
      nl: 'Hoe bepalen jullie de prijs van een project?',
    },
    answer: {
      en: 'Every engagement starts with an analysis of your processes and what a solution must deliver. The scope and the investment follow from that, including, where relevant, the payback period. The price is grounded in value, never plucked from the air.',
      nl: 'Elk traject begint met een analyse van je processen en wat een oplossing moet opleveren. De scope en de investering volgen daaruit, inclusief, waar relevant, de terugverdientijd. De prijs is gebaseerd op waarde, nooit uit de lucht gegrepen.',
    },
  },
  {
    question: { en: 'How long does a project take?', nl: 'Hoe lang duurt een project?' },
    answer: {
      en: 'For custom software we typically go from concept to a working application in around twelve weeks. Automations and integrations are often shorter. After the initial analysis you get a realistic timeline based on milestones.',
      nl: 'Voor software op maat gaan we meestal in ongeveer twaalf weken van concept naar een werkende applicatie. Automatiseringen en koppelingen zijn vaak korter. Na de eerste analyse krijg je een realistische planning op basis van mijlpalen.',
    },
  },
  {
    question: {
      en: 'Who owns the software and the source code?',
      nl: 'Van wie is de software en de broncode?',
    },
    answer: {
      en: 'You do. On delivery, the source code, the intellectual property and full ownership are yours, and you are never locked in to us.',
      nl: 'Van jou. Bij oplevering zijn de broncode, het intellectueel eigendom en het volledige eigendom van jou, en je zit nooit aan ons vast.',
    },
  },
  {
    question: {
      en: 'Do we have to replace our existing systems?',
      nl: 'Moeten we onze bestaande systemen vervangen?',
    },
    answer: {
      en: 'No. We connect to and build on the systems you already have wherever that makes sense, and only recommend replacement when it is genuinely the better choice, backed by substantiation.',
      nl: 'Nee. We koppelen aan en bouwen voort op de systemen die je al hebt waar dat zinvol is, en adviseren vervanging alleen als dat echt de betere keuze is, met onderbouwing.',
    },
  },
  {
    question: { en: 'What happens after delivery?', nl: 'Wat gebeurt er na de oplevering?' },
    answer: {
      en: 'We stay involved, with maintenance, functional management and additional AI features. We build on what we deliver rather than handing it over and disappearing.',
      nl: 'We blijven betrokken, met onderhoud, functioneel beheer en extra AI-functies. We bouwen voort op wat we opleveren in plaats van het over te dragen en te verdwijnen.',
    },
  },
  {
    question: {
      en: 'Is our data secure and GDPR compliant?',
      nl: 'Is onze data veilig en voldoet ze aan de AVG?',
    },
    answer: {
      en: 'Yes. Security and privacy are part of the design from the start. For AI solutions your information stays within your own environment. No business data leaves for third parties.',
      nl: 'Ja. Veiligheid en privacy zitten vanaf het begin in het ontwerp. Voor AI-oplossingen blijft je informatie binnen je eigen omgeving. Er gaat geen bedrijfsdata naar derden.',
    },
  },
];

const L = locale => (locale === 'en' ? 'en' : 'nl');

function localizeService(service, locale) {
  if (!service) return null;
  const l = L(locale);
  return {
    slug: service.slug,
    title: service.title[l],
    statement: service.statement[l],
    summary: service.summary[l],
    body: service.body[l],
    points: service.points[l],
    closing: service.closing[l],
  };
}

export function getServices(locale) {
  return services.map(service => localizeService(service, locale));
}

export function getService(slug, locale) {
  return localizeService(
    services.find(service => service.slug === slug),
    locale
  );
}

export function getAdjacentServices(slug, locale) {
  const l = L(locale);
  const index = services.findIndex(service => service.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const brief = service =>
    service ? { slug: service.slug, title: service.title[l] } : null;
  return {
    prev: index > 0 ? brief(services[index - 1]) : null,
    next: index < services.length - 1 ? brief(services[index + 1]) : null,
  };
}

export function getFaqs(locale) {
  const l = L(locale);
  return faqList.map(faq => ({ question: faq.question[l], answer: faq.answer[l] }));
}
