import React, { useReducer, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import { matrixReducer } from '../utils/reducer';
import { calcNext, drawBoard } from '../utils/helpers';
import { useAniFrame } from '../utils/hooks';
import SpeedSlider from './SpeedSlider';
import RulesDialog from './RulesDialog';

const useStyles = makeStyles((theme) => ({
  board: {
    padding: theme.spacing(4, 0, 5),
  },
  controlBar: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const Board = () => {
  const classes = useStyles();

  const CELL_SIZE = 20;
  const ROWS = 25;
  const COLS = 40;
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
    running: false,
  };

  const [state, dispatch] = useReducer(matrixReducer, initialState);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    drawBoard(canvas, state.matrix, CELL_SIZE);
  }, [state.matrix]);

  const [step, start, stop, setPeriod] = useAniFrame(() => {
    dispatch({ type: 'advance' });
  }, 500);

  const startGame = () => {
    start();
    dispatch({ type: 'start' });
  };

  const stopGame = () => {
    stop();
    dispatch({ type: 'pause' });
  };

  const clearGame = () => {
    stop();
    dispatch({ type: 'clear' });
  };

  const getPosition = (e) => {
    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left + 1;
    const y = e.clientY - rect.top + 1;

    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);

    if (!state.running && cellX < COLS && cellY < ROWS) {
      dispatch({ type: 'toggle', payload: { cellX, cellY } });
    }
  };

  return (
    <div className={classes.board}>
      <Container maxWidth="md">
        <div className={classes.controlBar}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              {state.running ? (
                <Button variant="outlined" color="primary" onClick={stopGame}>
                  <StopOutlinedIcon />
                </Button>
              ) : (
                <Button variant="outlined" color="primary" onClick={startGame}>
                  <PlayArrowOutlinedIcon />
                </Button>
              )}
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={step}>
                <NavigateNextOutlinedIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={clearGame}>
                Clear
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => dispatch({ type: 'random' })}
              >
                Random
              </Button>
            </Grid>
            <Grid item>
              <RulesDialog />
            </Grid>
          </Grid>
          <SpeedSlider setPeriod={setPeriod} running={state.running} />
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            <b>Generation:</b> {state.generation}
          </Typography>
        </div>
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          style={{ border: '1px solid #3392B1' }}
          onClick={getPosition}
        />
      </Container>
    </div>
  );
};

export default Board;
