import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import 'bear-react-carousel/dist/index.css';

import {
  Movies,
  Navbar,
  // Actors,
  MovieInfo,
  // Profile
} from './index';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <main>
        <div style={{ height: '70px' }} />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          {/* <Route exact path="/approved" element={<Movies />} /> */}
          <Route exact path="/movie/:id" element={<MovieInfo />} />
          {/* <Route exact path="/actors/:id" element={<Actors />} /> */}
          {/* <Route exact path="/profile/:id" element={<Profile />} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
