import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

// import useStyles from './styles';
import { useGetGenresAndCountriesQuery } from '../../services/kinopoiskApi';
import { selectGenre, selectTopType } from '../../features/currentGenre';
import genreIcons from '../../assets/genres';

const redLogo = '/zetflixLogoDark.png';
const blueLogo = '/zetflixLogoLight.png';

const categories = [
  { label: 'Топ 250 лучших', value: 'TOP_250_BEST_FILMS' },
  { label: 'Топ 100 последних', value: 'TOP_100_POPULAR_FILMS' },
  { label: 'Топ ожидающих', value: 'TOP_AWAIT_FILMS' },
];

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  // const classes = useStyles();
  const dispatch = useDispatch();
  const { data, isFetching } = useGetGenresAndCountriesQuery();
  const { genreId } = useSelector((state) => state.currentGenre);

  useEffect(() => {
    setMobileOpen(false);
  }, [genreId]);

  return (
    <>
      <Link to="/">
        <img
          style={{
            width: '70%',
          }}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Filmpire Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>ТОПЫ</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} to="/">
            <ListItem button onClick={() => dispatch(selectTopType(value))}>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Жанры</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        )
          : data?.genres?.map(({ genre, id }) => (
            <Link key={id} to="/">
              <ListItem button onClick={() => dispatch(selectGenre(id))}>
                <ListItemIcon>
                  <img src={genreIcons[genre.toLowerCase()]} height={30} />
                </ListItemIcon>
                <ListItemText primary={genre} />
              </ListItem>
            </Link>
          ))}
      </List>
    </>
  );
}

export default Sidebar;
