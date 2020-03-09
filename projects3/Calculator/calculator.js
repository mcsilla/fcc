'use strict';

const buttonSigns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '=', 'AC'];
const buttonIDs = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'add', 'subtract', 'multiply', 'divide', 'decimal', 'equals', 'clear'];


const e = React.createElement;

console.log(eval('3*-2'));

class MyCalculator extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      fullInput: '',
      input: '0',
      phase: 0
    }
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  buttonClicked(event) {
    let newButtonID = event.target.id;
    let newButtonSign = event.target.textContent;
    if ( newButtonID == 'clear' ) {
      this.setState(state => ({
        fullInput: '',
        input: '0',
        phase: 0,
        decimalClickable: true
        }));
    }
    else if ( newButtonID == 'equals') {
      if ( this.state.phase == 1  ) {
        let exp = this.state.fullInput + Number(this.state.input);
        let result = eval(exp);
        this.setState(state => ({
          fullInput: exp + '=',
          input: result,
          phase: 2,
          decimalClickable: true
          }));   
      }   
    }

    else {
      if ( this.state.phase == 0 ) {
          if ( newButtonID == 'decimal' ) {
            this.setState(state => ({
            fullInput: '',
            input: '0.',
            phase: 1,
            decimalClickable: false
          }));
          }

          else if ( !['divide', 'multiply', 'add', 'subtract', 'zero'].includes(newButtonID) ){
            this.setState(state => ({
            input: newButtonSign,
            phase: 1
            }));
          }
      }
      else if ( this.state.phase == 'operators' ) {
        if ( newButtonID == 'decimal' ) {
            this.setState(state => ({
              fullInput: state.fullInput + state.input,
              input: '0.',
              phase: 1,
              decimalClickable: false
            }));
        }
        else if ( !['divide', 'multiply', 'add', 'subtract'].includes(newButtonID) ){
          this.setState(state => ({
            fullInput: state.fullInput + state.input,
            input: newButtonSign,
            phase: 1
          }));
          if ( newButtonID == 'zero' ) {
            this.setState(state => ({
              phase: 0
            }));          
          }
        }
        else if ( ['divide', 'multiply'].includes(newButtonID) ) {
          this.setState(state => ({
            input: newButtonSign
          }));            
        }
        else if ( ['add', 'subtract'].includes(newButtonID) ) {
          if ( this.state.input == '*' || this.state.input == '/' ) { 
            this.setState(state => ({
              input: state.input + newButtonSign
            }));  
          }
          else {
            this.setState(state => ({
              input: newButtonSign
            }));           
          }          
        }

      }      
      else if ( this.state.phase == 1 ) { 
        if ( ( newButtonID == 'decimal' && this.state.decimalClickable ) || !['decimal', 'add', 'multiply', 'subtract', 'divide'].includes(newButtonID) ) {
          this.setState(state => ({
          input: state.input + newButtonSign,
          }));
          if ( newButtonID == 'decimal' ) {
            this.setState(state => ({
            decimalClickable: false
            }));          
          }
        }
        else if ( ['add', 'multiply', 'subtract', 'divide'].includes(newButtonID) ) {
          this.setState(state => ({
          fullInput: state.fullInput + Number(state.input).toString(),
          input: newButtonSign,
          phase: 'operators',
          decimalClickable: true
          }));
          console.log(this.state.input);
          console.log(Number(this.state.input));
        }
      }
      else if ( this.state.phase == 2 ) {
        if ( !['divide', 'multiply', 'add', 'subtract'].includes(newButtonID) ) {
          if ( newButtonID == 'decimal' ) {
            this.setState(state => ({
              fullInput: '',
              input: '0.',
              phase: 1,
              decimalClickable: false
          }));
          }

          else {
            this.setState(state => ({
              fullInput: '',
              input: newButtonSign,
              phase: 0,
              decimalClickable: true
            }));
            if ( newButtonID != 'zero') {
              this.setState(state => ({
                phase: 1,
              }));             
            }
          }
        }
        else {
          this.setState(state => ({
            fullInput: state.input + newButtonSign,
            input: '0',
            phase: 0,
            decimalClickable: true
          }));          
        }

      }
    }
  }

  render() {
    return [e(CalcDisplay, {key: 1, fullInput: this.state.fullInput, input: this.state.input}),
            e(CalcButtonsPad, {key: 2, buttonClicked: this.buttonClicked})];            
  }

}

const CalcDisplay = function(props) {
  return e('div', {id: 'displayContainer'}, [
                                     e('div', {key: 1, id: 'displayUpper'}, props.fullInput),
                                     e('div', {key: 2, id: 'display'}, props.input)
                                   ])
}

const CalcButtonsPad = function(props) {
  let buttons = [];
  let numOfButtons = buttonSigns.length;
  for (let i = 0; i < numOfButtons; i++) {
    buttons.push(e(CalcButton, {
               key: i,
               id: buttonIDs[i],
               buttonID: buttonIDs[i],
               buttonClicked: props.buttonClicked,
               buttonSign: buttonSigns[i],
             }
             ));
    }
  return e('div', {id: 'calcButtonsPad'}, buttons);
};


class CalcButton extends React.Component {
  constructor(props) {
    super(props); 
  }
  render() {
    return e('div', {id: this.props.buttonID, className: "calcButton", onClick: this.props.buttonClicked}, this.props.buttonSign)       
  }
}



ReactDOM.render(e(MyCalculator), document.getElementById('calculator'));