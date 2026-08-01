import { motion } from 'framer-motion';

export function HeroSection() {
  const scrollToJournal = () => {
    document.getElementById('marginalia')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="relative z-10 flex flex-col items-center">
        <div className="font-hero text-white/90 text-center leading-relaxed mb-8 px-4 w-full flex flex-col items-center justify-center min-h-[160px]" style={{ fontSize: '28px' }}>
          <div>Hola .. I' Vasuneninthe..!</div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Fountain Pen Underline Effect */}
          <div className="w-full max-w-[300px] h-[2px] bg-gold-accent/50 mb-12 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-0 bg-gold-accent"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <button
            onClick={scrollToJournal}
            className="group relative px-10 py-5 font-buttons text-[28px] text-white/80 hover:text-white transition-colors duration-500 leading-none"
          >
            Open my Journal
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold-accent group-hover:w-full transition-all duration-500 shadow-[0_0_8px_rgba(200,169,106,0.5)]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
