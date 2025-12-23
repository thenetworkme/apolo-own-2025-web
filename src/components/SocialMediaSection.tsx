'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { useLanguage } from '@/context/LanguageContext';
import {
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaLinkedinIn
} from 'react-icons/fa6';

// Floating particle component
const FloatingParticle = ({ delay, duration, size, left, top }: {
    delay: number;
    duration: number;
    size: number;
    left: string;
    top: string;
}) => (
    <motion.div
        className="absolute rounded-full bg-white pointer-events-none"
        style={{
            width: size,
            height: size,
            left,
            top,
            boxShadow: `0 0 ${size * 2}px ${size}px rgba(255, 255, 255, 0.3)`
        }}
        animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);

// Energy pulse component
const EnergyPulse = ({ delay, color }: { delay: number; color: string }) => (
    <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}`
        }}
        initial={{ width: 20, height: 20, opacity: 0.8 }}
        animate={{
            width: [20, 400],
            height: [20, 400],
            opacity: [0.8, 0]
        }}
        transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeOut"
        }}
    />
);

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

// Generate random particles
const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        size: 2 + Math.random() * 3,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
    }));
};

export default function SocialMediaSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [particles] = useState(() => generateParticles(30));

    return (
        <section
            id="social"
            ref={sectionRef}
            className="relative w-full py-32 sm:py-40 md:py-48 bg-black overflow-hidden flex items-center justify-center"
        >
            {/* Animated Aurora Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
                    }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.18) 0%, transparent 70%)'
                    }}
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -40, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)'
                    }}
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -30, 0],
                        scale: [1.1, 0.9, 1.1]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Energy Pulses */}


            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                    filter: 'blur(40px)'
                }}
            />

            <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12 sm:mb-16 flex flex-col items-center"
                    variants={titleVariants}
                >
                    <motion.p
                        className="text-zinc-500 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4"
                        animate={{
                            textShadow: ['0 0 10px rgba(139, 92, 246, 0)', '0 0 20px rgba(139, 92, 246, 0.5)', '0 0 10px rgba(139, 92, 246, 0)']
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        {t('social.subtitle')}
                    </motion.p>
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6"
                        style={{
                            textShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {t('social.title')}
                    </h2>
                    <p className="text-zinc-400 text-base sm:text-lg max-w-2xl text-center">
                        {t('social.description')}
                    </p>
                </motion.div>

                {/* Orbiting Circles Container - Centered */}
                <div className="relative flex h-[400px] sm:h-[500px] w-full flex-col items-center justify-center overflow-hidden">

                    {/* Outer orbit (Orbit 1) - LinkedIn and YouTube */}
                    <OrbitingCircles
                        iconSize={50}
                        radius={180}
                        duration={30}
                        path={true}
                    >
                        <motion.a
                            href="https://linkedin.com/company/apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 hover:scale-125 transition-all duration-300"
                            style={{
                                boxShadow: '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                            }}
                            whileHover={{
                                boxShadow: '0 0 50px rgba(59, 130, 246, 0.8), 0 0 100px rgba(59, 130, 246, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.3)'
                            }}
                            animate={{
                                boxShadow: [
                                    '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)',
                                    '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4)',
                                    '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <FaLinkedinIn className="w-7 h-7 text-white drop-shadow-lg" />
                        </motion.a>
                        <motion.a
                            href="https://youtube.com/@apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 hover:scale-125 transition-all duration-300"
                            style={{
                                boxShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                            }}
                            whileHover={{
                                boxShadow: '0 0 50px rgba(239, 68, 68, 0.8), 0 0 100px rgba(239, 68, 68, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.3)'
                            }}
                            animate={{
                                boxShadow: [
                                    '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)',
                                    '0 0 40px rgba(239, 68, 68, 0.8), 0 0 80px rgba(239, 68, 68, 0.4)',
                                    '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                            <FaYoutube className="w-7 h-7 text-white drop-shadow-lg" />
                        </motion.a>
                    </OrbitingCircles>

                    {/* Inner orbit (Orbit 2) - Instagram and TikTok */}
                    <OrbitingCircles
                        iconSize={40}
                        radius={100}
                        reverse
                        speed={1.5}
                        duration={25}
                        path={true}
                    >
                        <motion.a
                            href="https://instagram.com/apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 hover:scale-125 transition-all duration-300"
                            style={{
                                boxShadow: '0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                            }}
                            whileHover={{
                                boxShadow: '0 0 50px rgba(236, 72, 153, 0.8), 0 0 100px rgba(168, 85, 247, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.3)'
                            }}
                            animate={{
                                boxShadow: [
                                    '0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(168, 85, 247, 0.3)',
                                    '0 0 40px rgba(236, 72, 153, 0.8), 0 0 80px rgba(168, 85, 247, 0.4)',
                                    '0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(168, 85, 247, 0.3)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        >
                            <FaInstagram className="w-6 h-6 text-white drop-shadow-lg" />
                        </motion.a>
                        <motion.a
                            href="https://tiktok.com/@apolo27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-teal-500 to-pink-500 hover:scale-125 transition-all duration-300"
                            style={{
                                boxShadow: '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                            }}
                            whileHover={{
                                boxShadow: '0 0 50px rgba(6, 182, 212, 0.8), 0 0 100px rgba(236, 72, 153, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.3)'
                            }}
                            animate={{
                                boxShadow: [
                                    '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(236, 72, 153, 0.3)',
                                    '0 0 40px rgba(6, 182, 212, 0.8), 0 0 80px rgba(236, 72, 153, 0.4)',
                                    '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(236, 72, 153, 0.3)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                        >
                            <FaTiktok className="w-6 h-6 text-white drop-shadow-lg" />
                        </motion.a>
                    </OrbitingCircles>
                </div>
            </motion.div>
        </section>
    );
}
