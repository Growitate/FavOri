import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CursorGlowCard } from './CursorGlowCard';
import { SmartImage } from './SmartImage';

export function ProductCard({ product, onSelect, index = 0 }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      layout
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <CursorGlowCard className="group h-full flex flex-col">
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="text-left w-full h-full flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-[28px]"
        >
          <div className="relative p-3 pb-0">
            <div className="relative aspect-[4/3] w-full rounded-[22px] overflow-hidden">
              <SmartImage
                src={product.image.url}
                alt={product.image.alt}
                width={product.image.width}
                height={product.image.height}
                className="w-full h-full"
                imgClassName="group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <span className="absolute top-3.5 left-3.5 z-10 inline-flex items-center rounded-full bg-surface/88 backdrop-blur-md px-3.5 py-1 text-xs font-medium text-ink shadow-sm">
                {product.category}
              </span>

              {/* Slide-up Enquire Now pill on hover / focus-within */}
              <div
                aria-hidden="true"
                className="absolute inset-x-3.5 bottom-3.5 z-10 flex justify-end pointer-events-none translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition-all duration-300 ease-out"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest text-surface px-4 py-2 text-xs font-medium shadow-md group-hover:bg-terracotta transition-colors">
                  <span>Enquire Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 justify-between p-6 pt-5 gap-4">
            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink tracking-[-0.015em] group-hover:text-forest transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed line-clamp-2">
                {product.shortDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-surface-2/80 flex items-center justify-between gap-2 text-xs">
              <span className="text-ink-soft">
                Starting from: <strong className="font-medium text-ink">{product.priceLabel}</strong>
              </span>
              <span className="text-forest font-medium inline-flex items-center gap-1 group-hover:text-[#8D542B] transition-colors">
                Enquire
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </button>
      </CursorGlowCard>
    </motion.article>
  );
}
