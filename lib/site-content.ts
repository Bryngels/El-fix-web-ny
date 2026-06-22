export const contact = {
  name: "El-Fix AB",
  street: "Björneborgsgatan 49",
  postalCity: "854 61 Sundsvall",
  phoneDisplay: "060-17 58 08",
  phoneHref: "tel:060175808",
  email: "info@el-fix.se",
  hours: "Måndag-fredag 07.00-16.00",
};

export const navItems = [
  { label: "Tjänster", href: "/#tjanster" },
  { label: "Företag", href: "/#foretag" },
  { label: "Energi", href: "/#energi" },
  { label: "Elbesiktning", href: "/tjanster/elbesiktning/" },
  { label: "Elektriker Sundsvall", href: "/elektriker-sundsvall/" },
];

export const trustItems = [
  "Behöriga elektriker",
  "Medlem i Elkedjan",
  "IN ELTEST",
  "Lokalt team i Sundsvall",
];

export const serviceCards = [
  {
    title: "Elinstallation",
    href: "/tjanster/elinstallation/",
    copy: "Installationer, centraler, belysning och uppgraderingar med dokumenterat utfört arbete.",
    image: {
      src: "/images/elkedjan-installation-cabinet.webp",
      alt: "Elektriker arbetar i elcentral",
    },
  },
  {
    title: "Service & felsökning",
    href: "/tjanster/service-felsokning/",
    copy: "Snabb felsökning, tydlig åtgärd och rekommendationer för nästa steg.",
    image: {
      src: "/images/elkedjan-industrial-service.webp",
      alt: "Teknisk felsökning i industriell miljö",
    },
  },
  {
    title: "Elbesiktning",
    href: "/tjanster/elbesiktning/",
    copy: "IN ELTEST, protokoll och genomgång av elanläggningen inför köp, försäljning eller renovering.",
    image: {
      src: "/images/elkedjan-elbesiktning-detail.webp",
      alt: "Kontroll av elanläggning och säkringar",
    },
  },
  {
    title: "Laddbox",
    href: "/tjanster/laddbox/",
    copy: "Trygg installation av laddbox för villa, BRF och företag med rätt lastbalansering.",
    image: {
      src: "/images/elkedjan-laddbox-car.webp",
      alt: "Elbil laddas med installerad laddbox",
    },
  },
];

export const audienceCards = [
  {
    title: "Privatkund",
    copy: "Trygga installationer, laddbox, felsökning och elbesiktning för hemmet.",
  },
  {
    title: "Företag",
    copy: "Service, drift, projektledning och dokumentation med minimal störning i verksamheten.",
  },
  {
    title: "BRF & fastighet",
    copy: "Besiktning, underhåll, serviceavtal och energiåtgärder för gemensamma anläggningar.",
  },
  {
    title: "Energioptimering",
    copy: "El, laddning, solenergi, styrning och värme i samordnade lösningar.",
  },
];

export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  image: {
    src: string;
    alt: string;
  };
  bullets: string[];
  process: string[];
  proof: string[];
  faqs: { question: string; answer: string }[];
};

