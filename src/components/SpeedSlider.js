import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: '0 auto',
  },
  margin: {
    height: theme.spacing(3),
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
      <Slider
        defaultValue={500}
        aria-labelledby="speed-slider"
        step={null}
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
