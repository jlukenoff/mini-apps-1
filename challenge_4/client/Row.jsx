import React from 'react';
import Space from './Space.jsx';

const Row = (props) => {
  return (
    <div className="row">
      {props.row.map((space, idx) => (
        <Space space={space} key={idx}/>
      ))}
    </div>
  );
};

export default Row;