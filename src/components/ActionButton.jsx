import React from 'react';

function ActionButton({ children, onClick, disabled, style }) {
  return (
    <button className="action-button" type="button" onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
}

export default ActionButton;
