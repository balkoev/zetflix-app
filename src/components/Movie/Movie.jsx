import React from 'react';
import {
  Typography, Tooltip, Rating, Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import styles from './Movies.module.css';

function Movie({ movie }) {
  const theme = useTheme();

  return (
    <Box>
      <Link
        to={`/movie/${movie.kinopoiskId}`}
      >
        <img
          src={movie.posterUrlPreview}
          alt={movie.title}
          className={styles.img}
        />
        <Typography
          sx={{
            color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
            textOverflow: 'ellipsis',
            width: '230px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            marginBottom: 0,
            textAlign: 'center',
          }}
          variant="h5"
        >
          {movie.nameRu ? movie.nameRu : movie.nameOriginal}
        </Typography>
      </Link>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Tooltip disableTouchListener title={`${movie.ratingKinopoisk} / 10`}>
          <div>
            <Rating readOnly value={movie.ratingKinopoisk / 2} precision={0.1} />
          </div>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Movie;
