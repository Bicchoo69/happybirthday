import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import CakeSection from './components/CakeSection';
import ReasonsSection from './components/ReasonsSection';
import LoveLetterSection from './components/LoveLetterSection';
import BalloonPopSection from './components/BalloonPopSection';
import MemoryGallery from './components/MemoryGallery';
import GiftUnwrap from './components/GiftUnwrap';
import StarryWish from './components/StarryWish';
import ShareSection from './components/ShareSection';
import FooterSection from './components/FooterSection';
import Navigation from './components/Navigation';
import FloatingHearts from './components/FloatingHearts';
import Confetti from './components/Confetti';

export default function App() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-cream">
      {showConfetti && <Confetti />}
      <FloatingHearts />
      <Navigation />
      <HeroSection />
      <CountdownSection />
      <CakeSection />
      <ReasonsSection />
      <LoveLetterSection />
      <BalloonPopSection />
      <MemoryGallery />
      <GiftUnwrap />
      <StarryWish />
      <ShareSection />
      <FooterSection />
    </div>
  );
}
