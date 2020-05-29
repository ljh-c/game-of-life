import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  hero: {
    padding: theme.spacing(4, 0, 4),
    backgroundColor: theme.palette.background.paper,
  },
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Conway's Game of Life
        </Typography>
      </Container>
    </div>
  );
};

export default Hero;
