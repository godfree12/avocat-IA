"use client";

import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import { Home, Briefcase, GalleryVerticalEnd, Mail, Settings, BarChart3 } from 'lucide-react';
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
  { href: '#services', label: 'Services', icon: Briefcase },
  { href: '#portfolio', label: 'Portfolio', icon: GalleryVerticalEnd },
  { href: '#contact', label: 'Contact', icon: Mail },
];

function UserProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="profile avatar" />
            <AvatarFallback>AE</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Élégance Admin</p>
            <p className="text-xs leading-none text-muted-foreground">
              admin@elegance.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BarChart3 className="mr-2 h-4 w-4" />
          <span>Statistiques</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


function MainNav() {
  const { state } = useSidebar();
  return (
    <nav className="flex flex-col gap-1 px-2">
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              tooltip={item.label}
              asChild
              className="w-full justify-start"
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
      <Sidebar collapsible="icon" side="left" variant="sidebar">
        <SidebarHeader className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Logo className="h-8 w-8 text-primary" />
             <h1 className="text-xl font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
                L'Apparence Élégante
            </h1>
          </div>
          <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarMenu>
            <MainNav />
          </SidebarMenu>
        </SidebarContent>
        <Separator />
        <SidebarFooter className="p-4 flex items-center justify-between group-data-[collapsible=icon]:justify-center">
           <div className="group-data-[collapsible=icon]:hidden">
            <UserProfileDropdown />
           </div>
           <div className="group-data-[collapsible=icon]:block hidden">
            <UserProfileDropdown />
           </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
