import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Sparkles, Gift } from 'lucide-react';

export default function Navbar({ activeSection, recipientName = "Deepuu" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About You', href: '#about' },
    { name: 'Our Memories', href: '#memories' },
    { name: 'Gallery', href: '#gallery' },
    { name: "Reasons You're Special", href: '#reasons' },
    { name: 'Little Letters', href: '#letters' },
    { name: 'Universe', href: '#universe' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
      setIsScrolled(winScroll > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#F6D9E4]/40 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#C7839D] via-[#EBC6B5] to-[#A8B89A] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFAF8]/85 backdrop-blur-md shadow-sm border-b border-[#F6D9E4]/60 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="group flex items-center gap-1.5 text-xl sm:text-2xl font-serif text-[#49364E] tracking-tight hover:opacity-90 transition-opacity"
          >
            <span className="font-semibold">Deepuu</span>
            <Heart className="w-5 h-5 fill-blue-500 text-blue-500 group-hover:scale-125 transition-transform inline-block" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#F6D9E4] text-[#49364E] shadow-xs'
                      : 'text-[#49364E]/80 hover:text-[#49364E] hover:bg-[#FFF5E9]'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Pill CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#surprise"
              onClick={(e) => handleLinkClick(e, '#surprise')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-[#C7839D] to-[#EBC6B5] text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Surprise</span>
              <Sparkles className="w-3 h-3 text-[#FFF5E9]" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="#surprise"
              onClick={(e) => handleLinkClick(e, '#surprise')}
              className="p-2 rounded-full bg-[#F6D9E4] text-[#C7839D] hover:bg-[#EBC6B5] transition-colors"
              title="Final Surprise"
            >
              <Gift className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#49364E] hover:bg-[#F6D9E4]/60 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#FFFAF8]/95 backdrop-blur-lg border-b border-[#F6D9E4] shadow-lg animate-fadeIn px-6 py-5 mt-2 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-[#49364E] hover:bg-[#F6D9E4] active:bg-[#EBC6B5] transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 border-t border-[#F6D9E4]/80">
              <a
                href="#surprise"
                onClick={(e) => handleLinkClick(e, '#surprise')}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-[#C7839D] to-[#EBC6B5] text-white shadow-md"
              >
                <Gift className="w-4 h-4" />
                <span>Open Your Surprise ♡</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
