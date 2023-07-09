import { configureStore } from '@reduxjs/toolkit';
import { kinopoiskApi } from '../services/kinopoiskApi';
import currentQueryReducer from '../features/currentQuery';

export default configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    currentQuery: currentQueryReducer,
  },
});
