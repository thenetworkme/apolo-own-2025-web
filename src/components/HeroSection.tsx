'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Video Background - Mars (scaled to hide watermark) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-[1.15]"
                >
                    <source src="/videos/Marte1.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
            </div>

            {/* Astronaut - Responsive sizing */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            >
                <div className="relative w-[80vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] aspect-[3/4] animate-float mt-[-5vh] md:mt-[-10vh]">
                    <Image
                        src="/images/calidad_astronaut.png"
                        alt="Astronaut floating in space"
                        fill
                        className="object-contain mix-blend-screen"
                        style={{
                            filter: 'brightness(1.2) contrast(1.15)'
                        }}
                        priority
                    />
                </div>
            </motion.div>

            {/* Content Container - CENTERED and responsive */}
            <div className="relative z-20 h-full w-full flex items-center justify-center px-4 sm:px-6 md:px-8">

                {/* Main Text Block - Responsive text sizes */}
                <div className="flex flex-col items-start">
                    {/* Anniversary Label */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-orange-500 text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.25em] uppercase mb-1 sm:mb-2"
                    >
                        50th Anniversary 1969-2019
                    </motion.p>

                    {/* "Return to the" Line */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-baseline gap-2 sm:gap-3 md:gap-4"
                    >
                        <span
                            className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-8xl italic"
                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                        >
                            Return
                        </span>
                        <span className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-light">
                            to the
                        </span>
                    </motion.div>

                    {/* MOON Title */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-white text-[18vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] font-bold leading-[0.8] tracking-tight select-none relative z-30 ml-[-0.03em]"
                        style={{
                            fontFamily: 'Arial Black, Arial, sans-serif',
                            textShadow: '0 0 60px rgba(255, 255, 255, 0.3), 0 0 100px rgba(100, 150, 255, 0.15)'
                        }}
                    >
                        MOON
                    </motion.h1>

                    {/* Description Text - Responsive */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl text-gray-300 text-[10px] sm:text-xs md:text-sm leading-relaxed mt-6 sm:mt-8 md:mt-12"
                    >
                        <p>
                            Fifty years ago astronauts walked on the moon for the first time. Apollo 11's success just 66 years
                            after the Wright brothers' first flight—showcased humankind's moxie and ingenuity.
                            Now the moon is in our sights again. For a generation that will test where science meets profit.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
