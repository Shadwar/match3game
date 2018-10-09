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
        gem.sprite.on('pointerdown', this.onClick(gem));
      }
    }

    board[11] = new Array(12);
    for (let x = 0; x < 12; x++) {
      board[11][x] = 'floor';
    }

    this.app.ticker.add(this.run);
  };

  onClick = (gem) => () => {
    this.board[gem.y][gem.x] = null;
    this.stage.removeChild(gem.sprite);
  };

  run = (delta) => {
    Logic.gemFall(this.board, delta);
    Logic.gemDestroy(this.board);
  };
}