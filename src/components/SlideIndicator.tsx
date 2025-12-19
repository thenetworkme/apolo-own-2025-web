'use client';

import { motion } from 'framer-motion';

interface SlideIndicatorProps {
    totalSlides: number;
    currentSlide: number;
    onSlideClick?: (index: number) => void;
}

export default function SlideIndicator({
    totalSlides,
    currentSlide,
    onSlideClick
}: SlideIndicatorProps) {
    return (
        <nav
            className="fixed right-4 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 sm:gap-5"
            aria-label="Slide navigation"
        >
            {Array.from({ length: totalSlides }, (_, index) => {
                const isActive = currentSlide === index;

                return (
                    <motion.button
                        key={index}
                        onClick={() => onSlideClick?.(index)}
                        className="relative flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: index * 0.1,
                            duration: 0.5
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={isActive ? 'true' : undefined}
                    >
                        {isActive ? (
                            <>
                                {/* Outer ring / aureola */}
                                <span className="absolute w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-orange-500/70" />
                                {/* Inner orange dot */}
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500" />
                            </>
                        ) : (
                            /* Inactive: simple white dot */
                            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/70 hover:bg-white transition-colors duration-300" />
                        )}
                    </motion.button>
                );
            })}
        </nav>
    );
}
