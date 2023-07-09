import React, { useState } from 'react';
import {
  Box, CircularProgress, Link, Typography, useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { MovieList, Pagination, FeaturedMovie } from '../index';
import { useGetFilmsQuery, useGetGenresQuery } from '../../services/kinopoiskApi';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreId, topType, searchQuery } = useSelector((state) => state.currentGenre);
  const responseFilms = useGetFilmsQuery({ type: 'FILM', page, genreId: '1' });
  const responseSerials = useGetFilmsQuery({ type: 'TV_SERIES', page, genreId: '1' });
  const responseCartoons = useGetFilmsQuery({
    type: 'FILM', genreId: 18, page,
  });
  const theme = useTheme();

  // if (responseFilms.isFetching || responseSerials.isFetching || responseCartoons.isFetching) {
  //   return (
  //     <Box display="flex" justifyContent="center">
  //       <CircularProgress size="4rem" />
  //     </Box>
  //   );
  // }

  const carouselDataFilms = responseFilms.data.items?.map((row) => ({
    key: row.kinopoiskId,
    children: <BearSlideImage style={{ padding: '2px' }} imageUrl={row.posterUrlPreview} />,
  }));

  const carouselDataSerial = responseSerials.data.items?.map((row) => ({
    key: row.kinopoiskId,
    children: <BearSlideImage style={{ padding: '2px' }} imageUrl={row.posterUrlPreview} />,
  }));

  const carouselDataCartoons = responseCartoons.data.items?.map((row) => ({
    key: row.kinopoiskId,
    children: <BearSlideImage style={{ padding: '2px' }} imageUrl={row.posterUrlPreview} />,
  }));

  if (responseFilms.error || responseSerials.error || responseCartoons.error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="h4">
          Произошла ошибка
          {' '}
          <SentimentVeryDissatisfiedIcon />
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Link href="/films" variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
        Фильмы
      </Link>
      <BearCarousel
        data={carouselDataFilms}
        isEnableNavButton
        enableNavButton
        slidesPerView={5}
        slidesPerGroup={5}
      />
      <Link href="/serials" variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
        Сериалы
      </Link>
      <BearCarousel
        data={carouselDataSerial}
        isEnableNavButton
        enableNavButton
        slidesPerView={5}
        slidesPerGroup={5}
      />
      <Link href="/cartoons" variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
        Мультфильмы
      </Link>
      <BearCarousel
        data={carouselDataCartoons}
        isEnableNavButton
        enableNavButton
        slidesPerView={5}
        slidesPerGroup={5}
      />
      {/* <FeaturedMovie movie={data.items[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.totalPages} /> */}
    </>
  );
}

export default Movies;
