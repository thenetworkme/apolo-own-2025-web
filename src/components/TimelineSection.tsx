'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const timelineData = [
    {
        year: '2019',
        title: 'THE ORIGIN',
        text: 'Our journey began in 2019 with a groundbreaking achievement: becoming the first university division team from our country to compete in the NASA Rover Challenge.',
        image: '/stem/stem-1.webp',
    },
    {
        year: '2020',
        title: 'PERSEVERANCE IN ADVERSITY',
        text: 'Despite the challenges of the global pandemic, our resilience shone through. Lessons learned paved the way for our historic \'System Safety Award\' victory.',
        image: '/stem/stem-2.webp',
    },
    {
        year: '2022',
        title: 'EXPANDING OUR IMPACT',
        text: '2022 marked a turning point with the launch of our interactive \'STEM Tour,\' culminating in winning the prestigious \'Engagement Award.\'',
        image: '/stem/stem-3.webp',
    },
    {
        year: '2023',
        title: 'A HISTORIC YEAR',
        text: 'A year of Dominican dominance! Major improvements earned us the \'Most Improved\' and \'Team Spirit\' awards, cementing our place in history.',
        image: '/stem/stem-4.webp',
    },
    {
        year: '2024',
        title: 'SETTING THE STANDARD',
        text: 'Rising from 2023\'s successes, we reached new heights in 2024. Our hard work earned us the coveted \'Overall Award (2nd place)\' and the \'Spirit Award,\' showcasing excellence and unity.',
        image: '/stem/stem-1.webp',
    }
];

const year2025 = {
    year: '2025',
    left: {
        title: 'NEW FRONTIERS',
        text: 'The dawn of the Apolo Division marks a new chapter in 2025. With our sights set high, we\'re pushing the boundaries of innovation and teamwork.',
        image: '/stem/stem-2.webp'
    },
    right: {
        title: 'PIONEERING RC MISSIONS',
        text: 'Our RC team embarks on its first year with bold ideas and even bolder engineering. We\'re ready to make our mark in the world of remote-controlled exploration.',
        image: '/stem/stem-3.webp'
    }
};

const fadeUpVariant: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const TextCard = ({ title, text }: { title: string, text: string }) => (
    <div className="w-full h-full bg-zinc-950/95 backdrop-blur-md border border-zinc-800/80 !p-12 sm:!p-16 rounded-xl relative group transition-all duration-500 hover:border-red-500/50 hover:bg-zinc-900/95 flex flex-col justify-center items-center text-center shadow-lg">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600/50 rounded-tl-xl transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-red-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600/50 rounded-br-xl transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:border-red-500" />
        
        <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-6 group-hover:text-red-500 transition-colors duration-300 w-full">
            {title}
        </h4>
        <p className="text-zinc-300 leading-relaxed text-sm sm:text-base font-medium w-full max-w-sm mx-auto">
            {text}
        </p>
    </div>
);

