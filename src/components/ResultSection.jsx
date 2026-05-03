import React from 'react';

function ResultSection({ children, title, style, contentStyle }) {
  return (
    <section className="result-section" style={style}>
      <h2>{title}</h2>
      <div className="result-content" style={contentStyle}>{children}</div>
    </section>
  );
}

export default ResultSection;
