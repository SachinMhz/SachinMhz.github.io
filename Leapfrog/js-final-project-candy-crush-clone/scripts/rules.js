import { swapArray, randomInt } from "./helperFunc.js";

export default function Rules(game) {
  this.game = game;

  this.checkThreeRow = () => {
    for (let i = 0; i < this.game.row; i++) {
      for (let j = 0; j < this.game.col - 2; j++) {
        let rowOfThree = [j, j + 1, j + 2];
        let value = this.game.board[i][j];
        if (rowOfThree.every((index) => this.game.board[i][index] === value)) {
          rowOfThree.forEach((index) => {
            this.game.board[i][index] = 0;
            this.game.changeCandiesList();
          });
        }
      }
    }
  };

  this.checkThreeColumn = () => {
    for (let i = 0; i < this.game.row - 2; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let columnOfThree = [i, i + 1, i + 2];
        let value = this.game.board[i][j];
        if (
          columnOfThree.every((index) => this.game.board[index][j] === value)
        ) {
          columnOfThree.forEach((index) => {
            this.game.board[index][j] = 0;
            this.game.changeCandiesList();
          });
        }
      }
    }
  };

  this.checkFourRow = () => {
    for (let i = 0; i < this.game.row; i++) {
      for (let j = 0; j < this.game.col - 3; j++) {
        let rowOfThree = [j, j + 1, j + 2, j + 3];
        let value = this.game.board[i][j];
        if (rowOfThree.every((index) => this.game.board[i][index] === value)) {
          rowOfThree.forEach((index) => {
            this.game.board[i][index] = 0;
            this.game.changeCandiesList();
          });
        }
      }
    }
  };

  this.checkFourColumn = () => {
    for (let i = 0; i < this.game.row - 3; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let columnOfThree = [i, i + 1, i + 2, i + 3];
        let value = this.game.board[i][j];
        if (
          columnOfThree.every((index) => this.game.board[index][j] === value)
        ) {
          columnOfThree.forEach((index) => {
            this.game.board[index][j] = 0;
            this.game.changeCandiesList();
          });
        }
      }
    }
  };

  this.moveDown = () => {
    for (let row = this.game.row - 2; row >= 0; row--) {
      for (let col = this.game.col; col >= 0; col--) {
        if (game.board[row + 1][col] === 0) {
          swapArray(game.board, row + 1, col, row, col);
          this.game.changeCandiesList();
        }
        if (game.board[0][col] === 0) {
          this.game.board[row][col] = randomInt(1, 6);
          this.game.changeCandiesList();
        }
      }
    }
  };
}
