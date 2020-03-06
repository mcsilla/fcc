'use strict';

const e = React.createElement;
var myCounter;
var playPauseClass = 'fas fa-play';
var myAudio;

class Timer extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      min: '25',
      sec: '00',
      length: [25, 5],
      phase: true,
      counting: false,
    }
    this.countDown = this.countDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.numberToMin = this.numberToMin.bind(this);
  }

  numberToMin(num) {
    if ( num < 10 ) {
      return '0' + num;
    }
    else {
      return num.toString();
    }
  }

  handleClick(event) {
    let elementID = event.target.id;

    if (!this.state.counting) {
      if ( elementID == 'break-increment' ) {
        console.log(elementID);
          this.setState(state => ({
            length: [state.length[0], state.length[1] + 1],
            sec: '00',
                 }));
      } else if ( elementID == 'break-decrement' ) {   
        console.log(elementID);
          this.setState(state => ({
            length: [state.length[0], state.length[1] - 1],
            sec: '00',
                 })); 
      } else if ( elementID == 'session-increment' ) {
        console.log(elementID);
          this.setState(state => ({
            length: [state.length[0] + 1, state.length[1]],
            sec: '00',
                 })); 
      } else if ( elementID == 'session-decrement' ) {
        console.log(elementID);
          this.setState(state => ({
            length: [state.length[0] - 1, state.length[1]],
            sec: '00',
                 })); 
      } else if ( elementID == 'start_stop' ) {
          console.log(elementID);
          this.setState(state => ({
            counting: true,
          }));        
          myCounter = setInterval(
            this.countDown,
            1000
          );
          playPauseClass = 'fas fa-pause';
      }
      if ( elementID != 'start_stop' ) {
        if (this.state.phase) {
          this.setState(state => ({
            min: this.numberToMin(state.length[0]) 
          }));
        } else {
          this.setState(state => ({
            min: this.numberToMin(state.length[1]) 
          }));      
        }
      }
    } else if ( elementID == 'start_stop' ) {
        this.setState(state => ({
          counting: false,
        }));
        console.log(elementID);
        clearInterval(myCounter);
        playPauseClass = 'fas fa-play';
    }

  if ( elementID == 'reset' ) {
    if (this.state.counting) {
      clearInterval(myCounter);     
    }

    this.setState(state => ({
      min: this.numberToMin(state.length[0]),
      sec: '00',
      phase: true,
      counting: false,       
    }));    
  }

  }

  countDown() {
    let min = this.state.min;
    let sec = this.state.sec;
    if ( sec == '00' && min != '00' ) {
      let nextMin = Number(min) - 1;
      if ( nextMin - 10 < 0 ) {
        this.setState(state => ({
            min: '0' + nextMin,
            sec: '59'
                }));
      }
      else {
        this.setState(state => ({
            min: nextMin.toString(),
            sec: '59'
                }));
      }
    }
    else if ( sec != '00' ) {
      let nextSec = Number(sec) - 1;
      if ( nextSec - 10 < 0 ) {
        this.setState(state => ({
            sec: '0' + nextSec
                }));
      }
      else {
        this.setState(state => ({
            sec: nextSec
                }));
      }
      if ( min == '00' && Number(sec) <= 4 && Number(sec) > 1) {
        myAudio = document.getElementById('last-secs'); 
          myAudio.play();
      }
      if ( min == '00' && Number(sec) == 1 ) {
        myAudio = document.getElementById('time-end'); 
          myAudio.play();
      }
    }
    else {
      console.log('over')
      if (this.state.phase) {
          this.setState(state => ({
            min: this.numberToMin(state.length[1]) 
          }));
      } else {
          this.setState(state => ({
            min: this.numberToMin(state.length[0]) 
          }));      
      }
      this.setState(state => ({
        phase: !state.phase 
      }));
    }

  }

  render() {
    let phaseTitle = 'Session';
    if (!this.state.phase) {
      phaseTitle = 'Break';
    }

    return [
      e(SetLength, {key: 1, handleClick: this.handleClick, breakLength: this.state.length[1], sessionLength: this.state.length[0] }),
      e('div',{key: 2, id: 'display'}, 
              [
               e('div', {key: 1, id: 'timer-label'}, phaseTitle),
               e('div', {key: 2, id: 'time-left'}, this.state.min + ':' + this.state.sec)
              ]
        ),
       e('div', {key: 3, id: 'play-pause-reset'}, [
                e('div', {key:1}, e('i', {id: 'start_stop', onClick: this.handleClick, className: playPauseClass})),
              e('div', {key: 2}, e('i', {id: 'reset', onClick: this.handleClick, className: 'fas fa-sync'}))
        ]),
       e('audio', {key: 4, id: 'last-secs', src: 'audio/microscopic-kick.wav' , className: "clip", type: "audio/wav"}),
       e('audio', {key: 5, id: 'time-end', src: 'audio/squeaky-clown-horn.wav' , className: "clip", type: "audio/wav"})
       ];
  }
}


const SetLength = function(props) {
  return e('div', {id: 'control-panel'}, 
         [
          e('div', {key: 1, id: 'break-label' }, 'Break Length:'),
          e(Controls, {key: 2, idLength: 'break-length', idPlus: 'break-increment', idMinus: 'break-decrement', handleClick: props.handleClick, length: props.breakLength}),
          e('div', {key: 3, id: 'session-label' }, 'Session Length:'),
          e(Controls, {key: 4, idLength: 'session-length', idPlus: 'session-increment', idMinus: 'session-decrement', handleClick: props.handleClick, length: props.sessionLength})
         ]);
}

const Controls = function(props) {
  return e('div', {id: 'control-buttons'}, 
             [
               e('div', {key: 1, id: props.idLength}, props.length),
               e('i', {key: 2, id: props.idPlus, className: 'fas fa-plus-circle', onClick: props.handleClick} ),
               e('i', {key: 3, id: props.idMinus, className: 'fas fa-minus-circle', onClick: props.handleClick} ),
             ]);

}

ReactDOM.render(e(Timer), document.getElementById('clock'));