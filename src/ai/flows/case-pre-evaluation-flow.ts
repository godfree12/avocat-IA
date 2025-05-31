
'use server';
/**
 * @fileOverview An AI-powered case pre-evaluation flow.
 *
 * - preEvaluateCase - A function that handles the case pre-evaluation.
 * - CasePreEvaluationInput - The input type for the preEvaluateCase function.
 * - CasePreEvaluationOutput - The return type for the preEvaluateCase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CasePreEvaluationInputSchema = z.object({
  caseType: z.string().describe("Le type d'affaire juridique (par exemple, Droit des Affaires, Droit Pénal)."),
  caseDescription: z.string().min(50, { message: "Veuillez fournir une description d'au moins 50 caractères." }).describe("Une description détaillée du problème ou de l'affaire juridique fournie par l'utilisateur."),
});
export type CasePreEvaluationInput = z.infer<typeof CasePreEvaluationInputSchema>;

const CasePreEvaluationOutputSchema = z.object({
  evaluation: z.string().describe("L'évaluation préliminaire de l'affaire par l'IA, incluant les points forts et faibles potentiels, la complexité générale, et si une consultation plus approfondie est recommandée. Ceci n'est pas un conseil juridique."),
});
export type CasePreEvaluationOutput = z.infer<typeof CasePreEvaluationOutputSchema>;

export async function preEvaluateCase(input: CasePreEvaluationInput): Promise<CasePreEvaluationOutput> {
  return casePreEvaluationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'casePreEvaluationPrompt',
  input: {schema: CasePreEvaluationInputSchema},
  output: {schema: CasePreEvaluationOutputSchema},
  prompt: `Vous êtes un assistant IA spécialisé dans la pré-évaluation de cas juridiques pour le cabinet de Maître Jean Dupont.
Votre rôle est de fournir une première analyse générale basée sur les informations fournies par l'utilisateur.

Informations fournies par l'utilisateur :
Type d'affaire : {{{caseType}}}
Description de l'affaire : {{{caseDescription}}}

Instructions pour votre réponse :
1. Analysez la description et le type d'affaire.
2. Fournissez une évaluation préliminaire des points clés, des forces ou faiblesses apparentes, et une estimation de la complexité générale.
3. Indiquez clairement si une consultation plus approfondie avec Maître Dupont semble justifiée ou recommandée.
4. IMPORTANT : Rappelez impérativement à l'utilisateur que cette évaluation est générée par une IA, qu'elle ne constitue EN AUCUN CAS un avis juridique, et qu'une consultation avec un avocat qualifié est indispensable pour obtenir des conseils juridiques précis et personnalisés. Intégrez cette clause de non-responsabilité de manière visible dans votre réponse.

Structurez votre sortie pour correspondre au schéma "evaluation".
`,
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

const casePreEvaluationFlow = ai.defineFlow(
  {
    name: 'casePreEvaluationFlow',
    inputSchema: CasePreEvaluationInputSchema,
    outputSchema: CasePreEvaluationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      return { evaluation: "Je suis désolé, une difficulté technique m'empêche de traiter votre demande pour le moment. Veuillez réessayer plus tard." };
    }
    return output;
  }
);

