import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Star, X, Compass, Heart } from 'lucide-react';

export default function ConstellationSection({ stars = [] }) {
  const [selectedStar, setSelectedStar] = useState(stars[0] || null);
  const [visitedStars, setVisitedStars] = useState(new Set([stars[0]?.id || 'star-1']));

  const handleStarClick = (star) => {
    setSelectedStar(star);
    setVisitedStars((prev) => new Set([...prev, star.id]));
  };

  return (
    <section
      id="universe"
      className="py-24 px-4 sm:px-6 lg:px-8 relative min-h-[900px] overflow-hidden bg-gradient-to-b from-[#2B1B30] via-[#49364E] to-[#2B1B30] text-white"
    >
      {/* Background Starfield & Crescent Moon */}
      <div className="absolute top-12 right-12 text-[#FFF5E9]/60 pointer-events-none animate-float-slow">
        <Moon className="w-16 h-16 sm:w-20 sm:h-20 fill-[#FFF5E9]/20" />
      </div>

      {/* Nebula Glow Highlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-radial from-[#C7839D]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-radial from-[#E9DDF5]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#F6D9E4] text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-xs border border-white/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#EBC6B5]" />
          <span>Interactive Stargazing</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-medium text-[#FFF5E9] mb-4"
        >
          A thousand little reasons.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-lg sm:text-xl text-[#F6D9E4]/90"
        >
          "If memories were stars, this sky would never run out of light."
        </motion.p>

        <p className="text-xs text-[#FFF5E9]/60 mt-3">
          Tap any glowing star in the night sky to unlock a memory or secret whisper ✨
        </p>
      </div>

      {/* Constellation Canvas / Sky Area */}
      <div className="relative max-w-5xl mx-auto h-[520px] sm:h-[580px] rounded-3xl bg-black/20 border border-white/10 backdrop-blur-xs overflow-hidden shadow-2xl">
        {/* Constellation Connecting SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {stars.map((star, idx) => {
            if (idx === 0) return null;
            const prev = stars[idx - 1];
            const isConnected = visitedStars.has(star.id) || visitedStars.has(prev.id);

            return (
              <line
                key={`line-${idx}`}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${star.x}%`}
                y2={`${star.y}%`}
                stroke={isConnected ? '#C7839D' : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={isConnected ? '1.5' : '1'}
                strokeDasharray={isConnected ? 'none' : '4 4'}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        {/* 12 Interactive Stars */}
        {stars.map((star, idx) => {
          const isSelected = selectedStar?.id === star.id;
          const isVisited = visitedStars.has(star.id);

          return (
            <div
              key={star.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              onClick={() => handleStarClick(star)}
            >
              {/* Outer Pulse Glow */}
              <div
                className={`absolute -inset-3 rounded-full transition-opacity duration-300 ${
                  isSelected
                    ? 'bg-[#C7839D]/60 animate-ping opacity-75'
                    : 'bg-white/20 opacity-0 group-hover:opacity-100'
                }`}
              />

              {/* Star Core Icon */}
              <div
                className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-300 shadow-lg ${
                  isSelected
                    ? 'bg-[#FFF5E9] text-[#49364E] scale-125 ring-4 ring-[#C7839D]'
                    : isVisited
                    ? 'bg-[#C7839D] text-white hover:scale-110'
                    : 'bg-white/40 text-white hover:bg-white/70 hover:scale-110'
                }`}
              >
                <Star
                  className={`w-4 h-4 ${
                    isSelected || isVisited ? 'fill-current' : 'fill-none'
                  }`}
                />
              </div>

              {/* Subtle Label on Hover or Mobile */}
              <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium text-[#FFF5E9] px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs opacity-75 group-hover:opacity-100 transition-opacity">
                {star.name}
              </span>
            </div>
          );
        })}

        {/* Floating Message Card for Selected Star */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              key={selectedStar.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-30 bg-[#FFF5E9] text-[#49364E] p-5 sm:p-6 rounded-2xl shadow-2xl border border-[#C7839D]/40 backdrop-blur-md"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EBC6B5]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C7839D] animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C7839D]">
                    {selectedStar.type}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedStar(null)}
                  className="p-1 rounded-full hover:bg-[#EBC6B5]/40 text-[#49364E]/70 hover:text-[#49364E]"
                  aria-label="Close star message"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-serif text-xl font-medium text-[#49364E] mb-2">
                {selectedStar.name}
              </h4>

              <p className="font-handwriting text-2xl text-[#49364E] leading-snug">
                "{selectedStar.message}"
              </p>

              <div className="mt-4 pt-2 border-t border-[#EBC6B5]/60 flex items-center justify-between text-xs text-[#C7839D]">
                <span>Discovered: {visitedStars.size} of {stars.length} stars</span>
                <span>✨ Constellation Whisper</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
