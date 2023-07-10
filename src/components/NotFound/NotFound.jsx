import React from 'react';
import {
  Box, Button, Link, Typography,
} from '@mui/material';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 220px)',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1">
        404
      </Typography>
      <Typography variant="body1">
        Страница не найдена
      </Typography>
      <Link href="/">
        <Button variant="contained">Вернутся на главную</Button>
      </Link>
    </Box>
  );
}

export default NotFound;
