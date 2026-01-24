'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import esTranslations from '@/locales/es.json';
import enTranslations from '@/locales/en.json';

type Language = 'es' | 'en';
type Translations = typeof esTranslations;

interface LanguageContextType {
    language: Language;
    translations: Translations;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Translations> = {
    es: esTranslations,
    en: enTranslations,
};

// List of Spanish-speaking country codes
const SPANISH_SPEAKING_LOCALES = [
    'es', 'es-ES', 'es-MX', 'es-AR', 'es-CO', 'es-CL', 'es-PE', 'es-VE',
    'es-EC', 'es-GT', 'es-CU', 'es-BO', 'es-DO', 'es-HN', 'es-PY', 'es-SV',
    'es-NI', 'es-CR', 'es-PA', 'es-UY', 'es-PR', 'es-GQ'
];

/**
 * Detects if the user's browser language is Spanish
 * Uses navigator.language and navigator.languages
 */
function detectIsSpanish(): boolean {
    if (typeof window === 'undefined') return false;

    // Check primary browser language
    const primaryLang = navigator.language || '';
    if (primaryLang.toLowerCase().startsWith('es')) {
        return true;
    }

    // Check all preferred languages
    const languages = navigator.languages || [];
    for (const lang of languages) {
        if (lang.toLowerCase().startsWith('es')) {
            return true;
        }
    }

    return false;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [isInitialized, setIsInitialized] = useState(false);

    // Auto-detect language on first load
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if user has a saved preference
        const savedLanguage = localStorage.getItem('language') as Language | null;

        if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
            // Use saved preference
            setLanguageState(savedLanguage);
        } else {
            // Auto-detect based on browser language
            const isSpanish = detectIsSpanish();
            const detectedLanguage: Language = isSpanish ? 'es' : 'en';
            setLanguageState(detectedLanguage);
            // Save the auto-detected language
            localStorage.setItem('language', detectedLanguage);
        }

        setIsInitialized(true);
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', lang);
        }
    }, []);

    // Translation function - supports nested keys like "hero.title"
    const t = useCallback((key: string): string => {
        const keys = key.split('.');
        let value: unknown = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                return key; // Return the key if translation not found
            }
        }

        return typeof value === 'string' ? value : key;
    }, [language]);

    return (
        <LanguageContext.Provider
            value={{
                language,
                translations: translations[language],
                setLanguage,
                t
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

