'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HallOfFamePage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
            <Header />

            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide mb-8">
                        HALL OF FAME
                    </h1>
                    <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto">
                        Acknowledging the legends who paved the way for our success.
                        <br />
                        <span className="text-sm mt-4 block text-zinc-600 uppercase tracking-widest">
                            (Coming Soon)
                        </span>
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
