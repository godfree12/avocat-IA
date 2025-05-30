
"use client";

import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import { Home, User, Briefcase, Zap, Mail, Settings, LogOut, BarChart3, MessageCircle } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: '#hero', label: 'Accueil', icon: Home },
  { href: '#apropos', label: 'À Propos', icon: User },
  { href: '#expertise', label: 'Expertises', icon: Briefcase },
  { href: '#outils-ia', label: 'Outils IA', icon: Zap },
  { href: '#contact', label: 'Contact', icon: Mail },
];

function UserProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-primary/50">
            <AvatarImage src="https://placehold.co/100x100/0a84ff/FFFFFF.png?text=JD" alt="Maître Jean Dupont" data-ai-hint="lawyer avatar" />
            <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Maître Jean Dupont</p>
            <p className="text-xs leading-none text-muted-foreground">
              contact@jeandupont.avocat
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres du compte</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BarChart3 className="mr-2 h-4 w-4" />
          <span>Statistiques (Pro)</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MainNav() {
  const { state, setOpenMobile } = useSidebar();
  
  const handleLinkClick = () => {
    // Close mobile sidebar on link click
    if (state === 'expanded' && typeof setOpenMobile === 'function') {
       // Check if it's mobile context based on how sidebar works
       // This is a bit of a hack, ideally useSidebar would expose isMobile more directly or have a close function
       const sb = document.querySelector('[data-sidebar="sidebar"][data-mobile="true"]');
       if (sb) {
        setOpenMobile(false);
       }
    }
  };

  return (
    <nav className="flex flex-col gap-1 px-2">
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              tooltip={item.label}
              asChild
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={handleLinkClick}
            >
              <a>
                <item.icon className="h-5 w-5" />
                {state === 'expanded' && <span>{item.label}</span>}
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </nav>
  );
}

export function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4 flex items-center justify-between">
          <Link href="#hero" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
             <Logo className="h-8 w-8 text-primary" />
             <h1 className="text-xl font-orbitron font-bold tracking-tight group-data-[collapsible=icon]:hidden text-foreground">
                Jean Dupont
            </h1>
          </Link>
          <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
        </SidebarHeader>
        <Separator className="bg-sidebar-border" />
        <SidebarContent>
          <SidebarMenu>
            <MainNav />
          </SidebarMenu>
        </SidebarContent>
        <Separator className="bg-sidebar-border"/>
        <SidebarFooter className="p-4 flex items-center justify-between group-data-[collapsible=icon]:justify-center">
           <div className="group-data-[collapsible=icon]:hidden">
            <UserProfileDropdown />
           </div>
           <div className="group-data-[collapsible=icon]:block hidden">
            <UserProfileDropdown /> {/* Ensure it's visible in collapsed icon mode too */}
           </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
