import React, { useRef, useEffect } from 'react';
import './Results.css';

const ResultItem = props => {
  const { selected, text, onClick } = props;
  const itemRef = useRef(null);

  useEffect(() => {
    if (selected) {
      scrollTo();
    }
  }, [selected]);

  const scrollTo = () => {
    itemRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  const handleClick = () => {
    onClick();
    scrollTo();
  }

  return (
    <li
      ref={itemRef}
      className={`result-item ${selected ? 'active' : ''}`}
      onClick={handleClick}
    >
      {text}
    </li>
  )
}

export default ResultItem;