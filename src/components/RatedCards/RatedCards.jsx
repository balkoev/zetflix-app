import React from 'react';
import { Typography, Box } from '@mui/material';

// import useStyles from './styles';
import { Movie } from '../index';

function RatedCards({ title, movies }) {
  // const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexWrap="wrap">
        {movies?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;
