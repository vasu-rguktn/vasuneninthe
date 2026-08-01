import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function WriteToMe() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [letter, setLetter] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending email/storing
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="w-full py-32 px-6 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <header className="mb-20 text-center flex flex-col items-center">
          <h2 className="font-headings text-[56px] md:text-[64px] text-ink-900 mb-6 lowercase tracking-wide relative inline-block">
            write to me
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 h-[1px] bg-ink-900/50"
            />
          </h2>
          <p className="font-meta text-ink-900/70 italic tracking-widest text-[22px] mt-8">
            "If my words found a place in your heart, I'd love to hear yours."
          </p>
        </header>

          <div className="relative">
          {/* Solid Color Background */}
          <div 
            className="absolute inset-0 shadow-2xl rounded-sm transform rotate-1 pointer-events-none" 
            style={{ backgroundColor: '#dda15e' }}
          />
          
          <div className="relative bg-[#f4ecd8] backdrop-blur-sm p-12 md:p-20 shadow-xl rounded-sm border border-ink-900/10">
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-8"
                >
                  <div className="group relative">
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-ink-900/20 py-4 font-meta text-ink-900 text-[18px] placeholder:text-ink-900/40 focus:outline-none focus:border-ink-900/60 transition-colors"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-ink-900 group-focus-within:w-full transition-all duration-700 ease-out" />
                  </div>
                  
                  <div className="group relative">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Your Email"
                      className="w-full bg-transparent border-b border-ink-900/20 py-4 font-meta text-ink-900 text-[18px] placeholder:text-ink-900/40 focus:outline-none focus:border-ink-900/60 transition-colors"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-ink-900 group-focus-within:w-full transition-all duration-700 ease-out" />
                  </div>

                  <div className="group relative">
                    <textarea 
                      required
                      value={letter}
                      onChange={e => setLetter(e.target.value)}
                      placeholder="Your Letter..."
                      rows={6}
                      className="w-full bg-transparent border-b border-ink-900/20 py-4 font-meta text-ink-900 text-[18px] placeholder:text-ink-900/40 focus:outline-none focus:border-ink-900/60 transition-colors resize-none leading-relaxed"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-ink-900 group-focus-within:w-full transition-all duration-700 ease-out" />
                  </div>

                  <div className="flex justify-center mt-8">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="relative w-36 h-36 rounded-full bg-[#8b0000] text-[#ffcccb] font-headings italic text-[20px] shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-300 flex items-center justify-center active:scale-90 border-4 border-[#600000]"
                      title="Seal & Send"
                    >
                      <div className="absolute inset-2 rounded-full border border-[#a03030] pointer-events-none" />
                      {loading ? <Loader2 className="animate-spin" /> : "Send Letter"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-24 flex flex-col items-center justify-center text-center"
                >
                  <p className="font-hero text-4xl md:text-5xl text-ink-900/80 mb-8 transform -rotate-2">
                    "Your letter now rests between my pages."
                  </p>
                  <button 
                    onClick={() => { setSuccess(false); setName(''); setEmail(''); setLetter(''); }}
                    className="font-meta text-xs uppercase tracking-widest text-ink-900/40 hover:text-ink-900 transition-colors"
                  >
                    Write another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
