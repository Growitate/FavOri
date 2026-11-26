import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Phone,
  MessageCircle,
  Upload,
  X,
  CheckCircle2,
  Loader2,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { buildMailtoQuoteUrl, buildWhatsAppQuoteUrl, SITE } from '../data/site';
import { IMAGES } from '../data/images';
import { usePageSEO } from '../hooks/usePageSEO';
import { Button } from '../components/Button';
import { CursorGlowCard } from '../components/CursorGlowCard';

function FloatingField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  multiline = false,
}) {
  const sharedClass =
    'peer w-full rounded-2xl bg-bg px-4 pt-6 pb-2.5 text-sm sm:text-base text-ink placeholder-transparent focus:outline-none focus:ring-2 transition-shadow ' +
    (error ? 'ring-2 ring-[#A9442A] focus:ring-[#A9442A]' : 'focus:ring-forest');

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={label}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${sharedClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={label}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={sharedClass}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium tracking-wide text-ink-soft transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-forest"
      >
        {label}
        {required ? ' *' : ''}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-[#9E3F24]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactPage() {
  const prefersReduced = useReducedMotion();

  usePageSEO({
    title: 'Contact & Request a Quote',
    description:
      'Request a bulk carpet quote or submit custom design files to FavOri Expo via WhatsApp or email.',
    path: '/contact',
    ogImage: IMAGES.whatWeDoCraft.url,
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    requirementType: 'Commercial',
    quantity: '',
    message: '',
  });
  const [designFile, setDesignFile] = useState(null);
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'email'
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [compiledUrls, setCompiledUrls] = useState({ whatsapp: '', mailto: '' });

  const validateValues = (vals) => {
    const next = {};
    if (!vals.name.trim()) next.name = 'Please enter your full name.';
    if (!vals.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      next.email = 'Please enter a valid email format.';
    }
    if (!vals.phone.trim() || vals.phone.replace(/\D/g, '').length < 7) {
      next.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    if (!vals.message.trim()) {
      next.message = 'Please describe your carpet size, weave, or design requirements.';
    }
    return next;
  };

  const handleFieldChange = (field) => (e) => {
    const updated = { ...form, [field]: e.target.value };
    setForm(updated);
    if (touched[field]) {
      setErrors(validateValues(updated));
    }
  };

  const handleFieldBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateValues(form));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    setDesignFile({
      name: file.name,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      previewUrl: isImage ? URL.createObjectURL(file) : null,
    });
  };

  const removeFile = () => {
    if (designFile?.previewUrl) {
      URL.revokeObjectURL(designFile.previewUrl);
    }
    setDesignFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    const nextErrors = validateValues(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const compiledBody = [
      'Hello FavOri Expo Team,',
      '',
      'New Bulk / Custom Carpet Quote Request:',
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Requirement Type: ${form.requirementType}`,
      `Estimated Quantity: ${form.quantity.trim() || 'Not specified'}`,
      `Design Reference File: ${
        designFile ? `${designFile.name} (${designFile.sizeKb} KB - will attach directly)` : 'None attached'
      }`,
      `Message: ${form.message.trim()}`,
    ].join('\n');

    const whatsappHref = buildWhatsAppQuoteUrl(compiledBody);
    const mailtoHref = buildMailtoQuoteUrl(
      `Bulk Carpet Quote Request — ${form.requirementType} (${form.name.trim()})`,
      compiledBody
    );

    setCompiledUrls({ whatsapp: whatsappHref, mailto: mailtoHref });
    setStatus('loading');

    if (channel === 'whatsapp') {
      window.open(whatsappHref, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = mailtoHref;
    }

    setTimeout(() => {
      setStatus('success');
    }, 450);
  };

  const resetForm = () => {
    removeFile();
    setForm({
      name: '',
      email: '',
      phone: '',
      requirementType: 'Commercial',
      quantity: '',
      message: '',
    });
    setTouched({});
    setErrors({});
    setStatus('idle');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24">
      <section className="hero-mesh-bg pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl space-y-3"
          >
            <span className="inline-block text-xs uppercase tracking-[0.2em] font-medium text-forest">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.025em] text-ink leading-[1.06]">
              Request a bulk quote
            </h1>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-[58ch]">
              Tell us about your carpet requirements, dimensions, and quantity. We respond quickly
              with sampling guidance and mill-direct pricing.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="woven-texture py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
            {/* Left Split: Quote Form */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="lg:col-span-7"
            >
              <div className="rounded-[28px] bg-surface p-6 sm:p-9 card-shadow">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-5"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest/10 text-forest mx-auto">
                      <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <h2 className="font-serif text-3xl font-medium text-ink">
                        Quote request ready
                      </h2>
                      <p className="text-sm sm:text-base text-ink-soft">
                        Thank you, <strong>{form.name}</strong>. Your prefilled{' '}
                        {form.requirementType.toLowerCase()} carpet brief is ready
                        {designFile
                          ? ` — please attach "${designFile.name}" directly inside your message.`
                          : '.'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <Button
                        href={compiledUrls.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        icon={MessageCircle}
                      >
                        Send via WhatsApp
                      </Button>
                      <Button href={compiledUrls.mailto} variant="outline" icon={Mail}>
                        Open Email Client
                      </Button>
                    </div>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-xs font-medium text-ink-soft hover:text-forest underline underline-offset-4 cursor-pointer"
                      >
                        Submit another requirement
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl sm:text-3xl font-medium text-ink">
                        Project &amp; Bulk Enquiry
                      </h2>
                      <p className="text-sm text-ink-soft">
                        Submits directly through your choice of WhatsApp or Email.
                      </p>
                    </div>

                    {/* Requirement Type Selector */}
                    <div className="space-y-2">
                      <span className="block text-xs font-medium text-ink-soft">
                        Requirement Type
                      </span>
                      <div className="inline-flex rounded-full bg-bg p-1 gap-1">
                        {['Commercial', 'Residential'].map((type) => {
                          const active = form.requirementType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setForm({ ...form, requirementType: type })}
                              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                                active
                                  ? 'bg-forest text-surface shadow-sm'
                                  : 'text-ink-soft hover:text-ink'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FloatingField
                        id="contact-name"
                        label="Full Name"
                        value={form.name}
                        onChange={handleFieldChange('name')}
                        onBlur={handleFieldBlur('name')}
                        error={errors.name}
                        required
                      />
                      <FloatingField
                        id="contact-phone"
                        label="Phone / WhatsApp"
                        type="tel"
                        value={form.phone}
                        onChange={handleFieldChange('phone')}
                        onBlur={handleFieldBlur('phone')}
                        error={errors.phone}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FloatingField
                        id="contact-email"
                        label="Email Address"
                        type="email"
                        value={form.email}
                        onChange={handleFieldChange('email')}
                        onBlur={handleFieldBlur('email')}
                        error={errors.email}
                        required
                      />
                      <FloatingField
                        id="contact-qty"
                        label="Quantity / Area (e.g. 50 pcs or 800 sq.ft)"
                        value={form.quantity}
                        onChange={handleFieldChange('quantity')}
                      />
                    </div>

                    <FloatingField
                      id="contact-message"
                      label="Message, Carpet Style & Size Requirements"
                      value={form.message}
                      onChange={handleFieldChange('message')}
                      onBlur={handleFieldBlur('message')}
                      error={errors.message}
                      required
                      multiline
                    />

                    {/* Optional Design Reference Upload */}
                    <div className="space-y-2">
                      <span className="block text-xs font-medium text-ink-soft">
                        Design Reference (Optional — artwork, mood board, or floor plan)
                      </span>
                      {designFile ? (
                        <div className="flex items-center justify-between gap-3 rounded-2xl bg-bg p-3.5">
                          <div className="flex items-center gap-3 min-w-0">
                            {designFile.previewUrl ? (
                              <img
                                src={designFile.previewUrl}
                                alt="Design preview"
                                className="w-11 h-11 rounded-xl object-cover shrink-0"
                              />
                            ) : (
                              <span className="w-11 h-11 rounded-xl bg-cream text-forest inline-flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" aria-hidden="true" />
                              </span>
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-ink truncate">
                                {designFile.name}
                              </p>
                              <p className="text-xs text-ink-soft">{designFile.sizeKb} KB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            aria-label="Remove uploaded file"
                            className="p-2 rounded-full text-ink-soft hover:bg-surface-2 hover:text-ink cursor-pointer"
                          >
                            <X className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="design-upload"
                          className="flex items-center justify-center gap-2.5 rounded-2xl border border-dashed border-ink/20 bg-bg/60 hover:bg-cream/40 hover:border-terracotta/50 px-4 py-4 text-sm text-ink-soft cursor-pointer transition-colors"
                        >
                          <Upload className="w-4 h-4 text-forest" aria-hidden="true" />
                          <span>Attach JPG, PNG, PDF or CAD reference</span>
                          <input
                            id="design-upload"
                            type="file"
                            accept="image/*,.pdf,.ai,.eps,.dwg"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                      )}
                    </div>

                    {/* Preferred Dispatch Channel */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs text-ink-soft">
                        <span>Send via:</span>
                        <button
                          type="button"
                          onClick={() => setChannel('whatsapp')}
                          className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                            channel === 'whatsapp'
                              ? 'bg-forest/12 text-forest'
                              : 'hover:bg-bg text-ink-soft'
                          }`}
                        >
                          WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => setChannel('email')}
                          className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                            channel === 'email'
                              ? 'bg-forest/12 text-forest'
                              : 'hover:bg-bg text-ink-soft'
                          }`}
                        >
                          Email
                        </button>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        showArrow={status !== 'loading'}
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                            Preparing...
                          </span>
                        ) : (
                          'Submit Request'
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right Split: Direct Contact Cards */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
              className="lg:col-span-5 space-y-5"
            >
              <CursorGlowCard className="p-6 sm:p-7">
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cream text-forest shrink-0">
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-[0.16em] text-ink-soft font-medium">
                        Email
                      </span>
                      <div className="font-serif text-xl font-medium text-ink group-hover:text-forest transition-colors break-all">
                        {SITE.email}
                      </div>
                      <p className="text-xs text-ink-soft">
                        Send floor plans, CAD artwork, or RFQs
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-ink-soft group-hover:text-terracotta shrink-0 transition-colors" />
                </a>
              </CursorGlowCard>

              <CursorGlowCard className="p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cream text-forest shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.16em] text-ink-soft font-medium">
                      Phone &amp; WhatsApp
                    </span>
                    <div className="font-serif text-2xl font-medium text-ink">
                      <a href={SITE.telHref} className="hover:text-forest transition-colors">
                        {SITE.phoneRaw}
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <a
                        href={SITE.telHref}
                        className="inline-flex items-center gap-1.5 rounded-full bg-bg px-3.5 py-1.5 text-xs font-medium text-ink hover:bg-surface-2 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        Call Now
                      </a>
                      <a
                        href={SITE.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3.5 py-1.5 text-xs font-medium text-forest hover:bg-terracotta hover:text-surface transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </CursorGlowCard>

              {/* Dedicated WhatsApp Highlight CTA */}
              <div className="rounded-[28px] bg-forest text-surface woven-texture-light p-7 sm:p-8 card-shadow-lg space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3.5 py-1 text-xs font-medium text-cream">
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  Direct Factory Line
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium leading-[1.2] text-surface">
                  Prefer a fast WhatsApp conversation?
                </h2>
                <p className="text-sm text-cream/85 leading-relaxed">
                  Share room photos, color preferences, or approximate quantities directly with our
                  production desk for rapid estimates and sample planning.
                </p>
                <Button
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="onForest"
                  size="md"
                  icon={MessageCircle}
                  showArrow
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
