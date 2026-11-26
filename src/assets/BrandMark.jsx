export function BrandMark({ className = 'w-11 h-11', alt = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-white shrink-0 overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-hidden={alt === '' ? 'true' : undefined}
    >
      <img
        src="/images/logo.jpeg"
        alt={alt}
        width={450}
        height={450}
        decoding="async"
        className="w-full h-full object-contain"
      />
    </span>
  );
}
