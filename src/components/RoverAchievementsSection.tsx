'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const roverVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1.2, ease: "easeOut" as const }
    }
};

const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

export default function RoverAchievementsSection() {
    const { language } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const content = {
        es: {
            badge: 'NASA HERC 2024-2025',
            title: 'Conquistando',
            titleHighlight: 'el Espacio',
            description: 'Nuestro rover representa la culminación de años de innovación, ingeniería de precisión y pasión por la exploración espacial. Diseñado para superar los desafíos más exigentes de la competencia NASA Human Exploration Rover Challenge.',
            stats: [
                { value: '2do', label: 'Lugar Mundial 2024' },
                { value: '6', label: 'Premios Ganados' },
                { value: '50+', label: 'Ingenieros' }
            ]
        },
        en: {
            badge: 'NASA HERC 2024-2025',
            title: 'Conquering',
            titleHighlight: 'Space',
            description: 'Our rover represents the culmination of years of innovation, precision engineering, and passion for space exploration. Designed to overcome the most demanding challenges of the NASA Human Exploration Rover Challenge.',
            stats: [
                { value: '2nd', label: 'Place Worldwide 2024' },
                { value: '6', label: 'Awards Won' },
                { value: '50+', label: 'Engineers' }
            ]
        }
    };

    const t = content[language];

    return (
        <section
            id="achievements"
            ref={sectionRef}
            className="relative w-full py-16 sm:py-20 md:py-28 bg-black overflow-hidden"
        >
            {/* Background gradient accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] transform translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                    {/* Rover Image - Left Side */}
                    <motion.div
                        className="flex-1 w-full lg:w-1/2"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={roverVariants}
                    >
                        <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
                            <div className="relative aspect-[16/10]">
                                <Image
                                    src="/images/rover-herc.png"
                                    alt="Human-Powered Rover - NASA HERC 2025"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content - Right Side */}
                    <motion.div
                        className="flex-1 w-full lg:w-1/2 text-center lg:text-left"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={textVariants}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6"
                            variants={itemVariants}
                        >
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-red-400 text-xs sm:text-sm font-medium tracking-wider uppercase">
                                {t.badge}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                            variants={itemVariants}
                        >
                            {t.title}{' '}
                            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                                {t.titleHighlight}
                            </span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
                            variants={itemVariants}
                        >
                            {t.description}
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-3 gap-4 sm:gap-6"
                            variants={itemVariants}
                        >
                            {t.stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center lg:text-left p-3 sm:p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-xl"
                                >
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-zinc-500 text-xs sm:text-sm">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
