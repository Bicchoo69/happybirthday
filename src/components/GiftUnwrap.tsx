import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';

export default function GiftUnwrap() {
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  return (
    <section id="gift" className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #fef3c7 50%, #fdf2f8 100%)' }}
    >
      <div className="absolute top-10 left-0 w-72 h-72 rounded-full bg-amber-100/30 blur-3xl" />
      <div className="absolute bottom-10 right-0 w-72 h-72 rounded-full bg-pink-100/30 blur-3xl" />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl gradient-text mb-3 md:mb-4">
            A Special Gift 🎁
          </h2>
          <p className="font-body text-sm md:text-base text-rose-400/70">
            Something special is waiting for you inside!
          </p>
        </motion.div>

        {!isUnwrapped ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.button
              onClick={() => setIsUnwrapped(true)}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer group"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-40 h-32 sm:w-48 sm:h-40 rounded-xl relative shadow-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #f472b6, #ec4899)' }}
              >
                <div className="absolute top-1/2 left-0 w-full h-5 sm:h-6 -translate-y-1/2 bg-gold-warm" />
                <div className="absolute top-0 left-1/2 w-5 sm:w-6 h-full -translate-x-1/2 bg-gold-warm" />
                <div className="absolute top-[-16px] sm:top-[-20px] left-1/2 -translate-x-1/2">
                  <div className="flex gap-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-3 sm:border-4 border-gold-warm"
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        transform: 'rotate(-30deg)',
                      }}
                    />
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-3 sm:border-4 border-gold-warm"
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        transform: 'rotate(30deg)',
                      }}
                    />
                  </div>
                </div>
                <div className="absolute top-3 left-3 text-white/40 text-sm sm:text-lg animate-twinkle">✦</div>
                <div className="absolute top-6 right-5 text-white/40 text-xs sm:text-sm animate-twinkle" style={{ animationDelay: '0.5s' }}>✦</div>
                <div className="absolute bottom-5 left-6 text-white/40 text-xs sm:text-sm animate-twinkle" style={{ animationDelay: '1s' }}>✦</div>
              </div>
              <p className="mt-4 md:mt-6 font-cursive text-lg md:text-xl text-rose-400 group-hover:text-rose-500 transition-colors">
                Tap to unwrap! 🎁
              </p>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          >
            <div className="glass-card rounded-3xl p-6 md:p-8 lg:p-12 max-w-lg mx-auto">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.6 }}
              >
                <img
                  src="/images/gift-art.png"
                  alt="Gift"
                  className="w-28 h-28 sm:w-40 sm:h-40 mx-auto mb-4 md:mb-6 object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-cursive text-2xl md:text-3xl text-rose-500 mb-3 md:mb-4">
                  My Promise To You 🌹
                </h3>
                <p className="font-body text-sm md:text-base text-rose-700/80 leading-relaxed mb-3 md:mb-4">
                  This isn't just a birthday gift — it's a promise. A promise that I'll always be there to make you laugh on tough days, to hold your hand through every challenge, and to celebrate every little victory with you.
                </p>
                <p className="font-body text-sm md:text-base text-rose-700/80 leading-relaxed mb-3 md:mb-4">
                  My greatest gift is having you in my life, and I promise to cherish every moment we share together.
                </p>
                <div className="flex items-center justify-center gap-2 mt-4 md:mt-6">
                  <Gift className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
                  <span className="font-cursive text-base md:text-xl text-rose-400">With all my love, forever & always</span>
                  <Gift className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
