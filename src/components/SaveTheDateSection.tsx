'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CountdownTimer from './CountdownTimer';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
};

const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 1.2, ease: "easeOut" as const }
    }
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" as const }
    }
};

const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" as const }
    }
};

export default function SaveTheDateSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen py-32 sm:py-40 md:py-48 lg:py-56 bg-black overflow-hidden"
        >
            {/* Content Container */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Save the Date Text */}
                <motion.h2
                    variants={textVariants}
                    className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide text-center"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
                >
                    {t('hero.saveTheDate')}
                </motion.h2>

                {/* Decorative subtitle */}
                <motion.p
                    variants={textVariants}
                    className="mt-5 sm:mt-6 md:mt-8 text-zinc-500 text-xs sm:text-sm md:text-base font-light tracking-[0.3em] uppercase"
                >
                    NASA HERC 2026
                </motion.p>

                {/* Countdown Timer - 70% margin-top */}
                <motion.div
                    variants={textVariants}
                    className="w-[85%] sm:w-[80%] md:w-[75%] lg:w-[70%] flex justify-center"
                    style={{ marginTop: '70px' }}
                >
                    <CountdownTimer />
                </motion.div>
            </motion.div>

            {/* Extra space at the bottom */}
            <div className="h-32 sm:h-40 md:h-56 lg:h-72" />
        </section>
    );
}
