import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ImagePlus, Heart, Upload, RefreshCw } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
//
//  📸  HOW TO ADD YOUR OWN PHOTOS — 3 EASY WAYS!
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
//  ✅ WAY 1: PUT PHOTOS IN THE PROJECT FOLDER (best for permanent photos)
//
//     1. Copy your photos into the  public/images/  folder
//        (next to the existing .jpg files)
//
//     2. Edit the list below — change 'src' to match your filename
//        and 'caption' to whatever you want it to say:
//
//        { src: '/images/your-photo.jpg', caption: 'Our First Date 💕' }
//
//     Example — if you added photo1.jpg and photo2.png:
//
//        const INITIAL_MEMORIES = [
//          { src: '/images/photo1.jpg', caption: 'Our First Date 💕' },
//          { src: '/images/photo2.png', caption: 'Beach Day!' },
//        ];
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
//  ✅ WAY 2: USE ONLINE IMAGE URLs (no file upload needed!)
//
//     Upload photos to Imgur, Google Drive, etc. and paste the direct URL:
//
//     { src: 'https://i.imgur.com/abc123.jpg', caption: 'Our Trip!' }
//
//     For Google Drive, use this format:
//     https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
//  ✅ WAY 3: UPLOAD DIRECTLY ON THE WEBSITE (easiest, no coding!)
//
//     When viewing the website:
//     • Click "+ Add a Memory" to create a new empty card
//     • Click the empty card to upload a photo from your phone/computer
//     • Click any existing photo to REPLACE it with a new one
//     • Tap the ✕ to remove a card
//     • Type captions directly on the cards
//     • Photos are saved in your browser (persist across refreshes!)
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
//  💡 TIPS:
//     • Supported formats: .jpg, .png, .webp, .gif
//     • Landscape photos (wider than tall) look best
//     • Captions are optional — use '' for no caption
//     • Add as many memories as you want!
//     • Drag & drop also works on the upload area!
//
// ═══════════════════════════════════════════════════════════════════════════════

const INITIAL_MEMORIES = [
  // ╔══════════════════════════════════════════════════════════════╗
  // ║  YOUR PHOTOS GO HERE!                                        ║
  // ║                                                              ║
  // ║  TO ADD PHOTOS PERMANENTLY (visible to everyone):            ║
  // ║                                                              ║
  // ║  1. Name your photos like: photo1.jpg, photo2.png etc.       ║
  // ║  2. Tell the AI builder: "Add photo1.jpg, photo2.jpg..."     ║
  // ║  3. The AI will place them in public/images/ for you         ║
  // ║                                                              ║
  // ║  FORMAT: { src: '/images/FILENAME.jpg', caption: 'TEXT' }    ║
  // ║                                                              ║
  // ║  OR USE ONLINE URLs:                                         ║
  // ║  { src: 'https://i.imgur.com/abc.jpg', caption: 'Our Trip' } ║
  // ║                                                              ║
  // ║  OR JUST UPLOAD ON THE WEBSITE — no coding needed!           ║
  // ╚══════════════════════════════════════════════════════════════╝

  // 👇 Example with local files (put photos in public/images/):
  // { src: '/images/photo1.jpg', caption: 'Our First Date 💕' },
  // { src: '/images/photo2.jpg', caption: 'Beach Day!' },
  // { src: '/images/photo3.jpg', caption: 'Our Favorite Selfie' },
  // { src: '/images/photo4.jpg', caption: 'Date Night 🍷' },

  // 👇 Example with online URLs:
  // { src: 'https://i.imgur.com/abc123.jpg', caption: 'Our Trip!' },

  // 👇 Current: Default memories from public/images/
  { src: '/images/IMG-20260130-WA0007.jpg', caption: 'Sweet Moments' },
  { src: '/images/IMG-20260224-WA0010.jpg', caption: 'Joyful Laughs' },
  { src: '/images/IMG-20260225-WA0049.jpg', caption: 'Our Adventure' },
  { src: '/images/IMG-20260408-WA0022.jpg', caption: 'Happy Days' },
  { src: '/images/IMG-20260409-WA0153.jpg', caption: 'Special Times' },
  { src: '/images/IMG-20260409-WA0178.jpg', caption: 'Memories Forever' },
];

// ═══════════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'birthday-memories';

interface Memory {
  id: string;
  src: string;
  caption: string;
  rotation: number;
  isUserUploaded?: boolean;
}

function generateRotation() {
  const rotations = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  return rotations[Math.floor(Math.random() * rotations.length)];
}

function generateId() {
  return 'memory-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
}

function loadSavedMemories(): Memory[] {
  // Check if user has saved memories in localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  // Default: use the INITIAL_MEMORIES from code
  return INITIAL_MEMORIES.map((m, i) => ({
    ...m,
    id: 'initial-' + i,
    rotation: [-3, 2, -1, 3, -2, 1][i % 6],
  }));
}

