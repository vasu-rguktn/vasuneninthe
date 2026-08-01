import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, Share2, Type, Settings2 } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

type Theme = 'paper' | 'dark' | 'sepia';

export function ChapterReader() {
  const [theme, setTheme] = useState<Theme>('paper');
  const [fontSize, setFontSize] = useState(18);
  const lineHeight = 1.8;
  const [showSettings, setShowSettings] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Placeholder content for demo
  const chapter = {
    title: "The Silence of the Snow",
    estimatedTime: 14,
    content: `
      <p>The first snow always falls quietly, as if afraid to wake the earth from its autumn slumber. It begins as a solitary flake, drifting aimlessly through the cold air, a scout sent ahead of the pale army. By morning, the world is transformed into a blinding expanse of white, erasing paths, borders, and the jagged edges of reality.</p>
      <p>I found myself standing by the window of the old cabin, nursing a cup of tea that had long since gone cold. The silence outside was absolute. It was the kind of quiet that presses against your eardrums, a heavy, suffocating stillness that forces you to listen to your own heartbeat.</p>
      <p>In the city, silence is an absence of noise. Here, it is a presence. It is a living, breathing entity that sits beside you, watching.</p>
      <p>I had come here to write, to escape the relentless hum of expectation and obligation. But the snow had trapped me not just within these wooden walls, but within my own mind. Without distractions, memory becomes a hungry ghost, feeding on whatever fragments of the past it can unearth.</p>
      <p>The fireplace crackled, a sudden burst of sound that made me jump. I threw another log onto the dying embers and watched as the sparks danced and disappeared up the chimney. They reminded me of thoughts—brief, brilliant, and ultimately vanishing into the dark.</p>
    `
  };

  const themeClasses = {
    paper: 'bg-[#fdfbf7] text-[#2a2a2a]',
    dark: 'bg-[#111111] text-[#e0e0e0]',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]'
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-500", themeClasses[theme])}>
      {/* Reading Progress Ribbon */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold-accent origin-left z-50"
        style={{ scaleX }}
      />

      {/* Toolbar */}
      <div className={cn(
        "fixed top-0 left-0 w-full z-40 transition-colors duration-300 border-b",
        theme === 'dark' ? 'bg-[#111111]/90 border-white/10' : 'bg-white/90 border-black/10',
        "backdrop-blur-md"
      )}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/chapters" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft size={18} />
            <span className="font-buttons uppercase tracking-widest text-xs">Back to Shelf</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="font-meta text-xs tracking-widest opacity-60 uppercase">{chapter.estimatedTime} min read</span>
            <div className="h-4 w-[1px] bg-current opacity-20" />
            <button onClick={() => setShowSettings(!showSettings)} className="hover:opacity-70 transition-opacity">
              <Settings2 size={18} />
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <Bookmark size={18} />
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <Share2 size={18} />
            </button>
          </div>
        </div>
        
        {/* Settings Dropdown */}
        {showSettings && (
          <div className={cn(
            "absolute top-full right-6 mt-2 p-6 rounded shadow-2xl border w-72",
            theme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/10'
          )}>
            <div className="space-y-6">
              <div>
                <label className="font-buttons text-xs uppercase tracking-widest mb-3 block opacity-70">Theme</label>
                <div className="flex gap-2">
                  {(['paper', 'dark', 'sepia'] as Theme[]).map(t => (
                    <button 
                      key={t}
                      onClick={() => setTheme(t)}
                      className={cn(
                        "flex-1 py-2 text-xs uppercase tracking-widest border transition-all",
                        theme === t ? "border-gold-accent text-gold-accent" : "border-current opacity-50 hover:opacity-100"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="font-buttons text-xs uppercase tracking-widest mb-3 block opacity-70">Typography</label>
                <div className="flex items-center justify-between gap-4">
                  <span className="opacity-50"><Type size={14} /></span>
                  <input 
                    type="range" 
                    min="14" 
                    max="24" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="flex-1 accent-gold-accent"
                  />
                  <span className="opacity-50"><Type size={18} /></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chapter Content */}
      <article className="container mx-auto px-6 pt-40 pb-32 max-w-3xl relative">
        <header className="mb-16 text-center">
          <div className="font-meta tracking-widest text-xs uppercase opacity-50 mb-6">Chapter I</div>
          <h1 className="font-hero text-5xl md:text-7xl leading-tight mb-8">
            {chapter.title}
          </h1>
          <div className="w-12 h-[1px] bg-gold-accent mx-auto" />
        </header>
        
        <div 
          className="font-body prose prose-lg max-w-none"
          style={{ 
            fontSize: `${fontSize}px`, 
            lineHeight: lineHeight,
          }}
          dangerouslySetInnerHTML={{ __html: chapter.content }}
        />
        
        <div className="mt-32 text-center">
          <div className="w-12 h-[1px] bg-current opacity-20 mx-auto mb-12" />
          <p className="font-quotes text-4xl opacity-80">to be continued...</p>
        </div>
      </article>
    </div>
  );
}
