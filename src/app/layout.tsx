/**
 * @author Godfree AKAKPO
 */

import type { Metadata } from 'next';
import { Poppins, Lora } from 'next/font/google';
import './globals.css';
import { HeaderNavigationLayout } from '@/components/layout/sidebar-layout'; 
import { Toaster } from "@/components/ui/toaster";

const poppinsFont = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const loraFont = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Cabinet d'Avocat Jean Dupont - Paris",
  description: "Cabinet d'avocat spécialisé en droit des affaires, pénal, travail et famille. Services juridiques professionnels avec outils d'assistance intelligents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${poppinsFont.variable} ${loraFont.variable} font-sans antialiased scroll-smooth`}>
        <HeaderNavigationLayout>{children}</HeaderNavigationLayout>
        <Toaster />
      </body>
    </html>
  );
}
