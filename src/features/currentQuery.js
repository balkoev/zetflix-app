import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: '',
  genreId: '',
  order: '',
  type: '',
  year: '',
  keyword: '',
  page: 1,
  topType: '',
};

export const currentQuery = createSlice({
  name: 'currentQuery',
  initialState,
  reducers: {
    selectQuery: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    resetQuery: () => ({
      ...initialState,
    }),
  },
});

export const { selectQuery, resetQuery } = currentQuery.actions;

export default currentQuery.reducer;
