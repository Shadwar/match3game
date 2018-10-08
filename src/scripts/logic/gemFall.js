
export const gemFall = (board, delta) => {
  for (let y = 0; y < board.length - 2; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const gem = board[y][x];
      if (!gem) continue;

      const lowerGem = board[y+2][x];
      if (!lowerGem) gem.moveTo(x, y+2, delta);
    }
  }
};
