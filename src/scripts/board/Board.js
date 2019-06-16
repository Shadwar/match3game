import gems from '../../assets/json/gems.json';
import { Gem } from '../gems';

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(height + 1);

    this.populateBoard();
  }

  populateBoard = () => {
    const colors = gems.map(gem => gem.type);

    for (let y = 0; y < this.height; y++) {
      const rowSize = y % 2 ? this.width : this.width - 1;
      this.board[y] = new Array(rowSize);

      for (let x = 0; x < rowSize; x++) {
        const type = colors[Math.floor(Math.random() * colors.length)];
        const gem = new Gem(this, type);
        this.board[y][x] = new Gem(this, type, x, y);
      }
    }

    this.board[this.height] = new Array(this.width + 2);
    for (let x = 0; x < this.width + 2; x++) {
      this.board[this.height][x] = 'floor';
    }
  };
}