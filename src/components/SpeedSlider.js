import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedIcon from '@material-ui/icons/Speed';
import { Slider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: '0 auto',
    display: 'flex',
    padding: theme.spacing(2, 0),
  },
}));

const marks = [
  {
    value: 20,
    label: '20 ms',
  },
  {
    value: 200,
    label: '250 ms',
  },
  {
    value: 500,
    label: '500 ms',
  },
  {
    value: 1000,
    label: '1 sec',
  },
];

const SpeedSlider = ({ setPeriod }) => {
  const classes = useStyles();

  const handleChange = (e, newValue) => {
    setPeriod(newValue);
  };

  return (
    <div className={classes.root}>
      <SpeedIcon style={{ marginRight: '10' }} />
      <Slider
        defaultValue={500}
        aria-labelledby="speed-slider"
        step={20}
        valueLabelDisplay="auto"
        marks={marks}
        min={20}
        max={1000}
        onChange={handleChange}
      />
    </div>
  );
};

export default SpeedSlider;
