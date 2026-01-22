'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThreeDMarquee } from '@/components/ui/shadcn-io/3d-marquee';
import { useLanguage } from '@/context/LanguageContext';

// STEM activity images
const stemImages = [
    '/stem/WhatsApp Image 2026-01-04 at 7.10.20 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (2).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (3).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.12.41 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.10.20 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (2).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (3).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.12.41 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.10.20 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (2).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (3).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.12.41 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.10.20 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (2).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (3).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.12.41 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.10.20 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (2).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (3).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.12.41 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.10.20 PM (1).jpeg',
    '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (2).jpeg',
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
            className="relative w-full h-[70vh] min-h-[500px] stem-section-spacing flex items-center justify-center overflow-hidden"
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

                <div className="mt-8 w-full flex justify-center">
                    <a
                        href="#stem-visit"
                        className="inline-flex items-center gap-3 px-12 py-6 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] hover:scale-105"
                        style={{ padding: '100px !', }}
                    >
                        {t.ctaButton}
                    </a>
                </div>
            </motion.div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-10 h-full w-full bg-black/70" />

            {/* 3D Marquee Background */}
            <ThreeDMarquee
                className="pointer-events-none absolute inset-0 h-full w-full"
                images={stemImages}
            />
        </section >
    );
}
