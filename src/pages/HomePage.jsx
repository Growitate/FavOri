import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Compass, Layers, Building2, ShieldCheck, Check, ChevronRight } from 'lucide-react';
import { HOME_DATA } from '../data/home';
import { PRODUCTS } from '../data/products';
import { usePageSEO } from '../hooks/usePageSEO';
import { Button } from '../components/Button';
import { SmartImage } from '../components/SmartImage';
import { CursorGlowCard } from '../components/CursorGlowCard';
import { TrustSection } from '../components/TrustSection';
import { CtaBanner } from '../components/CtaBanner';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';

const USP_ICONS = {
  Compass,
  Layers,
  Building2,
  ShieldCheck,
};

export function HomePage() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  usePageSEO({
    title: 'Bulk Handmade & Custom-Designed Carpets',
    description:
      'FavOri Expo manufactures custom-designed handmade carpets in bulk for commercial hospitality, offices, and luxury residential interiors.',
    path: '/',
    ogImage: HOME_DATA.hero.image.url,
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.06]);

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      {/* 1. REFERENCE-STYLE HERO WITH SEAMLESS FEATHERED INTERIOR + PEEKING WHITE SHEET */}
      <section ref={heroRef} className="hero-reference-mesh relative pt-20 sm:pt-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Hero Stage: Wordmark + Calm Copy + Glassy CTA overlapping Feathered Room */}
          <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center lg:items-end pb-10 sm:pb-14 lg:pb-16">
            {/* Desktop/Tablet Seamless Feathered Architectural Interior anchored bottom-right flush with sheet */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block absolute right-0 bottom-0 w-[76%] lg:w-[74%] h-[96%] rounded-tr-[28px] overflow-hidden z-10 pointer-events-none hero-room-feather"
            >
              <motion.div style={{ scale: heroImgScale }} className="w-full h-full origin-bottom-right">
                <SmartImage
                  src={HOME_DATA.hero.image.url}
                  alt={HOME_DATA.hero.image.alt}
                  width={HOME_DATA.hero.image.width}
                  height={HOME_DATA.hero.image.height}
                  eager
                  fetchPriority="high"
                  className="w-full h-full !bg-transparent"
                  imgClassName="object-[78%_bottom]"
                />
              </motion.div>
            </motion.div>

            {/* Slow Floating Glass Chip on Room Bottom-Right */}
            <div className="hidden md:inline-flex animate-float-slow absolute bottom-5 right-5 z-20 items-center gap-2 rounded-full bg-surface/85 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-ink shadow-[0_12px_28px_-10px_rgba(0,0,0,0.3)]">
              <span className="w-2 h-2 rounded-full bg-terracotta" aria-hidden="true" />
              <span>{HOME_DATA.hero.floatingChip}</span>
            </div>

            {/* Foreground Typography + Glass CTA (z-20 above the room) */}
            <div className="relative z-20 w-full pt-4 sm:pt-8">
              <motion.h1
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold lowercase text-[#F4EFE8] tracking-[-0.04em] leading-[0.9] select-none sm:whitespace-nowrap"
                style={{ fontSize: 'clamp(3.35rem, 9.2vw, 8.75rem)' }}
              >
                {HOME_DATA.hero.wordmark}
              </motion.h1>

              <motion.p
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.55 }}
                className="mt-4 sm:mt-5 text-base sm:text-lg font-normal text-[#F4EFE8]/85 leading-relaxed max-w-[38ch]"
              >
                {HOME_DATA.hero.subheadline}
              </motion.p>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.55 }}
                className="mt-6 sm:mt-7 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-surface/15 backdrop-blur-md border border-cream/25 px-6 py-3 text-sm sm:text-base font-medium text-[#F4EFE8] hover:bg-terracotta hover:border-terracotta hover:text-surface transition-all duration-300 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)]"
                >
                  <span>{HOME_DATA.hero.primaryCta}</span>
                  <ChevronRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>

              {/* Mobile Room Preview Card (< md) */}
              <div className="md:hidden mt-7 rounded-[24px] overflow-hidden relative card-shadow-lg aspect-[16/10]">
                <SmartImage
                  src={HOME_DATA.hero.image.url}
                  alt={HOME_DATA.hero.image.alt}
                  width={HOME_DATA.hero.image.width}
                  height={HOME_DATA.hero.image.height}
                  eager
                  fetchPriority="high"
                  className="w-full h-full"
                  imgClassName="object-[72%_bottom]"
                />
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-surface/85 backdrop-blur-md px-3 py-1 text-xs font-medium text-ink shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta" aria-hidden="true" />
                  <span>{HOME_DATA.hero.floatingChip}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inset Floating White Sheet ("Peek" Device): Titles ABOVE Rounded Thumbnails */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 rounded-t-[28px] sm:rounded-t-[36px] bg-surface shadow-[0_-24px_60px_-24px_rgba(0,0,0,0.28)] px-5 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-8 sm:pb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {HOME_DATA.peekCards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34 + idx * 0.08, duration: 0.5 }}
                >
                  <Link to={card.to} className="group block">
                    <h2 className="font-sans text-lg sm:text-xl font-medium text-ink mb-3 group-hover:text-forest transition-colors">
                      {card.title}
                    </h2>
                    <div className="aspect-[16/10] rounded-[18px] overflow-hidden shadow-[0_14px_32px_-20px_rgba(0,0,0,0.22)]">
                      <SmartImage
                        src={card.image.url}
                        alt={card.image.alt}
                        width={card.image.width}
                        height={card.image.height}
                        className="w-full h-full"
                        imgClassName="group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT WE DO (PROBLEM -> SOLUTION SPLIT WITH WOVEN TEXTURE) */}
      <section className="py-16 sm:py-24 woven-texture">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="inline-block text-xs uppercase tracking-[0.2em] font-medium text-forest">
                {HOME_DATA.whatWeDo.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-ink leading-[1.12]">
                {HOME_DATA.whatWeDo.heading}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-[24px] bg-surface/85 p-5 card-shadow">
                  <div className="text-xs uppercase tracking-[0.15em] font-semibold text-[#8D542B] mb-2">
                    {HOME_DATA.whatWeDo.problemTitle}
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {HOME_DATA.whatWeDo.problemText}
                  </p>
                </div>
                <div className="rounded-[24px] bg-surface p-5 card-shadow">
                  <div className="text-xs uppercase tracking-[0.15em] font-semibold text-forest mb-2">
                    {HOME_DATA.whatWeDo.solutionTitle}
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {HOME_DATA.whatWeDo.solutionText}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 pt-1">
                {HOME_DATA.whatWeDo.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-ink">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-forest text-surface shrink-0">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Button to="/contact" variant="primary" size="md" showArrow>
                  Start a Custom Brief
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="rounded-[28px] sm:rounded-[34px] bg-surface p-3 sm:p-4 card-shadow-lg">
                <div className="aspect-[4/3] rounded-[22px] sm:rounded-[26px] overflow-hidden">
                  <SmartImage
                    src={HOME_DATA.whatWeDo.image.url}
                    alt={HOME_DATA.whatWeDo.image.alt}
                    width={HOME_DATA.whatWeDo.image.width}
                    height={HOME_DATA.whatWeDo.image.height}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. USP SECTION (4-CARD BENTO GRID) */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-3 mb-10 sm:mb-14"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-forest">
              {HOME_DATA.usps.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-ink leading-[1.12]">
              {HOME_DATA.usps.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
            {HOME_DATA.usps.cards.map((card, idx) => {
              const IconComp = USP_ICONS[card.icon] || Compass;
              const colSpan =
                idx === 0 || idx === 3 ? 'lg:col-span-7' : 'lg:col-span-5';
              return (
                <motion.div
                  key={card.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  className={colSpan}
                >
                  <CursorGlowCard className="p-7 sm:p-9 h-full">
                    <div className="flex flex-col justify-between h-full gap-6">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cream text-forest">
                        <IconComp className="w-6 h-6" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <div className="space-y-2 max-w-[52ch]">
                        <h3 className="font-serif text-2xl font-medium text-ink">
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </CursorGlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS PREVIEW */}
      <section className="py-16 sm:py-24 bg-surface/65">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="space-y-2.5 max-w-xl"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-forest">
                Featured Weaves
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink">
                Crafted in bulk across signature carpet weaves
              </h2>
            </motion.div>
            <Button to="/products" variant="outline" size="md" showArrow className="self-start sm:self-auto">
              View all products
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (4-STEP ANIMATED TIMELINE) */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-forest">
              {HOME_DATA.howItWorks.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-ink">
              {HOME_DATA.howItWorks.heading}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Desktop horizontal connector line */}
            <motion.div
              aria-hidden="true"
              initial={prefersReduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block origin-left absolute top-11 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-forest/30 via-terracotta/60 to-forest/30"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative z-10">
              {HOME_DATA.howItWorks.steps.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.1, duration: 0.45 }}
                >
                  <CursorGlowCard className="p-6 sm:p-7 h-full">
                    <div className="space-y-4">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-forest text-cream font-display font-bold text-sm">
                        {item.step}
                      </span>
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-xl font-medium text-ink">{item.title}</h3>
                        <p className="text-sm text-ink-soft leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CursorGlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST BAR AT THE END (MARQUEE + 4 COUNTERS + TRUST BADGES) */}
      <TrustSection showMarquee />

      {/* 7. CTA BANNER */}
      <CtaBanner />

      {/* Product Modal for Featured Cards */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
