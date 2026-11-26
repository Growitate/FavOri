import { motion, useReducedMotion } from 'framer-motion';
import { Award, Clock, Sparkles, Handshake } from 'lucide-react';
import { ABOUT_DATA } from '../data/about';
import { usePageSEO } from '../hooks/usePageSEO';
import { SmartImage } from '../components/SmartImage';
import { CursorGlowCard } from '../components/CursorGlowCard';
import { TrustSection } from '../components/TrustSection';
import { CtaBanner } from '../components/CtaBanner';

const VALUE_ICONS = {
  Award,
  Clock,
  Sparkles,
  Handshake,
};

export function AboutPage() {
  const prefersReduced = useReducedMotion();

  usePageSEO({
    title: 'About Us | Crafted With Purpose',
    description:
      'Learn about FavOri Expo — founded to raise the standard of excellence in bulk handmade carpet manufacturing through quality, reliability, and long-term partnership.',
    path: '/about',
    ogImage: ABOUT_DATA.hero.image.url,
  });

  return (
    <div className="pt-28 sm:pt-36">
      {/* Hero */}
      <section className="hero-mesh-bg pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-6 space-y-5"
            >
              <span className="inline-block text-xs uppercase tracking-[0.2em] font-medium text-forest">
                {ABOUT_DATA.hero.eyebrow}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-[-0.025em] text-ink leading-[1.04]">
                {ABOUT_DATA.hero.heading}
              </h1>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-[54ch]">
                {ABOUT_DATA.hero.lead}
              </p>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="lg:col-span-6 grid grid-cols-12 gap-4 items-end"
            >
              <div className="col-span-7 rounded-[28px] bg-surface p-2.5 card-shadow">
                <div className="aspect-[4/4.5] rounded-[22px] overflow-hidden">
                  <SmartImage
                    src={ABOUT_DATA.hero.image.url}
                    alt={ABOUT_DATA.hero.image.alt}
                    width={ABOUT_DATA.hero.image.width}
                    height={ABOUT_DATA.hero.image.height}
                    eager
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="col-span-5 rounded-[28px] bg-surface p-2.5 card-shadow">
                <div className="aspect-[4/5] rounded-[22px] overflow-hidden">
                  <SmartImage
                    src={ABOUT_DATA.hero.secondaryImage.url}
                    alt={ABOUT_DATA.hero.secondaryImage.alt}
                    width={ABOUT_DATA.hero.secondaryImage.width}
                    height={ABOUT_DATA.hero.secondaryImage.height}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 sm:py-24 woven-texture">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-[32px] bg-surface p-8 sm:p-12 lg:p-16 card-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-2.5">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8D542B]">
                  {ABOUT_DATA.story.eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink leading-[1.12]">
                  {ABOUT_DATA.story.heading}
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <p className="text-base sm:text-lg text-ink leading-relaxed max-w-[65ch]">
                  {ABOUT_DATA.story.paragraph}
                </p>
                <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-[65ch]">
                  {ABOUT_DATA.story.supporting}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Side-by-Side Cards */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ABOUT_DATA.missionVision.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <CursorGlowCard
                  className={`p-8 sm:p-11 h-full ${
                    idx === 0 ? 'bg-surface' : 'bg-cream/65'
                  }`}
                >
                  <div className="space-y-4">
                    <span className="inline-flex items-center rounded-full bg-forest/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] font-medium text-forest">
                      {item.label}
                    </span>
                    <p className="font-serif text-2xl sm:text-3xl font-medium tracking-[-0.015em] text-ink leading-[1.3]">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>
                </CursorGlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Row */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-2.5 mb-10 sm:mb-12"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-forest">
              {ABOUT_DATA.values.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink">
              {ABOUT_DATA.values.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {ABOUT_DATA.values.items.map((val, idx) => {
              const IconComp = VALUE_ICONS[val.icon] || Award;
              return (
                <motion.div
                  key={val.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                >
                  <CursorGlowCard className="p-6 sm:p-7 h-full">
                    <div className="space-y-4">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-cream text-forest">
                        <IconComp className="w-5 h-5" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-xl font-medium text-ink">{val.title}</h3>
                        <p className="text-sm text-ink-soft leading-relaxed">{val.description}</p>
                      </div>
                    </div>
                  </CursorGlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Repeat Trust Stats (without marquee for clean cadence) */}
      <TrustSection showMarquee={false} compact />

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}
