import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import Editor from './editor.js';

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
          <MyAwesomeReactComponent />
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