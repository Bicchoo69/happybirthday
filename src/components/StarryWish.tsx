import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Wish {
  id: number;
  x: number;
  y: number;
  text: string;
}

const WISH_TEXTS = [
  '✨ Wish granted!',
  '🌟 Dreams come true!',
  '💫 Magic in the air!',
  '⭐ Believe in magic!',
  '✦ Something wonderful!',
  '🌠 A wish for you!',
];

function getStarStyle(star: Star): React.CSSProperties {
  return {
    left: star.x + '%',
    top: star.y + '%',
    width: star.size + 'px',
    height: star.size + 'px',
    animation: 'twinkle ' + (2 + star.delay) + 's ease-in-out ' + star.delay + 's infinite',
  };
}

function getWishStyle(wish: Wish): React.CSSProperties {
  return {
    left: Math.min(wish.x, 70) + '%',
    top: wish.y + '%',
  };
}

export default function StarryWish() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }))
  );
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wishCount, setWishCount] = useState(0);

  const handleInteraction = useCallback((clientX: number, clientY: number, container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    const id = Date.now();
    const text = WISH_TEXTS[Math.floor(Math.random() * WISH_TEXTS.length)];

    setWishes(prev => [...prev, { id, x, y, text }]);
    setWishCount(prev => prev + 1);

    setTimeout(() => {
      setWishes(prev => prev.filter(w => w.id !== id));
    }, 3000);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    handleInteraction(e.clientX, e.clientY, e.currentTarget);
  }, [handleInteraction]);

  const handleTouch = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY, e.currentTarget);
    }
  }, [handleInteraction]);

  return (
    <section
      id="stars"
      className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-12 relative z-10"
      >
        <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl text-amber-200 mb-3 md:mb-4">
          Wish Upon a Star ✨
        </h2>
        <p className="font-body text-sm md:text-base text-indigo-200/60">
          Tap anywhere on the night sky to make a wish
        </p>
      </motion.div>

      <div
        className="relative w-full max-w-4xl mx-auto h-64 sm:h-72 md:h-96 rounded-3xl overflow-hidden border border-indigo-500/20 select-none"
        style={{ background: 'radial-gradient(ellipse at center, #1e1b4b 0%, #0f172a 100%)', touchAction: 'manipulation' }}
        onClick={handleClick}
        onTouchStart={handleTouch}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={getStarStyle(star)}
          />
        ))}

        <div
          className="absolute top-6 right-8 md:top-8 md:right-12 w-12 h-12 md:w-16 md:h-16 rounded-full bg-amber-100 shadow-lg shadow-amber-200/20"
          style={{ boxShadow: '0 0 40px rgba(253, 230, 138, 0.3), 0 0 80px rgba(253, 230, 138, 0.1)' }}
        />

        <AnimatePresence>
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -30 }}
              exit={{ opacity: 0, scale: 0.5, y: -60 }}
              transition={{ duration: 1.5 }}
              className="absolute font-cursive text-base md:text-lg text-amber-200 pointer-events-none whitespace-nowrap"
              style={getWishStyle(wish)}
            >
              {wish.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {wishCount > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4 md:mt-6 font-body text-indigo-300/60 text-sm"
        >
          {wishCount} {wishCount === 1 ? 'wish' : 'wishes'} made ✨
        </motion.p>
      )}
    </section>
  );
}
