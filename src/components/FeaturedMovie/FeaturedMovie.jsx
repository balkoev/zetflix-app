import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

// import useStyles from './styles';

function FeaturedMovie({ movie }) {
  // const classes = useStyles();

  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movie/${movie.kinopoiskId}`}
      sx={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        height: '490px',
        textDecoration: 'none',
      }}
    >
      <Card
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',

        }}
        classes={{ root: {
          position: 'relative',
        } }}
      >
        <CardMedia
          media="picture"
          alt={movie.nameRu ? movie.nameRu : movie.nameOriginal}
          image={movie.posterUrl}
          title={movie.nameRu ? movie.nameRu : movie.nameOriginal}
          sx={{
            // position: 'absolute',
            // top: 0,
            // right: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.575)',
            backgroundBlendMode: 'darken',
          }}
        />
        <Box padding="20px">
          <CardContent
            sx={{
              color: '#00000',
              width: '40%',

            }}
            classes={{ root: {
              position: 'relative',
              backgroundColor: 'transparent',
            } }}
          >
            <Typography variant="h5" gutterBottom>{movie.nameRu ? movie.nameRu : movie.nameOriginal}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default FeaturedMovie;
