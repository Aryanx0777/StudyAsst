import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { generateQuiz, summarizeText } from '../services/aiService.js';

function Home() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const resultRef = useRef(null);
  const quizItems = Array.isArray(quiz) ? quiz : [];

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert('Please enter some text first.');
      return;
    }

    setLoading(true);
    const result = await summarizeText(text);
    setSummary(result?.summary || '');
    setLoading(false);
    resultRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    resultRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOptionClick = (questionIndex, selectedOption, correctAnswer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: {
        selected: selectedOption,
        correct: correctAnswer,
      },
    }));
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          width: '240px',
          padding: '24px 16px',
          background: '#020617',
          borderRight: '1px solid rgba(148,163,184,0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            marginBottom: '24px',
            fontWeight: '600',
          }}
        >
          SmartStudy
        </h2>

        {['Dashboard', 'Notes', 'Summaries', 'Quizzes'].map((item) => (
          <div
            key={item}
            onClick={() => setActiveTab(item)}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              marginBottom: '8px',
              cursor: 'pointer',
              color: activeTab === item ? '#fff' : '#94a3b8',
              background: activeTab === item ? '#1e293b' : 'transparent',
              transition: '0.2s',
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          padding: '32px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '24px',
          }}
        >
          SmartStudy AI
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              style={{
                background: '#020617',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid rgba(148,163,184,0.1)',
                transition: '0.2s ease',
              }}
            >
              <h3 style={{ marginBottom: '12px' }}>
                Notes
              </h3>

              <textarea
                id="notes"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Paste your class notes here..."
                rows={9}
                style={{
                  width: '100%',
                  height: '140px',
                  background: '#020617',
                  color: '#e2e8f0',
                  border: '1px solid rgba(148,163,184,0.1)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '16px',
                }}
              >
                <motion.button
                  onClick={handleSummarize}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: '#2563eb',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  {loading ? 'Processing...' : 'Summarize'}
                  {loading && (
                    <span
                      style={{
                        marginLeft: '8px',
                        width: '12px',
                        height: '12px',
                        border: '2px solid #fff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                  )}
                </motion.button>

                <motion.button
                  onClick={handleGenerateQuiz}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: '#7c3aed',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  {loading ? 'Processing...' : 'Generate Quiz'}
                  {loading && (
                    <span
                      style={{
                        marginLeft: '8px',
                        width: '12px',
                        height: '12px',
                        border: '2px solid #fff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <div
              style={{
                marginTop: '24px',
                display: 'grid',
                gap: '20px',
              }}
            >
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                style={{
                  background: '#020617',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid rgba(148,163,184,0.1)',
                  transition: '0.2s ease',
                }}
              >
                <h3 style={{ marginBottom: '10px' }}>
                  Summary
                </h3>
                <p style={{ color: '#94a3b8' }}>
                  {summary || 'Your summary will appear here.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                style={{
                  background: '#020617',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid rgba(148,163,184,0.1)',
                  transition: '0.2s ease',
                }}
              >
                <h3 style={{ marginBottom: '10px' }}>
                  Quiz
                </h3>
                <div>
                  {quizItems.length > 0 ? (
                    quizItems.map((q, index) => (
                      <div key={index} style={{ marginBottom: '20px' }}>
                        <p style={{ fontWeight: '600', marginBottom: '8px' }}>
                          {index + 1}. {q?.question || `Question ${index + 1}`}
                        </p>

                        {Array.isArray(q?.options) && q.options.map((opt, i) => {
                          const selectedData = selectedAnswers[index];
                          const isSelected = selectedData?.selected === opt;
                          const isCorrect = q?.answer === opt;

                          let bg = '#e5e7eb';

                          if (selectedData) {
                            if (isCorrect) bg = '#bbf7d0';
                            else if (isSelected && !isCorrect) bg = '#fecaca';
                          }

                          return (
                            <div
                              key={i}
                              onClick={() => handleOptionClick(index, opt, q?.answer)}
                                style={{
                                  padding: '10px',
                                  borderRadius: '6px',
                                  marginBottom: '6px',
                                  cursor: 'pointer',
                                  background: bg,
                                  border: '1px solid #ccc',
                                  transition: '0.2s',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  pointerEvents: selectedAnswers[index] ? 'none' : 'auto',
                                  color: '#0f172a',
                                }}
                              >
                                <strong>
                                  {String.fromCharCode(65 + i)}.
                                </strong>
                                <span>{opt}</span>
                              </div>
                            );
                        })}
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#94a3b8' }}>Generated quiz questions will appear here.</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            style={{
              background: '#020617',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(148,163,184,0.1)',
              height: 'fit-content',
              transition: '0.2s ease',
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>
              What would you like to do?
            </h3>

            <p
              style={{
                fontSize: '13px',
                color: '#94a3b8',
                marginBottom: '16px',
              }}
            >
              Choose an action to get started
            </p>

            <motion.button
              onClick={handleSummarize}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: '#1e293b',
                color: '#e2e8f0',
                border: 'none',
                marginBottom: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: '0.2s',
              }}
            >
              Summarize Notes
            </motion.button>

            <motion.button
              onClick={handleGenerateQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: '#1e293b',
                color: '#e2e8f0',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: '0.2s',
              }}
            >
              Generate Quiz
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
