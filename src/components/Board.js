import React, { useState, useRef, useCallback, useEffect } from 'react';
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

  const CELL_SIZE = 20;
  const ROWS = 25;
  const COLS = 30;

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
    const nextMatrix = grid.map((col) => col.map((cell) => (cell ? 0 : 1)));

    return nextMatrix;
  };

  const [buffer, setBuffer] = useState(calcNext(matrix));

  const canvasRef = useRef(null);

  const drawBoard = useCallback((ctx) => {
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, CELL_SIZE * COLS, CELL_SIZE * ROWS)
    drawBoard(ctx);
  }, [drawBoard]);

  const advanceGen = () => {
    setMatrix(buffer);
    setBuffer(calcNext(buffer));
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
