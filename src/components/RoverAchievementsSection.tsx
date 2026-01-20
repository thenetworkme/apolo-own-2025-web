'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut" as const,
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" as const }
    }
};

const rovers = [
    { id: 'hp', image: '/rovers/rover_hp.png' },
    { id: 'rc', image: '/rovers/rover_rc.png' }
];

export default function RoverAchievementsSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            id="rovers"
            ref={sectionRef}
            className="section-spacing relative w-full bg-black overflow-hidden"
        >
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Rovers Grid - Solo fotos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {rovers.map((rover) => (
                        <motion.div
                            key={rover.id}
                            className="relative aspect-[16/10] overflow-hidden rounded-3xl"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <Image
                                src={rover.image}
                                alt={`Rover ${rover.id.toUpperCase()}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
