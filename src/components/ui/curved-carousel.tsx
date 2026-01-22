"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, useSpring, MotionValue, PanInfo } from "motion/react"
import { cn } from "@/lib/utils"

interface CurvedCarouselProps {
    items: { image: string; text: string }[]
    bend?: number
    textColor?: string
    className?: string
    itemWidth?: number
    gap?: number
}

// Helper to calculate the curve
// We simulate a large circle.
// x is the distance from the center of the viewport.
// y is the vertical displacement.
const useCurve = (x: MotionValue<number>, totalWidth: number, bend: number, itemWidth: number) => {
    // Use a simple parabola for more predictable "bend" control
    // y = x^2 / k
    // We want y to be 'bend' when x is 'width/2'

    const width = typeof window !== 'undefined' ? window.innerWidth : 1000
    // Standardize the scale. Let's say we want 'bend' roughly equal to the pixel drop at the screen edge.

    const y = useTransform(x, (currentX) => {
        // Parabolic curve: y = A * x^2
        // If we want y=bend at x=width/2:
        // bend = A * (width/2)^2  =>  A = bend / (width/2)^2
        // But we also want it to look good on all screens.

        // Let's use a fixed reference width avoid excessive changes on resize, 
        // or just rely on the passed bend to be tuned.

        // Using a circular path is mathematically "purer" for rotation
        // R^2 = x^2 + (R-y)^2

        // Let's go with the Reference Image Look:
        // It looks like a segment of a circle.
        // If bend is high, radius is small.

        // Heuristic: bend = 3 in the original was abstract. 
        // Let's interpret 'bend' property as: degrees of rotation per pixel? Or just a strength factor.
        // Let's try to match the "3" from the example but make it stronger.

        // Let's just hardcode a stronger curve for now based on the image:
        // The image shows about 30-45 degrees rotation at the edges.

        // Let's calculate Radius such that at X = 500 (approx edge), Rotation is ~30deg.
        // sin(30) = 0.5 = X / R => R = 500 / 0.5 = 1000.

        const R = 1500 / Math.abs(bend) // If bend is 1, R=1500. If bend=3, R=500.

        const clampedX = Math.max(-R, Math.min(R, currentX));
        let deltaY = R - Math.sqrt(R * R - clampedX * clampedX);

        if (bend < 0) deltaY = -deltaY;

        return deltaY;
    })

    const rotate = useTransform(x, (currentX) => {
        const R = 1500 / Math.abs(bend)
        const clampedX = Math.max(-R, Math.min(R, currentX));
        let angle = Math.asin(clampedX / R) * (180 / Math.PI);
        if (bend < 0) angle = -angle;
        return -angle; // Invert rotation to match usual "wheel" feel
    })

    return { y, rotate }
}

const Card = ({
    item,
    index,
    x,
    baseWidth,
    gap,
    bend,
    textColor
}: {
    item: { image: string; text: string };
    index: number;
    x: MotionValue<number>;
    baseWidth: number;
    gap: number;
    bend: number;
    textColor: string;
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [elementX, setElementX] = useState(0)

    // The absolute position of this card in the track (dynamic based on Drag)
    // But we need the position "on screen" relative to center.
    // The track moves by 'x'. The card is at 'index * (baseWidth + gap)' inside the track.
    // So Global X = x + index * (baseWidth + gap)

    // We want to center the carousel initially.
    // Let's assume the track starts centered.

    const positionOnScreen = useTransform(x, (latestX) => {
        return latestX + index * (baseWidth + gap)
    })

    const { y, rotate } = useCurve(positionOnScreen, 0, bend, baseWidth)

    return (
        <motion.div
            ref={ref}
            style={{
                y,
                rotate,
                width: baseWidth,
                position: "absolute",
                left: index * (baseWidth + gap),
                // Center the transform origin for proper rotation
                transformOrigin: "center bottom",
            }}
            className="relative aspect-[4/5] shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10"
        >
            <img
                src={item.image}
                alt={item.text}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
                <span
                    style={{ color: textColor }}
                    className="text-xl font-bold tracking-wider"
                >
                    {item.text}
                </span>
            </div>
        </motion.div>
    )
}

export default function CurvedCarousel({
    items,
    bend = 3,
    textColor = "#ffffff",
    className,
    itemWidth = 300,
    gap = 20
}: CurvedCarouselProps) {
    // Repeat items to give a sense of length/infinite feel
    const repeatedItems = [...items, ...items, ...items];

    const x = useMotionValue(0)
    const draggedX = useMotionValue(0)

    // Smooth out the drag
    const springX = useSpring(x, { stiffness: 400, damping: 90 })

    const containerRef = useRef<HTMLDivElement>(null)

    // Center initially
    useEffect(() => {
        if (containerRef.current) {
            // Start in the middle of the list
            const totalW = repeatedItems.length * (itemWidth + gap)
            // Center: -totalW / 2 + viewportWidth / 2
            // Actually, let's just start at 0 and let user drag? 
            // Or start in the middle set of items.
            const startX = - (items.length * (itemWidth + gap)) // Offset by one full set
            x.set(startX)
        }
    }, [items.length, itemWidth, gap])

    const onDragEnd = (event: any, info: PanInfo) => {
        // Add standard inertia or snap logic here if desired
        // For now default drag inertia is okay, let's just not snap.
    }

    // Calculate total width for constraints
    // We want to allow dragging comfortably. 
    // Let's allow dragging from slightly before start to slightly after end.
    const totalContentWidth = repeatedItems.length * (itemWidth + gap)

    // To simulate "infinite" effectively without complex layout shifts (which framer properties support but are harder to set up quickly),
    // we just provide a long list.

    return (
        <div
            ref={containerRef}
            className={cn("w-full h-[600px] relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing", className)}
            // Mask for fade effect on edges
            style={{
                maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            }}
        >
            {/* Track */}
            <motion.div
                drag="x"
                _dragX={x} // Internal framer hack? No, use style x.
                style={{ x: springX }}
                onDrag={(e, info) => {
                    x.set(x.get() + info.delta.x)
                }}
                onDragEnd={onDragEnd}
                className="absolute flex items-center h-full"
                // Constraints? Maybe loosely constrained
                dragConstraints={{
                    left: -totalContentWidth + window.innerWidth / 2 + itemWidth,
                    right: window.innerWidth / 2 - itemWidth
                }}
            >
                {/* We need a relative container for the absolute items to position correctly */}
                <div className="relative h-full" style={{ width: totalContentWidth }}>
                    {repeatedItems.map((item, index) => (
                        <Card
                            key={index}
                            item={item}
                            index={index}
                            x={springX} // Pass the spring value for smoother updates
                            baseWidth={itemWidth}
                            gap={gap}
                            bend={bend} // We might need to tune this scaler 
                            textColor={textColor}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
