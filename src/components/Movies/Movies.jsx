import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';

import { MovieList, Pagination, FeaturedMovie } from '../index';
import { useGetFilmsQuery } from '../../services/kinopoiskApi';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreId, topType, searchQuery } = useSelector((state) => state.currentGenre);
  const { data2, error, isFetching } = useGetFilmsQuery({ genreId, topType, page, searchQuery });
  const data = { items: [] };
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

  const carouselData = data.items?.map((row) => {
    console.log(row);
    return ({
      key: row.kinopoiskId,
      children: <BearSlideImage style={{ padding: '2px' }} imageUrl={row.posterUrlPreview} />,
    });
  });

  if (error) return 'An error has occured.';

  return (
    <div>
      <BearCarousel
        data={carouselData}
        height="300px"
        isEnableNavButton
        enableNavButton
        slidesPerView={5}
        slidesPerGroup={5}
      />
      {/* <FeaturedMovie movie={data.items[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.totalPages} /> */}
    </div>
  );
}

export default Movies;
