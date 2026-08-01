import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface Quote {
  id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export function Marginalia() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching quotes:", error);
        } else if (data) {
          setQuotes(data);
        }
      } catch (err) {
        console.error("Failed to fetch quotes");
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  return (
    <div className="container mx-auto px-6 py-32 min-h-screen">
      <header className="mb-32 text-center flex flex-col items-center">
        <h1 className="font-headings text-[28px] text-white mb-4 tracking-wide capitalize leading-none">Marginalia</h1>
        <h2 className="font-headings text-[28px] text-white/80 mb-6 capitalize tracking-wider leading-none">
          Gallery of Quotes
        </h2>
        <p className="font-meta text-white/60 max-w-4xl mx-auto tracking-widest text-[28px] leading-tight mt-6">
          "A collection of thoughts written between the lines."
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="animate-spin text-gold-accent w-8 h-8" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-12 max-w-7xl mx-auto">
          <AnimatePresence>
            {quotes.map((quote, idx) => {
              // Generate pseudo-random rotations and margins for a scattered look
              const rotation = (idx % 2 === 0 ? 1 : -1) * ((idx * 3) % 6 + 1);
              const marginTop = (idx % 3) * 20;

              return (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative transform transition-all duration-300 hover:z-50 hover:scale-105 shadow-xl"
                  style={{
                    rotate: `${rotation}deg`,
                    marginTop: `${marginTop}px`
                  }}
                >
                  
                  {/* Image with white frame */}
                  <div className="bg-white p-4 w-[350px] h-[350px] shadow-md flex-shrink-0 relative overflow-hidden rounded-sm">
                    <img 
                      src={quote.image_url} 
                      alt="Gallery image"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  {/* Restored caption quote */}
                  {quote.caption && (
                    <div className="w-[350px] mt-8 px-2">
                      <p className="font-quotes text-[28px] text-white/80 text-center leading-tight">
                        {quote.caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {quotes.length === 0 && !loading && (
            <div className="w-full text-center py-32">
              <p className="font-headings text-[28px] text-white/40 italic">The gallery is currently empty.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
