import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import {
  Movies,
  Navbar,
  // Actors,
  MovieInfo,
  // Profile
} from './index';

function App() {
  return (
    <div style={{ display: 'flex',
      height: '100%' }}
    >
      <CssBaseline />
      <Navbar />
      <main style={{ flexGrow: 1,
        padding: '6em 2em 2em' }}
      >
        <div style={{
          height: '70px',
        }}
        />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          {/* <Route exact path="/approved" element={<Movies />} /> */}
          <Route exact path="/movie/:id" element={<MovieInfo />} />
          {/* <Route exact path="/actors/:id" element={<Actors />} /> */}
          {/* <Route exact path="/profile/:id" element={<Profile />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
