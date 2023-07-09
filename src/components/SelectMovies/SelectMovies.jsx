import {
  Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';
import { useGetGenresQuery } from '../../services/kinopoiskApi';
import { selectQuery, resetQuery } from '../../features/currentQuery';

function SelectMovies({
  order, genreId, countries, year,
}) {
  const [isResetActive, setIsResetActive] = useState(!!(genreId || countries || year));
  const responseGenres = useGetGenresQuery();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    setIsResetActive(!!(genreId || countries || year));
  }, [genreId, countries, year]);

  const currentYear = new Date().getFullYear();
  const countYears = Number(currentYear.toString().slice(2, 4));

  const selectList = {
    order: {
      title: 'Сортировка',
      data: [
        { title: 'По рейтингу', value: 'RATING' },
        { title: 'По оценкам', value: 'NUM_VOTE' },
      ],
    },
    years: { title: 'Год', data: Array(countYears).fill(0).map((el, index) => ({ title: currentYear - index, value: currentYear - index })) },
  };

  if (responseGenres.isFetching) {
    return (
      <Box display="flex" justifyContent="center" mt={2} mb={2}>
        <CircularProgress size="2rem" />
      </Box>
    );
  }

  return (
    <Stack
      sx={{
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          gap: 1,
        },
        [theme.breakpoints.up('sm')]: {
          flexDirection: 'row',
          gap: 1,
        },
      }}
      mt={2}
      mb={2}
    >
      <FormControl fullWidth size="small">
        <InputLabel>
          {selectList.order.title}
        </InputLabel>
        <Select
          value={order}
          label={selectList.order.title}
          onChange={(e) => dispatch(selectQuery({ order: e.target.value }))}
          autoWidth
        >
          {selectList.order.data.map((elOption) => (
            <MenuItem key={elOption.value} value={elOption.value}>{elOption.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>
          Страна
        </InputLabel>
        <Select
          value={countries}
          label="Country"
          onChange={(e) => dispatch(selectQuery({ countries: e.target.value }))}
        >
          {responseGenres.data.countries.map((elOption) => (
            <MenuItem key={elOption.id} value={elOption.id}>{elOption.country}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>
          Жанр
        </InputLabel>
        <Select
          value={genreId}
          label="Genre"
          onChange={(e) => dispatch(selectQuery({ genreId: e.target.value }))}
        >
          {responseGenres.data.genres.map((elOption) => (
            <MenuItem key={elOption.id} value={elOption.id}>{elOption.genre}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>
          {selectList.years.title}
        </InputLabel>
        <Select
          value={year}
          label={selectList.years.title}
          onChange={(e) => dispatch(selectQuery({ year: e.target.value }))}
        >
          {selectList.years.data.map((elOption) => (
            <MenuItem key={elOption.value} value={elOption.value}>{elOption.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button variant="outlined" startIcon={<CloseIcon />} disabled={!isResetActive} onClick={() => dispatch(resetQuery())}>
          сбросить
        </Button>
      </Box>
    </Stack>
  );
}

export default SelectMovies;
