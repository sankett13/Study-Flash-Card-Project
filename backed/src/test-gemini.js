import dotenv from "dotenv";
import { generateFlashcards } from "./lib/llm.js";

dotenv.config();

const testContent = `
Photosynthesis is the process by which plants convert light energy into chemical energy.
It occurs in the chloroplasts and involves two stages: the light-dependent reactions 
and the Calvin cycle. During photosynthesis, plants take in carbon dioxide and water, 
and produce glucose and oxygen. The general equation is:
6CO2 + 6H2O + light energy → C6H12O6 + 6O2
`;

async function test() {
    console.log("Starting Gemini flashcard generation test...\n");
  console.log("Testing Gemini flashcard generation...\n");

  try {
    const flashcards = await generateFlashcards(testContent);

    console.log(`✅ Generated ${flashcards.length} flashcards:\n`);

    flashcards.forEach((card, index) => {
      console.log(`Card ${index + 1}:`);
      console.log(`Q: ${card.front}`);
      console.log(`A: ${card.back}`);
      if (card.imageKeyword) {
        console.log(`Image: ${card.imageKeyword}`);
      }
      console.log("---\n");
    });
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

test();
