'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// All sponsor logos from public/logos
const sponsors = [
    { name: '3D Printers RD', logo: '/logos/3dprintersrd.webp' },
    { name: 'Wind Telecom', logo: '/logos/Logo-Wind-Blanco.webp' },
    { name: 'AES', logo: '/logos/aes.webp' },
    { name: 'BM Cargo', logo: '/logos/bmcargo.webp' },
    { name: 'Juventud', logo: '/logos/juventud.webp' },
    { name: 'La Deli', logo: '/logos/ladeli.webp' },
    { name: 'Max', logo: '/logos/max.webp' },
    { name: 'Ole', logo: '/logos/ole.webp' },
    { name: 'Pabe Comercial', logo: '/logos/pabecomercial.webp' },
    { name: 'Thomas', logo: '/logos/thomas.webp' },
];

// Animation variants for the section
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
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

export default function SponsorsSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            id="sponsors"
            ref={sectionRef}
            className="section-spacing relative w-full bg-black overflow-hidden"
        >
            <motion.div
                className="relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Title */}
                <motion.div
                    variants={titleVariants}
                    className="text-center mb-16 sm:mb-20 md:mb-28 px-4"
                    style={{ marginBottom: '50px' }}
                >
                    <p className="text-zinc-500 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4">
                        {t('sponsors.subtitle') || 'Patrocinadores Oficiales'}
                    </p>
                    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
                        {t('sponsors.title') || 'Nuestros Aliados'}
                    </h2>
                </motion.div>

                {/* Carousel Container with Fade Effect */}
                <motion.div
                    variants={titleVariants}
                    className="sponsors-carousel-container relative"
                >
                    {/* Fade Gradient Overlays */}
                    <div className="sponsors-fade-left" />
                    <div className="sponsors-fade-right" />

                    {/* Infinite Scroll Track - CSS Animation */}
                    <div className="overflow-hidden">
                        <div className="sponsors-track">
                            {/* First set of logos */}
                            {sponsors.map((sponsor, index) => (
                                <div
                                    key={`first-${sponsor.name}-${index}`}
                                    className="sponsors-slide"
                                >
                                    <div className="relative w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                                        <Image
                                            src={sponsor.logo}
                                            alt={sponsor.name}
                                            fill
                                            className="object-contain filter hover:grayscale transition-all duration-300"
                                            sizes="(max-width: 640px) 100px, (max-width: 768px) 130px, (max-width: 1024px) 160px, 200px"
                                        />
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate set for seamless loop */}
                            {sponsors.map((sponsor, index) => (
                                <div
                                    key={`second-${sponsor.name}-${index}`}
                                    className="sponsors-slide"
                                >
                                    <div className="relative w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                                        <Image
                                            src={sponsor.logo}
                                            alt={sponsor.name}
                                            fill
                                            className="object-contain filter hover:grayscale transition-all duration-300"
                                            sizes="(max-width: 640px) 100px, (max-width: 768px) 130px, (max-width: 1024px) 160px, 200px"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

