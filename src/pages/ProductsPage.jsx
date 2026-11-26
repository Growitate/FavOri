import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../data/products';
import { IMAGES } from '../data/images';
import { usePageSEO } from '../hooks/usePageSEO';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { Button } from '../components/Button';

export function ProductsPage() {
  const prefersReduced = useReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = PRODUCT_CATEGORIES.includes(searchParams.get('category'))
    ? searchParams.get('category')
    : 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState(null);

  usePageSEO({
    title: 'Products | Handmade Carpets Crafted in Bulk',
    description:
      'Explore six specialized handmade carpet categories from FavOri Expo: hand-knotted, hand-tufted, flatweave dhurries & kilims, custom logo, hospitality, and runners.',
    path: '/products',
    ogImage: IMAGES.productHandKnotted.url,
  });

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat && PRODUCT_CATEGORIES.includes(paramCat)) {
      setActiveCategory(paramCat);
    }
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.categories.includes(activeCategory));

  return (
    <div className="pt-28 sm:pt-36">
      {/* Header Band */}
      <section className="hero-mesh-bg pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl space-y-4"
          >
            <span className="inline-block text-xs uppercase tracking-[0.2em] font-medium text-forest">
              Our Collection
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] text-ink leading-[1.06]">
              Handmade carpets, crafted in bulk
            </h1>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-[60ch]">
              Six foundational carpet categories engineered for private residences, commercial
              hospitality spaces, and fully bespoke custom programs.
            </p>
          </motion.div>

          {/* Animated Filter Chips */}
          <div
            role="tablist"
            aria-label="Filter carpet categories"
            className="mt-8 sm:mt-10 inline-flex flex-wrap items-center gap-2 rounded-full bg-surface/85 backdrop-blur-md p-1.5 card-shadow"
          >
            {PRODUCT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-surface' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-forest -z-0"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 sm:py-16 woven-texture">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  onSelect={setSelectedProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Don't see your design banner */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="mt-14 sm:mt-20 rounded-[32px] bg-forest text-surface woven-texture-light p-8 sm:p-12 lg:p-14 card-shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            <div className="space-y-2.5 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-cream/75 font-medium">
                Bespoke Weaving Studio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-surface">
                Don&apos;t see your design?
              </h2>
              <p className="text-cream/85 text-sm sm:text-base max-w-[54ch]">
                Share mood boards, floor plans, Pantone swatches, or vector artwork — our weavers
                craft custom samples and bulk production directly to your brief.
              </p>
            </div>
            <div className="shrink-0">
              <Button to="/contact" variant="onForest" size="lg" showArrow>
                Send Us Your Design
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
