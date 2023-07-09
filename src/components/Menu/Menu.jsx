import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Divider, IconButton, Link, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarsIcon from '@mui/icons-material/Stars';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ReorderIcon from '@mui/icons-material/Reorder';
import FortIcon from '@mui/icons-material/Fort';

const menuList = {
  top: [
    {
      title: '250 лучших', icon: 'StarsIcon', value: 'TOP_250_BEST_FILMS', url: '/best',
    },
    {
      title: '100 популярных', icon: 'LocalActivityIcon', value: 'TOP_100_POPULAR_FILMS', url: '/popular',
    },
  ],
  type: [
    {
      title: 'Фильмы', icon: 'LocalMoviesIcon', value: 'FILM', url: '/films',
    },
    {
      title: 'Сериалы', icon: 'ReorderIcon', value: 'TV_SERIES', url: '/serials',
    },
    {
      title: 'Мультфильмы', icon: 'FortIcon', value: 'FILM', url: '/cartoons',
    },
  ],
};

export default function Menu() {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpenMenu(open);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon style={{ color: theme.palette.mode === 'light' ? 'white' : 'white' }} />
      </IconButton>
      <Drawer
        open={isOpenMenu}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuList.top.map((item) => (
              <Link key={item.title} underline="none" href={item.url} color="inherit">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {item.icon === 'StarsIcon' && <StarsIcon />}
                      {item.icon === 'LocalActivityIcon' && <LocalActivityIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Divider />
            {menuList.type.map((item) => (
              <Link key={item.title} underline="none" href={item.url} color="inherit">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {item.icon === 'LocalMoviesIcon' && <LocalMoviesIcon />}
                      {item.icon === 'ReorderIcon' && <ReorderIcon />}
                      {item.icon === 'FortIcon' && <FortIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Divider />
          </List>
        </Box>
      </Drawer>
    </>
  );
}
