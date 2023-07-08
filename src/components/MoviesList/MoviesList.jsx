import React, { useState } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Movie, MovieActor, Pagination } from '../index';
import { useGetFilmsQuery } from '../../services/kinopoiskApi';

function MoviesList() {
  const { genreId, searchQuery } = useSelector((state) => state.currentGenre);
  const [page, setPage] = useState(1);
  const { category } = useParams();

  const query = () => {
    if (category === 'films') return { type: 'FILM', page, genreId };
    if (category === 'serials') return { type: 'TV_SERIALS', page, genreId };
    if (category === 'cartoons') return { type: 'FILM', page, genreId: 18 };
  };

  const { data, isFetching, error } = useGetFilmsQuery(query());

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

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
      <Grid
        container
        // sx={{
        //   display: 'flex',
        //   justifyContent: 'space-between',
        //   overflow: 'auto',
        //   flexWrap: 'wrap',
        // }}
      >
        {data.items.map((movie, i) => (
          <Movie key={movie.kinopoiskId} movie={movie} i={i} />
        ))}
      </Grid>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.totalPages} />
    </>
  );
}

export default MoviesList;
