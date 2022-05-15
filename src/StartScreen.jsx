import React, { useState } from 'react';
import { createStyles, Grid, Button } from '@mantine/core';
import theme from './theme';

const useStyles = createStyles((theme) => ({
  start: {
    display: 'fixed',
    maxWidth: '100vw',
    maxHeight: '100vh',
    padding: '20px',
  }
}));

export default ({ onStartGame }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.start}>
      <Grid style={{ width: '100%' }}>
        <Grid.Col span={12}></Grid.Col>
        <Grid.Col span={12}>
          <Button fullWidth onClick={onStartGame}>Play Connect 4</Button>
        </Grid.Col>
      </Grid>
    </div>
  );
};