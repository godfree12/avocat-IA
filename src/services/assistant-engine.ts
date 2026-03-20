/**
 * @author Godfree AKAKPO
 * AI Assistant Engine Configuration
 * Powers the intelligent legal assistant capabilities
 */

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const assistantEngine = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});