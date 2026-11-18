import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FloatingPetals from '../components/FloatingPetals';
import FloatingButterflies from '../components/FloatingButterflies';
import MusicPlayer from '../components/MusicPlayer';
import Footer from '../components/Footer';

import HeroSection from '../sections/HeroSection';
import AboutYouSection from '../sections/AboutYouSection';
import MemoryLaneSection from '../sections/MemoryLaneSection';
import PolaroidWallSection from '../sections/PolaroidWallSection';
import ReasonsSection from '../sections/ReasonsSection';
import OpenWhenSection from '../sections/OpenWhenSection';
import ConstellationSection from '../sections/ConstellationSection';
import FinalSurpriseSection from '../sections/FinalSurpriseSection';

import { api } from '../services/api';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // State loaded from API / fallback
  const [settings, setSettings] = useState(null);
  const [appreciations, setAppreciations] = useState([]);
  const [memories, setMemories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [letters, setLetters] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          sData,
          aData,
          mData,
          gData,
          rData,
          lData,
          stData
        ] = await Promise.all([
          api.getSettings(),
          api.getAppreciations(),
          api.getMemories(),
          api.getGallery(),
          api.getReasons(),
          api.getLetters(),
          api.getStars(),
        ]);

        setSettings(sData);
        setAppreciations(aData);
        setMemories(mData);
        setGallery(gData);
        setReasons(rData);
        setLetters(lData);
        setStars(stData);
      } catch (err) {
        console.error('Data load error:', err);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    }

    loadData();
  }, []);

  // Intersection observer to track active section for navbar
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'memories', 'gallery', 'reasons', 'letters', 'universe', 'surprise'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#FFFAF8] z-50 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-[#F6D9E4] border-t-[#C7839D] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-xl">
            🌸
          </div>
        </div>
        <p className="font-serif italic text-2xl text-[#49364E] mt-6 animate-pulse">
          Gathering flower petals for Deepuuu...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAF8] text-[#49364E] relative selection:bg-[#F6D9E4]">
      {/* Ambient background particles & animations */}
      <FloatingPetals />
      <FloatingButterflies />

      {/* Navigation */}
      <Navbar activeSection={activeSection} recipientName={settings?.recipientName || "Deepuu"} />

      {/* 8 Major Sections */}
      <main>
        <HeroSection settings={settings} />
        <AboutYouSection appreciations={appreciations} />
        <MemoryLaneSection memories={memories} />
        <PolaroidWallSection gallery={gallery} />
        <ReasonsSection reasons={reasons} />
        <OpenWhenSection letters={letters} />
        <ConstellationSection stars={stars} />
        <FinalSurpriseSection settings={settings} />
      </main>

      {/* Non-autoplay Audio Player Toggle */}
      <MusicPlayer customMusicUrl={settings?.musicUrl} />

      {/* Footer */}
      <Footer recipientName={settings?.recipientName} />
    </div>
  );
}
