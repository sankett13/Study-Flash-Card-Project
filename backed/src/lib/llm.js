import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

// Install zod for schema validation
// npm install zod

// Define flashcard schema
const flashcardSchema = z.object({
  front: z.string().describe("The question or prompt on the front of the card"),
  back: z
    .string()
    .describe("The answer or explanation on the back of the card"),
  imageKeyword: z
    .string()
    .optional()
    .describe("Single keyword for finding relevant image (optional)"),
});

const flashcardsArraySchema = z.array(flashcardSchema);

// Initialize Gemini model
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash", // Latest Flash model
  temperature: 0.7, // Balance between creativity and consistency
});

// Create output parser
const parser = StructuredOutputParser.fromZodSchema(flashcardsArraySchema);

// Create prompt template
const promptTemplate = PromptTemplate.fromTemplate(`
You are an expert educational flashcard creator.

Given the following study material, create 10-15 high-quality flashcards.

Study Material:
{content}

Instructions:
- Ask specific, testable questions
- Include variety: definitions, applications, comparisons, examples
- Keep answers brief but complete (2-3 sentences max)
- For visual concepts, add imageKeyword (e.g., "mitosis", "volcano", "photosynthesis")
- No imageKeyword for abstract concepts

{format_instructions}
`);

export async function generateFlashcards(content) {
  try {
    // Get format instructions from parser
    const formatInstructions = parser.getFormatInstructions();

    // Create the full prompt
    const prompt = await promptTemplate.format({
      content: content,
      format_instructions: formatInstructions,
    });

    // Call Gemini
    const response = await model.invoke(prompt);

    // Parse the response
    const flashcards = await parser.parse(response.content);

    return flashcards;
  } catch (error) {
    console.error("Gemini API error:", error);

    // Fallback: try to extract JSON manually if structured parsing fails
    if (error.message && error.message.includes("Failed to parse")) {
      try {
        const jsonMatch = response.content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error("Fallback parsing failed:", parseError);
      }
    }

    throw new Error("Failed to generate flashcards");
  }
}
