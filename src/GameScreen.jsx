import React, { useState } from 'react';
import { createStyles, Grid, Button, Text } from '@mantine/core';
import theme from './theme';

import { useStore } from 'react-create-use-store';
import game from './game';

const useStyles = createStyles((theme) => ({
  start: {
    display: 'fixed',
    maxWidth: '100vw',
    maxHeight: '100vh',
    padding: '20px',
    zIndex: 300,
  },
  boardContainer: {
    padding: '5vh 5vw',
  },
}));

import Board from './components/Board';
import EndCard from './components/EndCard';

export default ({ gameGrid }) => {
  const { classes } = useStyles();
  const { state, actions } = useStore(game);

  return (
    <div className={classes.start}>
      {state.finished && <EndCard winner={state.winner} />}
      <Grid style={{ width: '100%' }}>
        <Grid.Col span={12}>
          <Text size="xl" align="center" style={{ color: '#fff' }}>
            It's Player {state.player}'s Turn To Place a Chip
          </Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <div className={classes.boardContainer}>
            <Board gameGrid={gameGrid} onRowClick={row => actions.placeChip(row)} />
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Button fullWidth color="red" onClick={() => actions.end()}>
            Quit Game
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
};