import React, { useState, Fragment } from 'react';
import { createStyles, Grid, Button } from '@mantine/core';
import Chip from './Chip';

const useStyles = createStyles((theme) => ({
  start: {
    display: 'fixed',
    maxWidth: '100%',
    maxHeight: '100%',
    padding: '20px',
  },
  test: {
    border: '1px solid rgba(255, 255, 255, .6)',
  }
}));

const convertToGameGrid = (currentGrid) => {
  const cols = currentGrid.length;
  const rows = currentGrid[1].length;

  let newGrid = Array()
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!newGrid[row]) {
        newGrid[row] = []
      }

      newGrid[row][col] = currentGrid[col][row]
    }
  }

  return newGrid;
};

export default ({ gameGrid, onRowClick }) => {
  const { classes } = useStyles();
  console.log(convertToGameGrid(gameGrid))

  const onInternalClick = (row) => {
    if (onRowClick) onRowClick(row);
  };

  return (
    <div className={classes.start}>
      <Grid style={{ width: '100%' }} columns={7} gutter={15}>
        {convertToGameGrid(gameGrid).map((cols, col) => {
          return <Fragment key={col}>
            {cols.map((value, row) => {
              return <Grid.Col key={`k-${col}-${row}`} span={1} className={classes.test} onClick={() => onInternalClick(row)}>
                {<Chip type={value} />} {col} {row}
              </Grid.Col>
            })}
          </Fragment>
        })}
      </Grid>
    </div>
  );
};