import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #fbcfe8 60%, #ddd6fe 100%)' }}
    >
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pink-200/30 blur-xl" />
      <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-purple-200/30 blur-xl" />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-amber-200/20 blur-xl" />
      
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold-warm" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        className="relative z-10 text-center px-6 md:px-4"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6 border border-white/80"
        >
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gold-warm" />
          <span className="text-xs md:text-sm font-medium text-rose-500 font-body">It's a Special Day!</span>
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gold-warm" />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-cursive text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold gradient-text leading-tight mb-3 md:mb-4"
        >
          Happy Birthday!
        </motion.h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8"
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-love fill-love animate-pulse" />
          <p className="font-cursive text-2xl sm:text-3xl md:text-4xl text-rose-400">
            June 21st
          </p>
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-love fill-love animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="font-body text-base md:text-lg lg:text-xl text-rose-400/80 max-w-sm md:max-w-md mx-auto mb-8 md:mb-10"
        >
          A little corner of the internet, made with all my love, just for you 💕
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs md:text-sm text-rose-300 font-body">Scroll down for surprises</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-300">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z" fill="#fdf2f8" />
        </svg>
      </div>
    </section>
  );
}
