/* creates a board and stores game state matrix */
import React from 'react';
import Row from './Row.jsx';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ],
      players: ['red', 'blue'],
      currentPlayerIndex: 0
    }
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(e, idx) {
    let currentMatrix = this.state.board;
    let player = this.state.players[this.state.currentPlayerIndex];
    let final = [];
    for (let i = 0; i < currentMatrix.length; i++) {
      let nextRow = currentMatrix[i + 1];
      if (nextRow === undefined || nextRow[idx]) {
        currentMatrix[i][idx] = player;
        final.push(i, idx);
        break;
      }
    }
    this.setState({
      board: currentMatrix,
      currentPlayerIndex: player === 'red' ? 1 : 0
    });
    this.checkWin(final, currentMatrix);
  }

  checkWin(pos, matrix) {
    let lat = pos[1];
    let long = pos[0];
    let winningString = this.state.players[this.state.currentPlayerIndex].repeat(4);
    let row = matrix[long].join(''); 
    let col = matrix.reduce((str, row) => (str + row[lat]), '');
    if (col.search(winningString) >= 0 || row.search(winningString) >= 0) {
      alert('game over');
      return;
    }
    let axis = '';
    let initIdx = lat - long;

    for (let i = 0; i < matrix.length; i++) {
      if (initIdx < 0) {
        initIdx++;
        continue;
      } else {
        axis += matrix[i][initIdx];
        initIdx++;
      }
    }

    if (axis.search(winningString) >= 0) {
      alert('game over');
      return;
    }

    axis = '';
    initIdx = lat + long;

    for (let i = 0; i < matrix.length; i++) {
      if (initIdx > matrix.length - 1) {
        initIdx--;
        continue;
      } else {
        axis += matrix[i][initIdx];
        initIdx--;
      }
    }
    
    if (axis.search(winningString) >= 0) {
      alert('game over');
      return;
    }
  }

  render() {
    return (
      <div id="matrix">
        <div id="board-head">
          {this.state.board.map((row, idx) => (
            <button 
              key={idx} 
              className={`drop-btn ${this.state.players[this.state.currentPlayerIndex]}`} 
              onClick={(e) => this.handleDrop(e, idx)}
              >Drop</button>
          ))}
        </div>
        {this.state.board.map((row, idx) => (
          <Row row={row} key={idx}/>
        ))}
      </div>
    );
  }
}