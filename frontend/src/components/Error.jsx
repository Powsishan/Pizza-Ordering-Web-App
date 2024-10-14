// src/components/Error.jsx
import React from 'react';
import '../assets/styles/Error.css';

const Error = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <h2>Oops! Something went wrong.</h2>
      <p>{message || "Network error occurred. Please try again later."}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
