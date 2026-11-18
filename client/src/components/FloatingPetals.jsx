import React, { useMemo } from 'react';

export default function FloatingPetals() {
  // Generate a fixed set of cute decorative petals
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8) % 100}%`,
      delay: `${(i * 1.3) % 9}s`,
      duration: `${14 + ((i * 3) % 12)}s`,
      size: 14 + ((i * 4) % 16),
      rotation: (i * 45) % 360,
      opacity: 0.35 + ((i % 4) * 0.12),
      color: i % 3 === 0 ? '#F6D9E4' : i % 3 === 1 ? '#E9DDF5' : '#EBC6B5'
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-float-petal"
          style={{
            left: petal.left,
            top: '-40px',
            animation: `fall ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 24 32"
            fill={petal.color}
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 2px 4px rgba(73, 54, 78, 0.08))'
            }}
          >
            {/* Elegant organic petal shape */}
            <path d="M12 0 C4 8 0 16 0 24 C0 29 5 32 12 32 C19 32 24 29 24 24 C24 16 20 8 12 0 Z" />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes fall {
          0% {
            transform: translate(0, -10px) rotate(0deg) scale(0.8);
          }
          30% {
            transform: translate(25px, 30vh) rotate(80deg) scale(1);
          }
          60% {
            transform: translate(-20px, 65vh) rotate(190deg) scale(0.9);
          }
          100% {
            transform: translate(15px, 105vh) rotate(360deg) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}
