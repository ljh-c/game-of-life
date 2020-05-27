import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  board: {
    padding: theme.spacing(5, 0, 5),
  },
}));

const Board = () => {
  const classes = useStyles();

  const CELL_SIZE = 20;
  const ROWS = 25;
  const COLS = 25;

  const [matrix] = useState(
    new Array(ROWS)
      .fill(0)
      .map(() =>
        new Array(COLS).fill(0).map(() => Math.floor(Math.random() * 2))
      )
  );

  // Empty matrix
  // new Array(ROWS).fill(new Array(COLS).fill(0))

  // Random matrix
  // new Array(ROWS)
  //   .fill(0)
  //   .map(() =>
  //     new Array(COLS).fill(0).map(() => Math.floor(Math.random() * 2))
  //   )

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw board
    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        ctx.beginPath();
        ctx.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.strokeStyle = 'darkcyan';
        ctx.fillStyle = 'deepskyblue';

        if (cell) ctx.fill();
        
        ctx.stroke();
      });
    });
  }, [matrix]);

  return (
    <div className={classes.board}>
      <Container maxWidth="md">
        <canvas
          ref={canvasRef}
          width={CELL_SIZE * COLS}
          height={CELL_SIZE * ROWS}
          style={{border: "1px solid darkcyan"}}
        />
      </Container>
    </div>
  );
};

export default Board;
