import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Heart, Flower } from 'lucide-react';

export default function HeroSection({ settings }) {
  const scrollToAbout = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const recipientName = settings?.recipientName || "Deepuuu";
  const heroEyebrow = settings?.heroEyebrow || "A LITTLE WORLD MADE JUST FOR YOU";
  const heroTitle = settings?.heroTitle || `Dear ${recipientName} ♡`;
  const heroSubtitle = settings?.heroSubtitle || "A garden full of memories, smiles and little secrets.";
  const heroDescription = settings?.heroDescription || "Because some people make life bloom a little brighter.";
  const heroButtonText = settings?.heroButtonText || "Explore your little world";
  const heroNote = settings?.heroNote || "A tiny surprise, made with a little extra care.";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FFFAF8] via-[#F6D9E4]/30 to-[#FFF5E9]/60"
    >
      {/* Decorative Floral Background Elements */}
      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-radial from-[#F6D9E4]/60 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-radial from-[#E9DDF5]/50 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-[#FFF5E9]/80 to-transparent blur-2xl pointer-events-none" />

      {/* Subtle Botanical SVG Accents */}
      <div className="absolute top-24 left-6 sm:left-16 text-[#A8B89A]/30 pointer-events-none animate-float-slow">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M50 90 C50 60 20 40 10 20 C30 20 50 40 50 90 Z" fill="#A8B89A" fillOpacity="0.1" />
          <path d="M50 90 C50 60 80 40 90 20 C70 20 50 40 50 90 Z" fill="#A8B89A" fillOpacity="0.1" />
          <path d="M50 90 L50 10" />
        </svg>
      </div>

      <div className="absolute bottom-20 right-6 sm:right-16 text-[#C7839D]/30 pointer-events-none animate-float-reverse">
        <svg width="130" height="130" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="18" fill="#F6D9E4" fillOpacity="0.3" />
          <path d="M50 15 C45 30 55 30 50 15 Z" fill="#C7839D" fillOpacity="0.2" />
          <path d="M50 85 C45 70 55 70 50 85 Z" fill="#C7839D" fillOpacity="0.2" />
          <path d="M15 50 C30 45 30 55 15 50 Z" fill="#C7839D" fillOpacity="0.2" />
          <path d="M85 50 C70 45 70 55 85 50 Z" fill="#C7839D" fillOpacity="0.2" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Deepu Hero Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mb-5"
        >
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-tr from-[#C7839D] via-[#F6D9E4] to-[#A8B89A] shadow-xl hover:scale-105 transition-transform">
            <img
              src="/photos/Deepu1.webp"
              alt="Deepuuu"
              className="w-full h-full object-cover rounded-full border-2 border-white"
            />
            <span className="absolute -bottom-1 -right-1 bg-white text-[#C7839D] p-1.5 rounded-full shadow-md text-xs">
              🌸
            </span>
          </div>
        </motion.div>

        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#F6D9E4] shadow-xs text-xs sm:text-sm font-medium tracking-widest text-[#C7839D] uppercase mb-6 backdrop-blur-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{heroEyebrow}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#49364E] tracking-tight mb-6 leading-tight"
        >
          {heroTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#C7839D] max-w-2xl mb-4 leading-relaxed"
        >
          "{heroSubtitle}"
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="text-base sm:text-lg text-[#49364E]/80 max-w-xl mb-10 font-normal leading-relaxed"
        >
          {heroDescription}
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={scrollToAbout}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C7839D] via-[#EBC6B5] to-[#A8B89A] text-white font-medium text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>{heroButtonText}</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFF5E9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </button>

          {/* Secondary handwritten note */}
          <span className="font-handwriting text-xl sm:text-2xl text-[#C7839D] tracking-wide transform -rotate-1 mt-1">
            ~ {heroNote} 🌸
          </span>
        </motion.div>

        {/* Subtle scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex flex-col items-center text-[#49364E]/40 cursor-pointer hover:text-[#C7839D] transition-colors"
          onClick={scrollToAbout}
        >
          <span className="text-xs tracking-widest uppercase font-medium mb-1">Scroll to bloom</span>
          <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
