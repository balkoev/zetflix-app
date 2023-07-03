import React, { useState, useContext } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, Paper, MenuList, MenuItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7, ContentCopy, ContentCut } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import BasicMenu from '../BasicMenu/BasicMenu';

function Navbar() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar>
      <Toolbar sx={{
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >

        <IconButton
          color="inherit"
          edge="start"
          style={{ outline: 'none' }}
          onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
        >
          <Menu>
            <BasicMenu />
          </Menu>
        </IconButton>
        <IconButton
          color="inherit"
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {/* {!isMobile && <Search />} */}
        <div>
          {!isAuthenticated ? (
            <Button color="inherit">
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to={`/profile/${user.id}`}
              sx={{
                '&:hover': {
                  color: 'white !important',
                  textDecoration: 'none',
                },
              }}
            >
              {!isMobile && <>My Movies &nbsp;</>}
              <Avatar
                style={{ width: 30, height: 30 }}
                alt="Profile"
                src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`}
              />
            </Button>
          )}
        </div>
        {/* {isMobile && <Search />} */}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
