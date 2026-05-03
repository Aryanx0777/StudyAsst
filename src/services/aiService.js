export function summarizeText(text) {
  if (!text.trim()) {
    return 'Add notes first, then click Summarize.';
  }

  return 'Dummy summary: These notes cover the main ideas, key definitions, and important points to review before studying.';
}

export function generateQuiz(text) {
  if (!text.trim()) {
    return ['Add notes first, then click Generate Quiz.'];
  }

  return [
    'What is the main topic covered in these notes?',
    'Which key term should you define from the material?',
    'What is one example that supports the core idea?'
  ];
}
