import { calcNext } from './helpers';

const ROWS = 25;
const COLS = 40;

export const matrixReducer = (state, action) => {
  switch (action.type) {
    case 'advance':
      return {
        ...state,
        matrix: state.buffer,
        buffer: calcNext(state.buffer),
        generation: state.generation + 1,
      };
    case 'start':
      return {
        ...state,
        running: true,
      };
    case 'pause':
      return {
        ...state,
        running: false,
      };
    case 'clear':
      return {
        ...state,
        matrix: new Array(COLS).fill(new Array(ROWS).fill(0)),
        buffer: new Array(COLS).fill(new Array(ROWS).fill(0)),
        generation: 0,
      };
    case 'toggle':
      const newMatrix = state.matrix.map((row) => row.slice());

      if (newMatrix[action.payload.cellX][action.payload.cellY]) {
        newMatrix[action.payload.cellX][action.payload.cellY] = 0;
      } else {
        newMatrix[action.payload.cellX][action.payload.cellY] = 1;
      }

      const newBuffer = calcNext(newMatrix);

      return {
        ...state,
        matrix: newMatrix,
        buffer: newBuffer,
      };
    case 'random':
      const seed = new Array(COLS)
        .fill(0)
        .map(() =>
          new Array(ROWS).fill(0).map(() => Math.floor(Math.random() * 2))
        );

      return {
        ...state,
        matrix: seed,
        buffer: calcNext(seed),
        generation: 0,
      };

    default:
      return state;
  }
};
