'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { TextAnimate } from '@/components/ui/text-animate';
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
            id="save-the-date"
            ref={sectionRef}
            className="relative w-full bg-black overflow-hidden"
            style={{ paddingTop: 'clamp(20px, 4vw, 60px)', paddingBottom: 'var(--section-gap, clamp(60px, 8vw, 120px))' }}
        >
            {/* Content Container */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Save the Date Text with TextAnimate */}
                <TextAnimate
                    animation="blurInUp"
                    by="word"
                    className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide text-center"
                    once
                >
                    {t('hero.saveTheDate')}
                </TextAnimate>

                {/* Decorative subtitle with TextAnimate */}
                <TextAnimate
                    animation="fadeIn"
                    by="character"
                    delay={0.5}
                    className="mt-5 sm:mt-6 md:mt-8 text-zinc-500 text-xs sm:text-sm md:text-base font-light tracking-[0.3em] uppercase"
                    once
                >
                    NASA HERC 2026
                </TextAnimate>

                {/* Countdown Timer */}
                <motion.div
                    variants={textVariants}
                    className="w-[85%] sm:w-[80%] md:w-[75%] lg:w-[70%] flex justify-center"
                    style={{ marginTop: 'clamp(40px, 6vw, 80px)' }}
                >
                    <CountdownTimer />
                </motion.div>
            </motion.div>
        </section>
    );
}
