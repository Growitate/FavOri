import { IMAGES } from './images';

export const HOME_DATA = {
  hero: {
    wordmark: 'favori expo',
    subheadline:
      'We specialize in handmade carpets manufacturing for bulk — engineered for quality, reliability, and measurable success.',
    primaryCta: 'Request a Quote',
    secondaryCta: 'View Products',
    floatingChip: 'Custom Designs Available',
    image: IMAGES.heroInterior,
  },
  peekCards: [
    {
      id: 'products',
      title: 'Products',
      subtitle: 'Six handmade weaves crafted in bulk',
      to: '/products',
      image: IMAGES.peekProducts,
    },
    {
      id: 'custom-design',
      title: 'Custom Design',
      subtitle: 'Your artwork, colours & exact sizing',
      to: '/products?category=Custom',
      image: IMAGES.peekCustomDesign,
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'Direct-from-loom heritage & scale',
      to: '/about',
      image: IMAGES.peekAbout,
    },
  ],
  whatWeDo: {
    eyebrow: 'Problem to Solution',
    heading: 'Custom-designed carpets, made to your requirements.',
    problemTitle: 'The procurement gap',
    problemText:
      'Standard retail catalogs lock designers and bulk buyers into fixed sizes, inconsistent dye batches, and opaque reseller markups — forcing compromises on commercial timelines and residential aesthetics.',
    solutionTitle: 'The FavOri Expo standard',
    solutionText:
      'We connect you directly with our weaving workshops. Share a sketch, colour reference, or CAD plan, and our team translates it into physical strike-off samples, locks batch consistency, and manufactures at scale with dependable delivery.',
    highlights: [
      'Pantone & yarn pom-box colour matching',
      'Custom sizes, irregular shapes & seamless repeats',
      'Unified quality checks before dispatch',
    ],
    image: IMAGES.whatWeDoCraft,
  },
  usps: {
    eyebrow: 'Why FavOri Expo',
    heading: 'Commercial and residential, made to your brief.',
    cards: [
      {
        id: 'custom-design',
        title: 'Custom Design Projects',
        description:
          'From hand-sketched motifs to corporate logos, every weave, pile height, and colourway is tailored to your project brief.',
        icon: 'Compass',
      },
      {
        id: 'bulk-manufacturing',
        title: 'Bulk Manufacturing',
        description:
          'Scalable loom capacity built for multi-room hospitality rollouts, wholesalers, and retail private-label lines.',
        icon: 'Layers',
      },
      {
        id: 'commercial-residential',
        title: 'Commercial and Residential',
        description:
          'High-traffic contract durability for hotels and offices alongside heirloom warmth for private residences.',
        icon: 'Building2',
      },
      {
        id: 'quality-assured',
        title: 'Quality Assured',
        description:
          'Multi-stage inspection across yarn twist, knot density, colorfast washing, and moisture-protected export packing.',
        icon: 'ShieldCheck',
      },
    ],
  },
  howItWorks: {
    eyebrow: 'Workflow',
    heading: 'From brief to floor, seamlessly.',
    steps: [
      {
        step: '01',
        title: 'Share Requirement',
        description: 'Send your artwork, size schedule, space category, and estimated bulk quantity.',
      },
      {
        step: '02',
        title: 'Design & Sampling',
        description: 'We prepare CAD layouts, yarn palette cards, and physical weave swatches for sign-off.',
      },
      {
        step: '03',
        title: 'Handmade Production',
        description: 'Master weavers craft your order on dedicated looms with batch-level quality checks.',
      },
      {
        step: '04',
        title: 'Delivery',
        description: 'Professionally finished, labelled, and packed for dependable global dispatch.',
      },
    ],
  },
  ctaBanner: {
    heading: "Have a design in mind? Let's make it.",
    subtext:
      'Share dimensions, mood boards, or quantity targets — our bulk carpet specialists respond promptly.',
    buttonLabel: 'Get a Quote',
    to: '/contact',
  },
};
