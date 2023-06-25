import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { MovieList, Pagination, FeaturedMovie } from '../index';
import { useGetFilmsQuery } from '../../services/kinopoiskApi';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreId, topType, searchQuery } = useSelector((state) => state.currentGenre);
  const { data, error, isFetching } = useGetFilmsQuery({ genreId, topType, page, searchQuery });

  console.log(data);
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 17 : 19;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.items.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please searh for something else.
        </Typography>
      </Box>
    );
  }

  if (error) return 'An error has occured.';

  return (
    <div>
      <FeaturedMovie movie={data.items[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.totalPages} />
    </div>
  );
}

export default Movies;
