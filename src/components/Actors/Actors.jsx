import React, { useState } from 'react';
import {
  Box, Button, CircularProgress, Grid, Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

// import useStyles from './styles';
import { useGetActorQuery } from '../../services/kinopoiskApi';
import { Pagination } from '../index';

function Actors() {
  // const classes = useStyles();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorQuery(id);
  // const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            src={data?.posterUrl}
            alt={data.nameRu}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{data?.nameRu}</Typography>
          <Typography variant="h5" gutterBottom>
            Born:
            {' '}
            {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>{data?.biography || 'Sorry, no biography yet...'}</Typography>
          <Box>
            <Button variant="contained" color="primary" target="_blank" href={data?.webUrl}>KINOPOISK</Button>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Фильмы</Typography>
        {data?.films && <MovieList movies={{ items: data.films }} numberOfMovies={12} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={data.films?.total_pages} />
      </Box>
    </>
  );
}

export default Actors;
