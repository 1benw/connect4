import React, { useState } from 'react';
import './App.css';
import { MantineProvider, createStyles, Button, GroupedTransition, Transition } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import theme from './theme';

import { useStore } from 'react-create-use-store';
import game from './game';

import StartScreen from './StartScreen';
import GameScreen from './GameScreen';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
  }
}));

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0, transform: 'scaleY(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

function App() {
  const { state, actions } = useStore(game);
  // const [started, setStarted] = useState(false);
  // const [gameGrid, setGameGrid] = useState(null);

  const startGame = () => {
    actions.start();
    
    //setStarted(true);
    //setGameGrid(Array(7).fill(Array(4).fill(0)));
  };

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        {state.started ? (
          <GameScreen gameGrid={state.grid} />
        ) : (
          <StartScreen onStartGame={startGame} />
        )}
        {/*<Board /> */}
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;