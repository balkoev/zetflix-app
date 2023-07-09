import React, { useContext } from 'react';
import {
  AppBar, IconButton, Toolbar, ImageListItem, Slide, useScrollTrigger,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import { Menu, Search } from '../index';

function Navbar() {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Menu />
            <ImageListItem sx={{ ml: 1, mr: 1 }}>
              <Link to="/">
                <img src="/logo_site.png" style={{ width: 170 }} alt="Zetflix" />
              </Link>
            </ImageListItem>
            <Search />
            <IconButton
              color="inherit"
              onClick={toggleColorMode}
            >
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}

export default Navbar;
