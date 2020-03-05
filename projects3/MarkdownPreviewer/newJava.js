'use strict';

const e = React.createElement;

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '# H1\n\
## H2\n\
Strong emphasis, aka bold, with **asterisks** or __underscores__.\n\n\
[link](https:\/\/www.example.com)\n\n\
Inline `code` has `back-ticks around` it.\n\
```javascript\n\
var s = "JavaScript syntax highlighting";\n\
alert(s);\n\
```\n\
1. First ordered list item\n\
2. Another item\n\
1. Actual numbers don\'t matter, just that it\'s a number\n\
> Blockquotes are very handy in email to emulate reply text.\n\
> This line is part of the same quote.\n\
Reference-style:\n\
![alt text][logo]\n\
[logo]: https:\/\/github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"',
      fullSize: [false, false]
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleSizeEditor = this.toggleSizeEditor.bind(this);
    this.toggleSizePreview = this.toggleSizePreview.bind(this);    
  }

  handleChange(event) {
    this.setState({
      input: event.target.value 
    });
  }

  toggleSizeEditor() {
    this.setState(state => ({
      fullSize: [!state.fullSize[0], state.fullSize[1]]
    }));
  }

  toggleSizePreview() {
    this.setState(state => ({
      fullSize: [state.fullSize[0], !state.fullSize[1]]
    }));
  }  

  render() {
    var iCon = 'fas fa-expand-arrows-alt';
    var siZe = '';
    if (this.state.fullSize[0] || this.state.fullSize[1]) {
      var iCon = 'fas fa-compress-arrows-alt';
      var siZe = 'textareaBig';
    }
    if (this.state.fullSize[0]) {
      return e(GetInput, 
       {
         key: '1',
         input: this.state.input, 
         handleChange: this.handleChange, 
         toggleSize: this.toggleSizeEditor, 
         size: siZe, 
         icon: iCon
       });
    }
    else if (this.state.fullSize[1]) {  
      return e(GetOutput, 
              {
                key: '2',
                input: this.state.input,
                toggleSize: this.toggleSizePreview, 
                size: siZe, 
                icon: iCon              
              })
    }
    else {
      return [
        e(GetInput, 
          {
            key: '1',
            input: this.state.input, 
            handleChange: this.handleChange, 
            toggleSize: this.toggleSizeEditor, 
            size: siZe, 
            icon: iCon
          }),
        e(GetOutput, 
          {
            key: '2',
            input: this.state.input,
            toggleSize: this.toggleSizePreview, 
            size: siZe, 
            icon: iCon              
          })
      ];

    }  

  }
};


class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      e('div', {id: 'editorContainer', className: 'container-fluid center'},
        [
        e(HeadLine, {key: '1', title: 'Editor', toggleSize: this.props.toggleSize, icon: this.props.icon}),
        e('textarea',
          { 
            id: 'editor',
            key: '2',
            rows: '20',
            cols: '50',
            className: this.props.size,
            onChange: this.props.handleChange,
            value: this.props.input,
            autoFocus: true
          },
        )
        ]
      )  
    );
  }
};

class GetOutput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      e('div', {id: 'previewContainer', className: 'container-fluid center'},
        [
          e(HeadLine, {key: '1', title: 'Preview', toggleSize: this.props.toggleSize, icon: this.props.icon}),
          e(
            'div',
            {
              id: 'preview',
              key: '2',
              dangerouslySetInnerHTML: {__html: marked(this.props.input)},
              className: this.props.size + ' preview'
            },
            
          )
        ]
      )
    )

  }
}

class HeadLine extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var icon = e('i', {className: 'far fa-eye'});
    if (this.props.title == 'Editor') {
      icon = e('i', {className: 'far fa-edit'});
    }
    return e('div', {className: 'headline'},
            [
              e('div', {key: 1}, icon),
              e('div', {id: 'headTitle', key: 2}, this.props.title),
              e(ScreenSizeButton, {key: 3, toggleSize: this.props.toggleSize, icon: this.props.icon})
            ]
           );
  }
}

class ScreenSizeButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return e('div', {},  
               e('button', {onClick: this.props.toggleSize}, 
                 e('i', {className: this.props.icon})
               ) 
             )
  } 

}

ReactDOM.render(e(MyApp), document.getElementById('container'));