import { useState } from 'react';
import { WovenPatternFallback } from '../assets/WovenPatternFallback';

export function SmartImage({
  src,
  alt,
  width,
  height,
  eager = false,
  className = '',
  imgClassName = '',
  fetchPriority,
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed || !src) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        <WovenPatternFallback label={alt || 'FavOri Expo Woven Textile'} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#E5E3DF] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 woven-texture animate-pulse bg-[#EAE8E4]" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover transition-[opacity,transform] duration-500 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
