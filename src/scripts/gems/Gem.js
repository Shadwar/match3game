import { loader, Sprite, Polygon } from 'pixi.js';
import { gemSize } from '../constants';
import { coords } from './constants';


export class Gem {
  isFalling;
  isDestroying;
  x = -1;
  y = -1;

  constructor(type, board, stage) {
    this.type = type;
    this.board = board;
    this.stage = stage;

    this.resource = loader.resources[`gems/${type}`];
    this.initGraphics();
    this.initHandlers();
    this.initStage();
  }

  initStage = () => {
    this.stage.addChild(this.sprite);
  };

  initGraphics = () => {
    const sprite = new Sprite(this.resource.texture);
    sprite.scale.set(0.1, 0.1);
    this.sprite = sprite;
  };

  initHandlers = () => {
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.hitArea = new Polygon(coords);

    this.sprite.on('pointerout', this.onPointerOut);
    this.sprite.on('pointerover', this.onPointerOver);
    this.sprite.on('pointerdown', this.onPointerDown);
  };

  onPointerOver = () => this.sprite.alpha = 0.5;

  onPointerOut = () => this.sprite.alpha = 1.0;

  onPointerDown = () => {
    this.destroy();
  };

  setPosition = (x, y) => {
    if (this.x >= 0) this.board[this.y][this.x] = null;
    this.x = x;
    this.y = y;

    const deltaX = y % 2 ? 0 : 40;

    this.sprite.x = deltaX + x * (gemSize + gemSize / 3);
    this.sprite.y = y * (gemSize / 2.5);
    this.board[y][x] = this;
  };

  moveTo = (x, y, delta) => {
    this.isFalling = true;
    this.sprite.y += 5 * delta;

    if (this.sprite.y >= y * (gemSize / 2.5)) {
      this.isFalling = false;
      this.setPosition(x, y);
    }
  };

  destroy = () => {
    this.board[this.y][this.x] = null;
    this.stage.removeChild(this.sprite);
  }
}
