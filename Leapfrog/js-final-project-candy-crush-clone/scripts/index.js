import { CANVAS, CTX } from "./constants.js";
import Game from "./game.js";
import Power from "./power.js";
import Score from "./score.js";
import Rules from "./rules.js";
import MouseOption from "./mouseOption.js";
import Audios from "./audio.js";
import Preloader from "./preloader.js";
import StartMenu from "./startMenu.js";
import LevelSelection from "./levelSelection.js";
import Objective from "./objective.js";
import GameOver from "./gameOver.js";
import GameComplete from "./gameComplete.js";

function Main() {
  var score, power, rules, mouseOption, objective, audios;
  var game, startMenu, levels, gameOver, gameComplete;
  var preloader = new Preloader();
  this.loaded = false;
  var screen = { show: "Start Menu" };
  preloader.load(() => {
    this.init();
    this.draw();
  });

  this.init = () => {
    this.loaded = true;
    game = new Game();
    audios = new Audios(game);
    score = new Score(game, audios, screen);
    audios.level_bg();
    objective = new Objective(game, score);
    power = new Power(game, score, audios);
    rules = new Rules(game, power, audios);
    startMenu = new StartMenu(game);
    levels = new LevelSelection(game);
    gameOver = new GameOver(game, score);
    gameComplete = new GameComplete(game, score);
    mouseOption = new MouseOption({
      game,
      screen,
      startMenu,
      gameOver,
      gameComplete,
      levels,
      score,
      rules,
      audios,
    });
    game.createBoard();
    game.changeCandiesList();
    game.createCandiesBackground();
  };

  this.draw = () => {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    if (screen.show === "Start Menu") {
      startMenu.draw();
    } else if (screen.show === "Levels") {
      levels.draw();
    } else if (screen.show === "Game") {
      game.candyBackground.forEach((bg) => {
        bg.draw();
      });
      if (!game.isPaused) {
        //checks matched candies and start animation
        rules.checkZero();

        // check match case in the board
        rules.checkFiveRow();
        rules.checkFiveColumn();
        rules.checkPacket();
        rules.checkFourRow();
        rules.checkFourColumn();
        rules.checkThreeRow();
        rules.checkThreeColumn();

        // check if dragged or replaced candies have power
        if (game.isDragged) {
          power.colorBombPower();
          power.twoStripedCandies();
          power.stripAndPacket();
          power.packetAndPacket();
          game.isDragged = false;
        }

        // remove candies from display
        game.replaceZero();

        //start moving down animaton
        if (game.isAnimating) {
          game.frame += 1;
          game.animatingMoveDown();
        }

        // start swapping animation
        if (game.isSwapping) {
          game.swapFrame += 1;
          game.swapAnimation();
        }

        // checks if all the candies are dropped and start exploding packet the second time
        if (!game.isAnimating && game.willExplodePacket) {
          setTimeout(() => {
            if (game.isAnimating === false) {
              power.packetSecondExplosion();
              power.doublePacketSecondExplosion();
              game.willExplodePacket = false;
            }
          }, 200);
        }

        if (!game.isAnimating && objective.check()) {
          setTimeout(() => {
            if (game.isAnimating === false) {
              if (score.score >= score.highScore) {
                localStorage.setItem("level" + game.level, score.score);
              }
              screen.show = "Game Complete";
            }
          }, 1000);
        }

        if (!game.isAnimating && score.moves <= 0) {
          setTimeout(() => {
            if (game.isAnimating === false) {
              screen.show = "Game Over";
            }
          }, 1000);
        }

        //displays score
        score.draw();
      }
      //displays candies in the game
      game.candies.forEach((candiesRow) => {
        candiesRow.forEach((candy) => {
          candy.draw();
        });
      });
    }

    if (screen.show === "Game Complete") {
      gameComplete.draw();
    }

    if (screen.show === "Game Over") {
      gameOver.draw();
    }
    requestAnimationFrame(this.draw);
  };

  CANVAS.addEventListener("mousedown", (e) => {
    var mouse = {
      x: e.offsetX,
      y: e.offsetY,
    };
    if (this.loaded) mouseOption.down(mouse);
    //this.init();
  });

  CANVAS.addEventListener("mousemove", (e) => {
    var mouse = {
      x: e.offsetX,
      y: e.offsetY,
    };

    if (this.loaded) mouseOption.move(mouse);
  });

  CANVAS.addEventListener("mouseup", (e) => {
    // console.log("board", game.board.slice(game.row, game.row * 2));
    // console.log(game.isAnimating, game.frame);
    var mouse = {
      x: e.offsetX,
      y: e.offsetY,
    };
    if (this.loaded) mouseOption.up(mouse);
  });
}

var newGame = new Main();
