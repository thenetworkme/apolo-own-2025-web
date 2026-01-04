'use client';

import { Globe } from '@/components/ui/globe';

export default function Footer() {
    return (
        <section className="relative w-full bg-black overflow-hidden py-12 sm:py-16">
            {/* Globe Section - Centered and Larger */}
            <div className="relative z-10 flex items-center justify-center">
                <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full max-w-[700px]">
                    <Globe
                        config={{
                            width: 1000,
                            height: 1000,
                            onRender: () => { },
                            devicePixelRatio: 2,
                            phi: 0,
                            theta: 0.3,
                            dark: 1,
                            diffuse: 0.4,
                            mapSamples: 16000,
                            mapBrightness: 6,
                            baseColor: [0.3, 0.3, 0.3],
                            markerColor: [0.9, 0.3, 0.2],
                            glowColor: [0.5, 0.1, 0.1],
                            markers: [
                                // Dominican Republic (main marker)
                                { location: [18.7357, -70.1627], size: 0.15 },
                                // NASA Huntsville, Alabama
                                { location: [34.7304, -86.5861], size: 0.1 },
                            ]
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
