import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      if (now.getMonth() === 5 && now.getDate() === 21) {
        setIsBirthday(true);
        return;
      }
      
      let birthday = new Date(currentYear, 5, 21);
      if (now > birthday) {
        birthday = new Date(currentYear + 1, 5, 21);
      }
      
      const diff = birthday.getTime() - now.getTime();
      
      if (diff <= 0) {
        setIsBirthday(true);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-16 md:py-20 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #ddd6fe 100%)' }}
    >
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {isBirthday ? (
            <>
              <h2 className="font-cursive text-4xl md:text-5xl lg:text-7xl gradient-text mb-4 md:mb-6">
                🎉 It's Your Birthday! 🎉
              </h2>
              <p className="font-body text-lg md:text-2xl text-rose-400">
                Today is all about you, my love! 💕
              </p>
            </>
          ) : (
            <>
              <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl gradient-text mb-3 md:mb-4">
                Counting Down 🗓️
              </h2>
              <p className="font-body text-sm md:text-base text-rose-400/70 mb-8 md:mb-10">
                Until your special day — June 21st
              </p>
              <div className="flex justify-center gap-3 md:gap-6">
                {timeUnits.map((unit, i) => (
                  <motion.div
                    key={unit.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-3 md:p-6 min-w-[60px] sm:min-w-[70px] md:min-w-[90px]"
                  >
                    <div className="font-body text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div className="font-body text-[10px] sm:text-xs md:text-sm text-rose-400/60 mt-1">
                      {unit.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
