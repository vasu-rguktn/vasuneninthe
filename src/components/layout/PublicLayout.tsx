import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navigation } from "./Navigation"
import { useScrollToTop } from "@/hooks/use-scroll-to-top"
import Lenis from "@studio-freight/lenis"
import { AnimatePresence, motion } from "framer-motion"

export function PublicLayout() {
  useScrollToTop();
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen ink-gradient paper-texture vignette text-ink-light selection:bg-ink-purple selection:text-white relative">
      {/* Floating Dust Particles - Global */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              x: [null, (Math.random() - 0.5) * 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>


      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -10, rotateX: -5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col min-h-screen pt-24 pb-12 perspective-1000"
          style={{ transformOrigin: "top center" }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <footer className="relative z-10 py-12 text-center text-ink-light/40 font-body italic mt-auto">
        <p className="text-[28px]">the end... until another chapter begins.</p>
      </footer>
    </div>
  )
}

