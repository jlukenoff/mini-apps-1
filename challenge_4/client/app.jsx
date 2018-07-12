import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="board">
        <h1>Welcome to Connect-Four</h1>
        <Board />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


