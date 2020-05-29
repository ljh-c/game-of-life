import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

export default function RulesDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <HelpOutlineOutlinedIcon />
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="what-is-this"
        aria-describedby="conway's-game-of-life-rules"
        maxWidth="xs"
      >
        <DialogTitle id="scroll-dialog-title">
          What is Conway's Game of Life?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description" tabIndex={-1}>
            A simulation devised by mathematician John Conway. Conway's Game of
            Life is a cellular automaton that creates new generations according
            to some fixed rules. The rules are:
            <ul>
              <li>
                If a live cell has fewer than two neighbors, it dies (modeling
                underpopulation).
              </li>
              <li>
                If a live cell has two or three neighbors, it survives to the next
                generation.
              </li>
              <li>
                If a live cell has more than three neighbors, it dies (modeling
                overpopulation).
              </li>
              <li>
                If a dead cell has exactly three neighbors, it becomes a live cell
                (modeling reproduction).
              </li>
            </ul>
            The game evolves by itself based only on its initial state. Despite
            no outside input, elegant patterns emerge.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
