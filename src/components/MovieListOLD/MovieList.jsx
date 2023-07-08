import React from 'react';
import { Grid } from '@mui/material';

import { useLocation } from 'react-router-dom';
// import useStyles from './styles';
import { Movie, MovieActor } from '../index';

function MovieList({ movies, numberOfMovies, excludeFirst }) {
  // const classes = useStyles();
  const startFrom = excludeFirst ? 1 : 0;
  const location = useLocation();
  if (!location.pathname) return null;

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        overflow: 'auto',
        flexWrap: 'wrap',
      }}
    >
      {movies.items.slice(startFrom, numberOfMovies).map((movie, i) => (
        location.pathname.split('/')[1] === '' ? <Movie key={i} movie={movie} i={i} /> : <MovieActor key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
