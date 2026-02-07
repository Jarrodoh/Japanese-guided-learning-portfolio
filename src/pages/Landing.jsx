import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Languages, 
  Globe2, 
  MessageSquare, 
  FolderOpen,
  X,
  Sparkles,
  ClipboardList
} from 'lucide-react';

// Menu items with colors for folder tabs - based on E-Portfolio Checklist
const menuItems = [
  { path: '/intro', label: 'Introduction', icon: User, description: 'About me & my GL project', delay: 0.1, color: '#C6796F' },
  { path: '/culture', label: 'Content/Culture', icon: Globe2, description: 'Progress, deliverables & resources', delay: 0.15, color: '#83B764' },
  { path: '/contract', label: 'My Learning Contract', icon: ClipboardList, description: 'Proposal & contract', delay: 0.2, color: '#CD9D6A' },
  { path: '/reflection', label: 'Reflection', icon: MessageSquare, description: 'Learning logs & reflections', delay: 0.25, color: '#77C099' },
];

// Twinkling stars component - Rolls Royce ceiling style
function TwinklingStars() {
  const [stars] = useState(() => 
    [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      brightness: 0.3 + Math.random() * 0.7,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: `rgba(255, 255, 255, ${star.brightness})`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness * 0.5})`,
          }}
          animate={{
            opacity: [0.2, star.brightness, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Champagne bubbles effect
function ChampagneSplash({ isActive }) {
  const [bubbles] = useState(() =>
    [...Array(30)].map((_, i) => ({
      id: i,
      x: -15 + Math.random() * 30,
      delay: Math.random() * 0.3,
      size: 4 + Math.random() * 8,
      duration: 0.8 + Math.random() * 0.5,
    }))
  );

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Main champagne spray */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                className="absolute rounded-full"
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.6) 100%)',
                  boxShadow: '0 0 10px rgba(251,191,36,0.5)',
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  scale: 0
                }}
                animate={{ 
                  x: bubble.x * 5,
                  y: -150 - Math.random() * 100,
                  opacity: [1, 1, 0],
                  scale: [0, 1.5, 0.5]
                }}
                transition={{
                  duration: bubble.duration,
                  delay: bubble.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
          {/* Spray mist */}
          <motion.div
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 2] }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)',
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

// Hand-drawn style wine bottle SVG
function WineBottle({ onClick, isHovered, setIsHovered }) {
  return (
    <motion.div
      className="cursor-pointer relative"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-3xl"
        animate={{
          opacity: isHovered ? 0.8 : 0.4,
          scale: isHovered ? 1.3 : 1,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.6) 0%, rgba(239,68,68,0.4) 50%, transparent 70%)',
        }}
      />
      
      {/* Wine bottle SVG - hand-drawn style */}
      <motion.svg
        width="200"
        height="350"
        viewBox="0 0 180 320"
        className="relative z-10"
        animate={{ 
          rotate: isHovered ? 5 : -3,
          y: [0, -10, 0],
        }}
        transition={{
          rotate: { duration: 0.3 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Bottle body - hand-drawn style with slight imperfections */}
        <path
          d="M70 280 
             C70 300, 110 300, 110 280
             L115 120
             C115 100, 105 90, 105 70
             L105 40
             C105 30, 95 25, 90 25
             C85 25, 75 30, 75 40
             L75 70
             C75 90, 65 100, 65 120
             Z"
          fill="url(#bottleGradient)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.6))' }}
        />
        
        {/* Bottle neck */}
        <path
          d="M78 40 L78 20 C78 10, 102 10, 102 20 L102 40"
          fill="url(#neckGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
        />
        
        {/* Cork */}
        <rect
          x="80"
          y="5"
          width="20"
          height="18"
          rx="3"
          fill="#8B7355"
          stroke="rgba(255,255,255,0.1)"
        />
        <line x1="84" y1="8" x2="84" y2="20" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        <line x1="90" y1="8" x2="90" y2="20" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        <line x1="96" y1="8" x2="96" y2="20" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        
        {/* Wine level */}
        <path
          d="M72 270
             C72 285, 108 285, 108 270
             L112 140
             C80 145, 80 145, 68 140
             Z"
          fill="url(#wineGradient)"
          opacity="0.9"
        />
        
        {/* Label */}
        <rect
          x="68"
          y="160"
          width="44"
          height="70"
          rx="4"
          fill="rgba(255,248,240,0.95)"
          stroke="rgba(180,150,100,0.5)"
          strokeWidth="1"
        />
        
        {/* Label text */}
        <text x="90" y="185" textAnchor="middle" fill="#2D1810" fontSize="8" fontWeight="bold" fontFamily="serif">
          JARROD
        </text>
        <text x="90" y="198" textAnchor="middle" fill="#5D4030" fontSize="6" fontFamily="serif">
          GL Portfolio
        </text>
        <text x="90" y="215" textAnchor="middle" fill="#8B7355" fontSize="5" fontFamily="serif">
          2026
        </text>
        
        {/* Decorative grape cluster on label */}
        <circle cx="82" cy="205" r="3" fill="#722F37" opacity="0.7" />
        <circle cx="88" cy="208" r="3" fill="#722F37" opacity="0.7" />
        <circle cx="94" cy="205" r="3" fill="#722F37" opacity="0.7" />
        <circle cx="85" cy="212" r="2.5" fill="#722F37" opacity="0.6" />
        <circle cx="91" cy="212" r="2.5" fill="#722F37" opacity="0.6" />
        
        {/* Shine/reflection */}
        <path
          d="M75 130 Q73 200, 76 260"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a472a" />
            <stop offset="30%" stopColor="#2d5a3f" />
            <stop offset="70%" stopColor="#1a472a" />
            <stop offset="100%" stopColor="#0d2818" />
          </linearGradient>
          <linearGradient id="neckGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a472a" />
            <stop offset="50%" stopColor="#2d5a3f" />
            <stop offset="100%" stopColor="#1a472a" />
          </linearGradient>
          <linearGradient id="wineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#722F37" />
            <stop offset="50%" stopColor="#4a1c23" />
            <stop offset="100%" stopColor="#2d1015" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Click prompt */}
      <motion.div
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-amber-200/80 text-lg font-medium tracking-wider">
          {isHovered ? '🍾 SHAKE IT!' : 'TAP THE BOTTLE'}
        </p>
      </motion.div>
    </motion.div>
  );
}

// Card suits for playing card style
const cardSuits = ['♠', '♥', '♦', '♣', '♠', '♥'];
const cardValues = ['2', 'A', '7', 'J', 'Q', 'K'];

// Pixel-art style playing card - Uno style with overlap and float
function PlayingCard({ item, index, isSelected, onClick, isHovered, onHover }) {
  const suit = cardSuits[index];
  const value = cardValues[index];
  const isRed = suit === '♥' || suit === '♦';
  
  return (
    <motion.button
      className="relative cursor-pointer flex flex-col items-center"
      style={{ 
        marginLeft: index === 0 ? 0 : '-40px',
        zIndex: isHovered ? 100 : isSelected ? 50 : 10 + index,
      }}
      initial={{ y: 100, opacity: 0, rotateY: 180 }}
      animate={{ 
        y: isHovered ? -60 : isSelected ? -20 : 0, 
        opacity: 1, 
        rotateY: 0,
        scale: isHovered ? 1.15 : isSelected ? 1.05 : 1,
        rotate: isHovered ? 0 : 0,
      }}
      exit={{ y: 100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.15 + index * 0.06,
      }}
      onClick={onClick}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(-1)}
    >
      {/* Label ABOVE card */}
      <motion.div 
        className="text-center mb-2"
        animate={{ 
          opacity: isHovered ? 1 : isSelected ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.2 }}
      >
        <p 
          className={`text-lg md:text-2xl font-bold tracking-wide whitespace-nowrap ${
            isHovered ? 'text-amber-300' : isSelected ? 'text-amber-400' : 'text-white/90'
          }`}
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {item.label}
        </p>
      </motion.div>

      {/* Card container - BIGGER */}
      <motion.div 
        className={`relative w-36 h-52 md:w-44 md:h-64 lg:w-48 lg:h-72 rounded-xl flex flex-col p-3 md:p-4 ${
          isHovered 
            ? 'ring-4 ring-amber-300' 
            : isSelected 
              ? 'ring-3 ring-amber-400' 
              : ''
        }`}
        style={{
          background: '#FFFEF7',
          boxShadow: isHovered 
            ? '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(251,191,36,0.4)' 
            : isSelected
              ? '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(251,191,36,0.2)'
              : '0 10px 25px rgba(0,0,0,0.4)',
          border: '3px solid #e5e5e5',
        }}
        animate={{
          rotateZ: isHovered ? 0 : (index % 2 === 0 ? -2 : 2),
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Top left corner */}
        <div className={`flex flex-col items-start leading-none ${
          isRed ? 'text-red-600' : 'text-gray-900'
        }`}>
          <span 
            className="text-2xl md:text-4xl font-black" 
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {value}
          </span>
          <span className="text-xl md:text-2xl -mt-1">
            {suit}
          </span>
        </div>

        {/* Center suit - large */}
        <div className="flex-1 flex items-center justify-center">
          <span className={`text-6xl md:text-8xl ${
            isRed ? 'text-red-600' : 'text-gray-900'
          }`}>
            {suit}
          </span>
        </div>

        {/* Bottom right corner (rotated) */}
        <div className={`flex flex-col items-start leading-none rotate-180 self-end ${
          isRed ? 'text-red-600' : 'text-gray-900'
        }`}>
          <span 
            className="text-2xl md:text-4xl font-black" 
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {value}
          </span>
          <span className="text-xl md:text-2xl -mt-1">
            {suit}
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
}

// Card deck (face down) - bigger to match
function CardDeck() {
  return (
    <div className="relative w-36 h-52 md:w-44 md:h-64 lg:w-48 lg:h-72 mr-4">
      {/* Stack of cards */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-xl"
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
            border: '3px solid #3b82f6',
            top: -i * 2,
            left: -i * 1,
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Checkered pattern */}
          <div className="absolute inset-2 rounded" style={{
            backgroundImage: `
              linear-gradient(45deg, #3b82f6 25%, transparent 25%),
              linear-gradient(-45deg, #3b82f6 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #3b82f6 75%),
              linear-gradient(-45deg, transparent 75%, #3b82f6 75%)
            `,
            backgroundSize: '12px 12px',
            backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
            opacity: 0.5,
          }} />
        </div>
      ))}
    </div>
  );
}

// Card game menu with keyboard navigation
function CardGameMenu({ isOpen, onClose, onNavigate }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      } else if (e.key === 'Enter') {
        onNavigate(menuItems[selectedIndex].path);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, onNavigate, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark green felt background */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              background: 'linear-gradient(180deg, #2d5a3d 0%, #1a3d2a 50%, #0f2418 100%)',
            }}
          />

          {/* Menu container */}
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              onClick={onClose}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ rotate: 90 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Title */}
            <motion.div
              className="text-center mb-6 md:mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                Pick Your Card
              </h2>
              <p className="text-green-200/70 text-sm">
                Hover to preview • Use ← → arrow keys or click to select
              </p>
            </motion.div>

            {/* Cards row with deck - overlapping Uno style */}
            <div className="flex items-end justify-center px-4">
              {/* Card deck on left */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mr-8"
              >
                <CardDeck />
              </motion.div>

              {/* Dealt cards - overlapping */}
              {menuItems.map((item, index) => (
                <PlayingCard
                  key={item.path}
                  item={item}
                  index={index}
                  isSelected={selectedIndex === index}
                  isHovered={hoveredIndex === index}
                  onHover={setHoveredIndex}
                  onClick={() => {
                    setSelectedIndex(index);
                    onNavigate(item.path);
                  }}
                />
              ))}
            </div>

            {/* Navigation hint - centered */}
            <motion.div
              className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2 text-white/60">
                <kbd className="px-3 py-1.5 bg-white/10 rounded-lg text-sm font-mono">←</kbd>
                <span className="text-xs">Previous</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <kbd className="px-3 py-1.5 bg-white/10 rounded-lg text-sm font-mono">→</kbd>
                <span className="text-xs">Next</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <kbd className="px-3 py-1.5 bg-white/10 rounded-lg text-sm font-mono">Enter</kbd>
                <span className="text-xs">Select</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBottleHovered, setIsBottleHovered] = useState(false);
  const navigate = useNavigate();

  const handleBottleClick = () => {
    setIsMenuOpen(true);
  };

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    setTimeout(() => navigate(path), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Twinkling stars - Rolls Royce ceiling effect */}
      <TwinklingStars />

      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Warm ambient lights */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ea580c 50%, #dc2626 75%, #9333ea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Jarrod Oh
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Guided Learning E-Portfolio
          </motion.p>
          <motion.p
            className="text-amber-500/70 text-sm mt-2 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Japanese Language & Nightlife Culture
          </motion.p>
        </motion.div>

        {/* Wine bottle */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <WineBottle
            onClick={handleBottleClick}
            isHovered={isBottleHovered}
            setIsHovered={setIsBottleHovered}
          />
        </motion.div>

        {/* Footer hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-600 text-xs tracking-wider">
            Temasek Polytechnic • 2026
          </p>
        </motion.div>
      </div>

      {/* Card game menu */}
      <CardGameMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
