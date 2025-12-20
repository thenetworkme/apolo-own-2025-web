'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { useLanguage } from '@/context/LanguageContext';
import {
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaFacebookF,
    FaLinkedinIn,
    FaXTwitter
} from 'react-icons/fa6';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut" as const
        }
    }
};

const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" as const }
    }
};

export default function SocialMediaSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 sm:py-40 md:py-48 bg-black overflow-hidden flex items-center justify-center"
        >
            {/* Gradient orb in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12 sm:mb-16 flex flex-col items-center"
                    variants={titleVariants}
                >
                    <p className="text-zinc-500 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4">
                        {t('social.subtitle')}
                    </p>
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
                        {t('social.title')}
                    </h2>
                    <p className="text-zinc-400 text-base sm:text-lg max-w-2xl text-center">
                        {t('social.description')}
                    </p>
                </motion.div>

                {/* Orbiting Circles Container - Centered */}
                <div className="relative flex h-[400px] sm:h-[500px] w-full flex-col items-center justify-center overflow-hidden">

                    {/* Outer orbit - larger icons */}
                    <OrbitingCircles
                        iconSize={50}
                        radius={180}
                        duration={30}
                        path={true}
                    >
                        <a
                            href="https://instagram.com/apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 hover:scale-110 transition-transform shadow-lg"
                        >
                            <FaInstagram className="w-6 h-6 text-white" />
                        </a>
                        <a
                            href="https://tiktok.com/@apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 hover:scale-110 transition-transform shadow-lg"
                        >
                            <FaTiktok className="w-6 h-6 text-white" />
                        </a>
                        <a
                            href="https://youtube.com/@apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:scale-110 transition-transform shadow-lg"
                        >
                            <FaYoutube className="w-6 h-6 text-white" />
                        </a>
                    </OrbitingCircles>

                    {/* Inner orbit - reverse direction */}
                    <OrbitingCircles
                        iconSize={40}
                        radius={100}
                        reverse
                        speed={1.5}
                        duration={25}
                        path={true}
                    >
                        <a
                            href="https://facebook.com/apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:scale-110 transition-transform shadow-lg"
                        >
                            <FaFacebookF className="w-5 h-5 text-white" />
                        </a>
                        <a
                            href="https://x.com/apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:scale-110 transition-transform shadow-lg border border-zinc-700"
                        >
                            <FaXTwitter className="w-5 h-5 text-white" />
                        </a>
                        <a
                            href="https://linkedin.com/company/apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:scale-110 transition-transform shadow-lg"
                        >
                            <FaLinkedinIn className="w-5 h-5 text-white" />
                        </a>
                    </OrbitingCircles>
                </div>
            </motion.div>
        </section>
    );
}
