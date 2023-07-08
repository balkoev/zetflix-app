import React, { useContext } from 'react';
import { AppBar, IconButton, Toolbar, ImageListItem } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import { Menu, Search } from '../index';

function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar>
      <Toolbar>
        <Menu />
        <ImageListItem sx={{ ml: 1, mr: 1 }}>
          <img src="/logo_site.png" style={{ width: 170 }} />
        </ImageListItem>
        <Search />
        <IconButton
          color="inherit"
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
