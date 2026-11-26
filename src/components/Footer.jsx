import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SITE } from '../data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-surface woven-texture-light relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-cream/15">
          <div className="md:col-span-5 space-y-5">
            <Link
              to="/"
              aria-label={`${SITE.brandName} Home`}
              className="group inline-block rounded-2xl bg-white p-1.5 shadow-md transition-transform duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <img
                src="/images/logo.jpeg"
                alt="FavOri Expo — Carpet Manufacturer, Crafting Luxury Under Every Step"
                width={450}
                height={450}
                loading="lazy"
                decoding="async"
                className="h-28 sm:h-32 w-28 sm:w-32 object-contain"
              />
            </Link>
            <p className="text-cream/80 text-sm sm:text-base leading-relaxed max-w-[44ch]">
              Bulk manufacturer of handmade, custom-designed carpets for residential interiors,
              boutique hospitality, and global commercial architecture.
            </p>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-cream/12 hover:bg-terracotta text-surface px-5 py-2.5 text-sm font-medium transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.18em] text-cream/65 font-medium">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm">
              {SITE.navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-cream/85 hover:text-terracotta transition-colors inline-flex items-center gap-1.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/products?category=Custom"
                  className="text-cream/85 hover:text-terracotta transition-colors"
                >
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.18em] text-cream/65 font-medium">
              Contact &amp; Inquiries
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 text-cream/90 hover:text-terracotta transition-colors"
                >
                  <Mail className="w-4 h-4 text-terracotta shrink-0" aria-hidden="true" />
                  <span>{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.telHref}
                  className="inline-flex items-center gap-2.5 text-cream/90 hover:text-terracotta transition-colors"
                >
                  <Phone className="w-4 h-4 text-terracotta shrink-0" aria-hidden="true" />
                  <span>{SITE.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-cream/90 hover:text-terracotta transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-terracotta shrink-0" aria-hidden="true" />
                  <span>WhatsApp: {SITE.whatsappDisplay}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-cream/65">
          <p>&copy; {year} {SITE.brandName}. Handmade Carpet Manufacturing &amp; Bulk Exports.</p>
          <p className="font-display lowercase tracking-[-0.02em] text-sm text-cream/75">
            {SITE.wordmark}
          </p>
        </div>
      </div>
    </footer>
  );
}
