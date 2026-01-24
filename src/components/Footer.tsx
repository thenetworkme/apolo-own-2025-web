'use client';

import { useState } from 'react';
import { Globe } from '@/components/ui/globe';
import { useLanguage } from '@/context/LanguageContext';
import STEMVisitModal from '@/components/STEMVisitModal';

export default function Footer() {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="footer-section relative w-full bg-black overflow-hidden">

                {/* Centered Header Text */}
                <div className="footer-header-container absolute w-full z-30">
                    <p
                        className="footer-header-text text-white italic text-center"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                        {t('footer.headerText')}
                    </p>
                </div>

                {/* Left Side - Title and CTA Buttons */}
                <div className="footer-content absolute z-20">
                    {/* Title and Subtitle */}
                    <div className="footer-text-block">
                        <h2 className="footer-title text-white font-bold tracking-tight">
                            {t('footer.title')}
                        </h2>
                        <p className="footer-subtitle text-gray-400 leading-relaxed">
                            {t('footer.subtitle')}
                        </p>
                    </div>

                    {/* Buttons - Vertical stack */}
                    <div className="footer-buttons flex flex-col gap-2 sm:gap-3">
                        <a
                            href="#sponsor"
                            className="footer-btn group relative border border-red-500 bg-transparent text-red-500 font-semibold text-center overflow-hidden transition-all duration-300 ease-out hover:text-white hover:border-red-400"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative z-10">{t('footer.sponsorButton')}</span>
                        </a>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="footer-btn group relative border border-red-500 bg-transparent text-red-500 font-semibold text-center overflow-hidden transition-all duration-300 ease-out hover:text-white hover:border-red-400"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative z-10">{t('footer.stemButton')}</span>
                        </button>
                    </div>
                </div>

                {/* Globe - Right side, only top half visible */}
                <div className="footer-globe-container absolute overflow-hidden">
                    <div className="footer-globe-inner absolute left-1/2 -translate-x-1/2">
                        <Globe
                            config={{
                                width: 1000,
                                height: 1000,
                                onRender: () => { },
                                devicePixelRatio: 2,
                                phi: 0,
                                theta: 0.3,
                                dark: 1,
                                diffuse: 0.4,
                                mapSamples: 16000,
                                mapBrightness: 6,
                                baseColor: [0.3, 0.3, 0.3],
                                markerColor: [0.9, 0.3, 0.2],
                                glowColor: [0.5, 0.1, 0.1],
                                markers: [
                                    // Dominican Republic (main marker)
                                    { location: [18.7357, -70.1627], size: 0.15 },
                                    // NASA Huntsville, Alabama
                                    { location: [34.7304, -86.5861], size: 0.1 },
                                ]
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* STEM Visit Modal */}
            <STEMVisitModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
