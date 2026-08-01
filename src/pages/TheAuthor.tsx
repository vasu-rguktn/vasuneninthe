import { motion } from "framer-motion"

export function TheAuthor() {
  return (
    <div className="container mx-auto px-6 pt-32 pb-24 min-h-[80vh] flex flex-col items-center justify-center relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-16"
      >
        <div className="flex-1 w-full relative group">
          <div className="aspect-[3/4] bg-ink-900 border border-ink-700/50 p-4 aged-paper-card relative z-10 overflow-hidden">
            {/* Placeholder image. User can update via dashboard or manually replace this. */}
            <div className="w-full h-full bg-ink-800 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale mix-blend-luminosity opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          {/* Decorative elements */}
          <div className="absolute -inset-4 border border-gold-accent/20 z-0 rotate-2 group-hover:rotate-1 transition-transform duration-700" />
          <div className="absolute -inset-4 border border-gold-accent/10 z-0 -rotate-2 group-hover:-rotate-1 transition-transform duration-700" />
        </div>
        
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="font-meta text-gold-accent tracking-[0.3em] uppercase text-xs">The Author</div>
          <h1 className="font-hero text-5xl md:text-7xl text-ink-light">Vasu Neninthe</h1>
          
          <div className="w-12 h-[1px] bg-gold-accent mx-auto md:mx-0" />
          
          <p className="font-body text-xl text-ink-light/80 leading-relaxed italic">
            A FILM aspirant, Script writer, Story narrator, lyricist.
          </p>
          
          <p className="font-body text-ink-light/60 leading-relaxed">
            Every story begins as a whisper, an observation caught in the margins of daily life. Through script, song, and narrative, I strive to capture those fleeting moments and translate them into a cinematic reality.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
