export const drawBoard = (canvas, matrix, cellSize) => {
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  matrix.forEach((col, x) => {
    col.forEach((cell, y) => {
      ctx.beginPath();
      ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
      ctx.strokeStyle = 'darkcyan';
      ctx.fillStyle = 'deepskyblue';

      if (cell) ctx.fill();

      ctx.stroke();
    });
  });
};
