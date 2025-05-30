export function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-border mt-16">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} L'Apparence Élégante. Tous droits réservés.</p>
        <p className="mt-2 text-sm">Conçu avec passion et une touche de violet.</p>
      </div>
    </footer>
  );
}
