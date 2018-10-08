
export const gemDestroy = (board) => {
  for (let y = 0; y < board.length - 1; y++) {
    let inRow = 0;
    let lastType = null;

    for (let x = 0; x < board[y].length; x++) {
      const gem = board[y][x];

      if (!gem || gem.isFalling) {
        inRow = 0;
        lastType = null;
        continue;
      }

      if (!lastType || lastType !== gem.type) {
        if (inRow >= 3) {
          while (inRow > 0) {
            const deletedGem = board[y][x-inRow];
            console.log(deletedGem);
            inRow -= 1;
            deletedGem.sprite.emit('pointerdown');
          }
        }

        inRow = 1;
        lastType = gem.type;
        continue;
      }

      inRow += 1;

    }
  }
};