import React from 'react';
import {
  Typography, Grid, Grow, Tooltip, Rating,
} from '@mui/material';
import { Link } from 'react-router-dom';

function MovieActor({ movie, i }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link to={`/movie/${movie.filmId}`}>
          <Typography variant="h5">{movie.nameRu ? movie.nameRu : movie.nameEn}</Typography>
          <Tooltip disableTouchListener title={`${movie.rating} / 10`}>
            <div>
              <Typography>{movie.description ? movie.description : 'Нет описания'}</Typography>

              <Rating readOnly value={movie.rating / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default MovieActor;
