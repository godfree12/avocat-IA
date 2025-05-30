import type { Metadata } from 'next';
import { Orbitron, Inter } from 'next/font/google';
import './globals.css';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Toaster } from "@/components/ui/toaster";

const orbitronFont = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '700', '900'], // Specify needed weights
});

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Maître Jean Dupont - Avocat d'élite à Paris",
  description: "Cabinet d'avocat moderne et innovant. Expertise juridique et solutions IA pour défendre vos destins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${orbitronFont.variable} ${interFont.variable} font-sans antialiased`}>
        <SidebarLayout>{children}</SidebarLayout>
        <Toaster />
      </body>
    </html>
  );
}
