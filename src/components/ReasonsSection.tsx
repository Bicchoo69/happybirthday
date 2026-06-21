import { useState } from 'react';
import { motion } from 'framer-motion';

const REASONS = [
  { emoji: '😊', title: 'Your Smile', message: 'Your smile lights up every room and makes the whole world brighter.' },
  { emoji: '💪', title: 'Your Strength', message: 'The way you face challenges with grace inspires me every single day.' },
  { emoji: '🤗', title: 'Your Warmth', message: 'Being around you feels like the warmest hug on the coldest day.' },
  { emoji: '😂', title: 'Your Laughter', message: 'Your laugh is my favorite sound in the entire universe.' },
  { emoji: '💫', title: 'Your Dreams', message: 'The way you chase your dreams with passion and determination.' },
  { emoji: '💝', title: 'Your Heart', message: 'You have the most beautiful, caring heart I have ever known.' },
  { emoji: '🌸', title: 'Your Kindness', message: 'Your kindness makes the world a softer, gentler place.' },
  { emoji: '🌟', title: 'Just Being You', message: 'Everything about you — perfectly imperfect, and absolutely wonderful.' },
];

export default function ReasonsSection() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section id="reasons" className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fdf2f8 100%)' }}
    >
      <div className="absolute top-10 right-0 w-72 h-72 rounded-full bg-pink-100/40 blur-3xl" />
      <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl\" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl gradient-text mb-3 md:mb-4">
            Reasons I Love You 💕
          </h2>
          <p className="font-body text-sm md:text-base text-rose-400/70">
            Tap each card to discover why you're so special to me
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {REASONS.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flip-card cursor-pointer ${flippedCards.has(index) ? 'flipped' : ''}`}
              onClick={() => toggleFlip(index)}
              style={{ minHeight: '160px' }}
            >
              <div className="flip-card-inner relative w-full h-full">
                <div className="flip-card-front absolute inset-0 glass-card rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3">
                  <span className="text-3xl md:text-4xl">{reason.emoji}</span>
                  <h3 className="font-body font-bold text-rose-500 text-center text-sm md:text-base">{reason.title}</h3>
                  <span className="text-[10px] md:text-xs text-rose-300 font-body">tap to reveal</span>
                </div>
                <div className="flip-card-back absolute inset-0 rounded-2xl p-3 md:p-5 flex flex-col items-center justify-center text-center"
                  style={{ background: 'linear-gradient(135deg, #fce7f3, #ddd6fe)' }}
                >
                  <span className="text-xl md:text-2xl mb-1 md:mb-2">{reason.emoji}</span>
                  <p className="font-body text-xs md:text-sm text-rose-700 leading-relaxed">{reason.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
