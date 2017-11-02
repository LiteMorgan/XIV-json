import React, { Component } from 'react';
import InputField           from './components/InputField';
import CodeWindow           from './components/CodeWindow';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
    }
  }


  handleChange = newData => {
    this.setState({data: newData});
  }


  render() {
    return (
      <div className="App">
        <InputField stateChanges={this.handleChange}/>

        <CodeWindow code={this.state.data} />
      </div>
    );
  }
}

export default App;
