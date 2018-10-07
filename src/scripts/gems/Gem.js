import *  as PIXI from 'pixi.js';
import { gemSize } from '../constants';

export class Gem {
  fallTo = null;
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
    sprite.on('pointerdown', this.onClick);

    this.stage.addChild(sprite);
    this.sprite = sprite;
  };

  setPosition = (x, y) => {
    this.x = x;
    this.y = y;

    this.sprite.x = 100 + x * gemSize;
    this.sprite.y = 100 + y * gemSize;
    this.board[y][x] = this;
  };

  onClick = () => {
    this.board[this.y][this.x] = null;
    this.stage.removeChild(this.sprite);
  };
}
