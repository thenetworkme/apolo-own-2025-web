'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { useLanguage } from '@/context/LanguageContext';
import {
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaLinkedinIn
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

// Orbit container animation - slides in from right
const orbitVariants = {
    hidden: {
        opacity: 0,
        x: 200
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            ease: "easeOut" as const,
            delay: 0.3
        }
    }
};

export default function SocialMediaSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            id="social"
            ref={sectionRef}
            className="section-spacing relative w-full bg-black overflow-hidden"
        >
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Two column layout - Text left, Orbits right */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

                    {/* Left side - Text content */}
                    <motion.div
                        className="flex-1 text-center lg:text-left max-w-xl"
                        variants={titleVariants}
                    >
                        <p className="text-zinc-500 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4">
                            {t('social.subtitle')}
                        </p>
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
                            {t('social.title')}
                        </h2>
                        <p className="text-zinc-400 text-base sm:text-lg">
                            {t('social.description')}
                        </p>
                    </motion.div>

                    {/* Right side - Orbiting Circles with slide-in animation */}
                    <motion.div
                        className="flex-1 flex justify-center lg:justify-end"
                        variants={orbitVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <div className="relative aspect-square h-[450px] sm:h-[500px] flex items-center justify-center">

                            {/* Outer orbit - LinkedIn and YouTube */}
                            <OrbitingCircles
                                iconSize={50}
                                radius={200}
                                duration={30}
                                path={true}
                            >
                                <a
                                    href="https://linkedin.com/company/apolo27"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-600 hover:scale-110 transition-transform duration-300"
                                >
                                    <FaLinkedinIn className="w-5 h-5 text-white" />
                                </a>
                                <a
                                    href="https://youtube.com/@apolo27"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-11 h-11 rounded-full bg-red-600 hover:scale-110 transition-transform duration-300"
                                >
                                    <FaYoutube className="w-5 h-5 text-white" />
                                </a>
                            </OrbitingCircles>

                            {/* Middle orbit - Instagram and TikTok */}
                            <OrbitingCircles
                                iconSize={40}
                                radius={130}
                                reverse
                                speed={1.5}
                                duration={25}
                                path={true}
                            >
                                <a
                                    href="https://instagram.com/apolo27"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 hover:scale-110 transition-transform duration-300"
                                >
                                    <FaInstagram className="w-5 h-5 text-white" />
                                </a>
                                <a
                                    href="https://tiktok.com/@apolo27"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:scale-110 transition-transform duration-300"
                                >
                                    <FaTiktok className="w-5 h-5 text-white" />
                                </a>
                            </OrbitingCircles>

                            {/* Inner orbit - Empty decorative */}
                            <OrbitingCircles
                                iconSize={20}
                                radius={50}
                                duration={20}
                                path={true}
                            >
                                <div />
                            </OrbitingCircles>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
