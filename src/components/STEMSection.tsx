'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThreeDMarquee } from '@/components/ui/shadcn-io/3d-marquee';
import { useLanguage } from '@/context/LanguageContext';

// STEM activity images - replace with actual STEM visit photos
const stemImages = [
    '/images/rover-2019.png',
    '/images/rover-2022.png',
    '/images/rover-2024.png',
    '/images/rover-2025.png',
    '/images/rover-herc.png',
    '/images/astronaut-transparent.png',
    '/images/rover-2019.png',
    '/images/rover-2022.png',
    '/images/rover-2024.png',
    '/images/rover-2025.png',
    '/images/rover-herc.png',
    '/images/astronaut-transparent.png',
    '/images/rover-2019.png',
    '/images/rover-2022.png',
    '/images/rover-2024.png',
    '/images/rover-2025.png',
    '/images/rover-herc.png',
    '/images/astronaut-transparent.png',
    '/images/rover-2019.png',
    '/images/rover-2022.png',
    '/images/rover-2024.png',
    '/images/rover-2025.png',
];

export default function STEMSection() {
    const { language } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const content = {
        es: {
            subtitle: 'Impacto Educativo',
            title: 'Aportando al',
            titleHighlight: 'Futuro STEM',
            description: 'Llevamos la ciencia y la tecnología espacial a escuelas y comunidades, inspirando a la próxima generación de científicos, ingenieros y exploradores.',
            ctaButton: 'Solicita una Visita',
        },
        en: {
            subtitle: 'Educational Impact',
            title: 'Contributing to the',
            titleHighlight: 'STEM Future',
            description: 'We bring space science and technology to schools and communities, inspiring the next generation of scientists, engineers, and explorers.',
            ctaButton: 'Request a Visit',
        }
    };

    const t = content[language];

    return (
        <section
            id="stem"
            ref={sectionRef}
            className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Content Overlay */}
            <motion.div
                className="relative z-20 text-center px-4 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-zinc-400 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4">
                    {t.subtitle}
                </p>
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    {t.title}{' '}
                    <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                        {t.titleHighlight}
                    </span>
                </h2>
                <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
                    {t.description}
                </p>
                <a
                    href="#stem-visit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                    {t.ctaButton}
                </a>
            </motion.div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-10 h-full w-full bg-black/70" />

            {/* 3D Marquee Background */}
            <ThreeDMarquee
                className="pointer-events-none absolute inset-0 h-full w-full"
                images={stemImages}
            />
        </section>
    );
}
