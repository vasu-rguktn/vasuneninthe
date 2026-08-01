import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const lines = [
  "i am vasu.",
  "i write.",
  "i observe.",
  "i remember.",
  "i turn emotions into words."
];

export function Typewriter({ onComplete }: { onComplete: () => void }) {
  const [displayText, setDisplayText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // We'd normally use an actual audio file here
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/typewriter.mp3');
    audioRef.current.volume = 0.2;
  }, []);

  const playSound = () => {
    if (!isMuted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      onComplete();
      return;
    }

    const currentLine = lines[currentLineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentLine) {
      // Reached end of line, wait then delete unless it's the last line
      if (currentLineIndex === lines.length - 1) {
        onComplete();
        return;
      }
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === '') {
      // Finished deleting, move to next line
      setIsDeleting(false);
      setCurrentLineIndex(prev => prev + 1);
      timeout = setTimeout(() => {}, 500);
    } else {
      // Typing or deleting characters
      const delay = isDeleting 
        ? 30 
        : Math.random() * 50 + 50; // Random typing rhythm

      // Add pause after punctuation
      const nextChar = currentLine[displayText.length];
      const extraDelay = (!isDeleting && (nextChar === '.' || nextChar === ',')) ? 300 : 0;

      timeout = setTimeout(() => {
        setDisplayText(prev => {
          if (isDeleting) return prev.slice(0, -1);
          playSound();
          return currentLine.slice(0, prev.length + 1);
        });
      }, delay + extraDelay);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentLineIndex, isMuted, onComplete]);

  return (
    <div className="relative inline-block font-meta text-[clamp(2rem,5vw,4rem)] leading-tight text-ink-light tracking-widest uppercase">
      {displayText}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[0.1em] h-[1em] bg-ink-light ml-2 align-middle"
      />
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute -right-16 top-1/2 -translate-y-1/2 text-ink-light/30 hover:text-ink-light/80 transition-colors"
        data-cursor="hover"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
}
