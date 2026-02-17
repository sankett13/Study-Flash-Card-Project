import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

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

// Create output parser
const parser = StructuredOutputParser.fromZodSchema(flashcardsArraySchema);

// Define quiz question schema
const quizQuestionSchema = z.object({
  cardId: z.string().describe("The ID of the card this question is based on"),
  question: z.string().describe("The quiz question"),
  options: z.array(z.string()).length(4).describe("Four answer options"),
  correctAnswer: z.string().describe("The correct answer from the options"),
});

const quizArraySchema = z.array(quizQuestionSchema);

// Create quiz output parser
const quizParser = StructuredOutputParser.fromZodSchema(quizArraySchema);

// Initialize Gemini model
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash", // Latest Flash model
  temperature: 0.7, // Balance between creativity and consistency
});

// Create prompt template
const promptTemplate = PromptTemplate.fromTemplate(`
You are an expert educational flashcard creator.

Given the following study material, Analyze the Content and create high-quality flashcards that effectively capture the key concepts, facts, and information.
Number of flashcards should be proportional to the length and complexity of the content, but aim for around 5-15 flashcards for typical content.

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

export async function generateQuiz(deck) {
  try {
    if (!deck.cards || deck.cards.length === 0) {
      throw new Error("Deck has no cards to generate quiz from");
    }

    // Limit to 10 questions max, or number of cards if less
    const numQuestions = Math.min(10, deck.cards.length);

    const formatInstructions = quizParser.getFormatInstructions();

    const prompt = `You are an expert quiz creator.

Given the following flashcards from the deck "${deck.title}", create ${numQuestions} multiple-choice quiz questions.

Flashcards:
${deck.cards
  .map(
    (card, idx) =>
      `Card ${idx + 1} (ID: ${card.id}):\nFront: ${card.front}\nBack: ${card.back}`,
  )
  .join("\n\n")}

Instructions:
- Create ${numQuestions} multiple-choice questions based on the flashcards above
- Each question must include the cardId of the flashcard it's based on
- Provide exactly 4 options for each question
- One option must be the correct answer from the card's back content
- The other 3 options should be plausible but incorrect distractors
- Make questions clear and test understanding of the material
- Vary the question types: direct recall, application, comparison, etc.
- Do not include any questions that cannot be answered directly from the flashcards
- Jumble the order of questions and correct answers to avoid patterns [e.g., don't always make option A the correct answer]

${formatInstructions}
`;

    const response = await model.invoke(prompt);

    // Parse the structured response
    const quiz = await quizParser.parse(response.content);

    return quiz;
  } catch (error) {
    console.error("Generate quiz error:", error);

    // Fallback: try to extract JSON manually if structured parsing fails
    if (error.message && error.message.includes("Failed to parse")) {
      try {
        const jsonMatch = error.message.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error("Fallback parsing failed:", parseError);
      }
    }

    throw new Error("Failed to generate quiz");
  }
}
