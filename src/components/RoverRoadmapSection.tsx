'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Rover data for the roadmap
const rovers = [
    {
        year: '2019',
        name: 'Genesis',
        description: 'Nuestro primer rover. El comienzo de un sueño.',
        achievement: 'Primera participación',
        image: '/images/rover-2019.png',
        position: 'left'
    },
    {
        year: '2022',
        name: 'Evolution',
        description: 'Diseño mejorado con mejor rendimiento.',
        achievement: 'Top 10 mundial',
        image: '/images/rover-2022.png',
        position: 'right'
    },
    {
        year: '2024',
        name: 'Triumph',
        description: 'El rover que nos llevó al podio mundial.',
        achievement: '2do lugar mundial',
        image: '/images/rover-2024.png',
        position: 'left'
    },
    {
        year: '2025',
        name: 'Legacy',
        description: 'Nuestro rover más avanzado hasta la fecha.',
        achievement: '6 premios',
        image: '/images/rover-2025.png',
        position: 'right'
    }
];

// Animation variants
const roverCardVariants = {
    hidden: { opacity: 0, x: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" as const }
    }
};

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

// Individual Rover Card Component
function RoverCard({ rover, index }: { rover: typeof rovers[0]; index: number }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    const isLeft = rover.position === 'left';

    return (
        <motion.div
            ref={cardRef}
            className={`relative flex items-center gap-8 lg:gap-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'
                } ${index !== rovers.length - 1 ? 'mb-24 lg:mb-32' : ''}`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={roverCardVariants}
        >
            {/* Rover Image */}
            <div className="flex-1 flex justify-center">
                <motion.div
                    className="relative w-full max-w-md lg:max-w-lg aspect-[4/3]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src={rover.image}
                        alt={`${rover.name} Rover - ${rover.year}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
            </div>

            {/* Text Content */}
            <motion.div
                className={`flex-1 ${isLeft ? 'text-left' : 'text-right'}`}
                variants={textVariants}
            >
                {/* Year Badge */}
                <div className={`inline-flex items-center gap-3 mb-4 ${isLeft ? '' : 'flex-row-reverse'}`}>
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-red-500 text-sm font-medium tracking-wider uppercase">
                        {rover.year}
                    </span>
                </div>

                {/* Rover Name */}
                <h3 className="text-4xl lg:text-5xl xl:text-6xl font-extralight text-white mb-4">
                    {rover.name}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-base lg:text-lg mb-4 max-w-md">
                    {rover.description}
                </p>

                {/* Achievement Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full ${isLeft ? '' : 'flex-row-reverse'}`}>
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-zinc-300 text-sm font-medium">
                        {rover.achievement}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function RoverRoadmapSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);

    // Scroll progress for the entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Transform scroll progress to line fill
    const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 sm:py-32 md:py-40 bg-black overflow-hidden"
        >
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-32">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-zinc-500 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4">
                        Nuestra Evolución
                    </p>
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
                        El Camino hacia la Gloria
                    </h2>
                </motion.div>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Center Line - Background (Gray) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 transform -translate-x-1/2 hidden lg:block" />

                {/* Center Line - Animated Fill (Red) */}
                <motion.div
                    className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-red-500 via-red-500 to-red-600 transform -translate-x-1/2 hidden lg:block rounded-full"
                    style={{ height: lineHeight }}
                />

                {/* Rover Cards */}
                <div className="relative z-10">
                    {rovers.map((rover, index) => (
                        <RoverCard key={rover.year} rover={rover} index={index} />
                    ))}
                </div>

                {/* Timeline Dots */}
                {rovers.map((rover, index) => (
                    <motion.div
                        key={`dot-${rover.year}`}
                        className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center justify-center"
                        style={{
                            top: `${(index / (rovers.length - 1)) * 100}%`,
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="w-4 h-4 rounded-full bg-red-500 border-4 border-black" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
