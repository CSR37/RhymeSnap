'use server';

/**
 * @fileOverview Suggests languages based on the user's location.
 *
 * - suggestLanguages - A function that suggests languages based on location.
 * - SuggestLanguagesInput - The input type for the suggestLanguages function.
 * - SuggestLanguagesOutput - The return type for the suggestLanguages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLanguagesInputSchema = z.object({
  location: z
    .string()
    .describe('The user location, should be a city or country name.'),
});
export type SuggestLanguagesInput = z.infer<typeof SuggestLanguagesInputSchema>;

const SuggestLanguagesOutputSchema = z.object({
  suggestedLanguages: z
    .array(z.string())
    .describe('An array of suggested languages for the user.'),
});
export type SuggestLanguagesOutput = z.infer<typeof SuggestLanguagesOutputSchema>;

export async function suggestLanguages(input: SuggestLanguagesInput): Promise<SuggestLanguagesOutput> {
  return suggestLanguagesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLanguagesPrompt',
  input: {schema: SuggestLanguagesInputSchema},
  output: {schema: SuggestLanguagesOutputSchema},
  prompt: `You are an expert in language and geography. Based on the user's location, suggest a list of languages that are commonly spoken in that region. 

Location: {{{location}}}

Suggest languages:`,
});

const suggestLanguagesFlow = ai.defineFlow(
  {
    name: 'suggestLanguagesFlow',
    inputSchema: SuggestLanguagesInputSchema,
    outputSchema: SuggestLanguagesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
