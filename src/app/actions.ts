
'use server';

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

    // --- DÉBUT DE LA SIMULATION D'ENVOI D'EMAIL ---
    // Dans une application réelle, vous intégreriez ici un service d'envoi d'e-mails.
    // Exemple avec un service fictif sendEmail():
    //
    // import { sendEmail } from '@/lib/email-service'; // Supposons que vous avez un module pour cela
    //
    // await sendEmail({
    //   to: 'contact@jeandupont.avocat', // L'adresse e-mail de l'avocat
    //   from: 'noreply@votredomaine.com', // Une adresse d'expédition configurée
    //   replyTo: email, // L'email de l'utilisateur pour la réponse
    //   subject: `Nouveau message de contact: ${subject}`,
    //   html: `
    //     <h1>Nouveau message de contact</h1>
    //     <p><strong>Nom:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Objet:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `,
    // });

    console.log("--- SIMULATION D'ENVOI D'EMAIL ---");
    console.log("Un vrai email serait envoyé à : contact@jeandupont.avocat");
    console.log("De la part de (Reply-To) :", email);
    console.log("Nom de l'expéditeur :", name);
    console.log("Objet :", subject);
    console.log("Message :", message);
    console.log("--- FIN DE LA SIMULATION ---");
    // --- FIN DE LA SIMULATION D'ENVOI D'EMAIL ---

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
