import React, { useState } from 'react';
import ActionButton from '../components/ActionButton.jsx';
import ResultSection from '../components/ResultSection.jsx';
import { generateQuiz, summarizeText } from '../services/aiService.js';

function Home() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert('Please enter some text first.');
      return;
    }

    setLoading(true);
    const result = await summarizeText(text);
    setSummary(result.summary);
    setLoading(false);
  };

  const handleGenerateQuiz = async () => {
    if (!text.trim()) {
      alert('Please enter some text first.');
      return;
    }

    setLoading(true);
    const result = await generateQuiz(text);
    setQuiz(result);
    setLoading(false);
  };

  return (
    <main className="app-shell">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
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
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste your class notes here..."
            rows={9}
            style={{ width: '100%', height: '150px', marginBottom: '10px' }}
          />

          <div className="actions" style={{ marginBottom: '10px' }}>
            <ActionButton
              onClick={handleSummarize}
              disabled={loading}
              style={{ marginRight: '10px', marginBottom: '10px' }}
            >
              {loading ? 'Loading...' : 'Summarize'}
            </ActionButton>
            <ActionButton
              onClick={handleGenerateQuiz}
              disabled={loading}
              style={{ marginBottom: '10px' }}
            >
              {loading ? 'Loading...' : 'Generate Quiz'}
            </ActionButton>
          </div>

          <ResultSection
            title="Summary"
            style={{ marginTop: '20px' }}
            contentStyle={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}
          >
            <p>{summary ? summary : 'Your summary will appear here.'}</p>
          </ResultSection>

          <ResultSection
            title="Quiz"
            style={{ marginTop: '20px' }}
            contentStyle={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}
          >
            <div>
              {quiz.length > 0 ? (
                quiz.map((q, index) => (
                  <div key={index}>
                    <p><strong>{q.question}</strong></p>
                    <ul>
                      {q.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>Generated quiz questions will appear here.</p>
              )}
            </div>
          </ResultSection>
        </section>
      </div>
    </main>
  );
}

export default Home;
