import { CANDY_POINT } from './constants.js';

/**
 *
 * @param {object} game
 * @param {object} score
 * @param {object} audios
 */
export default function Power(game, score, audios) {
  this.game = game;
  this.score = score;

  /** checks if each destroyed candy has power */
  this.checkForPower = (row, col) => {
    let color = game.board[row][col];
    //counting candies for level objectives
    game.candiesCount[color] = (game.candiesCount[color] || 0) + 1;

    score.score += CANDY_POINT;
    //candies with length 1 doesn't have power
    if (game.board[row][col].length === 1) {
      game.board[row][col] = 0;
      return;
    }
    //vertically destroy candies
    else if (game.board[row][col][1] === 'c') {
      audios.stripBlast();
      this.destroyEntireCol(row, col);
    }
    //horizontally destroy candies
    else if (game.board[row][col][1] === 'r') {
      audios.stripBlast();
      this.destroyEntireRow(row, col);
    }
    //destroy candies around
    else if (game.board[row][col][1] === 'p') {
      audios.packetBlast();
      let temp = game.board[row][col];
      //packet should be exploded two times
      game.willExplodePacket = true;
      this.packetPower(row, col);
      game.board[row][col] = temp[0] + 'ep';
      game.candies[row][col].color = temp[0] + 'ep';
    }
    // colorBomb power
    else if (game.board[row][col] === 'cb') {
      audios.colorBombBlast();
      this.colorBombPowerAuto();
      game.board[row][col] = 0;
    }
    //second time exploding of packet
    else if (game.board[row][col][1] === 'e') {
      audios.packetBlast();
      this.packetPower(row, col);
    }
  };

  /** destroy a single column line candies*/
  this.destroyEntireCol = (_row, col) => {
    game.board[_row][col] = 0;
    for (let row = game.row; row < game.row * 2; row++) {
      this.checkForPower(row, col);
    }
  };
  /** destroy a single row line candies*/
  this.destroyEntireRow = (row, _col) => {
    game.board[row][_col] = 0;
    for (let col = 0; col < game.col; col++) {
      this.checkForPower(row, col);
    }
  };

  /** destroy candies around  */
  this.packetPower = (row, col) => {
    game.board[row][col] = 0;
    let rowArray = [row - 1, row, row + 1];
    let colArray = [col - 1, col, col + 1];
    if (row === game.row) {
      rowArray.shift(); //remove first element
    } else if (row === game.row * 2 - 1) {
      rowArray.pop(); //remove last element
    }

    if (col === 0) {
      colArray.shift(); //remove first element
    } else if (col === game.col - 1) {
      colArray.pop(); //remove last element
    }
    rowArray.forEach((_row) => {
      colArray.forEach((_col) => {
        this.checkForPower(_row, _col);
      });
    });
  };

  this.packetSecondExplosion = () => {
    for (let row = game.row; row < game.row * 2; row++) {
      for (let col = 0; col < game.col; col++) {
        if (game.board[row][col][1] === 'e') {
          this.checkForPower(row, col);
        }
      }
    }
  };

  /**checked color bomb power on drag */
  this.colorBombPower = () => {
    let board = game.board;
    let dRow = game.draggedCandy.row;
    let dCol = game.draggedCandy.col;
    let rRow = game.replacedCandy.row;
    let rCol = game.replacedCandy.col;
    let dCandy = game.draggedCandy.color;
    let rCandy = game.replacedCandy.color;

    //if both dragged and replaced candies are color bomb
    if (dCandy === 'cb' && rCandy === 'cb') {
      audios.colorBombBlast();
      for (let row = game.row; row < game.row * 2; row++) {
        for (let col = 0; col < game.col; col++) {
          board[row][col] = 0;
        }
      }
    }
    //if dragged candy is color bomb
    else if (dCandy === 'cb') {
      audios.colorBombBlast();
      board[dRow][dCol] = 0;
      board[rRow][rCol] = 0;
      for (let row = game.row; row < game.row * 2; row++) {
        for (let col = 0; col < game.col; col++) {
          if (board[row][col][0] === rCandy[0]) {
            if (rCandy.length === 2) board[row][col] = rCandy;
            this.checkForPower(row, col);
          }
        }
      }
    }
    //if replaced candy is color bomb
    else if (rCandy === 'cb') {
      audios.colorBombBlast();
      board[dRow][dCol] = 0;
      board[rRow][rCol] = 0;
      for (let row = game.row; row < game.row * 2; row++) {
        for (let col = 0; col < game.col; col++) {
          if (board[row][col][0] === dCandy[0]) {
            if (dCandy.length === 2) board[row][col] = dCandy;
            this.checkForPower(row, col);
          }
        }
      }
    }
  };

  /**use color bomb power if other power destroys the color bomb */
  this.colorBombPowerAuto = () => {
    //counting the number of each color candies in the board
    let colorCount = {};
    for (let row = game.row; row < game.row * 2; row++) {
      for (let col = 0; col < game.col; col++) {
        if (!game.board[row][col]) continue;
        let color = game.board[row][col][0];
        colorCount[color] = (colorCount[color] || 0) + 1;
      }
    }
    let colorArray = Object.entries(colorCount);

    //finding which candy color is highest in number
    let maxValue = 0;
    let maxColor = null;
    colorArray.forEach((colorPair) => {
      //colorPair = ['r',20]
      if (colorPair[1] > maxValue) {
        maxValue = colorPair[1];
        maxColor = colorPair[0];
      }
    });

    //after finding highest candies of same color explodes it
    for (let row = game.row; row < game.row * 2; row++) {
      for (let col = 0; col < game.col; col++) {
        if (game.board[row][col][0] === maxColor) {
          this.checkForPower(row, col);
        }
      }
    }
  };

  /**if both dragged and replaced candies are stripped candy */
  this.twoStripedCandies = () => {
    let dRow = game.draggedCandy.row;
    let dCol = game.draggedCandy.col;
    let rRow = game.replacedCandy.row;
    let rCol = game.replacedCandy.col;
    let dCandy = game.draggedCandy.color;
    let rCandy = game.replacedCandy.color;

    //if both dragged and replaced candies are stripped candy
    if (dCandy.length !== 2 && rCandy.length !== 2) return;
    if (
      (dCandy[1] === 'c' || dCandy[1] === 'r') &&
      (rCandy[1] === 'c' || rCandy[1] === 'r')
    ) {
      audios.stripBlast();
      game.board[rRow][rCol] = 0;
      game.board[dRow][dCol] = 0;
      this.destroyEntireCol(rRow, rCol);
      this.destroyEntireRow(rRow, rCol);
    }
  };

  /**if either dragged or replaced candies are stripped candy or packet candy */
  this.stripAndPacket = () => {
    let dCandy = game.draggedCandy.color;
    let rCandy = game.replacedCandy.color;
    let rRow = game.replacedCandy.row;
    let rCol = game.replacedCandy.col;

    if (dCandy.length !== 2 && rCandy.length !== 2) return;

    if (
      ((dCandy[1] === 'c' || dCandy[1] === 'r') && rCandy[1] === 'p') ||
      ((rCandy[1] === 'c' || rCandy[1] === 'r') && dCandy[1] === 'p')
    ) {
      let rowArray = [rRow - 1, rRow, rRow + 1];
      let colArray = [rCol - 1, rCol, rCol + 1];
      if (rRow === game.row) {
        rowArray.shift(); //remove first element
      } else if (rRow === game.row * 2 - 1) {
        rowArray.pop(); //remove last element
      }

      if (rCol === 0) {
        colArray.shift(); //remove first element
      } else if (rCol === game.col - 1) {
        colArray.pop(); //remove last element
      }
      rowArray.forEach((_row) => {
        colArray.forEach((_col) => {
          this.destroyEntireCol(_row, _col);
          this.destroyEntireRow(_row, _col);
        });
      });
    }
  };

  /** if both dragged and replaced candy are packets */
  this.packetAndPacket = () => {
    let dCandy = game.draggedCandy.color;
    let rCandy = game.replacedCandy.color;
    let dRow = game.draggedCandy.row;
    let dCol = game.draggedCandy.col;
    let rRow = game.replacedCandy.row;
    let rCol = game.replacedCandy.col;

    if (dCandy.length !== 2 && rCandy.length !== 2) return;

    if (rCandy[1] === 'p' && dCandy[1] === 'p') {
      let rowArray = [rRow - 2, rRow - 1, rRow, rRow + 1, rRow + 2];
      let colArray = [rCol - 2, rCol - 1, rCol, rCol + 1, rCol + 2];
      if (rRow === game.row) {
        rowArray = rowArray.splice(2, 5); //remove first  two element
      } else if (rRow === game.row + 1) {
        rowArray = rowArray.splice(1, 5);
      } else if (rRow === game.row * 2 - 1) {
        rowArray = rowArray.splice(0, 4);
      } else if (rRow === game.row * 2 - 2) {
        rowArray = rowArray.splice(0, 3);
      }
      if (rCol === 0) {
        colArray = colArray.splice(2, 5); //remove first two element
      } else if (rCol === 1) {
        colArray = colArray.splice(1, 5);
      } else if (rCol === game.col - 1) {
        colArray = colArray.splice(0, 4);
      } else if (rCol === game.col - 2) {
        colArray = colArray.splice(0, 3);
      }
      let temp = game.board[rRow][rCol][0];
      game.board[rRow][rCol] = 0;
      game.board[dRow][dCol] = 0;
      rowArray.forEach((_row) => {
        colArray.forEach((_col) => {
          this.checkForPower(_row, _col);
        });
      });
      if (!game.willExplodePacket) {
        audios.packetBlast();
        game.willExplodePacket = true;
        game.board[rRow][rCol] = temp + 'dep';
        game.candies[rRow][rCol].color = temp + 'dep';
      }
    }
  };

  /** double packet on dragged should be exploded two times */
  this.doublePacketSecondExplosion = () => {
    audios.packetBlast();
    for (let row = game.row; row < game.row * 2; row++) {
      for (let col = 0; col < game.col; col++) {
        if (game.board[row][col][1] === 'd') {
          let rowArray = [row - 2, row - 1, row, row + 1, row + 2];
          let colArray = [col - 2, col - 1, col, col + 1, col + 2];
          if (row === game.row) {
            rowArray = rowArray.splice(2, 5); //remove first  two element
          } else if (row === game.row + 1) {
            rowArray = rowArray.splice(1, 5);
          } else if (row === game.row * 2 - 1) {
            rowArray = rowArray.splice(0, 4);
          } else if (row === game.row * 2 - 2) {
            rowArray = rowArray.splice(0, 3);
          }

          if (col === 0) {
            colArray = colArray.splice(2, 5); //remove first two element
          } else if (col === 1) {
            colArray = colArray.splice(1, 5);
          } else if (col === game.col - 1) {
            colArray = colArray.splice(0, 4);
          } else if (col === game.col - 2) {
            colArray = colArray.splice(0, 3);
          }

          game.board[row][col] = 0;
          rowArray.forEach((_row) => {
            colArray.forEach((_col) => {
              this.checkForPower(_row, _col);
            });
          });
        }
      }
    }
  };
}
