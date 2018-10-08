import *  as PIXI from 'pixi.js';
import { gemSize } from '../constants';

export class Gem {
  fallTo;
  x;
  y;

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

    this.stage.addChild(sprite);
    this.sprite = sprite;
  };

  setPosition = (x, y) => {
    if (this.x) this.board[this.y][this.x] = null;
    this.x = x;
    this.y = y;

    const deltaX = y % 2 ? 0 : 40;

    this.sprite.x = 100 + deltaX + x * (gemSize + gemSize / 3);
    this.sprite.y = 100 + y * (gemSize / 2.5);
    this.board[y][x] = this;
  };

  moveTo = (x, y, delta) => {
    this.sprite.y += 5 * delta;

    if (this.sprite.y >= 100 + y * (gemSize / 2.5)) {
      this.setPosition(x, y);
    }
  };
}
