import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const VARIANT_CLASSES = {
  primary:
    'bg-forest text-surface hover:bg-terracotta hover:text-surface shadow-[0_14px_30px_-14px_rgba(47,74,65,0.55)]',
  secondary:
    'bg-surface/75 backdrop-blur-md text-ink hover:bg-terracotta hover:text-surface shadow-[0_10px_28px_-14px_rgba(0,0,0,0.2)]',
  outline:
    'bg-transparent border border-ink/20 text-ink hover:bg-terracotta hover:border-terracotta hover:text-surface',
  onForest:
    'bg-cream text-ink hover:bg-terracotta hover:text-surface shadow-[0_14px_30px_-14px_rgba(0,0,0,0.3)]',
};

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm font-medium gap-2',
  lg: 'px-7 py-3.5 text-base font-medium gap-2.5',
};

export function Button({
  children,
  to,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  showArrow = false,
  icon: Icon,
  className = '',
  onClick,
  disabled = false,
  ...rest
}) {
  const baseClass =
    'group inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ease-out cursor-pointer select-none disabled:opacity-60 disabled:pointer-events-none';
  const combined = `${baseClass} ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary} ${
    SIZE_CLASSES[size] || SIZE_CLASSES.md
  } ${className}`;

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combined} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combined} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={combined} onClick={onClick} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
