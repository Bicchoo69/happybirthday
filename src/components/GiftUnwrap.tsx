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
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer group"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[2rem] shadow-[0_28px_80px_-40px_rgba(236,72,153,0.8)] overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #db2777, #ec4899)' }}
              >
                <div className="absolute inset-x-12 top-12 h-12 rounded-full bg-white/80 shadow-inner transform rotate-12" />
                <div className="absolute inset-y-12 left-12 w-12 rounded-full bg-white/80 shadow-inner transform -rotate-12" />
                <div className="absolute inset-0 before:absolute before:inset-0 before:bg-white/10 before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.55),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.25),transparent_20%)]" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white/75 bg-white/10 shadow-lg" />
                <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-10 h-16 rounded-full bg-white/90 shadow-lg" />
                  <div className="w-10 h-16 rounded-full bg-white/90 shadow-lg" />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-white/20 blur-2xl opacity-60" />
              </div>
              <p className="mt-6 font-cursive text-xl md:text-2xl text-white/90 group-hover:text-white transition-colors">
                Tap to unwrap the gift! 🎁
              </p>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          >
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-[2rem] bg-pink-50/90 blur-3xl" />
              <div className="relative rounded-[2rem] p-8 md:p-10 bg-white/95 shadow-2xl shadow-pink-300/30 border border-white/80 overflow-hidden">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-rose-100/80 blur-3xl" />
                <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-amber-100/80 blur-2xl" />
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-28 h-28 rounded-full bg-rose-100 shadow-inner shadow-rose-200/60 flex items-center justify-center">
                    <Gift className="w-14 h-14 text-rose-500" />
                    <div className="absolute inset-0 rounded-full border border-white/70" />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className="font-cursive text-3xl md:text-4xl text-rose-500 mb-4">
                    A Special Surprise 🌹
                  </h3>
                  <p className="font-body text-sm md:text-base text-rose-700/85 leading-relaxed mb-4">
                    This gift is a promise from the heart — a note of love for every smile, every hug, and every moment we share.
                  </p>
                  <p className="font-body text-sm md:text-base text-rose-700/85 leading-relaxed mb-6">
                    Open your heart, feel the warmth, and know that you are my favorite part of every day.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-rose-600 shadow-sm">
                      <Gift className="w-4 h-4" />
                      With love
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-rose-600 shadow-sm">
                      <span>Forever</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
