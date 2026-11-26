import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, CheckCircle2, MessageCircle, Mail, Loader2 } from 'lucide-react';
import { buildMailtoQuoteUrl, buildWhatsAppQuoteUrl } from '../data/site';
import { SmartImage } from './SmartImage';
import { Button } from './Button';

export function ProductModal({ product, onClose }) {
  const prefersReduced = useReducedMotion();
  const closeBtnRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [submittedLinks, setSubmittedLinks] = useState({ whatsapp: '', mailto: '' });

  useEffect(() => {
    if (!product) return;
    setStatus('idle');
    setErrors({});
    setForm({
      name: '',
      email: '',
      phone: '',
      quantity: '',
      notes: `Interested in bulk production for ${product.name}.`,
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    const timer = setTimeout(() => closeBtnRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(timer);
    };
  }, [product, onClose]);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email.';
    }
    if (!form.phone.trim() || form.phone.trim().length < 7) {
      nextErrors.phone = 'Please enter a contact number.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate() || !product) return;

    const summary = [
      `Hello FavOri Expo, I would like a bulk quote:`,
      `Product: ${product.name}`,
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Quantity / Size Estimate: ${form.quantity.trim() || 'To be discussed'}`,
      `Notes: ${form.notes.trim() || 'None'}`,
    ].join('\n');

    const whatsappHref = buildWhatsAppQuoteUrl(summary);
    const mailtoHref = buildMailtoQuoteUrl(`Bulk Carpet Quote: ${product.name}`, summary);

    setSubmittedLinks({ whatsapp: whatsappHref, mailto: mailtoHref });
    setStatus('loading');

    window.open(whatsappHref, '_blank', 'noopener,noreferrer');
    setTimeout(() => setStatus('success'), 450);
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-ink/45 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl rounded-[28px] bg-surface card-shadow-lg overflow-hidden my-auto max-h-[92vh] flex flex-col lg:grid lg:grid-cols-12"
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md text-ink shadow-md hover:bg-terracotta hover:text-surface transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Image + Overview */}
            <div className="lg:col-span-6 p-5 sm:p-7 overflow-y-auto flex flex-col justify-center space-y-5 bg-cream/35">
              <div className="aspect-[4/3] rounded-[22px] overflow-hidden">
                <SmartImage
                  src={product.image.url}
                  alt={product.image.alt}
                  width={product.image.width}
                  height={product.image.height}
                  eager
                  className="w-full h-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-surface px-3.5 py-1 text-xs font-medium text-forest">
                    {product.category}
                  </span>
                  <span className="rounded-full bg-surface-2/80 px-3.5 py-1 text-xs font-medium text-ink">
                    {product.priceLabel}
                  </span>
                </div>
                <h2
                  id="product-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-medium text-ink tracking-[-0.02em]"
                >
                  {product.name}
                </h2>
                <p className="text-sm sm:text-base text-ink-soft leading-relaxed">{product.fullDescription}</p>
              </div>
            </div>

            {/* Embedded Quote Form */}
            <div className="lg:col-span-6 p-5 sm:p-7 overflow-y-auto flex flex-col justify-between bg-surface">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="my-auto py-8 text-center space-y-5"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest/10 text-forest mx-auto">
                    <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-medium text-ink">
                      Quote brief prepared
                    </h3>
                    <p className="text-sm text-ink-soft max-w-sm mx-auto">
                      Your inquiry for <strong>{product.name}</strong> has been compiled for WhatsApp.
                      You can also send it via email below.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button
                      href={submittedLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      icon={MessageCircle}
                    >
                      Open WhatsApp
                    </Button>
                    <Button href={submittedLinks.mailto} variant="outline" icon={Mail}>
                      Send via Email
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="space-y-1 pr-8">
                    <span className="text-xs uppercase tracking-[0.18em] text-[#8D542B] font-medium">
                      Bulk Enquiry
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink">
                      Request pricing for {product.name}
                    </h3>
                  </div>

                  <div>
                    <label htmlFor="modal-product" className="block text-xs font-medium text-ink-soft mb-1">
                      Selected Product
                    </label>
                    <input
                      id="modal-product"
                      type="text"
                      readOnly
                      value={product.name}
                      className="w-full rounded-2xl bg-surface-2/60 px-4 py-2.5 text-sm font-medium text-ink cursor-default"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="modal-name" className="block text-xs font-medium text-ink-soft mb-1">
                        Full Name *
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full rounded-2xl bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-forest"
                      />
                      {errors.name && <p className="text-xs text-[#9E3F24] mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="modal-phone" className="block text-xs font-medium text-ink-soft mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 ..."
                        className="w-full rounded-2xl bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-forest"
                      />
                      {errors.phone && <p className="text-xs text-[#9E3F24] mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="modal-email" className="block text-xs font-medium text-ink-soft mb-1">
                        Email Address *
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full rounded-2xl bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-forest"
                      />
                      {errors.email && <p className="text-xs text-[#9E3F24] mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="modal-qty" className="block text-xs font-medium text-ink-soft mb-1">
                        Estimated Quantity / Sizes
                      </label>
                      <input
                        id="modal-qty"
                        type="text"
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        placeholder="e.g. 40 pcs, 200×300 cm"
                        className="w-full rounded-2xl bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-notes" className="block text-xs font-medium text-ink-soft mb-1">
                      Project Notes
                    </label>
                    <textarea
                      id="modal-notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full rounded-2xl bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-forest resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    showArrow={status !== 'loading'}
                    disabled={status === 'loading'}
                    className="w-full"
                  >
                    {status === 'loading' ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Preparing Quote...
                      </span>
                    ) : (
                      'Request Bulk Quote'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
