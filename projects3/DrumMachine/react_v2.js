'use strict';

var divIDs = ['cymbal7', 'snare1', 'Crash-HD0', 'Crash-HD2', 'HiTom-0D0', 'Kick-TAAADA', 'MidTom-3D7', 'Snare-T0T0SA', 'Snare-TATASA'];
var audSrcs = ['audio/606-cymbal7.wav', 'audio/606-snare1.wav', 'audio/909-Crash-HD0.wav', 'audio/909-Crash-HD2.wav', 'audio/909-HiTom-0D0.wav', 'audio/909-Kick-TAAADA.wav', 'audio/909-MidTom-3D7.wav', 'audio/909-Snare-T0T0SA.wav', 'audio/909-Snare-TATASA.wav'];
var audIDs = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
var keycodes = [81, 87, 69, 65, 83, 68, 90, 88, 67];


const e = React.createElement;

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {display: ''};
    this.playAudio = this.playAudio.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  playAudio(event) {
    let elementID = event.target.id;  
    this.setState({
      display: elementID
    });
    let indexOfAudio = divIDs.indexOf(elementID); 
    let idOfAudio = audIDs[indexOfAudio];
    var myAudio = document.getElementById(idOfAudio); 
    myAudio.play();
  }

  handleKeyPress(event) {
    let codeIndex = keycodes.indexOf(event.keyCode);
    if (codeIndex >= 0) {
      var myAudio = document.getElementById(audIDs[codeIndex]); 
      myAudio.play();
      this.setState({
        display: divIDs[codeIndex]
      });
    }
  }
  render() {
    return [e(PadContainer, {key: 1, playAudio: this.playAudio}), e('p', {key: 2, id: "display"}, this.state.display)];
  }
}


class PadContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pads = [];
    for (let i = 0; i < 9; i++) {
      pads.push(e(DrumPad, {
               key: i,
               divID: divIDs[i],
               audID: audIDs[i],
               keycode: keycodes[i],
               audSrc: audSrcs[i],
               playAudio: this.props.playAudio,
             }
             ));
    }
    return e('div', {id: "pad-container"}, pads);
  }  
}

class DrumPad extends React.Component {
	constructor(props) {
	  super(props);	
	}



  render() {
    return e('div', {id: this.props.divID, className: "drum-pad", onClick: this.props.playAudio}, 
             [
             e('p', {key: 1}, this.props.audID),
             e('audio', {key: 2, id: this.props.audID, src: this.props.audSrc, className: "clip", type: "audio/wav"})
             ])
                
  }
}

ReactDOM.render(e(DrumMachine), document.getElementById('drum-machine'));