function saveMemories(memories: Memory[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  } catch {
    // localStorage might be full with large images
    // Try saving without the base64 data to at least preserve structure
    try {
      const lite = memories.map(m => ({
        ...m,
        src: m.isUserUploaded ? '' : m.src,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lite));
    } catch {
      // give up
    }
  }
}

export default function MemoryGallery() {
  const [memories, setMemories] = useState<Memory[]>(loadSavedMemories);
  const [lightboxImage, setLightboxImage] = useState<Memory | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingUploadId, setPendingUploadId] = useState<string | null>(null);

  // Persist memories to localStorage whenever they change
  useEffect(() => {
    saveMemories(memories);
  }, [memories]);

  const triggerUpload = (id: string) => {
    setPendingUploadId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pendingUploadId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setMemories(prev =>
        prev.map(m =>
          m.id === pendingUploadId
            ? { ...m, src: dataUrl, isUserUploaded: true, caption: m.caption || 'Our Memory 💕' }
            : m
        )
      );
      setPendingUploadId(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDragOverId(null);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setMemories(prev =>
        prev.map(m =>
          m.id === id
            ? { ...m, src: dataUrl, isUserUploaded: true, caption: m.caption || 'Our Memory 💕' }
            : m
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const addNewCard = () => {
    const newMemory: Memory = {
      id: generateId(),
      src: '',
      caption: '',
      rotation: generateRotation(),
    };
    setMemories(prev => [...prev, newMemory]);
  };

  const removeCard = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  const updateCaption = (id: string, caption: string) => {
    setMemories(prev =>
      prev.map(m => (m.id === id ? { ...m, caption } : m))
    );
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMemories(
      INITIAL_MEMORIES.map((m, i) => ({
        ...m,
        id: 'initial-' + i,
        rotation: [-3, 2, -1, 3, -2, 1][i % 6],
      }))
    );
  };

  return (
    <section id="memories" className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fdf2f8 100%)' }}
    >
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-pink-100/30 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-purple-100/30 blur-3xl" />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl gradient-text mb-3 md:mb-4">
            Our Memories 📸
          </h2>
          <p className="font-body text-sm md:text-base text-rose-400/70 mb-6">
            Every picture tells our story
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addNewCard}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-body font-semibold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer text-sm"
            >
              <Plus className="w-4 h-4" />
              Add a Memory
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetToDefaults}
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-rose-200 text-rose-400 font-body font-medium px-5 py-2.5 rounded-full hover:bg-white/80 transition-all cursor-pointer text-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ delay: index * 0.06 }}
              >
                <div
                  className="polaroid relative group"
                  style={{ transform: 'rotate(' + memory.rotation + 'deg)' }}
                  onDragOver={(e) => { e.preventDefault(); setDragOverId(memory.id); }}
                  onDragLeave={() => setDragOverId(null)}
                  onDrop={(e) => handleDrop(e, memory.id)}
                >
                  {/* Delete button — always visible on mobile, hover on desktop */}
                  <button
                    onClick={() => removeCard(memory.id)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg z-20 cursor-pointer hover:bg-rose-600 active:scale-90 transition-all md:opacity-0 md:group-hover:opacity-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {memory.src ? (
                    /* Photo card */
                    <div
                      className="relative overflow-hidden rounded-sm cursor-pointer"
                      onClick={() => triggerUpload(memory.id)}
                    >
                      <img
                        src={memory.src}
                        alt={memory.caption}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Replace overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                          <Upload className="w-3 h-3 text-rose-500" />
                          <span className="text-xs font-body font-medium text-rose-500">Replace photo</span>
                        </div>
                      </div>
                      {/* Tap hint on mobile */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 md:opacity-0 flex items-end justify-center pb-2 md:hidden">
                        <span className="text-white/70 text-[10px] font-body">tap to replace</span>
                      </div>
                      {/* User uploaded badge */}
                      {memory.isUserUploaded && (
                        <div className="absolute top-1.5 left-1.5 bg-white/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 text-[10px] font-body text-rose-500">
                          📷
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Empty upload card */
                    <button
                      onClick={() => triggerUpload(memory.id)}
                      className={'w-full h-32 sm:h-40 md:h-48 rounded-sm border-2 border-dashed flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all cursor-pointer ' + (dragOverId === memory.id ? 'border-rose-400 bg-rose-100/50' : 'border-rose-200 bg-rose-50/50 hover:border-rose-400 hover:bg-rose-50')}
                    >
                      <div className={'w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-colors ' + (dragOverId === memory.id ? 'bg-rose-200' : 'bg-rose-100')}>
                        <ImagePlus className="w-5 h-5 sm:w-7 sm:h-7 text-rose-400" />
                      </div>
                      <div className="text-center">
                        <p className="font-body text-xs sm:text-sm font-semibold text-rose-400">
                          {dragOverId === memory.id ? 'Drop here!' : 'Add Your Photo'}
                        </p>
                        <p className="font-body text-[10px] sm:text-xs text-rose-300">tap or drag & drop</p>
                      </div>
                    </button>
                  )}

                  {/* Caption */}
                  {(memory.isUserUploaded || !memory.src) ? (
                    <input
                      type="text"
                      value={memory.caption}
                      onChange={(e) => updateCaption(memory.id, e.target.value)}
                      placeholder="Add a caption..."
                      className="w-full text-center font-cursive text-sm sm:text-lg text-rose-500 mt-2 sm:mt-3 bg-transparent border-b border-rose-100 focus:border-rose-300 outline-none placeholder:text-rose-200 pb-1"
                    />
                  ) : (
                    <p className="font-cursive text-sm sm:text-lg text-rose-500 text-center mt-2 sm:mt-3">
                      {memory.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Hint text */}
        {memories.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6 md:mt-8 font-body text-xs text-rose-300/60"
          >
            💡 Tap a photo to replace it • Tap ✕ to remove • Drag & drop also works!
          </motion.p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="relative max-w-3xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform z-10"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
              </button>
              <img
                src={lightboxImage.src}
                alt={lightboxImage.caption}
                className="max-w-full max-h-[75vh] md:max-h-[80vh] rounded-2xl shadow-2xl object-contain"
              />
              {lightboxImage.caption && (
                <p className="font-cursive text-lg md:text-2xl text-white text-center mt-3 md:mt-4 drop-shadow-lg">
                  {lightboxImage.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
