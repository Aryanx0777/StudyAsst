export function summarizeText(text) {
  if (!text.trim()) {
    return { summary: "Please enter notes first" };
  }

  return {
    summary:
      "Dummy summary: These notes cover the main ideas, key definitions, and important points."
  };
}

export function generateQuiz(text) {
  if (!text.trim()) {
    return [];
  }

  return [
    {
      question: "What is the main topic covered?",
      options: ["A", "B", "C", "D"],
      answer: "A"
    }
  ];
}