import React from 'react';

const Space = (props) => {
  return (
    <div className={`space ${props.space || ''}`}></div>
  );
}

export default Space;