import { createStore } from 'react-create-use-store';

const state = { started: false };

const actions = {
  start(playerFirst) {
    console.log('start game');
    store.setState(current => ({
      ...current, 
      started: true,
      grid: createGameGrid(4, 7),
      player: playerFirst ?? 1,
    }));
  },
  placeChip(row) {
    console.log('place chip', row);
    let currentGrid = store.state.grid;

    console.log(currentGrid[row]);
    const newPos = currentGrid[row].findIndex(chip => chip == 0);
    if (newPos >= 0) {
      currentGrid[row][newPos] = store.state.player;
  
      console.log(currentGrid);
  
      store.setState(current => ({
        ...current,
        grid: currentGrid,
      }));

      store.actions.checkForWin();
    }

    

  },
  checkForWin() {
    console.log('check for win!')
  },
};

const createGameGrid = (rows, columns) => {
  const grid = new Array(rows);

  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(columns).fill(0);
  }

  return grid;
};

// create and export the store
const store = createStore({ state, actions });
export default store;