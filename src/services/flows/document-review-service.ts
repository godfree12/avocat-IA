/**
 * @author Godfree AKAKPO
 * Document Analysis Flow Service
 * Analyzes PDF legal documents and identifies sensitive points
 */

'use server';
/**
 * @fileOverview An AI-powered PDF document analyzer flow.
 *
 * - analyzeDocument - A function that handles document analysis.
 * - DocumentAnalysisInput - The input type for the analyzeDocument function.
 * - DocumentAnalysisOutput - The return type for the analyzeDocument function.
 */

import {assistantEngine} from '@/services/assistant-engine';
import {z} from 'genkit';

const DocumentAnalysisInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document as a data URI that must include a MIME type (application/pdf) and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
  fileName: z.string().optional().describe("The name of the PDF file being analyzed."),
});
export type DocumentAnalysisInput = z.infer<typeof DocumentAnalysisInputSchema>;

const DocumentAnalysisOutputSchema = z.object({
  summary: z.string().describe("A concise summary of the document's content."),
  sensitivePoints: z.array(z.string()).describe("A list of potentially sensitive points, clauses, or issues found in the document."),
  disclaimer: z.string().describe("A mandatory disclaimer stating this is an AI analysis, not legal advice."),
});
export type DocumentAnalysisOutput = z.infer<typeof DocumentAnalysisOutputSchema>;

export async function analyzeDocument(input: DocumentAnalysisInput): Promise<DocumentAnalysisOutput> {
  return documentAnalyzerFlow(input);
}

const prompt = assistantEngine.definePrompt({
  name: 'documentAnalyzerPrompt',
  input: {schema: DocumentAnalysisInputSchema},
  output: {schema: DocumentAnalysisOutputSchema},
  prompt: `Vous êtes un assistant IA spécialisé dans l'analyse de documents juridiques pour le cabinet de Maître Jean Dupont.
Votre rôle est de fournir un résumé et d'identifier les points sensibles d'un document PDF fourni par l'utilisateur.

Document fourni ({{fileName}}): {{media url=pdfDataUri}}

Instructions pour votre réponse :
1. Lisez attentivement le document.
2. Rédigez un résumé concis du contenu principal du document.
3. Identifiez et listez les clauses, les points ou les aspects qui pourraient être considérés comme sensibles, inhabituels, potentiellement problématiques, ou qui mériteraient une attention particulière d'un avocat. Soyez précis.
4. IMPORTANT : Concluez impérativement votre analyse par la phrase suivante, sans aucune modification : "Cette analyse est générée par une intelligence artificielle et est fournie à titre informatif uniquement. Elle ne constitue EN AUCUN CAS un avis juridique et ne saurait remplacer la consultation d'un avocat qualifié pour des conseils spécifiques à votre situation." Cette phrase doit être le contenu exact du champ 'disclaimer'.

Structurez votre sortie pour correspondre au schéma JSON attendu (summary, sensitivePoints, disclaimer).
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

const baseDisclaimer = "Cette analyse est générée par une intelligence artificielle et est fournie à titre informatif uniquement. Elle ne constitue EN AUCUN CAS un avis juridique et ne saurait remplacer la consultation d'un avocat qualifié pour des conseils spécifiques à votre situation.";

const documentAnalyzerFlow = assistantEngine.defineFlow(
  {
    name: 'documentAnalyzerFlow',
    inputSchema: DocumentAnalysisInputSchema,
    outputSchema: DocumentAnalysisOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        return {
          summary: "Je suis désolé, une difficulté technique m'empêche d'analyser votre document pour le moment. Veuillez réessayer plus tard.",
          sensitivePoints: [],
          disclaimer: baseDisclaimer
        };
      }
      // Ensure the disclaimer is always the standard one
      return {
        ...output,
        disclaimer: baseDisclaimer
      };
    } catch (error) {
      console.error("Error in documentAnalyzerFlow LLM call:", error);
      return {
        summary: "Le service IA est temporairement indisponible ou une erreur de communication s'est produite lors de l'analyse du document. Veuillez réessayer plus tard.",
        sensitivePoints: [],
        disclaimer: baseDisclaimer
      };
    }
  }
);
