import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: '🏠 Home' },
  { id: 'countdown', label: '📅 Countdown' },
  { id: 'cake', label: '🎂 Cake' },
  { id: 'reasons', label: '💕 Reasons' },
  { id: 'letter', label: '💌 Letter' },
  { id: 'balloons', label: '🎈 Balloons' },
  { id: 'memories', label: '📸 Memories' },
  { id: 'gift', label: '🎁 Gift' },
  { id: 'stars', label: '✨ Stars' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Close nav when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-panel') && !target.closest('.nav-trigger')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <>
      {/* Floating nav button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="nav-trigger fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center text-xl md:text-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #f472b6, #a78bfa)' }}
      >
        {isOpen ? '✕' : '🎀'}
      </motion.button>

      {/* Nav panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="nav-panel fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 glass-card rounded-2xl p-3 md:p-4 min-w-[170px] md:min-w-[180px] shadow-2xl max-h-[70vh] overflow-y-auto"
          >
            <div className="space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 md:px-4 py-2.5 md:py-2 rounded-xl font-body text-sm transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-rose-100/80 text-rose-600 font-semibold'
                      : 'text-rose-400/70 active:bg-rose-50/50 active:text-rose-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/10 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
