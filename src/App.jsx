import React, { useState } from 'react';
import './App.css';
import { MantineProvider, createStyles, Button } from '@mantine/core';
import theme from './theme';

import { useStore } from 'react-create-use-store';
import gameStore from './gameStore';

import StartScreen from './StartScreen';
import GameScreen from './GameScreen';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
  }
}));

function App() {
  const { state, actions } = useStore(gameStore);
  // const [started, setStarted] = useState(false);
  // const [gameGrid, setGameGrid] = useState(null);

  const startGame = () => {
    actions.start();
    
    //setStarted(true);
    //setGameGrid(Array(7).fill(Array(4).fill(0)));
  };

  return (
    <MantineProvider theme={theme}>
      {state.started ? (
        <GameScreen gameGrid={state.grid} />
      ) : (
        <StartScreen onStartGame={startGame} />
      )}
      {/*<Board /> */}
    </MantineProvider>
  );
}

export default App;