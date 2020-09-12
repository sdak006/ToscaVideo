import React from 'react';
import './Results.css';
import ResultItem from './ResultItem.js';

const ResultItemList = props => {
  const { listItems, isItemSelected, onItemClick } = props;
  return (
    <ul className={'Result-item-list'}>
      {
        listItems.map(item => {
          const startTime = Math.floor(parseFloat(item.StartTime));
          const endTime = Math.floor(parseFloat(item.EndTime));
          return (
            <ResultItem
              text={item.Name}
              selected={isItemSelected(startTime, endTime)}
              onClick={() => onItemClick(startTime)}
            />
          )
        })
      }
    </ul>
  )
}

export default ResultItemList;