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
            transition={{ duration: 0.8, delay: 1 }}
            className=""
        >
            {/* Frame/Bracket Container */}
            <div
                className="relative inline-flex items-center backdrop-blur-sm bg-black/20 rounded-lg px-4 py-3"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
            >
                {/* Left Bracket */}
                <div className="flex flex-col justify-between h-12 sm:h-14 md:h-16 mr-3 sm:mr-4">
                    <div className="w-3 sm:w-4 h-[2px] bg-white/60"></div>
                    <div className="w-[2px] h-full bg-white/60 absolute left-0"></div>
                    <div className="w-3 sm:w-4 h-[2px] bg-white/60"></div>
                </div>

                {/* Countdown Content */}
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-2">
                    {/* Days */}
                    <div className="flex flex-col items-center">
                        <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wider">
                            {formatNumber(timeLeft.days)}
                        </span>
                        <span className="text-white/50 text-[8px] sm:text-[10px] md:text-xs tracking-widest mt-1">
                            {currentLabels.days}
                        </span>
                    </div>

                    <span className="text-white/40 text-lg sm:text-xl md:text-2xl font-light">:</span>

                    {/* Hours */}
                    <div className="flex flex-col items-center">
                        <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wider">
                            {formatNumber(timeLeft.hours)}
                        </span>
                        <span className="text-white/50 text-[8px] sm:text-[10px] md:text-xs tracking-widest mt-1">
                            {currentLabels.hours}
                        </span>
                    </div>

                    <span className="text-white/40 text-lg sm:text-xl md:text-2xl font-light">:</span>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                        <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wider">
                            {formatNumber(timeLeft.minutes)}
                        </span>
                        <span className="text-white/50 text-[8px] sm:text-[10px] md:text-xs tracking-widest mt-1">
                            {currentLabels.minutes}
                        </span>
                    </div>

                    <span className="text-white/40 text-lg sm:text-xl md:text-2xl font-light">:</span>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                        <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wider">
                            {formatNumber(timeLeft.seconds)}
                        </span>
                        <span className="text-white/50 text-[8px] sm:text-[10px] md:text-xs tracking-widest mt-1">
                            {currentLabels.seconds}
                        </span>
                    </div>
                </div>

                {/* Right Bracket */}
                <div className="flex flex-col justify-between h-12 sm:h-14 md:h-16 ml-3 sm:ml-4 relative">
                    <div className="w-3 sm:w-4 h-[2px] bg-white/60"></div>
                    <div className="w-[2px] h-full bg-white/60 absolute right-0"></div>
                    <div className="w-3 sm:w-4 h-[2px] bg-white/60"></div>
                </div>
            </div>
        </motion.div>
    );
}
