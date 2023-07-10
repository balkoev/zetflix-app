import React from 'react';
import {
  // CircularProgress
  Box, Typography, useTheme, Link, Skeleton, Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useGetFilmsQuery, useGetFilmsTopQuery } from '../../services/kinopoiskApi';
import styles from './Movies.module.css';

const mockArr = [
  { title: 'Популярные', url: '/popular' },
  { title: 'Лучшие', url: '/best' },
  { title: 'Фильмы', url: '/films' },
  { title: 'Сериалы', url: '/serials' },
  { title: 'Мультфильмы', url: '/cartoons' },
];

function Movies() {
  const {
    order, countries, year, keyword, page,
  } = useSelector((state) => state.currentQuery);
  const responsePopular = useGetFilmsTopQuery({ type: 'TOP_100_POPULAR_FILMS', page });
  const responseBest = useGetFilmsTopQuery({ type: 'TOP_250_BEST_FILMS', page });
  const responseFilms = useGetFilmsQuery({
    type: 'FILM', order, genreId: '1', countries, year, keyword, page,
  });
  const responseSerials = useGetFilmsQuery({
    type: 'TV_SERIES', order, genreId: '1', countries, year, keyword, page,
  });
  const responseCartoons = useGetFilmsQuery({
    type: 'FILM', order, genreId: '18', countries, year, keyword, page,
  });
  const theme = useTheme();

  if (responsePopular.isFetching
    || responseBest.isFetching
    || responseFilms.isFetching
    || responseSerials.isFetching
    || responseCartoons.isFetching) {
    return (
    // До скелетона показываем этот код
      // <Box display="flex" justifyContent="center" mt={2} mb={2}>
      //   <CircularProgress size="4rem" />
      // </Box>
      <Box mt={2} mb={2}>
        {mockArr.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            <Link href={el.url} variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
              {el.title}
            </Link>
            <Stack
              direction="row"
              justifyContent="center"
              flexWrap="wrap"
              sx={{ gap: 2, mt: 2, mb: 2 }}
            >
              <Skeleton animation="wave" variant="rounded" height="337px" width="215px" />
              <Skeleton animation="wave" variant="rounded" height="337px" width="215px" />
              <Skeleton animation="wave" variant="rounded" height="337px" width="215px" />
              <Skeleton animation="wave" variant="rounded" height="337px" width="215px" />
              <Skeleton animation="wave" variant="rounded" height="337px" width="215px" />

            </Stack>
          </React.Fragment>
        ))}
      </Box>
    );
  }

  const carouselDataPopular = responsePopular.data.items?.map((row) => ({
    key: row.kinopoiskId,
    children: <Link href={`/movie/${row.kinopoiskId}`}><BearSlideImage className={styles.img} imageUrl={row.posterUrlPreview} /></Link>,
  }));

  const carouselDataBest = responseBest.data.items?.map((row) => ({
    key: row.kinopoiskId,
    children: <Link href={`/movie/${row.kinopoiskId}`}><BearSlideImage className={styles.img} imageUrl={row.posterUrlPreview} /></Link>,
  }));

  const carouselDataFilms = responseFilms.data.items?.map((row) => ({
    key: row.kinopoiskId,
    children: <Link href={`/movie/${row.kinopoiskId}`}><BearSlideImage className={styles.img} imageUrl={row.posterUrlPreview} /></Link>,
  }));

  const carouselDataSerial = responseSerials.data.items?.map((row) => ({
    key: row.kinopoiskId,
    children: <Link href={`/movie/${row.kinopoiskId}`}><BearSlideImage className={styles.img} imageUrl={row.posterUrlPreview} /></Link>,
  }));

  const carouselDataCartoons = responseCartoons.data.items?.map((row) => ({
    key: row.kinopoiskId,
    children: <Link href={`/movie/${row.kinopoiskId}`}><BearSlideImage className={styles.img} imageUrl={row.posterUrlPreview} /></Link>,
  }));

  const carouselArr = [
    { title: 'Популярные', url: '/popular', data: carouselDataPopular },
    { title: 'Лучшие', url: '/best', data: carouselDataBest },
    { title: 'Фильмы', url: '/films', data: carouselDataFilms },
    { title: 'Сериалы', url: '/serials', data: carouselDataSerial },
    { title: 'Мультфильмы', url: '/cartoons', data: carouselDataCartoons },
  ];

  if (responsePopular.error
    || responseBest.error
    || responseFilms.error
    || responseSerials.error
    || responseCartoons.error) {
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
    <Box mt={2} mb={2}>
      {carouselArr.map((el) => (
        <React.Fragment key={el.title}>
          <Link href={el.url} variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
            {el.title}
          </Link>
          <BearCarousel
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
            data={el.data}
            isEnableNavButton
            enableNavButton
            slidesPerView={5}
            slidesPerGroup={1}
            isEnableLoop
            isEnableAutoPlay
            autoPlayTime={5000}
            breakpoints={{
              375: {
                slidesPerView: 'auto',
                isEnableAutoPlay: false,
              },
              768: {
                slidesPerView: '5',

              },
            }}
          />
        </React.Fragment>
      ))}
    </Box>
  );
}

export default Movies;
