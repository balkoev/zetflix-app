import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

function FeaturedMovie({ movie }) {
  const classes = useStyles();

  if (!movie) return null;

  return (
    <Box component={Link} to={`/movie/${movie.kinopoiskId}`} className={classes.featuredCardContainer}>
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          alt={movie.nameRu ? movie.nameRu : movie.nameOriginal}
          image={movie.posterUrl}
          title={movie.nameRu ? movie.nameRu : movie.nameOriginal}
          className={classes.cardMedia}
        />
        <Box padding="20px">
          <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
            <Typography variant="h5" gutterBottom>{movie.nameRu ? movie.nameRu : movie.nameOriginal}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default FeaturedMovie;
