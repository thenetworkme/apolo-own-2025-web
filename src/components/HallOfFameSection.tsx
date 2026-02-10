'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function HallOfFameSection() {
    const { language } = useLanguage();
    const sectionRef = useRef(null);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });

    // Button zoom: starts very small (0.2) and grows to larger than full size (1.15)
    const buttonScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.2, 0.7, 1.15]);
    const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [0.2, 1]);

    // Left rover: rotates more aggressively from -50deg to 8deg (toward center)
    const leftRotate = useTransform(scrollYProgress, [0, 0.7, 1], [-50, -15, 8]);
    const leftX = useTransform(scrollYProgress, [0, 1], [-100, 40]);
    const leftScale = useTransform(scrollYProgress, [0, 1], [0.5, 1.4]);

    // Right rover: rotates from 50deg to -8deg (toward center)
    const rightRotate = useTransform(scrollYProgress, [0, 0.7, 1], [50, 15, -8]);
    const rightX = useTransform(scrollYProgress, [0, 1], [100, -40]);
    const rightScale = useTransform(scrollYProgress, [0, 1], [0.5, 1.4]);

    const content = {
        es: {
            enter: 'Entrar Hall of Fame',
        },
        en: {
            enter: 'Enter Hall of Fame',
        }
    };

    const t = content[language];

    const router = useRouter();

    const handleEnterClick = () => {
        router.push('/hall-of-fame');
    };

    return (
        <section
            id="hall-of-fame"
            ref={sectionRef}
            className="hall-of-fame-section"
        >
            {/* Subtle background grid */}
            <div className="hall-of-fame-grid" />

            <div className="hall-of-fame-container">

                {/* Main Layout: Rovers on sides, button in center */}
                <div className="hall-of-fame-content">

                    {/* Left Rover - Blueprint */}
                    <motion.div
                        className="hall-of-fame-rover hall-of-fame-rover-left"
                        style={{
                            rotate: leftRotate,
                            x: leftX,
                            scale: leftScale
                        }}
                    >
                        <Image
                            src="/rovers/rover_hp_blueprint.png"
                            alt="HP Rover Blueprint"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 180px, (max-width: 1024px) 280px, 380px"
                        />
                    </motion.div>

                    {/* Center - Enter Button - No whileHover scale, only CSS hover */}
                    <motion.button
                        onClick={handleEnterClick}
                        className="hall-of-fame-button"
                        style={{
                            scale: buttonScale,
                            opacity: buttonOpacity
                        }}
                    >
                        {/* Pulsing green dot */}
                        <span className="hall-of-fame-dot">
                            <span className="hall-of-fame-dot-ping"></span>
                            <span className="hall-of-fame-dot-solid"></span>
                        </span>

                        {/* Button text */}
                        <span className="hall-of-fame-button-text">
                            {t.enter}
                        </span>
                    </motion.button>

                    {/* Right Rover - Blueprint */}
                    <motion.div
                        className="hall-of-fame-rover hall-of-fame-rover-right"
                        style={{
                            rotate: rightRotate,
                            x: rightX,
                            scale: rightScale
                        }}
                    >
                        <Image
                            src="/rovers/rover_rc_blueprint.png"
                            alt="RC Rover Blueprint"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 180px, (max-width: 1024px) 280px, 380px"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
