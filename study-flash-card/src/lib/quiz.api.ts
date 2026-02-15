interface Card {
  id: string;
  front: string;
  back: string;
}

interface QuizQuestion {
  cardId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export function generateQuiz(
  cards: Card[],
  numQuestions: number = 10,
): QuizQuestion[] {
  // Shuffle and take first N cards
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(numQuestions, cards.length));

  return selected.map((card) => {
    // Get 3 wrong answers from other cards
    const wrongAnswers = cards
      .filter((c) => c.id !== card.id && c.back !== card.back)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => c.back);

    // If not enough wrong answers, add generic ones
    while (wrongAnswers.length < 3) {
      wrongAnswers.push(`Option ${wrongAnswers.length + 1}`);
    }

    // Shuffle correct answer with wrong ones
    const allOptions = [card.back, ...wrongAnswers].sort(
      () => Math.random() - 0.5,
    );

    return {
      cardId: card.id,
      question: card.front,
      options: allOptions,
      correctAnswer: card.back,
    };
  });
}
