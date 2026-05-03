import React from 'react';

function ResultSection({ children, title }) {
  return (
    <section className="result-section">
      <h2>{title}</h2>
      <div className="result-content">{children}</div>
    </section>
  );
}

export default ResultSection;
