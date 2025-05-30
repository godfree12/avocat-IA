import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Feather, Palette, Zap } from 'lucide-react';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {/* Decorative background elements if desired */}
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-down">
              <span className="block">L'Apparence</span>
              <span className="block text-primary">Élégante</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up delay-200">
              Nous transformons vos idées en expériences numériques sophistiquées et mémorables.
            </p>
            <Button size="lg" className="animate-fade-in-up delay-400 group" asChild>
              <a href="#services">
                Découvrez nos créations
                <Feather className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Nos Services Exclusifs</h2>
              <p className="text-lg text-muted-foreground mt-2">
                Des solutions sur mesure pour une présence en ligne impeccable.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Palette,
                  title: 'Design Web Élégant',
                  description: 'Création de sites web esthétiques et intuitifs qui captivent votre audience.',
                  hint: 'abstract design'
                },
                {
                  icon: Zap,
                  title: 'Développement Performant',
                  description: 'Solutions web rapides, sécurisées et optimisées pour tous les appareils.',
                  hint: 'code technology'
                },
                {
                  icon: CheckCircle,
                  title: 'Optimisation SEO',
                  description: 'Améliorez votre visibilité en ligne et atteignez les sommets des moteurs de recherche.',
                  hint: 'data analytics'
                },
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                       <service.icon className="h-10 w-10 text-primary" />
                       <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Typography Showcase Section */}
        <section id="typography" className="py-16 md:py-24 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight">Harmonie Typographique</h2>
            <p className="text-lg text-muted-foreground mt-2">
              La clarté et l'élégance au service de votre message.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-2">Titre de Niveau 1 (H1)</h1>
              <p className="text-muted-foreground">Utilisé pour les titres principaux, captivant l'attention avec audace.</p>
            </div>
            <div>
              <h2 className="text-4xl font-semibold mb-2">Titre de Niveau 2 (H2)</h2>
              <p className="text-muted-foreground">Parfait pour les sections majeures, structurant le contenu avec force.</p>
            </div>
            <div>
              <h3 className="text-3xl font-medium mb-2">Titre de Niveau 3 (H3)</h3>
              <p className="text-muted-foreground">Idéal pour les sous-sections, offrant une hiérarchie claire.</p>
            </div>
            <div>
              <p className="text-lg leading-relaxed mb-4">
                Ceci est un paragraphe standard. Il est conçu pour être lisible et agréable à l'œil, utilisant une police sans-serif moderne. <strong className="text-primary">L'accentuation</strong> est possible pour mettre en évidence des points clés. L'espacement et la hauteur de ligne sont optimisés pour un confort de lecture maximal.
              </p>
            </div>
            <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-lg text-muted-foreground">
              "Le design n'est pas seulement ce à quoi cela ressemble et ce que l'on ressent. Le design est comment cela fonctionne." – Steve Jobs
            </blockquote>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Portfolio Section Placeholder */}
        <section id="portfolio" className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Notre Portfolio Inspirant</h2>
              <p className="text-lg text-muted-foreground mt-2">
                Découvrez quelques-unes de nos réalisations les plus élégantes.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden group">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <Image
                      src={`https://placehold.co/600x400.png`}
                      alt={`Projet ${item}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint="modern website design"
                    />
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-2">Projet Élégant {item}</CardTitle>
                    <CardDescription>Une brève description du projet et des défis relevés.</CardDescription>
                    <Button variant="link" className="px-0 mt-4 text-primary">Voir le projet <Feather className="ml-2 h-4 w-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section Placeholder */}
        <section id="contact" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Parlons de Votre Projet</h2>
              <p className="text-lg text-muted-foreground mt-2">
                Nous sommes prêts à donner vie à votre vision avec élégance.
              </p>
            </div>
            <Card className="max-w-2xl mx-auto p-6 md:p-10 shadow-xl">
              <CardContent className="p-0"> {/* Removed CardContent's default padding */}
                <p className="text-center text-muted-foreground">
                  Contactez-nous via le formulaire ci-dessous ou directement par email à <a href="mailto:contact@elegance.com" className="text-primary hover:underline">contact@elegance.com</a>.
                </p>
                {/* Placeholder for a contact form */}
                <div className="mt-8 p-8 bg-muted/50 rounded-lg text-center">
                  <p className="text-lg">Formulaire de contact à venir...</p>
                  <Button className="mt-6">Envoyer un Message</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
