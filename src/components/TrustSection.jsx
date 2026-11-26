import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Star, ShieldCheck, Layers, Globe } from 'lucide-react';
import { TRUST_DATA } from '../data/trust';
import { CursorGlowCard } from './CursorGlowCard';

const BADGE_ICONS = {
  Star,
  ShieldCheck,
  Layers,
  Globe,
};

function AnimatedStatValue({ stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = useReducedMotion();
  const staticValue = stat.displayValue ?? stat.placeholderDisplay ?? '';
  const [display, setDisplay] = useState(
    stat.numericTarget !== null ? `0${stat.suffix || ''}` : staticValue
  );

  useEffect(() => {
    if (!inView) return;

    if (stat.numericTarget !== null && typeof stat.numericTarget === 'number') {
      if (prefersReduced) {
        setDisplay(`${stat.numericTarget}${stat.suffix || ''}`);
        return;
      }
      const duration = 900;
      const start = performance.now();
      let rafId = 0;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(eased * stat.numericTarget);
        setDisplay(`${val}${stat.suffix || ''}`);
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };

      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }

    setDisplay(staticValue);
  }, [inView, prefersReduced, stat, staticValue]);

  return (
    <span ref={ref} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.03em] text-ink">
      {display}
    </span>
  );
}

export function TrustSection({ showMarquee = true, compact = false }) {
  const prefersReduced = useReducedMotion();
  const marqueeItems = [...TRUST_DATA.partnerPlaceholders, ...TRUST_DATA.partnerPlaceholders];

  return (
    <section
      aria-labelledby="trust-heading"
      className={`${compact ? 'py-12 sm:py-16' : 'py-16 sm:py-24'} overflow-hidden`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-forest">
            Trade &amp; Commercial Trust
          </span>
          <h2
            id="trust-heading"
            className="font-serif text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink"
          >
            {TRUST_DATA.heading}
          </h2>
          <p className="text-ink-soft text-sm sm:text-base max-w-[55ch] mx-auto">
            {TRUST_DATA.subtitle}
          </p>
        </motion.div>
      </div>

      {showMarquee && (
        <div className="marquee-wrap relative py-4 mb-12 sm:mb-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-bg to-transparent z-10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-bg to-transparent z-10"
          />
          <div className="animate-marquee flex items-center gap-4 sm:gap-6">
            {marqueeItems.map((partner, idx) => (
              <div
                key={`${partner.id}-${idx}`}
                className="group shrink-0 flex items-center gap-3 rounded-full bg-surface px-6 py-3.5 card-shadow grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-forest group-hover:bg-terracotta transition-colors" />
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display font-bold text-sm sm:text-base text-ink tracking-[-0.01em]">
                    {partner.name}
                  </span>
                  <span className="text-xs text-ink-soft">{partner.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 space-y-6">
        {/* 4 Animated Stat Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_DATA.stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
            >
              <CursorGlowCard className="p-6 sm:p-8 h-full">
                <div className="flex flex-col justify-between h-full gap-3">
                  <AnimatedStatValue stat={stat} />
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-ink">{stat.label}</h3>
                    <p className="text-xs text-ink-soft mt-0.5">{stat.note}</p>
                    {stat.tags && stat.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {stat.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-medium text-forest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CursorGlowCard>
            </motion.div>
          ))}
        </div>

        {/* Certification & Trust Badges (editable in data/trust.js) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_DATA.trustBadges.map((badge, idx) => {
            const IconComp = BADGE_ICONS[badge.icon] || ShieldCheck;
            return (
              <motion.div
                key={badge.id}
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1 + idx * 0.06, duration: 0.4 }}
                className="flex items-start gap-3.5 rounded-[22px] bg-surface/75 px-5 py-4 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.16)]"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream text-forest shrink-0 mt-0.5">
                  <IconComp className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-sm font-medium text-ink">{badge.title}</div>
                  <div className="text-xs text-ink-soft mt-0.5">{badge.detail}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
