'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { useLanguage } from '@/context/LanguageContext';
import Marquee from '@/components/ui/Marquee';
import TestimonialCard from '@/components/TestimonialCard';
import {
    IconBrandInstagram,
    IconBrandTiktok,
    IconBrandYoutube,
    IconBrandLinkedin
} from '@tabler/icons-react';

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

// Testimonials data with gradient colors
const testimonials = [
    {
        name: "María",
        username: "maria",
        quote: "I don't know what to say. I'm speechless. This is amazing.",
        gradientFrom: "from-pink-500",
        gradientTo: "to-violet-500"
    },
    {
        name: "Carlos",
        username: "carlos",
        quote: "I'm at a loss for words. This is amazing. I love it.",
        gradientFrom: "from-green-500",
        gradientTo: "to-emerald-500"
    },
    {
        name: "Ana",
        username: "ana",
        quote: "I've never seen anything like this before. It's amazing. I love it.",
        gradientFrom: "from-orange-500",
        gradientTo: "to-yellow-500"
    },
    {
        name: "Pedro",
        username: "pedro",
        quote: "I'm at a loss for words. This is amazing. I love it.",
        gradientFrom: "from-blue-500",
        gradientTo: "to-cyan-500"
    },
    {
        name: "Laura",
        username: "laura",
        quote: "I'm at a loss for words. This is amazing. I love it.",
        gradientFrom: "from-red-500",
        gradientTo: "to-pink-500"
    },
    {
        name: "Roberto",
        username: "roberto",
        quote: "I'm at a loss for words. This is amazing. I love it.",
        gradientFrom: "from-purple-500",
        gradientTo: "to-indigo-500"
    }
];

export default function SocialMediaSection() {
    const { t, language } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const firstRow = testimonials.slice(0, 3);
    const secondRow = testimonials.slice(3);

    return (
        <section
            id="social"
            ref={sectionRef}
            className="section-spacing relative w-full bg-black overflow-hidden"
        >
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Two column layout - Text left, Orbits right */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

                    {/* Left side - Text content */}
                    <motion.div
                        className="flex-1 text-center lg:text-left max-w-xl lg:ml-auto"
                        style={{ marginLeft: '25px' }}
                        variants={titleVariants}
                    >
                        <p className="text-zinc-500 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4">
                            {t('social.subtitle')}
                        </p>
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
                            {t('social.title')}
                        </h2>
                        <p className="text-zinc-400 text-base sm:text-lg">
                            {t('social.description')}
                        </p>
                    </motion.div>

                    {/* Right side - Bento Grid for Social Media */}
                    <motion.div
                        className="flex-1 flex justify-center lg:justify-end w-full max-w-xl lg:max-w-2xl"
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
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="social-bento-icon">
                                    <Image src="/social_media/youtube.png" alt="YouTube" fill className="object-contain" quality={100} unoptimized />
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* COMMENTED OUT: Original Orbiting Circles Animation */}
                    {/* <motion.div
                        className="flex-1 flex justify-center lg:justify-end"
                        variants={orbitVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <div className="relative aspect-square h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] flex items-center justify-center scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100">
                            <OrbitingCircles iconSize={50} radius={180} duration={30} path={true}>
                                <a href="https://linkedin.com/company/apolo27" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-600 hover:scale-110 transition-transform duration-300">
                                    <FaLinkedinIn className="w-5 h-5 text-white" />
                                </a>
                                <a href="https://youtube.com/@apolo27" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-full bg-red-600 hover:scale-110 transition-transform duration-300">
                                    <FaYoutube className="w-5 h-5 text-white" />
                                </a>
                            </OrbitingCircles>
                            <OrbitingCircles iconSize={40} radius={110} reverse speed={1.5} duration={25} path={true}>
                                <a href="https://instagram.com/apolo27" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 hover:scale-110 transition-transform duration-300">
                                    <FaInstagram className="w-5 h-5 text-white" />
                                </a>
                                <a href="https://tiktok.com/@apolo27" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:scale-110 transition-transform duration-300">
                                    <FaTiktok className="w-5 h-5 text-white" />
                                </a>
                            </OrbitingCircles>
                            <OrbitingCircles iconSize={20} radius={40} duration={20} path={true}>
                                <div />
                            </OrbitingCircles>
                        </div>
                    </motion.div> */}
                </div>

                {/* Testimonials Section */}
                <motion.div
                    className="mt-16 lg:mt-24"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >

                    {/* First row - scrolling left */}
                    {/* <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                        <Marquee pauseOnHover className="[--duration:50s]">
                            {firstRow.map((testimonial, idx) => (
                                <TestimonialCard
                                    key={idx}
                                    name={testimonial.name}
                                    username={testimonial.username}
                                    quote={testimonial.quote}
                                    gradientFrom={testimonial.gradientFrom}
                                    gradientTo={testimonial.gradientTo}
                                />
                            ))}
                        </Marquee>
                    </div> */}

                    {/* Second row - scrolling right */}
                    {/* <div className="relative" style={{ marginTop: '28px' }}>
                        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                        <Marquee pauseOnHover reverse className="[--duration:45s]">
                            {secondRow.map((testimonial, idx) => (
                                <TestimonialCard
                                    key={idx}
                                    name={testimonial.name}
                                    username={testimonial.username}
                                    quote={testimonial.quote}
                                    gradientFrom={testimonial.gradientFrom}
                                    gradientTo={testimonial.gradientTo}
                                />
                            ))}
                        </Marquee>
                    </div> */}
                </motion.div>
            </motion.div>
        </section>
    );
}
