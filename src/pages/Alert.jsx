import React from 'react';
import './Alert.css';

const Alert = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert ${type}`}>
      <span className="alert-message">{message}</span>
      <span className="alert-close" onClick={onClose}>&times;</span>
    </div>
  );
};

export default Alert;
