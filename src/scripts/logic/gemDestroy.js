
const getGemFn = (board) => (x, y) => {
  if (y < 0 || y >= board.length) return null;
  if (x < 0 || x >= board[y].length) return null;

  const gem = board[y][x];
  if (!gem || gem.isFalling || gem === 'floor') return null;
  return gem;
};

const neighborsOdd = [
  [0, -2], [0, -1], [0, 1], [0, 2], [-1, 1], [-1, -1]
];

const neighborsEven = [
  [0, -2], [1, -1], [1, 1], [0, 2], [0, 1], [0, 2]
];

const getNeighborsFn = (board) => (x, y) => {
  const getGem = getGemFn(board);

  const center = getGem(x, y);
  if (!center) return null;

  const neighborsPattern = y % 2 ? neighborsOdd : neighborsEven;

  return neighborsPattern.map(pattern => getGem(x + pattern[0], y + pattern[1]));
};


export const gemDestroy = (board) => {
  let gemsToDestroy = [];

  const getGem = getGemFn(board);
  const getNeighbors = getNeighborsFn(board);

  for (let y = 1; y < board.length - 1; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const gem = getGem(x, y);
      if (!gem || gem.isFalling) continue;

      const neighbors = getNeighbors(x, y);

      let remove = false;
      let lastNeighbor = null;

      neighbors.forEach(neighbor => {
        if (neighbor && neighbor.type === gem.type) {
          if (lastNeighbor) {
            remove = true;
            gemsToDestroy.push(lastNeighbor);
            gemsToDestroy.push(neighbor);
          }

          lastNeighbor = neighbor;
        } else {
          lastNeighbor = null;
        }
      });

      if (remove) gemsToDestroy.push(gem);
    }
  }

  const filteredGems = [];
  gemsToDestroy.forEach(gem => filteredGems.indexOf(gem) === -1 && filteredGems.push(gem));
  filteredGems.forEach(gem => gem.destroy());
};