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
  BLUE_PE,
  RED_PE,
  GREEN_PE,
  ORANGE_PE,
  YELLOW_PE,
  PURPLE_PE,
} from "./constants.js";
import { drawImageContext } from "./helperFunc.js";

export default function Candy(game, x, y, color, id) {
  var draw = drawImageContext;
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
  this.packetAnimation = 0;
  this.normalPacket = true;

  this.draw = () => {
    this.packetAnimation += 1;
    if (this.packetAnimation > 20) {
      this.normalPacket = !this.normalPacket;
      this.packetAnimation = 0;
    }
    switch (this.color) {
      //for red candies
      case "r":
        draw(CTX, RED, this.x, this.y, this.width, this.height);
        break;
      case "rs":
        draw(CTX, RED_SELECTED, this.x, this.y, this.width, this.height);
        break;
      case "rr":
        draw(CTX, RED_ROW, this.x, this.y, this.width, this.height);
        break;
      case "rc":
        draw(CTX, RED_COL, this.x, this.y, this.width, this.height);
        break;
      case "rp":
        draw(CTX, RED_PACKET, this.x, this.y, this.width, this.height);
        break;

      //for blue candies
      case "b":
        draw(CTX, BLUE, this.x, this.y, this.width, this.height);
        break;
      case "bs":
        draw(CTX, BLUE_SELECTED, this.x, this.y, this.width, this.height);
        break;
      case "br":
        draw(CTX, BLUE_ROW, this.x, this.y, this.width, this.height);
        break;
      case "bc":
        draw(CTX, BLUE_COL, this.x, this.y, this.width, this.height);
        break;
      case "bp":
        draw(CTX, BLUE_PACKET, this.x, this.y, this.width, this.height);
        break;

      //for green color
      case "g":
        draw(CTX, GREEN, this.x, this.y, this.width, this.height);
        break;
      case "gs":
        draw(CTX, GREEN_SELECTED, this.x, this.y, this.width, this.height);
        break;
      case "gr":
        draw(CTX, GREEN_ROW, this.x, this.y, this.width, this.height);
        break;
      case "gc":
        draw(CTX, GREEN_COL, this.x, this.y, this.width, this.height);
        break;
      case "gp":
        draw(CTX, GREEN_PACKET, this.x, this.y, this.width, this.height);
        break;

      //for yellow color
      case "y":
        draw(CTX, YELLOW, this.x, this.y, this.width, this.height);
        break;
      case "ys":
        draw(CTX, YELLOW_SELECTED, this.x, this.y, this.width, this.height);
        break;
      case "yr":
        draw(CTX, YELLOW_ROW, this.x, this.y, this.width, this.height);
        break;
      case "yc":
        draw(CTX, YELLOW_COL, this.x, this.y, this.width, this.height);
        break;
      case "yp":
        draw(CTX, YELLOW_PACKET, this.x, this.y, this.width, this.height);
        break;

      //for orange
      case "o":
        draw(CTX, ORANGE, this.x, this.y, this.width, this.height);
        break;
      case "os":
        draw(CTX, ORANGE_SELECTED, this.x, this.y, this.width, this.height);
        break;
      case "or":
        draw(CTX, ORANGE_ROW, this.x, this.y, this.width, this.height);
        break;
      case "op":
        draw(CTX, ORANGE_PACKET, this.x, this.y, this.width, this.height);
        break;
      case "oc":
        draw(CTX, ORANGE_COL, this.x, this.y, this.width, this.height);
        break;
      //for purple color
      case "p":
        draw(CTX, PURPLE, this.x, this.y, this.width, this.height);
        break;
      case "ps":
        draw(CTX, PURPLE_SELECTED, this.x, this.y, this.width, this.height);
        break;
      case "pr":
        draw(CTX, PURPLE_ROW, this.x, this.y, this.width, this.height);
        break;
      case "pc":
        draw(CTX, PURPLE_COL, this.x, this.y, this.width, this.height);
        break;
      case "pp":
        draw(CTX, PURPLE_PACKET, this.x, this.y, this.width, this.height);
        break;

      //color bomb
      case "cb":
        draw(CTX, COLOR_BOMB, this.x, this.y, this.width, this.height);
        break;
      case "rep":
        if (this.normalPacket)
          draw(CTX, RED, this.x, this.y, this.width, this.height);
        else draw(CTX, RED_PE, this.x, this.y, this.width, this.height);
        break;
      case "bep":
        if (this.normalPacket)
          draw(CTX, BLUE, this.x, this.y, this.width, this.height);
        else draw(CTX, BLUE_PE, this.x, this.y, this.width, this.height);
        break;
      case "gep":
        if (this.normalPacket)
          draw(CTX, GREEN, this.x, this.y, this.width, this.height);
        else draw(CTX, GREEN_PE, this.x, this.y, this.width, this.height);
        break;
      case "yep":
        if (this.normalPacket)
          draw(CTX, YELLOW, this.x, this.y, this.width, this.height);
        else draw(CTX, YELLOW_PE, this.x, this.y, this.width, this.height);
        break;
      case "oep":
        if (this.normalPacket)
          draw(CTX, ORANGE, this.x, this.y, this.width, this.height);
        else draw(CTX, ORANGE_PE, this.x, this.y, this.width, this.height);
        break;
      case "pep":
        if (this.normalPacket)
          draw(CTX, PURPLE, this.x, this.y, this.width, this.height);
        else draw(CTX, PURPLE_PE, this.x, this.y, this.width, this.height);
        break;

      case "rdep":
        if (this.normalPacket)
          draw(CTX, RED, this.x, this.y, this.width, this.height);
        else draw(CTX, RED_PE, this.x, this.y, this.width, this.height);
        break;
      case "bdep":
        if (this.normalPacket)
          draw(CTX, BLUE, this.x, this.y, this.width, this.height);
        else draw(CTX, BLUE_PE, this.x, this.y, this.width, this.height);
        break;
      case "gdep":
        if (this.normalPacket)
          draw(CTX, GREEN, this.x, this.y, this.width, this.height);
        else draw(CTX, GREEN_PE, this.x, this.y, this.width, this.height);
        break;
      case "ydep":
        if (this.normalPacket)
          draw(CTX, YELLOW, this.x, this.y, this.width, this.height);
        else draw(CTX, YELLOW_PE, this.x, this.y, this.width, this.height);
        break;
      case "odep":
        if (this.normalPacket)
          draw(CTX, ORANGE, this.x, this.y, this.width, this.height);
        else draw(CTX, ORANGE_PE, this.x, this.y, this.width, this.height);
        break;
      case "pdep":
        if (this.normalPacket)
          draw(CTX, PURPLE, this.x, this.y, this.width, this.height);
        else draw(CTX, PURPLE_PE, this.x, this.y, this.width, this.height);
        break;
      default:
        draw(CTX, NO_CANDY, this.x, this.y, this.width, this.height);
    }
  };
}
