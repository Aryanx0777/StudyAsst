import React, { useState } from 'react';
import ActionButton from '../components/ActionButton.jsx';
import ResultSection from '../components/ResultSection.jsx';
import { generateQuiz, summarizeText } from '../services/aiService.js';

function Home() {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const result = await summarizeText(notes);
    setSummary(result.summary);
    setIsSummarizing(false);
  };

  const handleGenerateQuiz = async () => {
    setIsGeneratingQuiz(true);
    const result = await generateQuiz(notes);
    setQuiz(result);
    setIsGeneratingQuiz(false);
  };

  return (
    <main className="app-shell">
      <section className="study-panel">
        <div className="header">
          <p className="eyebrow">Hackathon prototype</p>
          <h1>SmartStudy AI</h1>
        </div>

        <label className="notes-label" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Paste your class notes here..."
          rows={9}
        />

        <div className="actions">
          <ActionButton disabled={isSummarizing} onClick={handleSummarize}>
            {isSummarizing ? 'Summarizing...' : 'Summarize'}
          </ActionButton>
          <ActionButton disabled={isGeneratingQuiz} onClick={handleGenerateQuiz}>
            {isGeneratingQuiz ? 'Generating...' : 'Generate Quiz'}
          </ActionButton>
        </div>

        <ResultSection title="Summary">
          {summary || 'Your summary will appear here.'}
        </ResultSection>

        <ResultSection title="Quiz Questions">
          {quiz.length > 0 ? (
            <ol className="quiz-list">
              {quiz.map((q, index) => (
                <li key={index}>
                  <p>{q.question}</p>
                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          ) : (
            'Generated quiz questions will appear here.'
          )}
        </ResultSection>
      </section>
    </main>
  );
}

export default Home;
