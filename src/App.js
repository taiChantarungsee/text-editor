import React, { Component } from 'react';
const electron = window.require('electron'); //Switching to different style because of issue with webpack.
const ipc = electron.ipcRenderer;

import SplitPane from 'react-split-pane';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import GoogleButtonComponent from './GoogleButtonComponent';
import GoogleModalComponent from './GoogleModalComponent';
import Editor from './editor.js';

var theme = createMuiTheme({ //Check this into 'MuiThemeProvider as a 'theme' if you want to customize it
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      markdownSrc: "# Hello World",
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the text editor</h1>
        </header>
        <MuiThemeProvider>
          <div>
            <GoogleButtonComponent />
            <GoogleModalComponent />
          </div>
        </MuiThemeProvider>
        <SplitPane split="vertical" defaultSize="50%">
          <div className="editor-pane">
            <Editor className="editor" value={this.state.markdownSrc}/>
          </div>
          <div className="view-pane">
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default App;