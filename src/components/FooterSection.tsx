import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="relative py-16 px-4 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)' }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-[10%] text-4xl animate-float-slow">💕</div>
        <div className="absolute top-8 right-[15%] text-3xl animate-float" style={{ animationDelay: '1s' }}>🌸</div>
        <div className="absolute bottom-8 left-[20%] text-3xl animate-float" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-4 right-[25%] text-4xl animate-float-slow" style={{ animationDelay: '0.5s' }}>🎀</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-love fill-love animate-pulse" />
          <Heart className="w-8 h-8 text-love fill-love animate-pulse" style={{ animationDelay: '0.2s' }} />
          <Heart className="w-6 h-6 text-love fill-love animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        <p className="font-cursive text-3xl md:text-4xl gradient-text mb-4">
          Happy Birthday, My Love!
        </p>
        <p className="font-body text-rose-400/60 text-sm">
          Made with 💕 just for you — June 21st
        </p>
        <p className="font-body text-rose-300/40 text-xs mt-4">
          Every pixel of this website was crafted with love 🎀
        </p>
      </motion.div>
    </footer>
  );
}