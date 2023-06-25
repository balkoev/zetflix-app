import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

// import useStyles from './styles';

function Movie({ movie, i }) {
  // const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      sx={{
        color: '#000000',
        textOverflow: 'ellipsis',
        width: '230px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginTop: '10px',
        marginBottom: 0,
        textAlign: 'center',
      }}
    >
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link
          sx={{
            alignItems: 'center',
            fontWeight: 'bolder',
            textDecoration: 'none',

            '&:hover': {
              cursor: 'pointer',
            },
          }}
          to={`/movie/${movie.kinopoiskId}`}
        >
          <img
            src={movie.posterUrlPreview}
            alt={movie.title}
            style={{
              borderRadius: '20px',
              height: '300px',
              marginBottom: '10px',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Typography
            sx={{
              color: '#000000',
              textOverflow: 'ellipsis',
              width: '230px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              marginTop: '10px',
              marginBottom: 0,
              textAlign: 'center',
            }}
            variant="h5"
          >{movie.nameRu ? movie.nameRu : movie.nameOriginal}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.ratingKinopoisk} / 10`}>
            <div>
              <Rating readOnly value={movie.ratingKinopoisk / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default Movie;
