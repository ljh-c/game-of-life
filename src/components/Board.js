import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import { drawBoard } from '../utils/helpers';

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
  const WIDTH = CELL_SIZE * COLS;
  const HEIGHT = CELL_SIZE * ROWS;

  const [matrix] = useState(
    new Array(COLS)
      .fill(0)
      .map(() =>
        new Array(ROWS).fill(0).map(() => Math.floor(Math.random() * 2))
      )
  );

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    drawBoard(canvas, matrix, CELL_SIZE);
  }, [matrix]);

  return (
    <div className={classes.board}>
      <Container maxWidth="md">
        <NavigateNextOutlinedIcon />
        <br />
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          style={{ border: '1px solid darkcyan' }}
        />
      </Container>
    </div>
  );
};

export default Board;
