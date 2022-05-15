import React, { useState } from 'react';
import { createStyles, Grid, Button } from '@mantine/core';
import theme from './theme';

import { useStore } from 'react-create-use-store';
import gameStore from './gameStore';

const useStyles = createStyles((theme) => ({
  start: {
    display: 'fixed',
    maxWidth: '100vw',
    maxHeight: '100vh',
    padding: '20px',
  },
  boardContainer: {
    padding: '10vh 5vw',
  },
}));

import Board from './components/Board';

export default ({ gameGrid }) => {
  const { classes } = useStyles();
  const { state, actions } = useStore(gameStore);

  return (
    <div className={classes.start}>
      <Grid style={{ width: '100%' }}>
        <Grid.Col span={12}></Grid.Col>
        <Grid.Col span={12}>
          <div className={classes.boardContainer}>
            <Board gameGrid={gameGrid} onRowClick={row => actions.placeChip(row)} />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};