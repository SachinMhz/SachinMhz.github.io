import {
  CTX,
  CANDY_HEIGHT,
  CANDY_WIDTH,
  BG_1,
  BG_SELECTED,
} from './constants.js';
import { drawImageContext } from './helperFunc.js';

export default function Background(x, y, bg) {
  this.x = x * CANDY_WIDTH;
  this.y = y * CANDY_HEIGHT;
  this.width = CANDY_WIDTH;
  this.height = CANDY_HEIGHT;
  this.bg = bg;

  this.draw = () => {
    switch (this.bg) {
      case 'bg1':
        drawImageContext(CTX, BG_1, this.x, this.y, this.width, this.height);
        break;
      case 'bg1-selected':
        drawImageContext(
          CTX,
          BG_SELECTED,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      default:
        drawImageContext(CTX, BG2, this.x, this.y, this.width, this.height);
    }
  };
}
