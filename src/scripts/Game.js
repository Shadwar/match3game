import * as PIXI from 'pixi.js';
import { loadResources } from './assets';
import { Gem } from './gems';
import { random, printTable } from './utils';

const gemSize = 60;

export class Game {
  board = null;
  stage = null;

  constructor(app) {
    this.stage = app.stage;
    this.app = app;
    this.board = new Array(10);

    for (let i = 0; i < 10; i++) {
      this.board[i] = new Array(10);
    }

    this.board[10] = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.board[10][i] = 'floor';
    }

    loadResources(this.init);
  }

  init = () => {
    for (let i = 0; i < 20; i++) {
      const gem = new Gem('red');
      const { sprite } = gem;
      sprite.scale.set(0.1, 0.1);
      sprite.anchor.set(0.5);

      let x = 0;
      let y = 0;
      while (true) {
        x = random(0, 9);
        y = random(0, 9);
        if (!this.board[y][x]) break;
      }

      sprite.x = 100 + x * gemSize;
      sprite.y = 100 + y * gemSize;

      this.board[y][x] = gem;
      this.stage.addChild(sprite);
    }

    this.app.ticker.add(this.run);
  };

  checkMoveGems = (delta) => {
    for (let y = 0; y < this.board.length - 1; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        const gem = this.board[y][x];
        if (!gem) continue;

        const lowerGem = this.board[y+1][x];
        if (lowerGem) {
          if (gem.isFalling && gem.sprite.y >= 100 + y * gemSize) {
            gem.isFalling = false;
          }
          continue;
        };

        gem.isFalling = true;
        if (gem.sprite.y >= 100 + (y + 1) * gemSize) {
          this.board[y][x] = null;
          this.board[y+1][x] = gem;
        }
      }
    }
  }

  run = (delta) => {
    this.checkMoveGems();

    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        const gem = this.board[y][x];

        if (gem && gem.isFalling) {
          gem.sprite.y += 5 * delta;
        }
      }
    }
  };
}