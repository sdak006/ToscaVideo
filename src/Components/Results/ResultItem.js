import React from 'react';
import './Results.css';

const ResultItem = props => {
  const { selected, text, onClick } = props;
  return (
    <li className={`Result-item ${selected ? 'Selected' : ''}`} onClick={onClick}>
      {text}
    </li>
  ) 
}

export default ResultItem;