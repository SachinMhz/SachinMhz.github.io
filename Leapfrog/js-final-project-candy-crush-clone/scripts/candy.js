import {
  CANVAS,
  CTX,
  CANDY_HEIGHT,
  CANDY_WIDTH,
  RED,
  BLUE,
  GREEN,
  YELLOW,
  ORANGE,
  PURPLE,
  ORANGE_ROW,
  ORANGE_COL,
  RED_SELECTED,
  RED_ROW,
  RED_COL,
  RED_PACKET,
  BLUE_SELECTED,
  BLUE_ROW,
  BLUE_COL,
  BLUE_PACKET,
  GREEN_SELECTED,
  GREEN_ROW,
  GREEN_COL,
  GREEN_PACKET,
  YELLOW_SELECTED,
  YELLOW_ROW,
  YELLOW_COL,
  YELLOW_PACKET,
  PURPLE_SELECTED,
  PURPLE_ROW,
  PURPLE_COL,
  PURPLE_PACKET,
  ORANGE_SELECTED,
  ORANGE_PACKET,
  COLOR_BOMB,
  NO_CANDY,
  BOMB,
} from "./constants.js";
import { drawImageContext } from "./helperFunc.js";

export default function Candy(game, x, y, color, id) {
  this.game = game;
  this.realX = x * CANDY_WIDTH;
  this.realY = y * CANDY_HEIGHT;
  this.x = x * CANDY_WIDTH;
  this.y = y * CANDY_HEIGHT;
  this.width = CANDY_WIDTH;
  this.height = CANDY_HEIGHT;
  this.color = color;
  this.id = id;
  this.isDragging = false;
  this.zIndex = 0;
  this.dragDirection = "center";
  this.moveAboveCandy = false;
  this.animationTime = CANDY_HEIGHT;

  this.draw = () => {
    switch (this.color) {
      //for red candies
      case "r":
        drawImageContext(CTX, RED, this.x, this.y, this.width, this.height);
        break;
      case "rs":
        drawImageContext(
          CTX,
          RED_SELECTED,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "rr":
        drawImageContext(CTX, RED_ROW, this.x, this.y, this.width, this.height);
        break;
      case "rc":
        drawImageContext(CTX, RED_COL, this.x, this.y, this.width, this.height);
        break;
      case "rp":
        drawImageContext(
          CTX,
          RED_PACKET,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;

      //for blue candies
      case "b":
        drawImageContext(CTX, BLUE, this.x, this.y, this.width, this.height);
        break;
      case "bs":
        drawImageContext(
          CTX,
          BLUE_SELECTED,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "br":
        drawImageContext(
          CTX,
          BLUE_ROW,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "bc":
        drawImageContext(
          CTX,
          BLUE_COL,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "bp":
        drawImageContext(
          CTX,
          BLUE_PACKET,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;

      //for green color
      case "g":
        drawImageContext(CTX, GREEN, this.x, this.y, this.width, this.height);
        break;
      case "gs":
        drawImageContext(
          CTX,
          GREEN_SELECTED,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "gr":
        drawImageContext(
          CTX,
          GREEN_ROW,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "gc":
        drawImageContext(
          CTX,
          GREEN_COL,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "gp":
        drawImageContext(
          CTX,
          GREEN_PACKET,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;

      //for yellow color
      case "y":
        drawImageContext(CTX, YELLOW, this.x, this.y, this.width, this.height);
        break;
      case "ys":
        drawImageContext(
          CTX,
          YELLOW_SELECTED,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "yr":
        drawImageContext(
          CTX,
          YELLOW_ROW,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "yc":
        drawImageContext(
          CTX,
          YELLOW_COL,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "yp":
        drawImageContext(
          CTX,
          YELLOW_PACKET,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;

      //for orange
      case "o":
        drawImageContext(CTX, ORANGE, this.x, this.y, this.width, this.height);
        break;
      case "os":
        drawImageContext(
          CTX,
          ORANGE_SELECTED,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "or":
        drawImageContext(
          CTX,
          ORANGE_ROW,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "op":
        drawImageContext(
          CTX,
          ORANGE_PACKET,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "oc":
        drawImageContext(
          CTX,
          ORANGE_COL,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      //for purple color
      case "p":
        drawImageContext(CTX, PURPLE, this.x, this.y, this.width, this.height);
        break;
      case "ps":
        drawImageContext(
          CTX,
          PURPLE_SELECTED,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "pr":
        drawImageContext(
          CTX,
          PURPLE_ROW,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "pc":
        drawImageContext(
          CTX,
          PURPLE_COL,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "pp":
        drawImageContext(
          CTX,
          PURPLE_PACKET,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;

      //color bomb
      case "cb":
        drawImageContext(
          CTX,
          COLOR_BOMB,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case "explode":
        drawImageContext(CTX, BOMB, this.x, this.y, this.width, this.height);
        break;
      case "doubleExplode":
        drawImageContext(CTX, BOMB, this.x, this.y, this.width, this.height);
        break;
      default:
        drawImageContext(
          CTX,
          NO_CANDY,
          this.x,
          this.y,
          this.width,
          this.height
        );
    }
  };
}
