import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Assuming Button is used elsewhere, keep import
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Footer } from '@/components/layout/footer';
import { ChevronRight, User, Briefcase, Zap, Mail, Linkedin, MessageCircle, Scale, Users, Home, Globe2, Bot, FileText, CheckCircle, CalendarDays, UploadCloud } from 'lucide-react';
import Link from 'next/link';

const expertiseAreas = [
  {
    icon: Briefcase,
    title: 'Droit des Affaires',
    description: 'Conseil et contentieux pour entreprises, de la création à la transmission.',
    hint: 'business law legal'
  },
  {
    icon: Scale,
    title: 'Droit Pénal',
    description: 'Défense des prévenus et assistance aux victimes à toutes les étapes de la procédure.',
    hint: 'criminal law justice'
  },
  {
    icon: Users,
    title: 'Droit du Travail',
    description: 'Accompagnement des salariés et employeurs sur les relations individuelles et collectives.',
    hint: 'labor law employment'
  },
  {
    icon: Home,
    title: 'Droit de la Famille',
    description: 'Gestion des affaires familiales : divorce, garde d’enfants, succession.',
    hint: 'family law divorce'
  },
  {
    icon: Globe2,
    title: 'Droit International',
    description: 'Conseils en immigration, contrats internationaux et litiges transfrontaliers.',
    hint: 'international law global'
  },
];

