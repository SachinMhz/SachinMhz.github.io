import { swapArray, getRandomColor } from '../utils/helperFunc.js';

export default function Rules(game, power, audios) {
  this.game = game;
  this.power = power;

  /** if there is zero on the board i.e. candy were destroyed then start animation */
  this.checkZero = () => {
    let row = game.row;
    let col = game.col;
    loop_row: for (let i = row; i < row * 2; i++) {
      loop_col: for (let j = 0; j < col; j++) {
        if (game.board[i][j] === 0) {
          game.isAnimating = true;
          break loop_row;
        } else if (game.board[i][j][1] === 'e' || game.board[i][j][1] === 'd') {
          game.willExplodePacket = true;
        }
      }
    }
  };

  /** check three and destroy three similar candies being formed horizontally */
  this.checkThreeRow = () => {
    let row = game.row;
    let col = game.col;

    for (let i = row; i < row * 2; i++) {
      for (let j = 0; j < col - 2; j++) {
        let checkIdx = [j, j + 1, j + 2];
        let value = game.board[i][j];
        if (value === 0) continue;
        if (checkIdx.every((index) => game.board[i][index][0] === value[0])) {
          audios.match();
          checkIdx.forEach((index) => {
            power.checkForPower(i, index);
          });
        }
      }
    }
  };

  /** check three and destroy three similar candies being formed vertically */
  this.checkThreeColumn = () => {
    for (let i = game.row; i < game.row * 2 - 2; i++) {
      for (let j = 0; j < game.col; j++) {
        let checkIdx = [i, i + 1, i + 2];
        let value = game.board[i][j];
        if (value === 0) continue;
        if (checkIdx.every((index) => game.board[index][j][0] === value[0])) {
          audios.match();
          checkIdx.forEach((index) => {
            power.checkForPower(index, j);
          });
        }
      }
    }
  };

  /** check three and destroy four similar candies being formed horizontally */
  this.checkFourRow = () => {
    for (let i = game.row; i < game.row * 2; i++) {
      for (let j = 0; j < game.col - 3; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3];
        let value = game.board[i][j];
        if (value === 0) continue;

        let dragRow = game.draggedCandy.row;
        let dragCol = game.draggedCandy.col;
        let replRow = game.replacedCandy.row;
        let replCol = game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => game.board[i][index][0] === value[0])) {
          audios.stripCreated();
          checkIdx.forEach((index) => {
            power.checkForPower(i, index);
            if (
              ((dragRow === i && dragCol === index) ||
                (replRow === i && replCol === index)) &&
              game.board[i][index][0] !== 'e'
            ) {
              isReasonDrag = true;
              game.board[i][index] = game.candies[i][index].color[0] + 'c';
              game.candies[i][index].color =
                game.candies[i][index].color[0] + 'c';
            }
          });
          if (!isReasonDrag && game.board[i][j][0] !== 'e') {
            game.board[i][j] =
              game.candies[i][j].color !== 0
                ? game.candies[i][j].color[0] + 'c'
                : getRandomColor() + 'c';

            game.candies[i][j].color =
              game.candies[i][j].color !== 0
                ? game.candies[i][j].color[0] + 'c'
                : getRandomColor() + 'c';
          }
        }
      }
    }
  };

  /** check three and destroy four similar candies being formed vertically */
  this.checkFourColumn = () => {
    for (let i = game.row; i < game.row * 2 - 3; i++) {
      for (let j = 0; j < game.col; j++) {
        let checkIdx = [i, i + 1, i + 2, i + 3];
        let value = game.board[i][j];
        if (value === 0) continue;

        let dragRow = game.draggedCandy.row;
        let dragCol = game.draggedCandy.col;
        let replRow = game.replacedCandy.row;
        let replCol = game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => game.board[index][j][0] === value[0])) {
          audios.stripCreated();
          checkIdx.forEach((index) => {
            power.checkForPower(index, j);
            if (
              ((dragRow === index && dragCol === j) ||
                (replRow === index && replCol === j)) &&
              game.board[index][j][0] !== 'e'
            ) {
              isReasonDrag = true;
              game.board[index][j] = game.candies[index][j].color[0] + 'r';
              game.candies[index][j].color =
                game.candies[index][j].color[0] + 'r';
            }
          });

          if (!isReasonDrag && game.board[i][j][0] !== 'e') {
            game.board[i][j] =
              game.candies[i][j].color !== 0
                ? game.candies[i][j].color[0] + 'r'
                : getRandomColor() + 'r';

            game.candies[i][j].color =
              game.candies[i][j].color !== 0
                ? game.candies[i][j].color[0] + 'r'
                : getRandomColor() + 'r';
          }
        }
      }
    }
  };

  /** check three and destroy five similar candies being formed horizontally */
  this.checkFiveRow = () => {
    for (let i = game.row; i < game.row * 2; i++) {
      for (let j = 0; j < game.col - 4; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3, j + 4];
        let value = game.board[i][j];
        if (value === 0) continue;

        let dragRow = game.draggedCandy.row;
        let dragCol = game.draggedCandy.col;
        let replRow = game.replacedCandy.row;
        let replCol = game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => game.board[i][index][0] === value[0])) {
          audios.colorBombCreated();
          checkIdx.forEach((index) => {
            power.checkForPower(i, index);
            if (
              ((dragRow === i && dragCol === index) ||
                (replRow === i && replCol === index)) &&
              game.board[i][index][0] !== 'e'
            ) {
              isReasonDrag = true;
              game.board[i][index] = 'cb';
              game.candies[i][index].color = 'cb';
            }
          });
          if (!isReasonDrag && game.board[i][j][0] !== 'e') {
            game.board[i][j] = 'cb';
            game.candies[i][j].color = 'cb';
          }
        }
      }
    }
  };

  /** check three and destroy five similar candies being formed vertically */
  this.checkFiveColumn = () => {
    for (let i = game.row; i < game.row * 2 - 4; i++) {
      for (let j = 0; j < game.col; j++) {
        let checkIdx = [i, i + 1, i + 2, i + 3, i + 4];
        let value = game.board[i][j];
        if (value === 0) continue;

        let dragRow = game.draggedCandy.row;
        let dragCol = game.draggedCandy.col;
        let replRow = game.replacedCandy.row;
        let replCol = game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => game.board[index][j][0] === value[0])) {
          audios.colorBombCreated();
          checkIdx.forEach((index) => {
            power.checkForPower(index, j);
            if (
              ((dragRow === index && dragCol === j) ||
                (replRow === index && replCol === j)) &&
              game.board[index][j][0] !== 'e'
            ) {
              isReasonDrag = true;
              game.board[index][j] = 'cb';
              game.candies[index][j].color = 'cb';
            }
          });
          if (!isReasonDrag) {
            game.board[i][j] = 'cb';
            game.candies[i][j].color = 'cb';
          }
        }
      }
    }
  };

  /** check if candies are formed in the T- L- or + shapes */
  this.checkPacket = () => {
    let board = game.board;
    let dragRow = game.draggedCandy.row;
    let dragCol = game.draggedCandy.col;
    let replRow = game.replacedCandy.row;
    let replCol = game.replacedCandy.col;

    for (let row = game.row; row < game.row * 2 - 2; row++) {
      for (let col = 0; col < game.col - 2; col++) {
        let checkRowIdx = [row, row + 1, row + 2];
        let checkColIdx = [col, col + 1, col + 2];
        let value = board[row][col];
        if (value === 0) continue;

        //checking vertically
        if (checkRowIdx.every((idx) => board[idx][col][0] === value[0])) {
          //checking horizontally in each row
          checkRowIdx.forEach((rIdx) => {
            if (checkColIdx.every((idx) => board[rIdx][idx][0] === value[0])) {
              checkColIdx.forEach((idx) => {
                power.checkForPower(rIdx, idx);
              });
              checkRowIdx.forEach((idx) => {
                power.checkForPower(idx, col);
              });
              if (
                (dragRow === rIdx && dragCol === col) ||
                (replRow === rIdx && replCol === col)
              ) {
                game.board[rIdx][col] = game.candies[rIdx][col].color[0] + 'p';
                game.candies[rIdx][col].color =
                  game.candies[rIdx][col].color[0] + 'p';
                audios.packetCreated();
              } else {
                game.board[row][col] = game.candies[rIdx][col].color[0] + 'p';
                game.candies[row][col].color =
                  game.candies[rIdx][col].color[0] + 'p';
                audios.packetCreated();
              }
            }
          });
        }
      }
    }

    for (let row = game.row; row < game.row * 2 - 2; row++) {
      for (let col = 1; col < game.col - 1; col++) {
        let checkRowIdx = [row, row + 1, row + 2];
        let checkColIdx = [col - 1, col, col + 1];
        let value = board[row][col];
        if (value === 0) continue;

        //checking vertically
        if (checkRowIdx.every((idx) => board[idx][col][0] === value[0])) {
          //checking horizontally in each row
          checkRowIdx.forEach((rIdx) => {
            if (checkColIdx.every((idx) => board[rIdx][idx][0] === value[0])) {
              checkColIdx.forEach((idx) => {
                power.checkForPower(rIdx, idx);
              });
              checkRowIdx.forEach((idx) => {
                power.checkForPower(idx, col);
              });
              if (
                (dragRow === rIdx && dragCol === col) ||
                (replRow === rIdx && replCol === col)
              ) {
                game.board[rIdx][col] = game.candies[rIdx][col].color[0] + 'p';
                game.candies[rIdx][col].color =
                  game.candies[rIdx][col].color[0] + 'p';
                audios.packetCreated();
              } else {
                game.board[row][col] = game.candies[rIdx][col].color[0] + 'p';
                game.candies[row][col].color =
                  game.candies[rIdx][col].color[0] + 'p';
                audios.packetCreated();
              }
            }
          });
        }
      }
    }

    for (let row = game.row; row < game.row * 2 - 2; row++) {
      for (let col = 2; col < game.col; col++) {
        let checkRowIdx = [row, row + 1, row + 2];
        let checkColIdx = [col - 2, col - 1, col];
        let value = board[row][col];
        if (value === 0) continue;

        //checking vertically
        if (checkRowIdx.every((idx) => board[idx][col][0] === value[0])) {
          //checking horizontally in each row
          checkRowIdx.forEach((rIdx) => {
            if (checkColIdx.every((idx) => board[rIdx][idx][0] === value[0])) {
              checkColIdx.forEach((idx) => {
                power.checkForPower(rIdx, idx);
              });
              checkRowIdx.forEach((idx) => {
                power.checkForPower(idx, col);
              });
              if (
                (dragRow === rIdx && dragCol === col) ||
                (replRow === rIdx && replCol === col)
              ) {
                game.board[rIdx][col] = game.candies[rIdx][col].color[0] + 'p';
                game.candies[rIdx][col].color =
                  game.candies[rIdx][col].color[0] + 'p';
                audios.packetCreated();
              } else {
                game.board[row][col] = game.candies[rIdx][col].color[0] + 'p';
                game.candies[row][col].color =
                  game.candies[rIdx][col].color[0] + 'p';
                audios.packetCreated();
              }
            }
          });
        }
      }
    }
  };

  /** checks if the current move is valid of not */
  this.checkValidMove = () => {
    let dRow = game.draggedCandy.row;
    let dCol = game.draggedCandy.col;
    let rRow = game.replacedCandy.row;
    let rCol = game.replacedCandy.col;
    let dCandy = game.draggedCandy.color;
    let rCandy = game.replacedCandy.color;

    let isValid = false;

    //cloning game board
    let board = game.board.map(function (arr) {
      return arr.slice();
    });
    swapArray(board, dRow, dCol, rRow, rCol);

    let row = game.row;
    let col = game.col;
    // valid move if three same candies is formed horizontally
    for (let i = row; i < row * 2; i++) {
      for (let j = 0; j < col - 2; j++) {
        let checkIdx = [j, j + 1, j + 2];
        let value = board[i][j];
        if (checkIdx.every((index) => board[i][index][0] === value[0])) {
          isValid = true;
        }
      }
    }

    //valid move if three  same candies is formed vertically
    for (let i = row; i < row * 2 - 2; i++) {
      for (let j = 0; j < col; j++) {
        let checkIdx = [i, i + 1, i + 2];
        let value = board[i][j];
        if (checkIdx.every((index) => board[index][j][0] === value[0])) {
          isValid = true;
        }
      }
    }

    //checking for powers swaps
    //valid for two stripes candies
    if (
      (dCandy[1] == 'r' || dCandy[1] == 'c') &&
      (rCandy[1] == 'r' || rCandy[1] == 'c')
    ) {
      isValid = true;
    }
    //valid for strip and packet
    else if (
      ((dCandy[1] === 'c' || dCandy[1] === 'r') && rCandy[1] === 'p') ||
      ((rCandy[1] === 'c' || rCandy[1] === 'r') && dCandy[1] === 'p')
    ) {
      isValid = true;
    }
    //valid for packet and packet
    else if (rCandy[1] === 'p' && dCandy[1] === 'p') isValid = true;
    //valid for colorBomb
    else if (rCandy === 'cb' || dCandy === 'cb') isValid = true;

    return isValid;
  };
}
