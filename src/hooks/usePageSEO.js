import { useEffect } from 'react';
import { SITE } from '../data/site';

/**
 * Updates document title, meta description, Open Graph tags, and structured data per route.
 */
export function usePageSEO({ title, description, path = '/', ogImage, pageSchema }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.brandName}` : `${SITE.brandName} | Bulk Handmade & Custom-Designed Carpets`;
    document.title = fullTitle;

    const setMeta = (selector, attr, attrVal, content) => {
      if (!content) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', `${window.location.origin}${path}`);
    if (ogImage) {
      setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    }

    const scriptId = 'favori-route-jsonld';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const baseBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: SITE.brandName,
      description,
      email: SITE.email,
      telephone: `+91${SITE.phoneRaw}`,
      url: window.location.origin,
      areaServed: 'Worldwide',
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Bulk Handmade & Custom-Designed Carpets',
        },
      },
      ...(pageSchema || {}),
    };

    scriptEl.textContent = JSON.stringify(baseBusinessSchema);
  }, [title, description, path, ogImage, pageSchema]);
}
