import React, { useState, useEffect, useContext } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import useStyles from './styles';
// import { Search, Sidebar } from '../index';
// import { setUser } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode';

function Navbar() {
  // const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  // const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const colorMode = useContext(ColorModeContext);

  const token = localStorage.getItem('request_token');
  // const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    // const logInUser = async () => {
    //   if (token) {
    //     if (sessionIdFromLocalStorage) {
    //       const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
    //       dispatch(setUser(userData));
    //     } else {
    //       const sessionId = await createSessionId();
    //       const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
    //       dispatch(setUser(userData));
    //     }
    //   }
    // };

    // logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{
          height: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '240px',
          [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            flexWrap: 'wrap',
          },
        }}
        >
          {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            sx={{
              marginRight: theme.spacing(2),
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            }}
          >
            <Menu />
          </IconButton>
          )}
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
      <div>
        <nav sx={{
          [theme.breakpoints.up('sm')]: {
            width: 240,
            flexShrink: 0,
          },
        }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: {
                width: 240,
              } }}
              ModalProps={{ keepMounted: true }}
            >
              {/* <Sidebar setMobileOpen={setMobileOpen} /> */}
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: {
                width: 240,
              } }}
              variant="permanent"
              open
            >
              {/* <Sidebar setMobileOpen={setMobileOpen} /> */}
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
