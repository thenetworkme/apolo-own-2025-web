'use client';

import { cn } from '@/lib/utils';

interface TestimonialCardProps {
    name: string;
    username: string;
    quote: string;
    gradientFrom?: string;
    gradientTo?: string;
    className?: string;
}

export default function TestimonialCard({
    name,
    username,
    quote,
    gradientFrom = 'from-pink-500',
    gradientTo = 'to-violet-500',
    className,
}: TestimonialCardProps) {
    return (
        <div
            className={cn(
                'relative flex flex-col rounded-2xl',
                'bg-zinc-900/90 border border-zinc-800/50',
                'w-[300px] sm:w-[320px] shrink-0',
                className
            )}
            style={{ padding: '24px', gap: '16px' }}
        >
            {/* Header with avatar and name */}
            <div className="flex items-center gap-3">
                {/* Gradient Avatar */}
                <div
                    className={cn(
                        'w-11 h-11 rounded-full bg-gradient-to-br',
                        gradientFrom,
                        gradientTo
                    )}
                />
                <div>
                    <p className="text-white text-sm font-semibold">{name}</p>
                    <p className="text-zinc-500 text-xs">@{username}</p>
                </div>
            </div>

            {/* Quote */}
            <p className="text-zinc-300 text-sm leading-relaxed">
                {quote}
            </p>
        </div>
    );
}
