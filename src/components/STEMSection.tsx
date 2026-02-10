'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThreeDMarquee } from '@/components/ui/shadcn-io/3d-marquee';
import { useLanguage } from '@/context/LanguageContext';
import STEMVisitModal from '@/components/STEMVisitModal';

// STEM activity images
const stemImages = [
    '/stem/stem-1.webp',
    '/stem/stem-2.webp',
    '/stem/stem-3.webp',
    '/stem/stem-4.webp',
    '/stem/stem-1.webp',
    '/stem/stem-2.webp',
    '/stem/stem-3.webp',
    '/stem/stem-4.webp',
    '/stem/stem-1.webp',
    '/stem/stem-2.webp',
    '/stem/stem-3.webp',
    '/stem/stem-4.webp',
    '/stem/stem-1.webp',
    '/stem/stem-2.webp',
    '/stem/stem-3.webp',
    '/stem/stem-4.webp',
    '/stem/stem-1.webp',
    '/stem/stem-2.webp',
    '/stem/stem-3.webp',
    '/stem/stem-4.webp',
    '/stem/stem-1.webp',
    '/stem/stem-2.webp',
];

export default function STEMSection() {
    const { language } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const content = {
        es: {
            subtitle: 'Impacto Educativo',
            title: 'Aportando al',
            titleHighlight: 'Futuro STEM',
            description: 'Llevamos la ciencia y la tecnología espacial a escuelas y comunidades, inspirando a la próxima generación de científicos, ingenieros y exploradores.',
            ctaButton: 'Solicita una Visita STEM',
        },
        en: {
            subtitle: 'Educational Impact',
            title: 'Contributing to the',
            titleHighlight: 'STEM Future',
            description: 'We bring space science and technology to schools and communities, inspiring the next generation of scientists, engineers, and explorers.',
            ctaButton: 'Request a STEM Visit',
        }
    };

    const t = content[language];

    return (
        <>
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
                        {/* Footer-style animated button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative border-2 border-red-500 bg-transparent text-red-500 font-bold text-lg sm:text-xl text-center overflow-hidden transition-all duration-300 ease-out hover:text-white hover:border-red-400 px-10 sm:px-14 py-5 sm:py-6 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative z-10">{t.ctaButton}</span>
                        </button>
                    </div>
                </motion.div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 z-10 h-full w-full bg-black/70" />

                {/* 3D Marquee Background */}
                <ThreeDMarquee
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    images={stemImages}
                />
            </section>

            {/* STEM Visit Modal */}
            <STEMVisitModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
