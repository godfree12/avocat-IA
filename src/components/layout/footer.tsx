import { Button } from "@/components/ui/button";
import { Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border/50 mt-24">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p className="text-lg mb-4">Maître Jean Dupont</p>
        <div className="flex justify-center space-x-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-primary hover:text-primary/80" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle className="h-6 w-6 text-primary hover:text-primary/80" />
            </a>
          </Button>
        </div>
        <p>&copy; {new Date().getFullYear()} Maître Jean Dupont. Tous droits réservés.</p>
        <p className="mt-2 text-sm">Développé avec une vision futuriste et une passion pour la justice.</p>
      </div>
    </footer>
  );
}
