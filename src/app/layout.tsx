import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "L'Apparence Élégante",
  description: 'Un site web généré avec une apparence élégante et un design sophistiqué.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarLayout>{children}</SidebarLayout>
        <Toaster />
      </body>
    </html>
  );
}
