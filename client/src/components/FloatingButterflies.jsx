import React, { useMemo } from 'react';

export default function FloatingButterflies() {
  const butterflies = useMemo(() => [
    { id: 1, top: '15%', left: '8%', delay: '0s', duration: '22s', size: 28, color: '#C7839D' },
    { id: 2, top: '45%', left: '88%', delay: '4s', duration: '26s', size: 24, color: '#A8B89A' },
    { id: 3, top: '70%', left: '12%', delay: '8s', duration: '24s', size: 26, color: '#C7839D' }
  ], []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {butterflies.map((bf) => (
        <div
          key={bf.id}
          className="absolute opacity-60 hover:opacity-100 transition-opacity"
          style={{
            top: bf.top,
            left: bf.left,
            animation: `drift ${bf.duration} ease-in-out infinite alternate`,
            animationDelay: bf.delay
          }}
        >
          <div className="animate-butterfly-flap" style={{ transformOrigin: 'center' }}>
            <svg
              width={bf.size}
              height={bf.size}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm"
            >
              {/* Left Wing */}
              <path
                d="M18 20 C10 10, 2 12, 4 22 C6 28, 14 26, 18 22 Z"
                fill={bf.color}
                opacity="0.8"
                className="origin-right animate-wing-left"
              />
              {/* Right Wing */}
              <path
                d="M22 20 C30 10, 38 12, 36 22 C34 28, 26 26, 22 22 Z"
                fill={bf.color}
                opacity="0.8"
                className="origin-left animate-wing-right"
              />
              {/* Center Body */}
              <ellipse cx="20" cy="21" rx="1.5" ry="5" fill="#49364E" />
              {/* Antennae */}
              <path d="M19 16 C17 13, 15 13, 14 14" stroke="#49364E" strokeWidth="1" strokeLinecap="round" />
              <path d="M21 16 C23 13, 25 13, 26 14" stroke="#49364E" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes drift {
          0% {
            transform: translate(0, 0) scale(0.9);
          }
          50% {
            transform: translate(60px, -40px) scale(1.05) rotate(10deg);
          }
          100% {
            transform: translate(-30px, -70px) scale(0.95) rotate(-8deg);
          }
        }
        @keyframes wing-flutter-left {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.2); }
        }
        @keyframes wing-flutter-right {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.2); }
        }
        .animate-wing-left {
          animation: wing-flutter-left 0.28s ease-in-out infinite;
          transform-origin: 18px 20px;
        }
        .animate-wing-right {
          animation: wing-flutter-right 0.28s ease-in-out infinite;
          transform-origin: 22px 20px;
        }
      `}</style>
    </div>
  );
}
