import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const kinopoiskApiKey = process.env.REACT_APP_KINOPOISK_KEY;
const excludeGenres = ['фильм-нуар', 'короткометражка', '', 'концерт', 'для взрослых', 'церемония', 'реальное ТВ', 'игра', 'ток-шоу', 'новости'];

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', kinopoiskApiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get Genres and Countries
    getGenresAndCountries: builder.query({
      query: () => '/v2.2/films/filters',
      transformResponse: (response) => ({
        ...response,
        genres: response.genres.filter(({ genre }) => !excludeGenres.includes(genre)),
      }),
    }),

    getFilms: builder.query({
      query: ({ searchQuery, countryId, genreId, topType, page }) => {
        // Get Films by Search
        if (searchQuery) {
          return `/v2.2/films?type=FILM&order=NUM_VOTE&keyword=${searchQuery}&page=${page}`;
        }

        // Get Films by Genre
        if (genreId) {
          return `/v2.2/films?type=FILM&order=NUM_VOTE&genres=${genreId}&page=${page}`;
        }

        // Get Films by Country
        if (countryId) {
          return `/v2.2/films?type=FILM&order=NUM_VOTE&countries=${genreId}&page=${page}`;
        }

        // Get Tops
        if (topType) {
          return `/v2.2/films/top?type=${topType}&page=${page}`;
        }

        // Get popular films by default
        return `/v2.2/films?type=FILM&order=NUM_VOTE&page=${page}`;
      },
      transformResponse: (response) => ({
        totalPages: response.totalPages ? response.totalPages : response.pagesCount,
        items: response.items ? response.items : response.films,
      }),
    }),

    // Get Film
    getFilm: builder.query({
      query: (id) => `/v2.2/films/${id}`,
    }),

    // Get Recommendations
    getRecommendations: builder.query({
      query: ({ filmId }) => `/v2.2/films/${filmId}/similars`,
    }),

    // Get Actor
    getActor: builder.query({
      query: (actorId) => `/v1/staff/${actorId}`,
    }),

    // Get Actors by Film
    getActorsByFilm: builder.query({
      query: (filmId) => `/v1/staff?filmId=${filmId}`,
    }),

  }),
});

export const {
  useGetGenresAndCountriesQuery,
  useGetFilmsQuery,
  useGetFilmQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetActorsByFilmQuery,
} = kinopoiskApi;
