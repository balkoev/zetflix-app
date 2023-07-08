import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import 'bear-react-carousel/dist/index.css';

import Container from '@mui/material/Container';
import {
  Movies,
  Navbar,
  // Actors,
  MovieInfo,
  MoviesList,
  // Profile
} from './index';

function App() {
  return (
    <Container fixed>
      <CssBaseline />
      <Navbar />
      <main>
        <div style={{ height: '64px' }} />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/:category" element={<MoviesList />} />

          {/* <Route exact path="/approved" element={<Movies />} /> */}
          <Route exact path="/movie/:id" element={<MovieInfo />} />
          {/* <Route exact path="/actors/:id" element={<Actors />} /> */}
          {/* <Route exact path="/profile/:id" element={<Profile />} /> */}
        </Routes>
      </main>
    </Container>
  );
}

export default App;
