import { configureStore } from '@reduxjs/toolkit';
import { kinopoiskApi } from '../services/kinopoiskApi';
import genreReducer from '../features/currentGenre';
import userReducer from '../features/auth';
import currentQueryReducer from '../features/currentQuery';

export default configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    currentGenre: genreReducer,
    user: userReducer,
    currentQuery: currentQueryReducer,
  },
});
