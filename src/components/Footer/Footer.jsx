import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Link, Stack } from '@mui/material';
import { useTheme } from '@emotion/react';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.default,
        mt: 6,
        mb: 6,
      }}
    >
      <Stack sx={{
        [theme.breakpoints.up('sm')]: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
      }}
      >
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            © 2023 «Zetflix» 18+
            <br />
            Данный сайт создан исключительно в обучающих целях.
            <br />
            Купить курс по созданию киносайта.
          </Typography>
        </Stack>
        <Link
          href="/"
          sx={{
            [theme.breakpoints.down('sm')]: { mt: 2 },
          }}
        >
          <img src={theme.palette.mode === 'dark' ? '/logo_site.png' : '/logo_site_blue.png'} style={{ width: 170 }} alt="Zetflix" />
        </Link>
      </Stack>
    </Box>
  );
}

export default Footer;
