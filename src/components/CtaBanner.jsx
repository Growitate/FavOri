import { motion, useReducedMotion } from 'framer-motion';
import { HOME_DATA } from '../data/home';
import { Button } from './Button';

export function CtaBanner({
  heading = HOME_DATA.ctaBanner.heading,
  subtext = HOME_DATA.ctaBanner.subtext,
  buttonLabel = HOME_DATA.ctaBanner.buttonLabel,
  to = HOME_DATA.ctaBanner.to,
}) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10">
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-7xl rounded-[32px] bg-forest text-surface woven-texture-light px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 card-shadow-lg relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-terracotta/20 blur-3xl"
        />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-cream/75 font-medium">
              Bulk &amp; Custom Orders
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-surface leading-[1.1]">
              {heading}
            </h2>
            <p className="text-cream/85 text-base sm:text-lg max-w-[55ch]">{subtext}</p>
          </div>
          <div className="shrink-0">
            <Button to={to} variant="onForest" size="lg" showArrow>
              {buttonLabel}
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
