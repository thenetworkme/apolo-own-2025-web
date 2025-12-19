'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectLanguage = (lang: 'es' | 'en') => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Current Language Button - LARGER */}
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 text-white text-base sm:text-lg md:text-xl font-semibold tracking-wide hover:text-orange-400 transition-colors"
            >
                <span>{language === 'es' ? 'ESP' : 'ENG'}</span>
                <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu - LARGER */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-3 bg-black/90 backdrop-blur-sm border border-white/20 rounded-md overflow-hidden min-w-[100px]"
                    >
                        <button
                            onClick={() => selectLanguage('es')}
                            className={`w-full px-5 py-3 text-left text-base hover:bg-white/10 transition-colors ${language === 'es' ? 'text-orange-400' : 'text-white'
                                }`}
                        >
                            ESP
                        </button>
                        <button
                            onClick={() => selectLanguage('en')}
                            className={`w-full px-5 py-3 text-left text-base hover:bg-white/10 transition-colors ${language === 'en' ? 'text-orange-400' : 'text-white'
                                }`}
                        >
                            ENG
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
