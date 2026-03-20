/**
 * @author Godfree AKAKPO
 */

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FormEvent, useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Footer } from '@/components/layout/footer';
import {
  ChevronRight, Briefcase, Zap, Mail, Linkedin, MessageCircle, Scale, Users, Home, Globe2,
  Bot, FileText, CalendarDays, UploadCloud, Send, FileScan
} from 'lucide-react';
import {
  sendContactMessage,
  type ContactFormState,
  askAssistant,
  evaluateCase,
  analyzePdfDocument,
} from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';

const practiceAreas = [
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

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

type DocumentAnalysisResult = {
  summary: string;
  sensitivePoints: string[];
  disclaimer: string;
};

const initialContactFormState: ContactFormState = {
  message: null,
  errors: {},
  status: null,
};

function ContactSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-primary hover:bg-primary/85 text-primary-foreground shadow-sm hover:shadow-md"
      disabled={pending}
    >
      {pending ? "Envoi en cours..." : "Envoyer le Message"}
      <Mail className="ml-2 h-5 w-5" />
    </Button>
  );
}

export default function CabinetLandingPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const { toast } = useToast();
  const [contactFormState, contactFormAction] = useActionState(sendContactMessage, initialContactFormState);
  const contactFormRef = useRef<HTMLFormElement>(null);

  const [caseEvaluationInput, setCaseEvaluationInput] = useState({
    caseType: '',
    caseDescription: '',
  });
  const [caseEvaluationResult, setCaseEvaluationResult] = useState<string | null>(null);
  const [isEvaluatingCase, setIsEvaluatingCase] = useState(false);
  const [caseEvaluationError, setCaseEvaluationError] = useState<string | null>(null);
  const [isCaseEvaluationModalOpen, setIsCaseEvaluationModalOpen] = useState(false);

  const [isDocumentAnalysisModalOpen, setIsDocumentAnalysisModalOpen] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [pdfAnalysisResult, setPdfAnalysisResult] = useState<DocumentAnalysisResult | null>(null);
  const [isAnalyzingDocument, setIsAnalyzingDocument] = useState(false);
  const [pdfAnalysisError, setPdfAnalysisError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  const servicesIntelligents = [
    {
      icon: Bot,
      title: 'Assistant Juridique IA',
      description: 'Posez vos questions juridiques de base et obtenez des réponses instantanées 24/7.',
      actionText: 'Dialoguer avec l\'IA',
      onClickAction: () => setIsChatbotModalOpen(true),
    },
    {
      icon: UploadCloud,
      title: 'Analyseur de Documents PDF',
      description: 'Glissez-déposez ou sélectionnez un contrat/document PDF pour un résumé et une détection des points sensibles par IA.',
      actionText: 'Analyser un document',
      onClickAction: () => setIsDocumentAnalysisModalOpen(true),
    },
    {
      icon: FileText,
      title: 'Pré-évaluation de Cas IA',
      description: 'Remplissez un court formulaire pour une estimation par IA des chances de succès de votre dossier.',
      actionText: 'Évaluer mon cas',
      onClickAction: () => setIsCaseEvaluationModalOpen(true),
    },
    {
      icon: CalendarDays,
      title: 'Prise de RDV',
      description: 'Indisponible - Veuillez nous contacter directement pour prendre rendez-vous.',
      actionText: 'Indisponible',
      disabled: true,
    }
  ];

  useEffect(() => {
    if (!contactFormState) return;

    if (contactFormState.status === 'success' && contactFormState.message) {
      toast({
        title: "Succès!",
        description: contactFormState.message,
      });
      if (contactFormRef.current) {
        contactFormRef.current.reset();
      }
    } else if (contactFormState.status === 'error' && contactFormState.message) {
      toast({
        title: "Erreur d'envoi",
        description: contactFormState.message,
        variant: "destructive",
      });
    }
  }, [contactFormState, toast]);

  const handleAssistantQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentMessage.trim() || isLoadingChat) return;

    const newUserMessage: ChatMessage = { sender: 'user', text: currentMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setCurrentMessage('');
    setIsLoadingChat(true);

    try {
      const aiResponse = await askAssistant(newUserMessage.text);
      const newAiMessage: ChatMessage = { sender: 'ai', text: aiResponse.answer };
      setMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error calling askLegalAssistant:", error);
      const errorMessage: ChatMessage = {
        sender: 'ai',
        text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleCasePreEvaluationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!caseEvaluationInput.caseType || caseEvaluationInput.caseDescription.length < 50 || isEvaluatingCase) {
      setCaseEvaluationError("Veuillez sélectionner un type d'affaire et fournir une description d'au moins 50 caractères.");
      return;
    }

    setIsEvaluatingCase(true);
    setCaseEvaluationResult(null);
    setCaseEvaluationError(null);

    try {
      const result = await evaluateCase({
        caseType: caseEvaluationInput.caseType,
        caseDescription: caseEvaluationInput.caseDescription,
      });
      setCaseEvaluationResult(result.evaluation);
    } catch (error: any) {
      console.error("Error calling reviewCase:", error);
      if (
        error?.details &&
        Array.isArray(error.details) &&
        error.details[0]?.code === 'INVALID_ARGUMENT' &&
        error.details[0]?.message
      ) {
        setCaseEvaluationError(`Erreur de validation : ${error.details[0].message}. Veuillez vérifier les informations fournies.`);
      } else {
        setCaseEvaluationError("Désolé, une erreur s'est produite lors de la pré-évaluation. Veuillez réessayer.");
      }
      setCaseEvaluationResult(null);
    } finally {
      setIsEvaluatingCase(false);
    }
  };

  const handleCaseEvaluationModalOpenChange = (open: boolean) => {
    setIsCaseEvaluationModalOpen(open);
    if (!open) {
      setCaseEvaluationResult(null);
      setCaseEvaluationError(null);
      setCaseEvaluationInput({ caseType: '', caseDescription: '' });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedPdfFile(file);
        setPdfAnalysisError(null);
      } else {
        setSelectedPdfFile(null);
        setPdfAnalysisError("Format de fichier invalide. Veuillez sélectionner un fichier PDF.");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } else {
      setSelectedPdfFile(null);
    }
  };

  const handleDocumentAnalysisSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPdfFile || isAnalyzingDocument) {
      setPdfAnalysisError("Veuillez sélectionner un fichier PDF à analyser.");
      return;
    }

    setIsAnalyzingDocument(true);
    setPdfAnalysisResult(null);
    setPdfAnalysisError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedPdfFile);

      reader.onloadend = async () => {
        const base64data = reader.result as string;

        try {
          const result = await analyzePdfDocument({
            pdfDataUri: base64data,
            fileName: selectedPdfFile.name,
          });
          setPdfAnalysisResult(result);
        } catch (flowError: any) {
          console.error("Error calling reviewDocument:", flowError);
          setPdfAnalysisError("Désolé, une erreur s'est produite lors de l'analyse du document. Veuillez réessayer.");
          setPdfAnalysisResult(null);
        } finally {
          setIsAnalyzingDocument(false);
        }
      };

      reader.onerror = () => {
        console.error("Error reading file for analysis");
        setPdfAnalysisError("Erreur lors de la lecture du fichier. Veuillez réessayer.");
        setIsAnalyzingDocument(false);
      };
    } catch (error) {
      console.error("Error initiating file read for analysis:", error);
      setPdfAnalysisError("Une erreur inattendue s'est produite. Veuillez réessayer.");
      setIsAnalyzingDocument(false);
    }
  };

  const handleDocumentAnalysisModalOpenChange = (open: boolean) => {
    setIsDocumentAnalysisModalOpen(open);
    if (!open) {
      setSelectedPdfFile(null);
      setPdfAnalysisResult(null);
      setPdfAnalysisError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleChatbotModalOpenChange = (open: boolean) => {
    setIsChatbotModalOpen(open);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow">
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden p-4 bg-gradient-to-b from-background via-background/90 to-background/80">
          <video
            autoPlay
            loop
            playsInline
            muted
            className="absolute inset-0 z-0 w-full h-full object-cover opacity-30 video-no-controls"
          >
            <source src="/avocat.mp4" type="video/mp4" style={{ objectFit: 'cover', pointerEvents: 'none' }} />
            Your browser does not support the video tag.
          </video>

          <div className="relative z-10 animate-fade-in-down">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-4">
              Maître Jean Dupont
            </h1>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-8">
              Avocat d'élite au Barreau de Paris
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Façonner l'avenir de la justice, un dossier à la fois. Votre destin, ma priorité.
            </p>
            <div className="space-x-4">
              <Button size="lg" className="bg-primary hover:bg-primary/85 text-primary-foreground group shadow-md hover:shadow-lg transition-shadow duration-300" asChild>
                <Link href="#apropos">
                  Découvrir mon approche
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 group shadow-sm hover:shadow-md transition-shadow duration-300" asChild>
                <Link href="#outils-ia">
                  Accéder aux outils IA
                  <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

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
                <h2 className="text-4xl font-serif font-bold tracking-tight mb-6 text-foreground">Philosophie & Engagement</h2>
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

        <section id="expertise" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold tracking-tight text-foreground">Domaines d'Expertise</h2>
              <p className="text-xl text-muted-foreground mt-3 max-w-2xl mx-auto">
                Une maîtrise pointue dans divers champs du droit pour une défense complète et efficace.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {practiceAreas.map((area) => (
                <Card key={area.title} className="bg-card text-card-foreground border-border/70 hover:border-primary/50 hover:shadow-md hover:shadow-border/30 transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <area.icon className="h-10 w-10 text-primary" />
                      <CardTitle className="text-2xl font-serif">{area.title}</CardTitle>
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

        <section id="outils-ia" className="py-20 md:py-32 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold tracking-tight text-foreground">Outils d'Assistance</h2>
              <p className="text-xl text-muted-foreground mt-3 max-w-2xl mx-auto">
                L'intelligence artificielle au service de votre défense : des outils innovants pour une justice plus accessible et performante.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {servicesIntelligents.map((tool) => (
                <Card key={tool.title} className="bg-card text-card-foreground border-border/70 flex flex-col justify-between hover:border-primary/50 hover:shadow-md hover:shadow-border/30 transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <tool.icon className="h-10 w-10 text-primary" />
                      <CardTitle className="text-2xl font-serif">{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-muted-foreground mb-6">{tool.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/5"
                      onClick={tool.onClickAction ? tool.onClickAction : undefined}
                      asChild={!tool.onClickAction && !!tool.href && !tool.disabled}
                      disabled={tool.disabled}
                    >
                      {tool.href && !tool.onClickAction && !tool.disabled ? (
                        <Link href={tool.href} target={tool.external ? "_blank" : "_self"} rel={tool.external ? "noopener noreferrer" : ""}>
                          {tool.actionText}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      ) : (
                        <>
                          {tool.actionText} 
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={isChatbotModalOpen} onOpenChange={handleChatbotModalOpenChange}>
          <DialogContent className="sm:max-w-[600px] bg-card text-card-foreground border-border/70 flex flex-col h-[70vh] max-h-[700px]">
            <DialogHeader>
              <div className="flex items-center mb-2">
                <Bot className="h-8 w-8 text-primary mr-3 shrink-0" />
                <DialogTitle className="text-2xl font-serif text-foreground">Assistant Juridique</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground">
                Posez vos questions juridiques de base. Cet assistant fournit des informations générales et non un avis juridique.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-grow space-y-4 overflow-y-auto p-4 border border-border/50 rounded-md bg-background/70 custom-scrollbar">
              {messages.length === 0 && !isLoadingChat && (
                <div className="flex justify-center items-center h-full">
                  <p className="text-muted-foreground italic">Posez votre question pour commencer...</p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg shadow ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'} text-muted-foreground/70`}>
                    {msg.sender === 'user' ? 'Vous' : 'Assistant IA'}
                  </p>
                </div>
              ))}

              {isLoadingChat && (
                <div className="flex items-start">
                  <div className="max-w-[80%] p-3 rounded-lg shadow bg-secondary text-secondary-foreground rounded-bl-none">
                    <p className="text-sm italic">L'assistant IA est en train d'écrire...</p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleAssistantQuestion} className="flex gap-3 items-center pt-4 border-t border-border/50">
              <Input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Posez votre question juridique ici..."
                className="flex-grow bg-input border-border focus:border-primary focus:ring-primary text-base"
                disabled={isLoadingChat}
                aria-label="Votre question juridique"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/85 text-primary-foreground px-6 py-2.5 text-base shadow-sm hover:shadow-md" disabled={isLoadingChat || !currentMessage.trim()}>
                Envoyer
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <DialogFooter className="mt-2 sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Fermer
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isCaseEvaluationModalOpen} onOpenChange={handleCaseEvaluationModalOpenChange}>
          <DialogContent className="sm:max-w-[600px] bg-card text-card-foreground border-border/70">
            <DialogHeader>
              <div className="flex items-center mb-2">
                <FileText className="h-8 w-8 text-primary mr-3 shrink-0" />
                <DialogTitle className="text-2xl font-serif text-foreground">Pré-évaluation de Cas</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground">
                Remplissez ce formulaire pour obtenir une pré-évaluation automatisée de votre situation par notre IA. Cela ne remplace pas une consultation.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCasePreEvaluationSubmit} className="space-y-6 py-4">
              <div>
                <Label htmlFor="modalCaseType" className="block text-sm font-medium text-muted-foreground mb-1">Type d'affaire</Label>
                <Select
                  name="caseType"
                  value={caseEvaluationInput.caseType}
                  onValueChange={(value) => setCaseEvaluationInput(prev => ({ ...prev, caseType: value }))}
                  required
                >
                  <SelectTrigger id="modalCaseType" className="w-full bg-input border-border focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Sélectionnez un type d'affaire" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {practiceAreas.map(area => (
                      <SelectItem key={area.title} value={area.title}>
                        {area.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="modalCaseDescription" className="block text-sm font-medium text-muted-foreground mb-1">
                  Description de votre situation (minimum 50 caractères)
                </Label>
                <Textarea
                  name="caseDescription"
                  id="modalCaseDescription"
                  rows={5}
                  value={caseEvaluationInput.caseDescription}
                  onChange={(e) => setCaseEvaluationInput(prev => ({ ...prev, caseDescription: e.target.value }))}
                  required
                  minLength={50}
                  className="bg-input border-border focus:border-primary focus:ring-primary"
                  placeholder="Décrivez en détail votre problème juridique, les faits importants, et ce que vous souhaitez obtenir."
                />
              </div>

              {caseEvaluationError && (
                <p className="text-sm text-destructive">{caseEvaluationError}</p>
              )}

              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/85 text-primary-foreground shadow-md hover:shadow-lg"
                  disabled={isEvaluatingCase || !caseEvaluationInput.caseType || caseEvaluationInput.caseDescription.length < 50}
                >
                  {isEvaluatingCase ? "Évaluation en cours..." : "Obtenir une Pré-évaluation"}
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>

            {isEvaluatingCase && (
              <div className="text-center text-muted-foreground py-4">
                <p>Analyse en cours, veuillez patienter...</p>
              </div>
            )}

            {caseEvaluationResult && !isEvaluatingCase && (
              <div className="mt-6 p-4 bg-secondary/50 border border-border/50 rounded-lg">
                <h4 className="text-lg font-serif text-foreground mb-2">Résultat de la Pré-évaluation :</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">{caseEvaluationResult}</p>
              </div>
            )}

            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => handleCaseEvaluationModalOpenChange(false)}>Fermer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDocumentAnalysisModalOpen} onOpenChange={handleDocumentAnalysisModalOpenChange}>
          <DialogContent className="sm:max-w-[600px] bg-card text-card-foreground border-border/70">
            <DialogHeader>
              <div className="flex items-center mb-2">
                <FileScan className="h-8 w-8 text-primary mr-3 shrink-0" />
                <DialogTitle className="text-2xl font-serif text-foreground">Analyseur de Document</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground">
                Téléchargez un document PDF (contrat, etc.) pour obtenir un résumé et une identification des points sensibles par IA.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleDocumentAnalysisSubmit} className="space-y-6 py-4">
              <div>
                <Label htmlFor="pdfFile" className="block text-sm font-medium text-muted-foreground mb-1">Fichier PDF</Label>
                <Input
                  type="file"
                  id="pdfFile"
                  name="pdfFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="w-full bg-input border-border focus:border-primary focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {selectedPdfFile && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Fichier sélectionné : {selectedPdfFile.name}
                  </p>
                )}
              </div>

              {pdfAnalysisError && (
                <p className="text-sm text-destructive">{pdfAnalysisError}</p>
              )}

              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/85 text-primary-foreground shadow-md hover:shadow-lg"
                  disabled={isAnalyzingDocument || !selectedPdfFile}
                >
                  {isAnalyzingDocument ? "Analyse en cours..." : "Analyser le Document"}
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>

            {isAnalyzingDocument && (
              <div className="text-center text-muted-foreground py-4">
                <p>Analyse en cours, veuillez patienter...</p>
              </div>
            )}

            {pdfAnalysisResult && !isAnalyzingDocument && (
              <div className="mt-6 p-4 bg-secondary/50 border border-border/50 rounded-lg max-h-80 overflow-y-auto custom-scrollbar">
                <h4 className="text-lg font-serif text-foreground mb-2">Résultat de l'Analyse :</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-foreground/90">Résumé :</h5>
                    <p className="text-muted-foreground whitespace-pre-wrap text-sm">{pdfAnalysisResult.summary}</p>
                  </div>

                  {pdfAnalysisResult.sensitivePoints && pdfAnalysisResult.sensitivePoints.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-foreground/90">Points Sensibles Identifiés :</h5>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                        {pdfAnalysisResult.sensitivePoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-xs italic text-muted-foreground/80 pt-2 border-t border-border/30 mt-3">
                    {pdfAnalysisResult.disclaimer}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => handleDocumentAnalysisModalOpenChange(false)}>Fermer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Separator className="my-16 md:my-24 bg-border/50" />

        <section id="contact" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold tracking-tight text-primary">Contactez-Moi</h2>
              <p className="text-xl text-muted-foreground mt-3 max-w-2xl mx-auto">
                Discutons de votre situation. Je vous réponds en moins de 24h.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <Card className="bg-card text-card-foreground p-6 md:p-10 shadow-xl border-border/70">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl font-serif text-center md:text-left">Envoyer un message</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <form ref={contactFormRef} action={contactFormAction} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Nom complet</label>
                      <Input type="text" name="name" id="name" required className="bg-input border-border focus:border-primary focus:ring-primary" aria-describedby="name-error" />
                      {contactFormState?.errors?.name && (
                        <p id="name-error" className="text-xs text-destructive mt-1">
                          {contactFormState.errors.name.join(', ')}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Adresse e-mail</label>
                      <Input type="email" name="email" id="email" required className="bg-input border-border focus:border-primary focus:ring-primary" aria-describedby="email-error" />
                      {contactFormState?.errors?.email && (
                        <p id="email-error" className="text-xs text-destructive mt-1">
                          {contactFormState.errors.email.join(', ')}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">Objet</label>
                      <Input type="text" name="subject" id="subject" required className="bg-input border-border focus:border-primary focus:ring-primary" aria-describedby="subject-error" />
                      {contactFormState?.errors?.subject && (
                        <p id="subject-error" className="text-xs text-destructive mt-1">
                          {contactFormState.errors.subject.join(', ')}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Votre message</label>
                      <Textarea name="message" id="message" rows={4} required className="bg-input border-border focus:border-primary focus:ring-primary" aria-describedby="message-error" />
                      {contactFormState?.errors?.message && (
                        <p id="message-error" className="text-xs text-destructive mt-1">
                          {contactFormState.errors.message.join(', ')}
                        </p>
                      )}
                    </div>

                    <div>
                      <ContactSubmitButton />
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="bg-card text-card-foreground p-6 shadow-lg border-border/70">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-serif">Coordonnées</CardTitle>
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

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--background) / 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--border));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.8);
        }
        .video-no-controls::-webkit-media-controls {
          display: none !important;
        }
        .video-no-controls::-webkit-media-controls-enclosure {
          display: none !important;
        }
        .video-no-controls::-webkit-media-controls-panel {
          display: none !important;
        }
        .video-no-controls::-webkit-media-controls-play-button {
          display: none !important;
        }
        .video-no-controls::-webkit-media-controls-timeline {
          display: none !important;
        }
        .video-no-controls::-webkit-media-controls-current-time-display {
          display: none !important;
        }
        .video-no-controls::-webkit-media-controls-time-remaining-display {
          display: none !important;
        }
        .video-no-controls::-webkit-media-controls-volume-slider {
          display: none !important;
        }
        .video-no-controls::-webkit-media-controls-fullscreen-button {
          display: none !important;
        }
      `}</style>
    </div>
  );
}