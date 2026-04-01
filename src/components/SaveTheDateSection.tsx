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
    const { t, language } = useLanguage();
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
                    className="w-[85%] sm:w-[80%] md:w-[75%] lg:w-[70%] flex flex-col items-center gap-10"
                    style={{ marginTop: 'clamp(40px, 6vw, 80px)' }}
                >
                    <CountdownTimer />
                    
                    {/* YouTube Watch Reel Button */}
                    <a
                        href="https://www.youtube.com/@NASAMarshall"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="youtube-watch-btn group"
                    >
                        <div className="youtube-watch-icon-wrapper">
                            <svg className="youtube-watch-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                        </div>
                        <span className="youtube-watch-text">
                            {language === 'es' ? 'Únete a la aventura' : 'Join the adventure'}
                        </span>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
