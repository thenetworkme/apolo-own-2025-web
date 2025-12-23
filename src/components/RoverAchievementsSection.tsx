'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const roverVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1.2, ease: "easeOut" as const }
    }
};

export default function RoverAchievementsSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            id="achievements"
            ref={sectionRef}
            className="relative w-full py-8 sm:py-12 md:py-16 bg-black overflow-hidden"
        >
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={roverVariants}
            >
                {/* Large Rover Image - Positioned Left */}
                <div className="relative w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                    <div className="relative aspect-[16/9] flex items-center justify-center">
                        <Image
                            src="/images/rover-herc.png"
                            alt="Human-Powered Rover - NASA HERC 2025"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            priority
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

