import React, { useState } from 'react';
import {
  CircularProgress, Grid, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {
  Movie, MovieActor, Pagination, SelectMovies,
} from '../index';
import { useGetFilmsQuery } from '../../services/kinopoiskApi';

function MoviesList() {
  const { category } = useParams();
  const {
    order, type, genreId, countries, year, keyword,
  } = useSelector((state) => state.currentQuery);
  const [page, setPage] = useState(1);

  const query = () => {
    if (category === 'films') {
      return {
        type: 'FILM', order, genreId, countries, year, keyword, page,
      };
    }
    if (category === 'serials') {
      return {
        type: 'TV_SERIES', order, genreId, countries, year, keyword, page,
      };
    }
    if (category === 'cartoons') {
      return {
        type: 'FILM', order, genreId: 18, countries, year, keyword, page,
      };
    }
  };

  const title = () => {
    if (category === 'films') return 'Фильмы';
    if (category === 'serials') return 'Сериалы';
    if (category === 'cartoons') return 'Мультфильмы';
  };

  const { data, isFetching, error } = useGetFilmsQuery(query());

  if (error) {
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
      <Typography variant="h3" sx={{ mt: 6, mb: 6 }}>{title()}</Typography>
      <SelectMovies
        order={order}
        type={type}
        genreId={genreId}
        countries={countries}
        year={year}
      />

      {isFetching ? (
        <Box display="flex" justifyContent="center" mt={2} mb={2}>
          <CircularProgress size="2rem" />
        </Box>
      ) : (
        <>
          <Grid
            container
          >
            {data.items.map((movie, i) => (
              <Movie key={movie.kinopoiskId} movie={movie} i={i} />
            ))}
          </Grid>
          <Pagination currentPage={page} setPage={setPage} totalPages={data.totalPages} />
        </>
      )}
    </>
  );
}

export default MoviesList;
