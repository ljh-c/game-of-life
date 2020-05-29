export const calcNext = (grid) => {
  const nextMatrix = grid.map((col, x) =>
    col.map((cell, y) => {
      // Count neighbors
      let count = 0;

      for (let nx = x - 1; nx <= x + 1; ++nx) {
        for (let ny = y - 1; ny <= y + 1; ++ny) {
          let neighborX = nx;
          let neighborY = ny;

          if (neighborX === x && neighborY === y) continue;

          if (neighborX < 0) neighborX = grid.length - 1;
          if (neighborX === grid.length) neighborX = 0;

          if (neighborY < 0) neighborY = grid[x].length - 1;
          if (neighborY === grid[x].length) neighborY = 0;

          count += grid[neighborX][neighborY];
        }
      }

      // Apply rules
      if (cell) {
        if (count < 2 || count > 3) return 0;
      } else {
        if (count === 3) return 1;
      }

      return cell;
    })
  );

  return nextMatrix;
};

export const drawBoard = (canvas, matrix, cellSize) => {
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  matrix.forEach((col, x) => {
    col.forEach((cell, y) => {
      ctx.beginPath();
      ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
      ctx.strokeStyle = '#3392B1';
      ctx.fillStyle = 'deepskyblue';

      if (cell) ctx.fill();

      ctx.stroke();
    });
  });
};
