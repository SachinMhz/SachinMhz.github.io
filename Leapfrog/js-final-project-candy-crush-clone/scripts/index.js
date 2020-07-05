import { CANVAS, CTX } from "./constants.js";
import Game from "./game.js";
import Candy from "./candy.js";

var game = new Game();
console.log("game started");
function init() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let candy = new Candy(game, j * 60, i * 60);
      game.candies.push(candy);
      candy.draw();
    }
  }
}

init();

CANVAS.addEventListener("mousedown", (e) => {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  game.candies.forEach((candy) => {
    candy.mouseClick(mouseX, mouseY);
  });
});
