import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, X, Heart, Sparkles, Flower2 } from 'lucide-react';

export default function OpenWhenSection({ letters = [] }) {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const openLetter = (letter) => {
    setSelectedLetter(letter);
  };

  const closeLetter = () => {
    setSelectedLetter(null);
  };

  return (
    <section id="letters" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9DDF5]/70 text-[#49364E] text-xs font-semibold tracking-wider uppercase mb-3"
        >
          <Mail className="w-3.5 h-3.5 text-[#C7839D]" />
          <span>Postal Garden</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-medium text-[#49364E] mb-4"
        >
          Little letters for different days.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-lg sm:text-xl text-[#C7839D]"
        >
          "Whenever you need a little reminder, open one."
        </motion.p>
      </div>

      {/* Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {letters.map((letter, idx) => {
          return (
            <motion.div
              key={letter.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => openLetter(letter)}
              className="group cursor-pointer select-none"
            >
              {/* Pastel Envelope Card */}
              <div
                className="relative rounded-2xl p-7 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-2 border border-[#E9DDF5] overflow-hidden"
                style={{ backgroundColor: letter.envelopeColor || '#FFFAF8' }}
              >
                {/* Envelope Flap Simulation Graphic */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-white/40 border-b border-black/5 clip-path-triangle pointer-events-none" />

                {/* Postage Stamp in Top Right */}
                <div className="absolute top-4 right-4 w-11 h-13 border-2 border-dashed border-[#C7839D]/50 bg-white/70 p-1 rounded-xs flex flex-col items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
                  <span className="text-base">{letter.emoji || '🌸'}</span>
                  <span className="text-[8px] font-mono font-bold text-[#49364E]/60 uppercase">AIRMAIL</span>
                </div>

                {/* Wax Seal Stamp Center */}
                <div className="relative z-10 w-12 h-12 rounded-full wax-seal flex items-center justify-center text-white mx-auto shadow-md mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 fill-white/80" />
                </div>

                {/* Letter Trigger (e.g. Open when you're sad) */}
                <div className="text-center relative z-10 mt-2">
                  <p className="font-handwriting text-2xl sm:text-3xl text-[#49364E] font-medium leading-tight mb-2">
                    {letter.trigger}
                  </p>
                  <p className="text-xs text-[#49364E]/70 line-clamp-1 italic font-serif">
                    {letter.title}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-center gap-1.5 text-xs text-[#C7839D] font-medium">
                  <MailOpen className="w-3.5 h-3.5" />
                  <span>Break the seal to read</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* LETTER REVEAL MODAL */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#49364E]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={closeLetter}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full bg-[#FFFAF8] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#EBC6B5] paper-texture max-h-[85vh] flex flex-col justify-between overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLetter}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#FFF5E9] hover:bg-[#F6D9E4] text-[#49364E] transition-colors cursor-pointer"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-[#F6D9E4] pb-4 mb-5 pr-10">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C7839D]">
                  <span>{selectedLetter.trigger}</span>
                  <span>•</span>
                  <span>Personal Dispatch</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#49364E] mt-1">
                  {selectedLetter.title}
                </h3>
              </div>

              {/* Letter Scrollable Body */}
              <div className="overflow-y-auto pr-2 flex-1 my-2">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#49364E] leading-relaxed whitespace-pre-line">
                  {selectedLetter.message}
                </p>
              </div>

              {/* Letter Footer */}
              <div className="border-t border-[#F6D9E4] pt-4 mt-4 flex items-center justify-between text-xs sm:text-sm text-[#49364E]/70">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full wax-seal flex items-center justify-center text-white text-xs">
                    ♡
                  </div>
                  <span className="font-serif italic">Written with genuine love & friendship</span>
                </div>

                <button
                  onClick={closeLetter}
                  className="px-4 py-1.5 rounded-full bg-[#C7839D] text-white font-medium hover:bg-[#b06f88] transition-colors"
                >
                  Keep in Heart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
