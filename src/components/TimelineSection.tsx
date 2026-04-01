'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { X, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const rowContainerVariant: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
};

const TextCard = ({ title, text }: { title: string, text: string }) => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950/95 via-zinc-950/90 to-zinc-900/80 backdrop-blur-md border border-zinc-800/60 !p-12 sm:!p-16 rounded-2xl relative group transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_8px_40px_rgba(220,38,38,0.08)] hover:-translate-y-1 flex flex-col justify-center items-center text-center shadow-lg">
        {/* Corner accents with animated glow */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-red-600/40 rounded-tl-2xl transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-red-500 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.3)]" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-red-600/40 rounded-br-2xl transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-red-500 group-hover:shadow-[0_0_12px_rgba(220,38,38,0.3)]" />

        <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-3 group-hover:text-red-500 transition-colors duration-300 w-full">
            {title}
        </h4>
        {/* Decorative separator */}
        <div className="w-8 h-[2px] bg-red-600/60 rounded-full mb-5 transition-all duration-500 group-hover:w-12 group-hover:bg-red-500" />
        <p className="text-zinc-400 leading-relaxed text-sm sm:text-base font-medium w-full max-w-sm mx-auto">
            {text}
        </p>
    </div>
);

const ImageCard = ({ title, image, onOpenModal }: { title: string, image: string, onOpenModal: (img: string) => void }) => (
    <div
        onClick={() => onOpenModal(image)}
        className="w-full h-full min-h-[280px] md:min-h-[350px] relative rounded-2xl overflow-hidden border border-zinc-800/60 group cursor-pointer shadow-lg bg-[#050505] transition-all duration-700 hover:border-red-500/30 hover:shadow-[0_8px_40px_rgba(220,38,38,0.12)] hover:-translate-y-1"
    >
        <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none transition-opacity duration-700 group-hover:opacity-60" />
        
        {/* Delicate Maximize icon hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-10">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-[2px] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] transform scale-50 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <Maximize size={22} className="text-white/80" strokeWidth={1} />
            </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-50" />
    </div>
);

const CombinedCard = ({ title, text, image, onOpenModal }: { title: string, text: string, image: string, onOpenModal: (img: string) => void }) => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-950/95 via-zinc-950/90 to-zinc-900/80 backdrop-blur-md border border-zinc-800/60 rounded-2xl relative group transition-all duration-700 hover:border-red-500/30 hover:shadow-[0_8px_40px_rgba(220,38,38,0.12)] hover:-translate-y-1 flex flex-col overflow-hidden text-center items-center shadow-lg">
        <div className="!p-12 sm:!p-16 flex-grow flex flex-col items-center justify-center w-full">
            <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-3 group-hover:text-red-500 transition-colors duration-300 w-full">
                {title}
            </h4>
            {/* Decorative separator */}
            <div className="w-8 h-[2px] bg-red-600/60 rounded-full mb-5 transition-all duration-500 group-hover:w-12 group-hover:bg-red-500" />
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base font-medium w-full max-w-sm mx-auto">
                {text}
            </p>
        </div>
        <div
            className="w-full relative h-[250px] sm:h-[300px] border-t border-zinc-800/40 overflow-hidden cursor-pointer bg-[#050505]"
            onClick={() => onOpenModal(image)}
        >
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
            />
            {/* Delicate Maximize icon hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-10">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black/5 backdrop-blur-[2px] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] transform scale-50 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <Maximize size={22} className="text-white/80" strokeWidth={1} />
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-40" />
        </div>
    </div>
);

export default function TimelineSection() {
    const { translations } = useLanguage();
    const timelineData = translations.timeline.items;
    const year2025 = translations.timeline.year2025;
    const [modalImage, setModalImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Collect all images for navigation
    const allImages = useMemo(() => {
        const imgs = timelineData.map((item: { image: string }) => item.image);
        imgs.push(year2025.left.image, year2025.right.image);
        return imgs;
    }, [timelineData, year2025]);

    // Body scroll lock & keyboard navigation
    useEffect(() => {
        if (modalImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [modalImage]);

    const navigateImage = useCallback((direction: 'prev' | 'next') => {
        if (!modalImage) return;
        const currentIndex = allImages.indexOf(modalImage);
        if (currentIndex === -1) return;
        const newIndex = direction === 'next'
            ? (currentIndex + 1) % allImages.length
            : (currentIndex - 1 + allImages.length) % allImages.length;
        setModalImage(allImages[newIndex]);
    }, [modalImage, allImages]);

    useEffect(() => {
        if (!modalImage) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setModalImage(null);
            if (e.key === 'ArrowRight') navigateImage('next');
            if (e.key === 'ArrowLeft') navigateImage('prev');
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [modalImage, navigateImage]);

    // Scroll progress automation for the line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const lineOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

    return (
        <section id="timeline" className="relative w-full bg-black py-24 sm:py-32 overflow-hidden font-[family-name:var(--font-poppins)] flex flex-col items-center">

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">

                {/* Header Block */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUpVariant}
                    className="timeline-header flex flex-col items-center justify-center mb-12 sm:mb-16 text-center w-full"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-[10px] sm:text-xs text-red-500 font-mono tracking-[0.3em] uppercase">
                            {translations.timeline.subtitle}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 uppercase tracking-tighter text-white text-center w-full">
                        {translations.timeline.title}
                    </h2>
                    <h3 className="text-sm sm:text-base md:text-lg font-mono font-light tracking-[0.3em] uppercase text-zinc-500 text-center w-full mt-2">
                        {translations.timeline.ourTimeline}
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
                        {timelineData.map((item: { year: string; title: string; text: string; image: string }, index: number) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={item.year}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={rowContainerVariant}
                                    className="relative flex flex-col md:flex-row items-center justify-between w-full group mt-8 md:mt-16"
                                >
                                    {/* Center Year Marker for ALL SCREENS (Guarantees perfect alignment) */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 lg:w-16 lg:h-16 w-14 h-14 rounded-full bg-black border-2 border-zinc-800 group-hover:border-red-500 transition-colors duration-500 items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                                        <span className="text-white font-[family-name:var(--font-poppins)] font-bold text-xl lg:text-2xl group-hover:text-red-500 transition-colors duration-500">{item.year}</span>
                                    </div>

                                    <div className="md:hidden flex justify-center items-center mb-10 w-full relative z-30">
                                        <div className="w-16 h-16 rounded-full bg-black border-2 border-zinc-800 group-hover:border-red-500 transition-colors duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 z-20">
                                            <span className="text-white font-[family-name:var(--font-poppins)] font-bold text-xl">{item.year}</span>
                                        </div>
                                    </div>

                                    {/* === MOBILE ONLY LAYOUT === */}
                                    <div className="md:hidden flex flex-col w-full items-center justify-center gap-10 relative z-10 px-4">
                                        <motion.div variants={fadeUpVariant} className="w-full max-w-[320px] sm:max-w-sm"><TextCard title={item.title} text={item.text} /></motion.div>
                                        <motion.div variants={fadeUpVariant} className="w-full max-w-[320px] sm:max-w-sm"><ImageCard title={item.title} image={item.image} onOpenModal={setModalImage} /></motion.div>
                                    </div>

                                    {/* === DESKTOP ONLY LAYOUT === */}
                                    <div className="hidden md:flex w-full items-stretch justify-between relative z-10">
                                        <motion.div variants={slideFromLeft} className="w-[calc(50%-48px)] flex flex-col">
                                            {isEven ? <TextCard title={item.title} text={item.text} /> : <ImageCard title={item.title} image={item.image} onOpenModal={setModalImage} />}
                                        </motion.div>
                                        <motion.div variants={slideFromRight} className="w-[calc(50%-48px)] flex flex-col">
                                            {isEven ? <ImageCard title={item.title} image={item.image} onOpenModal={setModalImage} /> : <TextCard title={item.title} text={item.text} />}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* 2025 Split Layout */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={rowContainerVariant}
                            className="relative flex flex-col md:flex-row justify-between items-center md:items-start w-full mt-12 md:mt-24 group"
                        >
                            {/* Desktop Center Year Marker */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-black border-2 border-zinc-800 group-hover:border-red-500 transition-colors duration-500 items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                                <span className="text-white font-[family-name:var(--font-poppins)] font-bold text-3xl group-hover:text-red-500">{year2025.year}</span>
                            </div>

                            {/* Mobile Year Badge */}
                            <div className="md:hidden flex justify-center items-center mb-10 w-full relative z-30">
                                <div className="w-20 h-20 rounded-full bg-black border-2 border-zinc-800 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 z-20">
                                    <span className="text-white font-[family-name:var(--font-poppins)] font-bold text-3xl">{year2025.year}</span>
                                </div>
                            </div>

                            {/* === MOBILE ONLY LAYOUT (2025) === */}
                            <div className="md:hidden flex flex-col w-full items-center justify-center gap-10 relative z-10 px-4">
                                <motion.div variants={fadeUpVariant} className="w-full max-w-[320px] sm:max-w-sm">
                                    <CombinedCard title={year2025.left.title} text={year2025.left.text} image={year2025.left.image} onOpenModal={setModalImage} />
                                </motion.div>
                                <motion.div variants={fadeUpVariant} className="w-full max-w-[320px] sm:max-w-sm">
                                    <CombinedCard title={year2025.right.title} text={year2025.right.text} image={year2025.right.image} onOpenModal={setModalImage} />
                                </motion.div>
                            </div>

                            {/* === DESKTOP ONLY LAYOUT (2025) === */}
                            <div className="hidden md:flex w-full items-start justify-between relative z-10">
                                <motion.div variants={slideFromLeft} className="w-[calc(50%-48px)] flex flex-col">
                                    <CombinedCard title={year2025.left.title} text={year2025.left.text} image={year2025.left.image} onOpenModal={setModalImage} />
                                </motion.div>
                                <motion.div variants={slideFromRight} className="w-[calc(50%-48px)] flex flex-col mt-24">
                                    <CombinedCard title={year2025.right.title} text={year2025.right.text} image={year2025.right.image} onOpenModal={setModalImage} />
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>

            {/* Enhanced Image Modal */}
            <AnimatePresence>
                {modalImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-8 cursor-zoom-out"
                        onClick={() => setModalImage(null)}
                    >
                        {/* Navigation Arrow - Previous */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[120] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-red-500/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Navigation Arrow - Next */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[120] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-700/50 hover:border-red-500/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                mass: 0.8
                            }}
                            className="relative w-[95vw] h-[75vh] md:max-w-6xl cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="relative w-full h-full z-10">
                                <Image
                                    src={modalImage}
                                    alt="Expanded View"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                />
                            </div>

                            {/* Close button - consistent with other modals */}
                            <button
                                onClick={() => setModalImage(null)}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[130] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900/70 hover:bg-red-600/90 border border-zinc-700/50 hover:border-red-500 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                aria-label="Close"
                            >
                                <X size={18} strokeWidth={2} />
                            </button>

                            {/* Image counter indicator */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[130] px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-zinc-800/50">
                                <span className="text-zinc-400 text-xs font-mono tracking-wider">
                                    {allImages.indexOf(modalImage) + 1} / {allImages.length}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