export const servicePages: Record<string, ServicePage> = {
  "elinstallation": {
    slug: "elinstallation",
    eyebrow: "Elinstallation",
    title: "Elinstallation i Sundsvall för hem, företag och fastigheter",
    description:
      "Trygga elinstallationer i Sundsvall med behöriga elektriker, tydlig planering och dokumenterat utfört arbete.",
    intro:
      "El-Fix hjälper till med nya installationer, kompletteringar, centraler, belysning och uppgraderingar där arbetet behöver bli rätt från början.",
    image: {
      src: "/images/elkedjan-installation-cabinet.webp",
      alt: "Noggrann elinstallation i elcentral",
    },
    bullets: [
      "Nyinstallation och komplettering i villa, lokal och fastighet",
      "Elcentraler, säkringar, jordfelsbrytare och uttag",
      "Belysning, styrning och praktiska förbättringar",
      "Mätning, märkning och dokumentation efter utfört arbete",
    ],
    process: [
      "Vi går igenom behov, plats och tekniska förutsättningar.",
      "Du får tydlig rekommendation och offertunderlag.",
      "Installationen utförs av behöriga elektriker.",
      "Arbetet kontrolleras och dokumenteras.",
    ],
    proof: [
      "Lokalt team i Sundsvall",
      "Medlem i Elkedjan",
      "Mångårig erfarenhet av el, data, tele och säkerhet",
    ],
    faqs: [
      {
        question: "Kan ni hjälpa både privatpersoner och företag?",
        answer:
          "Ja, El-Fix arbetar med villa, lägenhet, BRF, fastigheter och verksamheter.",
      },
      {
        question: "Kan jag få offert innan jobbet startar?",
        answer:
          "Ja. Skicka in förfrågan med adress, omfattning och gärna bilder så återkommer vi med nästa steg.",
      },
    ],
  },
  "service-felsokning": {
    slug: "service-felsokning",
    eyebrow: "Service & felsökning",
    title: "Felsökning och elservice i Sundsvall",
    description:
      "Elservice, felsökning och underhåll i Sundsvall för hem, företag och fastigheter.",
    intro:
      "När något inte fungerar behövs snabb diagnos, rätt åtgärd och tydlig återkoppling. El-Fix felsöker, mäter och dokumenterar så du vet vad som hänt och vad som bör göras.",
    image: {
      src: "/images/elkedjan-industrial-service.webp",
      alt: "Elektriker felsöker installation i teknisk miljö",
    },
    bullets: [
      "Felsökning av elproblem, uttag, centraler och belysning",
      "Service och underhåll av befintliga installationer",
      "Serviceavtal för företag och fastigheter",
      "Planerade åtgärder med smart rutt- och kalenderbokning",
    ],
    process: [
      "Du beskriver problemet och hur brådskande det är.",
      "Vi prioriterar ärendet och matchar tekniker mot område.",
      "Teknikern felsöker, mäter och åtgärdar där det är möjligt.",
      "Du får rekommendation om vidare åtgärder vid behov.",
    ],
    proof: [
      "Erfarenhet av arbete i pågående verksamheter",
      "Tydlig dokumentation efter åtgärd",
      "Serviceavtal efter behov",
    ],
    faqs: [
      {
        question: "Kan ni ta brådskande ärenden?",
        answer:
          "Ja, markera ärendet som brådskande i formuläret eller ring om det behöver hanteras direkt.",
      },
      {
        question: "Erbjuder ni serviceavtal?",
        answer:
          "Ja, El-Fix erbjuder serviceavtal för el- och teleanläggningar enligt behov.",
      },
    ],
  },
  "elbesiktning": {
    slug: "elbesiktning",
    eyebrow: "IN ELTEST",
    title: "Elbesiktning i Sundsvall med protokoll och tydliga priser",
    description:
      "Boka elbesiktning i Sundsvall. El-Fix utför IN ELTEST med kontroll av central, jordfelsbrytare, uttag, kablar och protokoll.",
    intro:
      "En elanläggning kan ha fel som inte syns. Med IN ELTEST får du en strukturerad genomgång av elsäkerheten och ett protokoll som visar om något behöver åtgärdas.",
    image: {
      src: "/images/elkedjan-elbesiktning-detail.webp",
      alt: "Detaljkontroll av säkringar vid elbesiktning",
    },
    bullets: [
      "Kontroll av elcentral, jordfelsbrytare och säkringar",
      "Kontroll av uttag, kablar, dosor och strömbrytare",
      "Utförligt protokoll efter genomgång",
      "Kostnadsförslag på åtgärder om brister upptäcks",
    ],
    process: [
      "Du bokar besiktning och beskriver fastigheten.",
      "Vi kontrollerar elanläggningen på plats.",
      "Du får protokoll och tydlig bedömning.",
      "Vi kan offerera åtgärder om något behöver rättas till.",
    ],
    proof: [
      "IN ELTEST får utföras av registrerade elinstallatörer",
      "Pris för normalvilla eller lägenhet upp till 160 kvm: 8.000 kr inkl. moms",
      "Resekostnad ingår inom 2 mil från Sundsvalls centrum",
    ],
    faqs: [
      {
        question: "När är elbesiktning extra viktig?",
        answer:
          "Vid köp eller försäljning, efter renovering, i äldre anläggningar eller om elanläggningen byggts ut över tid.",
      },
      {
        question: "Vad kostar tillkommande central?",
        answer:
          "Nuvarande prisuppgift är 1.500 kr per tillkommande elcentral och 1.700 kr per ekonomibyggnad upp till 40 kvm.",
      },
    ],
  },
  "laddbox": {
    slug: "laddbox",
    eyebrow: "Laddbox",
    title: "Installera laddbox i Sundsvall",
    description:
      "Installation av laddbox i Sundsvall för villa, BRF och företag med säker elinstallation och rätt dimensionering.",
    intro:
      "En laddbox ska vara säker, rätt dimensionerad och anpassad till elanläggningen. El-Fix hjälper till från bedömning till installation och uppföljning.",
    image: {
      src: "/images/elkedjan-laddbox-car.webp",
      alt: "Installerad laddbox vid bostad med elbil",
    },
    bullets: [
      "Laddbox för villa, BRF och företag",
      "Kontroll av central, säkring och kapacitet",
      "Lastbalansering och smart laddning vid behov",
      "Samordning med solenergi och energioptimering",
    ],
    process: [
      "Vi bedömer elanläggning och laddbehov.",
      "Du får rekommendation på lösning och omfattning.",
      "Installationen utförs och kontrolleras.",
      "Du får hjälp att förstå drift, kapacitet och nästa steg.",
    ],
    proof: [
      "Behöriga elektriker",
      "Samarbete kring kompletta energilösningar",
      "Lokalt utförande i Sundsvallsområdet",
    ],
    faqs: [
      {
        question: "Behöver elanläggningen kontrolleras före laddbox?",
        answer:
          "Ja, vi kontrollerar förutsättningarna så laddningen blir säker och rätt dimensionerad.",
      },
      {
        question: "Kan laddbox kombineras med solenergi?",
        answer:
          "Ja, laddning kan planeras tillsammans med solenergi, styrning och övrig energioptimering.",
      },
    ],
  },
};
