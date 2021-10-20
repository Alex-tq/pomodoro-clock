import React from 'react';
function TimerControls(props){ 
    return(
      <div id="controls-container">
        <button id="start_stop" onClick={props.startStopTimer} class={props.icon}></button>
        <button id="reset" onClick={props.handleClick} class='fas fas fa-sync-alt'></button>
      </div>
    )
  }
export default TimerControls;