
"use client";

import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import { Home, User, Briefcase, Zap, Mail, Menu as MenuIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { href: '#hero', label: 'Accueil', icon: Home },
  { href: '#apropos', label: 'À Propos', icon: User },
  { href: '#expertise', label: 'Expertises', icon: Briefcase },
  { href: '#outils-ia', label: 'Outils IA', icon: Zap },
  { href: '#contact', label: 'Contact', icon: Mail },
];

export function HeaderNavigationLayout({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="#hero" className="flex items-center gap-2 group" onClick={handleLinkClick}>
            <Logo className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <h1 className="text-xl font-serif font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Jean Dupont
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} passHref legacyBehavior>
                <a
                  onClick={handleLinkClick}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* UserProfileDropdown removed */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Ouvrir le menu"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {isMobile && mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background shadow-lg">
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} passHref legacyBehavior>
                  <a
                    onClick={handleLinkClick}
                    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <item.icon className="h-5 w-5 mr-3 text-primary" />
                    {item.label}
                  </a>
                </Link>
              ))}
               {/* UserProfileDropdown removed from mobile menu */}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
