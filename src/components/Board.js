import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';

const useStyles = makeStyles((theme) => ({
  board: {
    padding: theme.spacing(5, 0, 5),
  },
}));

const Board = () => {
  const classes = useStyles();

  const CELL_SIZE = 15;
  const ROWS = 25;
  const COLS = 25;

  const [matrix, setMatrix] = useState(
    new Array(COLS)
      .fill(0)
      .map(() =>
        new Array(ROWS).fill(0).map(() => Math.floor(Math.random() * 2))
      )
  );

  // Empty matrix
  // new Array(COLS).fill(new Array(ROWS).fill(0))

  // Random matrix
  // new Array(COLS)
  //   .fill(0)
  //   .map(() =>
  //     new Array(ROWS).fill(0).map(() => Math.floor(Math.random() * 2))
  //   )

  const calcNext = (grid) => {
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

  const [buffer, setBuffer] = useState(() => calcNext(matrix));

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw board
    ctx.clearRect(0, 0, CELL_SIZE * COLS, CELL_SIZE * ROWS);

    matrix.forEach((col, x) => {
      col.forEach((cell, y) => {
        ctx.beginPath();
        ctx.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.strokeStyle = 'darkcyan';
        ctx.fillStyle = 'deepskyblue';

        if (cell) ctx.fill();

        ctx.stroke();
      });
    });
  }, [matrix]);

  const advanceGen = () => {
    setMatrix(buffer);
    setBuffer(() => calcNext(buffer));
  };

  return (
    <div className={classes.board}>
      <Container maxWidth="md">
        <NavigateNextOutlinedIcon onClick={advanceGen} />
        <br />
        <canvas
          ref={canvasRef}
          width={CELL_SIZE * COLS}
          height={CELL_SIZE * ROWS}
          style={{ border: '1px solid darkcyan' }}
        />
      </Container>
    </div>
  );
};

export default Board;
