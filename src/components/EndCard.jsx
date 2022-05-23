import React, { useState } from 'react';
import { createStyles, useMantineTheme, Grid, Button, Card, Text, Group, Badge, Modal } from '@mantine/core';
import Confetti from 'react-confetti'

const useStyles = createStyles((theme) => ({
  endCard: {
    position: 'fixed',
    width: '50%',
    left: 0,
    height: '40%',
    margin: '5% 25%'
  },
  confetti: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
  }
}));

export default ({ winner }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.confetti}>
        <Confetti />
      </div>
      <Modal centered opened={true} size="lg" title={"The Game Has Finished!"} onClose={() => {}}>
        <Text size="md" style={{ color: '#fff', lineHeight: 1.5 }}>
          Game Over, Player {winner} Won!
        </Text>
  
        <Button fullWidth style={{ marginTop: 14 }}>
          Play Another Game
        </Button>
      </Modal>
    </>
  );
};