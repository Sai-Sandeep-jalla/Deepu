import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Smile, Shuffle, CheckCircle2, Flower } from 'lucide-react';

export default function ReasonsSection({ reasons = [] }) {
  const [revealedMap, setRevealedMap] = useState({});
  const [filterType, setFilterType] = useState('All');

  const types = ['All', 'Emotional', 'Funny', 'Flirty'];

  const filteredReasons = filterType === 'All'
    ? reasons
    : reasons.filter(r => r.type === filterType);

  const toggleReveal = (id) => {
    setRevealedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const revealRandom = () => {
    const unrevealed = filteredReasons.filter(r => !revealedMap[r.id]);
    if (unrevealed.length > 0) {
      const randomItem = unrevealed[Math.floor(Math.random() * unrevealed.length)];
      setRevealedMap(prev => ({ ...prev, [randomItem.id]: true }));
    } else {
      // If all revealed, reveal first one or reset
      setRevealedMap({});
    }
  };

  const revealAll = () => {
    const all = {};
    reasons.forEach(r => { all[r.id] = true; });
    setRevealedMap(all);
  };

  const revealedCount = Object.values(revealedMap).filter(Boolean).length;

  return (
    <section id="reasons" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF5E9] text-[#C7839D] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#EBC6B5]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Little Praises</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-medium text-[#49364E] mb-4"
        >
          Reasons why you're special.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-lg sm:text-xl text-[#C7839D] mb-8"
        >
          "Not that you need a reason, but here are a few."
        </motion.p>

        {/* Filter Buttons & Shuffle Action */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex rounded-full bg-white p-1 border border-[#F6D9E4] shadow-xs">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterType === type
                    ? 'bg-[#C7839D] text-white shadow-xs'
                    : 'text-[#49364E]/70 hover:text-[#49364E]'
                }`}
              >
                {type === 'Flirty' ? 'Playful 😉' : type}
              </button>
            ))}
          </div>

          <button
            onClick={revealRandom}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[#FFF5E9] hover:bg-[#EBC6B5]/40 text-[#49364E] border border-[#EBC6B5] transition-colors shadow-xs cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#C7839D]" />
            <span>Reveal Another Reason</span>
          </button>

          {revealedCount < reasons.length && (
            <button
              onClick={revealAll}
              className="text-xs text-[#C7839D] hover:underline px-2 py-1"
            >
              Reveal All ({revealedCount}/{reasons.length})
            </button>
          )}
        </div>
      </div>

      {/* Grid of 15 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReasons.map((item, idx) => {
          const isRevealed = !!revealedMap[item.id];
          const isFlirty = item.type === 'Flirty';
          const isFunny = item.type === 'Funny';

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
              onClick={() => toggleReveal(item.id)}
              className="group cursor-pointer select-none"
            >
              <div
                className={`min-h-[190px] p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  isRevealed
                    ? 'bg-white border-[#C7839D]/40 scale-[1.01]'
                    : 'bg-gradient-to-br from-[#FFFAF8] via-white to-[#FFF5E9] border-[#F6D9E4] hover:border-[#C7839D]/30'
                }`}
              >
                {/* Header Tag & Counter */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isFlirty
                        ? 'bg-[#F6D9E4] text-[#C7839D]'
                        : isFunny
                        ? 'bg-[#E9DDF5] text-[#49364E]'
                        : 'bg-[#FFF5E9] text-[#A8B89A]'
                    }`}
                  >
                    {item.tag || item.type}
                  </span>

                  <span className="text-xs font-serif italic text-[#49364E]/40">
                    Reason #{idx + 1}
                  </span>
                </div>

                {/* Card Body */}
                <div className="my-3">
                  <h3 className="font-serif text-lg font-medium text-[#49364E] mb-2 flex items-center gap-1.5">
                    <span>{item.title}</span>
                    {isFlirty && <span className="text-sm">✨</span>}
                  </h3>

                  {isRevealed ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-handwriting text-xl text-[#49364E] leading-relaxed">
                        "{item.message}"
                      </p>
                    </motion.div>
                  ) : (
                    <p className="text-xs text-[#49364E]/50 italic">
                      Click to uncover this little secret...
                    </p>
                  )}
                </div>

                {/* Bottom Status & Floating Icon */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F6D9E4]/60">
                  <span className="text-[#C7839D] font-medium flex items-center gap-1">
                    {isRevealed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A8B89A]" />
                        <span className="text-xs text-[#A8B89A]">Revealed</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Tap to reveal</span>
                      </>
                    )}
                  </span>

                  {isRevealed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-[#C7839D]"
                    >
                      {isFlirty ? (
                        <Heart className="w-4 h-4 fill-[#F6D9E4]" />
                      ) : (
                        <Flower className="w-4 h-4" />
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
