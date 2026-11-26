export const SITE = {
  brandName: 'FavOri Expo',
  wordmark: 'favori expo',
  tagline: 'FavOri Expo',
  email: 'favori.expo@gmail.com',
  phoneDisplay: '+91 96965 25695',
  phoneRaw: '9696525695',
  telHref: 'tel:+919696525695',
  whatsappUrl: 'https://wa.me/919696525695',
  whatsappDisplay: '9696525695',
  navLinks: [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  ctaLabel: 'Request a Quote',
};

export function buildWhatsAppQuoteUrl(message) {
  const encoded = encodeURIComponent(message);
  return `${SITE.whatsappUrl}?text=${encoded}`;
}

export function buildMailtoQuoteUrl(subject, body) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
