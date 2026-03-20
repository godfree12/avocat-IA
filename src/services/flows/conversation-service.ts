/**
 * @author Godfree AKAKPO
 * Legal Chat Flow Service
 * Handles conversational AI interactions for legal questions
 */

'use server';
/**
 * @fileOverview A legal assistant chatbot AI flow.
 *
 * - legalChat - A function that handles a chat interaction.
 * - LegalChatInput - The input type for the legalChat function.
 * - LegalChatOutput - The return type for the legalChat function.
 */

import {assistantEngine} from '@/services/assistant-engine';
import {z} from 'genkit';

const LegalChatInputSchema = z.object({
  question: z.string().describe("The user's question for the legal assistant."),
});
export type LegalChatInput = z.infer<typeof LegalChatInputSchema>;

const LegalChatOutputSchema = z.object({
  answer: z.string().describe("The AI's answer to the user's question."),
});
export type LegalChatOutput = z.infer<typeof LegalChatOutputSchema>;

export async function legalChat(input: LegalChatInput): Promise<LegalChatOutput> {
  return legalChatFlow(input);
}

const prompt = assistantEngine.definePrompt({
  name: 'legalChatPrompt',
  input: {schema: LegalChatInputSchema},
  output: {schema: LegalChatOutputSchema},
  prompt: `Vous êtes un assistant juridique IA serviable conçu pour répondre aux questions juridiques de base.
Fournissez des informations générales et utiles.
IMPORTANT : Rappelez toujours à l'utilisateur que vous êtes un assistant IA et non un véritable avocat, et que vos réponses ne constituent pas un avis juridique et qu'il devrait consulter un professionnel qualifié pour des conseils spécifiques à sa situation.
Ne répondez pas à des questions qui ne sont pas d'ordre juridique.

Question de l'utilisateur : {{{question}}}

Réponse de l'assistant IA :`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  }
});

const legalChatFlow = assistantEngine.defineFlow(
  {
    name: 'legalChatFlow',
    inputSchema: LegalChatInputSchema,
    outputSchema: LegalChatOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        return { answer: "Je suis désolé, une difficulté technique m'empêche de traiter votre demande pour le moment. Veuillez réessayer plus tard." };
      }
      return output;
    } catch (error) {
      console.error("Error in legalChatFlow LLM call:", error);
      return { answer: "Le service IA est temporairement indisponible ou une erreur de communication s'est produite. Veuillez réessayer plus tard." };
    }
  }
);
