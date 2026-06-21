import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind } from 'lucide-react';

const CANDLE_COUNT = 5;

export default function CakeSection() {
  const [blownCandles, setBlownCandles] = useState<Set<number>>(new Set());
  const [allBlown, setAllBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const blowCandle = (index: number) => {
    if (blownCandles.has(index)) return;
    const newBlown = new Set(blownCandles);
    newBlown.add(index);
    setBlownCandles(newBlown);
    
    if (newBlown.size === CANDLE_COUNT) {
      setAllBlown(true);
      setTimeout(() => setShowWish(true), 800);
    }
  };

  const blowAll = () => {
    const all = new Set(Array.from({ length: CANDLE_COUNT }, (_, i) => i));
    setBlownCandles(all);
    setAllBlown(true);
    setTimeout(() => setShowWish(true), 800);
  };

  return (
    <section id="cake" className="relative py-16 md:py-24 px-4 bg-cream overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cursive text-4xl md:text-5xl lg:text-6xl gradient-text mb-3 md:mb-4"
        >
          Make a Wish! 🎂
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-sm md:text-base text-rose-400/70 mb-8 md:mb-12"
        >
          Tap each candle to blow it out, or blow them all at once!
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="relative inline-block"
        >
          {/* Candle row */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-0 relative z-10">
            {Array.from({ length: CANDLE_COUNT }, (_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flame */}
                <AnimatePresence>
                  {!blownCandles.has(i) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -20 }}
                      className="cursor-pointer mb-1 p-1"
                      onClick={() => blowCandle(i)}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <div className="relative">
                        <div className="w-3 h-5 sm:w-4 sm:h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 rounded-full animate-pulse"
                          style={{ filter: 'blur(0.5px)' }}
                        />
                        <div className="absolute inset-0 w-3 h-5 sm:w-4 sm:h-6 bg-yellow-200/50 rounded-full blur-sm" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Smoke after blown */}
                <AnimatePresence>
                  {blownCandles.has(i) && (
                    <motion.div
                      initial={{ opacity: 0.8, y: 0 }}
                      animate={{ opacity: 0, y: -30 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                      className="text-gray-300 text-xs"
                    >
                      💨
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Candle stick */}
                <div className="w-1.5 h-7 sm:w-2 sm:h-10 rounded-full"
                  style={{
                    background: i % 2 === 0
                          ? 'linear-gradient(to bottom, #f472b6, #ec4899)'
                          : 'linear-gradient(to bottom, #c4b5fd, #a78bfa)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Cake body — scales down on mobile */}
          <div className="relative scale-[0.7] sm:scale-75 md:scale-90 lg:scale-100 origin-top">
            {/* Top layer */}
            <div className="mx-auto w-64 h-16 rounded-t-2xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
            >
              <div className="absolute bottom-0 left-0 w-full">
                <svg viewBox="0 0 260 20" className="w-full">
                  <path d="M0,0 Q20,20 40,5 Q60,20 80,8 Q100,20 120,3 Q140,18 160,6 Q180,20 200,4 Q220,18 240,7 Q250,15 260,0 L260,0 L0,0 Z" fill="#f472b6" />
                </svg>
              </div>
              <div className="absolute top-2 left-0 w-full flex justify-around">
                {['🍒', '🫐', '🍓', '🫐', '🍒'].map((fruit, i) => (
                  <span key={i} className="text-sm animate-sway" style={{ animationDelay: `${i * 0.3}s` }}>{fruit}</span>
                ))}
              </div>
            </div>
            {/* Bottom layer */}
            <div className="mx-auto w-80 h-20 rounded-b-2xl relative"
              style={{ background: 'linear-gradient(135deg, #f9a8d4, #f472b6)' }}
            >
              <div className="absolute top-0 left-0 w-full">
                <svg viewBox="0 0 320 15" className="w-full">
                  <path d="M0,0 Q25,15 50,5 Q75,15 100,3 Q125,15 150,6 Q175,15 200,4 Q225,15 250,5 Q275,15 300,3 Q310,10 320,0 L320,0 L0,0 Z" fill="#fbbf24" />
                </svg>
              </div>
              <div className="absolute bottom-3 left-0 w-full flex justify-around">
                {['✨', '💕', '✨', '💕', '✨', '💕', '✨'].map((deco, i) => (
                  <span key={i} className="text-xs animate-twinkle" style={{ animationDelay: `${i * 0.4}s` }}>{deco}</span>
                ))}
              </div>
            </div>
            {/* Plate */}
            <div className="mx-auto w-96 h-4 rounded-b-full"
              style={{ background: 'linear-gradient(to bottom, #e5e7eb, #d1d5db)' }}
            />
          </div>
        </motion.div>

        {!allBlown && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={blowAll}
            className="mt-6 md:mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-body font-semibold px-6 md:px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-sm md:text-base"
          >
            <Wind className="w-4 h-4 md:w-5 md:h-5" />
            Blow All Candles!
          </motion.button>
        )}

        <AnimatePresence>
          {showWish && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="mt-8 md:mt-10 glass-card rounded-3xl p-6 md:p-8 max-w-md mx-auto"
            >
              <div className="text-4xl mb-4">🌟</div>
              <p className="font-cursive text-xl md:text-2xl text-rose-500 mb-2">
                Your wish has been made!
              </p>
              <p className="font-body text-sm md:text-base text-rose-400/70">
                May every dream in your heart come true this year. You deserve all the happiness in the world! 💫
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
