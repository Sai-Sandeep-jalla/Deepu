import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, X, Heart, Sparkles, Filter } from 'lucide-react';

export default function PolaroidWallSection({ gallery = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', ...new Set(gallery.map(item => item.category).filter(Boolean))];

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  // Lightbox Navigation
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
  }, [lightboxIndex, filteredGallery.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  }, [lightboxIndex, filteredGallery.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, showNext, showPrev]);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9DDF5]/70 text-[#49364E] text-xs font-semibold tracking-wider uppercase mb-3"
        >
          <Camera className="w-3.5 h-3.5 text-[#C7839D]" />
          <span>Polaroid Snapshots</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-medium text-[#49364E] mb-4"
        >
          A little collection of us.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-lg sm:text-xl text-[#C7839D] mb-8"
        >
          "Different moments, different moods, endless memories."
        </motion.p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C7839D] text-white shadow-sm'
                  : 'bg-white/80 border border-[#F6D9E4] text-[#49364E] hover:bg-[#F6D9E4]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-4">
        {filteredGallery.map((photo, idx) => {
          const rotation = photo.rotation || (idx % 2 === 0 ? -2 : 2.5);

          return (
            <motion.div
              key={photo.id || idx}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              {/* Polaroid Frame */}
              <div
                className="relative bg-white p-3.5 pb-6 rounded-md shadow-md group-hover:shadow-2xl group-hover:scale-105 group-hover:rotate-0 transition-all duration-300 border border-[#E9DDF5]/80"
                style={{
                  transform: `rotate(${rotation}deg)`
                }}
              >
                {/* Decorative Washi Tape on Top Center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#EBC6B5]/70 rounded-xs shadow-xs backdrop-blur-xs transform -rotate-1 border border-white/40 pointer-events-none" />

                {/* Photo Image */}
                <div className="aspect-square w-full overflow-hidden rounded-xs bg-[#FFF5E9] relative">
                  <img
                    src={photo.thumbnailUrl || photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#C7839D]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-[#49364E] text-xs font-medium px-3 py-1 rounded-full shadow-xs">
                      View Fullsize
                    </span>
                  </div>
                </div>

                {/* Polaroid Caption & Details */}
                <div className="mt-3.5 text-center px-1">
                  <p className="font-handwriting text-xl text-[#49364E] line-clamp-2 leading-snug">
                    {photo.caption}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-[#C7839D]">
                    <span className="uppercase tracking-wider font-semibold opacity-70">
                      {photo.category}
                    </span>
                    <Heart className="w-3 h-3 fill-[#F6D9E4]" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#49364E]/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[70vh] rounded-xl overflow-hidden bg-black/5 flex items-center justify-center">
                <img
                  src={filteredGallery[lightboxIndex].imageUrl}
                  alt={filteredGallery[lightboxIndex].caption}
                  className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#F6D9E4] pt-4">
                <div className="text-center sm:text-left">
                  <p className="font-handwriting text-2xl text-[#49364E]">
                    {filteredGallery[lightboxIndex].caption}
                  </p>
                  <span className="text-xs font-semibold text-[#C7839D] tracking-wide uppercase">
                    {filteredGallery[lightboxIndex].category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#49364E]/60 font-medium">
                  <span>
                    {lightboxIndex + 1} of {filteredGallery.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
