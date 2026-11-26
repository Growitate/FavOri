export function WovenPatternFallback({ label = 'FavOri Expo Handcrafted Weave' }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE5DC] via-[#E1DCD3] to-[#DADCDE] text-ink-soft p-6 text-center relative overflow-hidden"
      role="img"
      aria-label={label}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="favori-weave-fallback" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M0 8h16M16 24h16M8 0v16M24 16v16"
              stroke="#2F4A41"
              strokeWidth="1.2"
              strokeOpacity="0.24"
              fill="none"
            />
            <path
              d="M16 8h16M0 24h16M8 16v16M24 0v16"
              stroke="#B8794A"
              strokeWidth="1"
              strokeOpacity="0.2"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#favori-weave-fallback)" />
      </svg>
      <span className="relative z-10 text-xs uppercase tracking-[0.18em] font-medium text-forest/80">
        {label}
      </span>
    </div>
  );
}
