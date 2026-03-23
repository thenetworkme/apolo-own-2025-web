'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut" as const
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

// Orbit container animation - slides in from right
const orbitVariants = {
    hidden: {
        opacity: 0,
        x: 200
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            ease: "easeOut" as const,
            delay: 0.3
        }
    }
};

export default function SocialMediaSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            id="social"
            ref={sectionRef}
            className="section-spacing relative w-full bg-black overflow-hidden"
        >
            <motion.div
                className="social-section-wrapper"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Two column layout - Text left, Grid right */}
                <div className="social-layout">

                    {/* Left side - Text content */}
                    <motion.div
                        className="social-text-content"
                        variants={titleVariants}
                    >
                        <p className="text-zinc-500 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4">
                            {t('social.subtitle')}
                        </p>
                        <h2 className="social-title text-white font-light tracking-wide mb-6">
                            {t('social.title')}
                        </h2>
                        <p className="social-description text-zinc-400">
                            {t('social.description')}
                        </p>
                    </motion.div>

                    {/* Right side - Bento Grid for Social Media */}
                    <motion.div
                        className="social-grid-wrapper"
                        variants={orbitVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {/* Bento Grid using global CSS classes */}
                        <div className="social-bento-grid font-[family-name:var(--font-poppins)]">

                            {/* Instagram Card */}
                            <motion.a
                                href="https://instagram.com/apolo27rd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-bento-card social-card-instagram"
                                aria-label="Visita nuestro Instagram"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="social-bento-icon">
                                    <Image src="/social_media/instagram.png" alt="Instagram" fill className="object-contain" quality={100} unoptimized />
                                </div>
                            </motion.a>

                            {/* LinkedIn Card */}
                            <motion.a
                                href="https://linkedin.com/company/apolo27"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-bento-card social-card-linkedin"
                                aria-label="Visita nuestro LinkedIn"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="social-bento-icon">
                                    <Image src="/social_media/Linkedin.png" alt="LinkedIn" fill className="object-contain" quality={100} unoptimized />
                                </div>
                            </motion.a>

                            {/* TikTok Card */}
                            <motion.a
                                href="https://tiktok.com/@apolo27rd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-bento-card social-card-tiktok"
                                aria-label="Visita nuestro TikTok"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="social-bento-icon">
                                    <Image src="/social_media/tiktok.png" alt="TikTok" fill className="object-contain" quality={100} unoptimized />
                                </div>
                            </motion.a>

                            {/* YouTube Card */}
                            <motion.a
                                href="https://youtube.com/@apolo27"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-bento-card social-card-youtube"
                                aria-label="Visita nuestro YouTube"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="social-bento-icon">
                                    <Image src="/social_media/youtube.png" alt="YouTube" fill className="object-contain" quality={100} unoptimized />
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
