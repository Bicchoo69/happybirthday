import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BALLOON_MESSAGES = [
  { color: '#f43f5e', message: 'You make my heart skip a beat! 💓' },
  { color: '#a78bfa', message: 'You are my favorite hello and hardest goodbye 💜' },
  { color: '#fbbf24', message: 'Every day with you is an adventure! ✨' },
  { color: '#34d399', message: 'You are my sunshine on rainy days ☀️' },
  { color: '#60a5fa', message: 'My world is better because of you 🌍' },
  { color: '#fb923c', message: 'You are the missing piece I never knew I needed 🧩' },
  { color: '#f472b6', message: 'Falling for you was the best trip ever 🌸' },
  { color: '#818cf8', message: 'You are my happy place 🏡' },
];

export default function BalloonPopSection() {
  const [poppedBalloons, setPoppedBalloons] = useState<Set<number>>(new Set());
  const [revealedMessages, setRevealedMessages] = useState<number[]>([]);

  const popBalloon = (index: number) => {
    if (poppedBalloons.has(index)) return;
    setPoppedBalloons(prev => new Set(prev).add(index));
    setRevealedMessages(prev => [...prev, index]);
  };

  return (
    <section id="balloons" className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #ede9fe 50%, #fdf2f8 100%)' }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl gradient-text mb-3 md:mb-4">
            Pop the Balloons! 🎈
          </h2>
          <p className="font-body text-sm md:text-base text-rose-400/70">
            Each balloon hides a special message — tap to pop!
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
          {BALLOON_MESSAGES.map((balloon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <AnimatePresence>
                {!poppedBalloons.has(index) ? (
                  <motion.div
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="cursor-pointer"
                    onClick={() => popBalloon(index)}
                    whileTap={{ scale: 0.8 }}
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    style={{
                      transition: 'transform 0.2s',
                    }}
                  >
                    <div
                      className="w-14 h-18 sm:w-16 sm:h-20 md:w-20 md:h-24 rounded-full relative shadow-lg"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${balloon.color}dd, ${balloon.color})`,
                        minHeight: '72px',
                      }}
                    >
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-3 h-4 sm:w-4 sm:h-6 bg-white/40 rounded-full rotate-[-20deg]" />
                      <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3"
                        style={{
                          background: balloon.color,
                          clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                        }}
                      />
                    </div>
                    <div className="balloon-string !h-10 sm:!h-[60px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl md:text-3xl"
                  >
                    💥
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {revealedMessages.length > 0 && (
          <div className="space-y-2 md:space-y-3 max-w-lg mx-auto">
            <AnimatePresence>
              {revealedMessages.map((msgIndex) => (
                <motion.div
                  key={msgIndex}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className="glass-card rounded-2xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3"
                >
                  <div
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full shrink-0"
                    style={{ backgroundColor: BALLOON_MESSAGES[msgIndex].color }}
                  />
                  <p className="font-body text-xs md:text-sm lg:text-base text-rose-700">
                    {BALLOON_MESSAGES[msgIndex].message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {revealedMessages.length === BALLOON_MESSAGES.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-6 md:mt-8"
          >
            <p className="font-cursive text-xl md:text-2xl text-rose-500">
              You've unlocked all the messages! 🎉💕
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
