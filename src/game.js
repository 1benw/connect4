import { createStore } from 'react-create-use-store';
import { showNotification } from '@mantine/notifications';

const GRID_HEIGHT = 6;
const GRID_WIDTH = 7;

const state = { 
  started: false,
  finished: false,
};

const actions = {
  start(playerFirst) {
    console.log('start game');
    store.setState(current => ({
      ...current, 
      started: true,
      grid: createGameGrid(GRID_HEIGHT, GRID_WIDTH),
      player: playerFirst ?? 1,
    }));
  },
  end() {
    console.log('end game')
    store.setState(current => ({
      ...current, 
      started: false,
    }));
  },
  placeChip(row) {
    let currentGrid = store.state.grid;
    console.log('place chip', row, currentGrid);

    for (let i = (GRID_HEIGHT - 1); i >= 0; i--) {
      console.log(i);
      if (currentGrid[i][row] == 0) {
        currentGrid[i][row] = store.state.player;

        store.setState(current => ({
          ...current,
          grid: currentGrid,
          player: current.player == 1 ? 2 : 1,
        }));

        store.actions.checkForWin();
        
        return;
      }
    }

    showNotification({
      message: 'Cannot Place Chip There',
      color: 'red',
    });
  },
  checkForWin() {
    console.log('check for win!')
    let maxAdjacent = {
      1: 0,
      2: 0,
    };

    // Add the found adjacent lines if they are larger than the previous ones found
    const parseResults = (results) => {
      for (const player in results) {
        if (results[player] > maxAdjacent[player]) {
          maxAdjacent[player] = results[player];
        }
      }
    }

    // Check Diagonal Left and Right for Lines
    for (let i = 3; i < GRID_HEIGHT; i++) {
      parseResults(countDiagonals(i, true));
      parseResults(countDiagonals(i, false));
    }

    // Check each row for horizontal lines
    for (let i = 0; i < GRID_HEIGHT; i++) {
      parseResults(countHorizontal(i))
    }

    // Check each column for vertical lines
    for (let i = 0; i < GRID_WIDTH; i++) {
      parseResults(countVertical(i))
    }

    console.log(maxAdjacent);

    if (maxAdjacent[1] >= 4) {
      console.log('player 1 won')
      store.setState(current => ({
        ...current,
        finished: true,
        winner: 1,
      }));
    } else if (maxAdjacent[2] >= 4) {
      console.log('player 2 won')
      store.setState(current => ({
        ...current,
        finished: true,
        winner: 2,
      }));
    }
  },
};

const createGameGrid = (rows, columns) => {
  const grid = new Array(rows);

  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(columns).fill(0);
  }

  console.log('g', grid)
  return grid;
};

const countHorizontal = (row) => {
  let newStartPoint = 0;

  let test = store.state.grid[row].reduce((prev, curr, index) => {
    //console.log(prev, curr)
    if (prev[`${curr}-${newStartPoint}`] && store.state.grid[row][index - 1] == curr) {
      prev[`${curr}-${newStartPoint}`].count++
    } else {
      newStartPoint++;
      prev[`${curr}-${newStartPoint}`] = {
        count: 1,
        start: index,
        player: curr,
      }
    }
    return prev
  }, {});

  return Object.values(test).reduce((prev, curr) => {
    if (curr.player > 0 && !prev[curr.player]) {
      prev[curr.player] = curr.count;
    } else if (curr.count > prev[curr.player]) {
      prev[curr.player] = curr.count;
    }

    return prev;
  }, {});
};

const countVertical = (col) => {
  let lastElement;
  let adjElementCount = {};
  store.state.grid.forEach(row => {
    if (row[col] > 0) {
      if (lastElement == row[col]) {
        adjElementCount[row[col]]++;
      } else {
        adjElementCount[row[col]] = 1;
      }
    }
    lastElement = row[col];
  });

  return adjElementCount;
};

const countDiagonals = (fromRow, direction) => { //Left to Right is false, RTL is true
  let row = store.state.grid[fromRow];
  
  //console.log(fromRow, row.length);
  if (direction) { // Right to Left Diagonal
    let realAdjElementCount = {};
    for (let i = row.length - 1; i >= row.length - 4; i--) {
      let lastElement;
      let adjElementCount = {};

      let next = i
      for (let j = fromRow; j > fromRow - 4; j--) {
        //console.log('up', j, next, store.state.grid[j][next])
        if (store.state.grid[j][next] > 0) {
          if (lastElement == store.state.grid[j][next]) {
            adjElementCount[store.state.grid[j][next]]++;
          } else {
            //console.log(row[i])
            adjElementCount[store.state.grid[j][next]] = 1;
          }
        }
        lastElement = store.state.grid[j][next];
        next--;
      }

      for (const chipType in adjElementCount) {
        console.log(chipType)
        if (!realAdjElementCount[chipType] || adjElementCount[chipType] > realAdjElementCount[chipType]) {
          realAdjElementCount[chipType] = adjElementCount[chipType];
        }
      }
      //console.log(adjElementCount)
    }
    //console.log(realAdjElementCount)
    return realAdjElementCount;
  } else { // Left to Right Diagonal
    let realAdjElementCount = {};
    for (let i = 0; i <= row.length - 4; i++) {
      let lastElement;
      let adjElementCount = {};

      let next = i
      for (let j = fromRow; j > fromRow - 4; j--) {
        //console.log('up', j, next, store.state.grid[j][next])
        if (store.state.grid[j][next] > 0) {
          if (lastElement == store.state.grid[j][next]) {
            adjElementCount[store.state.grid[j][next]]++;
          } else {
            //console.log(row[i])
            adjElementCount[store.state.grid[j][next]] = 1;
          }
        }
        lastElement = store.state.grid[j][next];
        next++;
      }

      for (const chipType in adjElementCount) {
        //console.log(chipType)
        if (!realAdjElementCount[chipType] || adjElementCount[chipType] > realAdjElementCount[chipType]) {
          realAdjElementCount[chipType] = adjElementCount[chipType];
        }
      }
    }

    return realAdjElementCount
  }
}

// create and export the store
const store = createStore({ state, actions });
export default store;