'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Target date: April 15, 2026
const TARGET_DATE = new Date('2026-04-15T00:00:00');

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer() {
    const { language } = useLanguage();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const calculateTimeLeft = (): TimeLeft => {
            const now = new Date();
            const difference = TARGET_DATE.getTime() - now.getTime();

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    const labels = {
        es: { days: 'DÍAS', hours: 'HRS', minutes: 'MIN', seconds: 'SEG' },
        en: { days: 'DAYS', hours: 'HRS', minutes: 'MIN', seconds: 'SEC' },
    };

    const currentLabels = labels[language];

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full"
        >
            {/* Clean Container - No background, full width */}
            <div
                className="relative w-full flex items-center justify-between"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
                {/* Countdown Content - Much Larger */}
                <div className="flex items-center justify-between w-full">
                    {/* Days */}
                    <div className="flex flex-col items-center">
                        <span className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider">
                            {formatNumber(timeLeft.days)}
                        </span>
                        <span className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg tracking-widest mt-2 sm:mt-3">
                            {currentLabels.days}
                        </span>
                    </div>

                    <span className="text-white/30 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light">:</span>

                    {/* Hours */}
                    <div className="flex flex-col items-center">
                        <span className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider">
                            {formatNumber(timeLeft.hours)}
                        </span>
                        <span className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg tracking-widest mt-2 sm:mt-3">
                            {currentLabels.hours}
                        </span>
                    </div>

                    <span className="text-white/30 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light">:</span>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                        <span className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider">
                            {formatNumber(timeLeft.minutes)}
                        </span>
                        <span className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg tracking-widest mt-2 sm:mt-3">
                            {currentLabels.minutes}
                        </span>
                    </div>

                    <span className="text-white/30 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light">:</span>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                        <span className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider">
                            {formatNumber(timeLeft.seconds)}
                        </span>
                        <span className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg tracking-widest mt-2 sm:mt-3">
                            {currentLabels.seconds}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
