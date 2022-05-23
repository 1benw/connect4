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

export default ({ gameGrid, onRowClick }) => {
  const { classes } = useStyles();

  const onInternalClick = (row) => {
    if (onRowClick) onRowClick(row);
  };

  return (
    <div className={classes.start}>
      <Grid style={{ width: '100%' }} columns={7} gutter={15}>
        {gameGrid.map((cols, col) => {
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