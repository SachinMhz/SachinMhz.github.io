import { swapArray, randomInt, getRandomColor } from "./helperFunc.js";
import { CANDY_POINT } from "./constants.js";

export default function Rules(game, score) {
  this.game = game;
  this.score = score;

  this.checkThreeRow = () => {
    let row = this.game.row;
    let col = this.game.col;

    for (let i = row; i < row * 2; i++) {
      for (let j = 0; j < col - 2; j++) {
        let checkIdx = [j, j + 1, j + 2];
        let value = this.game.board[i][j];
        if (
          //this.game.checkCondition &&
          checkIdx.every((index) => this.game.board[i][index][0] === value[0])
        ) {
          this.score.score += 3 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(i, index);
            this.game.board[i][index] = 0;
          });
        }
      }
    }
  };

  this.checkZero = () => {
    let row = this.game.row;
    let col = this.game.col;
    loop_row: for (let i = row; i < row * 2; i++) {
      loop_col: for (let j = 0; j < col; j++) {
        if (this.game.board[i][j] === 0) {
          this.game.isAnimating = true;
          break loop_row;
        }
      }
    }
  };

  this.checkThreeColumn = () => {
    for (let i = this.game.row; i < this.game.row * 2 - 2; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let checkIdx = [i, i + 1, i + 2];
        let value = this.game.board[i][j];
        if (
          checkIdx.every((index) => this.game.board[index][j][0] === value[0])
        ) {
          this.score.score += 3 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(index, j);
            this.game.board[index][j] = 0;
          });
        }
      }
    }
  };

  this.checkFourRow = () => {
    for (let i = this.game.row; i < this.game.row * 2; i++) {
      for (let j = 0; j < this.game.col - 3; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (
          checkIdx.every((index) => this.game.board[i][index][0] === value[0])
        ) {
          this.score.score += 4 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.game.board[i][index] = 0;
            this.checkForPower(i, index);
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
          //this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkFourColumn = () => {
    for (let i = this.game.row; i < this.game.row * 2 - 3; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let checkIdx = [i, i + 1, i + 2, i + 3];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[index][j] === value)) {
          this.score.score += 4 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.game.board[index][j] = 0;
            this.checkForPower(index, j);
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
          //this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkFiveRow = () => {
    for (let i = this.game.row; i < this.game.row * 2; i++) {
      for (let j = 0; j < this.game.col - 4; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3, j + 4];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[i][index] === value)) {
          this.score.score += 5 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.game.board[i][index] = 0;
            this.checkForPower(i, index);
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
          //this.game.changeCandiesList();
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
          this.score.score += 5 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.game.board[index][j] = 0;
            if (dragRow === index && dragCol === j) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] = "cb";
            } else if (replRow === index && replCol === j) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] = "cb";
            }
          });
          if (!isReasonDrag) this.game.board[i][j] = "cb";
          //this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkPacket1 = () => {
    // Pratik way
    let board = this.game.board;
    loop_row: for (let row = 0; row < this.game.row - 2; row++) {
      loop_col: for (let col = 0; col < this.game.col - 2; col++) {
        //
        let checkRowIdx = [row, row + 1, row + 2];
        let checkColIdx = [col, col + 1, col + 2];
        let value = board[row][col];
        //checking vertically
        if (checkRowIdx.every((idx) => board[idx][col] === value)) {
          //checking horizontally in each row
          checkRowIdx.forEach((rIdx) => {
            if (checkColIdx.every((idx) => board[rIdx][idx] === value)) {
              checkRowIdx.forEach((cIdx) => {
                console.log("packet should be formed");
              });
            }
          });
        }
      }
    }
  };

  this.checkPacket = () => {
    for (let i = 0; i < this.game.row - 2; i++) {
      for (let j = 0; j < this.game.col - 2; j++) {
        let checkRowIdx = [i, i + 1, i + 2];
        let checkColIdx = [j, j + 1, j + 2];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let dragColor = this.game.candies[dragRow][dragCol].color[0] + "p";
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;
        let replColor = this.game.candies[replRow][replCol].color[0] + "p";

        let isReasonDrag = false;
        let packetFormed = 0;
        let isFirstPacket = true;
        //checking if 3 candies in a same col have same color -> vertical check
        if (checkRowIdx.every((rIdx) => this.game.board[rIdx][j] === value)) {
          //checking if other 3 candies in one of each row have same color
          //again checking horizontally
          checkRowIdx.forEach((rIdx) => {
            packetFormed += this.checkForPacket_Horizontally(rIdx, j)[0];
            let matchedCol = this.checkForPacket_Horizontally(rIdx, j)[1];
            this.game.board[rIdx][j] = 0;
            this.game.board[rIdx][matchedCol] = 0;
            this.game.board[rIdx][matchedCol + 1] = 0;
            this.game.board[rIdx][matchedCol + 2] = 0;

            if (packetFormed && isFirstPacket) {
              console.log("packet should be formed");
              isFirstPacket = false;
              if (dragRow === rIdx && dragCol === j) {
                isReasonDrag = true;
                this.game.board[dragRow][dragCol] =
                  this.game.board[dragRow][dragCol].color[0] + "p";
              } else if (replRow === rIdx && replCol === j) {
                isReasonDrag = true;
                this.game.board[replRow][replCol] =
                  this.game.candies[replRow][replCol].color[0] + "p";
              } else if (!isReasonDrag && packetFormed)
                this.game.board[rIdx][j] =
                  this.game.candies[rIdx][j].color[0] + "p";
            }
          });
        }

        //checking if 3 candies in a same row have same color -> horizontal check
        else if (
          checkColIdx.every((cIdx) => this.game.board[i][cIdx] === value)
        ) {
          //checking if other 3 candies in one of each col have same color
          //again checking vertically
          checkColIdx.forEach((cIdx) => {
            packetFormed += this.checkForPacket_Vertically(i, cIdx);
          });
        }

        //if (packetFormed) console.log("packet is formed");
      }
    }
  };

  this.destroyEntireCol = (_row, col) => {
    this.game.board[_row][col] = 0;
    console.log("destroy col");
    this.score.score += this.game.col * CANDY_POINT;
    for (let row = this.game.row; row < this.game.row * 2; row++) {
      this.checkForPower(row, col);
      this.game.board[row][col] = 0;
    }
  };

  this.destroyEntireRow = (row, _col) => {
    this.game.board[row][_col] = 0;
    console.log("destroy row");
    this.score.score += this.game.row * CANDY_POINT;
    for (let col = 0; col < this.game.col; col++) {
      this.checkForPower(row, col);
      this.game.board[row][col] = 0;
    }
  };

  this.checkForPower = (row, col) => {
    if (this.game.board[row][col][1] === "c") {
      this.destroyEntireCol(row, col);
    } else if (this.game.board[row][col][1] === "r") {
      this.destroyEntireRow(row, col);
    }
  };

  this.checkForPacket_Vertically = (row, col) => {
    let checkIndex = [row - 2, row - 1, row, row + 1, row + 2];

    if (row === 0) checkIndex = checkIndex.slice(2, 5);
    else if (row === 1) checkIndex = checkIndex.slice(1, 5);
    else if (row === this.game.row - 2) checkIndex = checkIndex.slice(0, 3);
    else if (row === this.game.row - 1) checkIndex = checkIndex.slice(0, 4);

    let isPacket = 0;
    for (let i = 0; i < checkIndex.length - 2; i++) {
      let idx = checkIndex[i];
      if (
        this.game.board[idx][col] === this.game.board[idx + 1][col] &&
        this.game.board[idx + 1][col] === this.game.board[idx + 2][col]
      ) {
        isPacket = 1;
      }
    }
    return isPacket;
  };

  this.checkForPacket_Horizontally = (row, col) => {
    let checkIndex = [col - 2, col - 1, col, col + 1, col + 2];

    if (col === 0) checkIndex = checkIndex.slice(2, 5);
    else if (col === 1) checkIndex = checkIndex.slice(1, 5);
    else if (col === this.game.col - 2) checkIndex = checkIndex.slice(0, 3);
    else if (col === this.game.col - 1) checkIndex = checkIndex.slice(0, 4);

    let isPacket = 0;
    let startingMatchIdx = col;
    for (let i = 0; i < checkIndex.length - 2; i++) {
      let idx = checkIndex[i];
      if (
        this.game.board[row][idx] === this.game.board[row][idx + 1] &&
        this.game.board[row][idx + 1] === this.game.board[row][idx + 2]
      ) {
        isPacket = 1;
        startingMatchIdx = idx;
        break;
      }
    }
    return [isPacket, startingMatchIdx];
  };

  this.moveDown = () => {
    for (let row = this.game.row - 2; row >= 0; row--) {
      for (let col = this.game.col; col >= 0; col--) {
        if (game.board[row + 1][col] === 0) {
          //moving down all candies smoothly
          for (let shift = 0; shift < this.game.row; shift++) {
            let checkRow = row - shift;
            if (checkRow >= 0 && this.game.board[checkRow][col] !== 0) {
              swapArray(this.game.board, row + 1, col, checkRow, col);
              break;
            }
          }
          this.game.changeCandiesList();
          //swapArray(game.board, row + 1, col, row, col);
        }
        if (game.board[0][col] === 0) {
          this.game.board[row][col] = getRandomColor();
          this.game.changeCandiesList();
        }
      }
    }
  };
}

