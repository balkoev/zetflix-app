import React, { useState } from 'react';
import {
  // CircularProgress,
  Skeleton, Stack, Typography, useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useTheme } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { Movie, Pagination } from '../index';
import { useGetFilmsTopQuery } from '../../services/kinopoiskApi';
import { topsList } from '../../utils/constants';

function MoviesListTop() {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');
  const top = topsList.find((el) => el.url === location.pathname);
  const { data, isFetching, error } = useGetFilmsTopQuery({ type: top.value, page });

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
      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        sx={{
          [theme.breakpoints.up('md')]: { mt: 6, mb: 6 },
          [theme.breakpoints.up('sm')]: { mt: 4, mb: 4 },
        }}
      >
        {location.pathname === '/best' ? 'ТОП 250 лучших' : 'ТОП 100 популярных'}
      </Typography>

      {isFetching ? (
        // До скелетона показываем этот код
        // <Box display="flex" justifyContent="center" mt={2} mb={2}>
        //   <CircularProgress size="2rem" />
        // </Box>
        <Stack
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ gap: 2 }}
        >
          {Array(10).fill(0).map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
            <Stack key={index} spacing={1}>
              <Skeleton animation="wave" variant="rounded" width={215} height={322} />
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
            </Stack>
          ))}
        </Stack>
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            sx={{ gap: 2 }}
          >
            {data.items.map((movie) => (
              <Movie key={movie.kinopoiskId} movie={movie} />
            ))}
          </Stack>
          <Pagination currentPage={page} setPage={setPage} totalPages={data.totalPages} />
        </>
      )}
    </>
  );
}

export default MoviesListTop;
