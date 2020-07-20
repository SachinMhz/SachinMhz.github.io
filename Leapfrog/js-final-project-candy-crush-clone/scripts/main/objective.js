/**
 *
 * @param {object} game : a game object
 * @param {object} score : score object to be displayed on the canvas
 */

export default function Objective(game, score) {
  this.game = game;
  this.complete = false;

  this.level1 = () => {
    if (score.score >= 1500) {
      return true;
    }
  };

  this.level2 = () => {
    if (game.candiesCount.r >= 50 && game.candiesCount.b >= 50) {
      return true;
    }
  };

  this.level3 = () => {
    if (
      (game.candiesCount.rr >= 2 || game.candiesCount.rc >= 2) &&
      (game.candiesCount.br >= 2 || game.candiesCount.bc >= 2)
    ) {
      return true;
    }
  };

  this.level4 = () => {
    if (game.candiesCount.cb >= 2) {
      return true;
    }
  };

  this.level5 = () => {
    if (score.score >= 20000 && game.candiesCount.gp >= 2) {
      return true;
    }
  };

  this.check = () => {
    if (game.level === 1) {
      return this.level1();
    } else if (game.level === 2) {
      return this.level2();
    } else if (game.level === 3) {
      return this.level3();
    } else if (game.level === 4) {
      return this.level4();
    } else if (game.level === 5) {
      return this.level5();
    }
  };
}
