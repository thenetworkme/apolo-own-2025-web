import type { Metadata } from "next";
import { Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apolo27.com"),
  title: "APOLO 27 | NASA Human Exploration Rover Challenge",
  description:
    "Equipo de estudiantes de INTEC, República Dominicana, compitiendo en el NASA Human Exploration Rover Challenge. Segundo lugar mundial en 2024 y primer equipo latinoamericano en alcanzar el podio.",
  keywords: [
    "APOLO 27",
    "NASA",
    "Rover Challenge",
    "HERC",
    "INTEC",
    "República Dominicana",
    "STEM",
    "ingeniería espacial",
    "rover",
    "space exploration",
  ],
  openGraph: {
    title: "APOLO 27 | NASA Human Exploration Rover Challenge",
    description:
      "Equipo de estudiantes de INTEC, República Dominicana. Segundo lugar mundial en 2024. Diseñamos y construimos rovers para la exploración espacial.",
    url: "https://apolo27.com",
    siteName: "APOLO 27",
    locale: "es_DO",
    type: "website",
    images: [
      {
        url: "/images/Apolo 27 HP - blanco.png",
        width: 1200,
        height: 630,
        alt: "APOLO 27 - NASA Human Exploration Rover Challenge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APOLO 27 | NASA Rover Challenge",
    description:
      "Estudiantes dominicanos construyendo rovers para la exploración espacial. 2do lugar mundial 2024.",
    images: ["/images/Apolo 27 HP - blanco.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${dancingScript.variable} ${poppins.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
