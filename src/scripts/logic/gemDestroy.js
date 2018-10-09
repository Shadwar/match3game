
const getGemFn = (board, type) => (x, y) => {
  if (y < 0 || y >= board.length) return null;
  if (x < 0 || x >= board[y].length) return null;

  const gem = board[y][x];
  if (!gem || gem.type !== type || gem.isFalling) return null;
  return gem;
};

export const gemDestroy = (board) => {
  let gemsToDestroy = [];

  for (let y = board.length - 1; y > 0; y--) {
    for (let x = 0; x < board[y].length; x++) {
      const gem = board[y][x];
      if (!gem || gem.isFalling) continue;
      const getGem = getGemFn(board, gem.type);

      let topGem = getGem(x, y - 2);
      if (!topGem) continue;

      let leftGem = null;
      let rightGem = null;

      if (y % 2) {
        leftGem = getGem(x - 1, y - 1);
        rightGem = getGem(x, y - 1);
      } else {
        leftGem = getGem(x, y - 1);
        rightGem = getGem(x + 1, y - 1);
      }

      if (!leftGem && !rightGem) continue;

      const gems = [gem, topGem, leftGem, rightGem].filter(gem => gem);
      gems.forEach(gem => gemsToDestroy.indexOf(gem) === -1 && gemsToDestroy.push(gem));
    }
  }

  if (gemsToDestroy.length >= 3) {
    gemsToDestroy.forEach(gem => gem.destroy());
  }
};