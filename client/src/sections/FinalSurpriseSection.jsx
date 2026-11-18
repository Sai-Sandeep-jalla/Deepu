import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, RefreshCw, Flower2, Award } from 'lucide-react';

export default function FinalSurpriseSection({ settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const recipientName = settings?.recipientName || "Deepuuu";
  const finalLetter = settings?.finalLetter || `Dear Deepuuu,

I don't know whether I say this enough, but I'm genuinely glad that you're part of my life.

Thank you for all the random conversations, silly moments, laughs and memories.

You have your own special way of making ordinary days a little more interesting.

Stay the same crazy, adorable and wonderful person you are.

And remember, no matter how busy life gets, you'll always have a special place in my little universe.

With lots of smiles, a little madness and unlimited friendship,

Your favourite troublemaker. ♡`;

  const triggerSurprise = () => {
    if (isOpen) return;
    setIsOpening(true);

    // Fire floral and pastel confetti burst
    setTimeout(() => {
      // Confetti burst with pastel friendship colors
      const colors = ['#F6D9E4', '#E9DDF5', '#FFF5E9', '#EBC6B5', '#C7839D', '#A8B89A'];

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: colors
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
      }, 250);

      setIsOpening(false);
      setIsOpen(true);
    }, 900);
  };

  const handleReplay = () => {
    setIsOpen(false);
    setIsOpening(false);
  };

  return (
    <section
      id="surprise"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative overflow-hidden"
    >
      {/* Decorative floral ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#F6D9E4]/40 to-transparent blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6D9E4] text-[#C7839D] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#C7839D]/30"
        >
          <Gift className="w-3.5 h-3.5" />
          <span>The Climax</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-medium text-[#49364E] mb-4"
        >
          One last little thing...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-lg sm:text-xl text-[#C7839D]"
        >
          "Because I saved something special for the end."
        </motion.p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {!isOpen ? (
          <div className="flex flex-col items-center">
            {/* 3D Pastel Gift Box Illustration */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: isOpening ? [0, -3, 3, -3, 0] : [0, 1, -1, 0]
              }}
              transition={{
                duration: isOpening ? 0.4 : 4,
                repeat: isOpening ? Infinity : Infinity,
                ease: "easeInOut"
              }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-pointer group my-4"
              onClick={triggerSurprise}
            >
              {/* Soft glow behind gift */}
              <div className="absolute inset-4 rounded-3xl bg-radial from-[#C7839D]/40 to-transparent blur-xl pointer-events-none" />

              {/* Gift Box Base */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-36 sm:h-40 bg-gradient-to-tr from-[#F6D9E4] to-[#FFF5E9] rounded-2xl shadow-xl border-2 border-[#EBC6B5] flex items-center justify-center overflow-hidden">
                {/* Vertical Ribbon */}
                <div className="absolute top-0 bottom-0 w-8 bg-[#C7839D] shadow-xs" />
                {/* Horizontal Ribbon */}
                <div className="absolute left-0 right-0 h-8 bg-[#C7839D] shadow-xs" />
              </div>

              {/* Gift Box Lid */}
              <motion.div
                animate={{
                  y: isOpening ? -40 : 0,
                  rotate: isOpening ? -12 : 0
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-16 left-1/2 -translate-x-1/2 w-52 sm:w-60 h-16 bg-gradient-to-r from-[#F6D9E4] via-[#FFF5E9] to-[#F6D9E4] rounded-xl shadow-lg border-2 border-[#EBC6B5] z-10 flex items-center justify-center"
              >
                {/* Vertical Ribbon on Lid */}
                <div className="w-8 h-full bg-[#C7839D]" />

                {/* Bow on Top */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-9 h-7 rounded-full border-4 border-[#C7839D] bg-[#F6D9E4] transform -rotate-35 -mr-2 inline-block shadow-xs" />
                    <div className="w-9 h-7 rounded-full border-4 border-[#C7839D] bg-[#F6D9E4] transform rotate-35 -ml-2 inline-block shadow-xs" />
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#C7839D] shadow-xs" />
                  </div>
                </div>
              </motion.div>

              {/* Sparkles floating around */}
              <div className="absolute top-4 left-4 text-[#C7839D] animate-ping">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="absolute bottom-6 right-6 text-[#A8B89A] animate-pulse">
                <Heart className="w-6 h-6 fill-[#E9DDF5]" />
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerSurprise}
              disabled={isOpening}
              className="mt-6 px-9 py-4 rounded-full bg-gradient-to-r from-[#C7839D] via-[#EBC6B5] to-[#A8B89A] text-white font-medium text-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center gap-3"
            >
              <Gift className="w-5 h-5" />
              <span>{isOpening ? "Untying ribbon..." : "Open your surprise"}</span>
              <Sparkles className="w-4 h-4 text-[#FFF5E9]" />
            </motion.button>
          </div>
        ) : (
          /* REVEALED HANDWRITTEN LETTER */
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="w-full max-w-3xl bg-[#FFFAF8] rounded-3xl p-8 sm:p-14 shadow-2xl border-2 border-[#EBC6B5] paper-texture relative"
          >
            {/* Decorative Corner Flowers */}
            <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#F6D9E4] border-2 border-white flex items-center justify-center text-[#C7839D] shadow-md">
              <Flower2 className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-5 -right-5 w-12 h-12 rounded-full bg-[#E9DDF5] border-2 border-white flex items-center justify-center text-[#C7839D] shadow-md">
              <Heart className="w-6 h-6 fill-[#C7839D]" />
            </div>

            {/* Sweet Polaroid Accent */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-2.5 pb-4 rounded-2xl shadow-md border border-[#F6D9E4] transform -rotate-2 hover:rotate-0 transition-transform">
                <img
                  src="/photos/Deepu1.webp"
                  alt="Dear Deepuuu"
                  className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl"
                />
                <p className="font-handwriting text-center text-base text-[#49364E] mt-2 font-medium">
                  To my favourite human ♡
                </p>
              </div>
            </div>

            {/* Letter Header */}
            <div className="text-center pb-6 border-b border-[#F6D9E4] mb-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C7839D] bg-white/80 px-4 py-1 rounded-full border border-[#F6D9E4]">
                A Heartfelt Dedication
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#49364E] font-medium mt-3">
                To Deepuuu, From The Heart ♡
              </h3>
            </div>

            {/* Dedication Letter Content */}
            <div className="font-handwriting text-2xl sm:text-3xl lg:text-4xl text-[#49364E] leading-relaxed sm:leading-loose whitespace-pre-line px-2 sm:px-6">
              {finalLetter}
            </div>

            {/* Action Bar */}
            <div className="mt-12 pt-6 border-t border-[#F6D9E4] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#49364E]/70 font-serif italic">
                <Award className="w-4 h-4 text-[#C7839D]" />
                <span>Certified best friendship dedication</span>
              </div>

              <button
                onClick={handleReplay}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFF5E9] border border-[#EBC6B5] text-[#C7839D] hover:bg-[#EBC6B5]/30 text-xs sm:text-sm font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Wrap Box Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
