import React from 'react';

function ResultSection({ children, title, style, contentStyle, titleStyle }) {
  return (
    <section className="result-section" style={style}>
      <h2 style={titleStyle}>{title}</h2>
      <div className="result-content" style={contentStyle}>{children}</div>
    </section>
  );
}

export default ResultSection;
