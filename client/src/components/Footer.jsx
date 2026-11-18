import React from 'react';
import { Heart, ArrowUp, Sparkles, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ recipientName = "Deepuuu" }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-t from-[#F6D9E4]/40 via-[#FFF5E9]/50 to-transparent pt-16 pb-12 border-t border-[#F6D9E4]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Decorative Flower */}
        <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-[#F6D9E4] flex items-center justify-center text-[#C7839D] mb-4">
          <Heart className="w-5 h-5 fill-[#F6D9E4]" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-normal text-[#49364E] mb-2">
          Dear {recipientName} ♡
        </h3>

        {/* Sweet Quote */}
        <p className="font-handwriting text-2xl sm:text-3xl text-[#C7839D] max-w-lg mb-6">
          "Good friends are like stars in the garden — you don't always see them, but you know they're always there."
        </p>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#E9DDF5] text-xs font-medium text-[#49364E] hover:bg-[#F6D9E4]/40 hover:shadow-xs transition-all mb-8 cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#C7839D]" />
          <span>Back to Top</span>
        </button>

        {/* Bottom copyright & subtle admin link */}
        <div className="w-full pt-6 border-t border-[#F6D9E4]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#49364E]/60">
          <p>© {new Date().getFullYear()} Dear Deepuuu ♡ — Made with a little extra care.</p>

          <div className="flex items-center gap-4">
            <span className="font-handwriting text-lg text-[#C7839D]">A Magical Floral Garden</span>
            {/* Secret owner access button */}
            <Link
              to="/admin"
              className="p-1.5 rounded-full hover:bg-white text-[#49364E]/40 hover:text-[#C7839D] transition-colors"
              title="Admin Panel"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
