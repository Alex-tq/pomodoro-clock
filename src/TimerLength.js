import React from 'react';

function TimerLength(props){ 
    return (
      <div id={props.id}>
        <h2 className='lengthLabels'>{props.label}</h2>
        <div className='lengthControls'>
          <button id={props.decrementButton} onClick={props.handleClick}>-</button>
          <h3 id={props.timerLengthId}>{props.length}</h3>
          <button id={props.incrementButton} onClick={props.handleClick}>+</button>
        </div>
      </div>
    )
  }

  export default TimerLength;