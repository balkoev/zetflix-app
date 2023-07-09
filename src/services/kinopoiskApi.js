import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const kinopoiskApiKey = process.env.REACT_APP_KINOPOISK_KEY;
const excludeGenres = ['фильм-нуар', 'короткометражка', 'концерт', '', 'для взрослых', 'церемония', 'реальное ТВ', 'игра', 'ток-шоу', 'новости'];

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
    getGenres: builder.query({
      query: () => '/v2.2/films/filters',
      transformResponse: (response) => ({
        ...response,
        genres: response.genres.filter(({ genre }) => !excludeGenres.includes(genre)),
      }),
    }),

    getFilms: builder.query({
      query: ({
        countries, genreId, order = 'NUM_VOTE', type = 'FILM', year, keyword, page,
      }) => `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${year}&yearTo${year}&keyword=${keyword}&page=${page}`,
      transformResponse: (response) => ({
        totalPages: response.totalPages ? response.totalPages : response.pagesCount,
        items: response.items ? response.items : response.films,
      }),
    }),

    getFilm: builder.query({
      query: (id) => `/v2.2/films/${id}`,
    }),

    getRecommendations: builder.query({
      query: ({ filmId }) => `/v2.2/films/${filmId}/similars`,
    }),

    getActor: builder.query({
      query: (actorId) => `/v1/staff/${actorId}`,
    }),

    getActorsByFilm: builder.query({
      query: (filmId) => `/v1/staff?filmId=${filmId}`,
    }),

  }),
});

export const {
  useGetGenresQuery,
  useGetFilmsQuery,
  useGetFilmQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetActorsByFilmQuery,
} = kinopoiskApi;
