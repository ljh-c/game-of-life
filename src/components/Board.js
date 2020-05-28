import React, { useReducer, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import { matrixReducer } from '../utils/reducer';
import { calcNext, drawBoard } from '../utils/helpers';
import { useAniFrame } from '../utils/hooks';

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

  const seed = new Array(COLS)
    .fill(0)
    .map(() =>
      new Array(ROWS).fill(0).map(() => Math.floor(Math.random() * 2))
    );

  const initialState = {
    matrix: seed,
    buffer: calcNext(seed),
    generation: 0,
  };

  const [state, dispatch] = useReducer(matrixReducer, initialState);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    drawBoard(canvas, state.matrix, CELL_SIZE);
  }, [state.matrix]);

  const [step, start, stop] = useAniFrame(() => {
    dispatch({ type: 'advance' });
  });

  return (
    <div className={classes.board}>
      <Container maxWidth="md">
        <b>Generation:</b> {state.generation}
        <br />
        <PlayArrowOutlinedIcon onClick={start} />
        <StopOutlinedIcon onClick={stop} />
        <NavigateNextOutlinedIcon onClick={step} />
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