/// for move down
// for (let row = this.row - 2; row >= 0; row--) {
//   for (let col = this.col; col >= 0; col--) {
//     if (this.board[row + 1][col] === "nothing")
//       for (let shift = 0; shift < this.row; shift++) {
//         let checkRow = row - shift;
//         if (checkRow >= 0 && this.board[checkRow][col] !== "nothing") {
//           swapArray(this.board, row + 1, col, row - shift, col);
//           break;
//         }
//       }
//   }
// }

/*
for (let i = 0; i < this.game.row - 2; i++) {
  for (let j = 0; j < this.game.col - 2; j++) {
    let checkRowIdx = [i, i + 1, i + 2];
    let checkColIdx = [j, j + 1, j + 2];
    let value = this.game.board[i][j];

    let dragRow = this.game.draggedCandy.row;
    let dragCol = this.game.draggedCandy.col;
    let replRow = this.game.replacedCandy.row;
    let replCol = this.game.replacedCandy.col;

    let isReasonDrag = false;
    //checking if 3 candies in a same col have same color
    if (checkRowIdx.every((rIdx) => this.game.board[rIdx][j] === value)) {
      console.log("col checked in packet");
      //checks in each row if 3 candies in a same row have same color
      checkRowIdx.forEach((rIdx) => {
        //checking if 3 candies in a same row have same color
        if (
          checkColIdx.every((cIdx) => this.game.board[rIdx][cIdx] === value)
        ) {
          //condition meet for packet formation
          console.log("should make packet");
          checkColIdx.forEach((cIdx) => {
            this.game.board[rIdx][cIdx] = 0;
            if (dragRow === rIdx && dragCol === cIdx) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] =
                this.game.candies[dragRow][dragCol].color[0] + "p";
            }
            if (replRow === rIdx && replCol === cIdx) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] =
                this.game.candies[replRow][replCol].color[0] + "p";
            }
          });

          if (!isReasonDrag)
            this.game.board[i][j] = this.game.candies[i][j].color[0] + "p";
        }
      });

      //this.game.changeCandiesList();
    }
  }
}

*/
