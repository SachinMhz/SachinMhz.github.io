import { swapArray, randomInt, getRandomColor } from "./helperFunc.js";

export default function Rules(game) {
  this.game = game;

  this.checkThreeRow = () => {
    for (let i = 0; i < this.game.row; i++) {
      for (let j = 0; j < this.game.col - 2; j++) {
        let checkIdx = [j, j + 1, j + 2];
        let value = this.game.board[i][j];
        if (checkIdx.every((index) => this.game.board[i][index] === value)) {
          checkIdx.forEach((index) => {
            this.game.board[i][index] = 0;
          });
          this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkThreeColumn = () => {
    for (let i = 0; i < this.game.row - 2; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let checkIdx = [i, i + 1, i + 2];
        let value = this.game.board[i][j];
        if (checkIdx.every((index) => this.game.board[index][j] === value)) {
          checkIdx.forEach((index) => {
            this.game.board[index][j] = 0;
          });
          this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkFourRow = () => {
    for (let i = 0; i < this.game.row; i++) {
      for (let j = 0; j < this.game.col - 3; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[i][index] === value)) {
          checkIdx.forEach((index) => {
            this.game.board[i][index] = 0;
            if (dragRow === i && dragCol === index) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] =
                game.candies[dragRow][dragCol].color + "c";
            }
            if (replRow === i && replCol === index) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] =
                game.candies[replRow][replCol].color + "c";
            }
          });
          if (!isReasonDrag)
            this.game.board[i][j] = game.candies[i][j].color + "c";
          this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkFourColumn = () => {
    for (let i = 0; i < this.game.row - 3; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let checkIdx = [i, i + 1, i + 2, i + 3];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[index][j] === value)) {
          checkIdx.forEach((index) => {
            this.game.board[index][j] = 0;
            if (dragRow === index && dragCol === j) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] =
                game.candies[dragRow][dragCol].color + "r";
            }
            if (replRow === index && replCol === j) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] =
                game.candies[replRow][replCol].color + "r";
            }
          });
          if (!isReasonDrag)
            this.game.board[i][j] = game.candies[i][j].color + "r";
          this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkFiveRow = () => {
    for (let i = 0; i < this.game.row; i++) {
      for (let j = 0; j < this.game.col - 4; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3, j + 4];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[i][index] === value)) {
          checkIdx.forEach((index) => {
            this.game.board[i][index] = 0;
            if (dragRow === i && dragCol === index) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] = "cb";
            }
            if (replRow === i && replCol === index) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] = "cb";
            }
          });
          if (!isReasonDrag) this.game.board[i][j] = "cb";
          this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkFiveColumn = () => {
    for (let i = 0; i < this.game.row - 4; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let checkIdx = [i, i + 1, i + 2, i + 3, i + 4];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[index][j] === value)) {
          checkIdx.forEach((index) => {
            this.game.board[index][j] = 0;
            if (dragRow === index && dragCol === j) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] = "cb";
            }
            if (replRow === index && replCol === j) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] = "cb";
            }
          });
          if (!isReasonDrag) this.game.board[i][j] = "cb";
          this.game.changeCandiesList();
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
          this.game.board[row][col] = getRandomColor();
          this.game.changeCandiesList();
        }
      }
    }
  };
}
