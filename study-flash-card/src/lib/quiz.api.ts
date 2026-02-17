import { api } from "./api";

interface QuizQuestion {
  cardId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizAPI = {
  // Generate quiz using LLM backend
  generateQuiz: async (deckId: string): Promise<QuizQuestion[]> => {
    const response = await api.post(`/decks/${deckId}/quiz`);
    return response.data.quiz;
  },
};
