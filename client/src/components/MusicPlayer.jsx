import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export default function MusicPlayer({ customMusicUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);
  const audioElemRef = useRef(null);

  // Soft pentatonic frequencies (A major pentatonic: A, B, C#, E, F#)
  const notes = [
    220.0, // A3
    246.94, // B3
    277.18, // C#4
    329.63, // E4
    369.99, // F#4
    440.0, // A4
    493.88, // B4
    554.37, // C#5
    659.25, // E5
  ];

  // Play a gentle, soft chime note with sweet envelope
  const playChimeNote = (ctx, masterGain) => {
    if (!ctx || ctx.state !== 'running') return;
    try {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft triangle/sine blend
      osc.type = Math.random() > 0.4 ? 'sine' : 'triangle';

      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      osc.frequency.setValueAtTime(randomNote, ctx.currentTime);

      // Low pass filter to make it warm and soft, like a music box in a garden
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      const now = ctx.currentTime;
      const duration = 2.5 + Math.random() * 1.5;

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.15); // gentle attack
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // slow release

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {
      // Audio context might be closing
    }
  };

  const startChimes = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioCtx();
      
      const masterGain = audioContextRef.current.createGain();
      masterGain.gain.setValueAtTime(0.6, audioContextRef.current.currentTime);
      masterGain.connect(audioContextRef.current.destination);
      gainNodeRef.current = masterGain;
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    // Play initial gentle chord
    playChimeNote(audioContextRef.current, gainNodeRef.current);
    setTimeout(() => {
      if (audioContextRef.current) playChimeNote(audioContextRef.current, gainNodeRef.current);
    }, 400);

    // Continuous soothing chimes
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioContextRef.current && !isMuted) {
        playChimeNote(audioContextRef.current, gainNodeRef.current);
        if (Math.random() > 0.5) {
          setTimeout(() => {
            playChimeNote(audioContextRef.current, gainNodeRef.current);
          }, 600);
        }
      }
    }, 1800);
  };

  const stopChimes = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (customMusicUrl && audioElemRef.current) {
      if (isPlaying) {
        audioElemRef.current.pause();
        setIsPlaying(false);
      } else {
        audioElemRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          // Fallback to procedural chimes
          startChimes();
          setIsPlaying(true);
        });
      }
      return;
    }

    if (isPlaying) {
      stopChimes();
      setIsPlaying(false);
    } else {
      startChimes();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (customMusicUrl && audioElemRef.current) {
      audioElemRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      return;
    }

    if (gainNodeRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      if (isMuted) {
        gainNodeRef.current.gain.setValueAtTime(0.6, now);
        setIsMuted(false);
      } else {
        gainNodeRef.current.gain.setValueAtTime(0, now);
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopChimes();
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {customMusicUrl && (
        <audio ref={audioElemRef} src={customMusicUrl} loop preload="none" />
      )}
      
      <button
        onClick={togglePlay}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg transition-all duration-300 border ${
          isPlaying
            ? 'bg-[#F6D9E4]/90 hover:bg-[#F6D9E4] text-[#49364E] border-[#C7839D]/30 shadow-[#C7839D]/20 scale-105'
            : 'bg-white/90 hover:bg-white text-[#49364E] border-[#E9DDF5] hover:shadow-md'
        } backdrop-blur-md`}
        title={isPlaying ? 'Pause Garden Melodies' : 'Play Gentle Garden Melodies'}
      >
        <div className="relative flex items-center justify-center">
          <Music className={`w-4 h-4 text-[#C7839D] ${isPlaying ? 'animate-bounce' : ''}`} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7839D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7839D]"></span>
            </span>
          )}
        </div>

        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? 'Garden Melody ♫' : 'Play Melody'}
        </span>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-1 hover:text-[#C7839D] transition-colors ml-1"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </button>
    </div>
  );
}
