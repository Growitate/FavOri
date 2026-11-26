import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { SITE } from '../data/site';
import { useScrolled } from '../hooks/useScrolled';
import { BrandMark } from '../assets/BrandMark';
import { Button } from './Button';

export function Navbar() {
  const scrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  const isHeroDarkTop = location.pathname === '/' && !scrolled;

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-10 pt-3 sm:pt-4 pointer-events-none">
        <div
          className={`pointer-events-auto mx-auto max-w-7xl rounded-full transition-all duration-300 ease-out ${
            scrolled
              ? 'bg-surface/85 backdrop-blur-xl shadow-[0_14px_40px_-16px_rgba(28,31,34,0.2)] px-4 sm:px-6 py-2.5'
              : 'bg-transparent px-1 sm:px-2 py-2.5'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left Cluster: Circular Mark + Links (matching clean reference composition) */}
            <div className="flex items-center gap-6 lg:gap-10">
              <Link
                to="/"
                className="group inline-flex items-center gap-2.5 rounded-full focus-visible:outline-2"
                aria-label={`${SITE.brandName} Home`}
              >
                <BrandMark className="w-11 h-11 sm:w-12 sm:h-12" />
                <span
                  className={`font-display font-bold tracking-[-0.02em] text-base sm:text-lg transition-colors duration-200 ${
                    isHeroDarkTop ? 'text-cream' : 'text-ink'
                  }`}
                >
                  {SITE.brandName}
                </span>
              </Link>

              <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
                {SITE.navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `px-3.5 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                        isHeroDarkTop
                          ? isActive
                            ? 'text-surface font-medium bg-surface/12'
                            : 'text-cream/80 hover:text-surface hover:bg-surface/8'
                          : isActive
                          ? 'text-ink font-medium bg-surface/85 shadow-[0_6px_18px_-12px_rgba(0,0,0,0.2)]'
                          : 'text-ink-soft hover:text-ink hover:bg-surface/50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Right Outlined Pill CTA */}
            <div className="hidden md:flex items-center">
              {isHeroDarkTop ? (
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-cream/45 px-5 py-2 text-sm font-medium text-cream hover:bg-terracotta hover:border-terracotta hover:text-surface transition-all duration-300"
                >
                  {SITE.ctaLabel}
                </Link>
              ) : (
                <Button
                  to="/contact"
                  variant={scrolled ? 'primary' : 'outline'}
                  size="sm"
                  showArrow
                >
                  {SITE.ctaLabel}
                </Button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md shadow-sm transition-colors cursor-pointer ${
                isHeroDarkTop
                  ? 'bg-surface/15 text-cream border border-cream/25 hover:bg-surface/25'
                  : 'bg-surface/85 text-ink hover:bg-surface'
              }`}
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] bg-bg hero-mesh-bg flex flex-col justify-between p-6 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2.5"
              >
                <BrandMark className="w-11 h-11" />
                <span className="font-display font-bold tracking-[-0.02em] text-lg text-ink">
                  {SITE.brandName}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface text-ink card-shadow cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile menu links" className="flex flex-col gap-3 my-auto py-8">
              {SITE.navLinks.map((item, idx) => (
                <motion.div
                  key={item.to}
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-5 py-4 rounded-[22px] font-serif text-3xl transition-colors ${
                        isActive ? 'bg-surface text-forest card-shadow' : 'text-ink hover:bg-surface/70'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-5 h-5 text-terracotta" aria-hidden="true" />
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="space-y-4">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                showArrow
                onClick={() => setMobileOpen(false)}
                className="w-full"
              >
                {SITE.ctaLabel}
              </Button>
              <div className="flex items-center justify-between text-sm text-ink-soft px-2 pt-2">
                <a href={`mailto:${SITE.email}`} className="hover:text-ink transition-colors">
                  {SITE.email}
                </a>
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-forest hover:text-terracotta transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
