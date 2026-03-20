
'use server';

import { legalChat } from '@/services/flows/conversation-service';
import { preEvaluateCase } from '@/services/flows/case-review-service';
import { analyzeDocument } from '@/services/flows/document-review-service';
import { z } from 'zod';

// Schéma de validation pour le formulaire de contact
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom complet est requis." }),
  email: z.string().email({ message: "L'adresse e-mail n'est pas valide." }),
  subject: z.string().min(1, { message: "L'objet est requis." }),
  message: z.string().min(1, { message: "Votre message est requis." }),
});

export interface ContactFormState {
  message: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  status: 'success' | 'error' | null;
}

export async function sendContactMessage(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const validatedFields = contactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    });

    if (!validatedFields.success) {
      return {
        message: "Veuillez corriger les erreurs dans le formulaire.",
        errors: validatedFields.error.flatten().fieldErrors,
        status: 'error',
      };
    }

    const { name, email, subject, message } = validatedFields.data;

    console.log("--- SIMULATION D'ENVOI D'EMAIL ---");
    console.log("Un vrai email serait envoyé à : contact@jeandupont.avocat");
    console.log("De la part de (Reply-To) :", email);
    console.log("Nom de l'expéditeur :", name);
    console.log("Objet :", subject);
    console.log("Message :", message);
    console.log("--- FIN DE LA SIMULATION ---");

    return {
      message: "Message envoyé avec succès ! Maître Dupont vous contactera bientôt.",
      status: 'success',
      errors: {},
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact:", error);
    return {
      message: "Une erreur interne s'est produite. Veuillez réessayer plus tard.",
      status: 'error',
      errors: {},
    };
  }
}

export async function askAssistant(question: string) {
  const result = await legalChat({ question });
  return {
    answer: result.answer,
  };
}

export async function evaluateCase(input: {
  caseType: string;
  caseDescription: string;
}) {
  const result = await preEvaluateCase(input);
  return {
    evaluation: result.evaluation,
  };
}

export async function analyzePdfDocument(input: {
  pdfDataUri: string;
  fileName: string;
}) {
  const result = await analyzeDocument(input);
  return {
    summary: result.summary,
    sensitivePoints: result.sensitivePoints,
    disclaimer: result.disclaimer,
  };
}