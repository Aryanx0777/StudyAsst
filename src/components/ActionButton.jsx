import React from 'react';

function ActionButton({ children, onClick }) {
  return (
    <button className="action-button" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default ActionButton;
