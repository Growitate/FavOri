import { IMAGES } from './images';

export const PRODUCT_CATEGORIES = ['All', 'Residential', 'Commercial', 'Custom'];

export const PRODUCTS = [
  {
    id: 'hand-knotted-carpets',
    slug: 'hand-knotted-carpets',
    name: 'Hand-Knotted Carpets',
    category: 'Residential',
    categories: ['Residential', 'Custom'],
    featured: true,
    shortDescription:
      'Heirloom-grade weaves crafted knot by knot with dense construction and intricate traditional patterns.',
    fullDescription:
      'Individually tied on vertical looms by master weavers, our hand-knotted carpets deliver enduring density, rich tonal patina, and multi-decade resilience for luxury residences and signature suites.',
    priceLabel: 'Price on request',
    image: IMAGES.productHandKnotted,
    specs: {
      material: 'New Zealand Wool, Himalayan Wool & Pure Silk accents',
      sizeOptions: 'Standard room sizes & bespoke dimensions up to 6m × 10m',
      pile: '8mm – 14mm hand-sheared dense pile',
      finish: 'Double-washed, hand-carved bevels & hand-knotted fringe',
      moq: 'On request (sample & bulk tiers available)',
    },
  },
  {
    id: 'hand-tufted-carpets',
    slug: 'hand-tufted-carpets',
    name: 'Hand-Tufted Carpets',
    category: 'Custom',
    categories: ['Residential', 'Commercial', 'Custom'],
    featured: true,
    shortDescription:
      'Bold custom designs with a plush, sculptural soft pile — ideal for fast-turnaround bulk orders.',
    fullDescription:
      'Built for design flexibility and crisp pattern execution, hand-tufted carpets allow seamless Pantone colour matching, multi-level carving, and rapid bulk production without sacrificing tactile softness.',
    priceLabel: 'Price on request',
    image: IMAGES.productHandTufted,
    specs: {
      material: '100% Virgin Wool, Wool-Viscose blend or Bamboo Silk',
      sizeOptions: 'Any custom width, length, or organic architectural shape',
      pile: '10mm – 18mm plush cut & loop pile',
      finish: 'Natural latex backing with heavy cotton canvas & hand-bound edge',
      moq: 'On request',
    },
  },
  {
    id: 'flatweave-dhurries-kilims',
    slug: 'flatweave-dhurries-kilims',
    name: 'Flatweave Dhurries & Kilims',
    category: 'Residential',
    categories: ['Residential', 'Commercial'],
    featured: true,
    shortDescription:
      'Durable, reversible floor textiles featuring clean contemporary geometry and breathable natural fibers.',
    fullDescription:
      'Woven flat without pile on traditional pit and frame looms, our dhurries and kilims offer reversible longevity, crisp geometric borders, and effortless maintenance for modern residences and boutique spaces.',
    priceLabel: 'Price on request',
    image: IMAGES.productFlatweave,
    specs: {
      material: 'Carded Wool, Combed Cotton & Hemp-Jute blends',
      sizeOptions: 'Runners, standard area formats & custom multi-unit sets',
      pile: 'Flatweave (4mm – 6mm low profile)',
      finish: 'Reversible structure with braided or tucked selvage',
      moq: 'On request',
    },
  },
  {
    id: 'custom-logo-pattern-carpets',
    slug: 'custom-logo-pattern-carpets',
    name: 'Custom Logo & Pattern Carpets',
    category: 'Custom',
    categories: ['Commercial', 'Custom'],
    featured: false,
    shortDescription:
      'Made precisely to your artwork, brand crests, or architectural CAD drawings for offices and showrooms.',
    fullDescription:
      'Translate vector brand marks, bespoke motifs, and architectural mood boards into high-definition woven carpets. Our in-house CAD studio prepares strike-off swatches prior to full bulk production.',
    priceLabel: 'Price on request',
    image: IMAGES.productCustomLogo,
    specs: {
      material: 'High-twist Wool, Contract Nylon or Wool-Nylon 80/20 blend',
      sizeOptions: 'Custom reception pads, boardroom footprints & full-floor modules',
      pile: '9mm – 14mm precision-carved tufted or Axminster-grade',
      finish: 'Anti-static treatment, commercial jute backing & flame-test ready',
      moq: 'On request',
    },
  },
  {
    id: 'hospitality-commercial-carpets',
    slug: 'hospitality-commercial-carpets',
    name: 'Hospitality & Commercial Carpets',
    category: 'Commercial',
    categories: ['Commercial', 'Custom'],
    featured: false,
    shortDescription:
      'High-traffic performance engineered for hotel lobbies, executive offices, corridors, and public venues.',
    fullDescription:
      'Designed specifically for heavy footfall, acoustic dampening, and consistent dye lots across multi-floor projects. FavOri Expo coordinates bulk phased deliveries aligned with your site schedule.',
    priceLabel: 'Price on request',
    image: IMAGES.productHospitality,
    specs: {
      material: '80/20 Wool-Nylon commercial yarn or Solution-Dyed fiber',
      sizeOptions: 'Broadloom widths, corridor runners & bespoke suite rugs',
      pile: 'Dense low-to-medium cut & textured loop (7mm – 11mm)',
      finish: 'Stain-resistant finish, high tuft-lock & reinforced commercial backing',
      moq: 'On request',
    },
  },
  {
    id: 'runners-accent-rugs',
    slug: 'runners-accent-rugs',
    name: 'Runners & Accent Rugs',
    category: 'Residential',
    categories: ['Residential', 'Commercial'],
    featured: false,
    shortDescription:
      'Statement pieces proportioned for corridors, entryways, gallery passages, and intimate living spaces.',
    fullDescription:
      'Custom-length runners and curated accent rugs crafted to unify transitional zones. Available across hand-knotted, hand-tufted, and flatweave techniques in coordinated bulk collections.',
    priceLabel: 'Price on request',
    image: IMAGES.productRunners,
    specs: {
      material: 'Wool, Wool-Cotton, or Viscose highlights',
      sizeOptions: 'Widths 70cm – 120cm; custom lengths up to 15m',
      pile: '6mm – 12mm tailored to footfall',
      finish: 'Non-slip underfelt compatible & mitered corner binding',
      moq: 'On request',
    },
  },
];
