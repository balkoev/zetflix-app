import React, { useContext } from 'react';
import { AppBar, IconButton, Toolbar, ImageListItem } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import BasicMenu from '../BasicMenu/BasicMenu';
import { Search } from '..';

function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar>
      <Toolbar sx={{
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        <BasicMenu />
        <ImageListItem sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          <img src="/logo_site.png" style={{ width: 170 }} />
        </ImageListItem>
        <Search />
        <IconButton
          color="inherit"
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
