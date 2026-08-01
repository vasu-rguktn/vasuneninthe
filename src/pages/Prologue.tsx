import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typewriter } from "@/components/ui/Typewriter"
import { Link } from "react-router-dom"
import { BookOpen, PenTool, Image as ImageIcon } from "lucide-react"

export function Prologue() {
  const [typingComplete, setTypingComplete] = useState(false);

  return (
    <div className="container mx-auto px-6 flex flex-col items-center justify-start min-h-screen relative pt-12">
      
      {/* Hero / Typewriter Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center w-full">
        <div className="min-h-[120px] flex items-center justify-center mb-16 relative z-20 w-full text-center">
          <Typewriter onComplete={() => setTypingComplete(true)} />
        </div>

        {/* Ink Spread Reveal */}
        <AnimatePresence>
          {typingComplete && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="flex flex-col items-center relative z-10 w-full"
            >
              <h2 className="font-quotes text-5xl md:text-7xl text-gold-accent tracking-wider rotate-[-2deg] mb-24 drop-shadow-lg text-center">
                welcome to my world.
              </h2>
              
              <Link to="/chapters" data-cursor="hover" className="group relative px-12 py-4 border border-ink-700/50 hover:border-gold-accent/50 transition-all duration-700 aged-paper-card overflow-hidden">
                <span className="relative z-10 font-buttons uppercase tracking-[0.3em] text-xs text-white/80 group-hover:text-gold-accent transition-colors duration-500">
                  open chapter one
                </span>
                {/* Book cover opening animation overlay */}
                <div className="absolute inset-0 bg-ink-800 origin-left transform scale-x-100 group-hover:scale-x-0 transition-transform duration-700 ease-in-out z-0" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Sequential Homepage Sections (Revealed after typing) */}
      <AnimatePresence>
        {typingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="w-full max-w-5xl mx-auto flex flex-col gap-32 pb-32"
          >
            {/* Featured Chapter */}
            <section className="flex flex-col md:flex-row gap-12 items-center aged-paper-card p-12">
              <div className="flex-1 space-y-6">
                <div className="font-meta text-gold-accent/60 text-sm tracking-[0.2em] uppercase">Featured Chapter</div>
                <h3 className="font-hero text-4xl text-ink-light">The Silence of the Snow</h3>
                <p className="font-body text-ink-light/70 leading-relaxed">
                  An exploration of solitude during the harshest winters, where the world goes quiet and the mind becomes dangerously loud.
                </p>
                <Link to="/chapters/silence-of-the-snow" className="inline-flex items-center gap-2 text-gold-accent font-buttons uppercase text-xs tracking-widest hover:text-white transition-colors">
                  Read Chapter <BookOpen size={14} />
                </Link>
              </div>
              <div className="flex-1 aspect-[3/4] bg-ink-900 border border-ink-700/30 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542360803-455b85a15321?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity" />
              </div>
            </section>

            {/* Latest Quote */}
            <section className="text-center px-4">
              <div className="font-meta text-gold-accent/60 text-sm tracking-[0.2em] uppercase mb-12">Marginalia</div>
              <blockquote className="font-quotes text-3xl md:text-5xl text-ink-light max-w-3xl mx-auto leading-relaxed rotate-[-1deg]">
                "We write not to be understood, but to understand the ghosts we carry."
              </blockquote>
            </section>

            {/* Shelf & Archives Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link to="/the-shelf" className="group aged-paper-card p-12 flex flex-col items-center text-center gap-6 hover:border-gold-accent/30 transition-colors">
                <PenTool className="text-gold-accent/50 w-12 h-12" />
                <h3 className="font-hero text-2xl text-ink-light group-hover:text-gold-accent transition-colors">The Shelf</h3>
                <p className="font-body text-ink-light/50">My complete collection of published stories, essays, and loose thoughts.</p>
              </Link>
              <Link to="/loose-leaves" className="group aged-paper-card p-12 flex flex-col items-center text-center gap-6 hover:border-gold-accent/30 transition-colors">
                <ImageIcon className="text-gold-accent/50 w-12 h-12" />
                <h3 className="font-hero text-2xl text-ink-light group-hover:text-gold-accent transition-colors">Illustrated Pages</h3>
                <p className="font-body text-ink-light/50">A visual diary of moments, posters, and the spaces where I write.</p>
              </Link>
            </section>

            {/* Newsletter */}
            <section className="aged-paper-card p-16 text-center max-w-2xl mx-auto w-full">
              <h3 className="font-hero text-3xl text-ink-light mb-4">Letters from the Study</h3>
              <p className="font-body text-ink-light/60 mb-8">Subscribe to receive my latest chapters, thoughts, and marginalia directly in your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="your email address..." 
                  className="flex-1 bg-ink-900 border border-ink-700/50 px-6 py-3 font-body text-ink-light focus:outline-none focus:border-gold-accent transition-colors"
                />
                <button className="px-8 py-3 bg-ink-900 text-gold-accent border border-gold-accent/50 hover:bg-gold-accent hover:text-ink-900 font-buttons uppercase tracking-widest text-xs transition-colors">
                  Subscribe
                </button>
              </form>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