const ImageCard = ({ title, image, onOpenModal }: { title: string, image: string, onOpenModal: (img: string) => void }) => (
    <div 
        onClick={() => onOpenModal(image)}
        className="w-full h-full min-h-[280px] md:min-h-[350px] relative rounded-xl overflow-hidden border border-zinc-800/80 group cursor-pointer shadow-lg bg-[#050505]"
    >
        <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none transition-opacity duration-500 group-hover:opacity-40" />
        {/* Minimalist Centered Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-14 h-14 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 ease-out shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </div>
        </div>
    </div>
);

const CombinedCard = ({ title, text, image, onOpenModal }: { title: string, text: string, image: string, onOpenModal: (img: string) => void }) => (
    <div className="w-full h-full bg-zinc-950/95 backdrop-blur-md border border-zinc-800/80 rounded-xl relative group transition-all duration-500 hover:border-red-500/50 hover:bg-zinc-900/95 flex flex-col overflow-hidden text-center items-center shadow-lg">
        <div className="!p-12 sm:!p-16 flex-grow flex flex-col items-center justify-center w-full">
            <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-6 group-hover:text-red-500 transition-colors duration-300 w-full">
                {title}
            </h4>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base font-medium w-full max-w-sm mx-auto">
                {text}
            </p>
        </div>
        <div 
            className="w-full relative h-[250px] sm:h-[300px] border-t border-zinc-800/80 overflow-hidden cursor-pointer bg-[#050505]"
            onClick={() => onOpenModal(image)}
        >
            <Image 
                src={image} 
                alt={title} 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
            />
            {/* Minimalist Centered Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <div className="w-14 h-14 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 ease-out shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </div>
    </div>
);

export default function TimelineSection() {
    const { language } = useLanguage();
    const [modalImage, setModalImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Scroll progress automation for the line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const lineOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

    return (
        <section className="relative w-full bg-black py-24 sm:py-32 overflow-hidden font-sans flex flex-col items-center">
            
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                
                {/* Header Block */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUpVariant}
                    className="flex flex-col items-center justify-center !mb-[20px] text-center w-full"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-[10px] sm:text-xs text-red-500 font-mono tracking-[0.3em] uppercase">
                            Legacy
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 uppercase tracking-tighter text-white text-center w-full">
                        MISSION APOLO 27
                    </h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-500 tracking-widest uppercase text-center w-full">
                        Our Timeline
                    </h3>
                </motion.div>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative w-full mx-auto flex flex-col items-center justify-center pb-12">
                    
                    {/* Dark Background Track Vertical Line (All Screens) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-zinc-900 -translate-x-1/2" />
                    
                    {/* Glowing Progress Vertical Line (All Screens) */}
                    <motion.div 
                        className="absolute left-1/2 top-0 w-[2px] bg-red-600 -translate-x-1/2 shadow-[0_0_15px_rgba(220,38,38,0.8)] z-0 origin-top"
                        style={{ height: lineHeight, opacity: lineOpacity }}
                    />

                    <div className="flex flex-col gap-12 md:gap-20 w-full max-w-5xl mx-auto relative z-10 py-10">
                        {timelineData.map((item, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div 
                                    key={item.year}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeUpVariant}
                                    className="relative flex flex-col md:flex-row items-center justify-between w-full group mt-8 md:mt-16"
                                >
                                    {/* Center Year Marker for ALL SCREENS (Guarantees perfect alignment) */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 lg:w-16 lg:h-16 w-14 h-14 rounded-full bg-black border-2 border-zinc-800 group-hover:border-red-500 transition-colors duration-500 items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                                        <span className="text-white font-bold text-base lg:text-lg tracking-widest group-hover:text-red-500 transition-colors duration-500">{item.year}</span>
                                    </div>

                                     <div className="md:hidden flex justify-center items-center mb-10 w-full relative z-30">
                                        <div className="w-16 h-16 rounded-full bg-black border-2 border-zinc-800 group-hover:border-red-500 transition-colors duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 z-20">
                                            <span className="text-white font-bold text-base tracking-widest">{item.year}</span>
                                        </div>
                                    </div>

                                    {/* === MOBILE ONLY LAYOUT === */}
                                    <div className="md:hidden flex flex-col w-full items-center justify-center gap-10 relative z-10 px-4">
                                        <div className="w-full max-w-[320px] sm:max-w-sm"><TextCard title={item.title} text={item.text} /></div>
                                        <div className="w-full max-w-[320px] sm:max-w-sm"><ImageCard title={item.title} image={item.image} onOpenModal={setModalImage} /></div>
                                    </div>

                                    {/* === DESKTOP ONLY LAYOUT === */}
                                    <div className="hidden md:flex w-full items-stretch justify-between relative z-10">
                                        <div className="w-[calc(50%-48px)] flex flex-col">
                                            {isEven ? <TextCard title={item.title} text={item.text} /> : <ImageCard title={item.title} image={item.image} onOpenModal={setModalImage} />}
                                        </div>
                                        <div className="w-[calc(50%-48px)] flex flex-col">
                                            {isEven ? <ImageCard title={item.title} image={item.image} onOpenModal={setModalImage} /> : <TextCard title={item.title} text={item.text} />}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* 2025 Split Layout */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeUpVariant}
                            className="relative flex flex-col md:flex-row justify-between items-center md:items-start w-full mt-12 md:mt-24 group"
                        >
                            {/* Desktop Center Year Marker */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-black border-2 border-zinc-800 group-hover:border-red-500 transition-colors duration-500 items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                                <span className="text-white font-black text-xl tracking-widest group-hover:text-red-500">{year2025.year}</span>
                            </div>

                            {/* Mobile Year Badge */}
                            <div className="md:hidden flex justify-center items-center mb-10 w-full relative z-30">
                                <div className="w-20 h-20 rounded-full bg-black border-2 border-zinc-800 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 z-20">
                                    <span className="text-white font-black text-xl tracking-widest">{year2025.year}</span>
                                </div>
                            </div>

                            {/* === MOBILE ONLY LAYOUT (2025) === */}
                            <div className="md:hidden flex flex-col w-full items-center justify-center gap-10 relative z-10 px-4">
                                <div className="w-full max-w-[320px] sm:max-w-sm">
                                    <CombinedCard title={year2025.left.title} text={year2025.left.text} image={year2025.left.image} onOpenModal={setModalImage} />
                                </div>
                                <div className="w-full max-w-[320px] sm:max-w-sm">
                                    <CombinedCard title={year2025.right.title} text={year2025.right.text} image={year2025.right.image} onOpenModal={setModalImage} />
                                </div>
                            </div>

                            {/* === DESKTOP ONLY LAYOUT (2025) === */}
                            <div className="hidden md:flex w-full items-start justify-between relative z-10">
                                <div className="w-[calc(50%-48px)] flex flex-col">
                                    <CombinedCard title={year2025.left.title} text={year2025.left.text} image={year2025.left.image} onOpenModal={setModalImage} />
                                </div>
                                <div className="w-[calc(50%-48px)] flex flex-col mt-24">
                                    <CombinedCard title={year2025.right.title} text={year2025.right.text} image={year2025.right.image} onOpenModal={setModalImage} />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>

            {/* Minimalist Image Modal Overlay */}
            <AnimatePresence>
                {modalImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out"
                        onClick={() => setModalImage(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-3xl md:max-w-4xl aspect-[4/3] md:aspect-video rounded-xl overflow-hidden shadow-2xl border border-zinc-800/80 cursor-default bg-[#050505]"
                            onClick={(e) => e.stopPropagation()} // Prevent click-through closing
                        >
                            <Image 
                                src={modalImage} 
                                alt="Expanded View" 
                                fill 
                                className="object-contain" 
                            />
                            
                            {/* Minimalist Close button top right inside modal */}
                            <button 
                                onClick={() => setModalImage(null)}
                                className="absolute top-4 right-4 bg-zinc-900/80 hover:bg-black border border-zinc-800 hover:border-red-500 transition-colors p-2 rounded-lg text-white z-[110]"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
