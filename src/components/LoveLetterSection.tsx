import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail } from 'lucide-react';

const LETTER_LINES = [
  "My Dearest,",
  "",
  "On this beautiful day, I want you to know",
  "how incredibly special you are to me.",
  "",
  "Every moment with you feels like a gift,",
  "and I'm so grateful that life brought us together.",
  "",
  "You make ordinary days extraordinary,",
  "and you turn simple moments into memories",
  "I'll treasure forever.",
  "",
  "Happy Birthday, my love.",
  "Here's to many more years of laughter,",
  "adventures, and love — together.",
  "",
  "Forever yours,",
  "With all my heart"
];

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isOpen) return;
    if (displayedLines >= LETTER_LINES.length) return;
    
    const timer = setTimeout(() => {
      setDisplayedLines(prev => prev + 1);
    }, LETTER_LINES[displayedLines] === '' ? 300 : 80);
    
    return () => clearTimeout(timer);
  }, [isOpen, displayedLines]);

  return (
    <section id="letter" ref={ref} className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #fef3c7 50%, #fdf2f8 100%)' }}
    >
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-100/30 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-pink-100/30 blur-3xl" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl gradient-text mb-3 md:mb-4">
            A Letter For You 💌
          </h2>
        </motion.div>

        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
            >
              <div className="w-52 sm:w-64 h-36 sm:h-44 rounded-lg relative overflow-hidden shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #fecdd3, #fda4af)' }}
              >
                <div className="absolute top-0 left-0 w-full h-1/2"
                  style={{
                    background: 'linear-gradient(135deg, #fb7185, #f43f5e)',
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-rose-500" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-6 right-6 space-y-2">
                  <div className="h-1 bg-white/30 rounded" />
                  <div className="h-1 bg-white/30 rounded w-3/4" />
                  <div className="h-1 bg-white/30 rounded w-1/2" />
                </div>
              </div>
              <p className="mt-3 md:mt-4 font-cursive text-lg md:text-xl text-rose-400 group-hover:text-rose-500 transition-colors">
                Tap to open 💌
              </p>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-5 md:p-8 lg:p-12 shadow-xl"
          >
            <div className="bg-white/50 rounded-2xl p-4 md:p-6 lg:p-8 border border-rose-100">
              {LETTER_LINES.slice(0, displayedLines).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`font-body ${
                    line === '' ? 'h-3 md:h-4' :
                    i === 0 ? 'font-cursive text-xl md:text-2xl text-rose-500 mb-2' :
                    i === LETTER_LINES.length - 1 ? 'font-cursive text-lg md:text-xl text-rose-500 mt-2' :
                    i === LETTER_LINES.length - 2 ? 'font-cursive text-lg md:text-xl text-rose-500' :
                    'text-sm md:text-base text-rose-700/80 leading-relaxed'
                  }`}
                >
                  {line}
                </motion.p>
              ))}
              {displayedLines < LETTER_LINES.length && (
                <span className="typewriter-cursor" />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
