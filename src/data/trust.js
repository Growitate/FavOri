/**
 * Verified trust metrics, partner categories, and trust badges for FavOri Expo.
 */
export const TRUST_DATA = {
  heading: 'Trusted by businesses and homes',
  subtitle: 'Built for interior architects, hospitality groups, and wholesale buyers worldwide.',

  // Partner segment wordmarks (greyscale by default, shift to warm palette on hover)
  partnerPlaceholders: [
    { id: 'atelier-nord', name: 'Atelier Studio', category: 'Interior Architecture' },
    { id: 'veranda-hotels', name: 'Boutique Hospitality', category: 'Hotel Group' },
    { id: 'meridian-spaces', name: 'Commercial Spaces', category: 'Corporate Procurement' },
    { id: 'casa-terra', name: 'Residential Collective', category: 'Design Trade' },
    { id: 'lumen-venues', name: 'Grand Venues', category: 'Hospitality' },
    { id: 'kraft-trade', name: 'Global Flooring Trade', category: 'Wholesale Partner' },
  ],

  // 4 animated stat counters on scroll.
  stats: [
    {
      id: 'experience',
      label: 'Years of Experience',
      numericTarget: 16,
      suffix: '',
      note: '16 years of master weaving craft',
    },
    {
      id: 'projects',
      label: 'Projects Delivered',
      numericTarget: 500,
      suffix: '+',
      note: 'Custom & bulk orders fulfilled',
    },
    {
      id: 'rating',
      label: 'Client Rating',
      numericTarget: null,
      displayValue: '4–5★',
      note: 'Good · Consistently 4 to 5 star rated',
    },
    {
      id: 'countries',
      label: 'Countries Served',
      numericTarget: 5,
      suffix: '+',
      note: 'Global export footprint',
      tags: ['USA', 'UK', 'Kuwait', 'Dubai', 'Canada'],
    },
  ],

  // Trust & capability badges
  trustBadges: [
    {
      id: 'trade-rating',
      title: 'Client Rating: 4–5 ★ (Good)',
      detail: 'Trusted feedback from trade & bulk buyers',
      icon: 'Star',
    },
    {
      id: 'loom-verified',
      title: 'Artisan-Direct Manufacturing',
      detail: 'No middlemen, direct loom supervision',
      icon: 'ShieldCheck',
    },
    {
      id: 'custom-sampling',
      title: 'Strike-Off Sampling Ready',
      detail: 'Pre-production dye & weave approval',
      icon: 'Layers',
    },
    {
      id: 'export-packing',
      title: 'Exporting to 5+ Countries',
      detail: 'USA, UK, Kuwait, Dubai, Canada & more',
      icon: 'Globe',
    },
  ],
};
