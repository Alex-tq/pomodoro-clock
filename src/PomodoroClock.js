import React from 'react';
import TimerLength from './TimerLength'
import Timer from './Timer'
import TimerControls from './TimerControls'
import './App.css';


class PomodoroClock extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timerMinutes: 25,
      timerSeconds: '00',
      isPlaying: false,
      intervalId: '',
      timerLabel: 'Session'
    }
    this.handleClick = this.handleClick.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
  }
  handleClick(event){  
    switch(event.target.id){   
      case 'break-decrement':
        this.setState(state => {
          if(state.breakLength > 1){
            return{breakLength: state.breakLength - 1}
          }
        })
        break;
      case 'break-increment':
        this.setState(state => {
          if(state.breakLength < 60){
            return{breakLength: state.breakLength + 1}
          }
        })
        break;
      case 'session-decrement':
        this.setState(state => {
          if(state.sessionLength > 1){
            return {
              sessionLength: state.sessionLength - 1,
              timerMinutes: state.timerMinutes < 11? '0'+String(state.timerMinutes-1): state.timerMinutes-1
            }
          }
        })
        break;
      case 'session-increment':
        this.setState(state => {
          if(state.sessionLength < 60){
            return{
              sessionLength: state.sessionLength + 1,
              timerMinutes: state.timerMinutes < 9? '0'+String(Number(state.timerMinutes)+1): Number(state.timerMinutes)+1
            }
          }
        })
        break;
      case 'reset':
        clearInterval(this.state.intervalId)
         this.setState(state => ({
          sessionLength: 25,
          breakLength: 5,
          timerMinutes: 25,
          timerSeconds: '00',
          isPlaying: false,
          timerLabel: 'Session'
        }))
        this.sound.pause();
        this.sound.currentTime=0;
        break; 
    }
  }
  startStopTimer(){
    if(!this.state.isPlaying){
      this.setState(state => ({
          isPlaying: true,
          intervalId: setInterval(()=>{
        if(this.state.timerSeconds == 0 && this.state.timerMinutes!=Number('00')){
          this.setState(state => ({
            timerSeconds: 59, 
            timerMinutes: state.timerMinutes < 11? '0'+String(state.timerMinutes-1): state.timerMinutes-1
          }))
        }else if(this.state.timerSeconds == 0 && this.state.timerMinutes==Number('00')){   
          this.sound.play();
          this.setState(state => ({
            timerLabel: state.timerLabel=='Session'? 'Break': 'Session',
            timerSeconds: '00', 
            timerMinutes: state.timerLabel=='Session'?
            state.breakLength < 10? '0'+String(state.breakLength):state.breakLength:
            state.sessionLength < 10? '0'+String(state.sessionLength):state.sessionLength
          }))
        }else{
          this.setState(state => ({
            timerSeconds: state.timerSeconds < 11? '0'+String(state.timerSeconds-1): state.timerSeconds-1, 
          }))
        }       
      }, 1000)
      }))  
    } else {
      clearInterval(this.state.intervalId)
      this.setState({isPlaying: false})
    } 
  }
  render(){
    const {sessionLength, breakLength, isPlaying, timerMinutes, timerSeconds, timerLabel} = this.state;
    return (
      <div id="clock">
        <h1 id='title'>Pomodoro Clock</h1>
        <div id='timer-length-container'>
          <TimerLength 
            label='Break Length'
            id='break-label'
            decrementButton='break-decrement'
            incrementButton='break-increment'
            length={breakLength}
            timerLengthId='break-length'
            handleClick={this.handleClick}
          />
          <TimerLength 
            label='Session Length'
            id='session-label'
            decrementButton='session-decrement'
            incrementButton='session-increment'
            length={sessionLength}
            timerLengthId='session-length'
            handleClick={this.handleClick}
          />
        </div>
        <Timer
          label={timerLabel}
          timerLength={sessionLength}
          minutes={timerMinutes}
          seconds = {timerSeconds}
        />
        <TimerControls
          icon={isPlaying ? 'far fa-pause-circle' : 'fas fa-play-circle'}
          handleClick={this.handleClick}
          startStopTimer={this.startStopTimer}
        />
        <audio 
          id="beep" 
          src="https://freesound.org/data/previews/213/213795_4001802-lq.mp3"
          ref={(audioClip) => { this.sound = audioClip; }}
          />
      </div>    
    )
  }
}

export default PomodoroClock;
