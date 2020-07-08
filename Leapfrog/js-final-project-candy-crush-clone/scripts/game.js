import { randomInt } from "./helperFunc.js";
import Candy from "./candy.js";
import Background from "./candyBG.js";

export default function Game() {
  this.candies = [];
  this.candyBackground = [];
  this.board = [];
  this.row = 10;
  this.col = 10;

  this.createBoard = () => {
    for (let i = 0; i < this.row; i++) {
      let row = [];
      for (let j = 0; j < this.col; j++) {
        row.push(randomInt(1, 6));
      }
      this.board.push(row);
    }
  };

  this.changeCandiesList = () => {
    this.candies = [];
    let id = 0;
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        //params gameObject, xPos, yPos, color, id
        let color = null;
        switch (this.board[i][j]) {
          case 1:
            color = "red";
            break;
          case 2:
            color = "blue";
            break;
          case 3:
            color = "green";
            break;
          case 4:
            color = "yellow";
            break;
          case 5:
            color = "orange";
            break;
          default:
            color = "black";
        }
        var candy = new Candy(this, j, i, color, id);
        row.push(candy);
        id++;
      }
      this.candies.push(row);
    }
  };

  this.createCandiesBackground = () => {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.candyBackground.push(new Background(j, i, "bg1"));
      }
    }
  };
}
