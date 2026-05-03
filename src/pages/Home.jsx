import React, { useState } from 'react';
import ActionButton from '../components/ActionButton.jsx';
import ResultSection from '../components/ResultSection.jsx';
import { generateQuiz, summarizeText } from '../services/aiService.js';

function Home() {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState([]);

  const handleSummarize = () => {
    const result = summarizeText(notes);
    setSummary(result);
  };

  const handleGenerateQuiz = () => {
    const result = generateQuiz(notes);
    setQuiz(result);
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
          <ActionButton onClick={handleSummarize}>Summarize</ActionButton>
          <ActionButton onClick={handleGenerateQuiz}>Generate Quiz</ActionButton>
        </div>

        <ResultSection title="Summary">
          {summary || 'Your summary will appear here.'}
        </ResultSection>

        <ResultSection title="Quiz Questions">
          {quiz.length > 0 ? (
            <ol className="quiz-list">
              {quiz.map((question) => (
                <li key={question}>{question}</li>
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
