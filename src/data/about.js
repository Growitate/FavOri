import { IMAGES } from './images';

export const ABOUT_DATA = {
  hero: {
    eyebrow: 'About FavOri Expo',
    heading: 'Crafted with purpose.',
    lead: 'Direct-from-loom handmade carpet manufacturing built for architectural vision, reliable volume, and enduring partnerships.',
    image: IMAGES.aboutHeroCraft,
    secondaryImage: IMAGES.aboutProductionScale,
  },
  story: {
    eyebrow: 'Our Story',
    heading: 'Raising the standard of handmade bulk carpets.',
    paragraph:
      'Founded with a clear mission, FavOri Expo was created to raise the standard of excellence in the industry. What began as a passion for solving real problems has grown into a trusted destination for clients seeking quality, innovation, and long-term partnership.',
    supporting:
      'By bridging generational weaving craft with disciplined production planning, we give trade buyers, interior studios, and commercial developers complete creative control without sacrificing consistency or lead-time reliability.',
  },
  missionVision: [
    {
      id: 'mission',
      label: 'Our Mission',
      text: 'To empower our clients by delivering premier, dependable, and transformative solutions that create lasting value.',
    },
    {
      id: 'vision',
      label: 'Our Vision',
      text: 'To become the leading and most trusted authority in our field, known for innovation, integrity, and relentless customer satisfaction.',
    },
  ],
  values: {
    eyebrow: 'Core Principles',
    heading: 'What guides every loom and delivery.',
    items: [
      {
        id: 'quality',
        title: 'Quality',
        description:
          'Natural long-staple fibers, dense construction, and meticulous finishing verified on every batch.',
        icon: 'Award',
      },
      {
        id: 'reliability',
        title: 'Reliability',
        description:
          'Transparent production milestones and dependable bulk fulfillment tailored to project schedules.',
        icon: 'Clock',
      },
      {
        id: 'innovation',
        title: 'Innovation',
        description:
          'Digital CAD visualization and progressive dyeing techniques paired with timeless handcrafting.',
        icon: 'Sparkles',
      },
      {
        id: 'integrity',
        title: 'Integrity',
        description:
          'Honest material specifications, fair artisan practices, and long-term partnership accountability.',
        icon: 'Handshake',
      },
    ],
  },
};
