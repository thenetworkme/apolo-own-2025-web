'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Team photos with random positions and rotations (max 4)
const teamPhotos = [
    { src: '/stem/WhatsApp Image 2026-01-04 at 7.10.20 PM (1).jpeg', top: '12%', left: '5%', rotate: -15 },
    { src: '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (2).jpeg', top: '15%', right: '6%', rotate: 12 },
    { src: '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (3).jpeg', bottom: '18%', left: '8%', rotate: 20 },
    { src: '/stem/WhatsApp Image 2026-01-04 at 7.12.41 PM (1).jpeg', bottom: '15%', right: '5%', rotate: -18 },
];

// Translations
const content = {
    es: "UN PEQUEÑO GRUPO DE ESTUDIANTES DOMINICANOS CON UN GRAN SUEÑO: LLEVAR A REPÚBLICA DOMINICANA AL ESPACIO.",
    en: "A SMALL GROUP OF DOMINICAN STUDENTS WITH A BIG DREAM: TAKING THE DOMINICAN REPUBLIC TO SPACE."
};

export default function ScrollRevealSection() {
    const { language } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);

    const fullText = content[language];
    const words = fullText.split(' ');

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Photo effects - bigger zoom
    const photoScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1.2, 1.5, 1.8]);
    const photoOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 0.95], [0, 0.8, 0.8, 0]);

    // Text zoom effect
    const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.1]);

    // Fade out section at the end
    const sectionFadeOut = useTransform(scrollYProgress, [0.88, 1], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative bg-black"
            style={{ height: '150vh' }}
        >
            {/* Sticky container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Floating photos with rotations */}
                {teamPhotos.map((photo, index) => (
                    <motion.div
                        key={index}
                        className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52"
                        style={{
                            top: photo.top,
                            bottom: photo.bottom,
                            left: photo.left,
                            right: photo.right,
                            opacity: photoOpacity,
                            scale: photoScale,
                            rotate: photo.rotate,
                        }}
                    >
                        <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                            <Image
                                src={photo.src}
                                alt="Team photo"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, 208px"
                            />
                        </div>
                    </motion.div>
                ))}

                {/* Center text with word-by-word reveal */}
                <motion.div
                    className="relative z-10 text-center px-6 sm:px-8 max-w-4xl mx-auto"
                    style={{
                        opacity: sectionFadeOut,
                        scale: textScale,
                        fontFamily: "var(--font-poppins), sans-serif"
                    }}
                >
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                        {words.map((word, index) => {
                            // Each word reveals based on scroll progress
                            const wordStart = index / words.length;
                            const wordEnd = (index + 1) / words.length;

                            return (
                                <Word
                                    key={index}
                                    word={word}
                                    scrollYProgress={scrollYProgress}
                                    start={wordStart * 0.85}
                                    end={wordEnd * 0.85}
                                />
                            );
                        })}
                    </p>
                </motion.div>

                {/* Subtle vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)'
                    }}
                />
            </div>
        </section>
    );
}

// Word component with individual opacity animation
function Word({
    word,
    scrollYProgress,
    start,
    end
}: {
    word: string;
    scrollYProgress: any;
    start: number;
    end: number;
}) {
    const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="inline-block text-white transition-opacity duration-300"
        >
            {word}&nbsp;
        </motion.span>
    );
}
