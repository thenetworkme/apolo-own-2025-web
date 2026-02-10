'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';

// --- Types ---
interface RoverSpec {
    id: string;
    name: string;
    year: string;
    specs: {
        lead: string;
        material: string;
        weight: string;
        drive?: string;
        wheels?: string;
    };
    awards: {
        title: string;
        type: 'featherweight' | 'design' | 'performance' | 'legacy';
    }[];
    image: string;
    description: string;
}

// --- Components ---

const SciFiCard = ({ children, className, noBorder = false }: { children: React.ReactNode; className?: string; noBorder?: boolean }) => (
    <div className={cn("relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800", className, noBorder && "border-none bg-transparent")}>
        {!noBorder && (
            <>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500/50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500/50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500/50" />
            </>
        )}
        {children}
    </div>
);

// --- Page ---

export default function HallOfFamePage() {
    const { language } = useLanguage();
    const [activeRover, setActiveRover] = useState<string>('mk-v');

    const content = {
        es: {
            header_title: "ARCHIVO DEL EQUIPO APOLO 27",
            nav_mission: "BITÁCORA DE MISIÓN",
            nav_database: "BASE DE DATOS ROVER",
            nav_roster: "LISTA DEL EQUIPO",
            search_placeholder: "BUSCAR ARCHIVO :",
            access: "ACCESO",
            authorized: "Sólo Personal Autorizado",
            page_title: "LEGADO DE INGENIERÍA",
            page_subtitle: "Especificaciones de diseño integrales y registros de rendimiento de misión para el Human Exploration Rover Challenge (HERC).",
            current_gen: "Gen Actual",
            spec_id: "ID-ESPEC",
            fig_label: "ELEVACIÓN LATERAL",
            label_lead: "Líder de Proyecto",
            label_weight: "Peso Total",
            label_material: "Material del Chasis",
            label_drive: "Transmisión",
            label_wheels: "Tipo de Rueda",
            label_awards: "Premios y Honores NASA",
            view_blueprints: "Ver Planos Completos",
            footer_init: "INICIALIZACIÓN DE ARCHIVO",
            rovers: [
                {
                    id: 'mk-v',
                    name: 'ROVER MK. V',
                    year: '2024',
                    specs: {
                        lead: 'J. Ramirez, Dept. Ing. Mec.',
                        material: 'Aluminio 6061-T6',
                        weight: '145 lbs (Clase Ligera)',
                    },
                    awards: [
                        { title: 'Premio Peso Ligero', type: 'featherweight' },
                        { title: 'Innovación en Diseño', type: 'design' },
                    ],
                    image: '/rovers/rover_rc_blueprint.png',
                    description: 'Especificaciones completas de diseño y registros de rendimiento de misión.',
                },
                {
                    id: 'mk-iv',
                    name: 'ROVER MK. IV',
                    year: '2023',
                    specs: {
                        lead: 'Dr. A. Chen, Asesor Facultativo',
                        material: 'Híbrido Fibra de Carbono',
                        weight: '155 lbs',
                        drive: 'Transmisión Variable'
                    },
                    awards: [
                        { title: 'Top 10 Global', type: 'performance' },
                    ],
                    image: '/rovers/rover_hp_blueprint.png',
                    description: 'Fase de prototipado avanzado de chasis compuesto.',
                },
                {
                    id: 'mk-iii',
                    name: 'ROVER MK. III',
                    year: '2022',
                    specs: {
                        lead: 'S. Williams, Diseño Senior',
                        material: 'Acero Chromoly 4130',
                        weight: '168 lbs',
                        wheels: 'No Neumática, 20"'
                    },
                    awards: [
                        { title: 'Equipo Más Mejorado', type: 'legacy' },
                    ],
                    image: '/rovers/rover_hp_blueprint.png',
                    description: 'Integración fundamental de sistemas de telemetría.',
                }
            ] as RoverSpec[]
        },
        en: {
            header_title: "APOLO 27 TEAM ARCHIVE",
            nav_mission: "MISSION LOG",
            nav_database: "ROVER DATABASE",
            nav_roster: "TEAM ROSTER",
            search_placeholder: "SEARCH ARCHIVE :",
            access: "ACCESS",
            authorized: "Authorized Personnel Only",
            page_title: "ENGINEERING LEGACY",
            page_subtitle: "Comprehensive design specifications and mission performance records for the Human Exploration Rover Challenge (HERC).",
            current_gen: "Current Gen",
            spec_id: "SPEC-ID",
            fig_label: "SIDE ELEVATION",
            label_lead: "Project Lead",
            label_weight: "Total Weight",
            label_material: "Chassis Material",
            label_drive: "Drivetrain",
            label_wheels: "Wheel Type",
            label_awards: "NASA Awards & Honors",
            view_blueprints: "View Full Blueprints",
            footer_init: "ARCHIVE INITIALIZATION",
            rovers: [
                {
                    id: 'mk-v',
                    name: 'ROVER MK. V',
                    year: '2024',
                    specs: {
                        lead: 'J. Ramirez, Dept. of Mech Eng.',
                        material: 'Aluminum 6061-T6',
                        weight: '145 lbs (Lightweight Class)',
                    },
                    awards: [
                        { title: 'Featherweight Award', type: 'featherweight' },
                        { title: 'Design Innovation', type: 'design' },
                    ],
                    image: '/rovers/rover_rc_blueprint.png',
                    description: 'Comprehensive design specifications and mission performance records.',
                },
                {
                    id: 'mk-iv',
                    name: 'ROVER MK. IV',
                    year: '2023',
                    specs: {
                        lead: 'Dr. A. Chen, Faculty Advisor',
                        material: 'Carbon Fiber Hybrid',
                        weight: '155 lbs',
                        drive: 'Variable Belt Drive'
                    },
                    awards: [
                        { title: 'Global Top 10 Finish', type: 'performance' },
                    ],
                    image: '/rovers/rover_hp_blueprint.png',
                    description: 'Advanced composite chassis prototyping phase.',
                },
                {
                    id: 'mk-iii',
                    name: 'ROVER MK. III',
                    year: '2022',
                    specs: {
                        lead: 'S. Williams, Senior Design',
                        material: 'Chromoly Steel 4130',
                        weight: '168 lbs',
                        wheels: 'Non-Pneumatic, 20"'
                    },
                    awards: [
                        { title: 'Most Improved Team', type: 'legacy' },
                    ],
                    image: '/rovers/rover_hp_blueprint.png',
                    description: ' foundational telemetry systems integration.',
                }
            ] as RoverSpec[]
        }
    };

    const t = content[language];

    return (
        <main className="min-h-screen bg-[#050505] text-white font-mono selection:bg-red-500/30 flex flex-col">
            {/* Grid Background */}
            <div
                className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #202020 1px, transparent 1px), linear-gradient(to bottom, #202020 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <Header />

            {/* Header Spacer - Constant Height */}
            <div className="h-32 md:h-40 w-full shrink-0" aria-hidden="true" />

            {/* Main Content Wrapper - Full Width but Centered Children */}
            <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex-grow flex flex-col items-center">

                {/* Top Nav Bar (Cosmetic) - Constrained Width */}
                <div className="w-full max-w-[1200px] flex flex-col">
                    <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-4 mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-600 px-2 py-1 text-black font-bold text-xs uppercase">{t.header_title}</div>
                            <span className="text-red-500 text-xs">V.4.0-R</span>
                        </div>
                        <div className="flex gap-6 text-[10px] sm:text-xs tracking-widest text-zinc-500">

                            <span className="text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] cursor-pointer uppercase">{t.nav_database}</span>
                            <span className="hover:text-red-400 cursor-pointer transition-colors uppercase">{t.nav_roster}</span>
                        </div>
                        <div className="flex items-center gap-2">

                            <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 transition-colors font-bold tracking-wider uppercase">
                                {t.access}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center">

                    {/* Main Content - Rover Database (Centered Width) */}
                    <div className="w-full max-w-4xl">
                        <div className="mb-8 border-l-4 border-red-600 pl-4 py-2">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                                <span className="text-[10px] bg-red-900/30 text-red-400 px-1 py-0.5 uppercase tracking-widest">{t.authorized}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 uppercase">
                                {t.page_title}
                            </h1>
                            <p className="text-zinc-400 font-sans max-w-2xl">
                                {t.page_subtitle}
                            </p>
                        </div>

                        {/* Timeline / Selector */}
                        <div className="relative border-l border-zinc-800 pl-8 ml-3 space-y-12">

                            {t.rovers.map((rover, index) => (
                                <div key={rover.id} className="relative group">
                                    {/* Timeline Node */}
                                    <div
                                        className={cn(
                                            "absolute -left-[39px] top-6 w-5 h-5 rounded-full border-4 border-[#050505] transition-colors duration-300",
                                            activeRover === rover.id ? "bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "bg-zinc-800 group-hover:bg-zinc-700"
                                        )}
                                        onClick={() => setActiveRover(rover.id)}
                                    />

                                    {/* Card Header (Visible always) */}
                                    <div
                                        onClick={() => setActiveRover(rover.id)}
                                        className="cursor-pointer mb-2 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            {index === 0 && <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 font-bold uppercase">{t.current_gen}</span>}
                                            <h3 className={cn("text-xl font-bold uppercase tracking-wide transition-colors", activeRover === rover.id ? "text-white" : "text-zinc-500")}>
                                                {rover.name} <span className="text-zinc-600">({rover.year})</span>
                                            </h3>
                                        </div>
                                        <div className="text-[10px] text-zinc-600 font-mono tracking-widest">
                                            {t.spec_id}: HERC-2{4 - index}-A
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {activeRover === rover.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <SciFiCard className="grid grid-cols-1 md:grid-cols-5 bg-zinc-900/40 p-0 overflow-hidden">

                                                    {/* Image Section */}
                                                    <div className="md:col-span-2 relative h-64 md:h-auto bg-red-900/5 min-h-[300px] border-r border-zinc-800">
                                                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" /> {/* Reuse global grid if available, simplistic fallback */}
                                                        <div className="relative w-full h-full flex items-center justify-center p-8">
                                                            <div className="relative w-full h-full">
                                                                <Image
                                                                    src={rover.image}
                                                                    alt={rover.name}
                                                                    fill
                                                                    className="object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                                                                />
                                                            </div>
                                                            <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-red-500/50 font-mono">
                                                                FIG 1.{index + 1}: {t.fig_label}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Specs Section */}
                                                    <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                                                        <div className="grid grid-cols-2 gap-8 mb-8">
                                                            <div>
                                                                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t.label_lead}</div>
                                                                <div className="text-sm text-zinc-200 font-mono">{rover.specs.lead}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t.label_weight}</div>
                                                                <div className="text-sm text-white font-bold">{rover.specs.weight}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t.label_material}</div>
                                                                <div className="text-sm text-zinc-300">{rover.specs.material}</div>
                                                            </div>
                                                            {rover.specs.drive && (
                                                                <div>
                                                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t.label_drive}</div>
                                                                    <div className="text-sm text-zinc-300">{rover.specs.drive}</div>
                                                                </div>
                                                            )}
                                                            {rover.specs.wheels && (
                                                                <div>
                                                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t.label_wheels}</div>
                                                                    <div className="text-sm text-zinc-300">{rover.specs.wheels}</div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="mt-auto border-t border-zinc-800 pt-6">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <span className="text-red-500 text-xs">🏆</span>
                                                                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{t.label_awards}</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {rover.awards.map((award, i) => (
                                                                    <span key={i} className={cn(
                                                                        "text-xs px-2 py-1 border",
                                                                        award.type === 'featherweight' ? "border-yellow-500/30 text-yellow-500 bg-yellow-500/5" :
                                                                            award.type === 'design' ? "border-red-500/30 text-red-500 bg-red-500/5" :
                                                                                "border-zinc-700 text-zinc-400 bg-zinc-800/50"
                                                                    )}>
                                                                        {award.title}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="mt-8 flex justify-end">
                                                            <button className="text-[10px] text-red-500 hover:text-red-400 font-bold tracking-widest flex items-center gap-1 uppercase transition-colors">
                                                                {t.view_blueprints} <span>→</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </SciFiCard>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-24 pb-8 border-t border-zinc-900 pt-8 opacity-30 text-[10px] font-mono">
                    {t.footer_init} // 2026 • SYSTEM V.4.0-R
                </div>

            </div>

            <Footer />
        </main>
    );
}
