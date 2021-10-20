import React from 'react';

function Timer(props){
    return (
      <div id='timer-container'>
        <h2 id='timer-label'>{props.label}</h2>
        <h1 id="time-left">{props.minutes}:{props.seconds}</h1>
      </div>
    )
  }

export default Timer;