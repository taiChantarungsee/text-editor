import React, { Component } from 'react';
import CodeMirror from '@skidding/react-codemirror';
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/theme/monokai.css');

class Editor extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  handleChange() {
    this.setState({value: event.target.value});
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var options = {
      mode: 'markdown',
      theme: 'monokai',
    }
    return (
      <CodeMirror value={this.props.value}
      onChange={this.handleChange} 
      options={options} height="100%"/>
    );
  }
}
export default Editor;