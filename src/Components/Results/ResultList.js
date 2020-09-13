import React from 'react';
import './Results.css';
import ResultItem from './ResultItem.js';

const ResultItemList = props => {
  const { listItems, isItemSelected, onItemClick } = props;
  return (
    <ul className={'result-item-list'}>
      {
        listItems.map((item, index) => {
          const startTime = Math.floor(parseFloat(item.StartTime));
          const endTime = Math.floor(parseFloat(item.EndTime));
          return (
            <ResultItem
              key={index}
              selected={isItemSelected(startTime, endTime)}
              text={item.Name}
              onClick={()=>onItemClick(startTime)}
            />
          )
        })
      }
    </ul>
  )
}

export default ResultItemList;