import { calcNext } from './helpers';

export const matrixReducer = (state, action) => {
  switch (action.type) {
    case 'advance':
      return {
        matrix: state.buffer,
        buffer: calcNext(state.buffer),
        generation: state.generation + 1,
      };
    default:
      return state;
  }
};
