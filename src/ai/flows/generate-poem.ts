
// src/ai/flows/generate-poem.ts
'use server';

/**
 * @fileOverview Generates a poem based on the content of an image.
 *
 * - generatePoem - A function that generates a poem from an image.
 * - GeneratePoemInput - The input type for the generatePoem function.
 * - GeneratePoemOutput - The return type for the generatePoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePoemInputSchema = z.object({
  imageUri: z
    .string()
    .describe(
      "A photo to generate a poem about, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe('The language in which the poem should be generated.'),
});

export type GeneratePoemInput = z.infer<typeof GeneratePoemInputSchema>;

const GeneratePoemOutputSchema = z.object({
  poem: z.string().describe('The generated poem.'),
});

export type GeneratePoemOutput = z.infer<typeof GeneratePoemOutputSchema>;

export async function generatePoem(input: GeneratePoemInput): Promise<GeneratePoemOutput> {
  return generatePoemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePoemPrompt',
  input: {schema: GeneratePoemInputSchema},
  output: {schema: GeneratePoemOutputSchema},
  prompt: `You are a poet. Generate a poem based on the image provided. The poem should be in the language specified.

Image: {{media url=imageUri}}
Language: {{{language}}}`,
});

const generatePoemFlow = ai.defineFlow(
  {
    name: 'generatePoemFlow',
    inputSchema: GeneratePoemInputSchema,
    outputSchema: GeneratePoemOutputSchema,
  },
  async (input: GeneratePoemInput): Promise<GeneratePoemOutput> => {
    try {
      const response = await prompt(input);
      const output = response.output;

      // Check if output is present and conforms to the expected structure.
      if (!output || typeof output.poem !== 'string' || output.poem.trim() === '') {
        console.warn('[generatePoemFlow] Poem generation resulted in invalid, empty, or missing poem in output:', output);
        throw new Error('The AI did not return a valid poem. The content might be empty or in an unexpected format.');
      }
      return output;
    } catch (error: any) {
      console.error('[generatePoemFlow] Error during prompt execution:', error);
      throw new Error(`An error occurred while generating the poem: ${error.message || 'Unknown error'}`);
    }
  }
);
