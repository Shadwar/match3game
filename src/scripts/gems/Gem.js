import *  as PIXI from 'pixi.js';
import { gemSize } from '../constants';


const coords = [
  new PIXI.Point(130, 40),
  new PIXI.Point(380, 40),
  new PIXI.Point(510, 260),
  new PIXI.Point(380, 470),
  new PIXI.Point(130, 470),
  new PIXI.Point(0, 250)
];

export class Gem {
  isFalling;
  isDestroying;
  x = -1;
  y = -1;

  constructor(type, board, stage) {
    this.type = type;
    this.board = board;
    this.stage = stage;

    this.initGraphics(type);
  }

  initGraphics = (type) => {
    this.resource = PIXI.loader.resources[`gems/${type}`];
    const sprite = new PIXI.Sprite(this.resource.texture);

    sprite.scale.set(0.1, 0.1);
    sprite.anchor.set(0.5);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.hitArea = new PIXI.Polygon(coords);

    console.log(sprite.width, sprite.height);

    this.stage.addChild(sprite);
    this.sprite = sprite;
  };

  setPosition = (x, y) => {
    if (this.x >= 0) this.board[this.y][this.x] = null;
    this.x = x;
    this.y = y;

    const deltaX = y % 2 ? 0 : 40;

    this.sprite.x = 100 + deltaX + x * (gemSize + gemSize / 3);
    this.sprite.y = 100 + y * (gemSize / 2.5);
    this.board[y][x] = this;
  };

  moveTo = (x, y, delta) => {
    this.isFalling = true;
    this.sprite.y += 5 * delta;

    if (this.sprite.y >= 100 + y * (gemSize / 2.5)) {
      this.isFalling = false;
      this.setPosition(x, y);
    }
  };

  destroy = () => {
    // this.sprite.alpha = 0.5;
    this.board[this.y][this.x] = null;
    this.stage.removeChild(this.sprite);
  }
}
