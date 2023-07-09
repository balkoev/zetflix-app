import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import 'bear-react-carousel/dist/index.css';

import Container from '@mui/material/Container';
import {
  Movies,
  Navbar,
  MovieInfo,
  MoviesList,
  Footer,
  MoviesListTop,
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
          <Route exact path="/best" element={<MoviesListTop />} />
          <Route exact path="/popular" element={<MoviesListTop />} />
          <Route exact path="/:category" element={<MoviesList />} />
          <Route exact path="/movie/:id" element={<MovieInfo />} />
          {/* <Route exact path="/actors/:id" element={<Actors />} /> */}
        </Routes>
      </main>
      <Footer />
    </Container>
  );
}

export default App;
