import React, { Component } from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

class App extends Component {
 constructor() {
    super();
    this.state = {
      winner: undefined,
    };
    this.gameState = {
        turn: 'X',
        gameLocked: false,
        gameEnded: false,
        board: Array(9).fill(''),
        totalMoves: 0
    } 
  }
  // check X, O if the board is blank, will fill in the data X or O
  clicked(Isbox) {
    if(this.gameState.gameEnded) return
    if(this.gameState.board[Isbox.dataset.square] ==''){
      this.gameState.board[Isbox.dataset.square] = this.gameState.turn;
      Isbox.innerText = this.gameState.turn;
      this.gameState.turn = this.gameState.turn === 'X' ? 'O' : 'X';
      this.gameState.totalMoves++
    }

    const result = this.checkWinner();
    // change state gameEnded and state winner
    if(result == 'X'){
      this.gameState.gameEnded = true;
      this.setState({
        winner:'X',
        winnerLine: 'game win X'
      })
    }
    else if(result == 'O'){
      this.gameState.gameEnded = true;
      this.setState({
        winner:'O',
        winnerLine: 'game win O'
      });
    }
    else if(result == 'draw') {
      this.gameState.gameEnded = true;
      this.setState({
        winner: 'draw',
        winnerLine: 'gameover is draw'
      })
    }
    if(this.gameState.turn == 'O' && !this.gameState.gameEnded){
      do {
        var random = Math.floor(Math.random()*9);
      } 
      while(this.gameState.board[random] !== ''){
        this.clicked(document.querySelectorAll('.square')[random]);
      } 
    }
    console.log(result)
  }
  handleClick() {
    window.location.reload(); 
  }
  // check winner array moves is winnder variabel
   checkWinner() {
    var moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    var board = this.gameState.board;
    for(let i=0;i<moves.length;i++) {
      if(board[moves[i][0]] == board[moves[i][1]] && board[moves[i][1]] == board[moves[i][2]]){
        return board[moves[i][0]];
      }
    }
    // console.log(this.gameState.totalMoves);
    if(this.gameState.totalMoves == 9) {
      return 'draw';
    }
  }
  render() {
    return (
    <div id="my_game">
      <div id="head">
        <Grid item xs container direction="column">
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              Tic tac toe
            </Typography>
          </Grid>
        </Grid>
      </div>      
      <Grid>
        <center>
          <div id="board" onClick={(e) => this.clicked(e.target)}>
            <div className="square" data-square="0"></div>
            <div className="square" data-square="1"></div>
            <div className="square" data-square="2"></div>
            <div className="square" data-square="3"></div>
            <div className="square" data-square="4"></div>
            <div className="square" data-square="5"></div>
            <div className="square" data-square="6"></div>
            <div className="square" data-square="7"></div>
            <div className="square" data-square="8"></div>
          </div>
            <Fab className="button" color="secondary" variant="extended" onClick={(e) => this.handleClick(e)}>
              Restart the game
            </Fab>
            </center>
          <div>
            <span>
              <Paper id="status" elevation={1}>
                <Typography>
                {this.state.winnerLine}
                </Typography>
              </Paper>
            </span>
          </div>        
        </Grid>
      </div>
    );
  }
}

export default App;
