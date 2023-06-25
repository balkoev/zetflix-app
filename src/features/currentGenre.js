import { createSlice } from '@reduxjs/toolkit';

export const genre = createSlice({
  name: 'currentGenre',
  initialState: {
    genreId: '',
    page: 1,
    searchQuery: '',
    topType: '',
  },
  reducers: {
    selectGenre: (state, action) => {
      state.genreId = action.payload;
      state.searchQuery = '';
    },
    selectTopType: (state, action) => {
      state.topType = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenre, searchMovie, selectTopType } = genre.actions;

export default genre.reducer;