const aiTools = [
  {
    icon: Bot,
    title: 'Assistant Juridique IA',
    description: 'Posez vos questions juridiques de base et obtenez des réponses instantanées 24/7.',
    actionText: 'Dialoguer avec l\'IA',
    href: '#chatbot-placeholder', // Placeholder link
  },
  {
    icon: UploadCloud,
    title: 'Analyseur de Documents PDF',
    description: 'Glissez-déposez un contrat ou document PDF pour un résumé automatique et une détection des points sensibles.',
    actionText: 'Analyser un document',
    href: '#document-analyzer-placeholder',
  },
  {
    icon: FileText,
    title: 'Pré-évaluation de Cas IA',
    description: 'Remplissez un court formulaire pour une estimation par IA des chances de succès de votre dossier.',
    actionText: 'Évaluer mon cas',
    href: '#case-evaluation-placeholder',
  },
  {
    icon: CalendarDays,
    title: 'Prise de RDV Intelligente',
    description: 'Notre agenda IA vous aide à trouver le créneau parfait selon l\'urgence et le domaine de votre affaire.',
    actionText: 'Prendre RDV',
    href: 'https://calendly.com', // Example link
    external: true,
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow"> {/* Changed flex-1 to flex-grow for clarity */}
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden p-4 bg-gradient-to-b from-background via-background/90 to-background/80">
          <video
            autoPlay
            loop
            playsInline
            muted
            className="absolute inset-0 z-0 w-full h-full object-cover opacity-30 video-no-controls"
          >
            <source src="/avocat.mp4" type="video/mp4" style={{ objectFit: 'cover', pointerEvents: 'none' }} />
            {/* Add other source types if available for broader browser support */}
            Your browser does not support the video tag.

          </video> {/* Correctly closed the video tag */}
        
          <div className="relative z-10 animate-fade-in-down">
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold tracking-tight mb-4">
              Maître Jean Dupont
            </h1>
            <h2 className="text-3xl md:text-5xl font-orbitron text-primary mb-8">
              Avocat d'élite au Barreau de Paris
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Façonner l'avenir de la justice, un dossier à la fois. Votre destin, ma priorité.
            </p>
            <div className="space-x-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group shadow-lg hover:shadow-primary/50 transition-shadow duration-300" asChild>
                <Link href="#apropos">
                  Découvrir mon approche
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 group shadow-md hover:shadow-primary/30 transition-shadow duration-300" asChild>
                 <Link href="#outils-ia">
                  Accéder à l'assistant IA
                  <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="apropos" className="py-20 md:py-32 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square max-w-md mx-auto md:mx-0 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://placehold.co/600x600/1f1f1f/b0b0b0.png?text=JD"
                  alt="Maître Jean Dupont - Portrait stylisé"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                  data-ai-hint="lawyer portrait grayscale"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-orbitron font-bold tracking-tight mb-6 text-primary">Philosophie & Engagement</h2>
                <blockquote className="text-2xl italic text-foreground mb-8 border-l-4 border-primary pl-6 py-2">
                  "Je ne défends pas des dossiers. Je défends des destins."
                </blockquote>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Fort d'une expérience solide et d'une passion inébranlable pour la justice, Maître Jean Dupont s'engage à offrir une représentation juridique d'excellence. Chaque cas est abordé avec une approche personnalisée, alliant rigueur analytique, stratégie affûtée et technologies de pointe.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mon objectif : transformer les défis juridiques en opportunités, en protégeant vos droits et en façonnant un avenir plus juste pour chacun de mes clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-16 md:my-24 bg-border/50" />

        {/* Expertise Section */}
        <section id="expertise" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-orbitron font-bold tracking-tight text-primary">Domaines d'Expertise</h2>
              <p className="text-xl text-muted-foreground mt-3 max-w-2xl mx-auto">
                Une maîtrise pointue dans divers champs du droit pour une défense complète et efficace.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertiseAreas.map((area) => (
                <Card key={area.title} className="bg-card text-card-foreground border-border/70 hover:border-primary/70 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <area.icon className="h-10 w-10 text-primary" />
                      <CardTitle className="text-2xl font-orbitron">{area.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{area.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <Separator className="my-16 md:my-24 bg-border/50" />

        {/* AI Tools Section */}
        <section id="outils-ia" className="py-20 md:py-32 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-orbitron font-bold tracking-tight text-primary">Outils IA Innovants</h2>
              <p className="text-xl text-muted-foreground mt-3 max-w-2xl mx-auto">
                L'intelligence artificielle au service de votre défense : des outils exclusifs pour une justice plus accessible et performante.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {aiTools.map((tool) => (
                <Card key={tool.title} className="bg-card text-card-foreground border-border/70 flex flex-col justify-between hover:border-primary/70 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <tool.icon className="h-10 w-10 text-primary" />
                      <CardTitle className="text-2xl font-orbitron">{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-muted-foreground mb-6">{tool.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10" asChild>
                      <Link href={tool.href} target={tool.external ? "_blank" : "_self"} rel={tool.external ? "noopener noreferrer" : ""}>
                        {tool.actionText}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
             {/* Placeholder for chatbot UI */}
            <div id="chatbot-placeholder" className="mt-12 p-6 bg-card border border-border/70 rounded-lg text-center">
              <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-orbitron mb-2">Assistant Juridique IA</h3>
              <p className="text-muted-foreground">L'interface du chatbot sera intégrée ici.</p>
              <Input type="text" placeholder="Posez votre question..." className="mt-4 max-w-md mx-auto bg-input border-border focus:border-primary" />
            </div>
          </div>
        </section>

        <Separator className="my-16 md:my-24 bg-border/50" />

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-orbitron font-bold tracking-tight text-primary">Contactez-Moi</h2>
              <p className="text-xl text-muted-foreground mt-3 max-w-2xl mx-auto">
                Discutons de votre situation. Je vous réponds en moins de 24h.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <Card className="bg-card text-card-foreground p-6 md:p-10 shadow-xl border-border/70">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl font-orbitron text-center md:text-left">Envoyer un message</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <form action="#" method="POST" className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Nom complet</label>
                      <Input type="text" name="name" id="name" required className="mt-1 bg-input border-border focus:border-primary focus:ring-primary" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">Adresse e-mail</label>
                      <Input type="email" name="email" id="email" required className="mt-1 bg-input border-border focus:border-primary focus:ring-primary" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground">Objet</label>
                      <Input type="text" name="subject" id="subject" required className="mt-1 bg-input border-border focus:border-primary focus:ring-primary" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">Votre message</label>
                      <Textarea name="message" id="message" rows={4} required className="mt-1 bg-input border-border focus:border-primary focus:ring-primary" />
                    </div>
                    <div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-primary/50">
                        Envoyer le Message
                        <Mail className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="bg-card text-card-foreground p-6 shadow-lg border-border/70">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-orbitron">Coordonnées</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-3 text-muted-foreground">
                    <p><strong>Email :</strong> <a href="mailto:contact@jeandupont.avocat" className="text-primary hover:underline">contact@jeandupont.avocat</a></p>
                    <p><strong>Téléphone :</strong> <a href="tel:+33123456789" className="text-primary hover:underline">+33 1 23 45 67 89</a></p>
                    <p><strong>Adresse :</strong> 123 Rue de Rivoli, 75001 Paris, France</p>
                    <div className="flex space-x-3 pt-2">
                      <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10">
                        <a href="https://www.linkedin.com/in/jeandupontavocat" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10">
                        <a href="https://wa.me/33123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                           <MessageCircle className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="aspect-video bg-card rounded-lg shadow-lg overflow-hidden border-border/70">
                   <Image
                      src="https://placehold.co/600x400/1f1f1f/0a84ff.png?text=Carte+ici"
                      alt="Carte de localisation du cabinet"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      data-ai-hint="dark map interface Paris"
                    />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
