import React from 'react';

function ActionButton({ children, onClick, disabled, style, onMouseOver, onMouseOut }) {
  return (
    <button
      className="action-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={style}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </button>
  );
}

export default ActionButton;
