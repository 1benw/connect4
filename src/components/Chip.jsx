import React, { useState } from 'react';
import { createStyles, Grid, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  chip: {
    border: '3px solid #0F1C3F',
    borderRadius: '50%',
    height: '70px',
    width: '70px',
    margin: 'auto',
  },
  player0: { // There is no chip here so hide the border
    border: 'none',
  },
  player1: {
    background: theme.colors.red[7],
  },
  player2: {
    background: theme.colors.yellow[7],
  }
}));

export default ({ type }) => {
  const { classes } = useStyles();

  return (
    <div className={`${classes.chip} ${classes['player' + type]}`}></div>
  );
};