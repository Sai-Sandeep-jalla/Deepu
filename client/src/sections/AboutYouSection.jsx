import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Sun,
  Clapperboard,
  Heart,
  Zap,
  Smile,
  MessageCircleHeart,
  Crown,
  Flame,
  Flower2,
  RotateCcw,
  Eye,
  Check
} from 'lucide-react';

const iconMap = {
  Sparkles,
  Sun,
  Clapperboard,
  Heart,
  Zap,
  Smile,
  MessageCircleHeart,
  Crown,
  Flame,
  Flower2
};

export default function AboutYouSection({ appreciations = [] }) {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetAll = () => {
    setFlippedCards({});
  };

  const flipAll = () => {
    const all = {};
    appreciations.forEach((item) => {
      all[item.id] = true;
    });
    setFlippedCards(all);
  };

  const flippedCount = Object.values(flippedCards).filter(Boolean).length;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9DDF5]/70 text-[#49364E] text-xs font-semibold tracking-wider uppercase mb-3"
        >
          <Flower2 className="w-3.5 h-3.5 text-[#C7839D]" />
          <span>Little Reminders</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-medium text-[#49364E] mb-4"
        >
          Things that make you, YOU.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-lg sm:text-xl text-[#C7839D] mb-6"
        >
          "A few little things I genuinely adore about you."
        </motion.p>

        {/* Global Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={flipAll}
            className="text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full bg-white border border-[#E9DDF5] text-[#49364E] hover:bg-[#F6D9E4]/60 transition-colors shadow-xs"
          >
            Reveal All ({appreciations.length})
          </button>
          {flippedCount > 0 && (
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full bg-[#FFFAF8] border border-[#EBC6B5] text-[#C7839D] hover:bg-[#EBC6B5]/30 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Cards</span>
            </button>
          )}
        </div>
      </div>

      {/* Responsive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {appreciations.map((item, idx) => {
          const isFlipped = !!flippedCards[item.id];
          const IconComponent = iconMap[item.icon] || Sparkles;

          return (
            <div
              key={item.id}
              className="h-64 sm:h-72 perspective-1000 cursor-pointer select-none group"
              onClick={() => toggleFlip(item.id)}
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-2xl shadow-sm hover:shadow-md ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF CARD */}
                <div
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 flex flex-col justify-between border border-[#F6D9E4] bg-gradient-to-br ${item.bgColor} overflow-hidden`}
                >
                  {/* Decorative corner flower */}
                  <div className="absolute top-2 right-2 text-[#C7839D]/20">
                    <Flower2 className="w-12 h-12" />
                  </div>

                  {/* Top Icon & Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#C7839D] shadow-xs group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-serif italic text-[#49364E]/60 bg-white/60 px-2.5 py-0.5 rounded-full">
                      #0{idx + 1}
                    </span>
                  </div>

                  {/* Front Title */}
                  <div className="relative z-10 my-auto">
                    <h3 className="font-serif text-2xl font-medium text-[#49364E] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#49364E]/70 font-medium tracking-wide">
                      {item.highlight}
                    </p>
                  </div>

                  {/* Bottom Prompt */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-[#C7839D] font-medium pt-2 border-t border-white/60">
                    <span>Tap to reveal note</span>
                    <span className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-xs group-hover:bg-[#C7839D] group-hover:text-white transition-colors">
                      ➜
                    </span>
                  </div>
                </div>

                {/* BACK OF CARD (REVEALED MESSAGE) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl p-6 flex flex-col justify-between bg-[#FFFAF8] border-2 border-[#C7839D]/30 shadow-md paper-texture">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F6D9E4]">
                    <span className="text-xs font-serif font-semibold text-[#C7839D] uppercase tracking-wider">
                      {item.title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlip(item.id);
                      }}
                      className="text-xs text-[#49364E]/50 hover:text-[#49364E] bg-[#FFF5E9] px-2 py-0.5 rounded-full"
                    >
                      Close ✕
                    </button>
                  </div>

                  {/* Handwritten Message */}
                  <div className="my-auto py-2">
                    <p className="font-handwriting text-xl sm:text-2xl text-[#49364E] leading-relaxed">
                      "{item.message}"
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F6D9E4]/60 text-xs text-[#A8B89A] font-medium">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[#C7839D]" />
                      <span>Certified 100% True</span>
                    </span>
                    <span className="text-[#C7839D]">♡</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
