import React from 'react';
import './Results.css';

const ResultItem = props => {
  const { selected, text, onClick } = props;
  return (
    <li className={`result-item ${selected ? 'selected' : ''}`} onClick={onClick}>
      {text}
    </li>
  ) 
}

export default ResultItem;