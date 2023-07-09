import React from 'react';
import {
  Box, CircularProgress, Typography, useTheme, Link,
} from '@mui/material';
import { useSelector } from 'react-redux';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useGetFilmsQuery, useGetFilmsTopQuery } from '../../services/kinopoiskApi';
import styles from './Movies.module.css';

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
      <Box display="flex" justifyContent="center" mt={2} mb={2}>
        <CircularProgress size="4rem" />
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
      <Link href="/popular" variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
        Популярные
      </Link>
      <BearCarousel
        data={carouselDataPopular}
        isEnableNavButton
        enableNavButton
        slidesPerView={5}
        slidesPerGroup={1}
        isEnableLoop
        isEnableAutoPlay
        autoPlayTime={5000}
      />
      <Link href="/best" variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
        Лучшие
      </Link>
      <BearCarousel
        data={carouselDataBest}
        isEnableNavButton
        enableNavButton
        slidesPerView={5}
        slidesPerGroup={1}
        isEnableLoop
        isEnableAutoPlay
        autoPlayTime={6000}
      />
      <Link href="/films" variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
        Фильмы
      </Link>
      <BearCarousel
        data={carouselDataFilms}
        isEnableNavButton
        enableNavButton
        slidesPerView={5}
        slidesPerGroup={1}
        isEnableLoop
        isEnableAutoPlay
        autoPlayTime={7000}
      />
      <Link href="/serials" variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
        Сериалы
      </Link>
      <BearCarousel
        data={carouselDataSerial}
        isEnableNavButton
        enableNavButton
        slidesPerView={5}
        slidesPerGroup={1}
        isEnableLoop
        isEnableAutoPlay
        autoPlayTime={8000}
      />
      <Link href="/cartoons" variant="h4" underline="hover" color={theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}>
        Мультфильмы
      </Link>
      <BearCarousel
        data={carouselDataCartoons}
        isEnableNavButton
        enableNavButton
        slidesPerView={5}
        slidesPerGroup={1}
        isEnableLoop
        isEnableAutoPlay
        autoPlayTime={9000}
      />
    </Box>
  );
}

export default Movies;
