export default function Objective(game, score) {
  this.game = game;
  this.candiesCount = {};
  this.complete = false;

  this.level1 = () => {
    if (score.score >= 10000) {
      return true;
    }
  };

  this.level2 = () => {
    if (this.candiesCount.r >= 10 && this.candiesCount.b >= 10) {
      return true;
    }
  };
  this.level3 = () => {
    if (this.candiesCount.rr >= 3 && this.candiesCount.br >= 3) {
      return true;
    }
  };
  this.level4 = () => {
    if (this.candiesCount.cb >= 2) {
      return true;
    }
  };
  this.level5 = () => {
    if (score.score >= 50000 && this.candiesCount.gp >= 2) {
      return true;
    }
  };
  this.check = () => {
    if (game.level === 1) {
      return this.level1();
    }
    if (game.level === 2) {
      return this.level2();
    }
    if (game.level === 3) {
      return this.level3();
    }
    if (game.level === 4) {
      return this.level4();
    }
    if (game.level === 5) {
      return this.level5();
    }
  };
}
