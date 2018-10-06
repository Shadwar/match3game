import * as PIXI from 'pixi.js';
import { loadResources } from './assets';
import { Gem } from './gems';

const gemSize = 60;


export class Game {
  board = null;
  stage = null;

  constructor(stage) {
    this.stage = stage;
    this.board = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.board[i] = new Array(10);
    }

    loadResources(this.init);
  }

  init = () => {
    for (let i = 0; i < 10; i++) {
      const gem = new Gem('red');
      const { sprite } = gem;
      sprite.scale.set(0.1, 0.1);
      sprite.anchor.set(0.5);
      sprite.y = 100;
      sprite.x = 100 + gemSize * i;

      this.board[0][i] = gem;
      this.stage.addChild(sprite);
    }
  };

  checkMoveGems = (delta) => {
    for (let i = 0; i < this.board.length - 1; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const gem = this.board[i][j];
        const lowerGem = this.board[i+1][j];

        if (!gem) continue;

        if (gem && !lowerGem && i < this.board.length - 1) {
          this.board[i][j] = null;
          this.board[i+1][j] = gem;
          gem.isFalling = true;
        } else if (gem.sprite.y >= 100 + i * gemSize) {
          gem.isFalling = false;
        }
      }
    }
  }

  run = (delta) => {
    this.checkMoveGems();

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const gem = this.board[i][j];

        if (gem && gem.isFalling) {
          gem.sprite.y += 5 * delta;

          if (gem.sprite.y >= 100 + i * gemSize) {
            gem.isFalling = false;
          }
        }
      }
    }
  };
}