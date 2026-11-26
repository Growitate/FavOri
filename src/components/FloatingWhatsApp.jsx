import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { SITE } from '../data/site';

export function FloatingWhatsApp() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with FavOri Expo on WhatsApp"
      initial={prefersReduced ? false : { opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.35 }}
      whileHover={prefersReduced ? undefined : { y: -3, scale: 1.03 }}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 group inline-flex items-center gap-2.5 rounded-full bg-forest text-surface px-4 sm:px-5 py-3 shadow-[0_18px_38px_-12px_rgba(47,74,65,0.65)] hover:bg-terracotta transition-colors duration-300"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-sm font-medium">WhatsApp Quote</span>
    </motion.a>
  );
}
