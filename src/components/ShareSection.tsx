import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, QrCode, MessageCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function ShareSection() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [siteUrl, setSiteUrl] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSiteUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = siteUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Happy Birthday! 🎂💕',
          text: 'A special birthday surprise, just for you! 💕',
          url: siteUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      copyLink();
    }
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`A special birthday surprise, just for you! 💕\n${siteUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section id="share" ref={sectionRef} className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #312e81 0%, #1e1b4b 50%, #0f172a 100%)' }}
    >
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 60" fill="none">
          <path d="M0,60 C360,0 720,60 1080,20 C1260,5 1380,40 1440,60 L0,60 Z" fill="#312e81" />
        </svg>
      </div>

      <div className="max-w-lg mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-cursive text-4xl md:text-5xl text-amber-200 mb-3">
            Share the Love 💝
          </h2>
          <p className="font-body text-sm md:text-base text-indigo-200/60 mb-8 md:mb-10">
            Send this birthday surprise to make her day extra special
          </p>

          {/* Share buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8">
            {/* Native share / Copy link */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareNative}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-body font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer text-sm md:text-base"
            >
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              Share Link
            </motion.button>

            {/* Copy link */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all cursor-pointer text-sm md:text-base"
            >
              {copied ? <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400" /> : <Copy className="w-4 h-4 md:w-5 md:h-5" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </motion.button>

            {/* WhatsApp */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-500 text-white font-body font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-green-600 transition-all cursor-pointer text-sm md:text-base"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              WhatsApp
            </motion.button>
          </div>

          {/* QR Code toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQR(!showQR)}
            className="inline-flex items-center gap-2 text-indigo-300/60 font-body text-sm hover:text-indigo-200 transition-colors cursor-pointer mb-6"
          >
            <QrCode className="w-4 h-4" />
            {showQR ? 'Hide QR Code' : 'Show QR Code'}
          </motion.button>

          {/* QR Code */}
          {showQR && siteUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="inline-block"
            >
              <div className="bg-white rounded-3xl p-6 shadow-2xl">
                <QRCodeSVG
                  value={siteUrl}
                  size={180}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#1e1b4b"
                  imageSettings={{
                    src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB5PSI4MCIgZm9udC1zaXplPSI4MCI+💕PC90ZXh0Pjwvc3ZnPg==",
                    height: 30,
                    width: 30,
                    excavate: true,
                  }}
                />
                <p className="font-body text-xs text-indigo-400/60 mt-3">
                  Scan with phone camera
                </p>
              </div>
            </motion.div>
          )}

          {/* URL display */}
          <div className="mt-6 px-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2 max-w-sm mx-auto">
              <span className="text-xs md:text-sm text-indigo-300/50 font-body truncate flex-1 text-left">
                {siteUrl}
              </span>
            </div>
          </div>

          {/* Tip */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 font-body text-xs text-indigo-300/40 max-w-xs mx-auto"
          >
            💡 Tip: Send this link to her on June 21st for the best surprise! Works beautifully on phones 📱
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
