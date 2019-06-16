import * as PIXI from 'pixi.js';
import { loadResources } from './assets';
import { Gem } from './gems';
import * as Logic from './logic';
import gems from '../assets/json/gems.json';


export class Game {
  app = null;
  board = null;
  stage = null;

  constructor(app) {
    this.stage = app.stage;
    this.app = app;

    loadResources(this.init);
  }

  init = () => {
    const graphics = new PIXI.Graphics();
    this.stage.addChild(graphics);

    const colors = gems.map(gem => gem.type);

    const board = new Array(12);
    this.board = board;

    for (let y = 0; y < 11; y++) {
      const rowSize = y % 2 ? 10 : 9;
      board[y] = new Array(rowSize);

      for (let x = 0; x < rowSize; x++) {
        const type = colors[Math.floor(Math.random() * colors.length)];
        const gem = new Gem(type, this.board, this.stage);
        console.log(x, y);

        gem.setPosition(x, y);
      }
    }

    board[11] = new Array(12);
    for (let x = 0; x < 12; x++) {
      board[11][x] = 'floor';
    }

    this.app.ticker.add(this.run);
  };

  onOver = (event) => {
    const point = event.data.global;

    const gems = [];

    for (let y = 0; y < this.board.length - 1; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        const gem = this.board[y][x];
        if (!gem || gem.isFalling) continue;

        const { x: gemX, y: gemY, width, height } = gem.sprite;

        gem.sprite.alpha = 1.0;
        if (point.x < gemX || point.x > (gemX + width)) continue;
        if (point.y < gemY || point.y > (gemY + height)) continue;

        gem.sprite.alpha = 0.5;

        // gems.push(gem);
      }
    }
    //
    // gems.forEach(gem => gem.destroy());
  };

  run = (delta) => {
    Logic.gemFall(this.board, delta);
    Logic.gemDestroy(this.board);
  };
}