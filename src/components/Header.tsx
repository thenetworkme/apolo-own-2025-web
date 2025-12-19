'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-8 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px]"
    >
      {/* Brand / Logo */}
      <div className="flex items-center gap-2">
        {/* NASA Worm Logo Style or Meatball (SVG Placeholder) - Using simple NASA text for minimalist worm look if preferred, but reference shows Meatball */}
        <div className="w-12 h-12 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="50" r="45" fill="#0b3d91" />
            <path d="M20,60 Q50,20 80,60" fill="none" stroke="#fc3d21" strokeWidth="4" />
            <text x="50" y="55" fontSize="22" fontFamily="Arial" fontWeight="bold" fill="white" textAnchor="middle">NASA</text>
            <circle cx="80" cy="30" r="2" fill="white" />
            <circle cx="20" cy="40" r="1" fill="white" />
          </svg>
        </div>
      </div>

      {/* Right Nav Controls */}
      <div className="flex items-center gap-8 md:gap-12">
        {/* Language */}
        <button className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider hover:text-orange-500 transition-colors">
          ENG
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Hamburger Menu */}
        <button className="flex flex-col items-end gap-[6px] group">
          <div className="w-8 h-[2px] bg-white group-hover:bg-orange-500 transition-colors"></div>
          <div className="w-6 h-[2px] bg-white group-hover:bg-orange-500 transition-colors"></div>
        </button>
      </div>
    </motion.header>
  );
}
